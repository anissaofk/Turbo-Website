import type { Dictionary, Locale } from "@/i18n/dictionaries";
import type {
  BodyType,
  Drivetrain,
  FuelType,
  SellerType,
  Transmission,
} from "@/types";

export function formatLocaleDate(iso: string, locale: Locale) {
  try {
    return new Intl.DateTimeFormat(
      locale === "fr" ? "fr-CA" : locale === "es" ? "es-CA" : "en-CA",
      { day: "numeric", month: "long", year: "numeric" },
    ).format(new Date(iso));
  } catch {
    return iso;
  }
}

export function tFuel(t: Dictionary, value: FuelType | string) {
  return t.values.fuel[value as FuelType] ?? value;
}

export function tTransmission(t: Dictionary, value: Transmission | string) {
  return t.values.transmission[value as Transmission] ?? value;
}

export function tBodyType(t: Dictionary, value: BodyType | string) {
  return t.values.bodyType[value as BodyType] ?? value;
}

export function tDrivetrain(t: Dictionary, value: Drivetrain | string) {
  return t.values.drivetrain[value as Drivetrain] ?? value;
}

export function tSellerType(t: Dictionary, value: SellerType | string) {
  return t.values.seller[value as SellerType] ?? value;
}
