// Launch catalogue for all four brands, built literally from
// FOUR-SITE-CATALOGUE-SPEC.md section 4.
//
// Prices are integers in the brand's own base currency (AUD / EUR / GBP).
// `compareAtPrice` is the new-hardware reference, not a discount claim.
// `inStock` is launch-catalogue availability, not a live stock count
// (blocker B3: real inventory is unknown).

import {
  APPLE_NON_AFFILIATION,
  HOME_COUNTRY_CLAUSE,
  REFURB_DISCLOSURE,
  type BrandDefinition,
} from "./brands";

export type PlanType = "hardware" | "plan" | "accessory" | "warranty";

export interface CatalogueProduct {
  sku: string;
  name: string;
  description: string;
  price: number;
  compareAtPrice: number;
  grade: string;
  color: string;
  caseSpec: string;
  image: string;
  features: string[];
  inStock: boolean;
  category: string;
  planType: PlanType;
  planTerm: "monthly" | "annual" | null;
  market: string | null;
  badge: string | null;
  sortOrder: number;
}

const HARDWARE_FEATURES = [
  "GPS + Cellular connectivity - works without the paired phone nearby",
  "Water resistant to 50 metres",
  "Apple Watch Family Setup ready",
  "Emergency SOS",
  "Fall detection",
  "Find My location sharing",
  "Schooltime lockdown window",
  "No social media apps, no open web browser",
  "Battery health 85% or better, guaranteed",
  "12-month standalone watch plan included",
];

const KIT_TAIL = ` ${REFURB_DISCLOSURE} ${APPLE_NON_AFFILIATION}`;

interface KitDef {
  sku: string;
  name: string;
  grade: string;
  color: string;
  caseSpec: string;
  image: string;
  /** price in the brand's base currency */
  price: number;
  compareAtPrice: number;
  badge?: string;
}

const KIT_DEFS: KitDef[] = [
  {
    sku: "AKW-SE2-A",
    name: "Refurbished Apple Watch SE (2nd Gen) 40mm Cellular - Kids Kit",
    grade: "A",
    color: "Midnight",
    caseSpec: "40mm / Sport Loop",
    image: "/images/apple_watch_midnight.png",
    price: 269,
    compareAtPrice: 429,
    badge: "Best seller",
  },
  {
    sku: "AKW-SE2-B",
    name: "Refurbished Apple Watch SE (2nd Gen) 40mm Cellular - Kids Kit",
    grade: "B",
    color: "Starlight",
    caseSpec: "40mm / Sport Loop",
    image: "/images/apple_watch_starlight.png",
    price: 239,
    compareAtPrice: 429,
  },
  {
    sku: "AKW-SE1-B",
    name: "Refurbished Apple Watch SE (1st Gen) 40mm Cellular - Kids Kit",
    grade: "B",
    color: "Silver",
    caseSpec: "40mm / Sport Loop",
    image: "/images/apple_watch_silver.png",
    price: 219,
    compareAtPrice: 379,
  },
  {
    sku: "AKW-S6-A",
    name: "Refurbished Apple Watch Series 6 44mm Cellular - Kids Kit",
    grade: "A",
    color: "Space Grey",
    caseSpec: "44mm / Sport Loop",
    image: "/images/apple_watch_space_gray.png",
    price: 349,
    compareAtPrice: 599,
    badge: "Top spec",
  },
  {
    sku: "AKW-SE2-PINK-A",
    name: "Refurbished Apple Watch SE (2nd Gen) 40mm Cellular - Kids Kit, Sport Loop Edition",
    grade: "A",
    color: "Pink",
    caseSpec: "40mm / Sport Loop",
    image: "/images/apple_watch_pink.png",
    price: 279,
    compareAtPrice: 429,
  },
  {
    sku: "AKW-S4-A",
    name: "Refurbished Apple Watch Series 4 44mm Cellular - Kids Kit",
    grade: "A",
    color: "Blue",
    caseSpec: "44mm / Sport Loop",
    image: "/images/apple_watch_blue.png",
    price: 299,
    compareAtPrice: 529,
  },
];

interface PlanDef {
  sku: string;
  name: string;
  market: string;
  price: number;
  planTerm: "monthly" | "annual";
  badge?: string;
}

const PLAN_DEFS: PlanDef[] = [
  { sku: "AKW-PLAN-AU-ANNUAL", name: "BetterRoaming Kids Plan - Annual (Australia)", market: "AU", price: 99, planTerm: "annual", badge: "Best value" },
  { sku: "AKW-PLAN-AU-MONTHLY", name: "BetterRoaming Kids Plan - Monthly (Australia)", market: "AU", price: 12, planTerm: "monthly" },
  { sku: "AKW-PLAN-UK-ANNUAL", name: "BetterRoaming Kids Plan - Annual (United Kingdom)", market: "UK", price: 69, planTerm: "annual", badge: "Best value" },
  { sku: "AKW-PLAN-UK-MONTHLY", name: "BetterRoaming Kids Plan - Monthly (United Kingdom)", market: "UK", price: 8, planTerm: "monthly" },
  { sku: "AKW-PLAN-EU-ANNUAL", name: "BetterRoaming Kids Plan - Annual (Europe: FR/DE/NL/PL/ES)", market: "EU", price: 69, planTerm: "annual", badge: "Best value" },
  { sku: "AKW-PLAN-EU-MONTHLY", name: "BetterRoaming Kids Plan - Monthly (Europe)", market: "EU", price: 8, planTerm: "monthly" },
];

interface AccessoryDef {
  sku: string;
  name: string;
  price: number;
  planType: PlanType;
  description: string;
  image: string;
  badge?: string;
}

const ACCESSORY_DEFS: AccessoryDef[] = [
  {
    sku: "AKW-BAND-2PK",
    name: "Spare Kid Sport Loop - 2 pack",
    price: 35,
    planType: "accessory",
    description:
      "Two replacement velcro sport loops sized for a small wrist. Washable, and the easy swap means a wet or lost band never stops the watch working.",
    image: "/images/apple_watch_activity.png",
  },
  {
    sku: "AKW-BUMPER-KID",
    name: "Rugged Bumper Case (kid fit)",
    price: 25,
    planType: "accessory",
    description:
      "Raised-edge silicone bumper sized for the 40mm case. Takes the edge off drops onto concrete, which is where most kids' watches actually break.",
    image: "/images/apple_watch_safety.png",
  },
  {
    sku: "AKW-SCREEN-3PK",
    name: "Tempered Glass Screen Protector - 3 pack",
    price: 39,
    planType: "accessory",
    description:
      "Three tempered glass protectors with an alignment tray. A cracked screen is the most common reason a kids' watch is returned, and this prevents most of them.",
    image: "/images/apple_watch_gps_feature.png",
  },
  {
    sku: "AKW-CHARGE-1",
    name: "Magnetic Charging Cable",
    price: 22,
    planType: "accessory",
    description:
      "Replacement magnetic charging cable. Keep one at home and one in the school bag so a forgotten cable never becomes a dead watch by lunchtime.",
    image: "/images/apple_watch_cellular.png",
  },
  {
    sku: "AKW-GUARD-12",
    name: "Playground Damage Replacement Guarantee - 12 months",
    price: 35,
    planType: "warranty",
    description:
      "One replacement watch within 12 months for accidental damage in normal use. Excludes cosmetic wear, liquid damage beyond the 50 metre rating, and loss or theft. An unclear guarantee is the top refund driver in this category, so the exclusions are stated here rather than buried.",
    image: "/images/apple_watch_safety.png",
  },
  {
    sku: "AKW-CARE-36",
    name: "3-Year Care Plan",
    price: 79,
    planType: "warranty",
    description:
      "Three years of accidental damage cover with a 24-month replacement term. Excludes cosmetic wear, liquid damage beyond the 50 metre rating, and loss or theft. Does not cover battery wear below the 85% health floor we guarantee at dispatch.",
    image: "/images/apple_watch_safety.png",
  },
];

const TRAVEL_ONLY: AccessoryDef[] = [
  {
    sku: "TRV-PLAN-5G-1M",
    name: "Phone eSIM - 5 GB / 30 days, 160+ countries",
    price: 19,
    planType: "plan",
    description:
      "Data eSIM for the paired iPhone, valid across 160+ countries for 30 days. It shares data to the watch over Bluetooth, which is how you get watch data while travelling without a home-country watch plan.",
    image: "/images/apple_watch_cellular.png",
  },
  {
    sku: "TRV-PLAN-10G-1M",
    name: "Phone eSIM - 10 GB / 30 days, 160+ countries",
    price: 29,
    planType: "plan",
    description:
      "Data eSIM for the paired iPhone, valid across 160+ countries for 30 days. It shares data to the watch over Bluetooth, which is how you get watch data while travelling without a home-country watch plan.",
    image: "/images/apple_watch_cellular.png",
  },
  {
    sku: "TRV-PLAN-UNL-5D",
    name: "Phone eSIM - Unlimited / 5 days, 160+ countries",
    price: 34,
    planType: "plan",
    description:
      "Unlimited data eSIM for the paired iPhone, valid across 160+ countries for 5 days. It shares data to the watch over Bluetooth, which is how you get watch data while travelling without a home-country watch plan.",
    image: "/images/apple_watch_cellular.png",
  },
  {
    sku: "TRV-HOLSTER",
    name: "Rugged Travel Watch Band with Secure Loop",
    price: 29,
    planType: "accessory",
    description:
      "Anti-theft travel band with a locking secondary loop, so the watch comes off only when you decide it does. Sized to sit tight under a sleeve.",
    image: "/images/apple_watch_activity.png",
  },
];

const TRAVEL_WATCH_PLANS: PlanDef[] = [
  { sku: "TRV-PLAN-US-M", name: "Travel Watch Plan - Monthly (United States)", market: "US", price: 11, planTerm: "monthly" },
  { sku: "TRV-PLAN-AU-M", name: "Travel Watch Plan - Monthly (Australia)", market: "AU", price: 12, planTerm: "monthly" },
];

const KIT_FEATURES = (k: KitDef) => [
  ...HARDWARE_FEATURES,
  `Case size ${k.caseSpec.split(" / ")[0]}`,
  `Kid velcro sport loop included (${k.color})`,
  "Rugged bumper case included",
  "Magnetic charging cable included",
  "Printed quickstart card included",
];

function kitDescription(k: KitDef): string {
  return `${k.caseSpec.split(" / ")[0]} refurbished cellular Apple Watch, supplied as a complete kids kit: watch, bumper case, kid velcro sport loop, magnetic charging cable and a printed quickstart card. ${KIT_TAIL}`;
}

const MARKET_NAMES: Record<string, string> = {
  AU: "Australia",
  UK: "the United Kingdom",
  EU: "France, Germany, the Netherlands, Poland or Spain",
  US: "the United States",
};

function planDescription(p: PlanDef): string {
  return `Standalone watch connectivity for a Family Setup Apple Watch, valid in ${MARKET_NAMES[p.market] ?? p.market}. No telco contract needed - your existing mobile carrier is irrelevant. ${HOME_COUNTRY_CLAUSE} ${APPLE_NON_AFFILIATION}`;
}

// Base-currency price for a kit in each brand (spec section 4.1).
const KIT_PRICE_OVERRIDES: Record<string, Partial<Record<string, number>>> = {
  "applekidswatch": {
    "AKW-SE2-A": 269, "AKW-SE2-B": 239, "AKW-SE1-B": 219,
    "AKW-S6-A": 349, "AKW-SE2-PINK-A": 279, "AKW-S4-A": 299,
  },
  applekidswat: {
    "AKW-SE2-A": 209, "AKW-SE2-B": 179, "AKW-SE1-B": 159,
    "AKW-S6-A": 259, "AKW-SE2-PINK-A": 209, "AKW-S4-A": 219,
  },
  applewat: {
    "AKW-SE2-A": 229, "AKW-SE2-B": 209, "AKW-SE1-B": 189,
    "AKW-S6-A": 299, "AKW-SE2-PINK-A": 249, "AKW-S4-A": 269,
  },
  travelwat: {
    "AKW-SE2-A": 229, "AKW-SE2-B": 209, "AKW-SE1-B": 189,
    "AKW-S6-A": 299, "AKW-SE2-PINK-A": 249, "AKW-S4-A": 269,
  },
};

const ACCESSORY_PRICE_OVERRIDES: Record<string, Partial<Record<string, number>>> = {
  applekidswatch: {
    "AKW-BAND-2PK": 39, "AKW-BUMPER-KID": 29, "AKW-SCREEN-3PK": 45,
    "AKW-CHARGE-1": 25, "AKW-GUARD-12": 39, "AKW-CARE-36": 89,
  },
  applekidswat: {
    "AKW-BAND-2PK": 35, "AKW-BUMPER-KID": 25, "AKW-SCREEN-3PK": 39,
    "AKW-CHARGE-1": 22, "AKW-GUARD-12": 35, "AKW-CARE-36": 79,
  },
  applewat: {
    "AKW-BAND-2PK": 35, "AKW-BUMPER-KID": 25, "AKW-SCREEN-3PK": 39,
    "AKW-CHARGE-1": 22, "AKW-GUARD-12": 35, "AKW-CARE-36": 79,
  },
  travelwat: {
    "AKW-BAND-2PK": 35, "AKW-BUMPER-KID": 25, "AKW-SCREEN-3PK": 39,
    "AKW-CHARGE-1": 22, "AKW-GUARD-12": 35, "AKW-CARE-36": 79,
  },
};

/** Plan markets offered by each brand. Never includes Switzerland. */
const BRAND_MARKETS: Record<string, string[]> = {
  applekidswatch: ["AU"],
  applekidswat: ["UK", "EU"],
  applewat: ["UK", "EU"],
  travelwat: ["UK", "EU", "US", "AU"],
};

export function catalogueFor(brand: BrandDefinition): CatalogueProduct[] {
  const out: CatalogueProduct[] = [];
  const kitPrices = KIT_PRICE_OVERRIDES[brand.id] ?? {};
  const accPrices = ACCESSORY_PRICE_OVERRIDES[brand.id] ?? {};
  const markets = BRAND_MARKETS[brand.id] ?? ["AU"];
  let order = 0;

  for (const k of KIT_DEFS) {
    out.push({
      sku: k.sku,
      name: k.name,
      description: kitDescription(k),
      price: kitPrices[k.sku] ?? k.price,
      compareAtPrice: k.compareAtPrice,
      grade: k.grade,
      color: k.color,
      caseSpec: k.caseSpec,
      image: k.image,
      features: KIT_FEATURES(k),
      inStock: true,
      category: "Kids watch kits",
      planType: "hardware",
      planTerm: null,
      market: markets[0],
      badge: k.badge ?? null,
      sortOrder: order++,
    });
  }

  for (const p of PLAN_DEFS) {
    if (!markets.includes(p.market)) continue;
    out.push({
      sku: p.sku,
      name: p.name,
      description: planDescription(p),
      price: p.price,
      compareAtPrice: 0,
      grade: "N/A",
      color: "N/A",
      caseSpec: "Standalone watch plan",
      image: "/images/apple_watch_cellular.png",
      features: [
        "No telco contract required - any mobile carrier works",
        "Approved for Apple Watch Family Setup",
        HOME_COUNTRY_CLAUSE,
      ],
      inStock: true,
      category: "Connectivity plans",
      planType: "plan",
      planTerm: p.planTerm,
      market: p.market,
      badge: p.badge ?? null,
      sortOrder: order++,
    });
  }

  for (const a of ACCESSORY_DEFS) {
    out.push({
      sku: a.sku,
      name: a.name,
      description: `${a.description} ${APPLE_NON_AFFILIATION}`,
      price: accPrices[a.sku] ?? a.price,
      compareAtPrice: 0,
      grade: "N/A",
      color: "N/A",
      caseSpec: a.planType === "warranty" ? "Protection" : "Accessory",
      image: a.image,
      features: [a.planType === "warranty" ? "Exclusions stated in full above" : "Compatible with the 40mm and 44mm cases"],
      inStock: true,
      category: a.planType === "warranty" ? "Protection" : "Accessories",
      planType: a.planType,
      planTerm: null,
      market: null,
      badge: a.badge ?? null,
      sortOrder: order++,
    });
  }

  if (brand.id === "travelwat") {
    for (const p of TRAVEL_WATCH_PLANS) {
      out.push({
        sku: p.sku,
        name: p.name,
        description: planDescription(p),
        price: p.price,
        compareAtPrice: 0,
        grade: "N/A",
        color: "N/A",
        caseSpec: "Standalone watch plan",
        image: "/images/apple_watch_cellular.png",
        features: [
          "Activate this in your destination country, not at home",
          "A phone eSIM on the paired iPhone shares data to the watch over Bluetooth",
          HOME_COUNTRY_CLAUSE,
        ],
        inStock: true,
        category: "Connectivity plans",
        planType: "plan",
        planTerm: p.planTerm,
        market: p.market,
        badge: null,
        sortOrder: order++,
      });
    }
    for (const t of TRAVEL_ONLY) {
      out.push({
        sku: t.sku,
        name: t.name,
        description: `${t.description} ${APPLE_NON_AFFILIATION}`,
        price: t.price,
        compareAtPrice: 0,
        grade: "N/A",
        color: "N/A",
        caseSpec: t.planType === "plan" ? "Phone eSIM" : "Accessory",
        image: t.image,
        features: ["Covers 160+ countries", "Data shared to the watch over Bluetooth from the paired iPhone"],
        inStock: true,
        category: t.planType === "plan" ? "Phone eSIMs" : "Travel accessories",
        planType: t.planType,
        planTerm: t.planType === "plan" ? "monthly" : null,
        market: null,
        badge: null,
        sortOrder: order++,
      });
    }
  }

  return out;
}
