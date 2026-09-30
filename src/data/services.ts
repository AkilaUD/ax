/**
 * Service model.
 *
 * The live /services page publishes five service items. They are preserved
 * verbatim in intent and mapped onto a four-stage engagement model rather than
 * deleted, as the brief requires. `sourceService` records which published item
 * each entry descends from so nothing goes missing in review.
 */

export type ServiceStageId = 'discover' | 'design' | 'implement' | 'improve';

export type Service = {
  title: string;
  detail: string;
  /** The published service item this entry maps from. */
  sourceService: string;
};

export type ServiceStage = {
  id: ServiceStageId;
  number: string;
  title: string;
  architecturalLabel: string;
  summary: string;
  services: Service[];
  /** The practical output a client can expect at the end of the stage. */
  output: string;
};

export const serviceStages: ServiceStage[] = [
  {
    id: 'discover',
    number: '01',
    title: 'Discover',
    architecturalLabel: 'REQUIREMENT / ANALYSIS',
    summary:
      'Before we propose anything, we work out what the requirement actually is. Not the one that was asked for aloud — the one the process needs.',
    services: [
      {
        title: 'Requirement analysis',
        detail:
          'We analyse the requirement before supplying the service, to identify exactly what is needed and map the solution to fit the purpose.',
        sourceService: 'Requirement analysis before solution delivery',
      },
      {
        title: 'ERP consultancy',
        detail:
          'We help you choose the right ERP. We supply and support SAP Business One, and we evaluate other ERPs on their merits — for businesses in Sri Lanka and globally.',
        sourceService: 'ERP Consultancy',
      },
      {
        title: 'Strategic consultancy',
        detail:
          'Advisory across finance, marketing, supply chain management and operations management, aimed at an optimised business strategy.',
        sourceService: 'Strategic Consultancy',
      },
    ],
    output: 'A written requirement and a recommended route, with the trade-offs stated.',
  },
  {
    id: 'design',
    number: '02',
    title: 'Design',
    architecturalLabel: 'ARCHITECTURE / MAPPING',
    summary:
      'The right technology mapped onto the way the business operates — architecture before purchase order.',
    services: [
      {
        title: 'Technology selection',
        detail:
          'Platform, infrastructure and integration choices justified against fitness of purpose, cost and long-term maintainability rather than novelty.',
        sourceService: 'Strategic Consultancy',
      },
      {
        title: 'Solution architecture',
        detail:
          'How the ERP, its companion applications, the infrastructure beneath it and the automation between them fit together.',
        sourceService: 'Requirement analysis before solution delivery',
      },
      {
        title: 'Scope and specification',
        detail:
          'Specific, measurable, achievable, realistic and time-bound — the SMART objectives we work to on every engagement.',
        sourceService: 'Requirement analysis before solution delivery',
      },
    ],
    output: 'A scoped specification, a sequence, and a plan that fits the budget and the deadline.',
  },
  {
    id: 'implement',
    number: '03',
    title: 'Implement',
    architecturalLabel: 'DELIVERY / BUILD',
    summary:
      'Configuration, development, integration and deployment — carried by a team that has done ERP implementations and other IT projects across industries.',
    services: [
      {
        title: 'Customised add-on development',
        detail:
          'Our development team listens to the requirement and builds precise, feasible add-ons around your ERP rather than bending it.',
        sourceService: 'Customized Add-on Developments',
      },
      {
        title: 'ERP implementation',
        detail: 'Configuration, data migration, integration and deployment of the selected ERP platform.',
        sourceService: 'ERP Consultancy',
      },
      {
        title: 'Project management',
        detail:
          'A flexible implementation model dedicated to meeting your requirements within budget and deadlines, including for the challenges that arise along the way.',
        sourceService: 'Project Management Services',
      },
    ],
    output: 'A running system, integrated where it needs to be, with the handover documented.',
  },
  {
    id: 'improve',
    number: '04',
    title: 'Improve',
    architecturalLabel: 'SUPPORT / ADVANCE',
    summary:
      'Systems do not stay still. Neither do we — support, optimisation and the next increment of improvement.',
    services: [
      {
        title: 'SAP Business One support',
        detail:
          'Ongoing support for businesses running SAP Business One, wherever they are.',
        sourceService: 'ERP Consultancy',
      },
      {
        title: 'Resource allocation',
        detail:
          'Flexible access to our team of experts, with flexible billing, to manage the internal demands of your business.',
        sourceService: 'Resource Allocation',
      },
      {
        title: 'Infrastructure care',
        detail:
          'Maintenance, security and virtualisation management keeping the foundation dependable.',
        sourceService: 'ERP Consultancy',
      },
    ],
    output: 'A maintained system and a team already familiar with it — no re-briefing required.',
  },
];

/** The published service items, for the coverage check in the changelog. */
export const publishedServiceItems = [
  'Resource Allocation',
  'Strategic Consultancy',
  'Customized Add-on Developments',
  'Project Management Services',
  'ERP Consultancy',
] as const;

/** Engagement principles, all traceable to the live /services page. */
export const engagementPrinciples: { label: string; detail: string }[] = [
  {
    label: 'Requirement first',
    detail:
      'Requirement analysis runs before delivery, so the solution maps to the purpose rather than to the request.',
  },
  {
    label: 'Cost and time effectiveness',
    detail:
      'Scope is built to be thorough without being inflated — thorough on cost and time, whichever level of business you are.',
  },
  {
    label: 'Flexible resource support',
    detail:
      'Engagement scales with demand, under a flexible billing arrangement rather than a fixed retainer you do not need.',
  },
  {
    label: 'Practical pricing',
    detail: 'Our services are available at a price that works for the business buying them.',
  },
];
