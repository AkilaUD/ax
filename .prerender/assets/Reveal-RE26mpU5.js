import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { jsx, jsxs } from "react/jsx-runtime";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
//#region src/data/site.ts
/**
* Site-wide configuration.
*
* Every contact detail in this file was verified against the live
* www.axleta.com public pages on 2026-09-30. Nothing here is inferred.
* See AXLETA_REVAMP_AUDIT.md for the source table.
*/
var site = {
	name: "Axleta",
	legalName: "Axleta",
	tagline: "Technology and Advancement",
	/** Used verbatim in <title> composition. */
	titleTemplate: "%s — Axleta",
	defaultTitle: "Axleta — Technology and Advancement",
	description: "Axleta designs, implements and supports the systems behind SME operations — ERP and business applications, infrastructure, automation and remote access.",
	locale: "en_GB",
	url: "https://www.axleta.com",
	founded: 2018,
	/** Rendered in the footer as a range, matching current copyright treatment. */
	copyrightRange: "2018–2026",
	ogImage: "/brand/logo.png"
};
var contact = {
	email: "info@axleta.com",
	whatsapp: {
		/** Verified live contact path on the current contact page. */
		href: "https://wa.me/94710956655",
		display: "+94 71 095 6655"
	},
	address: {
		label: "axleta Canada",
		street: "79 Beaconsfield Avenue",
		locality: "Brampton",
		region: "Ontario",
		postalCode: "L6Y 4S1",
		country: "Canada",
		countryCode: "CA"
	},
	/**
	* The live site states Axleta supports "SAP Business One Sri Lanka and
	* globally". No separate Sri Lankan street address is published, so none is
	* rendered and no map embed is used.
	*/
	coverage: "Sri Lanka and globally"
};
var external = {
	blog: "https://blog.axleta.com/",
	googleWorkspaceReferral: "https://referworkspace.app.goo.gl/ZJg9",
	sapBusinessOne: "https://www.sap.com/products/erp/business-one.html",
	sapS4hana: "https://www.sap.com/products/erp/s4hana.html",
	sapPartnerEdge: "https://www.sap.com/partners/partner-edge.html",
	googleCloud: "https://cloud.google.com/",
	googleWorkspace: "https://workspace.google.com/",
	proxmox: "https://www.proxmox.com/en/",
	sapPartnerEdgeTerms: "SAP"
};
var routes = {
	home: "/",
	about: "/about",
	solutions: "/solutions",
	services: "/services",
	insights: "/insights",
	contact: "/contact",
	googleWorkspace: "/google-workspace",
	terms: "/terms",
	privacy: "/privacy"
};
var primaryNav = [
	{
		label: "Solutions",
		heading: "Systems we build and run",
		indexPath: "/solutions",
		items: [
			{
				label: "ERP applications",
				description: "SAP Business One and S/4HANA Public Cloud",
				to: "/solutions#erp"
			},
			{
				label: "Companion applications",
				description: "Add-ons that extend your ERP into the process",
				to: "/solutions#applications"
			},
			{
				label: "Infrastructure & cloud",
				description: "Private cloud, servers, networks, storage, security",
				to: "/solutions#infrastructure"
			},
			{
				label: "Automation",
				description: "Workflow automation, integration, generative AI",
				to: "/solutions#automation"
			},
			{
				label: "Google Workspace",
				description: "Productivity suite for collaborating teams",
				to: "/google-workspace"
			}
		]
	},
	{
		label: "Services",
		heading: "How we engage",
		indexPath: "/services",
		items: [
			{
				label: "ERP consultancy",
				description: "Evaluation, selection and implementation",
				to: "/services#discover"
			},
			{
				label: "Strategic consultancy",
				description: "Finance, supply chain, marketing, operations",
				to: "/services#discover"
			},
			{
				label: "Custom development",
				description: "Add-ons and companion applications",
				to: "/services#implement"
			},
			{
				label: "Project management",
				description: "Budget, timeline and scope discipline",
				to: "/services#implement"
			},
			{
				label: "Resource allocation",
				description: "Flexible expert capacity and billing",
				to: "/services#improve"
			}
		]
	},
	{
		label: "Company",
		indexPath: "/about",
		items: [
			{
				label: "About",
				description: "Who we are and how we work",
				to: "/about"
			},
			{
				label: "Vision & mission",
				description: "What we are here to do",
				to: "/about#vision"
			},
			{
				label: "Partnerships",
				description: "Technology ecosystem",
				to: "/about#partnerships"
			},
			{
				label: "Insights",
				description: "Notes from the Axleta blog",
				to: "/insights"
			},
			{
				label: "Contact",
				description: "Start a conversation",
				to: "/contact"
			}
		]
	}
];
var footerNav = [
	{
		heading: "Solutions",
		links: [
			{
				label: "ERP applications",
				to: "/solutions#erp"
			},
			{
				label: "Companion applications",
				to: "/solutions#applications"
			},
			{
				label: "Infrastructure & cloud",
				to: "/solutions#infrastructure"
			},
			{
				label: "Automation",
				to: "/solutions#automation"
			},
			{
				label: "Google Workspace",
				to: "/google-workspace"
			}
		]
	},
	{
		heading: "Services",
		links: [
			{
				label: "ERP consultancy",
				to: "/services#discover"
			},
			{
				label: "Strategic consultancy",
				to: "/services#discover"
			},
			{
				label: "Custom development",
				to: "/services#implement"
			},
			{
				label: "Project management",
				to: "/services#implement"
			},
			{
				label: "Resource allocation",
				to: "/services#improve"
			}
		]
	},
	{
		heading: "Company",
		links: [
			{
				label: "About",
				to: "/about"
			},
			{
				label: "Vision & mission",
				to: "/about#vision"
			},
			{
				label: "Partnerships",
				to: "/about#partnerships"
			},
			{
				label: "Insights",
				to: "/insights"
			},
			{
				label: "Contact",
				to: "/contact"
			}
		]
	},
	{
		heading: "Elsewhere",
		links: [
			{
				label: "Axleta blog",
				href: "https://blog.axleta.com/"
			},
			{
				label: "Terms & conditions",
				to: "/terms"
			},
			{
				label: "Privacy policy",
				to: "/privacy"
			}
		]
	}
];
//#endregion
//#region src/lib/utils.ts
/** Tailwind-aware class merge. */
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var isBrowser = typeof window !== "undefined";
//#endregion
//#region src/lib/seo.ts
/**
* SEO metadata.
*
* `pageMeta` is a plain data registry so the same definitions can be applied
* imperatively in the browser and serialised into static HTML by the
* prerender script. `Seo` is a thin React wrapper that does the browser part.
*
* No ratings, review counts, awards, tax identifiers or social profiles are
* emitted, because none are verified (§31).
*/
var homeDescription = "Axleta designs, implements and supports the systems behind SME operations — SAP Business One and S/4HANA Public Cloud, companion applications, infrastructure, automation and remote access.";
var pageMeta = {
	home: {
		title: "Axleta — Technology and Advancement for SME operations",
		description: homeDescription,
		path: routes.home
	},
	about: {
		title: "About Axleta — a technology companion for business",
		description: "Founded in 2018, Axleta is an IT service firm supplying technology-driven systems and solutions for SMEs. Our vision, mission, values and technology ecosystem.",
		path: routes.about
	},
	solutions: {
		title: "Solutions — ERP, companion applications, infrastructure and automation",
		description: "SAP Business One and SAP S/4HANA Public Cloud, custom add-ons and companion applications, private cloud and infrastructure, security, virtualisation, and process automation.",
		path: routes.solutions
	},
	services: {
		title: "Services — ERP consultancy, development and project management",
		description: "Requirement analysis, ERP consultancy, strategic consultancy, customised add-on development, project management and flexible resource allocation.",
		path: routes.services
	},
	insights: {
		title: "Insights — notes on ERP, infrastructure and IT from the Axleta blog",
		description: "Technical and business writing from the Axleta blog on ERP, SAP Business One, Google Workspace, infrastructure and everyday IT.",
		path: routes.insights
	},
	contact: {
		title: "Contact Axleta — discuss your requirements",
		description: "Tell Axleta what you are trying to improve. Consultation on ERP, business applications, infrastructure, automation and technology planning.",
		path: routes.contact
	},
	googleWorkspace: {
		title: "Google Workspace — productivity for collaborating teams",
		description: "Axleta is a Google Cloud Partner for Google Cloud Platform and the Google productivity suite. Google Workspace for teams that need to collaborate, iterate and ship together.",
		path: routes.googleWorkspace
	},
	terms: {
		title: "Terms and conditions",
		description: "The terms governing use of the Axleta website and the services Axleta provides.",
		path: routes.terms
	},
	privacy: {
		title: "Privacy policy",
		description: "How Axleta collects, uses, protects and shares personal information.",
		path: routes.privacy
	},
	notFound: {
		title: "Page not found",
		description: "That route is not on the map. Here is where everything else lives.",
		path: "/404",
		noIndex: true
	}
};
var metaFor = (key) => pageMeta[key];
function organizationJsonLd() {
	return {
		"@context": "https://schema.org",
		"@type": "Organization",
		name: site.name,
		url: site.url,
		description: homeDescription,
		foundingDate: String(site.founded),
		email: contact.email,
		logo: `${site.url}${site.ogImage}`,
		image: `${site.url}${site.ogImage}`,
		slogan: site.tagline,
		address: {
			"@type": "PostalAddress",
			streetAddress: contact.address.street,
			addressLocality: contact.address.locality,
			addressRegion: contact.address.region,
			postalCode: contact.address.postalCode,
			addressCountry: contact.address.countryCode
		},
		areaServed: [contact.coverage],
		knowsAbout: [
			"SAP Business One",
			"SAP S/4HANA Public Cloud",
			"ERP",
			"IT infrastructure",
			"Process automation"
		],
		contactPoint: [{
			"@type": "ContactPoint",
			contactType: "sales",
			email: contact.email,
			url: `${site.url}${routes.contact}`,
			areaServed: contact.coverage,
			availableLanguage: "en"
		}]
	};
}
function webSiteJsonLd() {
	return {
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: site.name,
		url: site.url,
		inLanguage: site.locale,
		description: homeDescription
	};
}
function breadcrumbJsonLd(trail) {
	return {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: trail.map((item, index) => ({
			"@type": "ListItem",
			position: index + 1,
			name: item.name,
			item: `${site.url}${item.path}`
		}))
	};
}
var MANAGED_ATTR = "data-seo-managed";
function upsertMeta(selector, attrs) {
	let el = document.head.querySelector(selector);
	if (!el) {
		el = document.createElement("meta");
		el.setAttribute(MANAGED_ATTR, "");
		document.head.append(el);
	}
	for (const [key, value] of Object.entries(attrs)) el.setAttribute(key, value);
	return el;
}
function upsertLink(rel, href) {
	const selector = `link[rel="${rel}"]`;
	let el = document.head.querySelector(selector);
	if (!el) {
		el = document.createElement("link");
		el.setAttribute("rel", rel);
		el.setAttribute(MANAGED_ATTR, "");
		document.head.append(el);
	}
	el.setAttribute("href", href);
	return el;
}
/**
* Applies metadata imperatively. Tags this function created carry
* `data-seo-managed` so a route change never leaves stale tags behind.
*/
function applySeo(meta) {
	if (!isBrowser) return;
	const url = `${site.url}${meta.path}`;
	const fullTitle = meta.title;
	document.title = fullTitle;
	upsertMeta("meta[name=\"description\"]", {
		name: "description",
		content: meta.description
	});
	upsertMeta("meta[name=\"robots\"]", {
		name: "robots",
		content: meta.noIndex ? "noindex, follow" : "index, follow, max-image-preview:large"
	});
	upsertLink("canonical", url);
	upsertMeta("meta[property=\"og:title\"]", {
		property: "og:title",
		content: fullTitle
	});
	upsertMeta("meta[property=\"og:description\"]", {
		property: "og:description",
		content: meta.description
	});
	upsertMeta("meta[property=\"og:url\"]", {
		property: "og:url",
		content: url
	});
	upsertMeta("meta[property=\"og:image\"]", {
		property: "og:image",
		content: `${site.url}${site.ogImage}`
	});
	upsertMeta("meta[property=\"og:type\"]", {
		property: "og:type",
		content: meta.ogType ?? "website"
	});
	upsertMeta("meta[name=\"twitter:card\"]", {
		name: "twitter:card",
		content: "summary_large_image"
	});
	upsertMeta("meta[name=\"twitter:title\"]", {
		name: "twitter:title",
		content: fullTitle
	});
	upsertMeta("meta[name=\"twitter:description\"]", {
		name: "twitter:description",
		content: meta.description
	});
	upsertMeta("meta[name=\"twitter:image\"]", {
		name: "twitter:image",
		content: `${site.url}${site.ogImage}`
	});
}
function applyJsonLd(nodes) {
	if (!isBrowser) return;
	document.head.querySelectorAll(`script[${MANAGED_ATTR}]`).forEach((node) => node.remove());
	for (const node of nodes) {
		const script = document.createElement("script");
		script.type = "application/ld+json";
		script.setAttribute(MANAGED_ATTR, "");
		script.textContent = JSON.stringify(node);
		document.head.append(script);
	}
}
/**
* Serialises the same tags into an HTML string, for the prerender step.
* Kept deliberately in sync with `applySeo` — both read the same registry.
*/
function headTagsFor(meta, jsonLd = []) {
	const url = `${site.url}${meta.path}`;
	const fullTitle = meta.title;
	const image = `${site.url}${site.ogImage}`;
	const tags = [
		`<title>${escapeHtml(fullTitle)}</title>`,
		`<meta name="description" content="${escapeAttr(meta.description)}" />`,
		`<meta name="robots" content="${meta.noIndex ? "noindex, follow" : "index, follow, max-image-preview:large"}" />`,
		`<link rel="canonical" href="${url}" />`,
		`<meta property="og:title" content="${escapeAttr(fullTitle)}" />`,
		`<meta property="og:description" content="${escapeAttr(meta.description)}" />`,
		`<meta property="og:url" content="${url}" />`,
		`<meta property="og:type" content="${meta.ogType ?? "website"}" />`,
		`<meta property="og:image" content="${image}" />`,
		`<meta property="og:site_name" content="${site.name}" />`,
		`<meta property="og:locale" content="${site.locale}" />`,
		`<meta name="twitter:card" content="summary_large_image" />`,
		`<meta name="twitter:title" content="${escapeAttr(fullTitle)}" />`,
		`<meta name="twitter:description" content="${escapeAttr(meta.description)}" />`,
		`<meta name="twitter:image" content="${image}" />`
	];
	for (const node of jsonLd) tags.push(`<script type="application/ld+json" ${MANAGED_ATTR}>${JSON.stringify(node).replace(/</g, "\\u003c")}<\/script>`);
	return tags.join("\n    ");
}
function escapeHtml(value) {
	return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function escapeAttr(value) {
	return escapeHtml(value).replace(/"/g, "&quot;");
}
//#endregion
//#region src/lib/motionPolicy.ts
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
/**
* Reports the OS preference. Returns `true` outside a browser.
*
* A static render (prerender) has no way to know the visitor's setting, and the
* wrong answer there is the expensive one: assuming "no preference" would emit
* `initial` styles into the static HTML and park every reveal at opacity 0.
* Assuming "reduced" renders the resting state, which is the same markup the
* site ships for reduced-motion visitors.
*/
function prefersReducedMotion() {
	if (!isBrowser || !window.matchMedia) return true;
	return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
//#endregion
//#region src/hooks/useMotionMode.tsx
function usePrefersReducedMotion() {
	const [prefers, setPrefers] = useState(prefersReducedMotion);
	useEffect(() => {
		const query = window.matchMedia("(prefers-reduced-motion: reduce)");
		const onChange = () => setPrefers(query.matches);
		onChange();
		query.addEventListener("change", onChange);
		return () => query.removeEventListener("change", onChange);
	}, []);
	return prefers;
}
//#endregion
//#region src/lib/motion.ts
/**
* Centralised motion tokens.
*
* Every duration and easing curve in the project comes from here. No component
* should invent an easing value inline — the point of this file is that the
* whole site moves on one rhythm.
*/
var duration = {
	/** Micro-interactions: hover, focus, small state changes. */
	fast: .25,
	/** UI transitions: menus, accordions, layout swaps. */
	base: .5,
	/** Larger reveals and panel choreography. */
	slow: .9,
	/** Scroll-driven narrative sequences. */
	reveal: 1.1,
	/** Route transitions. Kept short — the user must never wait to interact. */
	route: .62
};
var ease = {
	/** Default UI easing. */
	standard: [
		.22,
		.61,
		.36,
		1
	],
	/** Things arriving. Fast out, long settle. */
	entrance: [
		.16,
		1,
		.3,
		1
	],
	/** Things leaving. */
	exit: [
		.4,
		0,
		1,
		1
	],
	/** Scrubbed, scroll-locked drawing. Symmetrical so it reverses cleanly. */
	line: [
		.65,
		0,
		.35,
		1
	],
	/** Slight overshoot for small, physical objects only. */
	settle: [
		.34,
		1.2,
		.64,
		1
	]
};
var stagger = {
	tight: .04,
	base: .07,
	loose: .12
};
/** Spring presets for Motion, used where layout is the point. */
var spring = {
	panel: {
		type: "spring",
		stiffness: 260,
		damping: 32,
		mass: .9
	},
	layout: {
		type: "spring",
		stiffness: 320,
		damping: 34,
		mass: .8
	}
};
/** Motion variants shared by route transitions and content reveals. */
var variants = {
	page: {
		initial: {
			opacity: 0,
			y: 14
		},
		enter: {
			opacity: 1,
			y: 0,
			transition: {
				duration: duration.route,
				ease: ease.entrance
			}
		},
		exit: {
			opacity: 0,
			y: -8,
			transition: {
				duration: duration.fast,
				ease: ease.exit
			}
		}
	},
	/** Reduced-motion substitute for `page`. */
	pageStatic: {
		initial: { opacity: 0 },
		enter: {
			opacity: 1,
			transition: { duration: duration.fast }
		},
		exit: {
			opacity: 0,
			transition: { duration: .1 }
		}
	}
};
/**
* Hero storytelling budget. The hero is the one place a longer sequence is
* justified, and it is capped so it never feels slow.
*/
var heroTimeline = {
	eyebrowAt: 0,
	headlineAt: .1,
	headlineStagger: .055,
	ledeAt: .52,
	actionsAt: .72,
	sceneAt: .2,
	total: 1.6
};
//#endregion
//#region src/components/ui/Layout.tsx
/** Full-width page shell with the fluid gutter. */
function Shell({ as: Tag = "div", className, children }) {
	return /* @__PURE__ */ jsx(Tag, {
		className: cn("mx-auto w-full max-w-shell px-gutter", className),
		children
	});
}
/**
* The 12-column grid.
*
* `rails` draws the column guides — Signature A, the coordinate rail. It is
* decorative and hidden from assistive technology and from print.
*/
function Grid({ className, rails = false, children }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "relative",
		children: [rails ? /* @__PURE__ */ jsx(ColumnGuides, {}) : null, /* @__PURE__ */ jsx("div", {
			className: cn("grid grid-cols-4 gap-x-6 md:grid-cols-8 lg:grid-cols-12", className),
			children
		})]
	});
}
function ColumnGuides() {
	return /* @__PURE__ */ jsx("div", {
		"aria-hidden": "true",
		className: "pointer-events-none absolute inset-0 hidden lg:block",
		children: /* @__PURE__ */ jsx("div", {
			className: "mx-auto h-full w-full max-w-shell px-gutter",
			children: /* @__PURE__ */ jsx("div", {
				className: "grid h-full grid-cols-4 gap-x-6 md:grid-cols-8 lg:grid-cols-12",
				children: Array.from({ length: 12 }, (_, i) => /* @__PURE__ */ jsx("div", {
					className: "border-l border-dashed border-black/[0.045]",
					children: /* @__PURE__ */ jsx("div", { className: "border-r border-dashed border-black/[0.045]" })
				}, i))
			})
		})
	});
}
/** Vertical section rhythm. The `tone` swap is the ink/paper device. */
function Section({ children, className, tone = "paper", id, tight = false, labelledBy, bleed = false }) {
	return /* @__PURE__ */ jsx("section", {
		id,
		"aria-labelledby": labelledBy,
		"data-surface": tone === "ink" ? "ink" : void 0,
		className: cn(tone === "ink" ? "surface-ink" : tone === "white" ? "bg-white" : tone === "sunken" ? "bg-surface-sunken" : "bg-surface", tight ? "py-section-y-tight" : "py-section-y", bleed && "overflow-hidden", className),
		children
	});
}
/** Spacing rhythm for the header / lede / body stack inside a section. */
function Stack({ children, className, gap = "md" }) {
	return /* @__PURE__ */ jsx("div", {
		className: cn(gap === "sm" ? "space-y-4" : gap === "lg" ? "space-y-10" : "space-y-7", className),
		children
	});
}
/** Hairline rule used as a structural divider, never as a card border. */
function Rule({ className, tone }) {
	return /* @__PURE__ */ jsx("hr", {
		"aria-hidden": "true",
		className: cn("h-px w-full border-0", tone === "ink" ? "bg-white/15" : "bg-border", className)
	});
}
//#endregion
//#region src/components/ui/Typography.tsx
/** Signature D — the live signal tick that sits before every eyebrow. */
function Signal({ tone }) {
	return /* @__PURE__ */ jsx("span", {
		"aria-hidden": "true",
		className: cn("axleta-signal-dot relative inline-block h-1.5 w-1.5 shrink-0 rounded-full", tone === "ink" ? "bg-accent-300" : "bg-accent-700"),
		children: /* @__PURE__ */ jsx("span", { className: cn("absolute inset-0 animate-ping rounded-full opacity-70", tone === "ink" ? "bg-accent-300" : "bg-accent-700") })
	});
}
/**
* Section eyebrow. `index` renders the drawing annotation number; `live`
* switches the pulsing tick off for non-active contexts.
*/
function Eyebrow({ children, index, tone = "paper", live = false, className, as: Tag = "p" }) {
	return /* @__PURE__ */ jsxs(Tag, {
		className: cn("label flex items-center gap-3", className),
		children: [
			live ? /* @__PURE__ */ jsx(Signal, { tone }) : /* @__PURE__ */ jsx("span", {
				className: "sr-only",
				children: "Section: "
			}),
			index ? /* @__PURE__ */ jsx("span", {
				className: cn("tabular-nums", tone === "ink" ? "text-accent-300" : "text-accent-700"),
				children: index
			}) : null,
			/* @__PURE__ */ jsx("span", { children })
		]
	});
}
/** Page-level display setting. */
function Display({ children, className, as: Tag = "h1", tone = "paper" }) {
	return /* @__PURE__ */ jsx(Tag, {
		className: cn("text-display font-display font-medium leading-[0.95] tracking-tightest", className),
		"data-tone": tone,
		children
	});
}
function Title({ children, className, as: Tag = "h2", id, tone = "paper" }) {
	return /* @__PURE__ */ jsx(Tag, {
		id,
		className: cn("text-title font-display font-medium", className),
		"data-tone": tone,
		children
	});
}
function Subtitle({ children, className, as: Tag = "h3", tone = "paper" }) {
	return /* @__PURE__ */ jsx(Tag, {
		className: cn("text-lead font-display font-medium leading-snug", className),
		"data-tone": tone,
		children
	});
}
/** Intro paragraph. The measure is capped here, not per-usage. */
function Lead({ children, className, tone = "paper" }) {
	return /* @__PURE__ */ jsx("p", {
		className: cn("measure text-lead leading-loose", className),
		"data-tone": tone,
		children
	});
}
function Body({ children, className, tone = "paper" }) {
	return /* @__PURE__ */ jsx("p", {
		className: cn("measure leading-body", className),
		"data-tone": tone,
		children
	});
}
/** Small mono note — captions, legal annotations, source attributions. */
function Note({ children, className, tone = "paper" }) {
	return /* @__PURE__ */ jsx("p", {
		className: cn("label text-neutral-700", tone === "ink" && "muted", className),
		"data-tone": tone,
		children
	});
}
/** Monospace architectural label, e.g. "ERP / BUSINESS SYSTEMS". */
function ArchitecturalLabel({ children, className, tone = "paper" }) {
	return /* @__PURE__ */ jsxs("span", {
		className: cn("label inline-flex items-center gap-2 tabular-nums", tone === "ink" ? "text-accent-300" : "text-accent-700", className),
		children: [/* @__PURE__ */ jsx("span", {
			"aria-hidden": "true",
			className: "inline-block h-px w-6 bg-current opacity-50"
		}), children]
	});
}
//#endregion
//#region src/lib/SeoTag.tsx
/**
* Declarative wrapper over the imperative SEO helpers.
*
* Deliberately client-side rather than using a head-management library: the
* tag set is small and fixed, and this keeps ~10 kB out of the bundle. The
* prerender step writes the same tags statically (see ./seo.ts).
*/
function Seo({ meta, trail, jsonLd }) {
	useEffect(() => {
		applySeo(meta);
		const nodes = [organizationJsonLd(), webSiteJsonLd()];
		if (trail && trail.length > 1) nodes.push(breadcrumbJsonLd(trail));
		if (jsonLd) nodes.push(...jsonLd);
		applyJsonLd(nodes);
	}, [
		meta,
		trail,
		jsonLd
	]);
	return null;
}
//#endregion
//#region src/hooks/useGsapContext.ts
var registered = false;
if (!registered && typeof window !== "undefined") {
	gsap.registerPlugin(ScrollTrigger);
	registered = true;
}
/** True once the element has entered the viewport. Used for pausing WebGL. */
function useInView(ref, options = {}) {
	const { once = false, rootMargin = "0px", threshold = 0 } = options;
	const [inView, setInView] = useState(() => typeof IntersectionObserver === "undefined");
	useEffect(() => {
		const element = ref.current;
		if (!element || typeof IntersectionObserver === "undefined") return;
		const observer = new IntersectionObserver(([entry]) => {
			if (entry?.isIntersecting) {
				setInView(true);
				if (once) observer.disconnect();
			} else if (!once) setInView(false);
		}, {
			rootMargin,
			threshold
		});
		observer.observe(element);
		return () => observer.disconnect();
	}, [
		ref,
		once,
		rootMargin,
		threshold
	]);
	return inView;
}
//#endregion
//#region src/components/ui/Reveal.tsx
/**
* Scroll reveal.
*
* Signature B — the System Index reveal. Each item carries a hairline top rule
* that draws left-to-right as the block enters, with the content rising behind
* it.
*
* Behaviour rules:
*  - Content is always in the DOM and always readable. Only opacity and
*    transform change, so a failed observer or a JS error cannot hide anything.
*  - Under `prefers-reduced-motion` (or Motion's reducedMotion: 'always') the
*    item renders at its resting state with no transform and no transition.
*/
/** Motion-wrapped tags we actually use, so the prop stays type-safe. */
var MOTION_TAGS = {
	div: motion.div,
	h2: motion.h2,
	h3: motion.h3,
	li: motion.li,
	span: motion.span
};
function Reveal({ children, className, index = 0, rule = false, delay = 0, as = "div", tone = "paper" }) {
	const reduced = usePrefersReducedMotion();
	const ref = useRef(null);
	const seen = useInView(ref, {
		once: true,
		threshold: .12,
		rootMargin: "0px 0px -8% 0px"
	});
	const Tag = MOTION_TAGS[as];
	const offset = delay + index * stagger.base;
	return /* @__PURE__ */ jsxs(Tag, {
		ref,
		className: cn("relative", className),
		initial: reduced ? { opacity: 1 } : {
			opacity: 0,
			y: 22
		},
		animate: reduced ? { opacity: 1 } : {
			opacity: seen ? 1 : 0,
			y: seen ? 0 : 22
		},
		transition: {
			duration: reduced ? 0 : duration.reveal,
			delay: reduced ? 0 : offset,
			ease: ease.entrance
		},
		children: [rule ? /* @__PURE__ */ jsx(motion.span, {
			"aria-hidden": "true",
			className: cn("absolute inset-x-0 top-0 block h-px origin-left", tone === "ink" ? "bg-white/25" : "bg-ink/25"),
			initial: reduced ? { scaleX: 1 } : { scaleX: 0 },
			animate: reduced ? { scaleX: 1 } : { scaleX: seen ? 1 : 0 },
			transition: {
				duration: reduced ? 0 : duration.slow,
				delay: reduced ? 0 : offset,
				ease: ease.line
			}
		}) : null, children]
	});
}
/**
* Word-by-word headline entrance. The heading element is fixed rather than
* dynamic so it stays accessible and typed.
*/
function SplitHeadline({ text, className, delay = 0, as = "h2" }) {
	const reduced = usePrefersReducedMotion();
	const Tag = as === "h1" ? motion.h1 : motion.h2;
	const words = text.split(" ");
	if (reduced) return /* @__PURE__ */ jsx(Tag, {
		className,
		initial: { opacity: 1 },
		animate: { opacity: 1 },
		children: text
	});
	return /* @__PURE__ */ jsx(Tag, {
		className: cn("flex flex-wrap", className),
		initial: "hidden",
		animate: "visible",
		variants: { visible: { transition: {
			staggerChildren: .055,
			delayChildren: delay
		} } },
		children: words.map((word, i) => /* @__PURE__ */ jsx("span", {
			className: "inline-flex overflow-hidden pb-[0.1em]",
			children: /* @__PURE__ */ jsxs(motion.span, {
				className: "inline-block",
				variants: {
					hidden: {
						y: "110%",
						opacity: 0
					},
					visible: {
						y: "0%",
						opacity: 1
					}
				},
				transition: {
					duration: duration.slow,
					ease: ease.entrance
				},
				children: [word, i < words.length - 1 ? "\xA0" : ""]
			})
		}, `${word}-${i}`))
	});
}
/**
* The capability signal bar — a static hairline strip listing what the practice
* covers. Intentionally not a marquee: a moving band is the first thing that
* reads as template, and it fights reading order on small screens.
*/
function SignalBar({ items, tone = "paper" }) {
	return /* @__PURE__ */ jsx("div", {
		className: "rule-t",
		"data-surface": tone === "ink" ? "ink" : void 0,
		children: /* @__PURE__ */ jsx("ul", {
			className: "flex flex-wrap items-center gap-x-8 gap-y-3 py-4",
			children: items.map((item) => /* @__PURE__ */ jsxs("li", {
				className: "label flex items-center gap-2.5",
				children: [/* @__PURE__ */ jsx("span", {
					"aria-hidden": "true",
					className: cn("axleta-signal-dot inline-block h-1 w-1 shrink-0 rounded-full", tone === "ink" ? "bg-accent-300" : "bg-accent-700")
				}), item]
			}, item))
		})
	});
}
//#endregion
export { organizationJsonLd as A, stagger as C, breadcrumbJsonLd as D, prefersReducedMotion as E, external as F, footerNav as I, primaryNav as L, webSiteJsonLd as M, cn as N, headTagsFor as O, contact as P, routes as R, spring as S, usePrefersReducedMotion as T, Shell as _, Seo as a, ease as b, Display as c, Note as d, Subtitle as f, Section as g, Rule as h, useInView as i, pageMeta as j, metaFor as k, Eyebrow as l, Grid as m, SignalBar as n, ArchitecturalLabel as o, Title as p, SplitHeadline as r, Body as s, Reveal as t, Lead as u, Stack as v, variants as w, heroTimeline as x, duration as y, site as z };
