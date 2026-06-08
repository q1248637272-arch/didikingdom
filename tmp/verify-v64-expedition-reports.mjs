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
const webPort = 8814;
const cdpPort = 9264;
const url = `http://127.0.0.1:${webPort}/?v64-expedition-reports=1`;
const profile = join(root, "tmp", `edge-v64-expedition-reports-${Date.now()}`);
const desktopShot = join(root, "verification-v64-expedition-reports-local.png");
const mobileShot = join(root, "verification-v64-expedition-reports-mobile-local.png");

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

  const active = await evaluate(client, `(() => {
    state = makeNewGame();
    state.coins = 16000;
    state.gems = 90;
    const dwelling = state.floors.find((floor) => floor.type === "dwelling");
    while (dwelling.residents.length < 4) {
      addResidentToDwelling(state, dwelling, makeResident(state, "training"));
    }
    dwelling.level = 4;
    dwelling.residents.forEach((entry) => {
      const resident = getResident(entry.id);
      resident.workFloorId = null;
      resident.expeditionId = null;
      resident.lifeVisit = null;
      resident.lifeVisitCooldown = 0;
    });
    state.selectedFloorId = dwelling.id;
    render(true);
    startDwellingExpedition(dwelling.id);
    const expedition = state.expeditions[0];
    expedition.remaining = expedition.total * 0.42;
    updateExpeditionWaymarks(expedition, state, false);
    render(true);
    const activeFloor = document.querySelector(".floor.expedition-waymark-active[data-expedition-waymarks][data-expedition-stage]");
    return {
      version: state.version,
      appVersion: [...document.scripts].some((script) => script.src.includes("app.js?v=64")),
      cssVersion: [...document.querySelectorAll('link[rel="stylesheet"]')].some((link) => link.href.includes("overrides.css?v=64")),
      quest: QUEST_DEFS.some((quest) => quest.id === "expedition_reports" && quest.metric === "expeditionReportsDone"),
      activeExpedition: state.expeditions.length,
      waymarksDone: state.stats.expeditionWaymarksDone,
      activeFloor: Boolean(activeFloor),
      waymarkLayer: Boolean(document.querySelector(".expedition-waymark-layer .expedition-waymark")),
      activeCard: Boolean(document.querySelector(".expedition-card.active.expedition-report-active[data-stage]")),
      activePanel: Boolean(document.querySelector(".expedition-report-panel .expedition-report-card.active")),
      residentChip: Boolean(document.querySelector(".resident-card.expedition-report-active .expedition-report-chip.active")),
    };
  })()`);

  assert(active.version >= 19, `Expected save version >= 19, got ${active.version}`);
  assert(active.appVersion, "index.html should load app.js?v=64.");
  assert(active.cssVersion, "index.html should load overrides.css?v=64.");
  assert(active.quest, "expedition_reports quest should be registered.");
  assert(active.activeExpedition === 1, "A dwelling expedition should start.");
  assert(active.waymarksDone >= 1, "Expedition waymarks should be recorded.");
  assert(active.activeFloor && active.waymarkLayer, "Dwelling map should expose active expedition waymarks.");
  assert(active.activeCard && active.activePanel && active.residentChip, "Active expedition UI should expose cards, panel, and resident chip.");

  const completed = await evaluate(client, `(() => {
    const expedition = state.expeditions[0];
    expedition.rewardGems = 1;
    expedition.relicChance = 1;
    completeExpedition(state, expedition.id, true);
    render(true);
    return {
      activeExpeditions: state.expeditions.length,
      reportsDone: state.stats.expeditionReportsDone,
      reportCount: state.expeditionReports.length,
      reportBonus: expeditionReportBonus(state),
      reportPanel: Boolean(document.querySelector(".expedition-report-panel .expedition-report-card:not(.active)")),
      reportChip: Boolean(document.querySelector(".resident-card.expedition-report-active .expedition-report-chip:not(.active), .roster-card.expedition-report-active .expedition-report-chip:not(.active)")),
      relicPieces: state.stats.relicPieces,
      logHasReport: state.logs.some((entry) => entry.text.includes("回城报告")),
    };
  })()`);

  assert(completed.activeExpeditions === 0, "Expedition should complete.");
  assert(completed.reportsDone >= 1 && completed.reportCount >= 1, "Completion should create an expedition report.");
  assert(completed.reportBonus > 0, "Reports should feed route archive bonus.");
  assert(completed.reportPanel && completed.reportChip, "Completed reports should render in dwelling and resident UI.");
  assert(completed.relicPieces >= 1, "Forced relic chance should award a relic piece.");
  assert(completed.logHasReport, "Completion log should mention the report.");

  await capture(client, desktopShot);

  await client.send("Emulation.setDeviceMetricsOverride", {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true,
  });
  await evaluate(client, `(() => {
    setMobilePanel("expeditions");
    render(true);
    return new Promise((resolve) => setTimeout(resolve, 250));
  })()`, true);
  const mobile = await evaluate(client, `(() => ({
    dock: Boolean(document.querySelector(".mobile-panel-dock")),
    activeTab: Boolean(document.querySelector('.mobile-panel-tab.active[data-mobile-panel-target="expeditions"]')),
    expeditionPanel: Boolean(document.querySelector('[data-mobile-panel="expeditions"].mobile-panel-active, [data-mobile-panel="expeditions"].active')),
    reportTag: Boolean(document.querySelector(".expedition-report-tag, .expedition-report-chip")),
    errors: 0,
  }))()`);
  assert(mobile.dock && mobile.activeTab, "Mobile expedition drawer should be selectable.");
  assert(mobile.reportTag, "Mobile view should expose report-related expedition UI.");
  await capture(client, mobileShot);

  assert(errors.length === 0, `Runtime errors: ${errors.join("; ")}`);
  client.close();
  console.log(JSON.stringify({ active, completed, mobile, desktopShot, mobileShot }, null, 2));
} finally {
  edge.kill();
  server.close();
  cleanupProfile();
}
