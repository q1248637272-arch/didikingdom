const CACHE_NAME = "little-depths-v67";
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css?v=67",
  "./overrides.css?v=67",
  "./app.js?v=67",
  "./manifest.webmanifest",
  "./icons/icon.svg",
  "./icons/icon-512.png",
  "./assets/art/room-lobby-v3.webp",
  "./assets/art/room-dwelling-v3.webp",
  "./assets/art/room-food-v3.webp",
  "./assets/art/room-service.webp",
  "./assets/art/room-craft-v2.webp",
  "./assets/art/room-entertainment-v2.webp",
  "./assets/art/room-kingdom.webp",
  "./assets/art/room-market-v2.webp",
  "./assets/art/room-library-v2.webp",
  "./assets/art/room-garden-v2.webp",
  "./assets/art/room-observatory.webp",
  "./assets/art/room-skyport.webp",
  "./assets/art/room-festival.webp",
  "./assets/art/room-bathhouse-v2.webp",
  "./assets/art/room-clinic.webp",
  "./assets/art/room-clockwork.webp",
  "./assets/art/room-aquarium.webp",
  "./assets/art/room-alchemy.webp",
  "./assets/art/room-training.webp",
  "./assets/art/room-treasure.webp",
  "./assets/art/room-sky-build.webp",
  "./assets/art/room-depth-build.webp",
  "./assets/art/guide-jester.webp",
  "./assets/art/ui-wood-gold.webp",
  "./assets/art/person-resident.png",
  "./assets/art/person-shopper.png",
  "./assets/art/person-vip.png",
  "./assets/art/person-worker.png",
  "./assets/art/person-mage.png",
  "./assets/art/person-knight.png",
  "./assets/art/person-healer.png",
  "./assets/art/person-engineer.png",
  "./assets/art/person-skyfarer.png",
  "./assets/art/person-performer.webp"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const acceptsHtml = event.request.headers.get("accept")?.includes("text/html");
  if (event.request.mode === "navigate" || acceptsHtml) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, copy.clone());
            cache.put("./index.html", copy);
          });
          return response;
        })
        .catch(() => caches.match(event.request).then((cached) => cached || caches.match("./index.html")))
    );
    return;
  }
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      });
    })
  );
});
