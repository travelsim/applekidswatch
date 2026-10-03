import express from "express";
import { errorHandler } from "../shared/errors";
import { registerRoutes } from "./routes";
import { serveStatic } from "./static";

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

export async function createApp(options: { seed?: boolean } = {}) {
  const app = express();
  app.use(
    express.json({
      verify: (req, _res, buf) => {
        req.rawBody = buf;
      },
    }),
  );

  app.use(express.urlencoded({ extended: false }));

  app.use((req, res, next) => {
    const start = Date.now();
    const path = req.path;
    res.on("finish", () => {
      const duration = Date.now() - start;
      if (path.startsWith("/api")) {
        const logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;

        log(logLine);
      }
    });

    next();
  });

  await registerRoutes(app, options);
  app.use("/api", (_req, res) => { res.status(404).json({ error: "Not found" }); });

  // HTML is rendered per request so each portfolio domain receives its own
  // canonical and metadata. This lives here rather than in the HTTP entry
  // point because the Vercel serverless handler builds the app directly and
  // would otherwise never render brand-specific HTML.
  if (process.env.NODE_ENV === "production") {
    serveStatic(app);
  }

  app.use(errorHandler);
  return app;
}

declare module "http" {
  interface IncomingMessage { rawBody: unknown; }
}
