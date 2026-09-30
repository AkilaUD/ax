/**
 * SEO metadata.
 *
 * `pageMeta` is a plain data registry so the same definitions can be applied
 * imperatively in the browser and serialised into static HTML by the
 * prerender script. `Seo` is a thin React wrapper that does the browser part.
 *
 * No ratings, review counts, awards, tax identifiers or social profiles are
 * emitted, because none are verified (§31).
 */

import { site, contact, routes, external } from '../data/site';
import { isBrowser } from './utils';

export type PageMeta = {
  /**
   * Final document title, written by hand per route.
   *
   * Deliberately not templated with `site.titleTemplate`: the registry holds
   * complete titles because several of them already carry the brand ("About
   * Axleta — …") and a template would produce "About Axleta — … — Axleta".
   */
  title: string;
  description: string;
  /** Absolute path, e.g. '/about'. */
  path: string;
  ogType?: 'website' | 'article';
  /** Suppress indexing for utility routes. */
  noIndex?: boolean;
};

const homeDescription =
  'Axleta designs, implements and supports the systems behind SME operations — SAP Business One and S/4HANA Public Cloud, companion applications, infrastructure, automation and remote access.';

export const pageMeta: Record<string, PageMeta> = {
  home: {
    title: 'Axleta — Technology and Advancement for SME operations',
    description: homeDescription,
    path: routes.home,
  },
  about: {
    title: 'About Axleta — a technology companion for business',
    description:
      'Founded in 2018, Axleta is an IT service firm supplying technology-driven systems and solutions for SMEs. Our vision, mission, values and technology ecosystem.',
    path: routes.about,
  },
  solutions: {
    title: 'Solutions — ERP, companion applications, infrastructure and automation',
    description:
      'SAP Business One and SAP S/4HANA Public Cloud, custom add-ons and companion applications, private cloud and infrastructure, security, virtualisation, and process automation.',
    path: routes.solutions,
  },
  services: {
    title: 'Services — ERP consultancy, development and project management',
    description:
      'Requirement analysis, ERP consultancy, strategic consultancy, customised add-on development, project management and flexible resource allocation.',
    path: routes.services,
  },
  insights: {
    title: 'Insights — notes on ERP, infrastructure and IT from the Axleta blog',
    description:
      'Technical and business writing from the Axleta blog on ERP, SAP Business One, Google Workspace, infrastructure and everyday IT.',
    path: routes.insights,
  },
  contact: {
    title: 'Contact Axleta — discuss your requirements',
    description:
      'Tell Axleta what you are trying to improve. Consultation on ERP, business applications, infrastructure, automation and technology planning.',
    path: routes.contact,
  },
  googleWorkspace: {
    title: 'Google Workspace — productivity for collaborating teams',
    description:
      'Axleta is a Google Cloud Partner for Google Cloud Platform and the Google productivity suite. Google Workspace for teams that need to collaborate, iterate and ship together.',
    path: routes.googleWorkspace,
  },
  terms: {
    title: 'Terms and conditions',
    description: 'The terms governing use of the Axleta website and the services Axleta provides.',
    path: routes.terms,
  },
  privacy: {
    title: 'Privacy policy',
    description: 'How Axleta collects, uses, protects and shares personal information.',
    path: routes.privacy,
  },
  notFound: {
    title: 'Page not found',
    description: 'That route is not on the map. Here is where everything else lives.',
    path: '/404',
    noIndex: true,
  },
};

export const metaFor = (key: keyof typeof pageMeta): PageMeta => pageMeta[key];

/* ------------------------------------------------------------------ */
/* Structured data                                                     */
/* ------------------------------------------------------------------ */

export type JsonLd = Record<string, unknown>;

export function organizationJsonLd(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    url: site.url,
    description: homeDescription,
    foundingDate: String(site.founded),
    email: contact.email,
    logo: `${site.url}${site.ogImage}`,
    image: `${site.url}${site.ogImage}`,
    slogan: site.tagline,
    address: {
      '@type': 'PostalAddress',
      streetAddress: contact.address.street,
      addressLocality: contact.address.locality,
      addressRegion: contact.address.region,
      postalCode: contact.address.postalCode,
      addressCountry: contact.address.countryCode,
    },
    areaServed: [contact.coverage],
    knowsAbout: [
      'SAP Business One',
      'SAP S/4HANA Public Cloud',
      'ERP',
      'IT infrastructure',
      'Process automation',
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: contact.email,
        url: `${site.url}${routes.contact}`,
        areaServed: contact.coverage,
        availableLanguage: 'en',
      },
    ],
  };
}

export function webSiteJsonLd(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.name,
    url: site.url,
    inLanguage: site.locale,
    description: homeDescription,
  };
}

export function breadcrumbJsonLd(trail: { name: string; path: string }[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}

/* ------------------------------------------------------------------ */
/* Application                                                         */
/* ------------------------------------------------------------------ */

const MANAGED_ATTR = 'data-seo-managed';

function upsertMeta(selector: string, attrs: Record<string, string>): HTMLMetaElement {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(MANAGED_ATTR, '');
    document.head.append(el);
  }
  for (const [key, value] of Object.entries(attrs)) el.setAttribute(key, value);
  return el;
}

function upsertLink(rel: string, href: string): HTMLLinkElement {
  const selector = `link[rel="${rel}"]`;
  let el = document.head.querySelector<HTMLLinkElement>(selector);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    el.setAttribute(MANAGED_ATTR, '');
    document.head.append(el);
  }
  el.setAttribute('href', href);
  return el;
}

/**
 * Applies metadata imperatively. Tags this function created carry
 * `data-seo-managed` so a route change never leaves stale tags behind.
 */
export function applySeo(meta: PageMeta): void {
  if (!isBrowser) return;

  const url = `${site.url}${meta.path}`;
  const fullTitle = meta.title;

  document.title = fullTitle;

  upsertMeta('meta[name="description"]', { name: 'description', content: meta.description });
  upsertMeta('meta[name="robots"]', {
    name: 'robots',
    content: meta.noIndex ? 'noindex, follow' : 'index, follow, max-image-preview:large',
  });
  upsertLink('canonical', url);

  upsertMeta('meta[property="og:title"]', { property: 'og:title', content: fullTitle });
  upsertMeta('meta[property="og:description"]', {
    property: 'og:description',
    content: meta.description,
  });
  upsertMeta('meta[property="og:url"]', { property: 'og:url', content: url });
  upsertMeta('meta[property="og:image"]', {
    property: 'og:image',
    content: `${site.url}${site.ogImage}`,
  });
  upsertMeta('meta[property="og:type"]', {
    property: 'og:type',
    content: meta.ogType ?? 'website',
  });

  upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
  upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: fullTitle });
  upsertMeta('meta[name="twitter:description"]', {
    name: 'twitter:description',
    content: meta.description,
  });
  upsertMeta('meta[name="twitter:image"]', {
    name: 'twitter:image',
    content: `${site.url}${site.ogImage}`,
  });
}

export function applyJsonLd(nodes: JsonLd[]): void {
  if (!isBrowser) return;
  document.head
    .querySelectorAll(`script[${MANAGED_ATTR}]`)
    .forEach((node) => node.remove());
  for (const node of nodes) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute(MANAGED_ATTR, '');
    script.textContent = JSON.stringify(node);
    document.head.append(script);
  }
}

/**
 * Serialises the same tags into an HTML string, for the prerender step.
 * Kept deliberately in sync with `applySeo` — both read the same registry.
 */
export function headTagsFor(meta: PageMeta, jsonLd: JsonLd[] = []): string {
  const url = `${site.url}${meta.path}`;
  const fullTitle = meta.title;
  const image = `${site.url}${site.ogImage}`;

  const tags: string[] = [
    `<title>${escapeHtml(fullTitle)}</title>`,
    `<meta name="description" content="${escapeAttr(meta.description)}" />`,
    `<meta name="robots" content="${
      meta.noIndex ? 'noindex, follow' : 'index, follow, max-image-preview:large'
    }" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:title" content="${escapeAttr(fullTitle)}" />`,
    `<meta property="og:description" content="${escapeAttr(meta.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:type" content="${meta.ogType ?? 'website'}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:site_name" content="${site.name}" />`,
    `<meta property="og:locale" content="${site.locale}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeAttr(fullTitle)}" />`,
    `<meta name="twitter:description" content="${escapeAttr(meta.description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
  ];

  for (const node of jsonLd) {
    // `data-seo-managed` is the marker `applyJsonLd` owns: on hydration the
    // client removes these and re-emits its own set, so a document never ends
    // up with two Organization nodes. Without it the prerendered copy would
    // sit beside the runtime copy and structured data would be duplicated.
    tags.push(
      `<script type="application/ld+json" ${MANAGED_ATTR}>${JSON.stringify(node).replace(
        /</g,
        '\\u003c',
      )}</script>`,
    );
  }

  return tags.join('\n    ');
}

function escapeHtml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function escapeAttr(value: string): string {
  return escapeHtml(value).replace(/"/g, '&quot;');
}

export { external };
