import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "@shared/schema";

// Pool construction does not connect. Routes must check this before DB work.
export const databaseConfigured = Boolean(process.env.DATABASE_URL?.trim());

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool, { schema });
