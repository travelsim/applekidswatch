// Post-build step.
//
// Vercel's routing order is: redirects -> headers -> filesystem -> rewrites.
// Because the built SPA lands at dist/public/index.html, the filesystem always
// matches "/" first and any rewrite is bypassed. That makes it impossible for
// the serverless function to render brand-specific <head> tags per Host.
//
// So: move the built shell out of the static output to dist/template.html and
// let the function serve it. Hashed assets and images stay in dist/public and
// are still served by the CDN, because they are matched by the filesystem.
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const publicDir = path.join(root, "dist", "public");
const source = path.join(publicDir, "index.html");
const target = path.join(root, "dist", "template.html");

if (!fs.existsSync(source)) {
  console.error(
    `[prepare-html] ${path.relative(root, source)} not found; skipping. Did the build run?`
  );
  process.exit(1);
}

if (!fs.readFileSync(source, "utf8").includes("<!--BRAND_SEO-->")) {
  console.error(
    "[prepare-html] the built HTML has no <!--BRAND_SEO--> placeholder, so per-brand SEO cannot be rendered"
  );
  process.exit(1);
}

fs.mkdirSync(path.dirname(target), { recursive: true });
fs.copyFileSync(source, target);
fs.rmSync(source);

console.log(
  `[prepare-html] moved index.html -> dist/template.html (${fs.statSync(target).size} bytes)`
);