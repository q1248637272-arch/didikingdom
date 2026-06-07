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
const webPort = 8808;
const cdpPort = 9258;
const url = `http://127.0.0.1:${webPort}/?v58-character-interactions=1`;
const profile = join(root, "tmp", `edge-v58-character-interactions-${Date.now()}`);
const desktopShot = join(root, "verification-v58-character-interactions-local.png");
const mobileShot = join(root, "verification-v58-character-interactions-mobile-local.png");

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
    state = makeNewGame();
    state.coins = 9000;
    state.gems = 80;

    const dwelling = state.floors.find((floor) => floor.type === "dwelling");
    const food = state.floors.find((floor) => floor.type === "food");
    while (dwelling.residents.length < 6) {
      addResidentToDwelling(state, dwelling, makeResident(state, dwelling.residents.length % 2 ? "food" : "entertainment"));
    }

    food.stock = 18;
    food.stockMax = Math.max(food.stockMax || 0, 28);
    food.level = 3;
    food.workers = [];
    food.foodRush = null;
    food.foodRushCooldown = 0;

    const residents = dwelling.residents.map((entry) => getResident(entry.id)).filter(Boolean);
    residents.forEach((person, index) => {
      ensurePersonLife(person);
      endLifeVisit(person);
      endSocialForPerson(person);
      person.expeditionId = null;
      person.workFloorId = null;
      person.lifeVisitCooldown = 0;
      person.routineCooldown = 0;
      person.socialCooldown = 0;
      person.needTimer = 0;
      person.activityTimer = 0;
      person.need = index % 2 ? "social" : "food";
      person.motives = { food: 28 + index * 3, entertainment: 62, social: 34 + index * 4, energy: 72 };
      assignPersonMotion(person, "dwelling", "stroll");
    });

    const left = residents[0];
    const right = residents[1];
    left.workFloorId = food.id;
    right.workFloorId = food.id;
    left.dreamType = "food";
    right.dreamType = "service";
    food.workers.push(left.id, right.id);
    left.relationships[String(right.id)] = { score: 84, interactions: 7, lastScene: "meal" };
    right.relationships[String(left.id)] = { score: 84, interactions: 7, lastScene: "meal" };

    const scene = SOCIAL_SCENES.food[0];
    applySocialScene(left, right, scene, "verify-v58-character-social", 20, "food", floorSocialScope(food));
    const approach = {
      phase: left.socialPhase,
      leftActivity: left.activity,
      rightActivity: right.activity,
      leftMode: left.motion?.mode,
      rightMode: right.motion?.mode,
      distance: Math.round(Math.abs((right.motion?.x || 0) - (left.motion?.x || 0)) * 10) / 10,
      anchor: left.socialAnchor,
    };

    updateSocialActivities(floorPeopleForLife(food), "food", 5.5, floorSocialScope(food));
    const engage = {
      phase: left.socialPhase,
      leftActivity: left.activity,
      rightActivity: right.activity,
      leftMode: left.motion?.mode,
      rightMode: right.motion?.mode,
      distance: Math.round(Math.abs((right.motion?.x || 0) - (left.motion?.x || 0)) * 10) / 10,
      anchor: left.socialAnchor,
    };

    updateSocialActivities(floorPeopleForLife(food), "food", 11.5, floorSocialScope(food));
    const settle = {
      phase: left.socialPhase,
      leftActivity: left.activity,
      rightActivity: right.activity,
      leftMode: left.motion?.mode,
      rightMode: right.motion?.mode,
      distance: Math.round(Math.abs((right.motion?.x || 0) - (left.motion?.x || 0)) * 10) / 10,
      anchor: left.socialAnchor,
      remaining: Math.round(left.socialTimer * 10) / 10,
    };

    state.selectedFloorId = food.id;
    render(true);
    saveGame(false);

    return {
      version: state.version,
      floorId: food.id,
      leftId: left.id,
      rightId: right.id,
      relation: relationshipScore(left, right),
      approach,
      engage,
      settle,
      peopleOnFood: floorPeopleForLife(food).map((person) => person.id),
    };
  })()`);

  await evaluate(client, "new Promise((resolve) => setTimeout(resolve, 900))", true);
  const desktop = await evaluate(client, `(async () => {
    const swText = await fetch('sw.js', { cache: 'no-store' }).then((response) => response.text());
    const cssText = await fetch('overrides.css?v=58', { cache: 'no-store' }).then((response) => response.text());
    const appText = await fetch('app.js?v=58', { cache: 'no-store' }).then((response) => response.text());
    const pair = document.querySelector('.floor[data-type="food"] .social-pair');
    const focus = pair?.querySelector('.social-focus');
    const personActivities = [...document.querySelectorAll('.person-activity')].map((node) => {
      const style = getComputedStyle(node);
      return {
        animationName: style.animationName,
        animationDuration: style.animationDuration,
        className: node.className,
      };
    });
    const bubbleStyle = pair ? getComputedStyle(pair.querySelector('.social-bubble')) : null;
    const focusStyle = focus ? getComputedStyle(focus) : null;
    return {
      appScript: Boolean(document.querySelector('script[src="app.js?v=58"]')),
      css: Boolean(document.querySelector('link[href="overrides.css?v=58"]')),
      swv58: swText.includes('little-depths-v58') && swText.includes('app.js?v=58') && swText.includes('overrides.css?v=58'),
      appv58: appText.includes('updateSocialScenePhase') && appText.includes('socialPhaseForProgress') && appText.includes('socialAnchor'),
      cssv58: cssText.includes('animation: none') && cssText.includes('.life-stage .person-activity') && cssText.includes('social-focus') && cssText.includes('data-phase'),
      pairExists: Boolean(pair),
      pairPhase: pair?.dataset.phase || "",
      pairNeed: pair?.dataset.need || "",
      pairClass: pair?.className || "",
      focusExists: Boolean(focus),
      focusVisible: focusStyle ? Number(focusStyle.opacity) > 0 : false,
      personCount: personActivities.length,
      animatedPersonCount: personActivities.filter((entry) => entry.animationName && entry.animationName !== 'none').length,
      sampleAnimations: personActivities.slice(0, 6),
      bubbleAnimationName: bubbleStyle?.animationName || "",
      activeStagePairs: document.querySelectorAll('.life-stage > .social-pair[data-phase]').length,
      selectedFood: state.selectedFloorId === state.floors.find((floor) => floor.type === 'food')?.id,
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
    render(true);
    const dock = document.querySelector('#mobilePanelDock');
    const rosterButton = document.querySelector('[data-mobile-panel-target="roster"]');
    const detail = document.querySelector('[data-mobile-panel="detail"]');
    rosterButton?.click();
    const roster = document.querySelector('[data-mobile-panel="roster"]');
    const pair = document.querySelector('.social-pair[data-phase]');
    const personActivities = [...document.querySelectorAll('.person-activity')].map((node) => getComputedStyle(node).animationName);
    return {
      appScript: Boolean(document.querySelector('script[src="app.js?v=58"]')),
      css: Boolean(document.querySelector('link[href="overrides.css?v=58"]')),
      dockVisible: Boolean(dock) && getComputedStyle(dock).display !== 'none' && !dock.hidden,
      dockButtons: dock ? dock.querySelectorAll('[data-mobile-panel-target]').length : 0,
      layoutClass: document.body.classList.contains('mobile-panel-layout'),
      openClass: document.body.classList.contains('mobile-panel-open'),
      detailActiveBeforeClick: detail?.classList.contains('mobile-panel-active') || false,
      rosterActiveAfterClick: roster?.classList.contains('mobile-panel-active') || false,
      visiblePanelCount: [...document.querySelectorAll('.side-panel .panel-section:not(.elevator-card)')]
        .filter((node) => getComputedStyle(node).display !== 'none').length,
      pairExists: Boolean(pair),
      pairPhase: pair?.dataset.phase || "",
      focusExists: Boolean(pair?.querySelector('.social-focus')),
      animatedPersonCount: personActivities.filter((name) => name && name !== 'none').length,
      bodyWidth: Math.round(document.body.getBoundingClientRect().width || 0),
      kingdomWidth: Math.round(document.querySelector('.kingdom')?.getBoundingClientRect().width || 0),
    };
  })()`);
  await capture(client, mobileShot);

  client.close();
  edge.kill();
  await new Promise((resolveClose) => server.close(resolveClose));
  cleanupProfile();

  const sameAnchor = (a, b) =>
    a && b && Math.abs(Number(a.x) - Number(b.x)) < 0.2 && Math.abs(Number(a.y) - Number(b.y)) < 0.2;
  const assertions = {
    loadedV58: desktop.appScript && desktop.css && desktop.swv58 && desktop.appv58 && desktop.cssv58 && mobile.appScript && mobile.css,
    saveVersion: seeded.version === 13,
    socialSeeded: seeded.peopleOnFood.includes(seeded.leftId) && seeded.peopleOnFood.includes(seeded.rightId) && seeded.relation > 0,
    stagedPhases: seeded.approach.phase === "approach" && seeded.engage.phase === "engage" && seeded.settle.phase === "settle",
    stagedActivities: seeded.approach.leftActivity === "stroll" && seeded.approach.rightActivity === "wait" && seeded.engage.leftActivity === "serve" && seeded.engage.rightActivity === "eat",
    stableAnchor: sameAnchor(seeded.approach.anchor, seeded.engage.anchor) && sameAnchor(seeded.engage.anchor, seeded.settle.anchor),
    readableSpacing: seeded.approach.distance > seeded.settle.distance && seeded.settle.distance > seeded.engage.distance,
    stableMotionModes: seeded.approach.leftMode === "walk" && seeded.approach.rightMode === "observe" && seeded.engage.leftMode === "social" && seeded.settle.leftMode === "pose",
    visibleSocialUi: desktop.pairExists && desktop.pairPhase === "settle" && desktop.pairNeed === "food" && desktop.focusExists && desktop.focusVisible && desktop.activeStagePairs >= 1,
    noPersonAnimation: desktop.personCount > 0 && desktop.animatedPersonCount === 0 && desktop.bubbleAnimationName === "none",
    mobileDrawer: mobile.dockVisible && mobile.dockButtons >= 8 && mobile.layoutClass && mobile.openClass,
    mobileTabSwitch: mobile.detailActiveBeforeClick && mobile.rosterActiveAfterClick && mobile.visiblePanelCount === 1,
    mobileSocialStable: mobile.pairExists && mobile.focusExists && mobile.animatedPersonCount === 0 && mobile.kingdomWidth > 0 && mobile.bodyWidth > 0,
    noRuntimeErrors: errors.length === 0 || errors.every((entry) => entry.includes("apple-mobile-web-app-capable")),
  };
  const failed = Object.entries(assertions).filter(([, value]) => !value);
  const summary = { url, desktopShot, mobileShot, seeded, desktop, mobile, assertions, errors };
  console.log(JSON.stringify(summary, null, 2));
  if (failed.length) {
    throw new Error(`v58 verification failed: ${failed.map(([key]) => key).join(", ")}`);
  }
} catch (error) {
  edge.kill();
  await new Promise((resolveClose) => server.close(resolveClose));
  cleanupProfile();
  console.error(error);
  process.exit(1);
}
