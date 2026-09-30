/**
 * /about — the company record.
 *
 * Vision, mission, values, the practice timeline and the technology ecosystem,
 * all taken from the live About page. The page closes with a short, explicit
 * account of what Axleta does *not* claim here and why — the same content as
 * `verificationFlags` in data/company.ts, rendered for a human reader rather
 * than hidden in a changelog.
 */
import { useMemo } from 'react';
import { company, partners, principles, timeline, verificationFlags } from '../data/company';
import { external, routes } from '../data/site';
import { SeoTag as Seo } from '../lib/SeoTag';
import { metaFor } from '../lib/seo';
import { track } from '../lib/analytics';
import { CoordinateRail, SectionIndex } from '../components/layout/CoordinateRail';
import { PageHero } from '../components/layout/PageHero';
import { ArrowLink, CtaPair } from '../components/ui/Button';
import { Grid, Rule, Section, Shell } from '../components/ui/Layout';
import { Reveal } from '../components/ui/Reveal';
import {
  ArchitecturalLabel,
  Body,
  Eyebrow,
  Note,
  Subtitle,
  Title,
} from '../components/ui/Typography';
import { cn } from '../lib/utils';

const TRAIL = [
  { name: 'Home', path: routes.home },
  { name: 'About', path: routes.about },
];

export default function AboutPage() {
  const railItems = useMemo(
    () => [
      { id: 'story', label: 'Story' },
      { id: 'vision', label: 'Vision & mission' },
      { id: 'principles', label: 'Principles' },
      { id: 'timeline', label: 'Timeline' },
      { id: 'partnerships', label: 'Partnerships' },
      { id: 'evidence', label: 'What we claim' },
    ],
    [],
  );

  return (
    <>
      <Seo meta={metaFor('about')} trail={TRAIL} />

      <PageHero
        trail={TRAIL}
        eyebrow="About Axleta"
        architecturalLabel={`COMPANY / EST. ${company.founded}`}
        title="A technology companion for the business, not a vendor of licences."
        lead={company.descriptor.charAt(0).toUpperCase() + company.descriptor.slice(1) + '.'}
        aside={
          <div className="border-l-2 border-accent-600 pl-5">
            <Note>Founded {company.founded}</Note>
            <p className="mt-3 text-sm leading-relaxed text-neutral-700">
              Working with businesses in Sri Lanka and globally, from an axleta Canada
              address.
            </p>
          </div>
        }
      >
        <div className="mt-12 rail:hidden">
          <SectionIndex items={railItems} />
        </div>
      </PageHero>

      <CoordinateRail items={railItems} />

      {/* ---- Story ---- */}
      <Section id="story" labelledBy="story-title" tight className="scroll-mt-24">
        <Shell>
          <Grid rails>
            <div className="col-span-4 md:col-span-8 lg:col-span-4">
              <Reveal>
                <Eyebrow index="01">Story</Eyebrow>
                <Title id="story-title" className="mt-7">
                  What the firm is for.
                </Title>
              </Reveal>
            </div>
            <div className="col-span-4 mt-10 md:col-span-8 lg:col-span-7 lg:col-start-6 lg:mt-0">
              {company.story.map((paragraph, i) => (
                <Reveal key={paragraph.slice(0, 32)} index={i} rule className="pt-8">
                  <p className="text-lead leading-loose text-neutral-900">{paragraph}</p>
                </Reveal>
              ))}
            </div>
          </Grid>
        </Shell>
      </Section>

      {/* ---- Vision, mission, values ---- */}
      <Section id="vision" labelledBy="vision-title" tone="ink" className="scroll-mt-24">
        <Shell>
          <Grid rails>
            <div className="col-span-4 md:col-span-8 lg:col-span-5">
              <Reveal>
                <Eyebrow index="02" tone="ink" live>
                  Vision
                </Eyebrow>
                <Title id="vision-title" tone="ink" className="mt-7">
                  {company.vision}
                </Title>
              </Reveal>
              <Reveal delay={0.12}>
                <div className="mt-10 border-l-2 border-accent-300 pl-5">
                  <Eyebrow index="03" tone="ink">
                    Mission
                  </Eyebrow>
                  <p className="mt-4 leading-loose text-neutral-300">{company.mission}</p>
                </div>
              </Reveal>
            </div>

            <div className="col-span-4 mt-12 md:col-span-8 lg:col-span-6 lg:col-start-7 lg:mt-0">
              <Reveal>
                <p className="label text-neutral-500">Values, as published</p>
              </Reveal>
              {company.values.map((value, i) => (
                <Reveal key={value.title} index={i} rule tone="ink" className="pt-8">
                  <Subtitle as="h3" tone="ink" className="text-2xl">
                    {value.title}
                  </Subtitle>
                  <p className="mt-3 max-w-lg leading-relaxed text-neutral-300">{value.detail}</p>
                </Reveal>
              ))}
              <Reveal delay={0.2}>
                <Rule className="mt-10 bg-white/12" />
                <p className="mt-6 max-w-lg text-sm leading-relaxed text-neutral-500">
                  Axleta's public content states these values as a pair. We have not
                  padded the list out to fill a grid.
                </p>
              </Reveal>
            </div>
          </Grid>
        </Shell>
      </Section>

      {/* ---- Principles ---- */}
      <Section id="principles" labelledBy="principles-title" tight className="scroll-mt-24">
        <Shell>
          <Grid rails>
            <div className="col-span-4 md:col-span-8 lg:col-span-4">
              <Reveal>
                <Eyebrow index="04">How we work</Eyebrow>
                <Title id="principles-title" className="mt-7">
                  Seven principles, each traceable to a capability.
                </Title>
                <Body className="mt-7">
                  Nothing below is a claim about results. Each one describes how Axleta
                  approaches an engagement, and each maps to something the firm
                  publishes it can deliver.
                </Body>
              </Reveal>
              <Reveal delay={0.14}>
                <CtaPair
                  className="mt-10"
                  primary={{ to: routes.contact, label: 'Talk to us' }}
                  secondary={{ to: routes.services, label: 'How we engage' }}
                />
              </Reveal>
            </div>
            <div className="col-span-4 mt-12 md:col-span-8 lg:col-span-7 lg:col-start-6 lg:mt-0">
              <ol className="grid gap-x-8 gap-y-9 sm:grid-cols-2">
                {principles.map((principle, i) => (
                  <Reveal as="li" key={principle.index} index={i} rule>
                    <div className="pt-7">
                      <span className="label text-accent-700 tabular-nums">{principle.index}</span>
                      <h3 className="mt-4 font-display text-xl leading-snug tracking-tightest">
                        {principle.label}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-neutral-700">
                        {principle.detail}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </ol>
            </div>
          </Grid>
        </Shell>
      </Section>

      {/* ---- Timeline ---- */}
      <Section id="timeline" labelledBy="timeline-title" tone="sunken" tight className="scroll-mt-24">
        <Shell>
          <Grid rails>
            <div className="col-span-4 md:col-span-8 lg:col-span-3">
              <Reveal>
                <Eyebrow index="05">Timeline</Eyebrow>
                <Title id="timeline-title" className="mt-7">
                  How the practice grew.
                </Title>
              </Reveal>
            </div>
            <div className="col-span-4 mt-12 md:col-span-8 lg:col-span-8 lg:col-start-5 lg:mt-0">
              <ol>
                {timeline.map((entry, i) => (
                  <Reveal as="li" key={entry.year} index={i} rule>
                    <div className="grid gap-x-8 gap-y-3 pt-8 sm:grid-cols-[8rem_minmax(0,1fr)]">
                      <div className="flex items-baseline gap-4 sm:block">
                        <span className="label text-accent-700">{entry.year}</span>
                        <h3 className="font-display text-2xl leading-snug tracking-tightest sm:mt-4">
                          {entry.title}
                        </h3>
                      </div>
                      <p className="max-w-xl leading-relaxed text-neutral-700">{entry.detail}</p>
                    </div>
                  </Reveal>
                ))}
              </ol>
            </div>
          </Grid>
        </Shell>
      </Section>

      {/* ---- Partnerships ---- */}
      <Section id="partnerships" labelledBy="partnerships-title" className="scroll-mt-24">
        <Shell>
          <Grid rails>
            <div className="col-span-4 md:col-span-8 lg:col-span-4">
              <Reveal>
                <Eyebrow index="06">Partnerships</Eyebrow>
                <Title id="partnerships-title" className="mt-7">
                  The ecosystem Axleta works inside.
                </Title>
                <Body className="mt-7">
                  Two published relationships. Both are stated in plain type rather
                  than reproduced as logos, because no mark-use authorisation is held.
                </Body>
              </Reveal>
            </div>

            <div className="col-span-4 mt-12 md:col-span-8 lg:col-span-7 lg:col-start-6 lg:mt-0">
              {partners.map((partner, i) => (
                <Reveal key={partner.id} index={i} rule className="pt-9">
                  <ArchitecturalLabel>{partner.sublabel}</ArchitecturalLabel>
                  <h3 className="mt-4 font-display text-3xl font-medium tracking-tightest">
                    {partner.wordmark}
                  </h3>
                  <p className="mt-4 max-w-xl leading-loose text-neutral-900">
                    {partner.statement}
                  </p>
                  <p className="mt-3 max-w-xl leading-relaxed text-neutral-700">
                    {partner.detail}
                  </p>
                  <ArrowLink
                    to={partner.href}
                    external
                    className="mt-6"
                    onClick={() => track('cta_click', { label: `about_${partner.id}` })}
                  >
                    {partner.linkLabel}
                  </ArrowLink>
                </Reveal>
              ))}

              <Reveal delay={0.2}>
                <div className="mt-10 border-t border-line pt-8">
                  <Note>
                    Axleta is also a Google Cloud Partner for the Google productivity
                    suite. That relationship has its own page.
                  </Note>
                  <ArrowLink to={routes.googleWorkspace} className="mt-5">
                    Google Workspace for collaborating teams
                  </ArrowLink>
                </div>
              </Reveal>

              <Reveal delay={0.26}>
                <div className="mt-8 flex flex-wrap gap-x-7 gap-y-4">
                  <ArrowLink to={external.sapBusinessOne} external>
                    SAP Business One
                  </ArrowLink>
                  <ArrowLink to={external.sapS4hana} external>
                    SAP S/4HANA
                  </ArrowLink>
                  <ArrowLink to={external.googleCloud} external>
                    Google Cloud
                  </ArrowLink>
                </div>
              </Reveal>
            </div>
          </Grid>
        </Shell>
      </Section>

      {/* ---- What we claim ---- */}
      <Section id="evidence" labelledBy="evidence-title" tone="ink" tight className="scroll-mt-24">
        <Shell>
          <Grid rails>
            <div className="col-span-4 md:col-span-8 lg:col-span-5">
              <Reveal>
                <Eyebrow index="07" tone="ink" live>
                  Evidence
                </Eyebrow>
                <Title id="evidence-title" tone="ink" className="mt-7">
                  What this site does not claim.
                </Title>
                <p className="measure mt-7 leading-loose text-neutral-300">
                  A few things are often asserted about firms like ours. None of them are
                  supported by Axleta's current public content, so none of them appear on
                  this site. Listing them is more useful than leaving you to notice the
                  gaps.
                </p>
              </Reveal>
            </div>

            <div className="col-span-4 mt-12 md:col-span-8 lg:col-span-7 lg:col-start-6 lg:mt-0">
              {verificationFlags.map((flag, i) => (
                <Reveal key={flag.claim} index={i} rule tone="ink" className="pt-7">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <h3 className="font-display text-xl leading-snug tracking-tightest">
                      {flag.claim}
                    </h3>
                    <span
                      className={cn(
                        'label rounded-xs px-2 py-1',
                        flag.status === 'unsupported'
                          ? 'bg-white/12 text-neutral-300'
                          : 'bg-accent-300/15 text-accent-300',
                      )}
                    >
                      {flag.status}
                    </span>
                  </div>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-neutral-300">
                    {flag.detail}
                  </p>
                  <p className="mt-3 max-w-xl border-l-2 border-accent-300 pl-4 text-sm leading-relaxed text-paper">
                    {flag.resolution}
                  </p>
                </Reveal>
              ))}
              <Rule className="mt-10 bg-white/12" />
              <Note tone="ink" className="mt-6">
                Full verification detail, including source pages and dates, is in
                AXLETA_REVAMP_AUDIT.md in the project repository.
              </Note>
            </div>
          </Grid>
        </Shell>
      </Section>
    </>
  );
}