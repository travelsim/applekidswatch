# Stripe Payment Integration — Progress

## Status: Complete ✅

### What was built

**Backend — Stripe Checkout Session API**
- `POST /api/create-checkout-session` — creates a Stripe Checkout Session with line items from the cart, stores order in DB with `pending` status, returns Stripe redirect URL
- `POST /api/stripe-webhook` — handles `checkout.session.completed` and failure events via signature-verified webhook
- `GET /api/orders/by-session/:sessionId` — resolves an order by Stripe session ID (for post-payment redirect)
- `GET /api/orders/:id` — existing, works as before

**Stripe Webhook**
- Verifies signature using `STRIPE_WEBHOOK_SECRET`
- Handles: `checkout.session.completed` → order status to `paid`
- Handles: `checkout.session.expired` / `checkout.session.async_payment_failed` → order status to `failed`

**Database**
- Added `stripe_session_id` column to `orders` table
- Status values: `pending` → `paid` or `failed` (via webhook)
- Migration: `drizzle-kit push` applied successfully

**Frontend — Checkout Page**
- Stripe Checkout Session API contact: submits cart items + customer info
- On success, stores `orderId` in sessionStorage, clears cart, redirects to Stripe Checkout hosted page
- Shows "Pay with Card — $X" button instead of "Place Order — $X"
- Order confirmation fetches order by session ID from API or sessionStorage

**Order Confirmation**
- `/order/:id` — existing order lookup by DB ID
- `/order/success/:sessionId` — new route; resolves session → order and redirects to `/order/:id`
- Shows payment status badge (Pending / Paid / Failed)
- Shows payment method info

### Files modified
| File | Change |
|------|--------|
| `shared/schema.ts` | Added `stripeSessionId` field to orders table |
| `server/storage.ts` | Added `getOrderByStripeSessionId()` and `updateOrderStatus()` |
| `server/routes.ts` | Added Stripe checkout session creation + webhook handler |
| `client/src/pages/Checkout.tsx` | Replaced direct order creation with Stripe Checkout redirect |
| `client/src/pages/OrderConfirmation.tsx` | Added Stripe session resolution, payment status display |
| `client/src/App.tsx` | Added `/order/success/:sessionId` route |
| `.env` | Added Stripe config placeholders |
| `package.json` | Added `stripe` + `@stripe/stripe-js` dependencies |

### Configuration needed

Before going live, set these env vars (instructions in `.env`):
```bash
# Get test keys from: https://dashboard.stripe.com/test/apikeys
# Get webhook secret from: https://dashboard.stripe.com/test/webhooks
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...

# For production, use live keys from:
# https://dashboard.stripe.com/apikeys
# https://dashboard.stripe.com/webhooks
```

### Local webhook testing
```bash
stripe listen --forward-to localhost:5000/api/stripe-webhook
stripe trigger checkout.session.completed
```

### Stripe mode switch (test → live)
1. Change `STRIPE_SECRET_KEY` to the live secret key
2. Change `VITE_STRIPE_PUBLISHABLE_KEY` to the live publishable key
3. Create a production webhook endpoint in Stripe dashboard pointing to `https://applekidswatch.com/api/stripe-webhook`
4. Set `STRIPE_WEBHOOK_SECRET` to the production webhook signing secret
5. Remove test card fingerprints from DB if applicable

### Error handling
- If `STRIPE_SECRET_KEY` is not set, returns 503 with clear error message
- Invalid cart items → 400
- Webhook signature mismatch → 400
- Webhook failures logged but don't crash the server
