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
const webPort = 8821;
const cdpPort = 9271;
const url = `http://127.0.0.1:${webPort}/?v71-craft-tool-tune=1`;
const profile = join(root, "tmp", `edge-v71-craft-tool-tune-${Date.now()}`);
const mapShot = join(root, "verification-v71-craft-tool-tune-map-local.png");
const desktopShot = join(root, "verification-v71-craft-tool-tune-local.png");
const mobileShot = join(root, "verification-v71-craft-tool-tune-mobile-local.png");

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
  await evaluate(client, "new Promise((resolve) => setTimeout(resolve, 700))", true);

  const seeded = await evaluate(client, `(() => {
    state = makeNewGame();
    state.coins = 7200;
    state.gems = 48;
    state.orders = [];
    state.expeditions = [];
    const dwelling = state.floors.find((floor) => floor.type === "dwelling");
    while (dwelling.residents.length < 10) {
      addResidentToDwelling(state, dwelling, makeResident(state, dwelling.residents.length % 2 ? "craft" : "clockwork"));
    }
    state.floors.forEach((entry) => {
      if (Array.isArray(entry.workers)) entry.workers = [];
    });
    const craft = createFloor(state, "craft", { name: "校准工坊", stock: 18, level: 3 });
    craft.stockMax = 24;
    craft.toolTuneCooldown = 0;
    craft.toolTune = null;
    state.floors.push(craft);
    const construction = createConstructionFloor(state, "market", "down");
    construction.buildRemaining = 38;
    construction.buildTotal = 38;
    state.floors.push(construction);
    const food = state.floors.find((floor) => floor.type === "food");
    food.workers = [];
    food.production = { remaining: 34, total: 34, bonus: 1 };
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
      person.favoriteTypes = ["craft", "clockwork", "market"];
      person.dreamType = index < 5 ? "craft" : "clockwork";
      person.motives = { food: 68, entertainment: 62, social: 28 + index * 4, energy: 24 + index * 3 };
      person.need = index % 2 ? "social" : "energy";
      person.activity = "look";
      person.activityTimer = 0;
      assignPersonMotion(person, "dwelling", "look");
    });
    [residents[0], residents[1]].forEach((person, index) => {
      person.workFloorId = craft.id;
      person.dreamType = "craft";
      person.skills.craft = Math.max(person.skills.craft || 1, 9 - index);
      craft.workers.push(person.id);
    });
    startExpedition("moss", residents[4]);
    if (state.expeditions[0]) {
      state.expeditions[0].remaining = 42;
      state.expeditions[0].total = 42;
      state.expeditions[0].toolTunePrep = 0;
    }
    const order = createOrder(state, { type: "craft", amount: 5, note: "工具校准验收" });
    state.orders.unshift(order);
    state.selectedFloorId = craft.id;
    state.stats.craftFloorsBuilt = Math.max(state.stats.craftFloorsBuilt || 0, 1);
    render(true);
    return {
      version: state.version,
      craftId: craft.id,
      button: Boolean(document.querySelector('[data-action="tool-tune"]')),
      roomArt: getComputedStyle(document.querySelector('.floor[data-type="craft"] .room')).getPropertyValue('--room-art'),
      orderReward: order.reward,
      expeditionRemaining: state.expeditions[0]?.remaining || 0,
    };
  })()`);

  assert(seeded.version === 25, `Expected save version 25, got ${seeded.version}`);
  assert(seeded.button, "Tool tune action button did not render.");
  assert(String(seeded.roomArt).includes("room-craft-v3.webp"), `Craft room art was not v3: ${seeded.roomArt}`);

  const started = await evaluate(client, `(() => {
    const craft = findFloor(${seeded.craftId});
    const food = state.floors.find((floor) => floor.type === "food");
    const construction = state.floors.find((floor) => floor.status === "construction");
    const order = state.orders.find((entry) => entry.type === "craft");
    const before = {
      stock: craft.stock,
      build: construction.buildRemaining,
      production: food.production.remaining,
      orderReward: order.reward,
      expeditionRemaining: state.expeditions[0]?.remaining || 0,
    };
    document.querySelector('[data-action="tool-tune"]').click();
    const activeAfterClick = isActiveToolTune(craft);
    const participantsAfterClick = toolTuneParticipants(craft).length;
    const lifeVisitReasonsAfterClick = allResidents(state).filter((person) => person.lifeVisit?.reason === "toolTune").length;
    for (let index = 0; index < 16; index += 1) {
      updateToolTuneFloor(craft, 1);
    }
    checkQuests();
    render(true);
    const questDef = QUEST_DEFS.find((quest) => quest.id === "tool_tune");
    const readyBeforeClaim = isQuestReady(questDef);
    const questBefore = questEntry(questDef);
    const claimedBeforeManual = Boolean(questBefore.claimed);
    const coinsBeforeClaim = state.coins;
    const gemsBeforeClaim = state.gems;
    claimQuest("tool_tune");
    const questAfter = questEntry(questDef);
    return {
      activeAfterClick,
      stockConsumed: craft.stock < before.stock,
      participantCount: participantsAfterClick,
      lifeVisitReasons: lifeVisitReasonsAfterClick,
      marks: state.stats.toolTuneMarksDone || 0,
      sessions: state.stats.toolTuneSessionsDone || 0,
      questReadyBeforeClaim: readyBeforeClaim,
      questClaimedBeforeClick: claimedBeforeManual,
      questClaimedAfterClick: Boolean(questAfter.claimed),
      questCoinDiff: state.coins - coinsBeforeClaim,
      questGemDiff: state.gems - gemsBeforeClaim,
      constructionReduced: construction.buildRemaining < before.build,
      productionReduced: food.production.remaining < before.production,
      expeditionPrep: state.expeditions[0]?.toolTunePrep || 0,
      expeditionRemainingReduced: (state.expeditions[0]?.remaining || 0) < before.expeditionRemaining,
      orderRewardBoosted: order.reward > before.orderReward,
      layer: Boolean(document.querySelector('.tool-tune-layer')),
      phaseStack: Boolean(document.querySelector('.tool-tune-phase-stack')),
      sparks: Boolean(document.querySelector('.tool-tune-sparks')),
      statusGlyph: Boolean(document.querySelector('.floor.tool-tune-active[data-type="craft"] .status-glyph[data-state="tool-tune"]')),
      statusTag: Boolean(document.querySelector('.room-state-tag[data-state="tool-tune"]')),
      panel: Boolean(document.querySelector('.tool-tune-panel')),
      noHorizontalOverflow: document.documentElement.scrollWidth <= window.innerWidth + 2,
    };
  })()`);

  assert(started.activeAfterClick, "Tool tune did not start from the detail button.");
  assert(started.stockConsumed, "Tool tune did not consume craft stock.");
  assert(started.participantCount >= 1, "Tool tune did not pull residents into the craft floor.");
  assert(started.lifeVisitReasons >= 1, "Tool tune participants were not tagged with lifeVisit.reason=toolTune.");
  assert(started.sessions >= 1, "Tool tune session stat did not advance.");
  assert(started.marks >= 6, `Expected at least 6 tool tune marks, got ${started.marks}.`);
  assert(started.questReadyBeforeClaim, "Tool tune quest was not ready before manual claim.");
  assert(!started.questClaimedBeforeClick, "Tool tune quest was already claimed before clicking claim.");
  assert(started.questClaimedAfterClick, "Manual quest claim did not mark the quest claimed.");
  assert(started.questCoinDiff === 560, `Manual claim coin reward mismatch: ${started.questCoinDiff}`);
  assert(started.questGemDiff === 3, `Manual claim gem reward mismatch: ${started.questGemDiff}`);
  assert(started.constructionReduced, "Tool tune did not assist construction.");
  assert(started.productionReduced, "Tool tune did not assist production.");
  assert(started.expeditionPrep > 0, "Tool tune did not add expedition prep.");
  assert(started.expeditionRemainingReduced, "Tool tune did not shorten expedition time.");
  assert(started.orderRewardBoosted, "Tool tune did not boost craft order reward.");
  assert(started.layer && started.phaseStack && started.sparks, "Tool tune map overlay did not render.");
  assert(started.statusGlyph && started.statusTag, "Tool tune status glyph/tag did not render.");
  assert(started.panel, "Tool tune detail panel did not render.");
  assert(started.noHorizontalOverflow, "Desktop layout has horizontal overflow.");

  const assetOk = await fetch(`http://127.0.0.1:${webPort}/assets/art/room-craft-v3.webp`).then((response) => response.ok && response.headers.get("content-type")?.includes("image/webp"));
  assert(assetOk, "room-craft-v3.webp was not served as WebP.");

  await evaluate(client, `new Promise((resolve) => {
    document.querySelector('[data-floor-id="${seeded.craftId}"]')?.scrollIntoView({ block: "center", inline: "nearest" });
    setTimeout(resolve, 280);
  })`, true);
  await capture(client, mapShot);
  const inventoryDesktop = await evaluate(client, `(() => {
    openInventoryModal();
    return {
      hasToolRecord: document.querySelector('#inventoryPanel')?.textContent.includes('工具校准'),
      noOverflow: document.documentElement.scrollWidth <= window.innerWidth + 2,
    };
  })()`);
  assert(inventoryDesktop.hasToolRecord, "Inventory/backpack did not include the tool tune record.");
  assert(inventoryDesktop.noOverflow, "Desktop inventory has horizontal overflow.");
  await capture(client, desktopShot);

  await client.send("Emulation.setDeviceMetricsOverride", {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true,
  });
  await evaluate(client, `(() => {
    closeInventoryModal();
    state.selectedFloorId = ${seeded.craftId};
    setMobilePanel("detail", true);
    render(true);
    openInventoryModal();
    return true;
  })()`);
  await evaluate(client, "new Promise((resolve) => setTimeout(resolve, 260))", true);
  const mobile = await evaluate(client, `(() => ({
    noDocumentOverflow: document.documentElement.scrollWidth <= window.innerWidth + 2,
    inventoryOverflow: !document.querySelector('#inventoryPanel') || document.querySelector('#inventoryPanel').scrollWidth <= document.querySelector('#inventoryPanel').clientWidth + 2,
    detailOverflow: !document.querySelector('#floorDetail') || document.querySelector('#floorDetail').scrollWidth <= document.querySelector('#floorDetail').clientWidth + 2,
    hasToolRecord: document.querySelector('#inventoryPanel')?.textContent.includes('工具校准'),
  }))()`);
  assert(mobile.noDocumentOverflow, "Mobile document has horizontal overflow.");
  assert(mobile.inventoryOverflow, "Mobile inventory panel has horizontal overflow.");
  assert(mobile.detailOverflow, "Mobile detail panel has horizontal overflow.");
  assert(mobile.hasToolRecord, "Mobile inventory did not show tool tune record.");
  await capture(client, mobileShot);

  assert(errors.length === 0, `Browser logged errors: ${errors.join("; ")}`);
  console.log(JSON.stringify({
    ok: true,
    marks: started.marks,
    participants: started.participantCount,
    expeditionPrep: started.expeditionPrep,
    mapShot,
    desktopShot,
    mobileShot,
  }, null, 2));
  client.close();
} finally {
  edge.kill();
  server.close();
  cleanupProfile();
}
