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
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { prefersReducedMotion } from '../../lib/motionPolicy';

export function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({
          // 'instant', not 'auto': index.css sets `scroll-behavior: smooth`,
          // and 'auto' defers to that, which would animate the jump even for a
          // visitor who asked for reduced motion.
          behavior: prefersReducedMotion() ? 'instant' : 'smooth',
          block: 'start',
        });
        // Give the target focus without adding a permanent tab stop.
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
        return;
      }
    }

    // A route change is a new document, not an in-page move: snap to the top.
    // Smooth-scrolling thousands of pixels looks like the site losing its place.
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, hash]);

  useEffect(() => {
    if (hash) return;
    const main = document.getElementById('main');
    if (!main) return;
    // `main` is not focusable as authored, so this would silently do nothing and
    // strand keyboard focus in the header. -1 makes it programmatically
    // focusable without adding it to the tab order.
    main.setAttribute('tabindex', '-1');
    main.focus({ preventScroll: true });
  }, [pathname, hash]);

  return null;
}