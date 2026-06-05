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
const webPort = 8804;
const cdpPort = 9254;
const url = `http://127.0.0.1:${webPort}/?v54-lightweight=1`;
const profile = join(root, "tmp", `edge-v54-lightweight-${Date.now()}`);
const desktopShot = join(root, "verification-v54-lightweight-local.png");
const mobileShot = join(root, "verification-v54-lightweight-mobile-local.png");

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

const obsoleteAssets = [
  "room-lobby.webp",
  "room-dwelling.webp",
  "room-dwelling-v2.webp",
  "room-food.webp",
  "room-craft.webp",
  "room-entertainment.webp",
  "room-market.webp",
  "room-library.webp",
  "room-garden.webp",
  "room-bathhouse.webp",
  "person-performer.png",
];

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
  const requested = [];
  client.on("Runtime.exceptionThrown", (event) => errors.push(event.exceptionDetails?.text || "runtime exception"));
  client.on("Log.entryAdded", (event) => {
    if (event.entry?.level === "error") errors.push(event.entry.text);
  });
  client.on("Network.requestWillBeSent", (event) => requested.push(event.request?.url || ""));

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
    const dwelling = state.floors.find((floor) => floor.type === "dwelling");
    while (dwelling.residents.length < 8) {
      addResidentToDwelling(state, dwelling, makeResident(state, dwelling.residents.length % 2 ? "bathhouse" : "garden"));
    }
    let garden = state.floors.find((floor) => floor.type === "garden");
    let bathhouse = state.floors.find((floor) => floor.type === "bathhouse");
    if (!garden) {
      garden = createFloor(state, "garden", { name: "Garden Check", stock: 12, level: 2 });
      state.floors.push(garden);
    }
    if (!bathhouse) {
      bathhouse = createFloor(state, "bathhouse", { name: "Bath Check", stock: 12, level: 2 });
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
      person.motives = index < 4
        ? { food: 34, entertainment: 24, social: 12 + index * 3, energy: 54 }
        : { food: 62, entertainment: 38, social: 36, energy: 12 + (index - 4) * 4 };
      person.need = index < 4 ? "social" : "energy";
    });

    [residents[0], residents[1]].forEach((person) => {
      person.workFloorId = garden.id;
      garden.workers.push(person.id);
    });
    [residents[4], residents[5]].forEach((person) => {
      person.workFloorId = bathhouse.id;
      bathhouse.workers.push(person.id);
    });

    const before = state.stats.comfortSessionsDone || 0;
    state.selectedFloorId = garden.id;
    render(true);
    document.querySelector('#floorDetail [data-action="comfort-session"]')?.click();
    state.selectedFloorId = bathhouse.id;
    render(true);
    document.querySelector('#floorDetail [data-action="comfort-session"]')?.click();
    updatePersonActivities(1.4);
    render(true);
    return {
      version: state.version,
      before,
      afterBoth: state.stats.comfortSessionsDone || 0,
      personArt: PERSON_ART.performer,
      gardenActive: isActiveComfortSession(garden),
      bathhouseActive: isActiveComfortSession(bathhouse),
      gardenParticipants: comfortParticipants(garden).length,
      bathhouseParticipants: comfortParticipants(bathhouse).length,
    };
  })()`);

  await evaluate(client, "new Promise((resolve) => setTimeout(resolve, 900))", true);
  const desktop = await evaluate(client, `(async () => {
    const swText = await fetch('sw.js', { cache: 'no-store' }).then((response) => response.text());
    const cssText = await fetch('overrides.css?v=54', { cache: 'no-store' }).then((response) => response.text());
    const performer = await fetch('assets/art/person-performer.webp', { cache: 'no-store' });
    const gardenRoom = document.querySelector('.floor[data-type="garden"] .room');
    const bathhouseRoom = document.querySelector('.floor[data-type="bathhouse"] .room');
    return {
      appScript: Boolean(document.querySelector('script[src="app.js?v=54"]')),
      baseCss: Boolean(document.querySelector('link[href="styles.css?v=54"]')),
      overrideCss: Boolean(document.querySelector('link[href="overrides.css?v=54"]')),
      swV54: swText.includes('little-depths-v54') && swText.includes('person-performer.webp') && !swText.includes('person-performer.png'),
      cssV54: cssText.includes('room-garden-v2.webp') && cssText.includes('room-bathhouse-v2.webp') && cssText.includes('comfort-session-panel'),
      gardenArt: getComputedStyle(gardenRoom).getPropertyValue('--room-art').includes('room-garden-v2.webp'),
      bathhouseArt: getComputedStyle(bathhouseRoom).getPropertyValue('--room-art').includes('room-bathhouse-v2.webp'),
      performerOk: performer.ok && (performer.headers.get('content-type') || '').includes('image/webp'),
      activeFloors: document.querySelectorAll('.floor.comfort-active').length,
      activePanels: document.querySelectorAll('.comfort-session-panel.active').length,
      needBadges: document.querySelectorAll('.need-badge').length,
      socialPairs: document.querySelectorAll('.social-pair').length,
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
      appScript: Boolean(document.querySelector('script[src="app.js?v=54"]')),
      overrideCss: Boolean(document.querySelector('link[href="overrides.css?v=54"]')),
      dockVisible: Boolean(dock) && getComputedStyle(dock).display !== 'none' && !dock.hidden,
      dockButtons: dock ? dock.querySelectorAll('[data-mobile-panel-target]').length : 0,
      layoutClass: document.body.classList.contains('mobile-panel-layout'),
      openClass: document.body.classList.contains('mobile-panel-open'),
      detailActiveBeforeClick: detail?.classList.contains('mobile-panel-active') || false,
      rosterActiveAfterClick: roster?.classList.contains('mobile-panel-active') || false,
      visiblePanelCount: [...document.querySelectorAll('.side-panel .panel-section:not(.elevator-card)')]
        .filter((node) => getComputedStyle(node).display !== 'none').length,
      bodyWidth: Math.round(document.body.getBoundingClientRect().width || 0),
      kingdomWidth: Math.round(document.querySelector('.kingdom')?.getBoundingClientRect().width || 0),
      needBadges: document.querySelectorAll('.need-badge').length,
    };
  })()`);
  await capture(client, mobileShot);

  const obsoleteRequested = requested.filter((requestUrl) => obsoleteAssets.some((asset) => requestUrl.includes(`/assets/art/${asset}`)));
  const oldPerformerMissing = !existsSync(join(root, "assets/art/person-performer.png"))
    && !existsSync(join(root, "dist/assets/art/person-performer.png"));
  const allowedErrors = errors.filter((entry) => !entry.includes("apple-mobile-web-app-capable"));
  const assertions = {
    loadedV54: desktop.appScript && desktop.baseCss && desktop.overrideCss && mobile.appScript && mobile.overrideCss,
    saveVersion: seeded.version === 9,
    performerWebp: seeded.personArt === "assets/art/person-performer.webp" && desktop.performerOk && oldPerformerMissing,
    serviceWorkerSlim: desktop.swV54,
    currentRoomArt: desktop.cssV54 && desktop.gardenArt && desktop.bathhouseArt,
    comfortSessionsStillWork: seeded.afterBoth >= seeded.before + 2 && seeded.gardenActive && seeded.bathhouseActive,
    comfortUiVisible: desktop.activeFloors >= 2 && desktop.activePanels >= 1 && desktop.needBadges >= 4,
    mobileDrawer: mobile.dockVisible && mobile.dockButtons >= 8 && mobile.layoutClass && mobile.openClass,
    mobileTabSwitch: mobile.detailActiveBeforeClick && mobile.rosterActiveAfterClick && mobile.visiblePanelCount === 1,
    mobileLayout: mobile.kingdomWidth > 0 && mobile.bodyWidth > 0 && mobile.needBadges >= 1,
    noObsoleteAssetRequests: obsoleteRequested.length === 0,
    noRuntimeErrors: allowedErrors.length === 0,
  };
  const failed = Object.entries(assertions).filter(([, value]) => !value);
  const summary = { url, desktopShot, mobileShot, seeded, desktop, mobile, oldPerformerMissing, obsoleteRequested, assertions, errors };
  console.log(JSON.stringify(summary, null, 2));
  if (failed.length) {
    throw new Error(`v54 verification failed: ${failed.map(([key]) => key).join(", ")}`);
  }

  client.close();
  edge.kill();
  await new Promise((resolveClose) => server.close(resolveClose));
  cleanupProfile();
} catch (error) {
  edge.kill();
  await new Promise((resolveClose) => server.close(resolveClose));
  cleanupProfile();
  console.error(error);
  process.exit(1);
}
