'use client';

import { useId, useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

type FormData = {
  name: string;
  email: string;
  service: string;
  message: string;
  _honeypot: string;
};

const INPUT_CLASS =
  'w-full bg-transparent border-2 border-[var(--brand-gold)]/60 rounded-xl px-6 py-5 text-base text-white placeholder:text-white/40 transition-all duration-200 ease-in-out focus:outline-none focus:border-[var(--brand-gold)] focus:shadow-[inset_0_0_0_1px_rgba(212,165,116,0.2)]';

export default function ContactForm() {
  const { t, language } = useLanguage();
  const errorId = useId();

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    service: '',
    message: '',
    _honeypot: '',
  });
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [invalidFields, setInvalidFields] = useState<Set<string>>(new Set());

  const serviceOptions = [
    t.contact.services.aiMarketing,
    t.contact.services.visualIdentity,
    t.contact.services.videoProduction,
    t.contact.services.menuDesign,
    t.contact.services.digitalStrategy,
    t.contact.services.other,
  ];

  const validate = (): string | null => {
    const invalid = new Set<string>();
    const name = formData.name.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();

    if (name.length < 2 || name.length > 100) invalid.add('name');
    if (!email || email.length > 200 || !EMAIL_REGEX.test(email)) invalid.add('email');
    if (!formData.service || !serviceOptions.includes(formData.service)) invalid.add('service');
    if (message.length < 20 || message.length > 2000) invalid.add('message');

    setInvalidFields(invalid);

    if (invalid.has('email')) return t.contact.error_email;
    if (invalid.has('message')) return t.contact.error_message_length;
    if (invalid.size > 0) return t.contact.error_validation;
    return null;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (invalidFields.has(name)) {
      setInvalidFields((prev) => {
        const next = new Set(prev);
        next.delete(name);
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationError = validate();
    if (validationError) {
      setErrorMessage(validationError);
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, lang: language }),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', service: '', message: '', _honeypot: '' });
        setInvalidFields(new Set());
        return;
      }

      const data = await response.json().catch(() => ({}));
      setErrorMessage(
        typeof data.error === 'string' && data.error !== 'send_failed'
          ? data.error
          : t.contact.error_send
      );
      setStatus('error');
    } catch {
      setStatus('error');
      setErrorMessage(t.contact.error_send);
    }
  };

  if (status === 'success') {
    return (
      <div className="py-16 text-center">
        <h3 className="font-serif italic text-[var(--brand-gold)] text-3xl mb-4">
          {t.contact.success_headline}
        </h3>
        <p className="text-white/60 mb-8">{t.contact.success_subtext}</p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="text-sm text-[var(--brand-gold)]/80 hover:text-[var(--brand-gold)] underline underline-offset-4"
        >
          {t.contact.success_again}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-[calc(100%-48px)] md:max-w-[560px] mx-auto">
      <div className="w-10 h-px bg-[var(--brand-gold)]/60 mx-auto mb-12" />

      <form onSubmit={handleSubmit} noValidate className="relative">
        <input
          type="text"
          name="_honeypot"
          value={formData._honeypot}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute opacity-0 pointer-events-none h-0 w-0 overflow-hidden"
        />

        <div className="flex flex-col gap-8">
        <div>
          <label htmlFor="contact-name" className="block text-xs uppercase tracking-[0.2em] text-[var(--brand-gold)] mb-2">
            {t.contact.formLineLabel_name}
          </label>
          <input
            id="contact-name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            maxLength={100}
            aria-invalid={invalidFields.has('name')}
            aria-describedby={errorMessage ? errorId : undefined}
            className={INPUT_CLASS}
          />
        </div>

        <div>
          <label htmlFor="contact-email" className="block text-xs uppercase tracking-[0.2em] text-[var(--brand-gold)] mb-2">
            {t.contact.formLineLabel_email}
          </label>
          <input
            id="contact-email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            maxLength={200}
            aria-invalid={invalidFields.has('email')}
            aria-describedby={errorMessage ? errorId : undefined}
            className={INPUT_CLASS}
          />
        </div>

        <div>
          <label htmlFor="contact-service" className="block text-xs uppercase tracking-[0.2em] text-[var(--brand-gold)] mb-2">
            {t.contact.formLineLabel_service}
          </label>
          <div className="relative">
            <select
              id="contact-service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
              aria-invalid={invalidFields.has('service')}
              aria-describedby={errorMessage ? errorId : undefined}
              className={`${INPUT_CLASS} appearance-none pr-12`}
            >
              <option value="" disabled>
                {t.contact.placeholder_service}
              </option>
              {serviceOptions.map((option) => (
                <option key={option} value={option} className="bg-[#111] text-white">
                  {option}
                </option>
              ))}
            </select>
            <svg
              className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--brand-gold)]"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>

        <div>
          <label htmlFor="contact-message" className="block text-xs uppercase tracking-[0.2em] text-[var(--brand-gold)] mb-2">
            {t.contact.formLineLabel_message}
          </label>
          <textarea
            id="contact-message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            minLength={20}
            maxLength={2000}
            rows={5}
            aria-invalid={invalidFields.has('message')}
            aria-describedby={errorMessage ? errorId : undefined}
            className={`${INPUT_CLASS} resize-y min-h-[140px]`}
          />
        </div>
        </div>

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="mx-auto block mt-12 px-12 py-5 rounded-full bg-[var(--brand-gold)] text-[#0a0a0a] font-serif text-base uppercase tracking-[0.15em] shadow-[0_0_24px_-8px_rgba(212,165,116,0.3)] transition-all duration-250 ease-out hover:shadow-[0_0_28px_-6px_rgba(212,165,116,0.5)] hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 motion-reduce:hover:scale-100"
        >
          {status === 'submitting' ? t.contact.submitting : t.contact.submit}
        </button>

        {errorMessage && (
          <p id={errorId} className="text-sm text-red-400/80 mt-4 text-center" role="alert">
            {errorMessage}
          </p>
        )}
      </form>
    </div>
  );
}
