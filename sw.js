// TabigrAm 離線使用
// - 網頁本身：有網路時一律拿最新版（網路優先），沒網路時用上次存下來的版本
// - 字型與程式元件（Google Fonts、jsDelivr）：先用存好的，背景再更新
// - 雲端資料、天氣、地圖座標：不存，直接連線（離線時 App 會先把變更存在裝置上）
// 改了這個檔案或想強制更新時，把 CACHE 的版本號加 1
const CACHE = "tabigram-v62";
const CORE = ["./", "index.html", "privacy.html", "terms.html", "manifest.webmanifest", "icon-192.png", "icon-512.png", "logo-ring.svg", "logo-ring.png", "favicon.svg", "favicon.png", "sample-route-card.jpg", "sample-flight-card.jpg", "sample-stamp-card.jpg", "sample-memory-card.jpg", "sample-recap-card.jpg", "sample-route-card-en.jpg", "sample-flight-card-en.jpg", "sample-stamp-card-en.jpg", "sample-memory-card-en.jpg", "sample-recap-card-en.jpg", "fonts/tg-fill.woff2", "i18n/en.js", "privacy-en.html", "terms-en.html", "airports.json"];
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
      // 每次都跟伺服器確認有沒有新版（沒變就很快），不會拿到瀏覽器存著的舊檔
      fetch(req.mode === "navigate" ? req : new Request(req, { cache: "no-cache" }))
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

  // 雲端貼紙圖片（Supabase 的公開 stickers 空間）：存過一次就用手機裡的，沒網路也能貼
  if (url.pathname.includes("/storage/v1/object/public/stickers/")) {
    event.respondWith(
      caches.open(CACHE).then(async c => {
        // 只用、只存「讀得到內容」的版本：不透明的快取圖不能畫進分享卡，會讓貼紙載入失敗
        const hit = await c.match(req);
        if (hit && hit.type !== "opaque") return hit;
        const res = await fetch(req.mode === "no-cors" ? new Request(req.url, { mode: "cors", credentials: "omit" }) : req);
        if (res.ok && res.type !== "opaque") c.put(req.url, res.clone());
        return res;
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
