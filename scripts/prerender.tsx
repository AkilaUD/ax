/**
 * Static prerender.
 *
 * Runs after `vite build` (see the `postbuild` script) and writes real HTML for
 * every route in the manifest, so a crawler, a link preview bot, or a visitor
 * with JavaScript disabled receives content rather than an empty <div id="root">.
 *
 * How it is built: this file is compiled by Vite in SSR mode first
 * (`vite build --ssr`), which means TSX, path aliases and `import.meta.env` all
 * behave exactly as they do in the browser bundle. Running it through bare Node
 * with type-stripping would not resolve the alias or the env object.
 *
 * What is written:
 *   dist/<route>/index.html   every route except home
 *   dist/index.html           home, replaced in place
 *   dist/404.html             the wildcard route, for Vercel/static hosts
 *   dist/robots.txt
 *   dist/sitemap.xml
 *
 * Deliberate constraints:
 *  - The prerendered markup is what React would render on the server with
 *    `data-motion="reduced"`, so nothing here depends on animation state.
 *  - The 3D hero is behind `React.lazy`, so the static HTML contains the static
 *    Axleta axis SVG only. No canvas, no WebGL, no device sniffing at build time.
 *  - Hydration is the browser's job. The output is ordinary React output: same
 *    tree, no markers that would break `hydrateRoot`.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { MotionConfig } from 'motion/react';

import { site } from '../src/data/site';
import {
  breadcrumbJsonLd,
  headTagsFor,
  organizationJsonLd,
  pageMeta,
  webSiteJsonLd,
  type JsonLd,
  type PageMeta,
} from '../src/lib/seo';

import { PageShell, PageTransition } from '../src/App';
import HomePage from '../src/pages/HomePage';
import AboutPage from '../src/pages/AboutPage';
import SolutionsPage from '../src/pages/SolutionsPage';
import ServicesPage from '../src/pages/ServicesPage';
import InsightsPage from '../src/pages/InsightsPage';
import ContactPage from '../src/pages/ContactPage';
import GoogleWorkspacePage from '../src/pages/GoogleWorkspacePage';
import LegalPage from '../src/pages/LegalPage';
import NotFoundPage from '../src/pages/NotFoundPage';

/** A page inside the same transition wrapper the app mounts. */
const page = (element: ReturnType<typeof createElement>) =>
  createElement(PageTransition, null, element);

type RouteSpec = {
  path: string;
  meta: PageMeta;
  trail?: { name: string; path: string }[];
  jsonLd?: JsonLd[];
  render: () => ReturnType<typeof createElement>;
};

const T = (name: string, path: string) => ({ name, path });

function buildRoutes(): RouteSpec[] {
  const contactOrg: JsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Axleta',
    url: site.url + pageMeta.contact.path,
  };

  const workspace: JsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Google Workspace',
    description:
      'The Google productivity suite — Gmail, Drive, Docs, Sheets, Slides, Meet and Calendar — introduced and sold by Axleta as a Google Cloud Partner.',
    brand: { '@type': 'Brand', name: 'Google' },
    category: 'Productivity software',
    url: site.url + pageMeta.googleWorkspace.path,
  };

  return [
    {
      path: '/',
      meta: pageMeta.home,
      render: () => page(createElement(HomePage)),
    },
    {
      path: '/about',
      meta: pageMeta.about,
      trail: [T('Home', '/'), T('About', '/about')],
      render: () => page(createElement(AboutPage)),
    },
    {
      path: '/solutions',
      meta: pageMeta.solutions,
      trail: [T('Home', '/'), T('Solutions', '/solutions')],
      render: () => page(createElement(SolutionsPage)),
    },
    {
      path: '/services',
      meta: pageMeta.services,
      trail: [T('Home', '/'), T('Services', '/services')],
      render: () => page(createElement(ServicesPage)),
    },
    {
      path: '/insights',
      meta: pageMeta.insights,
      trail: [T('Home', '/'), T('Insights', '/insights')],
      render: () => page(createElement(InsightsPage)),
    },
    {
      path: '/contact',
      meta: pageMeta.contact,
      trail: [T('Home', '/'), T('Contact', '/contact')],
      jsonLd: [contactOrg],
      render: () => page(createElement(ContactPage)),
    },
    {
      path: '/google-workspace',
      meta: pageMeta.googleWorkspace,
      trail: [T('Home', '/'), T('Google Workspace', '/google-workspace')],
      jsonLd: [workspace],
      render: () => page(createElement(GoogleWorkspacePage)),
    },
    {
      path: '/terms',
      meta: pageMeta.terms,
      trail: [T('Home', '/'), T('Terms & conditions', '/terms')],
      render: () => page(createElement(LegalPage, { kind: 'terms' })),
    },
    {
      path: '/privacy',
      meta: pageMeta.privacy,
      trail: [T('Home', '/'), T('Privacy policy', '/privacy')],
      render: () => page(createElement(LegalPage, { kind: 'privacy' })),
    },
    {
      path: '/404',
      meta: pageMeta.notFound,
      render: () => page(createElement(NotFoundPage)),
    },
  ];
}

/**
 * Motion writes its `initial` styles into the server-rendered markup, which
 * parks every reveal at opacity 0 in the static HTML. That is invisible to a
 * crawler reading text but wrong for anyone without JavaScript, and wrong for
 * anyone reading the file over a slow connection.
 *
 * Rather than change the animation components, the prerender output is
 * normalised to each element's resting state. The list is deliberately
 * exhaustive over the exact style strings our components can emit, and
 * `assertNoHiddenContent` fails the build if anything is left over — so if a
 * reveal offset changes in motion.ts or Reveal.tsx, the build complains instead
 * of silently shipping hidden content.
 */
const RESTING_STYLES: [pattern: RegExp, resting: string][] = [
  // Reveal: opacity 0 with the 22px rise.
  [/style="opacity:0;transform:translateY\(22px\)"/g, 'style="opacity:1;transform:none"'],
  // Reveal rule: the hairline drawn left-to-right.
  [/style="transform:scaleX\(0\)"/g, 'style="transform:scaleX(1)"'],
  // SplitHeadline: words parked below their mask.
  [/style="opacity:0;transform:translateY\(110%\)"/g, 'style="opacity:1;transform:none"'],
];

function toRestingState(markup: string): string {
  let out = markup;
  for (const [pattern, resting] of RESTING_STYLES) out = out.replace(pattern, resting);
  return out;
}

/**
 * Returns the leftover hidden-state styles, so the caller can fail the build.
 *
 * Only *fully* hidden values count. `opacity:0.6` is a legitimate resting state
 * for diagram strokes, so the pattern requires opacity to be exactly zero —
 * followed by `;` or the end of the attribute — rather than any `opacity:0`
 * prefix.
 */
function assertNoHiddenContent(markup: string, path: string): void {
  const leftover =
    /style="[^"]*(?:opacity:0(?:;|")|scaleX\(0\)|translateY\(110%\))[^"]*"/.exec(markup);
  if (leftover) {
    console.error(
      `[prerender] ${path}: Motion initial state survived normalisation: ${leftover[0]}`,
    );
    process.exitCode = 1;
  }
}

/**
 * Strips the head tags Vite left in the built index.html and replaces them with
 * the per-route set from headTagsFor(). Tag removal is by explicit pattern
 * rather than a blanket regex, so an unrelated future tag is never swallowed.
 *
 * Two details matter and both have bitten real prerenders:
 *
 *  - The patterns tolerate newlines inside a tag. `index.html` is hand-formatted
 *    with one attribute per line, so `<meta name="description" ...>` never
 *    appears literally — matching a single space would silently leave the base
 *    copy in place and ship two description tags.
 *  - The new tags are appended at the end of <head>, never injected after the
 *    opening tag. `<meta charset>` is only honoured in the first 1024 bytes of
 *    the document, and a 15-tag block inserted at the top of <head> pushed the
 *    charset declaration past that limit, leaving the encoding to chance.
 */
function replaceHead(html: string, headTags: string, rootMarkup: string): string {
  let out = html;

  // Everything Vite emitted that we are about to replace.
  out = out
    .replace(/<title>[\s\S]*?<\/title>\s*/i, '')
    .replace(/<meta\s+name="description"[^>]*>\s*/i, '')
    .replace(/<meta\s+name="robots"[^>]*>\s*/i, '')
    .replace(/<meta\s+name="twitter:[a-z:]*"[^>]*>\s*/gi, '')
    .replace(/<meta\s+property="og:[a-z:_]*"[^>]*>\s*/gi, '')
    .replace(/<link\s+rel="canonical"[^>]*>\s*/i, '')
    .replace(/<script\s+type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>\s*/gi, '');

  // Append the replacement set at the end of <head>, so the document-level
  // metas keep their place at the front.
  out = out.replace(/<\/head>/i, `  ${headTags}\n  </head>`);

  // Swap the empty root for the rendered page.
  out = out.replace(
    /<div id="root"><\/div>/,
    `<div id="root" data-prerendered="true">${rootMarkup}`,
  );

  // Prerendered output ships in the reduced-motion state, which is also the
  // correct no-JS default.
  out = out.replace('data-motion="full"', 'data-motion="reduced"');

  return out;
}

function renderPage(route: RouteSpec, shellHtml: string): string {
  const nodes: JsonLd[] = [organizationJsonLd(), webSiteJsonLd()];
  if (route.trail && route.trail.length > 1) nodes.push(breadcrumbJsonLd(route.trail));
  if (route.jsonLd) nodes.push(...route.jsonLd);

  const headTags = headTagsFor(route.meta, nodes);

  // `reducedMotion: "always"` stops Motion animating anything during the
  // server render; `toRestingState` below then unwinds the `initial` styles it
  // still writes out.
  //
  // The tree is the app's own shell — PageShell carries the header, main
  // landmark and footer, PageTransition the route wrapper — so the static
  // document is the page a visitor would see, not a fragment of it.
  const markup = renderToString(
    createElement(
      StaticRouter,
      { location: route.path },
      createElement(
        MotionConfig,
        { reducedMotion: 'always' },
        createElement(PageShell, null, route.render()),
      ),
    ),
  );

  const resting = toRestingState(markup);
  assertNoHiddenContent(resting, route.path);

  return replaceHead(shellHtml, headTags, resting);
}

function writeFile(path: string, contents: string): void {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, contents, 'utf8');
}

function sitemap(routes: RouteSpec[], lastmod: string): string {
  const urls = routes
    .filter((route) => !route.meta.noIndex)
    .map((route) => {
      const loc = route.path === '/' ? `${site.url}/` : `${site.url}${route.path}`;
      const priority = route.path === '/' ? '1.0' : route.path.split('/').length > 2 ? '0.6' : '0.8';
      return [
        '  <url>',
        `    <loc>${loc}</loc>`,
        `    <lastmod>${lastmod}</lastmod>`,
        `    <changefreq>monthly</changefreq>`,
        `    <priority>${priority}</priority>`,
        '  </url>',
      ].join('\n');
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

function robots(): string {
  return [
    'User-agent: *',
    'Allow: /',
    '',
    '# Utility page — reachable but never indexed.',
    'Disallow: /404',
    '',
    'Sitemap: ' + site.url + '/sitemap.xml',
    '',
  ].join('\n');
}

/* ------------------------------------------------------------------ */

const here = dirname(fileURLToPath(import.meta.url));
// Compiled output lives in .prerender/, the site in dist/ — one level apart.
const dist = join(here, '..', 'dist');
const shellPath = join(dist, 'index.html');

function readShell(): string {
  let html: string;
  try {
    html = readFileSync(shellPath, 'utf8');
  } catch {
    console.error('[prerender] dist/index.html not found — run `vite build` first.');
    process.exit(1);
  }

  if (!html.includes('<div id="root"></div>')) {
    console.error('[prerender] dist/index.html has no empty #root to fill.');
    process.exit(1);
  }

  return html;
}

const shellHtml = readShell();
const routes = buildRoutes();
const lastmod = new Date().toISOString().slice(0, 10);

let written = 0;
for (const route of routes) {
  const html = renderPage(route, shellHtml);

  if (route.path === '/404') {
    // Static hosts (including Vercel) look for /404.html at the root.
    writeFile(join(dist, '404.html'), html);
  } else {
    writeFile(
      route.path === '/' ? shellPath : join(dist, route.path.slice(1), 'index.html'),
      html,
    );
  }
  written += 1;
  console.log(`[prerender] ${route.path.padEnd(18)} -> ${route.meta.title}`);
}

writeFile(join(dist, 'sitemap.xml'), sitemap(routes, lastmod));
writeFile(join(dist, 'robots.txt'), robots());

console.log(`[prerender] ${written} documents, sitemap.xml and robots.txt written to dist/.`);