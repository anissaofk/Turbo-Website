import { getLocations, getMakes } from "@/data/cars";
import { categories } from "@/data/categories";

export function SearchForm() {
  const makes = getMakes();
  const locations = getLocations();

  return (
    <form
      action="/search"
      method="get"
      className="grid gap-3 md:grid-cols-2 lg:grid-cols-[1.1fr_1.1fr_1fr_1fr_auto]"
    >
      <label className="block">
        <span className="mb-1.5 block text-[11px] font-semibold tracking-[0.14em] text-white/70 uppercase">
          Catégorie
        </span>
        <select name="category" defaultValue="" className="field">
          <option value="">Toutes</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.title}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="mb-1.5 block text-[11px] font-semibold tracking-[0.14em] text-white/70 uppercase">
          Marque
        </span>
        <select name="make" defaultValue="" className="field">
          <option value="">Toutes</option>
          {makes.map((make) => (
            <option key={make} value={make}>
              {make}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="mb-1.5 block text-[11px] font-semibold tracking-[0.14em] text-white/70 uppercase">
          Max $/mois
        </span>
        <select name="monthlyMax" defaultValue="" className="field">
          <option value="">Aucun max</option>
          <option value="400">400 $</option>
          <option value="500">500 $</option>
          <option value="700">700 $</option>
          <option value="900">900 $</option>
        </select>
      </label>

      <label className="block">
        <span className="mb-1.5 block text-[11px] font-semibold tracking-[0.14em] text-white/70 uppercase">
          Ville
        </span>
        <select name="location" defaultValue="" className="field">
          <option value="">Partout</option>
          {locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
      </label>

      <div className="flex items-end">
        <button type="submit" className="btn-primary w-full">
          Rechercher
        </button>
      </div>
    </form>
  );
}
