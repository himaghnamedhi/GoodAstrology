export type PlanetId = 'sun' | 'moon' | 'mars' | 'mercury' | 'jupiter' | 'venus' | 'saturn' | 'rahu' | 'ketu';

export type HouseNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface HouseInfo {
  number: HouseNumber;
  sanskritName: string; // e.g. Tanu Bhava
  devanagari: string; // तनु भाव
  name: string; // e.g. House of Self & Personality
  classification: {
    category: 'Kendra' | 'Trikona' | 'Upachaya' | 'Dusthana' | 'Maraka' | 'Panapara' | 'Apoklima';
    subCategories: string[]; // e.g. ['Dharma Trikona', 'Lagna']
    isKendra: boolean;
    isTrikona: boolean;
    isDusthana: boolean;
    isUpachaya: boolean;
  };
  naturalSign: string; // e.g. Aries (Mesha)
  naturalLord: string; // Mars
  karakas: string[]; // Significant planets (e.g. Sun)
  bodyParts: string[]; // e.g. Head, Face, Brain
  lifeThemes: string[]; // e.g. Physical appearance, vitality, beginnings
  description: string;
  keySignifications: string[];
  svgRegion: string; // Label position in North Indian chart
}

export interface PlanetEffectDetail {
  house: HouseNumber;
  bulletPoints: string[];
  summary: string;
  strengths: string[];
  cautions: string[];
  remedy?: string;
}

export interface PlanetInfo {
  id: PlanetId;
  name: string; // e.g. Sun
  sanskritName: string; // Surya
  devanagari: string; // सूर्य
  nature: 'Natural Benefic' | 'Natural Malefic' | 'Neutral / Variable';
  element: 'Fire' | 'Water' | 'Earth' | 'Air' | 'Ether' | 'Air / Shadow' | 'Fire / Spiritual Shadow' | string;
  gender: 'Masculine' | 'Feminine' | 'Neutral' | 'Masculine / Shadow' | 'Neutral / Spiritual' | string;
  rulingSigns: string[];
  exaltation: string; // e.g. Aries 10°
  debilitation: string; // Libra 10°
  dayOfWeek: string;
  gemstone: string;
  metal: string;
  color: string;
  beejMantra: string;
  beejMantraTransliteration: string;
  avatar: string;
  centralDescription: string;
  note?: string;
  effects: Record<HouseNumber, PlanetEffectDetail>;
}

export interface ZodiacSign {
  id: number;
  name: string;
  sanskritName: string;
  symbol: string;
  element: 'Fire' | 'Earth' | 'Air' | 'Water';
  quality: 'Movable' | 'Fixed' | 'Dual';
  lord: string;
  keyTraits: string[];
}

export interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: 'House Guide' | 'Planetary Transits' | 'Kundli Basics' | 'Remedies & Mantras' | 'Yogas';
  readTime: string;
  publishedDate: string;
  author: string;
  content: string;
  tags: string[];
}

export type ChartStyle = 'north' | 'south';

export interface ChartPlacement {
  planet: PlanetId;
  house: HouseNumber;
}
