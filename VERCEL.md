# Vercel handoff

The Vite client builds to dist/public. api/index.ts awaits and caches the shared
Express app without listen(), Vite, automatic schema migration, or seeding.
Rewrites send API, robots.txt and sitemap.xml to Express, with a SPA fallback.
Local server/index.ts retains its Vite/static server and startup seeding behavior.

Environment names: DATABASE_URL (required PostgreSQL, Neon target),
STRIPE_SECRET_KEY (checkout), STRIPE_WEBHOOK_SECRET (webhooks), DOMAIN (checkout
public origin), NODE_ENV (runtime mode), PORT (standalone only).

Provision an isolated preview database and apply shared/schema.ts using db:push
only with approval. Vercel does not run npm start or its schema push. Populate
catalog data separately: existing seedData can replace existing products/posts.
No database was connected or modified while preparing this patch.

Validation: npm run check; npm run build;
node --import tsx --test tests/vercel-api.test.ts.
Tests cover concurrent initialization, health, API 404, payment-disabled response,
raw JSON capture, homepage and SPA deep links. They do not verify PostgreSQL,
payments, deployed Vercel rewrites/body handling, or database-backed local startup.
After an authorized push, verify / and /api/products on the preview, including
response bodies. Verify signed test webhooks before enabling payments.

Existing public-cutover risk: order read endpoints have no authentication.
Do not connect customer data to a public preview. Shared response-body logging
was removed to avoid copying order data into logs. Dependency installation
reported 15 audit findings (1 low, 8 moderate, 6 high); upgrades are out of scope.

References:
https://vercel.com/docs/functions/runtimes/node-js
https://vercel.com/docs/routing/rewrites
