import { useEffect, useMemo, useRef, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
//#region src/components/three/HeroScene.tsx
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
var RING_COUNT = 5;
var BASE_RADIUS = 1.1;
var RING_GAP = .58;
var OUTER_RADIUS = 3.42;
/** The scene contents. Kept separate so the gate can decide before mounting. */
function Axis({ running }) {
	const group = useRef(null);
	const signal = useRef(null);
	const rings = useMemo(() => Array.from({ length: RING_COUNT }, (_, i) => ({
		radius: BASE_RADIUS + i * RING_GAP,
		opacity: .75 - i * .11,
		width: i === 4 ? .012 : .007
	})), []);
	useFrame((state, delta) => {
		if (!running) return;
		if (group.current) {
			group.current.rotation.y += delta * .11;
			group.current.rotation.x = .42 + Math.sin(state.clock.elapsedTime * .18) * .06;
		}
		if (signal.current) {
			const t = state.clock.elapsedTime * .42;
			signal.current.position.set(Math.cos(t) * OUTER_RADIUS, Math.sin(t) * OUTER_RADIUS, .02);
		}
	});
	return /* @__PURE__ */ jsxs("group", {
		ref: group,
		children: [
			/* @__PURE__ */ jsxs("mesh", {
				rotation: [
					0,
					0,
					0
				],
				children: [/* @__PURE__ */ jsx("cylinderGeometry", { args: [
					.006,
					.006,
					OUTER_RADIUS * 2.5,
					8
				] }), /* @__PURE__ */ jsx("meshBasicMaterial", {
					color: "#3fa2ff",
					transparent: true,
					opacity: .55
				})]
			}),
			rings.map((ring) => /* @__PURE__ */ jsxs("mesh", {
				rotation: [
					Math.PI / 2,
					0,
					0
				],
				children: [/* @__PURE__ */ jsx("torusGeometry", { args: [
					ring.radius,
					ring.width,
					8,
					96
				] }), /* @__PURE__ */ jsx("meshBasicMaterial", {
					color: "#3fa2ff",
					transparent: true,
					opacity: ring.opacity
				})]
			}, ring.radius)),
			/* @__PURE__ */ jsxs("mesh", { children: [/* @__PURE__ */ jsx("sphereGeometry", { args: [
				.3,
				24,
				24
			] }), /* @__PURE__ */ jsx("meshBasicMaterial", {
				color: "#8bc7ff",
				transparent: true,
				opacity: .28
			})] }),
			/* @__PURE__ */ jsxs("mesh", {
				ref: signal,
				children: [/* @__PURE__ */ jsx("sphereGeometry", { args: [
					.055,
					12,
					12
				] }), /* @__PURE__ */ jsx("meshBasicMaterial", { color: "#eaf4ff" })]
			})
		]
	});
}
/** Adapts dpr once the real device is known, and keeps it conservative. */
function AdaptiveDpr() {
	const { setDpr } = useThree();
	useEffect(() => {
		setDpr(Math.min(window.devicePixelRatio, 1.5));
	}, [setDpr]);
	return null;
}
function HeroScene({ className }) {
	const [mounted, setMounted] = useState(false);
	const [running, setRunning] = useState(false);
	const hostRef = useRef(null);
	useEffect(() => {
		const gate = () => {
			const mode = document.documentElement.dataset.motion;
			setMounted(mode === "full");
		};
		gate();
		const observer = new MutationObserver(gate);
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["data-motion"]
		});
		return () => observer.disconnect();
	}, []);
	useEffect(() => {
		const onVisibility = () => setRunning(document.visibilityState === "visible");
		onVisibility();
		document.addEventListener("visibilitychange", onVisibility);
		return () => document.removeEventListener("visibilitychange", onVisibility);
	}, []);
	useEffect(() => {
		const host = hostRef.current;
		if (!host || typeof IntersectionObserver === "undefined") return;
		const observer = new IntersectionObserver(([entry]) => setRunning(Boolean(entry?.isIntersecting)), { rootMargin: "80px" });
		observer.observe(host);
		return () => observer.disconnect();
	}, [mounted]);
	if (!mounted) return null;
	return /* @__PURE__ */ jsx("div", {
		ref: hostRef,
		className,
		"aria-hidden": "true",
		children: /* @__PURE__ */ jsxs(Canvas, {
			frameloop: running ? "always" : "never",
			dpr: 1,
			camera: {
				position: [
					0,
					0,
					5.4
				],
				fov: 42
			},
			gl: {
				antialias: true,
				alpha: true,
				powerPreference: "low-power"
			},
			style: { background: "transparent" },
			children: [/* @__PURE__ */ jsx(AdaptiveDpr, {}), /* @__PURE__ */ jsx(Axis, { running })]
		})
	});
}
//#endregion
export { HeroScene };
