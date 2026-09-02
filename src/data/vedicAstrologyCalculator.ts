import { PlanetId } from '../types/astrology';

export interface BirthDetails {
  name: string;
  dob: string; // YYYY-MM-DD
  tob: string; // HH:MM (24-hour)
  city: string;
  latitude: number;
  longitude: number;
  timezoneOffset: number; // in hours, e.g. +5.5 for IST, -5 for EST
}

export interface CityPreset {
  name: string;
  country: string;
  lat: number;
  lng: number;
  timezone: number;
}

export const POPULAR_CITIES: CityPreset[] = [
  { name: 'New Delhi', country: 'India', lat: 28.6139, lng: 77.2090, timezone: 5.5 },
  { name: 'Mumbai', country: 'India', lat: 19.0760, lng: 72.8777, timezone: 5.5 },
  { name: 'Bengaluru', country: 'India', lat: 12.9716, lng: 77.5946, timezone: 5.5 },
  { name: 'Kolkata', country: 'India', lat: 22.5726, lng: 88.3639, timezone: 5.5 },
  { name: 'Chennai', country: 'India', lat: 13.0827, lng: 80.2707, timezone: 5.5 },
  { name: 'Hyderabad', country: 'India', lat: 17.3850, lng: 78.4867, timezone: 5.5 },
  { name: 'Ahmedabad', country: 'India', lat: 23.0225, lng: 72.5714, timezone: 5.5 },
  { name: 'Pune', country: 'India', lat: 18.5204, lng: 73.8567, timezone: 5.5 },
  { name: 'Jaipur', country: 'India', lat: 26.9124, lng: 75.7873, timezone: 5.5 },
  { name: 'Guwahati', country: 'India', lat: 26.1445, lng: 91.7362, timezone: 5.5 },
  { name: 'London', country: 'United Kingdom', lat: 51.5074, lng: -0.1278, timezone: 0 },
  { name: 'New York', country: 'United States', lat: 40.7128, lng: -74.0060, timezone: -5 },
  { name: 'San Francisco', country: 'United States', lat: 37.7749, lng: -122.4194, timezone: -8 },
  { name: 'Chicago', country: 'United States', lat: 41.8781, lng: -87.6298, timezone: -6 },
  { name: 'Toronto', country: 'Canada', lat: 43.6532, lng: -79.3832, timezone: -5 },
  { name: 'Dubai', country: 'United Arab Emirates', lat: 25.2048, lng: 55.2708, timezone: 4 },
  { name: 'Singapore', country: 'Singapore', lat: 1.3521, lng: 103.8198, timezone: 8 },
  { name: 'Sydney', country: 'Australia', lat: -33.8688, lng: 151.2093, timezone: 10 },
  { name: 'Melbourne', country: 'Australia', lat: -37.8136, lng: 144.9631, timezone: 10 },
  { name: 'Tokyo', country: 'Japan', lat: 35.6762, lng: 139.6503, timezone: 9 },
  { name: 'Paris', country: 'France', lat: 48.8566, lng: 2.3522, timezone: 1 },
  { name: 'Berlin', country: 'Germany', lat: 52.5200, lng: 13.4050, timezone: 1 },
  { name: 'Kathmandu', country: 'Nepal', lat: 27.7172, lng: 85.3240, timezone: 5.75 },
  { name: 'Colombo', country: 'Sri Lanka', lat: 6.9271, lng: 79.8612, timezone: 5.5 },
  { name: 'Dhaka', country: 'Bangladesh', lat: 23.8103, lng: 90.4125, timezone: 6 },
];

export const NAKSHATRAS = [
  'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra',
  'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni',
  'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha',
  'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha',
  'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'
];

export const RASHI_NAMES = [
  'Aries (Mesha)',
  'Taurus (Vrishabha)',
  'Gemini (Mithuna)',
  'Cancer (Karka)',
  'Leo (Simha)',
  'Virgo (Kanya)',
  'Libra (Tula)',
  'Scorpio (Vrishchika)',
  'Sagittarius (Dhanu)',
  'Capricorn (Makara)',
  'Aquarius (Kumbha)',
  'Pisces (Meena)'
];

export const RASHI_LORDS: PlanetId[] = [
  'mars',    // Aries
  'venus',   // Taurus
  'mercury', // Gemini
  'moon',    // Cancer
  'sun',     // Leo
  'mercury', // Virgo
  'venus',   // Libra
  'mars',    // Scorpio
  'jupiter', // Sagittarius
  'saturn',  // Capricorn
  'saturn',  // Aquarius
  'jupiter'  // Pisces
];

export interface CalculatedBirthProfile {
  lagnaNumber: number; // 1-12
  lagnaName: string;
  lagnaLord: PlanetId;
  lagnaDegree: number;
  sunSignNumber: number;
  sunSignName: string;
  moonSignNumber: number;
  moonSignName: string;
  moonLord: PlanetId;
  nakshatraName: string;
  nakshatraPada: number;
  nameRashiNumber: number;
  nameRashiName: string;
  destinyNumber: number;
  destinyPlanet: PlanetId;
}

// Convert Date & Time to Julian Day Number
function getJulianDay(year: number, month: number, day: number, hour: number, minute: number, tzOffset: number): number {
  const utcHours = hour + minute / 60 - tzOffset;
  let y = year;
  let m = month;
  if (m <= 2) {
    y -= 1;
    m += 12;
  }
  const a = Math.floor(y / 100);
  const b = 2 - a + Math.floor(a / 4);
  const dayFraction = day + utcHours / 24.0;
  const jd = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + dayFraction + b - 1524.5;
  return jd;
}

// Lahiri Ayanamsha for a given Julian Day
function getLahiriAyanamsha(jd: number): number {
  const t = (jd - 2451545.0) / 36525.0; // centuries from J2000
  // Standard Lahiri formula approximation (~23.85° at J2000 with 50.29 arcseconds/year precession)
  const ayanamsha = 23.856 + 1.396 * t;
  return ayanamsha;
}

// Calculate Sidereal Ascendant (Lagna)
export function calculateVedicBirthProfile(details: BirthDetails): CalculatedBirthProfile {
  const [yearStr, monthStr, dayStr] = details.dob.split('-');
  const [hourStr, minStr] = details.tob.split(':');
  
  const year = parseInt(yearStr || '1995', 10);
  const month = parseInt(monthStr || '1', 10);
  const day = parseInt(dayStr || '1', 10);
  const hour = parseInt(hourStr || '12', 10);
  const minute = parseInt(minStr || '0', 10);

  const jd = getJulianDay(year, month, day, hour, minute, details.timezoneOffset);
  const d = jd - 2451545.0;
  
  // Greenwich Mean Sidereal Time (GMST) in degrees
  const gmstHours = (18.697374558 + 24.06570982441908 * d) % 24;
  const gmstDeg = (gmstHours * 15) % 360;
  
  // Local Sidereal Time (LST)
  const lstDeg = (gmstDeg + details.longitude + 360) % 360;
  const lstRad = (lstDeg * Math.PI) / 180;
  const latRad = (details.latitude * Math.PI) / 180;
  
  // Obliquity of the Ecliptic (eps)
  const epsDeg = 23.4392911 - (46.815 * (d / 36525)) / 3600;
  const epsRad = (epsDeg * Math.PI) / 180;
  
  // Tropical Ascendant computation
  const y = -Math.cos(lstRad);
  const x = Math.sin(lstRad) * Math.cos(epsRad) + Math.tan(latRad) * Math.sin(epsRad);
  let ascTropical = (Math.atan2(y, x) * 180) / Math.PI;
  if (ascTropical < 0) ascTropical += 360;
  ascTropical = (ascTropical + 90) % 360; // offset quadrant alignment

  // Apply Lahiri Ayanamsha to obtain Sidereal (Nirayana) Ascendant
  const ayanamsha = getLahiriAyanamsha(jd);
  let ascSidereal = (ascTropical - ayanamsha + 360) % 360;

  // Determine Lagna sign (1 to 12)
  const lagnaNum = Math.floor(ascSidereal / 30) + 1;
  const lagnaDegree = Number((ascSidereal % 30).toFixed(2));

  // Approximate Sun longitude (Sidereal)
  const meanSun = (280.460 + 0.9856474 * d) % 360;
  const gSun = ((357.528 + 0.9856003 * d) * Math.PI) / 180;
  const sunEcliptic = (meanSun + 1.915 * Math.sin(gSun) + 0.020 * Math.sin(2 * gSun) + 360) % 360;
  const sunSidereal = (sunEcliptic - ayanamsha + 360) % 360;
  const sunSignNum = Math.floor(sunSidereal / 30) + 1;

  // Approximate Moon longitude (Sidereal)
  const meanMoon = (218.316 + 13.176396 * d) % 360;
  const moonEcliptic = (meanMoon + 6.289 * Math.sin(gSun) + 360) % 360;
  const moonSidereal = (moonEcliptic - ayanamsha + 360) % 360;
  const moonSignNum = Math.floor(moonSidereal / 30) + 1;

  // Nakshatra from Moon longitude (360 / 27 = 13.3333 degrees each)
  const nakshatraIndex = Math.floor(moonSidereal / (360 / 27)) % 27;
  const nakshatraName = NAKSHATRAS[nakshatraIndex];
  const nakshatraPada = Math.floor((moonSidereal % (360 / 27)) / (360 / 108)) + 1;

  // Calculate Name Rashi & Destiny Vibration
  const { nameRashiNum, destinyNum, destinyPlanet } = calculateNameAstrology(details.name);

  return {
    lagnaNumber: lagnaNum,
    lagnaName: RASHI_NAMES[lagnaNum - 1],
    lagnaLord: RASHI_LORDS[lagnaNum - 1],
    lagnaDegree,
    sunSignNumber: sunSignNum,
    sunSignName: RASHI_NAMES[sunSignNum - 1],
    moonSignNumber: moonSignNum,
    moonSignName: RASHI_NAMES[moonSignNum - 1],
    moonLord: RASHI_LORDS[moonSignNum - 1],
    nakshatraName,
    nakshatraPada,
    nameRashiNumber: nameRashiNum,
    nameRashiName: RASHI_NAMES[nameRashiNum - 1],
    destinyNumber: destinyNum,
    destinyPlanet
  };
}

// Calculate Name Rashi & Numerological Planet Vibration
export function calculateNameAstrology(name: string): {
  nameRashiNum: number;
  destinyNum: number;
  destinyPlanet: PlanetId;
} {
  const cleanName = (name || '').trim().toUpperCase();
  if (!cleanName) {
    return { nameRashiNum: 1, destinyNum: 1, destinyPlanet: 'sun' };
  }

  const firstChar = cleanName[0];
  const firstTwo = cleanName.substring(0, 2);

  // Classical Vedic Avakahada Swara map
  let rashiNum = 1; // Default Aries

  if (/^(A|CH|LA|LI|LU|LE|LO)/.test(cleanName)) rashiNum = 1; // Aries
  else if (/^(I|U|E|O|V|BA|BI|BU|BE|BO)/.test(cleanName)) rashiNum = 2; // Taurus
  else if (/^(K|KA|KI|KU|GHA|CHH|HA)/.test(cleanName)) rashiNum = 3; // Gemini
  else if (/^(HI|HU|HE|HO|DA|DI|DU|DE|DO)/.test(cleanName)) rashiNum = 4; // Cancer
  else if (/^(M|MA|MI|MU|ME|MO|TA|TI|TU|TE)/.test(cleanName)) rashiNum = 5; // Leo
  else if (/^(TO|PA|PI|PU|SH|THA|PE|PO)/.test(cleanName)) rashiNum = 6; // Virgo
  else if (/^(R|RA|RI|RU|RE|RO|TA|TI|TE|TU)/.test(cleanName)) rashiNum = 7; // Libra
  else if (/^(N|NA|NI|NU|NE|NO|YA|YI|YU)/.test(cleanName)) rashiNum = 8; // Scorpio
  else if (/^(YE|YO|BHA|BHI|BHU|DHA|PHA|DHA|BHE)/.test(cleanName)) rashiNum = 9; // Sagittarius
  else if (/^(BHO|JA|JI|KHI|KHU|KHE|KHO|GA|GI)/.test(cleanName)) rashiNum = 10; // Capricorn
  else if (/^(GU|GE|GO|SA|SI|SU|SE|SO|DA)/.test(cleanName)) rashiNum = 11; // Aquarius
  else if (/^(DI|DU|TH|JHA|DE|DO|CHA|CHI)/.test(cleanName)) rashiNum = 12; // Pisces
  else {
    // Fallback: character code modulo 12
    rashiNum = (cleanName.charCodeAt(0) % 12) + 1;
  }

  // Chaldean / Pythagorean Numerology mapping for Name Destiny Number
  const charValues: Record<string, number> = {
    A: 1, I: 1, J: 1, Q: 1, Y: 1,
    B: 2, K: 2, R: 2,
    C: 3, G: 3, L: 3, S: 3,
    D: 4, M: 4, T: 4,
    E: 5, H: 5, N: 5, X: 5,
    U: 6, V: 6, W: 6,
    O: 7, Z: 7,
    F: 8, P: 8
  };

  let sum = 0;
  for (let i = 0; i < cleanName.length; i++) {
    const ch = cleanName[i];
    if (charValues[ch]) {
      sum += charValues[ch];
    }
  }

  // Reduce to single digit (1-9)
  while (sum > 9) {
    sum = sum.toString().split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0);
  }
  const destinyNum = sum || 1;

  const planetMap: Record<number, PlanetId> = {
    1: 'sun',
    2: 'moon',
    3: 'jupiter',
    4: 'rahu',
    5: 'mercury',
    6: 'venus',
    7: 'ketu',
    8: 'saturn',
    9: 'mars'
  };

  return {
    nameRashiNum: rashiNum,
    destinyNum,
    destinyPlanet: planetMap[destinyNum] || 'sun'
  };
}
