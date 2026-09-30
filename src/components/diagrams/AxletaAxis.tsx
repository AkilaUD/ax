/**
 * Signature A — the Axleta axis.
 *
 * The static SVG is always rendered and is the poster frame for the WebGL hero
 * (`components/three/HeroScene.tsx`). It is drawn from the same geometry as the
 * 3D scene: a stack of concentric rings on a tilted axis, with a signal node
 * travelling the circumference.
 *
 * This is not a placeholder. If WebGL is unavailable, blocked, or refused by a
 * reduced-motion preference, this is what the visitor sees — and it carries the
 * full meaning of the hero without needing to animate.
 */
import { motion } from 'motion/react';
import { useRef } from 'react';
import { duration, ease } from '../../lib/motion';
import { useInView } from '../../hooks/useGsapContext';
import { usePrefersReducedMotion } from '../../hooks/useMotionMode';

const RING_COUNT = 5;

export function AxletaAxis({ className, animate = true }: { className?: string; animate?: boolean }) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, threshold: 0.05 });
  const running = animate && seen && !reduced;

  return (
    <div
      ref={ref}
      className={className}
      aria-hidden="true"
      data-diagram-fallback
      data-motion-mode="adaptive"
    >
      <motion.svg
        viewBox="0 0 600 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
        initial={reduced ? { opacity: 1 } : { opacity: 0, scale: 0.96 }}
        animate={{ opacity: running || reduced ? 1 : 0, scale: 1 }}
        transition={{ duration: duration.reveal, ease: ease.entrance }}
      >
        <defs>
          <linearGradient id="axis-fade" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--color-accent-400)" stopOpacity="0.9" />
            <stop offset="55%" stopColor="var(--color-accent-300)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="var(--color-accent-300)" stopOpacity="0.12" />
          </linearGradient>
          <radialGradient id="axis-core" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="var(--color-accent-300)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="var(--color-accent-300)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Axis — the axle the whole metaphor turns on */}
        <motion.line
          x1="300"
          y1="52"
          x2="300"
          y2="548"
          stroke="url(#axis-fade)"
          strokeWidth="1"
          initial={reduced ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          animate={running || reduced ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: duration.reveal * 1.4, ease: ease.line }}
        />

        {/* Concentric rings, tilted like an axle seen off-axis */}
        {Array.from({ length: RING_COUNT }, (_, i) => {
          const rx = 92 + i * 52;
          const ry = rx * 0.3;
          const delay = running ? 0.16 + i * 0.09 : 0;

          return (
            <motion.ellipse
              key={i}
              cx="300"
              cy="300"
              rx={rx}
              ry={ry}
              stroke="var(--color-accent-300)"
              strokeWidth={i === RING_COUNT - 1 ? 1.4 : 1}
              strokeOpacity={0.75 - i * 0.11}
              initial={reduced ? { scaleX: 0.2, opacity: 0.6 } : { scaleX: 0.2, opacity: 0 }}
              animate={
                running || reduced
                  ? { scaleX: 1, opacity: 0.75 - i * 0.11 }
                  : {}
              }
              style={{ transformOrigin: '300px 300px' }}
              transition={{
                duration: duration.slow,
                delay,
                ease: ease.entrance,
              }}
            />
          );
        })}

        {/* Radial spokes tying the rings to the axis */}
        {Array.from({ length: RING_COUNT }, (_, i) => {
          const rx = 92 + i * 52;
          return (
            <line
              key={`spoke-${i}`}
              x1={300 - rx}
              y1={300}
              x2={300 + rx}
              y2={300}
              stroke="var(--color-accent-300)"
              strokeWidth="0.6"
              strokeOpacity={0.16}
            />
          );
        })}

        {/* Core — the business itself */}
        <circle cx="300" cy="300" r="64" fill="url(#axis-core)" />

        {/* Signal node travelling the outer ring */}
        {running ? (
          <motion.g
            animate={{ rotate: 360 }}
            transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
            style={{ transformOrigin: '300px 300px' }}
          >
            <circle cx="600" cy="300" r="4.5" fill="var(--color-accent-300)" />
            <circle cx="600" cy="300" r="11" stroke="var(--color-accent-300)" strokeOpacity="0.35" />
          </motion.g>
        ) : (
          <circle cx="548" cy="300" r="4.5" fill="var(--color-accent-300)" />
        )}

        {/* Axis end caps — the hub */}
        <circle cx="300" cy="52" r="3.5" fill="var(--color-accent-300)" fillOpacity="0.8" />
        <circle cx="300" cy="548" r="3.5" fill="var(--color-accent-300)" fillOpacity="0.8" />

        {/* Tick annotations, as on a drawing */}
        <g stroke="var(--color-paper)" strokeOpacity="0.28" strokeWidth="0.75">
          <line x1="248" y1="52" x2="248" y2="548" strokeDasharray="2 6" />
        </g>
        <text
          x="238"
          y="56"
          textAnchor="end"
          fill="var(--color-paper)"
          fillOpacity="0.45"
          fontFamily="var(--font-mono)"
          fontSize="9"
          letterSpacing="1.4"
        >
          AXLETA / AXIS
        </text>
      </motion.svg>
    </div>
  );
}
