import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePrefersReducedMotion } from './useMotionMode';

let registered = false;

if (!registered && typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

/**
 * GSAP context bound to the component lifecycle (§53).
 *
 * Every ScrollTrigger created inside the callback is reverted on unmount, and
 * the context itself is reverted, so no listener, tween or pin survives the
 * component. `deps` follows the `useGSAP` convention: re-running on a dep
 * change is safe because the previous context is always killed first.
 */
export function useGsapContext(
  setup: (context: gsap.Context) => void,
  deps: React.DependencyList = [],
): React.RefObject<HTMLDivElement | null> {
  const scope = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = scope.current;
    if (!element || typeof window === 'undefined') return;

    const ctx = gsap.context((context) => {
      setup(context);
    }, element);

    return () => {
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return scope;
}

/**
 * ScrollTrigger's one unavoidable global: it needs the scroller to have
 * measured before it starts measuring itself. This defers `refresh` to the
 * first quiet frame after layout, which is what kills the classic
 * "hero jumps after fonts load" bug.
 */
export function useScrollTriggerRefresh(deps: React.DependencyList = []): void {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const id = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => ScrollTrigger.refresh());
    });
    return () => window.cancelAnimationFrame(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, ...deps]);
}

/** True once the element has entered the viewport. Used for pausing WebGL. */
export function useInView<T extends Element>(
  ref: React.RefObject<T | null>,
  options: { once?: boolean; rootMargin?: string; threshold?: number } = {},
): boolean {
  const { once = false, rootMargin = '0px', threshold = 0 } = options;
  // Without IntersectionObserver there is nothing to observe, so the honest
  // answer is "assume visible" — seeded here rather than set from an effect.
  const [inView, setInView] = useState(() => typeof IntersectionObserver === 'undefined');

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin, threshold },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, once, rootMargin, threshold]);

  return inView;
}
