import express, { type Express } from "express";
import fs from "node:fs";
import path from "node:path";
import { resolveBrandFromHost, APPLE_NON_AFFILIATION } from "@shared/brands";

const OG_IMAGE = "/images/apple_watch_midnight.png";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Rewrite the SEO block of the built index.html for the requesting brand.
 *
 * The four brands share one codebase and one deployment, so the only
 * trustworthy way to keep canonicals from leaking across domains is to
 * render them from the Host header on the server. Doing it here rather than
 * in the client also means a crawler sees the correct tags.
 */
function renderIndexHtml(template: string, host: string | undefined): string {
  const { brand } = resolveBrandFromHost(host);
  const origin = `https://${brand.domain}`;
  const contactEmail = `hello@${brand.domain}`;
  const canonical = `${origin}/`;

  const orgLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${origin}/#organization`,
    name: brand.name,
    url: origin,
    logo: `${origin}/favicon.png`,
    description: brand.metaDescription,
    email: contactEmail,
    areaServed: brand.shipsTo.map((m) => ({ "@type": "Place", name: m })),
    slogan: brand.tagline,
  };

  const siteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: brand.name,
    url: origin,
    inLanguage: brand.locale,
  };

  const head = [
    `<title>${escapeHtml(brand.metaTitle)}</title>`,
    `<meta name="description" content="${escapeHtml(brand.metaDescription)}" />`,
    `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${escapeHtml(brand.name)}" />`,
    `<meta property="og:title" content="${escapeHtml(brand.metaTitle)}" />`,
    `<meta property="og:description" content="${escapeHtml(brand.metaDescription)}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:image" content="${origin}${OG_IMAGE}" />`,
    `<meta property="og:locale" content="${escapeHtml(brand.locale.replace("-", "_"))}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(brand.metaTitle)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(brand.metaDescription)}" />`,
    `<meta name="twitter:image" content="${origin}${OG_IMAGE}" />`,
    `<script type="application/ld+json">${JSON.stringify(orgLd)}</script>`,
    `<script type="application/ld+json">${JSON.stringify(siteLd)}</script>`,
    // Compliance notice in the served HTML, not only in the React tree.
    `<meta name="apple-disclaimer" content="${escapeHtml(APPLE_NON_AFFILIATION)}" />`,
  ].join("\n    ");

  // The placeholder is the single <!--BRAND_SEO--> comment plus the
  // explanatory comment that follows it, up to the closing -->.
  const placeholder = /<!--BRAND_SEO-->[\s\S]*?-->/;
  if (!placeholder.test(template)) {
    console.error(
      "index.html is missing the BRAND_SEO placeholder; brand-specific SEO will not render"
    );
    return template;
  }
  return template.replace(
    placeholder,
    `<!--BRAND_SEO-->\n    ${head}\n    <!--/BRAND_SEO-->`
  );
}

export function serveStatic(app: Express) {
  const distPath = path.resolve(process.cwd(), "dist", "public");
  const indexPath = path.resolve(distPath, "index.html");
  const indexExists = fs.existsSync(indexPath);
  const template = indexExists ? fs.readFileSync(indexPath, "utf8") : null;

  if (!indexExists) {
    // On Vercel the function bundle does not include dist/public, because
    // hashed assets are served by the CDN before any rewrite reaches us.
    // Falling through with a clear error beats res.sendFile on a missing
    // file, which would surface as an opaque 500.
    console.error("dist/public/index.html not found; static HTML serving disabled");
    app.use("*", (_req, res) => {
      res.status(404).type("text/plain").send("Not found");
    });
    return;
  }

  // index:false is required. With the default, express.static serves
  // index.html for "/" itself, and the brand-rendered wildcard below would
  // never run, leaving every domain with the unrendered placeholder.
  app.use(express.static(distPath, { index: false }));

  // Fall through to a brand-rendered index.html.
  app.use("*", (req, res) => {
    if (!template) {
      res.sendFile(indexPath);
      return;
    }
    const host =
      (req.headers["x-forwarded-host"] as string | undefined) ||
      req.headers.host ||
      undefined;
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    // Vary so a cache never serves one brand's tags to another domain.
    res.setHeader("Vary", "Host");
    res.setHeader("Cache-Control", "no-cache");
    res.send(renderIndexHtml(template, host));
  });
}