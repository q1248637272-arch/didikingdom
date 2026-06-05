import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const root = resolve("C:/Users/Mystic/Documents/Codex/2026-05-30/new-chat-4");
const edgePath = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const port = 9251;
const url = "http://127.0.0.1:8792/?v51-local=1";
const profile = join(root, "tmp", `edge-v51-life-visits-${Date.now()}`);
const desktopShot = join(root, "verification-v51-life-visits-local.png");
const mobileShot = join(root, "verification-v51-life-visits-mobile-local.png");

mkdirSync(profile, { recursive: true });

const edge = spawn(edgePath, [
  "--headless=new",
  `--remote-debugging-port=${port}`,
  `--user-data-dir=${profile}`,
  "--disable-gpu",
  "--no-first-run",
  "--no-default-browser-check",
  "about:blank",
], { stdio: "ignore" });

class CDP {
  constructor(wsUrl) {
    this.id = 0;
    this.pending = new Map();
    this.events = new Map();
    this.ws = new WebSocket(wsUrl);
    this.ws.addEventListener("message", (message) => {
      const data = JSON.parse(message.data);
      if (data.id && this.pending.has(data.id)) {
        const { resolve, reject } = this.pending.get(data.id);
        this.pending.delete(data.id);
        data.error ? reject(new Error(data.error.message)) : resolve(data.result || {});
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
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
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
      const response = await fetch(`http://127.0.0.1:${port}${path}`);
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
    const food = state.floors.find((floor) => floor.type === "food");
    while (dwelling.residents.length < 4) {
      addResidentToDwelling(state, dwelling, makeResident(state, "garden"));
    }
    const resident = dwelling.residents.map((entry) => getResident(entry.id)).find((entry) => !entry.workFloorId && !entry.expeditionId);
    ensurePersonLife(resident);
    resident.motives = { food: 12, entertainment: 72, social: 70, energy: 68 };
    resident.need = "food";
    resident.needTimer = 0;
    resident.lifeVisitCooldown = 0;
    resident.routineCooldown = 0;
    resident.activityTimer = 0;
    clearSocialScene(resident);
    updateLifeVisits(1);
    updatePersonActivities(1.2);
    render(true);
    saveGame(false);
    return {
      version: state.version,
      residentId: resident.id,
      residentName: resident.name,
      homeFloorId: resident.homeFloorId,
      targetFloorId: resident.lifeVisit?.floorId || null,
      targetFloorType: resident.lifeVisit?.floorType || null,
      targetFloorName: findFloor(resident.lifeVisit?.floorId)?.name || null,
      label: resident.lifeVisit?.label || null,
      need: resident.need,
      foodMotive: Math.round(resident.motives.food),
      foodFloorId: food.id,
      peopleOnFood: floorPeopleForLife(food).map((entry) => entry.id),
    };
  })()`);

  await evaluate(client, "new Promise((resolve) => setTimeout(resolve, 900))", true);
  const desktop = await evaluate(client, `(() => ({
    appScript: Boolean(document.querySelector('script[src="app.js?v=51"]')),
    css: Boolean(document.querySelector('link[href="overrides.css?v=51"]')),
    cacheText: document.documentElement.outerHTML.includes('app.js?v=51'),
    lifeVisitors: document.querySelectorAll('.life-visitor').length,
    visitingRoster: document.querySelectorAll('.roster-card[data-mood="visiting"]').length,
    visitingTitle: [...document.querySelectorAll('.life-visitor')].some((node) => node.title.includes('去吃点东西') || node.title.includes('餐饮')),
    motiveStrips: document.querySelectorAll('.motive-strip').length,
    targetNeedBadges: document.querySelectorAll('.life-visitor .need-badge[data-need="food"]').length,
  }))()`);
  await capture(client, desktopShot);

  const progressed = await evaluate(client, `(() => {
    const resident = getResident(${seeded.residentId});
    for (let i = 0; i < 10; i += 1) {
      updateLifeVisits(1);
      updatePersonActivities(1);
    }
    render(true);
    return {
      stillVisiting: Boolean(resident.lifeVisit),
      foodMotive: Math.round(resident.motives.food),
      wish: personLifeWish(resident, currentFloorForPerson(resident)?.type || "dwelling"),
    };
  })()`);

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
  const mobile = await evaluate(client, `(() => ({
    lifeVisitors: document.querySelectorAll('.life-visitor').length,
    needBadges: document.querySelectorAll('.need-badge[data-need]').length,
    kingdomWidth: Math.round(document.querySelector('.kingdom')?.getBoundingClientRect().width || 0),
    bodyWidth: Math.round(document.body.getBoundingClientRect().width || 0),
  }))()`);
  await capture(client, mobileShot);

  client.close();
  edge.kill();

  const assertions = {
    seededVersion: seeded.version === 7,
    loadedV51: desktop.appScript && desktop.css && desktop.cacheText,
    startedFoodVisit: seeded.targetFloorType === "food" && seeded.peopleOnFood.includes(seeded.residentId),
    visibleLifeVisitor: desktop.lifeVisitors >= 1 && desktop.targetNeedBadges >= 1,
    rosterShowsVisiting: desktop.visitingRoster >= 1,
    titleReadable: desktop.visitingTitle,
    motiveProgressed: progressed.foodMotive > seeded.foodMotive,
    mobileUi: mobile.lifeVisitors >= 1 && mobile.needBadges >= 4 && mobile.kingdomWidth > 0 && mobile.bodyWidth > 0,
    noRuntimeErrors: errors.length === 0 || errors.every((entry) => entry.includes("apple-mobile-web-app-capable")),
  };
  const failed = Object.entries(assertions).filter(([, value]) => !value);
  const summary = { url, desktopShot, mobileShot, seeded, desktop, progressed, mobile, assertions, errors };
  console.log(JSON.stringify(summary, null, 2));
  if (failed.length) {
    throw new Error(`v51 verification failed: ${failed.map(([key]) => key).join(", ")}`);
  }
} catch (error) {
  edge.kill();
  console.error(error);
  process.exit(1);
}
