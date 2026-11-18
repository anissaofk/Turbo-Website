const fs = require("fs");
const path = require("path");

const inventoryPath = path.join(__dirname, "autohm-inventory.json");
const inventory = JSON.parse(fs.readFileSync(inventoryPath, "utf8"));

function slugify(s) {
  return String(s)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function mapFuel(f) {
  const x = (f || "").toLowerCase();
  if (x.includes("diesel")) return "Diesel";
  if (x.includes("electric") || x.includes("élect")) return "Électrique";
  if (x.includes("hybrid") || x.includes("plug") || x.includes("phev"))
    return "Hybride";
  return "Essence";
}

function mapTransmission(t) {
  const x = (t || "").toLowerCase();
  if (x.includes("manual") || x.includes("manuelle")) return "Manuelle";
  return "Automatique";
}

function mapBody(b, model) {
  const x = (b || "").toLowerCase();
  const m = (model || "").toLowerCase();
  if (
    x.includes("suv") ||
    x.includes("crossover") ||
    x.includes("truck") ||
    x.includes("pickup")
  )
    return "VUS";
  if (x.includes("coupe") || x.includes("coupé")) return "Coupé";
  if (x.includes("convertible") || x.includes("cabriolet")) return "Cabriolet";
  if (
    x.includes("wagon") ||
    x.includes("van") ||
    x.includes("minivan") ||
    x.includes("familiale")
  )
    return "Familiale";
  if (x.includes("hatch") || x.includes("compact")) return "Compacte";
  if (x.includes("sport")) return "Sportive";
  if (x.includes("sedan") || x.includes("berline")) return "Berline";
  if (
    /tucson|sportage|cx-5|tiguan|escape|cr-v|wrangler|rogue|equinox|rvr|q5|x1|journey|ml |c-hr/.test(
      m,
    )
  )
    return "VUS";
  if (/civic|elantra|forte|a3|a4|soul|clk/.test(m)) return "Berline";
  return "Berline";
}

function mapDrivetrain(d) {
  const x = (d || "").toLowerCase();
  if (x.includes("4wd") || x.includes("4x4") || x.includes("4rm")) return "4x4";
  if (
    x.includes("awd") ||
    x.includes("all") ||
    x.includes("intégr") ||
    x.includes("4matic") ||
    x.includes("quattro")
  )
    return "Intégral";
  if (x.includes("rwd") || x.includes("rear") || x.includes("propul"))
    return "Propulsion";
  return "Traction avant";
}

function mapColor(c) {
  const x = (c || "").toLowerCase();
  const map = {
    gray: "Gris",
    grey: "Gris",
    silver: "Gris",
    black: "Noir",
    white: "Blanc",
    red: "Rouge",
    blue: "Bleu",
    green: "Vert",
    brown: "Autre",
    beige: "Autre",
    orange: "Autre",
    yellow: "Autre",
    gold: "Autre",
    purple: "Autre",
  };
  for (const [en, fr] of Object.entries(map)) {
    if (x.includes(en)) return fr;
  }
  if (!c) return "Autre";
  return c;
}

function estimateHp(engine, cylinders, fuel) {
  const e = engine || "";
  const m = e.match(/(\d(?:\.\d)?)\s*l/i);
  const liters = m ? parseFloat(m[1]) : null;
  if (fuel === "Hybride") return liters && liters >= 2 ? 270 : 190;
  if (fuel === "Électrique") return 200;
  if (liters) {
    if (liters >= 3.5) return 280;
    if (liters >= 3) return 250;
    if (liters >= 2.5) return 200;
    if (liters >= 2) return 180;
    if (liters >= 1.6) return 150;
    return 130;
  }
  if ((cylinders || "").includes("V6") || (cylinders || "").includes("6"))
    return 250;
  return 160;
}

function monthlyFromPrice(price) {
  return Math.round((price * 1.22) / 72);
}

function reliabilityFromYearKm(year, km) {
  const age = Math.max(0, 2026 - year);
  let score = 4.6 - age * 0.08 - (km / 200000) * 0.8;
  score = Math.max(3.2, Math.min(4.9, score));
  return Math.round(score * 10) / 10;
}

const usedIds = new Set();
const cars = inventory.map((v, i) => {
  const fuel = mapFuel(v.fuel);
  const baseModel = String(v.model || "")
    .replace(/\bFORTE\b/gi, "Forte")
    .replace(/\s+/g, " ")
    .trim();
  const modelName = [baseModel, v.trim]
    .filter(Boolean)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
  let id =
    slugify(`${v.make}-${v.model}-${v.year}-${v.stocknumber || v._id.slice(-8)}`);
  if (usedIds.has(id)) id = `${id}-${i + 1}`;
  usedIds.add(id);

  const features = (v.vehicle_options_fr || []).slice(0, 20);
  const tagMap = {
    one_owner: "un propriétaire",
    low_mileage: "faible kilométrage",
  };
  const tags = ["usagé", ...(v.tags || []).map((t) => tagMap[t] || t)];
  if (fuel === "Hybride") tags.push("hybride");
  if (v.special_price) tags.push("offre");

  const price = v.special_price || v.price;
  const kmLabel = new Intl.NumberFormat("fr-CA").format(v.km || 0);
  const priceLabel = new Intl.NumberFormat("fr-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(price);
  const desc = `${v.year} ${v.make} ${modelName} d'occasion — ${kmLabel} km, ${priceLabel}. Chez Financement Auto HM à Mont-Royal : inspecté, prêt à livrer, financement disponible.`;

  const images = (v.photo || []).filter(Boolean);
  if (!images.length) {
    images.push(
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1600&q=80",
    );
  }

  const createdAt = (v.entrydate || "2026-11-01").slice(0, 10);

  return {
    id,
    make: v.make,
    model: modelName || v.model,
    year: v.year,
    price,
    monthlyPayment: v.price_per_month || monthlyFromPrice(price),
    downPayment: 0,
    mileage: v.km || 0,
    fuel,
    transmission: mapTransmission(v.transtype),
    bodyType: mapBody(v.body_type, modelName || v.model),
    powerHp: estimateHp(v.engine, v.cylinders, fuel),
    color: mapColor(v.base_ext_color),
    doors: v.doors || 4,
    seats: v.passengers || 5,
    drivetrain: mapDrivetrain(v.drivetrain),
    description: desc,
    features: features.length
      ? features
      : ["Financement disponible", "Inspecté"],
    tags,
    images: images.slice(0, 5),
    location: "Mont-Royal",
    postalCode: "H4P 1K5",
    seller: {
      name: "Financement Auto HM",
      type: "Concessionnaire",
      city: v.dealer_info?.city || v.dealer_city || "Mont-Royal",
      phone: "+1 514 500 0073",
      rating: 4.7,
    },
    category: "usage",
    reliability: reliabilityFromYearKm(v.year, v.km || 0),
    certified: true,
    offer: Boolean(v.special_price),
    featured: false,
    createdAt,
  };
});

cars.sort(
  (a, b) => b.createdAt.localeCompare(a.createdAt) || b.year - a.year,
);
cars.forEach((car, i) => {
  car.featured = i < 6;
});

function serialize(value, indent = 0) {
  const pad = "  ".repeat(indent);
  const padIn = "  ".repeat(indent + 1);
  if (Array.isArray(value)) {
    if (value.length === 0) return "[]";
    if (value.every((x) => typeof x === "string")) {
      return `[\n${value.map((x) => `${padIn}${JSON.stringify(x)},`).join("\n")}\n${pad}]`;
    }
    return `[\n${value.map((x) => `${padIn}${serialize(x, indent + 1)},`).join("\n")}\n${pad}]`;
  }
  if (value && typeof value === "object") {
    const entries = Object.entries(value);
    return `{\n${entries
      .map(([k, v]) => `${padIn}${k}: ${serialize(v, indent + 1)},`)
      .join("\n")}\n${pad}}`;
  }
  return JSON.stringify(value);
}

const helpers = `
export function getCarById(id: string): Car | undefined {
  return cars.find((car) => car.id === id);
}

export function getFeaturedCars(): Car[] {
  return cars.filter((car) => car.featured);
}

export function getCarsByCategory(category: Car["category"]): Car[] {
  return cars.filter((car) => car.category === category);
}

export { getAllMakes as getMakes } from "./makes";

export function getLocations(): string[] {
  return [...new Set(cars.map((car) => car.location))].sort();
}

export function getCommonFeatures(): string[] {
  const counts = new Map<string, number>();
  for (const car of cars) {
    for (const feature of car.features) {
      counts.set(feature, (counts.get(feature) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "fr"))
    .map(([feature]) => feature);
}
`;

const out = `import type { Car } from "@/types";

/** Inventaire Financement Auto HM (occasion) — financementautohm.com/fr/occasion */
export const cars: Car[] = ${serialize(cars)};
${helpers}`;

fs.writeFileSync("c:/github/Turbo-Website/src/data/cars.ts", out, "utf8");
console.log("wrote", cars.length, "cars");
for (const c of cars.slice(0, 5)) {
  console.log(`${c.id} | $${c.price} | ${c.mileage} km | ${c.bodyType} | ${c.fuel}`);
}
