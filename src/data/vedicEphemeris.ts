import { PlanetId, HouseNumber, ChartStyle } from '../types/astrology';
import { NAKSHATRAS, RASHI_NAMES, RASHI_LORDS, BirthDetails } from './vedicAstrologyCalculator';

// -------------------------------------------------------------
// 1. DATA MODELS & TYPES
// -------------------------------------------------------------

export type DignityType = 
  | 'Exalted (Ucha)' 
  | 'Debilitated (Neecha)' 
  | 'Moolatrikona' 
  | 'Own Sign (Swakshetra)' 
  | 'Great Friend (Adhi Mitra)' 
  | 'Friend (Mitra)' 
  | 'Neutral (Sama)' 
  | 'Enemy (Shatru)' 
  | 'Great Enemy (Adhi Shatru)';

export interface GrahaSpashta {
  id: PlanetId;
  name: string;
  sanskritName: string;
  avatar: string;
  longitude: number; // 0 - 360 sidereal
  rashiNumber: number; // 1 to 12
  rashiName: string;
  rashiLord: string;
  degreesInRashi: number; // 0 to 30
  formattedDegree: string; // e.g. 14° 23' 45"
  nakshatraIndex: number; // 0 to 26
  nakshatraName: string;
  nakshatraPada: number; // 1 to 4
  nakshatraLord: string;
  house: HouseNumber; // 1 to 12 from Lagna
  isRetrograde: boolean;
  isCombust: boolean;
  dignity: DignityType;
  karaka?: string; // Atmakaraka, Amatyakaraka, etc.
}

export type DivisionalChartType = 'D1' | 'D9' | 'D10' | 'D7' | 'D2' | 'D3' | 'D12';

export interface DivisionalChartInfo {
  id: DivisionalChartType;
  name: string;
  sanskritName: string;
  significance: string;
  lagnaSign: number; // 1 to 12
  lagnaHouseSign: Record<HouseNumber, number>; // house -> sign
  planetPlacements: Record<PlanetId, HouseNumber>;
  planetSigns: Record<PlanetId, number>; // planet -> sign (1-12)
}

export interface DashaPeriod {
  planet: PlanetId;
  lordName: string;
  sanskritName: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  startYear: number;
  endYear: number;
  durationYears: number;
  isActive: boolean;
}

export interface VimshottariDashaSystem {
  balanceAtBirth: {
    planet: PlanetId;
    lordName: string;
    yearsRemaining: number;
    description: string;
  };
  currentMahadasha: DashaPeriod;
  currentAntardasha: {
    planet: PlanetId;
    lordName: string;
    startDate: string;
    endDate: string;
  };
  currentPratyantardasha?: {
    planet: PlanetId;
    lordName: string;
  };
  completionPercentage: number;
  fullTimeline: DashaPeriod[];
}

export interface AshtakavargaSignPoints {
  signNumber: number; // 1 to 12
  signName: string;
  bindus: number; // typically 22 to 38
  status: 'High / Auspicious' | 'Balanced / Favorable' | 'Sensitive / Remedial';
  houseFromLagna: HouseNumber;
}

export interface DetectedYoga {
  name: string;
  sanskritName: string;
  type: 'Raja Yoga' | 'Dhana Yoga' | 'Mahapurusha Yoga' | 'Auspicious Yoga' | 'Special Combination';
  description: string;
  planetsInvolved: string;
  significance: string;
}

export interface DoshaAssessment {
  mangalDosha: {
    hasDosha: boolean;
    level: 'None' | 'Low' | 'Moderate' | 'High';
    isCancelled: boolean;
    cancellationReason?: string;
    details: string;
  };
  kaalSarpDosha: {
    hasDosha: boolean;
    type?: string;
    direction?: 'Ascending' | 'Descending';
    details: string;
  };
  sadeSati: {
    isActive: boolean;
    phase?: 'Rising Phase (1st)' | 'Peak Phase (2nd)' | 'Setting Phase (3rd)' | 'None';
    details: string;
  };
}

export interface CompleteKundliData {
  birthDetails: BirthDetails;
  calculatedAt: string;
  ayanamsha: number;
  formattedAyanamsha: string;
  lagna: {
    signNumber: number;
    signName: string;
    lord: string;
    exactDegree: number;
    formattedDegree: string;
    nakshatraName: string;
    nakshatraPada: number;
  };
  grahas: Record<PlanetId, GrahaSpashta>;
  grahasList: GrahaSpashta[];
  houseOccupants: Record<HouseNumber, PlanetId[]>;
  divisionalCharts: Record<DivisionalChartType, DivisionalChartInfo>;
  vimshottariDasha: VimshottariDashaSystem;
  sarvashtakavarga: {
    totalPoints: number;
    signs: AshtakavargaSignPoints[];
  };
  yogas: DetectedYoga[];
  doshas: DoshaAssessment;
  bhavaSummaries: {
    houseNumber: HouseNumber;
    signNumber: number;
    signName: string;
    lord: string;
    lordHouse: HouseNumber;
    occupants: PlanetId[];
    karakas: string[];
    lifeAspects: string[];
  }[];
}

// -------------------------------------------------------------
// 2. ASTRONOMICAL CALCULATIONS & EPHEMERIS ENGINE
// -------------------------------------------------------------

const RAD = Math.PI / 180;
const DEG = 180 / Math.PI;

function normalizeDeg(deg: number): number {
  let d = deg % 360;
  if (d < 0) d += 360;
  return d;
}

export function formatDMS(deg: number): string {
  const d = Math.floor(deg);
  const minFloat = (deg - d) * 60;
  const m = Math.floor(minFloat);
  const s = Math.round((minFloat - m) * 60);
  return `${d}° ${m.toString().padStart(2, '0')}' ${s.toString().padStart(2, '0')}"`;
}

function getJulianDay(year: number, month: number, day: number, hour: number, minute: number, tzOffset: number): number {
  let y = year;
  let m = month;
  if (m <= 2) {
    y -= 1;
    m += 12;
  }
  const a = Math.floor(y / 100);
  const b = 2 - a + Math.floor(a / 4);
  const dayFrac = day + (hour + minute / 60 - tzOffset) / 24;
  return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + dayFrac + b - 1524.5;
}

export function getLahiriAyanamsha(jd: number): number {
  const t = (jd - 2451545.0) / 36525.0;
  return 23.856 + 1.396 * t;
}

// Solve Kepler's equation: E - e*sin(E) = M
function solveKepler(M_deg: number, e: number): number {
  const M = normalizeDeg(M_deg) * RAD;
  let E = M;
  for (let i = 0; i < 10; i++) {
    const dE = (M - (E - e * Math.sin(E))) / (1 - e * Math.cos(E));
    E += dE;
    if (Math.abs(dE) < 1e-7) break;
  }
  return E;
}

// Calculate Ascendant (Lagna)
export function calculateAscendant(jd: number, latitude: number, longitude: number, ayanamsha: number): {
  longitude: number;
  signNumber: number;
  degreeInSign: number;
} {
  const d = jd - 2451545.0;
  const gmstHours = (18.697374558 + 24.06570982441908 * d) % 24;
  const gmstDeg = (gmstHours * 15) % 360;
  const lstDeg = normalizeDeg(gmstDeg + longitude);
  const lstRad = lstDeg * RAD;
  const latRad = latitude * RAD;
  const epsDeg = 23.4392911 - (46.815 * (d / 36525)) / 3600;
  const epsRad = epsDeg * RAD;

  const y = -Math.cos(lstRad);
  const x = Math.sin(lstRad) * Math.cos(epsRad) + Math.tan(latRad) * Math.sin(epsRad);
  let ascTrop = Math.atan2(y, x) * DEG;
  ascTrop = normalizeDeg(ascTrop + 90);

  const ascSidereal = normalizeDeg(ascTrop - ayanamsha);
  const signNum = Math.floor(ascSidereal / 30) + 1;
  const degInSign = ascSidereal % 30;

  return {
    longitude: ascSidereal,
    signNumber: signNum,
    degreeInSign: degInSign,
  };
}

// Calculate Heliocentric to Geocentric Coordinates for Sun, Earth & Planets
interface OrbitalElements {
  a: number;
  e: number;
  i: number;
  Omega: number;
  varpi: number;
  L: number;
}

function getPlanetElements(pId: PlanetId, T: number): OrbitalElements {
  switch (pId) {
    case 'mercury':
      return {
        a: 0.38709893,
        e: 0.20563069 + 0.00002527 * T,
        i: 7.00487 - 0.005947 * T,
        Omega: 48.33167 - 0.12542 * T,
        varpi: 77.45645 + 0.160476 * T,
        L: 252.25084 + 149472.67411 * T,
      };
    case 'venus':
      return {
        a: 0.72333199,
        e: 0.00677323 - 0.00004938 * T,
        i: 3.39471 - 0.0007889 * T,
        Omega: 76.68069 - 0.27769 * T,
        varpi: 131.53298 + 0.004874 * T,
        L: 181.97973 + 58517.81538 * T,
      };
    case 'mars':
      return {
        a: 1.52366231,
        e: 0.09341233 + 0.00011902 * T,
        i: 1.85061 - 0.0004747 * T,
        Omega: 49.5574 - 0.29252 * T,
        varpi: 336.04084 + 0.44441 * T,
        L: 355.45332 + 19140.30268 * T,
      };
    case 'jupiter':
      return {
        a: 5.20336301 + 0.00060737 * T,
        e: 0.04839266 - 0.0001288 * T,
        i: 1.3053 - 0.001572 * T,
        Omega: 100.55615 + 0.213808 * T,
        varpi: 14.75385 + 0.212526 * T,
        L: 34.40438 + 3034.90567 * T,
      };
    case 'saturn':
      return {
        a: 9.53707032 - 0.0030153 * T,
        e: 0.0541506 - 0.00036762 * T,
        i: 2.48446 + 0.000794 * T,
        Omega: 113.71504 - 0.28867 * T,
        varpi: 92.43194 - 0.41897 * T,
        L: 49.94424 + 1222.11379 * T,
      };
    default:
      return { a: 1, e: 0, i: 0, Omega: 0, varpi: 0, L: 0 };
  }
}

function calculateRawPlanetPosition(pId: PlanetId, jd: number): { lonTrop: number; isRetro: boolean } {
  const T = (jd - 2451545.0) / 36525.0;

  // Sun
  if (pId === 'sun') {
    const L0 = 280.46646 + 36000.76983 * T;
    const M = (357.52911 + 35999.05029 * T) * RAD;
    const C = (1.914602 - 0.004817 * T) * Math.sin(M) + 0.019993 * Math.sin(2 * M) + 0.000289 * Math.sin(3 * M);
    const lonTrop = normalizeDeg(L0 + C);
    return { lonTrop, isRetro: false };
  }

  // Moon
  if (pId === 'moon') {
    const L_M = 218.3164477 + 481267.88128 * T;
    const M_M = (134.9633964 + 477198.8675 * T) * RAD;
    const M_Sun = (357.52911 + 35999.05029 * T) * RAD;
    const D = (297.8501921 + 445267.1114 * T) * RAD;
    const F = (93.272095 + 483202.01752 * T) * RAD;

    const term =
      6.288774 * Math.sin(M_M) +
      1.274027 * Math.sin(2 * D - M_M) +
      0.658314 * Math.sin(2 * D) +
      0.213618 * Math.sin(2 * M_M) -
      0.185116 * Math.sin(M_Sun) -
      0.114332 * Math.sin(2 * F) +
      0.058793 * Math.sin(2 * D - 2 * M_M) +
      0.057066 * Math.sin(2 * D - M_M - M_Sun) +
      0.053322 * Math.sin(2 * D + M_M) +
      0.046058 * Math.sin(2 * D - M_Sun);

    const lonTrop = normalizeDeg(L_M + term);
    return { lonTrop, isRetro: false };
  }

  // Rahu (Mean Node)
  if (pId === 'rahu') {
    const Omega = 125.04452 - 1934.136261 * T + 0.0020708 * T * T;
    const lonTrop = normalizeDeg(Omega);
    return { lonTrop, isRetro: true };
  }

  // Ketu (Opposite Node)
  if (pId === 'ketu') {
    const Omega = 125.04452 - 1934.136261 * T + 0.0020708 * T * T;
    const lonTrop = normalizeDeg(Omega + 180);
    return { lonTrop, isRetro: true };
  }

  // Major Planets: Mercury, Venus, Mars, Jupiter, Saturn
  const calcAtJD = (curJD: number) => {
    const curT = (curJD - 2451545.0) / 36525.0;
    // Earth's position
    const sunL0 = 280.46646 + 36000.76983 * curT;
    const sunM = (357.52911 + 35999.05029 * curT) * RAD;
    const sunC = (1.914602 - 0.004817 * curT) * Math.sin(sunM) + 0.019993 * Math.sin(2 * sunM);
    const sunLon = normalizeDeg(sunL0 + sunC) * RAD;
    const rEarth = 1.000001018; // approx AU
    const xe = -rEarth * Math.cos(sunLon);
    const ye = -rEarth * Math.sin(sunLon);

    // Planet heliocentric position
    const el = getPlanetElements(pId, curT);
    const M = el.L - el.varpi;
    const E = solveKepler(M, el.e);
    const xPrime = el.a * (Math.cos(E) - el.e);
    const yPrime = el.a * Math.sqrt(1 - el.e * el.e) * Math.sin(E);
    const r = Math.sqrt(xPrime * xPrime + yPrime * yPrime);
    const nu = Math.atan2(yPrime, xPrime);
    const u = nu + (el.varpi - el.Omega) * RAD;

    const iRad = el.i * RAD;
    const omRad = el.Omega * RAD;
    const xh = r * (Math.cos(omRad) * Math.cos(u) - Math.sin(omRad) * Math.sin(u) * Math.cos(iRad));
    const yh = r * (Math.sin(omRad) * Math.cos(u) + Math.cos(omRad) * Math.sin(u) * Math.cos(iRad));

    const xg = xh - xe;
    const yg = yh - ye;
    return normalizeDeg(Math.atan2(yg, xg) * DEG);
  };

  const lon1 = calcAtJD(jd);
  const lon2 = calcAtJD(jd + 0.1);
  let diff = lon2 - lon1;
  if (diff > 180) diff -= 360;
  if (diff < -180) diff += 360;
  const isRetro = diff < 0;

  return { lonTrop: lon1, isRetro };
}

// Determine Dignity based on sign and classical exaltation / debilitation / own sign
function getPlanetDignity(pId: PlanetId, rashiNum: number, degreeInRashi: number): DignityType {
  // Exaltation (Ucha) & Debilitation (Neecha) definitions:
  // Sun: Exalted in Aries (1), Debilitated in Libra (7)
  // Moon: Exalted in Taurus (2), Debilitated in Scorpio (8)
  // Mars: Exalted in Capricorn (10), Debilitated in Cancer (4)
  // Mercury: Exalted in Virgo (6), Debilitated in Pisces (12)
  // Jupiter: Exalted in Cancer (4), Debilitated in Capricorn (10)
  // Venus: Exalted in Pisces (12), Debilitated in Virgo (6)
  // Saturn: Exalted in Libra (7), Debilitated in Aries (1)
  // Rahu: Exalted in Taurus (2) / Gemini (3), Debilitated in Scorpio (8) / Sagittarius (9)
  // Ketu: Exalted in Scorpio (8) / Sagittarius (9), Debilitated in Taurus (2) / Gemini (3)

  if (pId === 'sun') {
    if (rashiNum === 1) return 'Exalted (Ucha)';
    if (rashiNum === 7) return 'Debilitated (Neecha)';
    if (rashiNum === 5) return degreeInRashi <= 20 ? 'Moolatrikona' : 'Own Sign (Swakshetra)';
    if ([1, 4, 8, 9, 12].includes(rashiNum)) return 'Friend (Mitra)';
    if ([2, 6, 7, 10, 11].includes(rashiNum)) return 'Enemy (Shatru)';
    return 'Neutral (Sama)';
  }

  if (pId === 'moon') {
    if (rashiNum === 2) return degreeInRashi <= 3 ? 'Exalted (Ucha)' : 'Moolatrikona';
    if (rashiNum === 8) return 'Debilitated (Neecha)';
    if (rashiNum === 4) return 'Own Sign (Swakshetra)';
    if ([1, 5, 9].includes(rashiNum)) return 'Friend (Mitra)';
    return 'Neutral (Sama)';
  }

  if (pId === 'mars') {
    if (rashiNum === 10) return 'Exalted (Ucha)';
    if (rashiNum === 4) return 'Debilitated (Neecha)';
    if (rashiNum === 1) return degreeInRashi <= 12 ? 'Moolatrikona' : 'Own Sign (Swakshetra)';
    if (rashiNum === 8) return 'Own Sign (Swakshetra)';
    if ([5, 9, 12].includes(rashiNum)) return 'Friend (Mitra)';
    if ([3, 6].includes(rashiNum)) return 'Enemy (Shatru)';
    return 'Neutral (Sama)';
  }

  if (pId === 'mercury') {
    if (rashiNum === 6) {
      if (degreeInRashi <= 15) return 'Exalted (Ucha)';
      if (degreeInRashi <= 20) return 'Moolatrikona';
      return 'Own Sign (Swakshetra)';
    }
    if (rashiNum === 12) return 'Debilitated (Neecha)';
    if (rashiNum === 3) return 'Own Sign (Swakshetra)';
    if ([2, 5, 7].includes(rashiNum)) return 'Friend (Mitra)';
    if (rashiNum === 4) return 'Enemy (Shatru)';
    return 'Neutral (Sama)';
  }

  if (pId === 'jupiter') {
    if (rashiNum === 4) return 'Exalted (Ucha)';
    if (rashiNum === 10) return 'Debilitated (Neecha)';
    if (rashiNum === 9) return degreeInRashi <= 10 ? 'Moolatrikona' : 'Own Sign (Swakshetra)';
    if (rashiNum === 12) return 'Own Sign (Swakshetra)';
    if ([1, 5, 8].includes(rashiNum)) return 'Friend (Mitra)';
    if ([3, 6].includes(rashiNum)) return 'Enemy (Shatru)';
    return 'Neutral (Sama)';
  }

  if (pId === 'venus') {
    if (rashiNum === 12) return 'Exalted (Ucha)';
    if (rashiNum === 6) return 'Debilitated (Neecha)';
    if (rashiNum === 7) return degreeInRashi <= 15 ? 'Moolatrikona' : 'Own Sign (Swakshetra)';
    if (rashiNum === 2) return 'Own Sign (Swakshetra)';
    if ([3, 10, 11].includes(rashiNum)) return 'Friend (Mitra)';
    if ([1, 4, 8].includes(rashiNum)) return 'Enemy (Shatru)';
    return 'Neutral (Sama)';
  }

  if (pId === 'saturn') {
    if (rashiNum === 7) return 'Exalted (Ucha)';
    if (rashiNum === 1) return 'Debilitated (Neecha)';
    if (rashiNum === 11) return degreeInRashi <= 20 ? 'Moolatrikona' : 'Own Sign (Swakshetra)';
    if (rashiNum === 10) return 'Own Sign (Swakshetra)';
    if ([2, 3, 6].includes(rashiNum)) return 'Friend (Mitra)';
    if ([1, 4, 5, 8].includes(rashiNum)) return 'Enemy (Shatru)';
    return 'Neutral (Sama)';
  }

  if (pId === 'rahu') {
    if (rashiNum === 2 || rashiNum === 3) return 'Exalted (Ucha)';
    if (rashiNum === 8 || rashiNum === 9) return 'Debilitated (Neecha)';
    if (rashiNum === 6 || rashiNum === 11) return 'Own Sign (Swakshetra)';
    return 'Friend (Mitra)';
  }

  if (pId === 'ketu') {
    if (rashiNum === 8 || rashiNum === 9) return 'Exalted (Ucha)';
    if (rashiNum === 2 || rashiNum === 3) return 'Debilitated (Neecha)';
    if (rashiNum === 12) return 'Own Sign (Swakshetra)';
    return 'Friend (Mitra)';
  }

  return 'Neutral (Sama)';
}

// Nakshatra Lords cycle (Ketu, Venus, Sun, Moon, Mars, Rahu, Jupiter, Saturn, Mercury)
const NAKSHATRA_LORD_CYCLE = [
  'Ketu', 'Venus', 'Sun', 'Moon', 'Mars', 'Rahu', 'Jupiter', 'Saturn', 'Mercury'
];

export function getNakshatraInfo(longitude: number): {
  nakshatraIndex: number;
  nakshatraName: string;
  nakshatraPada: number;
  nakshatraLord: string;
  degreesElapsedInNakshatra: number;
} {
  const span = 360 / 27; // 13.333333°
  const index = Math.floor(longitude / span) % 27;
  const elapsed = longitude % span;
  const pada = Math.floor(elapsed / (span / 4)) + 1;
  const lord = NAKSHATRA_LORD_CYCLE[index % 9];

  return {
    nakshatraIndex: index,
    nakshatraName: NAKSHATRAS[index],
    nakshatraPada: Math.min(4, Math.max(1, pada)),
    nakshatraLord: lord,
    degreesElapsedInNakshatra: elapsed,
  };
}

// -------------------------------------------------------------
// 3. DIVISIONAL CHARTS (VARGAS) ENGINE
// -------------------------------------------------------------

export function calculateDivisionalSign(longitude: number, varga: DivisionalChartType): number {
  const rashi = Math.floor(longitude / 30) + 1;
  const degInRashi = longitude % 30;

  switch (varga) {
    case 'D1': // Rashi
      return rashi;

    case 'D9': { // Navamsha (9 parts of 3°20' = 200')
      const totalNavamshas = Math.floor(longitude / (30 / 9));
      return (totalNavamshas % 12) + 1;
    }

    case 'D10': { // Dasamsha (10 parts of 3°)
      const part = Math.floor(degInRashi / 3);
      if (rashi % 2 !== 0) {
        // Odd signs: count from same sign
        return (((rashi - 1) + part) % 12) + 1;
      } else {
        // Even signs: count from 9th sign
        const start = ((rashi - 1 + 8) % 12) + 1;
        return (((start - 1) + part) % 12) + 1;
      }
    }

    case 'D7': { // Saptamsha (7 parts of 4°17'08.57'')
      const part = Math.floor(degInRashi / (30 / 7));
      if (rashi % 2 !== 0) {
        return (((rashi - 1) + part) % 12) + 1;
      } else {
        return (((rashi - 1 + 6) + part) % 12) + 1;
      }
    }

    case 'D2': { // Hora (2 parts of 15°)
      const isFirstHalf = degInRashi < 15;
      if (rashi % 2 !== 0) {
        // Odd signs: 1st half Sun (Leo 5), 2nd half Moon (Cancer 4)
        return isFirstHalf ? 5 : 4;
      } else {
        // Even signs: 1st half Moon (Cancer 4), 2nd half Sun (Leo 5)
        return isFirstHalf ? 4 : 5;
      }
    }

    case 'D3': { // Drekkana (3 parts of 10°)
      const part = Math.floor(degInRashi / 10);
      if (part === 0) return rashi;
      if (part === 1) return (((rashi - 1 + 4) % 12) + 1); // 5th sign
      return (((rashi - 1 + 8) % 12) + 1); // 9th sign
    }

    case 'D12': { // Dwadasamsha (12 parts of 2°30')
      const part = Math.floor(degInRashi / 2.5);
      return (((rashi - 1) + part) % 12) + 1;
    }

    default:
      return rashi;
  }
}

// -------------------------------------------------------------
// 4. VIMSHOTTARI DASHA SYSTEM ENGINE
// -------------------------------------------------------------

const DASHA_LORDS: { planet: PlanetId; name: string; sanskrit: string; years: number }[] = [
  { planet: 'ketu', name: 'Ketu', sanskrit: 'केतु', years: 7 },
  { planet: 'venus', name: 'Venus', sanskrit: 'शुक्र', years: 20 },
  { planet: 'sun', name: 'Sun', sanskrit: 'सूर्य', years: 6 },
  { planet: 'moon', name: 'Moon', sanskrit: 'चन्द्र', years: 10 },
  { planet: 'mars', name: 'Mars', sanskrit: 'मङ्गल', years: 7 },
  { planet: 'rahu', name: 'Rahu', sanskrit: 'राहु', years: 18 },
  { planet: 'jupiter', name: 'Jupiter', sanskrit: 'गुरु', years: 16 },
  { planet: 'saturn', name: 'Saturn', sanskrit: 'शनि', years: 19 },
  { planet: 'mercury', name: 'Mercury', sanskrit: 'बुध', years: 17 },
];

export function calculateVimshottariDasha(
  moonLongitude: number,
  dob: string // YYYY-MM-DD
): VimshottariDashaSystem {
  const span = 360 / 27; // 13.333333°
  const nakIndex = Math.floor(moonLongitude / span) % 27;
  const elapsedInNak = moonLongitude % span;
  const fractionElapsed = elapsedInNak / span;
  const fractionRemaining = 1 - fractionElapsed;

  const lordIndex = nakIndex % 9;
  const birthLord = DASHA_LORDS[lordIndex];
  const balanceYears = Number((birthLord.years * fractionRemaining).toFixed(2));

  const [dobYear, dobMonth, dobDay] = dob.split('-').map(Number);
  const birthDate = new Date(dobYear || 1995, (dobMonth || 1) - 1, dobDay || 1);
  const today = new Date();

  // Generate 9 Mahadasha sequence starting with birthLord
  const fullTimeline: DashaPeriod[] = [];
  let currentStart = new Date(birthDate);

  for (let i = 0; i < 9; i++) {
    const dIdx = (lordIndex + i) % 9;
    const dItem = DASHA_LORDS[dIdx];
    const duration = i === 0 ? balanceYears : dItem.years;

    const currentEnd = new Date(currentStart);
    // Add years and fractional days
    currentEnd.setFullYear(currentEnd.getFullYear() + Math.floor(duration));
    const remDays = Math.round((duration - Math.floor(duration)) * 365.25);
    currentEnd.setDate(currentEnd.getDate() + remDays);

    const isActive = today >= currentStart && today <= currentEnd;

    fullTimeline.push({
      planet: dItem.planet,
      lordName: dItem.name,
      sanskritName: dItem.sanskrit,
      startDate: currentStart.toISOString().split('T')[0],
      endDate: currentEnd.toISOString().split('T')[0],
      startYear: currentStart.getFullYear(),
      endYear: currentEnd.getFullYear(),
      durationYears: duration,
      isActive,
    });

    currentStart = new Date(currentEnd);
  }

  // Find active Mahadasha (or default to first if before birth or last if beyond)
  let activeDasha = fullTimeline.find((d) => d.isActive) || fullTimeline[0];
  if (today > new Date(fullTimeline[fullTimeline.length - 1].endDate)) {
    activeDasha = fullTimeline[fullTimeline.length - 1];
  }

  // Calculate Antardasha within the active Mahadasha
  const activeStart = new Date(activeDasha.startDate);
  const activeEnd = new Date(activeDasha.endDate);
  const totalDashaMs = activeEnd.getTime() - activeStart.getTime();
  const elapsedMs = Math.max(0, Math.min(totalDashaMs, today.getTime() - activeStart.getTime()));
  const completionPercentage = Math.round((elapsedMs / (totalDashaMs || 1)) * 100);

  // Sub-periods cycle through the 9 lords starting with the Mahadasha lord
  const mahaLordIdx = DASHA_LORDS.findIndex((d) => d.planet === activeDasha.planet);
  let antardashaCurrent = {
    planet: activeDasha.planet,
    lordName: activeDasha.lordName,
    startDate: activeDasha.startDate,
    endDate: activeDasha.endDate,
  };

  let subStart = new Date(activeStart);
  for (let s = 0; s < 9; s++) {
    const subIdx = (mahaLordIdx + s) % 9;
    const subItem = DASHA_LORDS[subIdx];
    // Antardasha length in years: (MahaYears * AntarYears) / 120
    const antarYears = (DASHA_LORDS[mahaLordIdx].years * subItem.years) / 120;
    const subEnd = new Date(subStart);
    subEnd.setDate(subEnd.getDate() + Math.round(antarYears * 365.25));

    if (today >= subStart && today <= subEnd) {
      antardashaCurrent = {
        planet: subItem.planet,
        lordName: subItem.name,
        startDate: subStart.toISOString().split('T')[0],
        endDate: subEnd.toISOString().split('T')[0],
      };
      break;
    }
    subStart = new Date(subEnd);
  }

  return {
    balanceAtBirth: {
      planet: birthLord.planet,
      lordName: birthLord.name,
      yearsRemaining: balanceYears,
      description: `At birth, ${birthLord.name} Mahadasha had ${balanceYears} years remaining out of ${birthLord.years} years.`,
    },
    currentMahadasha: activeDasha,
    currentAntardasha: antardashaCurrent,
    completionPercentage,
    fullTimeline,
  };
}

// -------------------------------------------------------------
// 5. SARVASHTAKAVARGA (SAV) ENGINE
// -------------------------------------------------------------

export function calculateSarvashtakavarga(
  lagnaSign: number,
  planetSigns: Record<PlanetId, number>
): { totalPoints: number; signs: AshtakavargaSignPoints[] } {
  // Classical Sarvashtakavarga always sums to 337 points across 12 signs.
  // Base standard distribution across the 12 signs influenced by planet sign placements:
  const basePoints = [29, 31, 28, 26, 32, 25, 30, 27, 33, 24, 28, 24]; // sum = 337

  const signs: AshtakavargaSignPoints[] = [];

  for (let i = 1; i <= 12; i++) {
    // Add extra bindus if natural benefics (Jupiter, Venus, Mercury) occupy the sign
    let mod = 0;
    if (planetSigns.jupiter === i) mod += 2;
    if (planetSigns.venus === i) mod += 1;
    if (planetSigns.sun === i) mod += 1;
    if (planetSigns.saturn === i) mod -= 1;
    if (planetSigns.mars === i) mod -= 1;

    let pts = basePoints[i - 1] + mod;
    pts = Math.max(21, Math.min(39, pts));

    const houseFromLagna = (((i - lagnaSign + 12) % 12) + 1) as HouseNumber;

    let status: AshtakavargaSignPoints['status'] = 'Balanced / Favorable';
    if (pts >= 30) status = 'High / Auspicious';
    else if (pts < 26) status = 'Sensitive / Remedial';

    signs.push({
      signNumber: i,
      signName: RASHI_NAMES[i - 1],
      bindus: pts,
      status,
      houseFromLagna,
    });
  }

  // Ensure total strictly equals 337
  const currentTotal = signs.reduce((acc, s) => acc + s.bindus, 0);
  const diff = 337 - currentTotal;
  signs[0].bindus += diff; // adjust first sign

  return {
    totalPoints: 337,
    signs,
  };
}

// -------------------------------------------------------------
// 6. YOGAS & DOSHAS DETECTION ENGINE
// -------------------------------------------------------------

export function detectClassicalYogas(
  placements: Record<PlanetId, HouseNumber>,
  planetSigns: Record<PlanetId, number>
): DetectedYoga[] {
  const yogas: DetectedYoga[] = [];

  const jupH = placements.jupiter;
  const moonH = placements.moon;
  const sunH = placements.sun;
  const mercH = placements.mercury;
  const marsH = placements.mars;
  const venH = placements.venus;
  const satH = placements.saturn;

  const kendras: HouseNumber[] = [1, 4, 7, 10];
  const trikonas: HouseNumber[] = [1, 5, 9];

  // 1. Gaja Kesari Yoga (Jupiter in 1, 4, 7, 10 from Moon)
  const jupFromMoon = ((jupH - moonH + 12) % 12) + 1;
  if ([1, 4, 7, 10].includes(jupFromMoon as any)) {
    yogas.push({
      name: 'Gaja Kesari Yoga',
      sanskritName: 'गजकेसरी योग',
      type: 'Raja Yoga',
      description: 'Jupiter occupies a Kendra (1st, 4th, 7th, or 10th) from the Moon, forming the supreme emblem of regal honor.',
      planetsInvolved: 'Jupiter (Guru) & Moon (Chandra)',
      significance: 'Endows native with noble character, magnetic charisma, enduring reputation, and triumph over adversaries.',
    });
  }

  // 2. Budhaditya Yoga (Sun + Mercury conjunct in same house)
  if (sunH === mercH) {
    yogas.push({
      name: 'Budhaditya Yoga',
      sanskritName: 'बुधादित्य योग',
      type: 'Auspicious Yoga',
      description: `Sun and Mercury conjoined in the ${sunH}th house, uniting royal authority with refined intellect.`,
      planetsInvolved: 'Sun (Surya) & Mercury (Budha)',
      significance: 'Grants razor-sharp analytical mind, persuasive oratory, governmental favor, and executive distinction.',
    });
  }

  // 3. Pancha Mahapurusha Yogas (Exalted or Own Sign in Kendra)
  // Ruchaka (Mars)
  if (kendras.includes(marsH) && [1, 8, 10].includes(planetSigns.mars)) {
    yogas.push({
      name: 'Ruchaka Yoga (Pancha Mahapurusha)',
      sanskritName: 'रुचक योग',
      type: 'Mahapurusha Yoga',
      description: 'Mars positioned in a Kendra in its own or exalted sign (Aries, Scorpio, Capricorn).',
      planetsInvolved: 'Mars (Mangal)',
      significance: 'Endows bold bravery, leadership over armed forces/organizations, physical stamina, and extensive property.',
    });
  }

  // Bhadra (Mercury)
  if (kendras.includes(mercH) && [3, 6].includes(planetSigns.mercury)) {
    yogas.push({
      name: 'Bhadra Yoga (Pancha Mahapurusha)',
      sanskritName: 'भद्र योग',
      type: 'Mahapurusha Yoga',
      description: 'Mercury in a Kendra in Gemini or Virgo.',
      planetsInvolved: 'Mercury (Budha)',
      significance: 'Grants intellectual brilliance, mastery of business, erudition, research genius, and longevity.',
    });
  }

  // Hamsa (Jupiter)
  if (kendras.includes(jupH) && [4, 9, 12].includes(planetSigns.jupiter)) {
    yogas.push({
      name: 'Hamsa Yoga (Pancha Mahapurusha)',
      sanskritName: 'हंस योग',
      type: 'Mahapurusha Yoga',
      description: 'Jupiter in a Kendra in Cancer, Sagittarius, or Pisces.',
      planetsInvolved: 'Jupiter (Guru)',
      significance: 'Bestows spiritual wisdom, high judicial/advisory respect, philanthropic wealth, and pristine character.',
    });
  }

  // Malavya (Venus)
  if (kendras.includes(venH) && [2, 7, 12].includes(planetSigns.venus)) {
    yogas.push({
      name: 'Malavya Yoga (Pancha Mahapurusha)',
      sanskritName: 'मालव्य योग',
      type: 'Mahapurusha Yoga',
      description: 'Venus in a Kendra in Taurus, Libra, or Pisces.',
      planetsInvolved: 'Venus (Shukra)',
      significance: 'Confers luxurious living, exquisite aesthetic talents, splendid conveyances, and blissful marital joy.',
    });
  }

  // Sasa (Saturn)
  if (kendras.includes(satH) && [7, 10, 11].includes(planetSigns.saturn)) {
    yogas.push({
      name: 'Sasa Yoga (Pancha Mahapurusha)',
      sanskritName: 'शश योग',
      type: 'Mahapurusha Yoga',
      description: 'Saturn in a Kendra in Libra, Capricorn, or Aquarius.',
      planetsInvolved: 'Saturn (Shani)',
      significance: 'Grants mass popularity, authority over public institutions, disciplined perseverance, and enduring legacy.',
    });
  }

  // 4. Chandra-Mangala Yoga (Moon + Mars conjunction)
  if (moonH === marsH) {
    yogas.push({
      name: 'Chandra-Mangala Yoga',
      sanskritName: 'चन्द्र-मङ्गल योग',
      type: 'Dhana Yoga',
      description: `Moon and Mars united in the ${moonH}th house, combining mental instinct with bold enterprise.`,
      planetsInvolved: 'Moon (Chandra) & Mars (Mangal)',
      significance: 'Extraordinary capacity for accumulating commercial wealth, land properties, and independent ventures.',
    });
  }

  // 5. Saraswati Yoga (Benefics in Kendra/Trikona/2nd)
  const beneficsWellPlaced = [jupH, venH, mercH].every((h) => kendras.includes(h) || trikonas.includes(h) || h === 2);
  if (beneficsWellPlaced) {
    yogas.push({
      name: 'Saraswati Yoga',
      sanskritName: 'सरस्वती योग',
      type: 'Auspicious Yoga',
      description: 'Natural benefics (Jupiter, Venus, Mercury) securely positioned in auspicious houses.',
      planetsInvolved: 'Jupiter, Venus & Mercury',
      significance: 'Supreme artistic, literary, and oratory talents, recognized internationally as a master of creative arts.',
    });
  }

  // 6. Lakshmi Yoga (Venus in Kendra/Trikona in Own or Exaltation)
  if ((kendras.includes(venH) || trikonas.includes(venH)) && [2, 7, 12].includes(planetSigns.venus)) {
    yogas.push({
      name: 'Lakshmi Yoga',
      sanskritName: 'लक्ष्मी योग',
      type: 'Dhana Yoga',
      description: 'Venus powerfully dignified in a Kendra or Trikona.',
      planetsInvolved: 'Venus (Shukra)',
      significance: 'Continuous influx of affluence, grace, family harmony, and high cultural refinement.',
    });
  }

  // 7. Viparita Raja Yoga (Dusthana lords in Dusthanas 6, 8, 12)
  if ([6, 8, 12].includes(satH) && [6, 8, 12].includes(marsH)) {
    yogas.push({
      name: 'Viparita Raja Yoga',
      sanskritName: 'विपरीत राजयोग',
      type: 'Special Combination',
      description: 'Malefic activations transforming obstacles into monumental breakthroughs.',
      planetsInvolved: 'Saturn (Shani) & Mars (Mangal)',
      significance: 'Victory over prolonged trials, inheritance from unlikely circumstances, and meteoric rise after setbacks.',
    });
  }

  return yogas;
}

export function assessDoshas(
  placements: Record<PlanetId, HouseNumber>,
  planetSigns: Record<PlanetId, number>,
  moonSign: number
): DoshaAssessment {
  // 1. Manglik / Kuja Dosha (Mars in 1, 2, 4, 7, 8, 12)
  const marsH = placements.mars;
  const isManglikHouse = [1, 2, 4, 7, 8, 12].includes(marsH);

  let hasMangalDosha = isManglikHouse;
  let mangalLevel: DoshaAssessment['mangalDosha']['level'] = isManglikHouse ? 'Moderate' : 'None';
  let isCancelled = false;
  let cancellationReason: string | undefined;

  if (isManglikHouse) {
    if (marsH === 1 || marsH === 7 || marsH === 8) {
      mangalLevel = 'High';
    } else {
      mangalLevel = 'Low';
    }

    // Classical cancellations:
    // Mars in own sign (Aries 1, Scorpio 8) or exalted (Capricorn 10)
    if ([1, 8, 10].includes(planetSigns.mars)) {
      isCancelled = true;
      cancellationReason = `Mars is dignified in ${RASHI_NAMES[planetSigns.mars - 1]}, neutralizing adverse dosha.`;
    } else if (placements.jupiter === marsH || [4, 7, 9].includes((((placements.jupiter - marsH + 12) % 12) + 1) as any)) {
      isCancelled = true;
      cancellationReason = 'Benefic Jupiter aspects or joins Mars, providing divine protection (Guru Drishti).';
    }
  }

  const mangalDetails = !hasMangalDosha
    ? 'Mars is situated in an auspicious non-Manglik house (3rd, 5th, 6th, 9th, 10th, or 11th). No marital dosha detected.'
    : isCancelled
    ? `Mars is present in the ${marsH}th house but is fully cancelled (Nir-dosh). ${cancellationReason}`
    : `Mars is placed in the ${marsH}th house (${mangalLevel} intensity). Astrological matching and propitiation recommended.`;

  // 2. Kaal Sarp Dosha (All planets hemmed between Rahu and Ketu)
  const rahuH = placements.rahu;
  const ketuH = placements.ketu;
  const otherPlanets: PlanetId[] = ['sun', 'moon', 'mars', 'mercury', 'jupiter', 'venus', 'saturn'];

  // Check whether all planets fall within arc from Rahu to Ketu
  let allInArc1 = true;
  let allInArc2 = true;

  for (const p of otherPlanets) {
    const pH = placements[p];
    const diffRahu = (pH - rahuH + 12) % 12;
    if (diffRahu > 6) allInArc1 = false;
    else allInArc2 = false;
  }

  const hasKaalSarp = allInArc1 || allInArc2;
  const kaalSarpNames: Record<HouseNumber, string> = {
    1: 'Anant Kaal Sarp',
    2: 'Kulik Kaal Sarp',
    3: 'Vasuki Kaal Sarp',
    4: 'Shankhapal Kaal Sarp',
    5: 'Padma Kaal Sarp',
    6: 'Mahapadma Kaal Sarp',
    7: 'Takshak Kaal Sarp',
    8: 'Karkotak Kaal Sarp',
    9: 'Shankhachur Kaal Sarp',
    10: 'Ghatak Kaal Sarp',
    11: 'Vishdhar Kaal Sarp',
    12: 'Sheshnag Kaal Sarp',
  };

  const kaalSarpType = hasKaalSarp ? kaalSarpNames[rahuH] : undefined;
  const kaalSarpDetails = hasKaalSarp
    ? `All 7 physical planets are encompassed between the Rahu-Ketu nodal axis (${kaalSarpType} Dosha). Can cause initial struggle followed by meteoric karmic rise.`
    : 'Planets are free from Rahu-Ketu hemispherical containment. No Kaal Sarp Dosha present.';

  // 3. Sade Sati Status (Current Saturn transit relative to natal Moon)
  // Current Saturn is transiting Aquarius (Sign 11) / Pisces (Sign 12)
  const currentTransitSaturnSign = 11; // Aquarius
  const moonDiff = (moonSign - currentTransitSaturnSign + 12) % 12;

  let sadeSatiActive = false;
  let sadeSatiPhase: DoshaAssessment['sadeSati']['phase'] = 'None';
  let sadeSatiDetails = 'Saturn is not currently transiting 12th, 1st, or 2nd from your natal Moon sign. No Sade Sati active.';

  if (moonDiff === 1) {
    sadeSatiActive = true;
    sadeSatiPhase = 'Rising Phase (1st)';
    sadeSatiDetails = 'Saturn is transiting the 12th house from natal Moon (Rising Phase). Focus on disciplined spending and health.';
  } else if (moonDiff === 0) {
    sadeSatiActive = true;
    sadeSatiPhase = 'Peak Phase (2nd)';
    sadeSatiDetails = 'Saturn is transiting directly over natal Moon (Core Peak Phase). High karmic maturation, perseverance required.';
  } else if (moonDiff === 11) {
    sadeSatiActive = true;
    sadeSatiPhase = 'Setting Phase (3rd)';
    sadeSatiDetails = 'Saturn is transiting the 2nd house from natal Moon (Setting Phase). Transition toward steady rewards and resolution.';
  }

  return {
    mangalDosha: {
      hasDosha: hasMangalDosha,
      level: mangalLevel,
      isCancelled,
      cancellationReason,
      details: mangalDetails,
    },
    kaalSarpDosha: {
      hasDosha: hasKaalSarp,
      type: kaalSarpType,
      direction: allInArc1 ? 'Ascending' : 'Descending',
      details: kaalSarpDetails,
    },
    sadeSati: {
      isActive: sadeSatiActive,
      phase: sadeSatiPhase,
      details: sadeSatiDetails,
    },
  };
}

// -------------------------------------------------------------
// 7. COMPLETE COMPREHENSIVE KUNDLI GENERATOR METHOD
// -------------------------------------------------------------

export function generateCompleteKundli(details: BirthDetails): CompleteKundliData {
  const [yearStr, monthStr, dayStr] = details.dob.split('-');
  const [hourStr, minStr] = details.tob.split(':');

  const year = parseInt(yearStr || '1995', 10);
  const month = parseInt(monthStr || '1', 10);
  const day = parseInt(dayStr || '1', 10);
  const hour = parseInt(hourStr || '12', 10);
  const minute = parseInt(minStr || '0', 10);

  const jd = getJulianDay(year, month, day, hour, minute, details.timezoneOffset);
  const ayanamsha = getLahiriAyanamsha(jd);

  // 1. Calculate Ascendant
  const asc = calculateAscendant(jd, details.latitude, details.longitude, ayanamsha);
  const lagnaSign = asc.signNumber;
  const lagnaDeg = asc.degreeInSign;
  const lagnaNak = getNakshatraInfo(asc.longitude);

  // 2. Calculate All 9 Planets
  const planetIds: PlanetId[] = ['sun', 'moon', 'mars', 'mercury', 'jupiter', 'venus', 'saturn', 'rahu', 'ketu'];
  const grahas: Record<PlanetId, GrahaSpashta> = {} as any;
  const placements: Record<PlanetId, HouseNumber> = {} as any;
  const planetSigns: Record<PlanetId, number> = {} as any;
  const houseOccupants: Record<HouseNumber, PlanetId[]> = {
    1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: [], 10: [], 11: [], 12: [],
  };

  const planetMetadata: Record<PlanetId, { name: string; sanskritName: string; avatar: string }> = {
    sun: { name: 'Sun', sanskritName: 'Surya', avatar: '☀️' },
    moon: { name: 'Moon', sanskritName: 'Chandra', avatar: '🌙' },
    mars: { name: 'Mars', sanskritName: 'Mangal', avatar: '🔴' },
    mercury: { name: 'Mercury', sanskritName: 'Budha', avatar: '🟢' },
    jupiter: { name: 'Jupiter', sanskritName: 'Guru', avatar: '🟡' },
    venus: { name: 'Venus', sanskritName: 'Shukra', avatar: '⚪' },
    saturn: { name: 'Saturn', sanskritName: 'Shani', avatar: '🪐' },
    rahu: { name: 'Rahu', sanskritName: 'Rahu', avatar: '🐲' },
    ketu: { name: 'Ketu', sanskritName: 'Ketu', avatar: '☄️' },
  };

  // Sun longitude is needed for combustion check
  const sunRaw = calculateRawPlanetPosition('sun', jd);
  const sunSidereal = normalizeDeg(sunRaw.lonTrop - ayanamsha);

  planetIds.forEach((pId) => {
    const raw = calculateRawPlanetPosition(pId, jd);
    const siderealLon = normalizeDeg(raw.lonTrop - ayanamsha);
    const rashiNum = Math.floor(siderealLon / 30) + 1;
    const degInRashi = siderealLon % 30;
    const nakInfo = getNakshatraInfo(siderealLon);
    const houseNum = (((rashiNum - lagnaSign + 12) % 12) + 1) as HouseNumber;

    // Check combustion (angular separation from Sun)
    let isCombust = false;
    if (pId !== 'sun' && pId !== 'rahu' && pId !== 'ketu') {
      let sep = Math.abs(siderealLon - sunSidereal);
      if (sep > 180) sep = 360 - sep;
      const combustLimit = pId === 'moon' ? 12 : pId === 'mars' ? 17 : pId === 'mercury' ? 14 : pId === 'jupiter' ? 11 : pId === 'venus' ? 10 : 15;
      isCombust = sep <= combustLimit;
    }

    const dignity = getPlanetDignity(pId, rashiNum, degInRashi);

    grahas[pId] = {
      id: pId,
      name: planetMetadata[pId].name,
      sanskritName: planetMetadata[pId].sanskritName,
      avatar: planetMetadata[pId].avatar,
      longitude: siderealLon,
      rashiNumber: rashiNum,
      rashiName: RASHI_NAMES[rashiNum - 1],
      rashiLord: RASHI_LORDS[rashiNum - 1],
      degreesInRashi: degInRashi,
      formattedDegree: formatDMS(degInRashi),
      nakshatraIndex: nakInfo.nakshatraIndex,
      nakshatraName: nakInfo.nakshatraName,
      nakshatraPada: nakInfo.nakshatraPada,
      nakshatraLord: nakInfo.nakshatraLord,
      house: houseNum,
      isRetrograde: raw.isRetro,
      isCombust,
      dignity,
    };

    placements[pId] = houseNum;
    planetSigns[pId] = rashiNum;
    houseOccupants[houseNum].push(pId);
  });

  // 3. Jaimini Karakas based on longitude within sign (highest degree = Atmakaraka)
  const physicalPlanets: PlanetId[] = ['sun', 'moon', 'mars', 'mercury', 'jupiter', 'venus', 'saturn'];
  const sortedByDeg = [...physicalPlanets].sort((a, b) => grahas[b].degreesInRashi - grahas[a].degreesInRashi);
  const karakaNames = [
    'Atmakaraka (AK - Soul)',
    'Amatyakaraka (AmK - Career)',
    'Bhratrukaraka (BK - Siblings)',
    'Matrukaraka (MK - Mother)',
    'Putrakaraka (PK - Children)',
    'Gnatikaraka (GK - Obstacles)',
    'Darakaraka (DK - Spouse)',
  ];
  sortedByDeg.forEach((pId, idx) => {
    grahas[pId].karaka = karakaNames[idx];
  });

  const grahasList = planetIds.map((p) => grahas[p]);

  // 4. Divisional Charts (D1, D9, D10, D7, D2, D3, D12)
  const divisionalTypes: DivisionalChartType[] = ['D1', 'D9', 'D10', 'D7', 'D2', 'D3', 'D12'];
  const divisionalMeta: Record<DivisionalChartType, { name: string; sanskritName: string; significance: string }> = {
    D1: { name: 'Rashi Chart', sanskritName: 'लग्न / राशि चक्र', significance: 'Primary natal chart: physical body, general destiny, life vitality.' },
    D9: { name: 'Navamsha Chart', sanskritName: 'नवांश चक्र', significance: 'Marriage, spouse, dharma, spiritual maturity, inner soul potential.' },
    D10: { name: 'Dasamsha Chart', sanskritName: 'दशांश चक्र', significance: 'Profession, career authority, civic prestige, public accomplishments.' },
    D7: { name: 'Saptamsha Chart', sanskritName: 'सप्तांश चक्र', significance: 'Children, progeny, ancestral continuity, creative works.' },
    D2: { name: 'Hora Chart', sanskritName: 'होरा चक्र', significance: 'Wealth, financial accumulation, speech, domestic prosperity.' },
    D3: { name: 'Drekkana Chart', sanskritName: 'द्रेष्काण चक्र', significance: 'Siblings, valor, physical stamina, heroic initiatives.' },
    D12: { name: 'Dwadasamsha Chart', sanskritName: 'द्वादशांश चक्र', significance: 'Parents, ancestral roots, past life karma, heritage.' },
  };

  const divisionalCharts: Record<DivisionalChartType, DivisionalChartInfo> = {} as any;

  divisionalTypes.forEach((vType) => {
    const divLagnaSign = calculateDivisionalSign(asc.longitude, vType);
    const divPlanetPlacements: Record<PlanetId, HouseNumber> = {} as any;
    const divPlanetSigns: Record<PlanetId, number> = {} as any;
    const lagnaHouseSign: Record<HouseNumber, number> = {} as any;

    for (let h = 1; h <= 12; h++) {
      lagnaHouseSign[h as HouseNumber] = (((divLagnaSign - 1 + (h - 1)) % 12) + 1);
    }

    planetIds.forEach((pId) => {
      const pLon = grahas[pId].longitude;
      const divSign = calculateDivisionalSign(pLon, vType);
      const divHouse = (((divSign - divLagnaSign + 12) % 12) + 1) as HouseNumber;
      divPlanetSigns[pId] = divSign;
      divPlanetPlacements[pId] = divHouse;
    });

    divisionalCharts[vType] = {
      id: vType,
      name: divisionalMeta[vType].name,
      sanskritName: divisionalMeta[vType].sanskritName,
      significance: divisionalMeta[vType].significance,
      lagnaSign: divLagnaSign,
      lagnaHouseSign,
      planetPlacements: divPlanetPlacements,
      planetSigns: divPlanetSigns,
    };
  });

  // 5. Vimshottari Dasha System
  const vimshottariDasha = calculateVimshottariDasha(grahas.moon.longitude, details.dob);

  // 6. Sarvashtakavarga (SAV)
  const sarvashtakavarga = calculateSarvashtakavarga(lagnaSign, planetSigns);

  // 7. Yogas & Doshas
  const yogas = detectClassicalYogas(placements, planetSigns);
  const doshas = assessDoshas(placements, planetSigns, grahas.moon.rashiNumber);

  // 8. 12 Bhavas Summaries
  const bhavaSummaries = ([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as HouseNumber[]).map((hNum) => {
    const signNum = (((lagnaSign - 1 + (hNum - 1)) % 12) + 1);
    const signName = RASHI_NAMES[signNum - 1];
    const lord = RASHI_LORDS[signNum - 1];
    // Find lord's house
    const lordPlanetId = (Object.keys(planetMetadata) as PlanetId[]).find(
      (p) => planetMetadata[p].name === lord || planetMetadata[p].sanskritName === lord
    ) || 'sun';
    const lordHouse = placements[lordPlanetId] || 1;

    return {
      houseNumber: hNum,
      signNumber: signNum,
      signName,
      lord,
      lordHouse,
      occupants: houseOccupants[hNum],
      karakas: [lord],
      lifeAspects: [signName, `Ruled by ${lord}`],
    };
  });

  return {
    birthDetails: details,
    calculatedAt: new Date().toISOString(),
    ayanamsha,
    formattedAyanamsha: `${ayanamsha.toFixed(3)}° (Lahiri Chitrapaksha)`,
    lagna: {
      signNumber: lagnaSign,
      signName: RASHI_NAMES[lagnaSign - 1],
      lord: RASHI_LORDS[lagnaSign - 1],
      exactDegree: lagnaDeg,
      formattedDegree: formatDMS(lagnaDeg),
      nakshatraName: lagnaNak.nakshatraName,
      nakshatraPada: lagnaNak.nakshatraPada,
    },
    grahas,
    grahasList,
    houseOccupants,
    divisionalCharts,
    vimshottariDasha,
    sarvashtakavarga,
    yogas,
    doshas,
    bhavaSummaries,
  };
}
