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
const webPort = 8832;
const cdpPort = 9282;
const url = `http://127.0.0.1:${webPort}/?v80-collection-exhibits=1`;
const profile = join(root, "tmp", `edge-v80-collection-exhibits-${Date.now()}`);
const desktopShot = join(root, "verification-v80-collection-exhibits-local.png");
const mobileShot = join(root, "verification-v80-collection-exhibits-mobile-local.png");

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
      }, 25000);
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
    const detail = result.exceptionDetails.exception?.description || result.exceptionDetails.text || "Runtime evaluation failed";
    throw new Error(detail);
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
    width: 1360,
    height: 940,
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
  await evaluate(client, "new Promise((resolve) => setTimeout(resolve, 850))", true);

  const seeded = await evaluate(client, `(() => {
    if (typeof closeGuideModal === "function") closeGuideModal(true);
    state = makeNewGame();
    state.coins = 18000;
    state.gems = 60;
    state.happiness = 92;
    const dwelling = state.floors.find((floor) => floor.type === "dwelling");
    dwelling.capacity = 18;
    let library = state.floors.find((floor) => floor.type === "library");
    if (!library) {
      library = createFloor(state, "library", { name: "v80典藏书库", stock: 8 });
      state.floors.push(library);
      state.stats.libraryFloorsBuilt = Math.max(state.stats.libraryFloorsBuilt || 0, 1);
    }
    library.status = "open";
    library.stock = 8;
    library.stockMax = Math.max(library.stockMax || 0, 18);
    library.libraryCooldown = 0;
    library.production = null;
    if (!library.workers?.length) {
      const worker = makeResident(state, "library");
      worker.skills.library = 10;
      addResidentToDwelling(state, dwelling, worker);
      hireBestWorker(library, state, true);
    }
    ["crown", "key", "map"].forEach((id) => {
      state.collection[id] = 3;
    });
    state.stats.collectionExhibitsDone = 0;
    const quest = state.quests.find((entry) => entry.id === "collection_exhibit");
    if (quest) {
      quest.claimed = false;
      quest.ready = false;
    }
    state.collectionExhibits = [];
    state.selectedFloorId = library.id;
    render(true);
    return {
      version: state.version,
      libraryId: library.id,
      stock: library.stock,
      workers: library.workers.length,
      buttons: document.querySelectorAll('[data-action="start-collection-exhibit"]').length,
      panelChoices: document.querySelectorAll('.collection-exhibit-choice').length,
      orderBonus: collectionOrderBonus(state),
      mapBonus: collectionMapBonus(),
    };
  })()`);
  assert(seeded.version === 29, `Expected save version 29, got ${seeded.version}`);
  assert(seeded.workers > 0, "Seeded library has no worker.");
  assert(seeded.buttons >= 3, "Completed relic exhibit buttons did not render in collection.");
  assert(seeded.panelChoices >= 3, "Library detail exhibit choices did not render.");

  const afterOne = await evaluate(client, `(() => {
    const button = document.querySelector('[data-action="start-collection-exhibit"][data-item-id="crown"]');
    if (!button) return { missingButton: true };
    button.click();
    render(true);
    const library = findFloor(${seeded.libraryId});
    const quest = state.quests.find((entry) => entry.id === "collection_exhibit");
    const worker = document.querySelector('.floor[data-floor-id="${seeded.libraryId}"] .person-sprite.resident-dot');
    const room = document.querySelector('.floor[data-floor-id="${seeded.libraryId}"] .room');
    const workerRect = worker?.getBoundingClientRect();
    const roomRect = room?.getBoundingClientRect();
    return {
      missingButton: false,
      exhibits: state.collectionExhibits.length,
      itemId: state.collectionExhibits[0]?.itemId || "",
      stock: library.stock,
      stat: state.stats.collectionExhibitsDone,
      questReady: Boolean(quest?.ready),
      questClaimed: Boolean(quest?.claimed),
      layer: Boolean(document.querySelector('.collection-exhibit-layer')),
      stateTag: Boolean(document.querySelector('.room-state-tag[data-state="collection-exhibit"]')),
      glyph: Boolean(document.querySelector('.status-glyph[data-state="collection-exhibit"]')),
      cardActive: Boolean(document.querySelector('.collection-item.exhibit-active')),
      detailActive: Boolean(document.querySelector('.collection-exhibit-card.active')),
      orderBonus: collectionOrderBonus(state),
      mapBonus: collectionMapBonus(),
      workerFooting: Boolean(workerRect && roomRect && workerRect.height > 40 && workerRect.bottom <= roomRect.bottom + 8 && workerRect.bottom > roomRect.top + 70),
    };
  })()`);
  assert(!afterOne.missingButton, "Collection exhibit button for crown was missing.");
  assert(afterOne.exhibits === 1 && afterOne.itemId === "crown", "First exhibit did not start correctly.");
  assert(afterOne.stock === seeded.stock - 1, `Expected library stock ${seeded.stock - 1}, got ${afterOne.stock}`);
  assert(afterOne.stat === 1, `Expected collectionExhibitsDone 1, got ${afterOne.stat}`);
  assert(!afterOne.questReady && !afterOne.questClaimed, "Quest became claimable too early or auto-claimed.");
  assert(afterOne.layer && afterOne.stateTag && afterOne.glyph, "Map exhibit layer or state glyph did not render.");
  assert(afterOne.cardActive && afterOne.detailActive, "Collection/detail active exhibit UI did not render.");
  assert(afterOne.orderBonus > seeded.orderBonus, "Collection order bonus did not increase.");
  assert(afterOne.mapBonus > seeded.mapBonus, "Collection map bonus did not increase.");
  assert(afterOne.workerFooting, "Library worker footing check failed.");

  const afterQuest = await evaluate(client, `(() => {
    const beforeCoins = state.coins;
    const beforeGems = state.gems;
    startCollectionExhibit("key", { floorId: ${seeded.libraryId} });
    startCollectionExhibit("map", { floorId: ${seeded.libraryId} });
    render(true);
    const quest = state.quests.find((entry) => entry.id === "collection_exhibit");
    const claimButton = document.querySelector('[data-action="claim-quest"][data-quest-id="collection_exhibit"]');
    const readyBeforeClick = Boolean(quest?.ready);
    const claimedBeforeClick = Boolean(quest?.claimed);
    const readyCoins = state.coins;
    const readyGems = state.gems;
    claimButton?.click();
    render(true);
    const claimed = state.quests.find((entry) => entry.id === "collection_exhibit");
    return {
      beforeCoins,
      beforeGems,
      readyCoins,
      readyGems,
      exhibits: state.collectionExhibits.length,
      stat: state.stats.collectionExhibitsDone,
      ready: readyBeforeClick,
      claimedBeforeClick,
      claimButton: Boolean(claimButton),
      claimedAfterClick: Boolean(claimed?.claimed),
      coinsAfterClaim: state.coins,
      gemsAfterClaim: state.gems,
    };
  })()`);
  assert(afterQuest.exhibits === 3, `Expected 3 active exhibits, got ${afterQuest.exhibits}`);
  assert(afterQuest.stat === 3, `Expected exhibit stat 3, got ${afterQuest.stat}`);
  assert(afterQuest.ready && !afterQuest.claimedBeforeClick && afterQuest.claimButton, "Manual exhibit quest was not ready with an unclaimed button.");
  assert(afterQuest.readyCoins === afterQuest.beforeCoins && afterQuest.readyGems === afterQuest.beforeGems, "Quest reward was awarded before manual claim.");
  assert(afterQuest.claimedAfterClick, "Manual quest claim did not mark quest claimed.");
  assert(afterQuest.coinsAfterClaim === afterQuest.readyCoins + 720, "Manual quest claim did not award 720 coins.");
  assert(afterQuest.gemsAfterClaim === afterQuest.readyGems + 3, "Manual quest claim did not award 3 gems.");
  await capture(client, desktopShot);

  const inventory = await evaluate(client, `(() => {
    openInventoryModal();
    render(true);
    const modal = document.getElementById("inventoryModal");
    return {
      open: modal && !modal.hidden,
      text: document.getElementById("inventoryPanel")?.textContent || "",
      activeRelics: document.querySelectorAll('.inventory-relic.active').length,
    };
  })()`);
  assert(inventory.open, "Inventory modal did not open.");
  assert(inventory.text.includes("典藏陈列") && inventory.text.includes("陈列加成"), "Inventory does not show exhibit records/bonus.");
  assert(inventory.activeRelics >= 3, "Inventory active relic rows did not render.");

  await client.send("Emulation.setDeviceMetricsOverride", {
    width: 390,
    height: 820,
    deviceScaleFactor: 1,
    mobile: true,
  });
  await evaluate(client, `(() => {
    closeInventoryModal();
    setMobilePanel("collection", true);
    render(true);
  })()`);
  await evaluate(client, "new Promise((resolve) => setTimeout(resolve, 450))", true);
  const mobile = await evaluate(client, `(() => {
    const selectors = ['.collection', '.floor-detail', '.inventory-panel', '.collection-exhibit-panel'];
    const overflow = selectors.map((selector) => {
      const node = document.querySelector(selector);
      if (!node) return 0;
      return Math.max(0, node.scrollWidth - node.clientWidth);
    });
    return {
      panel: document.body.dataset.mobilePanel,
      overflow: Math.max(...overflow),
      collectionButtons: document.querySelectorAll('.collection-exhibit-btn, .collection-exhibit-timer').length,
    };
  })()`);
  assert(mobile.panel === "collection", `Expected mobile collection panel, got ${mobile.panel}`);
  assert(mobile.overflow <= 2, `Mobile panel overflowed by ${mobile.overflow}px`);
  assert(mobile.collectionButtons >= 3, "Mobile collection exhibit controls/timers did not render.");
  await capture(client, mobileShot);

  const markers = await evaluate(client, `Promise.all([
    fetch("./index.html").then((response) => response.text()),
    fetch("./sw.js").then((response) => response.text()),
  ]).then(([html, sw]) => ({
    html: html.includes("app.js?v=80") && html.includes("overrides.css?v=80") && html.includes("styles.css?v=80"),
    sw: sw.includes("little-depths-v80") && sw.includes("app.js?v=80"),
  }))`, true);
  assert(markers.html && markers.sw, "v80 cache/version markers are missing.");
  assert(!errors.length, `Runtime errors: ${errors.join(" | ")}`);

  console.log(JSON.stringify({
    ok: true,
    desktopShot,
    mobileShot,
    exhibits: afterQuest.exhibits,
    stat: afterQuest.stat,
  }, null, 2));
  client.close();
} finally {
  edge.kill();
  await new Promise((resolveKill) => setTimeout(resolveKill, 250));
  server.close();
  cleanupProfile();
}
