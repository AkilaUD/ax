/**
 * /solutions — the full portfolio.
 *
 * One route, four sections, each with an in-page anchor. The coordinate rail
 * (Signature A) tracks position because this page is the longest on the site;
 * below 78rem it becomes a horizontally scrollable section index.
 *
 * Each solution repeats the structure established on the homepage — description,
 * `<dl>` capability index, a consultation link — but carries more copy and gets
 * the sticky plate treatment.
 */
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { solutions } from '../data/solutions';
import { routes } from '../data/site';
import { track } from '../lib/analytics';
import { SeoTag as Seo } from '../lib/SeoTag';
import { metaFor } from '../lib/seo';
import { CoordinateRail, SectionIndex } from '../components/layout/CoordinateRail';
import { PageHero } from '../components/layout/PageHero';
import { SystemArchitecture } from '../components/diagrams/SystemArchitecture';
import { SolutionDiagram } from '../components/diagrams/SolutionDiagram';
import { Grid, Rule, Section, Shell } from '../components/ui/Layout';
import { Reveal } from '../components/ui/Reveal';
import {
  ArchitecturalLabel,
  Body,
  Eyebrow,
  Note,
  Title,
} from '../components/ui/Typography';
import { cn } from '../lib/utils';

const TRAIL = [
  { name: 'Home', path: routes.home },
  { name: 'Solutions', path: routes.solutions },
];

export default function SolutionsPage() {
  const railItems = useMemo(
    () => solutions.map((s) => ({ id: s.anchor, label: s.title })),
    [],
  );

  return (
    <>
      <Seo meta={metaFor('solutions')} trail={TRAIL} />

      <PageHero
        trail={TRAIL}
        eyebrow="Solutions"
        architecturalLabel="PORTFOLIO / FOUR AREAS"
        title="What Axleta builds, runs and keeps running."
        lead="Four connected areas of practice. Each one is chosen against how your business operates, and each one is specified in the same conversation as the others — because they depend on each other."
        aside={
          <div className="border-l-2 border-accent-600 pl-5">
            <Note>
              Published on the live Axleta site
            </Note>
            <p className="mt-3 text-sm leading-relaxed text-neutral-700">
              Every capability on this page appears in Axleta's current public
              solutions and services content. Nothing has been added for effect.
            </p>
          </div>
        }
      >
        <div className="mt-12 rail:hidden">
          <SectionIndex items={railItems} />
        </div>
      </PageHero>

      <CoordinateRail items={railItems} />

      {solutions.map((solution, index) => (
        <Section
          key={solution.id}
          id={solution.anchor}
          labelledBy={`${solution.id}-title`}
          tone={index % 2 === 1 ? 'ink' : 'paper'}
          className="scroll-mt-24"
        >
          <Shell>
            <Grid rails>
              <div
                className={cn(
                  'col-span-4 md:col-span-8 lg:col-span-6',
                  index % 2 === 1 && 'lg:order-2',
                )}
              >
                <Reveal>
                  <Eyebrow index={solution.number} tone={index % 2 === 1 ? 'ink' : 'paper'} live>
                    {solution.category}
                  </Eyebrow>
                  <ArchitecturalLabel
                    tone={index % 2 === 1 ? 'ink' : 'paper'}
                    className="mt-6"
                  >
                    {solution.architecturalLabel}
                  </ArchitecturalLabel>
                  <Title
                    id={`${solution.id}-title`}
                    tone={index % 2 === 1 ? 'ink' : 'paper'}
                    className="mt-6"
                  >
                    {solution.title}
                  </Title>
                </Reveal>

                <Reveal delay={0.1}>
                  <p
                    className={cn(
                      'measure mt-8 text-lead leading-loose',
                      index % 2 === 1 ? 'text-neutral-300' : 'text-neutral-900',
                    )}
                  >
                    {solution.shortDescription}
                  </p>
                </Reveal>

                <Reveal delay={0.16}>
                  <Body tone={index % 2 === 1 ? 'ink' : 'paper'} className="mt-7">
                    {solution.description}
                  </Body>
                </Reveal>

                <Reveal delay={0.22}>
                  <h3
                    className={cn(
                      'mt-12 font-display text-2xl font-medium leading-snug tracking-tightest',
                    )}
                  >
                    Capabilities
                  </h3>
                  <dl className="mt-6">
                    {solution.capabilities.map((capability) => (
                      <div
                        key={capability.label}
                        className={cn(
                          'grid gap-x-8 gap-y-1 border-t py-5 sm:grid-cols-[minmax(10rem,15rem)_1fr]',
                          index % 2 === 1 ? 'border-white/12' : 'border-line',
                        )}
                      >
                        <dt
                          className={cn(
                            'label',
                            index % 2 === 1 ? 'text-accent-300' : 'text-accent-700',
                          )}
                        >
                          {capability.label}
                        </dt>
                        <dd
                          className={cn(
                            'leading-relaxed',
                            index % 2 === 1 ? 'text-neutral-300' : 'text-neutral-700',
                          )}
                        >
                          {capability.detail}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </Reveal>

                <Reveal delay={0.28}>
                  <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4">
                    <Link
                      to={`${routes.contact}?topic=${encodeURIComponent(solution.title)}`}
                      onClick={() =>
                        track('cta_click', {
                          label: 'solutions_consult',
                          category: solution.category,
                        })
                      }
                      className={cn(
                        'group relative inline-flex h-12 items-center gap-2.5 px-6 font-mono text-eyebrow uppercase tracking-label transition-colors duration-300',
                        index % 2 === 1
                          ? 'bg-accent-300 text-ink hover:bg-paper'
                          : 'bg-action text-paper hover:bg-action-hover',
                      )}
                    >
                      <span>Discuss {solution.category.toLowerCase()}</span>
                      <span
                        aria-hidden="true"
                        className="transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none"
                      >
                        →
                      </span>
                    </Link>
                  </div>
                </Reveal>
              </div>

              <div
                className={cn(
                  'col-span-4 mt-14 md:col-span-8 lg:col-span-5 lg:mt-0',
                  index % 2 === 1 ? 'lg:order-1 lg:col-start-1' : 'lg:col-start-8',
                )}
              >
                <Reveal delay={0.12}>
                  <div
                    className={cn(
                      'lg:sticky lg:top-28',
                      index % 2 === 1 && 'rounded-md bg-white/[0.03] p-6',
                    )}
                  >
                    <SolutionDiagram
                      type={solution.visualType}
                      tone={index % 2 === 1 ? 'ink' : 'paper'}
                    />
                    <Note tone={index % 2 === 1 ? 'ink' : 'paper'} className="mt-5">
                      Plate {solution.number} — {solution.architecturalLabel.toLowerCase()}
                    </Note>
                  </div>
                </Reveal>
              </div>
            </Grid>
          </Shell>
        </Section>
      ))}

      {/* Summary architecture */}
      <Section tone="sunken" labelledBy="stack-title" tight>
        <Shell>
          <Grid rails>
            <div className="col-span-4 md:col-span-8 lg:col-span-4">
              <Reveal>
                <Eyebrow index="05">The stack</Eyebrow>
                <Title id="stack-title" className="mt-7">
                  These four are one system.
                </Title>
                <Body className="mt-7">
                  Read from the bottom up: infrastructure carries the ERP, companion
                  applications extend it, and automation threads across both. Axleta
                  specifies them together.
                </Body>
              </Reveal>
            </div>
            <div className="col-span-4 mt-12 md:col-span-8 lg:col-span-8 lg:mt-0">
              <Reveal delay={0.08}>
                <SystemArchitecture />
                <Rule className="mt-10" />
                <Note className="mt-6">
                  Vendor names are the property of their owners. Partner logos are not
                  reproduced because no mark-use authorisation is held.
                </Note>
              </Reveal>
            </div>
          </Grid>
        </Shell>
      </Section>
    </>
  );
}