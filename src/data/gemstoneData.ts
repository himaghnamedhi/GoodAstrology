import { PlanetId } from '../types/astrology';

export interface GemstoneInfo {
  id: string;
  name: string;
  sanskritName: string;
  devanagari: string;
  planet: PlanetId;
  planetName: string;
  category: 'Navaratna' | 'Uparatna';
  colorHex: string;
  colorName: string;
  gradient: string;
  bgTint: string;
  borderTint: string;
  badgeColor: string;
  substitutes: string[];
  idealMetal: string;
  idealFinger: string;
  wearingDay: string;
  wearingTime: string;
  auspiciousPaksha: string;
  beejMantra: string;
  beejMantraTransliteration: string;
  chantCount: number;
  rattiFormulaText: string;
  chakra: string;
  energyType: string;
  primaryBenefits: string[];
  lifeThemes: string[];
  contraindications: string[];
  incompatibleGems: string[];
  compatibleGems: string[];
  purificationSteps: string[];
  vedicLore: string;
  vedastroPrinciple: string;
}

export interface LagnaGemstoneRecommendation {
  lagnaId: number;
  lagnaName: string;
  sanskritName: string;
  symbol: string;
  element: 'Fire' | 'Earth' | 'Air' | 'Water';
  rulingPlanet: PlanetId;
  lifeStone: {
    gemId: string;
    gemName: string;
    planet: PlanetId;
    houseRulership: string;
    why: string;
    priority: 'Essential (Life Stone / Jeevan Ratna)';
  };
  luckyStone: {
    gemId: string;
    gemName: string;
    planet: PlanetId;
    houseRulership: string;
    why: string;
    priority: 'Highly Auspicious (Lucky Stone / Bhagya Ratna)';
  };
  punyaStone: {
    gemId: string;
    gemName: string;
    planet: PlanetId;
    houseRulership: string;
    why: string;
    priority: 'Intellect & Prosperity (Punya Ratna)';
  };
  yogakarakaStone?: {
    gemId: string;
    gemName: string;
    planet: PlanetId;
    houseRulership: string;
    why: string;
  };
  strictlyAvoid: {
    gemId: string;
    gemName: string;
    reason: string;
  }[];
  dashaSpecificGems: {
    gemId: string;
    condition: string;
  }[];
  overallGuidance: string;
}

export interface LifeGoalRecommendation {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
  primaryGemId: string;
  secondaryGemId: string;
  bestLagnas: string[];
  cautions: string;
  description: string;
}

export const NAVARATNA_DATA: Record<string, GemstoneInfo> = {
  ruby: {
    id: 'ruby',
    name: 'Ruby',
    sanskritName: 'Manikya',
    devanagari: 'माणिक्य',
    planet: 'sun',
    planetName: 'Sun (Surya)',
    category: 'Navaratna',
    colorHex: '#DC2626',
    colorName: 'Crimson Red / Pigeon Blood',
    gradient: 'from-rose-600 via-red-600 to-amber-700',
    bgTint: 'bg-rose-50/80',
    borderTint: 'border-rose-200',
    badgeColor: 'bg-red-100 text-red-800 border-red-200',
    substitutes: ['Red Garnet', 'Red Spinel', 'Rubellite Tourmaline', 'Star Ruby'],
    idealMetal: '22K / 18K Yellow Gold or Pure Copper',
    idealFinger: 'Ring Finger (Anamika) of the working/dominant hand',
    wearingDay: 'Sunday Morning (Surya Hora) during Shukla Paksha (Waxing Moon)',
    wearingTime: 'Within 1 hour of Sunrise',
    auspiciousPaksha: 'Shukla Paksha (Bright fortnight)',
    beejMantra: 'ॐ ह्रां ह्रीं ह्रौं सः सूर्याय नमः',
    beejMantraTransliteration: 'Om Hram Hreem Hroum Sah Suryaya Namah',
    chantCount: 108,
    rattiFormulaText: 'Body Weight (kg) ÷ 10 to 12. Standard range: 3.5 – 7.5 Ratti.',
    chakra: 'Manipura (Solar Plexus) & Anahata (Heart)',
    energyType: 'Hot / Solar (Pitta)',
    primaryBenefits: [
      'Empowers self-confidence, leadership, authority, and willpower',
      'Enhances vitality, blood circulation, eye vision, and bone strength',
      'Fosters favors and recognition from governments, superiors, and administrative bodies',
      'Protects the native from evil eye, lethargy, and low self-esteem'
    ],
    lifeThemes: ['Leadership', 'Government & Politics', 'Career Prestige', 'Vitality & Health'],
    contraindications: [
      'Do NOT wear if Sun rules Dusthana houses (6th, 8th, 12th) without Lagna lordship',
      'Do NOT wear simultaneously with Blue Sapphire, Diamond, Hessonite, or Cat’s Eye'
    ],
    incompatibleGems: ['blue_sapphire', 'diamond', 'hessonite', 'cats_eye'],
    compatibleGems: ['pearl', 'red_coral', 'yellow_sapphire'],
    purificationSteps: [
      'Dip in Raw Cow Milk, Honey, and Pure Ganga Jal in a copper or brass bowl for 45 minutes.',
      'Rinse with fresh clean water and place on a red cloth with fresh red flowers.',
      'Light pure cow ghee lamp and sandalwood incense (Dhoop).',
      'Chant the Surya Beej Mantra 108 times facing East before wearing on Sunday sunrise.'
    ],
    vedicLore: 'According to the Garuda Purana, Ruby originated from drops of the divine blood of demon king Vala, sanctified by the Sun god Surya Deva.',
    vedastroPrinciple: 'Classical Jyotish validates Ruby as the ultimate catalyst for Solar prana. It stimulates the Pingala nadi and restores sovereign confidence in the native.'
  },

  pearl: {
    id: 'pearl',
    name: 'Natural Pearl',
    sanskritName: 'Mukta / Moti',
    devanagari: 'मुक्ता / मोती',
    planet: 'moon',
    planetName: 'Moon (Chandra)',
    category: 'Navaratna',
    colorHex: '#E2E8F0',
    colorName: 'Iridescent Moonlit White / Silver Sheen',
    gradient: 'from-slate-100 via-sky-50 to-stone-200',
    bgTint: 'bg-sky-50/70',
    borderTint: 'border-sky-200',
    badgeColor: 'bg-sky-100 text-sky-800 border-sky-200',
    substitutes: ['Natural Moonstone', 'White Coral', 'South Sea Keshi Pearl'],
    idealMetal: 'Sterling Silver (925) or White Gold',
    idealFinger: 'Little Finger (Kanishtha) or Ring Finger (Anamika)',
    wearingDay: 'Monday Evening at Moonrise or Monday Morning (Chandra Hora)',
    wearingTime: 'Evening at Twilight / Moonrise or within 1 hr of Sunrise',
    auspiciousPaksha: 'Shukla Paksha (during full moon / waxing phase)',
    beejMantra: 'ॐ श्रां श्रीं श्रौं सः चन्द्राय नमः',
    beejMantraTransliteration: 'Om Shram Shreem Shroum Sah Chandraya Namah',
    chantCount: 108,
    rattiFormulaText: 'Body Weight (kg) ÷ 10. Standard range: 4.25 – 8.25 Ratti.',
    chakra: 'Svadhisthana (Sacral) & Sahasrara (Crown)',
    energyType: 'Cool / Lunar (Kapha)',
    primaryBenefits: [
      'Instills deep mental tranquility, emotional stability, and inner peace',
      'Relieves stress, anxiety, mood swings, overthinking, and insomnia',
      'Enhances feminine intuition, artistic creativity, and fluid adaptability',
      'Nourishes maternal relationships, memory retention, and harmonious family ties'
    ],
    lifeThemes: ['Mental Equilibrium', 'Emotional Healing', 'Creativity & Arts', 'Peace of Mind'],
    contraindications: [
      'Do NOT wear if Moon is an active Maraka or heavily afflicted 8th lord in water signs without benefic aspects',
      'Avoid combining with Hessonite (Rahu) or Diamond without expert scrutiny'
    ],
    incompatibleGems: ['hessonite', 'diamond', 'cats_eye'],
    compatibleGems: ['ruby', 'red_coral', 'yellow_sapphire'],
    purificationSteps: [
      'Immerse in unboiled cow milk, sweet honey, and holy water in a silver vessel for 1 hour.',
      'Wipe with clean white silk cloth and offer fragrant white jasmine or lotus flowers.',
      'Light camphor (Karpur) and white sesame oil lamp.',
      'Chant Chandra Beej Mantra 108 times facing North-West before wearing on Monday.'
    ],
    vedicLore: 'Garuda Purana states that pristine pearls manifested from the sacred teeth of the cosmic being, blessed by Soma (Chandra).',
    vedastroPrinciple: 'Classical Jyotish models Moon as the mirror of Manas (the subconscious mind). Natural Pearl aligns lunar cycles and stabilizes emotional resonance.'
  },

  red_coral: {
    id: 'red_coral',
    name: 'Red Coral',
    sanskritName: 'Moonga / Pravala',
    devanagari: 'मूंगा / प्रवाल',
    planet: 'mars',
    planetName: 'Mars (Mangal)',
    category: 'Navaratna',
    colorHex: '#EA580C',
    colorName: 'Deep Vermilion / Sindoor Red / Oxblood',
    gradient: 'from-orange-600 via-red-500 to-amber-600',
    bgTint: 'bg-orange-50/80',
    borderTint: 'border-orange-200',
    badgeColor: 'bg-orange-100 text-orange-800 border-orange-200',
    substitutes: ['Red Carnelian', 'Red Jasper', 'Red Agate'],
    idealMetal: 'Pure Copper, Yellow Gold, or Silver with Copper blend',
    idealFinger: 'Ring Finger (Anamika) of the dominant hand',
    wearingDay: 'Tuesday Morning (Mangal Hora)',
    wearingTime: 'Within 1 hour of Sunrise',
    auspiciousPaksha: 'Shukla Paksha (Waxing Moon)',
    beejMantra: 'ॐ क्रां क्रीं क्रौं सः भौमाय नमः',
    beejMantraTransliteration: 'Om Kram Kreem Kroum Sah Bhaumaya Namah',
    chantCount: 108,
    rattiFormulaText: 'Body Weight (kg) ÷ 10 to 12. Standard range: 5.25 – 9.25 Ratti.',
    chakra: 'Muladhara (Root Chakra)',
    energyType: 'Hot / Solar (Pitta)',
    primaryBenefits: [
      'Boosts courage, stamina, physical energy, and protective aura against enemies',
      'Mitigates negative Manglik Dosha impacts and bolsters marital vitality',
      'Aids surgeons, engineers, military/police officers, athletes, and real estate leaders',
      'Purifies blood circulation, bone marrow, muscular strength, and digestive agni'
    ],
    lifeThemes: ['Courage & Valor', 'Property & Real Estate', 'Athletics & Surgery', 'Overcoming Obstacles'],
    contraindications: [
      'Do NOT wear if Mars is a direct functional malefic (e.g., Virgo, Gemini, Libra Lagnas) unless specific dasha mitigations exist',
      'Incompatible with Emerald and Diamond'
    ],
    incompatibleGems: ['emerald', 'diamond', 'blue_sapphire'],
    compatibleGems: ['ruby', 'pearl', 'yellow_sapphire'],
    purificationSteps: [
      'Place in raw cow milk mixed with honey and red sandalwood paste for 45 minutes.',
      'Rinse with fresh river water and place on a clean copper plate over a red cloth.',
      'Offer red hibiscus flowers, vermilion (Sindoor), and light a ghee lamp.',
      'Chant Mangal Beej Mantra 108 times facing South before wearing on Tuesday.'
    ],
    vedicLore: 'Born from the vibrant blood marrow of the cosmic celestial body, blessed by Lord Kartikeya (Murugan) and Hanuman.',
    vedastroPrinciple: 'Classical Jyotish highlights Mars as dynamic execution force. Red Coral infuses primal drive while grounding erratic anxiety into disciplined action.'
  },

  emerald: {
    id: 'emerald',
    name: 'Natural Emerald',
    sanskritName: 'Panna / Marakata',
    devanagari: 'पन्ना / मरकत',
    planet: 'mercury',
    planetName: 'Mercury (Budha)',
    category: 'Navaratna',
    colorHex: '#059669',
    colorName: 'Vibrant Forest Green / Parrot Feather Green',
    gradient: 'from-emerald-600 via-teal-600 to-green-700',
    bgTint: 'bg-emerald-50/80',
    borderTint: 'border-emerald-200',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    substitutes: ['Natural Peridot', 'Green Tourmaline', 'Green Tsavorite', 'Green Fluorite'],
    idealMetal: '18K / 22K Gold, White Gold, Bronze (Kansa), or Silver',
    idealFinger: 'Little Finger (Kanishtha) of the working hand',
    wearingDay: 'Wednesday Morning (Budha Hora)',
    wearingTime: 'Within 2 hours of Sunrise',
    auspiciousPaksha: 'Shukla Paksha (Waxing Moon)',
    beejMantra: 'ॐ ब्रां ब्रीं ब्रौं सः बुधाय नमः',
    beejMantraTransliteration: 'Om Bram Breem Broum Sah Budhaya Namah',
    chantCount: 108,
    rattiFormulaText: 'Body Weight (kg) ÷ 12. Standard range: 3.25 – 6.50 Ratti.',
    chakra: 'Anahata (Heart) & Vishuddha (Throat / Communication)',
    energyType: 'Neutral / Air (Vata)',
    primaryBenefits: [
      'Sharpen intellect, memory recall, analytical reasoning, and speech eloquence',
      'Unlocks exponential growth in business, trading, commerce, mathematics, and IT',
      'Assists writers, teachers, negotiators, diplomats, accountants, and consultants',
      'Soothes the nervous system, alleviates speech impediments, and promotes mental agility'
    ],
    lifeThemes: ['Commerce & Wealth', 'Communication & Speech', 'Intellect & Memory', 'Tech & Business'],
    contraindications: [
      'Do NOT wear for Aries, Scorpio, or Cancer Lagnas where Mercury rules Dusthanas (3, 6, 8, 12)',
      'Incompatible with Red Coral and Pearl'
    ],
    incompatibleGems: ['red_coral', 'pearl'],
    compatibleGems: ['diamond', 'blue_sapphire', 'hessonite'],
    purificationSteps: [
      'Soak in raw cow milk and pure Ganga Jal with fresh holy basil (Tulsi) leaves for 30 minutes.',
      'Rinse with pure water, dry with green silk cloth, and place on brass or gold plate.',
      'Offer green durva grass and white flowers while lighting sandalwood incense.',
      'Chant Budha Beej Mantra 108 times facing North-East before wearing on Wednesday morning.'
    ],
    vedicLore: 'Formed from the luminous emerald bile of the cosmic being, blessed by Lord Vishnu and Budha Deva for supreme commerce.',
    vedastroPrinciple: 'Classical Jyotish models Mercury as the neural transmission protocol. Emerald fine-tunes cognitive synapse speed and articulate vocal transmission.'
  },

  yellow_sapphire: {
    id: 'yellow_sapphire',
    name: 'Yellow Sapphire',
    sanskritName: 'Pukhraj / Pushparaga',
    devanagari: 'पुखराज / पुष्पराग',
    planet: 'jupiter',
    planetName: 'Jupiter (Brihaspati / Guru)',
    category: 'Navaratna',
    colorHex: '#D97706',
    colorName: 'Canary Yellow / Golden Lemon / Honey Golden',
    gradient: 'from-amber-400 via-yellow-500 to-amber-600',
    bgTint: 'bg-amber-50/80',
    borderTint: 'border-amber-200',
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-200',
    substitutes: ['Natural Yellow Topaz', 'Golden Heliodor', 'Natural Citrine', 'Yellow Tourmaline'],
    idealMetal: '22K / 18K Yellow Gold or Panchdhatu / Brass',
    idealFinger: 'Index Finger (Tarjani) of the dominant hand',
    wearingDay: 'Thursday Morning (Guru Hora)',
    wearingTime: 'Within 1 hour of Sunrise',
    auspiciousPaksha: 'Shukla Paksha (Waxing Moon, especially on Pushya Nakshatra)',
    beejMantra: 'ॐ ग्रां ग्रीं ग्रौं सः गुरवे नमः',
    beejMantraTransliteration: 'Om Gram Greem Groum Sah Gurave Namah',
    chantCount: 108,
    rattiFormulaText: 'Body Weight (kg) ÷ 10 to 12. Standard range: 4.25 – 8.50 Ratti.',
    chakra: 'Ajna (Third Eye) & Sahasrara (Crown)',
    energyType: 'Hot / Solar (Pitta/Ether)',
    primaryBenefits: [
      'Attracts divine luck, spiritual wisdom, expansive wealth, and righteous fortune (Dharma)',
      'Fosters blessed marriage, marital harmony, noble progeny (children), and family prosperity',
      'Assists judges, scholars, philosophers, professors, spiritual leaders, and CFOs',
      'Fortifies liver health, metabolic vitality, and systemic cellular regeneration'
    ],
    lifeThemes: ['Divine Fortune (Bhagya)', 'Spiritual Wisdom', 'Marriage & Children', 'Abundance & Prosperity'],
    contraindications: [
      'Do NOT wear for Taurus, Libra, Capricorn, or Aquarius Ascendants unless carefully analyzed for dasha',
      'Incompatible with Diamond (Venus) and Blue Sapphire (Saturn) due to Guru-Shukra-Shani energetic friction'
    ],
    incompatibleGems: ['diamond', 'blue_sapphire', 'hessonite'],
    compatibleGems: ['ruby', 'pearl', 'red_coral'],
    purificationSteps: [
      'Submerge in cow milk, turmeric water, honey, and Ganga Jal in a golden or brass bowl for 45 minutes.',
      'Place on a clean yellow cloth over a brass thali; offer yellow marigold flowers and turmeric paste.',
      'Light a pure cow ghee lamp and fragrant guggul incense.',
      'Chant Brihaspati Beej Mantra 108 times facing North-East before wearing on Thursday sunrise.'
    ],
    vedicLore: 'Manifested from the divine skin of the cosmic being, imbued with the limitless grace and supreme guidance of Brihaspati, guru of the Devas.',
    vedastroPrinciple: 'Classical Jyotish identifies Jupiter as the primary benefic amplifier of universal grace. Yellow Sapphire expands consciousness and aligns the native with Dharma.'
  },

  diamond: {
    id: 'diamond',
    name: 'Natural Diamond / White Sapphire',
    sanskritName: 'Heera / Vajra / Safed Pukhraj',
    devanagari: 'हीरा / वज्र / श्वेत पुखराज',
    planet: 'venus',
    planetName: 'Venus (Shukra)',
    category: 'Navaratna',
    colorHex: '#38BDF8',
    colorName: 'Brilliant Flawless Sparkle / Pure White Luster',
    gradient: 'from-sky-200 via-indigo-100 to-purple-200',
    bgTint: 'bg-indigo-50/70',
    borderTint: 'border-indigo-200',
    badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-200',
    substitutes: ['Natural White Sapphire (Safed Pukhraj)', 'Natural White Zircon', 'Natural Opal', 'Goshenite Beryl'],
    idealMetal: 'Platinum, 18K White Gold, or Sterling Silver',
    idealFinger: 'Middle Finger (Madhyama) or Little Finger (Kanishtha)',
    wearingDay: 'Friday Morning (Shukra Hora)',
    wearingTime: 'Within 1 hour of Sunrise',
    auspiciousPaksha: 'Shukla Paksha (Waxing Moon)',
    beejMantra: 'ॐ द्रां द्रीं द्रौं सः शुक्राय नमः',
    beejMantraTransliteration: 'Om Dram Dreem Droum Sah Shukraya Namah',
    chantCount: 108,
    rattiFormulaText: 'Diamond: 0.50 – 1.50 Carats. White Sapphire substitute: 3.5 – 7.0 Ratti.',
    chakra: 'Anahata (Heart) & Svadhisthana (Sacral)',
    energyType: 'Cool / Lunar & Refined Lux',
    primaryBenefits: [
      'Magnetizes worldly luxuries, aesthetic refinement, sensual harmony, and financial opulence',
      'Deepens romantic charm, marital intimacy, artistic talent, and creative magnetism',
      'Assists actors, fashion designers, filmmakers, jewelers, hospitality leaders, and creatives',
      'Balances reproductive vitality, skin radiance, endocrine equilibrium, and longevity'
    ],
    lifeThemes: ['Luxury & Opulence', 'Romance & Marriage', 'Art & Aesthetics', 'Charisma & Glamour'],
    contraindications: [
      'Do NOT wear for Aries, Scorpio, Cancer, or Leo Ascendants without expert consultation (Venus is functional malefic/Maraka)',
      'Incompatible with Ruby, Red Coral, and Yellow Sapphire'
    ],
    incompatibleGems: ['ruby', 'red_coral', 'yellow_sapphire'],
    compatibleGems: ['emerald', 'blue_sapphire', 'hessonite'],
    purificationSteps: [
      'Immerse in raw cow milk, pure rose water (Gulab Jal), and honey in a silver or crystal bowl for 45 minutes.',
      'Dry with white silk cloth, place on silver plate, and offer fragrant white lilies or jasmine.',
      'Light white sandalwood incense and camphor lamp.',
      'Chant Shukra Beej Mantra 108 times facing South-East before wearing on Friday sunrise.'
    ],
    vedicLore: 'Emanated from the indestructible cosmic bones of the celestial being, blessed by Sage Shukracharya with immortal radiance.',
    vedastroPrinciple: 'Classical Jyotish models Venus as the harmonic vector of beauty and material fulfillment. Diamond refines sensual prana and manifests aesthetic abundance.'
  },

  blue_sapphire: {
    id: 'blue_sapphire',
    name: 'Blue Sapphire',
    sanskritName: 'Neelam / Shani Ratna',
    devanagari: 'नीलम / शनि रत्न',
    planet: 'saturn',
    planetName: 'Saturn (Shani)',
    category: 'Navaratna',
    colorHex: '#1D4ED8',
    colorName: 'Royal Velvet Blue / Cornflower Blue / Peacock Blue',
    gradient: 'from-blue-700 via-indigo-800 to-slate-900',
    bgTint: 'bg-blue-50/80',
    borderTint: 'border-blue-300',
    badgeColor: 'bg-blue-100 text-blue-900 border-blue-200',
    substitutes: ['Natural Amethyst (Katela)', 'Natural Iolite (Kaka Neeli)', 'Blue Spinel', 'Blue Topaz'],
    idealMetal: 'Panchdhatu (5-Alloy blend), Sterling Silver, Platinum, or White Gold',
    idealFinger: 'Middle Finger (Madhyama) of the dominant hand',
    wearingDay: 'Saturday Evening at Sunset or Saturday Morning (Shani Hora)',
    wearingTime: 'Twilight / Sunset or within 1 hr of Sunrise',
    auspiciousPaksha: 'Krishna or Shukla Paksha (under Shani auspicious Nakshatras: Pushya, Anuradha, Uttara Bhadrapada)',
    beejMantra: 'ॐ प्रां प्रीं प्रौं सः शनैश्चराय नमः',
    beejMantraTransliteration: 'Om Pram Preem Proum Sah Shanaischaraya Namah',
    chantCount: 108,
    rattiFormulaText: 'Body Weight (kg) ÷ 10 to 12. Standard range: 4.25 – 8.50 Ratti.',
    chakra: 'Ajna (Third Eye) & Vishuddha (Throat)',
    energyType: 'Cool / Air & Iron Earth (Vata)',
    primaryBenefits: [
      'Fastest acting gemstone: Can instantly remove financial blockages, poverty, and chronic stagnation',
      'Bestows unshakeable discipline, long-term strategic patience, structural wealth, and iron focus',
      'Protects from hidden enemies, accidents, evil eye, black magic, and sudden catastrophe',
      'Crucial for industrialists, judges, miners, politicians, tech founders, and real estate developers'
    ],
    lifeThemes: ['Instant Breakthroughs', 'Discipline & Longevity', 'Protection from Calamity', 'Structural Wealth'],
    contraindications: [
      'WARNING: MUST ALWAYS BE TRIAL TESTED FOR 3 TO 5 DAYS (under pillow or tied to arm) before permanent wearing',
      'Do NOT wear for Aries, Leo, Cancer, or Scorpio Ascendants unless Saturn is exceptional Yogakaraka or under expert counsel',
      'Strictly incompatible with Ruby, Pearl, and Red Coral'
    ],
    incompatibleGems: ['ruby', 'pearl', 'red_coral', 'yellow_sapphire'],
    compatibleGems: ['emerald', 'diamond', 'hessonite'],
    purificationSteps: [
      'MUST conduct a 72-hour trial run first. If dreams are peaceful and no accidents occur, proceed with formal wearing.',
      'Immerse in sesame oil (Til Tel), raw cow milk, and Ganga Jal in an iron or silver bowl for 1 hour.',
      'Place on a clean blue/black cloth, offer blue aparajita flowers and black sesame seeds (Kala Til).',
      'Light a mustard oil (Sarson Tel) lamp.',
      'Chant Shani Beej Mantra 108 times facing West before wearing on Saturday twilight.'
    ],
    vedicLore: 'Born from the radiant cosmic eyes of the celestial being, governed by Lord Shani Deva—the cosmic dispenser of Karmic justice.',
    vedastroPrinciple: 'Classical Jyotish classifies Blue Sapphire as the highest-intensity quantum catalyst in Jyotish. It accelerates karmic resolution and imposes structural mastery.'
  },

  hessonite: {
    id: 'hessonite',
    name: 'Hessonite Garnet',
    sanskritName: 'Gomed / Gomedhikam',
    devanagari: 'गोमेद / गोमेधिकम्',
    planet: 'rahu',
    planetName: 'Rahu (North Lunar Node)',
    category: 'Navaratna',
    colorHex: '#9A3412',
    colorName: 'Honey Brown / Cow-Urine Amber / Cinnamon Red-Orange',
    gradient: 'from-amber-700 via-orange-800 to-stone-900',
    bgTint: 'bg-stone-100',
    borderTint: 'border-stone-300',
    badgeColor: 'bg-stone-200 text-stone-900 border-stone-300',
    substitutes: ['Spessartite Garnet', 'Orange Zircon', 'Amber'],
    idealMetal: 'Silver (925) or Ashtadhatu (8-Alloy blend)',
    idealFinger: 'Middle Finger (Madhyama) or Little Finger (Kanishtha)',
    wearingDay: 'Saturday Night / Wednesday Evening during Rahu Kaal or Shani Hora',
    wearingTime: 'After Sunset / Twilight',
    auspiciousPaksha: 'Shukla Paksha (under Rahu Nakshatras: Ardra, Swati, Shatabhisha)',
    beejMantra: 'ॐ भ्रां भ्रीं भ्रौं सः राहवे नमः',
    beejMantraTransliteration: 'Om Bhram Bhreem Bhroum Sah Rahave Namah',
    chantCount: 108,
    rattiFormulaText: 'Body Weight (kg) ÷ 10 to 12. Standard range: 5.25 – 9.25 Ratti.',
    chakra: 'Sahasrara & Subtle Aura Shield',
    energyType: 'Subtle Spiritual & Magnetic Electromagnetism',
    primaryBenefits: [
      'Eliminates sudden illusions, mental confusion, hallucinations, and chronic fears',
      'Sparks sudden unexpected financial windfalls, lottery/speculation gains, and foreign travel',
      'Assists politicians, PR specialists, actors, tech innovators, gamblers, and aviation professionals',
      'Shields the aura from psychic attacks, addictions, undiagnosable diseases, and court cases'
    ],
    lifeThemes: ['Sudden Success', 'Foreign Travel & Tech', 'Dispelling Confusion', 'Psychic Protection'],
    contraindications: [
      'Do NOT wear if Rahu is placed in 1st, 5th, or 9th houses in inimical signs without expert verification',
      'Incompatible with Ruby, Pearl, and Yellow Sapphire'
    ],
    incompatibleGems: ['ruby', 'pearl', 'yellow_sapphire', 'red_coral'],
    compatibleGems: ['emerald', 'diamond', 'blue_sapphire', 'cats_eye'],
    purificationSteps: [
      'Immerse in raw cow milk, Ganga Jal, and a drop of honey for 45 minutes in a silver or glass bowl.',
      'Place on a dark blue/black cloth, offer blue flowers and sweet black sesame sweets.',
      'Light camphor and sandalwood incense.',
      'Chant Rahu Beej Mantra 108 times facing South-West after sunset before wearing.'
    ],
    vedicLore: 'Born from the divine head and essence of Svarbhanu (Rahu) during the cosmic churning of the Ocean of Milk (Samudra Manthan).',
    vedastroPrinciple: 'Classical Jyotish models Rahu as the boundary-breaking innovation vector. Hessonite filters toxic psychic interference and converts chaotic drive into strategic mastery.'
  },

  cats_eye: {
    id: 'cats_eye',
    name: 'Cat’s Eye Chrysoberyl',
    sanskritName: 'Vaidurya / Lahsuniya',
    devanagari: 'वैदूर्य / लहसुनिया',
    planet: 'ketu',
    planetName: 'Ketu (South Lunar Node)',
    category: 'Navaratna',
    colorHex: '#854D0E',
    colorName: 'Chatoyant Honey Green / Greyish Green with Moving White Ray',
    gradient: 'from-amber-600 via-yellow-700 to-stone-800',
    bgTint: 'bg-amber-50/70',
    borderTint: 'border-amber-300',
    badgeColor: 'bg-amber-200 text-amber-950 border-amber-300',
    substitutes: ['Tiger Eye', 'Cat’s Eye Quartz', 'Cat’s Eye Tourmaline', 'Natural Chrysoberyl'],
    idealMetal: 'Silver (925) or Panchdhatu (5-Alloy blend)',
    idealFinger: 'Middle Finger (Madhyama) or Ring Finger (Anamika)',
    wearingDay: 'Tuesday or Thursday Midnight / Twilight',
    wearingTime: 'Post-sunset / Twilight (Ketu Hora)',
    auspiciousPaksha: 'Shukla Paksha (under Ketu Nakshatras: Ashwini, Magha, Mula)',
    beejMantra: 'ॐ स्रां स्रीं स्रौं सः केतवे नमः',
    beejMantraTransliteration: 'Om Stram Streem Stroum Sah Ketave Namah',
    chantCount: 108,
    rattiFormulaText: 'Body Weight (kg) ÷ 10 to 12. Standard range: 4.25 – 7.50 Ratti.',
    chakra: 'Muladhara (Root) & Bindu (Higher Spiritual Aperture)',
    energyType: 'Subtle Spiritual & Occult Awakening',
    primaryBenefits: [
      'Awakens deep spiritual detachment (Moksha), occult perception, and mystical intuition',
      'Shields against sudden hidden enemies, secret conspiracies, venomous bites, and catastrophic surgery',
      'Restores lost wealth, eliminates crippling debt, and sparks sudden unexpected recovery',
      'Assists occultists, astrologers, researchers, spiritual sadhaks, healers, and psychics'
    ],
    lifeThemes: ['Spiritual Awakening (Moksha)', 'Occult Perception', 'Debt Clearance', 'Protection from Hidden Peril'],
    contraindications: [
      'Do NOT wear if Ketu is placed in sensitive Maraka or debilitated positions causing family distress',
      'Incompatible with Ruby, Pearl, and Diamond without deep astrological validation'
    ],
    incompatibleGems: ['ruby', 'pearl', 'diamond'],
    compatibleGems: ['red_coral', 'yellow_sapphire', 'emerald', 'hessonite'],
    purificationSteps: [
      'Immerse in unboiled cow milk, holy river water, and raw honey for 45 minutes.',
      'Place on a smokey/grey or multi-colored cloth, offer mixed wild flowers and dhoop incense.',
      'Light a sesame oil or ghee lamp.',
      'Chant Ketu Beej Mantra 108 times facing North-West at twilight before wearing.'
    ],
    vedicLore: 'Born from the divine tail and spiritual torso of the cosmic dragon Ketu, the harbinger of Kaivalya (ultimate liberation).',
    vedastroPrinciple: 'Classical Jyotish analyzes Ketu as the laser-focused dissolution of material illusion. Cat’s Eye provides razor-sharp spiritual clarity and karmic immunity.'
  }
};

export const LAGNA_RECOMMENDATIONS: Record<number, LagnaGemstoneRecommendation> = {
  1: {
    lagnaId: 1,
    lagnaName: 'Aries (Mesha)',
    sanskritName: 'मेष लग्न',
    symbol: '♈',
    element: 'Fire',
    rulingPlanet: 'mars',
    lifeStone: {
      gemId: 'red_coral',
      gemName: 'Red Coral (Moonga)',
      planet: 'mars',
      houseRulership: '1st & 8th Lord',
      why: 'Mars is your Lagna lord (body, vitality, self-identity). Red Coral supercharges your immunity, life stamina, decisive leadership, and protective aura.',
      priority: 'Essential (Life Stone / Jeevan Ratna)'
    },
    luckyStone: {
      gemId: 'yellow_sapphire',
      gemName: 'Yellow Sapphire (Pukhraj)',
      planet: 'jupiter',
      houseRulership: '9th (Bhagya) & 12th Lord',
      why: 'Jupiter owns the 9th house of fortune, higher wisdom, and divine destiny. Wearing Pukhraj unlocks divine fortune, blessings from superiors, and spiritual grace.',
      priority: 'Highly Auspicious (Lucky Stone / Bhagya Ratna)'
    },
    punyaStone: {
      gemId: 'ruby',
      gemName: 'Ruby (Manikya)',
      planet: 'sun',
      houseRulership: '5th Lord (Purva Punya & Intellect)',
      why: 'Sun is the 5th lord of intellect, creativity, memory, and progeny. Ruby activates purva punya, intellectual brilliance, and executive authority.',
      priority: 'Intellect & Prosperity (Punya Ratna)'
    },
    strictlyAvoid: [
      { gemId: 'diamond', gemName: 'Diamond / White Sapphire', reason: 'Venus is a prime Maraka (2nd & 7th lord) for Aries Lagna.' },
      { gemId: 'emerald', gemName: 'Emerald (Panna)', reason: 'Mercury is 3rd and 6th lord of disease, debts, and disputes (Rog-Rin-Shatru).' },
      { gemId: 'blue_sapphire', gemName: 'Blue Sapphire (Neelam)', reason: 'Saturn owns 10th and 11th houses, representing friction and delay for Mars.' }
    ],
    dashaSpecificGems: [
      { gemId: 'pearl', condition: 'Wear Pearl during Moon Mahadasha if Moon is well-placed in Kendra/Trikona (4th lord of happiness and mother).' }
    ],
    overallGuidance: 'The divine trinity for Aries is Red Coral + Yellow Sapphire + Ruby. This harmonic triad creates the classical Solar-Mars-Jupiter energetic flow of victory.'
  },

  2: {
    lagnaId: 2,
    lagnaName: 'Taurus (Vrishabha)',
    sanskritName: 'वृषभ लग्न',
    symbol: '♉',
    element: 'Earth',
    rulingPlanet: 'venus',
    lifeStone: {
      gemId: 'diamond',
      gemName: 'Diamond / White Sapphire (Heera / Safed Pukhraj)',
      planet: 'venus',
      houseRulership: '1st & 6th Lord',
      why: 'Venus is your Lagna lord. Diamond magnifies magnetic charisma, artistic elegance, physical charm, luxury acquisition, and relationship harmony.',
      priority: 'Essential (Life Stone / Jeevan Ratna)'
    },
    luckyStone: {
      gemId: 'blue_sapphire',
      gemName: 'Blue Sapphire (Neelam)',
      planet: 'saturn',
      houseRulership: '9th (Bhagya) & 10th (Karma) Lord',
      why: 'Saturn is the Supreme Yogakaraka for Taurus, ruling both Kendra (10th) and Trikona (9th). Blue Sapphire unlocks massive career status, wealth, and destiny elevation.',
      priority: 'Highly Auspicious (Lucky Stone / Bhagya Ratna)'
    },
    punyaStone: {
      gemId: 'emerald',
      gemName: 'Emerald (Panna)',
      planet: 'mercury',
      houseRulership: '2nd (Dhana) & 5th (Vidya) Lord',
      why: 'Mercury controls wealth accumulation and intellect. Emerald boosts financial speech, commercial profits, academic genius, and investment fortune.',
      priority: 'Intellect & Prosperity (Punya Ratna)'
    },
    yogakarakaStone: {
      gemId: 'blue_sapphire',
      gemName: 'Blue Sapphire (Neelam)',
      planet: 'saturn',
      houseRulership: '9th & 10th Yogakaraka',
      why: 'Saturn simultaneously rules the Dharma and Karma houses, making Blue Sapphire your ultimate power catalyst.'
    },
    strictlyAvoid: [
      { gemId: 'ruby', gemName: 'Ruby (Manikya)', reason: 'Sun is 4th lord but an arch-enemy of Venus.' },
      { gemId: 'yellow_sapphire', gemName: 'Yellow Sapphire', reason: 'Jupiter is a major functional malefic (8th & 11th lord) for Taurus.' },
      { gemId: 'red_coral', gemName: 'Red Coral', reason: 'Mars is a dangerous Maraka (7th & 12th lord).' }
    ],
    dashaSpecificGems: [
      { gemId: 'hessonite', condition: 'Wear Hessonite during Rahu Dasha if Rahu is placed in Taurus, Gemini, Virgo, Capricorn, or Aquarius.' }
    ],
    overallGuidance: 'The Venusian triad is Diamond + Blue Sapphire + Emerald. These three gemstones resonate in perfect harmony to produce immense prosperity.'
  },

  3: {
    lagnaId: 3,
    lagnaName: 'Gemini (Mithuna)',
    sanskritName: 'मिथुन लग्न',
    symbol: '♊',
    element: 'Air',
    rulingPlanet: 'mercury',
    lifeStone: {
      gemId: 'emerald',
      gemName: 'Emerald (Panna)',
      planet: 'mercury',
      houseRulership: '1st & 4th Lord',
      why: 'Mercury is the Lagna lord. Emerald boosts cognitive agility, communicative genius, nervous vitality, commercial foresight, and family happiness.',
      priority: 'Essential (Life Stone / Jeevan Ratna)'
    },
    luckyStone: {
      gemId: 'blue_sapphire',
      gemName: 'Blue Sapphire (Neelam)',
      planet: 'saturn',
      houseRulership: '8th & 9th (Bhagya) Lord',
      why: 'Saturn owns the 9th house of fortune and dharma. Neelam dissolves long-standing obstacles and attracts unexpected fortune and international success.',
      priority: 'Highly Auspicious (Lucky Stone / Bhagya Ratna)'
    },
    punyaStone: {
      gemId: 'diamond',
      gemName: 'Diamond / White Sapphire',
      planet: 'venus',
      houseRulership: '5th (Trikona) & 12th Lord',
      why: 'Venus is the auspicious 5th lord of intellect, creativity, and love. Diamond brings creative breakthroughs, academic honors, and relationship bliss.',
      priority: 'Intellect & Prosperity (Punya Ratna)'
    },
    strictlyAvoid: [
      { gemId: 'red_coral', gemName: 'Red Coral', reason: 'Mars is an extreme malefic (6th & 11th lord) causing disputes, litigation, and accidents.' },
      { gemId: 'pearl', gemName: 'Natural Pearl', reason: 'Moon is the 2nd lord Maraka and inimical to Mercury.' },
      { gemId: 'yellow_sapphire', gemName: 'Yellow Sapphire', reason: 'Jupiter suffers from Kendradhipati Dosha (7th & 10th lord) and Maraka nature.' }
    ],
    dashaSpecificGems: [
      { gemId: 'hessonite', condition: 'Wear Hessonite during Rahu Mahadasha if Rahu is favorably placed in 3rd, 6th, 10th, or 11th houses.' }
    ],
    overallGuidance: 'Emerald is your quintessential life foundation. Pair with Diamond and Blue Sapphire for supreme analytical mastery and career elevation.'
  },

  4: {
    lagnaId: 4,
    lagnaName: 'Cancer (Karka)',
    sanskritName: 'कर्क लग्न',
    symbol: '♋',
    element: 'Water',
    rulingPlanet: 'moon',
    lifeStone: {
      gemId: 'pearl',
      gemName: 'Natural Pearl (Mukta / Moti)',
      planet: 'moon',
      houseRulership: '1st Lord',
      why: 'Moon is your Lagna lord. Natural Pearl restores emotional equilibrium, mental peace, intuitive insight, and radiant health.',
      priority: 'Essential (Life Stone / Jeevan Ratna)'
    },
    luckyStone: {
      gemId: 'yellow_sapphire',
      gemName: 'Yellow Sapphire (Pukhraj)',
      planet: 'jupiter',
      houseRulership: '6th & 9th (Bhagya) Lord',
      why: 'Jupiter owns the 9th house of divine grace and higher wisdom. Pukhraj attracts academic success, judicial favor, and spiritual illumination.',
      priority: 'Highly Auspicious (Lucky Stone / Bhagya Ratna)'
    },
    punyaStone: {
      gemId: 'red_coral',
      gemName: 'Red Coral (Moonga)',
      planet: 'mars',
      houseRulership: '5th (Trikona) & 10th (Kendra) Yogakaraka',
      why: 'Mars is the single most powerful Yogakaraka for Cancer. Red Coral unlocks commanding leadership, landed property, career supremacy, and courage.',
      priority: 'Intellect & Prosperity (Punya Ratna)'
    },
    yogakarakaStone: {
      gemId: 'red_coral',
      gemName: 'Red Coral (Moonga)',
      planet: 'mars',
      houseRulership: '5th & 10th Yogakaraka',
      why: 'Mars is the undisputed Yogakaraka for Cancer, connecting Purva Punya with supreme Karma.'
    },
    strictlyAvoid: [
      { gemId: 'diamond', gemName: 'Diamond / White Sapphire', reason: 'Venus is a functional malefic (4th & 11th lord) creating health and expenditure issues.' },
      { gemId: 'blue_sapphire', gemName: 'Blue Sapphire (Neelam)', reason: 'Saturn is 7th Maraka and 8th Dusthana lord.' },
      { gemId: 'emerald', gemName: 'Emerald (Panna)', reason: 'Mercury is 3rd and 12th lord of losses and distress.' }
    ],
    dashaSpecificGems: [
      { gemId: 'ruby', condition: 'Wear Ruby during Sun Mahadasha (Sun is 2nd lord of wealth and family).' }
    ],
    overallGuidance: 'The sacred Cancerian triad is Natural Pearl + Red Coral + Yellow Sapphire. Red Coral acts as your supreme career engine.'
  },

  5: {
    lagnaId: 5,
    lagnaName: 'Leo (Simha)',
    sanskritName: 'सिंह लग्न',
    symbol: '♌',
    element: 'Fire',
    rulingPlanet: 'sun',
    lifeStone: {
      gemId: 'ruby',
      gemName: 'Ruby (Manikya)',
      planet: 'sun',
      houseRulership: '1st Lord',
      why: 'Sun is the sovereign Lagna lord. Ruby bestows regal confidence, physical vitality, administrative prowess, willpower, and royal aura.',
      priority: 'Essential (Life Stone / Jeevan Ratna)'
    },
    luckyStone: {
      gemId: 'red_coral',
      gemName: 'Red Coral (Moonga)',
      planet: 'mars',
      houseRulership: '4th (Kendra) & 9th (Bhagya) Yogakaraka',
      why: 'Mars is the Supreme Yogakaraka for Leo. Red Coral unleashes immense fortune, real estate gains, commanding valor, and destiny breakthroughs.',
      priority: 'Highly Auspicious (Lucky Stone / Bhagya Ratna)'
    },
    punyaStone: {
      gemId: 'yellow_sapphire',
      gemName: 'Yellow Sapphire (Pukhraj)',
      planet: 'jupiter',
      houseRulership: '5th (Vidya) & 8th Lord',
      why: 'Jupiter owns the 5th house of intellect and Purva Punya. Pukhraj brings scholarly honors, blessed progeny, strategic wisdom, and spiritual depth.',
      priority: 'Intellect & Prosperity (Punya Ratna)'
    },
    yogakarakaStone: {
      gemId: 'red_coral',
      gemName: 'Red Coral (Moonga)',
      planet: 'mars',
      houseRulership: '4th & 9th Yogakaraka',
      why: 'Mars harmonizes the heart (4th) with divine luck (9th) for royal Leo.'
    },
    strictlyAvoid: [
      { gemId: 'blue_sapphire', gemName: 'Blue Sapphire (Neelam)', reason: 'Saturn is 6th (Rog/Rin) and 7th (Maraka) lord, natural arch-enemy of Sun.' },
      { gemId: 'diamond', gemName: 'Diamond', reason: 'Venus is 3rd and 10th lord, highly inimical to Sun.' },
      { gemId: 'hessonite', gemName: 'Hessonite Garnet', reason: 'Rahu eclipses the Sun and produces psychological turbulence for Leo.' }
    ],
    dashaSpecificGems: [
      { gemId: 'pearl', condition: 'Wear Pearl only during Moon Mahadasha if Moon is well-placed (12th lord).' }
    ],
    overallGuidance: 'Ruby + Red Coral + Yellow Sapphire forms the invulnerable royal armor for Leo natives.'
  },

  6: {
    lagnaId: 6,
    lagnaName: 'Virgo (Kanya)',
    sanskritName: 'कन्या लग्न',
    symbol: '♍',
    element: 'Earth',
    rulingPlanet: 'mercury',
    lifeStone: {
      gemId: 'emerald',
      gemName: 'Emerald (Panna)',
      planet: 'mercury',
      houseRulership: '1st & 10th Lord',
      why: 'Mercury is both Lagna and Karma lord. Emerald provides razor-sharp critical analysis, business mastery, professional authority, and nervous vitality.',
      priority: 'Essential (Life Stone / Jeevan Ratna)'
    },
    luckyStone: {
      gemId: 'diamond',
      gemName: 'Diamond / White Sapphire',
      planet: 'venus',
      houseRulership: '2nd (Dhana) & 9th (Bhagya) Lord',
      why: 'Venus is the auspicious 9th lord of fortune and 2nd lord of wealth. Diamond unlocks luxurious fortune, liquid wealth, and refined artistic success.',
      priority: 'Highly Auspicious (Lucky Stone / Bhagya Ratna)'
    },
    punyaStone: {
      gemId: 'blue_sapphire',
      gemName: 'Blue Sapphire (Neelam)',
      planet: 'saturn',
      houseRulership: '5th (Vidya) & 6th Lord',
      why: 'Saturn owns the 5th house of intellect and Purva Punya. Neelam grants disciplined focus, technical mastery, and victory over competitive examinations.',
      priority: 'Intellect & Prosperity (Punya Ratna)'
    },
    strictlyAvoid: [
      { gemId: 'red_coral', gemName: 'Red Coral', reason: 'Mars is a toxic Dusthana lord (3rd & 8th lord) causing accidents, chronic surgery, and disputes.' },
      { gemId: 'yellow_sapphire', gemName: 'Yellow Sapphire', reason: 'Jupiter suffers from Kendradhipati Dosha and Maraka traits (4th & 7th lord).' },
      { gemId: 'pearl', gemName: 'Natural Pearl', reason: 'Moon is the 11th lord of volatile fluctuations.' }
    ],
    dashaSpecificGems: [
      { gemId: 'hessonite', condition: 'Wear Hessonite during Rahu Dasha if placed in 3rd, 6th, 10th, or 11th houses.' }
    ],
    overallGuidance: 'Emerald and Diamond are your twin pillars of prosperity. Add Blue Sapphire for extraordinary strategic intelligence.'
  },

  7: {
    lagnaId: 7,
    lagnaName: 'Libra (Tula)',
    sanskritName: 'तुला लग्न',
    symbol: '♎',
    element: 'Air',
    rulingPlanet: 'venus',
    lifeStone: {
      gemId: 'diamond',
      gemName: 'Diamond / White Sapphire (Heera / Safed Pukhraj)',
      planet: 'venus',
      houseRulership: '1st & 8th Lord',
      why: 'Venus is your Lagna lord. Diamond magnifies magnetic beauty, diplomatic charisma, romantic fulfillment, and bodily vitality.',
      priority: 'Essential (Life Stone / Jeevan Ratna)'
    },
    luckyStone: {
      gemId: 'emerald',
      gemName: 'Emerald (Panna)',
      planet: 'mercury',
      houseRulership: '9th (Bhagya) & 12th Lord',
      why: 'Mercury owns the 9th house of fortune and dharma. Emerald attracts auspicious opportunities, commercial brilliance, and international travels.',
      priority: 'Highly Auspicious (Lucky Stone / Bhagya Ratna)'
    },
    punyaStone: {
      gemId: 'blue_sapphire',
      gemName: 'Blue Sapphire (Neelam)',
      planet: 'saturn',
      houseRulership: '4th (Kendra) & 5th (Trikona) Yogakaraka',
      why: 'Saturn is the Supreme Yogakaraka for Libra. Blue Sapphire unleashes massive real estate gains, profound intellectual prowess, and societal authority.',
      priority: 'Intellect & Prosperity (Punya Ratna)'
    },
    yogakarakaStone: {
      gemId: 'blue_sapphire',
      gemName: 'Blue Sapphire (Neelam)',
      planet: 'saturn',
      houseRulership: '4th & 5th Yogakaraka',
      why: 'Saturn unites the home/happiness with intellect/creativity as the undisputed Yogakaraka for Libra.'
    },
    strictlyAvoid: [
      { gemId: 'ruby', gemName: 'Ruby (Manikya)', reason: 'Sun is 11th lord, natural enemy of Venus, producing ego clashes.' },
      { gemId: 'yellow_sapphire', gemName: 'Yellow Sapphire', reason: 'Jupiter is a major functional malefic (3rd & 6th lord).' },
      { gemId: 'red_coral', gemName: 'Red Coral', reason: 'Mars is a direct Maraka (2nd & 7th lord).' }
    ],
    dashaSpecificGems: [
      { gemId: 'hessonite', condition: 'Wear Hessonite during Rahu Dasha if favorably placed.' }
    ],
    overallGuidance: 'Blue Sapphire is your ultimate life-changing gemstone as Yogakaraka, perfectly complemented by Diamond and Emerald.'
  },

  8: {
    lagnaId: 8,
    lagnaName: 'Scorpio (Vrishchika)',
    sanskritName: 'वृश्चिक लग्न',
    symbol: '♏',
    element: 'Water',
    rulingPlanet: 'mars',
    lifeStone: {
      gemId: 'red_coral',
      gemName: 'Red Coral (Moonga)',
      planet: 'mars',
      houseRulership: '1st & 6th Lord',
      why: 'Mars is your Lagna lord. Red Coral shields against hidden enemies, grants fearless determination, overcomes obstacles, and boosts physical stamina.',
      priority: 'Essential (Life Stone / Jeevan Ratna)'
    },
    luckyStone: {
      gemId: 'pearl',
      gemName: 'Natural Pearl (Mukta / Moti)',
      planet: 'moon',
      houseRulership: '9th (Bhagya) Lord',
      why: 'Moon is the auspicious 9th lord of fortune and divine blessings. Natural Pearl brings spiritual peace, luck in travel, and emotional healing.',
      priority: 'Highly Auspicious (Lucky Stone / Bhagya Ratna)'
    },
    punyaStone: {
      gemId: 'yellow_sapphire',
      gemName: 'Yellow Sapphire (Pukhraj)',
      planet: 'jupiter',
      houseRulership: '2nd (Dhana) & 5th (Vidya) Lord',
      why: 'Jupiter owns wealth accumulation and intellect. Yellow Sapphire attracts massive liquid wealth, wise speech, noble children, and spiritual foresight.',
      priority: 'Intellect & Prosperity (Punya Ratna)'
    },
    strictlyAvoid: [
      { gemId: 'diamond', gemName: 'Diamond / White Sapphire', reason: 'Venus is a severe Maraka and Dusthana lord (7th & 12th lord).' },
      { gemId: 'emerald', gemName: 'Emerald (Panna)', reason: 'Mercury is a toxic 8th and 11th lord causing financial blockages and nervous distress.' },
      { gemId: 'blue_sapphire', gemName: 'Blue Sapphire (Neelam)', reason: 'Saturn is 3rd and 4th lord, highly inimical to Mars.' }
    ],
    dashaSpecificGems: [
      { gemId: 'ruby', condition: 'Wear Ruby during Sun Mahadasha (Sun is 10th lord of career and fame).' },
      { gemId: 'cats_eye', condition: 'Wear Cat’s Eye during Ketu Dasha if Ketu is well-placed in trines/kendra.' }
    ],
    overallGuidance: 'The divine watery-fiery alliance of Red Coral + Yellow Sapphire + Pearl transforms Scorpio intensity into unstoppable spiritual and worldly triumph.'
  },

  9: {
    lagnaId: 9,
    lagnaName: 'Sagittarius (Dhanu)',
    sanskritName: 'धनु लग्न',
    symbol: '♐',
    element: 'Fire',
    rulingPlanet: 'jupiter',
    lifeStone: {
      gemId: 'yellow_sapphire',
      gemName: 'Yellow Sapphire (Pukhraj)',
      planet: 'jupiter',
      houseRulership: '1st & 4th Lord',
      why: 'Jupiter is your Lagna lord. Yellow Sapphire amplifies universal wisdom, physical vitality, philosophical authority, mental serenity, and domestic happiness.',
      priority: 'Essential (Life Stone / Jeevan Ratna)'
    },
    luckyStone: {
      gemId: 'ruby',
      gemName: 'Ruby (Manikya)',
      planet: 'sun',
      houseRulership: '9th (Bhagya) Lord',
      why: 'Sun is the 9th lord of fortune and divine dharma. Ruby opens royal doors, fosters leadership status, and guarantees unshakeable luck and fatherly blessings.',
      priority: 'Highly Auspicious (Lucky Stone / Bhagya Ratna)'
    },
    punyaStone: {
      gemId: 'red_coral',
      gemName: 'Red Coral (Moonga)',
      planet: 'mars',
      houseRulership: '5th (Vidya) & 12th Lord',
      why: 'Mars owns the 5th house of intellect and Purva Punya. Red Coral accelerates academic brilliance, competitive victory, and spiritual dynamism.',
      priority: 'Intellect & Prosperity (Punya Ratna)'
    },
    strictlyAvoid: [
      { gemId: 'diamond', gemName: 'Diamond / White Sapphire', reason: 'Venus is a severe functional malefic (6th & 11th lord) triggering debt and health issues.' },
      { gemId: 'emerald', gemName: 'Emerald (Panna)', reason: 'Mercury suffers from Kendradhipati Dosha and Maraka traits (7th & 10th lord).' },
      { gemId: 'blue_sapphire', gemName: 'Blue Sapphire (Neelam)', reason: 'Saturn is 2nd Maraka and 3rd lord of exertion.' }
    ],
    dashaSpecificGems: [
      { gemId: 'pearl', condition: 'Wear Pearl during Moon Mahadasha if Moon is well-placed (8th lord).' }
    ],
    overallGuidance: 'Yellow Sapphire + Ruby + Red Coral form the supreme Dharma-Karma shield for Sagittarius natives.'
  },

  10: {
    lagnaId: 10,
    lagnaName: 'Capricorn (Makara)',
    sanskritName: 'मकर लग्न',
    symbol: '♑',
    element: 'Earth',
    rulingPlanet: 'saturn',
    lifeStone: {
      gemId: 'blue_sapphire',
      gemName: 'Blue Sapphire (Neelam)',
      planet: 'saturn',
      houseRulership: '1st & 2nd Lord',
      why: 'Saturn is both Lagna and Dhana lord. Blue Sapphire provides rock-solid stamina, strategic patience, wealth consolidation, and social prestige.',
      priority: 'Essential (Life Stone / Jeevan Ratna)'
    },
    luckyStone: {
      gemId: 'emerald',
      gemName: 'Emerald (Panna)',
      planet: 'mercury',
      houseRulership: '6th & 9th (Bhagya) Lord',
      why: 'Mercury is the 9th lord of fortune. Emerald clears legal hurdles, boosts trade/IT profits, and brings unexpected strokes of luck.',
      priority: 'Highly Auspicious (Lucky Stone / Bhagya Ratna)'
    },
    punyaStone: {
      gemId: 'diamond',
      gemName: 'Diamond / White Sapphire',
      planet: 'venus',
      houseRulership: '5th (Trikona) & 10th (Kendra) Yogakaraka',
      why: 'Venus is the undisputed Supreme Yogakaraka for Capricorn. Diamond unleashes massive professional elevation, creative genius, luxury, and marital bliss.',
      priority: 'Intellect & Prosperity (Punya Ratna)'
    },
    yogakarakaStone: {
      gemId: 'diamond',
      gemName: 'Diamond / White Sapphire',
      planet: 'venus',
      houseRulership: '5th & 10th Yogakaraka',
      why: 'Venus unites intellect and career supremacy as the supreme Yogakaraka for Capricorn.'
    },
    strictlyAvoid: [
      { gemId: 'ruby', gemName: 'Ruby (Manikya)', reason: 'Sun is 8th lord of death/catastrophe, arch-enemy of Saturn.' },
      { gemId: 'yellow_sapphire', gemName: 'Yellow Sapphire', reason: 'Jupiter is a major functional malefic (3rd & 12th lord).' },
      { gemId: 'red_coral', gemName: 'Red Coral', reason: 'Mars is 4th and 11th lord, hostile to Saturn.' },
      { gemId: 'pearl', gemName: 'Natural Pearl', reason: 'Moon is the 7th lord Maraka.' }
    ],
    dashaSpecificGems: [
      { gemId: 'hessonite', condition: 'Wear Hessonite during Rahu Dasha if Rahu is well-placed.' }
    ],
    overallGuidance: 'Diamond is your most potent Yogakaraka gemstone, backed by Blue Sapphire and Emerald for enduring empire-building.'
  },

  11: {
    lagnaId: 11,
    lagnaName: 'Aquarius (Kumbha)',
    sanskritName: 'कुम्भ लग्न',
    symbol: '♒',
    element: 'Air',
    rulingPlanet: 'saturn',
    lifeStone: {
      gemId: 'blue_sapphire',
      gemName: 'Blue Sapphire (Neelam)',
      planet: 'saturn',
      houseRulership: '1st & 12th Lord',
      why: 'Saturn is your Lagna lord. Blue Sapphire grants visionary innovation, mental stamina, psychic protection, and immense professional authority.',
      priority: 'Essential (Life Stone / Jeevan Ratna)'
    },
    luckyStone: {
      gemId: 'diamond',
      gemName: 'Diamond / White Sapphire',
      planet: 'venus',
      houseRulership: '4th (Kendra) & 9th (Bhagya) Yogakaraka',
      why: 'Venus is the Supreme Yogakaraka for Aquarius. Diamond manifests immense real estate assets, domestic happiness, divine fortune, and luxury.',
      priority: 'Highly Auspicious (Lucky Stone / Bhagya Ratna)'
    },
    punyaStone: {
      gemId: 'emerald',
      gemName: 'Emerald (Panna)',
      planet: 'mercury',
      houseRulership: '5th (Vidya) & 8th Lord',
      why: 'Mercury owns the 5th house of intellect and research. Emerald brings analytical brilliance, lucrative investments, and occult knowledge.',
      priority: 'Intellect & Prosperity (Punya Ratna)'
    },
    yogakarakaStone: {
      gemId: 'diamond',
      gemName: 'Diamond / White Sapphire',
      planet: 'venus',
      houseRulership: '4th & 9th Yogakaraka',
      why: 'Venus unites happiness and divine fortune as the prime Yogakaraka for Aquarius.'
    },
    strictlyAvoid: [
      { gemId: 'ruby', gemName: 'Ruby (Manikya)', reason: 'Sun is 7th Maraka lord, natural enemy of Saturn.' },
      { gemId: 'pearl', gemName: 'Natural Pearl', reason: 'Moon is the 6th lord of disease and debts.' },
      { gemId: 'yellow_sapphire', gemName: 'Yellow Sapphire', reason: 'Jupiter is 2nd Maraka and 11th lord of fluctuation.' },
      { gemId: 'red_coral', gemName: 'Red Coral', reason: 'Mars is 3rd and 10th lord producing aggressive conflicts.' }
    ],
    dashaSpecificGems: [
      { gemId: 'hessonite', condition: 'Wear Hessonite during Rahu Dasha if Rahu is well-placed (co-ruler of Aquarius).' }
    ],
    overallGuidance: 'The airy triad of Blue Sapphire + Diamond + Emerald provides unmatched cosmic resonance for Aquarius visionaries.'
  },

  12: {
    lagnaId: 12,
    lagnaName: 'Pisces (Meena)',
    sanskritName: 'मीन लग्न',
    symbol: '♓',
    element: 'Water',
    rulingPlanet: 'jupiter',
    lifeStone: {
      gemId: 'yellow_sapphire',
      gemName: 'Yellow Sapphire (Pukhraj)',
      planet: 'jupiter',
      houseRulership: '1st & 10th Lord',
      why: 'Jupiter is both Lagna and Karma lord. Yellow Sapphire establishes profound spiritual wisdom, leadership authority, family prosperity, and radiant health.',
      priority: 'Essential (Life Stone / Jeevan Ratna)'
    },
    luckyStone: {
      gemId: 'red_coral',
      gemName: 'Red Coral (Moonga)',
      planet: 'mars',
      houseRulership: '2nd (Dhana) & 9th (Bhagya) Lord',
      why: 'Mars is the magnificent 9th lord of fortune and 2nd lord of wealth. Red Coral brings tremendous financial fortune, courage, and divine protection.',
      priority: 'Highly Auspicious (Lucky Stone / Bhagya Ratna)'
    },
    punyaStone: {
      gemId: 'pearl',
      gemName: 'Natural Pearl (Mukta / Moti)',
      planet: 'moon',
      houseRulership: '5th (Vidya) Lord',
      why: 'Moon is the 5th lord of intellect, creativity, and Purva Punya. Natural Pearl bestows poetic genius, emotional serenity, and noble children.',
      priority: 'Intellect & Prosperity (Punya Ratna)'
    },
    strictlyAvoid: [
      { gemId: 'diamond', gemName: 'Diamond / White Sapphire', reason: 'Venus is an extreme functional malefic (3rd & 8th lord) triggering longevity and health crises.' },
      { gemId: 'emerald', gemName: 'Emerald (Panna)', reason: 'Mercury suffers from Kendradhipati Dosha and Maraka traits (4th & 7th lord).' },
      { gemId: 'blue_sapphire', gemName: 'Blue Sapphire (Neelam)', reason: 'Saturn is 11th and 12th lord of expenditure and loss.' }
    ],
    dashaSpecificGems: [
      { gemId: 'ruby', condition: 'Wear Ruby during Sun Mahadasha if well-placed (6th lord).' },
      { gemId: 'cats_eye', condition: 'Wear Cat’s Eye during Ketu Dasha for spiritual illumination.' }
    ],
    overallGuidance: 'The divine spiritual trinity of Yellow Sapphire + Red Coral + Pearl guides Pisces natives to the pinnacle of dharma and prosperity.'
  }
};

export const LIFE_GOAL_PRESETS: LifeGoalRecommendation[] = [
  {
    id: 'career_leadership',
    title: 'Career, Executive Status & Leadership',
    subtitle: 'Authority, Promotions, Government Favors & Business Supremacy',
    iconName: 'Crown',
    primaryGemId: 'ruby',
    secondaryGemId: 'yellow_sapphire',
    bestLagnas: ['Aries', 'Leo', 'Sagittarius', 'Cancer', 'Scorpio'],
    cautions: 'Avoid Ruby if Taurus, Libra, Capricorn, or Aquarius Lagna (wear Diamond/Blue Sapphire instead).',
    description: 'Activates the Solar plexus and Jupiterian dharma circuits to command respect, executive promotion, administrative power, and unwavering confidence.'
  },
  {
    id: 'wealth_abundance',
    title: 'Financial Wealth & Liquid Abundance',
    subtitle: 'Business Profits, Commerce, Investments & Asset Consolidation',
    iconName: 'Coins',
    primaryGemId: 'emerald',
    secondaryGemId: 'diamond',
    bestLagnas: ['Taurus', 'Gemini', 'Virgo', 'Libra', 'Capricorn', 'Aquarius'],
    cautions: 'Avoid Emerald for Aries, Scorpio, or Cancer Lagnas. Use Yellow Sapphire / Red Coral for those signs.',
    description: 'Empowers Mercurial commerce and Venusian luxury magnetism to multiply liquid cash flow, commercial transactions, and profitable investments.'
  },
  {
    id: 'mental_peace',
    title: 'Mental Peace, Anti-Stress & Emotional Harmony',
    subtitle: 'Overcoming Anxiety, Insomnia, Overthinking & Nervous Tension',
    iconName: 'Heart',
    primaryGemId: 'pearl',
    secondaryGemId: 'emerald',
    bestLagnas: ['Cancer', 'Scorpio', 'Pisces', 'Aries', 'Gemini'],
    cautions: 'Do not wear Pearl with Diamond or Hessonite simultaneously.',
    description: 'Soothes the lunar subconscious (Manas) and balances neurotransmitter stability for profound emotional calm, restorative sleep, and intuitive clarity.'
  },
  {
    id: 'protection_enemies',
    title: 'Protection from Evil Eye, Courts & Obstacles',
    subtitle: 'Fearless Courage, Legal Victory, Debts & Physical Vitality',
    iconName: 'Shield',
    primaryGemId: 'red_coral',
    secondaryGemId: 'blue_sapphire',
    bestLagnas: ['Aries', 'Scorpio', 'Leo', 'Cancer', 'Pisces'],
    cautions: 'Test Blue Sapphire for 3 days before wearing. Do not mix Red Coral with Emerald or Diamond.',
    description: 'Forges an invulnerable energetic armor against secret competitors, litigation, sudden injuries, fatigue, and psychic hostility.'
  },
  {
    id: 'marriage_love',
    title: 'Marriage, Love & Relationship Harmony',
    subtitle: 'Finding Soulmate, Marital Bliss, Romantic Charisma & Progeny',
    iconName: 'Sparkles',
    primaryGemId: 'yellow_sapphire',
    secondaryGemId: 'diamond',
    bestLagnas: ['Cancer', 'Leo', 'Sagittarius', 'Pisces', 'Taurus', 'Libra'],
    cautions: 'Never wear Yellow Sapphire and Diamond on the same hand simultaneously.',
    description: 'For women, Yellow Sapphire activates the Pati-Karaka (husband/blessed union). For men, Diamond/White Sapphire stimulates the Shukra romantic field.'
  },
  {
    id: 'spiritual_moksha',
    title: 'Spiritual Awakening, Meditation & Occult Mastery',
    subtitle: 'Astrology, Kundalini, Intuition & Dissolution of Karmic Debt',
    iconName: 'Compass',
    primaryGemId: 'cats_eye',
    secondaryGemId: 'yellow_sapphire',
    bestLagnas: ['Scorpio', 'Pisces', 'Cancer', 'Sagittarius', 'Aries'],
    cautions: 'Cat’s Eye is high-intensity; consult an astrologer during Ketu Mahadasha.',
    description: 'Laser-focuses the spiritual third eye, dissolves material delusions, shields the aura during meditation, and rapidly clears ancestral debts.'
  }
];

export interface CompatibilityResult {
  gem1: GemstoneInfo;
  gem2: GemstoneInfo;
  status: 'Harmonious (Mitra / Highly Compatible)' | 'Neutral / Conditional' | 'Inimical / Dangerous (Shatru / Conflict)';
  statusColor: string;
  badgeBg: string;
  explanation: string;
}

export function checkGemstoneCompatibility(gemId1: string, gemId2: string): CompatibilityResult {
  const g1 = NAVARATNA_DATA[gemId1];
  const g2 = NAVARATNA_DATA[gemId2];

  if (!g1 || !g2) {
    throw new Error('Invalid gemstone id');
  }

  if (gemId1 === gemId2) {
    return {
      gem1: g1,
      gem2: g2,
      status: 'Harmonious (Mitra / Highly Compatible)',
      statusColor: 'text-emerald-800',
      badgeBg: 'bg-emerald-100 border-emerald-300 text-emerald-900',
      explanation: `Identical gemstone resonance. Enhances the pure vibratory field of ${g1.planetName}.`
    };
  }

  // Check direct incompatibilities
  if (g1.incompatibleGems.includes(gemId2) || g2.incompatibleGems.includes(gemId1)) {
    return {
      gem1: g1,
      gem2: g2,
      status: 'Inimical / Dangerous (Shatru / Conflict)',
      statusColor: 'text-red-700',
      badgeBg: 'bg-red-100 border-red-300 text-red-900',
      explanation: `⚠️ SEVERE CONFLICT: ${g1.name} (${g1.planetName}) and ${g2.name} (${g2.planetName}) are classical planetary adversaries in Vedic astrology (Deva vs Danava grahas). Wearing them together causes intense energetic friction, psychological restlessness, and conflicting life circumstances.`
    };
  }

  // Check direct compatibilities
  if (g1.compatibleGems.includes(gemId2) || g2.compatibleGems.includes(gemId1)) {
    return {
      gem1: g1,
      gem2: g2,
      status: 'Harmonious (Mitra / Highly Compatible)',
      statusColor: 'text-emerald-800',
      badgeBg: 'bg-emerald-100 border-emerald-300 text-emerald-900',
      explanation: `✨ EXCELLENT SYNERGY: ${g1.name} and ${g2.name} belong to friendly planetary camps. Their combined frequencies amplify auspicious Trikona and Kendra energies without conflicting side-effects.`
    };
  }

  return {
    gem1: g1,
    gem2: g2,
    status: 'Neutral / Conditional',
    statusColor: 'text-amber-800',
    badgeBg: 'bg-amber-100 border-amber-300 text-amber-900',
    explanation: `⚖️ NEUTRAL / CONDITIONAL: ${g1.name} and ${g2.name} do not have innate planetary enmity, but wearing them together should only be done if both planets are functional benefics for your specific Ascendant (Lagna) and active Mahadasha.`
  };
}
