import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const edge = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const port = 9338;
const url = "http://127.0.0.1:8788/?v48-local=1";
const profile = path.join(root, "tmp", "edge-v48-library-profile");
const screenshots = {
  desktop: path.join(root, "verification-v48-local.png"),
  mobile: path.join(root, "verification-v48-mobile-local.png"),
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
        state.coins = 5000;
        state.gems = 50;
        const home = state.floors.find((floor) => floor.type === "dwelling");
        const library = createFloor(state, "library", { name: "月窗书库", stock: 9, stockMax: 18, level: 2 });
        state.floors.push(library);
        const librarian = makeResident(state, "library");
        librarian.name = "静书";
        addResidentToDwelling(state, home, librarian);
        hireBestWorker(library, state, true);
        state.selectedFloorId = library.id;
        state.stats.libraryFloorsBuilt = 1;
        render(true);
        await new Promise((resolve) => setTimeout(resolve, 80));
        const button = document.querySelector('[data-action="library-study"]');
        const before = {
          button: Boolean(button),
          disabled: Boolean(button?.disabled),
          stock: library.stock,
          pieces: Object.values(state.collection).reduce((sum, value) => sum + value, 0),
          studies: state.stats.libraryStudiesDone || 0,
          count: document.querySelector("#collectionCount")?.textContent || "",
          detail: document.querySelector("#floorDetail")?.innerText || "",
          summary: Boolean(document.querySelector(".collection-summary")),
          nextCard: Boolean(document.querySelector(".collection-item.next")),
        };
        button?.click();
        await new Promise((resolve) => setTimeout(resolve, 120));
        const after = {
          stock: library.stock,
          pieces: Object.values(state.collection).reduce((sum, value) => sum + value, 0),
          studies: state.stats.libraryStudiesDone || 0,
          cooldown: Math.ceil(library.libraryCooldown || 0),
          count: document.querySelector("#collectionCount")?.textContent || "",
          detail: document.querySelector("#floorDetail")?.innerText || "",
          summary: Boolean(document.querySelector(".collection-summary")),
          nextCard: Boolean(document.querySelector(".collection-item.next")),
          toast: document.querySelector("#toast")?.textContent || "",
        };
        return { before, after };
      })()
    `,
  });

  const data = setup.result?.value;
  if (!data?.before?.button) throw new Error("library-study button was not rendered");
  if (data.before.disabled) throw new Error("library-study button was disabled in prepared test state");
  if (data.after.studies !== data.before.studies + 1) throw new Error("libraryStudiesDone did not increment");
  if (data.after.pieces !== data.before.pieces + 1) throw new Error("collection pieces did not increment");
  if (data.after.stock !== data.before.stock - 1) throw new Error("library stock did not decrement");
  if (!(data.after.cooldown > 0)) throw new Error("library cooldown did not start");
  if (!data.after.summary || !data.after.nextCard) throw new Error("collection refresh UI was not rendered");

  await cdp.send("Runtime.evaluate", {
    expression: "render(true); setTimeout(() => document.querySelector('.floor[data-type=\"library\"]')?.scrollIntoView({ block: 'center' }), 0);",
  });
  await delay(500);
  await capture(cdp, screenshots.desktop);
  await cdp.send("Emulation.setDeviceMetricsOverride", {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true,
  });
  await cdp.send("Runtime.evaluate", {
    expression: "render(true); setTimeout(() => document.querySelector('.floor[data-type=\"library\"]')?.scrollIntoView({ block: 'center' }), 0);",
  });
  await delay(400);
  await capture(cdp, screenshots.mobile);
  ws.close();
  console.log(JSON.stringify({ ok: true, data, exceptions, screenshots }, null, 2));
} finally {
  proc.kill();
}
