/**
 * Scroll reveal.
 *
 * Signature B — the System Index reveal. Each item carries a hairline top rule
 * that draws left-to-right as the block enters, with the content rising behind
 * it.
 *
 * Behaviour rules:
 *  - Content is always in the DOM and always readable. Only opacity and
 *    transform change, so a failed observer or a JS error cannot hide anything.
 *  - Under `prefers-reduced-motion` (or Motion's reducedMotion: 'always') the
 *    item renders at its resting state with no transform and no transition.
 */
import { motion } from 'motion/react';
import { useRef, type ReactNode } from 'react';
import { duration, ease, stagger } from '../../lib/motion';
import { cn } from '../../lib/utils';
import { useInView } from '../../hooks/useGsapContext';
import { usePrefersReducedMotion } from '../../hooks/useMotionMode';

type Tone = 'paper' | 'ink';

/** Motion-wrapped tags we actually use, so the prop stays type-safe. */
const MOTION_TAGS = {
  div: motion.div,
  h2: motion.h2,
  h3: motion.h3,
  li: motion.li,
  span: motion.span,
} as const;

export type MotionTag = keyof typeof MOTION_TAGS;

export function Reveal({
  children,
  className,
  index = 0,
  rule = false,
  delay = 0,
  as = 'div',
  tone = 'paper',
}: {
  children: ReactNode;
  className?: string;
  /** Stagger index within a group. */
  index?: number;
  /** Draw the signature hairline rule above the content. */
  rule?: boolean;
  delay?: number;
  as?: MotionTag;
  tone?: Tone;
}) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const seen = useInView(ref, { once: true, threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  // Every tag here takes the same props; only the rendered element differs.
  const Tag = MOTION_TAGS[as] as unknown as typeof motion.div;
  const offset = delay + index * stagger.base;

  return (
    <Tag
      ref={ref}
      className={cn('relative', className)}
      initial={reduced ? { opacity: 1 } : { opacity: 0, y: 22 }}
      animate={reduced ? { opacity: 1 } : { opacity: seen ? 1 : 0, y: seen ? 0 : 22 }}
      transition={{ duration: reduced ? 0 : duration.reveal, delay: reduced ? 0 : offset, ease: ease.entrance }}
    >
      {rule ? (
        <motion.span
          aria-hidden="true"
          className={cn(
            'absolute inset-x-0 top-0 block h-px origin-left',
            tone === 'ink' ? 'bg-white/25' : 'bg-ink/25',
          )}
          initial={reduced ? { scaleX: 1 } : { scaleX: 0 }}
          animate={reduced ? { scaleX: 1 } : { scaleX: seen ? 1 : 0 }}
          transition={{ duration: reduced ? 0 : duration.slow, delay: reduced ? 0 : offset, ease: ease.line }}
        />
      ) : null}
      {children}
    </Tag>
  );
}

/** A `<ul>` of reveals, so stagger indices line up with the rendered order. */
export function RevealList({
  children,
  className,
  as: ListTag = 'ul',
  itemClassName,
  rule = true,
  tone = 'paper',
}: {
  children: ReactNode;
  className?: string;
  as?: 'ul' | 'ol' | 'dl';
  itemClassName?: string;
  rule?: boolean;
  tone?: Tone;
}) {
  return (
    <ListTag className={cn('space-y-0', className)}>
      {Array.isArray(children)
        ? children.map((child, i) => (
            <Reveal
              as="li"
              key={i}
              index={i}
              rule={rule}
              tone={tone}
              className={cn('pt-8', itemClassName)}
            >
              {child}
            </Reveal>
          ))
        : children}
    </ListTag>
  );
}

/**
 * Word-by-word headline entrance. The heading element is fixed rather than
 * dynamic so it stays accessible and typed.
 */
export function SplitHeadline({
  text,
  className,
  delay = 0,
  as = 'h2',
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: 'h1' | 'h2';
}) {
  const reduced = usePrefersReducedMotion();
  const Tag = as === 'h1' ? motion.h1 : motion.h2;
  const words = text.split(' ');

  if (reduced) {
    return (
      <Tag className={className} initial={{ opacity: 1 }} animate={{ opacity: 1 }}>
        {text}
      </Tag>
    );
  }

  return (
    <Tag
      className={cn('flex flex-wrap', className)}
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.055, delayChildren: delay } } }}
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-flex overflow-hidden pb-[0.1em]">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: '110%', opacity: 0 },
              visible: { y: '0%', opacity: 1 },
            }}
            transition={{ duration: duration.slow, ease: ease.entrance }}
          >
            {word}
            {i < words.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/**
 * The capability signal bar — a static hairline strip listing what the practice
 * covers. Intentionally not a marquee: a moving band is the first thing that
 * reads as template, and it fights reading order on small screens.
 */
export function SignalBar({ items, tone = 'paper' }: { items: readonly string[]; tone?: Tone }) {
  return (
    <div className="rule-t" data-surface={tone === 'ink' ? 'ink' : undefined}>
      <ul className="flex flex-wrap items-center gap-x-8 gap-y-3 py-4">
        {items.map((item) => (
          <li key={item} className="label flex items-center gap-2.5">
            <span
              aria-hidden="true"
              className={cn(
                'axleta-signal-dot inline-block h-1 w-1 shrink-0 rounded-full',
                tone === 'ink' ? 'bg-accent-300' : 'bg-accent-700',
              )}
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}