/**
 * /terms and /privacy.
 *
 * One component, two documents, driven by `legalDocuments` in content/legal.ts.
 * The route passes `kind`; App.tsx wires /terms and /privacy to it.
 *
 * Layout choice: a sticky clause index rather than a coordinate rail, because
 * legal pages are read linearly and referenced by clause number — so the clause
 * number is the anchor, and the index stays available while scrolling.
 */
import { useMemo } from 'react';
import { legalDocuments, type LegalKind } from '../content/legal';
import { routes } from '../data/site';
import { SeoTag as Seo } from '../lib/SeoTag';
import { metaFor } from '../lib/seo';
import { CompactHero } from '../components/layout/PageHero';
import { ArrowLink } from '../components/ui/Button';
import { Grid, Section, Shell } from '../components/ui/Layout';
import { Prose } from '../components/ui/Prose';
import { Reveal } from '../components/ui/Reveal';
import { Eyebrow, Note, Title } from '../components/ui/Typography';

const otherRoute = {
  terms: routes.privacy,
  privacy: routes.terms,
} as const;

const otherLabel = {
  terms: 'Read the privacy policy',
  privacy: 'Read the terms & conditions',
} as const;

export default function LegalPage({ kind }: { kind: LegalKind }) {
  const doc = legalDocuments[kind];

  const trail = useMemo(
    () => [
      { name: 'Home', path: routes.home },
      { name: doc.title, path: kind === 'terms' ? routes.terms : routes.privacy },
    ],
    [doc.title, kind],
  );

  return (
    <div data-legal-surface={kind} data-diagram-fallback>
      <Seo meta={metaFor(kind)} trail={trail} />

      <CompactHero
        trail={trail}
        eyebrow={doc.eyebrow}
        title={doc.title}
        lead={doc.lead}
        reviewed={doc.reviewed}
      />

      {/* Summary, before the clauses */}
      <Section tight className="pt-0">
        <Shell>
          <Grid rails>
            <div className="col-span-4 md:col-span-8 lg:col-span-4">
              <Reveal>
                <Eyebrow index="··">In short</Eyebrow>
                <Title as="h2" className="mt-7 text-title">
                  The summary.
                </Title>
                <Note className="mt-8">
                  The full text is below. If the summary and the full text ever
                  disagree, the full text governs.
                </Note>
                <ArrowLink to={otherRoute[kind]} className="mt-7">
                  {otherLabel[kind]}
                </ArrowLink>
              </Reveal>
            </div>
            <div className="col-span-4 mt-12 md:col-span-8 lg:col-span-7 lg:col-start-6 lg:mt-0">
              <ul>
                {doc.summary.map((point, i) => (
                  <Reveal as="li" key={point} index={i} rule className="pt-7">
                    <p className="text-body leading-body text-neutral-900">{point}</p>
                  </Reveal>
                ))}
              </ul>
            </div>
          </Grid>
        </Shell>
      </Section>

      {/* The clauses */}
      <Section id="clauses" tight tone="sunken">
        <Shell>
          <Grid rails>
            {/* Clause index — real anchors, keyed by clause number */}
            <nav aria-label="Clause index" className="col-span-4 lg:col-span-3">
              <div className="lg:sticky lg:top-28">
                <Eyebrow index="··">Clauses</Eyebrow>
                <ol className="mt-7 space-y-1">
                  {doc.sections.map((section) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="label group flex items-baseline gap-3 py-1.5 transition-colors duration-300 hover:text-accent-700"
                      >
                        <span className="w-5 shrink-0 text-right text-accent-700 tabular-nums">
                          {section.number}
                        </span>
                        <span className="leading-snug text-neutral-700 group-hover:text-ink">
                          {section.heading}
                        </span>
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </nav>

            {/* Clause bodies */}
            <div className="col-span-4 mt-14 md:col-span-8 lg:col-span-8 lg:col-start-5 lg:mt-0">
              {doc.sections.map((section, i) => (
                <Reveal key={section.id} index={i} rule>
                  <section
                    id={section.id}
                    aria-labelledby={`${section.id}-heading`}
                    className="scroll-mt-28 pt-12"
                  >
                    <div className="flex items-baseline gap-5">
                      <span className="label shrink-0 text-accent-700 tabular-nums">
                        {section.number}
                      </span>
                      <h2
                        id={`${section.id}-heading`}
                        className="font-display text-2xl font-medium leading-snug tracking-tightest sm:text-3xl"
                      >
                        {section.heading}
                      </h2>
                    </div>
                    <div className="mt-6 pl-0 sm:pl-12">
                      <Prose blocks={section.blocks} />
                    </div>
                  </section>
                </Reveal>
              ))}

              <p className="label mt-14 border-t border-line-strong pt-8 text-neutral-700">
                End of {doc.title.toLowerCase()} · last reviewed{' '}
                <time dateTime={doc.reviewed}>{doc.reviewed}</time>
              </p>
            </div>
          </Grid>
        </Shell>
      </Section>
    </div>
  );
}
