import { getLocations, getMakes } from "@/data/cars";
import { categories } from "@/data/categories";
import type { CarFilters } from "@/types";

const fuels = ["Essence", "Diesel", "Hybride", "Électrique"] as const;
const transmissions = ["Manuelle", "Automatique"] as const;
const bodyTypes = [
  "Berline",
  "VUS",
  "Compacte",
  "Coupé",
  "Familiale",
  "Cabriolet",
  "Sportive",
] as const;

export function FiltersPanel({ filters }: { filters: CarFilters }) {
  const makes = getMakes();
  const locations = getLocations();

  return (
    <form
      action="/search"
      method="get"
      className="card-soft animate-rise space-y-5 p-5"
    >
      <div>
        <p className="font-display text-lg font-semibold">Filtres détaillés</p>
        <p className="mt-1 text-sm text-muted">Affinez les annonces Autiva</p>
      </div>

      {filters.intent && (
        <input type="hidden" name="intent" value={filters.intent} />
      )}

      <label className="block">
        <span className="mb-1.5 block text-xs font-semibold tracking-wide text-muted uppercase">
          Mot-clé
        </span>
        <input
          name="q"
          defaultValue={filters.q ?? ""}
          placeholder="Marque, modèle, ville..."
          className="field"
        />
      </label>

      <label className="block">
        <span className="mb-1.5 block text-xs font-semibold tracking-wide text-muted uppercase">
          Catégorie
        </span>
        <select
          name="category"
          defaultValue={filters.category ?? ""}
          className="field"
        >
          <option value="">Toutes</option>
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
        <select name="make" defaultValue={filters.make ?? ""} className="field">
          <option value="">Toutes</option>
          {makes.map((make) => (
            <option key={make} value={make}>
              {make}
            </option>
          ))}
        </select>
      </label>

      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold tracking-wide text-muted uppercase">
            Max $/mois
          </span>
          <input
            name="monthlyMax"
            type="number"
            min={0}
            defaultValue={filters.monthlyMax ?? ""}
            className="field"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold tracking-wide text-muted uppercase">
            Mise fonds max
          </span>
          <input
            name="downPaymentMax"
            type="number"
            min={0}
            defaultValue={filters.downPaymentMax ?? ""}
            className="field"
          />
        </label>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold tracking-wide text-muted uppercase">
            Prix min
          </span>
          <input
            name="priceMin"
            type="number"
            min={0}
            defaultValue={filters.priceMin ?? ""}
            className="field"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold tracking-wide text-muted uppercase">
            Prix max
          </span>
          <input
            name="priceMax"
            type="number"
            min={0}
            defaultValue={filters.priceMax ?? ""}
            className="field"
          />
        </label>
      </div>

      <label className="block">
        <span className="mb-1.5 block text-xs font-semibold tracking-wide text-muted uppercase">
          Carburant
        </span>
        <select name="fuel" defaultValue={filters.fuel ?? ""} className="field">
          <option value="">Tous</option>
          {fuels.map((fuel) => (
            <option key={fuel} value={fuel}>
              {fuel}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="mb-1.5 block text-xs font-semibold tracking-wide text-muted uppercase">
          Transmission
        </span>
        <select
          name="transmission"
          defaultValue={filters.transmission ?? ""}
          className="field"
        >
          <option value="">Toutes</option>
          {transmissions.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="mb-1.5 block text-xs font-semibold tracking-wide text-muted uppercase">
          Carrosserie
        </span>
        <select
          name="bodyType"
          defaultValue={filters.bodyType ?? ""}
          className="field"
        >
          <option value="">Toutes</option>
          {bodyTypes.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="mb-1.5 block text-xs font-semibold tracking-wide text-muted uppercase">
          Ville
        </span>
        <select
          name="location"
          defaultValue={filters.location ?? ""}
          className="field"
        >
          <option value="">Partout</option>
          {locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
      </label>

      <div className="space-y-2 border-t border-line pt-4">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="sporty"
            value="1"
            defaultChecked={!!filters.sporty}
          />
          Sportive
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="reliable"
            value="1"
            defaultChecked={!!filters.reliable}
          />
          Fiable (score ≥ 4.4)
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="offer"
            value="1"
            defaultChecked={!!filters.offer}
          />
          Offres seulement
        </label>
      </div>

      <input type="hidden" name="sort" value={filters.sort ?? "newest"} />

      <div className="flex gap-2 pt-1">
        <button type="submit" className="btn-primary flex-1 text-sm">
          Appliquer
        </button>
        <a
          href="/search"
          className="inline-flex flex-1 items-center justify-center border border-line px-3 text-sm font-semibold text-ink transition-colors hover:bg-paper-deep"
        >
          Réinitialiser
        </a>
      </div>
    </form>
  );
}
