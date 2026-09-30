/**
 * Prose and disclosure components for long-form page content.
 *
 * Two pieces:
 *
 *  1. `Prose` — renders the typed block union from content/legal.ts. Typed
 *     blocks rather than raw HTML means the legal copy cannot smuggle in markup,
 *     and the layout rules stay in one place.
 *  2. `Disclosure` — a native-details accordion. Native rather than a JS
 *     disclosure widget deliberately: it works before hydration, is keyboard
 *     operable with no extra code, and is announced correctly by every screen
 *     reader without ARIA patching.
 */
import type { ReactNode } from 'react';
import type { LegalBlock } from '../../content/legal';
import { cn } from '../../lib/utils';

export function Prose({ blocks }: { blocks: LegalBlock[] }) {
  return (
    <div className="max-w-prose">
      {blocks.map((block, i) => {
        if (block.type === 'p') {
          return (
            <p key={i} className="mt-6 text-body leading-body text-neutral-900 first:mt-0">
              {block.text}
            </p>
          );
        }

        if (block.type === 'list') {
          return (
            <ul key={i} className="mt-6 space-y-3 first:mt-0">
              {block.items.map((item) => (
                <li key={item} className="flex gap-4 leading-body text-neutral-900">
                  <span
                    aria-hidden="true"
                    className="mt-[0.7em] h-px w-4 shrink-0 bg-accent-700"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          );
        }

        return (
          <aside
            key={i}
            className="mt-8 border-l-2 border-accent-600 bg-surface-sunken px-5 py-4"
          >
            <p className="label text-accent-700">Note</p>
            <p className="mt-3 text-sm leading-relaxed text-neutral-900">{block.text}</p>
          </aside>
        );
      })}
    </div>
  );
}

/**
 * Native accordion.
 *
 * The summary marker is replaced with a rule-plus-glyph so the disclosure reads
 * as a drawn plate rather than a browser triangle, but the element is still a
 * real <details>/<summary> pair.
 */
export function Disclosure({
  summary,
  children,
  open = false,
  tone = 'paper',
}: {
  summary: ReactNode;
  children: ReactNode;
  open?: boolean;
  tone?: 'paper' | 'ink';
}) {
  return (
    <details
      open={open}
      data-surface={tone === 'ink' ? 'ink' : undefined}
      className={cn(
        'group border-t',
        tone === 'ink' ? 'border-white/15' : 'border-line-strong',
        'last:border-b',
      )}
    >
      <summary
        className={cn(
          'flex cursor-pointer list-none items-baseline justify-between gap-6 py-6',
          'transition-colors duration-300 [&::-webkit-details-marker]:hidden',
          tone === 'ink'
            ? 'text-paper hover:text-accent-300'
            : 'text-ink hover:text-accent-700',
        )}
      >
        <span className="font-display text-xl font-medium leading-snug tracking-tightest sm:text-2xl">
          {summary}
        </span>
        <span
          aria-hidden="true"
          className={cn(
            'label shrink-0 transition-transform duration-500 ease-[var(--ease-line)]',
            'group-open:rotate-45',
            'motion-reduce:transform-none',
            tone === 'ink' ? 'text-accent-300' : 'text-accent-700',
          )}
        >
          +
        </span>
      </summary>
      <div
        className={cn(
          'pb-7 max-w-prose leading-body',
          tone === 'ink' ? 'text-neutral-300' : 'text-neutral-900',
        )}
      >
        {children}
      </div>
    </details>
  );
}