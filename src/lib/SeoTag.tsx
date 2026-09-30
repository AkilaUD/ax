import { useEffect } from 'react';
import {
  applyJsonLd,
  applySeo,
  breadcrumbJsonLd,
  organizationJsonLd,
  webSiteJsonLd,
  type JsonLd,
  type PageMeta,
} from './seo';

type SeoProps = {
  meta: PageMeta;
  /** In-page breadcrumb, used to emit BreadcrumbList structured data. */
  trail?: { name: string; path: string }[];
  /** Extra structured data nodes for this route. */
  jsonLd?: JsonLd[];
};

/**
 * Declarative wrapper over the imperative SEO helpers.
 *
 * Deliberately client-side rather than using a head-management library: the
 * tag set is small and fixed, and this keeps ~10 kB out of the bundle. The
 * prerender step writes the same tags statically (see ./seo.ts).
 */
export function Seo({ meta, trail, jsonLd }: SeoProps) {
  useEffect(() => {
    applySeo(meta);

    const nodes: JsonLd[] = [organizationJsonLd(), webSiteJsonLd()];
    if (trail && trail.length > 1) nodes.push(breadcrumbJsonLd(trail));
    if (jsonLd) nodes.push(...jsonLd);

    applyJsonLd(nodes);
  }, [meta, trail, jsonLd]);

  return null;
}

/**
 * Alias matching the file name, so `import { SeoTag as Seo }` reads clearly at
 * the call site without re-introducing a `Seo.tsx` / `seo.ts` casing collision.
 */
export { Seo as SeoTag };
