/* TabigrAm.mise 的範例商品：選物頁（沒有上架商品時）和後台「匯入範例成草稿」共用。圖片是畫出來的示意圖 */
(function () {
const svg = body => "data:image/svg+xml;utf8," + encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 600'><rect width='600' height='600' fill='#EFE8DA'/>${body}</svg>`);
window.TG_MISE_SAMPLE = [
  { id: "sample-pouch", title: "旅行用亞麻束口袋", maker: "TabigrAm 範例", kind: "goods", price_text: "NT$ 480", shop_name: "賣家的網站", shop_url: "https://example.com/", tags: ["收納", "布物"],
    description: "裝充電線、零錢、車票的小袋子。洗過的亞麻會越用越軟。\n\n這是範例商品，在後台「選物」上架之後，這裡就會換成真的。", spec: "22×28cm · 亞麻 100%",
    cover: svg("<path d='M190 200 Q300 170 410 200 L430 470 Q300 500 170 470 Z' fill='#C9B48E'/><path d='M190 200 Q300 230 410 200' stroke='#8C7650' stroke-width='5' fill='none'/><circle cx='250' cy='212' r='8' fill='#5D4B30'/><path d='M250 212 Q230 260 240 300' stroke='#5D4B30' stroke-width='4' fill='none'/>") },
  { id: "sample-book", title: "在京都，慢慢走", maker: "某位旅行作家", kind: "book", price_text: "NT$ 360", shop_name: "出版社", shop_url: "https://example.com/", book_author: "某位旅行作家", publisher: "範例出版社", pub_year: "2024", tags: ["京都", "散文"],
    description: "一本可以放進外套口袋的散步書。\n\n這是範例商品。", spec: "平裝 · 192 頁 · 12.8×18.8cm",
    cover: svg("<rect x='170' y='110' width='260' height='380' rx='6' fill='#2F4A3A'/><rect x='200' y='170' width='200' height='4' fill='#E9DFC9'/><text x='300' y='250' font-family='serif' font-size='34' fill='#F2ECE0' text-anchor='middle'>在京都</text><text x='300' y='296' font-family='serif' font-size='34' fill='#F2ECE0' text-anchor='middle'>慢慢走</text><circle cx='300' cy='390' r='36' fill='none' stroke='#E9DFC9' stroke-width='3'/>") },
  { id: "sample-print", title: "鐵道車票明信片組", maker: "TabigrAm 範例", kind: "print", price_text: "NT$ 150", shop_name: "賣家的網站", shop_url: "https://example.com/", is_affiliate: true, tags: ["鐵道", "明信片"],
    description: "六張一組的車票造型明信片。\n\n這是範例商品（標示「合作」的示範）。", spec: "10×15cm · 6 張",
    cover: svg("<g transform='rotate(-6 300 300)'><rect x='140' y='190' width='320' height='200' rx='10' fill='#F7F2E6' stroke='#B5462B' stroke-width='4'/><text x='170' y='250' font-family='monospace' font-size='26' fill='#22201C'>TAIPEI → HUALIEN</text><text x='170' y='300' font-family='monospace' font-size='18' fill='#6D665A'>No. 0001 · 自強號</text><rect x='170' y='330' width='120' height='28' fill='#B5462B'/></g>") },
  { id: "sample-zine", title: "第一張地鐵票（試刊號）", maker: "TabigrAm.zine", kind: "zine", price_text: "NT$ 120", shop_name: "TabigrAm", shop_url: "https://example.com/", book_author: "TabigrAm 編輯部", publisher: "TabigrAm", pub_year: "2025", condition: "", tags: ["誌", "東京"],
    description: "Zine 的紙本小冊子示意。\n\n這是範例商品。", spec: "A5 · 騎馬釘 · 24 頁",
    cover: svg("<rect x='180' y='120' width='240' height='340' fill='#F4C430'/><text x='300' y='230' font-family='serif' font-weight='900' font-size='40' fill='#22201C' text-anchor='middle'>ZINE</text><text x='300' y='280' font-family='monospace' font-size='18' fill='#22201C' text-anchor='middle'>No.00</text>") },
];
})();
