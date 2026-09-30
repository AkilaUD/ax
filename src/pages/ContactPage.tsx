/**
 * /contact.
 *
 * The form is the primary element, not a footnote. The verified contact details
 * sit beside it as always-available alternatives, because a contact page that
 * only works when JavaScript and an endpoint are both present is not a contact
 * page.
 *
 * `?topic=` on the URL preselects the enquiry area, which is how the solution
 * and service pages deep-link into a specific conversation.
 */
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { company } from '../data/company';
import { contact, routes } from '../data/site';
import { track } from '../lib/analytics';
import { SeoTag as Seo } from '../lib/SeoTag';
import { metaFor } from '../lib/seo';
import { ContactForm } from '../components/contact/ContactForm';
import { PageHero } from '../components/layout/PageHero';
import { Grid, Rule, Section, Shell } from '../components/ui/Layout';
import { Reveal } from '../components/ui/Reveal';
import { Body, Eyebrow, Note, Title } from '../components/ui/Typography';

const TRAIL = [
  { name: 'Home', path: routes.home },
  { name: 'Contact', path: routes.contact },
];

export default function ContactPage() {
  const [params] = useSearchParams();
  const topic = params.get('topic') ?? undefined;

  const jsonLd = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'Contact Axleta',
      url: `${routes.contact}`,
      mainEntity: {
        '@type': 'Organization',
        name: company.name,
        email: contact.email,
        address: {
          '@type': 'PostalAddress',
          streetAddress: contact.address.street,
          addressLocality: contact.address.locality,
          addressRegion: contact.address.region,
          postalCode: contact.address.postalCode,
          addressCountry: contact.address.countryCode,
        },
      },
    }),
    [],
  );

  return (
    <>
      <Seo meta={metaFor('contact')} trail={TRAIL} jsonLd={[jsonLd]} />

      <PageHero
        trail={TRAIL}
        eyebrow="Contact"
        architecturalLabel="ENQUIRY / DIRECT"
        title="Tell us what you are trying to improve."
        lead="The more specific the requirement, the more useful our first reply will be. What the process looks like now, what is not working, and any deadline you are working to."
        aside={
          <div className="border-l-2 border-accent-600 pl-5">
            <Note>Consultation</Note>
            <p className="mt-3 text-sm leading-relaxed text-neutral-700">
              The first conversation is about the requirement. We work out the fit
              before anyone discusses a purchase order.
            </p>
          </div>
        }
      />

      <Section tight>
        <Shell>
          <Grid rails>
            <div className="col-span-4 md:col-span-8 lg:col-span-7">
              <Reveal>
                <ContactForm preselectTopic={topic} />
              </Reveal>
            </div>

            {/* Always-available alternatives */}
            <div className="col-span-4 mt-14 md:col-span-8 lg:col-span-4 lg:col-start-9 lg:mt-0">
              <Reveal>
                <Eyebrow index="··">Other ways to reach us</Eyebrow>
              </Reveal>

              <Reveal index={1} rule className="mt-6">
                <div className="pt-7">
                  <Note>Email</Note>
                  <a
                    href={`mailto:${contact.email}`}
                    onClick={() => track('cta_click', { label: 'contact_email' })}
                    className="mt-2 block font-display text-xl tracking-tightest underline-offset-4 hover:text-accent-700 hover:underline"
                  >
                    {contact.email}
                  </a>
                </div>
              </Reveal>

              <Reveal index={2} rule className="mt-8">
                <div className="pt-7">
                  <Note>WhatsApp</Note>
                  <a
                    href={contact.whatsapp.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => track('cta_click', { label: 'contact_whatsapp' })}
                    className="mt-2 block font-display text-xl tracking-tightest underline-offset-4 hover:text-accent-700 hover:underline"
                  >
                    {contact.whatsapp.display}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </div>
              </Reveal>

              <Reveal index={3} rule className="mt-8">
                <address className="pt-7 not-italic">
                  <Note>{contact.address.label}</Note>
                  <p className="mt-2 leading-relaxed text-ink">
                    {contact.address.street}
                    <br />
                    {contact.address.locality}, {contact.address.region}{' '}
                    {contact.address.postalCode}
                    <br />
                    {contact.address.country}
                  </p>
                </address>
              </Reveal>

              <Reveal index={4} rule className="mt-8">
                <div className="pt-7">
                  <Note>Coverage</Note>
                  <p className="mt-2 leading-relaxed text-ink">{contact.coverage}</p>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-700">
                    SAP Business One support is provided wherever the business is. Only
                    the address above is published; no map is embedded and no second
                    office is implied.
                  </p>
                </div>
              </Reveal>

              <Rule className="mt-10" />
              <Note className="mt-6">
                What you send us is used to answer your enquiry. See the{' '}
                <a href={routes.privacy} className="underline underline-offset-4 hover:text-accent-700">
                  privacy policy
                </a>
                .
              </Note>
            </div>
          </Grid>
        </Shell>
      </Section>

      {/* A closing promise rather than a second CTA */}
      <Section tone="ink" tight>
        <Shell>
          <Grid rails>
            <div className="col-span-4 md:col-span-8 lg:col-span-7">
              <Reveal>
                <Title tone="ink">What happens after you write.</Title>
                <div className="mt-8 space-y-6">
                  {[
                    {
                      step: '01',
                      title: 'We read the requirement',
                      detail:
                        'If something is unclear, we ask about it. We do not send a proposal from a template.',
                    },
                    {
                      step: '02',
                      title: 'We map the requirement to a route',
                      detail:
                        'Which platform, which add-ons, which infrastructure work, and what it does not need.',
                    },
                    {
                      step: '03',
                      title: 'You get a scoped plan',
                      detail:
                        'Written with specific, measurable, achievable, realistic and time-bound objectives — the SMART framing Axleta works to.',
                    },
                  ].map((item) => (
                    <div key={item.step} className="flex gap-6 border-t border-white/12 pt-6">
                      <span className="label shrink-0 text-accent-300 tabular-nums">{item.step}</span>
                      <div>
                        <h3 className="font-display text-xl leading-snug tracking-tightest">
                          {item.title}
                        </h3>
                        <p className="mt-2 max-w-lg leading-relaxed text-neutral-300">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
            <div className="col-span-4 mt-12 md:col-span-8 lg:col-span-4 lg:col-start-9 lg:mt-0">
              <Reveal delay={0.12}>
                <Eyebrow index="··" tone="ink" live>
                  Before you write
                </Eyebrow>
                <Body tone="ink" className="mt-5 text-neutral-300">
                  If you are not sure which area your requirement belongs to, that is
                  fine — leave the topic blank and describe the process instead.
                </Body>
              </Reveal>
            </div>
          </Grid>
        </Shell>
      </Section>
    </>
  );
}