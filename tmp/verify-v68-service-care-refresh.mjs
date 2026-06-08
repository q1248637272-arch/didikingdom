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
const webPort = 8818;
const cdpPort = 9268;
const url = `http://127.0.0.1:${webPort}/?v68-service-care-refresh=1`;
const profile = join(root, "tmp", `edge-v68-service-care-refresh-${Date.now()}`);
const desktopShot = join(root, "verification-v68-service-care-refresh-local.png");
const mobileShot = join(root, "verification-v68-service-care-refresh-mobile-local.png");

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
    state.coins = 1600;
    state.gems = 11;
    state.queue = Array.from({ length: 4 }, (_, index) => {
      const visitor = makeVisitor(state);
      visitor.lobbyWait = 28 + index * 6;
      visitor.activity = "wait";
      visitor.need = index % 2 ? "social" : "service";
      return visitor;
    }).filter(Boolean);

    const dwelling = state.floors.find((floor) => floor.type === "dwelling");
    while (dwelling.residents.length < 10) {
      addResidentToDwelling(state, dwelling, makeResident(state, dwelling.residents.length % 2 ? "service" : "garden"));
    }
    state.floors.forEach((entry) => {
      if (Array.isArray(entry.workers)) entry.workers = [];
    });

    let floor = state.floors.find((entry) => entry.type === "service");
    if (!floor) {
      floor = createFloor(state, "service", { name: "Service Care Check", stock: 18, level: 3 });
      state.floors.push(floor);
    }
    floor.stock = 18;
    floor.stockMax = Math.max(floor.stockMax || 0, 28);
    floor.level = 3;
    floor.workers = [];
    floor.production = null;
    floor.serviceCareCooldown = 0;
    floor.serviceCare = null;

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
      person.favoriteTypes = ["service", "garden", "market"];
      person.dreamType = index < 4 ? "service" : index < 7 ? "garden" : person.dreamType;
      person.motives = index < 2
        ? { food: 70, entertainment: 72, social: 66, energy: 74 }
        : { food: 62, entertainment: 58, social: 8 + index * 3, energy: 18 + index * 4 };
      person.need = index % 2 ? "energy" : "social";
      person.activity = "stroll";
      person.activityTimer = 0;
      assignPersonMotion(person, "dwelling", "stroll");
    });

    [residents[0], residents[1]].forEach((person, index) => {
      person.workFloorId = floor.id;
      person.dreamType = "service";
      person.skills.service = Math.max(person.skills.service || 1, 7 - index);
      floor.workers.push(person.id);
    });
    residents.slice(2, 8).forEach((person, index) => {
      const worker = residents[index % 2];
      person.relationships[String(worker.id)] = { score: 58 + index * 3, interactions: 3, lastScene: "care" };
      worker.relationships[String(person.id)] = { score: 58 + index * 3, interactions: 3, lastScene: "care" };
    });

    state.stats.serviceFloorsBuilt = Math.max(state.stats.serviceFloorsBuilt || 0, 1);
    state.stats.serviceCareSessionsDone = 0;
    state.stats.serviceCareTouchesDone = 4;
    const beforeSessions = state.stats.serviceCareSessionsDone || 0;
    const beforeTouches = state.stats.serviceCareTouchesDone || 0;
    const coinsBeforeQuestReady = state.coins;
    const gemsBeforeQuestReady = state.gems;
    const stockBefore = floor.stock;
    const queueWaitBefore = state.queue.reduce((sum, visitor) => sum + lobbyWaitSeconds(visitor), 0);
    const candidatesBefore = serviceCareCandidatesForFloor(floor).length;

    state.selectedFloorId = floor.id;
    checkQuests();
    render(true);
    const button = document.querySelector('#floorDetail [data-action="service-care"]');
    const buttonDisabledBefore = button?.disabled || false;
    button?.click();

    updateTimers(8.8);
    updatePersonActivities(2.2);
    checkQuests();
    render(true);
    saveGame(false);

    const guests = serviceCareParticipants(floor);
    const careQuest = state.quests.find((entry) => entry.id === "care_line");
    return {
      version: state.version,
      beforeSessions,
      afterSessions: state.stats.serviceCareSessionsDone || 0,
      beforeTouches,
      afterTouches: state.stats.serviceCareTouchesDone || 0,
      coinsBeforeQuestReady,
      coinsAfterQuestReady: state.coins,
      gemsBeforeQuestReady,
      gemsAfterQuestReady: state.gems,
      careQuestReady: Boolean(careQuest?.ready),
      careQuestClaimed: Boolean(careQuest?.claimed),
      careQuestButton: Boolean(document.querySelector('[data-action="claim-quest"][data-quest-id="care_line"]')),
      buttonDisabledBefore,
      candidatesBefore,
      queueWaitBefore,
      queueWaitAfter: state.queue.reduce((sum, visitor) => sum + lobbyWaitSeconds(visitor), 0),
      floor: {
        id: floor.id,
        stockBefore,
        stockAfter: floor.stock,
        cooldown: Math.ceil(floor.serviceCareCooldown || 0),
        active: isActiveServiceCare(floor),
        remaining: Math.ceil(floor.serviceCare?.remaining || 0),
        phase: floor.serviceCare?.phase || "",
        tone: serviceCareTone(floor),
        care: Math.round(floor.serviceCare?.care || 0),
        touches: floor.serviceCare?.touches || 0,
        targetTouches: floor.serviceCare?.targetTouches || 0,
        earned: floor.serviceCare?.earned || 0,
        carePulse: Number(floor.serviceCare?.carePulse || 0),
        focusGuest: Number(floor.serviceCare?.focusGuest || 0),
        participantIds: floor.serviceCare?.participantIds || [],
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
    const cssText = await fetch('overrides.css?v=68', { cache: 'no-store' }).then((response) => response.text());
    const appText = await fetch('app.js?v=68', { cache: 'no-store' }).then((response) => response.text());
    const artResponse = await fetch('assets/art/room-service-v2.webp', { cache: 'no-store' });
    const floor = state.floors.find((entry) => entry.type === 'service');
    const room = document.querySelector('.floor[data-type="service"] .room');
    return {
      appScript: Boolean(document.querySelector('script[src="app.js?v=68"]')),
      css: Boolean(document.querySelector('link[href="overrides.css?v=68"]')),
      swv68: swText.includes('little-depths-v68') && swText.includes('app.js?v=68') && swText.includes('room-service-v2.webp'),
      cssv68: cssText.includes('service-care-layer') && cssText.includes('service-care-panel') && cssText.includes('room-service-v2.webp'),
      appv68: appText.includes('startServiceCare') && appText.includes('serviceCareTouchesDone') && appText.includes('renderServiceCareLayer') && appText.includes('care_line'),
      serviceArt: getComputedStyle(room).getPropertyValue('--room-art').includes('room-service-v2.webp'),
      serviceArtServed: artResponse.ok && (artResponse.headers.get('content-type') || '').includes('image'),
      activeFloors: document.querySelectorAll('.floor.service-care-active').length,
      activePhaseFloors: document.querySelectorAll('.floor.service-care-active[data-service-care-phase]').length,
      activeToneFloors: document.querySelectorAll('.floor.service-care-active[data-service-care-tone]').length,
      activePanels: document.querySelectorAll('.service-care-panel.active').length,
      carePanels: document.querySelectorAll('.service-care-panel[data-care]').length,
      meters: document.querySelectorAll('.service-care-meter').length,
      inlineMeters: document.querySelectorAll('.service-care-inline-meter').length,
      readouts: document.querySelectorAll('.service-care-readout b').length,
      phaseRows: document.querySelectorAll('.service-care-phase-row i').length,
      serviceLayers: document.querySelectorAll('.service-care-layer').length,
      ribbons: document.querySelectorAll('.service-care-ribbon').length,
      phaseDots: document.querySelectorAll('.service-care-phase-stack i.lit').length,
      tokenMarkers: document.querySelectorAll('.service-care-token-lane b.active').length,
      blooms: document.querySelectorAll('.service-care-bloom i').length,
      careTags: document.querySelectorAll('[data-state="service-care"]').length,
      glyphs: document.querySelectorAll('.status-glyph[data-state="service-care"]').length,
      lifeVisitors: document.querySelectorAll('.life-visitor').length,
      socialPairs: document.querySelectorAll('.social-pair').length,
      needBadges: document.querySelectorAll('.need-badge').length,
      guestCount: serviceCareParticipants(floor).length,
      selectedFloorIsService: state.selectedFloorId === floor.id,
      topbarFits: document.querySelector('.topbar').scrollWidth <= document.querySelector('.topbar').clientWidth + 1,
      noDocumentOverflow: document.documentElement.scrollWidth <= window.innerWidth + 1,
    };
  })()`, true);
  await capture(client, desktopShot);

  const inventory = await evaluate(client, `(() => {
    document.getElementById('inventoryBtn')?.click();
    const inventoryPanel = document.getElementById('inventoryPanel');
    const inventoryText = inventoryPanel?.textContent || "";
    const serviceRecordVisible = [...document.querySelectorAll('.inventory-item')]
      .some((node) => node.textContent.includes(String(state.stats.serviceCareTouchesDone || 0)) && node.textContent.includes(String(state.stats.serviceCareSessionsDone || 0)));
    const modal = document.getElementById('inventoryModal');
    const result = {
      open: Boolean(modal && !modal.hidden),
      serviceRecordVisible,
      hasServiceCount: inventoryText.includes(String(state.stats.serviceCareTouchesDone || 0)),
      attention: document.getElementById('inventoryBtn')?.classList.contains('attention') || false,
    };
    document.getElementById('closeInventoryBtn')?.click();
    return result;
  })()`);

  const afterClaim = await evaluate(client, `(() => {
    render(true);
    const button = document.querySelector('[data-action="claim-quest"][data-quest-id="care_line"]');
    const beforeCoins = state.coins;
    const beforeGems = state.gems;
    button?.click();
    const quest = state.quests.find((entry) => entry.id === "care_line");
    return {
      hadButton: Boolean(button),
      beforeCoins,
      afterCoins: state.coins,
      beforeGems,
      afterGems: state.gems,
      ready: Boolean(quest?.ready),
      claimed: Boolean(quest?.claimed),
      buttonGone: !document.querySelector('[data-action="claim-quest"][data-quest-id="care_line"]')
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
    const servicePanel = document.querySelector('.service-care-panel');
    return {
      appScript: Boolean(document.querySelector('script[src="app.js?v=68"]')),
      css: Boolean(document.querySelector('link[href="overrides.css?v=68"]')),
      dockVisible: Boolean(dock) && getComputedStyle(dock).display !== 'none' && !dock.hidden,
      dockButtons: dock ? dock.querySelectorAll('[data-mobile-panel-target]').length : 0,
      layoutClass: document.body.classList.contains('mobile-panel-layout'),
      openClass: document.body.classList.contains('mobile-panel-open'),
      detailActiveBeforeClick: detail?.classList.contains('mobile-panel-active') || false,
      questsActiveAfterClick: quests?.classList.contains('mobile-panel-active') || false,
      visiblePanelCount: [...document.querySelectorAll('.side-panel .panel-section:not(.elevator-card)')]
        .filter((node) => getComputedStyle(node).display !== 'none').length,
      activeFloors: document.querySelectorAll('.floor.service-care-active').length,
      activePanels: document.querySelectorAll('.service-care-panel.active').length,
      carePanels: document.querySelectorAll('.service-care-panel[data-care]').length,
      meters: document.querySelectorAll('.service-care-meter').length,
      readouts: document.querySelectorAll('.service-care-readout b').length,
      phaseRows: document.querySelectorAll('.service-care-phase-row i').length,
      serviceLayers: document.querySelectorAll('.service-care-layer').length,
      ribbons: document.querySelectorAll('.service-care-ribbon').length,
      tokenMarkers: document.querySelectorAll('.service-care-token-lane b.active').length,
      blooms: document.querySelectorAll('.service-care-bloom i').length,
      careTags: document.querySelectorAll('[data-state="service-care"]').length,
      lifeVisitors: document.querySelectorAll('.life-visitor').length,
      needBadges: document.querySelectorAll('.need-badge').length,
      bodyWidth: Math.round(document.body.getBoundingClientRect().width || 0),
      kingdomWidth: Math.round(document.querySelector('.kingdom')?.getBoundingClientRect().width || 0),
      noDocumentOverflow: document.documentElement.scrollWidth <= window.innerWidth + 1,
      panelNoOverflow: servicePanel ? servicePanel.scrollWidth <= servicePanel.clientWidth + 1 : false,
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
    loadedv68: desktop.appScript && desktop.css && desktop.swv68 && desktop.cssv68 && desktop.appv68 && mobile.appScript && mobile.css,
    saveVersion: seeded.version === 23,
    careStarted: seeded.afterSessions >= seeded.beforeSessions + 1 && seeded.floor.active && seeded.floor.cooldown > 0 && !seeded.buttonDisabledBefore,
    careTouched: seeded.afterTouches >= seeded.beforeTouches + 1 && seeded.floor.touches >= 1 && seeded.floor.targetTouches >= seeded.floor.touches,
    manualQuestReady: seeded.careQuestReady && !seeded.careQuestClaimed && seeded.careQuestButton && seeded.gemsAfterQuestReady === seeded.gemsBeforeQuestReady,
    manualQuestClaim: afterClaim.hadButton && afterClaim.afterCoins === afterClaim.beforeCoins + 430 && afterClaim.afterGems === afterClaim.beforeGems + 2 && afterClaim.claimed && !afterClaim.ready && afterClaim.buttonGone,
    careStates: ["greet", "wrap", "deliver", "thanks"].includes(seeded.floor.phase) && ["gentle", "busy", "polished"].includes(seeded.floor.tone) && seeded.floor.care > 0 && seeded.floor.earned > 0 && seeded.floor.carePulse >= 0,
    resourcesChanged: seeded.floor.stockAfter < seeded.floor.stockBefore,
    queueRelieved: seeded.queueWaitAfter < seeded.queueWaitBefore,
    guestsPulledIn: seeded.candidatesBefore >= 2 && seeded.floor.guests.length >= 2 && seeded.floor.participantIds.length >= 2,
    guestsVisiting: seeded.floor.guests.every((entry) => entry.visitReason === "serviceCare" && Number(entry.floorId) === Number(seeded.floor.id)),
    staffServing: seeded.floor.workers.length >= 2 && seeded.floor.workers.some((entry) => ["serve", "work", "wave"].includes(entry.activity)),
    visibleCareUi: desktop.activeFloors >= 1 && desktop.activePhaseFloors >= 1 && desktop.activeToneFloors >= 1 && desktop.activePanels >= 1 && desktop.carePanels >= 1 && desktop.meters >= 1 && desktop.inlineMeters >= 1 && desktop.readouts >= 3 && desktop.phaseRows >= 4 && desktop.careTags >= 1 && desktop.glyphs >= 1,
    visibleCareLayer: desktop.serviceLayers >= 1 && desktop.ribbons >= 1 && desktop.phaseDots >= 1 && desktop.tokenMarkers >= 2 && desktop.blooms >= 3,
    visibleLifeMotion: desktop.lifeVisitors >= 2 && desktop.needBadges >= 4 && desktop.socialPairs >= 1 && desktop.guestCount >= 2,
    inventoryEntry: inventory.open && inventory.serviceRecordVisible && inventory.hasServiceCount && inventory.attention,
    roomArt: desktop.serviceArt && desktop.serviceArtServed,
    desktopLayout: desktop.topbarFits && desktop.noDocumentOverflow,
    mobileDrawer: mobile.dockVisible && mobile.dockButtons >= 8 && mobile.layoutClass && mobile.openClass,
    mobileTabSwitch: mobile.detailActiveBeforeClick && mobile.questsActiveAfterClick && mobile.visiblePanelCount === 1,
    mobileCareVisible: mobile.activeFloors >= 1 && mobile.activePanels >= 1 && mobile.carePanels >= 1 && mobile.meters >= 1 && mobile.readouts >= 3 && mobile.phaseRows >= 4 && mobile.serviceLayers >= 1 && mobile.ribbons >= 1 && mobile.tokenMarkers >= 2 && mobile.blooms >= 3 && mobile.careTags >= 1 && mobile.kingdomWidth > 0 && mobile.bodyWidth > 0 && mobile.noDocumentOverflow && mobile.panelNoOverflow,
    mobileInventory: mobileInventory.visible && mobileInventory.fitsWidth && mobileInventory.fitsHeight && mobileInventory.noDocumentOverflow,
    noRuntimeErrors: errors.length === 0 || errors.every((entry) => entry.includes("apple-mobile-web-app-capable")),
  };
  const failed = Object.entries(assertions).filter(([, value]) => !value);
  const summary = { url, desktopShot, mobileShot, seeded, afterClaim, desktop, inventory, mobile, mobileInventory, assertions, errors };
  console.log(JSON.stringify(summary, null, 2));
  if (failed.length) {
    throw new Error(`v68 verification failed: ${failed.map(([key]) => key).join(", ")}`);
  }
} catch (error) {
  edge.kill();
  await new Promise((resolveClose) => server.close(resolveClose));
  cleanupProfile();
  console.error(error);
  process.exit(1);
}
