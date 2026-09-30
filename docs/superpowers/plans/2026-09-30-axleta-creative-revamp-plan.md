# Axleta Creative Website Revamp Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild every Axleta route around a coherent architectural/editorial visual system that explains how ERP, applications, infrastructure, automation, engagement, and support form one connected business system.

**Architecture:** Preserve the existing React route shell, prerender manifest, data modules, and semantic page boundaries. Add typed diagram primitives and route-level compositions that progressively enhance from HTML/CSS to SVG, GSAP/Motion, and optional Three.js. Keep content and metadata in existing data/content modules so visual changes do not alter factual claims or link destinations.

**Tech Stack:** React 19, TypeScript, Tailwind CSS 4, Motion for React, GSAP/ScrollTrigger, Three.js/React Three Fiber/Drei where justified, SVG, Vite SSR prerendering, self-hosted Archivo/IBM Plex fonts.

**Spec:** `docs/superpowers/specs/2026-09-30-axleta-creative-revamp-design.md`

## Global Constraints

- Preserve existing factual business content, links, partner wording, legal information, contact methods, and route semantics.
- Avoid generic SaaS patterns: repeated rounded cards, decorative gradients, meaningless particles, random 3D objects, and animation without semantic purpose.
- Keep the first contentful experience useful without WebGL. Heavy scenes must be progressive enhancements with graceful fallbacks.
- CSS handles simple line, hover, focus, and state transitions; Motion handles UI/layout transitions; GSAP handles section-level choreography; Three.js handles spatial topology only.
- Every GSAP context and ScrollTrigger must be scoped and reverted on unmount.
- Reduced motion removes long pins, camera movement, continuous signal movement, and unnecessary parallax while leaving all content and diagrams understandable.
- Validate at 1440, 1280, 1024, 768, 480, and 375/390 widths with no horizontal overflow, clipping, or inaccessible controls.
- Do not invent certifications, customers, awards, statistics, case studies, unsupported capabilities, or partner claims.

## Review Focus

- A route loaded directly or without JavaScript must still expose its heading, primary content, navigation, and metadata; pin this with prerender route assertions in Task 1 and Task 7.
- A user with `prefers-reduced-motion`, keyboard navigation, or no WebGL must still access every diagram's meaning and control; pin fallback and reduced-motion attributes in Task 2 and Task 6.
- A touch viewport must not depend on hover, horizontal dragging, or desktop-only pinned scenes; pin responsive DOM and overflow checks in Task 6.
- Existing anchor and external-link destinations must remain exact while sections move; pin route/link checks in Task 1 and Task 7.
- Lazy scenes and repeated scroll mounts must not leave duplicate listeners/triggers or inflate the initial bundle; pin cleanup and build/chunk checks in Task 2 and Task 8.

## File Map

- Shared visual tokens and responsive primitives: `src/styles/index.css`, `src/components/ui/Layout.tsx`, `src/components/ui/Typography.tsx`, `src/components/ui/Button.tsx`.
- Shared diagram primitives: create `src/components/diagrams/SystemNode.tsx`, `ConnectionPath.tsx`, `DiagramFrame.tsx`, `ProcessRail.tsx`, and `src/components/diagrams/index.ts`.
- Motion/runtime utilities: `src/hooks/useGsapContext.ts`, `src/hooks/useMotionMode.tsx`, create `src/hooks/useWebGLSupport.ts`, and extend `src/lib/motionPolicy.ts`.
- Shell: `src/components/layout/SiteHeader.tsx`, `src/components/layout/SiteFooter.tsx`, `src/components/layout/PageHero.tsx`, `src/components/layout/CoordinateRail.tsx`.
- Homepage: `src/pages/HomePage.tsx`, existing `src/components/sections/*`, create focused sections under `src/components/sections/system/` as required.
- Route-specific compositions: `src/pages/SolutionsPage.tsx`, `ServicesPage.tsx`, `AboutPage.tsx`, `InsightsPage.tsx`, `ContactPage.tsx`, `GoogleWorkspacePage.tsx`, `LegalPage.tsx`, `NotFoundPage.tsx`.
- Verification: create `scripts/verify-site.mjs`, and add `test:site` to `package.json`.

### Task 1: Establish the visual system and verification harness

**Files:**
- Create: `scripts/verify-site.mjs`
- Modify: `package.json`
- Modify: `src/styles/index.css`
- Modify: `src/components/ui/Layout.tsx`, `src/components/ui/Typography.tsx`, `src/components/ui/Button.tsx`
- Test: `scripts/verify-site.mjs`

**Interfaces:**
- Produces CSS tokens `--axleta-bg`, `--axleta-surface`, `--axleta-text`, `--axleta-muted`, `--axleta-line`, `--axleta-accent`, `--axleta-accent-soft`, and `--axleta-dark` plus stable grid/section utility classes consumed by all later tasks.
- Produces `npm run test:site`, which reads built output and asserts all `internalPages` routes, required headings/landmarks, canonical tags, and known navigation anchors exist.

- [ ] **Step 1: Write the failing verifier**

  Add `scripts/verify-site.mjs` using Node built-ins only. Assert that `dist/index.html` and every route in the existing `internalPages` manifest exist after prerendering; each document must contain `<main`, a heading, a `<nav`, a canonical URL, and must not contain `href="undefined"` or `src="undefined"`. Assert the known anchor paths `/solutions#erp`, `/solutions#applications`, `/solutions#infrastructure`, `/solutions#automation`, `/services#discover`, `/services#implement`, and `/services#improve` appear in the relevant built pages.

- [ ] **Step 2: Run the verifier to confirm RED**

  Run `npm run test:site` before the implementation and expect it to fail because the script is not yet registered or the build output is absent. The failure must identify the missing command/output, not a syntax error.

- [ ] **Step 3: Implement the token and verifier baseline**

  Add the explicit Axleta token aliases while retaining existing resolved Tailwind roles, define a drafting-grid utility and responsive system-frame utilities, add `test:site` to `package.json`, and implement the verifier with clear nonzero failures. Do not change copy or route data in this task.

- [ ] **Step 4: Run the baseline checks**

  Run `npm run build` then `npm run test:site`. Expected: production build/prerender exits 0 and the verifier reports all current routes/anchors pass.

- [ ] **Step 5: Commit**

  `git add scripts/verify-site.mjs package.json src/styles/index.css src/components/ui/Layout.tsx src/components/ui/Typography.tsx src/components/ui/Button.tsx && git commit -m "feat: establish Axleta visual system"`

### Task 2: Build accessible diagram and motion primitives

**Files:**
- Create: `src/components/diagrams/SystemNode.tsx`
- Create: `src/components/diagrams/ConnectionPath.tsx`
- Create: `src/components/diagrams/DiagramFrame.tsx`
- Create: `src/components/diagrams/ProcessRail.tsx`
- Create: `src/components/diagrams/index.ts`
- Create: `src/hooks/useWebGLSupport.ts`
- Modify: `src/hooks/useGsapContext.ts`, `src/hooks/useMotionMode.tsx`, `src/lib/motionPolicy.ts`
- Test: extend `scripts/verify-site.mjs` with static fallback and reduced-motion assertions

**Interfaces:**
- `SystemNode({ label, detail?, state?, active?, onSelect? }: SystemNodeProps)` renders an accessible button or static labelled node.
- `ConnectionPath({ d, label?, active?, animated? }: ConnectionPathProps)` renders an SVG path with a non-animated fallback.
- `DiagramFrame({ eyebrow, title, description, children, surface? }: DiagramFrameProps)` provides semantic heading/description and diagram region.
- `ProcessRail({ steps, activeIndex, onSelect? }: ProcessRailProps)` exposes keyboard-selectable steps and a non-interactive linear fallback.
- `useWebGLSupport(): boolean` returns capability state without making WebGL a content dependency.

- [ ] **Step 1: Write failing primitive contract assertions**

  Extend `scripts/verify-site.mjs` to assert that built HTML contains `data-diagram-fallback`, `aria-label`/`aria-labelledby` on diagram regions, and a reduced-motion marker on the homepage system composition.

- [ ] **Step 2: Run verifier to confirm RED**

  Run `npm run build && npm run test:site`. Expected: failure naming the missing diagram fallback markers.

- [ ] **Step 3: Implement primitives and cleanup hooks**

  Implement semantic SVG/HTML fallback primitives with stable dimensions, typed props, keyboard activation, visible selected state, and `useGsapContext` cleanup. Extend motion policy so reduced motion disables camera/parallax/continuous path animation while keeping opacity/state transitions.

- [ ] **Step 4: Run typecheck and verifier**

  Run `npm run typecheck && npm run build && npm run test:site`. Expected: all commands exit 0 and route HTML contains accessible diagram fallbacks.

- [ ] **Step 5: Commit**

  `git add src/components/diagrams src/hooks/useWebGLSupport.ts src/hooks/useGsapContext.ts src/hooks/useMotionMode.tsx src/lib/motionPolicy.ts scripts/verify-site.mjs && git commit -m "feat: add accessible system diagram primitives"`

### Task 3: Rebuild the shell and hero system field

**Files:**
- Modify: `src/components/layout/SiteHeader.tsx`, `SiteFooter.tsx`, `PageHero.tsx`, `CoordinateRail.tsx`
- Modify: `src/components/three/HeroScene.tsx`, `LazyHeroScene.tsx`
- Modify: `src/components/sections/Hero.tsx`
- Modify: `src/pages/HomePage.tsx`
- Test: extend `scripts/verify-site.mjs` with hero fallback/header assertions

**Interfaces:**
- `Hero` must render the headline, supporting copy, primary CTA, system labels, and an always-present static topology fallback before or without WebGL.
- `LazyHeroScene` may enhance the fallback only when `useWebGLSupport()` and viewport/lazy conditions permit; it must not own required text or links.
- `SiteHeader` retains existing `primaryNav`, mobile drawer, focus trap, escape behavior, and all current destination URLs.

- [ ] **Step 1: Write failing hero assertions**

  Assert that the prerendered homepage includes the headline, `data-system-field`, `data-webgl-fallback`, system labels for ERP, applications, infrastructure, and automation, and the header's existing CTA destination.

- [ ] **Step 2: Run verifier to confirm RED**

  Run `npm run build && npm run test:site`. Expected: failure on the new system-field/fallback markers.

- [ ] **Step 3: Implement shell and hero**

  Recompose the header as a quiet technical control that settles on scroll, preserve its accessibility behavior, and build the hero as a two-plane composition: readable HTML typography plus a purposeful SVG topology, with the existing Three.js scene as optional enhancement. Use Motion for local entrance and GSAP only for the section-level connection draw. Keep total entrance motion short and skip-friendly.

- [ ] **Step 4: Run checks**

  Run `npm run typecheck && npm run lint && npm run build && npm run test:site`. Expected: all pass; Vite may report existing large-chunk warnings but no errors.

- [ ] **Step 5: Commit**

  `git add src/components/layout src/components/three src/components/sections/Hero.tsx src/pages/HomePage.tsx scripts/verify-site.mjs && git commit -m "feat: rebuild Axleta system-field hero"`

### Task 4: Rebuild homepage system storytelling sections

**Files:**
- Modify: `src/pages/HomePage.tsx`
- Modify or split: `src/components/sections/Premise.tsx`, `SolutionsShowcase.tsx`, `Architecture.tsx`, `Engagement.tsx`, `Principles.tsx`
- Create: focused components under `src/components/sections/system/` for connected practices, ERP spine, companion network, infrastructure stack, automation flow, unified stack, and principles/ecosystem compositions.
- Test: extend `scripts/verify-site.mjs` with section IDs/content assertions

**Interfaces:**
- Each homepage section keeps a semantic heading, a stable `id`, and a static explanation matching the existing business content.
- `SystemNode`, `ConnectionPath`, `DiagramFrame`, and `ProcessRail` from Task 2 are the only shared diagram contracts; section components pass typed data rather than duplicating primitive behavior.

- [ ] **Step 1: Write failing narrative assertions**

  Assert that the homepage contains stable markers and factual labels for `connected-practices`, `erp-spine`, `companion-network`, `infrastructure-stack`, `automation-flow`, `unified-stack`, `engagement-rail`, `principles`, `ecosystem`, and `insights`.

- [ ] **Step 2: Run verifier to confirm RED**

  Run `npm run build && npm run test:site`. Expected: failure on the first missing new narrative marker.

- [ ] **Step 3: Implement section compositions**

  Replace repeated card/list rhythms with varied full-width bands, editorial offsets, SVG diagrams, assembly states, and one section-level GSAP timeline per complex composition. Preserve current copy and anchors. Make every interactive layer usable by click and keyboard, with static text explaining the same relationship.

- [ ] **Step 4: Run checks**

  Run `npm run typecheck && npm run lint && npm run build && npm run test:site`. Expected: all pass with no prerender failure and all homepage markers present.

- [ ] **Step 5: Commit**

  `git add src/pages/HomePage.tsx src/components/sections && git commit -m "feat: tell Axleta system story through diagrams"`

### Task 5: Recompose Solutions and Services routes

**Files:**
- Modify: `src/pages/SolutionsPage.tsx`, `src/pages/ServicesPage.tsx`
- Modify or create: route-specific components under `src/components/sections/solutions/` and `src/components/sections/services/`
- Test: extend `scripts/verify-site.mjs` with route-specific markers and anchor assertions

**Interfaces:**
- `/solutions` exposes `#erp`, `#applications`, `#infrastructure`, and `#automation` with the factual content from `src/data/solutions.ts`.
- `/services` exposes `#discover`, `#design`, `#implement`, and `#improve` with the existing service content and a continuous process rail.

- [ ] **Step 1: Write failing route assertions**

  Assert each route contains its required IDs, heading, diagram fallback, and exact existing anchors.

- [ ] **Step 2: Run verifier to confirm RED**

  Run `npm run build && npm run test:site`. Expected: failure on new route diagram markers.

- [ ] **Step 3: Implement route compositions**

  Build the solutions system-layer atlas and services continuous-line rail. Use SVG first, GSAP for one coordinated section timeline per route, and Motion only for local state. Keep direct navigation and no-JS reading intact.

- [ ] **Step 4: Run checks**

  Run `npm run typecheck && npm run lint && npm run build && npm run test:site`. Expected: all pass and all route anchors survive prerendering.

- [ ] **Step 5: Commit**

  `git add src/pages/SolutionsPage.tsx src/pages/ServicesPage.tsx src/components/sections/solutions src/components/sections/services scripts/verify-site.mjs && git commit -m "feat: build solutions and services system narratives"`

### Task 6: Recompose About, Insights, Contact, Google Workspace, legal, and error routes

**Files:**
- Modify: `src/pages/AboutPage.tsx`, `InsightsPage.tsx`, `ContactPage.tsx`, `GoogleWorkspacePage.tsx`, `LegalPage.tsx`, `NotFoundPage.tsx`
- Modify: `src/components/contact/ContactForm.tsx`, route-specific layout/section components as needed
- Test: extend `scripts/verify-site.mjs` with contact, external-link, legal, and no-WebGL assertions

**Interfaces:**
- Preserve `contact.email`, `contact.whatsapp`, `contact.address`, `contact.coverage`, existing form fields, external blog/referral/partner URLs, and legal copy from current data/content modules.
- Every route retains a semantic fallback with no hover-only content and no required WebGL state.

- [ ] **Step 1: Write failing route/content assertions**

  Assert the contact email, WhatsApp URL, address text, blog URL, Google Workspace referral, SAP/Google links, terms/privacy page headings, and 404 heading appear in their corresponding prerendered documents.

- [ ] **Step 2: Run verifier to confirm RED**

  Run `npm run build && npm run test:site`. Expected: failure on at least one new route composition marker.

- [ ] **Step 3: Implement route compositions**

  Use an editorial manifesto for About, featured/index treatment for Insights, a quiet CTA/form endpoint for Contact, a lighter practical system for Google Workspace, and restrained legal/error layouts. Preserve all semantic and factual content.

- [ ] **Step 4: Run checks**

  Run `npm run typecheck && npm run lint && npm run build && npm run test:site`. Expected: all pass with every route prerendered.

- [ ] **Step 5: Commit**

  `git add src/pages src/components/contact scripts/verify-site.mjs && git commit -m "feat: extend Axleta visual system across all routes"`

### Task 7: Responsive, accessibility, and reduced-motion pass

**Files:**
- Modify: `src/styles/index.css`, all new/changed diagram components, `src/components/layout/SiteHeader.tsx`, and affected pages/sections.
- Test: extend `scripts/verify-site.mjs` with static CSS/markup checks; use browser screenshots when available.

**Interfaces:**
- Desktop composition uses 12 columns; mobile compositions must not depend on horizontal drag, hover, or a pinned viewport.
- Every interactive diagram exposes keyboard/focus state and a reduced-motion/static mode.

- [ ] **Step 1: Write failing responsive/accessibility assertions**

  Assert stylesheet contains the reduced-motion rules, diagram controls have keyboard-accessible elements, every image has an alt attribute, and no new component uses `overflow-x: visible` or fixed viewport widths that can force overflow.

- [ ] **Step 2: Run verifier to confirm RED**

  Run `npm run test:site`. Expected: fail until the new responsive/accessibility markers and checks are present.

- [ ] **Step 3: Implement responsive and accessibility behavior**

  Add intentional mobile layouts, stable diagram dimensions, touch-friendly controls, focus states, reduced-motion branches, and WebGL fallback behavior. Simplify node count and pinned choreography on smaller viewports instead of merely shrinking desktop.

- [ ] **Step 4: Run checks and visual QA**

  Run `npm run typecheck && npm run lint && npm run build && npm run test:site`. Capture and inspect screenshots at 1440, 1280, 1024, 768, 480, and 390 widths; verify no overlap, clipping, broken anchors, horizontal overflow, or scroll-lock issues.

- [ ] **Step 5: Commit**

  `git add src/styles src/components src/pages scripts/verify-site.mjs && git commit -m "feat: harden Axleta responsive and accessible experience"`

### Task 8: Performance and final verification

**Files:**
- Modify: `vite.config.ts`, `package.json`, affected Three.js/GSAP components only where measurement identifies a problem.
- Test: `scripts/verify-site.mjs`, production bundle report, full build/prerender output.

**Interfaces:**
- Preserve the current manual chunks for Three, GSAP, Motion, Router, and React unless a measured improvement requires a change.
- No final visual change may remove semantic content or its static fallback.

- [ ] **Step 1: Write failing performance assertions**

  Extend the verifier to assert that the initial homepage HTML contains no required Three.js canvas-only content, heavy scenes are lazy/imported behind the existing boundary, and the build output contains expected manual chunk names.

- [ ] **Step 2: Run the baseline measurement**

  Run `npm run build` and record the bundle sizes and warnings. Expected: successful build; use the output to identify only actionable regressions.

- [ ] **Step 3: Implement measured optimizations**

  Keep WebGL lazy, dispose resources, avoid duplicate GSAP triggers, and adjust chunking or scene complexity only when the measurement supports it. Do not optimize by deleting required content.

- [ ] **Step 4: Run the final verification suite**

  Run `npm run typecheck && npm run lint && npm run build && npm run test:site`. Expected: all commands exit 0; prerender writes all 10 documents, sitemap, and robots; verifier reports no missing routes, anchors, metadata, or fallback markers.

- [ ] **Step 5: Commit**

  `git add package.json vite.config.ts src scripts && git commit -m "chore: verify Axleta creative revamp"`

