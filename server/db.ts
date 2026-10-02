import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "@shared/schema";

// Pool construction does not connect. Routes must check this before DB work.
export const databaseConfigured = Boolean(process.env.DATABASE_URL?.trim());

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool, { schema });

/**
 * Forward-only, idempotent schema migration for the four-brand portfolio.
 * Every statement is IF NOT EXISTS, so this is safe to run on every cold
 * start and never drops or truncates existing data.
 *
 * Applied by the application rather than by a build-time step because the
 * serverless deployment has no release phase. Failure is logged, never
 * thrown: the routes below degrade to a 503 instead of a crash loop.
 */
const MIGRATION_STATEMENTS = [
  `CREATE TABLE IF NOT EXISTS brands (
     id varchar PRIMARY KEY,
     domain text NOT NULL UNIQUE,
     name text NOT NULL,
     tagline text NOT NULL,
     market text NOT NULL,
     currency text NOT NULL,
     locale text NOT NULL,
     audience text NOT NULL,
     hero_headline text NOT NULL,
     hero_sub text NOT NULL,
     compliance_note text NOT NULL,
     meta_title text NOT NULL,
     meta_description text NOT NULL,
     active boolean NOT NULL DEFAULT true
   )`,
  `ALTER TABLE products ADD COLUMN IF NOT EXISTS brand_id varchar REFERENCES brands(id)`,
  `ALTER TABLE products ADD COLUMN IF NOT EXISTS sku text`,
  `ALTER TABLE products ADD COLUMN IF NOT EXISTS category text`,
  `ALTER TABLE products ADD COLUMN IF NOT EXISTS plan_type text`,
  `ALTER TABLE products ADD COLUMN IF NOT EXISTS plan_term text`,
  `ALTER TABLE products ADD COLUMN IF NOT EXISTS market text`,
  `ALTER TABLE products ADD COLUMN IF NOT EXISTS compare_at_price integer`,
  `ALTER TABLE products ADD COLUMN IF NOT EXISTS badge text`,
  `ALTER TABLE products ADD COLUMN IF NOT EXISTS sort_order integer NOT NULL DEFAULT 0`,
  `ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS brand_id varchar REFERENCES brands(id)`,
  `ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS sort_order integer NOT NULL DEFAULT 0`,
  `ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS brand_id varchar REFERENCES brands(id)`,
  `CREATE INDEX IF NOT EXISTS products_brand_id_idx ON products(brand_id)`,
  `CREATE INDEX IF NOT EXISTS blog_posts_brand_id_idx ON blog_posts(brand_id)`,
  `CREATE INDEX IF NOT EXISTS testimonials_brand_id_idx ON testimonials(brand_id)`,
];

let migrationPromise: Promise<boolean> | undefined;

export function ensureSchema(): Promise<boolean> {
  migrationPromise ??= (async () => {
    if (!databaseConfigured) return false;
    try {
      const client = await pool.connect();
      try {
        for (const stmt of MIGRATION_STATEMENTS) await client.query(stmt);
      } finally {
        client.release();
      }
      return true;
    } catch (error) {
      console.error(
        "Schema migration failed:",
        error instanceof Error ? error.message : error
      );
      return false;
    }
  })();
  return migrationPromise;
}
