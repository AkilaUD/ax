/**
 * Company record.
 *
 * Founding year, vision, mission, values and partnerships are taken from the
 * live /about-axleta page (verified 2026-09-30). `verificationFlags` records
 * every claim the brief or the legacy site asserted that the live content does
 * not support, so it can be surfaced rather than silently rendered.
 */

export const company = {
  name: 'Axleta',
  founded: 2018,
  descriptor: 'IT service firm supplying technology-driven systems and solutions for SMEs',
  /** One-line positioning used in the header/footer. */
  positioning: 'The systems behind the business, designed and kept running.',
  story: [
    'Axleta was launched in 2018 as an IT service firm supplying technology-driven systems and solutions for SMEs.',
    'The firm was founded to give businesses technological solutions that enable business process advancement. We work with you to build a successful business using technology that suits your business scenario, and we treat that as a partnership — one that keeps your business context current as the technology moves.',
    'We value simplicity and we respect your values. Every engagement is worked through specific, measurable, achievable, realistic and time-bound objectives.',
  ],
  vision: 'Be the technological companion in your business.',
  mission:
    'Find the right technology to suit the requirement, and advance the business function so the business succeeds. Our solutions are chosen for cost-effectiveness and fitness of purpose.',
  /** The current site states a single value. We do not pad it into a list. */
  values: [
    {
      title: 'Simplicity',
      detail:
        'A system that nobody can operate is not a good system. We value simplicity because it is what makes technology usable after we leave.',
    },
    {
      title: 'SMART objectives',
      detail:
        'Specific, measurable, achievable, realistic and time-bound. Ambiguity is expensive to discover late, so we remove it at the start.',
    },
  ],
} as const;

export const timeline = [
  {
    year: '2018',
    title: 'Founded',
    detail: 'Axleta launches as an IT service firm for SMEs, focused on ERP and business systems.',
  },
  {
    year: 'Core',
    title: 'ERP as the centre of gravity',
    detail:
      'SAP Business One and S/4HANA Public Cloud become the backbone of the practice, with companion applications built alongside them.',
  },
  {
    year: 'Ecosystem',
    title: 'Technology ecosystem',
    detail:
      'An official member of the SAP PartnerEdge open ecosystem, and a Google Cloud Partner for Google Cloud Platform and Google productivity products.',
  },
  {
    year: 'Now',
    title: 'Connected practice',
    detail:
      'ERP, infrastructure, automation and support delivered as one connected system — for businesses in Sri Lanka and globally.',
  },
] as const;

export const partners = [
  {
    id: 'sap',
    /** Rendered as type, not a vendor logo. The brief forbids unapproved marks. */
    wordmark: 'SAP',
    sublabel: 'PartnerEdge',
    statement: 'Official member of the SAP® PartnerEdge® open ecosystem.',
    detail:
      'Our ERP practice is built on SAP Business One and SAP S/4HANA Public Cloud, and we hold the expertise and tooling to deliver against them.',
    href: 'https://www.sap.com/partners/partner-edge.html',
    linkLabel: 'About SAP PartnerEdge',
  },
  {
    id: 'google-cloud',
    wordmark: 'Google Cloud',
    sublabel: 'Cloud Platform',
    statement: 'Google Cloud Partner.',
    detail:
      'We introduce and sell products based on the Google Cloud Platform and the Google productivity suite, including Google Workspace.',
    href: 'https://cloud.google.com/',
    linkLabel: 'Visit Google Cloud',
  },
] as const;

/**
 * Claims that exist in the brief or in legacy text but are NOT supported by the
 * live public site. Rendered nowhere; reported in the audit and changelog.
 */
export const verificationFlags: {
  claim: string;
  status: 'unverified' | 'unsupported';
  detail: string;
  resolution: string;
}[] = [
  {
    claim: 'TSPlus partnership',
    status: 'unverified',
    detail:
      'The brief lists TSPlus as an About-page partnership and asks for it in contact-form options. TSPlus appears nowhere on the live axleta.com site; remote access is published as Microsoft Remote Desktop Web Service.',
    resolution:
      'Not rendered as a partnership. Remote access is described using the published Microsoft RDS wording. Needs client confirmation before any TSPlus claim ships.',
  },
  {
    claim: 'Axleta Academy',
    status: 'unsupported',
    detail:
      'Referenced in the live Terms & Conditions and Privacy Policy as an education and training platform. No Academy page, route or product exists on the site.',
    resolution:
      'Legal copy rewritten to describe the consultancy only. Academy references removed pending a decision. Needs client confirmation.',
  },
  {
    claim: 'Client counts, uptime figures, testimonials, case studies',
    status: 'unsupported',
    detail:
      'No statistics, testimonials, named clients or case studies exist anywhere in the current public content.',
    resolution:
      'No numeric claims are made anywhere on the new site. Section 14 of the brief is expressed as evidence-based principles instead.',
  },
  {
    claim: 'Sri Lankan office address',
    status: 'unverified',
    detail:
      'The Services page states support for "SAP Business One Sri Lanka and globally", and the contact number is a +94 number, but no Sri Lankan street address is published.',
    resolution:
      'Only the verified axleta Canada address is rendered, and no map embed is used. Needs client confirmation if an office address should appear.',
  },
  {
    claim: 'Photography',
    status: 'unverified',
    detail:
      'The current site has effectively no photography. Only the logo is a usable brand asset.',
    resolution:
      'Sections are composed from typography, system diagrams and the verified logo. No stock photography has been introduced.',
  },
];

/** Non-numeric principles for the "Why Axleta" section. */
export const principles: { label: string; detail: string; index: string }[] = [
  {
    index: '01',
    label: 'Business before system',
    detail:
      'We map technology to the way your business actually operates. The process sets the requirement; the product answers it.',
  },
  {
    index: '02',
    label: 'Fitness of purpose',
    detail:
      'We focus on practical technology choices that balance fit, cost and long-term maintainability — not on what is newest.',
  },
  {
    index: '03',
    label: 'ERP domain understanding',
    detail:
      'SAP Business One and S/4HANA are not a product we resell. They are platforms we know well enough to configure, extend and support.',
  },
  {
    index: '04',
    label: 'Build, do not bolt on',
    detail:
      'Where the ERP stops short, we build the companion application alongside it — so the data stays in one place and stays correct.',
  },
  {
    index: '05',
    label: 'The foundation counts',
    detail:
      'Infrastructure, network, storage, security and virtualisation are designed in the same conversation as the application.',
  },
  {
    index: '06',
    label: 'Implementation and support',
    detail:
      'Going live is the midpoint. Support, optimisation and the next increment are part of the engagement, not a separate sale.',
  },
  {
    index: '07',
    label: 'Partnership, not resale',
    detail:
      'We work inside your business context and keep it current as the technology moves, rather than handing over and stepping back.',
  },
];
