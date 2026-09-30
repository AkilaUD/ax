/**
 * /insights.
 *
 * A reading index for the Axleta blog, not a mirror of it. Post bodies are not
 * scraped or republished — each entry links out to blog.axleta.com, which is
 * where the archive actually lives.
 *
 * The data comes from `insights.generated.ts`, produced at build time by
 * scripts/fetch-insights.ts and committed. The feed sends no CORS header, so a
 * browser fetch is not possible and a build-time fetch is the right answer.
 *
 * Filters are client-side over a list of at most twelve items: no pagination,
 * no query string, no extra network request.
 */
import { useMemo, useState } from 'react';
import {
  BLOG_URL,
  formatInsightDate,
  insightCategories,
  sortedInsights,
} from '../data/insights';
import { routes } from '../data/site';
import { track } from '../lib/analytics';
import { SeoTag as Seo } from '../lib/SeoTag';
import { metaFor } from '../lib/seo';
import { CtaPair } from '../components/ui/Button';
import { Grid, Rule, Section, Shell } from '../components/ui/Layout';
import { Reveal } from '../components/ui/Reveal';
import { Body, Eyebrow, Note } from '../components/ui/Typography';
import { cn } from '../lib/utils';

const TRAIL = [
  { name: 'Home', path: routes.home },
  { name: 'Insights', path: routes.insights },
];

type Filter = 'All' | string;

export default function InsightsPage() {
  const [filter, setFilter] = useState<Filter>('All');

  const visible = useMemo(
    () =>
      filter === 'All'
        ? sortedInsights
        : sortedInsights.filter((entry) => entry.category === filter),
    [filter],
  );

  return (
    <>
      <Seo meta={metaFor('insights')} trail={TRAIL} />

      {/* Header */}
      <div className="bg-surface pb-section-y-tight pt-32 lg:pt-40">
        <Shell>
          <Grid rails>
            <div className="col-span-4 md:col-span-8 lg:col-span-8">
              <Reveal>
                <Eyebrow index="··" live>
                  Insights
                </Eyebrow>
                <h1 className="mt-8 max-w-[18ch] text-display font-display font-medium leading-[0.95] tracking-tightest">
                  Notes on ERP, infrastructure and everyday IT.
                </h1>
              </Reveal>
              <Reveal delay={0.12}>
                <Body className="mt-8 text-lead leading-loose">
                  Axleta has been writing about the systems businesses run on for
                  years. The full archive lives on our blog — this is the recent end of
                  it, indexed here so you can find the piece you need.
                </Body>
              </Reveal>
              <Reveal delay={0.2}>
                <CtaPair
                  className="mt-10"
                  primary={{
                    to: BLOG_URL,
                    label: 'Visit the blog',
                    onClick: () => track('external_blog_click', { label: 'insights_header' }),
                  }}
                  secondary={{
                    to: routes.contact,
                    label: 'Ask us instead',
                    onClick: () => track('cta_click', { label: 'insights_ask' }),
                  }}
                />
              </Reveal>
            </div>
            <div className="col-span-4 mt-12 md:col-span-8 lg:col-span-3 lg:col-start-10 lg:mt-0">
              <Reveal delay={0.16}>
                <div className="border-l-2 border-accent-600 pl-5">
                  <Note>Why this is an index</Note>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-700">
                    Articles are not copied here. Every entry links to the original on
                    blog.axleta.com, which is where they are maintained.
                  </p>
                </div>
              </Reveal>
            </div>
          </Grid>
        </Shell>
      </div>

      {/* Filters */}
      <div className="rule-t sticky top-18 z-30 bg-surface/92 backdrop-blur-md">
        <Shell>
          <nav aria-label="Filter by topic" className="py-4">
            <ul className="-mx-1 flex items-center gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {(['All', ...insightCategories] as Filter[]).map((category) => {
                const active = filter === category;
                const count =
                  category === 'All'
                    ? sortedInsights.length
                    : sortedInsights.filter((e) => e.category === category).length;

                return (
                  <li key={category} className="shrink-0">
                    <button
                      type="button"
                      onClick={() => setFilter(category)}
                      aria-pressed={active}
                      className={cn(
                        'label flex items-center gap-2 border px-3.5 py-2 transition-colors duration-300',
                        active
                          ? 'border-ink bg-ink text-paper'
                          : 'border-line-strong text-neutral-700 hover:border-accent-700 hover:text-accent-700',
                      )}
                    >
                      {category}
                      <span className={cn('tabular-nums', active ? 'text-neutral-300' : 'text-neutral-700')}>
                        {count}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </Shell>
      </div>

      {/* The index */}
      <Section tight>
        <Shell>
          {sortedInsights.length === 0 ? (
            <p className="measure leading-loose text-neutral-700">
              The blog feed was unavailable at build time and no committed snapshot was
              present. The archive is still readable at{' '}
              <a
                href={BLOG_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:text-accent-700"
              >
                blog.axleta.com
              </a>
              .
            </p>
          ) : (
            <>
              <div aria-live="polite" className="sr-only">
                Showing {visible.length} {visible.length === 1 ? 'article' : 'articles'}
                {filter === 'All' ? '' : ` tagged ${filter}`}
              </div>

              <ol>
                {visible.map((article, i) => (
                  <Reveal as="li" key={article.href} index={i} rule>
                    <a
                      href={article.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => track('insight_click', { title: article.title })}
                      className="group grid gap-x-8 gap-y-3 py-8 lg:grid-cols-[10rem_minmax(0,1fr)_auto] lg:items-baseline"
                    >
                      <p className="label flex flex-wrap items-center gap-x-3 text-neutral-700">
                        <time dateTime={article.date} className="tabular-nums">
                          {formatInsightDate(article.date)}
                        </time>
                        <span className="text-accent-700">{article.category}</span>
                      </p>

                      <div>
                        <h2 className="font-display text-2xl font-medium leading-snug tracking-tightest transition-colors duration-300 group-hover:text-accent-700 lg:text-[1.75rem]">
                          {article.title}
                        </h2>
                        <p className="mt-3 max-w-2xl leading-relaxed text-neutral-700">
                          {article.excerpt}
                        </p>
                      </div>

                      <span
                        aria-hidden="true"
                        className="hidden shrink-0 text-accent-700 transition-transform duration-300 ease-[var(--ease-entrance)] group-hover:translate-x-1 lg:block motion-reduce:transform-none"
                      >
                        →
                      </span>
                    </a>
                  </Reveal>
                ))}
              </ol>
            </>
          )}

          <Rule className="mt-12" />
          <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md text-sm leading-relaxed text-neutral-700">
              Looking for something specific? Ask us directly and we will point you at the
              right piece, or answer the question ourselves.
            </p>
            <a
              href={BLOG_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track('external_blog_click', { label: 'insights_footer' })}
              className="group label inline-flex items-center gap-2 text-ink transition-colors duration-300 hover:text-accent-700"
            >
              blog.axleta.com
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none"
              >
                →
              </span>
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </Shell>
      </Section>
    </>
  );
}