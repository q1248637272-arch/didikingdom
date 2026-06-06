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
const webPort = 8807;
const cdpPort = 9257;
const url = `http://127.0.0.1:${webPort}/?v57-food-rush=1`;
const profile = join(root, "tmp", `edge-v57-food-rush-${Date.now()}`);
const desktopShot = join(root, "verification-v57-food-rush-local.png");
const mobileShot = join(root, "verification-v57-food-rush-mobile-local.png");

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
    const dwelling = state.floors.find((floor) => floor.type === "dwelling");
    while (dwelling.residents.length < 10) {
      addResidentToDwelling(state, dwelling, makeResident(state, dwelling.residents.length % 2 ? "food" : "service"));
    }

    let floor = state.floors.find((entry) => entry.type === "food");
    if (!floor) {
      floor = createFloor(state, "food", { name: "Food Rush Check", stock: 18, level: 3 });
      state.floors.push(floor);
    }
    floor.stock = 18;
    floor.stockMax = Math.max(floor.stockMax || 0, 28);
    floor.level = 3;
    floor.workers = [];
    floor.production = null;
    floor.foodRushCooldown = 0;
    floor.foodRush = null;

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
      person.favoriteTypes = ["food", "market", "festival"];
      person.dreamType = index < 3 ? "food" : index === 3 ? "service" : person.dreamType;
      person.motives = index < 2
        ? { food: 68, entertainment: 70, social: 62, energy: 72 }
        : { food: 8 + index * 4, entertainment: 58, social: 14 + index * 4, energy: 72 };
      person.need = index % 2 ? "social" : "food";
      person.activity = "stroll";
      person.activityTimer = 0;
      assignPersonMotion(person, "dwelling", "stroll");
    });

    [residents[0], residents[1]].forEach((person, index) => {
      person.workFloorId = floor.id;
      person.dreamType = index === 0 ? "food" : "service";
      floor.workers.push(person.id);
    });
    residents.slice(2, 8).forEach((person, index) => {
      const worker = residents[index % 2];
      person.relationships[String(worker.id)] = { score: 54 + index * 3, interactions: 3, lastScene: "meal" };
      worker.relationships[String(person.id)] = { score: 54 + index * 3, interactions: 3, lastScene: "meal" };
    });

    state.stats.foodFloorsBuilt = Math.max(state.stats.foodFloorsBuilt || 0, 1);
    const beforeRushes = state.stats.foodRushesDone || 0;
    const beforeServings = state.stats.foodServingsDone || 0;
    const stockBefore = floor.stock;

    state.selectedFloorId = floor.id;
    render(true);
    const button = document.querySelector('#floorDetail [data-action="food-rush"]');
    const buttonDisabledBefore = button?.disabled || false;
    button?.click();

    updateTimers(8.6);
    updatePersonActivities(2.4);
    render(true);
    saveGame(false);

    const diners = foodRushParticipants(floor);
    return {
      version: state.version,
      beforeRushes,
      afterRushes: state.stats.foodRushesDone || 0,
      beforeServings,
      afterServings: state.stats.foodServingsDone || 0,
      buttonDisabledBefore,
      floor: {
        id: floor.id,
        stockBefore,
        stockAfter: floor.stock,
        cooldown: Math.ceil(floor.foodRushCooldown || 0),
        active: isActiveFoodRush(floor),
        remaining: Math.ceil(floor.foodRush?.remaining || 0),
        pace: floor.foodRush?.pace || "",
        heat: Math.round(floor.foodRush?.heat || 0),
        served: floor.foodRush?.served || 0,
        targetServings: floor.foodRush?.targetServings || 0,
        earned: floor.foodRush?.earned || 0,
        participantIds: floor.foodRush?.participantIds || [],
        diners: diners.map((person) => ({
          id: person.id,
          need: person.need,
          activity: person.activity,
          visitReason: person.lifeVisit?.reason,
          floorId: person.lifeVisit?.floorId,
          sessionId: person.lifeVisit?.sessionId || "",
          socialPartnerId: person.socialPartnerId || null,
        })),
        workers: floor.workers.map((id) => getResident(id)).filter(Boolean).map((person) => ({
          id: person.id,
          need: person.need,
          activity: person.activity,
          socialPartnerId: person.socialPartnerId || null,
        })),
      },
    };
  })()`);

  await evaluate(client, "new Promise((resolve) => setTimeout(resolve, 900))", true);
  const desktop = await evaluate(client, `(async () => {
    const swText = await fetch('sw.js', { cache: 'no-store' }).then((response) => response.text());
    const cssText = await fetch('overrides.css?v=57', { cache: 'no-store' }).then((response) => response.text());
    const appText = await fetch('app.js?v=57', { cache: 'no-store' }).then((response) => response.text());
    const floor = state.floors.find((entry) => entry.type === 'food');
    const room = document.querySelector('.floor[data-type="food"] .room');
    return {
      appScript: Boolean(document.querySelector('script[src="app.js?v=57"]')),
      css: Boolean(document.querySelector('link[href="overrides.css?v=57"]')),
      swv57: swText.includes('little-depths-v57') && swText.includes('app.js?v=57'),
      cssv57: cssText.includes('food-rush-panel') && cssText.includes('data-food-rush-pace'),
      appv57: appText.includes('startFoodRush') && appText.includes('foodRushParticipants') && appText.includes('foodServingsDone'),
      foodArt: getComputedStyle(room).getPropertyValue('--room-art').includes('room-food-v2.webp'),
      activeFloors: document.querySelectorAll('.floor.food-rush-active').length,
      activePanels: document.querySelectorAll('.food-rush-panel.active').length,
      pacePanels: document.querySelectorAll('.food-rush-panel[data-pace]').length,
      meters: document.querySelectorAll('.food-rush-meter').length,
      paceFloors: document.querySelectorAll('.floor.food-rush-active[data-food-rush-pace]').length,
      heatFloors: document.querySelectorAll('.floor.food-rush-active[data-food-rush-heat]').length,
      rushTags: document.querySelectorAll('[data-state="meal-rush"]').length,
      lifeVisitors: document.querySelectorAll('.life-visitor').length,
      socialPairs: document.querySelectorAll('.social-pair').length,
      needBadges: document.querySelectorAll('.need-badge').length,
      dinerCount: foodRushParticipants(floor).length,
      selectedFloorIsFood: state.selectedFloorId === floor.id,
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
      appScript: Boolean(document.querySelector('script[src="app.js?v=57"]')),
      css: Boolean(document.querySelector('link[href="overrides.css?v=57"]')),
      dockVisible: Boolean(dock) && getComputedStyle(dock).display !== 'none' && !dock.hidden,
      dockButtons: dock ? dock.querySelectorAll('[data-mobile-panel-target]').length : 0,
      layoutClass: document.body.classList.contains('mobile-panel-layout'),
      openClass: document.body.classList.contains('mobile-panel-open'),
      detailActiveBeforeClick: detail?.classList.contains('mobile-panel-active') || false,
      rosterActiveAfterClick: roster?.classList.contains('mobile-panel-active') || false,
      visiblePanelCount: [...document.querySelectorAll('.side-panel .panel-section:not(.elevator-card)')]
        .filter((node) => getComputedStyle(node).display !== 'none').length,
      activeFloors: document.querySelectorAll('.floor.food-rush-active').length,
      activePanels: document.querySelectorAll('.food-rush-panel.active').length,
      pacePanels: document.querySelectorAll('.food-rush-panel[data-pace]').length,
      meters: document.querySelectorAll('.food-rush-meter').length,
      paceFloors: document.querySelectorAll('.floor.food-rush-active[data-food-rush-pace]').length,
      heatFloors: document.querySelectorAll('.floor.food-rush-active[data-food-rush-heat]').length,
      rushTags: document.querySelectorAll('[data-state="meal-rush"]').length,
      lifeVisitors: document.querySelectorAll('.life-visitor').length,
      needBadges: document.querySelectorAll('.need-badge').length,
      bodyWidth: Math.round(document.body.getBoundingClientRect().width || 0),
      kingdomWidth: Math.round(document.querySelector('.kingdom')?.getBoundingClientRect().width || 0),
    };
  })()`);
  await capture(client, mobileShot);

  client.close();
  edge.kill();
  await new Promise((resolveClose) => server.close(resolveClose));
  cleanupProfile();

  const assertions = {
    loadedv57: desktop.appScript && desktop.css && desktop.swv57 && desktop.cssv57 && desktop.appv57 && mobile.appScript && mobile.css,
    saveVersion: seeded.version === 12,
    rushStarted: seeded.afterRushes >= seeded.beforeRushes + 1 && seeded.floor.active && seeded.floor.cooldown > 0 && !seeded.buttonDisabledBefore,
    rushServed: seeded.afterServings >= seeded.beforeServings + 1 && seeded.floor.served >= 1 && seeded.floor.targetServings >= seeded.floor.served,
    rushStates: ["seating", "serving", "sharing", "lastcall"].includes(seeded.floor.pace) && seeded.floor.heat > 0 && seeded.floor.earned > 0,
    resourcesChanged: seeded.floor.stockAfter < seeded.floor.stockBefore,
    dinersPulledIn: seeded.floor.diners.length >= 2 && seeded.floor.participantIds.length >= 2,
    dinersVisiting: seeded.floor.diners.every((entry) => entry.visitReason === "foodRush" && Number(entry.floorId) === Number(seeded.floor.id)),
    staffServing: seeded.floor.workers.length >= 2 && seeded.floor.workers.some((entry) => ["serve", "work"].includes(entry.activity)),
    visibleRushUi: desktop.activeFloors >= 1 && desktop.activePanels >= 1 && desktop.pacePanels >= 1 && desktop.meters >= 1 && desktop.paceFloors >= 1 && desktop.heatFloors >= 1 && desktop.rushTags >= 1,
    visibleLifeMotion: desktop.lifeVisitors >= 2 && desktop.needBadges >= 4 && desktop.socialPairs >= 1,
    roomArt: desktop.foodArt,
    mobileDrawer: mobile.dockVisible && mobile.dockButtons >= 8 && mobile.layoutClass && mobile.openClass,
    mobileTabSwitch: mobile.detailActiveBeforeClick && mobile.rosterActiveAfterClick && mobile.visiblePanelCount === 1,
    mobileRushVisible: mobile.activeFloors >= 1 && mobile.activePanels >= 1 && mobile.pacePanels >= 1 && mobile.meters >= 1 && mobile.paceFloors >= 1 && mobile.heatFloors >= 1 && mobile.rushTags >= 1 && mobile.kingdomWidth > 0 && mobile.bodyWidth > 0,
    noRuntimeErrors: errors.length === 0 || errors.every((entry) => entry.includes("apple-mobile-web-app-capable")),
  };
  const failed = Object.entries(assertions).filter(([, value]) => !value);
  const summary = { url, desktopShot, mobileShot, seeded, desktop, mobile, assertions, errors };
  console.log(JSON.stringify(summary, null, 2));
  if (failed.length) {
    throw new Error(`v57 verification failed: ${failed.map(([key]) => key).join(", ")}`);
  }
} catch (error) {
  edge.kill();
  await new Promise((resolveClose) => server.close(resolveClose));
  cleanupProfile();
  console.error(error);
  process.exit(1);
}
