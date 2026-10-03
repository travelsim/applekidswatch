import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useLocation } from "wouter";
import {
  APPLE_NON_AFFILIATION,
  CURRENCY_SYMBOLS,
  DISPLAY_RATES_FROM_EUR,
  resolveBrandFromHost,
  type DisplayCurrency,
  type BrandDefinition,
} from "@shared/brands";

interface BrandContextValue {
  brand: BrandDefinition;
  /** Currency currently used to render prices. */
  currency: DisplayCurrency;
  setCurrency: (c: DisplayCurrency) => void;
  /** Convert a brand base-currency amount into the active display currency. */
  convert: (amountInBaseCurrency: number) => number;
  /** Format a brand base-currency amount, e.g. "A$269". */
  formatPrice: (amountInBaseCurrency: number) => string;
  complianceNote: string;
}

const BrandContext = createContext<BrandContextValue | null>(null);

const CURRENCY_STORAGE_KEY = "akw.displayCurrency";

export function BrandProvider({ children }: { children: ReactNode }) {
  const brand = useMemo(
    () => resolveBrandFromHost(window.location.hostname).brand,
    []
  );

  useBrandSeo(brand);

  const [currency, setCurrencyState] = useState<DisplayCurrency>(() => {
    // The base currency is the price actually charged. Any other currency is
    // an indicative display conversion, so it always starts on the base.
    return brand.currency;
  });

  const setCurrency = useCallback(
    (next: DisplayCurrency) => {
      if (!brand.displayCurrencies.includes(next)) return;
      setCurrencyState(next);
      try {
        window.localStorage.setItem(CURRENCY_STORAGE_KEY, next);
      } catch {
        // Storage can be unavailable in private mode; the price still renders.
      }
    },
    [brand.displayCurrencies]
  );

  // Restore a previously chosen display currency, but only if this brand
  // actually offers it.
  useMemo(() => {
    try {
      const saved = window.localStorage.getItem(CURRENCY_STORAGE_KEY) as
        | DisplayCurrency
        | null;
      if (saved && brand.displayCurrencies.includes(saved)) setCurrencyState(saved);
    } catch {
      // Ignore: fall back to the base currency.
    }
  }, [brand.displayCurrencies]);

  const value = useMemo<BrandContextValue>(() => {
    // All rates are expressed relative to EUR, so cross-convert through EUR.
    const baseRate = DISPLAY_RATES_FROM_EUR[brand.currency];
    const convert = (amount: number) =>
      Math.round((amount / baseRate) * DISPLAY_RATES_FROM_EUR[currency]);

    const formatPrice = (amount: number) => {
      const symbol = CURRENCY_SYMBOLS[currency];
      const converted = convert(amount);
      // Whole-unit prices read better than cents on a store.
      return Number.isInteger(converted)
        ? `${symbol}${converted}`
        : `${symbol}${converted.toFixed(2)}`;
    };

    return {
      brand,
      currency,
      setCurrency,
      convert,
      formatPrice,
      complianceNote: APPLE_NON_AFFILIATION,
    };
  }, [brand, currency, setCurrency]);

  return <BrandContext.Provider value={value}>{children}</BrandContext.Provider>;
}

function setOrCreateMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(
    `meta[${attr}="${key}"]`
  );
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/**
 * Point every brand-sensitive tag at the requesting host's own domain.
 *
 * The four brands are served from one built HTML file, so the only safe way
 * to keep a canonical from naming a sibling domain is to derive every URL
 * from the host we are actually on. Driven by location because the SPA
 * client-side routes without a document load.
 */
function useBrandSeo(brand: BrandDefinition) {
  const [location] = useLocation();

  useEffect(() => {
    const origin = `https://${brand.domain}`;
    const title = brand.metaTitle;
    const description = brand.metaDescription;

    document.title = title;

    let canonical = document.head.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]'
    );
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    // Always the apex: a canonical on www would be a redirect hop the
    // crawler has to spend, and the apex is what we serve.
    canonical.href = `${origin}/`;

    setOrCreateMeta("name", "description", description);
    setOrCreateMeta("property", "og:site_name", brand.name);
    setOrCreateMeta("property", "og:title", title);
    setOrCreateMeta("property", "og:description", description);
    setOrCreateMeta("property", "og:url", `${origin}/`);
    setOrCreateMeta("property", "og:locale", brand.locale.replace("-", "_"));
    setOrCreateMeta("name", "twitter:title", title);
    setOrCreateMeta("name", "twitter:description", description);
    setOrCreateMeta("name", "apple-disclaimer", APPLE_NON_AFFILIATION);
  }, [brand, location]);
}

export function useBrand(): BrandContextValue {
  const ctx = useContext(BrandContext);
  if (!ctx) throw new Error("useBrand must be used inside BrandProvider");
  return ctx;
}