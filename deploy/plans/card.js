// TabigrAm 旅行提案：分享小卡（1080×1920 限動格式，含 QR Code 與分享碼）
// 後台和提案頁共用。需要先載入 qrcode-generator（window.qrcode）。
// 用法：const blob = await TGPlanCard.render({ title, subtitle, days, cities, author, code, url, cover });
(function () {
  const W = 1080, H = 1920;
  const C = { paper: "#F3EFE6", ink: "#191919", sub: "#6E6A63", line: "#D9D3C7", accent: "#FF4F00", card: "#FFFFFF" };
  const SERIF = "'Noto Serif TC', serif", SANS = "'Noto Sans TC', sans-serif", MONO = "'JetBrains Mono', ui-monospace, monospace";

  function loadImg(src) {
    return new Promise(res => {
      if (!src) return res(null);
      const im = new Image(); im.crossOrigin = "anonymous";
      im.onload = () => res(im); im.onerror = () => res(null); im.src = src;
    });
  }
  // 中文自動換行（逐字量寬）
  function wrap(g, text, maxW, maxLines) {
    const out = []; let line = "";
    for (const ch of String(text || "")) {
      if (g.measureText(line + ch).width > maxW && line) { out.push(line); line = ch; if (out.length === maxLines) break; }
      else line += ch;
    }
    if (out.length < maxLines && line) out.push(line);
    if (out.length === maxLines && out.join("").length < String(text).length) out[maxLines - 1] = out[maxLines - 1].slice(0, -1) + "…";
    return out;
  }
  function rr(g, x, y, w, h, r) { g.beginPath(); g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r); g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath(); }
  function drawQR(g, url, x, y, size) {
    const q = window.qrcode(0, "M"); q.addData(url); q.make();
    const n = q.getModuleCount(), quiet = 2, cell = size / (n + quiet * 2);
    g.fillStyle = "#fff"; g.fillRect(x, y, size, size);
    g.fillStyle = C.ink;
    for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (q.isDark(r, c)) g.fillRect(Math.floor(x + (c + quiet) * cell), Math.floor(y + (r + quiet) * cell), Math.ceil(cell), Math.ceil(cell));
  }
  // 細微的紙紋（不用圖檔）
  function paper(g) {
    g.fillStyle = C.paper; g.fillRect(0, 0, W, H);
    let s = 7; const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647;
    for (let i = 0; i < 9000; i++) { g.fillStyle = `rgba(90,80,60,${rnd() * .05})`; g.fillRect(rnd() * W, rnd() * H, 1.6, 1.6); }
  }

  async function draw(p, withCover) {
    const c = document.createElement("canvas"); c.width = W; c.height = H;
    const g = c.getContext("2d");
    paper(g);
    // 刊頭
    g.fillStyle = C.ink; g.font = `800 30px ${MONO}`; g.textAlign = "left"; g.textBaseline = "alphabetic";
    g.fillText("TabigrAm", 90, 150);
    g.fillStyle = C.sub; g.font = `700 26px ${SANS}`; g.textAlign = "right"; g.fillText("旅行提案 · TRIP PLAN", W - 90, 150);
    g.strokeStyle = C.ink; g.lineWidth = 3; g.beginPath(); g.moveTo(90, 178); g.lineTo(W - 90, 178); g.stroke();
    // 封面：膠帶貼上的照片
    const cy = 240, ch = 760, cw = W - 180;
    g.save(); g.translate(W / 2, cy + ch / 2); g.rotate(-0.012);
    g.fillStyle = "rgba(0,0,0,.10)"; rr(g, -cw / 2 + 6, -ch / 2 + 14, cw, ch, 10); g.fill();
    g.fillStyle = C.card; rr(g, -cw / 2, -ch / 2, cw, ch, 10); g.fill();
    const im = withCover ? await loadImg(p.cover) : null;
    rr(g, -cw / 2 + 18, -ch / 2 + 18, cw - 36, ch - 36, 4); g.save(); g.clip();
    if (im) { const s = Math.max((cw - 36) / im.width, (ch - 36) / im.height); g.drawImage(im, -im.width * s / 2, -im.height * s / 2, im.width * s, im.height * s); }
    else { g.fillStyle = "#E4DED2"; g.fillRect(-cw / 2, -ch / 2, cw, ch); g.fillStyle = C.sub; g.font = `700 44px ${SERIF}`; g.textAlign = "center"; g.fillText((p.cities || []).join(" · ") || "TabigrAm", 0, 14); }
    g.restore();
    g.fillStyle = "rgba(242,226,178,.85)"; g.save(); g.translate(0, -ch / 2); g.rotate(-0.05); g.fillRect(-110, -26, 220, 52); g.restore();
    g.restore();
    // 天數章
    g.save(); g.translate(W - 170, cy + ch - 100); g.rotate(0.12);
    g.fillStyle = C.accent; g.beginPath(); g.arc(0, 0, 92, 0, Math.PI * 2); g.fill();
    g.fillStyle = "#fff"; g.textAlign = "center"; g.font = `900 64px ${MONO}`; g.fillText(String(p.days || 1), 0, 14); g.font = `800 26px ${SANS}`; g.fillText("天", 0, 52);
    g.restore();
    // 標題、副標
    let y = cy + ch + 110;
    g.textAlign = "left"; g.fillStyle = C.ink; g.font = `900 76px ${SERIF}`;
    for (const l of wrap(g, p.title, W - 180, 2)) { g.fillText(l, 90, y); y += 96; }
    g.fillStyle = C.sub; g.font = `500 36px ${SERIF}`;
    for (const l of wrap(g, p.subtitle, W - 180, 2)) { g.fillText(l, 90, y + 4); y += 54; }
    g.fillStyle = C.ink; g.font = `700 30px ${SANS}`;
    g.fillText([(p.cities || []).slice(0, 4).join("、"), p.author ? `文／${p.author}` : ""].filter(Boolean).join("　·　"), 90, y + 34);
    // 底部票根：QR＋分享碼
    const ty = 1500, th = 330;
    g.fillStyle = C.card; rr(g, 70, ty, W - 140, th, 22); g.fill();
    g.strokeStyle = C.line; g.lineWidth = 3; g.setLineDash([10, 10]); g.beginPath(); g.moveTo(70 + th, ty + 24); g.lineTo(70 + th, ty + th - 24); g.stroke(); g.setLineDash([]);
    g.fillStyle = C.paper; g.beginPath(); g.arc(70 + th, ty, 20, 0, Math.PI); g.fill(); g.beginPath(); g.arc(70 + th, ty + th, 20, Math.PI, 0); g.fill();
    drawQR(g, p.url, 100, ty + 30, th - 60);
    const tx = 70 + th + 50;
    g.fillStyle = C.sub; g.font = `800 26px ${SANS}`; g.fillText("掃描，或輸入分享碼", tx, ty + 82);
    g.fillStyle = C.ink; g.font = `800 92px ${MONO}`; g.fillText(String(p.code || "").replace(/(.{3})(.{3})/, "$1 $2"), tx - 4, ty + 192);
    g.fillStyle = C.sub; g.font = `600 26px ${SANS}`; g.fillText(String(p.url || "").replace(/^https?:\/\//, "").replace(/\?.*$/, ""), tx, ty + 252);
    return c;
  }
  async function render(p) {
    try { await Promise.all([document.fonts.load(`900 76px 'Noto Serif TC'`, p.title || "旅"), document.fonts.load(`800 92px 'JetBrains Mono'`, "A1"), document.fonts.load(`700 30px 'Noto Sans TC'`, "天")]); } catch (e) {}
    let c = await draw(p, true);
    const toBlob = cv => new Promise((res, rej) => { try { cv.toBlob(b => b ? res(b) : rej(new Error("toBlob")), "image/png"); } catch (e) { rej(e); } });
    try { return await toBlob(c); }
    catch (e) { c = await draw(p, false); return toBlob(c); }   // 封面圖跨網域讀不到時，改用沒有照片的版本
  }
  window.TGPlanCard = { render };
})();
