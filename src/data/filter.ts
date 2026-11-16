import { cars } from "./cars";
import { parseSmartIntent } from "@/lib/smartSearch";
import type { Car, CarFilters, ListingCategory } from "@/types";

function first(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) return value[0];
  return value;
}

export function parseFilters(
  searchParams: Record<string, string | string[] | undefined>,
): CarFilters {
  const intentRaw = first(searchParams.intent);
  const fromIntent = intentRaw ? parseSmartIntent(intentRaw) : null;

  const priceMin = first(searchParams.priceMin);
  const priceMax = first(searchParams.priceMax);
  const monthlyMax = first(searchParams.monthlyMax);
  const downPaymentMax = first(searchParams.downPaymentMax);
  const yearMin = first(searchParams.yearMin);
  const yearMax = first(searchParams.yearMax);
  const mileageMax = first(searchParams.mileageMax);

  return {
    category:
      (first(searchParams.category) as ListingCategory | undefined) ||
      fromIntent?.category,
    make: first(searchParams.make) || fromIntent?.make || undefined,
    model: first(searchParams.model) || undefined,
    priceMin: priceMin ? Number(priceMin) : undefined,
    priceMax: priceMax
      ? Number(priceMax)
      : fromIntent?.priceMax,
    monthlyMax: monthlyMax
      ? Number(monthlyMax)
      : fromIntent?.monthlyMax,
    downPaymentMax: downPaymentMax
      ? Number(downPaymentMax)
      : fromIntent?.downPaymentMax,
    yearMin: yearMin ? Number(yearMin) : undefined,
    yearMax: yearMax ? Number(yearMax) : undefined,
    mileageMax: mileageMax ? Number(mileageMax) : undefined,
    fuel:
      (first(searchParams.fuel) as CarFilters["fuel"]) || fromIntent?.fuel,
    transmission: first(searchParams.transmission) as CarFilters["transmission"],
    bodyType:
      (first(searchParams.bodyType) as CarFilters["bodyType"]) ||
      fromIntent?.bodyType,
    location: first(searchParams.location) || undefined,
    offer: first(searchParams.offer) === "1" || undefined,
    reliable:
      first(searchParams.reliable) === "1" || fromIntent?.reliable || undefined,
    sporty:
      first(searchParams.sporty) === "1" || fromIntent?.sporty || undefined,
    q: first(searchParams.q) || undefined,
    intent: intentRaw || undefined,
    sort: (first(searchParams.sort) as CarFilters["sort"]) || "newest",
  };
}

export function filterCars(
  filters: CarFilters,
  source: Car[] = cars,
): Car[] {
  let results = source.filter((car) => {
    if (filters.category && car.category !== filters.category) return false;
    if (
      filters.make &&
      car.make.toLowerCase() !== filters.make.toLowerCase()
    ) {
      return false;
    }
    if (
      filters.model &&
      !car.model.toLowerCase().includes(filters.model.toLowerCase())
    ) {
      return false;
    }
    if (filters.priceMin != null && car.price < filters.priceMin) return false;
    if (
      filters.priceMax != null &&
      car.price > 0 &&
      car.price > filters.priceMax
    ) {
      return false;
    }
    if (
      filters.monthlyMax != null &&
      (car.monthlyPayment == null || car.monthlyPayment > filters.monthlyMax)
    ) {
      return false;
    }
    if (filters.downPaymentMax != null) {
      const down = car.downPayment ?? 0;
      if (down > filters.downPaymentMax) return false;
    }
    if (filters.yearMin != null && car.year < filters.yearMin) return false;
    if (filters.yearMax != null && car.year > filters.yearMax) return false;
    if (filters.mileageMax != null && car.mileage > filters.mileageMax) {
      return false;
    }
    if (filters.fuel && car.fuel !== filters.fuel) return false;
    if (filters.transmission && car.transmission !== filters.transmission) {
      return false;
    }
    if (filters.bodyType && car.bodyType !== filters.bodyType) return false;
    if (
      filters.location &&
      car.location.toLowerCase() !== filters.location.toLowerCase()
    ) {
      return false;
    }
    if (filters.offer && !car.offer) return false;
    if (filters.reliable && car.reliability < 4.4) return false;
    if (filters.sporty) {
      const sporty =
        car.bodyType === "Sportive" ||
        car.tags.some((t) => /sport/i.test(t)) ||
        /sport|gt|gti|mustang|cayman/i.test(`${car.model} ${car.make}`);
      if (!sporty) return false;
    }
    if (filters.q) {
      const haystack =
        `${car.make} ${car.model} ${car.location} ${car.fuel} ${car.bodyType} ${car.tags.join(" ")} ${car.description}`.toLowerCase();
      if (!haystack.includes(filters.q.toLowerCase())) return false;
    }
    return true;
  });

  switch (filters.sort) {
    case "price-asc":
      results = [...results].sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      results = [...results].sort((a, b) => b.price - a.price);
      break;
    case "monthly-asc":
      results = [...results].sort(
        (a, b) => (a.monthlyPayment ?? 99999) - (b.monthlyPayment ?? 99999),
      );
      break;
    case "mileage-asc":
      results = [...results].sort((a, b) => a.mileage - b.mileage);
      break;
    case "year-desc":
      results = [...results].sort((a, b) => b.year - a.year);
      break;
    case "newest":
    default:
      results = [...results].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
  }

  return results;
}

export function formatPrice(price: number): string {
  if (price <= 0) return "—";
  return new Intl.NumberFormat("fr-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatMonthly(amount?: number): string | null {
  if (amount == null) return null;
  return `${new Intl.NumberFormat("fr-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(amount)}/mois`;
}

export function formatMileage(mileage: number): string {
  if (mileage <= 0) return "—";
  return `${new Intl.NumberFormat("fr-CA").format(mileage)} km`;
}
