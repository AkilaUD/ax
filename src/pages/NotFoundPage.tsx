/**
 * 404.
 *
 * Doubles as the catch-all route and as the prerendered /404 document. It is
 * noindex (see pageMeta.notFound), which is the correct treatment for a
 * utility page that should never appear in results.
 *
 * The job here is to get someone to a real page in one action, so the layout is
 * a compact map of the site rather than a full editorial page.
 */
import { Link, useLocation } from 'react-router-dom';
import { external, routes } from '../data/site';
import { SeoTag as Seo } from '../lib/SeoTag';
import { metaFor } from '../lib/seo';
import { ArrowLink, ButtonLink, CtaPair } from '../components/ui/Button';
import { Grid, Rule, Section, Shell } from '../components/ui/Layout';
import { Reveal } from '../components/ui/Reveal';
import { Eyebrow, Note, Title } from '../components/ui/Typography';

const destinations = [
  { to: routes.home, label: 'Home', detail: 'What Axleta does and why' },
  { to: routes.solutions, label: 'Solutions', detail: 'ERP, applications, infrastructure, automation' },
  { to: routes.services, label: 'Services', detail: 'Discover, design, implement, improve' },
  { to: routes.about, label: 'About', detail: 'The company record and our principles' },
  { to: routes.insights, label: 'Insights', detail: 'Recent writing from the Axleta blog' },
  { to: routes.contact, label: 'Contact', detail: 'Tell us what you are trying to improve' },
] as const;

export default function NotFoundPage() {
  const location = useLocation();

  return (
    <>
      <Seo meta={metaFor('notFound')} />

      <Section tight className="pt-32 lg:pt-40">
        <Shell>
          <Grid rails>
            <div className="col-span-4 md:col-span-8 lg:col-span-7">
              <Reveal>
                <Eyebrow index="404" live>
                  Route not found
                </Eyebrow>
                <Title as="h1" className="mt-8 text-display leading-[0.95]">
                  That route is not on the map.
                </Title>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="measure mt-8 text-lead leading-loose text-neutral-700">
                  Nothing is served from{' '}
                  <code className="font-mono text-sm text-ink">{location.pathname}</code>. It
                  may have moved, or the link may be mistyped. Everything on the site is
                  listed on the right.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <CtaPair
                  className="mt-10"
                  primary={{ to: routes.home, label: 'Go to the homepage' }}
                  secondary={{ to: routes.contact, label: 'Report a broken link' }}
                />
              </Reveal>
            </div>

            <div className="col-span-4 mt-14 md:col-span-8 lg:col-span-4 lg:col-start-9 lg:mt-0">
              <Reveal>
                <Eyebrow index="··">Everywhere else</Eyebrow>
              </Reveal>
              <nav aria-label="Site pages" className="mt-6">
                <ul>
                  {destinations.map((destination, i) => (
                    <Reveal as="li" key={destination.to} index={i} rule className="pt-6">
                      <Link
                        to={destination.to}
                        className="group flex items-baseline justify-between gap-5"
                      >
                        <span>
                          <span className="font-display text-xl leading-snug tracking-tightest transition-colors duration-300 group-hover:text-accent-700">
                            {destination.label}
                          </span>
                          <span className="mt-1 block text-sm leading-relaxed text-neutral-700">
                            {destination.detail}
                          </span>
                        </span>
                        <span
                          aria-hidden="true"
                          className="shrink-0 text-accent-700 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none"
                        >
                          →
                        </span>
                      </Link>
                    </Reveal>
                  ))}
                </ul>
              </nav>

              <Rule className="mt-10" />
              <div className="mt-7">
                <Note>Older links</Note>
                <ArrowLink to={external.blog} external className="mt-4">
                  Axleta blog
                </ArrowLink>
              </div>
            </div>
          </Grid>
        </Shell>
      </Section>

      <Section tone="ink" tight>
        <Shell>
          <Grid rails>
            <div className="col-span-4 md:col-span-8 lg:col-span-7">
              <Reveal>
                <Title tone="ink" as="h2">
                  Found something we have not published?
                </Title>
                <p className="measure mt-6 leading-loose text-neutral-300">
                  Some of our writing lives on the Axleta blog rather than on this site,
                  and older addresses from the previous website redirect here. If a link
                  you followed led to this page, tell us and we will fix it.
                </p>
              </Reveal>
            </div>
            <div className="col-span-4 mt-10 md:col-span-8 lg:col-span-4 lg:col-start-9 lg:mt-0">
              <Reveal delay={0.1}>
                <ButtonLink to={routes.contact} variant="quiet" size="lg" onClick={() => undefined}>
                  Report a broken link
                </ButtonLink>
              </Reveal>
            </div>
          </Grid>
        </Shell>
      </Section>
    </>
  );
}