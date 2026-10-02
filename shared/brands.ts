// Four-brand portfolio definitions and host-based brand resolution.
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

export const DEFAULT_BRAND_ID = "applekidswatch";

const BY_DOMAIN = new Map(BRANDS.map((b) => [b.domain, b]));
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
