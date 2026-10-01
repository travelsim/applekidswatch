import type { Request, Response } from "express";
import { createRequire } from "node:module";
import type { createApp } from "../server/app";

const require = createRequire(import.meta.url);

let appPromise: ReturnType<typeof createApp> | undefined;

// Cache route initialization per instance without opening a listening socket.
export default async function handler(req: Request, res: Response) {
  try {
    // Build bundles server/shared source and resolves TS aliases into one CJS file.
    // Loading inside the catch boundary also handles missing/broken artifacts.
    const { createApp } = require("../dist/app.cjs") as typeof import("../server/app");
    appPromise ??= createApp();
    const app = await appPromise;
    app(req, res);
  } catch {
    appPromise = undefined;
    console.error("Server initialization failed; check the server bundle and configuration");
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Server initialization failed" }));
  }
}
