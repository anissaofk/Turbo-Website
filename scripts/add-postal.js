const fs = require("fs");
const path = "src/data/cars.ts";
let s = fs.readFileSync(path, "utf8");

const map = {
  Montréal: "H2X 1Y4",
  Laval: "H7N 2E8",
  Longueuil: "J4K 2T5",
  Québec: "G1R 4P5",
  Gatineau: "J8X 3Y9",
  Verdun: "H4G 1J1",
  Sherbrooke: "J1H 1H1",
  Brossard: "J4W 1A1",
  Westmount: "H3Z 2A4",
};

s = s.replace(/location: "([^"]+)",/g, (m, city) => {
  const pc = map[city];
  if (!pc) return m;
  if (s.includes(`location: "${city}",\n    postalCode:`)) return m;
  return `location: "${city}",\n    postalCode: "${pc}",`;
});

fs.writeFileSync(path, s);
console.log("postalCode count", (s.match(/postalCode:/g) || []).length);
