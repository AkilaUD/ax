import { ArrowLink } from '../ui/Button';
import { Shell } from '../ui/Layout';
import { Eyebrow, Title } from '../ui/Typography';
import { routes } from '../../data/site';

/**
 * Suspense fallback for lazily-loaded routes.
 *
 * Reserves the height of the incoming page so the footer does not jump upward
 * when a chunk resolves, and offers a real link so a failed import is never a
 * dead end.
 */
export function RouteFallback() {
  return (
    <div className="bg-surface py-section-y" role="status" aria-live="polite">
      <Shell>
        <div className="grid grid-cols-4 gap-x-6 md:grid-cols-8 lg:grid-cols-12">
          <div className="col-span-4 md:col-span-6 lg:col-span-7">
            <Eyebrow index="··" live>
              Loading
            </Eyebrow>
            <Title className="mt-6 text-lead">Fetching this page</Title>
            <p className="measure mt-5 leading-loose text-neutral-700">
              If this message stays, the page bundle did not load.{' '}
              <ArrowLink to={routes.home} className="align-baseline">
                Go to the homepage
              </ArrowLink>
            </p>
          </div>
        </div>
      </Shell>
    </div>
  );
}