/**
 * Centralised motion tokens.
 *
 * Every duration and easing curve in the project comes from here. No component
 * should invent an easing value inline — the point of this file is that the
 * whole site moves on one rhythm.
 */

export const duration = {
  /** Micro-interactions: hover, focus, small state changes. */
  fast: 0.25,
  /** UI transitions: menus, accordions, layout swaps. */
  base: 0.5,
  /** Larger reveals and panel choreography. */
  slow: 0.9,
  /** Scroll-driven narrative sequences. */
  reveal: 1.1,
  /** Route transitions. Kept short — the user must never wait to interact. */
  route: 0.62,
} as const;

export const ease = {
  /** Default UI easing. */
  standard: [0.22, 0.61, 0.36, 1],
  /** Things arriving. Fast out, long settle. */
  entrance: [0.16, 1, 0.3, 1],
  /** Things leaving. */
  exit: [0.4, 0, 1, 1],
  /** Scrubbed, scroll-locked drawing. Symmetrical so it reverses cleanly. */
  line: [0.65, 0, 0.35, 1],
  /** Slight overshoot for small, physical objects only. */
  settle: [0.34, 1.2, 0.64, 1],
} as const;

export const stagger = {
  tight: 0.04,
  base: 0.07,
  loose: 0.12,
} as const;

/** Spring presets for Motion, used where layout is the point. */
export const spring = {
  panel: { type: 'spring', stiffness: 260, damping: 32, mass: 0.9 },
  layout: { type: 'spring', stiffness: 320, damping: 34, mass: 0.8 },
} as const;

/** Motion variants shared by route transitions and content reveals. */
export const variants = {
  page: {
    initial: { opacity: 0, y: 14 },
    enter: { opacity: 1, y: 0, transition: { duration: duration.route, ease: ease.entrance } },
    exit: { opacity: 0, y: -8, transition: { duration: duration.fast, ease: ease.exit } },
  },
  /** Reduced-motion substitute for `page`. */
  pageStatic: {
    initial: { opacity: 0 },
    enter: { opacity: 1, transition: { duration: duration.fast } },
    exit: { opacity: 0, transition: { duration: 0.1 } },
  },
} as const;

/**
 * Hero storytelling budget. The hero is the one place a longer sequence is
 * justified, and it is capped so it never feels slow.
 */
export const heroTimeline = {
  eyebrowAt: 0,
  headlineAt: 0.1,
  headlineStagger: 0.055,
  ledeAt: 0.52,
  actionsAt: 0.72,
  sceneAt: 0.2,
  total: 1.6,
} as const;
