/**
 * /services — the engagement model.
 *
 * A four-stage traverse with the published services preserved. Every service
 * entry in `data/services.ts` records the published item it descends from, so
 * nothing from the live /services page is dropped in the reorganisation.
 *
 * The engagement principles close the page, followed by the honest note about
 * what is not claimed here.
 */
import { useMemo } from 'react';
import {
  engagementPrinciples,
  publishedServiceItems,
  serviceStages,
} from '../data/services';
import { routes } from '../data/site';
import { SeoTag as Seo } from '../lib/SeoTag';
import { metaFor } from '../lib/seo';
import { CoordinateRail, SectionIndex } from '../components/layout/CoordinateRail';
import { PageHero } from '../components/layout/PageHero';
import { CtaPair } from '../components/ui/Button';
import { ProcessRail } from '../components/diagrams';
import { Grid, Rule, Section, Shell } from '../components/ui/Layout';
import { Reveal } from '../components/ui/Reveal';
import { ArchitecturalLabel, Body, Eyebrow, Note, Subtitle, Title } from '../components/ui/Typography';
import { cn } from '../lib/utils';

const TRAIL = [
  { name: 'Home', path: routes.home },
  { name: 'Services', path: routes.services },
];

export default function ServicesPage() {
  const railItems = useMemo(
    () => serviceStages.map((stage) => ({ id: stage.id, label: stage.title })),
    [],
  );

  return (
    <>
      <Seo meta={metaFor('services')} trail={TRAIL} />

      <PageHero
        trail={TRAIL}
        eyebrow="Services"
        architecturalLabel="ENGAGEMENT / FOUR STAGES"
        title="From requirement analysis to ongoing support."
        lead="Axleta publishes five services. They are presented here as the four stages they belong to, so you can see not just what we offer but what you get at each point in the engagement."
        aside={
          <div className="border-l-2 border-accent-600 pl-5">
            <Note>All published services</Note>
            <ul className="mt-4 space-y-2">
              {publishedServiceItems.map((item) => (
                <li key={item} className="text-sm text-neutral-700">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        }
      >
        <div className="mt-12 rail:hidden">
          <SectionIndex items={railItems} />
        </div>
      </PageHero>

      <CoordinateRail items={railItems} />

      <div className="bg-surface-sunken px-gutter py-section-y-tight" data-services-process data-diagram-fallback>
        <Shell>
          <ProcessRail
            steps={serviceStages.map((stage) => ({ label: stage.title, detail: stage.summary }))}
            activeIndex={0}
          />
        </Shell>
      </div>

      {/* The stages */}
      {serviceStages.map((stage, index) => (
        <Section
          key={stage.id}
          id={stage.id}
          labelledBy={`${stage.id}-title`}
          tone={index % 2 === 1 ? 'ink' : 'paper'}
          className="scroll-mt-24"
        >
          <Shell>
            <Grid rails>
              <div className="col-span-4 md:col-span-8 lg:col-span-4">
                <Reveal>
                  <Eyebrow index={stage.number} tone={index % 2 === 1 ? 'ink' : 'paper'} live>
                    Stage {stage.number} of 04
                  </Eyebrow>
                  <ArchitecturalLabel tone={index % 2 === 1 ? 'ink' : 'paper'} className="mt-6">
                    {stage.architecturalLabel}
                  </ArchitecturalLabel>
                  <Title
                    id={`${stage.id}-title`}
                    tone={index % 2 === 1 ? 'ink' : 'paper'}
                    className="mt-6"
                  >
                    {stage.title}
                  </Title>
                </Reveal>
                <Reveal delay={0.1}>
                  <p
                    className={cn(
                      'measure mt-7 text-lead leading-loose',
                      index % 2 === 1 ? 'text-neutral-300' : 'text-neutral-900',
                    )}
                  >
                    {stage.summary}
                  </p>
                </Reveal>
                <Reveal delay={0.16}>
                  <div
                    className={cn(
                      'mt-9 border-l-2 pl-5',
                      index % 2 === 1 ? 'border-accent-300' : 'border-accent-600',
                    )}
                  >
                    <Note tone={index % 2 === 1 ? 'ink' : 'paper'}>Output</Note>
                    <p
                      className={cn(
                        'mt-2 leading-relaxed',
                        index % 2 === 1 ? 'text-paper' : 'text-ink',
                      )}
                    >
                      {stage.output}
                    </p>
                  </div>
                </Reveal>
              </div>

              <div className="col-span-4 mt-12 md:col-span-8 lg:col-span-7 lg:col-start-6 lg:mt-0">
                <ul className="space-y-0">
                  {stage.services.map((service, i) => (
                    <Reveal as="li" key={service.title} index={i} rule tone={index % 2 === 1 ? 'ink' : 'paper'}>
                      <div className="grid gap-x-8 gap-y-2 pt-8 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
                        <h3
                          className={cn(
                            'font-display text-xl leading-snug tracking-tightest',
                            index % 2 === 1 ? 'text-paper' : 'text-ink',
                          )}
                        >
                          {service.title}
                        </h3>
                        <div>
                          <p
                            className={cn(
                              'leading-relaxed',
                              index % 2 === 1 ? 'text-neutral-300' : 'text-neutral-700',
                            )}
                          >
                            {service.detail}
                          </p>
                          <Note
                            tone={index % 2 === 1 ? 'ink' : 'paper'}
                            className="mt-3"
                          >
                            Published as: {service.sourceService}
                          </Note>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </ul>
              </div>
            </Grid>
          </Shell>
        </Section>
      ))}

      {/* Engagement principles */}
      <Section id="principles" labelledBy="principles-title" tone="sunken" tight>
        <Shell>
          <Grid rails>
            <div className="col-span-4 md:col-span-8 lg:col-span-5">
              <Reveal>
                <Eyebrow index="05">Engagement principles</Eyebrow>
                <Title id="principles-title" className="mt-7">
                  How the work is shaped.
                </Title>
                <Body className="mt-7">
                  Four commitments, all taken from the current services content. They
                  are about the shape of the engagement rather than its technical
                  content.
                </Body>
              </Reveal>
              <Reveal delay={0.14}>
                <CtaPair
                  className="mt-10"
                  primary={{ to: routes.contact, label: 'Start a conversation' }}
                  secondary={{ to: routes.solutions, label: 'See the solutions' }}
                />
              </Reveal>
            </div>

            <div className="col-span-4 mt-12 md:col-span-8 lg:col-span-6 lg:col-start-7 lg:mt-0">
              <ol>
                {engagementPrinciples.map((principle, i) => (
                  <Reveal as="li" key={principle.label} index={i} rule className="pt-7">
                    <Subtitle as="h3" className="text-xl">
                      {principle.label}
                    </Subtitle>
                    <p className="mt-3 max-w-md leading-relaxed text-neutral-700">
                      {principle.detail}
                    </p>
                  </Reveal>
                ))}
              </ol>
              <Rule className="mt-10" />
              <Note className="mt-6">
                Remote access is delivered using Microsoft Remote Desktop Web Service,
                as published. No third-party remote support partnership is claimed on
                this site.
              </Note>
            </div>
          </Grid>
        </Shell>
      </Section>
    </>
  );
}
