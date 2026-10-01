import assert from "node:assert/strict";
import { createServer } from "node:http";
import { once } from "node:events";
import { test } from "node:test";

// A deliberately unreachable local database ensures cold starts do not seed/query.
process.env.DATABASE_URL = "postgresql://localhost:1/vercel_adapter_test";
process.env.NODE_ENV = "production";
delete process.env.STRIPE_SECRET_KEY;
const { default: handler } = await import("../api/index");
const { createApp } = await import("../server/app");
const { serveStatic } = await import("../server/static");

test("Vercel handler initializes concurrently and routes API paths", async () => {
  const server = createServer((req, res) => { void handler(req as never, res as never); });
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  const origin = `http://127.0.0.1:${(server.address() as { port: number }).port}`;
  try {
    const responses = await Promise.all(Array.from({ length: 3 }, () => fetch(`${origin}/api/health`)));
    for (const response of responses) {
      assert.equal(response.status, 200);
      assert.deepEqual(await response.json(), { status: "ok" });
    }
    const missing = await fetch(`${origin}/api/missing`);
    assert.equal(missing.status, 404);
    assert.match(missing.headers.get("content-type")!, /json/);
    const checkout = await fetch(`${origin}/api/create-checkout-session`, {
      method: "POST", headers: { "Content-Type": "application/json" }, body: "{}",
    });
    assert.equal(checkout.status, 503);
    console.log("Local adapter: HTTP/1.1 200 OK /api/health");
  } finally { server.closeAllConnections(); await new Promise<void>(resolve => server.close(() => resolve())); }
});

test("shared app preserves raw JSON and standalone static SPA serving", async () => {
  const app = await createApp();
  app.post("/raw-test", (req, res) => { res.json({ raw: (req.rawBody as Buffer).toString() }); });
  serveStatic(app);
  const server = app.listen(0, "127.0.0.1");
  await once(server, "listening");
  const origin = `http://127.0.0.1:${(server.address() as { port: number }).port}`;
  try {
    for (const path of ["/", "/checkout"]) {
      const response = await fetch(origin + path);
      assert.equal(response.status, 200);
      assert.match(await response.text(), /<html/i);
    }
    const body = '{ "example": true }';
    const response = await fetch(`${origin}/raw-test`, {
      method: "POST", headers: { "Content-Type": "application/json" }, body,
    });
    assert.deepEqual(await response.json(), { raw: body });
    console.log("Local static server: HTTP/1.1 200 OK /");
  } finally { server.closeAllConnections(); await new Promise<void>(resolve => server.close(() => resolve())); }
});
