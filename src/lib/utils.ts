import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

/**
 * The scale registers custom font sizes (`--text-micro`, `--text-eyebrow`, …).
 * tailwind-merge does not know them and classifies an unknown `text-*` class as
 * a *colour*, so `text-paper` + `text-micro` would collapse to the last one and
 * silently strip button colours. Teach it about the project's sizes first.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        { text: ['micro', 'eyebrow', 'body', 'lead', 'stat', 'title', 'hero', 'display'] },
      ],
    },
  },
});

/** Tailwind-aware class merge. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export const isBrowser = typeof window !== 'undefined';

/** Constrain an arbitrary number to a range. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Linear interpolation used for scroll-driven numeric values. */
export function lerp(from: number, to: number, progress: number): number {
  return from + (to - from) * progress;
}

export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
): number {
  if (inMax === inMin) return outMin;
  return lerp(outMin, outMax, clamp((value - inMin) / (inMax - inMin), 0, 1));
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
