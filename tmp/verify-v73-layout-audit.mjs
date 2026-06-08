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
const webPort = 8824;
const cdpPort = 9274;
const profile = join(root, "tmp", `edge-v73-layout-audit-${Date.now()}`);
const phase = process.argv[2] || "before";
const reportPath = join(root, "tmp", `layout-audit-v73-${phase}.json`);

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

async function loadFresh(client, viewport) {
  await setViewport(client, viewport);
  let load = client.waitFor("Page.loadEventFired");
  await client.send("Page.navigate", { url: `http://127.0.0.1:${webPort}/?v73-layout-audit=${Date.now()}` });
  await load;
  await evaluate(client, "localStorage.removeItem('codex-little-depths-v4')");
  load = client.waitFor("Page.loadEventFired");
  await client.send("Page.reload", { ignoreCache: true });
  await load;
  await evaluate(client, "new Promise((resolve) => setTimeout(resolve, 700))", true);
  await evaluate(client, `(() => {
    if (typeof closeGuideModal === "function") closeGuideModal(true);
    if (typeof state !== "undefined" && typeof makeNewGame === "function") {
      state = makeNewGame();
      state.coins = 12888;
      state.gems = 88;
      state.streak = 9;
      state.happiness = 96;
      state.stats.rentsCollected = 12;
      state.stats.ordersCompleted = 4;
      state.stats.expeditionsDone = 2;
      state.stats.comfortFocusesDone = 3;
      const dwelling = state.floors.find((floor) => floor.type === "dwelling");
      if (dwelling) {
        while (dwelling.residents.length < Math.min(10, populationCap(state))) {
          addResidentToDwelling(state, dwelling, makeResident(state, dwelling.residents.length % 2 ? "garden" : "bathhouse"));
        }
      }
      ["garden", "food", "service", "market", "library", "observatory", "craft", "bathhouse"].forEach((type, index) => {
        if (!state.floors.some((floor) => floor.type === type)) {
          const floor = createFloor(state, type, { level: 2 + (index % 2), stock: 10 + index });
          floor.stockMax = 16 + index;
          state.floors.push(floor);
        }
      });
      ensureOrders(state);
      state.quests.forEach((quest) => {
        quest.claimed = false;
      });
      state.selectedFloorId = state.floors.find((floor) => floor.type === "garden")?.id || state.floors[0]?.id;
      if (typeof render === "function") render(true);
      if (typeof setMobilePanel === "function") setMobilePanel("detail", true);
    }
  })()`);
  await evaluate(client, "new Promise((resolve) => setTimeout(resolve, 450))", true);
}

async function collectAudit(client, label) {
  return evaluate(client, `(() => {
    const round = (value) => Math.round(value * 10) / 10;
    const rectFor = (element) => {
      if (!element) return null;
      const rect = element.getBoundingClientRect();
      return {
        left: round(rect.left),
        top: round(rect.top),
        right: round(rect.right),
        bottom: round(rect.bottom),
        width: round(rect.width),
        height: round(rect.height),
      };
    };
    const visible = (element) => {
      if (!element || element.hidden) return false;
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return style.display !== "none" && style.visibility !== "hidden" && Number(style.opacity) !== 0 && rect.width > 1 && rect.height > 1;
    };
    const overlapArea = (a, b) => Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left)) * Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top));
    const selectors = [
      ".topbar",
      ".brand",
      ".resources",
      ".top-actions",
      ".layout",
      ".stage-panel",
      ".kingdom-scroll",
      ".side-panel",
      ".side-panel .elevator-card",
      ".side-panel .mobile-panel-active",
      ".mobile-panel-dock",
      ".toast.show",
      ".modal-backdrop:not([hidden]) .modal",
      ".guide-scroll",
      ".inventory-scroll",
    ];
    const rects = Object.fromEntries(selectors.map((selector) => [selector, rectFor(document.querySelector(selector))]));
    const issues = [];
    const viewport = { width: innerWidth, height: innerHeight, scrollWidth: document.documentElement.scrollWidth, scrollHeight: document.documentElement.scrollHeight };
    if (viewport.scrollWidth > viewport.width + 2) {
      issues.push({ type: "horizontal-overflow", amount: viewport.scrollWidth - viewport.width });
    }
    for (const [selector, rect] of Object.entries(rects)) {
      if (!rect) continue;
      if (rect.left < -2 || rect.right > viewport.width + 2) {
        issues.push({ type: "viewport-x-overflow", selector, rect });
      }
      const fixedLike = [".mobile-panel-dock", ".toast.show", ".modal-backdrop:not([hidden]) .modal", ".guide-scroll", ".inventory-scroll"].includes(selector);
      if (fixedLike && (rect.top < -2 || rect.bottom > viewport.height + 2)) {
        issues.push({ type: "fixed-y-overflow", selector, rect });
      }
    }
    const resources = document.querySelector(".resources");
    const dock = document.querySelector(".mobile-panel-dock");
    const toast = document.querySelector(".toast.show");
    const activePanel = document.querySelector(".side-panel .mobile-panel-active");
    if (visible(resources) && visible(dock)) {
      const a = rectFor(resources);
      const b = rectFor(dock);
      if (overlapArea(a, b) > 12) issues.push({ type: "resources-dock-overlap", resources: a, dock: b });
    }
    if (visible(toast) && visible(dock)) {
      const a = rectFor(toast);
      const b = rectFor(dock);
      if (a.bottom > b.top - 8) issues.push({ type: "toast-too-low", toast: a, dock: b });
    }
    if (visible(toast) && visible(activePanel)) {
      const a = rectFor(toast);
      const b = rectFor(activePanel);
      if (overlapArea(a, b) > 12) issues.push({ type: "toast-panel-overlap", toast: a, panel: b });
    }
    if (visible(activePanel) && visible(dock)) {
      const a = rectFor(activePanel);
      const b = rectFor(dock);
      if (a.bottom > b.top - 8) issues.push({ type: "mobile-panel-too-low", panel: a, dock: b });
      if (a.top < rectFor(document.querySelector(".topbar"))?.bottom + 6) issues.push({ type: "mobile-panel-top-crowd", panel: a });
    }
    const clipping = Array.from(document.querySelectorAll("button, .resource, .quest, .order, .inventory-item, .inventory-relic, .inventory-stock, .section-head, .detail-btn, .wide-btn, .floor-detail, .resident-card"))
      .filter(visible)
      .map((element) => {
        const deltaX = element.scrollWidth - element.clientWidth;
        const deltaY = element.scrollHeight - element.clientHeight;
        if (deltaX > 2 || deltaY > 2) {
          return {
            selector: element.id ? "#" + element.id : element.className ? "." + String(element.className).trim().replace(/\\s+/g, ".") : element.tagName.toLowerCase(),
            text: element.textContent.trim().slice(0, 80),
            deltaX,
            deltaY,
            rect: rectFor(element),
          };
        }
        return null;
      })
      .filter(Boolean)
      .slice(0, 20);
    if (clipping.length) issues.push({ type: "content-clipping", items: clipping });
    return { label: ${JSON.stringify(label)}, viewport, bodyClass: document.body.className, rects, issues };
  })()`);
}

async function clickSelector(client, selector) {
  await evaluate(client, `(() => {
    const el = document.querySelector(${JSON.stringify(selector)});
    if (el) el.click();
  })()`);
  await evaluate(client, "new Promise((resolve) => setTimeout(resolve, 450))", true);
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

  const viewports = [
    { label: "desktop", width: 1280, height: 900, mobile: false },
    { label: "tablet", width: 768, height: 920, mobile: true },
    { label: "mobile", width: 375, height: 812, mobile: true },
    { label: "narrow", width: 340, height: 740, mobile: true },
  ];
  const audits = [];
  for (const viewport of viewports) {
    await loadFresh(client, viewport);
    await evaluate(client, "showToast('排版审查：底部功能栏不应遮住互动信息')");
    await evaluate(client, "new Promise((resolve) => setTimeout(resolve, 120))", true);
    audits.push(await collectAudit(client, `${viewport.label}-main-toast`));
    await capture(client, join(root, `verification-v73-layout-${viewport.label}-main-${phase}.png`));

    if (viewport.width <= 980) {
      for (const panel of ["detail", "roster", "quests", "orders", "collection", "expeditions", "log"]) {
        await evaluate(client, `typeof setMobilePanel === "function" && setMobilePanel(${JSON.stringify(panel)}, true)`);
        await evaluate(client, "new Promise((resolve) => setTimeout(resolve, 220))", true);
        audits.push(await collectAudit(client, `${viewport.label}-panel-${panel}`));
      }
    }

    await clickSelector(client, "#inventoryBtn");
    audits.push(await collectAudit(client, `${viewport.label}-inventory`));
    await capture(client, join(root, `verification-v73-layout-${viewport.label}-inventory-${phase}.png`));
    await clickSelector(client, "#closeInventoryBtn");

    await clickSelector(client, "#guideBtn");
    audits.push(await collectAudit(client, `${viewport.label}-guide`));
    await capture(client, join(root, `verification-v73-layout-${viewport.label}-guide-${phase}.png`));
    await evaluate(client, "typeof closeGuideModal === 'function' && closeGuideModal(true)");

    await evaluate(client, "typeof showBuildModal === 'function' && showBuildModal('up')");
    audits.push(await collectAudit(client, `${viewport.label}-build`));
    await capture(client, join(root, `verification-v73-layout-${viewport.label}-build-${phase}.png`));
    await evaluate(client, "typeof closeBuildModal === 'function' && closeBuildModal()");
  }

  const report = { generatedAt: new Date().toISOString(), errors, audits };
  writeFileSync(reportPath, JSON.stringify(report, null, 2));
  const issueCount = audits.reduce((sum, audit) => sum + audit.issues.length, 0);
  console.log(JSON.stringify({ reportPath, issueCount, errorCount: errors.length }, null, 2));
  if (errors.length) throw new Error(`Console/runtime errors: ${errors.join("; ")}`);
} finally {
  edge.kill();
  server.close();
  cleanupProfile();
}
