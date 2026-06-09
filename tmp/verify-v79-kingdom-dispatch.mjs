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
const webPort = 8831;
const cdpPort = 9281;
const url = `http://127.0.0.1:${webPort}/?v79-kingdom-dispatch=1`;
const profile = join(root, "tmp", `edge-v79-kingdom-dispatch-${Date.now()}`);
const desktopShot = join(root, "verification-v79-kingdom-dispatch-local.png");
const mobileShot = join(root, "verification-v79-kingdom-dispatch-mobile-local.png");

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
  return new Promise((resolveListen) => server.listen(webPort, "127.0.0.1", () => resolveListen(server)));
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
        const pending = this.pending.get(data.id);
        this.pending.delete(data.id);
        data.error ? pending.reject(new Error(data.error.message)) : pending.resolve(data.result || {});
        return;
      }
      (this.events.get(data.method) || []).forEach((handler) => handler(data.params || {}));
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
    return new Promise((resolveSend, reject) => {
      this.pending.set(id, { resolve: resolveSend, reject });
      setTimeout(() => {
        if (!this.pending.has(id)) return;
        this.pending.delete(id);
        reject(new Error(`CDP timeout: ${method}`));
      }, 25000);
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
    const detail = result.exceptionDetails.exception?.description || result.exceptionDetails.text || "Runtime evaluation failed";
    throw new Error(detail);
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
    width: 1280,
    height: 880,
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
    if (typeof closeGuideModal === "function") closeGuideModal(true);
    state = makeNewGame();
    state.coins = 26000;
    state.gems = 120;
    state.happiness = 92;
    state.stats.commissionsDone = 5;
    const dwelling = state.floors.find((floor) => floor.type === "dwelling");
    dwelling.capacity = 24;
    function ensureFloor(type, stock = 0) {
      let floor = state.floors.find((candidate) => candidate.type === type);
      if (!floor) {
        floor = createFloor(state, type, { name: \`v79\${FLOOR_TYPES[type].label}\`, stock });
        state.floors.push(floor);
      }
      floor.status = "open";
      floor.stock = stock;
      floor.stockMax = Math.max(floor.stockMax || 0, 18);
      floor.production = null;
      if (!floor.workers?.length) {
        const worker = makeResident(state, type);
        worker.skills[type] = 10;
        addResidentToDwelling(state, dwelling, worker);
        hireBestWorker(floor, state, true);
      }
      return floor;
    }
    const food = ensureFloor("food", 7);
    const service = ensureFloor("service", 0);
    const craft = ensureFloor("craft", 0);
    const market = ensureFloor("market", 5);
    const kingdom = ensureFloor("kingdom", 6);
    kingdom.level = 3;
    kingdom.royalMandateCooldown = 0;
    kingdom.royalMandate = null;
    state.orders = [
      normalizeOrderLogistics({
        id: "v79-ready-food",
        title: "验收热餐",
        type: "food",
        amount: 5,
        reward: 240,
        gemReward: 1,
        note: "已备齐，验证调度桌立即交付",
        source: "royal",
        bonusRelic: false,
      }),
      normalizeOrderLogistics({
        id: "v79-need-craft",
        title: "验收工坊",
        type: "craft",
        amount: 8,
        reward: 320,
        gemReward: 0,
        note: "缺口订单，验证签令补缺",
        source: "royal",
        bonusRelic: false,
      }),
      normalizeOrderLogistics({
        id: "v79-parcel-service",
        title: "验收花礼",
        type: "service",
        amount: 7,
        reward: 260,
        gemReward: 0,
        note: "包裹流转中，验证等待状态",
        source: "market",
        bonusRelic: false,
        marketParcel: { floorId: market.id, packed: 3, rewardBonus: 22, active: true, shipped: false },
      }),
    ];
    state.selectedFloorId = kingdom.id;
    render(true);
    return {
      version: state.version,
      appVersion: [...document.scripts].some((script) => script.src.includes("app.js?v=79")),
      cssVersion: [...document.querySelectorAll('link[rel="stylesheet"]')].some((link) => link.href.includes("overrides.css?v=79")),
      kingdomId: kingdom.id,
      marketId: market.id,
      foodStock: food.stock,
      orderCount: state.orders.length,
      dispatchPanel: Boolean(document.querySelector(".order-dispatch-panel")),
      dispatchLayer: Boolean(document.querySelector(".floor[data-type='kingdom'] .kingdom-dispatch-layer")),
      supplyBars: document.querySelectorAll(".order-supply-bar").length,
      nextSteps: document.querySelectorAll(".order-next-step").length,
      readyAction: document.querySelector(".order-dispatch-action")?.textContent.trim() || "",
      readyCount: document.querySelector(".order-dispatch-stats span:first-child b")?.textContent || "",
    };
  })()`);

  assert(seeded.version >= 28, `Expected save version >= 28, got ${seeded.version}`);
  assert(seeded.appVersion, "index.html should load app.js?v=79");
  assert(seeded.cssVersion, "index.html should load overrides.css?v=79");
  assert(seeded.dispatchPanel && seeded.dispatchLayer, "Dispatch panel or kingdom map layer missing.");
  assert(seeded.supplyBars >= 3 && seeded.nextSteps >= 3, "Order cards should render segmented bars and next-step rows.");
  assert(seeded.readyAction === "交付", `Top dispatch action should be 交付, got ${seeded.readyAction}.`);
  assert(Number(seeded.readyCount) >= 1, "Dispatch desk should count ready orders.");

  const afterFulfill = await evaluate(client, `(() => {
    const coinsBefore = state.coins;
    document.querySelector(".order-dispatch-action").click();
    checkQuests();
    render(true);
    const quest = questEntry(QUEST_DEFS.find((def) => def.id === "order_triage"));
    return {
      orderRemoved: !state.orders.some((order) => order.id === "v79-ready-food"),
      commissionsDone: state.stats.commissionsDone,
      questReady: Boolean(quest.ready),
      questClaimed: Boolean(quest.claimed),
      coinsBefore,
      coinsAfter: state.coins,
      nextAction: document.querySelector(".order-dispatch-action")?.textContent.trim() || "",
      nextTone: document.querySelector(".order-dispatch-focus")?.dataset.tone || "",
      readyOrderClass: Boolean(document.querySelector(".order.dispatch-ready")),
    };
  })()`);
  assert(afterFulfill.orderRemoved, "Ready order should be fulfilled from dispatch desk.");
  assert(afterFulfill.commissionsDone === 6, `commissionsDone should become 6, got ${afterFulfill.commissionsDone}.`);
  assert(afterFulfill.questReady && !afterFulfill.questClaimed, "New order_triage quest should become manually claimable.");
  assert(afterFulfill.coinsAfter === afterFulfill.coinsBefore + 240, "Quest reward should not auto-award on completion.");
  assert(afterFulfill.nextAction === "签令", `Next dispatch action should be 签令, got ${afterFulfill.nextAction}.`);
  assert(afterFulfill.nextTone === "mandate", `Next dispatch tone should be mandate, got ${afterFulfill.nextTone}.`);

  const afterMandate = await evaluate(client, `(() => {
    document.querySelector(".order-dispatch-action").click();
    const kingdom = state.floors.find((floor) => floor.type === "kingdom");
    render(true);
    return {
      activeMandate: Boolean(kingdom.royalMandate),
      mandateOrderId: kingdom.royalMandate?.orderId || "",
      orderTone: document.querySelector(".order.mandate-active")?.className || "",
      panelTone: document.querySelector(".order-dispatch-panel")?.dataset.tone || "",
      layerTone: document.querySelector(".kingdom-dispatch-layer")?.dataset.tone || "",
      royalPanel: Boolean(document.querySelector(".royal-mandate-panel.active")),
      route: Boolean(document.querySelector(".royal-courier-route")),
    };
  })()`);
  assert(afterMandate.activeMandate, "Dispatch desk should start a royal mandate.");
  assert(afterMandate.mandateOrderId === "v79-need-craft", `Mandate targeted ${afterMandate.mandateOrderId}.`);
  assert(afterMandate.orderTone.includes("dispatch-running") || afterMandate.orderTone.includes("mandate-active"), "Mandate order should show active/running classes.");
  assert(afterMandate.panelTone === "running", `Dispatch panel should become running, got ${afterMandate.panelTone}.`);
  assert(afterMandate.layerTone === "running", `Kingdom dispatch layer should become running, got ${afterMandate.layerTone}.`);
  assert(afterMandate.royalPanel && afterMandate.route, "Royal mandate panel and courier route should still render.");

  const desktopLayout = await evaluate(client, `(() => {
    const overflowing = [...document.querySelectorAll(".order-dispatch-panel, .order, .order-next-step, .order-dispatch-focus")]
      .filter((node) => node.scrollWidth > node.clientWidth + 2)
      .map((node) => node.className);
    const kingdom = document.querySelector(".floor[data-type='kingdom']");
    const layer = kingdom.querySelector(".kingdom-dispatch-layer").getBoundingClientRect();
    const people = [...kingdom.querySelectorAll(".life-stage > .resident-dot, .life-stage > .worker-dot, .life-stage > .social-pair")].map((node) => {
      const rect = node.getBoundingClientRect();
      return { bottom: Math.round(rect.bottom), top: Math.round(rect.top) };
    });
    return {
      overflowing,
      documentOverflow: document.documentElement.scrollWidth - window.innerWidth,
      layerBottom: Math.round(layer.bottom),
      people,
    };
  })()`);
  assert(!desktopLayout.overflowing.length, `Desktop order UI overflow: ${desktopLayout.overflowing.join(", ")}`);
  assert(desktopLayout.documentOverflow <= 2, `Desktop horizontal overflow: ${desktopLayout.documentOverflow}`);
  assert(desktopLayout.people.every((person) => person.bottom > desktopLayout.layerBottom - 10), "Kingdom dispatch layer should stay behind/under grounded people.");
  await capture(client, desktopShot);

  await client.send("Emulation.setDeviceMetricsOverride", {
    width: 390,
    height: 780,
    deviceScaleFactor: 1,
    mobile: true,
  });
  const mobile = await evaluate(client, `(() => {
    setMobilePanel("orders", true);
    render(true);
    const orderNodes = [...document.querySelectorAll("[data-mobile-panel='orders'] .order, [data-mobile-panel='orders'] .order-dispatch-panel")];
    const overflowing = orderNodes.filter((node) => node.scrollWidth > node.clientWidth + 2).map((node) => node.className);
    const textOverflow = [...document.querySelectorAll(".order-next-step small, .order-dispatch-focus small, .order-tags span")]
      .filter((node) => node.scrollWidth > node.clientWidth + 2 && getComputedStyle(node).whiteSpace === "nowrap")
      .length;
    const people = [...document.querySelectorAll(".floor:not([data-type='lobby'])")]
      .flatMap((floor) => {
        const stage = floor.querySelector(".life-stage");
        const scene = floor.querySelector(".room-scene");
        if (!stage || !scene) return [];
        const stageRect = stage.getBoundingClientRect();
        const sceneRect = scene.getBoundingClientRect();
        return [...stage.children]
          .filter((element) => element.matches(".resident-dot, .worker-dot, .social-pair"))
          .map((element) => {
            const rect = element.getBoundingClientRect();
            return {
              floorType: floor.dataset.type,
              stageBottomGap: Math.round(stageRect.bottom - rect.bottom),
              sceneBottomGap: Math.round(sceneRect.bottom - rect.bottom),
              topInsideScene: Math.round(rect.top - sceneRect.top),
            };
          });
      });
    return {
      activeOrders: Boolean(document.querySelector('[data-mobile-panel="orders"].mobile-panel-active')),
      dispatchPanel: Boolean(document.querySelector("[data-mobile-panel='orders'] .order-dispatch-panel, .order-dispatch-panel")),
      dispatchLayer: Boolean(document.querySelector(".kingdom-dispatch-layer")),
      claimButton: Boolean(document.querySelector("[data-action='claim-quest'][data-quest-id='order_triage']")),
      supplyBars: document.querySelectorAll(".order-supply-bar").length,
      overflowing,
      textOverflow,
      people,
      documentOverflow: document.documentElement.scrollWidth - window.innerWidth,
    };
  })()`);
  assert(mobile.activeOrders, "Mobile orders drawer should be active.");
  assert(mobile.dispatchPanel && mobile.dispatchLayer, "Mobile dispatch UI or map layer missing.");
  assert(mobile.claimButton, "Manual claim button for order_triage should be visible.");
  assert(mobile.supplyBars >= 2, "Mobile order supply bars should render.");
  assert(!mobile.overflowing.length, `Mobile order UI overflow: ${mobile.overflowing.join(", ")}`);
  assert(!mobile.textOverflow, `Mobile nowrap text overflow count: ${mobile.textOverflow}.`);
  assert(mobile.documentOverflow <= 2, `Mobile horizontal overflow: ${mobile.documentOverflow}`);
  assert(mobile.people.length >= 5, `Expected grounded people across rooms, got ${mobile.people.length}.`);
  for (const person of mobile.people) {
    assert(person.stageBottomGap >= 36 && person.stageBottomGap <= 66, `Person/group feet should sit on the visible floor: ${JSON.stringify(person)}`);
    assert(person.sceneBottomGap >= 8 && person.sceneBottomGap <= 38, `Person/group should not sink below or float above the room floor: ${JSON.stringify(person)}`);
    assert(person.topInsideScene >= -36, `Person/group floats outside room scene: ${JSON.stringify(person)}`);
  }
  await capture(client, mobileShot);

  const swText = await fetch(`http://127.0.0.1:${webPort}/sw.js`).then((response) => response.text());
  assert(swText.includes("little-depths-v79") && swText.includes("app.js?v=79") && swText.includes("overrides.css?v=79"), "Service worker should use v79 cache markers.");
  assert(errors.length === 0, `Browser errors: ${errors.join(" | ")}`);
  console.log(JSON.stringify({ ok: true, seeded, afterFulfill, afterMandate, mobile, shots: [desktopShot, mobileShot] }, null, 2));
  client.close();
} finally {
  edge.kill();
  server.close();
  cleanupProfile();
}
