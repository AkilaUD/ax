/**
 * Analytics abstraction.
 *
 * Ships inert. No analytics vendor is loaded and no tracking script is
 * injected by default — §56 of the brief forbids invasive tracking. A provider
 * only activates if VITE_ANALYTICS_PROVIDER is set at build time, and even then
 * the script is injected lazily and consent-gated upstream.
 *
 * Supported events mirror the brief: cta_click, contact_form_start,
 * contact_form_submit, solution_view, service_view, insight_click,
 * external_blog_click.
 */

import { isBrowser } from './utils';

export type AnalyticsEvent =
  | 'cta_click'
  | 'contact_form_start'
  | 'contact_form_submit'
  | 'contact_form_error'
  | 'solution_view'
  | 'service_view'
  | 'insight_click'
  | 'external_blog_click';

type Provider = 'none' | 'ga4' | 'plausible';

const provider = (import.meta.env.VITE_ANALYTICS_PROVIDER ?? 'none') as Provider;

const MEASUREMENT_ID = import.meta.env.VITE_ANALYTICS_ID ?? '';

type PlausibleWindow = Window & {
  plausible?: (event: string, options?: { props?: Record<string, string> }) => void;
};

type GtagWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
};

let scriptInjected = false;

function injectProviderScript(): void {
  if (!isBrowser || scriptInjected || provider === 'none') return;
  scriptInjected = true;

  if (provider === 'plausible') {
    const script = document.createElement('script');
    script.defer = true;
    script.dataset.domain = MEASUREMENT_ID;
    script.src = 'https://plausible.io/js/script.js';
    document.head.append(script);
    return;
  }

  if (provider === 'ga4') {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
    document.head.append(script);
    const w = window as GtagWindow;
    w.dataLayer = w.dataLayer ?? [];
    w.gtag = w.gtag ?? function gtag(...args: unknown[]) {
      w.dataLayer?.push(args);
    };
    w.gtag('js', new Date());
    w.gtag('config', MEASUREMENT_ID, { send_page_view: false });
  }
}

export function initAnalytics(): void {
  injectProviderScript();
}

export function track(
  event: AnalyticsEvent,
  props: Record<string, string | number | undefined> = {},
): void {
  if (!isBrowser || provider === 'none') return;
  const clean: Record<string, string> = {};
  for (const [key, value] of Object.entries(props)) {
    if (value !== undefined && value !== '') clean[key] = String(value);
  }

  if (provider === 'plausible') {
    (window as PlausibleWindow).plausible?.(event, { props: clean });
    return;
  }

  if (provider === 'ga4') {
    (window as GtagWindow).gtag?.('event', event, clean);
  }
}
