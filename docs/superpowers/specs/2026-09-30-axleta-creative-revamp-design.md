# Axleta Creative Website Revamp Design

## Status

Approved in conversation on 2026-09-30. This document is the design authority for the implementation plan.

## Goal

Rebuild the Axleta website as a bespoke, architectural technology consultancy experience while preserving the existing business meaning, route structure, SEO, contact paths, legal content, accessibility, and prerendered delivery.

The core concept is **the business system as a living architecture**. Axleta should read as the company that connects and keeps business technology running, not as a collection of disconnected software products.

## Constraints and success criteria

- Preserve existing factual business content, links, partner wording, legal information, contact methods, and route semantics.
- Keep the existing React, TypeScript, Tailwind, Motion, GSAP, Three.js, React Three Fiber, and prerendering architecture unless a focused change is justified.
- Do not invent certifications, customers, awards, statistics, case studies, unsupported capabilities, or partner claims.
- Avoid generic SaaS patterns: repeated rounded cards, decorative gradients, meaningless particles, random 3D objects, and animation without semantic purpose.
- Use a mature palette derived from the existing brand: charcoal, warm paper, neutral drafting lines, and restrained Axleta blue.
- Use intentional 12-column desktop composition, route-specific layouts, semantic HTML, keyboard operation, visible focus, reduced-motion support, mobile-specific layouts, and no horizontal overflow.
- Keep the first contentful experience useful without WebGL. Heavy scenes must be progressive enhancements with graceful fallbacks.

## Experience architecture

### Shared shell

Retain a persistent header, footer, route transitions, scroll manager, SEO metadata, and prerendered route manifest. Refine them into one technical editorial language:

- Header begins quiet over the hero and becomes a compact surfaced control after scroll.
- Navigation retains all current destinations and accessible menu behavior.
- Footer keeps Solutions, Services, Company, Insights, Blog, Terms, Privacy, Contact, email, WhatsApp, location, and copyright information.
- Route transitions remain short and must not block reading or prerendering.

### Homepage narrative

The homepage becomes the primary system story in this order:

1. System Field hero: a purposeful topology of ERP, applications, infrastructure, automation, and data paths around the core headline.
2. Premise/system overview: why the architecture matters.
3. Connected practices: the four areas assemble as one system rather than four cards.
4. ERP spine: business functions attach to the ERP core.
5. Companion applications: extensions connect around the ERP core.
6. Infrastructure stack: network, security, storage, compute, virtualisation, services, and applications assemble in layers.
7. Automation flow: manual handoffs transform into direct system-to-system pathways.
8. Unified stack: the previous layers resolve into one connected architecture.
9. Engagement rail: Discover, Design, Implement, Improve form a continuous loop.
10. Principles: editorial manifesto with changing technical context.
11. Ecosystem: factual relationship map for SAP, Google Cloud, and Google Workspace.
12. Insights: editorial feature and archive preview.
13. Contact: quiet final CTA with the existing contact paths.

### Secondary routes

- `/solutions`: system-layer atlas with directly addressable `#erp`, `#applications`, `#infrastructure`, and `#automation` sections.
- `/services`: continuous engagement process with Discover, Design, Implement, and Improve.
- `/about`: principles and ecosystem editorial composition.
- `/insights`: magazine-style archive with featured story, metadata, and existing external blog links.
- `/contact`: focused conversion page preserving the existing form and direct contact information.
- `/google-workspace`: focused collaboration-system presentation using the same visual language with lower visual density.
- `/terms`, `/privacy`, and `/404`: preserve semantics and content; apply the shared typographic, grid, navigation, and surface system only.

## Visual system

### Tokens

Make the existing brand roles explicit in CSS tokens:

- `--axleta-bg`: near-black charcoal for system scenes.
- `--axleta-surface`: warm off-white paper for reading surfaces.
- `--axleta-text`: charcoal/ink text.
- `--axleta-muted`: accessible warm neutral text.
- `--axleta-line`: drafting/grid line color.
- `--axleta-accent`: Axleta blue for active paths, selected nodes, and primary actions.
- `--axleta-accent-soft`: restrained signal tint.
- `--axleta-dark`: deepest system surface.

Retain Archivo for display, IBM Plex Sans for reading, and IBM Plex Mono for technical metadata. Use the 12-column grid with asymmetric spans, narrow reading measures, section indices, technical labels, and varied vertical rhythm. Do not make every heading or section hero-scale.

### Diagram primitives

Create reusable, content-independent primitives where they remove duplication:

- `SystemNode`
- `ConnectionPath`
- `SectionIndex`
- `TechnicalLabel`
- `DiagramFrame`
- `ProcessRail`
- `SystemSpine`
- `InfrastructureStack`
- `AutomationFlow`

SVG is the default for explanatory diagrams. Three.js is reserved for the hero topology and, only if useful after profiling, one infrastructure depth scene.

## Motion architecture

- CSS handles simple line, hover, focus, and state transitions.
- Motion handles navigation, drawers, route transitions, local state changes, and layout transitions.
- GSAP and ScrollTrigger handle section-level choreography: assembly, spine connections, manual-to-automated transformation, and the engagement loop.
- Three.js handles spatial topology only; it must not carry required meaning alone.
- Every GSAP context and ScrollTrigger must be scoped and reverted on unmount.
- Reduced motion removes long pins, camera movement, continuous signal movement, and unnecessary parallax while leaving all content and diagrams understandable.
- No library should animate the same property as another library.

## Component and data boundaries

Keep content in the existing `src/data` and `src/content` modules. Refactor oversized visual sections into focused route/section components under `src/components`, `src/pages`, and `src/sections` only where needed. Shared primitives must receive data and state through typed props rather than hard-coding route-specific copy.

Use progressive enhancement in this order:

1. Semantic content and landmarks.
2. CSS layout and static diagram fallback.
3. SVG interaction and section-level motion.
4. WebGL enhancement where it adds spatial meaning.

## Performance and accessibility

- Lazy-load heavy visual scenes and initialize them near the viewport.
- Keep the current manual chunk strategy and measure any new dependency or scene cost.
- Dispose Three.js resources and revert animation contexts.
- Ensure keyboard users can operate every interactive layer and see focus.
- Never make hover the only way to access content.
- Preserve heading hierarchy, labels, link destinations, canonical metadata, Open Graph metadata, structured content, sitemap, and robots behavior.
- Validate at 1440, 1280, 1024, 768, 480, and 375/390 widths.
- Check no overlap, clipping, broken anchors, horizontal overflow, WebGL failure behavior, scroll-lock regressions, or layout shifts.

## Implementation sequence

1. Add/clarify tokens and shared visual primitives.
2. Rebuild the navigation, shell, and hero system field with fallback.
3. Rebuild homepage storytelling sections in the approved order.
4. Apply the system to Solutions and Services with route-specific diagrams.
5. Apply the system to About, Insights, Contact, Google Workspace, and legal/error routes.
6. Add responsive compositions, reduced-motion behavior, and accessibility checks.
7. Profile bundles and render behavior; remove any animation or dependency that does not earn its cost.
8. Run typecheck, lint, production build/prerender, route/link checks, and visual QA screenshots at the required viewports.

## Acceptance checklist

- Existing routes, content, contact paths, legal content, and factual partner relationships remain available.
- Homepage and secondary routes have a cohesive but varied architectural/editorial identity.
- Four practices read as one connected system.
- ERP, companion applications, infrastructure, automation, unified stack, engagement, principles, ecosystem, insights, and contact each have a meaningful visual treatment.
- WebGL is optional enhancement, not required content.
- Motion explains connection, architecture, flow, transformation, scale, or continuity.
- Reduced motion, keyboard navigation, mobile layouts, SEO, performance, and prerendering remain functional.
- The result does not resemble a generic AI/SaaS template.
