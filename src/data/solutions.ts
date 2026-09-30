/**
 * Solution portfolio.
 *
 * Source of truth: the live /solutions page (verified 2026-09-30) plus the
 * About page partnership statements. Every capability below appears in the
 * current public content. Nothing has been added for marketing effect.
 *
 * Note: the live site lists remote access as "Microsoft Remote Desktop Web
 * Service". TSPlus is NOT published on the live site and is therefore not
 * claimed here — see verificationFlags in ./company.ts.
 */

export type VisualType = 'erp' | 'applications' | 'infrastructure' | 'automation';

export type Solution = {
  id: string;
  number: string;
  title: string;
  /** Monospace architectural label, e.g. "ERP / BUSINESS SYSTEMS". */
  architecturalLabel: string;
  category: string;
  shortDescription: string;
  description: string;
  capabilities: { label: string; detail: string }[];
  visualType: VisualType;
  /** Anchor used by /solutions#id and the footer. */
  anchor: string;
};

export const solutions: Solution[] = [
  {
    id: 'erp',
    number: '01',
    title: 'ERP applications',
    architecturalLabel: 'ERP / BUSINESS SYSTEMS',
    category: 'ERP',
    shortDescription:
      'SAP Business One and SAP S/4HANA Public Cloud, selected against how your business actually operates.',
    description:
      'A business system is only useful when it fits the process around it. We start from how work is really done — quoting, purchasing, stock, production, invoicing — and then choose the platform that carries it. SAP Business One and SAP S/4HANA Public Cloud cover the same core ground; the right choice depends on your scale, your hosting model and how far you intend to take customisation.',
    capabilities: [
      {
        label: 'SAP Business One',
        detail: 'A single system for sales, purchasing, financials, inventory, manufacturing and MRP.',
      },
      {
        label: 'SAP S/4HANA Public Cloud',
        detail: 'The cloud generation of SAP ERP, for businesses that want a managed platform.',
      },
      {
        label: 'Sales',
        detail: 'Quotation through order, pricing, credit control and the pipeline behind it.',
      },
      {
        label: 'Purchasing',
        detail: 'Requisition, purchase orders, approvals, receipts and supplier performance.',
      },
      {
        label: 'Financial management',
        detail: 'Accounting, ledgers, budgeting, period close and reporting.',
      },
      {
        label: 'Banking integration',
        detail: 'Direct data exchange with your bank so statements and payments reconcile without rekeying.',
      },
      {
        label: 'Inventory',
        detail: 'Warehouses, stock transfers, valuation and the physical count behind the number.',
      },
      {
        label: 'Manufacturing & MRP',
        detail: 'Bills of material, work orders, production planning and material requirements.',
      },
    ],
    visualType: 'erp',
    anchor: 'erp',
  },
  {
    id: 'applications',
    number: '02',
    title: 'Companion applications',
    architecturalLabel: 'APPLICATIONS / ADD-ONS',
    category: 'Applications',
    shortDescription:
      'Purpose-built add-ons that extend your ERP into the parts of the process it does not cover on its own.',
    description:
      'Standard ERP coverage stops at a certain point. Everything past it — material handling, technical data, fixed assets, analytics, barcode capture, online payment — is usually where a real business feels the friction. We build those pieces as companion applications that sit alongside the ERP and read from it, rather than forking it.',
    capabilities: [
      {
        label: 'Material management',
        detail: 'A material management system integrated with SAP Business One.',
      },
      {
        label: 'Technical & product development',
        detail: 'Structured technical and product development records tied to items and processes.',
      },
      {
        label: 'Product lifecycle management',
        detail: 'PLM for SAP Business One, keeping product data consistent across the cycle.',
      },
      {
        label: 'Fixed assets',
        detail: 'A fixed assets management system for register, depreciation and disposal.',
      },
      {
        label: 'Sales analytics',
        detail: 'A web application for reporting on sales performance against SAP Business One.',
      },
      {
        label: 'Inventory transfer automation',
        detail: 'Automated stock transfers with the posting handled, not hand-keyed.',
      },
      {
        label: 'Barcode generation & management',
        detail: 'Label and barcode generation and management for SAP Business One.',
      },
      {
        label: 'Online payment & bank integration',
        detail: 'An online payment system wired to your bank.',
      },
    ],
    visualType: 'applications',
    anchor: 'applications',
  },
  {
    id: 'infrastructure',
    number: '03',
    title: 'Technology infrastructure',
    architecturalLabel: 'INFRASTRUCTURE / CLOUD',
    category: 'Infrastructure',
    shortDescription:
      'The foundation everything else runs on — compute, network, storage, security and virtualisation.',
    description:
      'Application work is only as good as the ground it runs on. A client–server architecture is not optional once transactions, processing and reporting are involved, because the server carries a very different load from a workstation. We design, deploy and maintain that layer so the business software above it has something dependable to run on.',
    capabilities: [
      {
        label: 'Private cloud',
        detail: 'Private cloud infrastructure with dedicated servers, built for cost-effective stability.',
      },
      {
        label: 'Dedicated servers',
        detail: 'Dedicated compute for processing, storing and analysing business data.',
      },
      {
        label: 'LAN / WAN networks',
        detail: 'Network and IT infrastructure redesign to raise system performance.',
      },
      {
        label: 'Remote access',
        detail: 'Reach your systems from anywhere using Microsoft Remote Desktop Web Service.',
      },
      {
        label: 'Data storage',
        detail: 'Secure storage over cloud infrastructure, built around integrity, consistency and reliability.',
      },
      {
        label: 'IT security',
        detail: 'Infrastructure and security measures to protect systems and data from vulnerabilities.',
      },
      {
        label: 'Virtualisation',
        detail: 'Virtualised servers and storage on Proxmox, allocating only the resources a service needs.',
      },
    ],
    visualType: 'infrastructure',
    anchor: 'infrastructure',
  },
  {
    id: 'automation',
    number: '04',
    title: 'Automation & integration',
    architecturalLabel: 'AUTOMATION / RPA',
    category: 'Automation',
    shortDescription:
      'Process automation, system integration and applied generative AI — where manual work is genuinely removable.',
    description:
      'Automation is worth doing where the work is repetitive, rule-bound and already proven. That is usually data entry, document handling, reconciliation, and moving information between systems that were never designed to talk. We also work with generative AI, applying it to the processes where it removes effort rather than the ones where it merely sounds impressive.',
    capabilities: [
      {
        label: 'Workflow automation',
        detail: 'Automating the hand-offs and re-keying between systems and teams.',
      },
      {
        label: 'RPA',
        detail: 'Robotic process automation for repetitive, rule-bound back-office work.',
      },
      {
        label: 'System integration',
        detail: 'Connecting ERP, add-ons, banking and infrastructure into one flow of data.',
      },
      {
        label: 'Generative AI',
        detail: 'Applied generative AI for process automation, introduced where it earns its cost.',
      },
    ],
    visualType: 'automation',
    anchor: 'automation',
  },
];

export const solutionById = (id: string) => solutions.find((s) => s.id === id);
