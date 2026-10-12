import { readFileSync, writeFileSync } from "node:fs";
const set = JSON.parse(readFileSync("node_modules/@iconify-json/solar/icons.json", "utf8"));
const want = ["arrow-right-linear","arrow-right-up-linear","alt-arrow-left-linear","alt-arrow-right-linear","alt-arrow-down-linear","hamburger-menu-linear","close-circle-linear","phone-linear","check-circle-bold","check-read-linear",
"book-2-bold-duotone","notebook-bold-duotone","square-academic-cap-bold-duotone","music-notes-bold-duotone","buildings-2-bold-duotone",
"users-group-rounded-bold-duotone","cart-large-2-bold-duotone","wallet-money-bold-duotone","headphones-round-bold-duotone","chat-round-like-bold-duotone","refresh-circle-bold-duotone",
"user-id-bold-duotone","box-bold-duotone","letter-bold-duotone","bill-list-bold-duotone","calendar-bold-duotone","card-bold-duotone","calculator-bold-duotone","pen-new-square-bold-duotone","chart-2-bold-duotone","copyright-bold-duotone","document-text-bold-duotone","shop-bold-duotone","tuning-2-bold-duotone","magic-stick-3-bold-duotone","login-3-linear","map-point-linear","letter-linear","play-circle-bold","pause-circle-bold","danger-circle-linear","refresh-linear"];
const out = {}; const W = set.width || 24, H = set.height || 24;
for (const n of want) { const i = set.icons[n] || (set.aliases?.[n] && set.icons[set.aliases[n].parent]); if (!i) { console.error("MISSING", n); continue; } out[n] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${i.width||W} ${i.height||H}" aria-hidden="true" focusable="false">${i.body}</svg>`; }
writeFileSync("src/icons.ts", "// Solar icon set (CC BY 4.0, 480 Design) via Iconify, extracted at build time.\nexport const icons: Record<string, string> = " + JSON.stringify(out, null, 0) + ";\nexport const icon = (n: string, cls = 'i') => (icons[n] || '').replace('<svg ', `<svg class=\"${cls}\" `);\n");
console.log(Object.keys(out).length, "icons");
