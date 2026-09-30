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
import { Link } from 'react-router-dom';
import { company, partners } from '../../data/company';
import { contact, external, footerNav, routes, site } from '../../data/site';
import { track } from '../../lib/analytics';
import { ArrowLink } from '../ui/Button';
import { BackToTop, Wordmark } from '../ui/Chrome';
import { Rule, Shell, Stack } from '../ui/Layout';
import { Eyebrow, Note } from '../ui/Typography';

export function SiteFooter() {
  return (
    <footer data-surface="ink" className="surface-ink">
      <Shell className="py-section-y-tight">
        {/* ---------- Closing invitation ---------- */}
        <div className="grid grid-cols-4 gap-x-6 gap-y-10 md:grid-cols-8 lg:grid-cols-12">
          <div className="col-span-4 md:col-span-8 lg:col-span-5">
            <Eyebrow index="··" tone="ink" live>
              Next step
            </Eyebrow>
            <h2 className="mt-6 max-w-lg text-title font-display font-medium leading-[0.98] tracking-tightest">
              Tell us what you are trying to improve.
            </h2>
            <p className="measure mt-6 leading-loose text-neutral-300">
              {company.positioning} Start with a conversation about the requirement — we will
              work out the fit before anyone talks about a purchase order.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
              <Link
                to={routes.contact}
                onClick={() => track('cta_click', { label: 'footer_discuss' })}
                className="group relative inline-flex h-12 items-center gap-2.5 bg-accent-300 px-6 font-mono text-eyebrow uppercase tracking-label text-ink transition-colors duration-300 hover:bg-paper"
              >
                <span>Discuss requirements</span>
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 ease-[var(--ease-entrance)] group-hover:translate-x-1 motion-reduce:transform-none"
                >
                  →
                </span>
              </Link>
              <a
                href={`mailto:${contact.email}`}
                className="label text-paper underline-offset-4 hover:text-accent-300 hover:underline"
              >
                {contact.email}
              </a>
            </div>
          </div>

          {/* ---------- Site index ---------- */}
          <nav aria-label="Footer" className="col-span-4 md:col-span-8 lg:col-span-6 lg:col-start-7">
            <div className="grid grid-cols-2 gap-x-6 gap-y-9 sm:grid-cols-4">
              {footerNav.map((column) => (
                <div key={column.heading}>
                  <h3 className="label text-accent-300">{column.heading}</h3>
                  <ul className="mt-5 space-y-3">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        {'to' in link ? (
                          <Link
                            to={link.to}
                            className="text-sm text-paper/85 underline-offset-4 transition-colors duration-300 hover:text-accent-300 hover:underline"
                          >
                            {link.label}
                          </Link>
                        ) : (
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => track('external_blog_click', { label: link.label })}
                            className="text-sm text-paper/85 underline-offset-4 transition-colors duration-300 hover:text-accent-300 hover:underline"
                          >
                            {link.label}
                            <span className="sr-only"> (opens in a new tab)</span>
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </nav>
        </div>

        <Rule className="mt-section-y-tight bg-white/12" />

        {/* ---------- Verified facts ---------- */}
        <div className="grid grid-cols-4 gap-x-6 gap-y-10 pt-10 md:grid-cols-8 lg:grid-cols-12">
          <div className="col-span-4 md:col-span-4 lg:col-span-3">
            <Wordmark invert />
            <address className="mt-6 not-italic">
              <Note tone="ink">
                {contact.address.label} · {contact.coverage}
              </Note>
              <p className="mt-3 text-sm leading-relaxed text-paper/80">
                {contact.address.street}
                <br />
                {contact.address.locality}, {contact.address.region} {contact.address.postalCode}
                <br />
                {contact.address.country}
              </p>
            </address>
          </div>

          <div className="col-span-4 md:col-span-4 lg:col-span-3 lg:col-start-5">
            <h3 className="label text-accent-300">Relationships</h3>
            <ul className="mt-5 space-y-4">
              {partners.map((partner) => (
                <li key={partner.id}>
                  <a
                    href={partner.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex flex-col gap-1"
                  >
                    <span className="font-display text-lg tracking-tightest text-paper transition-colors duration-300 group-hover:text-accent-300">
                      {partner.wordmark}
                      <span className="ml-2 font-mono text-micro uppercase tracking-label text-neutral-500">
                        {partner.sublabel}
                      </span>
                    </span>
                    <span className="max-w-xs text-sm leading-relaxed text-paper/70">
                      {partner.statement}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <Note tone="ink" className="mt-5">
              Technology names are the property of their owners.
            </Note>
          </div>

          <div className="col-span-4 md:col-span-4 lg:col-span-4 lg:col-start-9">
            <h3 className="label text-accent-300">Talk to a person</h3>
            <Stack gap="sm" className="mt-5">
              <a
                href={`mailto:${contact.email}`}
                className="font-display text-lg tracking-tightest text-paper underline-offset-4 hover:text-accent-300 hover:underline"
              >
                {contact.email}
              </a>
              <a
                href={contact.whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-display text-lg tracking-tightest text-paper underline-offset-4 hover:text-accent-300 hover:underline"
                onClick={() => track('cta_click', { label: 'footer_whatsapp' })}
              >
                WhatsApp {contact.whatsapp.display}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </Stack>
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3">
              <ArrowLink to={routes.terms} tone="ink">
                Terms
              </ArrowLink>
              <ArrowLink to={routes.privacy} tone="ink">
                Privacy
              </ArrowLink>
              <ArrowLink to={external.blog} tone="ink" external onClick={() => track('external_blog_click', { label: 'footer_blog' })}>
                Blog
              </ArrowLink>
            </div>
          </div>
        </div>

        <Rule className="mt-12 bg-white/12" />

        {/* ---------- Colophon ---------- */}
        <div className="flex flex-col gap-5 pt-8 sm:flex-row sm:items-end sm:justify-between">
          <p className="label text-neutral-500">
            © {site.copyrightRange} {site.legalName}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
            <Note tone="ink">
              {site.tagline}
            </Note>
            <BackToTop />
          </div>
        </div>
      </Shell>
    </footer>
  );
}