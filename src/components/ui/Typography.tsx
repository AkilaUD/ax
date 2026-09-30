/**
 * Typographic components.
 *
 * These own the voice of the site: mono uppercase eyebrow with a live signal
 * tick, oversized Archivo display settings, and a mono index number that
 * behaves like a drawing annotation.
 */
import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';

type Tone = 'paper' | 'ink';

/** Signature D — the live signal tick that sits before every eyebrow. */
function Signal({ tone }: { tone: Tone }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'axleta-signal-dot relative inline-block h-1.5 w-1.5 shrink-0 rounded-full',
        tone === 'ink' ? 'bg-accent-300' : 'bg-accent-700',
      )}
    >
      <span
        className={cn(
          'absolute inset-0 animate-ping rounded-full opacity-70',
          tone === 'ink' ? 'bg-accent-300' : 'bg-accent-700',
        )}
      />
    </span>
  );
}

/**
 * Section eyebrow. `index` renders the drawing annotation number; `live`
 * switches the pulsing tick off for non-active contexts.
 */
export function Eyebrow({
  children,
  index,
  tone = 'paper',
  live = false,
  className,
  as: Tag = 'p',
}: {
  children: ReactNode;
  index?: string;
  tone?: Tone;
  live?: boolean;
  className?: string;
  as?: 'p' | 'div' | 'span';
}) {
  return (
    <Tag className={cn('label flex items-center gap-3', className)}>
      {live ? <Signal tone={tone} /> : <span className="sr-only">Section: </span>}
      {index ? (
        <span className={cn('tabular-nums', tone === 'ink' ? 'text-accent-300' : 'text-accent-700')}>
          {index}
        </span>
      ) : null}
      <span>{children}</span>
    </Tag>
  );
}

/** Page-level display setting. */
export function Display({
  children,
  className,
  as: Tag = 'h1',
  tone = 'paper',
}: {
  children: ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'p';
  tone?: Tone;
}) {
  return (
    <Tag
      className={cn(
        'text-display font-display font-medium leading-[0.95] tracking-tightest',
        className,
      )}
      data-tone={tone}
    >
      {children}
    </Tag>
  );
}

export function Title({
  children,
  className,
  as: Tag = 'h2',
  id,
  tone = 'paper',
}: {
  children: ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3';
  id?: string;
  tone?: Tone;
}) {
  return (
    <Tag id={id} className={cn('text-title font-display font-medium', className)} data-tone={tone}>
      {children}
    </Tag>
  );
}

export function Subtitle({
  children,
  className,
  as: Tag = 'h3',
  tone = 'paper',
}: {
  children: ReactNode;
  className?: string;
  as?: 'h2' | 'h3' | 'h4';
  tone?: Tone;
}) {
  return (
    <Tag className={cn('text-lead font-display font-medium leading-snug', className)} data-tone={tone}>
      {children}
    </Tag>
  );
}

/** Intro paragraph. The measure is capped here, not per-usage. */
export function Lead({ children, className, tone = 'paper' }: { children: ReactNode; className?: string; tone?: Tone }) {
  return (
    <p className={cn('measure text-lead leading-loose', className)} data-tone={tone}>
      {children}
    </p>
  );
}

export function Body({ children, className, tone = 'paper' }: { children: ReactNode; className?: string; tone?: Tone }) {
  return <p className={cn('measure leading-body', className)} data-tone={tone}>{children}</p>;
}

/** Small mono note — captions, legal annotations, source attributions. */
export function Note({ children, className, tone = 'paper' }: { children: ReactNode; className?: string; tone?: Tone }) {
  return (
    <p className={cn('label text-neutral-700', tone === 'ink' && 'muted', className)} data-tone={tone}>
      {children}
    </p>
  );
}

/** Monospace architectural label, e.g. "ERP / BUSINESS SYSTEMS". */
export function ArchitecturalLabel({ children, className, tone = 'paper' }: { children: ReactNode; className?: string; tone?: Tone }) {
  return (
    <span
      className={cn(
        'label inline-flex items-center gap-2 tabular-nums',
        tone === 'ink' ? 'text-accent-300' : 'text-accent-700',
        className,
      )}
    >
      <span aria-hidden="true" className="inline-block h-px w-6 bg-current opacity-50" />
      {children}
    </span>
  );
}