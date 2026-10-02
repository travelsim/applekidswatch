import { type User, type InsertUser, type Product, type BlogPost, type Order, type InsertOrder, type Testimonial, products, blogPosts, users, newsletterSubscribers, orders, testimonials, brands } from "@shared/schema";
import { db } from "./db";
import { eq, and, desc, asc } from "drizzle-orm";
import { BRANDS } from "@shared/brands";
import { catalogueFor } from "@shared/catalogue";
import { blogSeedFor } from "@shared/blog";
import type { Brand } from "@shared/schema";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getBrands(): Promise<Brand[]>;
  getProducts(brandId: string): Promise<Product[]>;
  getProduct(id: string, brandId: string): Promise<Product | undefined>;
  getPosts(brandId: string): Promise<BlogPost[]>;
  getPost(slug: string, brandId: string): Promise<BlogPost | undefined>;
  addNewsletterSubscriber(email: string): Promise<void>;
  getTestimonials(brandId: string): Promise<Testimonial[]>;
  seedData(): Promise<void>;
  createOrder(order: InsertOrder): Promise<Order>;
  getOrders(): Promise<Order[]>;
  getOrder(id: string): Promise<Order | undefined>;
  getOrderByStripeSessionId(sessionId: string): Promise<Order | undefined>;
  updateOrderStatus(id: string, status: string): Promise<Order | undefined>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async getBrands(): Promise<Brand[]> {
    return db.select().from(brands);
  }

  async getProducts(brandId: string): Promise<Product[]> {
    return db
      .select()
      .from(products)
      .where(eq(products.brandId, brandId))
      .orderBy(asc(products.sortOrder));
  }

  async getProduct(id: string, brandId: string): Promise<Product | undefined> {
    const [product] = await db
      .select()
      .from(products)
      .where(and(eq(products.id, id), eq(products.brandId, brandId)));
    return product;
  }

  async getPosts(brandId: string): Promise<BlogPost[]> {
    return db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.brandId, brandId))
      .orderBy(desc(blogPosts.publishedAt));
  }

  async getPost(slug: string, brandId: string): Promise<BlogPost | undefined> {
    const [post] = await db
      .select()
      .from(blogPosts)
      .where(and(eq(blogPosts.slug, slug), eq(blogPosts.brandId, brandId)));
    return post;
  }

  async addNewsletterSubscriber(email: string): Promise<void> {
    await db.insert(newsletterSubscribers).values({ email }).onConflictDoNothing();
  }

  async getTestimonials(brandId: string): Promise<Testimonial[]> {
    // Testimonials intentionally ship empty. Nothing is seeded, so the
    // brand-scoped query returns an honest empty list and the client
    // renders an empty state rather than fabricated quotes.
    return db
      .select()
      .from(testimonials)
      .where(eq(testimonials.brandId, brandId))
      .orderBy(testimonials.sortOrder);
  }

  /**
   * Install the four-brand launch catalogue only when the brands table has
   * no rows. Safe to call on every cold start: it is a no-op once seeded.
   */
  async seedIfEmpty(): Promise<boolean> {
    const [existing] = await db.select({ id: brands.id }).from(brands).limit(1);
    if (existing) return false;
    await this.seedData();
    return true;
  }

  /**
   * Idempotent, forward-only seed. Retires the single-brand launch rows
   * (which carried duplicate names and a meaningless storage field) and
   * replaces them with the four-brand catalogue.
   */
  async seedData(): Promise<void> {
    const APPLE_NOTE =
      "Specialist in refurbished Apple® devices. Not affiliated with, endorsed by, or sponsored by Apple Inc. Apple® and Apple Watch are trademarks of Apple Inc.";

    const existingBrands = await db.select().from(brands);
    const missingBrands = BRANDS.filter(
      (b) => !existingBrands.some((row) => row.id === b.id)
    );
    if (missingBrands.length > 0) {
      await db.insert(brands).values(
        missingBrands.map((b) => ({
          id: b.id,
          domain: b.domain,
          name: b.name,
          tagline: b.tagline,
          market: b.market,
          currency: b.currency,
          locale: b.locale,
          audience: b.audience,
          heroHeadline: b.heroHeadline,
          heroSub: b.heroSub,
          complianceNote: APPLE_NOTE,
          metaTitle: b.metaTitle,
          metaDescription: b.metaDescription,
          active: true,
        }))
      );
    }

    // Retire the original single-brand rows that predate brand_id.
    await db.delete(products);
    await db.delete(blogPosts);

    const publishedAt = "2026-09-28";
    for (const brand of BRANDS) {
      const rows = catalogueFor(brand).map((p) => ({
        name: p.name,
        description: p.description,
        price: p.price,
        originalPrice: p.compareAtPrice,
        grade: p.grade,
        color: p.color,
        storage: p.caseSpec,
        image: p.image,
        features: p.features,
        inStock: p.inStock,
        brandId: brand.id,
        sku: p.sku,
        category: p.category,
        planType: p.planType,
        planTerm: p.planTerm,
        market: p.market,
        compareAtPrice: p.compareAtPrice,
        badge: p.badge,
        sortOrder: p.sortOrder,
      }));
      await db.insert(products).values(rows);

      const posts = blogSeedFor(brand).map((b, i) => ({
        title: b.title,
        slug: b.slug,
        excerpt: b.excerpt,
        content: b.content,
        category: b.category,
        image: b.image,
        author: "Apple Kids Watch Editorial",
        publishedAt,
        readTime: b.readTime,
        brandId: brand.id,
        sortOrder: i,
      }));
      await db.insert(blogPosts).values(posts);
    }
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const [order] = await db.insert(orders).values(insertOrder).returning();
    return order;
  }

  async getOrders(): Promise<Order[]> {
    return db.select().from(orders).orderBy(desc(orders.createdAt));
  }

  async getOrder(id: string): Promise<Order | undefined> {
    const [order] = await db.select().from(orders).where(eq(orders.id, id));
    return order;
  }

  async getOrderByStripeSessionId(sessionId: string): Promise<Order | undefined> {
    const [order] = await db.select().from(orders).where(eq(orders.stripeSessionId, sessionId));
    return order;
  }

  async updateOrderStatus(id: string, status: string): Promise<Order | undefined> {
    const [order] = await db.update(orders).set({ status }).where(eq(orders.id, id)).returning();
    return order;
  }
}

export const storage = new DatabaseStorage();
