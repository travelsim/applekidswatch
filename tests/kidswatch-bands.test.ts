import assert from "node:assert/strict";
import { test } from "node:test";
import fs from "node:fs";
import path from "node:path";
import { WATCH_BANDS } from "../shared/bands.ts";
import { catalogueFor } from "../shared/catalogue.ts";
import { BRANDS } from "../shared/brands.ts";

const imagesDir = path.resolve("client/public/images");

test("every watch band links to an official https page and has a local image", () => {
  assert.equal(WATCH_BANDS.length, 4);
  for (const band of WATCH_BANDS) {
    assert.match(band.source, /^https:\/\//, `${band.sku} source`);
    assert.ok(fs.existsSync(path.join(imagesDir, path.basename(band.image))), `${band.sku} image file`);
    assert.ok(band.imageAlt.length > 0, `${band.sku} alt text`);
  }
});

test("watch band skus are unique", () => {
  const skus = WATCH_BANDS.map((b) => b.sku);
  assert.equal(new Set(skus).size, skus.length);
});

test("comparison models keep Price TBC and out-of-stock flags", () => {
  const brand = BRANDS.find((b) => b.id === "applekidswatch") ?? BRANDS[0];
  const comparison = catalogueFor(brand).filter((p) => p.sku.startsWith("GW-"));
  assert.equal(comparison.length, 5);
  for (const p of comparison) {
    assert.equal(p.price, 0, `${p.sku} price`);
    assert.equal(p.inStock, false, `${p.sku} inStock`);
    assert.ok(fs.existsSync(path.join(imagesDir, path.basename(p.image))), `${p.sku} image file`);
    assert.doesNotMatch(p.description, /placeholder/i, `${p.sku} description`);
  }
});

test("Apple kit descriptions state the Family Setup compatibility", () => {
  const brand = BRANDS.find((b) => b.id === "applekidswatch") ?? BRANDS[0];
  const kitSkus = ["AKW-SE2-A", "AKW-SE2-B", "AKW-SE1-B", "AKW-S6-A", "AKW-SE2-PINK-A", "AKW-S4-A"];
  const kits = catalogueFor(brand).filter((p) => kitSkus.includes(p.sku));
  assert.equal(kits.length, 6);
  for (const k of kits) assert.match(k.description, /watchOS 7 or later/, k.sku);
});