import { A as organizationJsonLd, C as stagger, D as breadcrumbJsonLd, E as prefersReducedMotion, F as external, I as footerNav, L as primaryNav, M as webSiteJsonLd, N as cn, O as headTagsFor, P as contact, R as routes$1, S as spring, T as usePrefersReducedMotion, _ as Shell, a as Seo, b as ease, c as Display, d as Note, f as Subtitle, g as Section, h as Rule, i as useInView, j as pageMeta, k as metaFor, l as Eyebrow, m as Grid, n as SignalBar, o as ArchitecturalLabel, p as Title, r as SplitHeadline, s as Body, t as Reveal, u as Lead, v as Stack, w as variants$1, x as heroTimeline, y as duration, z as site } from "./assets/Reveal-aoA4BZt0.js";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { Suspense, createElement, forwardRef, lazy, useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { renderToString } from "react-dom/server";
import { Link, StaticRouter, useLocation, useSearchParams } from "react-router-dom";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
//#region \0rolldown/runtime.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
//#endregion
//#region src/data/company.ts
/**
* Company record.
*
* Founding year, vision, mission, values and partnerships are taken from the
* live /about-axleta page (verified 2026-09-30). `verificationFlags` records
* every claim the brief or the legacy site asserted that the live content does
* not support, so it can be surfaced rather than silently rendered.
*/
var company = {
	name: "Axleta",
	founded: 2018,
	descriptor: "IT service firm supplying technology-driven systems and solutions for SMEs",
	/** One-line positioning used in the header/footer. */
	positioning: "The systems behind the business, designed and kept running.",
	story: [
		"Axleta was launched in 2018 as an IT service firm supplying technology-driven systems and solutions for SMEs.",
		"The firm was founded to give businesses technological solutions that enable business process advancement. We work with you to build a successful business using technology that suits your business scenario, and we treat that as a partnership — one that keeps your business context current as the technology moves.",
		"We value simplicity and we respect your values. Every engagement is worked through specific, measurable, achievable, realistic and time-bound objectives."
	],
	vision: "Be the technological companion in your business.",
	mission: "Find the right technology to suit the requirement, and advance the business function so the business succeeds. Our solutions are chosen for cost-effectiveness and fitness of purpose.",
	/** The current site states a single value. We do not pad it into a list. */
	values: [{
		title: "Simplicity",
		detail: "A system that nobody can operate is not a good system. We value simplicity because it is what makes technology usable after we leave."
	}, {
		title: "SMART objectives",
		detail: "Specific, measurable, achievable, realistic and time-bound. Ambiguity is expensive to discover late, so we remove it at the start."
	}]
};
var timeline = [
	{
		year: "2018",
		title: "Founded",
		detail: "Axleta launches as an IT service firm for SMEs, focused on ERP and business systems."
	},
	{
		year: "Core",
		title: "ERP as the centre of gravity",
		detail: "SAP Business One and S/4HANA Public Cloud become the backbone of the practice, with companion applications built alongside them."
	},
	{
		year: "Ecosystem",
		title: "Technology ecosystem",
		detail: "An official member of the SAP PartnerEdge open ecosystem, and a Google Cloud Partner for Google Cloud Platform and Google productivity products."
	},
	{
		year: "Now",
		title: "Connected practice",
		detail: "ERP, infrastructure, automation and support delivered as one connected system — for businesses in Sri Lanka and globally."
	}
];
var partners = [{
	id: "sap",
	/** Rendered as type, not a vendor logo. The brief forbids unapproved marks. */
	wordmark: "SAP",
	sublabel: "PartnerEdge",
	statement: "Official member of the SAP® PartnerEdge® open ecosystem.",
	detail: "Our ERP practice is built on SAP Business One and SAP S/4HANA Public Cloud, and we hold the expertise and tooling to deliver against them.",
	href: "https://www.sap.com/partners/partner-edge.html",
	linkLabel: "About SAP PartnerEdge"
}, {
	id: "google-cloud",
	wordmark: "Google Cloud",
	sublabel: "Cloud Platform",
	statement: "Google Cloud Partner.",
	detail: "We introduce and sell products based on the Google Cloud Platform and the Google productivity suite, including Google Workspace.",
	href: "https://cloud.google.com/",
	linkLabel: "Visit Google Cloud"
}];
/**
* Claims that exist in the brief or in legacy text but are NOT supported by the
* live public site. Rendered nowhere; reported in the audit and changelog.
*/
var verificationFlags = [
	{
		claim: "TSPlus partnership",
		status: "unverified",
		detail: "The brief lists TSPlus as an About-page partnership and asks for it in contact-form options. TSPlus appears nowhere on the live axleta.com site; remote access is published as Microsoft Remote Desktop Web Service.",
		resolution: "Not rendered as a partnership. Remote access is described using the published Microsoft RDS wording. Needs client confirmation before any TSPlus claim ships."
	},
	{
		claim: "Axleta Academy",
		status: "unsupported",
		detail: "Referenced in the live Terms & Conditions and Privacy Policy as an education and training platform. No Academy page, route or product exists on the site.",
		resolution: "Legal copy rewritten to describe the consultancy only. Academy references removed pending a decision. Needs client confirmation."
	},
	{
		claim: "Client counts, uptime figures, testimonials, case studies",
		status: "unsupported",
		detail: "No statistics, testimonials, named clients or case studies exist anywhere in the current public content.",
		resolution: "No numeric claims are made anywhere on the new site. Section 14 of the brief is expressed as evidence-based principles instead."
	},
	{
		claim: "Sri Lankan office address",
		status: "unverified",
		detail: "The Services page states support for \"SAP Business One Sri Lanka and globally\", and the contact number is a +94 number, but no Sri Lankan street address is published.",
		resolution: "Only the verified axleta Canada address is rendered, and no map embed is used. Needs client confirmation if an office address should appear."
	},
	{
		claim: "Photography",
		status: "unverified",
		detail: "The current site has effectively no photography. Only the logo is a usable brand asset.",
		resolution: "Sections are composed from typography, system diagrams and the verified logo. No stock photography has been introduced."
	}
];
/** Non-numeric principles for the "Why Axleta" section. */
var principles = [
	{
		index: "01",
		label: "Business before system",
		detail: "We map technology to the way your business actually operates. The process sets the requirement; the product answers it."
	},
	{
		index: "02",
		label: "Fitness of purpose",
		detail: "We focus on practical technology choices that balance fit, cost and long-term maintainability — not on what is newest."
	},
	{
		index: "03",
		label: "ERP domain understanding",
		detail: "SAP Business One and S/4HANA are not a product we resell. They are platforms we know well enough to configure, extend and support."
	},
	{
		index: "04",
		label: "Build, do not bolt on",
		detail: "Where the ERP stops short, we build the companion application alongside it — so the data stays in one place and stays correct."
	},
	{
		index: "05",
		label: "The foundation counts",
		detail: "Infrastructure, network, storage, security and virtualisation are designed in the same conversation as the application."
	},
	{
		index: "06",
		label: "Implementation and support",
		detail: "Going live is the midpoint. Support, optimisation and the next increment are part of the engagement, not a separate sale."
	},
	{
		index: "07",
		label: "Partnership, not resale",
		detail: "We work inside your business context and keep it current as the technology moves, rather than handing over and stepping back."
	}
];
//#endregion
//#region src/components/ui/Button.tsx
/**
* Button and link primitives.
*
* The travelling arrow (Signature D) lives in the label: on hover/focus the
* glyph shifts a character-width to the right and the rule beneath draws out.
* Under reduced motion the arrow does not move — only its colour changes.
*/
var base = "group relative inline-flex items-center justify-center gap-2.5 font-mono uppercase leading-none tracking-label transition-[background-color,color,border-color,transform] duration-300 ease-[var(--ease-standard)] select-none disabled:pointer-events-none disabled:opacity-45";
var variants = {
	primary: "bg-action text-paper hover:bg-action-hover active:translate-y-px",
	secondary: "border border-line-strong bg-transparent text-ink hover:border-ink hover:bg-ink hover:text-paper",
	ghost: "bg-transparent text-ink hover:text-accent-700",
	quiet: "border border-white/25 bg-transparent text-paper hover:border-accent-300 hover:text-accent-300"
};
var sizes = {
	sm: "h-9 px-3.5 text-micro",
	md: "h-11 px-5 text-eyebrow",
	lg: "h-13 px-6 text-eyebrow"
};
/** The travelling arrow. Purely decorative — the accessible name is the label. */
function Arrow({ children, className }) {
	return /* @__PURE__ */ jsx("span", {
		"aria-hidden": "true",
		className: cn("inline-block transition-transform duration-300 ease-[var(--ease-entrance)]", "group-hover:translate-x-1 group-focus-visible:translate-x-1", "motion-reduce:transform-none", className),
		children: children ?? "→"
	});
}
function inner(children, trailing) {
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("span", { children }), trailing ? /* @__PURE__ */ jsx(Arrow, { children: trailing }) : null] });
}
function ButtonLink({ children, variant = "primary", size = "md", className, trailing = "→", to, onClick, ...rest }) {
	const external = /^https?:\/\//.test(to);
	const classes = cn(base, variants[variant], sizes[size], className);
	if (external) return /* @__PURE__ */ jsxs("a", {
		href: to,
		className: classes,
		target: "_blank",
		rel: "noopener noreferrer",
		onClick,
		...rest,
		children: [inner(children, trailing), /* @__PURE__ */ jsx("span", {
			className: "sr-only",
			children: " (opens in a new tab)"
		})]
	});
	return /* @__PURE__ */ jsx(Link, {
		to,
		className: classes,
		onClick,
		...rest,
		children: inner(children, trailing)
	});
}
var Button = forwardRef(function Button({ children, variant = "primary", size = "md", className, trailing, loading, disabled, ...rest }, ref) {
	return /* @__PURE__ */ jsx("button", {
		ref,
		className: cn(base, variants[variant], sizes[size], className),
		disabled: disabled || loading,
		"aria-busy": loading || void 0,
		...rest,
		children: inner(children, trailing)
	});
});
/**
* Text link with an animated underline. Used where a filled button would be
* too heavy — inline prose references, "read more", section cross-links.
*/
function ArrowLink({ to, children, className, tone = "paper", external, onClick }) {
	const isExternal = external ?? /^https?:\/\//.test(to);
	const content = /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("span", {
		className: "relative",
		children: [children, /* @__PURE__ */ jsx("span", {
			"aria-hidden": "true",
			className: cn("absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-100 transition-transform duration-300", "ease-[var(--ease-entrance)] group-hover:scale-x-0 group-focus-visible:scale-x-0", "motion-reduce:transition-none", tone === "ink" ? "bg-accent-300" : "bg-accent-700")
		})]
	}), /* @__PURE__ */ jsx("span", {
		"aria-hidden": "true",
		className: cn("inline-block transition-transform duration-300 ease-[var(--ease-entrance)]", "group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-reduce:transform-none", tone === "ink" ? "text-accent-300" : "text-accent-700"),
		children: "→"
	})] });
	const classes = cn("group inline-flex items-center gap-1.5 font-mono uppercase tracking-label", "transition-colors duration-300", tone === "ink" ? "text-paper hover:text-accent-300" : "text-ink hover:text-accent-700", className);
	if (isExternal) return /* @__PURE__ */ jsxs("a", {
		href: to,
		className: classes,
		target: "_blank",
		rel: "noopener noreferrer",
		onClick,
		children: [content, /* @__PURE__ */ jsx("span", {
			className: "sr-only",
			children: " (opens in a new tab)"
		})]
	});
	return /* @__PURE__ */ jsx(Link, {
		to,
		className: classes,
		onClick,
		children: content
	});
}
/** Fixed affordance for the primary conversion action in a section footer. */
function CtaPair({ primary, secondary, tone = "paper", className }) {
	return /* @__PURE__ */ jsxs("div", {
		className: cn("flex flex-wrap items-center gap-x-6 gap-y-3", className),
		children: [/* @__PURE__ */ jsx(ButtonLink, {
			to: primary.to,
			variant: "primary",
			size: "lg",
			onClick: primary.onClick,
			children: primary.label
		}), secondary ? /* @__PURE__ */ jsx(ArrowLink, {
			to: secondary.to,
			tone,
			onClick: secondary.onClick,
			children: secondary.label
		}) : null]
	});
}
//#endregion
//#region src/components/ui/Chrome.tsx
/**
* Site chrome primitives shared by the header, footer and interior pages.
*/
/**
* The Axleta wordmark, drawn from the supplied raster logo.
*
* The lockup is the logo itself, left aligned with the type it sits beside.
* `invert` is for ink grounds — the logo is azure, which passes on ink but
* loses its edge on paper at small sizes, so the ink variant sits on a
* hairline plate rather than recolouring the mark.
*/
var Wordmark = forwardRef(function Wordmark({ className, invert = false, priority = false }, ref) {
	return /* @__PURE__ */ jsx("img", {
		ref,
		src: "/brand/logo.png",
		alt: "Axleta",
		width: 491,
		height: 185,
		loading: priority ? "eager" : "lazy",
		decoding: priority ? "sync" : "async",
		className: cn("h-auto w-auto select-none", invert ? "rounded-xs bg-white/[0.06] px-2 py-1.5" : "", className),
		style: { width: "clamp(7.5rem, 9vw, 9.75rem)" }
	});
});
/** Footer "back to top" control. Uses a real anchor so it works without JS. */
function BackToTop() {
	return /* @__PURE__ */ jsxs("a", {
		href: "#top",
		className: "group label inline-flex items-center gap-2 text-neutral-300 transition-colors duration-300 hover:text-paper",
		children: [/* @__PURE__ */ jsx("span", {
			"aria-hidden": "true",
			className: "inline-block transition-transform duration-300 ease-[var(--ease-entrance)] group-hover:-translate-y-0.5 motion-reduce:transform-none",
			children: "↑"
		}), "Back to top"]
	});
}
/** Breadcrumb trail. Rendered visually and as BreadcrumbList structured data. */
function Breadcrumbs({ trail, tone = "paper" }) {
	return /* @__PURE__ */ jsx("nav", {
		"aria-label": "Breadcrumb",
		className: cn("label flex flex-wrap items-center gap-2"),
		children: /* @__PURE__ */ jsx("ol", {
			className: "flex flex-wrap items-center gap-2",
			children: trail.map((item, i) => {
				const isLast = i === trail.length - 1;
				return /* @__PURE__ */ jsx("li", {
					className: "flex items-center gap-2",
					children: isLast ? /* @__PURE__ */ jsx("span", {
						"aria-current": "page",
						className: tone === "ink" ? "text-accent-300" : "text-accent-700",
						children: item.name
					}) : /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Link, {
						to: item.path,
						className: cn("transition-colors duration-300", tone === "ink" ? "text-neutral-300 hover:text-accent-300" : "text-neutral-700 hover:text-accent-700"),
						children: item.name
					}), /* @__PURE__ */ jsx("span", {
						"aria-hidden": "true",
						className: tone === "ink" ? "text-neutral-500" : "text-neutral-700",
						children: "/"
					})] })
				}, item.path);
			})
		})
	});
}
//#endregion
//#region src/components/layout/SiteFooter.tsx
/**
* Site footer.
*
* The footer is the site index: every route appears, the contact block is
* repeated, and the technology relationships are stated in plain type rather
* than vendor logos, since no vendor has authorised mark use here.
*
* Inked ground — this is the site's closing note and the strongest ink/paper
* contrast transition on the page.
*/
function SiteFooter() {
	return /* @__PURE__ */ jsx("footer", {
		"data-surface": "ink",
		className: "surface-ink",
		children: /* @__PURE__ */ jsxs(Shell, {
			className: "py-section-y-tight",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "grid grid-cols-4 gap-x-6 gap-y-10 md:grid-cols-8 lg:grid-cols-12",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "col-span-4 md:col-span-8 lg:col-span-5",
						children: [
							/* @__PURE__ */ jsx(Eyebrow, {
								index: "··",
								tone: "ink",
								live: true,
								children: "Next step"
							}),
							/* @__PURE__ */ jsx("h2", {
								className: "mt-6 max-w-lg text-title font-display font-medium leading-[0.98] tracking-tightest",
								children: "Tell us what you are trying to improve."
							}),
							/* @__PURE__ */ jsxs("p", {
								className: "measure mt-6 leading-loose text-neutral-300",
								children: [company.positioning, " Start with a conversation about the requirement — we will work out the fit before anyone talks about a purchase order."]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "mt-8 flex flex-wrap items-center gap-x-7 gap-y-4",
								children: [/* @__PURE__ */ jsxs(Link, {
									to: routes$1.contact,
									onClick: () => void 0,
									className: "group relative inline-flex h-12 items-center gap-2.5 bg-accent-300 px-6 font-mono text-eyebrow uppercase tracking-label text-ink transition-colors duration-300 hover:bg-paper",
									children: [/* @__PURE__ */ jsx("span", { children: "Discuss requirements" }), /* @__PURE__ */ jsx("span", {
										"aria-hidden": "true",
										className: "transition-transform duration-300 ease-[var(--ease-entrance)] group-hover:translate-x-1 motion-reduce:transform-none",
										children: "→"
									})]
								}), /* @__PURE__ */ jsx("a", {
									href: `mailto:${contact.email}`,
									className: "label text-paper underline-offset-4 hover:text-accent-300 hover:underline",
									children: contact.email
								})]
							})
						]
					}), /* @__PURE__ */ jsx("nav", {
						"aria-label": "Footer",
						className: "col-span-4 md:col-span-8 lg:col-span-6 lg:col-start-7",
						children: /* @__PURE__ */ jsx("div", {
							className: "grid grid-cols-2 gap-x-6 gap-y-9 sm:grid-cols-4",
							children: footerNav.map((column) => /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
								className: "label text-accent-300",
								children: column.heading
							}), /* @__PURE__ */ jsx("ul", {
								className: "mt-5 space-y-3",
								children: column.links.map((link) => /* @__PURE__ */ jsx("li", { children: "to" in link ? /* @__PURE__ */ jsx(Link, {
									to: link.to,
									className: "text-sm text-paper/85 underline-offset-4 transition-colors duration-300 hover:text-accent-300 hover:underline",
									children: link.label
								}) : /* @__PURE__ */ jsxs("a", {
									href: link.href,
									target: "_blank",
									rel: "noopener noreferrer",
									onClick: () => (link.label, void 0),
									className: "text-sm text-paper/85 underline-offset-4 transition-colors duration-300 hover:text-accent-300 hover:underline",
									children: [link.label, /* @__PURE__ */ jsx("span", {
										className: "sr-only",
										children: " (opens in a new tab)"
									})]
								}) }, link.label))
							})] }, column.heading))
						})
					})]
				}),
				/* @__PURE__ */ jsx(Rule, { className: "mt-section-y-tight bg-white/12" }),
				/* @__PURE__ */ jsxs("div", {
					className: "grid grid-cols-4 gap-x-6 gap-y-10 pt-10 md:grid-cols-8 lg:grid-cols-12",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "col-span-4 md:col-span-4 lg:col-span-3",
							children: [/* @__PURE__ */ jsx(Wordmark, { invert: true }), /* @__PURE__ */ jsxs("address", {
								className: "mt-6 not-italic",
								children: [/* @__PURE__ */ jsxs(Note, {
									tone: "ink",
									children: [
										contact.address.label,
										" · ",
										contact.coverage
									]
								}), /* @__PURE__ */ jsxs("p", {
									className: "mt-3 text-sm leading-relaxed text-paper/80",
									children: [
										contact.address.street,
										/* @__PURE__ */ jsx("br", {}),
										contact.address.locality,
										", ",
										contact.address.region,
										" ",
										contact.address.postalCode,
										/* @__PURE__ */ jsx("br", {}),
										contact.address.country
									]
								})]
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "col-span-4 md:col-span-4 lg:col-span-3 lg:col-start-5",
							children: [
								/* @__PURE__ */ jsx("h3", {
									className: "label text-accent-300",
									children: "Relationships"
								}),
								/* @__PURE__ */ jsx("ul", {
									className: "mt-5 space-y-4",
									children: partners.map((partner) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("a", {
										href: partner.href,
										target: "_blank",
										rel: "noopener noreferrer",
										className: "group inline-flex flex-col gap-1",
										children: [/* @__PURE__ */ jsxs("span", {
											className: "font-display text-lg tracking-tightest text-paper transition-colors duration-300 group-hover:text-accent-300",
											children: [partner.wordmark, /* @__PURE__ */ jsx("span", {
												className: "ml-2 font-mono text-micro uppercase tracking-label text-neutral-500",
												children: partner.sublabel
											})]
										}), /* @__PURE__ */ jsx("span", {
											className: "max-w-xs text-sm leading-relaxed text-paper/70",
											children: partner.statement
										})]
									}) }, partner.id))
								}),
								/* @__PURE__ */ jsx(Note, {
									tone: "ink",
									className: "mt-5",
									children: "Technology names are the property of their owners."
								})
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "col-span-4 md:col-span-4 lg:col-span-4 lg:col-start-9",
							children: [
								/* @__PURE__ */ jsx("h3", {
									className: "label text-accent-300",
									children: "Talk to a person"
								}),
								/* @__PURE__ */ jsxs(Stack, {
									gap: "sm",
									className: "mt-5",
									children: [/* @__PURE__ */ jsx("a", {
										href: `mailto:${contact.email}`,
										className: "font-display text-lg tracking-tightest text-paper underline-offset-4 hover:text-accent-300 hover:underline",
										children: contact.email
									}), /* @__PURE__ */ jsxs("a", {
										href: contact.whatsapp.href,
										target: "_blank",
										rel: "noopener noreferrer",
										className: "font-display text-lg tracking-tightest text-paper underline-offset-4 hover:text-accent-300 hover:underline",
										onClick: () => void 0,
										children: [
											"WhatsApp ",
											contact.whatsapp.display,
											/* @__PURE__ */ jsx("span", {
												className: "sr-only",
												children: " (opens in a new tab)"
											})
										]
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "mt-7 flex flex-wrap gap-x-6 gap-y-3",
									children: [
										/* @__PURE__ */ jsx(ArrowLink, {
											to: routes$1.terms,
											tone: "ink",
											children: "Terms"
										}),
										/* @__PURE__ */ jsx(ArrowLink, {
											to: routes$1.privacy,
											tone: "ink",
											children: "Privacy"
										}),
										/* @__PURE__ */ jsx(ArrowLink, {
											to: external.blog,
											tone: "ink",
											external: true,
											onClick: () => void 0,
											children: "Blog"
										})
									]
								})
							]
						})
					]
				}),
				/* @__PURE__ */ jsx(Rule, { className: "mt-12 bg-white/12" }),
				/* @__PURE__ */ jsxs("div", {
					className: "flex flex-col gap-5 pt-8 sm:flex-row sm:items-end sm:justify-between",
					children: [/* @__PURE__ */ jsxs("p", {
						className: "label text-neutral-500",
						children: [
							"© ",
							site.copyrightRange,
							" ",
							site.legalName,
							". All rights reserved."
						]
					}), /* @__PURE__ */ jsxs("div", {
						className: "flex flex-wrap items-center gap-x-7 gap-y-3",
						children: [/* @__PURE__ */ jsx(Note, {
							tone: "ink",
							children: site.tagline
						}), /* @__PURE__ */ jsx(BackToTop, {})]
					})]
				})
			]
		})
	});
}
//#endregion
//#region src/hooks/useMediaQuery.ts
/** Reactive media query. SSR/prerender-safe: returns `false` on the server. */
function useMediaQuery(query) {
	const [matches, setMatches] = useState(() => {
		if (typeof window === "undefined" || !window.matchMedia) return false;
		return window.matchMedia(query).matches;
	});
	useEffect(() => {
		if (!window.matchMedia) return;
		const mql = window.matchMedia(query);
		const onChange = () => setMatches(mql.matches);
		onChange();
		mql.addEventListener("change", onChange);
		return () => mql.removeEventListener("change", onChange);
	}, [query]);
	return matches;
}
/** Tailwind's `lg` breakpoint, expressed as a query. */
var useIsDesktop = () => useMediaQuery("(min-width: 64rem)");
var useCanHover = () => useMediaQuery("(hover: hover) and (pointer: fine)");
/** Locks body scroll while an overlay is open, restoring it reliably. */
function useBodyScrollLock(locked) {
	useEffect(() => {
		if (!locked) return;
		const { body, documentElement } = document;
		const previousOverflow = body.style.overflow;
		const previousPaddingRight = body.style.paddingRight;
		const scrollbarWidth = window.innerWidth - documentElement.clientWidth;
		body.style.overflow = "hidden";
		if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;
		return () => {
			body.style.overflow = previousOverflow;
			body.style.paddingRight = previousPaddingRight;
		};
	}, [locked]);
}
//#endregion
//#region src/hooks/useScrollState.ts
/**
* rAF-throttled scroll listener.
*
* Every scroll consumer in the app shares this one subscription pattern, so
* there is exactly one passive listener per hook instance and no layout read
* outside a rAF callback.
*/
function useScrollValue(compute, deps = []) {
	const [value, setValue] = useState(() => compute(0));
	const frame = useRef(0);
	useEffect(() => {
		const read = () => {
			frame.current = 0;
			setValue(compute(window.scrollY));
		};
		const onScroll = () => {
			if (frame.current) return;
			frame.current = window.requestAnimationFrame(read);
		};
		read();
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onScroll, { passive: true });
		return () => {
			if (frame.current) window.cancelAnimationFrame(frame.current);
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onScroll);
		};
	}, deps);
	return value;
}
/** True once the page has scrolled past `threshold` pixels. */
function useScrolled(threshold = 12) {
	return useScrollValue((y) => y > threshold, [threshold]);
}
//#endregion
//#region src/components/layout/SiteHeader.tsx
/**
* Site header.
*
* Behaviour:
*  - Transparent over the hero on the homepage, then settles onto a solid
*    paper ground with a hairline once scrolled.
*  - Desktop: full-bleed mega panel opened by hover *or* keyboard focus.
*    Escape closes it, focus returns to the trigger, and arrow keys are not
*    intercepted — the panel is a plain list of links inside a dialog-ish
*    region so the tab order is the natural one.
*  - Mobile: a full-height drawer, scroll-locked, with focus trapping and
*    Escape-to-close.
*
* Accessibility notes:
*  - The mega panel is not a menu role. It is a labelled region of links, so
*    screen readers announce it as content rather than forcing menu semantics.
*  - `aria-expanded` is on the trigger; `aria-controls` points at the panel.
*  - Both surfaces are rendered only when open, so nothing focusable is hidden.
*/
function SiteHeader() {
	const location = useLocation();
	const scrolled = useScrolled(24);
	const isDesktop = useIsDesktop();
	const canHover = useCanHover();
	const reduced = usePrefersReducedMotion();
	const panelId = useId();
	const drawerId = useId();
	const [openGroup, setOpenGroup] = useState(null);
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [mobileGroup, setMobileGroup] = useState(null);
	const closeTimer = useRef(0);
	const isHome = location.pathname === routes$1.home;
	const routeKey = `${location.pathname}${location.hash}`;
	const [menuRoute, setMenuRoute] = useState(routeKey);
	if (menuRoute !== routeKey) {
		setMenuRoute(routeKey);
		setOpenGroup(null);
		setDrawerOpen(false);
		setMobileGroup(null);
	}
	useBodyScrollLock(drawerOpen);
	useEffect(() => {
		if (!openGroup && !drawerOpen) return;
		const onKey = (event) => {
			if (event.key !== "Escape") return;
			if (drawerOpen) setDrawerOpen(false);
			else setOpenGroup(null);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [openGroup, drawerOpen]);
	const openNow = (label) => {
		window.clearTimeout(closeTimer.current);
		setOpenGroup(label);
	};
	const closeSoon = useCallback(() => {
		if (!canHover) return;
		window.clearTimeout(closeTimer.current);
		closeTimer.current = window.setTimeout(() => setOpenGroup(null), 140);
	}, [canHover]);
	useEffect(() => () => window.clearTimeout(closeTimer.current), []);
	return /* @__PURE__ */ jsxs("header", {
		"data-header": true,
		className: cn("fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter]", "duration-500 ease-[var(--ease-standard)]", scrolled || !isHome ? "border-b border-border bg-surface/92 backdrop-blur-md" : "border-b border-transparent bg-transparent"),
		children: [
			/* @__PURE__ */ jsx("a", {
				href: "#main",
				className: "skip-link",
				children: "Skip to content"
			}),
			/* @__PURE__ */ jsxs(Shell, {
				className: "flex h-18 items-center justify-between gap-6",
				children: [
					/* @__PURE__ */ jsx(Link, {
						to: routes$1.home,
						"aria-label": "Axleta — home",
						className: "shrink-0 rounded-xs",
						onClick: () => void 0,
						children: /* @__PURE__ */ jsx(Wordmark, { priority: true })
					}),
					/* @__PURE__ */ jsx("nav", {
						"aria-label": "Primary",
						className: "hidden lg:block",
						children: /* @__PURE__ */ jsx("ul", {
							className: "flex items-center gap-1",
							children: primaryNav.map((group) => {
								const isOpen = openGroup === group.label;
								return /* @__PURE__ */ jsx("li", {
									className: "relative",
									onMouseEnter: () => canHover && openNow(group.label),
									onMouseLeave: closeSoon,
									children: /* @__PURE__ */ jsxs("button", {
										type: "button",
										"aria-expanded": isOpen,
										"aria-controls": panelId,
										onClick: () => setOpenGroup(isOpen ? null : group.label),
										onFocus: () => openNow(group.label),
										className: cn("label relative flex h-18 items-center gap-2 px-4 transition-colors duration-300", isOpen ? "text-accent-700" : "text-ink hover:text-accent-700"),
										children: [group.label, /* @__PURE__ */ jsx("span", {
											"aria-hidden": "true",
											className: cn("text-[0.5em] transition-transform duration-300", isOpen && "rotate-45"),
											children: "+"
										})]
									})
								}, group.label);
							})
						})
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "hidden items-center gap-5 lg:flex",
						children: [/* @__PURE__ */ jsx("a", {
							href: `mailto:${contact.email}`,
							className: "label text-neutral-700 transition-colors duration-300 hover:text-accent-700",
							children: contact.email
						}), /* @__PURE__ */ jsx(ButtonLink, {
							to: routes$1.contact,
							size: "sm",
							onClick: () => void 0,
							children: "Discuss requirements"
						})]
					}),
					/* @__PURE__ */ jsxs("button", {
						type: "button",
						className: "label flex h-11 items-center gap-3 border border-line-strong px-4 lg:hidden",
						"aria-expanded": drawerOpen,
						"aria-controls": drawerId,
						onClick: () => setDrawerOpen((v) => !v),
						children: [/* @__PURE__ */ jsx("span", { children: drawerOpen ? "Close" : "Menu" }), /* @__PURE__ */ jsxs("span", {
							"aria-hidden": "true",
							className: "relative block h-3 w-4",
							children: [/* @__PURE__ */ jsx("span", { className: cn("absolute inset-x-0 h-px bg-current transition-transform duration-300", drawerOpen && "translate-y-1.5 rotate-45") }), /* @__PURE__ */ jsx("span", { className: cn("absolute inset-x-0 top-1.5 h-px bg-current transition-transform duration-300", drawerOpen && "-translate-y-0 -rotate-45") })]
						})]
					})
				]
			}),
			/* @__PURE__ */ jsx(AnimatePresence, { children: isDesktop && openGroup ? /* @__PURE__ */ jsx(MegaPanel, {
				id: panelId,
				group: primaryNav.find((g) => g.label === openGroup),
				onEnter: () => openNow(openGroup),
				onLeave: closeSoon,
				reduced
			}) : null }),
			/* @__PURE__ */ jsx(AnimatePresence, { children: drawerOpen ? /* @__PURE__ */ jsx(MobileDrawer, {
				id: drawerId,
				openGroup: mobileGroup,
				onToggleGroup: setMobileGroup,
				onClose: () => setDrawerOpen(false),
				reduced
			}) : null })
		]
	});
}
function MegaPanel({ id, group, onEnter, onLeave, reduced }) {
	if (!group) return null;
	return /* @__PURE__ */ jsx(motion.div, {
		id,
		role: "region",
		"aria-label": `${group.label} menu`,
		onMouseEnter: onEnter,
		onMouseLeave: onLeave,
		initial: reduced ? { opacity: 0 } : {
			opacity: 0,
			y: -10
		},
		animate: reduced ? { opacity: 1 } : {
			opacity: 1,
			y: 0
		},
		exit: reduced ? { opacity: 0 } : {
			opacity: 0,
			y: -8
		},
		transition: reduced ? { duration: .1 } : {
			duration: duration.base,
			ease: ease.entrance
		},
		className: "absolute inset-x-0 top-full hidden origin-top border-b border-border bg-surface shadow-[0_18px_40px_-32px_rgba(17,17,17,0.4)] lg:block",
		children: /* @__PURE__ */ jsx(Shell, {
			className: "py-10",
			children: /* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-12 gap-x-6 gap-y-9",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "col-span-12 lg:col-span-3",
					children: [
						/* @__PURE__ */ jsx("p", {
							className: "label text-accent-700",
							children: group.heading ?? group.label
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-4 max-w-xs text-sm leading-relaxed text-neutral-700",
							children: group.label === "Solutions" ? "Chosen against how your business operates, and kept running afterwards." : group.label === "Services" ? "A four-stage engagement model, from requirement analysis to ongoing support." : "Who Axleta is, how the practice works, and where it is published."
						}),
						/* @__PURE__ */ jsxs(ArrowLink, {
							to: group.indexPath,
							className: "mt-6",
							onClick: () => (`${group.label.toLowerCase()}`, void 0),
							children: ["All ", group.label.toLowerCase()]
						})
					]
				}), /* @__PURE__ */ jsx("ul", {
					className: "col-span-12 grid gap-x-6 gap-y-1 sm:grid-cols-2 lg:col-span-9",
					children: group.items.map((item, i) => /* @__PURE__ */ jsx(motion.li, {
						initial: reduced ? { opacity: 0 } : {
							opacity: 0,
							y: 12
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							duration: duration.base,
							delay: i * .035,
							ease: ease.entrance
						},
						children: /* @__PURE__ */ jsxs(Link, {
							to: item.to,
							className: "group flex flex-col gap-1.5 border-l-2 border-transparent py-3 pl-4 transition-colors duration-300 hover:border-accent-700",
							children: [/* @__PURE__ */ jsxs("span", {
								className: "flex items-center gap-2 font-display text-lg tracking-tightest",
								children: [item.label, /* @__PURE__ */ jsx("span", {
									"aria-hidden": "true",
									className: "text-accent-700 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100 group-focus-visible:translate-x-1 group-focus-visible:opacity-100",
									children: "→"
								})]
							}), /* @__PURE__ */ jsx("span", {
								className: "text-sm leading-relaxed text-neutral-700",
								children: item.description
							})]
						})
					}, item.to))
				})]
			})
		})
	});
}
function MobileDrawer({ id, openGroup, onToggleGroup, onClose, reduced }) {
	const panelRef = useRef(null);
	useEffect(() => {
		const panel = panelRef.current;
		if (!panel) return;
		const previous = document.activeElement;
		const focusables = () => Array.from(panel.querySelectorAll("a[href], button:not([disabled]), [tabindex]:not([tabindex=\"-1\"])")).filter((el) => el.offsetParent !== null);
		focusables()[0]?.focus();
		const onKey = (event) => {
			if (event.key !== "Tab") return;
			const items = focusables();
			if (items.length === 0) return;
			const first = items[0];
			const last = items[items.length - 1];
			if (event.shiftKey && document.activeElement === first) {
				event.preventDefault();
				last.focus();
			} else if (!event.shiftKey && document.activeElement === last) {
				event.preventDefault();
				first.focus();
			}
		};
		panel.addEventListener("keydown", onKey);
		return () => {
			panel.removeEventListener("keydown", onKey);
			previous?.focus?.();
		};
	}, []);
	return /* @__PURE__ */ jsx(motion.div, {
		ref: panelRef,
		id,
		role: "dialog",
		"aria-modal": "true",
		"aria-label": "Site menu",
		initial: reduced ? { opacity: 0 } : { x: "100%" },
		animate: reduced ? { opacity: 1 } : { x: 0 },
		exit: reduced ? { opacity: 0 } : { x: "100%" },
		transition: reduced ? { duration: .12 } : spring.panel,
		className: "fixed inset-x-0 bottom-0 top-18 z-40 overflow-y-auto overscroll-contain border-t border-border bg-surface lg:hidden",
		children: /* @__PURE__ */ jsxs("nav", {
			"aria-label": "Mobile",
			className: "px-gutter pb-24 pt-4",
			children: [/* @__PURE__ */ jsx("ul", { children: primaryNav.map((group) => {
				const isOpen = openGroup === group.label;
				return /* @__PURE__ */ jsxs("li", {
					className: "border-b border-border",
					children: [/* @__PURE__ */ jsxs("button", {
						type: "button",
						"aria-expanded": isOpen,
						"aria-controls": `${id}-${group.label}`,
						onClick: () => onToggleGroup(isOpen ? null : group.label),
						className: "label flex w-full items-center justify-between py-6 text-left text-ink",
						children: [group.label, /* @__PURE__ */ jsx("span", {
							"aria-hidden": "true",
							className: cn("text-base transition-transform duration-300", isOpen && "rotate-45"),
							children: "+"
						})]
					}), /* @__PURE__ */ jsx(AnimatePresence, {
						initial: false,
						children: isOpen ? /* @__PURE__ */ jsx(motion.ul, {
							id: `${id}-${group.label}`,
							initial: reduced ? {
								height: "auto",
								opacity: 0
							} : {
								height: 0,
								opacity: 0
							},
							animate: {
								height: "auto",
								opacity: 1
							},
							exit: reduced ? { opacity: 0 } : {
								height: 0,
								opacity: 0
							},
							transition: {
								duration: duration.base,
								ease: ease.standard
							},
							className: "overflow-hidden",
							children: group.items.map((item) => /* @__PURE__ */ jsx("li", {
								className: "pb-1",
								children: /* @__PURE__ */ jsxs(Link, {
									to: item.to,
									onClick: onClose,
									className: "block py-3 pl-4 text-lg tracking-tightest transition-colors duration-300 hover:text-accent-700",
									children: [item.label, /* @__PURE__ */ jsx("span", {
										className: "mt-1 block text-sm text-neutral-700",
										children: item.description
									})]
								})
							}, item.to))
						}) : null
					})]
				}, group.label);
			}) }), /* @__PURE__ */ jsxs("div", {
				className: "mt-10 space-y-5",
				children: [/* @__PURE__ */ jsx(ButtonLink, {
					to: routes$1.contact,
					size: "lg",
					className: "w-full",
					onClick: onClose,
					children: "Discuss requirements"
				}), /* @__PURE__ */ jsx("a", {
					href: `mailto:${contact.email}`,
					className: "label block text-neutral-700",
					children: contact.email
				})]
			})]
		})
	});
}
//#endregion
//#region src/components/layout/ScrollManager.tsx
/**
* Scroll and focus restoration.
*
* Three behaviours that browsers get wrong for SPAs, handled once here:
*
*  1. A new pathname scrolls to the top. A changed hash scrolls to the target
*     element, honouring the `scroll-padding-top` set in index.css so the
*     fixed header never covers an anchor.
*  2. Focus moves to the main landmark after a route change, so keyboard and
*     screen-reader users are not left at the top of the document with focus
*     stranded on the header.
*  3. `document.title` and canonical URL are reset per route by the Seo
*     component; nothing extra is needed here.
*/
function ScrollManager() {
	const { pathname, hash } = useLocation();
	useEffect(() => {
		if (hash) {
			const id = hash.slice(1);
			const target = document.getElementById(id);
			if (target) {
				target.scrollIntoView({
					behavior: prefersReducedMotion() ? "instant" : "smooth",
					block: "start"
				});
				target.setAttribute("tabindex", "-1");
				target.focus({ preventScroll: true });
				return;
			}
		}
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: "instant"
		});
	}, [pathname, hash]);
	useEffect(() => {
		if (hash) return;
		const main = document.getElementById("main");
		if (!main) return;
		main.setAttribute("tabindex", "-1");
		main.focus({ preventScroll: true });
	}, [pathname, hash]);
	return null;
}
//#endregion
//#region src/data/solutions.ts
var solutions = [
	{
		id: "erp",
		number: "01",
		title: "ERP applications",
		architecturalLabel: "ERP / BUSINESS SYSTEMS",
		category: "ERP",
		shortDescription: "SAP Business One and SAP S/4HANA Public Cloud, selected against how your business actually operates.",
		description: "A business system is only useful when it fits the process around it. We start from how work is really done — quoting, purchasing, stock, production, invoicing — and then choose the platform that carries it. SAP Business One and SAP S/4HANA Public Cloud cover the same core ground; the right choice depends on your scale, your hosting model and how far you intend to take customisation.",
		capabilities: [
			{
				label: "SAP Business One",
				detail: "A single system for sales, purchasing, financials, inventory, manufacturing and MRP."
			},
			{
				label: "SAP S/4HANA Public Cloud",
				detail: "The cloud generation of SAP ERP, for businesses that want a managed platform."
			},
			{
				label: "Sales",
				detail: "Quotation through order, pricing, credit control and the pipeline behind it."
			},
			{
				label: "Purchasing",
				detail: "Requisition, purchase orders, approvals, receipts and supplier performance."
			},
			{
				label: "Financial management",
				detail: "Accounting, ledgers, budgeting, period close and reporting."
			},
			{
				label: "Banking integration",
				detail: "Direct data exchange with your bank so statements and payments reconcile without rekeying."
			},
			{
				label: "Inventory",
				detail: "Warehouses, stock transfers, valuation and the physical count behind the number."
			},
			{
				label: "Manufacturing & MRP",
				detail: "Bills of material, work orders, production planning and material requirements."
			}
		],
		visualType: "erp",
		anchor: "erp"
	},
	{
		id: "applications",
		number: "02",
		title: "Companion applications",
		architecturalLabel: "APPLICATIONS / ADD-ONS",
		category: "Applications",
		shortDescription: "Purpose-built add-ons that extend your ERP into the parts of the process it does not cover on its own.",
		description: "Standard ERP coverage stops at a certain point. Everything past it — material handling, technical data, fixed assets, analytics, barcode capture, online payment — is usually where a real business feels the friction. We build those pieces as companion applications that sit alongside the ERP and read from it, rather than forking it.",
		capabilities: [
			{
				label: "Material management",
				detail: "A material management system integrated with SAP Business One."
			},
			{
				label: "Technical & product development",
				detail: "Structured technical and product development records tied to items and processes."
			},
			{
				label: "Product lifecycle management",
				detail: "PLM for SAP Business One, keeping product data consistent across the cycle."
			},
			{
				label: "Fixed assets",
				detail: "A fixed assets management system for register, depreciation and disposal."
			},
			{
				label: "Sales analytics",
				detail: "A web application for reporting on sales performance against SAP Business One."
			},
			{
				label: "Inventory transfer automation",
				detail: "Automated stock transfers with the posting handled, not hand-keyed."
			},
			{
				label: "Barcode generation & management",
				detail: "Label and barcode generation and management for SAP Business One."
			},
			{
				label: "Online payment & bank integration",
				detail: "An online payment system wired to your bank."
			}
		],
		visualType: "applications",
		anchor: "applications"
	},
	{
		id: "infrastructure",
		number: "03",
		title: "Technology infrastructure",
		architecturalLabel: "INFRASTRUCTURE / CLOUD",
		category: "Infrastructure",
		shortDescription: "The foundation everything else runs on — compute, network, storage, security and virtualisation.",
		description: "Application work is only as good as the ground it runs on. A client–server architecture is not optional once transactions, processing and reporting are involved, because the server carries a very different load from a workstation. We design, deploy and maintain that layer so the business software above it has something dependable to run on.",
		capabilities: [
			{
				label: "Private cloud",
				detail: "Private cloud infrastructure with dedicated servers, built for cost-effective stability."
			},
			{
				label: "Dedicated servers",
				detail: "Dedicated compute for processing, storing and analysing business data."
			},
			{
				label: "LAN / WAN networks",
				detail: "Network and IT infrastructure redesign to raise system performance."
			},
			{
				label: "Remote access",
				detail: "Reach your systems from anywhere using Microsoft Remote Desktop Web Service."
			},
			{
				label: "Data storage",
				detail: "Secure storage over cloud infrastructure, built around integrity, consistency and reliability."
			},
			{
				label: "IT security",
				detail: "Infrastructure and security measures to protect systems and data from vulnerabilities."
			},
			{
				label: "Virtualisation",
				detail: "Virtualised servers and storage on Proxmox, allocating only the resources a service needs."
			}
		],
		visualType: "infrastructure",
		anchor: "infrastructure"
	},
	{
		id: "automation",
		number: "04",
		title: "Automation & integration",
		architecturalLabel: "AUTOMATION / RPA",
		category: "Automation",
		shortDescription: "Process automation, system integration and applied generative AI — where manual work is genuinely removable.",
		description: "Automation is worth doing where the work is repetitive, rule-bound and already proven. That is usually data entry, document handling, reconciliation, and moving information between systems that were never designed to talk. We also work with generative AI, applying it to the processes where it removes effort rather than the ones where it merely sounds impressive.",
		capabilities: [
			{
				label: "Workflow automation",
				detail: "Automating the hand-offs and re-keying between systems and teams."
			},
			{
				label: "RPA",
				detail: "Robotic process automation for repetitive, rule-bound back-office work."
			},
			{
				label: "System integration",
				detail: "Connecting ERP, add-ons, banking and infrastructure into one flow of data."
			},
			{
				label: "Generative AI",
				detail: "Applied generative AI for process automation, introduced where it earns its cost."
			}
		],
		visualType: "automation",
		anchor: "automation"
	}
];
//#endregion
//#region src/components/diagrams/AxletaAxis.tsx
/**
* Signature A — the Axleta axis.
*
* The static SVG is always rendered and is the poster frame for the WebGL hero
* (`components/three/HeroScene.tsx`). It is drawn from the same geometry as the
* 3D scene: a stack of concentric rings on a tilted axis, with a signal node
* travelling the circumference.
*
* This is not a placeholder. If WebGL is unavailable, blocked, or refused by a
* reduced-motion preference, this is what the visitor sees — and it carries the
* full meaning of the hero without needing to animate.
*/
var RING_COUNT = 5;
function AxletaAxis({ className, animate = true }) {
	const reduced = usePrefersReducedMotion();
	const ref = useRef(null);
	const seen = useInView(ref, {
		once: true,
		threshold: .05
	});
	const running = animate && seen && !reduced;
	return /* @__PURE__ */ jsx("div", {
		ref,
		className,
		"aria-hidden": "true",
		children: /* @__PURE__ */ jsxs(motion.svg, {
			viewBox: "0 0 600 600",
			fill: "none",
			xmlns: "http://www.w3.org/2000/svg",
			className: "h-full w-full",
			initial: reduced ? { opacity: 1 } : {
				opacity: 0,
				scale: .96
			},
			animate: {
				opacity: running || reduced ? 1 : 0,
				scale: 1
			},
			transition: {
				duration: duration.reveal,
				ease: ease.entrance
			},
			children: [
				/* @__PURE__ */ jsxs("defs", { children: [/* @__PURE__ */ jsxs("linearGradient", {
					id: "axis-fade",
					x1: "0",
					y1: "0",
					x2: "1",
					y2: "1",
					children: [
						/* @__PURE__ */ jsx("stop", {
							offset: "0%",
							stopColor: "var(--color-accent-400)",
							stopOpacity: "0.9"
						}),
						/* @__PURE__ */ jsx("stop", {
							offset: "55%",
							stopColor: "var(--color-accent-300)",
							stopOpacity: "0.5"
						}),
						/* @__PURE__ */ jsx("stop", {
							offset: "100%",
							stopColor: "var(--color-accent-300)",
							stopOpacity: "0.12"
						})
					]
				}), /* @__PURE__ */ jsxs("radialGradient", {
					id: "axis-core",
					cx: "0.5",
					cy: "0.5",
					r: "0.5",
					children: [/* @__PURE__ */ jsx("stop", {
						offset: "0%",
						stopColor: "var(--color-accent-300)",
						stopOpacity: "0.9"
					}), /* @__PURE__ */ jsx("stop", {
						offset: "100%",
						stopColor: "var(--color-accent-300)",
						stopOpacity: "0"
					})]
				})] }),
				/* @__PURE__ */ jsx(motion.line, {
					x1: "300",
					y1: "52",
					x2: "300",
					y2: "548",
					stroke: "url(#axis-fade)",
					strokeWidth: "1",
					initial: reduced ? {
						pathLength: 1,
						opacity: 1
					} : {
						pathLength: 0,
						opacity: 0
					},
					animate: running || reduced ? {
						pathLength: 1,
						opacity: 1
					} : {},
					transition: {
						duration: duration.reveal * 1.4,
						ease: ease.line
					}
				}),
				Array.from({ length: RING_COUNT }, (_, i) => {
					const rx = 92 + i * 52;
					const ry = rx * .3;
					const delay = running ? .16 + i * .09 : 0;
					return /* @__PURE__ */ jsx(motion.ellipse, {
						cx: "300",
						cy: "300",
						rx,
						ry,
						stroke: "var(--color-accent-300)",
						strokeWidth: i === 4 ? 1.4 : 1,
						strokeOpacity: .75 - i * .11,
						initial: reduced ? {
							scaleX: .2,
							opacity: .6
						} : {
							scaleX: .2,
							opacity: 0
						},
						animate: running || reduced ? {
							scaleX: 1,
							opacity: .75 - i * .11
						} : {},
						style: { transformOrigin: "300px 300px" },
						transition: {
							duration: duration.slow,
							delay,
							ease: ease.entrance
						}
					}, i);
				}),
				Array.from({ length: RING_COUNT }, (_, i) => {
					const rx = 92 + i * 52;
					return /* @__PURE__ */ jsx("line", {
						x1: 300 - rx,
						y1: 300,
						x2: 300 + rx,
						y2: 300,
						stroke: "var(--color-accent-300)",
						strokeWidth: "0.6",
						strokeOpacity: .16
					}, `spoke-${i}`);
				}),
				/* @__PURE__ */ jsx("circle", {
					cx: "300",
					cy: "300",
					r: "64",
					fill: "url(#axis-core)"
				}),
				running ? /* @__PURE__ */ jsxs(motion.g, {
					animate: { rotate: 360 },
					transition: {
						duration: 22,
						repeat: Infinity,
						ease: "linear"
					},
					style: { transformOrigin: "300px 300px" },
					children: [/* @__PURE__ */ jsx("circle", {
						cx: "600",
						cy: "300",
						r: "4.5",
						fill: "var(--color-accent-300)"
					}), /* @__PURE__ */ jsx("circle", {
						cx: "600",
						cy: "300",
						r: "11",
						stroke: "var(--color-accent-300)",
						strokeOpacity: "0.35"
					})]
				}) : /* @__PURE__ */ jsx("circle", {
					cx: "548",
					cy: "300",
					r: "4.5",
					fill: "var(--color-accent-300)"
				}),
				/* @__PURE__ */ jsx("circle", {
					cx: "300",
					cy: "52",
					r: "3.5",
					fill: "var(--color-accent-300)",
					fillOpacity: "0.8"
				}),
				/* @__PURE__ */ jsx("circle", {
					cx: "300",
					cy: "548",
					r: "3.5",
					fill: "var(--color-accent-300)",
					fillOpacity: "0.8"
				}),
				/* @__PURE__ */ jsx("g", {
					stroke: "var(--color-paper)",
					strokeOpacity: "0.28",
					strokeWidth: "0.75",
					children: /* @__PURE__ */ jsx("line", {
						x1: "248",
						y1: "52",
						x2: "248",
						y2: "548",
						strokeDasharray: "2 6"
					})
				}),
				/* @__PURE__ */ jsx("text", {
					x: "238",
					y: "56",
					textAnchor: "end",
					fill: "var(--color-paper)",
					fillOpacity: "0.45",
					fontFamily: "var(--font-mono)",
					fontSize: "9",
					letterSpacing: "1.4",
					children: "AXLETA / AXIS"
				})
			]
		})
	});
}
//#endregion
//#region src/components/three/LazyHeroScene.tsx
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
var HeroSceneImpl = lazy(() => import("./assets/HeroScene-DSa6KHpE.js").then((m) => ({ default: m.HeroScene })));
function LazyHeroScene({ className }) {
	return /* @__PURE__ */ jsx(Suspense, {
		fallback: null,
		children: /* @__PURE__ */ jsx(HeroSceneImpl, { className })
	});
}
//#endregion
//#region src/components/sections/Hero.tsx
/**
* Hero.
*
* Ink ground, oversized Archivo display setting, and the Axleta axis on the
* right. The axis is drawn as SVG and always present — `HeroScene` layers a
* WebGL version on top only when the motion policy allows it, and fades the SVG
* out when the canvas has taken over.
*
* The headline is a single assertive statement, not a slogan with a subtitle.
* Copy is taken from the verified positioning: the systems behind the business,
* designed and kept running.
*/
function Hero() {
	const reduced = usePrefersReducedMotion();
	const rise = (delay) => ({
		initial: reduced ? { opacity: 1 } : {
			opacity: 0,
			y: 26
		},
		animate: {
			opacity: 1,
			y: 0
		},
		transition: {
			duration: reduced ? 0 : duration.reveal,
			delay: reduced ? 0 : delay,
			ease: ease.entrance
		}
	});
	return /* @__PURE__ */ jsxs("section", {
		"data-surface": "ink",
		"aria-labelledby": "hero-title",
		className: "surface-ink relative isolate flex min-h-[92svh] items-end overflow-hidden pb-section-y-tight pt-32 lg:min-h-dvh",
		children: [
			/* @__PURE__ */ jsx("div", {
				"aria-hidden": "true",
				className: "pointer-events-none absolute inset-0 opacity-[0.06]",
				style: {
					backgroundImage: "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
					backgroundSize: "calc(100% / 12) 100%, 100% 12rem"
				}
			}),
			/* @__PURE__ */ jsxs("div", {
				"aria-hidden": "true",
				className: "pointer-events-none absolute -right-[18%] top-1/2 aspect-square w-[130%] max-w-none -translate-y-1/2 opacity-70 sm:right-[-8%] sm:w-[78%] lg:right-[-2%] lg:w-[46%] lg:opacity-100",
				children: [/* @__PURE__ */ jsx(AxletaAxis, {
					className: "absolute inset-0",
					animate: false
				}), /* @__PURE__ */ jsx(LazyHeroScene, { className: "absolute inset-0" })]
			}),
			/* @__PURE__ */ jsx(Shell, {
				className: "relative z-10 w-full",
				children: /* @__PURE__ */ jsxs("div", {
					className: "grid grid-cols-4 gap-x-6 gap-y-12 md:grid-cols-8 lg:grid-cols-12",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "col-span-4 md:col-span-8 lg:col-span-8",
						children: [
							/* @__PURE__ */ jsx(motion.div, {
								...rise(heroTimeline.eyebrowAt),
								children: /* @__PURE__ */ jsxs(Eyebrow, {
									index: "01",
									tone: "ink",
									live: true,
									children: ["Technology and advancement · est. ", company.founded]
								})
							}),
							/* @__PURE__ */ jsxs(motion.h1, {
								id: "hero-title",
								className: "mt-8 max-w-[16ch] text-hero font-display font-medium leading-[0.92] tracking-tightest",
								initial: reduced ? { opacity: 1 } : {
									opacity: 0,
									y: 34
								},
								animate: {
									opacity: 1,
									y: 0
								},
								transition: {
									duration: reduced ? 0 : duration.reveal * 1.15,
									delay: reduced ? 0 : heroTimeline.headlineAt,
									ease: ease.entrance
								},
								children: [
									/* @__PURE__ */ jsx("span", {
										className: "block",
										children: "The systems"
									}),
									/* @__PURE__ */ jsx("span", {
										className: "block text-accent-300",
										children: "behind the business,"
									}),
									/* @__PURE__ */ jsx("span", {
										className: "block",
										children: "designed and kept running."
									})
								]
							}),
							/* @__PURE__ */ jsxs(motion.div, {
								...rise(heroTimeline.ledeAt),
								className: "mt-10",
								children: [/* @__PURE__ */ jsx(ArchitecturalLabel, {
									tone: "ink",
									children: "ERP · APPLICATIONS · INFRASTRUCTURE · AUTOMATION"
								}), /* @__PURE__ */ jsx(Lead, {
									tone: "ink",
									className: "mt-6 max-w-2xl text-neutral-300",
									children: "Axleta supplies technology-driven systems and solutions for SMEs — SAP Business One and S/4HANA Public Cloud, the companion applications that extend them, the infrastructure they run on, and the automation that removes the re-keying. Chosen for fitness of purpose, and supported afterwards."
								})]
							}),
							/* @__PURE__ */ jsx(motion.div, {
								...rise(heroTimeline.actionsAt),
								className: "mt-11",
								children: /* @__PURE__ */ jsx(CtaPair, {
									tone: "ink",
									primary: {
										to: routes$1.contact,
										label: "Discuss requirements",
										onClick: () => void 0
									},
									secondary: {
										to: routes$1.solutions,
										label: "See the solutions",
										onClick: () => void 0
									}
								})
							}),
							/* @__PURE__ */ jsxs(motion.div, {
								...rise(heroTimeline.actionsAt + .12),
								className: "mt-12 flex flex-wrap items-center gap-x-8 gap-y-3",
								children: [
									/* @__PURE__ */ jsx("span", {
										className: "label text-neutral-500",
										children: "Or reach us directly"
									}),
									/* @__PURE__ */ jsx("a", {
										href: `mailto:${contact.email}`,
										className: "label text-paper underline-offset-4 hover:text-accent-300 hover:underline",
										children: contact.email
									}),
									/* @__PURE__ */ jsx("span", {
										"aria-hidden": "true",
										className: "h-px w-6 bg-white/20"
									}),
									/* @__PURE__ */ jsxs("span", {
										className: "label text-neutral-500",
										children: ["Supporting ", contact.coverage]
									})
								]
							})
						]
					}), /* @__PURE__ */ jsxs(motion.aside, {
						...rise(.95),
						className: "col-span-4 md:col-span-8 lg:col-span-3 lg:col-start-10 lg:self-end",
						children: [
							/* @__PURE__ */ jsx("p", {
								className: "label text-neutral-500",
								children: "Four areas of practice"
							}),
							/* @__PURE__ */ jsx("ol", {
								className: "mt-5 space-y-3",
								children: solutions.map((solution) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(Link, {
									to: `${routes$1.solutions}#${solution.anchor}`,
									className: "group flex items-baseline gap-4 border-l border-white/15 py-1.5 pl-4 transition-colors duration-300 hover:border-accent-300",
									children: [/* @__PURE__ */ jsx("span", {
										className: "label w-6 shrink-0 text-accent-300 tabular-nums",
										children: solution.number
									}), /* @__PURE__ */ jsx("span", {
										className: "font-display text-lg tracking-tightest text-paper transition-colors duration-300 group-hover:text-accent-300",
										children: solution.title
									})]
								}) }, solution.id))
							}),
							/* @__PURE__ */ jsx(ArrowLink, {
								to: routes$1.about,
								tone: "ink",
								className: "mt-7",
								children: "Why Axleta"
							})
						]
					})]
				})
			})
		]
	});
}
//#endregion
//#region src/components/sections/Premise.tsx
/**
* Homepage: the premise.
*
* States the argument in one column, with the four areas as a numbered index
* beside it. The index is a link list, not a card grid — it is the site's table
* of contents and doubles as the mobile navigation into /solutions.
*/
var SIGNAL_ITEMS = [
	"SAP Business One",
	"SAP S/4HANA Public Cloud",
	"PLM",
	"Companion applications",
	"Private cloud",
	"Virtualisation",
	"Security",
	"RPA",
	"Integration",
	"Generative AI",
	"Remote access",
	"SAP Business One support"
];
function Premise() {
	return /* @__PURE__ */ jsx(Section, {
		id: "premise",
		labelledBy: "premise-title",
		tight: true,
		children: /* @__PURE__ */ jsxs(Shell, { children: [/* @__PURE__ */ jsx(SignalBar, { items: SIGNAL_ITEMS }), /* @__PURE__ */ jsxs(Grid, {
			rails: true,
			className: "pt-section-y-tight",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "col-span-4 md:col-span-8 lg:col-span-6",
				children: [
					/* @__PURE__ */ jsxs(Reveal, { children: [/* @__PURE__ */ jsx(Eyebrow, {
						index: "02",
						children: "The premise"
					}), /* @__PURE__ */ jsx(Title, {
						id: "premise-title",
						className: "mt-7",
						children: "Software is the easy part. The process around it is the hard part."
					})] }),
					/* @__PURE__ */ jsx(Reveal, {
						delay: .12,
						children: /* @__PURE__ */ jsx(Stack, {
							gap: "md",
							className: "mt-9",
							children: company.story.map((paragraph) => /* @__PURE__ */ jsx(Body, { children: paragraph }, paragraph.slice(0, 32)))
						})
					}),
					/* @__PURE__ */ jsx(Reveal, {
						delay: .2,
						children: /* @__PURE__ */ jsxs("div", {
							className: "mt-10",
							children: [/* @__PURE__ */ jsx(Subtitle, {
								as: "h3",
								className: "max-w-lg",
								children: company.vision
							}), /* @__PURE__ */ jsx(Body, {
								className: "mt-4",
								children: company.mission
							})]
						})
					}),
					/* @__PURE__ */ jsx(Reveal, {
						delay: .28,
						children: /* @__PURE__ */ jsx(ArrowLink, {
							to: routes$1.about,
							className: "mt-10",
							children: "Read about Axleta"
						})
					})
				]
			}), /* @__PURE__ */ jsxs("div", {
				className: "col-span-4 mt-14 md:col-span-8 lg:col-span-5 lg:col-start-8 lg:mt-0",
				children: [
					/* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsx("p", {
						className: "label text-neutral-700",
						children: "Index of practice"
					}) }),
					/* @__PURE__ */ jsx("ol", {
						className: "mt-6",
						children: solutions.map((solution, i) => /* @__PURE__ */ jsx(Reveal, {
							as: "li",
							index: i,
							rule: true,
							className: "pt-7",
							children: /* @__PURE__ */ jsx(Link, {
								to: `${routes$1.solutions}#${solution.anchor}`,
								className: "group block",
								onClick: () => (solution.category, void 0),
								children: /* @__PURE__ */ jsxs("div", {
									className: "flex items-baseline gap-5",
									children: [/* @__PURE__ */ jsx("span", {
										className: "label w-8 shrink-0 text-accent-700 tabular-nums",
										children: solution.number
									}), /* @__PURE__ */ jsxs("div", {
										className: "min-w-0 flex-1",
										children: [
											/* @__PURE__ */ jsx("h3", {
												className: "font-display text-2xl leading-snug tracking-tightest transition-colors duration-300 group-hover:text-accent-700 lg:text-[1.75rem]",
												children: solution.title
											}),
											/* @__PURE__ */ jsx("p", {
												className: "mt-2.5 max-w-md text-sm leading-relaxed text-neutral-700",
												children: solution.shortDescription
											}),
											/* @__PURE__ */ jsxs("span", {
												className: "label mt-4 inline-flex items-center gap-2 text-accent-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100",
												children: [
													"Open ",
													solution.architecturalLabel,
													/* @__PURE__ */ jsx("span", {
														"aria-hidden": "true",
														children: "→"
													})
												]
											})
										]
									})]
								})
							})
						}, solution.id))
					}),
					/* @__PURE__ */ jsx(Rule, { className: "mt-10" }),
					/* @__PURE__ */ jsx("p", {
						className: "label mt-6 text-neutral-700",
						children: "Every capability above is published by Axleta. Nothing here is aspirational."
					})
				]
			})]
		})] })
	});
}
//#endregion
//#region src/components/diagrams/SolutionDiagram.tsx
/**
* Solution diagrams.
*
* One drawing per solution, each built from the same vocabulary — hairline
* rules, monospace annotation, a signal dot — so the four read as a set of
* plates from the same drawing office. These are SVG, not images, so they are
* resolution independent, weightless, and recolour correctly on ink or paper.
*
* Every stroke animates as a draw-on under Motion. Under reduced motion the
* paths render complete and static; nothing is ever hidden behind an animation.
*/
function Draw({ d, delay, running, width = 1, opacity = .75, tone }) {
	const reduced = usePrefersReducedMotion();
	const stroke = tone === "ink" ? "var(--color-accent-300)" : "var(--color-accent-700)";
	return /* @__PURE__ */ jsx(motion.path, {
		d,
		stroke,
		strokeWidth: width,
		strokeOpacity: opacity,
		strokeLinecap: "round",
		fill: "none",
		vectorEffect: "non-scaling-stroke",
		initial: reduced ? {
			pathLength: 1,
			opacity
		} : {
			pathLength: 0,
			opacity: 0
		},
		animate: running || reduced ? {
			pathLength: 1,
			opacity
		} : {},
		transition: {
			duration: duration.slow,
			delay,
			ease: ease.line
		}
	});
}
/** Plate frame: the drawing border, corner ticks and label. Shared by all four. */
function Plate({ label, children, tone, className }) {
	const tick = tone === "ink" ? "var(--color-paper)" : "var(--color-ink)";
	const tickOpacity = tone === "ink" ? .28 : .18;
	return /* @__PURE__ */ jsxs("figure", {
		className: cn("relative", className),
		children: [/* @__PURE__ */ jsxs("svg", {
			viewBox: "0 0 400 300",
			className: "h-full w-full",
			fill: "none",
			xmlns: "http://www.w3.org/2000/svg",
			"aria-hidden": "true",
			children: [
				/* @__PURE__ */ jsx("rect", {
					x: "8",
					y: "8",
					width: "384",
					height: "284",
					stroke: tick,
					strokeOpacity: tickOpacity,
					strokeWidth: "1"
				}),
				[
					[
						8,
						26,
						8,
						8,
						26,
						8
					],
					[
						392,
						26,
						392,
						8,
						374,
						8
					],
					[
						8,
						274,
						8,
						292,
						26,
						292
					],
					[
						392,
						274,
						392,
						292,
						374,
						292
					]
				].map((coords, i) => /* @__PURE__ */ jsx("path", {
					d: `M ${coords[0]} ${coords[1]} L ${coords[2]} ${coords[3]} L ${coords[4]} ${coords[5]}`,
					stroke: tick,
					strokeOpacity: tickOpacity + .14,
					strokeWidth: "1"
				}, i)),
				children
			]
		}), /* @__PURE__ */ jsx("figcaption", {
			className: "sr-only",
			children: label
		})]
	});
}
function Annotate({ x, y, text, tone, anchor = "start" }) {
	return /* @__PURE__ */ jsx("text", {
		x,
		y,
		textAnchor: anchor,
		fill: tone === "ink" ? "var(--color-paper)" : "var(--color-ink)",
		fillOpacity: .5,
		fontFamily: "var(--font-mono)",
		fontSize: "7.5",
		letterSpacing: "1.2",
		children: text
	});
}
function SignalDot({ cx, cy, delay, running, tone }) {
	const reduced = usePrefersReducedMotion();
	return /* @__PURE__ */ jsx(motion.circle, {
		cx,
		cy,
		r: "3.5",
		fill: tone === "ink" ? "var(--color-accent-300)" : "var(--color-accent-700)",
		initial: reduced ? {
			scale: 1,
			opacity: 1
		} : {
			scale: 0,
			opacity: 0
		},
		animate: running || reduced ? {
			scale: 1,
			opacity: 1
		} : {},
		style: { transformOrigin: `${cx}px ${cy}px` },
		transition: {
			duration: duration.fast,
			delay,
			ease: ease.settle
		}
	});
}
function ErpDiagram({ tone, running }) {
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(Draw, {
			d: "M 60 150 L 340 150",
			delay: 0,
			running,
			tone,
			width: 1.4
		}),
		[
			{
				y: 62,
				label: "SALES"
			},
			{
				y: 96,
				label: "PURCHASING"
			},
			{
				y: 204,
				label: "INVENTORY"
			},
			{
				y: 238,
				label: "MANUFACTURING"
			}
		].map((fn, i) => /* @__PURE__ */ jsxs("g", { children: [
			/* @__PURE__ */ jsx(Draw, {
				d: `M 90 ${fn.y} C 130 ${fn.y}, 130 150, 180 150`,
				delay: .15 + i * stagger.loose,
				running,
				tone,
				opacity: .55
			}),
			/* @__PURE__ */ jsx(Draw, {
				d: `M 240 150 C 290 150, 290 ${fn.y}, 330 ${fn.y}`,
				delay: .22 + i * stagger.loose,
				running,
				tone,
				opacity: .55
			}),
			/* @__PURE__ */ jsx(Draw, {
				d: `M 62 ${fn.y} L 104 ${fn.y}`,
				delay: .1 + i * stagger.loose,
				running,
				tone,
				opacity: .85
			}),
			/* @__PURE__ */ jsx(Annotate, {
				x: 110,
				y: fn.y + 3,
				text: fn.label,
				tone
			})
		] }, fn.label)),
		/* @__PURE__ */ jsx(Annotate, {
			x: 60,
			y: 140,
			text: "BUSINESS",
			tone
		}),
		/* @__PURE__ */ jsx(Annotate, {
			x: 60,
			y: 164,
			text: "PROCESS",
			tone
		}),
		/* @__PURE__ */ jsx(Annotate, {
			x: 340,
			y: 140,
			text: "ONE",
			tone,
			anchor: "end"
		}),
		/* @__PURE__ */ jsx(Annotate, {
			x: 340,
			y: 164,
			text: "SOURCE",
			tone,
			anchor: "end"
		}),
		/* @__PURE__ */ jsx(SignalDot, {
			cx: 200,
			cy: 150,
			delay: .6,
			running,
			tone
		})
	] });
}
function ApplicationsDiagram({ tone, running, reduced }) {
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(motion.rect, {
			x: "150",
			y: "112",
			width: "100",
			height: "76",
			stroke: tone === "ink" ? "var(--color-accent-300)" : "var(--color-accent-700)",
			strokeWidth: "1.4",
			fill: "none",
			initial: reduced ? { pathLength: 1 } : { pathLength: 0 },
			animate: running || reduced ? { pathLength: 1 } : {},
			transition: {
				duration: duration.slow,
				delay: .1,
				ease: ease.line
			}
		}),
		/* @__PURE__ */ jsx(Annotate, {
			x: 200,
			y: 146,
			text: "ERP",
			tone,
			anchor: "middle"
		}),
		/* @__PURE__ */ jsx(Annotate, {
			x: 200,
			y: 162,
			text: "CORE",
			tone,
			anchor: "middle"
		}),
		[
			{
				x: 60,
				y: 46,
				w: 96,
				h: 34,
				label: "PLM"
			},
			{
				x: 244,
				y: 46,
				w: 96,
				h: 34,
				label: "FIXED ASSETS"
			},
			{
				x: 60,
				y: 220,
				w: 96,
				h: 34,
				label: "ANALYTICS"
			},
			{
				x: 244,
				y: 220,
				w: 96,
				h: 34,
				label: "BARCODE"
			}
		].map((mod, i) => {
			const attachX = mod.x < 150 ? mod.x + mod.w : mod.x;
			const attachY = mod.y < 112 ? mod.y + mod.h : mod.y;
			const midX = mod.x < 150 ? 150 : 250;
			const midY = 150;
			return /* @__PURE__ */ jsxs("g", { children: [
				/* @__PURE__ */ jsx(Draw, {
					d: `M ${attachX} ${attachY} L ${attachX} ${midY} L ${midX} ${midY}`,
					delay: .3 + i * .08,
					running,
					tone,
					opacity: .6
				}),
				/* @__PURE__ */ jsx(motion.rect, {
					x: mod.x,
					y: mod.y,
					width: mod.w,
					height: mod.h,
					stroke: tone === "ink" ? "var(--color-accent-300)" : "var(--color-accent-700)",
					strokeWidth: "1",
					fill: "none",
					initial: reduced ? { opacity: .85 } : { opacity: 0 },
					animate: running || reduced ? { opacity: .85 } : {},
					transition: {
						duration: duration.base,
						delay: .25 + i * .08
					}
				}),
				/* @__PURE__ */ jsx(Annotate, {
					x: mod.x + mod.w / 2,
					y: mod.y + mod.h / 2 + 3,
					text: mod.label,
					tone,
					anchor: "middle"
				})
			] }, mod.label);
		}),
		/* @__PURE__ */ jsx(Annotate, {
			x: 60,
			y: 278,
			text: "BUILT ALONGSIDE",
			tone
		}),
		/* @__PURE__ */ jsx(Annotate, {
			x: 340,
			y: 278,
			text: "NOT FORKED",
			tone,
			anchor: "end"
		})
	] });
}
function InfrastructureDiagram({ tone, running }) {
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(Draw, {
			d: "M 40 232 L 200 150 L 360 232 L 200 282 Z",
			delay: 0,
			running,
			tone,
			width: 1.4
		}),
		/* @__PURE__ */ jsx(Draw, {
			d: "M 96 208 L 96 96",
			delay: .12,
			running,
			tone,
			opacity: .6
		}),
		/* @__PURE__ */ jsx(Draw, {
			d: "M 304 208 L 304 96",
			delay: .16,
			running,
			tone,
			opacity: .6
		}),
		/* @__PURE__ */ jsx(Draw, {
			d: "M 96 96 L 200 44 L 304 96",
			delay: .2,
			running,
			tone,
			opacity: .6
		}),
		[
			0,
			1,
			2,
			3,
			4,
			5
		].map((i) => {
			const y = 108 + i * 17;
			const inset = 26 - i * 3;
			return /* @__PURE__ */ jsx(Draw, {
				d: `M ${100 - inset * .2} ${y} L ${200 - inset} ${y - 12} L ${300 + inset * .2} ${y} L ${200 + inset} ${y + 12} Z`,
				delay: .28 + i * .07,
				running,
				tone,
				opacity: .28 + i * .09
			}, i);
		}),
		[
			0,
			1,
			2,
			3,
			4,
			5
		].map((i) => {
			const y = 120 + i * 16;
			return /* @__PURE__ */ jsx(Draw, {
				d: `M 304 ${y} L 352 ${y - 6}`,
				delay: .6 + i * .04,
				running,
				tone,
				opacity: .35
			}, `net-${i}`);
		}),
		/* @__PURE__ */ jsx(Annotate, {
			x: 200,
			y: 70,
			text: "COMPUTE",
			tone,
			anchor: "middle"
		}),
		/* @__PURE__ */ jsx(Annotate, {
			x: 200,
			y: 266,
			text: "FOUNDATION",
			tone,
			anchor: "middle"
		}),
		/* @__PURE__ */ jsx(Annotate, {
			x: 40,
			y: 28,
			text: "NETWORK",
			tone
		}),
		/* @__PURE__ */ jsx(SignalDot, {
			cx: 352,
			cy: 186,
			delay: 1,
			running,
			tone
		})
	] });
}
function AutomationDiagram({ tone, running, reduced }) {
	const stages = [
		{
			x: 48,
			label: "RECEIVE"
		},
		{
			x: 132,
			label: "RULE"
		},
		{
			x: 216,
			label: "ACT"
		},
		{
			x: 300,
			label: "POST"
		}
	];
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		stages.map((stage, i) => /* @__PURE__ */ jsxs("g", { children: [
			/* @__PURE__ */ jsx(motion.rect, {
				x: stage.x,
				y: "120",
				width: "52",
				height: "40",
				stroke: tone === "ink" ? "var(--color-accent-300)" : "var(--color-accent-700)",
				strokeWidth: "1",
				fill: "none",
				initial: reduced ? { opacity: .85 } : { opacity: 0 },
				animate: running || reduced ? { opacity: .85 } : {},
				transition: {
					duration: duration.base,
					delay: i * .1
				}
			}),
			/* @__PURE__ */ jsx(Annotate, {
				x: stage.x + 26,
				y: 144,
				text: stage.label,
				tone,
				anchor: "middle"
			}),
			i < stages.length - 1 ? /* @__PURE__ */ jsx(Draw, {
				d: `M ${stage.x + 56} 140 L ${stages[i + 1].x - 4} 140`,
				delay: .2 + i * .12,
				running,
				tone,
				opacity: .7
			}) : null
		] }, stage.label)),
		/* @__PURE__ */ jsx(Draw, {
			d: "M 132 200 C 150 220, 190 220, 210 202",
			delay: .62,
			running,
			tone,
			opacity: .4
		}),
		/* @__PURE__ */ jsx(Annotate, {
			x: 132,
			y: 196,
			text: "MANUAL RE-KEY",
			tone
		}),
		/* @__PURE__ */ jsx(Draw, {
			d: "M 130 216 L 214 186",
			delay: .78,
			running,
			tone,
			width: 1.6,
			opacity: .9
		}),
		/* @__PURE__ */ jsx(Draw, {
			d: "M 148 96 C 148 56, 252 56, 252 96",
			delay: .86,
			running,
			tone,
			width: 1.4
		}),
		/* @__PURE__ */ jsx(Annotate, {
			x: 200,
			y: 52,
			text: "AUTOMATED",
			tone,
			anchor: "middle"
		}),
		/* @__PURE__ */ jsx(Annotate, {
			x: 48,
			y: 264,
			text: "REPEATABLE",
			tone
		}),
		/* @__PURE__ */ jsx(Annotate, {
			x: 352,
			y: 264,
			text: "RULE-BOUND",
			tone,
			anchor: "end"
		}),
		/* @__PURE__ */ jsx(SignalDot, {
			cx: 200,
			cy: 70,
			delay: 1.05,
			running,
			tone
		})
	] });
}
var LABELS = {
	erp: "Diagram: one ERP spine with the business functions hung off it",
	applications: "Diagram: companion modules attached to a central ERP core",
	infrastructure: "Diagram: application layers resting on a compute ground plane",
	automation: "Diagram: the manual re-key struck through and an automated bypass added"
};
function SolutionDiagram({ type, tone = "paper", className }) {
	const reduced = usePrefersReducedMotion();
	const ref = useRef(null);
	const running = useInView(ref, {
		once: true,
		threshold: .2
	}) && !reduced;
	return /* @__PURE__ */ jsx("div", {
		ref,
		children: /* @__PURE__ */ jsxs(Plate, {
			label: LABELS[type],
			tone,
			className,
			children: [
				type === "erp" ? /* @__PURE__ */ jsx(ErpDiagram, {
					tone,
					running
				}) : null,
				type === "applications" ? /* @__PURE__ */ jsx(ApplicationsDiagram, {
					tone,
					running,
					reduced
				}) : null,
				type === "infrastructure" ? /* @__PURE__ */ jsx(InfrastructureDiagram, {
					tone,
					running
				}) : null,
				type === "automation" ? /* @__PURE__ */ jsx(AutomationDiagram, {
					tone,
					running,
					reduced
				}) : null
			]
		})
	});
}
//#endregion
//#region src/components/sections/SolutionsShowcase.tsx
/**
* Homepage: the solutions, presented as drawing plates.
*
* Each solution is a spread — text on one side, its diagram on the other, with
* the ground alternating ink/paper down the section. That alternation is the
* ink/paper rhythm device; it is why the homepage never settles into a repeated
* two-column template.
*
* Capability lists are `<dl>`s with monospace keys, so they read as an
* engineering index rather than as bullet-point marketing copy.
*/
function SolutionsShowcase() {
	return /* @__PURE__ */ jsx(Fragment, { children: solutions.map((solution, i) => /* @__PURE__ */ jsx(SolutionSpread, {
		solution,
		index: i
	}, solution.id)) });
}
function SolutionSpread({ solution, index }) {
	const ink = index % 2 === 1;
	const flip = index % 2 === 1;
	return /* @__PURE__ */ jsx("section", {
		id: solution.anchor,
		"aria-labelledby": `${solution.id}-title`,
		"data-surface": ink ? "ink" : void 0,
		className: cn("scroll-mt-24 py-section-y", ink ? "surface-ink" : "bg-surface"),
		children: /* @__PURE__ */ jsx(Shell, { children: /* @__PURE__ */ jsxs(Grid, {
			rails: true,
			children: [/* @__PURE__ */ jsxs("div", {
				className: cn("col-span-4 md:col-span-8 lg:col-span-5", flip && "lg:order-2 lg:col-start-8"),
				children: [
					/* @__PURE__ */ jsxs(Reveal, { children: [
						/* @__PURE__ */ jsx(Eyebrow, {
							index: solution.number,
							tone: ink ? "ink" : "paper",
							live: true,
							children: solution.category
						}),
						/* @__PURE__ */ jsx(ArchitecturalLabel, {
							tone: ink ? "ink" : "paper",
							className: "mt-6",
							children: solution.architecturalLabel
						}),
						/* @__PURE__ */ jsx(Title, {
							id: `${solution.id}-title`,
							tone: ink ? "ink" : "paper",
							className: "mt-6",
							children: solution.title
						})
					] }),
					/* @__PURE__ */ jsx(Reveal, {
						delay: .1,
						children: /* @__PURE__ */ jsx("p", {
							className: cn("measure mt-7 text-lead leading-loose", ink ? "text-neutral-300" : "text-neutral-900"),
							children: solution.shortDescription
						})
					}),
					/* @__PURE__ */ jsx(Reveal, {
						delay: .16,
						children: /* @__PURE__ */ jsx(Body, {
							tone: ink ? "ink" : "paper",
							className: "mt-6",
							children: solution.description
						})
					}),
					/* @__PURE__ */ jsxs(Reveal, {
						delay: .22,
						children: [/* @__PURE__ */ jsx(Subtitle, {
							as: "h3",
							tone: ink ? "ink" : "paper",
							className: "mt-12 text-2xl",
							children: "What this covers"
						}), /* @__PURE__ */ jsx("dl", {
							className: "mt-6",
							children: solution.capabilities.map((capability) => /* @__PURE__ */ jsxs("div", {
								className: cn("grid gap-x-6 gap-y-1 border-t py-4 sm:grid-cols-[minmax(9rem,14rem)_1fr]", ink ? "border-white/12" : "border-line"),
								children: [/* @__PURE__ */ jsx("dt", {
									className: cn("label", ink ? "text-accent-300" : "text-accent-700"),
									children: capability.label
								}), /* @__PURE__ */ jsx("dd", {
									className: cn("text-sm leading-relaxed", ink ? "text-neutral-300" : "text-neutral-700"),
									children: capability.detail
								})]
							}, capability.label))
						})]
					}),
					/* @__PURE__ */ jsx(Reveal, {
						delay: .28,
						children: /* @__PURE__ */ jsxs("div", {
							className: "mt-9 flex flex-wrap items-center gap-x-7 gap-y-4",
							children: [/* @__PURE__ */ jsxs(Link, {
								to: `${routes$1.contact}?topic=${encodeURIComponent(solution.title)}`,
								onClick: () => (solution.category, void 0),
								className: cn("group relative inline-flex h-12 items-center gap-2.5 px-6 font-mono text-eyebrow uppercase tracking-label transition-colors duration-300", ink ? "bg-accent-300 text-ink hover:bg-paper" : "bg-action text-paper hover:bg-action-hover"),
								children: [/* @__PURE__ */ jsxs("span", { children: ["Discuss ", solution.category.toLowerCase()] }), /* @__PURE__ */ jsx("span", {
									"aria-hidden": "true",
									className: "transition-transform duration-300 ease-[var(--ease-entrance)] group-hover:translate-x-1 motion-reduce:transform-none",
									children: "→"
								})]
							}), /* @__PURE__ */ jsx(ArrowLink, {
								to: routes$1.services,
								tone: ink ? "ink" : "paper",
								children: "How we deliver"
							})]
						})
					})
				]
			}), /* @__PURE__ */ jsx("div", {
				className: cn("col-span-4 mt-14 md:col-span-8 lg:col-span-6 lg:mt-0", flip ? "lg:order-1 lg:col-start-1" : "lg:col-start-7"),
				children: /* @__PURE__ */ jsx(Reveal, {
					delay: .12,
					children: /* @__PURE__ */ jsxs("div", {
						className: cn("lg:sticky lg:top-28", ink && "rounded-md bg-white/[0.03] p-6"),
						children: [/* @__PURE__ */ jsx(SolutionDiagram, {
							type: solution.visualType,
							tone: ink ? "ink" : "paper",
							className: cn("w-full", ink ? "opacity-90" : "")
						}), /* @__PURE__ */ jsxs(Note, {
							tone: ink ? "ink" : "paper",
							className: "mt-5",
							children: [
								"Plate ",
								solution.number,
								" — ",
								solution.architecturalLabel.toLowerCase()
							]
						})]
					})
				})
			})]
		}) })
	});
}
//#endregion
//#region src/components/diagrams/SystemArchitecture.tsx
/**
* The system architecture plate.
*
* A single drawing that shows how the four solution areas relate: the
* infrastructure carries the ERP, companion applications extend it, and
* automation threads across all three. It is the diagram the whole site argues
* for, and it appears on the homepage and again on /solutions.
*
* Scroll-driven: the horizontal traversal line draws as the plate scrolls into
* view, with each layer revealing in sequence. Under reduced motion the plate
* renders complete and static.
*/
var LAYERS = [
	{
		id: "automation",
		label: "AUTOMATION",
		note: "Workflow / RPA / Integration"
	},
	{
		id: "applications",
		label: "APPLICATIONS",
		note: "PLM / Assets / Analytics / Barcode"
	},
	{
		id: "erp",
		label: "ERP",
		note: "SAP Business One / S/4HANA Public Cloud"
	},
	{
		id: "infrastructure",
		label: "INFRASTRUCTURE",
		note: "Private cloud / Network / Storage / Security"
	}
];
function SystemArchitecture({ className, tone = "ink" }) {
	const reduced = usePrefersReducedMotion();
	const ref = useRef(null);
	const running = useInView(ref, {
		once: true,
		threshold: .15
	}) && !reduced;
	const stroke = tone === "ink" ? "var(--color-accent-300)" : "var(--color-accent-700)";
	const faint = tone === "ink" ? "var(--color-paper)" : "var(--color-ink)";
	return /* @__PURE__ */ jsx("div", {
		ref,
		className,
		children: /* @__PURE__ */ jsx("figure", { children: /* @__PURE__ */ jsxs("svg", {
			viewBox: "0 0 720 480",
			fill: "none",
			xmlns: "http://www.w3.org/2000/svg",
			className: "h-auto w-full",
			role: "img",
			"aria-labelledby": "arch-title arch-desc",
			children: [
				/* @__PURE__ */ jsx("title", {
					id: "arch-title",
					children: "How Axleta's four solution areas fit together"
				}),
				/* @__PURE__ */ jsx("desc", {
					id: "arch-desc",
					children: "A four-layer stack. Automation sits at the top, threading across companion applications, which extend the ERP core. All of it rests on the technology infrastructure layer. Each layer lists the capabilities it covers."
				}),
				/* @__PURE__ */ jsx(motion.line, {
					x1: "30",
					y1: "36",
					x2: "690",
					y2: "36",
					stroke,
					strokeWidth: "1",
					strokeOpacity: "0.5",
					initial: reduced ? { pathLength: 1 } : { pathLength: 0 },
					animate: running || reduced ? { pathLength: 1 } : {},
					transition: {
						duration: duration.reveal * 1.2,
						ease: ease.line
					}
				}),
				LAYERS.map((layer, i) => {
					const y = 92 + i * 104;
					const delay = running ? .18 + i * stagger.loose * 2 : 0;
					const capabilities = solutions.find((s) => s.id === layer.id)?.capabilities.slice(0, 4) ?? [];
					return /* @__PURE__ */ jsxs("g", { children: [
						/* @__PURE__ */ jsx(motion.rect, {
							x: "30",
							y,
							width: "660",
							height: "78",
							stroke,
							strokeWidth: i === 2 ? 1.6 : 1,
							strokeOpacity: i === 2 ? .9 : .45,
							fill: "none",
							initial: reduced ? { opacity: i === 2 ? .9 : .45 } : { opacity: 0 },
							animate: running || reduced ? { opacity: i === 2 ? .9 : .45 } : {},
							transition: {
								duration: duration.base,
								delay
							}
						}),
						/* @__PURE__ */ jsx(motion.circle, {
							cx: 30 + i * 165,
							cy: "36",
							r: "4",
							fill: stroke,
							initial: reduced ? { scale: 1 } : { scale: 0 },
							animate: running || reduced ? { scale: 1 } : {},
							style: { transformOrigin: `${30 + i * 165}px 36px` },
							transition: {
								duration: duration.fast,
								delay: delay + .1,
								ease: ease.settle
							}
						}),
						/* @__PURE__ */ jsx("text", {
							x: "46",
							y: y + 26,
							fill: stroke,
							fontFamily: "var(--font-mono)",
							fontSize: "11",
							letterSpacing: "1.6",
							children: layer.label
						}),
						/* @__PURE__ */ jsx("text", {
							x: "46",
							y: y + 44,
							fill: faint,
							fillOpacity: "0.45",
							fontFamily: "var(--font-mono)",
							fontSize: "8",
							letterSpacing: "0.9",
							children: layer.note
						}),
						capabilities.map((cap, j) => /* @__PURE__ */ jsxs(motion.g, {
							initial: reduced ? { opacity: .55 } : { opacity: 0 },
							animate: running || reduced ? { opacity: .55 } : {},
							transition: {
								duration: duration.base,
								delay: delay + .15 + j * .05
							},
							children: [/* @__PURE__ */ jsx("line", {
								x1: "300",
								y1: y + 18 + j * 15,
								x2: "312",
								y2: y + 18 + j * 15,
								stroke,
								strokeWidth: "1",
								strokeOpacity: "0.7"
							}), /* @__PURE__ */ jsx("text", {
								x: "320",
								y: y + 21 + j * 15,
								fill: faint,
								fillOpacity: "0.62",
								fontFamily: "var(--font-sans)",
								fontSize: "9.5",
								children: cap.label
							})]
						}, cap.label))
					] }, layer.id);
				}),
				[0, 1].map((i) => /* @__PURE__ */ jsx(motion.path, {
					d: `M 690 ${140 + i * 104} L 690 ${192 + i * 104}`,
					stroke,
					strokeWidth: "1",
					markerEnd: "url(#arrowhead)",
					initial: reduced ? { opacity: .5 } : { opacity: 0 },
					animate: running || reduced ? { opacity: .5 } : {},
					transition: {
						duration: duration.base,
						delay: .8 + i * .12
					}
				}, `load-${i}`)),
				/* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsx("marker", {
					id: "arrowhead",
					markerWidth: "6",
					markerHeight: "6",
					refX: "5",
					refY: "3",
					orient: "auto",
					children: /* @__PURE__ */ jsx("path", {
						d: "M 0 0 L 6 3 L 0 6 z",
						fill: stroke,
						fillOpacity: "0.5"
					})
				}) }),
				/* @__PURE__ */ jsx(motion.line, {
					x1: "30",
					y1: "452",
					x2: "690",
					y2: "452",
					stroke,
					strokeWidth: "2",
					strokeOpacity: "0.7",
					initial: reduced ? { pathLength: 1 } : { pathLength: 0 },
					animate: running || reduced ? { pathLength: 1 } : {},
					transition: {
						duration: duration.slow,
						delay: .7,
						ease: ease.line
					}
				}),
				/* @__PURE__ */ jsx("text", {
					x: "30",
					y: "470",
					fill: faint,
					fillOpacity: "0.4",
					fontFamily: "var(--font-mono)",
					fontSize: "8",
					letterSpacing: "1.2",
					children: "EVERYTHING ABOVE RESTS HERE"
				})
			]
		}) })
	});
}
//#endregion
//#region src/components/sections/Architecture.tsx
/**
* Homepage: the architecture argument.
*
* One drawing, one paragraph of thesis, and the diagram. This is the section
* that justifies the site: the four practice areas are not a menu, they are a
* stack, and the stack only works if it is designed together.
*/
function Architecture() {
	return /* @__PURE__ */ jsx(Section, {
		id: "architecture",
		labelledBy: "architecture-title",
		tone: "ink",
		children: /* @__PURE__ */ jsx(Shell, { children: /* @__PURE__ */ jsxs(Grid, {
			rails: true,
			children: [/* @__PURE__ */ jsxs("div", {
				className: "col-span-4 md:col-span-8 lg:col-span-5",
				children: [
					/* @__PURE__ */ jsxs(Reveal, { children: [
						/* @__PURE__ */ jsx(Eyebrow, {
							index: "05",
							tone: "ink",
							live: true,
							children: "How it fits"
						}),
						/* @__PURE__ */ jsx(Title, {
							id: "architecture-title",
							tone: "ink",
							className: "mt-7",
							children: "One stack, not four departments."
						}),
						/* @__PURE__ */ jsx(Lead, {
							tone: "ink",
							className: "mt-8 text-neutral-300",
							children: "Infrastructure carries the ERP. Companion applications extend it. Automation threads across both. Designing them separately is how businesses end up with a system nobody can maintain."
						})
					] }),
					/* @__PURE__ */ jsx(Reveal, {
						delay: .14,
						children: /* @__PURE__ */ jsx(Body, {
							tone: "ink",
							className: "mt-7 text-neutral-300",
							children: "We work from the bottom up. A partner application that ignores the network and the storage it depends on is a liability, and an automation that ignores the process it touches is a nuisance. Each layer is specified in the same conversation as the one below it."
						})
					}),
					/* @__PURE__ */ jsx(Reveal, {
						delay: .22,
						children: /* @__PURE__ */ jsx(ArrowLink, {
							to: routes$1.services,
							tone: "ink",
							className: "mt-9",
							children: "See the engagement model"
						})
					})
				]
			}), /* @__PURE__ */ jsx("div", {
				className: "col-span-4 mt-14 md:col-span-8 lg:col-span-7 lg:mt-0 lg:col-start-6",
				children: /* @__PURE__ */ jsxs(Reveal, {
					delay: .08,
					children: [/* @__PURE__ */ jsx(SystemArchitecture, {
						tone: "ink",
						className: "lg:sticky lg:top-28"
					}), /* @__PURE__ */ jsx(Note, {
						tone: "ink",
						className: "mt-6",
						children: "Plate 05 — the stack Axleta designs against"
					})]
				})
			})]
		}) })
	});
}
//#endregion
//#region src/data/services.ts
var serviceStages = [
	{
		id: "discover",
		number: "01",
		title: "Discover",
		architecturalLabel: "REQUIREMENT / ANALYSIS",
		summary: "Before we propose anything, we work out what the requirement actually is. Not the one that was asked for aloud — the one the process needs.",
		services: [
			{
				title: "Requirement analysis",
				detail: "We analyse the requirement before supplying the service, to identify exactly what is needed and map the solution to fit the purpose.",
				sourceService: "Requirement analysis before solution delivery"
			},
			{
				title: "ERP consultancy",
				detail: "We help you choose the right ERP. We supply and support SAP Business One, and we evaluate other ERPs on their merits — for businesses in Sri Lanka and globally.",
				sourceService: "ERP Consultancy"
			},
			{
				title: "Strategic consultancy",
				detail: "Advisory across finance, marketing, supply chain management and operations management, aimed at an optimised business strategy.",
				sourceService: "Strategic Consultancy"
			}
		],
		output: "A written requirement and a recommended route, with the trade-offs stated."
	},
	{
		id: "design",
		number: "02",
		title: "Design",
		architecturalLabel: "ARCHITECTURE / MAPPING",
		summary: "The right technology mapped onto the way the business operates — architecture before purchase order.",
		services: [
			{
				title: "Technology selection",
				detail: "Platform, infrastructure and integration choices justified against fitness of purpose, cost and long-term maintainability rather than novelty.",
				sourceService: "Strategic Consultancy"
			},
			{
				title: "Solution architecture",
				detail: "How the ERP, its companion applications, the infrastructure beneath it and the automation between them fit together.",
				sourceService: "Requirement analysis before solution delivery"
			},
			{
				title: "Scope and specification",
				detail: "Specific, measurable, achievable, realistic and time-bound — the SMART objectives we work to on every engagement.",
				sourceService: "Requirement analysis before solution delivery"
			}
		],
		output: "A scoped specification, a sequence, and a plan that fits the budget and the deadline."
	},
	{
		id: "implement",
		number: "03",
		title: "Implement",
		architecturalLabel: "DELIVERY / BUILD",
		summary: "Configuration, development, integration and deployment — carried by a team that has done ERP implementations and other IT projects across industries.",
		services: [
			{
				title: "Customised add-on development",
				detail: "Our development team listens to the requirement and builds precise, feasible add-ons around your ERP rather than bending it.",
				sourceService: "Customized Add-on Developments"
			},
			{
				title: "ERP implementation",
				detail: "Configuration, data migration, integration and deployment of the selected ERP platform.",
				sourceService: "ERP Consultancy"
			},
			{
				title: "Project management",
				detail: "A flexible implementation model dedicated to meeting your requirements within budget and deadlines, including for the challenges that arise along the way.",
				sourceService: "Project Management Services"
			}
		],
		output: "A running system, integrated where it needs to be, with the handover documented."
	},
	{
		id: "improve",
		number: "04",
		title: "Improve",
		architecturalLabel: "SUPPORT / ADVANCE",
		summary: "Systems do not stay still. Neither do we — support, optimisation and the next increment of improvement.",
		services: [
			{
				title: "SAP Business One support",
				detail: "Ongoing support for businesses running SAP Business One, wherever they are.",
				sourceService: "ERP Consultancy"
			},
			{
				title: "Resource allocation",
				detail: "Flexible access to our team of experts, with flexible billing, to manage the internal demands of your business.",
				sourceService: "Resource Allocation"
			},
			{
				title: "Infrastructure care",
				detail: "Maintenance, security and virtualisation management keeping the foundation dependable.",
				sourceService: "ERP Consultancy"
			}
		],
		output: "A maintained system and a team already familiar with it — no re-briefing required."
	}
];
/** The published service items, for the coverage check in the changelog. */
var publishedServiceItems = [
	"Resource Allocation",
	"Strategic Consultancy",
	"Customized Add-on Developments",
	"Project Management Services",
	"ERP Consultancy"
];
/** Engagement principles, all traceable to the live /services page. */
var engagementPrinciples = [
	{
		label: "Requirement first",
		detail: "Requirement analysis runs before delivery, so the solution maps to the purpose rather than to the request."
	},
	{
		label: "Cost and time effectiveness",
		detail: "Scope is built to be thorough without being inflated — thorough on cost and time, whichever level of business you are."
	},
	{
		label: "Flexible resource support",
		detail: "Engagement scales with demand, under a flexible billing arrangement rather than a fixed retainer you do not need."
	},
	{
		label: "Practical pricing",
		detail: "Our services are available at a price that works for the business buying them."
	}
];
//#endregion
//#region src/components/sections/Engagement.tsx
/**
* Homepage: the engagement model.
*
* The four stages as a traverse — a continuous numbered line with the stages
* hung off it, rather than four equal cards. Each stage shows the services it
* covers and the concrete output a client can expect at the end of it, which is
* the honest way to present a delivery process.
*/
function Engagement() {
	return /* @__PURE__ */ jsx(Section, {
		id: "engagement",
		labelledBy: "engagement-title",
		children: /* @__PURE__ */ jsxs(Shell, { children: [/* @__PURE__ */ jsx(Grid, {
			rails: true,
			children: /* @__PURE__ */ jsxs("div", {
				className: "col-span-4 md:col-span-8 lg:col-span-5",
				children: [/* @__PURE__ */ jsxs(Reveal, { children: [
					/* @__PURE__ */ jsx(Eyebrow, {
						index: "06",
						children: "How we engage"
					}),
					/* @__PURE__ */ jsx(Title, {
						id: "engagement-title",
						className: "mt-7",
						children: "Requirement first. Delivery second. Support after that."
					}),
					/* @__PURE__ */ jsx(Body, {
						className: "mt-8",
						children: "Four stages, in order. Each one produces something you can look at before the next one starts, and going live is the midpoint rather than the finish line."
					})
				] }), /* @__PURE__ */ jsxs(Reveal, {
					delay: .14,
					children: [/* @__PURE__ */ jsx("div", {
						className: "mt-9 flex flex-wrap items-center gap-x-7 gap-y-4",
						children: /* @__PURE__ */ jsx(ArrowLink, {
							to: routes$1.services,
							onClick: () => void 0,
							children: "All services"
						})
					}), /* @__PURE__ */ jsx(Note, {
						className: "mt-8",
						children: "Published services: requirement analysis, ERP consultancy, strategic consultancy, customised add-on development, project management, resource allocation and SAP Business One support."
					})]
				})]
			})
		}), /* @__PURE__ */ jsx("ol", {
			className: "mt-section-y-tight",
			children: serviceStages.map((stage, i) => /* @__PURE__ */ jsx(Reveal, {
				as: "li",
				index: i,
				className: "relative",
				children: /* @__PURE__ */ jsxs("div", {
					className: "grid grid-cols-4 gap-x-6 gap-y-6 md:grid-cols-8 lg:grid-cols-12",
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "col-span-4 md:col-span-1 lg:col-span-1",
							children: /* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-4 lg:block",
								children: [/* @__PURE__ */ jsx("span", {
									className: "label shrink-0 text-accent-700 tabular-nums",
									children: stage.number
								}), /* @__PURE__ */ jsx("span", {
									"aria-hidden": "true",
									className: "block h-px flex-1 bg-line lg:mt-3 lg:h-px lg:w-full"
								})]
							})
						}),
						/* @__PURE__ */ jsx("div", {
							className: "col-span-4 md:col-span-7 lg:col-span-4",
							children: /* @__PURE__ */ jsxs("div", {
								className: "pt-0 lg:pt-1",
								children: [
									/* @__PURE__ */ jsx(ArchitecturalLabel, { children: stage.architecturalLabel }),
									/* @__PURE__ */ jsx("h3", {
										className: "mt-5 font-display text-3xl font-medium leading-snug tracking-tightest",
										children: stage.title
									}),
									/* @__PURE__ */ jsx("p", {
										className: "mt-4 max-w-md leading-relaxed text-neutral-700",
										children: stage.summary
									})
								]
							})
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "col-span-4 md:col-span-8 md:col-start-2 lg:col-span-5 lg:col-start-8",
							children: [/* @__PURE__ */ jsx("dl", {
								className: "grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2",
								children: stage.services.map((service) => /* @__PURE__ */ jsxs("div", {
									className: "border-t border-line pt-4",
									children: [/* @__PURE__ */ jsx("dt", {
										className: "label text-ink",
										children: service.title
									}), /* @__PURE__ */ jsx("dd", {
										className: "mt-2 text-sm leading-relaxed text-neutral-700",
										children: service.detail
									})]
								}, service.title))
							}), /* @__PURE__ */ jsxs("p", {
								className: cn("mt-6 flex gap-3 border-l-2 border-accent-600 pl-4 text-sm leading-relaxed"),
								children: [/* @__PURE__ */ jsx("span", {
									className: "label shrink-0 text-accent-700",
									children: "Output"
								}), /* @__PURE__ */ jsx("span", {
									className: "text-neutral-900",
									children: stage.output
								})]
							})]
						})
					]
				})
			}, stage.id))
		})] })
	});
}
//#endregion
//#region src/data/insights.ts
/**
* Insights presentation layer.
*
* The data itself is generated at build time from the public Axleta blog feed
* (see scripts/fetch-insights.ts) and committed, so builds never depend on the
* blog being reachable at build time.
*
* The existing editorial archive is preserved by linking out to
* blog.axleta.com — no post body is scraped or republished here.
*/
var insights = [
	{
		title: "Building Blocks for Scalable Business Success via ERP system",
		href: "https://blog.axleta.com/2026/08/building-blocks-for-scalable-business.html",
		date: "2026-08-27T22:55:10.976-06:00",
		category: "ERP",
		excerpt: "If you have ever been part of an Enterprise Resource Planning (ERP) rollout, you know it is far more than just \"installing new software.\" It is an architectural overhaul of how your entire business operates. When…"
	},
	{
		title: "Why subdomains are used for mails ?",
		href: "https://blog.axleta.com/2026/05/why-subdomains-are-used-for-mails.html",
		date: "2026-05-11T23:27:00.004-06:00",
		category: "Google Workspace",
		excerpt: "Here at Axleta, we are also using the \"@mail.axleta.com\" for emails. We would like to introduce the benefits of using a subdomain. Separation of services : mail.axleta.com is distinct from www.axleta.com . This…"
	},
	{
		title: "Boost your PC with Free Microsoft Tool - Microsoft PC Manager",
		href: "https://blog.axleta.com/2026/05/boost-your-pc-with-free-microsoft-tool.html",
		date: "2026-05-03T00:35:00.003-06:00",
		category: "IT",
		excerpt: "Boost your PC’s speed and reclaim your productivity! As IT professionals, we often ask how to fix a lagging computer without installing \"bloatware and malware\". Our top recommendation is the Microsoft PC Manager…"
	},
	{
		title: "How to clearly identify the \"Cancellation\" document in SAP Business One",
		href: "https://blog.axleta.com/2022/02/how-to-clearly-identify-cancellation.html",
		date: "2022-02-11T11:44:00.004-06:00",
		category: "ERP",
		excerpt: "How to clearly identify the \"Cancellation\" document in SAP Business One When raising a cancellation document against an AR or AP document, it shows the status as closed with \"Cancellation\" in the new cancellation…"
	},
	{
		title: "How to overcome the Adobe Flash Player Problem?",
		href: "https://blog.axleta.com/2021/05/how-to-overcome-adobe-flash-player.html",
		date: "2021-05-11T12:10:00.001-06:00",
		category: "ERP",
		excerpt: "When you have to deal with .swf files for referring to SAP Business One ERP Training Videos and Dashboard Solution, you might have problems like not opening the.swf files with the existing flash player because it is no…"
	},
	{
		title: "How to edit the office file without changing the file format  from Gmail and Google Drive",
		href: "https://blog.axleta.com/2021/02/how-to-edit-office-file-without.html",
		date: "2021-02-10T22:39:00.001-06:00",
		category: "Axleta",
		excerpt: "When we work with cross platforms like Microsoft and Google, it is quite helpful to create, change and update files in a single format without changing the another file format. For example, we received a mail with a…"
	},
	{
		title: "Easiest way to reduce your company's operating expenses",
		href: "https://blog.axleta.com/2021/02/easiest-way-to-reduce-your-companys.html",
		date: "2021-02-08T12:10:00.000-06:00",
		category: "Axleta",
		excerpt: "When we are operating a business in the field, cost drives a major role especially for operating the business such as often abbreviated as OPEX, that includes rent, equipment purchases, inventory purchases, marketing…"
	},
	{
		title: "Be in fear of ERP ?",
		href: "https://blog.axleta.com/2021/01/be-in-fear-of-erp.html",
		date: "2021-01-28T00:56:00.002-06:00",
		category: "ERP",
		excerpt: "Especially, small and medium-sized enterprises (SMEs) have fear when talking about an ERP system. Actually, what is the fear and fear factor?. It is quite important to discuss these sections because most organizations…"
	},
	{
		title: "What are the advantages of having an ERP system?",
		href: "https://blog.axleta.com/2021/01/what-are-advantages-of-having-erp-system.html",
		date: "2021-01-24T08:44:00.001-06:00",
		category: "ERP",
		excerpt: "It is a real question today because most the organization are using ERP systems to cater daily business operations and some of the organizations are looking a new system to effectively run the business operation. Both…"
	},
	{
		title: "Why do you need a server in your organization",
		href: "https://blog.axleta.com/2021/01/why-do-you-need-server-in-your.html",
		date: "2021-01-17T13:33:00.001-06:00",
		category: "IT",
		excerpt: "There are different types of businesses and organizations in the world that can be varied according to the business functions and their capacity. When considering the small and mediums sized enterprises whose business…"
	},
	{
		title: "Starting with an 8GB Dedicated Server and reliably host your applications and files",
		href: "https://blog.axleta.com/2021/01/starting-with-8-gb-dedicated-server-and.html",
		date: "2021-01-13T12:28:00.003-06:00",
		category: "IT",
		excerpt: "Today most organizations are looking at the managed services because they have concerns like this. During this unprecedented time, how remotely access business applications and files? How to remotely access the servers…"
	},
	{
		title: "Hard and Soft allocation of stock in SAP Business One",
		href: "https://blog.axleta.com/2020/12/hard-and-soft-allocation-of-stock-in.html",
		date: "2020-12-05T01:26:00.001-06:00",
		category: "ERP",
		excerpt: "When you require to allocate the stock in a particular item in the inventory, you must have a solution to do that. In different instances, companies need to allocate quantities for different requirements. In retail…"
	}
];
var BLOG_URL = "https://blog.axleta.com/";
var MONTHS = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December"
];
function formatInsightDate(iso) {
	const date = new Date(iso);
	if (Number.isNaN(date.getTime())) return "";
	return `${date.getUTCDate()} ${MONTHS[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
}
var byNewest = (a, b) => Date.parse(b.date) - Date.parse(a.date);
var sortedInsights = [...insights].sort(byNewest);
/** One featured article plus two supporting articles — never a card grid. */
function selectInsights(count = 3) {
	const [featured, ...rest] = sortedInsights;
	if (!featured) return null;
	return {
		featured,
		supporting: rest.slice(0, Math.max(0, count - 1))
	};
}
var insightCategories = Array.from(new Set(sortedInsights.map((entry) => entry.category))).sort();
//#endregion
//#region src/components/sections/Principles.tsx
/**
* Homepage: principles, ecosystem and insights.
*
* The brief asked for a "why Axleta" section. Because no statistics, testimonials
* or case studies exist in the verified content, that section is expressed as
* seven evidence-based principles instead — each one traceable to a published
* capability. This is the honest substitute for social proof, and it reads
* better than invented numbers would.
*/
function Principles() {
	return /* @__PURE__ */ jsx(Section, {
		id: "principles",
		labelledBy: "principles-title",
		children: /* @__PURE__ */ jsx(Shell, { children: /* @__PURE__ */ jsxs(Grid, {
			rails: true,
			children: [/* @__PURE__ */ jsx("div", {
				className: "col-span-4 md:col-span-8 lg:col-span-4",
				children: /* @__PURE__ */ jsxs(Reveal, { children: [
					/* @__PURE__ */ jsx(Eyebrow, {
						index: "07",
						children: "Why Axleta"
					}),
					/* @__PURE__ */ jsx(Title, {
						id: "principles-title",
						className: "mt-7",
						children: "What we hold to."
					}),
					/* @__PURE__ */ jsx(Body, {
						className: "mt-7",
						children: "Every principle below is a description of something Axleta actually publishes it can do — not an aspiration and not a claim about results we cannot evidence."
					})
				] })
			}), /* @__PURE__ */ jsx("div", {
				className: "col-span-4 mt-12 md:col-span-8 lg:col-span-8 lg:mt-0",
				children: /* @__PURE__ */ jsx("ol", {
					className: "grid gap-x-8 gap-y-9 sm:grid-cols-2",
					children: principles.map((principle, i) => /* @__PURE__ */ jsx(Reveal, {
						as: "li",
						index: i,
						rule: true,
						children: /* @__PURE__ */ jsxs("div", {
							className: "pt-7",
							children: [
								/* @__PURE__ */ jsx("span", {
									className: "label text-accent-700 tabular-nums",
									children: principle.index
								}),
								/* @__PURE__ */ jsx("h3", {
									className: "mt-4 font-display text-xl leading-snug tracking-tightest",
									children: principle.label
								}),
								/* @__PURE__ */ jsx("p", {
									className: "mt-3 text-sm leading-relaxed text-neutral-700",
									children: principle.detail
								})
							]
						})
					}, principle.index))
				})
			})]
		}) })
	});
}
function Ecosystem() {
	return /* @__PURE__ */ jsx(Section, {
		id: "ecosystem",
		tone: "sunken",
		tight: true,
		labelledBy: "ecosystem-title",
		children: /* @__PURE__ */ jsxs(Shell, { children: [/* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsx(Eyebrow, {
			index: "08",
			children: "Technology ecosystem"
		}) }), /* @__PURE__ */ jsxs(Grid, {
			rails: true,
			className: "mt-8",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "col-span-4 md:col-span-8 lg:col-span-4",
				children: [/* @__PURE__ */ jsx(Title, {
					id: "ecosystem-title",
					children: "Relationships, stated plainly."
				}), /* @__PURE__ */ jsx(Note, {
					className: "mt-6",
					children: "Technology names are the property of their respective owners. Partner logos are not reproduced here because no mark-use authorisation is held."
				})]
			}), /* @__PURE__ */ jsxs("div", {
				className: "col-span-4 mt-10 md:col-span-8 lg:col-span-8 lg:mt-0",
				children: [
					partners.map((partner) => /* @__PURE__ */ jsxs("div", {
						className: "grid gap-x-8 gap-y-3 border-t border-line py-7 sm:grid-cols-[minmax(10rem,1fr)_2fr_auto] sm:items-baseline",
						children: [
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
								className: "font-display text-2xl tracking-tightest",
								children: partner.wordmark
							}), /* @__PURE__ */ jsx("p", {
								className: "label mt-1.5 text-accent-700",
								children: partner.sublabel
							})] }),
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
								className: "font-medium",
								children: partner.statement
							}), /* @__PURE__ */ jsx("p", {
								className: "mt-2 max-w-xl text-sm leading-relaxed text-neutral-700",
								children: partner.detail
							})] }),
							/* @__PURE__ */ jsx(ArrowLink, {
								to: partner.href,
								external: true,
								onClick: () => (`${partner.id}`, void 0),
								className: "shrink-0",
								children: partner.linkLabel
							})
						]
					}, partner.id)),
					/* @__PURE__ */ jsx(Rule, { className: "mt-2" }),
					/* @__PURE__ */ jsx(ArrowLink, {
						to: routes$1.googleWorkspace,
						className: "mt-6",
						children: "Google Workspace for collaborating teams"
					})
				]
			})]
		})] })
	});
}
function InsightsFeature() {
	const selection = selectInsights(3);
	return /* @__PURE__ */ jsx(Section, {
		id: "insights",
		labelledBy: "insights-title",
		tight: true,
		children: /* @__PURE__ */ jsx(Shell, { children: /* @__PURE__ */ jsxs(Grid, {
			rails: true,
			children: [/* @__PURE__ */ jsxs("div", {
				className: "col-span-4 md:col-span-8 lg:col-span-4",
				children: [/* @__PURE__ */ jsxs(Reveal, { children: [
					/* @__PURE__ */ jsx(Eyebrow, {
						index: "09",
						children: "Insights"
					}),
					/* @__PURE__ */ jsx(Title, {
						id: "insights-title",
						className: "mt-7",
						children: "Notes from the Axleta blog."
					}),
					/* @__PURE__ */ jsx(Body, {
						className: "mt-6",
						children: "We have been writing about ERP, infrastructure and everyday IT for years. The archive is on our own blog — here is the most recent of it."
					})
				] }), /* @__PURE__ */ jsx(Reveal, {
					delay: .12,
					children: /* @__PURE__ */ jsxs("div", {
						className: "mt-8 flex flex-wrap gap-x-7 gap-y-4",
						children: [/* @__PURE__ */ jsx(ArrowLink, {
							to: routes$1.insights,
							children: "All insights"
						}), /* @__PURE__ */ jsx(ArrowLink, {
							to: external.blog,
							external: true,
							onClick: () => void 0,
							children: "Visit the blog"
						})]
					})
				})]
			}), /* @__PURE__ */ jsx("div", {
				className: "col-span-4 mt-12 md:col-span-8 lg:col-span-7 lg:col-start-6 lg:mt-0",
				children: !selection ? /* @__PURE__ */ jsxs("p", {
					className: "leading-relaxed text-neutral-700",
					children: [
						"The blog feed could not be read at build time. The archive is still available at",
						" ",
						/* @__PURE__ */ jsx("a", {
							href: external.blog,
							className: "underline underline-offset-4 hover:text-accent-700",
							target: "_blank",
							rel: "noopener noreferrer",
							children: "blog.axleta.com"
						}),
						"."
					]
				}) : /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsxs("a", {
					href: selection.featured.href,
					target: "_blank",
					rel: "noopener noreferrer",
					onClick: () => (selection.featured.title, void 0),
					className: "group block border-t-2 border-ink pt-7",
					children: [
						/* @__PURE__ */ jsxs("p", {
							className: "label flex flex-wrap items-center gap-x-4 gap-y-2 text-neutral-700",
							children: [
								/* @__PURE__ */ jsx("span", {
									className: "text-accent-700",
									children: "Latest"
								}),
								/* @__PURE__ */ jsx("span", { children: selection.featured.category }),
								/* @__PURE__ */ jsx("time", {
									dateTime: selection.featured.date,
									children: formatInsightDate(selection.featured.date)
								})
							]
						}),
						/* @__PURE__ */ jsx("h3", {
							className: "mt-5 font-display text-3xl font-medium leading-snug tracking-tightest transition-colors duration-300 group-hover:text-accent-700 lg:text-[2.5rem]",
							children: selection.featured.title
						}),
						/* @__PURE__ */ jsx("p", {
							className: "measure mt-5 leading-relaxed text-neutral-700",
							children: selection.featured.excerpt
						}),
						/* @__PURE__ */ jsxs("span", {
							className: "label mt-6 inline-flex items-center gap-2 text-accent-700",
							children: ["Read on the blog", /* @__PURE__ */ jsx("span", {
								"aria-hidden": "true",
								className: "transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none",
								children: "→"
							})]
						})
					]
				}) }), /* @__PURE__ */ jsx("ul", {
					className: "mt-12 grid gap-x-8 gap-y-8 sm:grid-cols-2",
					children: selection.supporting.map((article, i) => /* @__PURE__ */ jsx(Reveal, {
						as: "li",
						index: i,
						rule: true,
						children: /* @__PURE__ */ jsxs("a", {
							href: article.href,
							target: "_blank",
							rel: "noopener noreferrer",
							onClick: () => (article.title, void 0),
							className: "group block pt-7",
							children: [
								/* @__PURE__ */ jsxs("p", {
									className: "label flex flex-wrap items-center gap-x-3 text-neutral-700",
									children: [/* @__PURE__ */ jsx("span", {
										className: "text-accent-700",
										children: article.category
									}), /* @__PURE__ */ jsx("time", {
										dateTime: article.date,
										children: formatInsightDate(article.date)
									})]
								}),
								/* @__PURE__ */ jsx("h4", {
									className: "mt-4 font-display text-xl leading-snug tracking-tightest transition-colors duration-300 group-hover:text-accent-700",
									children: article.title
								}),
								/* @__PURE__ */ jsx("p", {
									className: "mt-3 text-sm leading-relaxed text-neutral-700",
									children: article.excerpt
								})
							]
						})
					}, article.href))
				})] })
			})]
		}) })
	});
}
//#endregion
//#region src/pages/HomePage.tsx
/**
* Homepage.
*
* Section order is the argument: the premise, then what we build, then how it
* fits together, then how we deliver it, then who we are, then what we have
* published. Ink and paper alternate down the page so no two consecutive
* sections share a rhythm.
*/
function HomePage() {
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(Seo, { meta: metaFor("home") }),
		/* @__PURE__ */ jsx(Hero, {}),
		/* @__PURE__ */ jsx(Premise, {}),
		/* @__PURE__ */ jsx(SolutionsShowcase, {}),
		/* @__PURE__ */ jsx(Architecture, {}),
		/* @__PURE__ */ jsx(Engagement, {}),
		/* @__PURE__ */ jsx(Principles, {}),
		/* @__PURE__ */ jsx(Ecosystem, {}),
		/* @__PURE__ */ jsx(InsightsFeature, {})
	] });
}
lazy(() => Promise.resolve().then(() => AboutPage_exports));
lazy(() => Promise.resolve().then(() => SolutionsPage_exports));
lazy(() => Promise.resolve().then(() => ServicesPage_exports));
lazy(() => Promise.resolve().then(() => InsightsPage_exports));
lazy(() => Promise.resolve().then(() => ContactPage_exports));
lazy(() => Promise.resolve().then(() => GoogleWorkspacePage_exports));
lazy(() => Promise.resolve().then(() => LegalPage_exports));
lazy(() => Promise.resolve().then(() => NotFoundPage_exports));
/** Route transitions. Never longer than a beat — the user must not wait. */
function PageTransition({ children }) {
	const reduced = usePrefersReducedMotion();
	const variant = reduced ? variants$1.pageStatic : variants$1.page;
	const MotionDiv = motion.div;
	return /* @__PURE__ */ jsx(MotionDiv, {
		initial: variant.initial,
		animate: variant.enter,
		exit: variant.exit,
		transition: {
			duration: reduced ? duration.fast : duration.route,
			ease: ease.entrance
		},
		children
	});
}
/**
* The chrome every route sits inside: header, main landmark, footer.
*
* Exported because scripts/prerender.tsx renders the same tree. Sharing the
* component is the only way the static HTML can carry the real navigation and
* landmarks instead of a bare page fragment — a no-JS visitor gets the same
* menu a JS visitor gets, and crawlers see one coherent document.
*/
function PageShell({ children }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex min-h-dvh flex-col",
		children: [
			/* @__PURE__ */ jsx(ScrollManager, {}),
			/* @__PURE__ */ jsx(SiteHeader, {}),
			/* @__PURE__ */ jsx("main", {
				id: "main",
				className: "flex-1",
				children: /* @__PURE__ */ jsx(AnimatePresence, {
					mode: "wait",
					initial: false,
					children
				})
			}),
			/* @__PURE__ */ jsx(SiteFooter, {})
		]
	});
}
//#endregion
//#region src/components/layout/CoordinateRail.tsx
/**
* Signature A — the coordinate rail.
*
* A fixed marker column, visible from 78rem up, that tracks which section of a
* long page you are reading. It is a genuine navigation aid (each marker is a
* link to a section), which is why it exists at all: decoration that cannot be
* operated is just noise.
*
* Implementation notes:
*  - Scroll position is read in a single rAF-throttled pass; no layout thrash.
*  - Markers are real anchors, so they work without JavaScript and are part of
*    the tab order.
*  - Hidden below 78rem and under reduced motion, where the per-marker pulse
*    would be decoration with no benefit.
*/
var INK_SELECTOR = ".surface-ink, [data-surface=\"ink\"]";
/**
* Hit-test a single point and report the surface of the topmost painted element
* there.
*
* The rail is a fixed overlay, so it is never a descendant of whatever it floats
* over — including the footer, which is ink on every page. Inferring the surface
* from the section list gets that wrong, and so does inferring one surface for
* the whole rail: the rail is ~156px tall and can straddle a section boundary,
* so markers at either end legitimately sit on different surfaces. Each marker
* is therefore resolved at its own centre point.
*/
function surfaceAt(x, y) {
	if (y < 0 || y > window.innerHeight || x < 0 || x > window.innerWidth) return "paper";
	for (const node of document.elementsFromPoint(x, y)) {
		const style = getComputedStyle(node);
		const channels = style.backgroundColor.match(/rgba?\(([^)]+)\)/)?.[1]?.split(",").map((v) => parseFloat(v)) ?? [];
		const alpha = channels.length === 4 ? channels[3] : channels.length === 3 ? 1 : 0;
		if (!(style.backgroundImage && style.backgroundImage !== "none" || alpha >= .95)) continue;
		return node.matches(INK_SELECTOR) ? "ink" : "paper";
	}
	return "paper";
}
/** Hit-testing costs a style recalc per marker, so only redo it on real movement. */
var SURFACE_REFRESH_PX = 24;
function CoordinateRail({ items }) {
	const [active, setActive] = useState(items[0]?.id ?? "");
	const [visible, setVisible] = useState(false);
	const [surfaces, setSurfaces] = useState({});
	const reduced = usePrefersReducedMotion();
	const railRef = useRef(null);
	const lastSurfaceY = useRef(Number.NEGATIVE_INFINITY);
	useEffect(() => {
		const read = () => setVisible(window.scrollY > window.innerHeight * .6);
		read();
		let frame = 0;
		const onScroll = () => {
			if (frame) return;
			frame = window.requestAnimationFrame(() => {
				frame = 0;
				read();
			});
		};
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => {
			if (frame) window.cancelAnimationFrame(frame);
			window.removeEventListener("scroll", onScroll);
		};
	}, []);
	useEffect(() => {
		let frame = 0;
		const read = () => {
			frame = 0;
			const line = window.innerHeight * .4;
			let current = items[0]?.id ?? "";
			for (const item of items) {
				const el = document.getElementById(item.id);
				if (!el) continue;
				if (el.getBoundingClientRect().top <= line) current = item.id;
			}
			const last = items[items.length - 1];
			if (last) {
				const el = document.getElementById(last.id);
				if (el && el.getBoundingClientRect().bottom < window.innerHeight * .5) {
					const first = document.getElementById(items[0]?.id ?? "");
					if (first && first.getBoundingClientRect().top > window.innerHeight * .5) current = items[0]?.id ?? "";
				}
			}
			setActive(current);
			if (Math.abs(window.scrollY - lastSurfaceY.current) < SURFACE_REFRESH_PX) return;
			lastSurfaceY.current = window.scrollY;
			const next = {};
			for (const item of items) {
				const rect = (railRef.current?.querySelector(`[data-rail-id="${item.id}"]`))?.getBoundingClientRect();
				next[item.id] = rect ? surfaceAt(rect.left + rect.width / 2, rect.top + rect.height / 2) : "paper";
			}
			setSurfaces(next);
		};
		const onScroll = () => {
			if (frame) return;
			frame = window.requestAnimationFrame(read);
		};
		read();
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onScroll, { passive: true });
		return () => {
			if (frame) window.cancelAnimationFrame(frame);
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onScroll);
		};
	}, [items]);
	if (items.length < 2) return null;
	return /* @__PURE__ */ jsx("div", {
		ref: railRef,
		"aria-hidden": false,
		className: cn("coordinate-rail pointer-events-none fixed left-0 top-1/2 z-30 hidden -translate-y-1/2 rail:block", "transition-opacity duration-500 ease-[var(--ease-standard)]", visible ? "opacity-100" : "opacity-0"),
		children: /* @__PURE__ */ jsx("nav", {
			"aria-label": "On this page",
			className: "pointer-events-auto px-6",
			children: /* @__PURE__ */ jsx("ul", {
				className: "flex flex-col gap-1",
				children: items.map((item, i) => {
					const isActive = active === item.id;
					return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("a", {
						href: `#${item.id}`,
						"data-rail-id": item.id,
						"data-surface": surfaces[item.id] ?? "paper",
						className: "rail-marker group flex items-center gap-3 py-1.5",
						"aria-current": isActive ? "true" : void 0,
						children: [
							/* @__PURE__ */ jsx("span", {
								className: "rail-ordinal label w-5 shrink-0 text-right text-neutral-700 tabular-nums transition-colors duration-300 group-hover:text-ink",
								children: String(i + 1).padStart(2, "0")
							}),
							/* @__PURE__ */ jsxs("span", {
								className: "relative block h-6 w-3",
								children: [/* @__PURE__ */ jsx("span", {
									"aria-hidden": "true",
									className: cn("rail-tick absolute left-0 top-1/2 block w-3 -translate-y-1/2 border-t transition-all duration-500 ease-[var(--ease-line)]", isActive ? "w-5 border-accent-700" : "border-neutral-700 group-hover:w-5 group-hover:border-accent-600")
								}), isActive && !reduced ? /* @__PURE__ */ jsx("span", {
									"aria-hidden": "true",
									className: "axleta-signal-dot rail-dot absolute -right-1 top-1/2 h-1 w-1 -translate-y-1/2 rounded-full bg-accent-700"
								}) : null]
							}),
							/* @__PURE__ */ jsx("span", {
								"data-active": isActive ? "true" : void 0,
								className: cn("rail-label label whitespace-nowrap transition-all duration-300", isActive ? "text-ink opacity-100" : "text-neutral-700 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"),
								children: item.label
							})
						]
					}) }, item.id);
				})
			})
		})
	});
}
/**
* Horizontal index strip used at the top of long pages. On small screens it
* becomes a horizontally scrollable row with a visible scroll affordance
* rather than a hidden overflow.
*/
function SectionIndex({ items }) {
	return /* @__PURE__ */ jsx("nav", {
		"aria-label": "Sections on this page",
		className: "rail:hidden",
		children: /* @__PURE__ */ jsx("ul", {
			className: "-mx-gutter flex gap-6 overflow-x-auto px-gutter pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
			role: "list",
			children: items.map((item, i) => /* @__PURE__ */ jsx("li", {
				className: "shrink-0",
				children: /* @__PURE__ */ jsxs("a", {
					href: `#${item.id}`,
					className: "label flex items-center gap-2 whitespace-nowrap border-b border-line-strong py-2 text-neutral-700 transition-colors duration-300 hover:border-accent-700 hover:text-accent-700",
					children: [/* @__PURE__ */ jsx("span", {
						className: "section-index-ordinal text-accent-700 tabular-nums",
						children: String(i + 1).padStart(2, "0")
					}), item.label]
				})
			}, item.id))
		})
	});
}
//#endregion
//#region src/components/layout/PageHero.tsx
function PageHero({ trail, eyebrow, architecturalLabel, title, lead, aside, children }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "relative overflow-hidden bg-surface pb-section-y-tight pt-32 lg:pt-40",
		children: [/* @__PURE__ */ jsx(Shell, { children: /* @__PURE__ */ jsxs(Grid, {
			rails: true,
			children: [/* @__PURE__ */ jsxs("div", {
				className: "col-span-4 md:col-span-8 lg:col-span-9",
				children: [
					/* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsx(Breadcrumbs, { trail }) }),
					/* @__PURE__ */ jsx(Reveal, {
						delay: .05,
						children: /* @__PURE__ */ jsx(Eyebrow, {
							index: "··",
							live: true,
							className: "mt-8",
							children: eyebrow
						})
					}),
					architecturalLabel ? /* @__PURE__ */ jsx(Reveal, {
						delay: .08,
						children: /* @__PURE__ */ jsx(ArchitecturalLabel, {
							className: "mt-6",
							children: architecturalLabel
						})
					}) : null,
					/* @__PURE__ */ jsx(SplitHeadline, {
						as: "h1",
						text: title,
						delay: .12,
						className: "mt-7 text-display font-display font-medium leading-[0.95] tracking-tightest"
					}),
					/* @__PURE__ */ jsx(Reveal, {
						delay: .34,
						children: /* @__PURE__ */ jsx(Lead, {
							className: "mt-8",
							children: lead
						})
					}),
					children
				]
			}), aside ? /* @__PURE__ */ jsx("div", {
				className: "col-span-4 mt-12 md:col-span-8 lg:col-span-3 lg:mt-0 lg:col-start-10",
				children: aside
			}) : null]
		}) }), /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-x-0 bottom-0 h-px bg-border" })]
	});
}
/** The display setting used on legal pages, which must stay compact. */
function CompactHero({ trail, eyebrow, title, lead, reviewed }) {
	return /* @__PURE__ */ jsx("div", {
		className: "bg-surface pb-section-y-tight pt-32 lg:pt-36",
		children: /* @__PURE__ */ jsxs(Shell, { children: [
			/* @__PURE__ */ jsx(Breadcrumbs, { trail }),
			/* @__PURE__ */ jsx(Eyebrow, {
				index: "··",
				live: true,
				className: "mt-8",
				children: eyebrow
			}),
			/* @__PURE__ */ jsx(Display, {
				className: "mt-6 text-title",
				children: title
			}),
			/* @__PURE__ */ jsx("p", {
				className: "measure mt-6 leading-loose text-neutral-700",
				children: lead
			}),
			/* @__PURE__ */ jsxs("p", {
				className: "label mt-8 text-neutral-700",
				children: ["Last reviewed ", /* @__PURE__ */ jsx("time", {
					dateTime: reviewed,
					children: formatReviewed(reviewed)
				})]
			})
		] })
	});
}
function formatReviewed(iso) {
	const date = new Date(iso);
	if (Number.isNaN(date.getTime())) return iso;
	return date.toLocaleDateString("en-GB", {
		day: "numeric",
		month: "long",
		year: "numeric",
		timeZone: "UTC"
	});
}
//#endregion
//#region src/pages/AboutPage.tsx
/**
* /about — the company record.
*
* Vision, mission, values, the practice timeline and the technology ecosystem,
* all taken from the live About page. The page closes with a short, explicit
* account of what Axleta does *not* claim here and why — the same content as
* `verificationFlags` in data/company.ts, rendered for a human reader rather
* than hidden in a changelog.
*/
var AboutPage_exports = /* @__PURE__ */ __exportAll({ default: () => AboutPage });
var TRAIL$5 = [{
	name: "Home",
	path: routes$1.home
}, {
	name: "About",
	path: routes$1.about
}];
function AboutPage() {
	const railItems = useMemo(() => [
		{
			id: "story",
			label: "Story"
		},
		{
			id: "vision",
			label: "Vision & mission"
		},
		{
			id: "principles",
			label: "Principles"
		},
		{
			id: "timeline",
			label: "Timeline"
		},
		{
			id: "partnerships",
			label: "Partnerships"
		},
		{
			id: "evidence",
			label: "What we claim"
		}
	], []);
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(Seo, {
			meta: metaFor("about"),
			trail: TRAIL$5
		}),
		/* @__PURE__ */ jsx(PageHero, {
			trail: TRAIL$5,
			eyebrow: "About Axleta",
			architecturalLabel: `COMPANY / EST. ${company.founded}`,
			title: "A technology companion for the business, not a vendor of licences.",
			lead: company.descriptor.charAt(0).toUpperCase() + company.descriptor.slice(1) + ".",
			aside: /* @__PURE__ */ jsxs("div", {
				className: "border-l-2 border-accent-600 pl-5",
				children: [/* @__PURE__ */ jsxs(Note, { children: ["Founded ", company.founded] }), /* @__PURE__ */ jsx("p", {
					className: "mt-3 text-sm leading-relaxed text-neutral-700",
					children: "Working with businesses in Sri Lanka and globally, from an axleta Canada address."
				})]
			}),
			children: /* @__PURE__ */ jsx("div", {
				className: "mt-12 rail:hidden",
				children: /* @__PURE__ */ jsx(SectionIndex, { items: railItems })
			})
		}),
		/* @__PURE__ */ jsx(CoordinateRail, { items: railItems }),
		/* @__PURE__ */ jsx(Section, {
			id: "story",
			labelledBy: "story-title",
			tight: true,
			className: "scroll-mt-24",
			children: /* @__PURE__ */ jsx(Shell, { children: /* @__PURE__ */ jsxs(Grid, {
				rails: true,
				children: [/* @__PURE__ */ jsx("div", {
					className: "col-span-4 md:col-span-8 lg:col-span-4",
					children: /* @__PURE__ */ jsxs(Reveal, { children: [/* @__PURE__ */ jsx(Eyebrow, {
						index: "01",
						children: "Story"
					}), /* @__PURE__ */ jsx(Title, {
						id: "story-title",
						className: "mt-7",
						children: "What the firm is for."
					})] })
				}), /* @__PURE__ */ jsx("div", {
					className: "col-span-4 mt-10 md:col-span-8 lg:col-span-7 lg:col-start-6 lg:mt-0",
					children: company.story.map((paragraph, i) => /* @__PURE__ */ jsx(Reveal, {
						index: i,
						rule: true,
						className: "pt-8",
						children: /* @__PURE__ */ jsx("p", {
							className: "text-lead leading-loose text-neutral-900",
							children: paragraph
						})
					}, paragraph.slice(0, 32)))
				})]
			}) })
		}),
		/* @__PURE__ */ jsx(Section, {
			id: "vision",
			labelledBy: "vision-title",
			tone: "ink",
			className: "scroll-mt-24",
			children: /* @__PURE__ */ jsx(Shell, { children: /* @__PURE__ */ jsxs(Grid, {
				rails: true,
				children: [/* @__PURE__ */ jsxs("div", {
					className: "col-span-4 md:col-span-8 lg:col-span-5",
					children: [/* @__PURE__ */ jsxs(Reveal, { children: [/* @__PURE__ */ jsx(Eyebrow, {
						index: "02",
						tone: "ink",
						live: true,
						children: "Vision"
					}), /* @__PURE__ */ jsx(Title, {
						id: "vision-title",
						tone: "ink",
						className: "mt-7",
						children: company.vision
					})] }), /* @__PURE__ */ jsx(Reveal, {
						delay: .12,
						children: /* @__PURE__ */ jsxs("div", {
							className: "mt-10 border-l-2 border-accent-300 pl-5",
							children: [/* @__PURE__ */ jsx(Eyebrow, {
								index: "03",
								tone: "ink",
								children: "Mission"
							}), /* @__PURE__ */ jsx("p", {
								className: "mt-4 leading-loose text-neutral-300",
								children: company.mission
							})]
						})
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "col-span-4 mt-12 md:col-span-8 lg:col-span-6 lg:col-start-7 lg:mt-0",
					children: [
						/* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsx("p", {
							className: "label text-neutral-500",
							children: "Values, as published"
						}) }),
						company.values.map((value, i) => /* @__PURE__ */ jsxs(Reveal, {
							index: i,
							rule: true,
							tone: "ink",
							className: "pt-8",
							children: [/* @__PURE__ */ jsx(Subtitle, {
								as: "h3",
								tone: "ink",
								className: "text-2xl",
								children: value.title
							}), /* @__PURE__ */ jsx("p", {
								className: "mt-3 max-w-lg leading-relaxed text-neutral-300",
								children: value.detail
							})]
						}, value.title)),
						/* @__PURE__ */ jsxs(Reveal, {
							delay: .2,
							children: [/* @__PURE__ */ jsx(Rule, { className: "mt-10 bg-white/12" }), /* @__PURE__ */ jsx("p", {
								className: "mt-6 max-w-lg text-sm leading-relaxed text-neutral-500",
								children: "Axleta's public content states these values as a pair. We have not padded the list out to fill a grid."
							})]
						})
					]
				})]
			}) })
		}),
		/* @__PURE__ */ jsx(Section, {
			id: "principles",
			labelledBy: "principles-title",
			tight: true,
			className: "scroll-mt-24",
			children: /* @__PURE__ */ jsx(Shell, { children: /* @__PURE__ */ jsxs(Grid, {
				rails: true,
				children: [/* @__PURE__ */ jsxs("div", {
					className: "col-span-4 md:col-span-8 lg:col-span-4",
					children: [/* @__PURE__ */ jsxs(Reveal, { children: [
						/* @__PURE__ */ jsx(Eyebrow, {
							index: "04",
							children: "How we work"
						}),
						/* @__PURE__ */ jsx(Title, {
							id: "principles-title",
							className: "mt-7",
							children: "Seven principles, each traceable to a capability."
						}),
						/* @__PURE__ */ jsx(Body, {
							className: "mt-7",
							children: "Nothing below is a claim about results. Each one describes how Axleta approaches an engagement, and each maps to something the firm publishes it can deliver."
						})
					] }), /* @__PURE__ */ jsx(Reveal, {
						delay: .14,
						children: /* @__PURE__ */ jsx(CtaPair, {
							className: "mt-10",
							primary: {
								to: routes$1.contact,
								label: "Talk to us"
							},
							secondary: {
								to: routes$1.services,
								label: "How we engage"
							}
						})
					})]
				}), /* @__PURE__ */ jsx("div", {
					className: "col-span-4 mt-12 md:col-span-8 lg:col-span-7 lg:col-start-6 lg:mt-0",
					children: /* @__PURE__ */ jsx("ol", {
						className: "grid gap-x-8 gap-y-9 sm:grid-cols-2",
						children: principles.map((principle, i) => /* @__PURE__ */ jsx(Reveal, {
							as: "li",
							index: i,
							rule: true,
							children: /* @__PURE__ */ jsxs("div", {
								className: "pt-7",
								children: [
									/* @__PURE__ */ jsx("span", {
										className: "label text-accent-700 tabular-nums",
										children: principle.index
									}),
									/* @__PURE__ */ jsx("h3", {
										className: "mt-4 font-display text-xl leading-snug tracking-tightest",
										children: principle.label
									}),
									/* @__PURE__ */ jsx("p", {
										className: "mt-3 text-sm leading-relaxed text-neutral-700",
										children: principle.detail
									})
								]
							})
						}, principle.index))
					})
				})]
			}) })
		}),
		/* @__PURE__ */ jsx(Section, {
			id: "timeline",
			labelledBy: "timeline-title",
			tone: "sunken",
			tight: true,
			className: "scroll-mt-24",
			children: /* @__PURE__ */ jsx(Shell, { children: /* @__PURE__ */ jsxs(Grid, {
				rails: true,
				children: [/* @__PURE__ */ jsx("div", {
					className: "col-span-4 md:col-span-8 lg:col-span-3",
					children: /* @__PURE__ */ jsxs(Reveal, { children: [/* @__PURE__ */ jsx(Eyebrow, {
						index: "05",
						children: "Timeline"
					}), /* @__PURE__ */ jsx(Title, {
						id: "timeline-title",
						className: "mt-7",
						children: "How the practice grew."
					})] })
				}), /* @__PURE__ */ jsx("div", {
					className: "col-span-4 mt-12 md:col-span-8 lg:col-span-8 lg:col-start-5 lg:mt-0",
					children: /* @__PURE__ */ jsx("ol", { children: timeline.map((entry, i) => /* @__PURE__ */ jsx(Reveal, {
						as: "li",
						index: i,
						rule: true,
						children: /* @__PURE__ */ jsxs("div", {
							className: "grid gap-x-8 gap-y-3 pt-8 sm:grid-cols-[8rem_minmax(0,1fr)]",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex items-baseline gap-4 sm:block",
								children: [/* @__PURE__ */ jsx("span", {
									className: "label text-accent-700",
									children: entry.year
								}), /* @__PURE__ */ jsx("h3", {
									className: "font-display text-2xl leading-snug tracking-tightest sm:mt-4",
									children: entry.title
								})]
							}), /* @__PURE__ */ jsx("p", {
								className: "max-w-xl leading-relaxed text-neutral-700",
								children: entry.detail
							})]
						})
					}, entry.year)) })
				})]
			}) })
		}),
		/* @__PURE__ */ jsx(Section, {
			id: "partnerships",
			labelledBy: "partnerships-title",
			className: "scroll-mt-24",
			children: /* @__PURE__ */ jsx(Shell, { children: /* @__PURE__ */ jsxs(Grid, {
				rails: true,
				children: [/* @__PURE__ */ jsx("div", {
					className: "col-span-4 md:col-span-8 lg:col-span-4",
					children: /* @__PURE__ */ jsxs(Reveal, { children: [
						/* @__PURE__ */ jsx(Eyebrow, {
							index: "06",
							children: "Partnerships"
						}),
						/* @__PURE__ */ jsx(Title, {
							id: "partnerships-title",
							className: "mt-7",
							children: "The ecosystem Axleta works inside."
						}),
						/* @__PURE__ */ jsx(Body, {
							className: "mt-7",
							children: "Two published relationships. Both are stated in plain type rather than reproduced as logos, because no mark-use authorisation is held."
						})
					] })
				}), /* @__PURE__ */ jsxs("div", {
					className: "col-span-4 mt-12 md:col-span-8 lg:col-span-7 lg:col-start-6 lg:mt-0",
					children: [
						partners.map((partner, i) => /* @__PURE__ */ jsxs(Reveal, {
							index: i,
							rule: true,
							className: "pt-9",
							children: [
								/* @__PURE__ */ jsx(ArchitecturalLabel, { children: partner.sublabel }),
								/* @__PURE__ */ jsx("h3", {
									className: "mt-4 font-display text-3xl font-medium tracking-tightest",
									children: partner.wordmark
								}),
								/* @__PURE__ */ jsx("p", {
									className: "mt-4 max-w-xl leading-loose text-neutral-900",
									children: partner.statement
								}),
								/* @__PURE__ */ jsx("p", {
									className: "mt-3 max-w-xl leading-relaxed text-neutral-700",
									children: partner.detail
								}),
								/* @__PURE__ */ jsx(ArrowLink, {
									to: partner.href,
									external: true,
									className: "mt-6",
									onClick: () => (`${partner.id}`, void 0),
									children: partner.linkLabel
								})
							]
						}, partner.id)),
						/* @__PURE__ */ jsx(Reveal, {
							delay: .2,
							children: /* @__PURE__ */ jsxs("div", {
								className: "mt-10 border-t border-line pt-8",
								children: [/* @__PURE__ */ jsx(Note, { children: "Axleta is also a Google Cloud Partner for the Google productivity suite. That relationship has its own page." }), /* @__PURE__ */ jsx(ArrowLink, {
									to: routes$1.googleWorkspace,
									className: "mt-5",
									children: "Google Workspace for collaborating teams"
								})]
							})
						}),
						/* @__PURE__ */ jsx(Reveal, {
							delay: .26,
							children: /* @__PURE__ */ jsxs("div", {
								className: "mt-8 flex flex-wrap gap-x-7 gap-y-4",
								children: [
									/* @__PURE__ */ jsx(ArrowLink, {
										to: external.sapBusinessOne,
										external: true,
										children: "SAP Business One"
									}),
									/* @__PURE__ */ jsx(ArrowLink, {
										to: external.sapS4hana,
										external: true,
										children: "SAP S/4HANA"
									}),
									/* @__PURE__ */ jsx(ArrowLink, {
										to: external.googleCloud,
										external: true,
										children: "Google Cloud"
									})
								]
							})
						})
					]
				})]
			}) })
		}),
		/* @__PURE__ */ jsx(Section, {
			id: "evidence",
			labelledBy: "evidence-title",
			tone: "ink",
			tight: true,
			className: "scroll-mt-24",
			children: /* @__PURE__ */ jsx(Shell, { children: /* @__PURE__ */ jsxs(Grid, {
				rails: true,
				children: [/* @__PURE__ */ jsx("div", {
					className: "col-span-4 md:col-span-8 lg:col-span-5",
					children: /* @__PURE__ */ jsxs(Reveal, { children: [
						/* @__PURE__ */ jsx(Eyebrow, {
							index: "07",
							tone: "ink",
							live: true,
							children: "Evidence"
						}),
						/* @__PURE__ */ jsx(Title, {
							id: "evidence-title",
							tone: "ink",
							className: "mt-7",
							children: "What this site does not claim."
						}),
						/* @__PURE__ */ jsx("p", {
							className: "measure mt-7 leading-loose text-neutral-300",
							children: "A few things are often asserted about firms like ours. None of them are supported by Axleta's current public content, so none of them appear on this site. Listing them is more useful than leaving you to notice the gaps."
						})
					] })
				}), /* @__PURE__ */ jsxs("div", {
					className: "col-span-4 mt-12 md:col-span-8 lg:col-span-7 lg:col-start-6 lg:mt-0",
					children: [
						verificationFlags.map((flag, i) => /* @__PURE__ */ jsxs(Reveal, {
							index: i,
							rule: true,
							tone: "ink",
							className: "pt-7",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "flex flex-wrap items-center gap-x-4 gap-y-2",
									children: [/* @__PURE__ */ jsx("h3", {
										className: "font-display text-xl leading-snug tracking-tightest",
										children: flag.claim
									}), /* @__PURE__ */ jsx("span", {
										className: cn("label rounded-xs px-2 py-1", flag.status === "unsupported" ? "bg-white/12 text-neutral-300" : "bg-accent-300/15 text-accent-300"),
										children: flag.status
									})]
								}),
								/* @__PURE__ */ jsx("p", {
									className: "mt-3 max-w-xl text-sm leading-relaxed text-neutral-300",
									children: flag.detail
								}),
								/* @__PURE__ */ jsx("p", {
									className: "mt-3 max-w-xl border-l-2 border-accent-300 pl-4 text-sm leading-relaxed text-paper",
									children: flag.resolution
								})
							]
						}, flag.claim)),
						/* @__PURE__ */ jsx(Rule, { className: "mt-10 bg-white/12" }),
						/* @__PURE__ */ jsx(Note, {
							tone: "ink",
							className: "mt-6",
							children: "Full verification detail, including source pages and dates, is in AXLETA_REVAMP_AUDIT.md in the project repository."
						})
					]
				})]
			}) })
		})
	] });
}
//#endregion
//#region src/pages/SolutionsPage.tsx
/**
* /solutions — the full portfolio.
*
* One route, four sections, each with an in-page anchor. The coordinate rail
* (Signature A) tracks position because this page is the longest on the site;
* below 78rem it becomes a horizontally scrollable section index.
*
* Each solution repeats the structure established on the homepage — description,
* `<dl>` capability index, a consultation link — but carries more copy and gets
* the sticky plate treatment.
*/
var SolutionsPage_exports = /* @__PURE__ */ __exportAll({ default: () => SolutionsPage });
var TRAIL$4 = [{
	name: "Home",
	path: routes$1.home
}, {
	name: "Solutions",
	path: routes$1.solutions
}];
function SolutionsPage() {
	const railItems = useMemo(() => solutions.map((s) => ({
		id: s.anchor,
		label: s.title
	})), []);
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(Seo, {
			meta: metaFor("solutions"),
			trail: TRAIL$4
		}),
		/* @__PURE__ */ jsx(PageHero, {
			trail: TRAIL$4,
			eyebrow: "Solutions",
			architecturalLabel: "PORTFOLIO / FOUR AREAS",
			title: "What Axleta builds, runs and keeps running.",
			lead: "Four connected areas of practice. Each one is chosen against how your business operates, and each one is specified in the same conversation as the others — because they depend on each other.",
			aside: /* @__PURE__ */ jsxs("div", {
				className: "border-l-2 border-accent-600 pl-5",
				children: [/* @__PURE__ */ jsx(Note, { children: "Published on the live Axleta site" }), /* @__PURE__ */ jsx("p", {
					className: "mt-3 text-sm leading-relaxed text-neutral-700",
					children: "Every capability on this page appears in Axleta's current public solutions and services content. Nothing has been added for effect."
				})]
			}),
			children: /* @__PURE__ */ jsx("div", {
				className: "mt-12 rail:hidden",
				children: /* @__PURE__ */ jsx(SectionIndex, { items: railItems })
			})
		}),
		/* @__PURE__ */ jsx(CoordinateRail, { items: railItems }),
		solutions.map((solution, index) => /* @__PURE__ */ jsx(Section, {
			id: solution.anchor,
			labelledBy: `${solution.id}-title`,
			tone: index % 2 === 1 ? "ink" : "paper",
			className: "scroll-mt-24",
			children: /* @__PURE__ */ jsx(Shell, { children: /* @__PURE__ */ jsxs(Grid, {
				rails: true,
				children: [/* @__PURE__ */ jsxs("div", {
					className: cn("col-span-4 md:col-span-8 lg:col-span-6", index % 2 === 1 && "lg:order-2"),
					children: [
						/* @__PURE__ */ jsxs(Reveal, { children: [
							/* @__PURE__ */ jsx(Eyebrow, {
								index: solution.number,
								tone: index % 2 === 1 ? "ink" : "paper",
								live: true,
								children: solution.category
							}),
							/* @__PURE__ */ jsx(ArchitecturalLabel, {
								tone: index % 2 === 1 ? "ink" : "paper",
								className: "mt-6",
								children: solution.architecturalLabel
							}),
							/* @__PURE__ */ jsx(Title, {
								id: `${solution.id}-title`,
								tone: index % 2 === 1 ? "ink" : "paper",
								className: "mt-6",
								children: solution.title
							})
						] }),
						/* @__PURE__ */ jsx(Reveal, {
							delay: .1,
							children: /* @__PURE__ */ jsx("p", {
								className: cn("measure mt-8 text-lead leading-loose", index % 2 === 1 ? "text-neutral-300" : "text-neutral-900"),
								children: solution.shortDescription
							})
						}),
						/* @__PURE__ */ jsx(Reveal, {
							delay: .16,
							children: /* @__PURE__ */ jsx(Body, {
								tone: index % 2 === 1 ? "ink" : "paper",
								className: "mt-7",
								children: solution.description
							})
						}),
						/* @__PURE__ */ jsxs(Reveal, {
							delay: .22,
							children: [/* @__PURE__ */ jsx("h3", {
								className: cn("mt-12 font-display text-2xl font-medium leading-snug tracking-tightest"),
								children: "Capabilities"
							}), /* @__PURE__ */ jsx("dl", {
								className: "mt-6",
								children: solution.capabilities.map((capability) => /* @__PURE__ */ jsxs("div", {
									className: cn("grid gap-x-8 gap-y-1 border-t py-5 sm:grid-cols-[minmax(10rem,15rem)_1fr]", index % 2 === 1 ? "border-white/12" : "border-line"),
									children: [/* @__PURE__ */ jsx("dt", {
										className: cn("label", index % 2 === 1 ? "text-accent-300" : "text-accent-700"),
										children: capability.label
									}), /* @__PURE__ */ jsx("dd", {
										className: cn("leading-relaxed", index % 2 === 1 ? "text-neutral-300" : "text-neutral-700"),
										children: capability.detail
									})]
								}, capability.label))
							})]
						}),
						/* @__PURE__ */ jsx(Reveal, {
							delay: .28,
							children: /* @__PURE__ */ jsx("div", {
								className: "mt-10 flex flex-wrap items-center gap-x-7 gap-y-4",
								children: /* @__PURE__ */ jsxs(Link, {
									to: `${routes$1.contact}?topic=${encodeURIComponent(solution.title)}`,
									onClick: () => (solution.category, void 0),
									className: cn("group relative inline-flex h-12 items-center gap-2.5 px-6 font-mono text-eyebrow uppercase tracking-label transition-colors duration-300", index % 2 === 1 ? "bg-accent-300 text-ink hover:bg-paper" : "bg-action text-paper hover:bg-action-hover"),
									children: [/* @__PURE__ */ jsxs("span", { children: ["Discuss ", solution.category.toLowerCase()] }), /* @__PURE__ */ jsx("span", {
										"aria-hidden": "true",
										className: "transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none",
										children: "→"
									})]
								})
							})
						})
					]
				}), /* @__PURE__ */ jsx("div", {
					className: cn("col-span-4 mt-14 md:col-span-8 lg:col-span-5 lg:mt-0", index % 2 === 1 ? "lg:order-1 lg:col-start-1" : "lg:col-start-8"),
					children: /* @__PURE__ */ jsx(Reveal, {
						delay: .12,
						children: /* @__PURE__ */ jsxs("div", {
							className: cn("lg:sticky lg:top-28", index % 2 === 1 && "rounded-md bg-white/[0.03] p-6"),
							children: [/* @__PURE__ */ jsx(SolutionDiagram, {
								type: solution.visualType,
								tone: index % 2 === 1 ? "ink" : "paper"
							}), /* @__PURE__ */ jsxs(Note, {
								tone: index % 2 === 1 ? "ink" : "paper",
								className: "mt-5",
								children: [
									"Plate ",
									solution.number,
									" — ",
									solution.architecturalLabel.toLowerCase()
								]
							})]
						})
					})
				})]
			}) })
		}, solution.id)),
		/* @__PURE__ */ jsx(Section, {
			tone: "sunken",
			labelledBy: "stack-title",
			tight: true,
			children: /* @__PURE__ */ jsx(Shell, { children: /* @__PURE__ */ jsxs(Grid, {
				rails: true,
				children: [/* @__PURE__ */ jsx("div", {
					className: "col-span-4 md:col-span-8 lg:col-span-4",
					children: /* @__PURE__ */ jsxs(Reveal, { children: [
						/* @__PURE__ */ jsx(Eyebrow, {
							index: "05",
							children: "The stack"
						}),
						/* @__PURE__ */ jsx(Title, {
							id: "stack-title",
							className: "mt-7",
							children: "These four are one system."
						}),
						/* @__PURE__ */ jsx(Body, {
							className: "mt-7",
							children: "Read from the bottom up: infrastructure carries the ERP, companion applications extend it, and automation threads across both. Axleta specifies them together."
						})
					] })
				}), /* @__PURE__ */ jsx("div", {
					className: "col-span-4 mt-12 md:col-span-8 lg:col-span-8 lg:mt-0",
					children: /* @__PURE__ */ jsxs(Reveal, {
						delay: .08,
						children: [
							/* @__PURE__ */ jsx(SystemArchitecture, {}),
							/* @__PURE__ */ jsx(Rule, { className: "mt-10" }),
							/* @__PURE__ */ jsx(Note, {
								className: "mt-6",
								children: "Vendor names are the property of their owners. Partner logos are not reproduced because no mark-use authorisation is held."
							})
						]
					})
				})]
			}) })
		})
	] });
}
//#endregion
//#region src/pages/ServicesPage.tsx
/**
* /services — the engagement model.
*
* A four-stage traverse with the published services preserved. Every service
* entry in `data/services.ts` records the published item it descends from, so
* nothing from the live /services page is dropped in the reorganisation.
*
* The engagement principles close the page, followed by the honest note about
* what is not claimed here.
*/
var ServicesPage_exports = /* @__PURE__ */ __exportAll({ default: () => ServicesPage });
var TRAIL$3 = [{
	name: "Home",
	path: routes$1.home
}, {
	name: "Services",
	path: routes$1.services
}];
function ServicesPage() {
	const railItems = useMemo(() => serviceStages.map((stage) => ({
		id: stage.id,
		label: stage.title
	})), []);
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(Seo, {
			meta: metaFor("services"),
			trail: TRAIL$3
		}),
		/* @__PURE__ */ jsx(PageHero, {
			trail: TRAIL$3,
			eyebrow: "Services",
			architecturalLabel: "ENGAGEMENT / FOUR STAGES",
			title: "From requirement analysis to ongoing support.",
			lead: "Axleta publishes five services. They are presented here as the four stages they belong to, so you can see not just what we offer but what you get at each point in the engagement.",
			aside: /* @__PURE__ */ jsxs("div", {
				className: "border-l-2 border-accent-600 pl-5",
				children: [/* @__PURE__ */ jsx(Note, { children: "All published services" }), /* @__PURE__ */ jsx("ul", {
					className: "mt-4 space-y-2",
					children: publishedServiceItems.map((item) => /* @__PURE__ */ jsx("li", {
						className: "text-sm text-neutral-700",
						children: item
					}, item))
				})]
			}),
			children: /* @__PURE__ */ jsx("div", {
				className: "mt-12 rail:hidden",
				children: /* @__PURE__ */ jsx(SectionIndex, { items: railItems })
			})
		}),
		/* @__PURE__ */ jsx(CoordinateRail, { items: railItems }),
		serviceStages.map((stage, index) => /* @__PURE__ */ jsx(Section, {
			id: stage.id,
			labelledBy: `${stage.id}-title`,
			tone: index % 2 === 1 ? "ink" : "paper",
			className: "scroll-mt-24",
			children: /* @__PURE__ */ jsx(Shell, { children: /* @__PURE__ */ jsxs(Grid, {
				rails: true,
				children: [/* @__PURE__ */ jsxs("div", {
					className: "col-span-4 md:col-span-8 lg:col-span-4",
					children: [
						/* @__PURE__ */ jsxs(Reveal, { children: [
							/* @__PURE__ */ jsxs(Eyebrow, {
								index: stage.number,
								tone: index % 2 === 1 ? "ink" : "paper",
								live: true,
								children: [
									"Stage ",
									stage.number,
									" of 04"
								]
							}),
							/* @__PURE__ */ jsx(ArchitecturalLabel, {
								tone: index % 2 === 1 ? "ink" : "paper",
								className: "mt-6",
								children: stage.architecturalLabel
							}),
							/* @__PURE__ */ jsx(Title, {
								id: `${stage.id}-title`,
								tone: index % 2 === 1 ? "ink" : "paper",
								className: "mt-6",
								children: stage.title
							})
						] }),
						/* @__PURE__ */ jsx(Reveal, {
							delay: .1,
							children: /* @__PURE__ */ jsx("p", {
								className: cn("measure mt-7 text-lead leading-loose", index % 2 === 1 ? "text-neutral-300" : "text-neutral-900"),
								children: stage.summary
							})
						}),
						/* @__PURE__ */ jsx(Reveal, {
							delay: .16,
							children: /* @__PURE__ */ jsxs("div", {
								className: cn("mt-9 border-l-2 pl-5", index % 2 === 1 ? "border-accent-300" : "border-accent-600"),
								children: [/* @__PURE__ */ jsx(Note, {
									tone: index % 2 === 1 ? "ink" : "paper",
									children: "Output"
								}), /* @__PURE__ */ jsx("p", {
									className: cn("mt-2 leading-relaxed", index % 2 === 1 ? "text-paper" : "text-ink"),
									children: stage.output
								})]
							})
						})
					]
				}), /* @__PURE__ */ jsx("div", {
					className: "col-span-4 mt-12 md:col-span-8 lg:col-span-7 lg:col-start-6 lg:mt-0",
					children: /* @__PURE__ */ jsx("ul", {
						className: "space-y-0",
						children: stage.services.map((service, i) => /* @__PURE__ */ jsx(Reveal, {
							as: "li",
							index: i,
							rule: true,
							tone: index % 2 === 1 ? "ink" : "paper",
							children: /* @__PURE__ */ jsxs("div", {
								className: "grid gap-x-8 gap-y-2 pt-8 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]",
								children: [/* @__PURE__ */ jsx("h3", {
									className: cn("font-display text-xl leading-snug tracking-tightest", index % 2 === 1 ? "text-paper" : "text-ink"),
									children: service.title
								}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
									className: cn("leading-relaxed", index % 2 === 1 ? "text-neutral-300" : "text-neutral-700"),
									children: service.detail
								}), /* @__PURE__ */ jsxs(Note, {
									tone: index % 2 === 1 ? "ink" : "paper",
									className: "mt-3",
									children: ["Published as: ", service.sourceService]
								})] })]
							})
						}, service.title))
					})
				})]
			}) })
		}, stage.id)),
		/* @__PURE__ */ jsx(Section, {
			id: "principles",
			labelledBy: "principles-title",
			tone: "sunken",
			tight: true,
			children: /* @__PURE__ */ jsx(Shell, { children: /* @__PURE__ */ jsxs(Grid, {
				rails: true,
				children: [/* @__PURE__ */ jsxs("div", {
					className: "col-span-4 md:col-span-8 lg:col-span-5",
					children: [/* @__PURE__ */ jsxs(Reveal, { children: [
						/* @__PURE__ */ jsx(Eyebrow, {
							index: "05",
							children: "Engagement principles"
						}),
						/* @__PURE__ */ jsx(Title, {
							id: "principles-title",
							className: "mt-7",
							children: "How the work is shaped."
						}),
						/* @__PURE__ */ jsx(Body, {
							className: "mt-7",
							children: "Four commitments, all taken from the current services content. They are about the shape of the engagement rather than its technical content."
						})
					] }), /* @__PURE__ */ jsx(Reveal, {
						delay: .14,
						children: /* @__PURE__ */ jsx(CtaPair, {
							className: "mt-10",
							primary: {
								to: routes$1.contact,
								label: "Start a conversation"
							},
							secondary: {
								to: routes$1.solutions,
								label: "See the solutions"
							}
						})
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "col-span-4 mt-12 md:col-span-8 lg:col-span-6 lg:col-start-7 lg:mt-0",
					children: [
						/* @__PURE__ */ jsx("ol", { children: engagementPrinciples.map((principle, i) => /* @__PURE__ */ jsxs(Reveal, {
							as: "li",
							index: i,
							rule: true,
							className: "pt-7",
							children: [/* @__PURE__ */ jsx(Subtitle, {
								as: "h3",
								className: "text-xl",
								children: principle.label
							}), /* @__PURE__ */ jsx("p", {
								className: "mt-3 max-w-md leading-relaxed text-neutral-700",
								children: principle.detail
							})]
						}, principle.label)) }),
						/* @__PURE__ */ jsx(Rule, { className: "mt-10" }),
						/* @__PURE__ */ jsx(Note, {
							className: "mt-6",
							children: "Remote access is delivered using Microsoft Remote Desktop Web Service, as published. No third-party remote support partnership is claimed on this site."
						})
					]
				})]
			}) })
		})
	] });
}
//#endregion
//#region src/pages/InsightsPage.tsx
/**
* /insights.
*
* A reading index for the Axleta blog, not a mirror of it. Post bodies are not
* scraped or republished — each entry links out to blog.axleta.com, which is
* where the archive actually lives.
*
* The data comes from `insights.generated.ts`, produced at build time by
* scripts/fetch-insights.ts and committed. The feed sends no CORS header, so a
* browser fetch is not possible and a build-time fetch is the right answer.
*
* Filters are client-side over a list of at most twelve items: no pagination,
* no query string, no extra network request.
*/
var InsightsPage_exports = /* @__PURE__ */ __exportAll({ default: () => InsightsPage });
var TRAIL$2 = [{
	name: "Home",
	path: routes$1.home
}, {
	name: "Insights",
	path: routes$1.insights
}];
function InsightsPage() {
	const [filter, setFilter] = useState("All");
	const visible = useMemo(() => filter === "All" ? sortedInsights : sortedInsights.filter((entry) => entry.category === filter), [filter]);
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(Seo, {
			meta: metaFor("insights"),
			trail: TRAIL$2
		}),
		/* @__PURE__ */ jsx("div", {
			className: "bg-surface pb-section-y-tight pt-32 lg:pt-40",
			children: /* @__PURE__ */ jsx(Shell, { children: /* @__PURE__ */ jsxs(Grid, {
				rails: true,
				children: [/* @__PURE__ */ jsxs("div", {
					className: "col-span-4 md:col-span-8 lg:col-span-8",
					children: [
						/* @__PURE__ */ jsxs(Reveal, { children: [/* @__PURE__ */ jsx(Eyebrow, {
							index: "··",
							live: true,
							children: "Insights"
						}), /* @__PURE__ */ jsx("h1", {
							className: "mt-8 max-w-[18ch] text-display font-display font-medium leading-[0.95] tracking-tightest",
							children: "Notes on ERP, infrastructure and everyday IT."
						})] }),
						/* @__PURE__ */ jsx(Reveal, {
							delay: .12,
							children: /* @__PURE__ */ jsx(Body, {
								className: "mt-8 text-lead leading-loose",
								children: "Axleta has been writing about the systems businesses run on for years. The full archive lives on our blog — this is the recent end of it, indexed here so you can find the piece you need."
							})
						}),
						/* @__PURE__ */ jsx(Reveal, {
							delay: .2,
							children: /* @__PURE__ */ jsx(CtaPair, {
								className: "mt-10",
								primary: {
									to: BLOG_URL,
									label: "Visit the blog",
									onClick: () => void 0
								},
								secondary: {
									to: routes$1.contact,
									label: "Ask us instead",
									onClick: () => void 0
								}
							})
						})
					]
				}), /* @__PURE__ */ jsx("div", {
					className: "col-span-4 mt-12 md:col-span-8 lg:col-span-3 lg:col-start-10 lg:mt-0",
					children: /* @__PURE__ */ jsx(Reveal, {
						delay: .16,
						children: /* @__PURE__ */ jsxs("div", {
							className: "border-l-2 border-accent-600 pl-5",
							children: [/* @__PURE__ */ jsx(Note, { children: "Why this is an index" }), /* @__PURE__ */ jsx("p", {
								className: "mt-3 text-sm leading-relaxed text-neutral-700",
								children: "Articles are not copied here. Every entry links to the original on blog.axleta.com, which is where they are maintained."
							})]
						})
					})
				})]
			}) })
		}),
		/* @__PURE__ */ jsx("div", {
			className: "rule-t sticky top-18 z-30 bg-surface/92 backdrop-blur-md",
			children: /* @__PURE__ */ jsx(Shell, { children: /* @__PURE__ */ jsx("nav", {
				"aria-label": "Filter by topic",
				className: "py-4",
				children: /* @__PURE__ */ jsx("ul", {
					className: "-mx-1 flex items-center gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
					children: ["All", ...insightCategories].map((category) => {
						const active = filter === category;
						const count = category === "All" ? sortedInsights.length : sortedInsights.filter((e) => e.category === category).length;
						return /* @__PURE__ */ jsx("li", {
							className: "shrink-0",
							children: /* @__PURE__ */ jsxs("button", {
								type: "button",
								onClick: () => setFilter(category),
								"aria-pressed": active,
								className: cn("label flex items-center gap-2 border px-3.5 py-2 transition-colors duration-300", active ? "border-ink bg-ink text-paper" : "border-line-strong text-neutral-700 hover:border-accent-700 hover:text-accent-700"),
								children: [category, /* @__PURE__ */ jsx("span", {
									className: cn("tabular-nums", active ? "text-neutral-300" : "text-neutral-700"),
									children: count
								})]
							})
						}, category);
					})
				})
			}) })
		}),
		/* @__PURE__ */ jsx(Section, {
			tight: true,
			children: /* @__PURE__ */ jsxs(Shell, { children: [
				sortedInsights.length === 0 ? /* @__PURE__ */ jsxs("p", {
					className: "measure leading-loose text-neutral-700",
					children: [
						"The blog feed was unavailable at build time and no committed snapshot was present. The archive is still readable at",
						" ",
						/* @__PURE__ */ jsx("a", {
							href: BLOG_URL,
							target: "_blank",
							rel: "noopener noreferrer",
							className: "underline underline-offset-4 hover:text-accent-700",
							children: "blog.axleta.com"
						}),
						"."
					]
				}) : /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("div", {
					"aria-live": "polite",
					className: "sr-only",
					children: [
						"Showing ",
						visible.length,
						" ",
						visible.length === 1 ? "article" : "articles",
						filter === "All" ? "" : ` tagged ${filter}`
					]
				}), /* @__PURE__ */ jsx("ol", { children: visible.map((article, i) => /* @__PURE__ */ jsx(Reveal, {
					as: "li",
					index: i,
					rule: true,
					children: /* @__PURE__ */ jsxs("a", {
						href: article.href,
						target: "_blank",
						rel: "noopener noreferrer",
						onClick: () => (article.title, void 0),
						className: "group grid gap-x-8 gap-y-3 py-8 lg:grid-cols-[10rem_minmax(0,1fr)_auto] lg:items-baseline",
						children: [
							/* @__PURE__ */ jsxs("p", {
								className: "label flex flex-wrap items-center gap-x-3 text-neutral-700",
								children: [/* @__PURE__ */ jsx("time", {
									dateTime: article.date,
									className: "tabular-nums",
									children: formatInsightDate(article.date)
								}), /* @__PURE__ */ jsx("span", {
									className: "text-accent-700",
									children: article.category
								})]
							}),
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", {
								className: "font-display text-2xl font-medium leading-snug tracking-tightest transition-colors duration-300 group-hover:text-accent-700 lg:text-[1.75rem]",
								children: article.title
							}), /* @__PURE__ */ jsx("p", {
								className: "mt-3 max-w-2xl leading-relaxed text-neutral-700",
								children: article.excerpt
							})] }),
							/* @__PURE__ */ jsx("span", {
								"aria-hidden": "true",
								className: "hidden shrink-0 text-accent-700 transition-transform duration-300 ease-[var(--ease-entrance)] group-hover:translate-x-1 lg:block motion-reduce:transform-none",
								children: "→"
							})
						]
					})
				}, article.href)) })] }),
				/* @__PURE__ */ jsx(Rule, { className: "mt-12" }),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between",
					children: [/* @__PURE__ */ jsx("p", {
						className: "max-w-md text-sm leading-relaxed text-neutral-700",
						children: "Looking for something specific? Ask us directly and we will point you at the right piece, or answer the question ourselves."
					}), /* @__PURE__ */ jsxs("a", {
						href: BLOG_URL,
						target: "_blank",
						rel: "noopener noreferrer",
						onClick: () => void 0,
						className: "group label inline-flex items-center gap-2 text-ink transition-colors duration-300 hover:text-accent-700",
						children: [
							"blog.axleta.com",
							/* @__PURE__ */ jsx("span", {
								"aria-hidden": "true",
								className: "transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none",
								children: "→"
							}),
							/* @__PURE__ */ jsx("span", {
								className: "sr-only",
								children: "(opens in a new tab)"
							})
						]
					})]
				})
			] })
		})
	] });
}
//#endregion
//#region src/components/contact/ContactForm.tsx
/**
* Contact form.
*
* Submission contract:
*  - If `VITE_CONTACT_ENDPOINT` is set at build time, the form POSTs JSON there.
*    A 2xx response is treated as success; anything else is a failure and the
*    user is told so, with the mailto fallback offered.
*  - If the endpoint is *not* configured, the form does not pretend to submit.
*    It renders an explicit unconfigured notice and offers a pre-filled mailto
*    link containing everything the visitor typed. This is the only honest
*    option without a backend.
*  - There is no third-party form service, no hidden field honeypot-only spam
*    trap, and no client-side "success" that is not backed by a response.
*
* Accessibility:
*  - Every field has a real `<label>`; errors are announced through a live
*    region and tied to fields with `aria-describedby` / `aria-invalid`.
*  - Validation runs on submit and on blur after the first failed attempt, so a
*    visitor is not corrected while still typing their first field.
*  - The status region is `role="status"` with `aria-live="polite"`.
*/
var EMPTY = {
	name: "",
	email: "",
	organisation: "",
	country: "",
	topic: "",
	message: ""
};
var TOPICS = [
	"ERP applications",
	"Companion applications",
	"Technology infrastructure",
	"Automation & integration",
	"Google Workspace",
	"Something else"
];
var INPUT = "w-full border border-line-strong bg-white px-4 py-3 text-body text-ink outline-none transition-colors duration-300 placeholder:text-neutral-300 focus:border-accent-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-600";
function validate(fields) {
	const errors = {};
	if (!fields.name.trim()) errors.name = "Please tell us your name.";
	if (!fields.email.trim()) errors.email = "We need an email address to reply to.";
	else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(fields.email.trim())) errors.email = "That does not look like a valid email address.";
	if (!fields.topic) errors.topic = "Please choose what this is about.";
	if (fields.message.trim().length < 12) errors.message = "A sentence or two about the requirement helps us reply usefully.";
	return errors;
}
/** Builds a mailto: link carrying everything the visitor typed. */
function mailtoFor(fields) {
	const subject = `Axleta enquiry — ${fields.topic || "General"}`;
	const body = [
		`Name: ${fields.name}`,
		`Email: ${fields.email}`,
		`Organisation: ${fields.organisation || "—"}`,
		`Country: ${fields.country || "—"}`,
		`Area: ${fields.topic || "—"}`,
		"",
		fields.message
	].join("\n");
	return `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
function ContactForm({ preselectTopic }) {
	const formId = useId();
	const [fields, setFields] = useState({
		...EMPTY,
		topic: preselectTopic && TOPICS.includes(preselectTopic) ? preselectTopic : ""
	});
	const [errors, setErrors] = useState({});
	const [status, setStatus] = useState(() => "unconfigured");
	const [serverMessage, setServerMessage] = useState("");
	const touchedAttempt = useRef(false);
	const started = useRef(false);
	const mailto = useMemo(() => mailtoFor(fields), [fields]);
	const update = (key) => (value) => {
		setFields((current) => ({
			...current,
			[key]: value
		}));
		if (touchedAttempt.current) setErrors((current) => {
			const next = { ...current };
			const single = validate({
				...fields,
				[key]: value
			});
			if (single[key]) next[key] = single[key];
			else delete next[key];
			return next;
		});
		if (!started.current && key === "name" && value.trim()) started.current = true;
	};
	async function onSubmit(event) {
		event.preventDefault();
		touchedAttempt.current = true;
		const found = validate(fields);
		setErrors(found);
		const firstError = Object.keys(found)[0];
		if (firstError) {
			document.getElementById(`${formId}-${firstError}`)?.focus();
			return;
		}
		setStatus("unconfigured");
	}
	const field = (key) => ({
		id: `${formId}-${key}`,
		name: key,
		value: fields[key],
		"aria-invalid": errors[key] ? true : void 0,
		"aria-describedby": errors[key] ? `${formId}-${key}-error` : void 0,
		onChange: (event) => update(key)(event.target.value),
		onBlur: () => {
			if (!touchedAttempt.current) return;
			setErrors((current) => {
				const single = validate(fields);
				const next = { ...current };
				if (single[key]) next[key] = single[key];
				else delete next[key];
				return next;
			});
		}
	});
	const errorFor = (key) => errors[key] ? /* @__PURE__ */ jsx("p", {
		id: `${formId}-${key}-error`,
		className: "label mt-2 text-accent-700",
		children: errors[key]
	}) : null;
	if (status === "sent") return /* @__PURE__ */ jsxs("div", {
		role: "status",
		className: "border-l-2 border-accent-600 bg-surface-sunken p-8 lg:p-10",
		children: [
			/* @__PURE__ */ jsx("p", {
				className: "label text-accent-700",
				children: "Message sent"
			}),
			/* @__PURE__ */ jsx("h3", {
				className: "mt-5 font-display text-3xl font-medium leading-snug tracking-tightest",
				children: "Thank you — that has reached us."
			}),
			/* @__PURE__ */ jsxs("p", {
				className: "measure mt-5 leading-relaxed text-neutral-700",
				children: [
					"We read every enquiry. If your question is time-sensitive, WhatsApp on",
					" ",
					/* @__PURE__ */ jsxs("a", {
						href: contact.whatsapp.href,
						target: "_blank",
						rel: "noopener noreferrer",
						className: "underline underline-offset-4 hover:text-accent-700",
						children: [contact.whatsapp.display, /* @__PURE__ */ jsx("span", {
							className: "sr-only",
							children: " (opens in a new tab)"
						})]
					}),
					" ",
					"is faster."
				]
			}),
			/* @__PURE__ */ jsx(Button, {
				className: "mt-8",
				variant: "secondary",
				onClick: () => {
					setStatus("unconfigured");
					setServerMessage("");
				},
				children: "Send another"
			})
		]
	});
	return /* @__PURE__ */ jsxs("form", {
		onSubmit,
		noValidate: true,
		className: "relative",
		children: [
			status === "unconfigured" ? /* @__PURE__ */ jsxs("div", {
				role: "status",
				className: "mb-10 border-l-2 border-accent-600 bg-surface-sunken p-6",
				children: [
					/* @__PURE__ */ jsx("p", {
						className: "label text-accent-700",
						children: "Form not connected"
					}),
					/* @__PURE__ */ jsxs("p", {
						className: "mt-4 max-w-xl leading-relaxed text-neutral-900",
						children: [
							"This form is not yet connected to a submission endpoint, so it cannot deliver a message on its own. Everything you type is preserved below — send it straight to",
							" ",
							/* @__PURE__ */ jsx("a", {
								href: `mailto:${contact.email}`,
								className: "font-medium underline underline-offset-4 hover:text-accent-700",
								children: contact.email
							}),
							" ",
							"and we will pick it up."
						]
					}),
					/* @__PURE__ */ jsxs("a", {
						href: mailto,
						className: "mt-5 inline-flex h-11 items-center gap-2.5 bg-action px-5 font-mono text-eyebrow uppercase tracking-label text-paper transition-colors duration-300 hover:bg-action-hover",
						children: [/* @__PURE__ */ jsx("span", { children: "Open this as an email" }), /* @__PURE__ */ jsx("span", {
							"aria-hidden": "true",
							children: "→"
						})]
					})
				]
			}) : null,
			status === "error" ? /* @__PURE__ */ jsxs("div", {
				role: "alert",
				className: "mb-10 border-l-2 border-accent-700 bg-surface-sunken p-6",
				children: [/* @__PURE__ */ jsx("p", {
					className: "label text-accent-700",
					children: "Message not sent"
				}), /* @__PURE__ */ jsxs("p", {
					className: "mt-4 max-w-xl leading-relaxed text-neutral-900",
					children: [
						"Something went wrong",
						serverMessage ? ` (${serverMessage})` : "",
						". Please try once more, or email",
						" ",
						/* @__PURE__ */ jsx("a", {
							href: mailto,
							className: "font-medium underline underline-offset-4 hover:text-accent-700",
							children: contact.email
						}),
						" ",
						"with what you have written."
					]
				})]
			}) : null,
			/* @__PURE__ */ jsxs("div", {
				className: "grid gap-x-6 gap-y-7 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "sm:col-span-1",
						children: [
							/* @__PURE__ */ jsxs("label", {
								htmlFor: `${formId}-name`,
								className: "label block text-ink",
								children: ["Your name ", /* @__PURE__ */ jsx("span", {
									className: "text-accent-700",
									children: "*"
								})]
							}),
							/* @__PURE__ */ jsx("input", {
								...field("name"),
								type: "text",
								autoComplete: "name",
								className: cn(INPUT, "mt-2.5")
							}),
							errorFor("name")
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "sm:col-span-1",
						children: [
							/* @__PURE__ */ jsxs("label", {
								htmlFor: `${formId}-email`,
								className: "label block text-ink",
								children: ["Email ", /* @__PURE__ */ jsx("span", {
									className: "text-accent-700",
									children: "*"
								})]
							}),
							/* @__PURE__ */ jsx("input", {
								...field("email"),
								type: "email",
								autoComplete: "email",
								className: cn(INPUT, "mt-2.5")
							}),
							errorFor("email")
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "sm:col-span-1",
						children: [/* @__PURE__ */ jsx("label", {
							htmlFor: `${formId}-organisation`,
							className: "label block text-ink",
							children: "Organisation"
						}), /* @__PURE__ */ jsx("input", {
							...field("organisation"),
							type: "text",
							autoComplete: "organization",
							className: cn(INPUT, "mt-2.5")
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "sm:col-span-1",
						children: [/* @__PURE__ */ jsx("label", {
							htmlFor: `${formId}-country`,
							className: "label block text-ink",
							children: "Country"
						}), /* @__PURE__ */ jsx("input", {
							...field("country"),
							type: "text",
							autoComplete: "country-name",
							className: cn(INPUT, "mt-2.5")
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "sm:col-span-2",
						children: [
							/* @__PURE__ */ jsxs("label", {
								htmlFor: `${formId}-topic`,
								className: "label block text-ink",
								children: ["What is this about? ", /* @__PURE__ */ jsx("span", {
									className: "text-accent-700",
									children: "*"
								})]
							}),
							/* @__PURE__ */ jsxs("select", {
								...field("topic"),
								className: cn(INPUT, "mt-2.5 appearance-none"),
								children: [/* @__PURE__ */ jsx("option", {
									value: "",
									disabled: true,
									children: "Choose an area"
								}), TOPICS.map((topic) => /* @__PURE__ */ jsx("option", {
									value: topic,
									children: topic
								}, topic))]
							}),
							errorFor("topic")
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "sm:col-span-2",
						children: [
							/* @__PURE__ */ jsxs("label", {
								htmlFor: `${formId}-message`,
								className: "label block text-ink",
								children: ["What are you trying to improve? ", /* @__PURE__ */ jsx("span", {
									className: "text-accent-700",
									children: "*"
								})]
							}),
							/* @__PURE__ */ jsx("textarea", {
								...field("message"),
								rows: 6,
								className: cn(INPUT, "mt-2.5 resize-y"),
								placeholder: "The process you run now, what is not working, and any deadline you are working to."
							}),
							errorFor("message")
						]
					})
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "mt-10 flex flex-wrap items-center gap-x-8 gap-y-5",
				children: [/* @__PURE__ */ jsx(Button, {
					type: "submit",
					size: "lg",
					loading: status === "sending",
					children: status === "sending" ? "Sending" : "Send message"
				}), /* @__PURE__ */ jsxs("p", {
					className: "max-w-xs text-sm leading-relaxed text-neutral-700",
					children: [
						"Or email",
						" ",
						/* @__PURE__ */ jsx("a", {
							href: `mailto:${contact.email}`,
							className: "font-medium underline underline-offset-4 hover:text-accent-700",
							children: contact.email
						}),
						" ",
						"directly. We do not add you to anything."
					]
				})]
			}),
			/* @__PURE__ */ jsxs(Note, {
				className: "mt-8",
				children: [
					"This site runs no analytics by default and sets no advertising or tracking cookies. See the",
					" ",
					/* @__PURE__ */ jsx("a", {
						href: "/privacy",
						className: "underline underline-offset-4 hover:text-accent-700",
						children: "privacy policy"
					}),
					"."
				]
			})
		]
	});
}
//#endregion
//#region src/pages/ContactPage.tsx
/**
* /contact.
*
* The form is the primary element, not a footnote. The verified contact details
* sit beside it as always-available alternatives, because a contact page that
* only works when JavaScript and an endpoint are both present is not a contact
* page.
*
* `?topic=` on the URL preselects the enquiry area, which is how the solution
* and service pages deep-link into a specific conversation.
*/
var ContactPage_exports = /* @__PURE__ */ __exportAll({ default: () => ContactPage });
var TRAIL$1 = [{
	name: "Home",
	path: routes$1.home
}, {
	name: "Contact",
	path: routes$1.contact
}];
function ContactPage() {
	const [params] = useSearchParams();
	const topic = params.get("topic") ?? void 0;
	const jsonLd = useMemo(() => ({
		"@context": "https://schema.org",
		"@type": "ContactPage",
		name: "Contact Axleta",
		url: `${routes$1.contact}`,
		mainEntity: {
			"@type": "Organization",
			name: company.name,
			email: contact.email,
			address: {
				"@type": "PostalAddress",
				streetAddress: contact.address.street,
				addressLocality: contact.address.locality,
				addressRegion: contact.address.region,
				postalCode: contact.address.postalCode,
				addressCountry: contact.address.countryCode
			}
		}
	}), []);
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(Seo, {
			meta: metaFor("contact"),
			trail: TRAIL$1,
			jsonLd: [jsonLd]
		}),
		/* @__PURE__ */ jsx(PageHero, {
			trail: TRAIL$1,
			eyebrow: "Contact",
			architecturalLabel: "ENQUIRY / DIRECT",
			title: "Tell us what you are trying to improve.",
			lead: "The more specific the requirement, the more useful our first reply will be. What the process looks like now, what is not working, and any deadline you are working to.",
			aside: /* @__PURE__ */ jsxs("div", {
				className: "border-l-2 border-accent-600 pl-5",
				children: [/* @__PURE__ */ jsx(Note, { children: "Consultation" }), /* @__PURE__ */ jsx("p", {
					className: "mt-3 text-sm leading-relaxed text-neutral-700",
					children: "The first conversation is about the requirement. We work out the fit before anyone discusses a purchase order."
				})]
			})
		}),
		/* @__PURE__ */ jsx(Section, {
			tight: true,
			children: /* @__PURE__ */ jsx(Shell, { children: /* @__PURE__ */ jsxs(Grid, {
				rails: true,
				children: [/* @__PURE__ */ jsx("div", {
					className: "col-span-4 md:col-span-8 lg:col-span-7",
					children: /* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsx(ContactForm, { preselectTopic: topic }) })
				}), /* @__PURE__ */ jsxs("div", {
					className: "col-span-4 mt-14 md:col-span-8 lg:col-span-4 lg:col-start-9 lg:mt-0",
					children: [
						/* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsx(Eyebrow, {
							index: "··",
							children: "Other ways to reach us"
						}) }),
						/* @__PURE__ */ jsx(Reveal, {
							index: 1,
							rule: true,
							className: "mt-6",
							children: /* @__PURE__ */ jsxs("div", {
								className: "pt-7",
								children: [/* @__PURE__ */ jsx(Note, { children: "Email" }), /* @__PURE__ */ jsx("a", {
									href: `mailto:${contact.email}`,
									onClick: () => void 0,
									className: "mt-2 block font-display text-xl tracking-tightest underline-offset-4 hover:text-accent-700 hover:underline",
									children: contact.email
								})]
							})
						}),
						/* @__PURE__ */ jsx(Reveal, {
							index: 2,
							rule: true,
							className: "mt-8",
							children: /* @__PURE__ */ jsxs("div", {
								className: "pt-7",
								children: [/* @__PURE__ */ jsx(Note, { children: "WhatsApp" }), /* @__PURE__ */ jsxs("a", {
									href: contact.whatsapp.href,
									target: "_blank",
									rel: "noopener noreferrer",
									onClick: () => void 0,
									className: "mt-2 block font-display text-xl tracking-tightest underline-offset-4 hover:text-accent-700 hover:underline",
									children: [contact.whatsapp.display, /* @__PURE__ */ jsx("span", {
										className: "sr-only",
										children: " (opens in a new tab)"
									})]
								})]
							})
						}),
						/* @__PURE__ */ jsx(Reveal, {
							index: 3,
							rule: true,
							className: "mt-8",
							children: /* @__PURE__ */ jsxs("address", {
								className: "pt-7 not-italic",
								children: [/* @__PURE__ */ jsx(Note, { children: contact.address.label }), /* @__PURE__ */ jsxs("p", {
									className: "mt-2 leading-relaxed text-ink",
									children: [
										contact.address.street,
										/* @__PURE__ */ jsx("br", {}),
										contact.address.locality,
										", ",
										contact.address.region,
										" ",
										contact.address.postalCode,
										/* @__PURE__ */ jsx("br", {}),
										contact.address.country
									]
								})]
							})
						}),
						/* @__PURE__ */ jsx(Reveal, {
							index: 4,
							rule: true,
							className: "mt-8",
							children: /* @__PURE__ */ jsxs("div", {
								className: "pt-7",
								children: [
									/* @__PURE__ */ jsx(Note, { children: "Coverage" }),
									/* @__PURE__ */ jsx("p", {
										className: "mt-2 leading-relaxed text-ink",
										children: contact.coverage
									}),
									/* @__PURE__ */ jsx("p", {
										className: "mt-3 text-sm leading-relaxed text-neutral-700",
										children: "SAP Business One support is provided wherever the business is. Only the address above is published; no map is embedded and no second office is implied."
									})
								]
							})
						}),
						/* @__PURE__ */ jsx(Rule, { className: "mt-10" }),
						/* @__PURE__ */ jsxs(Note, {
							className: "mt-6",
							children: [
								"What you send us is used to answer your enquiry. See the",
								" ",
								/* @__PURE__ */ jsx("a", {
									href: routes$1.privacy,
									className: "underline underline-offset-4 hover:text-accent-700",
									children: "privacy policy"
								}),
								"."
							]
						})
					]
				})]
			}) })
		}),
		/* @__PURE__ */ jsx(Section, {
			tone: "ink",
			tight: true,
			children: /* @__PURE__ */ jsx(Shell, { children: /* @__PURE__ */ jsxs(Grid, {
				rails: true,
				children: [/* @__PURE__ */ jsx("div", {
					className: "col-span-4 md:col-span-8 lg:col-span-7",
					children: /* @__PURE__ */ jsxs(Reveal, { children: [/* @__PURE__ */ jsx(Title, {
						tone: "ink",
						children: "What happens after you write."
					}), /* @__PURE__ */ jsx("div", {
						className: "mt-8 space-y-6",
						children: [
							{
								step: "01",
								title: "We read the requirement",
								detail: "If something is unclear, we ask about it. We do not send a proposal from a template."
							},
							{
								step: "02",
								title: "We map the requirement to a route",
								detail: "Which platform, which add-ons, which infrastructure work, and what it does not need."
							},
							{
								step: "03",
								title: "You get a scoped plan",
								detail: "Written with specific, measurable, achievable, realistic and time-bound objectives — the SMART framing Axleta works to."
							}
						].map((item) => /* @__PURE__ */ jsxs("div", {
							className: "flex gap-6 border-t border-white/12 pt-6",
							children: [/* @__PURE__ */ jsx("span", {
								className: "label shrink-0 text-accent-300 tabular-nums",
								children: item.step
							}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
								className: "font-display text-xl leading-snug tracking-tightest",
								children: item.title
							}), /* @__PURE__ */ jsx("p", {
								className: "mt-2 max-w-lg leading-relaxed text-neutral-300",
								children: item.detail
							})] })]
						}, item.step))
					})] })
				}), /* @__PURE__ */ jsx("div", {
					className: "col-span-4 mt-12 md:col-span-8 lg:col-span-4 lg:col-start-9 lg:mt-0",
					children: /* @__PURE__ */ jsxs(Reveal, {
						delay: .12,
						children: [/* @__PURE__ */ jsx(Eyebrow, {
							index: "··",
							tone: "ink",
							live: true,
							children: "Before you write"
						}), /* @__PURE__ */ jsx(Body, {
							tone: "ink",
							className: "mt-5 text-neutral-300",
							children: "If you are not sure which area your requirement belongs to, that is fine — leave the topic blank and describe the process instead."
						})]
					})
				})]
			}) })
		})
	] });
}
//#endregion
//#region src/components/ui/Prose.tsx
function Prose({ blocks }) {
	return /* @__PURE__ */ jsx("div", {
		className: "max-w-prose",
		children: blocks.map((block, i) => {
			if (block.type === "p") return /* @__PURE__ */ jsx("p", {
				className: "mt-6 text-body leading-body text-neutral-900 first:mt-0",
				children: block.text
			}, i);
			if (block.type === "list") return /* @__PURE__ */ jsx("ul", {
				className: "mt-6 space-y-3 first:mt-0",
				children: block.items.map((item) => /* @__PURE__ */ jsxs("li", {
					className: "flex gap-4 leading-body text-neutral-900",
					children: [/* @__PURE__ */ jsx("span", {
						"aria-hidden": "true",
						className: "mt-[0.7em] h-px w-4 shrink-0 bg-accent-700"
					}), /* @__PURE__ */ jsx("span", { children: item })]
				}, item))
			}, i);
			return /* @__PURE__ */ jsxs("aside", {
				className: "mt-8 border-l-2 border-accent-600 bg-surface-sunken px-5 py-4",
				children: [/* @__PURE__ */ jsx("p", {
					className: "label text-accent-700",
					children: "Note"
				}), /* @__PURE__ */ jsx("p", {
					className: "mt-3 text-sm leading-relaxed text-neutral-900",
					children: block.text
				})]
			}, i);
		})
	});
}
/**
* Native accordion.
*
* The summary marker is replaced with a rule-plus-glyph so the disclosure reads
* as a drawn plate rather than a browser triangle, but the element is still a
* real <details>/<summary> pair.
*/
function Disclosure({ summary, children, open = false, tone = "paper" }) {
	return /* @__PURE__ */ jsxs("details", {
		open,
		"data-surface": tone === "ink" ? "ink" : void 0,
		className: cn("group border-t", tone === "ink" ? "border-white/15" : "border-line-strong", "last:border-b"),
		children: [/* @__PURE__ */ jsxs("summary", {
			className: cn("flex cursor-pointer list-none items-baseline justify-between gap-6 py-6", "transition-colors duration-300 [&::-webkit-details-marker]:hidden", tone === "ink" ? "text-paper hover:text-accent-300" : "text-ink hover:text-accent-700"),
			children: [/* @__PURE__ */ jsx("span", {
				className: "font-display text-xl font-medium leading-snug tracking-tightest sm:text-2xl",
				children: summary
			}), /* @__PURE__ */ jsx("span", {
				"aria-hidden": "true",
				className: cn("label shrink-0 transition-transform duration-500 ease-[var(--ease-line)]", "group-open:rotate-45", "motion-reduce:transform-none", tone === "ink" ? "text-accent-300" : "text-accent-700"),
				children: "+"
			})]
		}), /* @__PURE__ */ jsx("div", {
			className: cn("pb-7 max-w-prose leading-body", tone === "ink" ? "text-neutral-300" : "text-neutral-900"),
			children
		})]
	});
}
//#endregion
//#region src/pages/GoogleWorkspacePage.tsx
/**
* /google-workspace.
*
* The one page on the site that is partly transactional: it exists because Axleta
* is a Google Cloud Partner and has a verified Workspace referral link. It is
* retained rather than folded into /solutions because the legacy site had it as a
* standalone page and the referral flow depends on reaching it directly.
*
* Two things are deliberately absent:
*  - Google and Workspace logos. No mark-use authorisation is held, so the
*    relationship is stated in type (the same decision as the SAP/Google Cloud
*    partnerships on /about).
*  - Pricing. Google sets Workspace pricing and it changes; quoting it here
*    would go stale. The referral link goes to Google's own pricing page.
*/
var GoogleWorkspacePage_exports = /* @__PURE__ */ __exportAll({ default: () => GoogleWorkspacePage });
var TRAIL = [{
	name: "Home",
	path: routes$1.home
}, {
	name: "Google Workspace",
	path: routes$1.googleWorkspace
}];
/** What the suite is for — published scope, not marketing invention. */
var useCases = [
	{
		id: "collaborate",
		label: "Work in the same document",
		detail: "Shared documents, shared drives and shared inboxes mean the version people are editing is the version everyone has. Version history and real-time co-editing remove the “which copy is current” problem."
	},
	{
		id: "mail",
		label: "Mail that holds up under audit",
		detail: "Hosted mail with the searching, filtering and delegation a small team needs, without running a mail server and its patching cycle."
	},
	{
		id: "meet",
		label: "Meetings that do not need a room",
		detail: "Video, chat and screen sharing in the browser. Useful for a business whose people are not in the same building, or not in the same country."
	},
	{
		id: "storage",
		label: "Storage that is not the laptop",
		detail: "Files live in the suite rather than on one machine, so losing a laptop is an inconvenience rather than an incident."
	},
	{
		id: "connect",
		label: "A place to put the ERP add-ons",
		detail: "Shared drives and permissions give companion applications and integration work a sane home. If the ERP needs to exchange files with people outside the finance team, this is usually where that is set up."
	},
	{
		id: "admin",
		label: "Administration that holds up",
		detail: "Centralised user management, single sign-on and policy control — administered by Axleta as part of an engagement rather than left to whoever is most confident with a settings page."
	}
];
/** Honest boundaries. This is what stops the page becoming a brochure. */
var questions = [
	{
		label: "Are you reselling a licence?",
		detail: "No. Axleta introduces and sells Google Cloud Platform and Google productivity products as a Google Cloud Partner. Google sets the pricing and the terms; the referral link on this page goes to Google, where the current terms and prices are published. Nothing is quoted here because it would be wrong within weeks."
	},
	{
		label: "Can you migrate us from another provider?",
		detail: "Migration is an engagement, not a download button. It depends on how much mail and how many files you hold, and on who the current domain administrator is. Ask us and we will tell you what it involves before you commit to it."
	},
	{
		label: "What happens to our data if we leave?",
		detail: "Export and retention are governed by your Google plan and Google’s own terms, which we will point you at before you sign up. We will not answer a contractual question on Google’s behalf."
	},
	{
		label: "Do you administer it for us?",
		detail: "Yes — as scoped. Administration, policy and user lifecycle management are exactly the kind of thing that sits inside an ongoing engagement rather than as a separate product. The scope is agreed in writing first."
	},
	{
		label: "Why is this a separate page and not a solution?",
		detail: "Because it is the one offer here with a defined path: evaluate, then use the referral link, then talk to us about administering it. The rest of the solutions need a discovery conversation before anything can be recommended, so they sit behind /solutions."
	}
];
function GoogleWorkspacePage() {
	const jsonLd = useMemo(() => ({
		"@context": "https://schema.org",
		"@type": "Service",
		name: "Google Workspace — introduction, referral and administration",
		serviceType: "Productivity software introduction and administration",
		description: "The Google productivity suite — Gmail, Drive, Docs, Sheets, Slides, Meet and Calendar — introduced and sold by Axleta as a Google Cloud Partner, with administration available as an engagement.",
		provider: {
			"@type": "Organization",
			name: "Axleta",
			url: site.url
		},
		brand: {
			"@type": "Brand",
			name: "Google"
		},
		category: "Productivity software",
		url: site.url + routes$1.googleWorkspace,
		areaServed: "Worldwide"
	}), []);
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(Seo, {
			meta: metaFor("googleWorkspace"),
			trail: TRAIL,
			jsonLd: [jsonLd]
		}),
		/* @__PURE__ */ jsx(PageHero, {
			trail: TRAIL,
			eyebrow: "Google Workspace",
			architecturalLabel: "PRODUCTIVITY / COLLABORATION",
			title: "The suite where the collaboration actually happens.",
			lead: "Gmail, Drive, Docs, Sheets, Slides, Meet and Calendar, under one account and one admin. Axleta is a Google Cloud Partner: we introduce and sell the suite, and we administer it when you want that handled.",
			aside: /* @__PURE__ */ jsxs("div", {
				className: "border-l-2 border-accent-600 pl-5",
				children: [
					/* @__PURE__ */ jsx(Note, { children: "Partner status" }),
					/* @__PURE__ */ jsx("p", {
						className: "mt-3 text-sm leading-relaxed text-neutral-700",
						children: "Google Cloud Partner for Google Cloud Platform and the Google productivity suite."
					}),
					/* @__PURE__ */ jsx(ArrowLink, {
						to: external.googleCloud,
						external: true,
						className: "mt-4",
						onClick: () => void 0,
						children: "About Google Cloud"
					})
				]
			})
		}),
		/* @__PURE__ */ jsx(Section, {
			tight: true,
			children: /* @__PURE__ */ jsx(Shell, { children: /* @__PURE__ */ jsxs(Grid, {
				rails: true,
				children: [/* @__PURE__ */ jsx("div", {
					className: "col-span-4 md:col-span-8 lg:col-span-4",
					children: /* @__PURE__ */ jsxs(Reveal, { children: [/* @__PURE__ */ jsx(Eyebrow, {
						index: "01",
						children: "What it is"
					}), /* @__PURE__ */ jsx(Title, {
						className: "mt-7",
						children: "A productivity suite, not an ERP."
					})] })
				}), /* @__PURE__ */ jsx("div", {
					className: "col-span-4 mt-10 md:col-span-8 lg:col-span-7 lg:col-start-6 lg:mt-0",
					children: /* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsx(Prose, { blocks: [
						{
							type: "p",
							text: "Google Workspace is the set of web applications a team uses to write, store, share and meet. It is not a business management system and it will not run your accounts, stock or manufacturing. If that is what you need, that is ERP — see the solutions page."
						},
						{
							type: "p",
							text: "It is relevant to Axleta clients for a specific reason: it is usually where the documents, shared drives and permissions that companion applications and integration work attach to. Teams running an ERP alongside a document suite hit fewer problems than teams trying to do both in one tool."
						},
						{
							type: "note",
							text: "Published as a Google Cloud Partner. No Google or Workspace logo is reproduced here, and no pricing is quoted — both would go out of date, and the mark-use position is not ours to grant."
						}
					] }) })
				})]
			}) })
		}),
		/* @__PURE__ */ jsx(Section, {
			id: "what-it-is-for",
			labelledBy: "use-cases-title",
			tone: "ink",
			tight: true,
			children: /* @__PURE__ */ jsx(Shell, { children: /* @__PURE__ */ jsxs(Grid, {
				rails: true,
				children: [/* @__PURE__ */ jsxs("div", {
					className: "col-span-4 md:col-span-8 lg:col-span-4",
					children: [/* @__PURE__ */ jsxs(Reveal, { children: [
						/* @__PURE__ */ jsx(Eyebrow, {
							index: "02",
							tone: "ink",
							live: true,
							children: "What it is for"
						}),
						/* @__PURE__ */ jsx(Title, {
							id: "use-cases-title",
							tone: "ink",
							className: "mt-7",
							children: "Six reasons it shows up in our work."
						}),
						/* @__PURE__ */ jsx(ArchitecturalLabel, {
							tone: "ink",
							className: "mt-8",
							children: "PRACTICAL / NOT A FEATURE LIST"
						})
					] }), /* @__PURE__ */ jsx(Reveal, {
						delay: .14,
						children: /* @__PURE__ */ jsx(CtaPair, {
							className: "mt-10",
							tone: "ink",
							primary: {
								to: routes$1.contact,
								label: "Talk about your setup",
								onClick: () => void 0
							},
							secondary: {
								to: external.googleWorkspace,
								label: "Google Workspace",
								onClick: () => void 0
							}
						})
					})]
				}), /* @__PURE__ */ jsx("div", {
					className: "col-span-4 mt-12 md:col-span-8 lg:col-span-7 lg:col-start-6 lg:mt-0",
					children: /* @__PURE__ */ jsx("ul", { children: useCases.map((useCase, i) => /* @__PURE__ */ jsx(Reveal, {
						as: "li",
						index: i,
						rule: true,
						tone: "ink",
						children: /* @__PURE__ */ jsxs("div", {
							className: "py-7",
							children: [/* @__PURE__ */ jsx(Subtitle, {
								as: "h3",
								tone: "ink",
								className: "text-2xl",
								children: useCase.label
							}), /* @__PURE__ */ jsx("p", {
								className: "mt-3 max-w-xl leading-relaxed text-neutral-300",
								children: useCase.detail
							})]
						})
					}, useCase.id)) })
				})]
			}) })
		}),
		/* @__PURE__ */ jsx(Section, {
			id: "getting-started",
			labelledBy: "getting-started-title",
			tight: true,
			children: /* @__PURE__ */ jsx(Shell, { children: /* @__PURE__ */ jsxs(Grid, {
				rails: true,
				children: [/* @__PURE__ */ jsxs("div", {
					className: "col-span-4 md:col-span-8 lg:col-span-5",
					children: [/* @__PURE__ */ jsxs(Reveal, { children: [/* @__PURE__ */ jsx(Eyebrow, {
						index: "03",
						children: "The path"
					}), /* @__PURE__ */ jsx(Title, {
						id: "getting-started-title",
						className: "mt-7",
						children: "Look at it properly, then decide."
					})] }), /* @__PURE__ */ jsxs(Reveal, {
						delay: .12,
						children: [/* @__PURE__ */ jsx("ol", {
							className: "mt-10",
							children: [
								{
									step: "01",
									title: "Look at the plans",
									detail: "The referral link below opens Google’s own plan comparison, with current pricing, feature limits and terms."
								},
								{
									step: "02",
									title: "Tell us the shape of your team",
									detail: "How many people, whether you already have a domain, and what currently holds your files. That is enough for a useful answer."
								},
								{
									step: "03",
									title: "Sign up through the link",
									detail: "You keep the relationship with Google for the subscription. Axleta is your partner, not your reseller of record."
								},
								{
									step: "04",
									title: "Decide about administration",
									detail: "Run it yourselves, or have us handle users, policy and the parts that need attention later. Agreed in writing either way."
								}
							].map((item) => /* @__PURE__ */ jsxs("li", {
								className: "flex gap-6 border-t border-line pt-7 pb-1",
								children: [/* @__PURE__ */ jsx("span", {
									className: "label shrink-0 text-accent-700 tabular-nums",
									children: item.step
								}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
									className: "font-display text-xl leading-snug tracking-tightest",
									children: item.title
								}), /* @__PURE__ */ jsx("p", {
									className: "mt-2 max-w-lg leading-relaxed text-neutral-700",
									children: item.detail
								})] })]
							}, item.step))
						}), /* @__PURE__ */ jsxs("div", {
							className: "mt-10 flex flex-wrap items-center gap-x-6 gap-y-4",
							children: [/* @__PURE__ */ jsx(ButtonLink, {
								to: external.googleWorkspaceReferral,
								size: "lg",
								onClick: () => void 0,
								children: "View Google Workspace plans"
							}), /* @__PURE__ */ jsx("p", {
								className: "max-w-[16rem] text-sm leading-relaxed text-neutral-700",
								children: "Opens Google in a new tab. Pricing and terms are Google’s."
							})]
						})]
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "col-span-4 mt-14 md:col-span-8 lg:col-span-5 lg:col-start-8 lg:mt-0",
					children: [/* @__PURE__ */ jsx(Reveal, {
						delay: .1,
						children: /* @__PURE__ */ jsxs("aside", {
							className: "border-l-2 border-accent-600 bg-surface-sunken p-7",
							children: [/* @__PURE__ */ jsx(Note, { children: "On referrals" }), /* @__PURE__ */ jsx("p", {
								className: "mt-4 leading-relaxed text-ink",
								children: "The referral link is tracked, so a subscription started through it may be recognised back to Axleta by Google. We publish the link because it is the partner route to the product — not because we mark up the price. Axleta does not set or change Workspace pricing."
							})]
						})
					}), /* @__PURE__ */ jsxs(Reveal, {
						delay: .18,
						children: [/* @__PURE__ */ jsx(Rule, { className: "mt-12" }), /* @__PURE__ */ jsxs("div", {
							className: "mt-8",
							children: [/* @__PURE__ */ jsx(Body, { children: "Axleta’s own position on the wider platform is set out on the about page, where both published partnerships are stated in type." }), /* @__PURE__ */ jsx(ArrowLink, {
								to: routes$1.about,
								className: "mt-5",
								onClick: () => void 0,
								children: "Axleta and its ecosystem"
							})]
						})]
					})]
				})]
			}) })
		}),
		/* @__PURE__ */ jsx(Section, {
			id: "questions",
			labelledBy: "questions-title",
			tone: "sunken",
			tight: true,
			children: /* @__PURE__ */ jsx(Shell, { children: /* @__PURE__ */ jsxs(Grid, {
				rails: true,
				children: [/* @__PURE__ */ jsx("div", {
					className: "col-span-4 md:col-span-8 lg:col-span-4",
					children: /* @__PURE__ */ jsxs(Reveal, { children: [
						/* @__PURE__ */ jsx(Eyebrow, {
							index: "04",
							children: "Questions"
						}),
						/* @__PURE__ */ jsx(Title, {
							id: "questions-title",
							className: "mt-7",
							children: "The ones worth asking first."
						}),
						/* @__PURE__ */ jsxs(Note, {
							className: "mt-8",
							children: [
								"Answered here rather than on a sales page. If yours is not on the list,",
								" ",
								/* @__PURE__ */ jsx("a", {
									href: routes$1.contact,
									className: "underline underline-offset-4 hover:text-accent-700",
									children: "ask us directly"
								}),
								"."
							]
						})
					] })
				}), /* @__PURE__ */ jsxs("div", {
					className: "col-span-4 mt-12 md:col-span-8 lg:col-span-7 lg:col-start-6 lg:mt-0",
					children: [questions.map((question, i) => /* @__PURE__ */ jsx(Disclosure, {
						summary: question.label,
						open: i === 0,
						children: /* @__PURE__ */ jsx("p", { children: question.detail })
					}, question.label)), /* @__PURE__ */ jsxs("div", {
						className: "mt-12",
						children: [
							/* @__PURE__ */ jsx(Eyebrow, {
								index: "··",
								children: "Still deciding"
							}),
							/* @__PURE__ */ jsxs("p", {
								className: "mt-5 max-w-xl leading-loose text-neutral-900",
								children: [
									"If you are weighing this against keeping what you have, tell us what is not working with it. ",
									company.name,
									" would rather answer that than sell you a subscription."
								]
							}),
							/* @__PURE__ */ jsx(CtaPair, {
								className: "mt-8",
								primary: {
									to: `${routes$1.contact}?topic=${encodeURIComponent("Google Workspace")}`,
									label: "Ask about Workspace",
									onClick: () => void 0
								},
								secondary: {
									to: routes$1.solutions,
									label: "See all solutions"
								}
							})
						]
					})]
				})]
			}) })
		})
	] });
}
var legalDocuments = {
	terms: {
		kind: "terms",
		title: "Terms & conditions",
		eyebrow: "Legal",
		reviewed: "2026-09-30",
		lead: "These terms govern your use of the Axleta website. They are written to be read: if anything here is unclear, ask us and we will explain it.",
		summary: [
			"This website is provided for information. Using it does not create a contract between you and Axleta.",
			"Service engagements — ERP implementations, development, consultancy and support — are governed by a separate written agreement, agreed before work begins.",
			"Content is provided as is. Where we describe a capability, that is a statement about what Axleta publishes it can do, not a guarantee of a particular result in your business.",
			"We may update these terms. The date below tells you when they were last reviewed."
		],
		sections: [
			{
				id: "about-these-terms",
				number: "01",
				heading: "About these terms",
				blocks: [
					{
						type: "p",
						text: "These terms apply to everyone who visits www.axleta.com. By using the site you accept them. If you do not accept them, please do not use the site."
					},
					{
						type: "p",
						text: "Axleta is an IT service firm founded in 2018, supplying technology-driven systems and solutions for SMEs. Axleta can be reached at info@axleta.com or at the axleta Canada address published on the contact page."
					},
					{
						type: "note",
						text: "These terms concern the website itself. They do not create a client relationship, and they do not oblige either of us to enter into one."
					}
				]
			},
			{
				id: "use-of-this-site",
				number: "02",
				heading: "Use of this site",
				blocks: [
					{
						type: "p",
						text: "You may read, print and share this site for your own business purposes."
					},
					{
						type: "list",
						items: [
							"Do not attempt to disrupt, overload or gain unauthorised access to the site or its infrastructure.",
							"Do not republish substantial parts of the site as your own, or attempt to pass it off as Axleta content.",
							"Do not use automated systems to scrape the site at a rate that degrades it for other visitors.",
							"Do not submit content that is unlawful, misleading, or that infringes someone else’s rights."
						]
					},
					{
						type: "p",
						text: "Axleta may update, change or withdraw any part of the site without notice."
					}
				]
			},
			{
				id: "content-and-accuracy",
				number: "03",
				heading: "Content and accuracy",
				blocks: [
					{
						type: "p",
						text: "We take care to keep the information on this site accurate and current. It is written to describe Axleta’s published capabilities honestly, and we do not publish client counts, performance figures or testimonials that we cannot evidence."
					},
					{
						type: "p",
						text: "General information is not advice. Nothing on this site is professional, legal, financial or security advice, and nothing on it should be treated as a recommendation for your specific circumstances. Where a decision matters, ask us directly."
					},
					{
						type: "list",
						items: ["Product names, platforms and partner names — including SAP, Google Cloud and Google Workspace — belong to their respective owners. Their appearance here does not imply endorsement of this site by them.", "Third-party product terms, pricing and availability are set by their owners and may change without notice."]
					},
					{
						type: "note",
						text: "This site publishes no statistics, testimonials, named clients or case studies, because none are supported by verified evidence. If that changes, the change will be stated rather than implied."
					}
				]
			},
			{
				id: "intellectual-property",
				number: "04",
				heading: "Intellectual property",
				blocks: [{
					type: "p",
					text: "The Axleta name, logo, site design, copy and diagrams on this site are the property of Axleta unless stated otherwise. You may not reproduce them commercially or claim them as your own without written permission."
				}, {
					type: "p",
					text: "Articles on the Axleta blog are published by Axleta and remain its property. Where content is attributed to someone else, that attribution governs and you should follow the terms stated with that content."
				}]
			},
			{
				id: "external-links",
				number: "05",
				heading: "External links",
				blocks: [{
					type: "p",
					text: "This site links to other websites, including blog.axleta.com and vendor sites such as SAP and Google. Those sites are outside Axleta’s control and are governed by their own terms and privacy policies."
				}, {
					type: "p",
					text: "A link is a recommendation to look, not an endorsement. We link where the destination is genuinely useful; we do not accept payment for links."
				}]
			},
			{
				id: "services",
				number: "06",
				heading: "Services and engagements",
				blocks: [
					{
						type: "p",
						text: "The services described on this site — ERP consultancy and implementation, companion application development, project management, infrastructure and cloud, automation and integration, Google Workspace, and SAP Business One support — are offered subject to a separate written agreement between Axleta and the client."
					},
					{
						type: "p",
						text: "That agreement sets the scope, the deliverables, the fees, the responsibilities of each party, and the acceptance criteria. Where it conflicts with anything on this website, the agreement prevails."
					},
					{
						type: "note",
						text: "Remote access is delivered using Microsoft Remote Desktop Web Service, as published. Availability of any platform, integration or feature depends on the vendor and on the client’s own configuration."
					}
				]
			},
			{
				id: "your-content",
				number: "07",
				heading: "Your content and your rights",
				blocks: [{
					type: "p",
					text: "If you send us an enquiry, you keep all rights in what you sent. You grant Axleta a limited licence to read and respond to it — nothing more. We do not use your enquiry to add you to a marketing list, and we do not sell or share it for advertising."
				}, {
					type: "p",
					text: "You are responsible for what you send. Do not send confidential material you are not permitted to share, and do not send personal data about other people unless you are entitled to."
				}]
			},
			{
				id: "liability",
				number: "08",
				heading: "Liability",
				blocks: [{
					type: "p",
					text: "The site is provided on an “as is” and “as available” basis. To the fullest extent the law allows, Axleta excludes all warranties, express or implied, including any implied warranty of merchantability, fitness for purpose or non-infringement."
				}, {
					type: "p",
					text: "To the fullest extent the law allows, Axleta is not liable for loss arising from your use of, or reliance on, this site or its content, including business loss, loss of profit, loss of opportunity or loss of data. Nothing in these terms limits liability that cannot lawfully be limited."
				}]
			},
			{
				id: "changes",
				number: "09",
				heading: "Changes to these terms",
				blocks: [{
					type: "p",
					text: "These terms may change. The version published here at the time you use the site is the version that applies to you. Material changes will be reflected in the “last reviewed” date at the top of this page."
				}, {
					type: "p",
					text: "Continuing to use the site after a change means you accept the updated terms."
				}]
			},
			{
				id: "contact",
				number: "10",
				heading: "Contact",
				blocks: [{
					type: "p",
					text: "Questions about these terms, or anything else on this site, can go to info@axleta.com. If you would rather talk it through, use the contact form or WhatsApp — both are published on the contact page."
				}, {
					type: "note",
					text: "These terms should be reviewed by Axleta’s own legal counsel before they are relied upon. That review is an open item recorded in the project audit, not something this site asserts as done."
				}]
			}
		]
	},
	privacy: {
		kind: "privacy",
		title: "Privacy policy",
		eyebrow: "Legal",
		reviewed: "2026-09-30",
		lead: "What this site collects, what it does not, and why. The short version: it collects almost nothing, and you can ask us to delete what it does.",
		summary: [
			"This site runs no analytics by default and sets no advertising or tracking cookies.",
			"There is no account to create, and no third-party form service or advertising network embedded in the site.",
			"If you contact us, we keep your enquiry so we can reply — and nothing else.",
			"This policy covers this website. It does not cover the third-party services we link to, which have their own policies."
		],
		sections: [
			{
				id: "scope",
				number: "01",
				heading: "What this policy covers",
				blocks: [
					{
						type: "p",
						text: "This policy explains how Axleta handles personal information in connection with www.axleta.com — the website itself, its enquiry form, and any analytics that may be enabled."
					},
					{
						type: "p",
						text: "It does not cover information handled inside a client engagement. Data Axleta processes on a client’s systems under a written agreement is governed by that agreement, not by this page."
					},
					{
						type: "note",
						text: "This policy describes the site as built. If analytics or a form endpoint is configured for a deployment, the deployment owner is responsible for updating this page to match."
					}
				]
			},
			{
				id: "what-we-collect",
				number: "02",
				heading: "What this site collects",
				blocks: [
					{
						type: "p",
						text: "By default this site collects no personal information about you. There is no tracking pixel, no advertising identifier, no behavioural profiling and no third-party analytics script."
					},
					{
						type: "p",
						text: "If you choose to contact us, the site collects exactly what you type into the form:"
					},
					{
						type: "list",
						items: [
							"Your name.",
							"Your email address, so we can reply.",
							"Your organisation, if you provide one.",
							"Your country, if you provide one.",
							"The area your enquiry is about.",
							"Your message."
						]
					},
					{
						type: "p",
						text: "Fields marked as required are validated in your browser so you are told immediately if something is missing. Nothing is sent anywhere until you submit the form yourself."
					}
				]
			},
			{
				id: "cookies",
				number: "03",
				heading: "Cookies and local storage",
				blocks: [{
					type: "p",
					text: "This site sets no cookies of its own. It uses browser local storage only for presentational preferences such as your motion-mode choice, which never leave your device and are cleared when you clear site data."
				}, {
					type: "p",
					text: "If a deployment enables an analytics provider, that provider may set its own cookies or use its own storage. In that case this section must be updated to name the provider and explain it before the deployment goes live."
				}]
			},
			{
				id: "why",
				number: "04",
				heading: "Why we use what you send",
				blocks: [{
					type: "p",
					text: "An enquiry is used for one purpose: to answer it. That means reading your requirement, replying to you, and keeping a record of the conversation for as long as the enquiry is live."
				}, {
					type: "p",
					text: "We do not add you to a marketing list, we do not sell or share your enquiry with advertisers, and we do not use it to train models."
				}]
			},
			{
				id: "sharing",
				number: "05",
				heading: "Who else sees it",
				blocks: [
					{
						type: "p",
						text: "Axleta does not share personal information with third parties for their own purposes. We disclose it only where the law requires it, or where the hosting provider processes it on our instructions to deliver the site."
					},
					{
						type: "list",
						items: [
							"Our hosting provider, which stores and serves the site files and processes enquiry submissions on our behalf.",
							"Public authorities, where disclosure is required by law.",
							"A professional adviser or successor, if that is necessary to comply with an obligation or in connection with a genuine business transfer."
						]
					},
					{
						type: "note",
						text: "If you follow a link to another site — our blog, SAP, Google or anywhere else — that site’s own privacy policy applies from the moment you leave this one."
					}
				]
			},
			{
				id: "retention",
				number: "06",
				heading: "How long we keep it",
				blocks: [{
					type: "p",
					text: "Enquiries are kept while the conversation is live and for a reasonable period afterwards so we can pick up where we left off. Once an enquiry is closed and has no ongoing purpose, it is deleted."
				}, {
					type: "p",
					text: "Records that we are legally required to keep are kept for as long as that requirement applies, and are not used for anything else."
				}]
			},
			{
				id: "your-rights",
				number: "07",
				heading: "Your rights",
				blocks: [
					{
						type: "p",
						text: "You can ask to see the personal information we hold about you, ask us to correct it, ask us to delete it, or object to how we are using it. Email info@axleta.com and we will deal with the request."
					},
					{
						type: "p",
						text: "We will respond to a request within the timeframe the applicable law requires, and we will tell you if we need more information from you to act on it."
					},
					{
						type: "note",
						text: "This is a plain-language summary published on the website. Where the law requires a fuller formal notice, that obligation is handled separately and this page does not pretend to replace it."
					}
				]
			},
			{
				id: "security",
				number: "08",
				heading: "Security",
				blocks: [{
					type: "p",
					text: "The site is served over HTTPS. We keep the amount of personal data we hold deliberately small, because the less we hold, the less there is to lose."
				}, {
					type: "p",
					text: "No system is perfectly secure. Please do not send us passwords, authentication secrets or payment card details through the contact form — we will never ask you to."
				}]
			},
			{
				id: "changes-to-this-policy",
				number: "09",
				heading: "Changes to this policy",
				blocks: [{
					type: "p",
					text: "This policy may change. The version published here at the time you use the site is the version that applies to you, and the “last reviewed” date at the top of this page tells you when it last changed."
				}]
			},
			{
				id: "contact-privacy",
				number: "10",
				heading: "Contact",
				blocks: [{
					type: "p",
					text: "Privacy questions and rights requests go to info@axleta.com. Write “Privacy request” in the subject line so it reaches the right person quickly."
				}]
			}
		]
	}
};
//#endregion
//#region src/pages/LegalPage.tsx
/**
* /terms and /privacy.
*
* One component, two documents, driven by `legalDocuments` in content/legal.ts.
* The route passes `kind`; App.tsx wires /terms and /privacy to it.
*
* Layout choice: a sticky clause index rather than a coordinate rail, because
* legal pages are read linearly and referenced by clause number — so the clause
* number is the anchor, and the index stays available while scrolling.
*/
var LegalPage_exports = /* @__PURE__ */ __exportAll({ default: () => LegalPage });
var otherRoute = {
	terms: routes$1.privacy,
	privacy: routes$1.terms
};
var otherLabel = {
	terms: "Read the privacy policy",
	privacy: "Read the terms & conditions"
};
function LegalPage({ kind }) {
	const doc = legalDocuments[kind];
	const trail = useMemo(() => [{
		name: "Home",
		path: routes$1.home
	}, {
		name: doc.title,
		path: kind === "terms" ? routes$1.terms : routes$1.privacy
	}], [doc.title, kind]);
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(Seo, {
			meta: metaFor(kind),
			trail
		}),
		/* @__PURE__ */ jsx(CompactHero, {
			trail,
			eyebrow: doc.eyebrow,
			title: doc.title,
			lead: doc.lead,
			reviewed: doc.reviewed
		}),
		/* @__PURE__ */ jsx(Section, {
			tight: true,
			className: "pt-0",
			children: /* @__PURE__ */ jsx(Shell, { children: /* @__PURE__ */ jsxs(Grid, {
				rails: true,
				children: [/* @__PURE__ */ jsx("div", {
					className: "col-span-4 md:col-span-8 lg:col-span-4",
					children: /* @__PURE__ */ jsxs(Reveal, { children: [
						/* @__PURE__ */ jsx(Eyebrow, {
							index: "··",
							children: "In short"
						}),
						/* @__PURE__ */ jsx(Title, {
							as: "h2",
							className: "mt-7 text-title",
							children: "The summary."
						}),
						/* @__PURE__ */ jsx(Note, {
							className: "mt-8",
							children: "The full text is below. If the summary and the full text ever disagree, the full text governs."
						}),
						/* @__PURE__ */ jsx(ArrowLink, {
							to: otherRoute[kind],
							className: "mt-7",
							children: otherLabel[kind]
						})
					] })
				}), /* @__PURE__ */ jsx("div", {
					className: "col-span-4 mt-12 md:col-span-8 lg:col-span-7 lg:col-start-6 lg:mt-0",
					children: /* @__PURE__ */ jsx("ul", { children: doc.summary.map((point, i) => /* @__PURE__ */ jsx(Reveal, {
						as: "li",
						index: i,
						rule: true,
						className: "pt-7",
						children: /* @__PURE__ */ jsx("p", {
							className: "text-body leading-body text-neutral-900",
							children: point
						})
					}, point)) })
				})]
			}) })
		}),
		/* @__PURE__ */ jsx(Section, {
			id: "clauses",
			tight: true,
			tone: "sunken",
			children: /* @__PURE__ */ jsx(Shell, { children: /* @__PURE__ */ jsxs(Grid, {
				rails: true,
				children: [/* @__PURE__ */ jsx("nav", {
					"aria-label": "Clause index",
					className: "col-span-4 lg:col-span-3",
					children: /* @__PURE__ */ jsxs("div", {
						className: "lg:sticky lg:top-28",
						children: [/* @__PURE__ */ jsx(Eyebrow, {
							index: "··",
							children: "Clauses"
						}), /* @__PURE__ */ jsx("ol", {
							className: "mt-7 space-y-1",
							children: doc.sections.map((section) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("a", {
								href: `#${section.id}`,
								className: "label group flex items-baseline gap-3 py-1.5 transition-colors duration-300 hover:text-accent-700",
								children: [/* @__PURE__ */ jsx("span", {
									className: "w-5 shrink-0 text-right text-accent-700 tabular-nums",
									children: section.number
								}), /* @__PURE__ */ jsx("span", {
									className: "leading-snug text-neutral-700 group-hover:text-ink",
									children: section.heading
								})]
							}) }, section.id))
						})]
					})
				}), /* @__PURE__ */ jsxs("div", {
					className: "col-span-4 mt-14 md:col-span-8 lg:col-span-8 lg:col-start-5 lg:mt-0",
					children: [doc.sections.map((section, i) => /* @__PURE__ */ jsx(Reveal, {
						index: i,
						rule: true,
						children: /* @__PURE__ */ jsxs("section", {
							id: section.id,
							"aria-labelledby": `${section.id}-heading`,
							className: "scroll-mt-28 pt-12",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex items-baseline gap-5",
								children: [/* @__PURE__ */ jsx("span", {
									className: "label shrink-0 text-accent-700 tabular-nums",
									children: section.number
								}), /* @__PURE__ */ jsx("h2", {
									id: `${section.id}-heading`,
									className: "font-display text-2xl font-medium leading-snug tracking-tightest sm:text-3xl",
									children: section.heading
								})]
							}), /* @__PURE__ */ jsx("div", {
								className: "mt-6 pl-0 sm:pl-12",
								children: /* @__PURE__ */ jsx(Prose, { blocks: section.blocks })
							})]
						})
					}, section.id)), /* @__PURE__ */ jsxs("p", {
						className: "label mt-14 border-t border-line-strong pt-8 text-neutral-700",
						children: [
							"End of ",
							doc.title.toLowerCase(),
							" · last reviewed",
							" ",
							/* @__PURE__ */ jsx("time", {
								dateTime: doc.reviewed,
								children: doc.reviewed
							})
						]
					})]
				})]
			}) })
		})
	] });
}
//#endregion
//#region src/pages/NotFoundPage.tsx
/**
* 404.
*
* Doubles as the catch-all route and as the prerendered /404 document. It is
* noindex (see pageMeta.notFound), which is the correct treatment for a
* utility page that should never appear in results.
*
* The job here is to get someone to a real page in one action, so the layout is
* a compact map of the site rather than a full editorial page.
*/
var NotFoundPage_exports = /* @__PURE__ */ __exportAll({ default: () => NotFoundPage });
var destinations = [
	{
		to: routes$1.home,
		label: "Home",
		detail: "What Axleta does and why"
	},
	{
		to: routes$1.solutions,
		label: "Solutions",
		detail: "ERP, applications, infrastructure, automation"
	},
	{
		to: routes$1.services,
		label: "Services",
		detail: "Discover, design, implement, improve"
	},
	{
		to: routes$1.about,
		label: "About",
		detail: "The company record and our principles"
	},
	{
		to: routes$1.insights,
		label: "Insights",
		detail: "Recent writing from the Axleta blog"
	},
	{
		to: routes$1.contact,
		label: "Contact",
		detail: "Tell us what you are trying to improve"
	}
];
function NotFoundPage() {
	const location = useLocation();
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(Seo, { meta: metaFor("notFound") }),
		/* @__PURE__ */ jsx(Section, {
			tight: true,
			className: "pt-32 lg:pt-40",
			children: /* @__PURE__ */ jsx(Shell, { children: /* @__PURE__ */ jsxs(Grid, {
				rails: true,
				children: [/* @__PURE__ */ jsxs("div", {
					className: "col-span-4 md:col-span-8 lg:col-span-7",
					children: [
						/* @__PURE__ */ jsxs(Reveal, { children: [/* @__PURE__ */ jsx(Eyebrow, {
							index: "404",
							live: true,
							children: "Route not found"
						}), /* @__PURE__ */ jsx(Title, {
							as: "h1",
							className: "mt-8 text-display leading-[0.95]",
							children: "That route is not on the map."
						})] }),
						/* @__PURE__ */ jsx(Reveal, {
							delay: .12,
							children: /* @__PURE__ */ jsxs("p", {
								className: "measure mt-8 text-lead leading-loose text-neutral-700",
								children: [
									"Nothing is served from",
									" ",
									/* @__PURE__ */ jsx("code", {
										className: "font-mono text-sm text-ink",
										children: location.pathname
									}),
									". It may have moved, or the link may be mistyped. Everything on the site is listed on the right."
								]
							})
						}),
						/* @__PURE__ */ jsx(Reveal, {
							delay: .2,
							children: /* @__PURE__ */ jsx(CtaPair, {
								className: "mt-10",
								primary: {
									to: routes$1.home,
									label: "Go to the homepage"
								},
								secondary: {
									to: routes$1.contact,
									label: "Report a broken link"
								}
							})
						})
					]
				}), /* @__PURE__ */ jsxs("div", {
					className: "col-span-4 mt-14 md:col-span-8 lg:col-span-4 lg:col-start-9 lg:mt-0",
					children: [
						/* @__PURE__ */ jsx(Reveal, { children: /* @__PURE__ */ jsx(Eyebrow, {
							index: "··",
							children: "Everywhere else"
						}) }),
						/* @__PURE__ */ jsx("nav", {
							"aria-label": "Site pages",
							className: "mt-6",
							children: /* @__PURE__ */ jsx("ul", { children: destinations.map((destination, i) => /* @__PURE__ */ jsx(Reveal, {
								as: "li",
								index: i,
								rule: true,
								className: "pt-6",
								children: /* @__PURE__ */ jsxs(Link, {
									to: destination.to,
									className: "group flex items-baseline justify-between gap-5",
									children: [/* @__PURE__ */ jsxs("span", { children: [/* @__PURE__ */ jsx("span", {
										className: "font-display text-xl leading-snug tracking-tightest transition-colors duration-300 group-hover:text-accent-700",
										children: destination.label
									}), /* @__PURE__ */ jsx("span", {
										className: "mt-1 block text-sm leading-relaxed text-neutral-700",
										children: destination.detail
									})] }), /* @__PURE__ */ jsx("span", {
										"aria-hidden": "true",
										className: "shrink-0 text-accent-700 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none",
										children: "→"
									})]
								})
							}, destination.to)) })
						}),
						/* @__PURE__ */ jsx(Rule, { className: "mt-10" }),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-7",
							children: [/* @__PURE__ */ jsx(Note, { children: "Older links" }), /* @__PURE__ */ jsx(ArrowLink, {
								to: external.blog,
								external: true,
								className: "mt-4",
								children: "Axleta blog"
							})]
						})
					]
				})]
			}) })
		}),
		/* @__PURE__ */ jsx(Section, {
			tone: "ink",
			tight: true,
			children: /* @__PURE__ */ jsx(Shell, { children: /* @__PURE__ */ jsxs(Grid, {
				rails: true,
				children: [/* @__PURE__ */ jsx("div", {
					className: "col-span-4 md:col-span-8 lg:col-span-7",
					children: /* @__PURE__ */ jsxs(Reveal, { children: [/* @__PURE__ */ jsx(Title, {
						tone: "ink",
						as: "h2",
						children: "Found something we have not published?"
					}), /* @__PURE__ */ jsx("p", {
						className: "measure mt-6 leading-loose text-neutral-300",
						children: "Some of our writing lives on the Axleta blog rather than on this site, and older addresses from the previous website redirect here. If a link you followed led to this page, tell us and we will fix it."
					})] })
				}), /* @__PURE__ */ jsx("div", {
					className: "col-span-4 mt-10 md:col-span-8 lg:col-span-4 lg:col-start-9 lg:mt-0",
					children: /* @__PURE__ */ jsx(Reveal, {
						delay: .1,
						children: /* @__PURE__ */ jsx(ButtonLink, {
							to: routes$1.contact,
							variant: "quiet",
							size: "lg",
							onClick: () => void 0,
							children: "Report a broken link"
						})
					})
				})]
			}) })
		})
	] });
}
//#endregion
//#region scripts/prerender.tsx
/**
* Static prerender.
*
* Runs after `vite build` (see the `postbuild` script) and writes real HTML for
* every route in the manifest, so a crawler, a link preview bot, or a visitor
* with JavaScript disabled receives content rather than an empty <div id="root">.
*
* How it is built: this file is compiled by Vite in SSR mode first
* (`vite build --ssr`), which means TSX, path aliases and `import.meta.env` all
* behave exactly as they do in the browser bundle. Running it through bare Node
* with type-stripping would not resolve the alias or the env object.
*
* What is written:
*   dist/<route>/index.html   every route except home
*   dist/index.html           home, replaced in place
*   dist/404.html             the wildcard route, for Vercel/static hosts
*   dist/robots.txt
*   dist/sitemap.xml
*
* Deliberate constraints:
*  - The prerendered markup is what React would render on the server with
*    `data-motion="reduced"`, so nothing here depends on animation state.
*  - The 3D hero is behind `React.lazy`, so the static HTML contains the static
*    Axleta axis SVG only. No canvas, no WebGL, no device sniffing at build time.
*  - Hydration is the browser's job. The output is ordinary React output: same
*    tree, no markers that would break `hydrateRoot`.
*/
/** A page inside the same transition wrapper the app mounts. */
var page = (element) => createElement(PageTransition, null, element);
var T = (name, path) => ({
	name,
	path
});
function buildRoutes() {
	const contactOrg = {
		"@context": "https://schema.org",
		"@type": "ContactPage",
		name: "Contact Axleta",
		url: site.url + pageMeta.contact.path
	};
	const workspace = {
		"@context": "https://schema.org",
		"@type": "Product",
		name: "Google Workspace",
		description: "The Google productivity suite — Gmail, Drive, Docs, Sheets, Slides, Meet and Calendar — introduced and sold by Axleta as a Google Cloud Partner.",
		brand: {
			"@type": "Brand",
			name: "Google"
		},
		category: "Productivity software",
		url: site.url + pageMeta.googleWorkspace.path
	};
	return [
		{
			path: "/",
			meta: pageMeta.home,
			render: () => page(createElement(HomePage))
		},
		{
			path: "/about",
			meta: pageMeta.about,
			trail: [T("Home", "/"), T("About", "/about")],
			render: () => page(createElement(AboutPage))
		},
		{
			path: "/solutions",
			meta: pageMeta.solutions,
			trail: [T("Home", "/"), T("Solutions", "/solutions")],
			render: () => page(createElement(SolutionsPage))
		},
		{
			path: "/services",
			meta: pageMeta.services,
			trail: [T("Home", "/"), T("Services", "/services")],
			render: () => page(createElement(ServicesPage))
		},
		{
			path: "/insights",
			meta: pageMeta.insights,
			trail: [T("Home", "/"), T("Insights", "/insights")],
			render: () => page(createElement(InsightsPage))
		},
		{
			path: "/contact",
			meta: pageMeta.contact,
			trail: [T("Home", "/"), T("Contact", "/contact")],
			jsonLd: [contactOrg],
			render: () => page(createElement(ContactPage))
		},
		{
			path: "/google-workspace",
			meta: pageMeta.googleWorkspace,
			trail: [T("Home", "/"), T("Google Workspace", "/google-workspace")],
			jsonLd: [workspace],
			render: () => page(createElement(GoogleWorkspacePage))
		},
		{
			path: "/terms",
			meta: pageMeta.terms,
			trail: [T("Home", "/"), T("Terms & conditions", "/terms")],
			render: () => page(createElement(LegalPage, { kind: "terms" }))
		},
		{
			path: "/privacy",
			meta: pageMeta.privacy,
			trail: [T("Home", "/"), T("Privacy policy", "/privacy")],
			render: () => page(createElement(LegalPage, { kind: "privacy" }))
		},
		{
			path: "/404",
			meta: pageMeta.notFound,
			render: () => page(createElement(NotFoundPage))
		}
	];
}
/**
* Motion writes its `initial` styles into the server-rendered markup, which
* parks every reveal at opacity 0 in the static HTML. That is invisible to a
* crawler reading text but wrong for anyone without JavaScript, and wrong for
* anyone reading the file over a slow connection.
*
* Rather than change the animation components, the prerender output is
* normalised to each element's resting state. The list is deliberately
* exhaustive over the exact style strings our components can emit, and
* `assertNoHiddenContent` fails the build if anything is left over — so if a
* reveal offset changes in motion.ts or Reveal.tsx, the build complains instead
* of silently shipping hidden content.
*/
var RESTING_STYLES = [
	[/style="opacity:0;transform:translateY\(22px\)"/g, "style=\"opacity:1;transform:none\""],
	[/style="transform:scaleX\(0\)"/g, "style=\"transform:scaleX(1)\""],
	[/style="opacity:0;transform:translateY\(110%\)"/g, "style=\"opacity:1;transform:none\""]
];
function toRestingState(markup) {
	let out = markup;
	for (const [pattern, resting] of RESTING_STYLES) out = out.replace(pattern, resting);
	return out;
}
/**
* Returns the leftover hidden-state styles, so the caller can fail the build.
*
* Only *fully* hidden values count. `opacity:0.6` is a legitimate resting state
* for diagram strokes, so the pattern requires opacity to be exactly zero —
* followed by `;` or the end of the attribute — rather than any `opacity:0`
* prefix.
*/
function assertNoHiddenContent(markup, path) {
	const leftover = /style="[^"]*(?:opacity:0(?:;|")|scaleX\(0\)|translateY\(110%\))[^"]*"/.exec(markup);
	if (leftover) {
		console.error(`[prerender] ${path}: Motion initial state survived normalisation: ${leftover[0]}`);
		process.exitCode = 1;
	}
}
/**
* Strips the head tags Vite left in the built index.html and replaces them with
* the per-route set from headTagsFor(). Tag removal is by explicit pattern
* rather than a blanket regex, so an unrelated future tag is never swallowed.
*
* Two details matter and both have bitten real prerenders:
*
*  - The patterns tolerate newlines inside a tag. `index.html` is hand-formatted
*    with one attribute per line, so `<meta name="description" ...>` never
*    appears literally — matching a single space would silently leave the base
*    copy in place and ship two description tags.
*  - The new tags are appended at the end of <head>, never injected after the
*    opening tag. `<meta charset>` is only honoured in the first 1024 bytes of
*    the document, and a 15-tag block inserted at the top of <head> pushed the
*    charset declaration past that limit, leaving the encoding to chance.
*/
function replaceHead(html, headTags, rootMarkup) {
	let out = html;
	out = out.replace(/<title>[\s\S]*?<\/title>\s*/i, "").replace(/<meta\s+name="description"[^>]*>\s*/i, "").replace(/<meta\s+name="robots"[^>]*>\s*/i, "").replace(/<meta\s+name="twitter:[a-z:]*"[^>]*>\s*/gi, "").replace(/<meta\s+property="og:[a-z:_]*"[^>]*>\s*/gi, "").replace(/<link\s+rel="canonical"[^>]*>\s*/i, "").replace(/<script\s+type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>\s*/gi, "");
	out = out.replace(/<\/head>/i, `  ${headTags}\n  </head>`);
	out = out.replace(/<div id="root"><\/div>/, `<div id="root" data-prerendered="true">${rootMarkup}`);
	out = out.replace("data-motion=\"full\"", "data-motion=\"reduced\"");
	return out;
}
function renderPage(route, shellHtml) {
	const nodes = [organizationJsonLd(), webSiteJsonLd()];
	if (route.trail && route.trail.length > 1) nodes.push(breadcrumbJsonLd(route.trail));
	if (route.jsonLd) nodes.push(...route.jsonLd);
	const headTags = headTagsFor(route.meta, nodes);
	const resting = toRestingState(renderToString(createElement(StaticRouter, { location: route.path }, createElement(MotionConfig, { reducedMotion: "always" }, createElement(PageShell, null, route.render())))));
	assertNoHiddenContent(resting, route.path);
	return replaceHead(shellHtml, headTags, resting);
}
function writeFile(path, contents) {
	mkdirSync(dirname(path), { recursive: true });
	writeFileSync(path, contents, "utf8");
}
function sitemap(routes, lastmod) {
	return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.filter((route) => !route.meta.noIndex).map((route) => {
		const loc = route.path === "/" ? `${site.url}/` : `${site.url}${route.path}`;
		const priority = route.path === "/" ? "1.0" : route.path.split("/").length > 2 ? "0.6" : "0.8";
		return [
			"  <url>",
			`    <loc>${loc}</loc>`,
			`    <lastmod>${lastmod}</lastmod>`,
			`    <changefreq>monthly</changefreq>`,
			`    <priority>${priority}</priority>`,
			"  </url>"
		].join("\n");
	}).join("\n")}\n</urlset>\n`;
}
function robots() {
	return [
		"User-agent: *",
		"Allow: /",
		"",
		"# Utility page — reachable but never indexed.",
		"Disallow: /404",
		"",
		"Sitemap: " + site.url + "/sitemap.xml",
		""
	].join("\n");
}
var here = dirname(fileURLToPath(import.meta.url));
var dist = join(here, "..", "dist");
var shellPath = join(dist, "index.html");
function readShell() {
	let html;
	try {
		html = readFileSync(shellPath, "utf8");
	} catch {
		console.error("[prerender] dist/index.html not found — run `vite build` first.");
		process.exit(1);
	}
	if (!html.includes("<div id=\"root\"></div>")) {
		console.error("[prerender] dist/index.html has no empty #root to fill.");
		process.exit(1);
	}
	return html;
}
var shellHtml = readShell();
var routes = buildRoutes();
var lastmod = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
var written = 0;
for (const route of routes) {
	const html = renderPage(route, shellHtml);
	if (route.path === "/404") writeFile(join(dist, "404.html"), html);
	else writeFile(route.path === "/" ? shellPath : join(dist, route.path.slice(1), "index.html"), html);
	written += 1;
	console.log(`[prerender] ${route.path.padEnd(18)} -> ${route.meta.title}`);
}
writeFile(join(dist, "sitemap.xml"), sitemap(routes, lastmod));
writeFile(join(dist, "robots.txt"), robots());
console.log(`[prerender] ${written} documents, sitemap.xml and robots.txt written to dist/.`);
//#endregion
export {};
