/**
 * Lazy boundary for the hero WebGL scene.
 *
 * Keeping this in its own module is what makes the lazy import actually split:
 * importing `HeroScene` directly from Hero.tsx would pull Three into the same
 * module graph as the homepage and defeat the code split entirely.
 *
 * While the chunk is in flight — and whenever the motion policy refuses it —
 * nothing is rendered here. The static SVG axis from `AxletaAxis` is already
 * painted underneath, so the hero is never empty.
 */
import { Suspense, lazy } from 'react';

const HeroSceneImpl = lazy(() =>
  import('./HeroScene').then((m) => ({ default: m.HeroScene })),
);

export function LazyHeroScene({ className }: { className?: string }) {
  return (
    <Suspense fallback={null}>
      <HeroSceneImpl className={className} />
    </Suspense>
  );
}