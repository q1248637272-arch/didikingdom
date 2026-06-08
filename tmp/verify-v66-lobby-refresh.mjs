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
const webPort = 8816;
const cdpPort = 9266;
const url = `http://127.0.0.1:${webPort}/?v66-lobby-refresh=1`;
const profile = join(root, "tmp", `edge-v66-lobby-refresh-${Date.now()}`);
const desktopShot = join(root, "verification-v66-lobby-refresh-local.png");
const mobileShot = join(root, "verification-v66-lobby-refresh-mobile-local.png");

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
      }, 30000);
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
    state.elevator.upgrades = ELEVATOR_MAX_UPGRADES;
    state.spawnTimer = 999;
    const dwelling = state.floors.find((floor) => floor.type === "dwelling");
    const food = state.floors.find((floor) => floor.type === "food");
    const service = state.floors.find((floor) => floor.type === "service");
    state.queue = [
      { id: 901, kind: "resident", title: "搬家旅人", color: "#6ea8e6", resident: makeResident(state, "food"), targetFloorId: dwelling.id, wish: formatFloorLabel(dwelling.id), lobbyWait: 36 },
      { id: 902, kind: "shopper", title: "赶路商客", color: "#7dbd62", targetFloorId: food.id, wish: formatFloorLabel(food.id), lobbyWait: 24 },
      { id: 903, kind: "vip", title: "金羽贵宾", color: "#f2b84b", targetFloorId: service.id, wish: formatFloorLabel(service.id), effect: "coins", lobbyWait: 8 },
      { id: 904, kind: "shopper", title: "灯笼顾客", color: "#b37bd8", targetFloorId: service.id, wish: formatFloorLabel(service.id), lobbyWait: 3 }
    ];
    state.selectedFloorId = 0;
    updateVisitors(5);
    render(true);
    const pressure = lobbyPressureInfo(state);
    const best = bestLobbyVisitor(state);
    const route = visitorRouteInfo(best, state);
    return {
      version: state.version,
      wait: Math.floor(state.queue[0].lobbyWait),
      pressureTone: pressure.tone,
      pressureLabel: pressure.label,
      bestId: best.id,
      bestTone: route.tone,
      routeText: route.text,
      layer: Boolean(document.querySelector(".lobby-route-layer")),
      signals: document.querySelectorAll(".lobby-route-signal").length,
      summary: document.querySelector(".lobby-route-summary")?.textContent || "",
      tickets: [...document.querySelectorAll(".route-ticket")].map((node) => node.textContent.trim()),
      imageCss: getComputedStyle(document.querySelector('.floor[data-type="lobby"] .room')).getPropertyValue("--room-art"),
      questExists: QUEST_DEFS.some((quest) => quest.id === "lobby_order")
    };
  })()`);
  assert(seeded.version === 21, `expected save version 21, got ${seeded.version}`);
  assert(seeded.wait >= 41, "lobby wait did not advance during updateVisitors");
  assert(["busy", "urgent"].includes(seeded.pressureTone), `expected busy/urgent pressure, got ${seeded.pressureTone}`);
  assert(seeded.bestId === 903, "VIP route should remain the top dispatch priority");
  assert(seeded.layer && seeded.signals >= 3, "lobby route layer/signals did not render");
  assert(seeded.summary.includes(seeded.pressureLabel), "lobby route summary did not include pressure label");
  assert(seeded.tickets.length === 4 && seeded.tickets[0].includes("金羽贵宾"), "route tickets were not priority sorted");
  assert(seeded.imageCss.includes("room-lobby-v3.webp"), "lobby room did not use refreshed v3 art");
  assert(seeded.questExists, "lobby_order quest was not registered");

  const afterClick = await evaluate(client, `(() => {
    document.querySelector(".route-ticket.active").click();
    render(true);
    return {
      queue: state.queue.length,
      routesDone: state.stats.lobbyRoutesDone,
      priorityDone: state.stats.lobbyPriorityDispatchesDone,
      coins: state.coins,
      log: state.logs[0]?.text || "",
      buttonGone: !document.querySelector('.route-ticket.active')
    };
  })()`);
  assert(afterClick.queue === 3, "clicking active route ticket did not dispatch one visitor");
  assert(afterClick.routesDone === 1, "route ticket click did not count as lobby route dispatch");
  assert(afterClick.priorityDone === 1, "priority lobby dispatch did not complete after correct delivery");
  assert(afterClick.coins > 560, "priority dispatch did not produce rewards");
  assert(afterClick.log.includes("候车秩序 +1"), "priority dispatch log did not mention order progress");

  const questReady = await evaluate(client, `(() => {
    state.stats.lobbyPriorityDispatchesDone = 6;
    checkQuests();
    render(true);
    const quest = state.quests.find((entry) => entry.id === "lobby_order");
    return {
      ready: quest?.ready,
      claimed: quest?.claimed,
      button: Boolean(document.querySelector('[data-action="claim-quest"][data-quest-id="lobby_order"]')),
      coins: state.coins,
      gems: state.gems
    };
  })()`);
  assert(questReady.ready === true && questReady.claimed === false, "lobby_order quest did not become ready");
  assert(questReady.button, "lobby_order manual claim button did not render");

  const asset = await fetch(`http://127.0.0.1:${webPort}/assets/art/room-lobby-v3.webp`);
  const assetBytes = Buffer.from(await asset.arrayBuffer());
  assert(asset.ok && assetBytes.length > 40000, "refreshed lobby art did not serve correctly");
  await capture(client, desktopShot);

  await client.send("Emulation.setDeviceMetricsOverride", {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true,
  });
  await evaluate(client, `(() => {
    setMobilePanel("detail", true);
    state.selectedFloorId = 0;
    render(true);
    return new Promise((resolve) => setTimeout(resolve, 500));
  })()`, true);
  const mobile = await evaluate(client, `(() => {
    const dock = document.getElementById("mobilePanelDock");
    const active = document.querySelector(".panel-section.mobile-panel-active");
    const board = document.querySelector(".lobby-route-board");
    const ticket = document.querySelector(".route-ticket");
    return {
      dockVisible: dock && !dock.hidden,
      activeDetail: active?.dataset.mobilePanel === "detail",
      boardVisible: Boolean(board && board.getBoundingClientRect().height > 0),
      ticketFits: ticket ? ticket.scrollWidth <= ticket.clientWidth + 1 : false,
      noDocumentOverflow: document.documentElement.scrollWidth <= window.innerWidth + 1,
      topbarFits: document.querySelector(".topbar").scrollWidth <= document.querySelector(".topbar").clientWidth + 1
    };
  })()`);
  assert(mobile.dockVisible && mobile.activeDetail && mobile.boardVisible, "mobile lobby detail panel did not show route board");
  assert(mobile.ticketFits, "mobile route ticket text overflowed");
  assert(mobile.noDocumentOverflow, "mobile page has horizontal overflow");
  assert(mobile.topbarFits, "mobile topbar overflowed");
  await capture(client, mobileShot);

  assert(errors.length === 0, `browser errors: ${errors.join("; ")}`);
  client.close();
  console.log(JSON.stringify({ ok: true, desktopShot, mobileShot, seeded, afterClick, questReady, mobile }, null, 2));
} finally {
  edge.kill();
  server.close();
  cleanupProfile();
}
