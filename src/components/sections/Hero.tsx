/**
 * Company-first homepage entry point. GSAP choreographs the editorial reveal
 * and the capability field; there is no product dashboard or WebGL dependency
 * in the first viewport.
 */
import gsap from 'gsap';
import { Link } from 'react-router-dom';
import { company } from '../../data/company';
import { contact, routes } from '../../data/site';
import { track } from '../../lib/analytics';
import { useGsapContext } from '../../hooks/useGsapContext';
import { usePrefersReducedMotion } from '../../hooks/useMotionMode';
import { ArrowLink, CtaPair } from '../ui/Button';
import { Shell } from '../ui/Layout';
import { Eyebrow, Lead } from '../ui/Typography';
import { CompanyCapabilityField } from './CompanyCapabilityField';

export function Hero() {
  const reduced = usePrefersReducedMotion();
  const scope = useGsapContext(() => {
    const revealTargets = '[data-hero-reveal]';

    if (reduced) {
      gsap.set(revealTargets, { clearProps: 'all' });
      return;
    }

    gsap
      .timeline({ defaults: { ease: 'power3.out' } })
      .fromTo('[data-hero-rule]', { scaleX: 0, transformOrigin: 'left center' }, { scaleX: 1, duration: 0.8 })
      .fromTo(revealTargets, { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.65, stagger: 0.08 }, '-=0.42');
  }, [reduced]);

  return (
    <section
      ref={scope}
      data-surface="ink"
      data-system-field
      data-company-hero
      data-static-first="true"
      data-motion-mode="adaptive"
      aria-labelledby="hero-title"
      className="company-hero surface-ink relative isolate overflow-hidden pb-10 pt-32 lg:min-h-dvh lg:pb-12"
    >
      <div aria-hidden="true" className="company-hero__grid" />
      <div aria-hidden="true" className="company-hero__rule" data-hero-rule />

      <Shell className="relative z-10 w-full">
        <div className="company-hero__meta" data-hero-reveal>
          <Eyebrow index="01" tone="ink" live>
            Technology and advancement / est. {company.founded}
          </Eyebrow>
          <span className="label text-neutral-500">An independent technology company for SMEs</span>
        </div>

        <div className="company-hero__layout">
          <div className="company-hero__copy">
            <h1 id="hero-title" className="company-hero__title" data-hero-reveal>
              <span className="block text-accent-300">Technology and advancement</span>
              <span className="block">for SME operations.</span>
            </h1>

            <div className="company-hero__lede" data-hero-reveal>
              <p className="label text-accent-300">THE COMPANY / THE CAPABILITIES / THE CONTINUITY</p>
              <Lead tone="ink" className="mt-6 max-w-xl text-neutral-300">
                Axleta designs and keeps running the technology around a business: ERP,
                companion applications, infrastructure, cloud, automation and integration.
                The right system is the one that fits the way your people work.
              </Lead>
            </div>

            <div className="mt-10" data-hero-reveal>
              <CtaPair
                tone="ink"
                primary={{
                  to: routes.contact,
                  label: 'Start a conversation',
                  onClick: () => track('cta_click', { label: 'hero_discuss' }),
                }}
                secondary={{
                  to: routes.about,
                  label: 'Meet Axleta',
                  onClick: () => track('cta_click', { label: 'hero_about' }),
                }}
              />
            </div>

            <div className="company-hero__contact" data-hero-reveal>
              <span className="label text-neutral-500">Direct line</span>
              <a
                href={`mailto:${contact.email}`}
                className="label text-paper underline-offset-4 hover:text-accent-300 hover:underline"
              >
                {contact.email}
              </a>
              <span className="company-hero__contact-rule" aria-hidden="true" />
              <span className="label text-neutral-500">{contact.coverage}</span>
            </div>
          </div>

          <div className="company-hero__visual" data-hero-reveal>
            <CompanyCapabilityField />
          </div>
        </div>

        <div className="company-hero__footer" data-hero-reveal>
          <ArrowLink to={routes.solutions} tone="ink">
            Explore what we do
          </ArrowLink>
          <Link to={routes.insights} className="label text-neutral-500 hover:text-accent-300">
            Ideas, systems and practice →
          </Link>
          <span className="label text-accent-300">Scroll / 01</span>
        </div>
      </Shell>
    </section>
  );
}
