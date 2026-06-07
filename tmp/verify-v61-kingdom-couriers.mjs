import { spawn } from "node:child_process";
import { createReadStream, existsSync, mkdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, resolve } from "node:path";

const root = resolve("C:/Users/Mystic/Documents/Codex/2026-05-30/new-chat-4");
const edgeCandidates = [
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
];
const edgePath = edgeCandidates.find((candidate) => existsSync(candidate));
const webPort = 8811;
const cdpPort = 9261;
const url = `http://127.0.0.1:${webPort}/?v61-kingdom-couriers=1`;
const profile = join(root, "tmp", `edge-v61-kingdom-couriers-${Date.now()}`);
const desktopShot = join(root, "verification-v61-kingdom-couriers-local.png");
const mobileShot = join(root, "verification-v61-kingdom-couriers-mobile-local.png");

if (!edgePath) throw new Error("Microsoft Edge executable was not found.");
mkdirSync(profile, { recursive: true });

const types = new Map([
  [".html", "text/html; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".mjs", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".webmanifest", "application/manifest+json; charset=utf-8"],
  [".svg", "image/svg+xml"],
  [".png", "image/png"],
  [".webp", "image/webp"],
]);

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function startStaticServer() {
  const server = createServer((request, response) => {
    try {
      const parsed = new URL(request.url || "/", `http://127.0.0.1:${webPort}`);
      let pathname = decodeURIComponent(parsed.pathname);
      if (pathname === "/") pathname = "/index.html";
      const file = resolve(root, `.${pathname}`);
      if (!file.startsWith(root) || !existsSync(file) || !statSync(file).isFile()) {
        response.writeHead(404);
        response.end("Not found");
        return;
      }
      response.writeHead(200, {
        "content-type": types.get(extname(file)) || "application/octet-stream",
        "cache-control": "no-store",
      });
      createReadStream(file).pipe(response);
    } catch (error) {
      response.writeHead(500);
      response.end(String(error?.message || error));
    }
  });
  return new Promise((resolveListen) => {
    server.listen(webPort, "127.0.0.1", () => resolveListen(server));
  });
}

class CDP {
  constructor(wsUrl) {
    this.id = 0;
    this.pending = new Map();
    this.events = new Map();
    this.ws = new WebSocket(wsUrl);
    this.ws.addEventListener("message", (message) => {
      const data = JSON.parse(message.data);
      if (data.id && this.pending.has(data.id)) {
        const { resolve: resolvePending, reject } = this.pending.get(data.id);
        this.pending.delete(data.id);
        data.error ? reject(new Error(data.error.message)) : resolvePending(data.result || {});
        return;
      }
      const handlers = this.events.get(data.method) || [];
      handlers.forEach((handler) => handler(data.params || {}));
    });
  }

  async ready() {
    if (this.ws.readyState === WebSocket.OPEN) return;
    await new Promise((resolveOpen, rejectOpen) => {
      this.ws.addEventListener("open", resolveOpen, { once: true });
      this.ws.addEventListener("error", rejectOpen, { once: true });
    });
  }

  send(method, params = {}) {
    const id = ++this.id;
    this.ws.send(JSON.stringify({ id, method, params }));
    return new Promise((resolvePending, reject) => {
      this.pending.set(id, { resolve: resolvePending, reject });
      setTimeout(() => {
        if (!this.pending.has(id)) return;
        this.pending.delete(id);
        reject(new Error(`CDP timeout: ${method}`));
      }, 15000);
    });
  }

  on(method, handler) {
    const handlers = this.events.get(method) || [];
    handlers.push(handler);
    this.events.set(method, handlers);
  }

  waitFor(method, timeout = 15000) {
    return new Promise((resolveWait, rejectWait) => {
      const timer = setTimeout(() => rejectWait(new Error(`Timed out waiting for ${method}`)), timeout);
      this.on(method, (params) => {
        clearTimeout(timer);
        resolveWait(params);
      });
    });
  }

  close() {
    this.ws.close();
  }
}

async function waitForJson(path, timeout = 12000) {
  const deadline = Date.now() + timeout;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(`http://127.0.0.1:${cdpPort}${path}`);
      if (response.ok) return response.json();
    } catch {}
    await new Promise((resolveWait) => setTimeout(resolveWait, 220));
  }
  throw new Error(`Edge CDP did not become ready: ${path}`);
}

async function evaluate(client, expression, awaitPromise = false) {
  const result = await client.send("Runtime.evaluate", {
    expression,
    awaitPromise,
    returnByValue: true,
  });
  if (result.exceptionDetails) {
    throw new Error(result.exceptionDetails.text || "Runtime evaluation failed");
  }
  return result.result?.value;
}

async function capture(client, path) {
  const shot = await client.send("Page.captureScreenshot", { format: "png", fromSurface: true });
  writeFileSync(path, Buffer.from(shot.data, "base64"));
}

function cleanupProfile() {
  try {
    rmSync(profile, { recursive: true, force: true });
  } catch {}
}

const server = await startStaticServer();
const edge = spawn(edgePath, [
  "--headless=new",
  `--remote-debugging-port=${cdpPort}`,
  `--user-data-dir=${profile}`,
  "--disable-gpu",
  "--no-first-run",
  "--no-default-browser-check",
  "about:blank",
], { stdio: "ignore" });

try {
  const pages = await waitForJson("/json/list");
  const page = pages.find((entry) => entry.type === "page") || pages[0];
  if (!page?.webSocketDebuggerUrl) throw new Error("No debuggable Edge page found.");

  const client = new CDP(page.webSocketDebuggerUrl);
  await client.ready();
  const errors = [];
  client.on("Runtime.exceptionThrown", (event) => errors.push(event.exceptionDetails?.text || "runtime exception"));
  client.on("Log.entryAdded", (event) => {
    if (event.entry?.level === "error") errors.push(event.entry.text);
  });

  await client.send("Page.enable");
  await client.send("Runtime.enable");
  await client.send("Log.enable");
  await client.send("Network.enable");
  await client.send("Emulation.setDeviceMetricsOverride", {
    width: 1440,
    height: 1050,
    deviceScaleFactor: 1,
    mobile: false,
  });

  const firstLoad = client.waitFor("Page.loadEventFired");
  await client.send("Page.navigate", { url });
  await firstLoad;
  await evaluate(client, "localStorage.removeItem('codex-little-depths-v4')");
  const reload = client.waitFor("Page.loadEventFired");
  await client.send("Page.reload", { ignoreCache: true });
  await reload;
  await evaluate(client, "new Promise((resolve) => setTimeout(resolve, 900))", true);

  const seeded = await evaluate(client, `(() => {
    state = makeNewGame();
    state.coins = 14000;
    state.gems = 90;
    state.orders = [];

    const dwelling = state.floors.find((floor) => floor.type === "dwelling");
    while (dwelling.residents.length < 5) {
      addResidentToDwelling(state, dwelling, makeResident(state, "kingdom"));
    }

    let kingdom = state.floors.find((floor) => floor.type === "kingdom");
    if (!kingdom) {
      kingdom = createFloor(state, "kingdom", { name: "Courier Council", stock: 8, level: 3 });
      state.floors.push(kingdom);
    }
    kingdom.status = "open";
    kingdom.stock = 8;
    kingdom.stockMax = Math.max(kingdom.stockMax || 0, 18);
    kingdom.level = 3;
    kingdom.production = null;
    kingdom.royalMandateCooldown = 0;
    kingdom.royalMandate = null;

    const worker = dwelling.residents.map((entry) => getResident(entry.id)).find(Boolean);
    worker.dreamType = "kingdom";
    worker.skills.kingdom = 10;
    worker.workFloorId = kingdom.id;
    kingdom.workers = [worker.id];

    const food = state.floors.find((floor) => floor.type === "food");
    food.stock = 0;
    food.stockMax = Math.max(food.stockMax || 0, 24);
    food.production = null;

    const order = normalizeOrderMandate({
      id: "verify-v61-royal-courier",
      title: "验收热餐委托",
      type: "food",
      amount: 7,
      reward: 210,
      gemReward: 0,
      note: "王令信使验证",
      source: "royal",
      bonusRelic: false,
      royalMandate: null,
      marketParcel: null,
    });
    state.orders = [order];
    state.selectedFloorId = kingdom.id;
    render(true);

    startRoyalMandate(kingdom.id, order.id);
    kingdom.royalMandate.remaining = kingdom.royalMandate.total * 0.2;
    updateRoyalMandateFloor(kingdom, 0.1);
    render(true);

    const floorEl = document.querySelector(".floor.royal-courier-active[data-type='kingdom']");
    const active = {
      version: state.version,
      appVersion: [...document.scripts].some((script) => script.src.includes("app.js?v=61")),
      cssVersion: [...document.querySelectorAll('link[rel="stylesheet"]')].some((link) => link.href.includes("overrides.css?v=61")),
      kingdomStock: kingdom.stock,
      prepared: orderMandatePrepared(order),
      routeLabel: kingdom.royalMandate.routeLabel,
      courierProgress: Math.round(royalCourierProgress(kingdom) * 100),
      courierPhase: currentRoyalCourierPhase(kingdom).id,
      mandatePhase: currentRoyalMandatePhase(kingdom).id,
      panel: Boolean(document.querySelector(".royal-mandate-panel.active")),
      track: Boolean(document.querySelector(".royal-courier-track")),
      route: Boolean(document.querySelector(".royal-courier-route")),
      floorActive: Boolean(floorEl),
      dataPhase: floorEl?.dataset.royalCourierPhase || "",
      dataProgress: Number(floorEl?.dataset.royalCourierProgress || 0),
      stateTag: Boolean(document.querySelector('[data-state="royal-mandate"]')),
    };

    return active;
  })()`);

  assert(seeded.version >= 16, `Expected save version >= 16, got ${seeded.version}`);
  assert(seeded.appVersion, "index.html should load app.js?v=61");
  assert(seeded.cssVersion, "index.html should load overrides.css?v=61");
  assert(seeded.kingdomStock === 7, "Royal mandate should consume exactly one kingdom stock.");
  assert(seeded.prepared > 0, "Royal mandate should prepare order progress.");
  assert(seeded.routeLabel.includes("→"), "Courier route label should include a route arrow.");
  assert(seeded.courierProgress >= 70, "Courier progress should be exposed.");
  assert(["route", "receipt"].includes(seeded.courierPhase), "Courier phase should reach route/receipt state.");
  assert(seeded.panel && seeded.track && seeded.route, "Courier panel and map route should render.");
  assert(seeded.floorActive && seeded.dataPhase, "Kingdom floor should expose courier data attributes.");
  assert(seeded.dataProgress >= 70, "Kingdom floor should expose courier progress attribute.");
  assert(seeded.stateTag, "Royal mandate state tag should remain visible.");

  await capture(client, desktopShot);

  const delivered = await evaluate(client, `(() => {
    const kingdom = state.floors.find((floor) => floor.type === "kingdom" && floor.royalMandate?.orderId === "verify-v61-royal-courier");
    const order = state.orders.find((entry) => entry.id === "verify-v61-royal-courier");
    kingdom.royalMandate.remaining = 0.05;
    updateRoyalMandateFloor(kingdom, 1);
    render(true);
    return {
      delivered: Boolean(order.royalMandate?.delivered),
      receiptBonus: Number(order.royalMandate?.receiptBonus || 0),
      reward: order.reward,
      receiptsDone: state.stats.royalCourierReceiptsDone || 0,
      orderClass: Boolean(document.querySelector(".order.mandate-delivered.royal-courier-order")),
      deliveredTag: Boolean(document.querySelector(".mandate-tag.delivered")),
      receiptTag: Boolean(document.querySelector(".mandate-tag.receipt")),
      activeCleared: !kingdom.royalMandate,
    };
  })()`);
  assert(delivered.delivered, "Royal courier should mark the order delivered.");
  assert(delivered.receiptBonus > 0, "Royal courier should add a receipt bonus.");
  assert(delivered.reward > 210, "Order reward should include mandate and receipt bonuses.");
  assert(delivered.receiptsDone >= 1, "royalCourierReceiptsDone should increment.");
  assert(delivered.orderClass && delivered.deliveredTag && delivered.receiptTag, "Delivered order tags should render.");
  assert(delivered.activeCleared, "Finished mandate should clear floor active state.");

  await client.send("Emulation.setDeviceMetricsOverride", {
    width: 390,
    height: 820,
    deviceScaleFactor: 2,
    mobile: true,
  });
  const mobile = await evaluate(client, `(() => {
    setMobilePanel("orders", true);
    render(true);
    return {
      dock: Boolean(document.querySelector(".mobile-panel-dock")),
      activeOrders: Boolean(document.querySelector('[data-mobile-panel="orders"].mobile-panel-active')),
      deliveredTag: Boolean(document.querySelector('[data-mobile-panel="orders"] .mandate-tag.delivered, .mandate-tag.delivered')),
      receiptTag: Boolean(document.querySelector('[data-mobile-panel="orders"] .mandate-tag.receipt, .mandate-tag.receipt')),
      orderCount: document.querySelectorAll(".order").length,
    };
  })()`);
  assert(mobile.dock, "Mobile dock should be visible.");
  assert(mobile.activeOrders, "Mobile orders drawer should open.");
  assert(mobile.deliveredTag && mobile.receiptTag, "Mobile orders drawer should show courier receipt tags.");
  assert(mobile.orderCount > 0, "Mobile orders drawer should render orders.");
  await capture(client, mobileShot);

  const fulfilled = await evaluate(client, `(() => {
    const order = state.orders.find((entry) => entry.id === "verify-v61-royal-courier");
    const food = state.floors.find((floor) => floor.type === "food");
    const preparedBeforeFulfill = orderPreparedTotal(order);
    const expectedRemainingTake = Math.max(0, order.amount - preparedBeforeFulfill);
    food.stock = expectedRemainingTake;
    const stockBefore = food.stock;
    const receiptBonus = Number(order.royalMandate?.receiptBonus || 0);
    fulfillOrder(order.id);
    return {
      preparedBeforeFulfill,
      expectedRemainingTake,
      stockBefore,
      stockAfter: food.stock,
      receiptBonus,
      orderRemoved: !state.orders.some((entry) => entry.id === "verify-v61-royal-courier"),
      mandateCleared: !state.floors.some((floor) => floor.type === "kingdom" && floor.royalMandate?.orderId === "verify-v61-royal-courier"),
    };
  })()`);
  assert(fulfilled.preparedBeforeFulfill > 0, "Fulfillment should retain mandate preparation.");
  assert(fulfilled.receiptBonus > 0, "Fulfillment should retain courier receipt bonus.");
  assert(fulfilled.stockBefore === fulfilled.expectedRemainingTake, "Fulfillment setup should need only unprepared stock.");
  assert(fulfilled.stockAfter === 0, "Fulfillment should consume only stock not already prepared by mandate.");
  assert(fulfilled.orderRemoved && fulfilled.mandateCleared, "Fulfillment should remove order and clear mandate floor state.");

  const swText = await fetch(`http://127.0.0.1:${webPort}/sw.js`).then((response) => response.text());
  assert(swText.includes("little-depths-v61"), "Service worker should use little-depths-v61.");
  assert(swText.includes("app.js?v=61"), "Service worker should cache app.js?v=61.");
  assert(swText.includes("overrides.css?v=61"), "Service worker should cache overrides.css?v=61.");

  const filteredErrors = errors.filter((entry) => !String(entry).includes("apple-mobile-web-app-capable"));
  assert(filteredErrors.length === 0, `Unexpected browser errors: ${filteredErrors.join(" | ")}`);

  console.log(JSON.stringify({
    ok: true,
    courierPhase: seeded.courierPhase,
    courierProgress: seeded.courierProgress,
    receiptBonus: delivered.receiptBonus,
    expectedRemainingTake: fulfilled.expectedRemainingTake,
    desktopShot,
    mobileShot,
  }, null, 2));

  client.close();
} finally {
  edge.kill();
  server.close();
  cleanupProfile();
}
