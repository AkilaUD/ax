/**
 * Homepage: the architecture argument.
 *
 * One drawing, one paragraph of thesis, and the diagram. This is the section
 * that justifies the site: the four practice areas are not a menu, they are a
 * stack, and the stack only works if it is designed together.
 */
import { SystemArchitecture } from '../diagrams/SystemArchitecture';
import { ArrowLink } from '../ui/Button';
import { Grid, Section, Shell } from '../ui/Layout';
import { Reveal } from '../ui/Reveal';
import { Body, Eyebrow, Lead, Note, Title } from '../ui/Typography';
import { routes } from '../../data/site';

export function Architecture() {
  return (
    <Section id="architecture" labelledBy="architecture-title" tone="ink" dataMarkers={['unified-stack']}>
      <Shell>
        <Grid rails>
          <div className="col-span-4 md:col-span-8 lg:col-span-5">
            <Reveal>
              <Eyebrow index="05" tone="ink" live>
                How it fits
              </Eyebrow>
              <Title id="architecture-title" tone="ink" className="mt-7">
                One stack, not four departments.
              </Title>
              <Lead tone="ink" className="mt-8 text-neutral-300">
                Infrastructure carries the ERP. Companion applications extend it.
                Automation threads across both. Designing them separately is how
                businesses end up with a system nobody can maintain.
              </Lead>
            </Reveal>
            <Reveal delay={0.14}>
              <Body tone="ink" className="mt-7 text-neutral-300">
                We work from the bottom up. A partner application that ignores the
                network and the storage it depends on is a liability, and an
                automation that ignores the process it touches is a nuisance. Each
                layer is specified in the same conversation as the one below it.
              </Body>
            </Reveal>
            <Reveal delay={0.22}>
              <ArrowLink to={routes.services} tone="ink" className="mt-9">
                See the engagement model
              </ArrowLink>
            </Reveal>
          </div>

          <div className="col-span-4 mt-14 md:col-span-8 lg:col-span-7 lg:mt-0 lg:col-start-6">
            <Reveal delay={0.08}>
              <SystemArchitecture tone="ink" className="lg:sticky lg:top-28" />
              <Note tone="ink" className="mt-6">
                Plate 05 — the stack Axleta designs against
              </Note>
            </Reveal>
          </div>
        </Grid>
      </Shell>
    </Section>
  );
}
