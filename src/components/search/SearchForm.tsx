import { getLocations, getMakes } from "@/data/cars";

type SearchFormProps = {
  compact?: boolean;
  defaults?: {
    make?: string;
    model?: string;
    priceMax?: string;
    location?: string;
  };
};

export function SearchForm({ compact = false, defaults }: SearchFormProps) {
  const makes = getMakes();
  const locations = getLocations();

  return (
    <form
      action="/search"
      method="get"
      className={
        compact
          ? "grid gap-3 sm:grid-cols-2 lg:grid-cols-5"
          : "grid gap-3 md:grid-cols-2 lg:grid-cols-[1.1fr_1.1fr_1fr_1fr_auto]"
      }
    >
      <label className="block">
        <span className="mb-1.5 block text-[11px] font-semibold tracking-[0.14em] text-white/70 uppercase">
          Make
        </span>
        <select name="make" defaultValue={defaults?.make ?? ""} className="field">
          <option value="">Any make</option>
          {makes.map((make) => (
            <option key={make} value={make}>
              {make}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="mb-1.5 block text-[11px] font-semibold tracking-[0.14em] text-white/70 uppercase">
          Model
        </span>
        <input
          name="model"
          defaultValue={defaults?.model ?? ""}
          placeholder="e.g. Golf GTI"
          className="field"
        />
      </label>

      <label className="block">
        <span className="mb-1.5 block text-[11px] font-semibold tracking-[0.14em] text-white/70 uppercase">
          Max price
        </span>
        <select
          name="priceMax"
          defaultValue={defaults?.priceMax ?? ""}
          className="field"
        >
          <option value="">No max</option>
          <option value="15000">€15,000</option>
          <option value="25000">€25,000</option>
          <option value="35000">€35,000</option>
          <option value="50000">€50,000</option>
          <option value="80000">€80,000</option>
        </select>
      </label>

      <label className="block">
        <span className="mb-1.5 block text-[11px] font-semibold tracking-[0.14em] text-white/70 uppercase">
          Location
        </span>
        <select
          name="location"
          defaultValue={defaults?.location ?? ""}
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

      <div className="flex items-end">
        <button type="submit" className="btn-primary w-full">
          Search cars
        </button>
      </div>
    </form>
  );
}
