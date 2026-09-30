/**
 * Button and link primitives.
 *
 * The travelling arrow (Signature D) lives in the label: on hover/focus the
 * glyph shifts a character-width to the right and the rule beneath draws out.
 * Under reduced motion the arrow does not move — only its colour changes.
 */
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'quiet';
export type ButtonSize = 'sm' | 'md' | 'lg';

const base =
  'group relative inline-flex items-center justify-center gap-2.5 font-mono uppercase ' +
  'leading-none tracking-label transition-[background-color,color,border-color,transform] ' +
  'duration-300 ease-[var(--ease-standard)] select-none ' +
  'disabled:pointer-events-none disabled:opacity-45';

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-action text-paper hover:bg-action-hover active:translate-y-px',
  secondary: 'border border-line-strong bg-transparent text-ink hover:border-ink hover:bg-ink hover:text-paper',
  ghost: 'bg-transparent text-ink hover:text-accent-700',
  quiet: 'border border-white/25 bg-transparent text-paper hover:border-accent-300 hover:text-accent-300',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'h-9 px-3.5 text-micro',
  md: 'h-11 px-5 text-eyebrow',
  lg: 'h-13 px-6 text-eyebrow',
};

/** The travelling arrow. Purely decorative — the accessible name is the label. */
function Arrow({ children, className }: { children?: ReactNode; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'inline-block transition-transform duration-300 ease-[var(--ease-entrance)]',
        'group-hover:translate-x-1 group-focus-visible:translate-x-1',
        'motion-reduce:transform-none',
        className,
      )}
    >
      {children ?? '→'}
    </span>
  );
}

type CommonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  /** Mono label shown after the children. */
  trailing?: string;
};

function inner(children: ReactNode, trailing?: string) {
  return (
    <>
      <span>{children}</span>
      {trailing ? <Arrow>{trailing}</Arrow> : null}
    </>
  );
}

export type ButtonLinkProps = CommonProps & {
  to: string;
  onClick?: () => void;
  'aria-label'?: string;
};

export function ButtonLink({
  children,
  variant = 'primary',
  size = 'md',
  className,
  trailing = '→',
  to,
  onClick,
  ...rest
}: ButtonLinkProps) {
  const external = /^https?:\/\//.test(to);
  const classes = cn(base, variants[variant], sizes[size], className);

  if (external) {
    return (
      <a
        href={to}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        {...rest}
      >
        {inner(children, trailing)}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }

  return (
    <Link to={to} className={classes} onClick={onClick} {...rest}>
      {inner(children, trailing)}
    </Link>
  );
}

export type ButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    trailing?: string;
    loading?: boolean;
  };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { children, variant = 'primary', size = 'md', className, trailing, loading, disabled, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      className={cn(base, variants[variant], sizes[size], className)}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {inner(children, trailing)}
    </button>
  );
});

/**
 * Text link with an animated underline. Used where a filled button would be
 * too heavy — inline prose references, "read more", section cross-links.
 */
export function ArrowLink({
  to,
  children,
  className,
  tone = 'paper',
  external,
  onClick,
}: {
  to: string;
  children: ReactNode;
  className?: string;
  tone?: 'paper' | 'ink';
  external?: boolean;
  onClick?: () => void;
}) {
  const isExternal = external ?? /^https?:\/\//.test(to);
  const content = (
    <>
      <span className="relative">
        {children}
        <span
          aria-hidden="true"
          className={cn(
            'absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-100 transition-transform duration-300',
            'ease-[var(--ease-entrance)] group-hover:scale-x-0 group-focus-visible:scale-x-0',
            'motion-reduce:transition-none',
            tone === 'ink' ? 'bg-accent-300' : 'bg-accent-700',
          )}
        />
      </span>
      <span
        aria-hidden="true"
        className={cn(
          'inline-block transition-transform duration-300 ease-[var(--ease-entrance)]',
          'group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-reduce:transform-none',
          tone === 'ink' ? 'text-accent-300' : 'text-accent-700',
        )}
      >
        →
      </span>
    </>
  );

  const classes = cn(
    'group inline-flex items-center gap-1.5 font-mono uppercase tracking-label',
    'transition-colors duration-300',
    tone === 'ink' ? 'text-paper hover:text-accent-300' : 'text-ink hover:text-accent-700',
    className,
  );

  if (isExternal) {
    return (
      <a href={to} className={classes} target="_blank" rel="noopener noreferrer" onClick={onClick}>
        {content}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }

  return (
    <Link to={to} className={classes} onClick={onClick}>
      {content}
    </Link>
  );
}

/** Fixed affordance for the primary conversion action in a section footer. */
export function CtaPair({
  primary,
  secondary,
  tone = 'paper',
  className,
}: {
  primary: { to: string; label: string; onClick?: () => void };
  secondary?: { to: string; label: string; onClick?: () => void };
  tone?: 'paper' | 'ink';
  className?: string;
}) {
  return (
    <div className={cn('flex flex-wrap items-center gap-x-6 gap-y-3', className)}>
      <ButtonLink to={primary.to} variant="primary" size="lg" onClick={primary.onClick}>
        {primary.label}
      </ButtonLink>
      {secondary ? (
        <ArrowLink to={secondary.to} tone={tone} onClick={secondary.onClick}>
          {secondary.label}
        </ArrowLink>
      ) : null}
    </div>
  );
}