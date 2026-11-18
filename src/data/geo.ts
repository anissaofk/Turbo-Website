/** Coordonnées approximatives (QC) pour filtre code postal + rayon */

export type GeoPoint = { lat: number; lng: number };

export const CITY_COORDS: Record<string, GeoPoint> = {
  Montréal: { lat: 45.5017, lng: -73.5673 },
  Laval: { lat: 45.6066, lng: -73.7124 },
  Longueuil: { lat: 45.5312, lng: -73.5185 },
  Québec: { lat: 46.8139, lng: -71.208 },
  Gatineau: { lat: 45.4765, lng: -75.7013 },
  Verdun: { lat: 45.46, lng: -73.567 },
  Sherbrooke: { lat: 45.4042, lng: -71.8929 },
  Brossard: { lat: 45.451, lng: -73.461 },
  Westmount: { lat: 45.485, lng: -73.596 },
  "Mont-Royal": { lat: 45.516, lng: -73.643 },
};

/** Préfixe FSA (3 premiers caractères) → point de référence */
export const POSTAL_PREFIX_COORDS: Record<string, GeoPoint> = {
  H1: CITY_COORDS.Montréal,
  H2: CITY_COORDS.Montréal,
  H3: CITY_COORDS.Montréal,
  H4: CITY_COORDS.Montréal,
  H5: CITY_COORDS.Montréal,
  H7: CITY_COORDS.Laval,
  H8: CITY_COORDS.Montréal,
  H9: CITY_COORDS.Montréal,
  J4: CITY_COORDS.Longueuil,
  J3: CITY_COORDS.Brossard,
  G1: CITY_COORDS.Québec,
  G2: CITY_COORDS.Québec,
  J8: CITY_COORDS.Gatineau,
  J9: CITY_COORDS.Gatineau,
  J1: CITY_COORDS.Sherbrooke,
};

export const RADIUS_OPTIONS_KM = [5, 10, 25, 50, 100, 200] as const;

export function normalizePostalCode(value: string): string {
  return value.replace(/\s+/g, "").toUpperCase();
}

export function resolvePostalPoint(postalCode: string): GeoPoint | null {
  const normalized = normalizePostalCode(postalCode);
  if (normalized.length < 3) return null;

  const prefix2 = normalized.slice(0, 2);
  return POSTAL_PREFIX_COORDS[prefix2] ?? null;
}

export function getCityPoint(city: string): GeoPoint | null {
  return CITY_COORDS[city] ?? null;
}

/** Distance en km (Haversine) */
export function distanceKm(a: GeoPoint, b: GeoPoint): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

export function formatPostalInput(value: string): string {
  const clean = normalizePostalCode(value).slice(0, 6);
  if (clean.length <= 3) return clean;
  return `${clean.slice(0, 3)} ${clean.slice(3)}`;
}
