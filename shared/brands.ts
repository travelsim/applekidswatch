// Portfolio brand definitions and host-based brand resolution.
// One codebase, one deployment: the requesting Host selects the brand.

export type Currency = "AUD" | "EUR" | "GBP" | "USD";
/** Display-only currency. Prices are stored in the brand base currency. */
export type DisplayCurrency = Currency | "CHF";

/**
 * Static indicative display rates, used only to show a second currency to
 * a visitor. The brand's base currency is always the price that is charged.
 * Blocker B6: these are not live FX rates and are not used for invoicing.
 */
export const DISPLAY_RATES_FROM_EUR: Record<DisplayCurrency, number> = {
  EUR: 1,
  GBP: 0.86,
  CHF: 0.94,
  AUD: 1.63,
  USD: 1.08,
};

export const CURRENCY_SYMBOLS: Record<DisplayCurrency, string> = {
  AUD: "A$",
  EUR: "\u20AC",
  GBP: "\u00A3",
  USD: "US$",
  CHF: "CHF\u00A0",
};

export interface BrandDefinition {
  id: string;
  domain: string;
  name: string;
  tagline: string;
  market: "AU" | "EU" | "GLOBAL" | "TRAVEL";
  currency: Currency;
  locale: string;
  audience: string;
  heroHeadline: string;
  heroSub: string;
  metaTitle: string;
  metaDescription: string;
  /** Currency switcher shown in the header. */
  displayCurrencies: DisplayCurrency[];
  /** VAT-inclusive price display (EU consumer pricing). */
  vatInclusive: boolean;
  /** Shipping destination markets offered by this brand. */
  shipsTo: string[];
  /**
   * Support address shown in the footer. Defaults to hello@<domain>; set it
   * when the host has no mail records so enquiries cannot bounce.
   */
  supportEmail?: string;
}

export const APPLE_NON_AFFILIATION =
  "Specialist in refurbished Apple® devices. Not affiliated with, endorsed by, or sponsored by Apple Inc. Apple® and Apple Watch are trademarks of Apple Inc.";

export const HOME_COUNTRY_CLAUSE =
  "This plan works in its home market only. It does not roam across borders. A UK plan does not connect in France. To travel, purchase a plan for your destination.";

export const REFURB_DISCLOSURE =
  "Refurbished, not new. Grade A shows minimal signs of use; Grade B shows light cosmetic wear. Every watch is tested, cleaned and battery-health checked before dispatch.";

export const BRANDS: BrandDefinition[] = [
  {
    id: "applekidswatch",
    domain: "applekidswatch.com",
    name: "Apple Kids Watch",
    tagline: "Keep their phone in their pocket.",
    market: "AU",
    currency: "AUD",
    locale: "en-AU",
    audience:
      "Australian parents of 6-12 year olds on Optus, Vodafone, Boost, Belong, Aldi and Amaysim who want their child reachable without adding another telco contract.",
    heroHeadline: "Keep your phone plan. Give your kid an Apple Watch from A$8.25/month.",
    heroSub:
      "A refurbished, kid-armoured Apple Watch with a standalone eSIM plan. No Telstra contract. No social media, no open browser.",
    metaTitle: "Kids' Apple Watch + Standalone eSIM Plan | Apple Kids Watch Australia",
    metaDescription:
      "Refurbished Apple Watch for kids with a standalone BetterRoaming eSIM plan. Works on any Australian carrier. From A$8.25/month. No Telstra contract, no social media.",
    displayCurrencies: ["AUD"],
    vatInclusive: false,
    shipsTo: ["Australia"],
  },
  {
    id: "applekidswat",
    domain: "applekidswat.ch",
    name: "Apple Kids Watch Europe",
    tagline: "The phone before the phone - anywhere in Europe.",
    market: "EU",
    currency: "EUR",
    locale: "en-GB",
    audience:
      "UK and European parents looking for a first watch for a 6-12 year old, priced locally in EUR or GBP with VAT-inclusive pricing.",
    heroHeadline: "The phone before the phone - anywhere in Europe.",
    heroSub:
      "Refurbished Apple Watch kits and UK/EU market watch plans. Local currency pricing, VAT included. Ships to the UK, the EU and Switzerland.",
    metaTitle: "Kids' Apple Watch + eSIM Plan Europe | Apple Kids Watch Europe",
    metaDescription:
      "Refurbished Apple Watch kits for kids with UK and EU watch plans. EUR pricing with VAT included, GBP display available. Ships UK, EU and Switzerland.",
    displayCurrencies: ["EUR", "GBP", "CHF"],
    vatInclusive: true,
    shipsTo: ["United Kingdom", "European Union", "Switzerland"],
  },
  {
    id: "applewat",
    domain: "applewat.ch",
    name: "Apple Watch Standalone",
    tagline: "An Apple Watch that works without your telco.",
    market: "GLOBAL",
    currency: "EUR",
    locale: "en-IE",
    audience:
      "Parents and adults who want an Apple Watch on a standalone plan with no telco contract, plus the accessories and protection range.",
    heroHeadline: "An Apple Watch that works without your telco.",
    heroSub:
      "Refurbished cellular Apple Watches, standalone watch plans and the full accessory and protection range. No phone contract, no carrier lock.",
    metaTitle: "Apple Watch on a Standalone Plan - No Telco Contract | Apple Watch Standalone",
    metaDescription:
      "Refurbished cellular Apple Watches on standalone BetterRoaming plans, plus bands, bumpers, screen protectors and care plans. No telco contract required.",
    displayCurrencies: ["EUR", "GBP", "CHF"],
    vatInclusive: true,
    shipsTo: ["European Union", "United Kingdom", "Switzerland", "United States", "Australia"],
  },
  {
    id: "travelwat",
    domain: "travelwat.ch",
    name: "Travel Wat",
    tagline: "Leave the expensive phone in the hotel safe.",
    market: "TRAVEL",
    currency: "EUR",
    locale: "en-GB",
    audience:
      "Inbound travellers, backpackers, festival-goers and business travellers who want maps, Apple Pay and emergency calls without handing a phone to strangers.",
    heroHeadline: "Leave the expensive phone in the hotel safe.",
    heroSub:
      "Refurbished cellular Apple Watches for maps, Apple Pay and emergency calls, plus local and 160-country phone eSIMs.",
    metaTitle: "Travel Watch Kit + Phone eSIM | Travel Wat",
    metaDescription:
      "Refurbished cellular Apple Watches for travel plus phone eSIMs covering 160+ countries. Maps, Apple Pay and emergency calls without carrying your main phone.",
    displayCurrencies: ["EUR", "GBP", "CHF", "AUD", "USD"],
    vatInclusive: true,
    shipsTo: ["Worldwide"],
  },
];

/**
 * The Apple pillar of the Kids Watch storefront, served at apple.kidswat.ch.
 *
 * It keeps the AU commercial definition, catalogue and plan set of the
 * applekidswatch brand (same id, so product and order lookups are unchanged)
 * but trades under the Kids Watch name and its own hostname. Without this,
 * an unrecognised host falls back to the legacy "Apple Kids Watch" definition,
 * which puts the wrong brand in the header, footer copyright, page titles and
 * canonical URL.
 */
const AU_APPLE_BRAND = BRANDS.find(
  (b) => b.id === "applekidswatch"
) as BrandDefinition;

export const KIDS_WATCH_APPLE_BRAND: BrandDefinition = {
  ...AU_APPLE_BRAND,
  domain: "apple.kidswat.ch",
  name: "Kids Watch",
  metaTitle: "Kids' Apple Watch + Standalone Plan | Kids Watch",
  // The subdomain has no MX, so hello@apple.kidswat.ch would bounce.
  supportEmail: "hello@kidswat.ch",
};

/**
 * Neutral umbrella for kidswat.ch — the broad, stealth-conscious front door.
 * Presents Apple Watch alongside Spacetalk as equal, independent options
 * without asserting a partnership with Apple or Spacetalk and without
 * listing unlaunched plans or pricing. Keeps the AU catalogue id so
 * product/order lookups are unchanged.
 */
export const KIDS_WATCH_PARENT_BRAND: BrandDefinition = {
  ...AU_APPLE_BRAND,
  domain: "kidswat.ch",
  name: "Kids Watch",
  tagline: "A first phone that's only a watch.",
  audience:
    "Parents of 6-12 year olds choosing between refurbished Apple Watch and dedicated kids watches including Spacetalk, Garmin, Pixbee, imoo and Safe Owl.",
  heroHeadline: "Kids smartwatches, without the phone.",
  heroSub:
    "Compare Apple, Spacetalk, Garmin, Pixbee, imoo and Safe Owl side-by-side. GPS, calling and safety features, no telco contract.",
  metaTitle: "Kids Smartwatches | Kids Watch",
  metaDescription:
    "A parent-focused kids smartwatch shop, with an Apple Watch range and other models as they are verified.",
  supportEmail: "hello@kidswat.ch",
};

/**
 * Spacetalk pillar at spacetalk.kidswat.ch — Spacetalk alongside Apple,
 * independent-comparison only. No partnership claim, no unlaunched-plan
 * pricing. Reuses the AU catalogue id for the same reason as the Apple pillar.
 */
export const KIDS_WATCH_SPACETALK_BRAND: BrandDefinition = {
  ...AU_APPLE_BRAND,
  domain: "spacetalk.kidswat.ch",
  name: "Kids Watch",
  tagline: "Spacetalk, alongside Apple Watch.",
  audience:
    "Parents of 6-12 year olds evaluating the Spacetalk Adventurer family alongside the refurbished Apple Watch alternative.",
  heroHeadline: "Spacetalk kids watch, plus the Apple Watch alternative.",
  heroSub:
    "The dedicated Spacetalk view, with the refurbished Apple Watch range shown for comparison. Independent comparison only.",
  metaTitle: "Spacetalk Kids Watch | Kids Watch",
  metaDescription:
    "Independent Spacetalk Adventurer comparison with refurbished Apple Watch kits for kids. No telco contract.",
  supportEmail: "hello@kidswat.ch",
};

/**
 * Garmin pillar — independent comparison only. No partnership or affiliation
 * claim, no stock or pricing claim without a source. Reuses AU catalogue id.
 */
export const KIDS_WATCH_GARMIN_BRAND: BrandDefinition = {
  ...AU_APPLE_BRAND,
  domain: "garmin.kidswat.ch",
  name: "Kids Watch",
  tagline: "Garmin, alongside Apple and Spacetalk.",
  audience:
    "Parents evaluating the Garmin wearable range for kids alongside Apple Watch and Spacetalk options.",
  heroHeadline: "Garmin wearable alongside the kids-watch options.",
  heroSub:
    "Garmin wearables shown alongside Apple Watch, Spacetalk and other kids-watch options for independent comparison.",
  metaTitle: "Garmin Kids Comparison | Kids Watch",
  metaDescription:
    "Independent Garmin comparison alongside refurbished Apple Watch and dedicated kids watches. Kids Watch, kidswat.ch.",
  supportEmail: "hello@kidswat.ch",
};

/**
 * Pixbee pillar — independent comparison only. No partnership claim.
 */
export const KIDS_WATCH_PIXBEE_BRAND: BrandDefinition = {
  ...AU_APPLE_BRAND,
  domain: "pixbee.kidswat.ch",
  name: "Kids Watch",
  tagline: "Pixbee, alongside Apple and Spacetalk.",
  audience:
    "Parents evaluating the Pixbee kids watch alongside Apple Watch, Spacetalk and other options.",
  heroHeadline: "Pixbee kids watch alongside the other options.",
  heroSub:
    "The dedicated Pixbee view, with Apple Watch, Spacetalk and other kids-watch options shown for independent comparison.",
  metaTitle: "Pixbee Kids Watch | Kids Watch",
  metaDescription:
    "Independent Pixbee comparison with refurbished Apple Watch and other kids watches. Kids Watch, kidswat.ch.",
  supportEmail: "hello@kidswat.ch",
};

/**
 * imoo pillar — independent comparison only.
 */
export const KIDS_WATCH_IMOO_BRAND: BrandDefinition = {
  ...AU_APPLE_BRAND,
  domain: "imoo.kidswat.ch",
  name: "Kids Watch",
  tagline: "imoo, alongside Apple and Spacetalk.",
  audience:
    "Parents evaluating the imoo kids watch alongside Apple Watch, Spacetalk and other options.",
  heroHeadline: "imoo kids watch alongside the other options.",
  heroSub:
    "The dedicated imoo view, with the other kids-watch ranges shown for independent comparison.",
  metaTitle: "imoo Kids Watch | Kids Watch",
  metaDescription:
    "Independent imoo comparison with refurbished Apple Watch and other kids watches. Kids Watch, kidswat.ch.",
  supportEmail: "hello@kidswat.ch",
};

/**
 * Safe Owl pillar — independent comparison only. If Safe Owl cannot be
 * represented without an unsourced claim, this entry remains neutral and
 * generic until a sourced product fact is available.
 */
export const KIDS_WATCH_SAFE_OWL_BRAND: BrandDefinition = {
  ...AU_APPLE_BRAND,
  domain: "safeowl.kidswat.ch",
  name: "Kids Watch",
  tagline: "Safe Owl, alongside the other options.",
  audience:
    "Parents evaluating Safe Owl and other kids-watch options on equal footing.",
  heroHeadline: "Safe Owl alongside the kids-watch options.",
  heroSub:
    "Safe Owl shown alongside Apple Watch, Spacetalk and other options for independent comparison.",
  metaTitle: "Safe Owl Comparison | Kids Watch",
  metaDescription:
    "Independent Safe Owl comparison alongside refurbished Apple Watch and other kids watches. Kids Watch, kidswat.ch.",
  supportEmail: "hello@kidswat.ch",
};

export const DEFAULT_BRAND_ID = "applekidswatch";

const BY_DOMAIN = new Map(BRANDS.map((b) => [b.domain, b]));
BY_DOMAIN.set("apple.kidswat.ch", KIDS_WATCH_APPLE_BRAND);
BY_DOMAIN.set("kidswat.ch", KIDS_WATCH_PARENT_BRAND);
BY_DOMAIN.set("spacetalk.kidswat.ch", KIDS_WATCH_SPACETALK_BRAND);
BY_DOMAIN.set("garmin.kidswat.ch", KIDS_WATCH_GARMIN_BRAND);
BY_DOMAIN.set("pixbee.kidswat.ch", KIDS_WATCH_PIXBEE_BRAND);
BY_DOMAIN.set("imoo.kidswat.ch", KIDS_WATCH_IMOO_BRAND);
BY_DOMAIN.set("safeowl.kidswat.ch", KIDS_WATCH_SAFE_OWL_BRAND);
const BY_ID = new Map(BRANDS.map((b) => [b.id, b]));

export function getBrandById(id: string): BrandDefinition | undefined {
  return BY_ID.get(id);
}

/**
 * Resolve the brand for a request. Strips any port and a leading "www.",
 * then matches a brand domain. Unrecognised hosts (the raw *.vercel.app
 * domain, localhost) fall back to the AU flagship brand.
 */
export function resolveBrandFromHost(hostHeader?: string | null): {
  brand: BrandDefinition;
  matched: boolean;
} {
  if (!hostHeader) return { brand: brandOrDefault(), matched: false };
  const host = hostHeader.split(",")[0].trim().toLowerCase().split(":")[0];
  const normalised = host.replace(/^www\./, "");
  const match = BY_DOMAIN.get(normalised);
  if (match) return { brand: match, matched: true };
  return { brand: brandOrDefault(), matched: false };
}

export function brandOrDefault(): BrandDefinition {
  return BY_DOMAIN.get("applekidswatch.com") as BrandDefinition;
}
