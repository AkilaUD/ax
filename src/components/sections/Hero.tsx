/**
 * Hero.
 *
 * Ink ground, oversized Archivo display setting, and the Axleta axis on the
 * right. The axis is drawn as SVG and always present — `HeroScene` layers a
 * WebGL version on top only when the motion policy allows it, and fades the SVG
 * out when the canvas has taken over.
 *
 * The headline is a single assertive statement, not a slogan with a subtitle.
 * Copy is taken from the verified positioning: the systems behind the business,
 * designed and kept running.
 */
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { company } from '../../data/company';
import { contact, routes } from '../../data/site';
import { solutions } from '../../data/solutions';
import { heroTimeline, duration, ease } from '../../lib/motion';
import { track } from '../../lib/analytics';
import { AxletaAxis } from '../diagrams/AxletaAxis';
import { usePrefersReducedMotion } from '../../hooks/useMotionMode';
import { LazyHeroScene } from '../three/LazyHeroScene';
import { ArrowLink, CtaPair } from '../ui/Button';
import { Shell } from '../ui/Layout';
import { ArchitecturalLabel, Eyebrow, Lead } from '../ui/Typography';

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
      data-motion-mode="adaptive"
      aria-labelledby="hero-title"
      className="surface-ink relative isolate flex min-h-[92svh] items-end overflow-hidden pb-section-y-tight pt-32 lg:min-h-dvh"
    >
      {/* Ground texture: the coordinate rail, faint, as a drafting guide */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
          backgroundSize: 'calc(100% / 12) 100%, 100% 12rem',
        }}
      />

      {/* The axis, right side, plus its WebGL counterpart */}
      <div
        aria-hidden="true"
        data-webgl-fallback
        className="pointer-events-none absolute -right-[18%] top-1/2 aspect-square w-[130%] max-w-none -translate-y-1/2 opacity-70 sm:right-[-8%] sm:w-[78%] lg:right-[-2%] lg:w-[46%] lg:opacity-100"
      >
        <AxletaAxis className="absolute inset-0" animate={false} />
        <LazyHeroScene className="absolute inset-0" />
      </div>

      <Shell className="relative z-10 w-full">
        <div className="grid grid-cols-4 gap-x-6 gap-y-12 md:grid-cols-8 lg:grid-cols-12">
          <div className="col-span-4 md:col-span-8 lg:col-span-8">
            <motion.div {...rise(heroTimeline.eyebrowAt)}>
              <Eyebrow index="01" tone="ink" live>
                Technology and advancement · est. {company.founded}
              </Eyebrow>
            </motion.div>

            <motion.h1
              id="hero-title"
              className="mt-8 max-w-[16ch] text-hero font-display font-medium leading-[0.92] tracking-tightest"
              initial={reduced ? { opacity: 1 } : { opacity: 0, y: 34 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reduced ? 0 : duration.reveal * 1.15,
                delay: reduced ? 0 : heroTimeline.headlineAt,
                ease: ease.entrance,
              }}
            >
              <span className="block">The systems</span>
              <span className="block text-accent-300">behind the business,</span>
              <span className="block">designed and kept running.</span>
            </motion.h1>

            <motion.div {...rise(heroTimeline.ledeAt)} className="mt-10">
              <ArchitecturalLabel tone="ink">
                ERP · APPLICATIONS · INFRASTRUCTURE · AUTOMATION
              </ArchitecturalLabel>
              <Lead tone="ink" className="mt-6 max-w-2xl text-neutral-300">
                Axleta supplies technology-driven systems and solutions for SMEs — SAP Business
                One and S/4HANA Public Cloud, the companion applications that extend them, the
                infrastructure they run on, and the automation that removes the re-keying.
                Chosen for fitness of purpose, and supported afterwards.
              </Lead>
            </motion.div>

            <motion.div {...rise(heroTimeline.actionsAt)} className="mt-11">
              <CtaPair
                tone="ink"
                primary={{
                  to: routes.contact,
                  label: 'Discuss requirements',
                  onClick: () => track('cta_click', { label: 'hero_discuss' }),
                }}
                secondary={{
                  to: routes.solutions,
                  label: 'See the solutions',
                  onClick: () => track('cta_click', { label: 'hero_solutions' }),
                }}
              />
            </motion.div>

            <motion.div
              {...rise(heroTimeline.actionsAt + 0.12)}
              className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3"
            >
              <span className="label text-neutral-500">Or reach us directly</span>
              <a
                href={`mailto:${contact.email}`}
                className="label text-paper underline-offset-4 hover:text-accent-300 hover:underline"
              >
                {contact.email}
              </a>
              <span aria-hidden="true" className="h-px w-6 bg-white/20" />
              <span className="label text-neutral-500">
                Supporting {contact.coverage}
              </span>
            </motion.div>
          </div>

          {/* Hero footnote: the four areas, listed, not cards */}
          <motion.aside
            {...rise(0.95)}
            className="col-span-4 md:col-span-8 lg:col-span-3 lg:col-start-10 lg:self-end"
          >
            <p className="label text-neutral-500">Four areas of practice</p>
            <ol className="mt-5 space-y-3">
              {solutions.map((solution) => (
                <li key={solution.id}>
                  <Link
                    to={`${routes.solutions}#${solution.anchor}`}
                    className="group flex items-baseline gap-4 border-l border-white/15 py-1.5 pl-4 transition-colors duration-300 hover:border-accent-300"
                  >
                    <span className="label w-6 shrink-0 text-accent-300 tabular-nums">
                      {solution.number}
                    </span>
                    <span className="font-display text-lg tracking-tightest text-paper transition-colors duration-300 group-hover:text-accent-300">
                      {solution.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
            <ArrowLink to={routes.about} tone="ink" className="mt-7">
              Why Axleta
            </ArrowLink>
          </motion.aside>
        </div>
      </Shell>
    </section>
  );
}
