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
