/**
 * Homepage: the premise.
 *
 * States the argument in one column, with the four areas as a numbered index
 * beside it. The index is a link list, not a card grid — it is the site's table
 * of contents and doubles as the mobile navigation into /solutions.
 */
import { Link } from 'react-router-dom';
import { company } from '../../data/company';
import { routes } from '../../data/site';
import { solutions } from '../../data/solutions';
import { track } from '../../lib/analytics';
import { ArrowLink } from '../ui/Button';
import { Grid, Rule, Section, Shell, Stack } from '../ui/Layout';
import { Reveal, SignalBar } from '../ui/Reveal';
import { Body, Eyebrow, Subtitle, Title } from '../ui/Typography';

const SIGNAL_ITEMS = [
  'SAP Business One',
  'SAP S/4HANA Public Cloud',
  'PLM',
  'Companion applications',
  'Private cloud',
  'Virtualisation',
  'Security',
  'RPA',
  'Integration',
  'Generative AI',
  'Remote access',
  'SAP Business One support',
] as const;

export function Premise() {
  return (
    <Section id="premise" labelledBy="premise-title" tone="ink" tight dataMarkers={['system-brief']}>
      <Shell>
        <SignalBar items={SIGNAL_ITEMS} tone="ink" />

        <Grid rails className="pt-section-y-tight">
          <div className="col-span-4 md:col-span-8 lg:col-span-6">
            <Reveal>
              <Eyebrow index="02" tone="ink">The premise</Eyebrow>
              <Title id="premise-title" tone="ink" className="mt-7">
                Software is the easy part. The process around it is the hard part.
              </Title>
            </Reveal>
            <Reveal delay={0.12}>
              <Stack gap="md" className="mt-9">
                {company.story.map((paragraph) => (
                  <Body key={paragraph.slice(0, 32)} tone="ink">{paragraph}</Body>
                ))}
              </Stack>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-10">
                <Subtitle as="h3" tone="ink" className="max-w-lg">
                  {company.vision}
                </Subtitle>
                <Body tone="ink" className="mt-4">{company.mission}</Body>
              </div>
            </Reveal>
            <Reveal delay={0.28}>
              <ArrowLink to={routes.about} tone="ink" className="mt-10">
                Read about Axleta
              </ArrowLink>
            </Reveal>
          </div>

          {/* The system index */}
          <div className="col-span-4 mt-14 md:col-span-8 lg:col-span-5 lg:col-start-8 lg:mt-0">
            <Reveal>
              <p className="label text-neutral-300">Index of practice / system inputs</p>
            </Reveal>
            <ol className="mt-6">
              {solutions.map((solution, i) => (
                <Reveal as="li" key={solution.id} index={i} rule tone="ink" className="pt-7">
                  <Link
                    to={`${routes.solutions}#${solution.anchor}`}
                    className="group block"
                    onClick={() => track('solution_view', { from: 'premise_index', category: solution.category })}
                  >
                    <div className="flex items-baseline gap-5">
                      <span className="label w-8 shrink-0 text-accent-300 tabular-nums">
                        {solution.number}
                      </span>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-display text-2xl leading-snug tracking-tightest text-paper transition-colors duration-300 group-hover:text-accent-300 lg:text-[1.75rem]">
                          {solution.title}
                        </h3>
                        <p className="mt-2.5 max-w-md text-sm leading-relaxed text-neutral-300">
                          {solution.shortDescription}
                        </p>
                        <span className="label mt-4 inline-flex items-center gap-2 text-accent-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                          Open {solution.architecturalLabel}
                          <span aria-hidden="true">→</span>
                        </span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </ol>
            <Rule tone="ink" className="mt-10" />
            <p className="label mt-6 text-neutral-300">
              Every capability above is published by Axleta. Nothing here is aspirational.
            </p>
          </div>
        </Grid>
      </Shell>
    </Section>
  );
}
