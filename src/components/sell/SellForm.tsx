"use client";

import { FormEvent, useState } from "react";

export function SellForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="animate-rise border border-line bg-white p-8 sm:p-10">
        <p className="text-xs font-semibold tracking-[0.16em] text-accent uppercase">
          Listing received
        </p>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight">
          Your car is in the queue
        </h2>
        <p className="mt-3 max-w-lg text-muted">
          Thanks — this starter only confirms the form on the client.
          Hook it up to your API or database next.
        </p>
        <button
          type="button"
          className="btn-primary mt-8"
          onClick={() => setSubmitted(false)}
        >
          List another car
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="animate-rise border border-line bg-white p-6 sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block sm:col-span-1">
          <span className="mb-1.5 block text-xs font-semibold tracking-wide text-muted uppercase">
            Make
          </span>
          <input name="make" required className="field" placeholder="BMW" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold tracking-wide text-muted uppercase">
            Model
          </span>
          <input
            name="model"
            required
            className="field"
            placeholder="320d M Sport"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold tracking-wide text-muted uppercase">
            Year
          </span>
          <input
            name="year"
            type="number"
            required
            min={1990}
            max={2026}
            className="field"
            placeholder="2021"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold tracking-wide text-muted uppercase">
            Price (€)
          </span>
          <input
            name="price"
            type="number"
            required
            min={500}
            className="field"
            placeholder="28900"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold tracking-wide text-muted uppercase">
            Mileage (km)
          </span>
          <input
            name="mileage"
            type="number"
            required
            min={0}
            className="field"
            placeholder="42000"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold tracking-wide text-muted uppercase">
            Fuel
          </span>
          <select name="fuel" required className="field" defaultValue="">
            <option value="" disabled>
              Select
            </option>
            <option>Petrol</option>
            <option>Diesel</option>
            <option>Hybrid</option>
            <option>Electric</option>
          </select>
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold tracking-wide text-muted uppercase">
            Transmission
          </span>
          <select name="transmission" required className="field" defaultValue="">
            <option value="" disabled>
              Select
            </option>
            <option>Manual</option>
            <option>Automatic</option>
          </select>
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold tracking-wide text-muted uppercase">
            City
          </span>
          <input name="city" required className="field" placeholder="Berlin" />
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-xs font-semibold tracking-wide text-muted uppercase">
            Description
          </span>
          <textarea
            name="description"
            required
            rows={5}
            className="field resize-y"
            placeholder="Service history, extras, reason for selling..."
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold tracking-wide text-muted uppercase">
            Your name
          </span>
          <input name="sellerName" required className="field" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold tracking-wide text-muted uppercase">
            Phone
          </span>
          <input name="phone" required className="field" type="tel" />
        </label>
      </div>

      <button type="submit" className="btn-primary mt-6 w-full sm:w-auto">
        Publish listing
      </button>
    </form>
  );
}
