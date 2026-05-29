import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Determine __dirname in a way that works in both ESM (vite build) and CJS (esbuild server bundle)
let dirname: string;
try {
  dirname = (typeof __dirname !== "undefined") ? __dirname : path.dirname(new URL(import.meta.url).pathname);
} catch {
  dirname = process.cwd();
}

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(dirname, "client", "src"),
      "@shared": path.resolve(dirname, "shared"),
      "@assets": path.resolve(dirname, "attached_assets"),
    },
  },
  root: path.resolve(dirname, "client"),
  build: {
    outDir: path.resolve(dirname, "dist/public"),
    emptyOutDir: true,
  },
});
