/**
 * Motion policy, as plain functions.
 *
 * Split out from the React provider so non-component code — the scroll
 * manager, the 3D gate, the prerender script — can read the same policy
 * without importing React.
 *
 * Two independent signals combine into one mode:
 *
 *   'reduced' — the OS reports `prefers-reduced-motion: reduce`. Decorative and
 *               scroll-choreographed motion becomes simple opacity reveals.
 *               Nothing is hidden, reordered or removed.
 *   'lite'    — a runtime heuristic for mobile and low-power devices. The site
 *               stays fully animated but expensive layers (hero WebGL, scroll
 *               scrub, parallax) never mount.
 *   'full'    — everything, including the hero scene.
 *
 * `data-motion` on <html> is the single switch that CSS and the WebGL gate
 * both read.
 */
import { isBrowser } from './utils';

export type MotionMode = 'full' | 'lite' | 'reduced';

/**
 * Reports the OS preference. Returns `true` outside a browser.
 *
 * A static render (prerender) has no way to know the visitor's setting, and the
 * wrong answer there is the expensive one: assuming "no preference" would emit
 * `initial` styles into the static HTML and park every reveal at opacity 0.
 * Assuming "reduced" renders the resting state, which is the same markup the
 * site ships for reduced-motion visitors.
 */
export function prefersReducedMotion(): boolean {
  if (!isBrowser || !window.matchMedia) return true;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Heuristic, deliberately conservative. Any strong signal for a capable device
 * clears it; a single weak signal is enough to hold the site back to lite.
 */
export function isLowPower(): boolean {
  if (!isBrowser) return true;

  const nav = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { saveData?: boolean };
  };

  if (nav.connection?.saveData === true) return true;
  if (nav.deviceMemory !== undefined && nav.deviceMemory <= 4) return true;
  if (typeof nav.hardwareConcurrency === 'number' && nav.hardwareConcurrency <= 4) return true;
  if (window.matchMedia && !window.matchMedia('(pointer: fine)').matches) return true;
  if (window.matchMedia && window.matchMedia('(max-width: 47.99rem)').matches) return true;

  return false;
}

export function resolveMotionMode(): MotionMode {
  if (!isBrowser) return 'reduced';
  if (prefersReducedMotion()) return 'reduced';
  return isLowPower() ? 'lite' : 'full';
}

export function applyMotionMode(mode: MotionMode): void {
  if (!isBrowser) return;
  document.documentElement.dataset.motion = mode;
  document.documentElement.dataset.motionMode = 'adaptive';
}

/** True when the hero WebGL scene is allowed to mount. */
export function webglAllowed(): boolean {
  return resolveMotionMode() === 'full';
}
