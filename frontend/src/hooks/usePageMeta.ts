import { useEffect } from "react";

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  const el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (el) {
    el.setAttribute("content", content);
    return;
  }
  const meta = document.createElement("meta");
  meta.setAttribute(attr, key);
  meta.setAttribute("content", content);
  document.head.appendChild(meta);
}

function upsertCanonical(href: string) {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (link) {
    link.setAttribute("href", href);
    return;
  }
  link = document.createElement("link");
  link.rel = "canonical";
  link.href = href;
  document.head.appendChild(link);
}

/**
 * Sets the document title, meta description, Open Graph tags
 * (og:title / og:description / og:image / og:url) and the canonical link
 * for the current route.
 *
 * The canonical is derived from the current pathname, so renamed routes
 * (e.g. renamed package slugs that redirect client-side) always declare
 * their final, canonical URL — search engines never index the
 * intermediate path.
 * Pass `image` as an absolute URL for best sharing behaviour.
 */
export function usePageMeta(title: string, description?: string, image?: string) {
  useEffect(() => {
    document.title = title;
    const canonical = new URL(window.location.pathname, window.location.origin).href;
    upsertCanonical(canonical);
    upsertMeta("property", "og:url", canonical);
    if (description) {
      upsertMeta("name", "description", description);
      upsertMeta("property", "og:description", description);
    }
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:site_name", "Ocean Resort – Bali");
    upsertMeta("property", "og:type", "website");
    if (image) {
      // Relative asset paths become absolute so social platforms can fetch them.
      const abs = image.startsWith("http") ? image : new URL(image, window.location.origin).href;
      upsertMeta("property", "og:image", abs);
    }
  }, [title, description, image]);
}
