/**
 * Solution diagrams.
 *
 * One drawing per solution, each built from the same vocabulary — hairline
 * rules, monospace annotation, a signal dot — so the four read as a set of
 * plates from the same drawing office. These are SVG, not images, so they are
 * resolution independent, weightless, and recolour correctly on ink or paper.
 *
 * Every stroke animates as a draw-on under Motion. Under reduced motion the
 * paths render complete and static; nothing is ever hidden behind an animation.
 */
import { motion } from 'motion/react';
import { useRef } from 'react';
import { duration, ease, stagger } from '../../lib/motion';
import { useInView } from '../../hooks/useGsapContext';
import { usePrefersReducedMotion } from '../../hooks/useMotionMode';
import type { VisualType } from '../../data/solutions';
import { cn } from '../../lib/utils';

type DrawProps = {
  d: string;
  delay: number;
  running: boolean;
  width?: number;
  opacity?: number;
  tone: 'paper' | 'ink';
};

function Draw({ d, delay, running, width = 1, opacity = 0.75, tone }: DrawProps) {
  const reduced = usePrefersReducedMotion();
  const stroke = tone === 'ink' ? 'var(--color-accent-300)' : 'var(--color-accent-700)';

  return (
    <motion.path
      d={d}
      stroke={stroke}
      strokeWidth={width}
      strokeOpacity={opacity}
      strokeLinecap="round"
      fill="none"
      vectorEffect="non-scaling-stroke"
      initial={reduced ? { pathLength: 1, opacity } : { pathLength: 0, opacity: 0 }}
      animate={running || reduced ? { pathLength: 1, opacity } : {}}
      transition={{ duration: duration.slow, delay, ease: ease.line }}
    />
  );
}

/** Plate frame: the drawing border, corner ticks and label. Shared by all four. */
function Plate({
  label,
  children,
  tone,
  className,
}: {
  label: string;
  children: React.ReactNode;
  tone: 'paper' | 'ink';
  className?: string;
}) {
  const tick = tone === 'ink' ? 'var(--color-paper)' : 'var(--color-ink)';
  const tickOpacity = tone === 'ink' ? 0.28 : 0.18;

  return (
    <figure className={cn('relative', className)}>
      <svg
        viewBox="0 0 400 300"
        className="h-full w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Plate border */}
        <rect
          x="8"
          y="8"
          width="384"
          height="284"
          stroke={tick}
          strokeOpacity={tickOpacity}
          strokeWidth="1"
        />
        {/* Corner registration ticks */}
        {[
          [8, 26, 8, 8, 26, 8],
          [392, 26, 392, 8, 374, 8],
          [8, 274, 8, 292, 26, 292],
          [392, 274, 392, 292, 374, 292],
        ].map((coords, i) => (
          <path
            key={i}
            d={`M ${coords[0]} ${coords[1]} L ${coords[2]} ${coords[3]} L ${coords[4]} ${coords[5]}`}
            stroke={tick}
            strokeOpacity={tickOpacity + 0.14}
            strokeWidth="1"
          />
        ))}
        {children}
      </svg>
      <figcaption className="sr-only">{label}</figcaption>
    </figure>
  );
}

function Annotate({
  x,
  y,
  text,
  tone,
  anchor = 'start',
}: {
  x: number;
  y: number;
  text: string;
  tone: 'paper' | 'ink';
  anchor?: 'start' | 'middle' | 'end';
}) {
  const fill = tone === 'ink' ? 'var(--color-paper)' : 'var(--color-ink)';
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fill={fill}
      fillOpacity={0.5}
      fontFamily="var(--font-mono)"
      fontSize="7.5"
      letterSpacing="1.2"
    >
      {text}
    </text>
  );
}

function SignalDot({
  cx,
  cy,
  delay,
  running,
  tone,
}: {
  cx: number;
  cy: number;
  delay: number;
  running: boolean;
  tone: 'paper' | 'ink';
}) {
  const reduced = usePrefersReducedMotion();
  return (
    <motion.circle
      cx={cx}
      cy={cy}
      r="3.5"
      fill={tone === 'ink' ? 'var(--color-accent-300)' : 'var(--color-accent-700)'}
      initial={reduced ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
      animate={running || reduced ? { scale: 1, opacity: 1 } : {}}
      style={{ transformOrigin: `${cx}px ${cy}px` }}
      transition={{ duration: duration.fast, delay, ease: ease.settle }}
    />
  );
}

/* ------------------------------------------------------------------ */
/* 01 — ERP: one spine, the business functions hung off it              */
/* ------------------------------------------------------------------ */

function ErpDiagram({ tone, running }: { tone: 'paper' | 'ink'; running: boolean }) {
  const spine = 'M 60 150 L 340 150';
  const functions = [
    { y: 62, label: 'SALES' },
    { y: 96, label: 'PURCHASING' },
    { y: 204, label: 'INVENTORY' },
    { y: 238, label: 'MANUFACTURING' },
  ];

  return (
    <>
      <Draw d={spine} delay={0} running={running} tone={tone} width={1.4} />
      {functions.map((fn, i) => (
        <g key={fn.label}>
          <Draw
            d={`M 90 ${fn.y} C 130 ${fn.y}, 130 150, 180 150`}
            delay={0.15 + i * stagger.loose}
            running={running}
            tone={tone}
            opacity={0.55}
          />
          <Draw
            d={`M 240 150 C 290 150, 290 ${fn.y}, 330 ${fn.y}`}
            delay={0.22 + i * stagger.loose}
            running={running}
            tone={tone}
            opacity={0.55}
          />
          <Draw
            d={`M 62 ${fn.y} L 104 ${fn.y}`}
            delay={0.1 + i * stagger.loose}
            running={running}
            tone={tone}
            opacity={0.85}
          />
          <Annotate x={110} y={fn.y + 3} text={fn.label} tone={tone} />
        </g>
      ))}
      <Annotate x={60} y={140} text="BUSINESS" tone={tone} />
      <Annotate x={60} y={164} text="PROCESS" tone={tone} />
      <Annotate x={340} y={140} text="ONE" tone={tone} anchor="end" />
      <Annotate x={340} y={164} text="SOURCE" tone={tone} anchor="end" />
      <SignalDot cx={200} cy={150} delay={0.6} running={running} tone={tone} />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* 02 — Applications: modules attaching to a core                        */
/* ------------------------------------------------------------------ */

function ApplicationsDiagram({
  tone,
  running,
  reduced,
}: {
  tone: 'paper' | 'ink';
  running: boolean;
  reduced: boolean;
}) {
  const modules = [
    { x: 60, y: 46, w: 96, h: 34, label: 'PLM' },
    { x: 244, y: 46, w: 96, h: 34, label: 'FIXED ASSETS' },
    { x: 60, y: 220, w: 96, h: 34, label: 'ANALYTICS' },
    { x: 244, y: 220, w: 96, h: 34, label: 'BARCODE' },
  ];

  return (
    <>
      {/* The core, drawn as a solid plate */}
      <motion.rect
        x="150"
        y="112"
        width="100"
        height="76"
        stroke={tone === 'ink' ? 'var(--color-accent-300)' : 'var(--color-accent-700)'}
        strokeWidth="1.4"
        fill="none"
        initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
        animate={running || reduced ? { pathLength: 1 } : {}}
        transition={{ duration: duration.slow, delay: 0.1, ease: ease.line }}
      />
      <Annotate x={200} y={146} text="ERP" tone={tone} anchor="middle" />
      <Annotate x={200} y={162} text="CORE" tone={tone} anchor="middle" />

      {modules.map((mod, i) => {
        const attachX = mod.x < 150 ? mod.x + mod.w : mod.x;
        const attachY = mod.y < 112 ? mod.y + mod.h : mod.y;
        const midX = mod.x < 150 ? 150 : 250;
        const midY = 150;

        return (
          <g key={mod.label}>
            <Draw
              d={`M ${attachX} ${attachY} L ${attachX} ${midY} L ${midX} ${midY}`}
              delay={0.3 + i * 0.08}
              running={running}
              tone={tone}
              opacity={0.6}
            />
            <motion.rect
              x={mod.x}
              y={mod.y}
              width={mod.w}
              height={mod.h}
              stroke={tone === 'ink' ? 'var(--color-accent-300)' : 'var(--color-accent-700)'}
              strokeWidth="1"
              fill="none"
              initial={reduced ? { opacity: 0.85 } : { opacity: 0 }}
              animate={running || reduced ? { opacity: 0.85 } : {}}
              transition={{ duration: duration.base, delay: 0.25 + i * 0.08 }}
            />
            <Annotate
              x={mod.x + mod.w / 2}
              y={mod.y + mod.h / 2 + 3}
              text={mod.label}
              tone={tone}
              anchor="middle"
            />
          </g>
        );
      })}

      <Annotate x={60} y={278} text="BUILT ALONGSIDE" tone={tone} />
      <Annotate x={340} y={278} text="NOT FORKED" tone={tone} anchor="end" />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* 03 — Infrastructure: a ground plane carrying the load                 */
/* ------------------------------------------------------------------ */

function InfrastructureDiagram({ tone, running }: { tone: 'paper' | 'ink'; running: boolean }) {
  const rackUnits = [0, 1, 2, 3, 4, 5];

  return (
    <>
      {/* Ground plane */}
      <Draw d="M 40 232 L 200 150 L 360 232 L 200 282 Z" delay={0} running={running} tone={tone} width={1.4} />
      {/* Uprights */}
      <Draw d="M 96 208 L 96 96" delay={0.12} running={running} tone={tone} opacity={0.6} />
      <Draw d="M 304 208 L 304 96" delay={0.16} running={running} tone={tone} opacity={0.6} />
      <Draw d="M 96 96 L 200 44 L 304 96" delay={0.2} running={running} tone={tone} opacity={0.6} />

      {/* Load-bearing layers stacked on the plane */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const y = 108 + i * 17;
        const inset = 26 - i * 3;
        return (
          <Draw
            key={i}
            d={`M ${100 - inset * 0.2} ${y} L ${200 - inset} ${y - 12} L ${300 + inset * 0.2} ${y} L ${200 + inset} ${y + 12} Z`}
            delay={0.28 + i * 0.07}
            running={running}
            tone={tone}
            opacity={0.28 + i * 0.09}
          />
        );
      })}

      {/* Network lines leaving the rack */}
      {rackUnits.map((i) => {
        const y = 120 + i * 16;
        return (
          <Draw
            key={`net-${i}`}
            d={`M 304 ${y} L 352 ${y - 6}`}
            delay={0.6 + i * 0.04}
            running={running}
            tone={tone}
            opacity={0.35}
          />
        );
      })}

      <Annotate x={200} y={70} text="COMPUTE" tone={tone} anchor="middle" />
      <Annotate x={200} y={266} text="FOUNDATION" tone={tone} anchor="middle" />
      <Annotate x={40} y={28} text="NETWORK" tone={tone} />
      <SignalDot cx={352} cy={186} delay={1} running={running} tone={tone} />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* 04 — Automation: the hand-off, and where it is broken                 */
/* ------------------------------------------------------------------ */

function AutomationDiagram({
  tone,
  running,
  reduced,
}: {
  tone: 'paper' | 'ink';
  running: boolean;
  reduced: boolean;
}) {
  const stages = [
    { x: 48, label: 'RECEIVE' },
    { x: 132, label: 'RULE' },
    { x: 216, label: 'ACT' },
    { x: 300, label: 'POST' },
  ];

  return (
    <>
      {stages.map((stage, i) => (
        <g key={stage.label}>
          <motion.rect
            x={stage.x}
            y="120"
            width="52"
            height="40"
            stroke={tone === 'ink' ? 'var(--color-accent-300)' : 'var(--color-accent-700)'}
            strokeWidth="1"
            fill="none"
            initial={reduced ? { opacity: 0.85 } : { opacity: 0 }}
            animate={running || reduced ? { opacity: 0.85 } : {}}
            transition={{ duration: duration.base, delay: i * 0.1 }}
          />
          <Annotate x={stage.x + 26} y={144} text={stage.label} tone={tone} anchor="middle" />
          {i < stages.length - 1 ? (
            <Draw
              d={`M ${stage.x + 56} 140 L ${stages[i + 1].x - 4} 140`}
              delay={0.2 + i * 0.12}
              running={running}
              tone={tone}
              opacity={0.7}
            />
          ) : null}
        </g>
      ))}

      {/* The manual re-key that gets removed — drawn then struck through */}
      <Draw d="M 132 200 C 150 220, 190 220, 210 202" delay={0.62} running={running} tone={tone} opacity={0.4} />
      <Annotate x={132} y={196} text="MANUAL RE-KEY" tone={tone} />
      <Draw d="M 130 216 L 214 186" delay={0.78} running={running} tone={tone} width={1.6} opacity={0.9} />

      {/* The automated bypass, added above */}
      <Draw d="M 148 96 C 148 56, 252 56, 252 96" delay={0.86} running={running} tone={tone} width={1.4} />
      <Annotate x={200} y={52} text="AUTOMATED" tone={tone} anchor="middle" />

      <Annotate x={48} y={264} text="REPEATABLE" tone={tone} />
      <Annotate x={352} y={264} text="RULE-BOUND" tone={tone} anchor="end" />
      <SignalDot cx={200} cy={70} delay={1.05} running={running} tone={tone} />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Public entry point                                                   */
/* ------------------------------------------------------------------ */

const LABELS: Record<VisualType, string> = {
  erp: 'Diagram: one ERP spine with the business functions hung off it',
  applications: 'Diagram: companion modules attached to a central ERP core',
  infrastructure: 'Diagram: application layers resting on a compute ground plane',
  automation: 'Diagram: the manual re-key struck through and an automated bypass added',
};

export function SolutionDiagram({
  type,
  tone = 'paper',
  className,
}: {
  type: VisualType;
  tone?: 'paper' | 'ink';
  className?: string;
}) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, threshold: 0.2 });
  const running = seen && !reduced;

  return (
    <div ref={ref}>
      <Plate label={LABELS[type]} tone={tone} className={className}>
{type === 'erp' ? <ErpDiagram tone={tone} running={running} /> : null}
      {type === 'applications' ? (
        <ApplicationsDiagram tone={tone} running={running} reduced={reduced} />
      ) : null}
      {type === 'infrastructure' ? <InfrastructureDiagram tone={tone} running={running} /> : null}
      {type === 'automation' ? (
        <AutomationDiagram tone={tone} running={running} reduced={reduced} />
      ) : null}
      </Plate>
    </div>
  );
}