// Simple build script - no tsx, no import.meta
const { build } = require("esbuild");
const vite = require("vite");
const fs = require("fs");
const path = require("path");

async function main() {
  // Clean
  fs.rmSync("dist", { recursive: true, force: true });

  // Build client with vite
  console.log("building client...");
  await vite.build({
    root: path.resolve("client"),
    build: {
      outDir: path.resolve("dist/public"),
      emptyOutDir: true,
    },
    resolve: {
      alias: {
        "@": path.resolve("client/src"),
        "@shared": path.resolve("shared"),
        "@assets": path.resolve("attached_assets"),
      },
    },
  });

  // Build server with esbuild
  console.log("building server...");
  const pkg = JSON.parse(fs.readFileSync("package.json", "utf-8"));
  const allDeps = Object.keys(pkg.dependencies || {});
  
  await build({
    entryPoints: ["server/index.ts"],
    platform: "node",
    bundle: true,
    format: "cjs",
    outfile: "dist/index.cjs",
    define: { "process.env.NODE_ENV": '"production"' },
    external: allDeps,
    logLevel: "info",
  });
  
  console.log("build complete");
}

main().catch(err => { console.error(err); process.exit(1); });
