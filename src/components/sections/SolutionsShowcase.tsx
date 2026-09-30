/**
 * Homepage: the solutions, presented as drawing plates.
 *
 * Each solution is a spread — text on one side, its diagram on the other, with
 * the ground alternating ink/paper down the section. That alternation is the
 * ink/paper rhythm device; it is why the homepage never settles into a repeated
 * two-column template.
 *
 * Capability lists are `<dl>`s with monospace keys, so they read as an
 * engineering index rather than as bullet-point marketing copy.
 */
import { Link } from 'react-router-dom';
import { solutions, type Solution } from '../../data/solutions';
import { routes } from '../../data/site';
import { track } from '../../lib/analytics';
import { cn } from '../../lib/utils';
import { SolutionDiagram } from '../diagrams/SolutionDiagram';
import { ArrowLink } from '../ui/Button';
import { Grid, Shell } from '../ui/Layout';
import { Reveal } from '../ui/Reveal';
import { ArchitecturalLabel, Body, Eyebrow, Note, Subtitle, Title } from '../ui/Typography';

export function SolutionsShowcase() {
  return (
    <>
      {solutions.map((solution, i) => (
        <SolutionSpread key={solution.id} solution={solution} index={i} />
      ))}
    </>
  );
}

function SolutionSpread({ solution, index }: { solution: Solution; index: number }) {
  const ink = index % 2 === 1;
  const flip = index % 2 === 1;

  return (
    <section
      id={solution.anchor}
      aria-labelledby={`${solution.id}-title`}
      data-surface={ink ? 'ink' : undefined}
      className={cn(
        'scroll-mt-24 py-section-y',
        ink ? 'surface-ink' : 'bg-surface',
      )}
    >
      <Shell>
        <Grid rails>
          <div
            className={cn(
              'col-span-4 md:col-span-8 lg:col-span-5',
              flip && 'lg:order-2 lg:col-start-8',
            )}
          >
            <Reveal>
              <Eyebrow index={solution.number} tone={ink ? 'ink' : 'paper'} live>
                {solution.category}
              </Eyebrow>
              <ArchitecturalLabel
                tone={ink ? 'ink' : 'paper'}
                className="mt-6"
              >
                {solution.architecturalLabel}
              </ArchitecturalLabel>
              <Title
                id={`${solution.id}-title`}
                tone={ink ? 'ink' : 'paper'}
                className="mt-6"
              >
                {solution.title}
              </Title>
            </Reveal>

            <Reveal delay={0.1}>
              <p
                className={cn(
                  'measure mt-7 text-lead leading-loose',
                  ink ? 'text-neutral-300' : 'text-neutral-900',
                )}
              >
                {solution.shortDescription}
              </p>
            </Reveal>

            <Reveal delay={0.16}>
              <Body tone={ink ? 'ink' : 'paper'} className="mt-6">
                {solution.description}
              </Body>
            </Reveal>

            <Reveal delay={0.22}>
              <Subtitle as="h3" tone={ink ? 'ink' : 'paper'} className="mt-12 text-2xl">
                What this covers
              </Subtitle>
              <dl className="mt-6">
                {solution.capabilities.map((capability) => (
                  <div
                    key={capability.label}
                    className={cn(
                      'grid gap-x-6 gap-y-1 border-t py-4 sm:grid-cols-[minmax(9rem,14rem)_1fr]',
                      ink ? 'border-white/12' : 'border-line',
                    )}
                  >
                    <dt
                      className={cn(
                        'label',
                        ink ? 'text-accent-300' : 'text-accent-700',
                      )}
                    >
                      {capability.label}
                    </dt>
                    <dd
                      className={cn(
                        'text-sm leading-relaxed',
                        ink ? 'text-neutral-300' : 'text-neutral-700',
                      )}
                    >
                      {capability.detail}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.28}>
              <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
                <Link
                  to={`${routes.contact}?topic=${encodeURIComponent(solution.title)}`}
                  onClick={() =>
                    track('cta_click', { label: 'solution_consult', category: solution.category })
                  }
                  className={cn(
                    'group relative inline-flex h-12 items-center gap-2.5 px-6 font-mono text-eyebrow uppercase tracking-label transition-colors duration-300',
                    ink
                      ? 'bg-accent-300 text-ink hover:bg-paper'
                      : 'bg-action text-paper hover:bg-action-hover',
                  )}
                >
                  <span>Discuss {solution.category.toLowerCase()}</span>
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-300 ease-[var(--ease-entrance)] group-hover:translate-x-1 motion-reduce:transform-none"
                  >
                    →
                  </span>
                </Link>
                <ArrowLink to={routes.services} tone={ink ? 'ink' : 'paper'}>
                  How we deliver
                </ArrowLink>
              </div>
            </Reveal>
          </div>

          {/* The plate */}
          <div
            className={cn(
              'col-span-4 mt-14 md:col-span-8 lg:col-span-6 lg:mt-0',
              flip ? 'lg:order-1 lg:col-start-1' : 'lg:col-start-7',
            )}
          >
            <Reveal delay={0.12}>
              <div
                className={cn(
                  'lg:sticky lg:top-28',
                  ink && 'rounded-md bg-white/[0.03] p-6',
                )}
              >
                <SolutionDiagram
                  type={solution.visualType}
                  tone={ink ? 'ink' : 'paper'}
                  className={cn('w-full', ink ? 'opacity-90' : '')}
                />
                <Note tone={ink ? 'ink' : 'paper'} className="mt-5">
                  Plate {solution.number} — {solution.architecturalLabel.toLowerCase()}
                </Note>
              </div>
            </Reveal>
          </div>
        </Grid>
      </Shell>
    </section>
  );
}