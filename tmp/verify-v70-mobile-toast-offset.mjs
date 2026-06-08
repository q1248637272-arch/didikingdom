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
const webPort = 8820;
const cdpPort = 9270;
const url = `http://127.0.0.1:${webPort}/?v70-mobile-toast-offset=1`;
const profile = join(root, "tmp", `edge-v70-mobile-toast-offset-${Date.now()}`);
const mobileShot = join(root, "verification-v70-mobile-toast-offset-local.png");

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
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
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

  const result = await evaluate(client, `(async () => {
    showToast("移动端互动提示位置校验");
    await new Promise((resolve) => setTimeout(resolve, 360));
    const toast = document.getElementById("toast");
    const dock = document.getElementById("mobilePanelDock");
    const toastRect = toast.getBoundingClientRect();
    const dockRect = dock.getBoundingClientRect();
    const swText = await fetch("sw.js", { cache: "no-store" }).then((response) => response.text());
    const cssText = await fetch("overrides.css?v=70", { cache: "no-store" }).then((response) => response.text());
    return {
      appScript: Boolean(document.querySelector('script[src="app.js?v=70"]')),
      css: Boolean(document.querySelector('link[href="overrides.css?v=70"]')),
      swv70: swText.includes("little-depths-v70") && swText.includes("overrides.css?v=70"),
      cssv70: cssText.includes("body.mobile-panel-layout .toast") && cssText.includes("calc(92px + env(safe-area-inset-bottom))"),
      layoutClass: document.body.classList.contains("mobile-panel-layout"),
      dockVisible: Boolean(dock) && getComputedStyle(dock).display !== "none" && !dock.hidden,
      toastVisible: Boolean(toast) && toast.classList.contains("show") && toastRect.width > 0 && toastRect.height > 0,
      toastBottom: Math.round(toastRect.bottom),
      dockTop: Math.round(dockRect.top),
      clearance: Math.round(dockRect.top - toastRect.bottom),
      toastZ: Number(getComputedStyle(toast).zIndex) || 0,
      dockZ: Number(getComputedStyle(dock).zIndex) || 0,
      noDocumentOverflow: document.documentElement.scrollWidth <= window.innerWidth + 1,
      viewportHeight: window.innerHeight,
    };
  })()`, true);

  await capture(client, mobileShot);
  client.close();
  edge.kill();
  await new Promise((resolveClose) => server.close(resolveClose));
  cleanupProfile();

  const assertions = {
    loadedv70: result.appScript && result.css && result.swv70 && result.cssv70,
    mobileLayout: result.layoutClass && result.dockVisible,
    toastRaised: result.toastVisible && result.clearance >= 8,
    toastAboveDockLayer: result.toastZ > result.dockZ,
    noOverflow: result.noDocumentOverflow,
    noRuntimeErrors: errors.length === 0 || errors.every((entry) => entry.includes("apple-mobile-web-app-capable")),
  };
  const failed = Object.entries(assertions).filter(([, value]) => !value);
  const summary = { url, mobileShot, result, assertions, errors };
  console.log(JSON.stringify(summary, null, 2));
  if (failed.length) {
    throw new Error(`v70 mobile toast verification failed: ${failed.map(([key]) => key).join(", ")}`);
  }
} catch (error) {
  edge.kill();
  await new Promise((resolveClose) => server.close(resolveClose));
  cleanupProfile();
  console.error(error);
  process.exit(1);
}
