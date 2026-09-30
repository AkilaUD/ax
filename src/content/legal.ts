/**
 * Legal content.
 *
 * Rewritten for this site rather than copied from the legacy pages. Two
 * reasons, both recorded in the audit:
 *
 *  1. The legacy Terms referenced "Axleta Academy", an education and training
 *     platform with no page, route or product anywhere on the site. Claiming a
 *     product that does not exist is a worse problem than omitting it, so
 *     Academy references are removed pending a client decision.
 *  2. The legacy copy was written as marketing prose rather than as terms. These
 *     are plain-language clauses about this website and about how Axleta handles
 *     an enquiry.
 *
 * These documents describe the website and the enquiry process only. They do
 * not attempt to govern a professional services contract; that is agreed
 * separately between Axleta and a client, and this page says so plainly rather
 * than pretending to cover it.
 *
 * Not legal advice. Axleta should have these reviewed by its own counsel before
 * they are relied upon for anything, which the audit records as an open item.
 */

export type LegalKind = 'terms' | 'privacy';

export type LegalBlock =
  | { type: 'p'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'note'; text: string };

export type LegalSection = {
  id: string;
  number: string;
  heading: string;
  blocks: LegalBlock[];
};

export type LegalDocument = {
  kind: LegalKind;
  title: string;
  eyebrow: string;
  lead: string;
  reviewed: string;
  summary: string[];
  sections: LegalSection[];
};

const terms: LegalDocument = {
  kind: 'terms',
  title: 'Terms & conditions',
  eyebrow: 'Legal',
  reviewed: '2026-09-30',
  lead: 'These terms govern your use of the Axleta website. They are written to be read: if anything here is unclear, ask us and we will explain it.',
  summary: [
    'This website is provided for information. Using it does not create a contract between you and Axleta.',
    'Service engagements — ERP implementations, development, consultancy and support — are governed by a separate written agreement, agreed before work begins.',
    'Content is provided as is. Where we describe a capability, that is a statement about what Axleta publishes it can do, not a guarantee of a particular result in your business.',
    'We may update these terms. The date below tells you when they were last reviewed.',
  ],
  sections: [
    {
      id: 'about-these-terms',
      number: '01',
      heading: 'About these terms',
      blocks: [
        {
          type: 'p',
          text: 'These terms apply to everyone who visits www.axleta.com. By using the site you accept them. If you do not accept them, please do not use the site.',
        },
        {
          type: 'p',
          text: 'Axleta is an IT service firm founded in 2018, supplying technology-driven systems and solutions for SMEs. Axleta can be reached at info@axleta.com or at the axleta Canada address published on the contact page.',
        },
        {
          type: 'note',
          text: 'These terms concern the website itself. They do not create a client relationship, and they do not oblige either of us to enter into one.',
        },
      ],
    },
    {
      id: 'use-of-this-site',
      number: '02',
      heading: 'Use of this site',
      blocks: [
        {
          type: 'p',
          text: 'You may read, print and share this site for your own business purposes.',
        },
        {
          type: 'list',
          items: [
            'Do not attempt to disrupt, overload or gain unauthorised access to the site or its infrastructure.',
            'Do not republish substantial parts of the site as your own, or attempt to pass it off as Axleta content.',
            'Do not use automated systems to scrape the site at a rate that degrades it for other visitors.',
            'Do not submit content that is unlawful, misleading, or that infringes someone else’s rights.',
          ],
        },
        {
          type: 'p',
          text: 'Axleta may update, change or withdraw any part of the site without notice.',
        },
      ],
    },
    {
      id: 'content-and-accuracy',
      number: '03',
      heading: 'Content and accuracy',
      blocks: [
        {
          type: 'p',
          text: 'We take care to keep the information on this site accurate and current. It is written to describe Axleta’s published capabilities honestly, and we do not publish client counts, performance figures or testimonials that we cannot evidence.',
        },
        {
          type: 'p',
          text: 'General information is not advice. Nothing on this site is professional, legal, financial or security advice, and nothing on it should be treated as a recommendation for your specific circumstances. Where a decision matters, ask us directly.',
        },
        {
          type: 'list',
          items: [
            'Product names, platforms and partner names — including SAP, Google Cloud and Google Workspace — belong to their respective owners. Their appearance here does not imply endorsement of this site by them.',
            'Third-party product terms, pricing and availability are set by their owners and may change without notice.',
          ],
        },
        {
          type: 'note',
          text: 'This site publishes no statistics, testimonials, named clients or case studies, because none are supported by verified evidence. If that changes, the change will be stated rather than implied.',
        },
      ],
    },
    {
      id: 'intellectual-property',
      number: '04',
      heading: 'Intellectual property',
      blocks: [
        {
          type: 'p',
          text: 'The Axleta name, logo, site design, copy and diagrams on this site are the property of Axleta unless stated otherwise. You may not reproduce them commercially or claim them as your own without written permission.',
        },
        {
          type: 'p',
          text: 'Articles on the Axleta blog are published by Axleta and remain its property. Where content is attributed to someone else, that attribution governs and you should follow the terms stated with that content.',
        },
      ],
    },
    {
      id: 'external-links',
      number: '05',
      heading: 'External links',
      blocks: [
        {
          type: 'p',
          text: 'This site links to other websites, including blog.axleta.com and vendor sites such as SAP and Google. Those sites are outside Axleta’s control and are governed by their own terms and privacy policies.',
        },
        {
          type: 'p',
          text: 'A link is a recommendation to look, not an endorsement. We link where the destination is genuinely useful; we do not accept payment for links.',
        },
      ],
    },
    {
      id: 'services',
      number: '06',
      heading: 'Services and engagements',
      blocks: [
        {
          type: 'p',
          text: 'The services described on this site — ERP consultancy and implementation, companion application development, project management, infrastructure and cloud, automation and integration, Google Workspace, and SAP Business One support — are offered subject to a separate written agreement between Axleta and the client.',
        },
        {
          type: 'p',
          text: 'That agreement sets the scope, the deliverables, the fees, the responsibilities of each party, and the acceptance criteria. Where it conflicts with anything on this website, the agreement prevails.',
        },
        {
          type: 'note',
          text: 'Remote access is delivered using Microsoft Remote Desktop Web Service, as published. Availability of any platform, integration or feature depends on the vendor and on the client’s own configuration.',
        },
      ],
    },
    {
      id: 'your-content',
      number: '07',
      heading: 'Your content and your rights',
      blocks: [
        {
          type: 'p',
          text: 'If you send us an enquiry, you keep all rights in what you sent. You grant Axleta a limited licence to read and respond to it — nothing more. We do not use your enquiry to add you to a marketing list, and we do not sell or share it for advertising.',
        },
        {
          type: 'p',
          text: 'You are responsible for what you send. Do not send confidential material you are not permitted to share, and do not send personal data about other people unless you are entitled to.',
        },
      ],
    },
    {
      id: 'liability',
      number: '08',
      heading: 'Liability',
      blocks: [
        {
          type: 'p',
          text: 'The site is provided on an “as is” and “as available” basis. To the fullest extent the law allows, Axleta excludes all warranties, express or implied, including any implied warranty of merchantability, fitness for purpose or non-infringement.',
        },
        {
          type: 'p',
          text: 'To the fullest extent the law allows, Axleta is not liable for loss arising from your use of, or reliance on, this site or its content, including business loss, loss of profit, loss of opportunity or loss of data. Nothing in these terms limits liability that cannot lawfully be limited.',
        },
      ],
    },
    {
      id: 'changes',
      number: '09',
      heading: 'Changes to these terms',
      blocks: [
        {
          type: 'p',
          text: 'These terms may change. The version published here at the time you use the site is the version that applies to you. Material changes will be reflected in the “last reviewed” date at the top of this page.',
        },
        {
          type: 'p',
          text: 'Continuing to use the site after a change means you accept the updated terms.',
        },
      ],
    },
    {
      id: 'contact',
      number: '10',
      heading: 'Contact',
      blocks: [
        {
          type: 'p',
          text: 'Questions about these terms, or anything else on this site, can go to info@axleta.com. If you would rather talk it through, use the contact form or WhatsApp — both are published on the contact page.',
        },
        {
          type: 'note',
          text: 'These terms should be reviewed by Axleta’s own legal counsel before they are relied upon. That review is an open item recorded in the project audit, not something this site asserts as done.',
        },
      ],
    },
  ],
};

const privacy: LegalDocument = {
  kind: 'privacy',
  title: 'Privacy policy',
  eyebrow: 'Legal',
  reviewed: '2026-09-30',
  lead: 'What this site collects, what it does not, and why. The short version: it collects almost nothing, and you can ask us to delete what it does.',
  summary: [
    'This site runs no analytics by default and sets no advertising or tracking cookies.',
    'There is no account to create, and no third-party form service or advertising network embedded in the site.',
    'If you contact us, we keep your enquiry so we can reply — and nothing else.',
    'This policy covers this website. It does not cover the third-party services we link to, which have their own policies.',
  ],
  sections: [
    {
      id: 'scope',
      number: '01',
      heading: 'What this policy covers',
      blocks: [
        {
          type: 'p',
          text: 'This policy explains how Axleta handles personal information in connection with www.axleta.com — the website itself, its enquiry form, and any analytics that may be enabled.',
        },
        {
          type: 'p',
          text: 'It does not cover information handled inside a client engagement. Data Axleta processes on a client’s systems under a written agreement is governed by that agreement, not by this page.',
        },
        {
          type: 'note',
          text: 'This policy describes the site as built. If analytics or a form endpoint is configured for a deployment, the deployment owner is responsible for updating this page to match.',
        },
      ],
    },
    {
      id: 'what-we-collect',
      number: '02',
      heading: 'What this site collects',
      blocks: [
        {
          type: 'p',
          text: 'By default this site collects no personal information about you. There is no tracking pixel, no advertising identifier, no behavioural profiling and no third-party analytics script.',
        },
        {
          type: 'p',
          text: 'If you choose to contact us, the site collects exactly what you type into the form:',
        },
        {
          type: 'list',
          items: [
            'Your name.',
            'Your email address, so we can reply.',
            'Your organisation, if you provide one.',
            'Your country, if you provide one.',
            'The area your enquiry is about.',
            'Your message.',
          ],
        },
        {
          type: 'p',
          text: 'Fields marked as required are validated in your browser so you are told immediately if something is missing. Nothing is sent anywhere until you submit the form yourself.',
        },
      ],
    },
    {
      id: 'cookies',
      number: '03',
      heading: 'Cookies and local storage',
      blocks: [
        {
          type: 'p',
          text: 'This site sets no cookies of its own. It uses browser local storage only for presentational preferences such as your motion-mode choice, which never leave your device and are cleared when you clear site data.',
        },
        {
          type: 'p',
          text: 'If a deployment enables an analytics provider, that provider may set its own cookies or use its own storage. In that case this section must be updated to name the provider and explain it before the deployment goes live.',
        },
      ],
    },
    {
      id: 'why',
      number: '04',
      heading: 'Why we use what you send',
      blocks: [
        {
          type: 'p',
          text: 'An enquiry is used for one purpose: to answer it. That means reading your requirement, replying to you, and keeping a record of the conversation for as long as the enquiry is live.',
        },
        {
          type: 'p',
          text: 'We do not add you to a marketing list, we do not sell or share your enquiry with advertisers, and we do not use it to train models.',
        },
      ],
    },
    {
      id: 'sharing',
      number: '05',
      heading: 'Who else sees it',
      blocks: [
        {
          type: 'p',
          text: 'Axleta does not share personal information with third parties for their own purposes. We disclose it only where the law requires it, or where the hosting provider processes it on our instructions to deliver the site.',
        },
        {
          type: 'list',
          items: [
            'Our hosting provider, which stores and serves the site files and processes enquiry submissions on our behalf.',
            'Public authorities, where disclosure is required by law.',
            'A professional adviser or successor, if that is necessary to comply with an obligation or in connection with a genuine business transfer.',
          ],
        },
        {
          type: 'note',
          text: 'If you follow a link to another site — our blog, SAP, Google or anywhere else — that site’s own privacy policy applies from the moment you leave this one.',
        },
      ],
    },
    {
      id: 'retention',
      number: '06',
      heading: 'How long we keep it',
      blocks: [
        {
          type: 'p',
          text: 'Enquiries are kept while the conversation is live and for a reasonable period afterwards so we can pick up where we left off. Once an enquiry is closed and has no ongoing purpose, it is deleted.',
        },
        {
          type: 'p',
          text: 'Records that we are legally required to keep are kept for as long as that requirement applies, and are not used for anything else.',
        },
      ],
    },
    {
      id: 'your-rights',
      number: '07',
      heading: 'Your rights',
      blocks: [
        {
          type: 'p',
          text: 'You can ask to see the personal information we hold about you, ask us to correct it, ask us to delete it, or object to how we are using it. Email info@axleta.com and we will deal with the request.',
        },
        {
          type: 'p',
          text: 'We will respond to a request within the timeframe the applicable law requires, and we will tell you if we need more information from you to act on it.',
        },
        {
          type: 'note',
          text: 'This is a plain-language summary published on the website. Where the law requires a fuller formal notice, that obligation is handled separately and this page does not pretend to replace it.',
        },
      ],
    },
    {
      id: 'security',
      number: '08',
      heading: 'Security',
      blocks: [
        {
          type: 'p',
          text: 'The site is served over HTTPS. We keep the amount of personal data we hold deliberately small, because the less we hold, the less there is to lose.',
        },
        {
          type: 'p',
          text: 'No system is perfectly secure. Please do not send us passwords, authentication secrets or payment card details through the contact form — we will never ask you to.',
        },
      ],
    },
    {
      id: 'changes-to-this-policy',
      number: '09',
      heading: 'Changes to this policy',
      blocks: [
        {
          type: 'p',
          text: 'This policy may change. The version published here at the time you use the site is the version that applies to you, and the “last reviewed” date at the top of this page tells you when it last changed.',
        },
      ],
    },
    {
      id: 'contact-privacy',
      number: '10',
      heading: 'Contact',
      blocks: [
        {
          type: 'p',
          text: 'Privacy questions and rights requests go to info@axleta.com. Write “Privacy request” in the subject line so it reaches the right person quickly.',
        },
      ],
    },
  ],
};

export const legalDocuments: Record<LegalKind, LegalDocument> = {
  terms,
  privacy,
};