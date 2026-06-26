'use client';

import { useEffect, useId, useRef, useState } from 'react';
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
  'mb-2 block text-[10px] font-medium uppercase tracking-[0.32em] text-[var(--bone-mute)]';
const FIELD_LABEL_STYLE = { fontFamily: "var(--font-ui), system-ui, sans-serif" };

const UNDERLINE_INPUT_CLASS =
  'w-full border-0 border-b border-[var(--rule-strong)] bg-transparent px-0 py-4 text-base text-[var(--bone-0)] placeholder:text-[var(--bone-mute)] transition-colors duration-200 ease-in-out focus:border-[var(--bone-0)] focus:outline-none';

const TEXTAREA_CLASS =
  'w-full resize-y rounded-[2px] border border-[var(--rule-strong)] bg-transparent px-6 py-5 text-base text-[var(--bone-0)] placeholder:text-[var(--bone-mute)] transition-colors duration-200 ease-in-out focus:border-[var(--bone-0)] focus:outline-none min-h-[140px]';

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

function ServiceDropdown({
  id,
  value,
  options,
  placeholder,
  invalid,
  errorDescribedBy,
  onChange,
}: {
  id: string;
  value: string;
  options: string[];
  placeholder: string;
  invalid: boolean;
  errorDescribedBy?: string;
  onChange: (value: string) => void;
}) {
  const listboxId = `${id}-listbox`;
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const listboxRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const selectedIndex = options.indexOf(value);

  const closeDropdown = () => {
    setIsOpen(false);
    setFocusedIndex(-1);
  };

  const selectOption = (option: string) => {
    onChange(option);
    closeDropdown();
    buttonRef.current?.focus();
  };

  useEffect(() => {
    if (!isOpen) return;

    setFocusedIndex(selectedIndex >= 0 ? selectedIndex : 0);
    listboxRef.current?.focus();

    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        closeDropdown();
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeDropdown();
        buttonRef.current?.focus();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, selectedIndex]);

  const handleButtonKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Escape' && isOpen) {
      e.preventDefault();
      closeDropdown();
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setIsOpen(true);
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setIsOpen(true);
      setFocusedIndex(options.length - 1);
    }
  };

  const handleListboxKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      closeDropdown();
      buttonRef.current?.focus();
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusedIndex((prev) => (prev + 1) % options.length);
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedIndex((prev) => (prev - 1 + options.length) % options.length);
      return;
    }

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (focusedIndex >= 0 && focusedIndex < options.length) {
        selectOption(options[focusedIndex]);
      }
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <input type="hidden" name="service" value={value} />

      <button
        ref={buttonRef}
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-invalid={invalid}
        aria-describedby={errorDescribedBy}
        onClick={() => setIsOpen((open) => !open)}
        onKeyDown={handleButtonKeyDown}
        className={`group flex w-full items-center justify-between border-0 border-b bg-transparent py-4 text-left text-base transition-colors duration-200 ease-in-out focus:border-[var(--bone-0)] focus:outline-none ${
          isOpen ? 'border-[var(--bone-0)]' : 'border-[var(--rule-strong)] hover:border-[var(--bone-0)]'
        }`}
        style={{ fontFamily: "var(--font-ui), system-ui, sans-serif" }}
      >
        <span className={value ? 'text-[var(--bone-0)]' : 'text-[var(--bone-mute)]'}>
          {value || placeholder}
        </span>
        <svg
          className={`shrink-0 text-[var(--bone-mute)] transition-transform duration-200 ease-out ${
            isOpen ? 'rotate-180' : ''
          }`}
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
      </button>

      <div
        ref={listboxRef}
        id={listboxId}
        role="listbox"
        aria-labelledby={id}
        tabIndex={-1}
        onKeyDown={handleListboxKeyDown}
        className={`absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-[2px] border border-[var(--rule-strong)] bg-[var(--ink-2)] transition-all duration-200 ease-out ${
          isOpen
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-1 opacity-0'
        }`}
      >
        {options.map((option, index) => {
          const isSelected = value === option;
          const isFocused = focusedIndex === index;

          return (
            <div
              key={option}
              id={`${id}-option-${index}`}
              role="option"
              aria-selected={isSelected}
              tabIndex={-1}
              onMouseEnter={() => setFocusedIndex(index)}
              onClick={() => selectOption(option)}
              className={`flex cursor-pointer items-center justify-between px-4 py-3 text-[13px] transition-colors duration-150 ${
                isSelected || isFocused
                  ? 'bg-[rgba(244,241,234,0.06)] text-[var(--bone-0)]'
                  : 'text-[var(--bone-dim)] hover:bg-[rgba(244,241,234,0.06)] hover:text-[var(--bone-0)]'
              }`}
              style={{ fontFamily: "var(--font-ui), system-ui, sans-serif" }}
            >
              <span>{option}</span>
              {isSelected && (
                <span className="ml-3 flex h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--bone-0)]" aria-hidden="true" />
              )}
            </div>
          );
        })}
      </div>
    </div>
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
    t.contact.services.story,
    t.contact.services.visual,
    t.contact.services.build,
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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

  const handleServiceChange = (service: string) => {
    setFormData((prev) => ({ ...prev, service }));
    if (invalidFields.has('service')) {
      setInvalidFields((prev) => {
        const next = new Set(prev);
        next.delete('service');
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
          className="mb-4 text-3xl text-[var(--bone-0)]"
          style={{
            fontFamily: 'var(--font-accent)',
            fontStyle: 'normal',
            fontWeight: 400,
            letterSpacing: '-0.01em',
          }}
        >
          {t.contact.success_headline}
        </h3>
        <p
          className="mb-8 text-[var(--bone-dim)]"
          style={{ fontFamily: "var(--font-ui), system-ui, sans-serif" }}
        >
          {t.contact.success_subtext}
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="text-sm text-[var(--bone-dim)] underline underline-offset-4 transition-colors hover:text-[var(--bone-0)]"
          style={{ fontFamily: "var(--font-ui), system-ui, sans-serif" }}
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
              style={{ fontFamily: "var(--font-ui), system-ui, sans-serif" }}
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
              style={{ fontFamily: "var(--font-ui), system-ui, sans-serif" }}
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
            <ServiceDropdown
              id="contact-service"
              value={formData.service}
              options={serviceOptions}
              placeholder={t.contact.placeholder_service}
              invalid={invalidFields.has('service')}
              errorDescribedBy={errorMessage ? errorId : undefined}
              onChange={handleServiceChange}
            />
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
              style={{ fontFamily: "var(--font-ui), system-ui, sans-serif" }}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="mt-10 inline-flex items-center gap-2.5 rounded-[2px] bg-[var(--bone-0)] px-8 py-3.5 text-xs font-medium tracking-[0.18em] text-[var(--ink-0)] transition-all duration-200 ease-out hover:bg-white hover:-translate-y-[1px] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 motion-reduce:hover:translate-y-0"
          style={{ fontFamily: "var(--font-ui), system-ui, sans-serif" }}
        >
          {status !== 'submitting' && <WaxSealIcon />}
          {status === 'submitting' ? t.contact.submitting : t.contact.submit}
        </button>

        {errorMessage && (
          <p
            id={errorId}
            className="mt-4 text-sm text-red-400/80"
            role="alert"
            style={{ fontFamily: "var(--font-ui), system-ui, sans-serif" }}
          >
            {errorMessage}
          </p>
        )}
      </form>
    </div>
  );
}
