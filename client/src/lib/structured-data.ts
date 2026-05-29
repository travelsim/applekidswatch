interface BreadcrumbItem {
  name: string;
  path: string;
}

/**
 * Generate a BreadcrumbList JSON-LD script block.
 * Pass the breadcrumb trail from root to current page.
 */
export function breadcrumbList(items: BreadcrumbItem[]): string {
  const siteUrl = window.location.origin;
  const itemListElement = items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": `${siteUrl}${item.path}`,
  }));

  const ld = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": itemListElement,
  };

  return JSON.stringify(ld);
}

interface FaqItem {
  question: string;
  answer: string;
}

/**
 * Generate an FAQPage JSON-LD script block.
 * Pass an array of { question, answer } pairs.
 */
export function faqPage(items: FaqItem[]): string {
  const mainEntity = items.map((item) => ({
    "@type": "Question",
    "name": item.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": item.answer,
    },
  }));

  const ld = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": mainEntity,
  };

  return JSON.stringify(ld);
}
