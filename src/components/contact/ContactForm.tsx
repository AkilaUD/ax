/**
 * Contact form.
 *
 * Submission contract:
 *  - If `VITE_CONTACT_ENDPOINT` is set at build time, the form POSTs JSON there.
 *    A 2xx response is treated as success; anything else is a failure and the
 *    user is told so, with the mailto fallback offered.
 *  - If the endpoint is *not* configured, the form does not pretend to submit.
 *    It renders an explicit unconfigured notice and offers a pre-filled mailto
 *    link containing everything the visitor typed. This is the only honest
 *    option without a backend.
 *  - There is no third-party form service, no hidden field honeypot-only spam
 *    trap, and no client-side "success" that is not backed by a response.
 *
 * Accessibility:
 *  - Every field has a real `<label>`; errors are announced through a live
 *    region and tied to fields with `aria-describedby` / `aria-invalid`.
 *  - Validation runs on submit and on blur after the first failed attempt, so a
 *    visitor is not corrected while still typing their first field.
 *  - The status region is `role="status"` with `aria-live="polite"`.
 */
import { useId, useMemo, useRef, useState, type FormEvent } from 'react';
import { contact } from '../../data/site';
import { track } from '../../lib/analytics';
import { cn } from '../../lib/utils';
import { Button } from '../ui/Button';
import { Note } from '../ui/Typography';

const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined;

export type ContactTopic =
  | 'ERP applications'
  | 'Companion applications'
  | 'Technology infrastructure'
  | 'Automation & integration'
  | 'Google Workspace'
  | 'Something else';

type Fields = {
  name: string;
  email: string;
  organisation: string;
  country: string;
  topic: string;
  message: string;
};

type Errors = Partial<Record<keyof Fields, string>>;

type Status = 'idle' | 'sending' | 'sent' | 'error' | 'unconfigured';

const EMPTY: Fields = {
  name: '',
  email: '',
  organisation: '',
  country: '',
  topic: '',
  message: '',
};

const TOPICS: ContactTopic[] = [
  'ERP applications',
  'Companion applications',
  'Technology infrastructure',
  'Automation & integration',
  'Google Workspace',
  'Something else',
];

const INPUT =
  'w-full border border-line-strong bg-white px-4 py-3 text-body text-ink outline-none ' +
  'transition-colors duration-300 placeholder:text-neutral-300 ' +
  'focus:border-accent-600 focus-visible:outline-2 focus-visible:outline-offset-2 ' +
  'focus-visible:outline-accent-600';

function validate(fields: Fields): Errors {
  const errors: Errors = {};
  if (!fields.name.trim()) errors.name = 'Please tell us your name.';
  if (!fields.email.trim()) {
    errors.email = 'We need an email address to reply to.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(fields.email.trim())) {
    errors.email = 'That does not look like a valid email address.';
  }
  if (!fields.topic) errors.topic = 'Please choose what this is about.';
  if (fields.message.trim().length < 12) {
    errors.message = 'A sentence or two about the requirement helps us reply usefully.';
  }
  return errors;
}

/** Builds a mailto: link carrying everything the visitor typed. */
function mailtoFor(fields: Fields): string {
  const subject = `Axleta enquiry — ${fields.topic || 'General'}`;
  const body = [
    `Name: ${fields.name}`,
    `Email: ${fields.email}`,
    `Organisation: ${fields.organisation || '—'}`,
    `Country: ${fields.country || '—'}`,
    `Area: ${fields.topic || '—'}`,
    '',
    fields.message,
  ].join('\n');

  return `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function ContactForm({ preselectTopic }: { preselectTopic?: string }) {
  const formId = useId();
  const [fields, setFields] = useState<Fields>({
    ...EMPTY,
    topic: preselectTopic && TOPICS.includes(preselectTopic as ContactTopic) ? preselectTopic : '',
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>(() => (ENDPOINT ? 'idle' : 'unconfigured'));
  const [serverMessage, setServerMessage] = useState('');
  const touchedAttempt = useRef(false);
  const started = useRef(false);

  const mailto = useMemo(() => mailtoFor(fields), [fields]);

  const update = (key: keyof Fields) => (value: string) => {
    setFields((current) => ({ ...current, [key]: value }));
    if (touchedAttempt.current) {
      // Re-validate only the field that changed, once a submit has happened.
      setErrors((current) => {
        const next = { ...current };
        const single = validate({ ...fields, [key]: value });
        if (single[key]) next[key] = single[key];
        else delete next[key];
        return next;
      });
    }
    if (!started.current && key === 'name' && value.trim()) {
      started.current = true;
      track('contact_form_start');
    }
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    touchedAttempt.current = true;

    const found = validate(fields);
    setErrors(found);

    const firstError = Object.keys(found)[0];
    if (firstError) {
      const el = document.getElementById(`${formId}-${firstError}`);
      el?.focus();
      return;
    }

    if (!ENDPOINT) {
      setStatus('unconfigured');
      return;
    }

    setStatus('sending');
    setServerMessage('');

    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'content-type': 'application/json', accept: 'application/json' },
        body: JSON.stringify({ ...fields, source: 'axleta.com' }),
      });

      if (!response.ok) throw new Error(`Endpoint responded ${response.status}`);

      setStatus('sent');
      setFields(EMPTY);
      touchedAttempt.current = false;
      track('contact_form_submit', { topic: fields.topic });
    } catch (error) {
      setStatus('error');
      setServerMessage((error as Error).message);
      track('contact_form_error');
    }
  }

  const field = (key: keyof Fields) => ({
    id: `${formId}-${key}`,
    name: key,
    value: fields[key],
    'aria-invalid': errors[key] ? true : undefined,
    'aria-describedby': errors[key] ? `${formId}-${key}-error` : undefined,
    onChange: (event: { target: { value: string } }) => update(key)(event.target.value),
    onBlur: () => {
      if (!touchedAttempt.current) return;
      setErrors((current) => {
        const single = validate(fields);
        const next = { ...current };
        if (single[key]) next[key] = single[key];
        else delete next[key];
        return next;
      });
    },
  });

  const errorFor = (key: keyof Fields) =>
    errors[key] ? (
      <p id={`${formId}-${key}-error`} className="label mt-2 text-accent-700">
        {errors[key]}
      </p>
    ) : null;

  if (status === 'sent') {
    return (
      <div
        role="status"
        className="border-l-2 border-accent-600 bg-surface-sunken p-8 lg:p-10"
      >
        <p className="label text-accent-700">Message sent</p>
        <h3 className="mt-5 font-display text-3xl font-medium leading-snug tracking-tightest">
          Thank you — that has reached us.
        </h3>
        <p className="measure mt-5 leading-relaxed text-neutral-700">
          We read every enquiry. If your question is time-sensitive, WhatsApp on{' '}
          <a
            href={contact.whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-accent-700"
          >
            {contact.whatsapp.display}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>{' '}
          is faster.
        </p>
        <Button
          className="mt-8"
          variant="secondary"
          onClick={() => {
            setStatus(ENDPOINT ? 'idle' : 'unconfigured');
            setServerMessage('');
          }}
        >
          Send another
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative">
      {/* ---------- Unconfigured notice ---------- */}
      {status === 'unconfigured' ? (
        <div
          role="status"
          className="mb-10 border-l-2 border-accent-600 bg-surface-sunken p-6"
        >
          <p className="label text-accent-700">Form not connected</p>
          <p className="mt-4 max-w-xl leading-relaxed text-neutral-900">
            This form is not yet connected to a submission endpoint, so it cannot
            deliver a message on its own. Everything you type is preserved below —
            send it straight to{' '}
            <a
              href={`mailto:${contact.email}`}
              className="font-medium underline underline-offset-4 hover:text-accent-700"
            >
              {contact.email}
            </a>{' '}
            and we will pick it up.
          </p>
          <a
            href={mailto}
            className="mt-5 inline-flex h-11 items-center gap-2.5 bg-action px-5 font-mono text-eyebrow uppercase tracking-label text-paper transition-colors duration-300 hover:bg-action-hover"
          >
            <span>Open this as an email</span>
            <span aria-hidden="true">→</span>
          </a>
        </div>
      ) : null}

      {/* ---------- Error notice ---------- */}
      {status === 'error' ? (
        <div role="alert" className="mb-10 border-l-2 border-accent-700 bg-surface-sunken p-6">
          <p className="label text-accent-700">Message not sent</p>
          <p className="mt-4 max-w-xl leading-relaxed text-neutral-900">
            Something went wrong{serverMessage ? ` (${serverMessage})` : ''}. Please try
            once more, or email{' '}
            <a
              href={mailto}
              className="font-medium underline underline-offset-4 hover:text-accent-700"
            >
              {contact.email}
            </a>{' '}
            with what you have written.
          </p>
        </div>
      ) : null}

      <div className="grid gap-x-6 gap-y-7 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label htmlFor={`${formId}-name`} className="label block text-ink">
            Your name <span className="text-accent-700">*</span>
          </label>
          <input {...field('name')} type="text" autoComplete="name" className={cn(INPUT, 'mt-2.5')} />
          {errorFor('name')}
        </div>

        <div className="sm:col-span-1">
          <label htmlFor={`${formId}-email`} className="label block text-ink">
            Email <span className="text-accent-700">*</span>
          </label>
          <input
            {...field('email')}
            type="email"
            autoComplete="email"
            className={cn(INPUT, 'mt-2.5')}
          />
          {errorFor('email')}
        </div>

        <div className="sm:col-span-1">
          <label htmlFor={`${formId}-organisation`} className="label block text-ink">
            Organisation
          </label>
          <input
            {...field('organisation')}
            type="text"
            autoComplete="organization"
            className={cn(INPUT, 'mt-2.5')}
          />
        </div>

        <div className="sm:col-span-1">
          <label htmlFor={`${formId}-country`} className="label block text-ink">
            Country
          </label>
          <input {...field('country')} type="text" autoComplete="country-name" className={cn(INPUT, 'mt-2.5')} />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={`${formId}-topic`} className="label block text-ink">
            What is this about? <span className="text-accent-700">*</span>
          </label>
          <select {...field('topic')} className={cn(INPUT, 'mt-2.5 appearance-none')}>
            <option value="" disabled>
              Choose an area
            </option>
            {TOPICS.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
          {errorFor('topic')}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={`${formId}-message`} className="label block text-ink">
            What are you trying to improve? <span className="text-accent-700">*</span>
          </label>
          <textarea
            {...field('message')}
            rows={6}
            className={cn(INPUT, 'mt-2.5 resize-y')}
            placeholder="The process you run now, what is not working, and any deadline you are working to."
          />
          {errorFor('message')}
        </div>
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
        <Button type="submit" size="lg" loading={status === 'sending'}>
          {status === 'sending' ? 'Sending' : 'Send message'}
        </Button>
        <p className="max-w-xs text-sm leading-relaxed text-neutral-700">
          Or email{' '}
          <a
            href={`mailto:${contact.email}`}
            className="font-medium underline underline-offset-4 hover:text-accent-700"
          >
            {contact.email}
          </a>{' '}
          directly. We do not add you to anything.
        </p>
      </div>

      <Note className="mt-8">
        This site runs no analytics by default and sets no advertising or tracking
        cookies. See the{' '}
        <a href="/privacy" className="underline underline-offset-4 hover:text-accent-700">
          privacy policy
        </a>
        .
      </Note>
    </form>
  );
}