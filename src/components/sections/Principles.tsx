/**
 * Homepage: principles, ecosystem and insights.
 *
 * The brief asked for a "why Axleta" section. Because no statistics, testimonials
 * or case studies exist in the verified content, that section is expressed as
 * seven evidence-based principles instead — each one traceable to a published
 * capability. This is the honest substitute for social proof, and it reads
 * better than invented numbers would.
 */
import { partners, principles } from '../../data/company';
import { external, routes } from '../../data/site';
import { formatInsightDate, selectInsights } from '../../data/insights';
import { track } from '../../lib/analytics';
import { ArrowLink } from '../ui/Button';
import { Grid, Rule, Section, Shell } from '../ui/Layout';
import { Reveal } from '../ui/Reveal';
import { Body, Eyebrow, Note, Title } from '../ui/Typography';

/* ------------------------------------------------------------------ */

export function Principles() {
  return (
    <Section id="principles" labelledBy="principles-title" dataMarkers={['principles']}>
      <Shell>
        <Grid rails>
          <div className="col-span-4 md:col-span-8 lg:col-span-4">
            <Reveal>
              <Eyebrow index="07">Why Axleta</Eyebrow>
              <Title id="principles-title" className="mt-7">
                What we hold to.
              </Title>
              <Body className="mt-7">
                Every principle below is a description of something Axleta actually
                publishes it can do — not an aspiration and not a claim about
                results we cannot evidence.
              </Body>
            </Reveal>
          </div>

          <div className="col-span-4 mt-12 md:col-span-8 lg:col-span-8 lg:mt-0">
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
  );
}

/* ------------------------------------------------------------------ */

export function Ecosystem() {
  return (
    <Section id="ecosystem" tone="sunken" tight labelledBy="ecosystem-title" dataMarkers={['ecosystem']}>
      <Shell>
        <Reveal>
          <Eyebrow index="08">Technology ecosystem</Eyebrow>
        </Reveal>
        <Grid rails className="mt-8">
          <div className="col-span-4 md:col-span-8 lg:col-span-4">
            <Title id="ecosystem-title">Relationships, stated plainly.</Title>
            <Note className="mt-6">
              Technology names are the property of their respective owners. Partner logos
              are not reproduced here because no mark-use authorisation is held.
            </Note>
          </div>
          <div className="col-span-4 mt-10 md:col-span-8 lg:col-span-8 lg:mt-0">
            {partners.map((partner) => (
              <div
                key={partner.id}
                className="grid gap-x-8 gap-y-3 border-t border-line py-7 sm:grid-cols-[minmax(10rem,1fr)_2fr_auto] sm:items-baseline"
              >
                <div>
                  <p className="font-display text-2xl tracking-tightest">{partner.wordmark}</p>
                  <p className="label mt-1.5 text-accent-700">{partner.sublabel}</p>
                </div>
                <div>
                  <p className="font-medium">{partner.statement}</p>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-neutral-700">
                    {partner.detail}
                  </p>
                </div>
                <ArrowLink
                  to={partner.href}
                  external
                  onClick={() => track('cta_click', { label: `partner_${partner.id}` })}
                  className="shrink-0"
                >
                  {partner.linkLabel}
                </ArrowLink>
              </div>
            ))}
            <Rule className="mt-2" />
            <ArrowLink to={routes.googleWorkspace} className="mt-6">
              Google Workspace for collaborating teams
            </ArrowLink>
          </div>
        </Grid>
      </Shell>
    </Section>
  );
}

/* ------------------------------------------------------------------ */

export function InsightsFeature() {
  const selection = selectInsights(3);

  return (
    <Section id="insights" labelledBy="insights-title" tight dataMarkers={['insights']}>
      <Shell>
        <Grid rails>
          <div className="col-span-4 md:col-span-8 lg:col-span-4">
            <Reveal>
              <Eyebrow index="09">Insights</Eyebrow>
              <Title id="insights-title" className="mt-7">
                Notes from the Axleta blog.
              </Title>
              <Body className="mt-6">
                We have been writing about ERP, infrastructure and everyday IT for
                years. The archive is on our own blog — here is the most recent of it.
              </Body>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="mt-8 flex flex-wrap gap-x-7 gap-y-4">
                <ArrowLink to={routes.insights}>All insights</ArrowLink>
                <ArrowLink
                  to={external.blog}
                  external
                  onClick={() => track('external_blog_click', { label: 'insights_section' })}
                >
                  Visit the blog
                </ArrowLink>
              </div>
            </Reveal>
          </div>

          <div className="col-span-4 mt-12 md:col-span-8 lg:col-span-7 lg:col-start-6 lg:mt-0">
            {!selection ? (
              <p className="leading-relaxed text-neutral-700">
                The blog feed could not be read at build time. The archive is still
                available at{' '}
                <a
                  href={external.blog}
                  className="underline underline-offset-4 hover:text-accent-700"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  blog.axleta.com
                </a>
                .
              </p>
            ) : (
              <>
                {/* One featured article, full width — never a card grid */}
                <Reveal>
                  <a
                    href={selection.featured.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      track('insight_click', { title: selection.featured.title })
                    }
                    className="group block border-t-2 border-ink pt-7"
                  >
                    <p className="label flex flex-wrap items-center gap-x-4 gap-y-2 text-neutral-700">
                      <span className="text-accent-700">Latest</span>
                      <span>{selection.featured.category}</span>
                      <time dateTime={selection.featured.date}>
                        {formatInsightDate(selection.featured.date)}
                      </time>
                    </p>
                    <h3 className="mt-5 font-display text-3xl font-medium leading-snug tracking-tightest transition-colors duration-300 group-hover:text-accent-700 lg:text-[2.5rem]">
                      {selection.featured.title}
                    </h3>
                    <p className="measure mt-5 leading-relaxed text-neutral-700">
                      {selection.featured.excerpt}
                    </p>
                    <span className="label mt-6 inline-flex items-center gap-2 text-accent-700">
                      Read on the blog
                      <span
                        aria-hidden="true"
                        className="transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none"
                      >
                        →
                      </span>
                    </span>
                  </a>
                </Reveal>

                <ul className="mt-12 grid gap-x-8 gap-y-8 sm:grid-cols-2">
                  {selection.supporting.map((article, i) => (
                    <Reveal as="li" key={article.href} index={i} rule>
                      <a
                        href={article.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => track('insight_click', { title: article.title })}
                        className="group block pt-7"
                      >
                        <p className="label flex flex-wrap items-center gap-x-3 text-neutral-700">
                          <span className="text-accent-700">{article.category}</span>
                          <time dateTime={article.date}>{formatInsightDate(article.date)}</time>
                        </p>
                        <h4 className="mt-4 font-display text-xl leading-snug tracking-tightest transition-colors duration-300 group-hover:text-accent-700">
                          {article.title}
                        </h4>
                        <p className="mt-3 text-sm leading-relaxed text-neutral-700">
                          {article.excerpt}
                        </p>
                      </a>
                    </Reveal>
                  ))}
                </ul>
              </>
            )}
          </div>
        </Grid>
      </Shell>
    </Section>
  );
}
