import { useEffect, useState } from 'react';

/** Reactive media query. SSR/prerender-safe: returns `false` on the server. */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (!window.matchMedia) return;
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

/** Tailwind's `lg` breakpoint, expressed as a query. */
export const useIsDesktop = () => useMediaQuery('(min-width: 64rem)');
export const useIsWide = () => useMediaQuery('(min-width: 78rem)');
export const useIsTouch = () => useMediaQuery('(pointer: coarse)');
export const useCanHover = () => useMediaQuery('(hover: hover) and (pointer: fine)');

/** Locks body scroll while an overlay is open, restoring it reliably. */
export function useBodyScrollLock(locked: boolean): void {
  useEffect(() => {
    if (!locked) return;
    const { body, documentElement } = document;
    const previousOverflow = body.style.overflow;
    const previousPaddingRight = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - documentElement.clientWidth;

    body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPaddingRight;
    };
  }, [locked]);
}
