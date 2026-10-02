import type { Express } from "express";
import { storage } from "./storage";
import { CartItem, insertNewsletterSchema, insertOrderSchema, orders } from "@shared/schema";
import Stripe from "stripe";
import { eq } from "drizzle-orm";
import { db, databaseConfigured, ensureSchema } from "./db";
import { getErrorMessage, isZodError } from "../shared/errors";
import {
  BRANDS,
  resolveBrandFromHost,
  APPLE_NON_AFFILIATION,
} from "@shared/brands";

/** Resolve the requesting brand once, from the Host header. */
function brandFor(req: { headers: Record<string, unknown> }) {
  const host = (req.headers["x-forwarded-host"] || req.headers.host) as
    | string
    | undefined;
  const { brand, matched } = resolveBrandFromHost(host);
  if (!matched && host) {
    console.log(`[brand] unrecognised host "${host}" -> default brand ${brand.id}`);
  }
  return brand;
}

// Initialize Stripe only if key is available (graceful fallback for dev)
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey, { apiVersion: "2026-05-27.dahlia" })
  : null;

const DOMAIN = process.env.DOMAIN || `http://localhost:${process.env.PORT || 5000}`;

export async function registerRoutes(
  app: Express,
  options: { seed?: boolean } = {}
): Promise<void> {

  // Containment until authenticated ownership/admin checks are implemented.
  // Neither an order ID nor a Stripe session ID proves authorization.
  app.get([
    "/api/orders", "/api/orders/:id", "/api/orders/by-session/:sessionId",
  ], (_req, res) => {
    res.setHeader("Cache-Control", "no-store");
    res.status(403).json({ error: "Order lookup is unavailable" });
  });

  if (databaseConfigured) {
    // Apply the forward-only schema migration, then seed the four-brand
    // launch catalogue once. Seeding is guarded so a warm instance never
    // rewrites rows, and never touches orders or testimonials.
    const migrated = await ensureSchema();
    if (migrated) {
      const seeded = await storage.seedIfEmpty();
      if (seeded) console.log("[seed] four-brand launch catalogue installed");
    }
  }
  if (options.seed && databaseConfigured) await storage.seedData();

  // Process health; does not verify database connectivity.
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  // All database-backed route families, including checkout and webhooks.
  // Keep liveness, robots, analytics and unknown-route handling independent.
  app.use([
    "/api/products", "/api/posts", "/api/testimonials", "/api/orders",
    "/api/create-checkout-session", "/api/stripe-webhook",
    "/api/newsletter", "/sitemap.xml",
  ], (_req, res, next) => {
    if (!databaseConfigured) {
      res.status(503).json({ error: "Database is not configured" });
      return;
    }
    next();
  });

  app.get("/api/brands/current", async (req, res) => {
    const brand = brandFor(req);
    return res.json({
      ...brand,
      compliance_note: APPLE_NON_AFFILIATION,
      brand_id: brand.id,
      all_brand_domains: BRANDS.map((b) => b.domain),
    });
  });

  app.get("/api/products", async (req, res) => {
    try {
      const brand = brandFor(req);
      let rows = await storage.getProducts(brand.id);
      const category = req.query.category;
      if (typeof category === "string" && category) {
        rows = rows.filter((p) => p.category === category);
      }
      const planType = req.query.plan_type;
      if (typeof planType === "string" && planType) {
        rows = rows.filter((p) => p.planType === planType);
      }
      return res.json(rows);
    } catch (error: unknown) {
      if (isZodError(error)) {
        return res.status(400).json({ error: error.issues[0]?.message || "Validation error" });
      }
      console.error("Error fetching products:", getErrorMessage(error));
      return res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const brand = brandFor(req);
      const product = await storage.getProduct(req.params.id, brand.id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      return res.json(product);
    } catch (error: unknown) {
      if (isZodError(error)) {
        return res.status(400).json({ error: error.issues[0]?.message || "Validation error" });
      }
      console.error("Error fetching product:", getErrorMessage(error));
      return res.status(500).json({ error: "Failed to fetch product" });
    }
  });

  app.get("/api/posts", async (req, res) => {
    try {
      const brand = brandFor(req);
      const posts = await storage.getPosts(brand.id);
      return res.json(posts);
    } catch (error: unknown) {
      if (isZodError(error)) {
        return res.status(400).json({ error: error.issues[0]?.message || "Validation error" });
      }
      console.error("Error fetching posts:", getErrorMessage(error));
      return res.status(500).json({ error: "Failed to fetch posts" });
    }
  });

  app.get("/api/posts/:slug", async (req, res) => {
    try {
      const brand = brandFor(req);
      const post = await storage.getPost(req.params.slug, brand.id);
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
      return res.json(post);
    } catch (error: unknown) {
      if (isZodError(error)) {
        return res.status(400).json({ error: error.issues[0]?.message || "Validation error" });
      }
      console.error("Error fetching post:", getErrorMessage(error));
      return res.status(500).json({ error: "Failed to fetch post" });
    }
  });

  app.get("/api/testimonials", async (req, res) => {
    try {
      const brand = brandFor(req);
      const testimonials = await storage.getTestimonials(brand.id);
      return res.json(testimonials);
    } catch (error: unknown) {
      if (isZodError(error)) {
        return res.status(400).json({ error: error.issues[0]?.message || "Validation error" });
      }
      console.error("Error fetching testimonials:", getErrorMessage(error));
      return res.status(500).json({ error: "Failed to fetch testimonials" });
    }
  });

  // Order endpoints
  app.get("/api/orders/by-session/:sessionId", async (req, res) => {
    try {
      const order = await storage.getOrderByStripeSessionId(req.params.sessionId);
      if (!order) {
        return res.status(404).json({ error: "Order not found for this session" });
      }
      return res.json(order);
    } catch (error: unknown) {
      if (isZodError(error)) {
        return res.status(400).json({ error: error.issues[0]?.message || "Validation error" });
      }
      console.error("Error fetching order by session:", getErrorMessage(error));
      return res.status(500).json({ error: "Failed to fetch order" });
    }
  });

  app.post("/api/orders", async (req, res) => {
    try {
      const result = insertOrderSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: result.error.errors[0].message });
      }
      const order = await storage.createOrder(result.data);
      return res.status(201).json(order);
    } catch (error: unknown) {
      if (isZodError(error)) {
        return res.status(400).json({ error: error.issues[0]?.message || "Validation error" });
      }
      console.error("Error creating order:", getErrorMessage(error));
      return res.status(500).json({ error: "Failed to create order" });
    }
  });

  app.get("/api/orders", async (_req, res) => {
    try {
      const orders = await storage.getOrders();
      return res.json(orders);
    } catch (error: unknown) {
      if (isZodError(error)) {
        return res.status(400).json({ error: error.issues[0]?.message || "Validation error" });
      }
      console.error("Error fetching orders:", getErrorMessage(error));
      return res.status(500).json({ error: "Failed to fetch orders" });
    }
  });

  app.get("/api/orders/:id", async (req, res) => {
    try {
      const order = await storage.getOrder(req.params.id);
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
      return res.json(order);
    } catch (error: unknown) {
      if (isZodError(error)) {
        return res.status(400).json({ error: error.issues[0]?.message || "Validation error" });
      }
      console.error("Error fetching order:", getErrorMessage(error));
      return res.status(500).json({ error: "Failed to fetch order" });
    }
  });

  // Stripe: Create Checkout Session
  app.post("/api/create-checkout-session", async (req, res) => {
    try {
      const { items: cartItems, customer } = req.body;

      if (!stripe) {
        return res.status(503).json({
          error: "Payment processing is not configured. Please set STRIPE_SECRET_KEY.",
        });
      }

      if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
        return res.status(400).json({ error: "Cart items are required" });
      }

      if (!customer?.name || !customer?.email || !customer?.address) {
        return res.status(400).json({ error: "Customer name, email, and address are required" });
      }

      // Fetch products from DB to get prices and names
      const allProducts = await storage.getProducts(brandFor(req).id);
      const productMap = new Map(allProducts.map((p) => [p.id, p]));

      // Validate and build line items
      const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
      let subtotal = 0;

      for (const item of cartItems) {
        const product = productMap.get(item.productId);
        if (!product) {
          return res.status(400).json({ error: `Product ${item.productId} not found` });
        }
        if (!product.inStock) {
          return res.status(400).json({ error: `${product.name} is out of stock` });
        }

        lineItems.push({
          price_data: {
            currency: "usd",
            product_data: {
              name: product.name,
              description: `${product.color} - ${product.storage} (${product.grade})`,
              images: product.image ? [DOMAIN + product.image] : undefined,
            },
            unit_amount: product.price * 100, // Stripe uses cents
          },
          quantity: item.quantity,
        });

        subtotal += product.price * item.quantity;
      }

      // Build shipping address for metadata
      const shippingAddress = customer.address;
      const addressStr = [
        shippingAddress.line1,
        shippingAddress.line2,
        shippingAddress.city,
        shippingAddress.state,
        shippingAddress.zip,
      ]
        .filter(Boolean)
        .join(", ");

      // Create Stripe Checkout Session
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        line_items: lineItems,
        customer_email: customer.email,
        success_url: `${DOMAIN}/order/success/{CHECKOUT_SESSION_ID}`,
        cancel_url: `${DOMAIN}/checkout?canceled=true`,
        shipping_address_collection: {
          allowed_countries: ["US"],
        },
        phone_number_collection: {
          enabled: true,
        },
        metadata: {
          customerName: customer.name,
          customerEmail: customer.email,
          customerPhone: customer.phone || "",
          shippingAddress: addressStr,
          items: JSON.stringify(
            cartItems.map((i: CartItem) => ({
              id: i.productId,
              name: productMap.get(i.productId)?.name || "",
              color: productMap.get(i.productId)?.color || "",
              storage: productMap.get(i.productId)?.storage || "",
              price: productMap.get(i.productId)?.price || 0,
              quantity: i.quantity,
            }))
          ),
          subtotal: String(subtotal),
          shipping: "0",
          total: String(subtotal), // free shipping
        },
      });

      if (!session.url) {
        throw new Error("Stripe session URL is null");
      }

      // Create order in DB with pending status
      const orderData = {
        customerName: customer.name,
        customerEmail: customer.email,
        customerPhone: customer.phone || "",
        shippingAddress: addressStr,
        city: shippingAddress.city || "",
        state: shippingAddress.state || "",
        zipCode: shippingAddress.zip || "",
        items: JSON.stringify(
          cartItems.map((i: CartItem) => ({
            id: i.productId,
            name: productMap.get(i.productId)?.name || "",
            color: productMap.get(i.productId)?.color || "",
            storage: productMap.get(i.productId)?.storage || "",
            price: productMap.get(i.productId)?.price || 0,
            quantity: i.quantity,
          }))
        ),
        subtotal,
        shipping: 0,
        total: subtotal,
      };

      const order = await storage.createOrder(orderData);

      // Save the Stripe session ID on the order
      await db
        .update(orders)
        .set({ stripeSessionId: session.id })
        .where(eq(orders.id, order.id));

      return res.json({ url: session.url, orderId: order.id });
    } catch (error: unknown) {
      if (isZodError(error)) {
        return res.status(400).json({ error: error.issues[0]?.message || "Validation error" });
      }
      console.error("Error creating checkout session:", getErrorMessage(error));
      return res.status(500).json({ error: "Failed to create checkout session" });
    }
  });

  // Stripe: Webhook handler
  app.post("/api/stripe-webhook", async (req, res) => {
    const sig = req.headers["stripe-signature"] as string;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!webhookSecret) {
      console.error("STRIPE_WEBHOOK_SECRET is not set");
      return res.status(500).json({ error: "Webhook secret not configured" });
    }

    if (!stripe) {
      return res.status(503).json({ error: "Stripe not configured" });
    }

    let event: Stripe.Event;

    try {
      // The raw body is captured by express.json() verify callback
      const rawBody = (req as import("express").Request & { rawBody: Buffer }).rawBody;
      if (!rawBody) {
        return res.status(400).json({ error: "Raw body not available" });
      }
      event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Signature verification failed";
      console.error("Stripe webhook signature verification failed:", message);
      return res.status(400).json({ error: message });
    }

    // Handle the event
    try {
      switch (event.type) {
        case "checkout.session.completed": {
          const session = event.data.object as Stripe.Checkout.Session;

          if (session.id) {
            // Find order by Stripe session ID
            const order = await storage.getOrderByStripeSessionId(session.id);
            if (order) {
              await storage.updateOrderStatus(order.id, "paid");
              console.log(`Order ${order.id} marked as paid via webhook`);
            } else {
              console.warn(`No order found for Stripe session ${session.id}`);
            }
          }
          break;
        }

        case "checkout.session.expired":
        case "checkout.session.async_payment_failed": {
          const session = event.data.object as Stripe.Checkout.Session;
          const order = await storage.getOrderByStripeSessionId(session.id);
          if (order) {
            await storage.updateOrderStatus(order.id, "failed");
            console.log(`Order ${order.id} marked as failed via webhook`);
          }
          break;
        }

        default:
          console.log(`Unhandled Stripe webhook event type: ${event.type}`);
      }

      return res.json({ received: true });
    } catch (error: unknown) {
      console.error("Error processing Stripe webhook event:", getErrorMessage(error));
      return res.status(500).json({ error: "Webhook handler error" });
    }
  });

  app.get("/robots.txt", (req, res) => {
    res.type("text/plain").send(`User-agent: *
Allow: /
Sitemap: ${req.protocol}://${req.get("host")}/sitemap.xml

User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /
`);
  });

  app.get("/sitemap.xml", async (req, res) => {
    try {
      const products = await storage.getProducts(brandFor(req).id);
      const posts = await storage.getPosts(brandFor(req).id);
      const baseUrl = `${req.protocol}://${req.get("host")}`;

      const urls = [
        { loc: "/", priority: "1.0", changefreq: "daily" },
        { loc: "/shop", priority: "0.9", changefreq: "daily" },
        { loc: "/safety", priority: "0.8", changefreq: "weekly" },
        { loc: "/blog", priority: "0.8", changefreq: "weekly" },
        { loc: "/about", priority: "0.6", changefreq: "monthly" },
        ...products.map((p) => ({
          loc: `/product/${p.id}`,
          priority: "0.7",
          changefreq: "weekly" as const,
        })),
        ...posts.map((p) => ({
          loc: `/blog/${p.slug}`,
          priority: "0.6",
          changefreq: "monthly" as const,
        })),
      ];

      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${baseUrl}${u.loc}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

      return res.type("application/xml").send(sitemap);
    } catch (error: unknown) {
      console.error("Error generating sitemap:", getErrorMessage(error));
      return res.status(500).send("Error generating sitemap");
    }
  });

  app.post("/api/newsletter", async (req, res) => {
    try {
      const result = insertNewsletterSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ error: result.error.errors[0].message });
      }
      await storage.addNewsletterSubscriber(result.data.email);
      return res.json({ success: true, message: "Successfully subscribed!" });
    } catch (error: unknown) {
      if (isZodError(error)) {
        return res.status(400).json({ error: error.issues[0]?.message || "Validation error" });
      }
      console.error("Error subscribing to newsletter:", getErrorMessage(error));
      return res.status(500).json({ error: "Failed to subscribe" });
    }
  });

  // Page view tracking endpoint (analytics)
  app.post("/api/analytics/pageview", async (req, res) => {
    try {
      const { path, referrer } = req.body;
      // Simple console logging for now — can be extended to database storage or GA4
      console.log(`[Analytics] Page view: ${path} | Referrer: ${referrer || "direct"} | IP: ${req.ip}`);
      return res.json({ success: true });
    } catch (error: unknown) {
      // Analytics failures should never break the app
      console.error("Error recording pageview:", getErrorMessage(error));
      return res.json({ success: true });
    }
  });


}
