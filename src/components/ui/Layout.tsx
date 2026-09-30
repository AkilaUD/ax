/** Structural layout primitives — the 12-column shell every section sits in. */
import type { ElementType, ReactNode } from 'react';
import { cn } from '../../lib/utils';

/** Full-width page shell with the fluid gutter. */
export function Shell({
  as: Tag = 'div',
  className,
  children,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  // ElementType is a union of every intrinsic tag and component type, so the
  // shared prop signature has to be asserted for JSX to accept `children`.
  const Comp = Tag as ElementType<{ className?: string; children?: ReactNode }>;
  return <Comp className={cn('mx-auto w-full max-w-shell px-gutter', className)}>{children}</Comp>;
}

/**
 * The 12-column grid.
 *
 * `rails` draws the column guides — Signature A, the coordinate rail. It is
 * decorative and hidden from assistive technology and from print.
 */
export function Grid({
  className,
  rails = false,
  children,
}: {
  className?: string;
  rails?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="relative">
      {rails ? <ColumnGuides /> : null}
      <div className={cn('grid grid-cols-4 gap-x-6 md:grid-cols-8 lg:grid-cols-12', className)}>
        {children}
      </div>
    </div>
  );
}

export function ColumnGuides() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden lg:block">
      <div className="mx-auto h-full w-full max-w-shell px-gutter">
        <div className="grid h-full grid-cols-4 gap-x-6 md:grid-cols-8 lg:grid-cols-12">
          {Array.from({ length: 12 }, (_, i) => (
            <div key={i} className="border-l border-dashed border-black/[0.045]">
              <div className="border-r border-dashed border-black/[0.045]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Vertical section rhythm. The `tone` swap is the ink/paper device. */
export function Section({
  children,
  className,
  tone = 'paper',
  id,
  tight = false,
  labelledBy,
  bleed = false,
  dataMarkers,
}: {
  children: ReactNode;
  className?: string;
  tone?: 'paper' | 'ink' | 'white' | 'sunken';
  id?: string;
  tight?: boolean;
  labelledBy?: string;
  bleed?: boolean;
  dataMarkers?: readonly string[];
}) {
  const toneClass =
    tone === 'ink'
      ? 'surface-ink'
      : tone === 'white'
        ? 'bg-white'
        : tone === 'sunken'
          ? 'bg-surface-sunken'
          : 'bg-surface';

  return (
    <section
      {...Object.fromEntries((dataMarkers ?? []).map((marker) => [`data-${marker}`, 'true']))}
      id={id}
      aria-labelledby={labelledBy}
      data-surface={tone === 'ink' ? 'ink' : undefined}
      className={cn(
        toneClass,
        tight ? 'py-section-y-tight' : 'py-section-y',
        bleed && 'overflow-hidden',
        className,
      )}
    >
      {children}
    </section>
  );
}

/** Spacing rhythm for the header / lede / body stack inside a section. */
export function Stack({
  children,
  className,
  gap = 'md',
}: {
  children: ReactNode;
  className?: string;
  gap?: 'sm' | 'md' | 'lg';
}) {
  const gapClass = gap === 'sm' ? 'space-y-4' : gap === 'lg' ? 'space-y-10' : 'space-y-7';
  return <div className={cn(gapClass, className)}>{children}</div>;
}

/** Hairline rule used as a structural divider, never as a card border. */
export function Rule({ className, tone }: { className?: string; tone?: 'ink' | 'paper' }) {
  return (
    <hr
      aria-hidden="true"
      className={cn(
        'h-px w-full border-0',
        tone === 'ink' ? 'bg-white/15' : 'bg-border',
        className,
      )}
    />
  );
}
