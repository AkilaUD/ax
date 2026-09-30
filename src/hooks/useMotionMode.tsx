import { type ReactNode, useEffect, useState } from 'react';
import { MotionConfig } from 'motion/react';
import {
  applyMotionMode,
  isLowPower,
  prefersReducedMotion,
  resolveMotionMode,
  type MotionMode,
} from '../lib/motionPolicy';

export type { MotionMode };

/**
 * Owns the single `data-motion` attribute that CSS and the WebGL gate both
 * read. The policy itself lives in lib/motionPolicy.ts so non-React code can
 * consult it too.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<MotionMode>(resolveMotionMode);

  useEffect(() => {
    const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const sync = () => {
      setMode((current) => {
        if (reducedQuery.matches) return 'reduced';
        // Do not upgrade out of 'reduced' mid-session on the strength of a
        // low-power heuristic alone; the OS setting is treated as sticky.
        if (current === 'reduced') return 'reduced';
        return isLowPower() ? 'lite' : 'full';
      });
    };

    sync();
    reducedQuery.addEventListener('change', sync);
    window.addEventListener('resize', sync, { passive: true });

    return () => {
      reducedQuery.removeEventListener('change', sync);
      window.removeEventListener('resize', sync);
    };
  }, []);

  useEffect(() => {
    applyMotionMode(mode);
  }, [mode]);

  return (
    <MotionConfig reducedMotion={mode === 'reduced' ? 'always' : 'never'}>
      {children}
    </MotionConfig>
  );
}

/** Reads the current mode. Must be used inside the provider. */
export function useMotionMode(): MotionMode {
  // Resolved live rather than read back off <html data-motion>. The prerendered
  // documents ship `data-motion="reduced"` so a no-JS visitor sees finished
  // layout; that declaration describes the static file, not this browser. The
  // observer below still picks up later changes written by the provider.
  const [mode, setMode] = useState<MotionMode>(resolveMotionMode);

  useEffect(() => {
    const read = () => setMode((document.documentElement.dataset.motion as MotionMode) ?? 'full');
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-motion'],
    });
    return () => observer.disconnect();
  }, []);

  return mode;
}

export function usePrefersReducedMotion(): boolean {
  const [prefers, setPrefers] = useState(prefersReducedMotion);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setPrefers(query.matches);
    onChange();
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  return prefers;
}

/** True when decorative motion beyond simple reveals should run. */
export function useDecorativeMotion(): boolean {
  return useMotionMode() === 'full';
}

/** True when the hero WebGL scene is allowed to mount. */
export function useWebglAllowed(): boolean {
  return useMotionMode() === 'full';
}