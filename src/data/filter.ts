import { cars } from "./cars";
import {
  distanceKm,
  getCityPoint,
  resolvePostalPoint,
} from "./geo";
import { parseSmartIntent } from "@/lib/smartSearch";
import type {
  Car,
  CarFilters,
  ColorFamily,
  Drivetrain,
  SellerType,
} from "@/types";

function first(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) return value[0];
  return value;
}

function last(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) return value[value.length - 1];
  return value;
}

export function colorFamilyOf(color: string): ColorFamily {
  const c = color.toLowerCase();
  if (/blanc|white|nacré|championship/.test(c)) return "Blanc";
  if (/noir|black|cristal/.test(c)) return "Noir";
  if (/rouge|red|race|âme|ame|tornado/.test(c)) return "Rouge";
  if (/bleu|blue|gravity|rally/.test(c)) return "Bleu";
  if (/gris|gray|grey|mineral|intense/.test(c)) return "Gris";
  if (/vert|green|forêt|foret/.test(c)) return "Vert";
  return "Autre";
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
  const radiusKm = first(searchParams.radiusKm);
  const postalCode = first(searchParams.postalCode);
  const doors = first(searchParams.doors);
  const seats = first(searchParams.seats);
  const powerMin = first(searchParams.powerMin);
  const powerMax = first(searchParams.powerMax);
  const listedWithinDays = first(searchParams.listedWithinDays);
  const excludeDamagedRaw = last(searchParams.excludeDamaged);

  return {
    category:
      (first(searchParams.category) as CarFilters["category"]) ||
      fromIntent?.category,
    make: first(searchParams.make) || fromIntent?.make || undefined,
    model: first(searchParams.model) || undefined,
    priceMin: priceMin ? Number(priceMin) : undefined,
    priceMax: priceMax ? Number(priceMax) : fromIntent?.priceMax,
    monthlyMax: monthlyMax ? Number(monthlyMax) : fromIntent?.monthlyMax,
    downPaymentMax: downPaymentMax
      ? Number(downPaymentMax)
      : fromIntent?.downPaymentMax,
    yearMin: yearMin ? Number(yearMin) : undefined,
    yearMax: yearMax ? Number(yearMax) : undefined,
    mileageMax: mileageMax ? Number(mileageMax) : undefined,
    fuel:
      (first(searchParams.fuel) as CarFilters["fuel"]) || fromIntent?.fuel,
    transmission: first(
      searchParams.transmission,
    ) as CarFilters["transmission"],
    bodyType:
      (first(searchParams.bodyType) as CarFilters["bodyType"]) ||
      fromIntent?.bodyType,
    drivetrain: first(searchParams.drivetrain) as Drivetrain | undefined,
    color: first(searchParams.color) as ColorFamily | undefined,
    sellerType: first(searchParams.sellerType) as SellerType | undefined,
    doors: doors ? Number(doors) : undefined,
    seats: seats ? Number(seats) : undefined,
    powerMin: powerMin ? Number(powerMin) : undefined,
    powerMax: powerMax ? Number(powerMax) : undefined,
    feature: first(searchParams.feature) || undefined,
    excludeDamaged:
      excludeDamagedRaw == null ? true : excludeDamagedRaw !== "0",
    certified: first(searchParams.certified) === "1" || undefined,
    listedWithinDays: listedWithinDays
      ? Number(listedWithinDays)
      : undefined,
    location: first(searchParams.location) || undefined,
    postalCode: postalCode || undefined,
    radiusKm: radiusKm ? Number(radiusKm) : postalCode ? 25 : undefined,
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
  const origin =
    filters.postalCode != null && filters.postalCode.trim() !== ""
      ? resolvePostalPoint(filters.postalCode)
      : null;
  const radius = filters.radiusKm ?? 25;
  const now = Date.now();

  let results = source.filter((car) => {
    if (filters.category === "buy") {
      if (car.category !== "neuf" && car.category !== "usage") return false;
    } else if (filters.category && car.category !== filters.category) {
      return false;
    }
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
    if (filters.drivetrain && car.drivetrain !== filters.drivetrain) {
      return false;
    }
    if (filters.color && colorFamilyOf(car.color) !== filters.color) {
      return false;
    }
    if (filters.sellerType && car.seller.type !== filters.sellerType) {
      return false;
    }
    if (filters.doors != null && car.doors > 0 && car.doors !== filters.doors) {
      return false;
    }
    if (filters.seats != null && car.seats > 0 && car.seats !== filters.seats) {
      return false;
    }
    if (filters.powerMin != null && car.powerHp < filters.powerMin) {
      return false;
    }
    if (filters.powerMax != null && car.powerHp > filters.powerMax) {
      return false;
    }
    if (filters.feature) {
      const needle = filters.feature.toLowerCase();
      const hay = car.features.join(" ").toLowerCase();
      if (!hay.includes(needle)) return false;
    }
    if (filters.excludeDamaged !== false && car.damaged) return false;
    if (filters.certified && !car.certified) return false;
    if (filters.listedWithinDays != null) {
      const created = new Date(car.createdAt).getTime();
      const maxAgeMs = filters.listedWithinDays * 24 * 60 * 60 * 1000;
      if (Number.isNaN(created) || now - created > maxAgeMs) return false;
    }

    if (origin) {
      const carPoint = getCityPoint(car.location);
      if (!carPoint) return false;
      if (distanceKm(origin, carPoint) > radius) return false;
    } else if (
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
        `${car.make} ${car.model} ${car.location} ${car.postalCode} ${car.fuel} ${car.bodyType} ${car.color} ${car.drivetrain} ${car.tags.join(" ")} ${car.features.join(" ")} ${car.description}`.toLowerCase();
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
    case "mileage-desc":
      results = [...results].sort((a, b) => b.mileage - a.mileage);
      break;
    case "year-desc":
      results = [...results].sort((a, b) => b.year - a.year);
      break;
    case "oldest":
      results = [...results].sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
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
