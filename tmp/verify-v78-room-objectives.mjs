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
const webPort = 8830;
const cdpPort = 9280;
const url = `http://127.0.0.1:${webPort}/?v78-room-objectives=1`;
const profile = join(root, "tmp", `edge-v78-room-objectives-${Date.now()}`);
const desktopShot = join(root, "verification-v78-room-objectives-local.png");
const mobileShot = join(root, "verification-v78-room-objectives-mobile-local.png");

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
    width: 1280,
    height: 880,
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
    if (typeof closeGuideModal === "function") closeGuideModal(true);
    state = makeNewGame();
    state.coins = 24000;
    state.gems = 120;
    state.happiness = 91;
    const dwelling = state.floors.find((floor) => floor.type === "dwelling");
    const expectedTypes = Object.keys(FLOOR_TYPES).filter((type) => type !== "lobby").sort();
    dwelling.capacity = Math.max(36, expectedTypes.length + 12);
    for (const type of expectedTypes) {
      let floor = state.floors.find((candidate) => candidate.type === type);
      if (!floor) {
        floor = createFloor(state, type, { name: \`目标\${FLOOR_TYPES[type].label}\`, stock: 14 });
        state.floors.push(floor);
      }
      if (floor.type === "dwelling") continue;
      floor.stock = Math.max(floor.stock || 0, 13);
      const worker = makeResident(state, type);
      addResidentToDwelling(state, dwelling, worker);
      hireBestWorker(floor, state, true);
    }
    for (let index = 0; index < 8; index += 1) {
      addResidentToDwelling(state, dwelling, makeResident(state, index % 2 ? "food" : "service"));
    }
    const market = state.floors.find((floor) => floor.type === "market");
    state.orders = [createOrder(state, { type: "food", amount: 8, note: "v78 目标测试订单" })];
    state.selectedFloorId = market.id;
    window.__v78ExpectedTypes = expectedTypes;
    render(true);
    return {
      selectedType: findFloor(state.selectedFloorId).type,
      objective: floorObjective(findFloor(state.selectedFloorId)),
      floorCount: state.floors.length,
      expectedTypes,
    };
  })()`);

  assert(seeded.selectedType === "market", "Market floor was not selected for objective QA.");
  assert(seeded.objective?.action === "market-deal", `Expected market-deal objective, got ${seeded.objective?.action || "none"}.`);
  assert(seeded.floorCount >= seeded.expectedTypes.length + 1, "Seeded kingdom did not include all known room types.");

  const desktop = await evaluate(client, `(() => {
    const panel = document.querySelector(".floor-objective-panel");
    const action = document.querySelector(".floor-objective-action");
    const selected = document.querySelector(".floor.selected");
    const cues = [...document.querySelectorAll(".room-objective-cue")];
    const overlaps = [];
    document.querySelectorAll(".room-scene").forEach((scene) => {
      const stateTag = scene.querySelector(".room-state-tag");
      const cue = scene.querySelector(".room-objective-cue");
      if (!stateTag || !cue) return;
      const a = stateTag.getBoundingClientRect();
      const b = cue.getBoundingClientRect();
      const touching = a.right > b.left && b.right > a.left && a.bottom > b.top && b.bottom > a.top;
      if (touching) overlaps.push(scene.closest(".floor")?.dataset.type || "unknown");
    });
    return {
      panelTone: panel?.dataset.tone || "",
      action: action?.dataset.action || "",
      actionDisabled: action?.disabled || false,
      selectedTone: selected?.dataset.objectiveTone || "",
      cueCount: cues.length,
      cueLabels: cues.map((cue) => cue.textContent.trim()).slice(0, 8),
      overlaps,
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
    };
  })()`);

  assert(desktop.panelTone === "ready", `Expected ready objective panel, got ${desktop.panelTone}.`);
  assert(desktop.action === "market-deal" && !desktop.actionDisabled, "Market objective action is not clickable.");
  assert(desktop.selectedTone === "ready", `Selected floor objective tone was ${desktop.selectedTone}.`);
  assert(desktop.cueCount >= 4, `Expected multiple map objective cues, got ${desktop.cueCount}.`);
  assert(!desktop.overlaps.length, `Objective cue overlaps state tag: ${desktop.overlaps.join(", ")}`);
  assert(desktop.scrollWidth <= desktop.innerWidth + 2, `Desktop horizontal overflow ${desktop.scrollWidth} > ${desktop.innerWidth}.`);

  const clicked = await evaluate(client, `(() => {
    document.querySelector(".floor-objective-action").click();
    render(true);
    const market = state.floors.find((floor) => floor.type === "market");
    return {
      marketParcel: Boolean(market.marketParcel),
      marketDealsDone: state.stats.marketDealsDone || 0,
      panelTone: document.querySelector(".floor-objective-panel")?.dataset.tone || "",
      selectedStatus: renderFloorStatus(market),
    };
  })()`);
  assert(clicked.marketParcel, "Clicking objective did not start a market parcel.");
  assert(clicked.marketDealsDone >= 1, "Market deal stat did not increment.");
  assert(clicked.panelTone === "running", `Expected running panel after action, got ${clicked.panelTone}.`);

  await capture(client, desktopShot);

  await client.send("Emulation.setDeviceMetricsOverride", {
    width: 390,
    height: 760,
    deviceScaleFactor: 1,
    mobile: true,
  });
  await evaluate(client, "render(true); new Promise((resolve) => setTimeout(resolve, 600))", true);
  const mobile = await evaluate(client, `(() => {
    const panel = document.querySelector(".floor-objective-panel");
    const action = document.querySelector(".floor-objective-action");
    const cues = [...document.querySelectorAll(".room-objective-cue")];
    const badText = [...document.querySelectorAll(".floor-objective-head span, .room-objective-cue b")].filter((node) => node.scrollWidth > node.clientWidth + 2).length;
    const resourceOverflow = [...document.querySelectorAll(".resource strong")].filter((node) => node.scrollWidth > node.clientWidth + 2).length;
    const people = [...document.querySelectorAll(".floor:not([data-type='lobby'])")]
      .flatMap((floor) => {
        const stage = floor.querySelector(".life-stage");
        const scene = floor.querySelector(".room-scene");
        if (!stage || !scene) return [];
        const stageRect = stage.getBoundingClientRect();
        const sceneRect = scene.getBoundingClientRect();
        return [...stage.children]
          .filter((element) => element.matches(".resident-dot, .worker-dot, .social-pair"))
          .map((element) => {
            const rect = element.getBoundingClientRect();
            return {
              floorType: floor.dataset.type,
              stageBottomGap: Math.round(stageRect.bottom - rect.bottom),
              sceneBottomGap: Math.round(sceneRect.bottom - rect.bottom),
              topInsideScene: Math.round(rect.top - sceneRect.top),
            };
          });
      });
    const expectedTypes = window.__v78ExpectedTypes || [];
    const testedTypes = [...new Set(people.map((entry) => entry.floorType))].sort();
    const missingTypes = expectedTypes.filter((type) => !testedTypes.includes(type));
    const overlaps = [];
    document.querySelectorAll(".room-scene").forEach((scene) => {
      const stateTag = scene.querySelector(".room-state-tag");
      const cue = scene.querySelector(".room-objective-cue");
      if (!stateTag || !cue) return;
      const a = stateTag.getBoundingClientRect();
      const b = cue.getBoundingClientRect();
      const touching = a.right > b.left && b.right > a.left && a.bottom > b.top && b.bottom > a.top;
      if (touching) overlaps.push(scene.closest(".floor")?.dataset.type || "unknown");
    });
    return {
      panelTone: panel?.dataset.tone || "",
      actionWidth: action?.getBoundingClientRect().width || 0,
      cueCount: cues.length,
      badText,
      resourceOverflow,
      overlaps,
      people,
      testedTypes,
      missingTypes,
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
    };
  })()`);

  assert(mobile.panelTone === "running", `Mobile panel tone should stay running, got ${mobile.panelTone}.`);
  assert(mobile.cueCount >= 4, `Mobile objective cues missing: ${mobile.cueCount}.`);
  assert(!mobile.badText, `Mobile objective text overflow count: ${mobile.badText}.`);
  assert(!mobile.resourceOverflow, `Mobile resource text overflow count: ${mobile.resourceOverflow}.`);
  assert(!mobile.overlaps.length, `Mobile objective cue overlaps state tag: ${mobile.overlaps.join(", ")}`);
  assert(!mobile.missingTypes.length, `Some room types did not render people: ${mobile.missingTypes.join(", ")}`);
  assert(mobile.people.length >= seeded.expectedTypes.length, `Expected at least ${seeded.expectedTypes.length} rendered people/groups, got ${mobile.people.length}.`);
  for (const person of mobile.people) {
    assert(person.stageBottomGap >= 36 && person.stageBottomGap <= 66, `Person/group feet should sit on the visible floor: ${JSON.stringify(person)}`);
    assert(person.sceneBottomGap >= 8 && person.sceneBottomGap <= 38, `Person/group should not sink below or float above the room floor: ${JSON.stringify(person)}`);
    assert(person.topInsideScene >= -36, `Person/group floats outside room scene: ${JSON.stringify(person)}`);
  }
  assert(mobile.scrollWidth <= mobile.innerWidth + 2, `Mobile horizontal overflow ${mobile.scrollWidth} > ${mobile.innerWidth}.`);
  await capture(client, mobileShot);

  assert(errors.length === 0, `Browser errors: ${errors.join(" | ")}`);
  console.log(JSON.stringify({ ok: true, desktop, clicked, mobile, shots: [desktopShot, mobileShot] }, null, 2));
  client.close();
} finally {
  edge.kill();
  server.close();
  cleanupProfile();
}
