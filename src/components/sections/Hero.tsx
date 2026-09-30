/**
 * The homepage entry point: an operating view of the system, not a brochure
 * cover. The static console is the first meaningful paint; WebGL is optional
 * atmosphere layered behind it on capable desktop devices.
 */
import { motion } from 'motion/react';
import { company } from '../../data/company';
import { contact, routes } from '../../data/site';
import { heroTimeline, duration, ease } from '../../lib/motion';
import { track } from '../../lib/analytics';
import { usePrefersReducedMotion } from '../../hooks/useMotionMode';
import { LazyHeroScene } from '../three/LazyHeroScene';
import { ArrowLink, CtaPair } from '../ui/Button';
import { Shell } from '../ui/Layout';
import { Eyebrow, Lead } from '../ui/Typography';
import { HeroConsoleIndex, HeroSystemConsole } from './HeroSystemConsole';

export function Hero() {
  const reduced = usePrefersReducedMotion();

  const rise = (delay: number) => ({
    initial: reduced ? { opacity: 1 } : { opacity: 0, y: 26 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: reduced ? 0 : duration.reveal,
      delay: reduced ? 0 : delay,
      ease: ease.entrance,
    },
  });

  return (
    <section
      data-surface="ink"
      data-system-field
      data-command-hero
      data-static-first="true"
      data-motion-mode="adaptive"
      aria-labelledby="hero-title"
      className="command-hero surface-ink relative isolate overflow-hidden pb-10 pt-32 lg:min-h-dvh lg:pb-12"
    >
      <div aria-hidden="true" className="command-hero__grid" />
      <div aria-hidden="true" className="command-hero__scanline" />

      <div
        aria-hidden="true"
        data-webgl-fallback
        className="pointer-events-none absolute inset-y-0 right-0 z-0 w-full opacity-30 lg:w-[54%] lg:opacity-55"
      >
        <LazyHeroScene className="absolute inset-0" />
      </div>

      <Shell className="relative z-10 w-full">
        <div className="command-hero__meta">
          <motion.div {...rise(heroTimeline.eyebrowAt)}>
            <Eyebrow index="01" tone="ink" live>
              Technology and advancement / est. {company.founded}
            </Eyebrow>
          </motion.div>
          <motion.p {...rise(heroTimeline.eyebrowAt + 0.08)} className="label text-neutral-500">
            Operating architecture for SMEs
          </motion.p>
        </div>

        <div className="command-hero__layout">
          <div className="command-hero__copy">
            <motion.h1
              id="hero-title"
              className="command-hero__title"
              initial={reduced ? { opacity: 1 } : { opacity: 0, y: 34 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reduced ? 0 : duration.reveal * 1.15,
                delay: reduced ? 0 : heroTimeline.headlineAt,
                ease: ease.entrance,
              }}
            >
              <span className="block">The systems</span>
              <span className="block text-accent-300">behind the business.</span>
              <span className="command-hero__title-line">Designed. Connected. Kept running.</span>
            </motion.h1>

            <motion.div {...rise(heroTimeline.ledeAt)} className="command-hero__lede">
              <p className="label text-accent-300">ERP / APPLICATIONS / INFRASTRUCTURE / AUTOMATION</p>
              <Lead tone="ink" className="mt-6 max-w-xl text-neutral-300">
                Axleta connects the systems that keep an SME moving: SAP Business One and
                S/4HANA Public Cloud, the applications around them, the infrastructure below
                them, and the automation between them.
              </Lead>
            </motion.div>

            <motion.div {...rise(heroTimeline.actionsAt)} className="mt-10">
              <CtaPair
                tone="ink"
                primary={{
                  to: routes.contact,
                  label: 'Discuss requirements',
                  onClick: () => track('cta_click', { label: 'hero_discuss' }),
                }}
                secondary={{
                  to: routes.solutions,
                  label: 'Explore the system',
                  onClick: () => track('cta_click', { label: 'hero_solutions' }),
                }}
              />
            </motion.div>

            <motion.div {...rise(heroTimeline.actionsAt + 0.12)} className="command-hero__contact">
              <span className="label text-neutral-500">Direct line</span>
              <a
                href={`mailto:${contact.email}`}
                className="label text-paper underline-offset-4 hover:text-accent-300 hover:underline"
              >
                {contact.email}
              </a>
              <span className="command-hero__contact-rule" aria-hidden="true" />
              <span className="label text-neutral-500">{contact.coverage}</span>
            </motion.div>
          </div>

          <motion.div {...rise(0.72)} className="command-hero__visual">
            <HeroSystemConsole />
            <HeroConsoleIndex />
          </motion.div>
        </div>

        <motion.div {...rise(1.05)} className="command-hero__footer">
          <ArrowLink to={routes.about} tone="ink">
            Why Axleta
          </ArrowLink>
          <span className="label text-neutral-500">The business system, treated as a system</span>
          <span className="label text-accent-300">Scroll to inspect / 01</span>
        </motion.div>
      </Shell>
    </section>
  );
}
