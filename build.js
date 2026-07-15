/* build.js — produce a minified static site into dist/.
   HTML -> html-minifier-terser · CSS -> lightningcss · JS -> bun bundle+minify.
   Vendor GSAP and assets are copied as-is. Run with: bun run build.js */

import {
  rmSync,
  mkdirSync,
  cpSync,
  readdirSync,
  statSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { join, extname } from "node:path";
import { minify as minifyHtml } from "html-minifier-terser";
import { transform as lightning } from "lightningcss";

const ROOT = import.meta.dir;
const OUT = join(ROOT, "dist");

const SKIP_TOP = new Set([
  "dist",
  "node_modules",
  ".git",
  ".vscode",
  ".idea",
  "build.js",
  "package.json",
  "bun.lock",
  "bun.lockb",
  ".gitignore",
  "docs",
  "README.md",
]);

// ── 1 · fresh dist ──────────────────────────────────────────────────────────
rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

// ── 2 · copy everything deployable (assets, vendor, css, js, html) ──────────
for (const name of readdirSync(ROOT)) {
  if (SKIP_TOP.has(name)) continue;
  cpSync(join(ROOT, name), join(OUT, name), { recursive: true });
}

// ── 3 · minify HTML ─────────────────────────────────────────────────────────
async function minifyHtmlFiles(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) {
      await minifyHtmlFiles(full);
    } else if (extname(name) === ".html") {
      const src = readFileSync(full, "utf8");
      const out = await minifyHtml(src, {
        collapseWhitespace: true,
        removeComments: true,
        minifyCSS: true,
        minifyJS: true,
      });
      writeFileSync(full, out);
    }
  }
}

// ── 4 · minify CSS (skip vendor) ─────────────────────────────────────────────
function minifyCssFiles(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) {
      if (full.includes(join("assets", "vendor"))) continue;
      minifyCssFiles(full);
    } else if (extname(name) === ".css") {
      const { code } = lightning({
        filename: name,
        code: readFileSync(full),
        minify: true,
      });
      writeFileSync(full, code);
    }
  }
}

// ── 5 · bundle + minify our JS entry (vendor stays as-is) ────────────────────
async function bundleJs() {
  const result = await Bun.build({
    entrypoints: [join(OUT, "js", "main.js")],
    outdir: join(OUT, "js"),
    minify: true,
    naming: "main.js",
    target: "browser",
  });
  if (!result.success) {
    console.error("JS bundle failed:", result.logs);
    process.exit(1);
  }
}

await minifyHtmlFiles(OUT);
minifyCssFiles(OUT);
await bundleJs();

console.log("✓ Built to dist/");
