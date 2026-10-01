import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, copyFileSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { test } from "node:test";
import { transformSync } from "esbuild";

// Run `npm run build` first. Execute plain Node with only the compiled adapter
// and built server artifact: no tsx, source tree, aliases or TS import resolver.
for (const configured of [false, true]) {
  test(`built function: DATABASE_URL ${configured ? "configured but unreachable" : "absent"}`, () => {
    const root = mkdtempSync(resolve(".runtime-test-"));
    try {
      mkdirSync(join(root, "api"));
      mkdirSync(join(root, "dist"));
      copyFileSync("dist/app.cjs", join(root, "dist/app.cjs"));
      writeFileSync(join(root, "api/index.mjs"), transformSync(readFileSync("api/index.ts", "utf8"), {
        loader: "ts", format: "esm", target: "node20",
      }).code);
      const env = { ...process.env, NODE_ENV: "production" };
      delete env.DATABASE_URL;
      delete env.STRIPE_SECRET_KEY;
      delete env.STRIPE_WEBHOOK_SECRET;
      if (configured) env.DATABASE_URL = "postgresql://localhost:1/runtime_test";
      const result = spawnSync(process.execPath, ["--input-type=module", "-e", `
        import assert from 'node:assert/strict';
        import { createServer } from 'node:http';
        import { once } from 'node:events';
        import handler from './api/index.mjs';
        const server = createServer((req, res) => { void handler(req, res); });
        server.listen(0, '127.0.0.1');
        await once(server, 'listening');
        const origin = 'http://127.0.0.1:' + server.address().port;
        try {
          const health = await Promise.all(Array.from({ length: 3 }, () => fetch(origin + '/api/health')));
          for (const res of health) {
            assert.equal(res.status, 200);
            assert.deepEqual(await res.json(), { status: 'ok' });
          }
          assert.equal((await fetch(origin + '/api/missing')).status, 404);
          assert.equal((await fetch(origin + '/robots.txt')).status, 200);
          if (!process.env.DATABASE_URL) {
            for (const [method, path] of [
              ['GET', '/api/products'], ['GET', '/api/products/test'],
              ['GET', '/api/posts'], ['GET', '/api/posts/test'],
              ['GET', '/api/testimonials'], ['GET', '/api/orders'],
              ['GET', '/api/orders/test'], ['GET', '/api/orders/by-session/test'],
              ['POST', '/api/orders'], ['POST', '/api/create-checkout-session'],
              ['POST', '/api/stripe-webhook'], ['POST', '/api/newsletter'],
              ['GET', '/sitemap.xml'],
            ]) {
              const res = await fetch(origin + path, { method });
              assert.equal(res.status, 503, method + ' ' + path);
              assert.deepEqual(await res.json(), { error: 'Database is not configured' });
            }
          }
        } finally {
          server.closeAllConnections();
          await new Promise(resolve => server.close(resolve));
        }
      `], { cwd: root, env, encoding: "utf8", timeout: 20000 });
      assert.equal(result.status, 0, result.stdout + result.stderr + (result.error || ""));
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  });
}
