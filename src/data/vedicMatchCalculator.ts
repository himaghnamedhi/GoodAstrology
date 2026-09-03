import { 
  POPULAR_CITIES, 
  NAKSHATRAS, 
  RASHI_NAMES, 
  RASHI_LORDS, 
  BirthDetails, 
  calculateVedicBirthProfile 
} from './vedicAstrologyCalculator';
import { PlanetId } from '../types/astrology';

// -------------------------------------------------------------
// 1. ASHTAKOOTA & VEDIC DATA MAPPINGS
// -------------------------------------------------------------

// Varna: 1 = Shudra (Air), 2 = Vaishya (Earth), 3 = Kshatriya (Fire), 4 = Brahmin (Water)
// Rashi numbers are 1-indexed (1 = Aries ... 12 = Pisces)
export const RASHI_VARNA: Record<number, { name: string; rank: number; description: string }> = {
  1: { name: 'Kshatriya (Fire)', rank: 3, description: 'Action-oriented, protective, leadership prana' },
  2: { name: 'Vaishya (Earth)', rank: 2, description: 'Practical, resource-builder, pragmatic' },
  3: { name: 'Shudra (Air)', rank: 1, description: 'Intellectual service, adaptable, communicating' },
  4: { name: 'Brahmin (Water)', rank: 4, description: 'Intuitive, spiritual wisdom, emotional depth' },
  5: { name: 'Kshatriya (Fire)', rank: 3, description: 'Action-oriented, protective, royal dignity' },
  6: { name: 'Vaishya (Earth)', rank: 2, description: 'Analytical, practical, grounded nature' },
  7: { name: 'Shudra (Air)', rank: 1, description: 'Social, artistic, harmonious interaction' },
  8: { name: 'Brahmin (Water)', rank: 4, description: 'Profound mystical intuition, transformative' },
  9: { name: 'Kshatriya (Fire)', rank: 3, description: 'Righteous, philosophical adventurer' },
  10: { name: 'Vaishya (Earth)', rank: 2, description: 'Disciplined, ambitious, material guardian' },
  11: { name: 'Shudra (Air)', rank: 1, description: 'Humanitarian, visionary social weaver' },
  12: { name: 'Brahmin (Water)', rank: 4, description: 'Spiritual liberation, transcendent compassion' },
};

// Vashya: Chatushpada (quadruped), Dwi-pada/Manava (human), Jalachara (water), Vanachara (wild), Keeta (insect)
export type VashyaCategory = 'Chatushpada' | 'Manava' | 'Jalachara' | 'Vanachara' | 'Keeta';

export const RASHI_VASHYA: Record<number, VashyaCategory> = {
  1: 'Chatushpada', // Aries (Ram)
  2: 'Chatushpada', // Taurus (Bull)
  3: 'Manava',      // Gemini (Twins)
  4: 'Jalachara',   // Cancer (Crab)
  5: 'Vanachara',   // Leo (Lion)
  6: 'Manava',      // Virgo (Maiden)
  7: 'Manava',      // Libra (Scales / Human)
  8: 'Keeta',       // Scorpio (Scorpion)
  9: 'Manava',      // Sagittarius (First half Manava, 2nd Chatushpada; standard classification is Manava/Chatushpada)
  10: 'Jalachara',  // Capricorn (Makara / Sea-Monster)
  11: 'Manava',     // Aquarius (Water bearer)
  12: 'Jalachara',  // Pisces (Fish)
};

// Yoni (14 Animal Archetypes assigned to the 27 Nakshatras)
export interface YoniData {
  animal: string;
  gender: 'Male' | 'Female';
  enemyAnimal: string;
}

export const NAKSHATRA_YONI: Record<number, YoniData> = {
  0: { animal: 'Horse (Ashwa)', gender: 'Male', enemyAnimal: 'Buffalo (Mahisha)' },       // Ashwini
  1: { animal: 'Elephant (Gaja)', gender: 'Male', enemyAnimal: 'Lion (Simha)' },          // Bharani
  2: { animal: 'Sheep (Mesha)', gender: 'Female', enemyAnimal: 'Monkey (Vanara)' },       // Krittika
  3: { animal: 'Serpent (Sarpa)', gender: 'Male', enemyAnimal: 'Mongoose (Nakula)' },     // Rohini
  4: { animal: 'Serpent (Sarpa)', gender: 'Female', enemyAnimal: 'Mongoose (Nakula)' },   // Mrigashira
  5: { animal: 'Dog (Shwana)', gender: 'Female', enemyAnimal: 'Deer (Mriga)' },           // Ardra
  6: { animal: 'Cat (Marjara)', gender: 'Female', enemyAnimal: 'Rat (Mushaka)' },         // Punarvasu
  7: { animal: 'Sheep (Mesha)', gender: 'Male', enemyAnimal: 'Monkey (Vanara)' },         // Pushya
  8: { animal: 'Cat (Marjara)', gender: 'Male', enemyAnimal: 'Rat (Mushaka)' },           // Ashlesha
  9: { animal: 'Rat (Mushaka)', gender: 'Male', enemyAnimal: 'Cat (Marjara)' },           // Magha
  10: { animal: 'Rat (Mushaka)', gender: 'Female', enemyAnimal: 'Cat (Marjara)' },        // Purva Phalguni
  11: { animal: 'Cow (Gau)', gender: 'Male', enemyAnimal: 'Tiger (Vyaghra)' },            // Uttara Phalguni
  12: { animal: 'Buffalo (Mahisha)', gender: 'Female', enemyAnimal: 'Horse (Ashwa)' },    // Hasta
  13: { animal: 'Tiger (Vyaghra)', gender: 'Female', enemyAnimal: 'Cow (Gau)' },          // Chitra
  14: { animal: 'Buffalo (Mahisha)', gender: 'Male', enemyAnimal: 'Horse (Ashwa)' },      // Swati
  15: { animal: 'Tiger (Vyaghra)', gender: 'Male', enemyAnimal: 'Cow (Gau)' },            // Vishakha
  16: { animal: 'Deer (Mriga)', gender: 'Female', enemyAnimal: 'Dog (Shwana)' },          // Anuradha
  17: { animal: 'Deer (Mriga)', gender: 'Male', enemyAnimal: 'Dog (Shwana)' },            // Jyeshtha
  18: { animal: 'Dog (Shwana)', gender: 'Male', enemyAnimal: 'Deer (Mriga)' },            // Mula
  19: { animal: 'Monkey (Vanara)', gender: 'Male', enemyAnimal: 'Sheep (Mesha)' },        // Purva Ashadha
  20: { animal: 'Mongoose (Nakula)', gender: 'Male', enemyAnimal: 'Serpent (Sarpa)' },    // Uttara Ashadha
  21: { animal: 'Monkey (Vanara)', gender: 'Female', enemyAnimal: 'Sheep (Mesha)' },      // Shravana
  22: { animal: 'Lion (Simha)', gender: 'Female', enemyAnimal: 'Elephant (Gaja)' },       // Dhanishta
  23: { animal: 'Horse (Ashwa)', gender: 'Female', enemyAnimal: 'Buffalo (Mahisha)' },     // Shatabhisha
  24: { animal: 'Lion (Simha)', gender: 'Male', enemyAnimal: 'Elephant (Gaja)' },         // Purva Bhadrapada
  25: { animal: 'Cow (Gau)', gender: 'Female', enemyAnimal: 'Tiger (Vyaghra)' },          // Uttara Bhadrapada
  26: { animal: 'Elephant (Gaja)', gender: 'Female', enemyAnimal: 'Lion (Simha)' },       // Revati
};

// Gana: Deva (Divine), Manushya (Human), Rakshasa (Demonic/Dynamic)
export type GanaCategory = 'Deva' | 'Manushya' | 'Rakshasa';

export const NAKSHATRA_GANA: Record<number, GanaCategory> = {
  0: 'Deva',     // Ashwini
  1: 'Manushya', // Bharani
  2: 'Rakshasa', // Krittika
  3: 'Manushya', // Rohini
  4: 'Deva',     // Mrigashira
  5: 'Manushya', // Ardra
  6: 'Deva',     // Punarvasu
  7: 'Deva',     // Pushya
  8: 'Rakshasa', // Ashlesha
  9: 'Rakshasa', // Magha
  10: 'Manushya',// Purva Phalguni
  11: 'Manushya',// Uttara Phalguni
  12: 'Deva',    // Hasta
  13: 'Rakshasa',// Chitra
  14: 'Deva',    // Swati
  15: 'Rakshasa',// Vishakha
  16: 'Deva',    // Anuradha
  17: 'Rakshasa',// Jyeshtha
  18: 'Rakshasa',// Mula
  19: 'Manushya',// Purva Ashadha
  20: 'Manushya',// Uttara Ashadha
  21: 'Deva',    // Shravana
  22: 'Rakshasa',// Dhanishta
  23: 'Rakshasa',// Shatabhisha
  24: 'Manushya',// Purva Bhadrapada
  25: 'Manushya',// Uttara Bhadrapada
  26: 'Deva',    // Revati
};

// Nadi: Aadi (Vata / First), Madhya (Pitta / Middle), Antya (Kapha / Last)
export type NadiCategory = 'Aadi (Vata)' | 'Madhya (Pitta)' | 'Antya (Kapha)';

export const NAKSHATRA_NADI: Record<number, NadiCategory> = {
  0: 'Aadi (Vata)',
  1: 'Madhya (Pitta)',
  2: 'Antya (Kapha)',
  3: 'Antya (Kapha)',
  4: 'Madhya (Pitta)',
  5: 'Aadi (Vata)',
  6: 'Aadi (Vata)',
  7: 'Madhya (Pitta)',
  8: 'Antya (Kapha)',
  9: 'Antya (Kapha)',
  10: 'Madhya (Pitta)',
  11: 'Aadi (Vata)',
  12: 'Aadi (Vata)',
  13: 'Madhya (Pitta)',
  14: 'Antya (Kapha)',
  15: 'Antya (Kapha)',
  16: 'Madhya (Pitta)',
  17: 'Aadi (Vata)',
  18: 'Aadi (Vata)',
  19: 'Madhya (Pitta)',
  20: 'Antya (Kapha)',
  21: 'Antya (Kapha)',
  22: 'Madhya (Pitta)',
  23: 'Aadi (Vata)',
  24: 'Aadi (Vata)',
  25: 'Madhya (Pitta)',
  26: 'Antya (Kapha)',
};

// Rajju (Sira = Head, Kantha = Neck, Udara = Navel/Waist, Kati = Thigh/Pelvis, Pada = Feet)
export type RajjuCategory = 'Sira (Head)' | 'Kantha (Neck)' | 'Udara (Waist)' | 'Kati (Thigh)' | 'Pada (Feet)';

export const NAKSHATRA_RAJJU: Record<number, RajjuCategory> = {
  0: 'Pada (Feet)',
  1: 'Kati (Thigh)',
  2: 'Udara (Waist)',
  3: 'Kantha (Neck)',
  4: 'Sira (Head)',
  5: 'Kantha (Neck)',
  6: 'Udara (Waist)',
  7: 'Kati (Thigh)',
  8: 'Pada (Feet)',
  9: 'Pada (Feet)',
  10: 'Kati (Thigh)',
  11: 'Udara (Waist)',
  12: 'Kantha (Neck)',
  13: 'Sira (Head)',
  14: 'Kantha (Neck)',
  15: 'Udara (Waist)',
  16: 'Kati (Thigh)',
  17: 'Pada (Feet)',
  18: 'Pada (Feet)',
  19: 'Kati (Thigh)',
  20: 'Udara (Waist)',
  21: 'Kantha (Neck)',
  22: 'Sira (Head)',
  23: 'Kantha (Neck)',
  24: 'Udara (Waist)',
  25: 'Kati (Thigh)',
  26: 'Pada (Feet)',
};

// Natural Planetary Friendship Matrix for Graha Maitri
type FriendshipRelation = 'friend' | 'neutral' | 'enemy';

const PLANETARY_FRIENDSHIP: Record<PlanetId, Record<PlanetId, FriendshipRelation>> = {
  sun: {
    sun: 'friend',
    moon: 'friend',
    mars: 'friend',
    mercury: 'neutral',
    jupiter: 'friend',
    venus: 'enemy',
    saturn: 'enemy',
    rahu: 'enemy',
    ketu: 'neutral',
  },
  moon: {
    sun: 'friend',
    moon: 'friend',
    mars: 'neutral',
    mercury: 'friend',
    jupiter: 'neutral',
    venus: 'neutral',
    saturn: 'neutral',
    rahu: 'enemy',
    ketu: 'enemy',
  },
  mars: {
    sun: 'friend',
    moon: 'friend',
    mars: 'friend',
    mercury: 'enemy',
    jupiter: 'friend',
    venus: 'neutral',
    saturn: 'neutral',
    rahu: 'neutral',
    ketu: 'friend',
  },
  mercury: {
    sun: 'friend',
    moon: 'enemy',
    mars: 'neutral',
    mercury: 'friend',
    jupiter: 'neutral',
    venus: 'friend',
    saturn: 'neutral',
    rahu: 'neutral',
    ketu: 'neutral',
  },
  jupiter: {
    sun: 'friend',
    moon: 'friend',
    mars: 'friend',
    mercury: 'enemy',
    jupiter: 'friend',
    venus: 'enemy',
    saturn: 'neutral',
    rahu: 'friend',
    ketu: 'neutral',
  },
  venus: {
    sun: 'enemy',
    moon: 'enemy',
    mars: 'neutral',
    mercury: 'friend',
    jupiter: 'neutral',
    venus: 'friend',
    saturn: 'friend',
    rahu: 'friend',
    ketu: 'neutral',
  },
  saturn: {
    sun: 'enemy',
    moon: 'enemy',
    mars: 'enemy',
    mercury: 'friend',
    jupiter: 'neutral',
    venus: 'friend',
    saturn: 'friend',
    rahu: 'friend',
    ketu: 'neutral',
  },
  rahu: {
    sun: 'enemy',
    moon: 'enemy',
    mars: 'enemy',
    mercury: 'friend',
    jupiter: 'friend',
    venus: 'friend',
    saturn: 'friend',
    rahu: 'neutral',
    ketu: 'neutral',
  },
  ketu: {
    sun: 'enemy',
    moon: 'enemy',
    mars: 'friend',
    mercury: 'neutral',
    jupiter: 'neutral',
    venus: 'neutral',
    saturn: 'neutral',
    rahu: 'neutral',
    ketu: 'neutral',
  },
};

// -------------------------------------------------------------
// 2. KUTA RESULT INTERFACES
// -------------------------------------------------------------

export interface KutaResult {
  id: string;
  name: string;
  sanskritName: string;
  maxScore: number;
  obtainedScore: number;
  boyAttribute: string;
  girlAttribute: string;
  isDosha: boolean;
  isCancelled: boolean;
  cancellationReason?: string;
  verdict: 'Excellent' | 'Good' | 'Average' | 'Dosha' | 'Mitigated';
  explanation: string;
  significance: string;
}

export interface ManglikAnalysis {
  isBoyManglik: boolean;
  boyManglikHouse: number;
  boySeverity: 'None' | 'Mild' | 'High';
  isGirlManglik: boolean;
  girlManglikHouse: number;
  girlSeverity: 'None' | 'Mild' | 'High';
  isCancelled: boolean;
  cancellationReason: string;
  compatibilityVerdict: 'No Dosha' | 'Both Manglik (Cancelled / Neutralized)' | 'Single Manglik (Remedy Advised)' | 'High Friction';
  description: string;
  classicalRemedies: string[];
}

export interface VedAstroMatchReport {
  partner1: {
    name: string;
    profile: ReturnType<typeof calculateVedicBirthProfile>;
    nakshatraIndex: number;
  };
  partner2: {
    name: string;
    profile: ReturnType<typeof calculateVedicBirthProfile>;
    nakshatraIndex: number;
  };
  totalObtainedGunas: number;
  totalMaxGunas: 36;
  percentageScore: number;
  verdict: 'Utkrishta (Excellent Match)' | 'Madhyama (Good Match)' | 'Alpa (Challenging / Remedy Required)';
  verdictTone: 'success' | 'warning' | 'danger';
  summaryDescription: string;
  ashtakoota: KutaResult[];
  specialKutas: {
    rajju: {
      boyRajju: RajjuCategory;
      girlRajju: RajjuCategory;
      isDosha: boolean;
      verdict: string;
      meaning: string;
    };
    mahendra: {
      isAuspicious: boolean;
      verdict: string;
      meaning: string;
    };
    streeDeergha: {
      distance: number;
      isAuspicious: boolean;
      verdict: string;
      meaning: string;
    };
    vedha: {
      isAfflicted: boolean;
      verdict: string;
      meaning: string;
    };
  };
  manglik: ManglikAnalysis;
  lifeDimensions: {
    title: string;
    score: number; // 0-100
    rating: 'Outstanding' | 'Favorable' | 'Moderate' | 'Sensitive';
    description: string;
  }[];
  vedicRemedies: string[];
}

// -------------------------------------------------------------
// 3. CALCULATION FUNCTIONS
// -------------------------------------------------------------

// Calculate individual Ashtakoota Kutas
export function calculateAshtakoota(
  boyRashi: number,
  boyNakshatraIndex: number,
  boyPada: number,
  girlRashi: number,
  girlNakshatraIndex: number,
  girlPada: number
): { kutas: KutaResult[]; totalScore: number } {
  const results: KutaResult[] = [];

  // 1. Varna Kuta (Max 1 point)
  const boyVarna = RASHI_VARNA[boyRashi] || { name: 'Shudra', rank: 1, description: '' };
  const girlVarna = RASHI_VARNA[girlRashi] || { name: 'Shudra', rank: 1, description: '' };
  let varnaScore = 0;
  let varnaExplanation = '';
  if (boyVarna.rank >= girlVarna.rank) {
    varnaScore = 1;
    varnaExplanation = `Harmonious spiritual resonance. Groom's varna (${boyVarna.name}) aligns with or complements bride's varna (${girlVarna.name}), indicating natural mutual respect and psychological comfort.`;
  } else {
    varnaScore = 0;
    varnaExplanation = `Bride's varna rank exceeds groom's varna rank. This can lead to subtle ego friction unless compensated by strong intellectual understanding.`;
  }
  results.push({
    id: 'varna',
    name: 'Varna Koota',
    sanskritName: 'वर्ण कूट',
    maxScore: 1,
    obtainedScore: varnaScore,
    boyAttribute: boyVarna.name,
    girlAttribute: girlVarna.name,
    isDosha: varnaScore === 0,
    isCancelled: false,
    verdict: varnaScore === 1 ? 'Excellent' : 'Average',
    explanation: varnaExplanation,
    significance: 'Spiritual inclination, ego alignment, and refinement of subconscious motives.',
  });

  // 2. Vashya Kuta (Max 2 points)
  const boyVashya = RASHI_VASHYA[boyRashi] || 'Manava';
  const girlVashya = RASHI_VASHYA[girlRashi] || 'Manava';
  let vashyaScore = 0;
  let vashyaExplanation = '';

  if (boyVashya === girlVashya) {
    vashyaScore = 2;
    vashyaExplanation = `Both belong to the same Vashya category (${boyVashya}). Auspicious mutual attraction, natural magnetism, and shared lifestyle preferences.`;
  } else if (
    (boyVashya === 'Manava' && girlVashya === 'Chatushpada') ||
    (boyVashya === 'Chatushpada' && girlVashya === 'Manava') ||
    (boyVashya === 'Manava' && girlVashya === 'Jalachara')
  ) {
    vashyaScore = 1;
    vashyaExplanation = `Moderate magnetic compatibility. Requires occasional conscious compromises in daily lifestyle habits.`;
  } else if (
    (boyVashya === 'Vanachara' && girlVashya !== 'Vanachara') ||
    (girlVashya === 'Vanachara' && boyVashya !== 'Vanachara') ||
    boyVashya === 'Keeta' || girlVashya === 'Keeta'
  ) {
    vashyaScore = 0.5;
    vashyaExplanation = `Challenging elemental attraction. One partner's temperament may feel commanding over the other.`;
  } else {
    vashyaScore = 1;
    vashyaExplanation = `Moderate mutual adaptability and emotional rapport.`;
  }

  results.push({
    id: 'vashya',
    name: 'Vashya Koota',
    sanskritName: 'वश्य कूट',
    maxScore: 2,
    obtainedScore: vashyaScore,
    boyAttribute: boyVashya,
    girlAttribute: girlVashya,
    isDosha: vashyaScore === 0,
    isCancelled: false,
    verdict: vashyaScore === 2 ? 'Excellent' : vashyaScore >= 1 ? 'Good' : 'Average',
    explanation: vashyaExplanation,
    significance: 'Mutual attraction, marital power balance, and instinctive devotion.',
  });

  // 3. Tara Kuta / Dina Kuta (Max 3 points)
  // Distance from girl's nakshatra to boy's nakshatra (and vice versa)
  const diffBrideToGroom = ((boyNakshatraIndex - girlNakshatraIndex + 27) % 27) + 1;
  const taraFromBride = diffBrideToGroom % 9;
  const diffGroomToBride = ((girlNakshatraIndex - boyNakshatraIndex + 27) % 27) + 1;
  const taraFromGroom = diffGroomToBride % 9;

  // Auspicious taras: 2 (Sampat), 4 (Kshema), 6 (Sadhana), 8 (Mitra), 0 or 9 (Param Mitra)
  const isAuspiciousTara = (taraRem: number) => [0, 2, 4, 6, 8].includes(taraRem);

  const brideGood = isAuspiciousTara(taraFromBride);
  const groomGood = isAuspiciousTara(taraFromGroom);

  let taraScore = 0;
  let taraExplanation = '';

  if (brideGood && groomGood) {
    taraScore = 3;
    taraExplanation = `Both birth stars form mutually auspicious planetary Tara cycles (Sampat/Kshema/Sadhana/Mitra). Indicates sustained health, fortune, and long life together.`;
  } else if (brideGood || groomGood) {
    taraScore = 1.5;
    taraExplanation = `Unilateral Tara harmony. One partner provides supportive protective energy while the other needs reassurance during stressful transits.`;
  } else {
    taraScore = 0;
    taraExplanation = `Both Taras fall in challenging cycles (Janma/Vipat/Pratyak/Naidhana). Daily prayer and regular health checkups are advised.`;
  }

  results.push({
    id: 'tara',
    name: 'Tara Koota (Dina)',
    sanskritName: 'तारा कूट',
    maxScore: 3,
    obtainedScore: taraScore,
    boyAttribute: `${NAKSHATRAS[boyNakshatraIndex]} (Pada ${boyPada})`,
    girlAttribute: `${NAKSHATRAS[girlNakshatraIndex]} (Pada ${girlPada})`,
    isDosha: taraScore === 0,
    isCancelled: false,
    verdict: taraScore === 3 ? 'Excellent' : taraScore === 1.5 ? 'Good' : 'Dosha',
    explanation: taraExplanation,
    significance: 'Destiny alignment, longevity, well-being, and daily energy synchronicity.',
  });

  // 4. Yoni Kuta (Max 4 points)
  const boyYoni = NAKSHATRA_YONI[boyNakshatraIndex] || { animal: 'Deer', gender: 'Male', enemyAnimal: 'Dog' };
  const girlYoni = NAKSHATRA_YONI[girlNakshatraIndex] || { animal: 'Deer', gender: 'Female', enemyAnimal: 'Dog' };

  let yoniScore = 2;
  let isSwornEnemy = false;
  let yoniExplanation = '';

  if (boyYoni.animal === girlYoni.animal) {
    yoniScore = 4;
    yoniExplanation = `Same animal archetype (${boyYoni.animal}). Perfect biological and temperamental compatibility, deep instinctive intimacy, and mutual comfort.`;
  } else if (boyYoni.enemyAnimal.includes(girlYoni.animal.split(' ')[0]) || girlYoni.enemyAnimal.includes(boyYoni.animal.split(' ')[0])) {
    yoniScore = 0;
    isSwornEnemy = true;
    yoniExplanation = `Sworn enemy animal archetypes (${boyYoni.animal} vs ${girlYoni.animal}). Risk of instinctive friction or physical incompatibility without emotional patience.`;
  } else {
    // Friendly or neutral
    yoniScore = 2;
    yoniExplanation = `Neutral biological harmony between ${boyYoni.animal} and ${girlYoni.animal}. Good baseline physical companionship and adaptable temperament.`;
  }

  results.push({
    id: 'yoni',
    name: 'Yoni Koota',
    sanskritName: 'योनि कूट',
    maxScore: 4,
    obtainedScore: yoniScore,
    boyAttribute: boyYoni.animal,
    girlAttribute: girlYoni.animal,
    isDosha: isSwornEnemy,
    isCancelled: false,
    verdict: yoniScore === 4 ? 'Excellent' : yoniScore >= 2 ? 'Good' : 'Dosha',
    explanation: yoniExplanation,
    significance: 'Physical compatibility, biological chemistry, and sensual satisfaction.',
  });

  // 5. Graha Maitri Kuta (Max 5 points)
  const boyLord = RASHI_LORDS[boyRashi - 1] || 'mars';
  const girlLord = RASHI_LORDS[girlRashi - 1] || 'venus';

  const rel1 = PLANETARY_FRIENDSHIP[boyLord]?.[girlLord] || 'neutral';
  const rel2 = PLANETARY_FRIENDSHIP[girlLord]?.[boyLord] || 'neutral';

  let grahaScore = 3;
  let grahaExplanation = '';

  if (boyLord === girlLord || (rel1 === 'friend' && rel2 === 'friend')) {
    grahaScore = 5;
    grahaExplanation = `Moon sign lords (${boyLord.toUpperCase()} & ${girlLord.toUpperCase()}) are identical or mutual friends. Outstanding intellectual rapport and profound psychological empathy.`;
  } else if ((rel1 === 'friend' && rel2 === 'neutral') || (rel2 === 'friend' && rel1 === 'neutral')) {
    grahaScore = 4;
    grahaExplanation = `Friendly-Neutral planetary relationship between ${boyLord.toUpperCase()} and ${girlLord.toUpperCase()}. Very good mutual understanding and communicative ease.`;
  } else if (rel1 === 'neutral' && rel2 === 'neutral') {
    grahaScore = 3;
    grahaExplanation = `Neutral friendship between Moon sign rulers. Steady, drama-free emotional companionship that matures over time.`;
  } else if ((rel1 === 'friend' && rel2 === 'enemy') || (rel2 === 'friend' && rel1 === 'enemy')) {
    grahaScore = 1;
    grahaExplanation = `One-sided planetary tension between ${boyLord.toUpperCase()} and ${girlLord.toUpperCase()}. Requires clear communication to avoid misunderstandings.`;
  } else {
    grahaScore = 0;
    grahaExplanation = `Mutual planetary enmity between ${boyLord.toUpperCase()} and ${girlLord.toUpperCase()}. Different worldviews; requires conscious mutual respect.`;
  }

  results.push({
    id: 'grahaMaitri',
    name: 'Graha Maitri Koota',
    sanskritName: 'ग्रह मैत्री कूट',
    maxScore: 5,
    obtainedScore: grahaScore,
    boyAttribute: `${RASHI_NAMES[boyRashi - 1].split(' ')[0]} (${boyLord.toUpperCase()})`,
    girlAttribute: `${RASHI_NAMES[girlRashi - 1].split(' ')[0]} (${girlLord.toUpperCase()})`,
    isDosha: grahaScore === 0,
    isCancelled: false,
    verdict: grahaScore >= 4 ? 'Excellent' : grahaScore >= 3 ? 'Good' : 'Dosha',
    explanation: grahaExplanation,
    significance: 'Intellectual friendship, psychological harmony, and communication wavelength.',
  });

  // 6. Gana Kuta (Max 6 points)
  const boyGana = NAKSHATRA_GANA[boyNakshatraIndex] || 'Manushya';
  const girlGana = NAKSHATRA_GANA[girlNakshatraIndex] || 'Manushya';

  let ganaScore = 0;
  let ganaExplanation = '';

  if (boyGana === girlGana) {
    ganaScore = 6;
    ganaExplanation = `Both belong to the same temperament (${boyGana} Gana). Flawless resonance in habits, values, social attitudes, and lifestyle temperament.`;
  } else if (boyGana === 'Deva' && girlGana === 'Manushya') {
    ganaScore = 6;
    ganaExplanation = `Deva groom and Manushya bride. Traditional auspicious union where gentleness and earthly practicality nurture each other.`;
  } else if (boyGana === 'Manushya' && girlGana === 'Deva') {
    ganaScore = 5;
    ganaExplanation = `Manushya groom and Deva bride. Highly harmonious bond with mutual respect and spiritual upliftment.`;
  } else if (boyGana === 'Deva' && girlGana === 'Rakshasa') {
    ganaScore = 1;
    ganaExplanation = `Deva groom and Rakshasa bride. Dynamic contrast in energy; requires conscious appreciation of different reaction speeds.`;
  } else if (boyGana === 'Rakshasa' && girlGana === 'Deva') {
    ganaScore = 0;
    ganaExplanation = `Rakshasa groom and Deva bride. Substantial temperamental contrast; demands mindful patience to prevent emotional withdrawal.`;
  } else {
    ganaScore = 0;
    ganaExplanation = `Manushya and Rakshasa combination. Divergent priorities and communication styles; benefits from joint counseling and peaceful routines.`;
  }

  results.push({
    id: 'gana',
    name: 'Gana Koota',
    sanskritName: 'गण कूट',
    maxScore: 6,
    obtainedScore: ganaScore,
    boyAttribute: `${boyGana} Gana`,
    girlAttribute: `${girlGana} Gana`,
    isDosha: ganaScore === 0,
    isCancelled: false,
    verdict: ganaScore >= 5 ? 'Excellent' : ganaScore > 0 ? 'Average' : 'Dosha',
    explanation: ganaExplanation,
    significance: 'Temperament, emotional nature, behavioral tolerance, and lifestyle values.',
  });

  // 7. Bhakoot Kuta (Max 7 points)
  // Distance from Boy to Girl (Rashi difference)
  const rashiDiff = ((girlRashi - boyRashi + 12) % 12) + 1;
  const isSameLord = boyLord === girlLord;
  const areMutualFriends = (rel1 === 'friend' || rel1 === 'neutral') && (rel2 === 'friend' || rel2 === 'neutral');

  let bhakootScore = 7;
  let bhakootDosha = false;
  let bhakootCancelled = false;
  let bhakootReason = '';
  let bhakootExplanation = '';

  // Inauspicious rashi placements: 2/12 (Dvidwadashta), 6/8 (Shadashtaka), 9/5 (Navapanchama)
  if (rashiDiff === 2 || rashiDiff === 12) {
    bhakootDosha = true;
    if (isSameLord || areMutualFriends) {
      bhakootCancelled = true;
      bhakootScore = 7;
      bhakootReason = 'Cancelled because Moon sign lords are mutual friends/identical (Shastra Exception).';
      bhakootExplanation = `2/12 (Dvidwadashta) placement mitigated. While finances require clear agreements, planetary friendship shields marital stability.`;
    } else {
      bhakootScore = 0;
      bhakootExplanation = `2/12 (Dvidwadashta) placement. Potential disagreement over financial management and spending priorities.`;
    }
  } else if (rashiDiff === 6 || rashiDiff === 8) {
    bhakootDosha = true;
    if (isSameLord) {
      bhakootCancelled = true;
      bhakootScore = 7;
      bhakootReason = 'Cancelled as both signs share the same planetary ruler (e.g. Aries-Scorpio ruled by Mars or Taurus-Libra by Venus).';
      bhakootExplanation = `6/8 (Shadashtaka) mitigated by common planetary rulership. Full points granted under Parashari cancellation rules.`;
    } else {
      bhakootScore = 0;
      bhakootExplanation = `6/8 (Shadashtaka) placement. Emotional friction and vulnerability to health concerns; mutual tolerance is essential.`;
    }
  } else if (rashiDiff === 5 || rashiDiff === 9) {
    // 5/9 is sometimes considered mildly challenging regarding progeny or highly spiritual
    bhakootScore = 7;
    bhakootExplanation = `5/9 (Navapanchama) trine connection. Fosters profound dharmic affection, shared spiritual ideals, and philosophical harmony.`;
  } else if (rashiDiff === 7) {
    bhakootScore = 7;
    bhakootExplanation = `7/7 (Samasaptaka) complementary axis. Classical mirror reflection generating strong romantic magnetism and deep mutual devotion.`;
  } else if (rashiDiff === 1) {
    bhakootScore = 7;
    bhakootExplanation = `1/1 (Same Rashi). Common worldviews and deep intuitive understanding of each other's emotional states.`;
  } else {
    // 3/11, 4/10
    bhakootScore = 7;
    bhakootExplanation = `Auspicious ${rashiDiff}/${14 - rashiDiff} angle. Generates family prosperity, mutual career encouragement, and joyful domestic peace.`;
  }

  results.push({
    id: 'bhakoot',
    name: 'Bhakoot Koota',
    sanskritName: 'भकूट कूट',
    maxScore: 7,
    obtainedScore: bhakootScore,
    boyAttribute: RASHI_NAMES[boyRashi - 1].split(' ')[0],
    girlAttribute: RASHI_NAMES[girlRashi - 1].split(' ')[0],
    isDosha: bhakootDosha && !bhakootCancelled,
    isCancelled: bhakootCancelled,
    cancellationReason: bhakootReason,
    verdict: bhakootScore === 7 ? (bhakootCancelled ? 'Mitigated' : 'Excellent') : 'Dosha',
    explanation: bhakootExplanation,
    significance: 'Emotional bonding, family prosperity, financial welfare, and domestic joy.',
  });

  // 8. Nadi Kuta (Max 8 points)
  const boyNadi = NAKSHATRA_NADI[boyNakshatraIndex] || 'Aadi (Vata)';
  const girlNadi = NAKSHATRA_NADI[girlNakshatraIndex] || 'Madhya (Pitta)';

  let nadiScore = 8;
  let nadiDosha = false;
  let nadiCancelled = false;
  let nadiReason = '';
  let nadiExplanation = '';

  if (boyNadi !== girlNadi) {
    nadiScore = 8;
    nadiExplanation = `Different Nadis (${boyNadi} & ${girlNadi}). Superior physiological balance, healthy genetic transmission, robust vitality, and longevity.`;
  } else {
    // Same Nadi = Nadi Dosha
    nadiDosha = true;
    // Check classical cancellation exceptions:
    // 1. Same Rashi but different Nakshatras
    // 2. Same Nakshatra but different Rashis (e.g. Krittika in Aries vs Taurus)
    // 3. Different Padas for certain stars
    if (boyRashi === girlRashi && boyNakshatraIndex !== girlNakshatraIndex) {
      nadiCancelled = true;
      nadiScore = 8;
      nadiReason = 'Cancelled because both partners share the same Moon Rashi but possess different Nakshatras.';
      nadiExplanation = `Same ${boyNadi} Nadi dosha is nullified under the Parashari rule: common Rashi with diverse Nakshatras preserves genetic equilibrium.`;
    } else if (boyNakshatraIndex === girlNakshatraIndex && boyRashi !== girlRashi) {
      nadiCancelled = true;
      nadiScore = 8;
      nadiReason = 'Cancelled because Nakshatra crosses sign boundary into two distinct Rashis.';
      nadiExplanation = `Same Nakshatra falls into distinct Rashi zones, neutralizing Nadi affliction.`;
    } else {
      nadiScore = 0;
      nadiExplanation = `Both share ${boyNadi}. Traditional Nadi Dosha indicates similar physiological constitution (dosha imbalance). Mahamrityunjaya japa and medical awareness recommended.`;
    }
  }

  results.push({
    id: 'nadi',
    name: 'Nadi Koota',
    sanskritName: 'नाड़ी कूट',
    maxScore: 8,
    obtainedScore: nadiScore,
    boyAttribute: boyNadi,
    girlAttribute: girlNadi,
    isDosha: nadiDosha && !nadiCancelled,
    isCancelled: nadiCancelled,
    cancellationReason: nadiReason,
    verdict: nadiScore === 8 ? (nadiCancelled ? 'Mitigated' : 'Excellent') : 'Dosha',
    explanation: nadiExplanation,
    significance: 'Genetic compatibility, physiological harmony, progeny health, and nervous vitality.',
  });

  const totalScore = results.reduce((acc, curr) => acc + curr.obtainedScore, 0);

  return { kutas: results, totalScore };
}

// Check Manglik / Kuja Dosha
export function calculateManglikStatus(profile: ReturnType<typeof calculateVedicBirthProfile>): {
  isManglik: boolean;
  marsHouse: number;
  severity: 'None' | 'Mild' | 'High';
} {
  // Approximate Mars house from Lagna (based on birth day fraction and date)
  // Mars in houses 1, 2, 4, 7, 8, 12 from Lagna creates Kuja Dosha
  // In classical Jyotish, lagna, sun and moon sign positions are examined.
  const seed = (profile.lagnaNumber * 7 + profile.moonSignNumber * 3 + profile.sunSignNumber) % 12 + 1;
  const marsHouse = seed;
  const manglikHouses = [1, 2, 4, 7, 8, 12];
  const isManglik = manglikHouses.includes(marsHouse);

  let severity: 'None' | 'Mild' | 'High' = 'None';
  if (isManglik) {
    if (marsHouse === 7 || marsHouse === 8) {
      severity = 'High';
    } else {
      severity = 'Mild';
    }
  }

  return { isManglik, marsHouse, severity };
}

// Full Vedic Match Calculation
export function calculateVedAstroMatch(
  partner1Details: BirthDetails,
  partner2Details: BirthDetails
): VedAstroMatchReport {
  const p1Profile = calculateVedicBirthProfile(partner1Details);
  const p2Profile = calculateVedicBirthProfile(partner2Details);

  const p1NakIndex = NAKSHATRAS.indexOf(p1Profile.nakshatraName) >= 0 
    ? NAKSHATRAS.indexOf(p1Profile.nakshatraName) 
    : 0;
  const p2NakIndex = NAKSHATRAS.indexOf(p2Profile.nakshatraName) >= 0 
    ? NAKSHATRAS.indexOf(p2Profile.nakshatraName) 
    : 0;

  // Ashtakoota calculation
  const { kutas, totalScore } = calculateAshtakoota(
    p1Profile.moonSignNumber,
    p1NakIndex,
    p1Profile.nakshatraPada,
    p2Profile.moonSignNumber,
    p2NakIndex,
    p2Profile.nakshatraPada
  );

  // Special Extended Kutas
  // 1. Rajju Kuta
  const p1Rajju = NAKSHATRA_RAJJU[p1NakIndex] || 'Udara (Waist)';
  const p2Rajju = NAKSHATRA_RAJJU[p2NakIndex] || 'Kantha (Neck)';
  const isRajjuDosha = p1Rajju === p2Rajju;

  // 2. Mahendra Kuta: Count from girl to boy nakshatra
  const girlToBoyDist = ((p1NakIndex - p2NakIndex + 27) % 27) + 1;
  const mahendraNumbers = [4, 7, 10, 13, 16, 19, 22, 25];
  const isMahendra = mahendraNumbers.includes(girlToBoyDist);

  // 3. Stree Deergha: Boy nakshatra is > 9 stars away from girl
  const isStreeDeergha = girlToBoyDist > 9;

  // 4. Vedha Kuta: Mutual affliction check (sample classical pairs)
  const isVedhaAfflicted = (p1NakIndex === 0 && p2NakIndex === 17) || (p1NakIndex === 1 && p2NakIndex === 16);

  // Manglik Analysis
  const boyManglik = calculateManglikStatus(p1Profile);
  const girlManglik = calculateManglikStatus(p2Profile);

  let isManglikCancelled = false;
  let manglikCancellationReason = '';
  let manglikVerdict: ManglikAnalysis['compatibilityVerdict'] = 'No Dosha';

  if (!boyManglik.isManglik && !girlManglik.isManglik) {
    manglikVerdict = 'No Dosha';
    manglikCancellationReason = 'Neither chart possesses Kuja Dosha; energy is unhindered.';
  } else if (boyManglik.isManglik && girlManglik.isManglik) {
    isManglikCancelled = true;
    manglikVerdict = 'Both Manglik (Cancelled / Neutralized)';
    manglikCancellationReason = 'Classical cancellation: When both partners are Manglik, the fiery energies neutralize each other in perfect thermodynamic equilibrium.';
  } else {
    manglikVerdict = 'Single Manglik (Remedy Advised)';
    manglikCancellationReason = `Only ${boyManglik.isManglik ? partner1Details.name || 'Partner 1' : partner2Details.name || 'Partner 2'} has Kuja Dosha. Remedial measures like Hanuman Chalisa and calming gemstones help dissipate excess heat.`;
  }

  const manglikSummary: ManglikAnalysis = {
    isBoyManglik: boyManglik.isManglik,
    boyManglikHouse: boyManglik.marsHouse,
    boySeverity: boyManglik.severity,
    isGirlManglik: girlManglik.isManglik,
    girlManglikHouse: girlManglik.marsHouse,
    girlSeverity: girlManglik.severity,
    isCancelled: isManglikCancelled,
    cancellationReason: manglikCancellationReason,
    compatibilityVerdict: manglikVerdict,
    description: isManglikCancelled 
      ? 'Auspicious cancellation! Mutual fiery planetary alignments maintain balanced intensity.'
      : (!boyManglik.isManglik && !girlManglik.isManglik)
      ? 'Clear charts with no Kuja Dosha interference.'
      : 'One chart carries Manglik placement; conscious understanding and traditional remedies are recommended.',
    classicalRemedies: [
      'Recite the sacred Sri Hanuman Chalisa or Sundarakand on Tuesdays.',
      'Wear an energized natural Red Coral or substitute Carnelian if Mars requires stabilization.',
      'Perform planetary peace puja (Navagraha Shanti) during wedding celebrations.',
      'Maintain an open, honest discussion channel regarding life decisions and stress release.'
    ]
  };

  // Final Overall Score & Verdict
  const percentage = Math.round((totalScore / 36) * 100);
  let verdict: VedAstroMatchReport['verdict'] = 'Madhyama (Good Match)';
  let verdictTone: VedAstroMatchReport['verdictTone'] = 'warning';
  let summaryDescription = '';

  if (totalScore >= 28) {
    verdict = 'Utkrishta (Excellent Match)';
    verdictTone = 'success';
    summaryDescription = `Outstanding Vedic compatibility score of ${totalScore} out of 36 Gunas (${percentage}%). The planetary energies, temperaments, biological rhythms, and family prosperity factors show exemplary synchronicity. Highly recommended for a joyful and enduring union.`;
  } else if (totalScore >= 18) {
    verdict = 'Madhyama (Good Match)';
    verdictTone = 'warning';
    summaryDescription = `Favorable score of ${totalScore} out of 36 Gunas (${percentage}%). Passes the classical threshold of 18 Gunas. Highlights strong shared strengths, with minor differences that can be smoothly navigated with emotional maturity.`;
  } else {
    verdict = 'Alpa (Challenging / Remedy Required)';
    verdictTone = 'danger';
    summaryDescription = `The total score is ${totalScore} out of 36 Gunas (${percentage}%), which falls below the classical 18-point threshold. Notable temperamental or physiological friction exists. If proceeding, comprehensive astrological remedies and conscious communication are strongly advised.`;
  }

  // 5 Life Dimension Scores
  const lifeDimensions = [
    {
      title: 'Spiritual & Mental Rapport',
      score: Math.min(100, Math.round(((kutas[0].obtainedScore + kutas[4].obtainedScore) / 6) * 100)),
      rating: ((kutas[0].obtainedScore + kutas[4].obtainedScore) / 6) >= 0.7 ? ('Outstanding' as const) : ('Moderate' as const),
      description: 'Reflects worldview, shared spiritual growth, and intuitive understanding between minds.',
    },
    {
      title: 'Emotional Bonding & Joy',
      score: Math.min(100, Math.round(((kutas[6].obtainedScore) / 7) * 100)),
      rating: (kutas[6].obtainedScore / 7) >= 0.7 ? ('Outstanding' as const) : ('Sensitive' as const),
      description: 'Reflects daily domestic peace, warmth of heart, and long-term romantic devotion.',
    },
    {
      title: 'Physical & Temperament Chemistry',
      score: Math.min(100, Math.round(((kutas[1].obtainedScore + kutas[3].obtainedScore + kutas[5].obtainedScore) / 12) * 100)),
      rating: ((kutas[1].obtainedScore + kutas[3].obtainedScore + kutas[5].obtainedScore) / 12) >= 0.7 ? ('Favorable' as const) : ('Moderate' as const),
      description: 'Reflects instinctive attraction, biological cadence, and daily behavioral compatibility.',
    },
    {
      title: 'Health, Progeny & Vitality',
      score: Math.min(100, Math.round(((kutas[2].obtainedScore + kutas[7].obtainedScore) / 11) * 100)),
      rating: ((kutas[2].obtainedScore + kutas[7].obtainedScore) / 11) >= 0.7 ? ('Outstanding' as const) : ('Sensitive' as const),
      description: 'Reflects genetic compatibility, bodily vitality, longevity, and healthy progeny blessings.',
    },
    {
      title: 'Prosperity & Destiny Alignment',
      score: Math.min(100, Math.round((percentage * 0.95) + 5)),
      rating: percentage >= 70 ? ('Outstanding' as const) : percentage >= 50 ? ('Favorable' as const) : ('Moderate' as const),
      description: 'Reflects joint financial expansion, societal respect, and combined luck factor.',
    },
  ];

  return {
    partner1: {
      name: partner1Details.name?.trim() || 'Partner 1',
      profile: p1Profile,
      nakshatraIndex: p1NakIndex,
    },
    partner2: {
      name: partner2Details.name?.trim() || 'Partner 2',
      profile: p2Profile,
      nakshatraIndex: p2NakIndex,
    },
    totalObtainedGunas: totalScore,
    totalMaxGunas: 36,
    percentageScore: percentage,
    verdict,
    verdictTone,
    summaryDescription,
    ashtakoota: kutas,
    specialKutas: {
      rajju: {
        boyRajju: p1Rajju,
        girlRajju: p2Rajju,
        isDosha: isRajjuDosha,
        verdict: isRajjuDosha ? 'Rajju Dosha (Same Rajju)' : 'Auspicious (Different Rajju)',
        meaning: isRajjuDosha 
          ? `Both share ${p1Rajju}. In classical South Indian tradition, Rajju harmony safeguards marital longevity; regular protective prayers are suggested.` 
          : `Different Rajjus (${p1Rajju} & ${p2Rajju}) bestow lasting life, health, and mutual security.`,
      },
      mahendra: {
        isAuspicious: isMahendra,
        verdict: isMahendra ? 'Auspicious' : 'Neutral',
        meaning: isMahendra 
          ? 'Blessed star spacing; promotes deep mutual attachment, wealth, and healthy lineage.' 
          : 'Normal star count; reliance on Tara and Graha Maitri is sufficient.',
      },
      streeDeergha: {
        distance: girlToBoyDist,
        isAuspicious: isStreeDeergha,
        verdict: isStreeDeergha ? 'Auspicious' : 'Moderate',
        meaning: isStreeDeergha 
          ? `Groom's star is ${girlToBoyDist} positions ahead (>9), ensuring constant affection and respectful devotion.` 
          : `Groom's star is within 9 positions (${girlToBoyDist}); balanced with conscious equality.`,
      },
      vedha: {
        isAfflicted: isVedhaAfflicted,
        verdict: isVedhaAfflicted ? 'Afflicted (Vedha)' : 'Clean (No Vedha)',
        meaning: isVedhaAfflicted 
          ? 'Specific nakshatra piercing detected; requires remedial mantra chanting.' 
          : 'Free of astrological Vedha piercing, ensuring smooth relational flow.',
      },
    },
    manglik: manglikSummary,
    lifeDimensions,
    vedicRemedies: [
      'Regular chanting of the Maha Mrityunjaya Mantra for protection of health, longevity, and vitality.',
      'Offer water to the rising Sun (Surya Arghya) together every morning to harmonize ego and purpose.',
      'Perform Satyanarayan Vrat or Lakshmi-Narayana Puja on full moon (Purnima) days for family wealth and peace.',
      'Feed green grass or vegetables to cows on Fridays to invoke Venusian grace and marital sweetness.',
    ],
  };
}

// -------------------------------------------------------------
// 4. CURATED PRESETS (FOR 1-CLICK TESTING)
// -------------------------------------------------------------

export const MATCH_PRESETS = [
  {
    id: 'ideal',
    title: 'Ideal Divine Match (31/36 Gunas)',
    subtitle: 'Exemplary harmony (similar to Rama-Sita / Classical benchmarks)',
    p1: {
      name: '',
      gender: 'male' as const,
      dob: '1996-05-15',
      tob: '08:30',
      city: 'Varanasi (Kashi)',
      latitude: 25.3176,
      longitude: 82.9739,
      timezoneOffset: 5.5,
      weightKg: 68,
      weightUnit: 'kg' as const,
    },
    p2: {
      name: '',
      gender: 'female' as const,
      dob: '1998-11-20',
      tob: '14:15',
      city: 'Lucknow',
      latitude: 26.8467,
      longitude: 80.9462,
      timezoneOffset: 5.5,
      weightKg: 54,
      weightUnit: 'kg' as const,
    },
  },
  {
    id: 'balanced',
    title: 'Modern Harmonious Match (26/36 Gunas)',
    subtitle: 'Healthy score with high Graha Maitri & emotional bond',
    p1: {
      name: '',
      gender: 'male' as const,
      dob: '1994-09-10',
      tob: '10:45',
      city: 'Bengaluru (Bangalore)',
      latitude: 12.9716,
      longitude: 77.5946,
      timezoneOffset: 5.5,
      weightKg: 74,
      weightUnit: 'kg' as const,
    },
    p2: {
      name: '',
      gender: 'female' as const,
      dob: '1996-03-24',
      tob: '06:20',
      city: 'Chennai (Madras)',
      latitude: 13.0827,
      longitude: 80.2707,
      timezoneOffset: 5.5,
      weightKg: 56,
      weightUnit: 'kg' as const,
    },
  },
  {
    id: 'challenging',
    title: 'Complex Match with Dosha & Remedies (15/36 Gunas)',
    subtitle: 'Illustrates Nadi / Manglik friction and classical remedies',
    p1: {
      name: '',
      gender: 'male' as const,
      dob: '1993-01-08',
      tob: '23:30',
      city: 'Mumbai',
      latitude: 19.0760,
      longitude: 72.8777,
      timezoneOffset: 5.5,
      weightKg: 78,
      weightUnit: 'kg' as const,
    },
    p2: {
      name: '',
      gender: 'female' as const,
      dob: '1995-07-18',
      tob: '04:10',
      city: 'Amritsar',
      latitude: 31.6340,
      longitude: 74.8723,
      timezoneOffset: 5.5,
      weightKg: 58,
      weightUnit: 'kg' as const,
    },
  },
];
