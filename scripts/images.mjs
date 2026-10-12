import sharp from "sharp";
const src = "../src/cover-website-demo-main/public/photos/";
const jobs = {
  "printing-press-v6.webp": ["press", [960, 1600, 2400], 0.72],
  "publishing-team-editorial-v3.webp": ["team", [800, 1400], 0.8],
  "customer-support-editorial-v3.webp": ["support", [700, 1100], 0.8],
  "cover-erp-v6.jpg": ["finance", [800, 1400], 0.8],
  "cover-service-2-v6.jpg": ["growth", [800, 1400], 0.8],
  "publisher-bookshop.webp": ["shop", [800, 1400], 0.8],
  "print-review-collaboration-v6.webp": ["review", [700, 1200], 0.8],
  "shared-software-workspace-v6.webp": ["workspace", [800, 1400], 0.8],
  "technology-workspace-v6.jpg": ["tech", [800, 1400], 0.8],
};
for (const [file, [name, widths, q]] of Object.entries(jobs)) {
  for (const w of widths) {
    await sharp(src + file).resize({ width: w, withoutEnlargement: true }).webp({ quality: Math.round(q * 100) }).toFile(`public/img/${name}-${w}.webp`);
  }
}
// white logo for dark surfaces
await sharp("public/brand/cover-logo.png").ensureAlpha().linear([0,0,0,1],[255,255,255,0]).toFile("public/brand/cover-logo-white.png");
console.log("ok");
