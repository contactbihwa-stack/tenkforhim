// app/data/subthemes.ts
export type Subtheme = { id: string; name: string; tagline?: string };

const padToTen = (prefix: string, names: string[]): Subtheme[] => {
  const arr = names.slice(0, 10);
  while (arr.length < 10) arr.push("???");
  return arr.map((name, i) => ({
    id: `${prefix}-${String(i + 1).padStart(2, "0")}`,
    name,
    tagline: "", // UI에서 안전하게 사용 가능하도록 빈 문자열
  }));
};

// SUN (확정 10)
const SUN = padToTen("SUN", [
  "IGNITION",
  "Solar Embrace",
  "Aureate Throne",
  "Red March, Black Ledger,",
  "Dear Rocket Boy",
  "Chasing Horizons",
  "Endless Sunset",
  "Lucid Reverie",
  "Riff&Boogie",
  "Let's Rock",
]);

// MER (확정 10)
const MER = padToTen("MER", [
  "Street X",
  "Afterglow Vacation",
  "17:22",
  "CASH GOD",
  "Ugly Truth",
  "Ten Shots",
  "Orbit of Us",
  "Crown Me Bitch",
  "We Are the One",
  "Let's Hip-hop",
]);

// VEN (확정 3 + 나머지 ???)
const VEN = padToTen("VEN", [
  "Letters to Venus",
  "Emerald Memory",
  "The Starter Wife",
]);

// 나머지는 자리표시자(???)
const EAR = padToTen("EAR", []);
const AI  = padToTen("AI",  []);
const MAR = padToTen("MAR", []);
const JUP = padToTen("JUP", []);
const SAT = padToTen("SAT", []);
const COS = padToTen("COS", []);
const YOU = padToTen("YOU", []);

export const subthemesByPlanet: Record<string, Subtheme[]> = {
  SUN, MER, VEN, EAR, AI, MAR, JUP, SAT, COS, YOU,
};
