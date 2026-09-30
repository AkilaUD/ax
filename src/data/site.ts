/**
 * Site-wide configuration.
 *
 * Every contact detail in this file was verified against the live
 * www.axleta.com public pages on 2026-09-30. Nothing here is inferred.
 * See AXLETA_REVAMP_AUDIT.md for the source table.
 */

export const site = {
  name: 'Axleta',
  legalName: 'Axleta',
  tagline: 'Technology and Advancement',
  /** Used verbatim in <title> composition. */
  titleTemplate: '%s — Axleta',
  defaultTitle: 'Axleta — Technology and Advancement',
  description:
    'Axleta designs, implements and supports the systems behind SME operations — ERP and business applications, infrastructure, automation and remote access.',
  locale: 'en_GB',
  url: 'https://www.axleta.com',
  founded: 2018,
  /** Rendered in the footer as a range, matching current copyright treatment. */
  copyrightRange: '2018–2026',
  ogImage: '/brand/logo.png',
} as const;

export const contact = {
  email: 'info@axleta.com',
  whatsapp: {
    /** Verified live contact path on the current contact page. */
    href: 'https://wa.me/94710956655',
    display: '+94 71 095 6655',
  },
  address: {
    label: 'axleta Canada',
    street: '79 Beaconsfield Avenue',
    locality: 'Brampton',
    region: 'Ontario',
    postalCode: 'L6Y 4S1',
    country: 'Canada',
    countryCode: 'CA',
  },
  /**
   * The live site states Axleta supports "SAP Business One Sri Lanka and
   * globally". No separate Sri Lankan street address is published, so none is
   * rendered and no map embed is used.
   */
  coverage: 'Sri Lanka and globally',
} as const;

export const external = {
  blog: 'https://blog.axleta.com/',
  googleWorkspaceReferral: 'https://referworkspace.app.goo.gl/ZJg9',
  sapBusinessOne: 'https://www.sap.com/products/erp/business-one.html',
  sapS4hana: 'https://www.sap.com/products/erp/s4hana.html',
  sapPartnerEdge: 'https://www.sap.com/partners/partner-edge.html',
  googleCloud: 'https://cloud.google.com/',
  googleWorkspace: 'https://workspace.google.com/',
  proxmox: 'https://www.proxmox.com/en/',
  sapPartnerEdgeTerms: 'SAP',
} as const;

export const routes = {
  home: '/',
  about: '/about',
  solutions: '/solutions',
  services: '/services',
  insights: '/insights',
  contact: '/contact',
  googleWorkspace: '/google-workspace',
  terms: '/terms',
  privacy: '/privacy',
} as const;

export type RouteKey = keyof typeof routes;

/* ------------------------------------------------------------------ */
/* Navigation                                                         */
/* ------------------------------------------------------------------ */

export type NavChild = {
  label: string;
  description: string;
  /** In-page anchor on the target route, or a real path. */
  to: string;
};

export type NavGroup = {
  label: string;
  /** Mega-menu column heading; absent groups render as a flat list. */
  heading?: string;
  /** The "All <label>" destination shown in the mega panel footer. */
  indexPath: string;
  items: NavChild[];
};

export const primaryNav: NavGroup[] = [
  {
    label: 'Solutions',
    heading: 'Systems we build and run',
    indexPath: '/solutions',
    items: [
      {
        label: 'ERP applications',
        description: 'SAP Business One and S/4HANA Public Cloud',
        to: '/solutions#erp',
      },
      {
        label: 'Companion applications',
        description: 'Add-ons that extend your ERP into the process',
        to: '/solutions#applications',
      },
      {
        label: 'Infrastructure & cloud',
        description: 'Private cloud, servers, networks, storage, security',
        to: '/solutions#infrastructure',
      },
      {
        label: 'Automation',
        description: 'Workflow automation, integration, generative AI',
        to: '/solutions#automation',
      },
      {
        label: 'Google Workspace',
        description: 'Productivity suite for collaborating teams',
        to: '/google-workspace',
      },
    ],
  },
  {
    label: 'Services',
    heading: 'How we engage',
    indexPath: '/services',
    items: [
      {
        label: 'ERP consultancy',
        description: 'Evaluation, selection and implementation',
        to: '/services#discover',
      },
      {
        label: 'Strategic consultancy',
        description: 'Finance, supply chain, marketing, operations',
        to: '/services#discover',
      },
      {
        label: 'Custom development',
        description: 'Add-ons and companion applications',
        to: '/services#implement',
      },
      {
        label: 'Project management',
        description: 'Budget, timeline and scope discipline',
        to: '/services#implement',
      },
      {
        label: 'Resource allocation',
        description: 'Flexible expert capacity and billing',
        to: '/services#improve',
      },
    ],
  },
  {
    label: 'Company',
    indexPath: '/about',
    items: [
      { label: 'About', description: 'Who we are and how we work', to: '/about' },
      { label: 'Vision & mission', description: 'What we are here to do', to: '/about#vision' },
      { label: 'Partnerships', description: 'Technology ecosystem', to: '/about#partnerships' },
      { label: 'Insights', description: 'Notes from the Axleta blog', to: '/insights' },
      { label: 'Contact', description: 'Start a conversation', to: '/contact' },
    ],
  },
];

/** Flat list used by the mobile panel and the footer. */
export const mobileNav = [
  { label: 'Solutions', to: '/solutions' },
  { label: 'Services', to: '/services' },
  { label: 'About', to: '/about' },
  { label: 'Insights', to: '/insights' },
  { label: 'Contact', to: '/contact' },
] as const;

export const footerNav = [
  {
    heading: 'Solutions',
    links: [
      { label: 'ERP applications', to: '/solutions#erp' },
      { label: 'Companion applications', to: '/solutions#applications' },
      { label: 'Infrastructure & cloud', to: '/solutions#infrastructure' },
      { label: 'Automation', to: '/solutions#automation' },
      { label: 'Google Workspace', to: '/google-workspace' },
    ],
  },
  {
    heading: 'Services',
    links: [
      { label: 'ERP consultancy', to: '/services#discover' },
      { label: 'Strategic consultancy', to: '/services#discover' },
      { label: 'Custom development', to: '/services#implement' },
      { label: 'Project management', to: '/services#implement' },
      { label: 'Resource allocation', to: '/services#improve' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', to: '/about' },
      { label: 'Vision & mission', to: '/about#vision' },
      { label: 'Partnerships', to: '/about#partnerships' },
      { label: 'Insights', to: '/insights' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    heading: 'Elsewhere',
    links: [
      { label: 'Axleta blog', href: 'https://blog.axleta.com/' },
      { label: 'Terms & conditions', to: '/terms' },
      { label: 'Privacy policy', to: '/privacy' },
    ],
  },
] as const;
