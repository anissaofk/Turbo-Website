import { MAKES } from "@/data/makes";
import type { FuelType, ListingCategory, SmartIntent } from "@/types";

/** Alias → nom affiché (AutoHebdo) */
const MAKE_ALIASES: Record<string, string> = {
  vw: "Volkswagen",
  chevy: "Chevrolet",
  mercedes: "Mercedes-Benz",
  benz: "Mercedes-Benz",
  "mercedes benz": "Mercedes-Benz",
  landrover: "Land Rover",
  "land rover": "Land Rover",
  alfa: "Alfa Romeo",
  "alfa romeo": "Alfa Romeo",
  mini: "MINI",
  ram: "RAM",
  gm: "GMC",
  lambo: "Lamborghini",
  rolls: "Rolls-Royce",
  "rolls royce": "Rolls-Royce",
  aston: "Aston Martin",
  "aston martin": "Aston Martin",
  citroen: "Citroën",
  "ds automobiles": "DS Automobiles",
  ds: "DS Automobiles",
};

/**
 * Parse une intention en langage naturel (FR).
 * Ex. : « Je veux une sportive fiable à moins de 700 $ par mois, sans mise de fonds »
 */
export function parseSmartIntent(raw: string): SmartIntent {
  const text = raw.trim().toLowerCase();
  const intent: SmartIntent = { raw: raw.trim() };

  if (!text) return intent;

  // Paiement mensuel : 700$/mois, moins de 700, sous 700 par mois
  const monthly =
    text.match(
      /(?:moins de|sous|max(?:imum)?|jusqu['’]à|under|<)\s*(\d[\d\s]*)\s*\$?\s*(?:\/\s*)?(?:par\s+)?mois/,
    ) ||
    text.match(/(\d[\d\s]*)\s*\$?\s*(?:\/\s*)?(?:par\s+)?mois/) ||
    text.match(/(\d[\d\s]*)\s*\$\s*(?:mensuel(?:le)?|\/mo)/);

  if (monthly) {
    intent.monthlyMax = Number(monthly[1].replace(/\s/g, ""));
  }

  // Prix d'achat plafond
  const price =
    text.match(
      /(?:moins de|sous|max(?:imum)?|jusqu['’]à)\s*(\d[\d\s]*)\s*\$?(?!\s*(?:par\s+)?mois)/,
    ) || text.match(/budget\s*(?:de\s*)?(\d[\d\s]*)/);

  if (price && !intent.monthlyMax) {
    const value = Number(price[1].replace(/\s/g, ""));
    if (value >= 1000) intent.priceMax = value;
  }

  // Mise de fonds
  if (
    /sans mise de fonds|0\s*\$?\s*mise|aucune mise|pas de mise|no down/.test(
      text,
    )
  ) {
    intent.noDownPayment = true;
    intent.downPaymentMax = 0;
  } else {
    const down = text.match(
      /mise de fonds\s*(?:de\s*|max(?:imum)?\s*|<\s*)?(\d[\d\s]*)/,
    );
    if (down) intent.downPaymentMax = Number(down[1].replace(/\s/g, ""));
  }

  // Sportive
  if (/sportive|sport|coupé|coupe|gt|gti|mustang|cayman|performance/.test(text)) {
    intent.sporty = true;
  }

  // Fiable
  if (/fiable|fiabilit|reliable|solide|durable|serein/.test(text)) {
    intent.reliable = true;
  }

  // Carburant
  if (/électri|electric|tesla|ev\b/.test(text)) intent.fuel = "Électrique";
  else if (/hybride|hybrid/.test(text)) intent.fuel = "Hybride";
  else if (/diesel/.test(text)) intent.fuel = "Diesel";
  else if (/essence|petrol|gazoline|gas\b/.test(text)) intent.fuel = "Essence";

  // Carrosserie
  if (/vus|suv|crossover/.test(text)) intent.bodyType = "VUS";
  else if (/berline|sedan/.test(text)) intent.bodyType = "Berline";
  else if (/familiale|break|wagon/.test(text)) intent.bodyType = "Familiale";
  else if (/cabriolet|convertible/.test(text)) intent.bodyType = "Cabriolet";
  else if (/compacte|hatch/.test(text)) intent.bodyType = "Compacte";
  else if (intent.sporty) intent.bodyType = "Sportive";

  // Catégorie
  if (/reprise de bail|lease take|lease|bail/.test(text)) {
    intent.category = "lease-takeover";
  } else if (/location entre particulier|louer (?:chez |d['’])?un particulier|peer/.test(text)) {
    intent.category = "location-particulier";
  } else if (/location|louer|rental/.test(text)) {
    intent.category = "location";
  } else if (/inspection|garage|mécanicien|pré-?achat/.test(text)) {
    intent.category = "inspection";
  } else if (/neuf|new car|offre|promotion/.test(text)) {
    intent.category = "neuf";
  } else if (/usag[ée]|occasion|used/.test(text)) {
    intent.category = "usage";
  }

  // Marque (plus longues d'abord pour "Land Rover", "Mercedes-Benz"…)
  const makeCandidates = [
    ...MAKES.map((m) => m.toLowerCase()),
    ...Object.keys(MAKE_ALIASES),
  ].sort((a, b) => b.length - a.length);

  for (const make of makeCandidates) {
    if (text.includes(make)) {
      intent.make =
        MAKE_ALIASES[make] ??
        MAKES.find((m) => m.toLowerCase() === make) ??
        make;
      break;
    }
  }

  return intent;
}

export function intentToQuery(intent: SmartIntent): Record<string, string> {
  const q: Record<string, string> = {};
  if (intent.raw) q.intent = intent.raw;
  if (intent.monthlyMax != null) q.monthlyMax = String(intent.monthlyMax);
  if (intent.downPaymentMax != null) {
    q.downPaymentMax = String(intent.downPaymentMax);
  }
  if (intent.priceMax != null) q.priceMax = String(intent.priceMax);
  if (intent.sporty) q.sporty = "1";
  if (intent.reliable) q.reliable = "1";
  if (intent.fuel) q.fuel = intent.fuel;
  if (intent.bodyType) q.bodyType = intent.bodyType;
  if (intent.category) q.category = intent.category;
  if (intent.make) q.make = intent.make;
  q.sort = "monthly-asc";
  return q;
}

export function describeIntent(intent: SmartIntent): string[] {
  const chips: string[] = [];
  if (intent.sporty) chips.push("Sportive");
  if (intent.reliable) chips.push("Fiable");
  if (intent.monthlyMax != null) {
    chips.push(`≤ ${intent.monthlyMax} $/mois`);
  }
  if (intent.noDownPayment || intent.downPaymentMax === 0) {
    chips.push("Sans mise de fonds");
  } else if (intent.downPaymentMax != null) {
    chips.push(`Mise de fonds ≤ ${intent.downPaymentMax} $`);
  }
  if (intent.category) chips.push(labelCategory(intent.category));
  if (intent.fuel) chips.push(intent.fuel);
  if (intent.bodyType && !intent.sporty) chips.push(intent.bodyType);
  if (intent.make) chips.push(intent.make);
  if (intent.priceMax != null) chips.push(`≤ ${intent.priceMax} $`);
  return chips;
}

function labelCategory(category: ListingCategory): string {
  const map: Record<ListingCategory, string> = {
    neuf: "Neuf & offres",
    usage: "Usagés",
    location: "Offres de locations",
    "lease-takeover": "Reprise de bail",
    inspection: "Inspection & garage",
    "location-particulier": "Location particulier",
  };
  return map[category];
}

export function isFuelType(value: string): value is FuelType {
  return ["Essence", "Diesel", "Hybride", "Électrique"].includes(value);
}
