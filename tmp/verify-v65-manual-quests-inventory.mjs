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
const webPort = 8815;
const cdpPort = 9265;
const url = `http://127.0.0.1:${webPort}/?v65-manual-quests-inventory=1`;
const profile = join(root, "tmp", `edge-v65-manual-quests-inventory-${Date.now()}`);
const desktopShot = join(root, "verification-v65-manual-quests-inventory-local.png");
const mobileShot = join(root, "verification-v65-manual-quests-inventory-mobile-local.png");

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

  const manualReady = await evaluate(client, `(() => {
    state = makeNewGame();
    state.coins = 1000;
    state.gems = 5;
    state.stats.residentsMoved = 3;
    checkQuests();
    render(true);
    const quest = state.quests.find((entry) => entry.id === "residents");
    return {
      version: state.version,
      coins: state.coins,
      gems: state.gems,
      ready: quest?.ready,
      claimed: quest?.claimed,
      claimButton: Boolean(document.querySelector('[data-action="claim-quest"][data-quest-id="residents"]')),
      questCount: document.getElementById("questCount")?.textContent || "",
      inventoryAttention: document.getElementById("inventoryBtn")?.classList.contains("attention") || false
    };
  })()`);
  assert(manualReady.version === 20, `expected save version 20, got ${manualReady.version}`);
  assert(manualReady.coins === 1000 && manualReady.gems === 5, "checkQuests auto-awarded quest rewards");
  assert(manualReady.ready === true && manualReady.claimed === false, "completed quest was not marked ready");
  assert(manualReady.claimButton, "manual claim button was not rendered");
  assert(manualReady.questCount.includes("待领"), "quest count did not show pending rewards");
  assert(manualReady.inventoryAttention, "inventory button did not show pending reward attention state");

  const afterClaim = await evaluate(client, `(() => {
    document.querySelector('[data-action="claim-quest"][data-quest-id="residents"]').click();
    const quest = state.quests.find((entry) => entry.id === "residents");
    return {
      coins: state.coins,
      gems: state.gems,
      coinsEarned: state.stats.coinsEarned,
      ready: quest?.ready,
      claimed: quest?.claimed,
      claimButton: Boolean(document.querySelector('[data-action="claim-quest"][data-quest-id="residents"]')),
      log: state.logs[0]?.text || ""
    };
  })()`);
  assert(afterClaim.coins === 1130 && afterClaim.gems === 6, "claiming quest did not award the expected resources");
  assert(afterClaim.coinsEarned >= 130, "claimed quest coins were not counted as earned coins");
  assert(afterClaim.ready === false && afterClaim.claimed === true, "claiming quest did not update quest state");
  assert(!afterClaim.claimButton, "claim button remained after claiming");
  assert(afterClaim.log.includes("领取任务"), "claim log was not recorded");

  const inventory = await evaluate(client, `(() => {
    render(true);
    document.getElementById("inventoryBtn").click();
    const panel = document.getElementById("inventoryPanel");
    const text = panel?.textContent || "";
    const modal = document.getElementById("inventoryModal");
    return {
      open: modal && !modal.hidden,
      hasCoins: text.includes("金币") && text.includes("1130"),
      hasGems: text.includes("宝石") && text.includes("6"),
      hasPending: text.includes("待领任务"),
      hasRelics: text.includes("珍藏道具") && text.includes("月冠徽章"),
      hasStock: text.includes("楼层现货") && text.includes("蜜糖厨房"),
      hasRecords: text.includes("记录") && text.includes("探险回执"),
      topbarFits: document.querySelector(".topbar").scrollWidth <= document.querySelector(".topbar").clientWidth + 1
    };
  })()`);
  assert(inventory.open, "inventory modal did not open");
  assert(inventory.hasCoins && inventory.hasGems, "inventory modal did not show coins and gems");
  assert(inventory.hasPending, "inventory modal did not show pending quest reward summary");
  assert(inventory.hasRelics, "inventory modal did not show collection items");
  assert(inventory.hasStock, "inventory modal did not show floor stock");
  assert(inventory.hasRecords, "inventory modal did not show records");
  assert(inventory.topbarFits, "desktop topbar content overflowed");
  await capture(client, desktopShot);

  await client.send("Emulation.setDeviceMetricsOverride", {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true,
  });
  await evaluate(client, "new Promise((resolve) => setTimeout(resolve, 500))", true);
  const mobile = await evaluate(client, `(() => {
    const modal = document.querySelector(".inventory-scroll");
    const topbar = document.querySelector(".topbar");
    const rect = modal.getBoundingClientRect();
    const front = document.elementFromPoint(window.innerWidth / 2, Math.min(window.innerHeight - 80, rect.top + rect.height / 2));
    return {
      modalVisible: rect.width > 0 && rect.height > 0,
      modalFitsWidth: rect.width <= window.innerWidth,
      modalFitsHeight: rect.height <= window.innerHeight,
      modalOnTop: Boolean(front && (front.closest("#inventoryModal") || modal.contains(front))),
      topbarFits: topbar.scrollWidth <= topbar.clientWidth + 1,
      noDocumentOverflow: document.documentElement.scrollWidth <= window.innerWidth + 1,
      gridColumns: getComputedStyle(document.querySelector(".inventory-grid")).gridTemplateColumns.split(" ").length
    };
  })()`);
  assert(mobile.modalVisible && mobile.modalFitsWidth && mobile.modalFitsHeight, "mobile inventory modal did not fit viewport");
  assert(mobile.modalOnTop, "mobile inventory modal was covered by another panel");
  assert(mobile.topbarFits, "mobile topbar content overflowed");
  assert(mobile.noDocumentOverflow, "mobile page has horizontal overflow");
  assert(mobile.gridColumns <= 2, "mobile inventory grid did not collapse");
  await capture(client, mobileShot);

  assert(errors.length === 0, `browser errors: ${errors.join("; ")}`);
  client.close();
  console.log(JSON.stringify({ ok: true, desktopShot, mobileShot, manualReady, afterClaim, inventory, mobile }, null, 2));
} finally {
  edge.kill();
  server.close();
  cleanupProfile();
}
