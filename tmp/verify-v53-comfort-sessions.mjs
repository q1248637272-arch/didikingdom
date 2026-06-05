import { spawn } from "node:child_process";
import { createReadStream, existsSync, mkdirSync, statSync, writeFileSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, resolve } from "node:path";

const root = resolve("C:/Users/Mystic/Documents/Codex/2026-05-30/new-chat-4");
const edgeCandidates = [
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
];
const edgePath = edgeCandidates.find((candidate) => existsSync(candidate));
const webPort = 8798;
const cdpPort = 9253;
const url = `http://127.0.0.1:${webPort}/?v53-local=1`;
const profile = join(root, "tmp", `edge-v53-comfort-${Date.now()}`);
const desktopShot = join(root, "verification-v53-comfort-sessions-local.png");
const mobileShot = join(root, "verification-v53-comfort-sessions-mobile-local.png");

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
    const dwelling = state.floors.find((floor) => floor.type === "dwelling");
    while (dwelling.residents.length < 10) {
      addResidentToDwelling(state, dwelling, makeResident(state, dwelling.residents.length % 2 ? "bathhouse" : "garden"));
    }

    let garden = state.floors.find((floor) => floor.type === "garden");
    let bathhouse = state.floors.find((floor) => floor.type === "bathhouse");
    if (!garden) {
      garden = createFloor(state, "garden", { name: "星露温室", stock: 12, level: 2 });
      state.floors.push(garden);
    }
    if (!bathhouse) {
      bathhouse = createFloor(state, "bathhouse", { name: "月盐浴场", stock: 12, level: 2 });
      state.floors.push(bathhouse);
    }
    garden.stock = 12;
    garden.stockMax = Math.max(garden.stockMax || 0, 20);
    garden.level = 2;
    garden.workers = [];
    garden.comfortCooldown = 0;
    garden.comfortSession = null;
    bathhouse.stock = 12;
    bathhouse.stockMax = Math.max(bathhouse.stockMax || 0, 24);
    bathhouse.level = 2;
    bathhouse.workers = [];
    bathhouse.comfortCooldown = 0;
    bathhouse.comfortSession = null;

    const residents = dwelling.residents.map((entry) => getResident(entry.id)).filter(Boolean);
    residents.forEach((person, index) => {
      ensurePersonLife(person);
      endLifeVisit(person);
      clearSocialScene(person);
      person.expeditionId = null;
      person.workFloorId = null;
      person.lifeVisitCooldown = 0;
      person.routineCooldown = 0;
      person.socialCooldown = 0;
      person.needTimer = 0;
      person.favoriteTypes = index % 2 ? ["bathhouse", "garden", "service"] : ["garden", "bathhouse", "food"];
      person.motives = index < 5
        ? { food: 34, entertainment: 24, social: 12 + index * 3, energy: 54 }
        : { food: 62, entertainment: 38, social: 36, energy: 10 + (index - 5) * 4 };
      person.need = index < 5 ? "social" : "energy";
    });

    [residents[0], residents[1]].forEach((person) => {
      person.workFloorId = garden.id;
      garden.workers.push(person.id);
    });
    [residents[5], residents[6]].forEach((person) => {
      person.workFloorId = bathhouse.id;
      bathhouse.workers.push(person.id);
    });
    residents[2].relationships[String(residents[3].id)] = { score: 76, interactions: 5, lastScene: "chat" };
    residents[3].relationships[String(residents[2].id)] = { score: 76, interactions: 5, lastScene: "chat" };
    residents[7].relationships[String(residents[8].id)] = { score: 72, interactions: 5, lastScene: "rest" };
    residents[8].relationships[String(residents[7].id)] = { score: 72, interactions: 5, lastScene: "rest" };

    state.stats.gardenFloorsBuilt = Math.max(state.stats.gardenFloorsBuilt || 0, 1);
    state.stats.bathhouseFloorsBuilt = Math.max(state.stats.bathhouseFloorsBuilt || 0, 1);
    const before = state.stats.comfortSessionsDone || 0;

    state.selectedFloorId = garden.id;
    render(true);
    const gardenButton = document.querySelector('#floorDetail [data-action="comfort-session"]');
    gardenButton?.click();
    const afterGarden = state.stats.comfortSessionsDone || 0;

    state.selectedFloorId = bathhouse.id;
    render(true);
    const bathhouseButton = document.querySelector('#floorDetail [data-action="comfort-session"]');
    bathhouseButton?.click();

    updatePersonActivities(1.4);
    render(true);
    saveGame(false);

    const gardenParticipants = comfortParticipants(garden);
    const bathhouseParticipants = comfortParticipants(bathhouse);
    return {
      version: state.version,
      before,
      afterGarden,
      afterBoth: state.stats.comfortSessionsDone || 0,
      garden: {
        id: garden.id,
        stock: garden.stock,
        cooldown: Math.ceil(garden.comfortCooldown || 0),
        active: isActiveComfortSession(garden),
        remaining: Math.ceil(garden.comfortSession?.remaining || 0),
        participants: gardenParticipants.map((person) => ({
          id: person.id,
          need: person.need,
          visitReason: person.lifeVisit?.reason,
          floorId: person.lifeVisit?.floorId,
          socialPartnerId: person.socialPartnerId || null,
        })),
      },
      bathhouse: {
        id: bathhouse.id,
        stock: bathhouse.stock,
        cooldown: Math.ceil(bathhouse.comfortCooldown || 0),
        active: isActiveComfortSession(bathhouse),
        remaining: Math.ceil(bathhouse.comfortSession?.remaining || 0),
        participants: bathhouseParticipants.map((person) => ({
          id: person.id,
          need: person.need,
          visitReason: person.lifeVisit?.reason,
          floorId: person.lifeVisit?.floorId,
          socialPartnerId: person.socialPartnerId || null,
        })),
      },
    };
  })()`);

  await evaluate(client, "new Promise((resolve) => setTimeout(resolve, 900))", true);
  const desktop = await evaluate(client, `(async () => {
    const swText = await fetch('sw.js', { cache: 'no-store' }).then((response) => response.text());
    const cssText = await fetch('overrides.css?v=53', { cache: 'no-store' }).then((response) => response.text());
    const garden = state.floors.find((floor) => floor.type === 'garden');
    const bathhouse = state.floors.find((floor) => floor.type === 'bathhouse');
    const gardenRoom = document.querySelector('.floor[data-type="garden"] .room');
    const bathhouseRoom = document.querySelector('.floor[data-type="bathhouse"] .room');
    return {
      appScript: Boolean(document.querySelector('script[src="app.js?v=53"]')),
      css: Boolean(document.querySelector('link[href="overrides.css?v=53"]')),
      swV53: swText.includes('little-depths-v53') && swText.includes('room-garden-v2.webp') && swText.includes('room-bathhouse-v2.webp'),
      cssV53: cssText.includes('room-garden-v2.webp') && cssText.includes('room-bathhouse-v2.webp') && cssText.includes('comfort-session-panel'),
      gardenArt: getComputedStyle(gardenRoom).getPropertyValue('--room-art').includes('room-garden-v2.webp'),
      bathhouseArt: getComputedStyle(bathhouseRoom).getPropertyValue('--room-art').includes('room-bathhouse-v2.webp'),
      activeFloors: document.querySelectorAll('.floor.comfort-active').length,
      activePanels: document.querySelectorAll('.comfort-session-panel.active').length,
      comfortTags: document.querySelectorAll('[data-state="comfort"]').length,
      lifeVisitors: document.querySelectorAll('.life-visitor').length,
      socialPairs: document.querySelectorAll('.social-pair').length,
      needBadges: document.querySelectorAll('.need-badge').length,
      gardenParticipantCount: comfortParticipants(garden).length,
      bathhouseParticipantCount: comfortParticipants(bathhouse).length,
    };
  })()`, true);
  await capture(client, desktopShot);

  await client.send("Emulation.setDeviceMetricsOverride", {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true,
  });
  const mobileReload = client.waitFor("Page.loadEventFired");
  await client.send("Page.reload", { ignoreCache: true });
  await mobileReload;
  await evaluate(client, "new Promise((resolve) => setTimeout(resolve, 900))", true);
  const mobile = await evaluate(client, `(() => {
    const dock = document.querySelector('#mobilePanelDock');
    const detail = document.querySelector('[data-mobile-panel="detail"]');
    const rosterButton = document.querySelector('[data-mobile-panel-target="roster"]');
    rosterButton?.click();
    const roster = document.querySelector('[data-mobile-panel="roster"]');
    return {
      appScript: Boolean(document.querySelector('script[src="app.js?v=53"]')),
      css: Boolean(document.querySelector('link[href="overrides.css?v=53"]')),
      dockVisible: Boolean(dock) && getComputedStyle(dock).display !== 'none' && !dock.hidden,
      dockButtons: dock ? dock.querySelectorAll('[data-mobile-panel-target]').length : 0,
      layoutClass: document.body.classList.contains('mobile-panel-layout'),
      openClass: document.body.classList.contains('mobile-panel-open'),
      detailActiveBeforeClick: detail?.classList.contains('mobile-panel-active') || false,
      rosterActiveAfterClick: roster?.classList.contains('mobile-panel-active') || false,
      visiblePanelCount: [...document.querySelectorAll('.side-panel .panel-section:not(.elevator-card)')]
        .filter((node) => getComputedStyle(node).display !== 'none').length,
      activeFloors: document.querySelectorAll('.floor.comfort-active').length,
      activePanels: document.querySelectorAll('.comfort-session-panel.active').length,
      needBadges: document.querySelectorAll('.need-badge').length,
      bodyWidth: Math.round(document.body.getBoundingClientRect().width || 0),
      kingdomWidth: Math.round(document.querySelector('.kingdom')?.getBoundingClientRect().width || 0),
    };
  })()`);
  await capture(client, mobileShot);

  client.close();
  edge.kill();
  await new Promise((resolveClose) => server.close(resolveClose));

  const assertions = {
    loadedV53: desktop.appScript && desktop.css && desktop.swV53 && desktop.cssV53 && mobile.appScript && mobile.css,
    saveVersion: seeded.version === 9,
    sessionsStarted: seeded.afterBoth >= seeded.before + 2 && seeded.afterGarden >= seeded.before + 1,
    gardenSessionActive: seeded.garden.active && seeded.garden.participants.length >= 2 && seeded.garden.stock < 12 && seeded.garden.cooldown > 0,
    bathhouseSessionActive: seeded.bathhouse.active && seeded.bathhouse.participants.length >= 2 && seeded.bathhouse.stock < 12 && seeded.bathhouse.cooldown > 0,
    participantsVisiting: [...seeded.garden.participants, ...seeded.bathhouse.participants].every((entry) => entry.visitReason === "comfort"),
    visibleComfortUi: desktop.activeFloors >= 2 && desktop.activePanels >= 1 && desktop.comfortTags >= 2,
    visibleLifeMotion: desktop.lifeVisitors >= 4 && desktop.needBadges >= 6 && desktop.socialPairs >= 1,
    roomArt: desktop.gardenArt && desktop.bathhouseArt,
    mobileDrawer: mobile.dockVisible && mobile.dockButtons >= 8 && mobile.layoutClass && mobile.openClass,
    mobileTabSwitch: mobile.detailActiveBeforeClick && mobile.rosterActiveAfterClick && mobile.visiblePanelCount === 1,
    mobileComfortVisible: mobile.activeFloors >= 1 && mobile.needBadges >= 4 && mobile.kingdomWidth > 0 && mobile.bodyWidth > 0,
    noRuntimeErrors: errors.length === 0 || errors.every((entry) => entry.includes("apple-mobile-web-app-capable")),
  };
  const failed = Object.entries(assertions).filter(([, value]) => !value);
  const summary = { url, desktopShot, mobileShot, seeded, desktop, mobile, assertions, errors };
  console.log(JSON.stringify(summary, null, 2));
  if (failed.length) {
    throw new Error(`v53 verification failed: ${failed.map(([key]) => key).join(", ")}`);
  }
} catch (error) {
  edge.kill();
  await new Promise((resolveClose) => server.close(resolveClose));
  console.error(error);
  process.exit(1);
}
