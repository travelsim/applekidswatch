// Watch bands listed on /bands. Every entry links to the manufacturer's own
// product page and is priced "Price TBC": no price or stock claim is made here.
// Sourced 2026-11-13 from the manufacturer pages listed in each `source`.

export interface WatchBand {
  sku: string;
  name: string;
  brand: string;
  forWatch: string;
  material: string;
  fit: string;
  description: string;
  source: string;
  image: string;
  imageAlt: string;
}

export const WATCH_BANDS: WatchBand[] = [
  {
    sku: "BAND-APPLE-SPORT-LOOP",
    name: "Apple Sport Loop",
    brand: "Apple",
    forWatch: "Apple Watch",
    material: "Woven nylon with hook-and-loop closure",
    fit: "38-42mm and 44-49mm cases",
    description: "Woven nylon band with a hook-and-loop closure, so a small wrist can fasten it without help.",
    source: "https://www.apple.com/au/shop/watch/bands/sport-loop",
    image: "/images/band-apple-sport-loop.jpg",
    imageAlt: "Apple Sport Loop band in olive",
  },
  {
    sku: "BAND-APPLE-SOLO-LOOP",
    name: "Apple Solo Loop",
    brand: "Apple",
    forWatch: "Apple Watch Series 4 or later, SE and Ultra",
    material: "Stretch silicone",
    fit: "Single piece with no clasp, stretches to fit",
    description: "Stretch silicone band with no clasp or buckle. Compatible with Series 4 or later, SE and Ultra only.",
    source: "https://www.apple.com/au/shop/watch/bands/solo-loop",
    image: "/images/band-apple-solo-loop.jpg",
    imageAlt: "Apple Solo Loop band in burgundy",
  },
  {
    sku: "BAND-APPLE-SPORT-BAND",
    name: "Apple Sport Band",
    brand: "Apple",
    forWatch: "Apple Watch",
    material: "Fluoroelastomer",
    fit: "Pin-and-tuck closure, adjustable",
    description: "Fluoroelastomer band that fastens with a pin-and-tuck closure.",
    source: "https://www.apple.com/au/shop/watch/bands/sport-band",
    image: "/images/band-apple-sport-band.jpg",
    imageAlt: "Apple Sport Band",
  },
  {
    sku: "BAND-SPACETALK-LOOP-STRAP",
    name: "Spacetalk Adventurer 2 & Loop Band Strap",
    brand: "Spacetalk (third-party strap)",
    forWatch: "Spacetalk Adventurer 2 and Spacetalk Loop only",
    material: "Not stated in the source listing",
    fit: "Fits Adventurer 2 and Loop only",
    description: "Replacement strap for the Spacetalk Adventurer 2 and Spacetalk Loop. Not compatible with other watches.",
    source: "https://spacetalk.co/en-nz/products/spacetalk-adventurer-2-loop-band-strap",
    image: "/images/band-spacetalk-loop-strap.png",
    imageAlt: "Spacetalk Adventurer 2 loop band strap",
  },
];