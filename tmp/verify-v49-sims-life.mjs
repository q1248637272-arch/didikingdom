import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const edge = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const port = 9349;
const url = "http://127.0.0.1:8790/?v49-local=1";
const profile = path.join(root, "tmp", "edge-v49-sims-life-profile");
const screenshots = {
  desktop: path.join(root, "verification-v49-sims-life-local.png"),
  mobile: path.join(root, "verification-v49-sims-life-mobile-local.png"),
};

async function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchJson(endpoint, tries = 80) {
  let last;
  for (let i = 0; i < tries; i += 1) {
    try {
      const res = await fetch(endpoint);
      if (res.ok) return await res.json();
      last = new Error(`${endpoint} ${res.status}`);
    } catch (error) {
      last = error;
    }
    await delay(250);
  }
  throw last;
}

class Cdp {
  constructor(ws) {
    this.ws = ws;
    this.nextId = 1;
    this.pending = new Map();
    this.events = [];
    ws.addEventListener("message", (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && this.pending.has(msg.id)) {
        const { resolve, reject } = this.pending.get(msg.id);
        this.pending.delete(msg.id);
        if (msg.error) reject(new Error(msg.error.message));
        else resolve(msg.result || {});
        return;
      }
      this.events.push(msg);
    });
  }

  send(method, params = {}) {
    const id = this.nextId++;
    const payload = JSON.stringify({ id, method, params });
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.ws.send(payload);
    });
  }

  async waitEvent(method, timeout = 15000) {
    const end = Date.now() + timeout;
    while (Date.now() < end) {
      const index = this.events.findIndex((event) => event.method === method);
      if (index >= 0) return this.events.splice(index, 1)[0].params || {};
      await delay(100);
    }
    throw new Error(`Timed out waiting for ${method}`);
  }
}

async function connect() {
  const targets = await fetchJson(`http://127.0.0.1:${port}/json/list`);
  const page = targets.find((target) => target.type === "page") || targets[0];
  if (!page?.webSocketDebuggerUrl) throw new Error("No debuggable page target found");
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    ws.addEventListener("open", resolve, { once: true });
    ws.addEventListener("error", reject, { once: true });
  });
  return { cdp: new Cdp(ws), ws };
}

async function capture(cdp, file) {
  const result = await cdp.send("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: false,
  });
  await fs.writeFile(file, Buffer.from(result.data, "base64"));
}

await fs.rm(profile, { recursive: true, force: true });
await fs.mkdir(profile, { recursive: true });

const proc = spawn(edge, [
  "--headless=new",
  "--disable-gpu",
  "--disable-extensions",
  "--no-first-run",
  "--remote-allow-origins=*",
  `--remote-debugging-port=${port}`,
  `--user-data-dir=${profile}`,
  "about:blank",
], { stdio: "ignore" });

try {
  await fetchJson(`http://127.0.0.1:${port}/json/version`);
  const { cdp, ws } = await connect();
  const exceptions = [];
  await cdp.send("Page.enable");
  await cdp.send("Runtime.enable");
  await cdp.send("Log.enable");
  await cdp.send("Emulation.setDeviceMetricsOverride", {
    width: 1280,
    height: 980,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await cdp.send("Page.navigate", { url });
  await cdp.waitEvent("Page.loadEventFired");
  await delay(600);
  exceptions.push(
    ...cdp.events
      .filter((event) => event.method === "Runtime.exceptionThrown" || event.method === "Log.entryAdded")
      .map((event) => event.params?.exceptionDetails?.text || event.params?.entry?.text)
      .filter(Boolean)
  );

  const setup = await cdp.send("Runtime.evaluate", {
    awaitPromise: true,
    returnByValue: true,
    expression: `
      (async () => {
        localStorage.setItem("codex-little-depths-guide-v1", "seen");
        state = makeNewGame();
        state.coins = 9000;
        state.gems = 80;
        const home = state.floors.find((floor) => floor.type === "dwelling");
        const food = state.floors.find((floor) => floor.type === "food");
        while (food.workers.length < 3) {
          const resident = makeResident(state, "food");
          resident.name = ["小芒", "蜜茶", "南星"][food.workers.length] || resident.name;
          addResidentToDwelling(state, home, resident);
          hireBestWorker(food, state, true);
        }
        while (home.residents.length < 4) {
          const resident = makeResident(state, home.residents.length % 2 ? "entertainment" : "food");
          addResidentToDwelling(state, home, resident);
        }
        const workers = food.workers.map((id) => getResident(id)).filter(Boolean);
        workers.forEach((person, index) => {
          delete person.socialPartnerId;
          person.socialCooldown = 0;
          person.socialTimer = 0;
          person.need = index === 2 ? "food" : "social";
          person.needTimer = 30;
          person.activityTimer = 0;
          assignPersonMotion(person, "food", index === 2 ? "eat" : "talk");
        });
        applySocialScene(workers[0], workers[1], socialScenesForFloor("food")[0], "verify-food-social", 18, "food");
        updateSinglePersonActivity(workers[2], "food", 0);
        home.residents.map((entry) => getResident(entry.id)).filter(Boolean).forEach((resident) => {
          if (workers.some((worker) => worker.id === resident.id)) return;
          resident.activityTimer = 0;
          resident.socialCooldown = 0;
          updateSinglePersonActivity(resident, "dwelling", 0);
        });
        state.selectedFloorId = food.id;
        render(true);
        await new Promise((resolve) => setTimeout(resolve, 80));
        document.querySelector('.floor[data-type="food"]')?.scrollIntoView({ block: 'center' });
        await new Promise((resolve) => setTimeout(resolve, 700));
        const stageDots = [...document.querySelectorAll('.floor[data-type="food"] .life-stage > .resident-dot')].map((el) => {
          const rect = el.getBoundingClientRect();
          const style = getComputedStyle(el);
          return {
            left: Math.round(rect.left),
            top: Math.round(rect.top),
            x: style.getPropertyValue("--person-x").trim(),
            y: style.getPropertyValue("--person-y").trim(),
            transform: style.transform,
            className: el.className,
          };
        });
        const pair = document.querySelector('.floor[data-type="food"] .life-stage > .social-pair');
        const pairStyle = pair ? getComputedStyle(pair) : null;
        return {
          htmlV49: Boolean(document.querySelector('script[src*="app.js?v=49"]')),
          lifeStages: document.querySelectorAll(".life-stage").length,
          foodPair: Boolean(pair),
          pairVars: pairStyle ? {
            x: pairStyle.getPropertyValue("--pair-x").trim(),
            y: pairStyle.getPropertyValue("--pair-y").trim(),
            transform: pairStyle.transform,
          } : null,
          stageDots,
          workerMotion: workers.map((person) => ({
            id: person.id,
            activity: person.activity,
            need: person.need,
            partner: person.socialPartnerId || null,
            motion: person.motion,
          })),
          socialText: pair?.title || "",
          rowDisplay: getComputedStyle(document.querySelector('.floor[data-type="food"] .life-stage')).display,
        };
      })()
    `,
  });

  const data = setup.result?.value;
  if (!data?.htmlV49) throw new Error("local page did not load v49 app script");
  if (data.lifeStages < 2) throw new Error("life-stage rows were not rendered");
  if (!data.foodPair) throw new Error("forced food social pair was not rendered");
  if (!data.workerMotion?.every((entry) => Number.isFinite(Number(entry.motion?.x)) && Number.isFinite(Number(entry.motion?.y)))) {
    throw new Error("worker motion coordinates were not assigned");
  }
  const uniqueX = new Set(data.workerMotion.map((entry) => Math.round(Number(entry.motion.x))));
  if (uniqueX.size < 2) throw new Error("workers did not spread to different room positions");
  if (data.rowDisplay !== "block") throw new Error("life-stage row did not switch out of flex layout");

  await capture(cdp, screenshots.desktop);
  await cdp.send("Emulation.setDeviceMetricsOverride", {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true,
  });
  await cdp.send("Runtime.evaluate", {
    expression: "render(true); setTimeout(() => document.querySelector('.floor[data-type=\"food\"]')?.scrollIntoView({ block: 'center' }), 0);",
  });
  await delay(500);
  await capture(cdp, screenshots.mobile);
  ws.close();
  console.log(JSON.stringify({ ok: true, data, exceptions, screenshots }, null, 2));
} finally {
  proc.kill();
}
