/**
 * Route table and app shell.
 *
 * `internalPages` is the prerender manifest: every route listed here is
 * rendered to static HTML by scripts/prerender.tsx, so crawlers and no-JS
 * visitors receive real content instead of an empty #root.
 *
 * Route transitions use a key on <Routes> so AnimatePresence can run the exit
 * before the next page enters. The key is the pathname only — a change of hash
 * (an in-page anchor) must not remount the page and lose scroll position.
 */
import { Suspense, lazy, type ComponentType, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { usePrefersReducedMotion } from './hooks/useMotionMode';
import { duration, ease, variants } from './lib/motion';
import { SiteFooter } from './components/layout/SiteFooter';
import { SiteHeader } from './components/layout/SiteHeader';
import { RouteFallback } from './components/layout/RouteFallback';
import { ScrollManager } from './components/layout/ScrollManager';
import HomePage from './pages/HomePage';

const AboutPage = lazy(() => import('./pages/AboutPage'));
const SolutionsPage = lazy(() => import('./pages/SolutionsPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const InsightsPage = lazy(() => import('./pages/InsightsPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const GoogleWorkspacePage = lazy(() => import('./pages/GoogleWorkspacePage'));
const LegalPage = lazy(() => import('./pages/LegalPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

/** Routes prerendered at build time, keyed by the `meta` registry in seo.ts. */
export const internalPages = [
  { path: '/', key: 'home' },
  { path: '/about', key: 'about' },
  { path: '/solutions', key: 'solutions' },
  { path: '/services', key: 'services' },
  { path: '/insights', key: 'insights' },
  { path: '/contact', key: 'contact' },
  { path: '/google-workspace', key: 'googleWorkspace' },
  { path: '/terms', key: 'terms' },
  { path: '/privacy', key: 'privacy' },
  { path: '/404', key: 'notFound' },
] as const;

/** Route transitions. Never longer than a beat — the user must not wait. */
export function PageTransition({ children }: { children: ReactNode }) {
  const reduced = usePrefersReducedMotion();
  const variant = reduced ? variants.pageStatic : variants.page;
  const MotionDiv = motion.div;

  return (
    <MotionDiv
      initial={variant.initial}
      animate={variant.enter}
      exit={variant.exit}
      transition={{ duration: reduced ? duration.fast : duration.route, ease: ease.entrance }}
    >
      {children}
    </MotionDiv>
  );
}

/**
 * Suspense boundary for a lazily-loaded page. A chunk failure surfaces the
 * fallback with a working link home rather than a blank screen.
 */
function PageBoundary({ children }: { children: ReactNode }) {
  return <Suspense fallback={<RouteFallback />}>{children}</Suspense>;
}

const lazyPage = (Component: ComponentType): ComponentType => () => (
  <PageBoundary>
    <PageTransition>
      <Component />
    </PageTransition>
  </PageBoundary>
);

const About = lazyPage(AboutPage);
const Solutions = lazyPage(SolutionsPage);
const Services = lazyPage(ServicesPage);
const Insights = lazyPage(InsightsPage);
const Contact = lazyPage(ContactPage);
const GoogleWorkspace = lazyPage(GoogleWorkspacePage);
const NotFound = lazyPage(NotFoundPage);

function Terms() {
  return (
    <PageBoundary>
      <PageTransition>
        <LegalPage kind="terms" />
      </PageTransition>
    </PageBoundary>
  );
}

function Privacy() {
  return (
    <PageBoundary>
      <PageTransition>
        <LegalPage kind="privacy" />
      </PageTransition>
    </PageBoundary>
  );
}

/**
 * The chrome every route sits inside: header, main landmark, footer.
 *
 * Exported because scripts/prerender.tsx renders the same tree. Sharing the
 * component is the only way the static HTML can carry the real navigation and
 * landmarks instead of a bare page fragment — a no-JS visitor gets the same
 * menu a JS visitor gets, and crawlers see one coherent document.
 */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <ScrollManager />
      <SiteHeader />
      <main id="main" className="flex-1">
        <AnimatePresence mode="wait" initial={false}>
          {children}
        </AnimatePresence>
      </main>
      <SiteFooter />
    </div>
  );
}

export function App() {
  const location = useLocation();

  return (
    <PageShell>
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <HomePage />
            </PageTransition>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/services" element={<Services />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/google-workspace" element={<GoogleWorkspace />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </PageShell>
  );
}