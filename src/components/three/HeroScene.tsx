/**
 * Hero WebGL scene — Signature A, the Axleta axis in three dimensions.
 *
 * This is the only 3D on the site. It is gated hard:
 *  - It is `React.lazy`, so Three/R3F are never in the entry chunk. They live in
 *    their own bundle (see the manualChunks config in vite.config.ts) and are
 *    only fetched after the hero has painted.
 *  - It mounts only when `data-motion="full"`, which requires a fine pointer,
 *    a viewport above 48rem, at least 4 CPU threads and no Save-Data. Mobile
 *    and low-power clients get the static SVG axis instead.
 *  - `usePageVisible` and `useInView` pause rendering when the tab is hidden or
 *    the hero has scrolled away. The frame loop is cancelled, not throttled.
 *  - The renderer is capped at 1.5 dpr, and the geometry count is deliberately
 *    small: five rings, one axis, one travelling node.
 *
 * Because the static SVG axis sits underneath at all times, a WebGL failure
 * degrades to the drawing rather than to an empty box.
 */
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import type * as THREE from 'three';

const RING_COUNT = 5;
const BASE_RADIUS = 1.1;
const RING_GAP = 0.58;
const OUTER_RADIUS = BASE_RADIUS + (RING_COUNT - 1) * RING_GAP;

/** The scene contents. Kept separate so the gate can decide before mounting. */
function Axis({ running }: { running: boolean }) {
  const group = useRef<THREE.Group>(null);
  const signal = useRef<THREE.Mesh>(null);

  const rings = useMemo(
    () =>
      Array.from({ length: RING_COUNT }, (_, i) => ({
        radius: BASE_RADIUS + i * RING_GAP,
        opacity: 0.75 - i * 0.11,
        width: i === RING_COUNT - 1 ? 0.012 : 0.007,
      })),
    [],
  );

  useFrame((state, delta) => {
    if (!running) return;

    if (group.current) {
      // A slow, continuous rotation. Deliberately understated — this should be
      // noticed on the third visit, not the first.
      group.current.rotation.y += delta * 0.11;
      group.current.rotation.x = 0.42 + Math.sin(state.clock.elapsedTime * 0.18) * 0.06;
    }

    if (signal.current) {
      const t = state.clock.elapsedTime * 0.42;
      signal.current.position.set(Math.cos(t) * OUTER_RADIUS, Math.sin(t) * OUTER_RADIUS, 0.02);
    }
  });

  return (
    <group ref={group}>
      {/* The axis */}
      <mesh rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.006, 0.006, OUTER_RADIUS * 2.5, 8]} />
        <meshBasicMaterial color="#3fa2ff" transparent opacity={0.55} />
      </mesh>

      {/* The rings */}
      {rings.map((ring) => (
        <mesh key={ring.radius} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[ring.radius, ring.width, 8, 96]} />
          <meshBasicMaterial color="#3fa2ff" transparent opacity={ring.opacity} />
        </mesh>
      ))}

      {/* The core */}
      <mesh>
        <sphereGeometry args={[0.3, 24, 24]} />
        <meshBasicMaterial color="#8bc7ff" transparent opacity={0.28} />
      </mesh>

      {/* The travelling signal */}
      <mesh ref={signal}>
        <sphereGeometry args={[0.055, 12, 12]} />
        <meshBasicMaterial color="#eaf4ff" />
      </mesh>
    </group>
  );
}

/** Adapts dpr once the real device is known, and keeps it conservative. */
function AdaptiveDpr() {
  const { setDpr } = useThree();
  useEffect(() => {
    setDpr(Math.min(window.devicePixelRatio, 1.5));
  }, [setDpr]);
  return null;
}

export function HeroScene({ className }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const [running, setRunning] = useState(false);
  const hostRef = useRef<HTMLDivElement>(null);

  // Gate on the motion policy. `full` is the only mode that allows WebGL.
  useEffect(() => {
    const gate = () => {
      const mode = document.documentElement.dataset.motion;
      setMounted(mode === 'full');
    };
    gate();
    const observer = new MutationObserver(gate);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-motion'],
    });
    return () => observer.disconnect();
  }, []);

  // Pause when the tab is hidden.
  useEffect(() => {
    const onVisibility = () => setRunning(document.visibilityState === 'visible');
    onVisibility();
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  // Pause when the hero has left the viewport. The hero is ~92svh, so this
  // saves the frame loop for almost the entire rest of the page.
  useEffect(() => {
    const host = hostRef.current;
    if (!host || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      ([entry]) => setRunning(Boolean(entry?.isIntersecting)),
      { rootMargin: '80px' },
    );
    observer.observe(host);
    return () => observer.disconnect();
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div ref={hostRef} className={className} aria-hidden="true">
      <Canvas
        frameloop={running ? 'always' : 'never'}
        dpr={1}
        camera={{ position: [0, 0, 5.4], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
        style={{ background: 'transparent' }}
      >
        <AdaptiveDpr />
        <Axis running={running} />
      </Canvas>
    </div>
  );
}