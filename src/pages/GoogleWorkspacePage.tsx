/**
 * /google-workspace.
 *
 * The one page on the site that is partly transactional: it exists because Axleta
 * is a Google Cloud Partner and has a verified Workspace referral link. It is
 * retained rather than folded into /solutions because the legacy site had it as a
 * standalone page and the referral flow depends on reaching it directly.
 *
 * Two things are deliberately absent:
 *  - Google and Workspace logos. No mark-use authorisation is held, so the
 *    relationship is stated in type (the same decision as the SAP/Google Cloud
 *    partnerships on /about).
 *  - Pricing. Google sets Workspace pricing and it changes; quoting it here
 *    would go stale. The referral link goes to Google's own pricing page.
 */
import { useMemo } from 'react';
import { company } from '../data/company';
import { external, routes, site } from '../data/site';
import { track } from '../lib/analytics';
import { SeoTag as Seo } from '../lib/SeoTag';
import { metaFor } from '../lib/seo';
import { Disclosure, Prose } from '../components/ui/Prose';
import { PageHero } from '../components/layout/PageHero';
import { ArrowLink, ButtonLink, CtaPair } from '../components/ui/Button';
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

const TRAIL = [
  { name: 'Home', path: routes.home },
  { name: 'Google Workspace', path: routes.googleWorkspace },
];

/** What the suite is for — published scope, not marketing invention. */
const useCases = [
  {
    id: 'collaborate',
    label: 'Work in the same document',
    detail:
      'Shared documents, shared drives and shared inboxes mean the version people are editing is the version everyone has. Version history and real-time co-editing remove the “which copy is current” problem.',
  },
  {
    id: 'mail',
    label: 'Mail that holds up under audit',
    detail:
      'Hosted mail with the searching, filtering and delegation a small team needs, without running a mail server and its patching cycle.',
  },
  {
    id: 'meet',
    label: 'Meetings that do not need a room',
    detail:
      'Video, chat and screen sharing in the browser. Useful for a business whose people are not in the same building, or not in the same country.',
  },
  {
    id: 'storage',
    label: 'Storage that is not the laptop',
    detail:
      'Files live in the suite rather than on one machine, so losing a laptop is an inconvenience rather than an incident.',
  },
  {
    id: 'connect',
    label: 'A place to put the ERP add-ons',
    detail:
      'Shared drives and permissions give companion applications and integration work a sane home. If the ERP needs to exchange files with people outside the finance team, this is usually where that is set up.',
  },
  {
    id: 'admin',
    label: 'Administration that holds up',
    detail:
      'Centralised user management, single sign-on and policy control — administered by Axleta as part of an engagement rather than left to whoever is most confident with a settings page.',
  },
] as const;

/** Honest boundaries. This is what stops the page becoming a brochure. */
const questions = [
  {
    label: 'Are you reselling a licence?',
    detail:
      'No. Axleta introduces and sells Google Cloud Platform and Google productivity products as a Google Cloud Partner. Google sets the pricing and the terms; the referral link on this page goes to Google, where the current terms and prices are published. Nothing is quoted here because it would be wrong within weeks.',
  },
  {
    label: 'Can you migrate us from another provider?',
    detail:
      'Migration is an engagement, not a download button. It depends on how much mail and how many files you hold, and on who the current domain administrator is. Ask us and we will tell you what it involves before you commit to it.',
  },
  {
    label: 'What happens to our data if we leave?',
    detail:
      'Export and retention are governed by your Google plan and Google’s own terms, which we will point you at before you sign up. We will not answer a contractual question on Google’s behalf.',
  },
  {
    label: 'Do you administer it for us?',
    detail:
      'Yes — as scoped. Administration, policy and user lifecycle management are exactly the kind of thing that sits inside an ongoing engagement rather than as a separate product. The scope is agreed in writing first.',
  },
  {
    label: 'Why is this a separate page and not a solution?',
    detail:
      'Because it is the one offer here with a defined path: evaluate, then use the referral link, then talk to us about administering it. The rest of the solutions need a discovery conversation before anything can be recommended, so they sit behind /solutions.',
  },
] as const;

export default function GoogleWorkspacePage() {
  const jsonLd = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Google Workspace — introduction, referral and administration',
      serviceType: 'Productivity software introduction and administration',
      description:
        'The Google productivity suite — Gmail, Drive, Docs, Sheets, Slides, Meet and Calendar — introduced and sold by Axleta as a Google Cloud Partner, with administration available as an engagement.',
      provider: {
        '@type': 'Organization',
        name: 'Axleta',
        url: site.url,
      },
      brand: { '@type': 'Brand', name: 'Google' },
      category: 'Productivity software',
      url: site.url + routes.googleWorkspace,
      areaServed: 'Worldwide',
      // No `offers`. Google sets Workspace pricing and it changes, so there is
      // no price to assert here; an Offer with a placeholder would be a false
      // claim in structured data, not an omission.
    }),
    [],
  );

  return (
    <>
      <Seo meta={metaFor('googleWorkspace')} trail={TRAIL} jsonLd={[jsonLd]} />

      <PageHero
        trail={TRAIL}
        eyebrow="Google Workspace"
        architecturalLabel="PRODUCTIVITY / COLLABORATION"
        title="The suite where the collaboration actually happens."
        lead="Gmail, Drive, Docs, Sheets, Slides, Meet and Calendar, under one account and one admin. Axleta is a Google Cloud Partner: we introduce and sell the suite, and we administer it when you want that handled."
        aside={
          <div className="border-l-2 border-accent-600 pl-5">
            <Note>Partner status</Note>
            <p className="mt-3 text-sm leading-relaxed text-neutral-700">
              Google Cloud Partner for Google Cloud Platform and the Google
              productivity suite.
            </p>
            <ArrowLink
              to={external.googleCloud}
              external
              className="mt-4"
              onClick={() => track('cta_click', { label: 'gw_cloud' })}
            >
              About Google Cloud
            </ArrowLink>
          </div>
        }
      />

      {/* ---- What it is, stated plainly ---- */}
      <Section tight>
        <Shell>
          <Grid rails>
            <div className="col-span-4 md:col-span-8 lg:col-span-4">
              <Reveal>
                <Eyebrow index="01">What it is</Eyebrow>
                <Title className="mt-7">A productivity suite, not an ERP.</Title>
              </Reveal>
            </div>
            <div className="col-span-4 mt-10 md:col-span-8 lg:col-span-7 lg:col-start-6 lg:mt-0">
              <Reveal>
                <Prose
                  blocks={[
                    {
                      type: 'p',
                      text: 'Google Workspace is the set of web applications a team uses to write, store, share and meet. It is not a business management system and it will not run your accounts, stock or manufacturing. If that is what you need, that is ERP — see the solutions page.',
                    },
                    {
                      type: 'p',
                      text: 'It is relevant to Axleta clients for a specific reason: it is usually where the documents, shared drives and permissions that companion applications and integration work attach to. Teams running an ERP alongside a document suite hit fewer problems than teams trying to do both in one tool.',
                    },
                    {
                      type: 'note',
                      text: 'Published as a Google Cloud Partner. No Google or Workspace logo is reproduced here, and no pricing is quoted — both would go out of date, and the mark-use position is not ours to grant.',
                    },
                  ]}
                />
              </Reveal>
            </div>
          </Grid>
        </Shell>
      </Section>

      {/* ---- Use cases ---- */}
      <Section id="what-it-is-for" labelledBy="use-cases-title" tone="ink" tight>
        <Shell>
          <Grid rails>
            <div className="col-span-4 md:col-span-8 lg:col-span-4">
              <Reveal>
                <Eyebrow index="02" tone="ink" live>
                  What it is for
                </Eyebrow>
                <Title id="use-cases-title" tone="ink" className="mt-7">
                  Six reasons it shows up in our work.
                </Title>
                <ArchitecturalLabel tone="ink" className="mt-8">
                  PRACTICAL / NOT A FEATURE LIST
                </ArchitecturalLabel>
              </Reveal>
              <Reveal delay={0.14}>
                <CtaPair
                  className="mt-10"
                  tone="ink"
                  primary={{
                    to: routes.contact,
                    label: 'Talk about your setup',
                    onClick: () => track('cta_click', { label: 'gw_contact' }),
                  }}
                  secondary={{
                    to: external.googleWorkspace,
                    label: 'Google Workspace',
                    onClick: () => track('cta_click', { label: 'gw_product' }),
                  }}
                />
              </Reveal>
            </div>

            <div className="col-span-4 mt-12 md:col-span-8 lg:col-span-7 lg:col-start-6 lg:mt-0">
              <ul>
                {useCases.map((useCase, i) => (
                  <Reveal as="li" key={useCase.id} index={i} rule tone="ink">
                    <div className="py-7">
                      <Subtitle as="h3" tone="ink" className="text-2xl">
                        {useCase.label}
                      </Subtitle>
                      <p className="mt-3 max-w-xl leading-relaxed text-neutral-300">
                        {useCase.detail}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>
          </Grid>
        </Shell>
      </Section>

      {/* ---- Referral path ---- */}
      <Section id="getting-started" labelledBy="getting-started-title" tight>
        <Shell>
          <Grid rails>
            <div className="col-span-4 md:col-span-8 lg:col-span-5">
              <Reveal>
                <Eyebrow index="03">The path</Eyebrow>
                <Title id="getting-started-title" className="mt-7">
                  Look at it properly, then decide.
                </Title>
              </Reveal>
              <Reveal delay={0.12}>
                <ol className="mt-10">
                  {[
                    {
                      step: '01',
                      title: 'Look at the plans',
                      detail:
                        'The referral link below opens Google’s own plan comparison, with current pricing, feature limits and terms.',
                    },
                    {
                      step: '02',
                      title: 'Tell us the shape of your team',
                      detail:
                        'How many people, whether you already have a domain, and what currently holds your files. That is enough for a useful answer.',
                    },
                    {
                      step: '03',
                      title: 'Sign up through the link',
                      detail:
                        'You keep the relationship with Google for the subscription. Axleta is your partner, not your reseller of record.',
                    },
                    {
                      step: '04',
                      title: 'Decide about administration',
                      detail:
                        'Run it yourselves, or have us handle users, policy and the parts that need attention later. Agreed in writing either way.',
                    },
                  ].map((item) => (
                    <li key={item.step} className="flex gap-6 border-t border-line pt-7 pb-1">
                      <span className="label shrink-0 text-accent-700 tabular-nums">{item.step}</span>
                      <div>
                        <h3 className="font-display text-xl leading-snug tracking-tightest">
                          {item.title}
                        </h3>
                        <p className="mt-2 max-w-lg leading-relaxed text-neutral-700">
                          {item.detail}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>

                <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
                  <ButtonLink
                    to={external.googleWorkspaceReferral}
                    size="lg"
                    onClick={() => track('cta_click', { label: 'gw_referral' })}
                  >
                    View Google Workspace plans
                  </ButtonLink>
                  <p className="max-w-[16rem] text-sm leading-relaxed text-neutral-700">
                    Opens Google in a new tab. Pricing and terms are Google’s.
                  </p>
                </div>
              </Reveal>
            </div>

            <div className="col-span-4 mt-14 md:col-span-8 lg:col-span-5 lg:col-start-8 lg:mt-0">
              <Reveal delay={0.1}>
                <aside className="border-l-2 border-accent-600 bg-surface-sunken p-7">
                  <Note>On referrals</Note>
                  <p className="mt-4 leading-relaxed text-ink">
                    The referral link is tracked, so a subscription started through it
                    may be recognised back to Axleta by Google. We publish the link
                    because it is the partner route to the product — not because we
                    mark up the price. Axleta does not set or change Workspace pricing.
                  </p>
                </aside>
              </Reveal>
              <Reveal delay={0.18}>
                <Rule className="mt-12" />
                <div className="mt-8">
                  <Body>
                    Axleta’s own position on the wider platform is set out on the about
                    page, where both published partnerships are stated in type.
                  </Body>
                  <ArrowLink
                    to={routes.about}
                    className="mt-5"
                    onClick={() => track('cta_click', { label: 'gw_about' })}
                  >
                    Axleta and its ecosystem
                  </ArrowLink>
                </div>
              </Reveal>
            </div>
          </Grid>
        </Shell>
      </Section>

      {/* ---- Questions, answered honestly ---- */}
      <Section id="questions" labelledBy="questions-title" tone="sunken" tight>
        <Shell>
          <Grid rails>
            <div className="col-span-4 md:col-span-8 lg:col-span-4">
              <Reveal>
                <Eyebrow index="04">Questions</Eyebrow>
                <Title id="questions-title" className="mt-7">
                  The ones worth asking first.
                </Title>
                <Note className="mt-8">
                  Answered here rather than on a sales page. If yours is not on the
                  list,{' '}
                  <a href={routes.contact} className="underline underline-offset-4 hover:text-accent-700">
                    ask us directly
                  </a>
                  .
                </Note>
              </Reveal>
            </div>

            <div className="col-span-4 mt-12 md:col-span-8 lg:col-span-7 lg:col-start-6 lg:mt-0">
              {questions.map((question, i) => (
                <Disclosure key={question.label} summary={question.label} open={i === 0}>
                  <p>{question.detail}</p>
                </Disclosure>
              ))}

              <div className="mt-12">
                <Eyebrow index="··">Still deciding</Eyebrow>
                <p className="mt-5 max-w-xl leading-loose text-neutral-900">
                  If you are weighing this against keeping what you have, tell us what
                  is not working with it. {company.name} would rather answer that than
                  sell you a subscription.
                </p>
                <CtaPair
                  className="mt-8"
                  primary={{
                    to: `${routes.contact}?topic=${encodeURIComponent('Google Workspace')}`,
                    label: 'Ask about Workspace',
                    onClick: () => track('cta_click', { label: 'gw_ask' }),
                  }}
                  secondary={{ to: routes.solutions, label: 'See all solutions' }}
                />
              </div>
            </div>
          </Grid>
        </Shell>
      </Section>
    </>
  );
}