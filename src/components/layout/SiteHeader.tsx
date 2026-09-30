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
import { AnimatePresence, motion } from 'motion/react';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { contact, primaryNav, routes } from '../../data/site';
import { duration, ease, spring } from '../../lib/motion';
import { track } from '../../lib/analytics';
import { cn } from '../../lib/utils';
import { useBodyScrollLock, useCanHover, useIsDesktop } from '../../hooks/useMediaQuery';
import { useScrolled } from '../../hooks/useScrollState';
import { usePrefersReducedMotion } from '../../hooks/useMotionMode';
import { ArrowLink, ButtonLink } from '../ui/Button';
import { Shell } from '../ui/Layout';
import { StatusDot, Wordmark } from '../ui/Chrome';

export function SiteHeader() {
  const location = useLocation();
  const scrolled = useScrolled(24);
  const isDesktop = useIsDesktop();
  const canHover = useCanHover();
  const reduced = usePrefersReducedMotion();

  const panelId = useId();
  const drawerId = useId();
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);
  const closeTimer = useRef(0);

  const isHome = location.pathname === routes.home;
  const onInk = isHome && !scrolled;

  // Close every menu on navigation.
  //
  // Done during render rather than in an effect: the reset depends on the
  // current location, so comparing against the location the menus were opened
  // at is a state adjustment React performs before painting. An effect would
  // paint one frame with the stale menu open and then cascade a second render.
  const routeKey = `${location.pathname}${location.hash}`;
  const [menuRoute, setMenuRoute] = useState(routeKey);
  if (menuRoute !== routeKey) {
    setMenuRoute(routeKey);
    setOpenGroup(null);
    setDrawerOpen(false);
    setMobileGroup(null);
  }

  useBodyScrollLock(drawerOpen);

  // Escape closes whichever surface is open, from anywhere.
  useEffect(() => {
    if (!openGroup && !drawerOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      if (drawerOpen) setDrawerOpen(false);
      else setOpenGroup(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [openGroup, drawerOpen]);

  const openNow = (label: string) => {
    window.clearTimeout(closeTimer.current);
    setOpenGroup(label);
  };

  // Only arm the hover-intent on devices that actually hover.
  const closeSoon = useCallback(() => {
    if (!canHover) return;
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenGroup(null), 140);
  }, [canHover]);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  const headerSolid = scrolled || !isHome;

  return (
    <header
      data-header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter]',
        'duration-500 ease-[var(--ease-standard)]',
        headerSolid
          ? 'border-b border-border bg-surface/92 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent text-paper',
      )}
    >
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <Shell className="flex h-18 items-center justify-between gap-6">
        <Link
          to={routes.home}
          aria-label="Axleta — home"
          className="shrink-0 rounded-xs"
          onClick={() => track('cta_click', { label: 'header_logo' })}
        >
          <Wordmark priority />
        </Link>

        {/* ---------- Desktop navigation ---------- */}
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {primaryNav.map((group) => {
              const isOpen = openGroup === group.label;
              return (
                <li
                  key={group.label}
                  className="relative"
                  onMouseEnter={() => canHover && openNow(group.label)}
                  onMouseLeave={closeSoon}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenGroup(isOpen ? null : group.label)}
                    onFocus={() => openNow(group.label)}
                    className={cn(
                      'label relative flex h-18 items-center gap-2 px-4 transition-colors duration-300',
                      isOpen
                        ? 'text-accent-300'
                        : onInk
                          ? 'text-paper hover:text-accent-300'
                          : 'text-ink hover:text-accent-700',
                    )}
                  >
                    {group.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        'text-[0.5em] transition-transform duration-300',
                        isOpen && 'rotate-45',
                      )}
                    >
                      +
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <span className={cn('label inline-flex items-center gap-2', onInk ? 'text-neutral-300' : 'text-neutral-700')}>
            <StatusDot tone={onInk ? 'ink' : 'paper'} />
            Systems / active
          </span>
          <a
            href={`mailto:${contact.email}`}
            className={cn(
              'label transition-colors duration-300',
              onInk ? 'text-neutral-300 hover:text-accent-300' : 'text-neutral-700 hover:text-accent-700',
            )}
          >
            {contact.email}
          </a>
          <ButtonLink
            to={routes.contact}
            size="sm"
            onClick={() => track('cta_click', { label: 'header_discuss' })}
          >
            Discuss requirements
          </ButtonLink>
        </div>

        {/* ---------- Mobile trigger ---------- */}
        <button
          type="button"
          className={cn(
            'label flex h-11 items-center gap-3 border px-4 lg:hidden',
            onInk
              ? 'border-white/25 text-paper hover:border-accent-300 hover:text-accent-300'
              : 'border-line-strong text-ink',
          )}
          aria-expanded={drawerOpen}
          aria-controls={drawerId}
          onClick={() => setDrawerOpen((v) => !v)}
        >
          <span>{drawerOpen ? 'Close' : 'Menu'}</span>
          <span aria-hidden="true" className="relative block h-3 w-4">
            <span
              className={cn(
                'absolute inset-x-0 h-px bg-current transition-transform duration-300',
                drawerOpen && 'translate-y-1.5 rotate-45',
              )}
            />
            <span
              className={cn(
                'absolute inset-x-0 top-1.5 h-px bg-current transition-transform duration-300',
                drawerOpen && '-translate-y-0 -rotate-45',
              )}
            />
          </span>
        </button>
      </Shell>

      {/* ---------- Desktop mega panel ---------- */}
      <AnimatePresence>
        {isDesktop && openGroup ? (
          <MegaPanel
            id={panelId}
            group={primaryNav.find((g) => g.label === openGroup)}
            onEnter={() => openNow(openGroup)}
            onLeave={closeSoon}
            reduced={reduced}
          />
        ) : null}
      </AnimatePresence>

      {/* ---------- Mobile drawer ---------- */}
      <AnimatePresence>
        {drawerOpen ? (
          <MobileDrawer
            id={drawerId}
            openGroup={mobileGroup}
            onToggleGroup={setMobileGroup}
            onClose={() => setDrawerOpen(false)}
            reduced={reduced}
          />
        ) : null}
      </AnimatePresence>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* Mega panel                                                          */
/* ------------------------------------------------------------------ */

function MegaPanel({
  id,
  group,
  onEnter,
  onLeave,
  reduced,
}: {
  id: string;
  group: (typeof primaryNav)[number] | undefined;
  onEnter: () => void;
  onLeave: () => void;
  reduced: boolean;
}) {
  if (!group) return null;

  return (
    <motion.div
      id={id}
      role="region"
      aria-label={`${group.label} menu`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: -10 }}
      animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
      exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
      transition={reduced ? { duration: 0.1 } : { duration: duration.base, ease: ease.entrance }}
      className="absolute inset-x-0 top-full hidden origin-top border-b border-border bg-surface shadow-[0_18px_40px_-32px_rgba(17,17,17,0.4)] lg:block"
    >
      <Shell className="py-10">
        <div className="grid grid-cols-12 gap-x-6 gap-y-9">
          <div className="col-span-12 lg:col-span-3">
            <p className="label text-accent-700">{group.heading ?? group.label}</p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-neutral-700">
              {group.label === 'Solutions'
                ? 'Chosen against how your business operates, and kept running afterwards.'
                : group.label === 'Services'
                  ? 'A four-stage engagement model, from requirement analysis to ongoing support.'
                  : 'Who Axleta is, how the practice works, and where it is published.'}
            </p>
            <ArrowLink
              to={group.indexPath}
              className="mt-6"
              onClick={() => track('cta_click', { label: `mega_${group.label.toLowerCase()}` })}
            >
              All {group.label.toLowerCase()}
            </ArrowLink>
          </div>

          <ul className="col-span-12 grid gap-x-6 gap-y-1 sm:grid-cols-2 lg:col-span-9">
            {group.items.map((item, i) => (
              <motion.li
                key={item.to}
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: duration.base, delay: i * 0.035, ease: ease.entrance }}
              >
                <Link
                  to={item.to}
                  className="group flex flex-col gap-1.5 border-l-2 border-transparent py-3 pl-4 transition-colors duration-300 hover:border-accent-700"
                >
                  <span className="flex items-center gap-2 font-display text-lg tracking-tightest">
                    {item.label}
                    <span
                      aria-hidden="true"
                      className="text-accent-700 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100 group-focus-visible:translate-x-1 group-focus-visible:opacity-100"
                    >
                      →
                    </span>
                  </span>
                  <span className="text-sm leading-relaxed text-neutral-700">{item.description}</span>
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>
      </Shell>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Mobile drawer                                                       */
/* ------------------------------------------------------------------ */

function MobileDrawer({
  id,
  openGroup,
  onToggleGroup,
  onClose,
  reduced,
}: {
  id: string;
  openGroup: string | null;
  onToggleGroup: (label: string | null) => void;
  onClose: () => void;
  reduced: boolean;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Focus trap: keep Tab inside the drawer while it is open.
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    const previous = document.activeElement as HTMLElement | null;

    const focusables = () =>
      Array.from(
        panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => el.offsetParent !== null);

    focusables()[0]?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;
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

    panel.addEventListener('keydown', onKey);
    return () => {
      panel.removeEventListener('keydown', onKey);
      previous?.focus?.();
    };
  }, []);

  return (
    <motion.div
      ref={panelRef}
      id={id}
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      initial={reduced ? { opacity: 0 } : { x: '100%' }}
      animate={reduced ? { opacity: 1 } : { x: 0 }}
      exit={reduced ? { opacity: 0 } : { x: '100%' }}
      transition={reduced ? { duration: 0.12 } : spring.panel}
      className="fixed inset-x-0 bottom-0 top-18 z-40 overflow-y-auto overscroll-contain border-t border-border bg-surface lg:hidden"
    >
      <nav aria-label="Mobile" className="px-gutter pb-24 pt-4">
        <ul>
          {primaryNav.map((group) => {
            const isOpen = openGroup === group.label;
            return (
              <li key={group.label} className="border-b border-border">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`${id}-${group.label}`}
                  onClick={() => onToggleGroup(isOpen ? null : group.label)}
                  className="label flex w-full items-center justify-between py-6 text-left text-ink"
                >
                  {group.label}
                  <span
                    aria-hidden="true"
                    className={cn('text-base transition-transform duration-300', isOpen && 'rotate-45')}
                  >
                    +
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.ul
                      id={`${id}-${group.label}`}
                      initial={reduced ? { height: 'auto', opacity: 0 } : { height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      transition={{ duration: duration.base, ease: ease.standard }}
                      className="overflow-hidden"
                    >
                      {group.items.map((item) => (
                        <li key={item.to} className="pb-1">
                          <Link
                            to={item.to}
                            onClick={onClose}
                            className="block py-3 pl-4 text-lg tracking-tightest transition-colors duration-300 hover:text-accent-700"
                          >
                            {item.label}
                            <span className="mt-1 block text-sm text-neutral-700">
                              {item.description}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </motion.ul>
                  ) : null}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>

        <div className="mt-10 space-y-5">
          <ButtonLink to={routes.contact} size="lg" className="w-full" onClick={onClose}>
            Discuss requirements
          </ButtonLink>
          <a href={`mailto:${contact.email}`} className="label block text-neutral-700">
            {contact.email}
          </a>
        </div>
      </nav>
    </motion.div>
  );
}
