import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const root = resolve("C:/Users/Mystic/Documents/Codex/2026-05-30/new-chat-4");
const edgePath = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";
const port = 9242;
const url = "http://127.0.0.1:8792/?v50-local=1";
const profile = join(root, "tmp", `edge-v50-sims-needs-${Date.now()}`);
const desktopShot = join(root, "verification-v50-sims-needs-local.png");
const mobileShot = join(root, "verification-v50-sims-needs-mobile-local.png");

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
    while (dwelling.residents.length < 4) {
      addResidentToDwelling(state, dwelling, makeResident(state, dwelling.residents.length % 2 ? "entertainment" : "food"));
    }
    const residents = dwelling.residents.map((entry) => getResident(entry.id)).filter(Boolean);
    residents.forEach((resident, index) => {
      ensurePersonLife(resident);
      resident.motives = {
        food: index === 0 ? 18 : 68,
        entertainment: index === 1 ? 24 : 66,
        social: index === 2 ? 22 : 62,
        energy: index === 3 ? 18 : 70,
      };
      resident.need = ["food", "entertainment", "social", "energy"][index] || "social";
      resident.needTimer = 0;
      resident.socialCooldown = 0;
      resident.activityTimer = 0;
      clearSocialScene(resident);
    });
    const scene = chooseSocialSceneForPair("dwelling", residents[0], residents[1]);
    applySocialScene(residents[0], residents[1], scene, "verify-v50", 18, "dwelling", floorSocialScope(dwelling));
    render(true);
    saveGame(false);
    return {
      version: state.version,
      residentCount: residents.length,
      relation: relationshipScore(residents[0], residents[1]),
      needs: residents.map((resident) => resident.need),
      motives: residents.map((resident) => resident.motives),
    };
  })()`);

  await evaluate(client, "new Promise((resolve) => setTimeout(resolve, 700))", true);
  const desktop = await evaluate(client, `(() => ({
    appScript: Boolean(document.querySelector('script[src="app.js?v=50"]')),
    css: Boolean(document.querySelector('link[href="overrides.css?v=50"]')),
    cacheText: document.documentElement.outerHTML.includes('app.js?v=50'),
    motiveStrips: document.querySelectorAll('.motive-strip').length,
    energyBars: document.querySelectorAll('.motive-strip i[data-need="energy"]').length,
    needBadges: document.querySelectorAll('.need-badge[data-need]').length,
    socialPairs: document.querySelectorAll('.social-pair').length,
    residents: document.querySelectorAll('.resident-dot.person-sprite').length,
    rosterCards: document.querySelectorAll('.roster-card').length,
    titleWithLife: [...document.querySelectorAll('.resident-dot.person-sprite')].some((node) => node.title.includes('餐饮') || node.title.includes('娱乐') || node.title.includes('休息')),
  }))()`);
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
  const mobile = await evaluate(client, `(() => ({
    motiveStrips: document.querySelectorAll('.motive-strip').length,
    needBadges: document.querySelectorAll('.need-badge[data-need]').length,
    kingdomWidth: Math.round(document.querySelector('.kingdom')?.getBoundingClientRect().width || 0),
    bodyWidth: Math.round(document.body.getBoundingClientRect().width || 0),
  }))()`);
  await capture(client, mobileShot);

  client.close();
  edge.kill();

  const assertions = {
    seededVersion: seeded.version === 6,
    hasFourResidents: seeded.residentCount >= 4,
    relationshipIncreased: seeded.relation > 0,
    loadedV50: desktop.appScript && desktop.css && desktop.cacheText,
    motiveUi: desktop.motiveStrips >= 4 && desktop.energyBars >= 4,
    roomNeeds: desktop.needBadges >= 4 && desktop.socialPairs >= 1 && desktop.residents >= 4,
    lifeTitles: desktop.titleWithLife,
    mobileUi: mobile.motiveStrips >= 4 && mobile.needBadges >= 4 && mobile.kingdomWidth > 0 && mobile.bodyWidth > 0,
    noRuntimeErrors: errors.length === 0 || errors.every((entry) => entry.includes("apple-mobile-web-app-capable")),
  };
  const failed = Object.entries(assertions).filter(([, value]) => !value);
  const summary = { url, desktopShot, mobileShot, seeded, desktop, mobile, assertions, errors };
  console.log(JSON.stringify(summary, null, 2));
  if (failed.length) {
    throw new Error(`v50 verification failed: ${failed.map(([key]) => key).join(", ")}`);
  }
} catch (error) {
  edge.kill();
  console.error(error);
  process.exit(1);
}
