/**
 * Insights presentation layer.
 *
 * The data itself is generated at build time from the public Axleta blog feed
 * (see scripts/fetch-insights.ts) and committed, so builds never depend on the
 * blog being reachable at build time.
 *
 * The existing editorial archive is preserved by linking out to
 * blog.axleta.com — no post body is scraped or republished here.
 */

import { insights as feedInsights, type Insight } from './insights.generated';

export type { Insight };

export const insights: readonly Insight[] = feedInsights;

export const BLOG_URL = 'https://blog.axleta.com/';

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const;

export function formatInsightDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  return `${date.getUTCDate()} ${MONTHS[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
}

export function formatInsightDateTime(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  return date.toISOString().slice(0, 10);
}

const byNewest = (a: Insight, b: Insight) => Date.parse(b.date) - Date.parse(a.date);

export const sortedInsights: readonly Insight[] = [...insights].sort(byNewest);

/** One featured article plus two supporting articles — never a card grid. */
export function selectInsights(count = 3): { featured: Insight; supporting: Insight[] } | null {
  const [featured, ...rest] = sortedInsights;
  if (!featured) return null;
  return { featured, supporting: rest.slice(0, Math.max(0, count - 1)) };
}

export const insightCategories: readonly string[] = Array.from(
  new Set(sortedInsights.map((entry) => entry.category)),
).sort();
