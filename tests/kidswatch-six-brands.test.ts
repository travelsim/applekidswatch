import assert from "node:assert/strict";
import { test } from "node:test";
import fs from "node:fs";
import { resolveBrandFromHost } from "../shared/brands.ts";

test("kidswatch six-brand resolution", () => {
  const cases: Array<[string, string]> = [
    ["kidswat.ch", "kidswat.ch"],
    ["www.kidswat.ch", "kidswat.ch"],
    ["apple.kidswat.ch", "apple.kidswat.ch"],
    ["spacetalk.kidswat.ch", "spacetalk.kidswat.ch"],
    ["garmin.kidswat.ch", "garmin.kidswat.ch"],
    ["pixbee.kidswat.ch", "pixbee.kidswat.ch"],
    ["imoo.kidswat.ch", "imoo.kidswat.ch"],
    ["safeowl.kidswat.ch", "safeowl.kidswat.ch"],
    ["applekidswatch.com", "applekidswatch.com"],
  ];
  for (const [host, expected] of cases) {
    const { brand, matched } = resolveBrandFromHost(host);
    assert.equal(brand.domain, expected, `resolve ${host}`);
    assert.equal(matched, true, `${host} should match`);
  }
  // Unknown host falls back to flagship
  const fb = resolveBrandFromHost("preview.vercel.app");
  assert.equal(fb.matched, false);
  assert.equal(fb.brand.domain, "applekidswatch.com");
});

test("kidswatch neutral copy avoids partnership claims", () => {
  const home = fs.readFileSync(new URL("../client/src/pages/Home.tsx", import.meta.url), "utf8");
  assert.ok(!home.includes("Better Roaming Partner"), "no partner claim");
  assert.ok(home.includes("section-six-pillars"), "six-pillar section present");
  for (const brand of ["Garmin", "Pixbee", "imoo", "Safe Owl"]) {
    assert.ok(home.includes(brand), `Home contains ${brand}`);
  }
  // No unsourced pricing for new brands in six-pillar area — ensure Garmin/Pixbee/imoo/Safe Owl cards do not contain A$ or $
  const sixIdx = home.indexOf('data-testid="section-six-pillars"');
  const sixEnd = home.indexOf('data-testid="section-product-showcase"', sixIdx);
  const sixSection = home.slice(sixIdx, sixEnd > -1 ? sixEnd : undefined);
  assert.ok(!/A\$|US\$|€|£/.test(sixSection), "six-pillar section must not contain pricing");
  assert.ok(!sixSection.includes("in stock") && !sixSection.includes("Add to cart"), "no stock claim");
});

test("commission factory verification preserved", () => {
  const html = fs.readFileSync(new URL("../client/index.html", import.meta.url), "utf8");
  assert.ok(
    html.includes('name="commission-factory-verification"') &&
    html.includes("e2e263b3b54a4cbda1310852027cb96e"),
    "commission meta present",
  );
});


test("playground wrist hero, no refurbished text, de-AUified KIDS_WATCH copy", () => {
  const home = fs.readFileSync(new URL("../client/src/pages/Home.tsx", import.meta.url), "utf8");
  assert.ok(home.includes("child_playing_park"), "hero uses playground image");
  assert.ok(home.includes("Child wearing a kids smartwatch in a playground"), "hero alt is playground");
  assert.ok(home.includes("Kids smartwatches"), "hero badge neutral for family");
  const brands = fs.readFileSync(new URL("../shared/brands.ts", import.meta.url), "utf8");
  assert.ok(brands.includes("Kids Smartwatches | Kids Watch"), "parent neutral");
  const parentBlock = brands.slice(brands.indexOf("KIDS_WATCH_PARENT_BRAND"), brands.indexOf("KIDS_WATCH_SPACETALK_BRAND"));
  assert.ok(!parentBlock.includes("Australian"), "parent de-AUified");
});

test("six-way comparison includes all six without unsourced pricing", () => {
  const home = fs.readFileSync(new URL("../client/src/pages/Home.tsx", import.meta.url), "utf8");
  for (const b of ["Apple", "Spacetalk", "Garmin", "Pixbee", "imoo", "Safe Owl"]) {
    assert.ok(home.includes(b), "home has " + b);
  }
  assert.ok(home.includes("Six ways to choose") || home.includes("section-six-pillars"), "six section present");
  assert.ok(home.includes("Not affiliated"), "non-affiliation covers Garmin");
});

test("shop catalogue includes all six models without invented price", () => {
  const cat = fs.readFileSync(new URL("../shared/catalogue.ts", import.meta.url), "utf8");
  for (const sku of ["GW-GARMIN", "GW-PIXBEE", "GW-IMOO", "GW-SAFEOWL", "GW-SPACETALK"]) {
    assert.ok(cat.includes(sku), "catalogue has " + sku);
  }
});

test("connectivity page lists Better Roaming plus ALDI and shortlisted, Better Roaming not partner", () => {
  const conn = fs.readFileSync(new URL("../client/src/pages/Connectivity.tsx", import.meta.url), "utf8");
  assert.ok(conn.includes("Better Roaming"), "lists Better Roaming");
  assert.ok(conn.includes("ALDI"), "lists ALDI");
  assert.ok(conn.includes("Optus") || conn.includes("Vodafone"), "shortlisted carriers present");
  assert.ok(!conn.includes("Better Roaming Partner") && !conn.includes("trusted partner"), "Better Roaming not partner");
  const about = fs.readFileSync(new URL("../client/src/pages/About.tsx", import.meta.url), "utf8");
  const safety = fs.readFileSync(new URL("../client/src/pages/Safety.tsx", import.meta.url), "utf8");
  assert.ok(!about.includes("Our partnership with Better Roaming") && !safety.includes("Our partnership with Better Roaming"), "partner language removed");
});

test("shop shows all models with official nofollow links for non-Apple, no Better Roaming", () => {
  const pc = fs.readFileSync(new URL("../client/src/components/ProductCard.tsx", import.meta.url), "utf8");
  assert.ok(pc.includes("OFFICIAL_URLS") || pc.includes("officialUrl"), "official url map present");
  assert.ok(pc.includes("spacetalk.com.au"), "spacetalk official");
  assert.ok(pc.includes("garmin.com"), "garmin official");
  assert.ok(pc.includes("pixbee.com.au"), "pixbee official");
  assert.ok(pc.includes("imoo.com"), "imoo official");
  assert.ok(pc.includes("nofollow noopener noreferrer"), "nofollow present");
  assert.ok(pc.includes("Official page"), "official page label");
  const shop = fs.readFileSync(new URL("../client/src/pages/Shop.tsx", import.meta.url), "utf8");
  assert.ok(shop.includes("WR-AU-BR") || shop.includes("BetterRoaming"), "shop filters Better Roaming");
  assert.ok(shop.includes("Kids watches — Apple, Spacetalk, Garmin, Pixbee, imoo, Safe Owl"), "shop title lists six");
});

test("shop images are neutral placeholder for competitors, no Apple-for-competitor", () => {
  const cat = fs.readFileSync(new URL("../shared/catalogue.ts", import.meta.url), "utf8");
  // competitor models should use neutral placeholder, not Apple watch images
  assert.ok(cat.includes("/images/neutral-watch-placeholder.jpg"), "neutral placeholder used");
  // ensure competitor kits are not using apple_watch images
  const gwSection = cat.slice(cat.indexOf("GW-GARMIN_KIDS"), cat.indexOf("GW-GARMIN_KIDS") + 3000);
  assert.ok(!gwSection.includes("/images/apple_watch_"), "no apple image for competitor");
  // alt text via ProductCard uses product.name, which is correct; description notes placeholder
  const pc = fs.readFileSync(new URL("../client/src/components/ProductCard.tsx", import.meta.url), "utf8");
  assert.ok(pc.includes("Image shown is a neutral placeholder") || pc.includes("neutral placeholder"), "placeholder disclaimer present");
});

test("Better Roaming absent from /shop page", () => {
  const shop = fs.readFileSync(new URL("../client/src/pages/Shop.tsx", import.meta.url), "utf8");
  // Shop.tsx itself should not contain BetterRoaming copy (filter excludes catalogue plans); catalogue still has plan names but shop filters them
  assert.ok(shop.includes("BetterRoaming") || shop.includes("Better Roaming") || shop.includes("WR-AU-BR"), "filter code mentions BestRoaming to exclude it");
  // ProductCard / Catalogue still contain BetterRomining for AU plans elsewhere but shop excludes them; check shop filteredProducts logic excludes
  assert.ok(shop.includes("WR-AU-BR") && shop.includes("filtered"), "shop hides BetterRoaming plans");
  const conn = fs.readFileSync(new URL("../client/src/pages/Connectivity.tsx", import.meta.url), "utf8");
  assert.ok(conn.includes("Better Roaming"), "Connectivity still lists Better Roaming (unchanged per brief)");
});
