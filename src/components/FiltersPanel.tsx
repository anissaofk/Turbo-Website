import {
  getLocations,
  getMakes,
} from "@/data/cars";
import type { CarFilters } from "@/data/types";

const fuels = ["Petrol", "Diesel", "Hybrid", "Electric"] as const;
const transmissions = ["Manual", "Automatic"] as const;
const bodyTypes = [
  "Sedan",
  "SUV",
  "Hatchback",
  "Coupe",
  "Estate",
  "Convertible",
] as const;

export function FiltersPanel({ filters }: { filters: CarFilters }) {
  const makes = getMakes();
  const locations = getLocations();

  return (
    <form
      action="/search"
      method="get"
      className="animate-slide space-y-5 border border-line bg-white p-5"
    >
      <div>
        <p className="font-display text-lg font-semibold">Filters</p>
        <p className="mt-1 text-sm text-muted">Narrow the marketplace</p>
      </div>

      <label className="block">
        <span className="mb-1.5 block text-xs font-semibold tracking-wide text-muted uppercase">
          Keyword
        </span>
        <input
          name="q"
          defaultValue={filters.q ?? ""}
          placeholder="Make, model, city..."
          className="field"
        />
      </label>

      <label className="block">
        <span className="mb-1.5 block text-xs font-semibold tracking-wide text-muted uppercase">
          Make
        </span>
        <select name="make" defaultValue={filters.make ?? ""} className="field">
          <option value="">Any</option>
          {makes.map((make) => (
            <option key={make} value={make}>
              {make}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="mb-1.5 block text-xs font-semibold tracking-wide text-muted uppercase">
          Model
        </span>
        <input
          name="model"
          defaultValue={filters.model ?? ""}
          className="field"
          placeholder="Any model"
        />
      </label>

      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold tracking-wide text-muted uppercase">
            Min €
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
            Max €
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

      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold tracking-wide text-muted uppercase">
            From year
          </span>
          <input
            name="yearMin"
            type="number"
            min={1990}
            max={2026}
            defaultValue={filters.yearMin ?? ""}
            className="field"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold tracking-wide text-muted uppercase">
            To year
          </span>
          <input
            name="yearMax"
            type="number"
            min={1990}
            max={2026}
            defaultValue={filters.yearMax ?? ""}
            className="field"
          />
        </label>
      </div>

      <label className="block">
        <span className="mb-1.5 block text-xs font-semibold tracking-wide text-muted uppercase">
          Max mileage
        </span>
        <select
          name="mileageMax"
          defaultValue={filters.mileageMax ?? ""}
          className="field"
        >
          <option value="">Any</option>
          <option value="20000">20,000 km</option>
          <option value="40000">40,000 km</option>
          <option value="60000">60,000 km</option>
          <option value="100000">100,000 km</option>
        </select>
      </label>

      <label className="block">
        <span className="mb-1.5 block text-xs font-semibold tracking-wide text-muted uppercase">
          Fuel
        </span>
        <select name="fuel" defaultValue={filters.fuel ?? ""} className="field">
          <option value="">Any</option>
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
          <option value="">Any</option>
          {transmissions.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="mb-1.5 block text-xs font-semibold tracking-wide text-muted uppercase">
          Body type
        </span>
        <select
          name="bodyType"
          defaultValue={filters.bodyType ?? ""}
          className="field"
        >
          <option value="">Any</option>
          {bodyTypes.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="mb-1.5 block text-xs font-semibold tracking-wide text-muted uppercase">
          Location
        </span>
        <select
          name="location"
          defaultValue={filters.location ?? ""}
          className="field"
        >
          <option value="">Anywhere</option>
          {locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
      </label>

      <input type="hidden" name="sort" value={filters.sort ?? "newest"} />

      <div className="flex gap-2 pt-1">
        <button type="submit" className="btn-primary flex-1 text-sm">
          Apply
        </button>
        <a
          href="/search"
          className="inline-flex flex-1 items-center justify-center border border-line px-3 text-sm font-semibold text-ink transition-colors hover:bg-paper-deep"
        >
          Reset
        </a>
      </div>
    </form>
  );
}
