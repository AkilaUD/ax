import { useEffect, useRef, useState } from 'react';

/**
 * rAF-throttled scroll listener.
 *
 * Every scroll consumer in the app shares this one subscription pattern, so
 * there is exactly one passive listener per hook instance and no layout read
 * outside a rAF callback.
 */
function useScrollValue<T>(compute: (scrollY: number) => T, deps: React.DependencyList = []) {
  const [value, setValue] = useState<T>(() => compute(0));
  const frame = useRef(0);

  useEffect(() => {
    const read = () => {
      frame.current = 0;
      setValue(compute(window.scrollY));
    };

    const onScroll = () => {
      if (frame.current) return;
      frame.current = window.requestAnimationFrame(read);
    };

    read();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      if (frame.current) window.cancelAnimationFrame(frame.current);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return value;
}

/** True once the page has scrolled past `threshold` pixels. */
export function useScrolled(threshold = 12): boolean {
  return useScrollValue((y) => y > threshold, [threshold]);
}

/** Document scroll progress, 0 at the top and 1 at the bottom. */
export function useScrollProgress(): number {
  return useScrollValue((y) => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (max <= 0) return 0;
    return Math.min(1, Math.max(0, y / max));
  });
}

/** Raw scroll offset, for the coordinate readout. */
export function useScrollY(): number {
  return useScrollValue((y) => y);
}

/**
 * The section currently occupying the viewport, by a line a little above the
 * middle. Drives the active-route indicator in the coordinate rail and the
 * mega menu.
 */
export function useActiveSection(ids: readonly string[], offset = 0.35): string | null {
  const [active, setActive] = useState<string | null>(ids[0] ?? null);

  useEffect(() => {
    if (ids.length === 0) return;

    let frame = 0;
    const read = () => {
      frame = 0;
      const line = window.innerHeight * offset;
      let current: string | null = null;

      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= line && rect.bottom > line) {
          current = id;
          break;
        }
      }

      // Before the first tracked section reaches the line, keep the first one.
      setActive(current ?? ids[0] ?? null);
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
  }, [ids, offset]);

  return active;
}
