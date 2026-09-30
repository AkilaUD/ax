/**
 * The system architecture plate.
 *
 * A single drawing that shows how the four solution areas relate: the
 * infrastructure carries the ERP, companion applications extend it, and
 * automation threads across all three. It is the diagram the whole site argues
 * for, and it appears on the homepage and again on /solutions.
 *
 * Scroll-driven: the horizontal traversal line draws as the plate scrolls into
 * view, with each layer revealing in sequence. Under reduced motion the plate
 * renders complete and static.
 */
import { motion } from 'motion/react';
import { useRef } from 'react';
import { duration, ease, stagger } from '../../lib/motion';
import { useInView } from '../../hooks/useGsapContext';
import { usePrefersReducedMotion } from '../../hooks/useMotionMode';
import { solutions } from '../../data/solutions';

const LAYERS = [
  { id: 'automation', label: 'AUTOMATION', note: 'Workflow / RPA / Integration' },
  { id: 'applications', label: 'APPLICATIONS', note: 'PLM / Assets / Analytics / Barcode' },
  { id: 'erp', label: 'ERP', note: 'SAP Business One / S/4HANA Public Cloud' },
  { id: 'infrastructure', label: 'INFRASTRUCTURE', note: 'Private cloud / Network / Storage / Security' },
] as const;

export function SystemArchitecture({
  className,
  tone = 'ink',
}: {
  className?: string;
  tone?: 'paper' | 'ink';
}) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, threshold: 0.15 });
  const running = seen && !reduced;

  const stroke = tone === 'ink' ? 'var(--color-accent-300)' : 'var(--color-accent-700)';
  const faint = tone === 'ink' ? 'var(--color-paper)' : 'var(--color-ink)';

  return (
    <div ref={ref} className={className}>
      <figure>
        <svg
          viewBox="0 0 720 480"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-auto w-full"
          role="img"
          aria-labelledby="arch-title arch-desc"
        >
          <title id="arch-title">How Axleta's four solution areas fit together</title>
          <desc id="arch-desc">
            A four-layer stack. Automation sits at the top, threading across companion
            applications, which extend the ERP core. All of it rests on the technology
            infrastructure layer. Each layer lists the capabilities it covers.
          </desc>

          {/* The traverse — the connecting line the brief calls the Traverse */}
          <motion.line
            x1="30"
            y1="36"
            x2="690"
            y2="36"
            stroke={stroke}
            strokeWidth="1"
            strokeOpacity="0.5"
            initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
            animate={running || reduced ? { pathLength: 1 } : {}}
            transition={{ duration: duration.reveal * 1.2, ease: ease.line }}
          />

          {LAYERS.map((layer, i) => {
            const y = 92 + i * 104;
            const delay = running ? 0.18 + i * stagger.loose * 2 : 0;
            const solution = solutions.find((s) => s.id === layer.id);
            const capabilities = solution?.capabilities.slice(0, 4) ?? [];

            return (
              <g key={layer.id}>
                {/* Layer plate */}
                <motion.rect
                  x="30"
                  y={y}
                  width="660"
                  height="78"
                  stroke={stroke}
                  strokeWidth={i === 2 ? 1.6 : 1}
                  strokeOpacity={i === 2 ? 0.9 : 0.45}
                  fill="none"
                  initial={reduced ? { opacity: i === 2 ? 0.9 : 0.45 } : { opacity: 0 }}
                  animate={running || reduced ? { opacity: i === 2 ? 0.9 : 0.45 } : {}}
                  transition={{ duration: duration.base, delay }}
                />

                {/* Layer index marker on the traverse */}
                <motion.circle
                  cx={30 + i * 165}
                  cy="36"
                  r="4"
                  fill={stroke}
                  initial={reduced ? { scale: 1 } : { scale: 0 }}
                  animate={running || reduced ? { scale: 1 } : {}}
                  style={{ transformOrigin: `${30 + i * 165}px 36px` }}
                  transition={{ duration: duration.fast, delay: delay + 0.1, ease: ease.settle }}
                />

                <text
                  x="46"
                  y={y + 26}
                  fill={stroke}
                  fontFamily="var(--font-mono)"
                  fontSize="11"
                  letterSpacing="1.6"
                >
                  {layer.label}
                </text>
                <text
                  x="46"
                  y={y + 44}
                  fill={faint}
                  fillOpacity="0.45"
                  fontFamily="var(--font-mono)"
                  fontSize="8"
                  letterSpacing="0.9"
                >
                  {layer.note}
                </text>

                {/* Capability ticks along the plate */}
                {capabilities.map((cap, j) => (
                  <motion.g
                    key={cap.label}
                    initial={reduced ? { opacity: 0.55 } : { opacity: 0 }}
                    animate={running || reduced ? { opacity: 0.55 } : {}}
                    transition={{ duration: duration.base, delay: delay + 0.15 + j * 0.05 }}
                  >
                    <line
                      x1="300"
                      y1={y + 18 + j * 15}
                      x2="312"
                      y2={y + 18 + j * 15}
                      stroke={stroke}
                      strokeWidth="1"
                      strokeOpacity="0.7"
                    />
                    <text
                      x="320"
                      y={y + 21 + j * 15}
                      fill={faint}
                      fillOpacity="0.62"
                      fontFamily="var(--font-sans)"
                      fontSize="9.5"
                    >
                      {cap.label}
                    </text>
                  </motion.g>
                ))}
              </g>
            );
          })}

          {/* Load arrows — automation pressing down through the stack */}
          {[0, 1].map((i) => (
            <motion.path
              key={`load-${i}`}
              d={`M 690 ${140 + i * 104} L 690 ${192 + i * 104}`}
              stroke={stroke}
              strokeWidth="1"
              markerEnd="url(#arrowhead)"
              initial={reduced ? { opacity: 0.5 } : { opacity: 0 }}
              animate={running || reduced ? { opacity: 0.5 } : {}}
              transition={{ duration: duration.base, delay: 0.8 + i * 0.12 }}
            />
          ))}

          <defs>
            <marker
              id="arrowhead"
              markerWidth="6"
              markerHeight="6"
              refX="5"
              refY="3"
              orient="auto"
            >
              <path d="M 0 0 L 6 3 L 0 6 z" fill={stroke} fillOpacity="0.5" />
            </marker>
          </defs>

          {/* Footing */}
          <motion.line
            x1="30"
            y1="452"
            x2="690"
            y2="452"
            stroke={stroke}
            strokeWidth="2"
            strokeOpacity="0.7"
            initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
            animate={running || reduced ? { pathLength: 1 } : {}}
            transition={{ duration: duration.slow, delay: 0.7, ease: ease.line }}
          />
          <text
            x="30"
            y="470"
            fill={faint}
            fillOpacity="0.4"
            fontFamily="var(--font-mono)"
            fontSize="8"
            letterSpacing="1.2"
          >
            EVERYTHING ABOVE RESTS HERE
          </text>
        </svg>
      </figure>
    </div>
  );
}