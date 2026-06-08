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
const webPort = 8825;
const cdpPort = 9275;
const url = `http://127.0.0.1:${webPort}/?v74-life-reviews=1`;
const profile = join(root, "tmp", `edge-v74-life-reviews-${Date.now()}`);
const desktopPendingShot = join(root, "verification-v74-life-reviews-local.png");
const desktopReviewedShot = join(root, "verification-v74-life-reviews-reviewed-local.png");
const mobileShot = join(root, "verification-v74-life-reviews-mobile-local.png");

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
      }, 20000);
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

async function setViewport(client, viewport) {
  await client.send("Emulation.setDeviceMetricsOverride", {
    width: viewport.width,
    height: viewport.height,
    deviceScaleFactor: 1,
    mobile: viewport.mobile,
  });
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
  await setViewport(client, { width: 1440, height: 1050, mobile: false });

  const firstLoad = client.waitFor("Page.loadEventFired");
  await client.send("Page.navigate", { url });
  await firstLoad;
  await evaluate(client, "localStorage.removeItem('codex-little-depths-v4')");
  const reload = client.waitFor("Page.loadEventFired");
  await client.send("Page.reload", { ignoreCache: true });
  await reload;
  await evaluate(client, "new Promise((resolve) => setTimeout(resolve, 900))", true);

  const pending = await evaluate(client, `(() => {
    if (typeof closeGuideModal === "function") closeGuideModal(true);
    state = makeNewGame();
    state.coins = 14000;
    state.gems = 80;
    state.happiness = 88;
    const dwelling = state.floors.find((floor) => floor.type === "dwelling");
    while (dwelling.residents.length < 4) {
      addResidentToDwelling(state, dwelling, makeResident(state, dwelling.residents.length % 2 ? "garden" : "service"));
    }
    let garden = state.floors.find((floor) => floor.type === "garden");
    if (!garden) {
      garden = createFloor(state, "garden", { name: "回访花台", stock: 12, level: 2 });
      state.floors.push(garden);
    }
    garden.status = "open";
    garden.stock = 12;
    garden.stockMax = Math.max(garden.stockMax || 0, 18);
    const residents = dwelling.residents.map((entry) => getResident(entry.id)).filter(Boolean);
    const resident = residents[0];
    const companion = residents[1];
    resident.workFloorId = null;
    companion.workFloorId = null;
    resident.motives.social = 72;
    companion.motives.social = 68;
    const story = recordLifeStory(resident, {
      need: "social",
      floorId: garden.id,
      floorType: "garden",
      originFloorId: dwelling.id,
      originFloorType: "dwelling",
      label: "回访小路",
      companionId: companion.id,
      startMotive: 28,
    }, { outcome: "fulfilled" });
    state.selectedFloorId = dwelling.id;
    render(true);
    setMobilePanel("detail", true);
    const card = document.querySelector(".life-story-card.reviewable");
    const button = document.querySelector("[data-action='review-life-story']");
    const parent = button?.closest(".life-story-card");
    const buttonRect = button?.getBoundingClientRect();
    const parentRect = parent?.getBoundingClientRect();
    const buttonFits = Boolean(buttonRect && parentRect && buttonRect.left >= parentRect.left && buttonRect.right <= parentRect.right && buttonRect.top >= parentRect.top && buttonRect.bottom <= parentRect.bottom);
    return {
      version: state.version,
      appVersion: [...document.scripts].some((script) => script.src.includes("app.js?v=74")),
      cssVersion: [...document.querySelectorAll('link[rel="stylesheet"]')].some((link) => link.href.includes("overrides.css?v=74")),
      swVersion: "little-depths-v74",
      quest: QUEST_DEFS.some((quest) => quest.id === "life_story_reviews" && quest.metric === "lifeStoryReviewsDone"),
      storyId: story.id,
      beforeReviews: state.stats.lifeStoryReviewsDone || 0,
      pendingCount: pendingLifeStoryReviewCount(state),
      floorPending: pendingLifeStoryReviewsForFloor(dwelling).length,
      button: Boolean(button),
      card: Boolean(card),
      mapClass: Boolean(document.querySelector('.floor.life-story-review-ready[data-type="dwelling"]')),
      roomGlyph: Boolean(document.querySelector('.room-state-tag[data-state="life-story"]')),
      statusGlyph: Boolean(document.querySelector('.status-glyph[data-state="life-story"]')),
      inventoryMetric: document.querySelector("#inventoryBtn")?.classList.contains("attention") || false,
      buttonFits,
      rentBefore: dwelling.rentReady || 0,
    };
  })()`);

  assert(pending.version >= 27, `Expected save version >= 27, got ${pending.version}`);
  assert(pending.appVersion, "index.html should load app.js?v=74.");
  assert(pending.cssVersion, "index.html should load overrides.css?v=74.");
  assert(pending.quest, "life_story_reviews quest should be registered.");
  assert(pending.button && pending.card, "Life story panel should expose a reviewable card and button.");
  assert(pending.mapClass && pending.roomGlyph && pending.statusGlyph, "Dwelling map should expose pending review visual state.");
  assert(pending.inventoryMetric, "Inventory button should show attention for pending story reviews.");
  assert(pending.buttonFits, "Review button should fit inside the story card.");
  await capture(client, desktopPendingShot);

  const reviewed = await evaluate(client, `(() => {
    document.querySelector("[data-action='review-life-story']")?.click();
    return new Promise((resolve) => {
      setTimeout(() => {
        const dwelling = state.floors.find((floor) => floor.type === "dwelling");
        const story = state.lifeStories[0];
        const quest = questEntry(QUEST_DEFS.find((entry) => entry.id === "life_story_reviews"));
        render(true);
        resolve({
          reviewed: Boolean(story.reviewed),
          reviewedAt: Boolean(story.reviewedAt),
          reviewsDone: state.stats.lifeStoryReviewsDone || 0,
          pendingCount: pendingLifeStoryReviewCount(state),
          rentAfter: dwelling.rentReady || 0,
          happiness: state.happiness,
          cardReviewed: Boolean(document.querySelector(".life-story-card.reviewed")),
          buttonGone: !document.querySelector("[data-action='review-life-story']"),
          questReady: Boolean(quest.ready || (state.stats.lifeStoryReviewsDone || 0) >= QUEST_DEFS.find((entry) => entry.id === "life_story_reviews").goal),
          bonus: Math.round(lifeStoryReviewBonus(state) * 100),
        });
      }, 350);
    });
  })()`, true);

  assert(reviewed.reviewed && reviewed.reviewedAt, "Story should be marked as reviewed.");
  assert(reviewed.reviewsDone === pending.beforeReviews + 1, "Review stat should increment by one.");
  assert(reviewed.pendingCount === pending.pendingCount - 1, "Pending review count should decrease by one.");
  assert(reviewed.rentAfter > pending.rentBefore, "Review should add dwelling rent preparation.");
  assert(reviewed.cardReviewed && reviewed.buttonGone, "Reviewed UI state should replace the review button.");
  assert(reviewed.bonus >= 0, "Life story review bonus should be readable.");
  await capture(client, desktopReviewedShot);

  await setViewport(client, { width: 390, height: 760, mobile: true });
  const mobile = await evaluate(client, `(() => {
    setMobilePanel("detail", true);
    render(true);
    document.querySelector(".life-story-card.reviewed")?.scrollIntoView({ block: "center", inline: "nearest" });
    return new Promise((resolve) => {
      setTimeout(() => {
        const card = document.querySelector(".life-story-card.reviewed");
        const detail = document.querySelector(".floor-detail");
        const dock = document.querySelector(".mobile-panel-dock");
        const cr = card?.getBoundingClientRect();
        const dr = detail?.getBoundingClientRect();
        const kr = dock?.getBoundingClientRect();
        const cardInsideDetail = Boolean(cr && dr && cr.left >= dr.left - 1 && cr.right <= dr.right + 1);
        const dockOverlap = Boolean(cr && kr && Math.max(0, Math.min(cr.right, kr.right) - Math.max(cr.left, kr.left)) * Math.max(0, Math.min(cr.bottom, kr.bottom) - Math.max(cr.top, kr.top)) > 0);
        resolve({
          mobileLayout: document.body.classList.contains("mobile-panel-layout"),
          detailOpen: document.body.dataset.mobilePanel === "detail",
          cardInsideDetail,
          dockOverlap,
        });
      }, 350);
    });
  })()`, true);

  assert(mobile.mobileLayout && mobile.detailOpen, "Mobile detail panel should be active.");
  assert(mobile.cardInsideDetail, "Reviewed story card should fit inside mobile detail panel.");
  assert(!mobile.dockOverlap, "Reviewed story card should not overlap the mobile dock.");
  await capture(client, mobileShot);

  assert(!errors.length, `Browser reported errors: ${errors.join("; ")}`);
  console.log(JSON.stringify({ pending, reviewed, mobile, screenshots: [desktopPendingShot, desktopReviewedShot, mobileShot] }, null, 2));
  client.close();
} finally {
  edge.kill();
  server.close();
  cleanupProfile();
}
