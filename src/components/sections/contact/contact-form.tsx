"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2 } from "lucide-react";

import { ctaButtonClass } from "@/components/ui/cta-link";
import { serviceOptions } from "@/constants/contact";
import { primaryCta } from "@/constants/navigation";

type FormState = {
  name: string;
  companyName: string;
  email: string;
  contactNumber: string;
  service: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const initialFormState: FormState = {
  name: "",
  companyName: "",
  email: "",
  contactNumber: "",
  service: "",
  message: "",
};

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateForm(form: FormState) {
  const errors: FormErrors = {};

  if (!form.name.trim()) {
    errors.name = "Name is required.";
  }

  if (!form.email.trim()) {
    errors.email = "Email is required.";
  } else if (!validateEmail(form.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!form.service) {
    errors.service = "Please choose the closest fit.";
  }

  if (!form.message.trim()) {
    errors.message = "Tell us what you’re trying to deliver.";
  }

  return errors;
}

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [toastVisible, setToastVisible] = useState(false);

  function updateField(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validateForm(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setToastVisible(false);
      return;
    }

    setForm(initialFormState);
    setToastVisible(true);
  }

  return (
    <div className="rounded-[1.5rem] bg-[#0A2878]/68 p-5 backdrop-blur-xl sm:p-7 lg:p-8">
      <div className="mb-7">
        <h2 className="text-balance text-2xl font-semibold leading-tight text-white sm:text-3xl">
          Tell us what you&apos;re trying to deliver.
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-7 text-white/62">
          Share a few details and we&apos;ll follow up within one business day.
        </p>
      </div>

      <div className="rounded-[1.2rem] border border-white/12 bg-[#0B2D80]/72 p-5 sm:p-6">
        {toastVisible && (
          <div
            className="mb-5 flex gap-3 rounded-[1rem] border border-[#69C8FF]/35 bg-[#0B3A8D]/55 p-4 text-sm leading-6 text-white"
            role="status"
          >
            <CheckCircle2 className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
            <p>
              Thanks. We received your details and will get back to you within
              one business day.
            </p>
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              error={errors.name}
              label="Name"
              name="name"
              onChange={(value) => updateField("name", value)}
              placeholder="Your name"
              required
              value={form.name}
            />
            <FormField
              error={errors.companyName}
              label="Company"
              name="companyName"
              onChange={(value) => updateField("companyName", value)}
              optional
              placeholder="Company name"
              value={form.companyName}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              error={errors.email}
              label="Email"
              name="email"
              onChange={(value) => updateField("email", value)}
              placeholder="you@example.com"
              required
              type="email"
              value={form.email}
            />
            <FormField
              error={errors.contactNumber}
              label="Phone"
              name="contactNumber"
              onChange={(value) => updateField("contactNumber", value)}
              optional
              placeholder="Phone number"
              type="tel"
              value={form.contactNumber}
            />
          </div>

          <div>
            <label
              className="mb-2 block text-sm font-semibold text-white/78"
              htmlFor="service"
            >
              What brings you here? <span className="text-white/42">*</span>
            </label>
            <select
              aria-invalid={Boolean(errors.service)}
              className="h-[3.25rem] w-full rounded-[0.9rem] border border-white/14 bg-[#0B2D80]/78 px-4 text-base text-white outline-none transition focus:border-[#69C8FF]/80 focus:ring-2 focus:ring-[#69C8FF]/30"
              id="service"
              name="service"
              onChange={(event) => updateField("service", event.target.value)}
              value={form.service}
            >
              <option value="">Choose one</option>
              {serviceOptions.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
            {errors.service && (
              <p className="mt-2 text-sm text-red-200">{errors.service}</p>
            )}
          </div>

          <div>
            <label
              className="mb-2 block text-sm font-semibold text-white/78"
              htmlFor="message"
            >
              What are you trying to deliver?{" "}
              <span className="text-white/42">*</span>
            </label>
            <textarea
              aria-invalid={Boolean(errors.message)}
              className="min-h-36 w-full resize-y rounded-[0.9rem] border border-white/14 bg-[#0B2D80]/78 px-4 py-3 text-base leading-7 text-white outline-none transition placeholder:text-white/38 focus:border-[#69C8FF]/80 focus:ring-2 focus:ring-[#69C8FF]/30"
              id="message"
              name="message"
              onChange={(event) => updateField("message", event.target.value)}
              placeholder="A product, a roadmap, a back office that keeps up. Tell us in your own words."
              value={form.message}
            />
            {errors.message && (
              <p className="mt-2 text-sm text-red-200">{errors.message}</p>
            )}
          </div>

          <button
            className={`${ctaButtonClass} h-[3.25rem] w-full px-6 text-base`}
            type="submit"
          >
            {primaryCta.label}
          </button>
        </form>
      </div>
    </div>
  );
}

function FormField({
  error,
  label,
  name,
  onChange,
  optional = false,
  placeholder,
  required = false,
  type = "text",
  value,
}: {
  error?: string;
  label: string;
  name: keyof FormState;
  onChange: (value: string) => void;
  optional?: boolean;
  placeholder: string;
  required?: boolean;
  type?: string;
  value: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-white/78" htmlFor={name}>
        {label} {required && <span className="text-white/42">*</span>}
        {optional && (
          <span className="ml-1 font-normal text-white/48">(optional)</span>
        )}
      </label>
      <input
        aria-invalid={Boolean(error)}
        className="h-[3.25rem] w-full rounded-[0.9rem] border border-white/14 bg-[#0B2D80]/78 px-4 text-base text-white outline-none transition placeholder:text-white/38 focus:border-[#69C8FF]/80 focus:ring-2 focus:ring-[#69C8FF]/30"
        id={name}
        name={name}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        type={type}
        value={value}
      />
      {error && <p className="mt-2 text-sm text-red-200">{error}</p>}
    </div>
  );
}
