import { useEffect } from "react";

interface SeoOptions {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
}

function setOrCreateMeta(attr: string, value: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${value}"]`);
  if (!el) {
    el = document.createElement("meta");
    if (attr === "property") {
      el.setAttribute("property", value);
    } else {
      el.setAttribute("name", value);
    }
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href: string) {
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    document.head.appendChild(link);
  }
  link.href = href;
}

export function useSeo({ title, description, canonical, ogImage }: SeoOptions) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;

    setOrCreateMeta("name", "description", description);

    setOrCreateMeta("property", "og:title", title);
    setOrCreateMeta("property", "og:description", description);

    setOrCreateMeta("name", "twitter:title", title);
    setOrCreateMeta("name", "twitter:description", description);

    const pageUrl = canonical || window.location.href;
    setOrCreateMeta("property", "og:url", pageUrl);
    setCanonical(pageUrl);

    if (ogImage) {
      setOrCreateMeta("property", "og:image", ogImage);
      setOrCreateMeta("name", "twitter:image", ogImage);
    }

    return () => {
      document.title = prevTitle;
    };
  }, [title, description, canonical, ogImage]);
}
