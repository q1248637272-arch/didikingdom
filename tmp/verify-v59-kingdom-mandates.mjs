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
const webPort = 8809;
const cdpPort = 9259;
const url = `http://127.0.0.1:${webPort}/?v59-kingdom-mandates=1`;
const profile = join(root, "tmp", `edge-v59-kingdom-mandates-${Date.now()}`);
const desktopShot = join(root, "verification-v59-kingdom-mandates-local.png");
const mobileShot = join(root, "verification-v59-kingdom-mandates-mobile-local.png");

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
    state.coins = 12000;
    state.gems = 80;
    state.orders = [];

    const dwelling = state.floors.find((floor) => floor.type === "dwelling");
    while (dwelling.residents.length < 5) {
      addResidentToDwelling(state, dwelling, makeResident(state, "kingdom"));
    }

    let kingdom = state.floors.find((floor) => floor.type === "kingdom");
    if (!kingdom) {
      kingdom = createFloor(state, "kingdom", { name: "Mandate Check", stock: 8, level: 3 });
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
    food.workers = food.workers || [];

    const order = normalizeOrderMandate({
      id: "verify-royal-order",
      title: "验收热餐委托",
      type: "food",
      amount: 6,
      reward: 180,
      gemReward: 0,
      note: "王国签令验证",
      source: "royal",
      bonusRelic: false,
      royalMandate: null,
    });
    state.orders = [order];
    state.selectedFloorId = kingdom.id;
    render(true);

    startRoyalMandate(kingdom.id, order.id);
    const prepared = orderMandatePrepared(order);
    const infoAfterMandate = orderStockInfo(order);
    render(true);

    return {
      version: state.version,
      appVersion: [...document.scripts].some((script) => script.src.includes("app.js?v=59")),
      cssVersion: [...document.styleSheets].some((sheet) => String(sheet.href || "").includes("overrides.css?v=59")),
      cacheVersion: "serviceWorker" in navigator,
      kingdomStockAfterStart: kingdom.stock,
      active: Boolean(kingdom.royalMandate),
      prepared,
      missing: infoAfterMandate.missing,
      reward: order.reward,
      panel: Boolean(document.querySelector(".royal-mandate-panel.active")),
      floorActive: Boolean(document.querySelector(".floor.royal-mandate-active[data-type='kingdom']")),
      phaseAttr: document.querySelector(".floor.royal-mandate-active[data-type='kingdom']")?.dataset.royalMandatePhase || "",
      statusGlyph: Boolean(document.querySelector(".status-glyph[data-state='royal-mandate']")),
      orderTag: Boolean(document.querySelector(".order.mandated-order .mandate-tag")),
      orderButton: Boolean(document.querySelector("[data-action='royal-mandate-order']")),
    };
  })()`);

  if (!seeded.appVersion) throw new Error("index.html did not load app.js?v=59");
  if (!seeded.cssVersion) throw new Error("index.html did not load overrides.css?v=59");
  if (seeded.version < 14) throw new Error(`Expected save version >= 14, got ${seeded.version}`);
  if (!seeded.active || !seeded.panel || !seeded.floorActive) throw new Error("Royal mandate active UI did not render.");
  if (!seeded.statusGlyph || !seeded.phaseAttr) throw new Error("Royal mandate map status was not exposed.");
  if (!seeded.orderTag || !seeded.orderButton) throw new Error("Royal mandate order UI did not render.");
  if (seeded.prepared <= 0 || seeded.missing >= 6) throw new Error("Royal mandate did not prepare order progress.");
  if (seeded.kingdomStockAfterStart !== 7) throw new Error("Royal mandate did not consume exactly one kingdom stock.");
  if (seeded.reward <= 180) throw new Error("Royal mandate did not add order reward.");

  await capture(client, desktopShot);

  await client.send("Emulation.setDeviceMetricsOverride", {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true,
  });
  await evaluate(client, "updateResponsiveLayoutState(); setMobilePanel('orders', true); new Promise((resolve) => setTimeout(resolve, 500))", true);
  const mobile = await evaluate(client, `(() => ({
    mobileLayout: document.body.classList.contains("mobile-panel-layout"),
    dockVisible: Boolean(document.querySelector(".mobile-panel-dock")),
    activeOrders: document.querySelector("[data-mobile-panel='orders']")?.classList.contains("mobile-panel-active") || false,
    mandateButton: Boolean(document.querySelector("[data-action='royal-mandate-order']")),
  }))()`);
  if (!mobile.mobileLayout || !mobile.dockVisible || !mobile.activeOrders || !mobile.mandateButton) {
    throw new Error("Mobile royal mandate/order layout check failed.");
  }
  await capture(client, mobileShot);

  const fulfillment = await evaluate(client, `(() => {
    const order = state.orders.find((entry) => entry.id === "verify-royal-order");
    const forcedPrepared = Math.min(3, Math.max(1, order.amount - 2));
    order.royalMandate = {
      ...(order.royalMandate || {}),
      floorId: state.floors.find((floor) => floor.type === "kingdom")?.id || 0,
      prepared: forcedPrepared,
      rewardBonus: Number(order.royalMandate?.rewardBonus || 0),
      active: false,
      seal: Boolean(order.royalMandate?.seal),
    };
    const prepared = orderMandatePrepared(order);
    const neededActual = Math.max(0, order.amount - prepared);
    businessFloors(state).filter((floor) => floor.type === order.type).forEach((floor) => {
      floor.stock = 0;
    });
    const food = state.floors.find((floor) => floor.type === "food");
    food.stock = neededActual;
    const stockBefore = food.stock;
    const amount = order.amount;
    fulfillOrder(order.id);
    return {
      prepared,
      amount,
      stockBefore,
      stockAfter: food.stock,
      orderGone: !state.orders.some((entry) => entry.id === "verify-royal-order"),
      mandateCleared: !state.floors.some((floor) => floor.type === "kingdom" && floor.royalMandate?.orderId === "verify-royal-order"),
    };
  })()`);

  if (fulfillment.prepared <= 0) throw new Error("Fulfillment check lost mandate preparation.");
  if (!(fulfillment.stockBefore < fulfillment.amount)) throw new Error("Fulfillment did not use a partial real-stock requirement.");
  if (fulfillment.stockAfter !== 0 || !fulfillment.orderGone || !fulfillment.mandateCleared) {
    throw new Error("Fulfillment did not consume only required real stock and clear mandate state.");
  }

  const swText = await fetch(`http://127.0.0.1:${webPort}/sw.js`).then((response) => response.text());
  if (!swText.includes("little-depths-v59") || !swText.includes("app.js?v=59") || !swText.includes("overrides.css?v=59")) {
    throw new Error("Service worker was not bumped to v59.");
  }

  if (errors.length) {
    const relevant = errors.filter((entry) => !entry.includes("apple-mobile-web-app-capable"));
    if (relevant.length) throw new Error(`Browser logged errors: ${relevant.join(" | ")}`);
  }

  console.log(JSON.stringify({ seeded, mobile, fulfillment, desktopShot, mobileShot }, null, 2));
  client.close();
} finally {
  edge.kill();
  server.close();
  cleanupProfile();
}
