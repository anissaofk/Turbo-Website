"use client";

import { FormEvent, useState } from "react";
import { categories } from "@/data/categories";
import { getAllMakes } from "@/data/makes";

export function SellForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="card-soft animate-rise p-8 sm:p-10">
        <p className="text-xs font-semibold tracking-[0.16em] text-blue uppercase">
          Annonce reçue
        </p>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight">
          Merci — votre annonce est en file
        </h2>
        <p className="mt-3 max-w-lg text-muted">
          Pour cette démo, le formulaire reste côté client. Branchez ensuite
          votre API ou base de données.
        </p>
        <button
          type="button"
          className="btn-primary mt-8"
          onClick={() => setSubmitted(false)}
        >
          Publier une autre annonce
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
            Case
          </span>
          <select name="category" required className="field" defaultValue="">
            <option value="" disabled>
              Choisir
            </option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.title}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold tracking-wide text-muted uppercase">
            Marque
          </span>
          <select name="make" required className="field" defaultValue="">
            <option value="" disabled>
              Choisir
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
            Modèle
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
            Année
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
            Prix ($)
          </span>
          <input name="price" type="number" min={0} className="field" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold tracking-wide text-muted uppercase">
            Mensualité ($)
          </span>
          <input name="monthly" type="number" min={0} className="field" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold tracking-wide text-muted uppercase">
            Mise de fonds ($)
          </span>
          <input name="downPayment" type="number" min={0} className="field" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold tracking-wide text-muted uppercase">
            Kilométrage
          </span>
          <input name="mileage" type="number" min={0} className="field" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold tracking-wide text-muted uppercase">
            Ville
          </span>
          <input name="city" required className="field" placeholder="Montréal" />
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
            placeholder="État, entretien, conditions de location ou de bail..."
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold tracking-wide text-muted uppercase">
            Votre nom
          </span>
          <input name="sellerName" required className="field" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold tracking-wide text-muted uppercase">
            Téléphone
          </span>
          <input name="phone" required className="field" type="tel" />
        </label>
      </div>

      <button type="submit" className="btn-primary mt-6 w-full sm:w-auto">
        Publier l&apos;annonce
      </button>
    </form>
  );
}
