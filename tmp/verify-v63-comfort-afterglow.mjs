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
const webPort = 8813;
const cdpPort = 9263;
const url = `http://127.0.0.1:${webPort}/?v63-comfort-afterglow=1`;
const profile = join(root, "tmp", `edge-v63-comfort-afterglow-${Date.now()}`);
const desktopShot = join(root, "verification-v63-comfort-afterglow-local.png");
const mobileShot = join(root, "verification-v63-comfort-afterglow-mobile-local.png");

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
    state.coins = 18000;
    state.gems = 90;
    const dwelling = state.floors.find((floor) => floor.type === "dwelling");
    while (dwelling.residents.length < 6) {
      addResidentToDwelling(state, dwelling, makeResident(state, "garden"));
    }
    let garden = state.floors.find((floor) => floor.type === "garden");
    if (!garden) {
      garden = createFloor(state, "garden", { name: "Echo Garden", stock: 12, level: 3 });
      state.floors.push(garden);
    }
    garden.status = "open";
    garden.stock = 12;
    garden.stockMax = Math.max(garden.stockMax || 0, 18);
    garden.level = 3;
    const residents = dwelling.residents.map((entry) => getResident(entry.id)).filter(Boolean);
    const worker = residents[0];
    worker.workFloorId = garden.id;
    worker.lifeVisitCooldown = 0;
    garden.workers = [worker.id];
    residents.slice(1).forEach((resident, index) => {
      resident.workFloorId = null;
      resident.expeditionId = null;
      resident.lifeVisit = null;
      resident.lifeVisitCooldown = 0;
      resident.socialPartnerId = null;
      resident.motives.social = 18 + index * 2;
      resident.motives.entertainment = 30;
      resident.motives.energy = 44;
      resident.need = "social";
    });
    state.selectedFloorId = garden.id;
    render(true);
    startComfortSession(garden.id);
    render(true);
    const activeParticipants = comfortParticipants(garden);
    return {
      version: state.version,
      appVersion: [...document.scripts].some((script) => script.src.includes("app.js?v=63")),
      cssVersion: [...document.querySelectorAll('link[rel="stylesheet"]')].some((link) => link.href.includes("overrides.css?v=63")),
      quest: QUEST_DEFS.some((quest) => quest.id === "comfort_echoes" && quest.metric === "comfortEchoesDone"),
      activeSession: isActiveComfortSession(garden),
      activeParticipants: activeParticipants.length,
      panel: Boolean(document.querySelector(".comfort-session-panel.active")),
      floorClass: Boolean(document.querySelector('.floor.comfort-active[data-type="garden"]')),
    };
  })()`);

  assert(active.version >= 18, `Expected save version >= 18, got ${active.version}`);
  assert(active.appVersion, "index.html should load app.js?v=63.");
  assert(active.cssVersion, "index.html should load overrides.css?v=63.");
  assert(active.quest, "comfort_echoes quest should be registered.");
  assert(active.activeSession && active.activeParticipants >= 2, "Comfort session should start with participants.");
  assert(active.panel && active.floorClass, "Active comfort session UI should be visible.");

  const afterglow = await evaluate(client, `(() => {
    const garden = state.floors.find((floor) => floor.type === "garden");
    const home = state.floors.find((floor) => floor.type === "dwelling");
    const rentBefore = home.rentReady || 0;
    garden.comfortSession.remaining = 0.05;
    updateComfortFloor(garden, 1);
    render(true);
    const glow = garden.comfortAfterglow;
    const memoryPeople = allResidents(state).filter((resident) => resident.comfortMemory);
    return {
      hasGlow: Boolean(glow),
      glowLabel: glow?.label || "",
      glowRemaining: Math.ceil(glow?.remaining || 0),
      rentBonus: glow?.rentBonus || 0,
      expeditionBonus: glow?.expeditionBonus || 0,
      echoesDone: state.stats.comfortEchoesDone || 0,
      memoryCount: memoryPeople.length,
      rentAfter: home.rentReady || 0,
      rentBefore,
      layer: Boolean(document.querySelector(".comfort-afterglow-layer")),
      afterglowPanel: Boolean(document.querySelector(".comfort-session-panel.afterglow")),
      afterglowReadout: Boolean(document.querySelector(".comfort-afterglow-readout")),
      floorClass: Boolean(document.querySelector('.floor.comfort-afterglow-active[data-comfort-echo="garden"]')),
      dataPower: Number(document.querySelector(".floor.comfort-afterglow-active")?.dataset.comfortEchoPower || 0),
      memoryChip: Boolean(document.querySelector(".comfort-memory-chip")),
      rosterMemoryCard: Boolean(document.querySelector(".roster-card.comfort-memory-active")),
      statusGlyph: Boolean(document.querySelector('.status-glyph[data-state="comfort-echo"], .room-state-tag[data-state="comfort-echo"]')),
      prepTag: Boolean(document.querySelector(".comfort-prep-tag")),
      prepBonus: comfortExpeditionPrepBonus(state),
      rentEcho: comfortRentEchoBonus(state),
    };
  })()`);

  assert(afterglow.hasGlow && afterglow.glowLabel.includes("余韵"), "Comfort session should leave an afterglow.");
  assert(afterglow.echoesDone >= 1 && afterglow.memoryCount >= 2, "Afterglow should increment stats and mark residents.");
  assert(afterglow.rentAfter > afterglow.rentBefore, "Afterglow should add readable rent feedback to homes.");
  assert(afterglow.layer && afterglow.afterglowPanel && afterglow.afterglowReadout, "Afterglow layer and panel should render.");
  assert(afterglow.floorClass && afterglow.dataPower > 0 && afterglow.statusGlyph, "Floor should expose afterglow class, data, and status glyph.");
  assert(afterglow.memoryChip && afterglow.rosterMemoryCard, "Resident cards and roster should expose comfort memory.");
  assert(afterglow.prepTag && afterglow.prepBonus > 0 && afterglow.rentEcho > 0, "Expedition and rent bonuses should be readable.");

  const expedition = await evaluate(client, `(() => {
    startExpedition("moss");
    render(true);
    const active = state.expeditions[0];
    return {
      started: Boolean(active),
      comfortPrepBonus: active?.comfortPrepBonus || 0,
      comfortPrepLabel: active?.comfortPrepLabel || "",
      activeText: document.querySelector(".expedition-card.active small")?.textContent || "",
      logText: state.logs[0]?.text || "",
    };
  })()`);

  assert(expedition.started, "Expedition should start.");
  assert(expedition.comfortPrepBonus > 0, "Started expedition should retain comfort prep bonus.");
  assert(expedition.activeText.includes("余韵") || expedition.activeText.includes("舒缓"), "Active expedition card should mention comfort prep.");
  assert(expedition.logText.includes("准备"), "Expedition log should mention comfort preparation.");

  await capture(client, desktopShot);

  await client.send("Emulation.setDeviceMetricsOverride", {
    width: 390,
    height: 820,
    deviceScaleFactor: 2,
    mobile: true,
  });
  const mobile = await evaluate(client, `(() => {
    setMobilePanel("roster", true);
    render(true);
    document.querySelector('.panel-section[data-mobile-panel="roster"]')?.scrollIntoView({ block: "start" });
    return {
      dock: Boolean(document.querySelector(".mobile-panel-dock")),
      activeRoster: Boolean(document.querySelector('.panel-section[data-mobile-panel="roster"].mobile-panel-active')),
      memoryChip: Boolean(document.querySelector('.panel-section[data-mobile-panel="roster"] .comfort-memory-chip, .comfort-memory-chip')),
      afterglowPanel: Boolean(document.querySelector(".comfort-session-panel.afterglow")),
    };
  })()`);
  assert(mobile.dock, "Mobile dock should be visible.");
  assert(mobile.activeRoster, "Mobile roster drawer should open.");
  assert(mobile.memoryChip, "Mobile roster should show comfort memory chips.");
  assert(mobile.afterglowPanel, "Mobile layout should keep afterglow panel available.");
  await capture(client, mobileShot);

  const swText = await fetch(`http://127.0.0.1:${webPort}/sw.js`).then((response) => response.text());
  assert(swText.includes("little-depths-v63"), "Service worker should use little-depths-v63.");
  assert(swText.includes("app.js?v=63"), "Service worker should cache app.js?v=63.");
  assert(swText.includes("overrides.css?v=63"), "Service worker should cache overrides.css?v=63.");

  const filteredErrors = errors.filter((entry) => !String(entry).includes("apple-mobile-web-app-capable"));
  assert(filteredErrors.length === 0, `Unexpected browser errors: ${filteredErrors.join(" | ")}`);

  console.log(JSON.stringify({
    ok: true,
    glowLabel: afterglow.glowLabel,
    echoesDone: afterglow.echoesDone,
    memoryCount: afterglow.memoryCount,
    expeditionPrep: expedition.comfortPrepBonus,
    desktopShot,
    mobileShot,
  }, null, 2));

  client.close();
} finally {
  edge.kill();
  server.close();
  cleanupProfile();
}
