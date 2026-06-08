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
const webPort = 8819;
const cdpPort = 9269;
const url = `http://127.0.0.1:${webPort}/?v69-observatory-star-chart=1`;
const profile = join(root, "tmp", `edge-v69-observatory-star-chart-${Date.now()}`);
const desktopShot = join(root, "verification-v69-observatory-star-chart-local.png");
const mobileShot = join(root, "verification-v69-observatory-star-chart-mobile-local.png");

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

  const seeded = await evaluate(client, `(() => {
    state = makeNewGame();
    state.coins = 2600;
    state.gems = 14;
    const dwelling = state.floors.find((floor) => floor.type === "dwelling");
    while (dwelling.residents.length < 10) {
      addResidentToDwelling(state, dwelling, makeResident(state, dwelling.residents.length % 2 ? "observatory" : "library"));
    }
    state.floors.forEach((entry) => {
      if (Array.isArray(entry.workers)) entry.workers = [];
    });
    let floor = state.floors.find((entry) => entry.type === "observatory");
    if (!floor) {
      floor = createFloor(state, "observatory", { name: "Star Chart Check", stock: 16, level: 3, direction: "up" });
      floor.id = state.nextSkyFloorId--;
      state.floors.push(floor);
    }
    floor.stock = 16;
    floor.stockMax = Math.max(floor.stockMax || 0, 18);
    floor.level = 3;
    floor.workers = [];
    floor.production = null;
    floor.starChartCooldown = 0;
    floor.starChart = null;

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
      person.favoriteTypes = ["observatory", "library", "skyport"];
      person.dreamType = index < 5 ? "observatory" : index < 8 ? "library" : person.dreamType;
      person.motives = index < 2
        ? { food: 70, entertainment: 72, social: 66, energy: 74 }
        : { food: 62, entertainment: 22 + index * 2, social: 28 + index * 4, energy: 58 };
      person.need = index % 2 ? "social" : "entertainment";
      person.activity = "look";
      person.activityTimer = 0;
      assignPersonMotion(person, "dwelling", "look");
    });

    [residents[0], residents[1]].forEach((person, index) => {
      person.workFloorId = floor.id;
      person.dreamType = "observatory";
      person.skills.observatory = Math.max(person.skills.observatory || 1, 8 - index);
      floor.workers.push(person.id);
    });
    residents.slice(2, 8).forEach((person, index) => {
      const worker = residents[index % 2];
      person.relationships[String(worker.id)] = { score: 54 + index * 4, interactions: 3, lastScene: "chart" };
      worker.relationships[String(person.id)] = { score: 54 + index * 4, interactions: 3, lastScene: "chart" };
    });

    state.stats.observatoryFloorsBuilt = Math.max(state.stats.observatoryFloorsBuilt || 0, 1);
    state.stats.expeditionsDone = Math.max(state.stats.expeditionsDone || 0, 1);
    state.stats.starChartCalibrationsDone = 0;
    state.stats.starChartMarksDone = 5;

    const expeditionResident = residents[8];
    const expedition = {
      id: "verify-exp-star",
      type: "well",
      title: "回声井探险",
      residentId: expeditionResident.id,
      residentName: expeditionResident.name,
      originFloorId: dwelling.id,
      total: 60,
      remaining: 44,
      rewardCoins: 120,
      rewardGems: 0,
      relicChance: 0.12,
      comfortPrepBonus: 0,
      comfortPrepLabel: "",
      routeNote: "验证星图预报",
      waymarkIds: [],
      reportBonus: 0,
      starChartPrep: 0,
    };
    expeditionResident.expeditionId = expedition.id;
    state.expeditions = [expedition];

    const beforeCalibrations = state.stats.starChartCalibrationsDone || 0;
    const beforeMarks = state.stats.starChartMarksDone || 0;
    const stockBefore = floor.stock;
    const expeditionBefore = expedition.remaining;
    const candidatesBefore = starChartCandidatesForFloor(floor).length;
    state.selectedFloorId = floor.id;
    checkQuests();
    render(true);
    const button = document.querySelector('#floorDetail [data-action="star-chart"]');
    const buttonDisabledBefore = button?.disabled || false;
    button?.click();

    updateTimers(8.8);
    updatePersonActivities(2.2);
    checkQuests();
    render(true);
    saveGame(false);

    const guests = starChartParticipants(floor);
    const quest = state.quests.find((entry) => entry.id === "star_chart");
    return {
      version: state.version,
      beforeCalibrations,
      afterCalibrations: state.stats.starChartCalibrationsDone || 0,
      beforeMarks,
      afterMarks: state.stats.starChartMarksDone || 0,
      questReady: Boolean(quest?.ready),
      questClaimed: Boolean(quest?.claimed),
      questButton: Boolean(document.querySelector('[data-action="claim-quest"][data-quest-id="star_chart"]')),
      buttonDisabledBefore,
      candidatesBefore,
      expeditionBefore,
      expeditionAfter: state.expeditions[0]?.remaining || 0,
      expeditionPrep: state.expeditions[0]?.starChartPrep || 0,
      floor: {
        id: floor.id,
        stockBefore,
        stockAfter: floor.stock,
        cooldown: Math.ceil(floor.starChartCooldown || 0),
        active: isActiveStarChart(floor),
        remaining: Math.ceil(floor.starChart?.remaining || 0),
        phase: floor.starChart?.phase || "",
        tone: starChartFocusTone(floor),
        focus: Math.round(floor.starChart?.focus || 0),
        marks: floor.starChart?.marks || 0,
        targetMarks: floor.starChart?.targetMarks || 0,
        earned: floor.starChart?.earned || 0,
        starPulse: Number(floor.starChart?.starPulse || 0),
        focusStar: Number(floor.starChart?.focusStar || 0),
        participantIds: floor.starChart?.participantIds || [],
        guests: guests.map((person) => ({
          id: person.id,
          need: person.need,
          activity: person.activity,
          visitReason: person.lifeVisit?.reason,
          floorId: person.lifeVisit?.floorId,
          sessionId: person.lifeVisit?.sessionId || "",
          socialPartnerId: person.socialPartnerId || null,
        })),
        workers: floor.workers.map((id) => getResident(id)).filter(Boolean).map((person) => ({
          id: person.id,
          need: person.need,
          activity: person.activity,
          socialPartnerId: person.socialPartnerId || null,
        })),
      },
    };
  })()`);

  await evaluate(client, "new Promise((resolve) => setTimeout(resolve, 900))", true);
  const desktop = await evaluate(client, `(async () => {
    const swText = await fetch('sw.js', { cache: 'no-store' }).then((response) => response.text());
    const cssText = await fetch('overrides.css?v=69', { cache: 'no-store' }).then((response) => response.text());
    const appText = await fetch('app.js?v=69', { cache: 'no-store' }).then((response) => response.text());
    const artResponse = await fetch('assets/art/room-observatory-v2.webp', { cache: 'no-store' });
    const floor = state.floors.find((entry) => entry.type === 'observatory');
    const room = document.querySelector('.floor[data-type="observatory"] .room');
    return {
      appScript: Boolean(document.querySelector('script[src="app.js?v=69"]')),
      css: Boolean(document.querySelector('link[href="overrides.css?v=69"]')),
      swv69: swText.includes('little-depths-v69') && swText.includes('app.js?v=69') && swText.includes('room-observatory-v2.webp'),
      cssv69: cssText.includes('star-chart-layer') && cssText.includes('star-chart-panel') && cssText.includes('room-observatory-v2.webp'),
      appv69: appText.includes('startStarChart') && appText.includes('starChartMarksDone') && appText.includes('renderStarChartLayer') && appText.includes('star_chart'),
      observatoryArt: getComputedStyle(room).getPropertyValue('--room-art').includes('room-observatory-v2.webp'),
      observatoryArtServed: artResponse.ok && (artResponse.headers.get('content-type') || '').includes('image'),
      activeFloors: document.querySelectorAll('.floor.star-chart-active').length,
      activePhaseFloors: document.querySelectorAll('.floor.star-chart-active[data-star-chart-phase]').length,
      activeFocusFloors: document.querySelectorAll('.floor.star-chart-active[data-star-chart-focus]').length,
      activePanels: document.querySelectorAll('.star-chart-panel.active').length,
      chartPanels: document.querySelectorAll('.star-chart-panel[data-focus]').length,
      meters: document.querySelectorAll('.star-chart-meter').length,
      inlineMeters: document.querySelectorAll('.star-chart-inline-meter').length,
      readouts: document.querySelectorAll('.star-chart-readout b').length,
      phaseRows: document.querySelectorAll('.star-chart-phase-row i').length,
      chartLayers: document.querySelectorAll('.star-chart-layer').length,
      sweeps: document.querySelectorAll('.star-chart-sweep').length,
      phaseDots: document.querySelectorAll('.star-chart-phase-stack i.lit').length,
      starMarkers: document.querySelectorAll('.star-chart-constellation b.lit').length,
      comet: document.querySelectorAll('.star-chart-comet').length,
      chartTags: document.querySelectorAll('[data-state="star-chart"]').length,
      glyphs: document.querySelectorAll('.status-glyph[data-state="star-chart"]').length,
      lifeVisitors: document.querySelectorAll('.life-visitor').length,
      socialPairs: document.querySelectorAll('.social-pair').length,
      needBadges: document.querySelectorAll('.need-badge').length,
      guestCount: starChartParticipants(floor).length,
      selectedFloorIsObservatory: state.selectedFloorId === floor.id,
      topbarFits: document.querySelector('.topbar').scrollWidth <= document.querySelector('.topbar').clientWidth + 1,
      noDocumentOverflow: document.documentElement.scrollWidth <= window.innerWidth + 1,
    };
  })()`, true);
  await capture(client, desktopShot);

  const inventory = await evaluate(client, `(() => {
    document.getElementById('inventoryBtn')?.click();
    const inventoryPanel = document.getElementById('inventoryPanel');
    const inventoryText = inventoryPanel?.textContent || "";
    const chartRecordVisible = [...document.querySelectorAll('.inventory-item')]
      .some((node) => node.textContent.includes('星图校准') && node.textContent.includes(String(state.stats.starChartMarksDone || 0)));
    const modal = document.getElementById('inventoryModal');
    const result = {
      open: Boolean(modal && !modal.hidden),
      chartRecordVisible,
      hasChartCount: inventoryText.includes(String(state.stats.starChartMarksDone || 0)),
      attention: document.getElementById('inventoryBtn')?.classList.contains('attention') || false,
    };
    document.getElementById('closeInventoryBtn')?.click();
    return result;
  })()`);

  const afterClaim = await evaluate(client, `(() => {
    render(true);
    const button = document.querySelector('[data-action="claim-quest"][data-quest-id="star_chart"]');
    const beforeCoins = state.coins;
    const beforeGems = state.gems;
    button?.click();
    const quest = state.quests.find((entry) => entry.id === "star_chart");
    return {
      hadButton: Boolean(button),
      beforeCoins,
      afterCoins: state.coins,
      beforeGems,
      afterGems: state.gems,
      ready: Boolean(quest?.ready),
      claimed: Boolean(quest?.claimed),
      buttonGone: !document.querySelector('[data-action="claim-quest"][data-quest-id="star_chart"]')
    };
  })()`);

  await client.send("Emulation.setDeviceMetricsOverride", {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true,
  });
  const mobileReload = client.waitFor("Page.loadEventFired");
  await client.send("Page.reload", { ignoreCache: true });
  await mobileReload;
  await evaluate(client, "new Promise((resolve) => setTimeout(resolve, 900))", true);
  const mobile = await evaluate(client, `(() => {
    const dock = document.querySelector('#mobilePanelDock');
    const detail = document.querySelector('[data-mobile-panel="detail"]');
    const questsButton = document.querySelector('[data-mobile-panel-target="quests"]');
    questsButton?.click();
    const quests = document.querySelector('[data-mobile-panel="quests"]');
    const chartPanel = document.querySelector('.star-chart-panel');
    return {
      appScript: Boolean(document.querySelector('script[src="app.js?v=69"]')),
      css: Boolean(document.querySelector('link[href="overrides.css?v=69"]')),
      dockVisible: Boolean(dock) && getComputedStyle(dock).display !== 'none' && !dock.hidden,
      dockButtons: dock ? dock.querySelectorAll('[data-mobile-panel-target]').length : 0,
      layoutClass: document.body.classList.contains('mobile-panel-layout'),
      openClass: document.body.classList.contains('mobile-panel-open'),
      detailActiveBeforeClick: detail?.classList.contains('mobile-panel-active') || false,
      questsActiveAfterClick: quests?.classList.contains('mobile-panel-active') || false,
      visiblePanelCount: [...document.querySelectorAll('.side-panel .panel-section:not(.elevator-card)')]
        .filter((node) => getComputedStyle(node).display !== 'none').length,
      activeFloors: document.querySelectorAll('.floor.star-chart-active').length,
      activePanels: document.querySelectorAll('.star-chart-panel.active').length,
      chartPanels: document.querySelectorAll('.star-chart-panel[data-focus]').length,
      meters: document.querySelectorAll('.star-chart-meter').length,
      readouts: document.querySelectorAll('.star-chart-readout b').length,
      phaseRows: document.querySelectorAll('.star-chart-phase-row i').length,
      chartLayers: document.querySelectorAll('.star-chart-layer').length,
      sweeps: document.querySelectorAll('.star-chart-sweep').length,
      starMarkers: document.querySelectorAll('.star-chart-constellation b.lit').length,
      comet: document.querySelectorAll('.star-chart-comet').length,
      chartTags: document.querySelectorAll('[data-state="star-chart"]').length,
      lifeVisitors: document.querySelectorAll('.life-visitor').length,
      needBadges: document.querySelectorAll('.need-badge').length,
      bodyWidth: Math.round(document.body.getBoundingClientRect().width || 0),
      kingdomWidth: Math.round(document.querySelector('.kingdom')?.getBoundingClientRect().width || 0),
      noDocumentOverflow: document.documentElement.scrollWidth <= window.innerWidth + 1,
      panelNoOverflow: chartPanel ? chartPanel.scrollWidth <= chartPanel.clientWidth + 1 : false,
    };
  })()`);
  await capture(client, mobileShot);

  const mobileInventory = await evaluate(client, `(() => {
    document.getElementById('inventoryBtn')?.click();
    const inventory = document.querySelector('.inventory-scroll');
    const inventoryRect = inventory?.getBoundingClientRect() || { width: 0, height: 0 };
    return {
      visible: inventoryRect.width > 0 && inventoryRect.height > 0,
      fitsWidth: inventoryRect.width <= window.innerWidth + 1,
      fitsHeight: inventoryRect.height <= window.innerHeight + 1,
      noDocumentOverflow: document.documentElement.scrollWidth <= window.innerWidth + 1,
    };
  })()`);

  client.close();
  edge.kill();
  await new Promise((resolveClose) => server.close(resolveClose));
  cleanupProfile();

  const assertions = {
    loadedv69: desktop.appScript && desktop.css && desktop.swv69 && desktop.cssv69 && desktop.appv69 && mobile.appScript && mobile.css,
    saveVersion: seeded.version === 24,
    chartStarted: seeded.afterCalibrations >= seeded.beforeCalibrations + 1 && seeded.floor.active && seeded.floor.cooldown > 0 && !seeded.buttonDisabledBefore,
    chartMarked: seeded.afterMarks >= seeded.beforeMarks + 1 && seeded.floor.marks >= 1 && seeded.floor.targetMarks >= seeded.floor.marks,
    manualQuestReady: seeded.questReady && !seeded.questClaimed && seeded.questButton,
    manualQuestClaim: afterClaim.hadButton && afterClaim.afterCoins === afterClaim.beforeCoins + 620 && afterClaim.afterGems === afterClaim.beforeGems + 3 && afterClaim.claimed && !afterClaim.ready && afterClaim.buttonGone,
    chartStates: ["align", "chart", "forecast", "comet"].includes(seeded.floor.phase) && ["dim", "bright", "clear"].includes(seeded.floor.tone) && seeded.floor.focus > 0 && seeded.floor.earned > 0 && seeded.floor.starPulse >= 0,
    resourcesChanged: seeded.floor.stockAfter < seeded.floor.stockBefore,
    expeditionHelped: seeded.expeditionAfter < seeded.expeditionBefore && seeded.expeditionPrep > 0,
    guestsPulledIn: seeded.candidatesBefore >= 2 && seeded.floor.guests.length >= 2 && seeded.floor.participantIds.length >= 2,
    guestsVisiting: seeded.floor.guests.every((entry) => entry.visitReason === "starChart" && Number(entry.floorId) === Number(seeded.floor.id)),
    staffObserving: seeded.floor.workers.length >= 2 && seeded.floor.workers.some((entry) => ["look", "work", "wave"].includes(entry.activity)),
    visibleChartUi: desktop.activeFloors >= 1 && desktop.activePhaseFloors >= 1 && desktop.activeFocusFloors >= 1 && desktop.activePanels >= 1 && desktop.chartPanels >= 1 && desktop.meters >= 1 && desktop.inlineMeters >= 1 && desktop.readouts >= 3 && desktop.phaseRows >= 4 && desktop.chartTags >= 1 && desktop.glyphs >= 1,
    visibleChartLayer: desktop.chartLayers >= 1 && desktop.sweeps >= 1 && desktop.phaseDots >= 1 && desktop.starMarkers >= 1 && desktop.comet >= 1,
    visibleLifeMotion: desktop.lifeVisitors >= 2 && desktop.needBadges >= 4 && desktop.socialPairs >= 1 && desktop.guestCount >= 2,
    inventoryEntry: inventory.open && inventory.chartRecordVisible && inventory.hasChartCount && inventory.attention,
    roomArt: desktop.observatoryArt && desktop.observatoryArtServed,
    desktopLayout: desktop.topbarFits && desktop.noDocumentOverflow,
    mobileDrawer: mobile.dockVisible && mobile.dockButtons >= 8 && mobile.layoutClass && mobile.openClass,
    mobileTabSwitch: mobile.detailActiveBeforeClick && mobile.questsActiveAfterClick && mobile.visiblePanelCount === 1,
    mobileChartVisible: mobile.activeFloors >= 1 && mobile.activePanels >= 1 && mobile.chartPanels >= 1 && mobile.meters >= 1 && mobile.readouts >= 3 && mobile.phaseRows >= 4 && mobile.chartLayers >= 1 && mobile.sweeps >= 1 && mobile.starMarkers >= 1 && mobile.comet >= 1 && mobile.chartTags >= 1 && mobile.kingdomWidth > 0 && mobile.bodyWidth > 0 && mobile.noDocumentOverflow && mobile.panelNoOverflow,
    mobileInventory: mobileInventory.visible && mobileInventory.fitsWidth && mobileInventory.fitsHeight && mobileInventory.noDocumentOverflow,
    noRuntimeErrors: errors.length === 0 || errors.every((entry) => entry.includes("apple-mobile-web-app-capable")),
  };
  const failed = Object.entries(assertions).filter(([, value]) => !value);
  const summary = { url, desktopShot, mobileShot, seeded, afterClaim, desktop, inventory, mobile, mobileInventory, assertions, errors };
  console.log(JSON.stringify(summary, null, 2));
  if (failed.length) {
    throw new Error(`v69 verification failed: ${failed.map(([key]) => key).join(", ")}`);
  }
} catch (error) {
  edge.kill();
  await new Promise((resolveClose) => server.close(resolveClose));
  cleanupProfile();
  console.error(error);
  process.exit(1);
}
