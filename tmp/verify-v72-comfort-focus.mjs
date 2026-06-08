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
const webPort = 8822;
const cdpPort = 9272;
const url = `http://127.0.0.1:${webPort}/?v72-comfort-focus=1`;
const profile = join(root, "tmp", `edge-v72-comfort-focus-${Date.now()}`);
const desktopShot = join(root, "verification-v72-comfort-focus-local.png");
const mobileShot = join(root, "verification-v72-comfort-focus-mobile-local.png");

if (!edgePath) throw new Error("Microsoft Edge executable was not found.");
mkdirSync(profile, { recursive: true });

const types = new Map([
  [".html", "text/html; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".mjs", "text/javascript; charset=utf-8"],
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
  return new Promise((resolveListen) => server.listen(webPort, "127.0.0.1", () => resolveListen(server)));
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
        const pending = this.pending.get(data.id);
        this.pending.delete(data.id);
        data.error ? pending.reject(new Error(data.error.message)) : pending.resolve(data.result || {});
        return;
      }
      (this.events.get(data.method) || []).forEach((handler) => handler(data.params || {}));
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
    return new Promise((resolveSend, reject) => {
      this.pending.set(id, { resolve: resolveSend, reject });
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
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text || "Runtime evaluation failed");
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

  let load = client.waitFor("Page.loadEventFired");
  await client.send("Page.navigate", { url });
  await load;
  await evaluate(client, "localStorage.removeItem('codex-little-depths-v4')");
  load = client.waitFor("Page.loadEventFired");
  await client.send("Page.reload", { ignoreCache: true });
  await load;
  await evaluate(client, "new Promise((resolve) => setTimeout(resolve, 700))", true);

  const seeded = await evaluate(client, `(() => {
    state = makeNewGame();
    state.coins = 9000;
    state.gems = 40;
    state.orders = [];
    state.expeditions = [];
    state.stats.comfortFocusesDone = 2;
    const dwelling = state.floors.find((floor) => floor.type === "dwelling");
    while (dwelling.residents.length < 9) {
      addResidentToDwelling(state, dwelling, makeResident(state, dwelling.residents.length % 2 ? "garden" : "bathhouse"));
    }
    state.floors.forEach((floor) => { if (Array.isArray(floor.workers)) floor.workers = []; });
    const garden = createFloor(state, "garden", { name: "调息花园", stock: 12, level: 3 });
    garden.stockMax = 18;
    state.floors.push(garden);
    const bath = createFloor(state, "bathhouse", { name: "暖雾温泉", stock: 12, level: 2 });
    bath.stockMax = 18;
    state.floors.push(bath);
    const residents = allResidents(state);
    garden.workers = residents.slice(0, 3).map((person) => person.id);
    bath.workers = residents.slice(3, 6).map((person) => person.id);
    garden.workers.forEach((id) => { const person = getResident(id); person.workFloorId = garden.id; });
    bath.workers.forEach((id) => { const person = getResident(id); person.workFloorId = bath.id; });
    state.selectedFloorId = garden.id;
    render(true);
    return { gardenId: garden.id, startingCoins: state.coins, startingGems: state.gems };
  })()`);

  await evaluate(client, `startComfortSession(${seeded.gardenId}); for (let i = 0; i < 90; i += 1) update(1); {
    const explorer = allResidents(state).find((person) => !person.workFloorId && !person.expeditionId);
    startExpedition("moss", explorer);
  } state.selectedFloorId = ${seeded.gardenId}; render(true);`);
  const afterglowReady = await evaluate(client, `(() => {
    const garden = findFloor(${seeded.gardenId});
    return {
      active: isActiveComfortAfterglow(garden),
      buttons: document.querySelectorAll('[data-action="comfort-focus"]').length,
      layer: Boolean(document.querySelector('.comfort-afterglow-layer')),
      art: getComputedStyle(document.querySelector('.floor[data-type="garden"] .room')).getPropertyValue('--room-art'),
      coins: state.coins,
      gems: state.gems,
    };
  })()`);
  assert(afterglowReady.active, "Garden afterglow did not activate.");
  assert(afterglowReady.buttons === 3, `Expected 3 comfort focus buttons, saw ${afterglowReady.buttons}.`);
  assert(afterglowReady.layer, "Comfort afterglow layer did not render.");
  assert(String(afterglowReady.art).includes("room-garden-v3.webp"), `Garden art was not v3: ${afterglowReady.art}`);

  await evaluate(client, `document.querySelector('[data-action="comfort-focus"][data-focus="expedition"]').click();`);
  await evaluate(client, "new Promise((resolve) => setTimeout(resolve, 900))", true);
  await evaluate(client, "update(0.5); render(true);");
  const focused = await evaluate(client, `(() => {
    const garden = findFloor(${seeded.gardenId});
    const quest = questEntry(QUEST_DEFS.find((entry) => entry.id === "comfort_focus"));
    const expedition = state.expeditions[0];
    return {
      focus: garden.comfortAfterglow?.focus || "",
      focusCount: state.stats.comfortFocusesDone || 0,
      expeditionFocuses: state.stats.comfortExpeditionFocusesDone || 0,
      prep: expedition?.comfortPrepBonus || 0,
      questReady: Boolean(quest.ready),
      questClaimed: Boolean(quest.claimed),
      coins: state.coins,
      gems: state.gems,
      focusGlyph: Boolean(document.querySelector('[data-state="comfort-focus"]')),
      focusReadout: Boolean(document.querySelector('.comfort-focus-readout[data-focus="expedition"]')),
      inventory: (() => { openInventoryModal(); return document.querySelector('#inventoryPanel')?.textContent || ""; })(),
    };
  })()`);
  assert(focused.focus === "expedition", `Expected expedition focus, got ${focused.focus}.`);
  assert(focused.focusCount === 3, `Expected comfortFocusesDone 3, got ${focused.focusCount}.`);
  assert(focused.expeditionFocuses === 1, `Expected expedition focus count 1, got ${focused.expeditionFocuses}.`);
  assert(focused.prep > 0, "Expedition comfort prep did not increase.");
  assert(focused.questReady && !focused.questClaimed, "comfort_focus quest was not ready and unclaimed.");
  assert(focused.coins === afterglowReady.coins && focused.gems === afterglowReady.gems, "Quest reward was granted before manual claim.");
  assert(focused.focusGlyph, "Focused comfort status glyph was not rendered.");
  assert(focused.focusReadout, "Focused comfort readout was not rendered.");
  assert(String(focused.inventory).includes("余韵调息"), "Inventory did not include comfort focus record.");

  const claimed = await evaluate(client, `(() => {
    const beforeCoins = state.coins;
    const beforeGems = state.gems;
    claimQuest("comfort_focus");
    const quest = questEntry(QUEST_DEFS.find((entry) => entry.id === "comfort_focus"));
    return { claimed: quest.claimed, coinDelta: state.coins - beforeCoins, gemDelta: state.gems - beforeGems };
  })()`);
  assert(claimed.claimed, "comfort_focus quest did not mark claimed.");
  assert(claimed.coinDelta === 680, `Manual claim coins mismatch: ${claimed.coinDelta}.`);
  assert(claimed.gemDelta === 3, `Manual claim gems mismatch: ${claimed.gemDelta}.`);

  await evaluate(client, `closeInventoryModal(); state.selectedFloorId = ${seeded.gardenId}; setMobilePanel("detail", true); render(true);`);
  await evaluate(client, "new Promise((resolve) => setTimeout(resolve, 500))", true);
  await capture(client, desktopShot);
  await client.send("Emulation.setDeviceMetricsOverride", {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true,
  });
  await evaluate(client, `closeInventoryModal(); state.selectedFloorId = ${seeded.gardenId}; setMobilePanel("detail", true); render(true);`);
  await evaluate(client, "new Promise((resolve) => setTimeout(resolve, 400))", true);
  await capture(client, mobileShot);
  const mobile = await evaluate(client, `(() => ({
    overflow: document.documentElement.scrollWidth > window.innerWidth + 2,
    buttons: [...document.querySelectorAll('.comfort-focus-btn')].map((button) => button.getBoundingClientRect().width),
    panelVisible: Boolean(document.querySelector('.mobile-panel-tab.active[data-mobile-panel-target="detail"]')),
  }))()`);
  assert(!mobile.overflow, "Mobile viewport has horizontal overflow.");
  assert(mobile.buttons.every((width) => width >= 70), `Comfort focus mobile buttons too narrow: ${mobile.buttons.join(",")}`);
  assert(mobile.panelVisible, "Mobile detail panel was not visible.");

  const appText = await fetch(`http://127.0.0.1:${webPort}/app.js?v=72`).then((response) => response.text());
  const cssText = await fetch(`http://127.0.0.1:${webPort}/overrides.css?v=72`).then((response) => response.text());
  const swText = await fetch(`http://127.0.0.1:${webPort}/sw.js`).then((response) => response.text());
  const assetOk = await fetch(`http://127.0.0.1:${webPort}/assets/art/room-garden-v3.webp`).then((response) => response.ok && response.headers.get("content-type")?.includes("image/webp"));
  assert(appText.includes("comfort_focus") && appText.includes("focusComfortAfterglow"), "v72 app markers missing.");
  assert(cssText.includes("comfort-focus-btn") && cssText.includes("room-garden-v3.webp"), "v72 CSS markers missing.");
  assert(swText.includes("little-depths-v72") && swText.includes("room-garden-v3.webp"), "v72 SW markers missing.");
  assert(assetOk, "room-garden-v3.webp was not served as WebP.");
  assert(errors.length === 0, `Browser reported errors: ${errors.join(" | ")}`);

  client.close();
  console.log(JSON.stringify({
    ok: true,
    focus: focused.focus,
    focusCount: focused.focusCount,
    prep: Math.round(focused.prep * 100),
    screenshots: [desktopShot, mobileShot],
  }, null, 2));
} finally {
  edge.kill();
  server.close();
  cleanupProfile();
}
