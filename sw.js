// TabigrAm 離線使用
// - 網頁本身：有網路時一律拿最新版（網路優先），沒網路時用上次存下來的版本
// - 字型與程式元件（Google Fonts、jsDelivr）：先用存好的，背景再更新
// - 雲端資料、天氣、地圖座標：不存，直接連線（離線時 App 會先把變更存在裝置上）
// 改了這個檔案或想強制更新時，把 CACHE 的版本號加 1
const CACHE = "tabigram-v4";
const CORE = ["./", "index.html", "privacy.html", "manifest.webmanifest", "icon-192.png", "icon-512.png"];
const ASSET_HOSTS = ["fonts.googleapis.com", "fonts.gstatic.com", "cdn.jsdelivr.net", "cdnjs.cloudflare.com", "unpkg.com"];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith("tabigram-") && k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  if (url.origin === self.location.origin) {
    event.respondWith(
      fetch(req)
        .then(res => {
          if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
          return res;
        })
        .catch(async () => {
          const hit = await caches.match(req, { ignoreSearch: true });
          if (hit) return hit;
          if (req.mode === "navigate") return (await caches.match("index.html")) || (await caches.match("./"));
          return Response.error();
        })
    );
    return;
  }

  if (ASSET_HOSTS.includes(url.hostname)) {
    event.respondWith(
      caches.open(CACHE).then(async c => {
        const hit = await c.match(req);
        const net = fetch(req).then(res => { if (res.ok || res.type === "opaque") c.put(req, res.clone()); return res; }).catch(() => hit);
        return hit || net;
      })
    );
  }
});
