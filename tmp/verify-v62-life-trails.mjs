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
const webPort = 8812;
const cdpPort = 9262;
const url = `http://127.0.0.1:${webPort}/?v62-life-trails=1`;
const profile = join(root, "tmp", `edge-v62-life-trails-${Date.now()}`);
const desktopShot = join(root, "verification-v62-life-trails-local.png");
const mobileShot = join(root, "verification-v62-life-trails-mobile-local.png");

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

  const active = await evaluate(client, `(() => {
    state = makeNewGame();
    state.coins = 16000;
    state.gems = 80;
    const dwelling = state.floors.find((floor) => floor.type === "dwelling");
    while (dwelling.residents.length < 4) {
      addResidentToDwelling(state, dwelling, makeResident(state, "garden"));
    }
    let garden = state.floors.find((floor) => floor.type === "garden");
    if (!garden) {
      garden = createFloor(state, "garden", { name: "Trail Garden", stock: 8, level: 2 });
      state.floors.push(garden);
    }
    garden.status = "open";
    garden.stock = 8;
    garden.stockMax = Math.max(garden.stockMax || 0, 16);
    garden.level = 2;
    garden.workers = [];
    const resident = dwelling.residents.map((entry) => getResident(entry.id)).filter(Boolean).find((entry) => !entry.workFloorId) || getResident(dwelling.residents[0].id);
    resident.workFloorId = null;
    resident.motives.social = 18;
    resident.motives.entertainment = 42;
    resident.need = "social";
    state.selectedFloorId = dwelling.id;
    render(true);
    startLifeVisit(resident, garden, "social", { duration: 24, allowCompanion: false });
    render(true);
    const originEl = document.querySelector('.floor.life-trail-active[data-type="dwelling"]');
    const targetEl = document.querySelector('.floor.life-trail-active[data-type="garden"]');
    return {
      version: state.version,
      appVersion: [...document.scripts].some((script) => script.src.includes("app.js?v=62")),
      cssVersion: [...document.querySelectorAll('link[rel="stylesheet"]')].some((link) => link.href.includes("overrides.css?v=62")),
      quest: QUEST_DEFS.some((quest) => quest.id === "life_trails" && quest.metric === "lifeStoriesDone"),
      activeVisit: Boolean(resident.lifeVisit),
      originFloorId: resident.lifeVisit?.originFloorId,
      trailId: resident.lifeVisit?.trailId || "",
      layerCount: document.querySelectorAll(".life-trail-route").length,
      panel: Boolean(document.querySelector(".life-story-panel")),
      routeLine: Boolean(document.querySelector(".life-story-route")),
      activeChip: Boolean(document.querySelector(".life-trail-chip.active")),
      originClass: Boolean(originEl),
      targetClass: Boolean(targetEl),
      originDataCount: Number(originEl?.dataset.lifeTrailCount || 0),
      targetNeed: targetEl?.dataset.lifeTrailNeed || "",
    };
  })()`);

  assert(active.version >= 17, `Expected save version >= 17, got ${active.version}`);
  assert(active.appVersion, "index.html should load app.js?v=62.");
  assert(active.cssVersion, "index.html should load overrides.css?v=62.");
  assert(active.quest, "life_trails quest should be registered.");
  assert(active.activeVisit && active.originFloorId !== null && active.trailId, "Life visit should store origin and trail metadata.");
  assert(active.layerCount >= 2, "Origin and destination floors should render life trail route overlays.");
  assert(active.panel, "Detail panel should expose active life trail UI.");
  assert(active.routeLine, "Detail panel should expose active life trail route text.");
  assert(active.activeChip, "Resident cards should expose active life trail chips.");
  assert(active.originClass && active.targetClass && active.originDataCount > 0, "Floors should expose life-trail-active class and data attributes.");
  assert(active.targetNeed === "social", "Destination floor should expose primary life trail need.");

  await capture(client, desktopShot);

  const completed = await evaluate(client, `(() => {
    const resident = allResidents(state).find((entry) => entry.lifeVisit?.trailId);
    resident.lifeVisit.remaining = 0.05;
    resident.motives.social = 93;
    updateLifeVisits(1);
    render(true);
    return {
      activeVisit: Boolean(resident.lifeVisit),
      storiesDone: state.stats.lifeStoriesDone || 0,
      storyCount: state.lifeStories?.length || 0,
      storyCard: Boolean(document.querySelector(".life-story-card")),
      storyPanel: Boolean(document.querySelector(".life-story-panel")),
      inactiveChip: Boolean(document.querySelector(".life-trail-chip:not(.active)")),
      storyText: state.lifeStories?.[0]?.detail || "",
      happiness: state.happiness,
    };
  })()`);

  assert(!completed.activeVisit, "Life visit should complete and clear from resident.");
  assert(completed.storiesDone >= 1 && completed.storyCount >= 1, "Completed visit should create a life story and increment stats.");
  assert(completed.storyCard && completed.storyPanel && completed.inactiveChip, "Completed story should render in detail and roster UI.");
  assert(completed.storyText.includes("→"), "Life story should preserve a readable route.");
  assert(completed.happiness > 72, "Completed life story should provide a small happiness feedback.");

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
      activeResidents: Boolean(document.querySelector('.panel-section[data-mobile-panel="roster"].mobile-panel-active')),
      chip: Boolean(document.querySelector('.panel-section[data-mobile-panel="roster"] .life-trail-chip, .life-trail-chip')),
      card: Boolean(document.querySelector('.panel-section[data-mobile-panel="roster"] .roster-card.life-story-active, .life-story-card')),
    };
  })()`);
  assert(mobile.dock, "Mobile dock should be visible.");
  assert(mobile.activeResidents, "Mobile residents drawer should open.");
  assert(mobile.chip, "Mobile residents drawer should show life trail chips.");
  assert(mobile.card, "Mobile layout should keep story/roster cards available.");
  await capture(client, mobileShot);

  const swText = await fetch(`http://127.0.0.1:${webPort}/sw.js`).then((response) => response.text());
  assert(swText.includes("little-depths-v62"), "Service worker should use little-depths-v62.");
  assert(swText.includes("app.js?v=62"), "Service worker should cache app.js?v=62.");
  assert(swText.includes("overrides.css?v=62"), "Service worker should cache overrides.css?v=62.");

  const filteredErrors = errors.filter((entry) => !String(entry).includes("apple-mobile-web-app-capable"));
  assert(filteredErrors.length === 0, `Unexpected browser errors: ${filteredErrors.join(" | ")}`);

  console.log(JSON.stringify({
    ok: true,
    layerCount: active.layerCount,
    storiesDone: completed.storiesDone,
    storyText: completed.storyText,
    desktopShot,
    mobileShot,
  }, null, 2));

  client.close();
} finally {
  edge.kill();
  server.close();
  cleanupProfile();
}
