/**
 * Homepage: the engagement model.
 *
 * The four stages as a traverse — a continuous numbered line with the stages
 * hung off it, rather than four equal cards. Each stage shows the services it
 * covers and the concrete output a client can expect at the end of it, which is
 * the honest way to present a delivery process.
 */
import { serviceStages } from '../../data/services';
import { routes } from '../../data/site';
import { track } from '../../lib/analytics';
import { ArrowLink } from '../ui/Button';
import { Grid, Section, Shell } from '../ui/Layout';
import { Reveal } from '../ui/Reveal';
import { ArchitecturalLabel, Body, Eyebrow, Note, Title } from '../ui/Typography';
import { cn } from '../../lib/utils';

export function Engagement() {
  return (
    <Section id="engagement" labelledBy="engagement-title" dataMarkers={['engagement-rail']}>
      <Shell>
        <Grid rails>
          <div className="col-span-4 md:col-span-8 lg:col-span-5">
            <Reveal>
              <Eyebrow index="06">How we engage</Eyebrow>
              <Title id="engagement-title" className="mt-7">
                Requirement first. Delivery second. Support after that.
              </Title>
              <Body className="mt-8">
                Four stages, in order. Each one produces something you can look at
                before the next one starts, and going live is the midpoint rather
                than the finish line.
              </Body>
            </Reveal>
            <Reveal delay={0.14}>
              <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
                <ArrowLink to={routes.services} onClick={() => track('cta_click', { label: 'engagement_all' })}>
                  All services
                </ArrowLink>
              </div>
              <Note className="mt-8">
                Published services: requirement analysis, ERP consultancy, strategic
                consultancy, customised add-on development, project management,
                resource allocation and SAP Business One support.
              </Note>
            </Reveal>
          </div>
        </Grid>

        {/* The traverse */}
        <ol className="mt-section-y-tight">
          {serviceStages.map((stage, i) => (
            <Reveal as="li" key={stage.id} index={i} className="relative">
              <div className="grid grid-cols-4 gap-x-6 gap-y-6 md:grid-cols-8 lg:grid-cols-12">
                {/* Node on the line */}
                <div className="col-span-4 md:col-span-1 lg:col-span-1">
                  <div className="flex items-center gap-4 lg:block">
                    <span className="label shrink-0 text-accent-700 tabular-nums">{stage.number}</span>
                    <span aria-hidden="true" className="block h-px flex-1 bg-line lg:mt-3 lg:h-px lg:w-full" />
                  </div>
                </div>

                <div className="col-span-4 md:col-span-7 lg:col-span-4">
                  <div className="pt-0 lg:pt-1">
                    <ArchitecturalLabel>{stage.architecturalLabel}</ArchitecturalLabel>
                    <h3 className="mt-5 font-display text-3xl font-medium leading-snug tracking-tightest">
                      {stage.title}
                    </h3>
                    <p className="mt-4 max-w-md leading-relaxed text-neutral-700">{stage.summary}</p>
                  </div>
                </div>

                <div className="col-span-4 md:col-span-8 md:col-start-2 lg:col-span-5 lg:col-start-8">
                  <dl className="grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                    {stage.services.map((service) => (
                      <div key={service.title} className="border-t border-line pt-4">
                        <dt className="label text-ink">{service.title}</dt>
                        <dd className="mt-2 text-sm leading-relaxed text-neutral-700">
                          {service.detail}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  <p
                    className={cn(
                      'mt-6 flex gap-3 border-l-2 border-accent-600 pl-4 text-sm leading-relaxed',
                    )}
                  >
                    <span className="label shrink-0 text-accent-700">Output</span>
                    <span className="text-neutral-900">{stage.output}</span>
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </Shell>
    </Section>
  );
}
