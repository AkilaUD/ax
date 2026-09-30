import { cn } from '../../lib/utils';

export type SystemNodeState = 'default' | 'active' | 'muted';

export type SystemNodeProps = {
  label: string;
  detail?: string;
  state?: SystemNodeState;
  active?: boolean;
  onSelect?: () => void;
};

export function SystemNode({
  label,
  detail,
  state = 'default',
  active = false,
  onSelect,
}: SystemNodeProps) {
  const className = cn(
    'group relative flex min-h-16 min-w-32 flex-col justify-center border px-4 py-3 text-left transition-[border-color,background-color,color,opacity] duration-300',
    state === 'muted' && 'opacity-45',
    (active || state === 'active')
      ? 'border-accent-700 bg-accent-700 text-paper'
      : 'border-line-strong bg-surface-raised text-ink hover:border-accent-700',
  );

  const content = (
    <>
      <span className="label">{label}</span>
      {detail ? <span className="mt-1 text-sm leading-snug text-current/70">{detail}</span> : null}
      {onSelect ? (
        <span aria-hidden="true" className="absolute right-3 top-3 text-accent-700 group-hover:translate-x-0.5">
          +
        </span>
      ) : null}
    </>
  );

  return onSelect ? (
    <button type="button" className={className} aria-pressed={active} onClick={onSelect}>
      {content}
    </button>
  ) : (
    <div className={className} role="img" aria-label={detail ? `${label}: ${detail}` : label}>
      {content}
    </div>
  );
}
