import { defineConfig } from "vite";
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
import { icons } from "./src/icons";

// Inline Solar icons at build time so every page is complete without JavaScript.
const inlineIcons = {
  name: "inline-solar-icons",
  transformIndexHtml(html: string) {
    return html.replace(/<i data-icon="([\w-]+)"(?: class="([^"]*)")?><\/i>/g, (_m, name: string, cls?: string) => {
      const svg = icons[name];
      if (!svg) throw new Error(`Unknown icon: ${name}`);
      return svg.replace("<svg ", `<svg class="${cls ?? "i"}" `);
    });
  },
};

const root = resolve(here, "site");
const list = existsSync(resolve(root, "pages.json")) ? (JSON.parse(readFileSync(resolve(root, "pages.json"), "utf8")) as string[]) : ["index.html"];

export default defineConfig({
  root,
  base: "./",
  publicDir: resolve(here, "public"),
  plugins: [inlineIcons],
  server: { fs: { allow: [resolve(here)] } },
  build: {
    outDir: resolve(here, "dist"),
    emptyOutDir: true,
    target: "es2020",
    assetsInlineLimit: 0,
    cssCodeSplit: false,
    rollupOptions: { input: Object.fromEntries(list.map((f) => [f.replace(/\/?index\.html$|\.html$/, "") || "home", resolve(root, f)])) },
  },
});
