import { cn } from '../../lib/utils';

export type ProcessRailStep = {
  label: string;
  detail?: string;
};

export type ProcessRailProps = {
  steps: readonly ProcessRailStep[];
  activeIndex: number;
  onSelect?: (index: number) => void;
};

export function ProcessRail({ steps, activeIndex, onSelect }: ProcessRailProps) {
  return (
    <ol className="relative grid gap-6 md:grid-cols-4 md:gap-0" aria-label="Process stages">
      {steps.map((step, index) => {
        const active = index === activeIndex;
        const content = (
          <>
            <span className="label text-accent-700">{String(index + 1).padStart(2, '0')}</span>
            <span className="mt-3 block font-display text-xl tracking-tightest">{step.label}</span>
            {step.detail ? <span className="mt-2 block max-w-48 text-sm leading-relaxed text-neutral-700">{step.detail}</span> : null}
          </>
        );

        return (
          <li key={step.label} className="relative border-t border-line-strong pt-4 md:mr-6">
            {onSelect ? (
              <button
                type="button"
                aria-current={active ? 'step' : undefined}
                aria-label={`${step.label}${step.detail ? `: ${step.detail}` : ''}`}
                className={cn('block w-full text-left transition-opacity duration-300', !active && 'opacity-55 hover:opacity-100')}
                onClick={() => onSelect(index)}
              >
                {content}
              </button>
            ) : (
              <div className={cn(!active && 'opacity-55')}>{content}</div>
            )}
          </li>
        );
      })}
    </ol>
  );
}
