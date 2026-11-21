/* TabigrAm.zine 的範例期數與文章：Zine 頁面（沒有上架文章時）和後台「匯入範例成草稿」共用 */
window.TG_ZINE_SAMPLE_ISSUES = [
  { id: "sample-2026-autumn", number: 2, name: "秋", title: "慢慢走的秋天", season: "autumn", year: 2026, starts_on: "2026-09-01", intro: "這一期只有三件事：一條街、一個好物、一個好地方。", cover: "../sample-memory-card.jpg", accent: "#C8552B" },
  { id: "sample-2026-summer", number: 1, name: "夏", title: "出發前一晚", season: "summer", year: 2026, starts_on: "2026-06-01", intro: "", cover: "../sample-flight-card.jpg", accent: "#2F6FDB" },
  { id: "sample-2025-autumn", number: 0, name: "秋・試刊號", title: "第一張地鐵票", season: "autumn", year: 2025, starts_on: "2025-09-01", intro: "", cover: "../sample-route-card.jpg", accent: "#3E7B4F" },
];
window.TG_ZINE_SAMPLE = [
  { id: "sample-kyoto", issue_id: "sample-2026-autumn", issue: "散步提案", title: "京都秋天，只走一條街", subtitle: "從出町柳走到下鴨神社的半日提案：一間咖啡店、一座神社、一條河。", author_name: "TabigrAm 編輯部", read_minutes: 1, featured: true, cover: "../sample-memory-card.jpg", tags: ["京都", "散步", "秋天"], style: { title_font: "kai", body_font: "serif" },
    blocks: [
      { type: "text", text: "早上九點的出町柳，鴨川兩條支流在這裡會合。先別急著拍照，沿著河堤往北走五分鐘，**風會比市區涼一點**。\n\n如果只有半天，不要排太多。一條街、一杯咖啡、一座森林裡的神社，就夠了。" },
      { type: "image", src: "../sample-route-card.jpg", caption: "叡山電鉄從出町柳出發，兩節車廂的小電車。" },
      { type: "tip", title: "旅行小物｜折疊水壺", text: "河邊沒有什麼販賣機，帶一個摺起來只有手掌大的水壺，裝滿再出門。" },
      { type: "quote", text: "慢慢走，才會看到糺之森的光是一條一條落下來的。", by: "寫在下鴨神社前" },
      { type: "place", title: "下鴨神社・糺之森", text: "世界遺產裡的原生林，參道兩旁的樹比你想像的還要高。", link: "https://maps.google.com/?q=下鴨神社" },
      { type: "text", text: "回程可以搭叡山電鉄到一乘寺，再找一間書店躲雨。" },
    ] },
  { id: "sample-gear", issue_id: "sample-2026-autumn", issue: "旅行好物", title: "一個小布袋就夠了", subtitle: "秋天的城市散步，口袋裝不下的都放這裡。", author_name: "TabigrAm 編輯部", read_minutes: 1, cover: "../sample-stamp-card.jpg", tags: ["好物", "秋天"], blocks: [{ type: "text", text: "這是一篇範例文章。" }] },
  { id: "sample-flight", issue_id: "sample-2026-summer", issue: "清單", title: "出發前一晚的行李清單", subtitle: "一張紙寫得下的東西，才是真的需要的東西。", author_name: "TabigrAm 編輯部", read_minutes: 1, cover: "../sample-flight-card.jpg", tags: ["行李", "清單"], blocks: [{ type: "text", text: "這是一篇範例文章。" }] },
  { id: "sample-tokyo", issue_id: "sample-2025-autumn", issue: "城市切片", title: "東京，用一張地鐵票", subtitle: "從中目黑到淺草，銀座線轉日比谷線，一天的城市切片。", author_name: "TabigrAm 編輯部", read_minutes: 1, cover: "../sample-route-card.jpg", tags: ["東京", "地鐵", "秋天"], blocks: [{ type: "text", text: "這是一篇範例文章。在後台「Zine」新增文章、送審、發布之後，這裡就會換成真的內容。" }] },
];
