// Writes every page of the static site as an HTML entry for Vite.
import { mkdirSync, rmSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { allPages } from "../src/site/pages";

const out = "site";
if (existsSync(out)) rmSync(out, { recursive: true });
const pages = allPages();
for (const p of pages) {
  const file = join(out, p.file);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, p.html);
}
writeFileSync(join(out, "entry.ts"), 'import "../src/main";\n');
writeFileSync(join(out, "pages.json"), JSON.stringify(pages.map((p) => p.file), null, 2));
console.log(`generated ${pages.length} pages`);
