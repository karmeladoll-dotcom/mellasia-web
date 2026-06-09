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

const FIELD_LABEL_CLASS =
  'mb-2 block text-[10px] uppercase tracking-[2px] text-[#D4A574]';
const FIELD_LABEL_STYLE = { fontFamily: "'DM Sans', sans-serif" };

const UNDERLINE_INPUT_CLASS =
  'w-full border-0 border-b border-[#333] bg-transparent px-0 py-4 text-base text-white placeholder:text-[#555] transition-colors duration-200 ease-in-out focus:border-[#D4A574] focus:outline-none';

const TEXTAREA_CLASS =
  'w-full resize-y rounded-lg border border-[#282828] bg-transparent px-6 py-5 text-base text-white placeholder:text-[#555] transition-colors duration-200 ease-in-out focus:border-[#D4A574] focus:outline-none min-h-[140px]';

function WaxSealIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1" />
      <text
        x="12"
        y="15"
        textAnchor="middle"
        fontSize="7"
        fill="currentColor"
        fontWeight="500"
        fontFamily="serif"
      >
        M
      </text>
    </svg>
  );
}

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
      <div className="py-16 text-left">
        <h3
          className="mb-4 text-3xl italic text-[#D4A574]"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {t.contact.success_headline}
        </h3>
        <p className="mb-8 text-white/60" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          {t.contact.success_subtext}
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="text-sm text-[#D4A574]/80 underline underline-offset-4 transition-colors hover:text-[#D4A574]"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {t.contact.success_again}
        </button>
      </div>
    );
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} noValidate className="relative">
        <input
          type="text"
          name="_honeypot"
          value={formData._honeypot}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0"
        />

        <div className="flex flex-col gap-8">
          <div>
            <label
              htmlFor="contact-name"
              className={FIELD_LABEL_CLASS}
              style={FIELD_LABEL_STYLE}
            >
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
              className={UNDERLINE_INPUT_CLASS}
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            />
          </div>

          <div>
            <label
              htmlFor="contact-email"
              className={FIELD_LABEL_CLASS}
              style={FIELD_LABEL_STYLE}
            >
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
              className={UNDERLINE_INPUT_CLASS}
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            />
          </div>

          <div>
            <label
              htmlFor="contact-service"
              className={FIELD_LABEL_CLASS}
              style={FIELD_LABEL_STYLE}
            >
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
                className={`${UNDERLINE_INPUT_CLASS} appearance-none pr-8`}
                style={{ fontFamily: "'DM Sans', sans-serif" }}
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
                className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-[#D4A574]"
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
            <label
              htmlFor="contact-message"
              className={FIELD_LABEL_CLASS}
              style={FIELD_LABEL_STYLE}
            >
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
              className={TEXTAREA_CLASS}
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="mt-10 inline-flex items-center gap-2.5 rounded-full bg-[#D4A574] px-8 py-3.5 text-xs font-medium tracking-widest text-[#0A0A0A] transition-all duration-200 ease-out hover:scale-[1.02] hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100 motion-reduce:hover:scale-100"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {status !== 'submitting' && <WaxSealIcon />}
          {status === 'submitting' ? t.contact.submitting : t.contact.submit}
        </button>

        {errorMessage && (
          <p
            id={errorId}
            className="mt-4 text-sm text-red-400/80"
            role="alert"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {errorMessage}
          </p>
        )}
      </form>
    </div>
  );
}
