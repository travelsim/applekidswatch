import express, { type Express } from "express";
import path from "path";
import { fileURLToPath } from "url";

export function serveStatic(app: Express) {
  const serverDir = typeof __dirname !== "undefined" 
    ? __dirname 
    : path.dirname(fileURLToPath(import.meta.url));
  const distPath = path.resolve(serverDir, "public");

  app.use(express.static(distPath));

  // fall through to index.html if the file doesn't exist
  app.use("/{*path}", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
