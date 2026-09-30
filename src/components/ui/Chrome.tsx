/**
 * Site chrome primitives shared by the header, footer and interior pages.
 */
import { forwardRef, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';

/**
 * The Axleta wordmark, drawn from the supplied raster logo.
 *
 * The lockup is the logo itself, left aligned with the type it sits beside.
 * `invert` is for ink grounds — the logo is azure, which passes on ink but
 * loses its edge on paper at small sizes, so the ink variant sits on a
 * hairline plate rather than recolouring the mark.
 */
export const Wordmark = forwardRef<
  HTMLImageElement,
  { className?: string; invert?: boolean; priority?: boolean }
>(function Wordmark({ className, invert = false, priority = false }, ref) {
  return (
    <img
      ref={ref}
      src="/brand/logo.png"
      alt="Axleta"
      width={491}
      height={185}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      className={cn(
        'h-auto w-auto select-none',
        invert ? 'rounded-xs bg-white/[0.06] px-2 py-1.5' : '',
        className,
      )}
      style={{ width: 'clamp(7.5rem, 9vw, 9.75rem)' }}
    />
  );
});

/**
 * Small circular status indicator used beside "now accepting work" style
 * statements. Decorative — the sentence carries the meaning.
 */
export function StatusDot({ tone = 'paper' }: { tone?: 'paper' | 'ink' }) {
  return (
    <span className="relative inline-flex h-2 w-2 shrink-0" aria-hidden="true">
      <span
        className={cn(
          'absolute inline-flex h-full w-full rounded-full opacity-70 animate-ping',
          tone === 'ink' ? 'bg-accent-300' : 'bg-accent-700',
        )}
      />
      <span
        className={cn(
          'relative inline-flex h-2 w-2 rounded-full',
          tone === 'ink' ? 'bg-accent-300' : 'bg-accent-700',
        )}
      />
    </span>
  );
}

/** Sticky-page wrapper that reserves scroll space for the fixed header. */
export function PageFrame({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('flex min-h-dvh flex-col', className)}>{children}</div>;
}

/** Footer "back to top" control. Uses a real anchor so it works without JS. */
export function BackToTop() {
  return (
    <a
      href="#top"
      className="group label inline-flex items-center gap-2 text-neutral-300 transition-colors duration-300 hover:text-paper"
    >
      <span
        aria-hidden="true"
        className="inline-block transition-transform duration-300 ease-[var(--ease-entrance)] group-hover:-translate-y-0.5 motion-reduce:transform-none"
      >
        ↑
      </span>
      Back to top
    </a>
  );
}

/** Breadcrumb trail. Rendered visually and as BreadcrumbList structured data. */
export function Breadcrumbs({
  trail,
  tone = 'paper',
}: {
  trail: { name: string; path: string }[];
  tone?: 'paper' | 'ink';
}) {
  return (
    <nav aria-label="Breadcrumb" className={cn('label flex flex-wrap items-center gap-2')}>
      <ol className="flex flex-wrap items-center gap-2">
        {trail.map((item, i) => {
          const isLast = i === trail.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-2">
              {isLast ? (
                <span aria-current="page" className={tone === 'ink' ? 'text-accent-300' : 'text-accent-700'}>
                  {item.name}
                </span>
              ) : (
                <>
                  <Link
                    to={item.path}
                    className={cn(
                      'transition-colors duration-300',
                      tone === 'ink'
                        ? 'text-neutral-300 hover:text-accent-300'
                        : 'text-neutral-700 hover:text-accent-700',
                    )}
                  >
                    {item.name}
                  </Link>
                  <span aria-hidden="true" className={tone === 'ink' ? 'text-neutral-500' : 'text-neutral-700'}>
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/** Fallback content for the no-JS prerender and for bot crawlers. */
export function NoScriptNotice() {
  return (
    <noscript>
      <div className="bg-ink px-gutter py-4 text-center text-paper">
        <p className="label">
          This site uses JavaScript for its interactive elements.{' '}
          <Link to="/contact" className="underline">
            Contact Axleta
          </Link>{' '}
          or email{' '}
          <a href="mailto:info@axleta.com" className="underline">
            info@axleta.com
          </a>{' '}
          directly.
        </p>
      </div>
    </noscript>
  );
}