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
const webPort = 8826;
const cdpPort = 9276;
const url = `http://127.0.0.1:${webPort}/?v75-toast-grounding=1`;
const profile = join(root, "tmp", `edge-v75-toast-grounding-${Date.now()}`);
const toastShot = join(root, "verification-v75-toast-grounding-toast-local.png");
const mobileShot = join(root, "verification-v75-toast-grounding-mobile-local.png");
const roomShot = join(root, "verification-v75-toast-grounding-room-local.png");

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
    width: 390,
    height: 760,
    deviceScaleFactor: 1,
    mobile: true,
  });

  const firstLoad = client.waitFor("Page.loadEventFired");
  await client.send("Page.navigate", { url });
  await firstLoad;
  await evaluate(client, "localStorage.removeItem('codex-little-depths-v4')");
  const reload = client.waitFor("Page.loadEventFired");
  await client.send("Page.reload", { ignoreCache: true });
  await reload;
  await evaluate(client, "new Promise((resolve) => setTimeout(resolve, 900))", true);

  const visible = await evaluate(client, `(() => {
    if (typeof closeGuideModal === "function") closeGuideModal(true);
    state = makeNewGame();
    state.coins = 18000;
    state.gems = 96;
    state.happiness = 88;
    const dwelling = state.floors.find((floor) => floor.type === "dwelling");
    while (dwelling.residents.length < 3) {
      addResidentToDwelling(state, dwelling, makeResident(state, dwelling.residents.length % 2 ? "garden" : "service"));
    }
    const residents = dwelling.residents.map((entry) => getResident(entry.id)).filter(Boolean);
    const [left, right, solo] = residents;
    const scope = floorSocialScope(dwelling);
    left.socialPartnerId = right.id;
    right.socialPartnerId = left.id;
    left.socialGroup = "v75-grounding";
    right.socialGroup = "v75-grounding";
    left.socialFloorScope = scope;
    right.socialFloorScope = scope;
    left.socialRole = "left";
    right.socialRole = "right";
    left.socialScene = "chat";
    right.socialScene = "chat";
    left.socialLabel = "grounding";
    right.socialLabel = "grounding";
    left.socialPhase = "engage";
    right.socialPhase = "engage";
    left.socialTotal = 30;
    right.socialTotal = 30;
    left.socialTimer = 30;
    right.socialTimer = 30;
    left.activity = "talk";
    right.activity = "chat";
    left.activityTimer = 12;
    right.activityTimer = 12;
    setPersonMotion(left, { x: 38, y: 22, scale: 0.96, facing: "right", mode: "social", spotId: "v75-high" });
    setPersonMotion(right, { x: 58, y: 22, scale: 0.94, facing: "left", mode: "social", spotId: "v75-high" });
    solo.activity = "look";
    solo.activityTimer = 12;
    solo.socialCooldown = 999;
    setPersonMotion(solo, { x: 76, y: 18, scale: 0.95, facing: "left", mode: "observe", spotId: "v75-window" });
    state.selectedFloorId = dwelling.id;
    setMobilePanel("detail", true);
    render(true);
    showToast("visitor entered elevator", { duration: 8000 });
    return new Promise((resolve) => setTimeout(() => {
      const toast = document.getElementById("toast");
      const dock = document.querySelector(".mobile-panel-dock");
      const toastRect = toast.getBoundingClientRect();
      const dockRect = dock?.getBoundingClientRect();
      resolve({
        appVersion: [...document.scripts].some((script) => script.src.includes("app.js?v=75")),
        cssVersion: [...document.querySelectorAll('link[rel="stylesheet"]')].some((link) => link.href.includes("overrides.css?v=75")),
        visible: toast.classList.contains("show"),
        opacity: Number(getComputedStyle(toast).opacity),
        pointerEvents: getComputedStyle(toast).pointerEvents,
        ariaHidden: toast.getAttribute("aria-hidden"),
        text: toast.textContent,
        dockVisible: Boolean(dock) && getComputedStyle(dock).display !== "none",
        clearance: dockRect ? Math.round(dockRect.top - toastRect.bottom) : null,
        noHorizontalOverflow: document.documentElement.scrollWidth <= window.innerWidth + 1,
      });
    }, 320));
  })()`, true);

  assert(visible.appVersion && visible.cssVersion, "index.html should load v75 app and CSS.");
  assert(visible.visible && visible.opacity > 0.65, "Toast should become visible immediately.");
  assert(visible.pointerEvents === "none", "Toast should never block pointer input.");
  assert(visible.ariaHidden === null, "Visible toast should be exposed to aria-live.");
  assert(visible.dockVisible && visible.clearance >= 6, "Visible mobile toast should sit above the bottom dock.");
  assert(visible.noHorizontalOverflow, "Mobile layout should not create horizontal overflow.");
  await capture(client, toastShot);

  const hidden = await evaluate(client, `(async () => {
    await new Promise((resolve) => setTimeout(resolve, 3050));
    const dwelling = state.floors.find((floor) => floor.type === "dwelling");
    const residents = dwelling.residents.map((entry) => getResident(entry.id)).filter(Boolean);
    const [left, right, solo] = residents;
    const scope = floorSocialScope(dwelling);
    left.socialPartnerId = right.id;
    right.socialPartnerId = left.id;
    left.socialGroup = "v75-grounding";
    right.socialGroup = "v75-grounding";
    left.socialFloorScope = scope;
    right.socialFloorScope = scope;
    left.socialRole = "left";
    right.socialRole = "right";
    left.socialScene = "chat";
    right.socialScene = "chat";
    left.socialLabel = "grounding";
    right.socialLabel = "grounding";
    left.socialPhase = "engage";
    right.socialPhase = "engage";
    left.socialTotal = 30;
    right.socialTotal = 30;
    left.socialTimer = 30;
    right.socialTimer = 30;
    left.activity = "talk";
    right.activity = "chat";
    left.activityTimer = 30;
    right.activityTimer = 30;
    setPersonMotion(left, { x: 38, y: 22, scale: 0.96, facing: "right", mode: "social", spotId: "v75-high" });
    setPersonMotion(right, { x: 58, y: 22, scale: 0.94, facing: "left", mode: "social", spotId: "v75-high" });
    delete solo.socialPartnerId;
    delete solo.socialGroup;
    delete solo.socialFloorScope;
    solo.activity = "look";
    solo.activityTimer = 30;
    solo.socialCooldown = 999;
    setPersonMotion(solo, { x: 76, y: 18, scale: 0.95, facing: "left", mode: "observe", spotId: "v75-window" });
    state.selectedFloorId = dwelling.id;
    render(true);
    await new Promise((resolve) => setTimeout(resolve, 180));
    const toast = document.getElementById("toast");
    const floor = document.querySelector('.floor[data-type="dwelling"]');
    const stage = floor?.querySelector(".life-stage");
    const scene = floor?.querySelector(".room-scene");
    const stageRect = stage?.getBoundingClientRect();
    const sceneRect = scene?.getBoundingClientRect();
    const people = [...(stage?.children || [])]
      .filter((element) => element.matches(".resident-dot, .worker-dot, .social-pair"))
      .map((element) => {
        const rect = element.getBoundingClientRect();
        const style = getComputedStyle(element);
        return {
          className: element.className,
          bottom: style.bottom,
          stageBottomGap: Math.round(stageRect.bottom - rect.bottom),
          sceneBottomGap: Math.round(sceneRect.bottom - rect.bottom),
          topInsideScene: Math.round(rect.top - sceneRect.top),
          width: Math.round(rect.width),
          height: Math.round(rect.height),
        };
      });
    const swText = await fetch("sw.js", { cache: "no-store" }).then((response) => response.text());
    const cssText = await fetch("overrides.css?v=75", { cache: "no-store" }).then((response) => response.text());
    return {
      toastVisible: toast.classList.contains("show"),
      toastOpacity: Number(getComputedStyle(toast).opacity),
      toastPointerEvents: getComputedStyle(toast).pointerEvents,
      toastAriaHidden: toast.getAttribute("aria-hidden"),
      toastText: toast.textContent,
      people,
      hasSocialPair: Boolean(stage?.querySelector(".social-pair")),
      hasSolo: people.some((entry) => entry.className.includes("resident-dot")),
      cssGrounding: cssText.includes("--person-lift") && cssText.includes("--pair-lift"),
      swv75: swText.includes("little-depths-v75") && swText.includes("app.js?v=75"),
      noHorizontalOverflow: document.documentElement.scrollWidth <= window.innerWidth + 1,
    };
  })()`, true);

  assert(!hidden.toastVisible && hidden.toastOpacity === 0, "Toast should be visually gone within three seconds.");
  assert(hidden.toastPointerEvents === "none", "Hidden toast should not block input.");
  assert(hidden.toastAriaHidden === "true", "Hidden toast should be aria-hidden.");
  assert(hidden.toastText === "", "Hidden toast text should be cleared.");
  assert(hidden.hasSocialPair, "Dwelling should render a social pair for grounding checks.");
  assert(hidden.cssGrounding && hidden.swv75, "v75 CSS and service worker markers should be present.");
  assert(hidden.noHorizontalOverflow, "Grounded mobile scene should not create horizontal overflow.");
  assert(hidden.people.length >= 2, `Expected at least two rendered room people/groups, got ${hidden.people.length}.`);
  for (const person of hidden.people) {
    assert(person.stageBottomGap >= 8 && person.stageBottomGap <= 28, `Person/group is not grounded: ${JSON.stringify(person)}`);
    assert(person.topInsideScene >= -24, `Person/group floats outside room scene: ${JSON.stringify(person)}`);
  }
  await capture(client, mobileShot);

  await evaluate(client, `(() => {
    setMobilePanel("close", false);
    render(true);
    return new Promise((resolve) => setTimeout(resolve, 360));
  })()`, true);
  await capture(client, roomShot);

  assert(!errors.length, `Browser reported errors: ${errors.join("; ")}`);
  console.log(JSON.stringify({ visible, hidden, screenshots: [toastShot, mobileShot, roomShot] }, null, 2));
  client.close();
} finally {
  edge.kill();
  server.close();
  cleanupProfile();
}
