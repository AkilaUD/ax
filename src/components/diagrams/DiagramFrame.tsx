import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';

export type DiagramFrameProps = {
  eyebrow?: string;
  title: string;
  description: string;
  children: ReactNode;
  surface?: 'paper' | 'ink';
};

export function DiagramFrame({
  eyebrow,
  title,
  description,
  children,
  surface = 'paper',
}: DiagramFrameProps) {
  const titleId = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  return (
    <section
      aria-labelledby={`${titleId}-title`}
      className={cn('axleta-frame axleta-drafting-grid', surface === 'ink' ? 'surface-ink' : 'bg-surface')}
      data-diagram-fallback
      data-keyboard-ready="true"
      data-motion-mode="adaptive"
    >
      <div className="relative z-10 mx-auto grid max-w-shell grid-cols-4 gap-x-6 gap-y-8 px-gutter py-section-y-tight md:grid-cols-8 lg:grid-cols-12">
        <div className="col-span-4 md:col-span-3 lg:col-span-4">
          {eyebrow ? <p className="label text-accent-700">{eyebrow}</p> : null}
          <h2 id={`${titleId}-title`} className="mt-5 text-title font-display font-medium">
            {title}
          </h2>
          <p className="measure mt-5 leading-body text-neutral-700">{description}</p>
        </div>
        <div className="col-span-4 min-h-64 md:col-span-5 lg:col-span-8" aria-label={`${title} diagram`}>
          {children}
        </div>
      </div>
    </section>
  );
}
