/* global URL, console, process */

import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = dirname(fileURLToPath(new URL('../package.json', import.meta.url)));
const dist = join(root, 'dist');

const routes = [
  { path: '/', file: 'index.html' },
  { path: '/about', file: 'about/index.html' },
  { path: '/solutions', file: 'solutions/index.html' },
  { path: '/services', file: 'services/index.html' },
  { path: '/insights', file: 'insights/index.html' },
  { path: '/contact', file: 'contact/index.html' },
  { path: '/google-workspace', file: 'google-workspace/index.html' },
  { path: '/terms', file: 'terms/index.html' },
  { path: '/privacy', file: 'privacy/index.html' },
  { path: '/404', file: '404.html' },
];

const failures = [];

function assert(condition, message) {
  if (!condition) failures.push(message);
}

const documents = new Map();
for (const route of routes) {
  const file = join(dist, route.file);
  assert(existsSync(file), `${route.path}: missing ${route.file}`);
  if (!existsSync(file)) continue;

  const html = readFileSync(file, 'utf8');
  documents.set(route.path, html);
  assert(html.includes('<main'), `${route.path}: missing main landmark`);
  assert(/<h[1-6][^>]*>/i.test(html), `${route.path}: missing heading`);
  assert(/<nav\b/i.test(html), `${route.path}: missing navigation landmark`);
  assert(/<link[^>]+rel=["']canonical["']/i.test(html), `${route.path}: missing canonical link`);
  assert(!html.includes('href="undefined"'), `${route.path}: contains undefined href`);
  assert(!html.includes('src="undefined"'), `${route.path}: contains undefined src`);
}

const solutions = documents.get('/solutions') ?? '';
for (const anchor of ['#erp', '#applications', '#infrastructure', '#automation']) {
  assert(solutions.includes(`id="${anchor.slice(1)}"`), `/solutions: missing ${anchor}`);
}

const services = documents.get('/services') ?? '';
for (const anchor of ['#discover', '#design', '#implement', '#improve']) {
  assert(services.includes(`id="${anchor.slice(1)}"`), `/services: missing ${anchor}`);
}
assert(solutions.includes('data-solutions-atlas'), '/solutions: missing system-layer atlas');
assert(solutions.includes('data-diagram-fallback'), '/solutions: missing diagram fallback');
assert(services.includes('data-services-process'), '/services: missing continuous process rail');
assert(services.includes('data-diagram-fallback'), '/services: missing diagram fallback');

const about = documents.get('/about') ?? '';
const insights = documents.get('/insights') ?? '';
const contact = documents.get('/contact') ?? '';
const workspace = documents.get('/google-workspace') ?? '';
const terms = documents.get('/terms') ?? '';
const privacy = documents.get('/privacy') ?? '';
const notFound = documents.get('/404') ?? '';
assert(about.includes('data-editorial-manifesto'), '/about: missing editorial manifesto');
assert(insights.includes('data-insights-index'), '/insights: missing editorial index');
assert(contact.includes('data-contact-endpoint'), '/contact: missing contact endpoint');
assert(workspace.includes('data-collaboration-system'), '/google-workspace: missing collaboration system');
assert(terms.includes('data-legal-surface="terms"'), '/terms: missing legal surface');
assert(privacy.includes('data-legal-surface="privacy"'), '/privacy: missing legal surface');
assert(notFound.includes('data-error-surface'), '/404: missing error surface');
assert(contact.includes('info@axleta.com'), '/contact: missing email');
assert(contact.includes('wa.me/94710956655'), '/contact: missing WhatsApp link');
assert(insights.includes('blog.axleta.com'), '/insights: missing blog link');
assert(workspace.includes('referworkspace.app.goo.gl'), '/google-workspace: missing referral link');
assert(about.includes('sap.com/partners/partner-edge.html'), '/about: missing SAP PartnerEdge link');
assert(about.includes('cloud.google.com'), '/about: missing Google Cloud link');

const homepage = documents.get('/') ?? '';
assert(homepage.includes('data-diagram-fallback'), '/: missing accessible diagram fallback');
assert(
  /<(section|div)[^>]+(?:aria-label|aria-labelledby)=/i.test(homepage),
  '/: missing labelled diagram region',
);
assert(homepage.includes('data-motion-mode="adaptive"'), '/: missing reduced-motion marker');
assert(homepage.includes('data-system-field'), '/: missing system field');
assert(homepage.includes('data-webgl-fallback'), '/: missing WebGL fallback marker');
for (const label of ['ERP', 'APPLICATIONS', 'INFRASTRUCTURE', 'AUTOMATION']) {
  assert(homepage.includes(label), `/: missing hero system label ${label}`);
}
assert(homepage.includes('href="/contact"'), '/: missing header/contact CTA');
for (const marker of [
  'data-connected-practices',
  'data-erp-spine',
  'data-companion-network',
  'data-infrastructure-stack',
  'data-automation-flow',
  'data-unified-stack',
  'data-engagement-rail',
  'data-principles',
  'data-ecosystem',
  'data-insights',
]) {
  assert(homepage.includes(marker), `/: missing ${marker}`);
}

if (failures.length > 0) {
  console.error(`Site verification failed with ${failures.length} issue(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log(`Site verification passed for ${routes.length} prerendered routes.`);
}
