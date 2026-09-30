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

const homepage = documents.get('/') ?? '';
assert(homepage.includes('data-diagram-fallback'), '/: missing accessible diagram fallback');
assert(
  /<(section|div)[^>]+(?:aria-label|aria-labelledby)=/i.test(homepage),
  '/: missing labelled diagram region',
);
assert(homepage.includes('data-motion-mode="adaptive"'), '/: missing reduced-motion marker');

if (failures.length > 0) {
  console.error(`Site verification failed with ${failures.length} issue(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log(`Site verification passed for ${routes.length} prerendered routes.`);
}
