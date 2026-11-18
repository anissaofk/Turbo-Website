"use client";

import { FormEvent, useState } from "react";
import { listingCategories } from "@/data/categories";
import { getAllMakes } from "@/data/makes";
import { useT } from "@/i18n/LanguageProvider";

export function SellForm() {
  const t = useT();
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="card-soft animate-rise p-8 sm:p-10">
        <p className="text-xs font-semibold tracking-[0.16em] text-blue uppercase">
          {t.sell.received}
        </p>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight">
          {t.sell.thanks}
        </h2>
        <p className="mt-3 max-w-lg text-muted">{t.sell.demoNote}</p>
        <button
          type="button"
          className="btn-primary mt-8"
          onClick={() => setSubmitted(false)}
        >
          {t.sell.publishAnother}
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="card-soft animate-rise p-6 sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-xs font-semibold tracking-wide text-muted uppercase">
            {t.sell.category}
          </span>
          <select name="category" required className="field" defaultValue="">
            <option value="" disabled>
              {t.sell.choose}
            </option>
            {listingCategories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {t.categories[cat.id as keyof typeof t.categories] ?? cat.title}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold tracking-wide text-muted uppercase">
            {t.sell.make}
          </span>
          <select name="make" required className="field" defaultValue="">
            <option value="" disabled>
              {t.sell.choose}
            </option>
            {getAllMakes().map((make) => (
              <option key={make} value={make}>
                {make}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold tracking-wide text-muted uppercase">
            {t.sell.model}
          </span>
          <input
            name="model"
            required
            className="field"
            placeholder="Civic Sport"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold tracking-wide text-muted uppercase">
            {t.sell.year}
          </span>
          <input
            name="year"
            type="number"
            required
            min={1990}
            max={2026}
            className="field"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold tracking-wide text-muted uppercase">
            {t.sell.price}
          </span>
          <input name="price" type="number" min={0} className="field" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold tracking-wide text-muted uppercase">
            {t.sell.monthly}
          </span>
          <input name="monthly" type="number" min={0} className="field" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold tracking-wide text-muted uppercase">
            {t.sell.downPayment}
          </span>
          <input name="downPayment" type="number" min={0} className="field" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold tracking-wide text-muted uppercase">
            {t.sell.mileage}
          </span>
          <input name="mileage" type="number" min={0} className="field" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold tracking-wide text-muted uppercase">
            {t.sell.city}
          </span>
          <input name="city" required className="field" placeholder="Montréal" />
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-xs font-semibold tracking-wide text-muted uppercase">
            {t.sell.description}
          </span>
          <textarea
            name="description"
            required
            rows={5}
            className="field resize-y"
            placeholder={t.sell.descriptionPlaceholder}
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold tracking-wide text-muted uppercase">
            {t.sell.yourName}
          </span>
          <input name="sellerName" required className="field" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold tracking-wide text-muted uppercase">
            {t.sell.phone}
          </span>
          <input name="phone" required className="field" type="tel" />
        </label>
      </div>

      <button type="submit" className="btn-primary mt-6 w-full sm:w-auto">
        {t.sell.submit}
      </button>
    </form>
  );
}
