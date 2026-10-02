-- Four-brand portfolio: forward-only migration. Safe to run against the
-- live database. Does NOT truncate or drop the existing catalogue; the
-- application seed retires the original single-brand rows on next deploy.

CREATE TABLE IF NOT EXISTS brands (
  id              varchar PRIMARY KEY,
  domain          text NOT NULL UNIQUE,
  name            text NOT NULL,
  tagline         text NOT NULL,
  market          text NOT NULL,
  currency        text NOT NULL,
  locale          text NOT NULL,
  audience        text NOT NULL,
  hero_headline   text NOT NULL,
  hero_sub        text NOT NULL,
  compliance_note text NOT NULL,
  meta_title      text NOT NULL,
  meta_description text NOT NULL,
  active          boolean NOT NULL DEFAULT true
);

ALTER TABLE products    ADD COLUMN IF NOT EXISTS brand_id         varchar REFERENCES brands(id);
ALTER TABLE products    ADD COLUMN IF NOT EXISTS sku              text;
ALTER TABLE products    ADD COLUMN IF NOT EXISTS category         text;
ALTER TABLE products    ADD COLUMN IF NOT EXISTS plan_type        text;
ALTER TABLE products    ADD COLUMN IF NOT EXISTS plan_term        text;
ALTER TABLE products    ADD COLUMN IF NOT EXISTS market           text;
ALTER TABLE products    ADD COLUMN IF NOT EXISTS compare_at_price integer;
ALTER TABLE products    ADD COLUMN IF NOT EXISTS badge            text;
ALTER TABLE products    ADD COLUMN IF NOT EXISTS sort_order       integer NOT NULL DEFAULT 0;

ALTER TABLE blog_posts  ADD COLUMN IF NOT EXISTS brand_id  varchar REFERENCES brands(id);
ALTER TABLE blog_posts  ADD COLUMN IF NOT EXISTS sort_order integer NOT NULL DEFAULT 0;

ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS brand_id varchar REFERENCES brands(id);

CREATE INDEX IF NOT EXISTS products_brand_id_idx    ON products(brand_id);
CREATE INDEX IF NOT EXISTS blog_posts_brand_id_idx  ON blog_posts(brand_id);
CREATE INDEX IF NOT EXISTS testimonials_brand_id_idx ON testimonials(brand_id);
