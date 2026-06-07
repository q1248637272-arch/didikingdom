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
const webPort = 8810;
const cdpPort = 9260;
const url = `http://127.0.0.1:${webPort}/?v60-market-parcels=1`;
const profile = join(root, "tmp", `edge-v60-market-parcels-${Date.now()}`);
const desktopShot = join(root, "verification-v60-market-parcels-local.png");
const mobileShot = join(root, "verification-v60-market-parcels-mobile-local.png");

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
    state.coins = 12000;
    state.gems = 80;
    state.orders = [];

    const dwelling = state.floors.find((floor) => floor.type === "dwelling");
    while (dwelling.residents.length < 5) {
      addResidentToDwelling(state, dwelling, makeResident(state, "market"));
    }

    let market = state.floors.find((floor) => floor.type === "market");
    if (!market) {
      market = createFloor(state, "market", { name: "Parcel Market", stock: 6, level: 3 });
      state.floors.push(market);
    }
    market.status = "open";
    market.stock = 6;
    market.stockMax = Math.max(market.stockMax || 0, 14);
    market.level = 3;
    market.production = null;
    market.marketCooldown = 0;
    market.marketParcel = null;

    const worker = dwelling.residents.map((entry) => getResident(entry.id)).find(Boolean);
    worker.dreamType = "market";
    worker.skills.market = 10;
    worker.workFloorId = market.id;
    market.workers = [worker.id];

    businessFloors(state).forEach((floor) => {
      if (floor.type !== "market" && floor.type !== "food") {
        floor.stock = 0;
        floor.production = null;
      }
    });
    const food = state.floors.find((floor) => floor.type === "food");
    food.stock = 9;
    food.stockMax = Math.max(food.stockMax || 0, 24);
    food.production = null;

    const foodBefore = food.stock;
    const marketBefore = market.stock;
    state.selectedFloorId = market.id;
    startMarketDeal(market.id);
    const order = state.orders[0];
    const packedAfterStart = orderMarketPacked(order);
    const foodAfterStart = food.stock;
    const infoAfterStart = orderStockInfo(order);
    render(true);

    const domAfterStart = {
      panel: Boolean(document.querySelector(".market-parcel-panel.active")),
      floor: Boolean(document.querySelector('.floor.market-parcel-active[data-type="market"]')),
      phase: document.querySelector('.floor.market-parcel-active[data-type="market"]')?.dataset.marketParcelPhase || "",
      order: Boolean(document.querySelector(".order.parcel-order")),
      tag: Boolean(document.querySelector(".order-tags .parcel-tag")),
      stateTag: Boolean(document.querySelector('[data-state="market-parcel"]')),
    };

    return {
      version: state.version,
      appVersion: [...document.scripts].some((script) => script.src.includes("app.js?v=60")),
      cssVersion: [...document.querySelectorAll('link[rel="stylesheet"]')].some((link) => link.href.includes("overrides.css?v=60")),
      cacheVersion: "little-depths-v60",
      orderAmount: order.amount,
      foodBefore,
      foodAfterStart,
      packedAfterStart,
      marketBefore,
      marketAfterStart: market.stock,
      marketParcelsDone: state.stats.marketParcelsDone || 0,
      marketParcelItemsPacked: state.stats.marketParcelItemsPacked || 0,
      infoAfterStart,
      domAfterStart,
    };
  })()`);

  assert(seeded.version >= 15, `Expected save version >= 15, got ${seeded.version}`);
  assert(seeded.appVersion, "index.html should load app.js?v=60");
  assert(seeded.cssVersion, "index.html should load overrides.css?v=60");
  assert(seeded.packedAfterStart > 0, "Market parcel should pack at least one item immediately");
  assert(seeded.foodBefore - seeded.foodAfterStart === seeded.packedAfterStart, "Packed items should be deducted from real food stock");
  assert(seeded.marketBefore - seeded.marketAfterStart === 1, "Market deal should consume one market stock");
  assert(seeded.marketParcelsDone >= 1, "marketParcelsDone should increment");
  assert(seeded.marketParcelItemsPacked >= seeded.packedAfterStart, "marketParcelItemsPacked should track packed units");
  assert(seeded.infoAfterStart.packed === seeded.packedAfterStart, "orderStockInfo should expose packed amount");
  assert(seeded.infoAfterStart.ready, "Packed amount plus remaining real stock should make the order ready");
  assert(seeded.domAfterStart.panel, "Market parcel panel should be visible and active");
  assert(seeded.domAfterStart.floor, "Market floor should expose market-parcel-active");
  assert(["quote", "pack", "send"].includes(seeded.domAfterStart.phase), "Market floor should expose parcel phase data");
  assert(seeded.domAfterStart.order, "Order card should expose parcel-order class");
  assert(seeded.domAfterStart.tag, "Order card should show parcel tag");
  assert(seeded.domAfterStart.stateTag, "Map state tag should show market parcel state");

  await capture(client, desktopShot);

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
      parcelTag: Boolean(document.querySelector('[data-mobile-panel="orders"] .parcel-tag, .order-tags .parcel-tag')),
      orderCount: document.querySelectorAll(".order").length,
    };
  })()`);
  assert(mobile.dock, "Mobile dock should be visible");
  assert(mobile.activeOrders, "Mobile orders drawer should open");
  assert(mobile.parcelTag, "Mobile orders drawer should show parcel tag");
  assert(mobile.orderCount > 0, "Mobile orders drawer should still render orders");
  await capture(client, mobileShot);

  const fulfilled = await evaluate(client, `(() => {
    const order = state.orders[0];
    const food = state.floors.find((floor) => floor.type === "food");
    const foodBeforeFulfill = food.stock;
    const preparedBeforeFulfill = orderPreparedTotal(order);
    const expectedRemainingTake = Math.max(0, order.amount - preparedBeforeFulfill);
    const orderId = order.id;
    fulfillOrder(orderId);
    const foodAfterFulfill = food.stock;
    render(true);
    return {
      preparedBeforeFulfill,
      expectedRemainingTake,
      foodBeforeFulfill,
      foodAfterFulfill,
      orderRemoved: !state.orders.some((entry) => entry.id === orderId),
    };
  })()`);
  assert(fulfilled.foodBeforeFulfill - fulfilled.foodAfterFulfill === fulfilled.expectedRemainingTake, "Fulfillment should consume only stock not already packed");
  assert(fulfilled.orderRemoved, "Fulfilled market order should be removed");

  const swText = await fetch(`http://127.0.0.1:${webPort}/sw.js`).then((response) => response.text());
  assert(swText.includes(seeded.cacheVersion), "Service worker should use little-depths-v60");
  assert(swText.includes("app.js?v=60"), "Service worker should cache app.js?v=60");
  assert(swText.includes("overrides.css?v=60"), "Service worker should cache overrides.css?v=60");

  const filteredErrors = errors.filter((entry) => !String(entry).includes("apple-mobile-web-app-capable"));
  assert(filteredErrors.length === 0, `Unexpected browser errors: ${filteredErrors.join(" | ")}`);

  console.log(JSON.stringify({
    ok: true,
    packedAfterStart: seeded.packedAfterStart,
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
