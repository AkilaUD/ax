/**
 * Signature A — the coordinate rail.
 *
 * A fixed marker column, visible from 78rem up, that tracks which section of a
 * long page you are reading. It is a genuine navigation aid (each marker is a
 * link to a section), which is why it exists at all: decoration that cannot be
 * operated is just noise.
 *
 * Implementation notes:
 *  - Scroll position is read in a single rAF-throttled pass; no layout thrash.
 *  - Markers are real anchors, so they work without JavaScript and are part of
 *    the tab order.
 *  - Hidden below 78rem and under reduced motion, where the per-marker pulse
 *    would be decoration with no benefit.
 */
import { useEffect, useRef, useState } from 'react';
import { cn } from '../../lib/utils';
import { usePrefersReducedMotion } from '../../hooks/useMotionMode';

export type RailItem = { id: string; label: string };

type Surface = 'paper' | 'ink';

const INK_SELECTOR = '.surface-ink, [data-surface="ink"]';

/**
 * Hit-test a single point and report the surface of the topmost painted element
 * there.
 *
 * The rail is a fixed overlay, so it is never a descendant of whatever it floats
 * over — including the footer, which is ink on every page. Inferring the surface
 * from the section list gets that wrong, and so does inferring one surface for
 * the whole rail: the rail is ~156px tall and can straddle a section boundary,
 * so markers at either end legitimately sit on different surfaces. Each marker
 * is therefore resolved at its own centre point.
 */
function surfaceAt(x: number, y: number): Surface {
  if (y < 0 || y > window.innerHeight || x < 0 || x > window.innerWidth) return 'paper';
  for (const node of document.elementsFromPoint(x, y)) {
    const style = getComputedStyle(node);
    const channels = style.backgroundColor.match(/rgba?\(([^)]+)\)/)?.[1]?.split(',').map((v) => parseFloat(v)) ?? [];
    const alpha = channels.length === 4 ? channels[3] : channels.length === 3 ? 1 : 0;
    const painted = (style.backgroundImage && style.backgroundImage !== 'none') || alpha >= 0.95;
    if (!painted) continue;
    return node.matches(INK_SELECTOR) ? 'ink' : 'paper';
  }
  return 'paper';
}

/** Hit-testing costs a style recalc per marker, so only redo it on real movement. */
const SURFACE_REFRESH_PX = 24;

export function CoordinateRail({ items }: { items: RailItem[] }) {
  const [active, setActive] = useState(items[0]?.id ?? '');
  const [visible, setVisible] = useState(false);
  // Per marker, so ordinals and ticks stay at AA on ink (neutral-300 = 7.9:1)
  // as well as on paper (neutral-700 = 6.6:1) and on surface-sunken (6.2:1).
  const [surfaces, setSurfaces] = useState<Record<string, Surface>>({});
  const reduced = usePrefersReducedMotion();
  const railRef = useRef<HTMLDivElement>(null);
  const lastSurfaceY = useRef(Number.NEGATIVE_INFINITY);

  // Only show once the user has committed to reading.
  useEffect(() => {
    const read = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    read();
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        read();
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    let frame = 0;
    const read = () => {
      frame = 0;
      const line = window.innerHeight * 0.4;
      let current = items[0]?.id ?? '';

      for (const item of items) {
        const el = document.getElementById(item.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= line) current = item.id;
      }

      // Snap back to the first marker once the last section is behind us.
      const last = items[items.length - 1];
      if (last) {
        const el = document.getElementById(last.id);
        if (el && el.getBoundingClientRect().bottom < window.innerHeight * 0.5) {
          const first = document.getElementById(items[0]?.id ?? '');
          if (first && first.getBoundingClientRect().top > window.innerHeight * 0.5) {
            current = items[0]?.id ?? '';
          }
        }
      }

      setActive(current);

      if (Math.abs(window.scrollY - lastSurfaceY.current) < SURFACE_REFRESH_PX) return;
      lastSurfaceY.current = window.scrollY;
      const next: Record<string, Surface> = {};
      for (const item of items) {
        const marker = railRef.current?.querySelector<HTMLElement>(`[data-rail-id="${item.id}"]`);
        const rect = marker?.getBoundingClientRect();
        next[item.id] = rect ? surfaceAt(rect.left + rect.width / 2, rect.top + rect.height / 2) : 'paper';
      }
      setSurfaces(next);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(read);
    };

    read();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [items]);

  if (items.length < 2) return null;

  return (
    <div
      ref={railRef}
      aria-hidden={false}
      className={cn(
        'coordinate-rail pointer-events-none fixed left-0 top-1/2 z-30 hidden -translate-y-1/2 rail:block',
        'transition-opacity duration-500 ease-[var(--ease-standard)]',
        visible ? 'opacity-100' : 'opacity-0',
      )}
    >
      <nav aria-label="On this page" className="pointer-events-auto px-6">
        <ul className="flex flex-col gap-1">
          {items.map((item, i) => {
            const isActive = active === item.id;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  data-rail-id={item.id}
                  data-surface={surfaces[item.id] ?? 'paper'}
                  className="rail-marker group flex items-center gap-3 py-1.5"
                  aria-current={isActive ? 'true' : undefined}
                >
                  <span className="rail-ordinal label w-5 shrink-0 text-right text-neutral-700 tabular-nums transition-colors duration-300 group-hover:text-ink">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="relative block h-6 w-3">
                    <span
                      aria-hidden="true"
                      className={cn(
                        'rail-tick absolute left-0 top-1/2 block w-3 -translate-y-1/2 border-t transition-all duration-500 ease-[var(--ease-line)]',
                        // neutral-700 rather than line-strong: the tick is a
                        // state indicator, so it needs 3:1 on both paper and
                        // surface-sunken (1.7:1 and 1.5:1 for line-strong).
                        isActive
                          ? 'w-5 border-accent-700'
                          : 'border-neutral-700 group-hover:w-5 group-hover:border-accent-600',
                      )}
                    />
                    {isActive && !reduced ? (
                      <span
                        aria-hidden="true"
                        className="axleta-signal-dot rail-dot absolute -right-1 top-1/2 h-1 w-1 -translate-y-1/2 rounded-full bg-accent-700"
                      />
                    ) : null}
                  </span>
                  <span
                    data-active={isActive ? 'true' : undefined}
                    className={cn(
                      'rail-label label whitespace-nowrap transition-all duration-300',
                      isActive
                        ? 'text-ink opacity-100'
                        : 'text-neutral-700 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100',
                    )}
                  >
                    {item.label}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

/**
 * Horizontal index strip used at the top of long pages. On small screens it
 * becomes a horizontally scrollable row with a visible scroll affordance
 * rather than a hidden overflow.
 */
export function SectionIndex({ items }: { items: RailItem[] }) {
  return (
    <nav aria-label="Sections on this page" className="rail:hidden">
      <ul
        className="-mx-gutter flex gap-6 overflow-x-auto px-gutter pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="list"
      >
        {items.map((item, i) => (
          <li key={item.id} className="shrink-0">
            <a
              href={`#${item.id}`}
              className="label flex items-center gap-2 whitespace-nowrap border-b border-line-strong py-2 text-neutral-700 transition-colors duration-300 hover:border-accent-700 hover:text-accent-700"
            >
              <span className="section-index-ordinal text-accent-700 tabular-nums">{String(i + 1).padStart(2, '0')}</span>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}