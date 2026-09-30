export type ConnectionPathProps = {
  d: string;
  label?: string;
  active?: boolean;
  animated?: boolean;
};

export function ConnectionPath({ d, label, active = false, animated = false }: ConnectionPathProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 h-full w-full"
      role={label ? 'img' : undefined}
      aria-label={label}
      data-connection-path
      data-animated={animated ? 'true' : 'false'}
    >
      {label ? <title>{label}</title> : null}
      <path
        d={d}
        fill="none"
        stroke="currentColor"
        strokeWidth={active ? 1.2 : 0.7}
        vectorEffect="non-scaling-stroke"
        className={active ? 'text-accent-700' : 'text-line-strong'}
        pathLength="1"
      />
    </svg>
  );
}
