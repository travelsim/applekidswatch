import { BRANDS, resolveBrandFromHost, HOME_COUNTRY_CLAUSE, APPLE_NON_AFFILIATION } from "./shared/brands.ts";
import { catalogueFor } from "./shared/catalogue.ts";
import { blogSeedFor } from "./shared/blog.ts";

let fail = 0;
const ok = (c, m) => { console.log((c ? "PASS  " : "FAIL  ") + m); if (!c) fail++; };

for (const brand of BRANDS) {
  const cat = catalogueFor(brand);
  const skus = new Set(cat.map(p => p.sku));
  console.log(`\n=== ${brand.domain} (${brand.id}) base=${brand.currency} ===`);
  ok(cat.length > 0, `catalogue has ${cat.length} SKUs`);
  ok(skus.size === cat.length, `all SKUs unique (${skus.size}/${cat.length})`);
  ok(cat.filter(p=>p.planType==="hardware").length === 6, "6 hardware kits");
  ok(cat.some(p=>p.planType==="plan"), "has connectivity plans");
  ok(cat.some(p=>p.planType==="accessory"), "has accessories");
  ok(cat.some(p=>p.planType==="warranty"), "has protection/warranty");
  ok(cat.every(p => typeof p.price === "number" && p.price > 0), "every SKU priced");
  ok(cat.every(p => !/32GB|128GB/.test(p.caseSpec)), "no storage-capacity nonsense field");
  const plans = cat.filter(p=>p.planType==="plan" && p.sku.startsWith("AKW-PLAN"));
  ok(plans.every(p=>p.description.includes(HOME_COUNTRY_CLAUSE)), `all ${plans.length} BetterRoaming plans carry the home-country-only clause`);
  ok(plans.every(p=>p.market !== "CH"), "no Swiss-local plan SKU");
  ok(cat.every(p=>p.description.includes(APPLE_NON_AFFILIATION)), "Apple non-affiliation on every SKU");
  const posts = blogSeedFor(brand);
  ok(posts.length === 6, `6 blog posts`);
  ok(new Set(posts.map(p=>p.slug)).size === 6, "blog slugs unique within brand");
  const names = cat.map(p=>p.name);
  ok(new Set(names).size >= names.length - 2, "no wholesale duplicate names");
  console.log("   price range: " + Math.min(...cat.map(p=>p.price)) + "-" + Math.max(...cat.map(p=>p.price)) + " " + brand.currency);
}

console.log("\n=== host resolution ===");
for (const b of BRANDS) {
  for (const h of [b.domain, "www."+b.domain, b.domain.toUpperCase()]) {
    const r = resolveBrandFromHost(h);
    ok(r.brand.id === b.id && r.matched, `${h} -> ${r.brand.id}`);
  }
}
const d = resolveBrandFromHost("applekidswatch-97hkwhcom-jimmylove.vercel.app");
ok(d.brand.id === "applekidswatch" && !d.matched, "unknown vercel host falls back to AU flagship");
const p = resolveBrandFromHost("applewat.ch:443");
ok(p.brand.id === "applewat" && p.matched, "host with port resolves");

console.log("\n=== cross-brand leakage ===");
for (const b of BRANDS) {
  const trv = catalogueFor(b).filter(p => p.sku.startsWith("TRV"));
  ok(b.id === "travelwat" ? trv.length > 0 : trv.length === 0,
     `travel-only SKUs ${b.id === "travelwat" ? "present on" : "absent from"} ${b.id} (${trv.length})`);
}
ok(catalogueFor(BRANDS[3]).some(p=>p.sku.startsWith("TRV")), "travelwat has the travel range");

console.log(fail === 0 ? "\nALL CHECKS PASSED" : `\n${fail} CHECK(S) FAILED`);
process.exit(fail === 0 ? 0 : 1);
