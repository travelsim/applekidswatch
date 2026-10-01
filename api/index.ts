import type { Request, Response } from "express";
import { createApp } from "../server/app";

let appPromise: ReturnType<typeof createApp> | undefined;

// Cache route initialization per instance without opening a listening socket.
export default async function handler(req: Request, res: Response) {
  try {
    appPromise ??= createApp();
    const app = await appPromise;
    app(req, res);
  } catch {
    appPromise = undefined;
    res.status(500).json({ error: "Server initialization failed" });
  }
}
