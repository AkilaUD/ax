/**
 * Interior page header.
 *
 * Every interior route opens with the same structural header: coordinate
 * breadcrumbs, a live eyebrow, an oversized display setting and a lead. What
 * changes is the decorative diagram drawn behind it, which is drawn per route
 * from the same component vocabulary so the pages feel like one system rather
 * than ten templates.
 */
import type { ReactNode } from 'react';
import { Breadcrumbs } from '../ui/Chrome';
import { Grid, Shell } from '../ui/Layout';
import { ArchitecturalLabel, Display, Eyebrow, Lead } from '../ui/Typography';
import { Reveal, SplitHeadline } from '../ui/Reveal';

export function PageHero({
  trail,
  eyebrow,
  architecturalLabel,
  title,
  lead,
  aside,
  children,
}: {
  trail: { name: string; path: string }[];
  eyebrow: string;
  architecturalLabel?: string;
  /** Passed to SplitHeadline for the word-by-word entrance. */
  title: string;
  lead: string;
  aside?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="relative overflow-hidden bg-surface pb-section-y-tight pt-32 lg:pt-40">
      <Shell>
        <Grid rails>
          <div className="col-span-4 md:col-span-8 lg:col-span-9">
            <Reveal>
              <Breadcrumbs trail={trail} />
            </Reveal>
            <Reveal delay={0.05}>
              <Eyebrow index="··" live className="mt-8">
                {eyebrow}
              </Eyebrow>
            </Reveal>
            {architecturalLabel ? (
              <Reveal delay={0.08}>
                <ArchitecturalLabel className="mt-6">{architecturalLabel}</ArchitecturalLabel>
              </Reveal>
            ) : null}
            <SplitHeadline
              as="h1"
              text={title}
              delay={0.12}
              className="mt-7 text-display font-display font-medium leading-[0.95] tracking-tightest"
            />
            <Reveal delay={0.34}>
              <Lead className="mt-8">{lead}</Lead>
            </Reveal>
            {children}
          </div>

          {aside ? <div className="col-span-4 mt-12 md:col-span-8 lg:col-span-3 lg:mt-0 lg:col-start-10">{aside}</div> : null}
        </Grid>
      </Shell>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-border" />
    </div>
  );
}

/** The display setting used on legal pages, which must stay compact. */
export function CompactHero({
  trail,
  eyebrow,
  title,
  lead,
  reviewed,
}: Omit<Parameters<typeof PageHero>[0], 'architecturalLabel' | 'aside' | 'children'> & {
  reviewed: string;
}) {
  return (
    <div className="bg-surface pb-section-y-tight pt-32 lg:pt-36">
      <Shell>
        <Breadcrumbs trail={trail} />
        <Eyebrow index="··" live className="mt-8">
          {eyebrow}
        </Eyebrow>
        <Display className="mt-6 text-title">{title}</Display>
        <p className="measure mt-6 leading-loose text-neutral-700">{lead}</p>
        <p className="label mt-8 text-neutral-700">
          Last reviewed <time dateTime={reviewed}>{formatReviewed(reviewed)}</time>
        </p>
      </Shell>
    </div>
  );
}

function formatReviewed(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}