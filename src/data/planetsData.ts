import { PlanetId, PlanetInfo } from '../types/astrology';

export const PLANETS_DATA: Record<PlanetId, PlanetInfo> = {
  sun: {
    id: 'sun',
    name: 'Sun',
    sanskritName: 'Surya',
    devanagari: 'सूर्य',
    nature: 'Natural Malefic', // Cruel/Kroora in Vedic, Soul significator (Atmakaraka)
    element: 'Fire',
    gender: 'Masculine',
    rulingSigns: ['Leo (Simha)'],
    exaltation: 'Aries 10° (Mesha)',
    debilitation: 'Libra 10° (Tula)',
    dayOfWeek: 'Sunday (Ravivar)',
    gemstone: 'Ruby (Manikya)',
    metal: 'Gold / Copper',
    color: 'Saffron / Deep Red / Gold',
    beejMantra: 'ॐ ह्रां ह्रीं ह्रौं सः सूर्याय नमः',
    beejMantraTransliteration: 'Om Hraam Hreem Hroum Sah Suryaya Namah',
    avatar: '☀️',
    centralDescription: 'King of planets, Soul (Atman), Ego, Father, Government, Vitality & Royal Authority.',
    note: 'Results may vary as per other planets, signs & aspects in the Kundli. A well-placed Sun gives royal aura, high administrative authority, and robust health.',
    effects: {
      1: {
        house: 1,
        bulletPoints: [
          'Strong personality & royal presence',
          'Leadership qualities & natural authority',
          'High confidence & dignified demeanor',
          'Good respect & social admiration',
          'High self-esteem & bold willpower'
        ],
        summary: 'Sun in 1st house creates an imposing, charismatic leader with high vitality, self-worth, and natural authority.',
        strengths: ['Commanding speech', 'Robust immune resilience', 'Courageous drive'],
        cautions: ['Tendency toward stubbornness or ego friction', 'Excess body heat or thinning hair'],
        remedy: 'Offer water (Arghya) to the rising Sun daily in a copper vessel with red sandalwood powder.'
      },
      2: {
        house: 2,
        bulletPoints: [
          'Good wealth & financial respect',
          'Family respect & ancestral prestige',
          'Strong & authoritative speech',
          'Good vision & radiant face',
          'Fixed food habits & lineage pride',
          'Attachment to family heritage'
        ],
        summary: 'Sun in 2nd house grants ancestral dignity, financial strength, and an influential voice in family and business matters.',
        strengths: ['Accumulation of heritage assets', 'Persuasive speaking tone', 'Financial honesty'],
        cautions: ['Harsh or blunt verbal tone when angry', 'Occasional domestic dominance'],
        remedy: 'Avoid harsh words during morning meals; respect your father and donate wheat on Sundays.'
      },
      3: {
        house: 3,
        bulletPoints: [
          'Courageous & heroic spirit',
          'Good in self-driven efforts',
          'Relations with younger siblings with leadership',
          'Frequent short travels & productive networking',
          'Immense self confidence & daring initiative'
        ],
        summary: 'Sun in 3rd house bestows fearless courage, relentless initiative, strong athletic stamina, and success through self-effort.',
        strengths: ['Daring risk taker', 'Great in marketing/media/athletics', 'Unshakeable willpower'],
        cautions: ['Dominating younger siblings', 'Impatience with slow progress'],
        remedy: 'Support and encourage younger siblings; practice Surya Namaskar at dawn.'
      },
      4: {
        house: 4,
        bulletPoints: [
          'Peace in mother\'s side & family pride',
          'Property, lands & regal vehicles',
          'Good formal education & prestige',
          'Mental peace & strong domestic roots',
          'Popularity in domestic & hometown life'
        ],
        summary: 'Sun in 4th house provides noble residences, respect in one\'s native land, government quarter benefits, and deep ancestral honor.',
        strengths: ['Large property holdings', 'Respected civic stature', 'High maternal honor'],
        cautions: ['Ego clashes at home', 'Need for emotional softness with family'],
        remedy: 'Touch mother\'s feet for blessings; keep a silver coin given by your mother.'
      },
      5: {
        house: 5,
        bulletPoints: [
          'Intelligent & sharp strategic mind',
          'Good for children\'s rise & prestige',
          'Success in education & scholarship',
          'Fame, name & creative brilliance',
          'Spiritual thinking & mantra mastery'
        ],
        summary: 'Sun in 5th house confers brilliant intellect, royal advisory talents, creative mastery, mantra siddhi, and accomplished progeny.',
        strengths: ['Quick intuitive wisdom', 'High scholastic achievements', 'Philosophical depth'],
        cautions: ['Over-competitiveness in romance', 'High expectations from children'],
        remedy: 'Chant Gayatri Mantra 108 times daily; feed jaggery to cows on Sundays.'
      },
      6: {
        house: 6,
        bulletPoints: [
          'Victory over enemies & legal rivals',
          'Good for health & supreme stamina',
          'Service minded with executive efficiency',
          'Hardworking & resilient nature',
          'Overcomes obstacles effortlessly'
        ],
        summary: 'Sun in 6th house is an invincible placement for crushing competitors, winning lawsuits, thriving in civil services, and robust immunity.',
        strengths: ['Shatru Hanta (enemy destroyer)', 'Immense administrative competence', 'Excellent immune defense'],
        cautions: ['Watch out for high blood pressure or inflammatory issues', 'Overworking subordinates'],
        remedy: 'Recite Aditya Hridaya Stotram; maintain disciplined daily physical fitness.'
      },
      7: {
        house: 7,
        bulletPoints: [
          'Dominant presence in married life',
          'Potential ego clashes if unchecked',
          'Attracts powerful & dignified partners',
          'Business success in trade & diplomacy',
          'Public recognition & reputable alliances'
        ],
        summary: 'Sun in 7th house brings a partner of high standing and societal status, while requiring conscious humility to maintain marital warmth.',
        strengths: ['High-status business alliances', 'Public prominence', 'Firm negotiation skills'],
        cautions: ['Guard against partner ego clashes', 'Avoid imposing unilateral decisions in marriage'],
        remedy: 'Drink water from a brass glass; honor partner\'s perspective with mutual respect.'
      },
      8: {
        house: 8,
        bulletPoints: [
          'Sudden transformative changes',
          'Overcoming hidden fears & shadows',
          'Deep research mind & occult interest',
          'Longevity (if strong / well-aspected)',
          'Ups & downs leading to great wisdom'
        ],
        summary: 'Sun in 8th house unlocks investigative brilliance, mystical depth, mastery in esoteric science, and profound spiritual renewal.',
        strengths: ['Exceptional diagnostic acumen', 'Resilient rebound power', 'Occult insights'],
        cautions: ['Watch for eye strains and bone density', 'Handle tax/inheritance matters transparently'],
        remedy: 'Recite Maha Mrityunjaya Mantra; donate red clothes to underprivileged elders.'
      },
      9: {
        house: 9,
        bulletPoints: [
          'Supreme luck & divine fortune (Bhagya)',
          'Respect from father & noble ancestry',
          'Religious & principled nature',
          'Success in higher education & law',
          'Beneficial long distance & pilgrimage travel'
        ],
        summary: 'Sun in 9th house is an exceptionally auspicious placement bringing fatherly blessings, divine luck, spiritual righteousness, and international acclaim.',
        strengths: ['Unfailing providential guidance', 'High ethical moral code', 'Academic distinction'],
        cautions: ['Dogmatic ideological stance', 'Must avoid arrogance in philosophical debates'],
        remedy: 'Perform Guru Vandana; visit ancient sun temples and respect teachers.'
      },
      10: {
        house: 10,
        bulletPoints: [
          'High career apex & zenith status',
          'Top-tier leadership & administrative power',
          'Government support, contracts & state honors',
          'Fame & prestige in chosen profession',
          'Ambitious, tireless & commanding nature'
        ],
        summary: 'Sun gains maximum directional strength (Digbala) in the 10th house, creating top civil officers, CEOs, politicians, and distinguished leaders.',
        strengths: ['Peak executive prowess', 'Unrivaled career growth', 'Honor from governing bodies'],
        cautions: ['Workaholism', 'Tendency to neglect domestic personal life'],
        remedy: 'Keep a copper Sun symbol on your office desk; always maintain punctual work ethics.'
      },
      11: {
        house: 11,
        bulletPoints: [
          'Massive gains & financial profits',
          'Fulfillment of long-term desires & dreams',
          'Strong social circle with dignitaries',
          'Elder siblings support & mutual growth',
          'Continuous financial growth & assets'
        ],
        summary: 'Sun in 11th house creates influential political/industrial networks, multiple income channels, and effortless realization of grand ambitions.',
        strengths: ['High-level networking', 'Steady asset expansion', 'Influential mentorship'],
        cautions: ['Selecting loyal friends over flatterers', 'Balancing personal gains with group equity'],
        remedy: 'Donate to charitable student funds; feed jaggery and wheat to birds on Sundays.'
      },
      12: {
        house: 12,
        bulletPoints: [
          'High expenditures on noble causes',
          'Foreign connections & overseas career',
          'Deep spiritual growth & meditation solace',
          'Moksha seeker & solitary introspections',
          'Loss of fame (if Sun is weak or afflicted)'
        ],
        summary: 'Sun in 12th house fosters success in foreign lands, hospitals, international embassies, research laboratories, and sublime spiritual liberation.',
        strengths: ['International career avenues', 'Deep mystical solitude', 'Philanthropic generosity'],
        cautions: ['Unplanned financial outflows', 'Sleep disturbances or eye sensitivities'],
        remedy: 'Practice morning meditation in natural sunlight; donate copper to spiritual institutions.'
      }
    }
  },
  moon: {
    id: 'moon',
    name: 'Moon',
    sanskritName: 'Chandra',
    devanagari: 'चन्द्र',
    nature: 'Natural Benefic', // (Benefic when waxing/Paksha Bala, neutral when waning)
    element: 'Water',
    gender: 'Feminine',
    rulingSigns: ['Cancer (Karka)'],
    exaltation: 'Taurus 3° (Vrishabha)',
    debilitation: 'Scorpio 3° (Vrishchika)',
    dayOfWeek: 'Monday (Somavar)',
    gemstone: 'Natural Pearl (Moti)',
    metal: 'Silver',
    color: 'Milky White / Silver / Cream',
    beejMantra: 'ॐ श्रां श्रीं श्रौं सः चन्द्रमसे नमः',
    beejMantraTransliteration: 'Om Shraam Shreem Shroum Sah Chandramase Namah',
    avatar: '🌙',
    centralDescription: 'Queen of planets, Mind (Manas), Emotions, Mother, Liquid Assets, Public Popularity & Intuition.',
    note: 'Results may vary as per other planets, signs & aspects in the Kundli. A strong waxing Moon bestows radiant mental clarity, emotional peace, and immense popularity.',
    effects: {
      1: {
        house: 1,
        bulletPoints: [
          'Emotional & sensitive nature',
          'Attractive, glowing & charming personality',
          'Vivid imagination & high artistic creativity',
          'Caring, empathetic & helpful attitude',
          'Magnetic charm with the public'
        ],
        summary: 'Moon in 1st house creates an extraordinarily charming, compassionate, and intuitive person with a luminous presence and receptive mind.',
        strengths: ['Instant empathy', 'Creative and artistic aesthetic', 'Youthful facial glow'],
        cautions: ['Mood swings aligned with lunar phases', 'Over-sensitivity to criticism'],
        remedy: 'Wear silver; drink water from a silver cup; seek blessings from your mother daily.'
      },
      2: {
        house: 2,
        bulletPoints: [
          'Harmonious & loving family life',
          'Sweet, soothing & magnetic speech',
          'Strong emotional attachment to family',
          'Financial gains through creative & mental skills',
          'Fondness for delicious, nurturing cuisine'
        ],
        summary: 'Moon in 2nd house blesses one with melodic speech, rich family heritage, emotional eloquence, and continuous financial influx.',
        strengths: ['Melodious vocal tone', 'Natural financial intelligence', 'Family peace-maker'],
        cautions: ['Impulsive spending on family luxuries', 'Dietary overindulgence in sweets'],
        remedy: 'Donate milk and rice on Mondays to the needy; respect women in the family.'
      },
      3: {
        house: 3,
        bulletPoints: [
          'Courage infused with emotional strength',
          'Warm & affectionate bond with siblings',
          'Short travels & excursions prove beneficial',
          'Creative, poetic & versatile thinking',
          'Gifted hand dexterity & fine art skills'
        ],
        summary: 'Moon in 3rd house sparks imaginative writing, artistic flair, cordial sibling relationships, and profitable short-distance communications.',
        strengths: ['Expressive writing talent', 'Charming social rapport', 'Adaptable initiative'],
        cautions: ['Restlessness in consistency', 'Fluctuating confidence'],
        remedy: 'Support younger sisters; maintain a daily creative journal or poetry notebook.'
      },
      4: {
        house: 4,
        bulletPoints: [
          'Immense happiness from mother & home',
          'Luxurious properties & comfortable vehicles',
          'Profound peace of mind & emotional serenity',
          'Good education, comforts & hospitality',
          'High domestic contentment & popularity'
        ],
        summary: 'Moon in 4th house enjoys Digbala (directional strength), providing deep inner bliss, loving motherly support, luxurious homes, and scenic waterside properties.',
        strengths: ['Emotional stability and groundedness', 'Loving home atmosphere', 'Popularity among community'],
        cautions: ['Fear of leaving home comfort zone', 'Overly protective sentimentality'],
        remedy: 'Keep a clean water fountain at home; serve sweet milk to your mother.'
      },
      5: {
        house: 5,
        bulletPoints: [
          'High intelligence & exceptionally sharp memory',
          'Loving & rewarding relationship with children',
          'Success in education, literature & arts',
          'Romantic, affectionate & poetic nature',
          'Intuitive hunch in investments'
        ],
        summary: 'Moon in 5th house confers refined creative intellect, romantic elegance, joyful parenting, and past life merits manifesting as spontaneous good luck.',
        strengths: ['Photographic emotional memory', 'Fine arts mastery', 'Kind parenting nature'],
        cautions: ['Over-idealizing romance', 'Emotional decision making in trading'],
        remedy: 'Chant Shiva Panchakshari Mantra (Om Namah Shivaya); feed white sweets to young girls.'
      },
      6: {
        house: 6,
        bulletPoints: [
          'Diplomatic ability to dissolve problems',
          'Victory over enemies through emotional tact',
          'Excellence in nursing, medicine & service jobs',
          'Watch out for stress & overthinking loops',
          'Sensitivity to digestive water balance'
        ],
        summary: 'Moon in 6th house shines in healthcare, hospitality, social advocacy, and dispute resolution, though mental calm requires daily grounding.',
        strengths: ['Healing empathy for the sick', 'Service-driven work ethics', 'Tactful conflict mediator'],
        cautions: ['Anxiety spirals and digestive sensitivity', 'Taking on others\' emotional baggage'],
        remedy: 'Avoid late-night overthinking; practice Pranayama; avoid drinking milk at bedtime.'
      },
      7: {
        house: 7,
        bulletPoints: [
          'Loving, caring & emotionally attuned partner',
          'Auspicious for marriage & lifelong companionship',
          'Public dealings, PR & hospitality bring success',
          'Pleasurable travels & romantic journeys with spouse',
          'Gentle diplomacy in business partnerships'
        ],
        summary: 'Moon in 7th house brings an attractive, empathetic spouse and remarkable popularity in customer relations, commerce, and public life.',
        strengths: ['Public magnetism and likability', 'Deep marital bonding', 'Graceful diplomatic charm'],
        cautions: ['Fluctuations in partner\'s moods', 'Co-dependency in relationships'],
        remedy: 'Perform joint prayers with spouse on Full Moon (Purnima) nights; donate white clothes.'
      },
      8: {
        house: 8,
        bulletPoints: [
          'Emotional depth, intensity & transformative rebirth',
          'Deep interest in occult, astrology & mysteries',
          'Sudden life transitions awakening intuition',
          'Need for mental peace, meditation & stillness',
          'Gains through ancestral legacies & partner'
        ],
        summary: 'Moon in 8th house gifts profound clairvoyance, psychic sensitivity, interest in astrology, and transformative psychological rebirth.',
        strengths: ['Powerful psychic intuition', 'Empathy for trauma survivors', 'Deep research ability'],
        cautions: ['Phobias or dark night of the soul moments', 'Water safety awareness'],
        remedy: 'Fast or perform meditation on Mondays; chant Om Namah Shivaya 108 times daily.'
      },
      9: {
        house: 9,
        bulletPoints: [
          'Exceptional good fortune & spiritual mindset',
          'Strong, blessed bond with mother & elders',
          'Long distance travel & ocean voyages beneficial',
          'Devotion to sacred wisdom & pilgrimage',
          'Philosophical writing & public teaching'
        ],
        summary: 'Moon in 9th house brings divine grace, motherly blessings, higher philosophical pursuits, scenic travels, and high moral stature.',
        strengths: ['Effortless spiritual devotion', 'Cultured worldliness', 'Respect from teachers'],
        cautions: ['Restless desire for constant wanderlust', 'Overly emotional philosophical views'],
        remedy: 'Offer water to Peepal tree without touching; visit sacred water bodies and shrines.'
      },
      10: {
        house: 10,
        bulletPoints: [
          'Career success fueled by massive public support',
          'Widespread good reputation & public admiration',
          'Excellence in hospitality, public administration, liquids',
          'Visible leadership with emotional touch',
          'Fluctuating but popular career milestones'
        ],
        summary: 'Moon in 10th house guarantees public prominence, successful business in food/liquids/hospitality/care, and broad societal recognition.',
        strengths: ['Public relatability', 'Versatile administrative flair', 'Respected civic presence'],
        cautions: ['Frequent shifts in career ambitions', 'Publicizing personal emotions'],
        remedy: 'Maintain a silver square piece in your wallet; respect senior female executives.'
      },
      11: {
        house: 11,
        bulletPoints: [
          'Abundant circle of caring & helpful friends',
          'Rapid fulfillment of heartfelt desires & goals',
          'Consistent and growing flow of income',
          'Support from influential female mentors',
          'Social gatherings bring immense happiness'
        ],
        summary: 'Moon in 11th house creates wide social popularity, multiple liquid income channels, supportive elder siblings, and joy through friendships.',
        strengths: ['Networking charisma', 'Steady financial inflow', 'Supportive friend circle'],
        cautions: ['Over-spending on entertainment', 'Gullibility with fair-weather friends'],
        remedy: 'Feed sweet milk/rice kheer to young underprivileged children on Purnima.'
      },
      12: {
        house: 12,
        bulletPoints: [
          'Expenditures on comfortable travels & charities',
          'Strong connections with overseas & foreign lands',
          'Deeply spiritual & introspective nature',
          'Need quiet time alone for mental rejuvenation',
          'Vivid, prophetic dreams & astral intuition'
        ],
        summary: 'Moon in 12th house fosters success in foreign countries, mastery over meditation, creative solitude, and deep spiritual liberation.',
        strengths: ['Rich dream life and subconscious insights', 'Spiritual altruism', 'Success abroad'],
        cautions: ['Restless sleep or insomnia', 'Solitude turning into escapism'],
        remedy: 'Place a silver vessel with water near bedside and pour it into plants in the morning.'
      }
    }
  },
  mars: {
    id: 'mars',
    name: 'Mars',
    sanskritName: 'Mangal',
    devanagari: 'मंगल / भौम',
    nature: 'Natural Malefic',
    element: 'Fire',
    gender: 'Masculine',
    rulingSigns: ['Aries (Mesha)', 'Scorpio (Vrishchika)'],
    exaltation: 'Capricorn 28° (Makara)',
    debilitation: 'Cancer 28° (Karka)',
    dayOfWeek: 'Tuesday (Mangalvar)',
    gemstone: 'Red Coral (Moonga)',
    metal: 'Copper / Brass',
    color: 'Blood Red / Coral / Scarlet',
    beejMantra: 'ॐ क्रां क्रीं क्रौं सः भौमाय नमः',
    beejMantraTransliteration: 'Om Kraam Kreem Kroum Sah Bhaumaya Namah',
    avatar: '⚔️',
    centralDescription: 'Commander-in-Chief of planets, Energy, Courage, Real Estate, Brothers, Blood & Tactical Defense.',
    note: 'Results may vary as per other planets, signs & aspects in the Kundli. A dignified Mars creates fearless leaders, top surgeons, engineering geniuses, and real estate moguls.',
    effects: {
      1: {
        house: 1,
        bulletPoints: [
          'Strong courage, physical stamina & dynamic drive',
          'Natural leadership qualities & warrior mindset',
          'Highly competitive & athletic disposition',
          'Healthy, active & muscular physical build',
          'At times impulsive, impatient & quick to anger'
        ],
        summary: 'Mars in 1st house (Ruchaka Yoga if in Aries/Scorpio/Capricorn) creates a fearless trailblazer with immense physical vitality and pioneering courage.',
        strengths: ['Unyielding perseverance', 'High physical endurance', 'Quick crisis leadership'],
        cautions: ['Prone to rash temperament, scars or head cuts', 'Impulsive impatience'],
        remedy: 'Recite Hanuman Chalisa daily; avoid rash driving; wear copper or red thread.'
      },
      2: {
        house: 2,
        bulletPoints: [
          'Sharp, bold & persuasive speech',
          'High sense of family responsibility & protection',
          'Strong financial efforts & industrious drive',
          'Wealth accumulated through hard, self-made work',
          'May face family arguments if speech is too fiery'
        ],
        summary: 'Mars in 2nd house generates massive wealth through aggressive entrepreneurship, though family harmony requires soft speech.',
        strengths: ['Fierce wealth protector', 'Decisive financial moves', 'Self-made success'],
        cautions: ['Blunt speech causing family misunderstandings', 'Dental or oral heat issues'],
        remedy: 'Eat a pinch of jaggery and drink water before initiating important talks.'
      },
      3: {
        house: 3,
        bulletPoints: [
          'Exceptionally courageous & heroic mindset',
          'Unbreakable willpower & daring initiatives',
          'Protective towards siblings & comrades',
          'Tremendous success in sports, defense, police, engineering',
          'Productive short travels & bold communications'
        ],
        summary: 'Mars is in its happiest Upachaya house in the 3rd, producing legendary valor, athletic champions, mechanical genius, and unbeatable stamina.',
        strengths: ['Fearless warrior spirit', 'Technical and manual mastery', 'Natural commander'],
        cautions: ['Occasional rivalry with peers', 'Over-aggressive driving or haste'],
        remedy: 'Help and support brothers; donate blood voluntarily to save lives.'
      },
      4: {
        house: 4,
        bulletPoints: [
          'Great acquisition of lands, property & vehicles',
          'Deep protective love for mother & heritage',
          'Vibrant activity at home & construction assets',
          'Restlessness regarding domestic peace or mother\'s health',
          'Requires disciplined channeling of home energies'
        ],
        summary: 'Mars in 4th house yields vast real estate holdings, construction businesses, and strong vehicles, while domestic peace requires patience.',
        strengths: ['Real estate expansion', 'Protective home guardian', 'Engineering aptitude'],
        cautions: ['Domestic discord (Kuja Dosha factor)', 'Mother\'s inflammatory health issues'],
        remedy: 'Keep silver items at home; plant sweet flowering shrubs; respect maternal elders.'
      },
      5: {
        house: 5,
        bulletPoints: [
          'Sharp, tactical & analytical intelligence',
          'High competitive drive in studies & examinations',
          'Passionate creativity, sports strategy & design',
          'May face fiery discussions or impatience with children',
          'Dynamic speculative acumen when dignified'
        ],
        summary: 'Mars in 5th house fuels a razor-sharp analytical intellect, excellence in mathematics/coding/engineering, and fierce competitive excellence.',
        strengths: ['Strategic battlefield intellect', 'Sportsmanship', 'Dynamic creativity'],
        cautions: ['Stomach acid/heat', 'Impatience with offspring'],
        remedy: 'Offer red vermilion (Sindoor) to Lord Hanuman on Tuesdays; practice cooling Pranayama.'
      },
      6: {
        house: 6,
        bulletPoints: [
          'Absolute victory over enemies & competitors',
          'Fierce, unyielding fighter in litigation & challenges',
          'Robust immunity & rapid physical recuperation',
          'Unmatched ability to conquer complex obstacles',
          'Watch out for sports injuries, cuts or overexertion'
        ],
        summary: 'Mars in 6th house is an unconquerable placement (Shatru Hanta), making one unbeatable in corporate battles, sports, police, and medicine.',
        strengths: ['Crushes all rivalries', 'Supreme stamina under pressure', 'High pain tolerance'],
        cautions: ['Prone to accidental cuts, burns or inflammatory fevers'],
        remedy: 'Feed monkeys or dogs on Tuesdays; recite Hanuman Ashtak regularly.'
      },
      7: {
        house: 7,
        bulletPoints: [
          'Passionate & intense dynamic in relationships',
          'Attraction towards strong, ambitious & athletic partners',
          'Success in independent business, trade & partnerships',
          'Requires conscious anger management to avoid marital friction',
          'Strong public drive and commercial tenacity'
        ],
        summary: 'Mars in 7th house (Manglik factor) brings high marital energy and a driven partner; maturity and calm communication foster great harmony.',
        strengths: ['Dynamic business negotiation', 'Passionate loyalty', 'Drive for mutual success'],
        cautions: ['Ego friction in marriage', 'Impulsive contract signings'],
        remedy: 'Maintain patience in disagreements; offer sweet jaggery roti to cows on Tuesdays.'
      },
      8: {
        house: 8,
        bulletPoints: [
          'Sudden transformational breakthroughs in life',
          'Deep research mindset & interest in occult sciences',
          'Concealed inner fire & intense determination',
          'Gains through insurance, settlements & partner\'s efforts',
          'Must take care with driving & inflammatory wellness'
        ],
        summary: 'Mars in 8th house gives exceptional emergency resilience, deep surgical/investigative abilities, and alchemical life transformations.',
        strengths: ['Crisis management mastery', 'Deep scientific research ability', 'Unshakeable grit'],
        cautions: ['Reckless driving hazards', 'Hidden anger or grudges'],
        remedy: 'Recite Hanuman Bahuk for physical strength; avoid hasty electrical or fire handling.'
      },
      9: {
        house: 9,
        bulletPoints: [
          'Luck and fortune unlocked through decisive action',
          'Fierce champion of justice, truth & principles',
          'Respect from father with independent differences',
          'Love for adventurous expeditions & foreign travel',
          'Passionate defense of righteousness and dharma'
        ],
        summary: 'Mars in 9th house creates a crusader for truth, championing spiritual and ethical reforms with bold courage and international ventures.',
        strengths: ['Righteous moral courage', 'Adventurous visionary', 'Legal and philosophical zeal'],
        cautions: ['Dogmatic arguments with elders', 'Impatience with slow rituals'],
        remedy: 'Respect father and mentors; donate red lentils (Masoor Dal) on Tuesdays.'
      },
      10: {
        house: 10,
        bulletPoints: [
          'Peak career success & Kuldeepak Yoga potential',
          'Commanding leadership, executive authority & fame',
          'Tireless work ethic & ambitious executive presence',
          'Superb for defense, engineering, police, sports, politics',
          'Recognized as an unstoppable industry powerhouse'
        ],
        summary: 'Mars achieves maximum Digbala (Directional Strength) in the 10th house, creating legendary administrators, generals, surgeons, and business titans.',
        strengths: ['Unstoppable career momentum', 'Flawless execution of grand projects', 'High prestige'],
        cautions: ['Authoritarian management style', 'Impatience with slower colleagues'],
        remedy: 'Keep a copper pyramid or red gemstone paperweight at work; maintain ethical leadership.'
      },
      11: {
        house: 11,
        bulletPoints: [
          'Massive monetary gains earned through own courage & efforts',
          'Numerous high-status achievements & milestones',
          'Active, dynamic support from powerful friends & networks',
          'Fulfillment of long-cherished material desires',
          'Lucrative real estate and commercial expansion'
        ],
        summary: 'Mars in 11th house transforms every drop of hard work into massive financial gains, influential alliances, and multiple revenue streams.',
        strengths: ['Aggressive wealth generation', 'Support from high-ranking friends', 'Goal accomplishment'],
        cautions: ['Impatience in team projects', 'Occasional friction with elder siblings'],
        remedy: 'Share your prosperity with brothers and comrades; donate sweets to laborers.'
      },
      12: {
        house: 12,
        bulletPoints: [
          'Expenses on properties, travels, luxury & vehicles',
          'Foreign connections, overseas defense or multinational career',
          'Restlessness of mind requiring physical channelization',
          'Spiritual discipline through rigorous Yogic practices',
          'Need to consciously manage inner anger and outflows'
        ],
        summary: 'Mars in 12th house channels warrior energy into international postings, martial arts, disciplined Yoga, and conquering foreign markets.',
        strengths: ['Endurance in foreign assignments', 'Yogic discipline', 'Generosity in protective causes'],
        cautions: ['Excessive unplanned expenditure', 'Sleep restlessness and muscle tension'],
        remedy: 'Practice evening meditation; avoid fiery arguments before sleep; donate copper utensils.'
      }
    }
  },
  mercury: {
    id: 'mercury',
    name: 'Mercury',
    sanskritName: 'Budh',
    devanagari: 'बुध',
    nature: 'Natural Benefic',
    element: 'Earth',
    gender: 'Neutral',
    rulingSigns: ['Gemini (Mithuna)', 'Virgo (Kanya)'],
    exaltation: 'Virgo 15° (Kanya)',
    debilitation: 'Pisces 15° (Meena)',
    dayOfWeek: 'Wednesday (Budhavar)',
    gemstone: 'Emerald (Panna)',
    metal: 'Bronze / Brass',
    color: 'Emerald Green / Parrot Green',
    beejMantra: 'ॐ ब्रां ब्रीं ब्रौं सः बुधाय नमः',
    beejMantraTransliteration: 'Om Braam Breem Broum Sah Budhaya Namah',
    avatar: '🌱',
    centralDescription: 'Prince of planets, Intellect (Buddhi), Speech, Commerce, Logic, IT, Humor & Analytical Calculation.',
    note: 'Results may vary as per other planets, signs & aspects in the Kundli. A strong Mercury creates brilliant communicators, trading tycoons, data analysts, and celebrated authors.',
    effects: {
      1: {
        house: 1,
        bulletPoints: [
          'Intelligent, witty & remarkably smart',
          'Eloquent communication & conversational charisma',
          'Quick learner with multifaceted curiosities',
          'Good at mathematics, data, analytics & logic',
          'Evergreen youthful look & highly attractive personality'
        ],
        summary: 'Mercury in 1st house (Bhadra Mahapurusha Yoga if in Gemini/Virgo) bestows youthful beauty, razor-sharp intellect, and charming wit.',
        strengths: ['Articulate speaker', 'Fast cognitive processing', 'Youthful appearance'],
        cautions: ['Over-intellectualizing simple emotions', 'Nervous fidgeting'],
        remedy: 'Wear shades of green on Wednesdays; feed green grass or spinach to cows.'
      },
      2: {
        house: 2,
        bulletPoints: [
          'Sweet, witty & deeply impressive speech',
          'Vast knowledge across multiple domains',
          'Sharp financial skills & commercial mastery',
          'Strong, supportive family bonds & witty discussions',
          'Substantial monetary gains through education & trade'
        ],
        summary: 'Mercury in 2nd house creates Saraswati Yoga vibes: poetic articulation, exceptional financial bookkeeping, and persuasive commercial salesmanship.',
        strengths: ['Mesmerizing conversationalist', 'Accurate accounting acumen', 'Scholastic reputation'],
        cautions: ['Tendency to speak excessively or gossip', 'Sarcastic humor hurting sensitivities'],
        remedy: 'Chew a green cardamom (Elaichi) before meetings; respect maternal aunts and sisters.'
      },
      3: {
        house: 3,
        bulletPoints: [
          'Courageous & proactive communicator',
          'Gifted writer, journalist & content creator',
          'Thrives in media, sales, advertising, IT & marketing',
          'Success & profitable networks in short travels',
          'Affectionate & helpful relationship with siblings'
        ],
        summary: 'Mercury in 3rd house is in its natural environment, giving extraordinary writing talent, digital marketing wizardry, and media success.',
        strengths: ['Prolific writing flair', 'Digital tech agility', 'Persuasive sales instincts'],
        cautions: ['Scattering focus across too many hobbies', 'Superficial multi-tasking'],
        remedy: 'Maintain a blog or journal; donate green stationery/books to needy students.'
      },
      4: {
        house: 4,
        bulletPoints: [
          'Peace of mind enriched with intellectual pursuits',
          'High scholastic education & scholarly degrees',
          'Profitable property, tech assets & modern vehicles',
          'Logical, structured & clear thinking processes',
          'Comfortable living & fond relationship with mother'
        ],
        summary: 'Mercury in 4th house provides an intellectually stimulating home, academic accolades, tech-equipped smart homes, and mental tranquility.',
        strengths: ['Academic brilliance', 'Refined logical reasoning', 'Harmonious family discussions'],
        cautions: ['Over-analyzing domestic peace', 'Worrying over minor home details'],
        remedy: 'Place a small indoor green plant in the north quadrant of your room; respect mother.'
      },
      5: {
        house: 5,
        bulletPoints: [
          'Exceptionally sharp memory & rapid recall',
          'Genius intelligence & analytical clarity',
          'Outstanding success in higher studies & exams',
          'Creative thinking, scriptwriting & algorithmic coding',
          'Affectionate with children & love for mantras and astrology'
        ],
        summary: 'Mercury in 5th house confers extraordinary intellectual caliber, mastery in Jyotish/mantras/coding, and wit that shines in any social circle.',
        strengths: ['Algorithmic problem-solving', 'Affectionate mentor to kids', 'Astrological intuition'],
        cautions: ['Overthinking romantic relations', 'Speculative analysis paralysis'],
        remedy: 'Chant Vishnu Sahasranama or Budh Gayatri Mantra; donate green fruits to children.'
      },
      6: {
        house: 6,
        bulletPoints: [
          'Decisive victory over enemies through logic & diplomacy',
          'Stands out in competitive exams & debates',
          'Exceptional analytical, auditing & debugging mind',
          'Top performance in service, IT, finance & healthcare jobs',
          'Solves complex puzzles & logistical bottlenecks easily'
        ],
        summary: 'Mercury in 6th house is exalted in its own sign Virgo, turning one into a master problem-solver, ace lawyer, forensic auditor, and unbeatable debater.',
        strengths: ['Flawless attention to detail', 'Victory in intellectual litigation', 'Efficient service delivery'],
        cautions: ['Nervous digestion or IBS under heavy stress', 'Over-critical perfectionism'],
        remedy: 'Take regular screen breaks; feed whole green Moong dal to birds on Wednesdays.'
      },
      7: {
        house: 7,
        bulletPoints: [
          'Witty & intelligent communication in relationships',
          'Smart, educated & commercially astute life partner',
          'Business partnerships prove highly profitable',
          'Success in trade, diplomacy, consulting & public relations',
          'Youthful marital dynamic with mutual mental stimulation'
        ],
        summary: 'Mercury in 7th house brings a companion who is intellectually stimulating, highly skilled, and a true co-pilot in business and life.',
        strengths: ['Smooth contract negotiations', 'Mentally engaging marriage', 'Public diplomacy'],
        cautions: ['Treating relationships like commercial contracts', 'Fickle commitments if bored'],
        remedy: 'Exchange thoughtful written notes/gifts with partner; keep a green gemstone at home.'
      },
      8: {
        house: 8,
        bulletPoints: [
          'Deep fascination with occult, astrology & hidden subjects',
          'Exceptional data forensics & research capabilities',
          'Navigating sudden shifts with intellectual adaptability',
          'Uncovering hidden financial talents & secret information',
          'Need to control overthinking & nervous restlessness'
        ],
        summary: 'Mercury in 8th house creates brilliant data scientists, investigative journalists, occult researchers, and masters of deep esoteric wisdom.',
        strengths: ['Forensic investigation skill', 'Occult wisdom synthesis', 'Adaptability in crises'],
        cautions: ['Anxiety loops over unknown outcomes', 'Nervous exhaustion'],
        remedy: 'Practice daily grounding meditation; recite Budh Beej Mantra 108 times on Wednesdays.'
      },
      9: {
        house: 9,
        bulletPoints: [
          'Good fortune through higher learning & wisdom',
          'Love for continuous learning, spirituality & philosophy',
          'Principled, ethical & open-minded religious nature',
          'Long distance travel for study & business is beneficial',
          'Warm, communicative & respectful bond with father/gurus'
        ],
        summary: 'Mercury in 9th house fosters high scholarship, publishing success, fruitful international university degrees, and philosophical enlightenment.',
        strengths: ['Gift for teaching and publishing', 'Ethical worldview', 'International travel benefits'],
        cautions: ['Debating religion dogmatically', 'Restless jumping between philosophies'],
        remedy: 'Seek blessings from teachers; donate green clothes or sacred literature to libraries.'
      },
      10: {
        house: 10,
        bulletPoints: [
          'Tremendous career growth in intellectual & commercial fields',
          'Excellence in business, IT, journalism, media, finance & trade',
          'Smart, practical & highly respected professional stature',
          'Celebrated in profession for communication & problem-solving',
          'Leadership executed through eloquence, data & persuasion'
        ],
        summary: 'Mercury in 10th house is a powerhouse for business tycoons, software architects, marketing heads, CFOs, and renowned media executives.',
        strengths: ['Mastery of commerce', 'Persuasive executive presentations', 'High professional agility'],
        cautions: ['Taking on too many simultaneous projects', 'Impatience with slow bureaucracies'],
        remedy: 'Keep a clean, organized work desk; respect your colleagues and subordinates.'
      },
      11: {
        house: 11,
        bulletPoints: [
          'Lucrative gains through friends, digital networks & trade',
          'Substantial, multi-source income and profits',
          'Rapid fulfillment of ambitions & business desires',
          'Success across multiple diversified business ventures',
          'Surrounded by intellectuals, scholars & affluent peers'
        ],
        summary: 'Mercury in 11th house creates immense wealth through diversified commercial interests, digital platforms, affiliate networks, and smart investing.',
        strengths: ['Multiple income streams', 'Influential intellectual network', 'Financial savvy'],
        cautions: ['Spreading capital too thin across speculative ventures'],
        remedy: 'Support educational charities; donate stationery and green clothing to orphanages.'
      },
      12: {
        house: 12,
        bulletPoints: [
          'Lucrative foreign connections & international commerce',
          'Expenditures directed toward higher learning, tech & travel',
          'Deep capacity for scientific research, coding & meditation',
          'Intuitive connection with foreign languages & cultures',
          'Need to control overthinking, screen time & mental worry'
        ],
        summary: 'Mercury in 12th house shines in foreign software exports, international diplomacy, remote writing in solitude, and profound meditative insight.',
        strengths: ['Multilingual aptitude', 'Success in foreign companies', 'Deep introspective creativity'],
        cautions: ['Late-night screen addiction causing insomnia', 'Overthinking small expenses'],
        remedy: 'Avoid digital screens 1 hour before sleep; donate green Moong dal to spiritual shelters.'
      }
    }
  },
  jupiter: {
    id: 'jupiter',
    name: 'Jupiter',
    sanskritName: 'Guru / Brihaspati',
    devanagari: 'गुरु / बृहस्पति',
    nature: 'Natural Benefic',
    element: 'Ether',
    gender: 'Masculine',
    rulingSigns: ['Sagittarius (Dhanu)', 'Pisces (Meena)'],
    exaltation: 'Cancer 5° (Karka)',
    debilitation: 'Capricorn 5° (Makara)',
    dayOfWeek: 'Thursday (Guruvar)',
    gemstone: 'Yellow Sapphire (Pukhraj)',
    metal: 'Gold',
    color: 'Bright Yellow / Saffron / Golden',
    beejMantra: 'ॐ ग्रां ग्रीं ग्रौं सः गुरवे नमः',
    beejMantraTransliteration: 'Om Graam Greem Groum Sah Gurave Namah',
    avatar: '✨',
    centralDescription: 'Greatest Benefic (Devaguru), Wisdom, Wealth, Children, Dharma, Higher Knowledge & Grace of God.',
    note: 'Results may vary as per other planets, signs & aspects in the Kundli. A strong Jupiter shields the entire horoscope and bestows immense wisdom, honorable lineage, and lasting prosperity.',
    effects: {
      1: {
        house: 1,
        bulletPoints: [
          'Wise, philosophical & deeply positive thinking',
          'Hamsa Yoga potential: dignified, noble & radiant personality',
          'Good health, strong constitution & magnetic spiritual glow',
          'Widely respected personality and natural counselor',
          'Immense good fortune & success in life endeavors'
        ],
        summary: 'Jupiter in 1st house is one of the greatest blessings in Vedic astrology, protecting the entire chart from a million flaws (Koti Dosha Nivarana).',
        strengths: ['Supreme wisdom and ethical nobility', 'Natural mentor aura', 'High spiritual protection'],
        cautions: ['Tendency toward weight gain/liver health', 'Over-optimistic risk taking'],
        remedy: 'Apply yellow sandalwood or saffron tilak on forehead; respect teachers and priests.'
      },
      2: {
        house: 2,
        bulletPoints: [
          'Generous wealth, ancestral prosperity & financial stability',
          'Sweet, truthful, wise & inspiring speech',
          'High family moral values, noble lineage & harmony',
          'Gains from family legacy, education & investments',
          'Fond of sattvic, wholesome & nutritious food'
        ],
        summary: 'Jupiter in 2nd house creates steady abundance, respectful speech, honorable family heritage, and mastery in advisory/financial vocations.',
        strengths: ['Wise financial stewardship', 'Respected orator', 'Unshakable family integrity'],
        cautions: ['Over-spending on charitable hospitality without limits'],
        remedy: 'Donate turmeric, yellow gram (Chana Dal) or yellow sweets on Thursdays.'
      },
      3: {
        house: 3,
        bulletPoints: [
          'Courage anchored in wisdom & moral self-confidence',
          'Supportive & affectionate relationship with siblings',
          'High success in studies, publications & mass communication',
          'Short travels & knowledge workshops prove highly beneficial',
          'Inspiring speaker, educator, writer & philosopher'
        ],
        summary: 'Jupiter in 3rd house turns one\'s communications into sources of inspiration, blessing younger siblings, authors, professors, and advisors.',
        strengths: ['Inspiring communication', 'Creative publishing flair', 'Calm courage'],
        cautions: ['Over-advising peers without being asked', 'Complacency in physical exercise'],
        remedy: 'Gift educational books to young students; water a Banana or Peepal tree on Thursdays.'
      },
      4: {
        house: 4,
        bulletPoints: [
          'Immense happiness & deep affection from mother & home',
          'Generous property, spacious estates & vehicle benefits',
          'Serene, peaceful mind & deep spiritual grounding',
          'Excellent formal education & enriching learning atmosphere',
          'Home is considered a sanctuary of hospitality and peace'
        ],
        summary: 'Jupiter in 4th house (Hamsa Yoga if in Cancer/Sagittarius/Pisces) blesses one with a palatial, serene home, noble vehicle collection, and deep peace of mind.',
        strengths: ['Deep emotional contentment', 'Spacious luxury residences', 'Virtuous maternal blessings'],
        cautions: ['Being overly lenient in domestic matters'],
        remedy: 'Keep a Brass Guru Yantra or clean sacred altar in northeast zone of the home.'
      },
      5: {
        house: 5,
        bulletPoints: [
          'Intelligent, creative & exceptionally brilliant mind',
          'Great blessings through children, their wisdom & success',
          'High scholastic accolades in education, philosophy & arts',
          'Good luck in investments, stock evaluation & speculation',
          'Mantra siddhi, spiritual intuition & past-life good karma'
        ],
        summary: 'Jupiter in 5th house is in supreme joy, generating profound counseling intellect, pious children, spiritual illumination, and providential fortune.',
        strengths: ['Profound intellectual discernment', 'Blessed progeny', 'Spiritual wisdom recall'],
        cautions: ['Over-confidence in speculative stock bets without fundamental checks'],
        remedy: 'Recite Guru Stotram; feed soaked Chana dal and jaggery to yellow cows on Thursdays.'
      },
      6: {
        house: 6,
        bulletPoints: [
          'Victory over enemies & competitors through righteousness',
          'Service-minded, noble healer, arbitrator & advisor',
          'Strong immunity, health awareness & problem solving',
          'Transforms workplace conflicts into harmonious growth',
          'Solves difficult disputes and brings lasting success'
        ],
        summary: 'Jupiter in 6th house turns adversaries into friends through diplomatic nobility, providing excellence in legal arbitration, medicine, and advisory.',
        strengths: ['Diplomatic conflict resolution', 'Compassionate service mindset', 'Ethical workplace standard'],
        cautions: ['Over-trusting duplicitous rivals', 'Watch dietary sugar and liver balance'],
        remedy: 'Serve elderly teachers; avoid taking unsecured personal loans on Thursdays.'
      },
      7: {
        house: 7,
        bulletPoints: [
          'Noble, supportive, cultured & virtuous life partner',
          'Highly auspicious for happy, long-lasting married life',
          'Respectful and intellectually enriching partnerships',
          'Profitable business alliances & prestigious collaborations',
          'Substantial gains through public dealings and fair commerce'
        ],
        summary: 'Jupiter in 7th house brings a companion of high character, wisdom, and dignity, ensuring societal respect and fruitful joint ventures.',
        strengths: ['Harmonious lifelong marriage', 'Ethical commercial partnerships', 'Public admiration'],
        cautions: ['Holding partner to unrealistically saintly standards'],
        remedy: 'Perform Vishnu Sahasranama chanting with spouse on Thursdays; donate yellow cloth.'
      },
      8: {
        house: 8,
        bulletPoints: [
          'Deep fascination with occult, astrology & hidden knowledge',
          'Sudden windfalls, inheritances & insurance gains',
          'Longevity, miraculous protection & spiritual armor',
          'Deep spiritual metamorphosis and Kundalini awakening',
          'Spouse comes from a wealthy, dignified background'
        ],
        summary: 'Jupiter in 8th house acts as a protective shield against accidents, bestowing deep occult wisdom, inheritance gains, and spiritual liberation.',
        strengths: ['Profound Jyotish/occult comprehension', 'Sudden heritage windfalls', 'Divine protection in crises'],
        cautions: ['Weight management and sluggish digestion'],
        remedy: 'Chant Brihaspati Beej Mantra 108 times; respect your spiritual mentor and elders.'
      },
      9: {
        house: 9,
        bulletPoints: [
          'Supreme luck, divine blessings & Bhagya manifest',
          'Devoted & blessed relationship with father and gurus',
          'Pinnacle of higher education, university honors & law',
          'Philosophical enlightenment & long international pilgrimages',
          'Unquestioned ethical integrity and societal reverence'
        ],
        summary: 'Jupiter in 9th house is in its own natural house (Karako Bhava Nashaya is minimized when dignified), giving effortless luck, saintly character, and global honor.',
        strengths: ['Divine providence in all situations', 'Spiritual guru status', 'Scholarly renown'],
        cautions: ['Must avoid philosophical dogmatism'],
        remedy: 'Visit ancient pilgrim shrines; touch the feet of your father and gurus with humility.'
      },
      10: {
        house: 10,
        bulletPoints: [
          'High career growth, noble authority & zenith success',
          'Deeply respected and honored across all of society',
          'Top-tier suitability for teaching, judiciary, advisory, finance',
          'Leadership driven by wisdom, compassion & fair justice',
          'Builds lasting institutions, schools, hospitals & charities'
        ],
        summary: 'Jupiter in 10th house creates eminent judges, university chancellors, chief economic advisors, spiritual leaders, and beloved executives.',
        strengths: ['Spotless professional integrity', 'Wise organizational leadership', 'Lasting legacy'],
        cautions: ['Disdain for cutthroat corporate politics leading to frustration'],
        remedy: 'Keep a yellow gemstone or wooden fountain on office desk; mentor young apprentices.'
      },
      11: {
        house: 11,
        bulletPoints: [
          'Immense income, multiple wealth streams & financial gains',
          'Effortless fulfillment of grand life ambitions and goals',
          'Support from ministers, billionaires, mentors & influential leaders',
          'Vast, prestigious social circle founded on mutual respect',
          'Generous philanthropic spending without depleting wealth'
        ],
        summary: 'Jupiter in 11th house is a kingly placement for continuous wealth inflow, multi-million dollar investments, and having one\'s highest aspirations realized.',
        strengths: ['Uncapped financial gains', 'Influential benefactors', 'Realization of lifelong dreams'],
        cautions: ['Being overly generous to opportunistic acquaintances'],
        remedy: 'Donate to educational trusts; feed yellow fruits to saints and students on Thursdays.'
      },
      12: {
        house: 12,
        bulletPoints: [
          'Profound spirituality, meditation mastery & inner growth',
          'Prosperous foreign settlement & international recognition',
          'Generous expenditures on charity, temples & noble causes',
          'Attainment of Moksha (spiritual liberation) & inner peace',
          'Solitude becomes a fountain of cosmic bliss and intuition'
        ],
        summary: 'Jupiter in 12th house (Moksha Karaka) ensures divine protection in foreign lands, philanthropic greatness, and ultimate spiritual ascension.',
        strengths: ['Transcendental meditative bliss', 'Success abroad', 'Selfless philanthropy'],
        cautions: ['Over-spending on charitable projects without personal reserves'],
        remedy: 'Meditate in northeast corner of your room; feed yellow sweets to cows on Thursdays.'
      }
    }
  },
  venus: {
    id: 'venus',
    name: 'Venus',
    sanskritName: 'Shukra',
    devanagari: 'शुक्र',
    nature: 'Natural Benefic',
    element: 'Water',
    gender: 'Feminine',
    rulingSigns: ['Taurus (Vrishabha)', 'Libra (Tula)'],
    exaltation: 'Pisces 27° (Meena)',
    debilitation: 'Virgo 27° (Kanya)',
    dayOfWeek: 'Friday (Shukravar)',
    gemstone: 'Diamond (Heera) / White Zircon / Opal',
    metal: 'Silver / Platinum',
    color: 'White / Pink / Pastel Shades / Iridescent',
    beejMantra: 'ॐ द्रां द्रीं द्रौं सः शुक्राय नमः',
    beejMantraTransliteration: 'Om Draam Dreem Droum Sah Shukraya Namah',
    avatar: '🌸',
    centralDescription: 'Daityaguru, Love, Beauty, Luxury, Vehicles, Arts, Sensual Pleasure, Refinement & Marital Harmony.',
    note: 'Results may vary as per other planets, signs & aspects in the Kundli. A strong Venus grants unmatched charisma, luxury conveyances, artistic genius, and blissful romantic partnerships.',
    effects: {
      1: {
        house: 1,
        bulletPoints: [
          'Exceptionally attractive, glamorous & charismatic personality',
          'Charming, magnetic, romantic & pleasant nature',
          'Flawless sense of fashion, aesthetics & elegance',
          'Highly popular, well-liked & magnetic social presence',
          'Enjoys all comforts, pleasures & refined luxuries of life'
        ],
        summary: 'Venus in 1st house (Malavya Mahapurusha Yoga if in Taurus/Libra/Pisces) bestows stunning beauty, magnetic social grace, artistic talent, and lifelong luxury.',
        strengths: ['Mesmerizing personal charm', 'Sophisticated style', 'Universal social appeal'],
        cautions: ['Vanity or over-focus on physical appearances', 'Sensory self-indulgence'],
        remedy: 'Wear clean, fragrant clothes; use sweet perfumes; respect women in your life.'
      },
      2: {
        house: 2,
        bulletPoints: [
          'Sweet, melodic, poetic & beautiful speech',
          'Generous wealth, jewelry, liquid assets & financial stability',
          'Happy, harmonious & cultured family atmosphere',
          'Connoisseur of fine cuisine, sweets & culinary arts',
          'Substantial gains through family trade, arts & beauty industry'
        ],
        summary: 'Venus in 2nd house creates a honeyed voice, radiant facial beauty, immense wealth in jewelry and silver, and aristocratic family traditions.',
        strengths: ['Melodious speaking voice', 'Aesthetic wealth accumulation', 'Family elegance'],
        cautions: ['Excess spending on luxury perfumes, jewelry & gourmet delicacies'],
        remedy: 'Donate white sweets, sugar, or ghee on Fridays; respect married women.'
      },
      3: {
        house: 3,
        bulletPoints: [
          'Outstanding artistic, musical, dramatic & literary talent',
          'Polished, charming & graceful communication skills',
          'Courage infused with creative & aesthetic passion',
          'Loving, artistic & warm relationship with siblings',
          'Pleasurable and profitable short travels & vacations'
        ],
        summary: 'Venus in 3rd house sparks artistic genius, musical or acting talents, cordial sibling ties, and profitable ventures in entertainment and media.',
        strengths: ['Artistic and musical dexterity', 'Graceful persuasion', 'Social media flair'],
        cautions: ['Indolence in physically grueling manual labor'],
        remedy: 'Engage in creative arts, music, or design; gift cosmetics to sisters on Fridays.'
      },
      4: {
        house: 4,
        bulletPoints: [
          'Happiness, luxury & exquisite peace at home',
          'Lavish comforts, luxury sports vehicles & beautiful mansions',
          'Deep, loving bond with mother & maternal heritage',
          'Beautiful home adorned with arts, gardens & aesthetics',
          'Exceptional property luck and domestic harmony'
        ],
        summary: 'Venus gains directional strength (Digbala) in the 4th house, providing palatial homes, luxury motorcars, artistic decor, and supreme domestic bliss.',
        strengths: ['Refined interior design taste', 'Posh vehicle collection', 'Harmonious domestic peace'],
        cautions: ['Excessive comfort-seeking leading to inertia'],
        remedy: 'Keep a fragrant white flower vase in the bedroom; serve sweet curd to mother.'
      },
      5: {
        house: 5,
        bulletPoints: [
          'Refined intelligence imbued with creative imagination',
          'Passion for arts, cinema, theater, literature & music',
          'Good luck, beauty & accomplishments in children',
          'Romantic, affectionate & poetic love life',
          'Success in creative investments, luxury brands & arts'
        ],
        summary: 'Venus in 5th house creates celebrated artists, film directors, poets, romantics, and scholars of aesthetic philosophy.',
        strengths: ['Creative genius', 'Charming romantic flair', 'Joyous relationship with children'],
        cautions: ['Drama in romantic affairs', 'Impulsive luxury gambling'],
        remedy: 'Chant Lakshmi Gayatri Mantra on Fridays; feed white cows with green fodder or sweets.'
      },
      6: {
        house: 6,
        bulletPoints: [
          'Victory over enemies through polite diplomacy & charm',
          'Good for service in fashion, design, hospitality & healing',
          'Solves complex interpersonal problems with tact',
          'Good health through balanced daily beauty & diet routines',
          'May attract romantic relationships in the workplace'
        ],
        summary: 'Venus in 6th house handles adversaries with sweet diplomacy, excelling in HR, interior architecture, cosmetic wellness, and legal mediation.',
        strengths: ['Diplomatic tact in conflicts', 'Wellness and hygiene focus', 'Workplace popularity'],
        cautions: ['Debilitated if in Virgo - guard against sugar/kidney sensitivity or relationship criticism'],
        remedy: 'Maintain spotless hygiene; donate milk and camphor to a Devi temple on Fridays.'
      },
      7: {
        house: 7,
        bulletPoints: [
          'Happy, romantic & deeply fulfilling married life',
          'Extremely attractive, charming & supportive life partner',
          'Lucrative business partnerships & commercial contracts',
          'Love, romance, devotion & mutual adoration in relationships',
          'Immense success in public interactions and client dealings'
        ],
        summary: 'Venus in 7th house (in its own or exalted sign) brings a beautiful, loving, high-status spouse, exquisite marital harmony, and flourishing trade.',
        strengths: ['Marital bliss and loyalty', 'High-end business alliances', 'Public charisma'],
        cautions: ['Over-compromising to avoid conflict', 'Sensual over-indulgence'],
        remedy: 'Respect and honor your spouse; offer fragrant white flowers at Devi temple on Fridays.'
      },
      8: {
        house: 8,
        bulletPoints: [
          'Deep fascination with mysticism, occult arts & hidden beauty',
          'Substantial financial gains from in-laws or life partner',
          'Sudden unexpected financial windfalls & asset inheritances',
          'Deep emotional & spiritual transformation through love',
          'Long life enriched with comforts and hidden blessings'
        ],
        summary: 'Venus in 8th house is considered highly auspicious (Sarala Yoga), providing unexpected inheritance, wealthy in-laws, and esoteric understanding.',
        strengths: ['Financial windfalls through marriage/in-laws', 'Occult discernment', 'Grace under crisis'],
        cautions: ['Secret romantic entanglements', 'Reproductive health awareness'],
        remedy: 'Avoid secret affairs; chant Sri Suktam; donate white silk clothes on Fridays.'
      },
      9: {
        house: 9,
        bulletPoints: [
          'Supreme luck, fortune, artistic grace & prosperity',
          'Love for luxury travels, scenic vacations & aesthetic beauty',
          'Strong, affectionate bond with father, mentors & gurus',
          'High success in university education, arts & international law',
          'Blessed with spiritual, philosophical & artistic mentors'
        ],
        summary: 'Venus in 9th house creates a charmed life of luxurious world travel, divine aesthetic inspiration, artistic patronage, and profound moral grace.',
        strengths: ['Charmed good fortune', 'Cultured worldliness', 'Artistic spirituality'],
        cautions: ['Turning spiritual retreats into purely luxury vacations'],
        remedy: 'Visit beautiful temples on hilltops/waterfronts; respect teachers and female elders.'
      },
      10: {
        house: 10,
        bulletPoints: [
          'High career success, celebrity status & social prestige',
          'Widespread admiration & spotless reputation in society',
          'Flourishing career in cinema, fashion, design, luxury, media, IT',
          'Leadership carried out with refined charm and aesthetic vision',
          'Support and patronage from influential female leaders'
        ],
        summary: 'Venus in 10th house creates famous actors, fashion designers, luxury moguls, diplomats, architects, and celebrated media personalities.',
        strengths: ['Public stardom and prestige', 'Aesthetic executive vision', 'Flawless professional charm'],
        cautions: ['Susceptibility to workplace gossip regarding charm'],
        remedy: 'Maintain a pristine, elegant work environment; wear silver ring on thumb or middle finger.'
      },
      11: {
        house: 11,
        bulletPoints: [
          'Abundant income, liquid gains & continuous wealth flow',
          'Swift fulfillment of all material, romantic & social desires',
          'Supportive network of affluent friends, women & patrons',
          'Enjoys an active social calendar filled with luxury & joy',
          'Multiple profitable streams from creative & commercial assets'
        ],
        summary: 'Venus in 11th house is a powerhouse for financial gains, high society friendships, luxury vehicles, and continuous revenue from artistic investments.',
        strengths: ['Effortless wealth accumulation', 'Vast elite network', 'Joyous lifestyle'],
        cautions: ['Over-spending on lavish parties and luxury toys'],
        remedy: 'Donate white rice or sugar to orphanages; host charitable cultural gatherings.'
      },
      12: {
        house: 12,
        bulletPoints: [
          'Venus is exalted in 12th house (Pisces) - unmatched bedroom comforts',
          'Luxurious expenditures on vacations, fashion, art & partners',
          'Profitable connection with foreign lands & international trade',
          'Spiritual comforts, poetic solitude & transcendental ecstasy',
          'Need conscious balance to avoid excessive sensory dissipation'
        ],
        summary: 'Venus in 12th house is the only planet that gives extraordinary material, romantic, and spiritual luxuries in the house of expenditures.',
        strengths: ['Ultimate bedroom comforts', 'Foreign wealth influx', 'Poetic spiritual imagination'],
        cautions: ['Unrestrained spending on luxury cravings', 'Sensory exhaustion'],
        remedy: 'Channel pleasures into spiritual devotion; donate white camphor at holy shrines.'
      }
    }
  },
  saturn: {
    id: 'saturn',
    name: 'Saturn',
    sanskritName: 'Shani',
    devanagari: 'शनि',
    nature: 'Natural Malefic',
    element: 'Air',
    gender: 'Neutral',
    rulingSigns: ['Capricorn (Makara)', 'Aquarius (Kumbha)'],
    exaltation: 'Libra 20° (Tula)',
    debilitation: 'Aries 20° (Mesha)',
    dayOfWeek: 'Saturday (Shanivar)',
    gemstone: 'Blue Sapphire (Neelam) / Amethyst',
    metal: 'Iron / Steel / Lead',
    color: 'Dark Blue / Black / Charcoal',
    beejMantra: 'ॐ प्रां प्रीं प्रौं सः शनैश्चराय नमः',
    beejMantraTransliteration: 'Om Praam Preem Proum Sah Shanaishcharaya Namah',
    avatar: '🪐',
    centralDescription: 'Lord of Karma & Justice (Karmaphala Daata), Discipline, Delay, Structure, Longevity & Masses.',
    note: 'Saturn gives results after delay, but the results are long-lasting and stable. Teaches patience, humility, and disciplined perseverance.',
    effects: {
      1: {
        house: 1,
        bulletPoints: [
          'Serious, mature & grounded nature from an early age',
          'Extremely hardworking, resilient & responsible demeanor',
          'Disciplined habits with strong endurance and stamina',
          'Delayed success in early life, leading to rock-solid stability',
          'Good leadership built on patience, humility & perseverance'
        ],
        summary: 'Saturn in 1st house (Sasa Mahapurusha Yoga if in Libra/Capricorn/Aquarius) creates a stoic, hardworking, and deeply respected leader of the masses.',
        strengths: ['Unshakeable patience', 'Immense resilience under hardship', 'Mass leadership appeal'],
        cautions: ['Melancholic outlook or self-criticism in youth', 'Joint stiffness'],
        remedy: 'Serve the poor, elderly and laborers; light a mustard oil lamp under a Peepal tree on Saturdays.'
      },
      2: {
        house: 2,
        bulletPoints: [
          'Financial struggles in early life transforming into vast wealth',
          'Prudent savings, conservative investments & steady accumulation',
          'Speech is measured, serious, blunt & realistic',
          'Heavy family responsibilities carried with duty',
          'Values long-term security over frivolous consumption'
        ],
        summary: 'Saturn in 2nd house builds self-made wealth through relentless discipline, disciplined savings, and fulfilling ancestral duties.',
        strengths: ['Disciplined capital preservation', 'Truthful speech', 'Immense perseverance'],
        cautions: ['Stinginess or fear of poverty', 'Harsh blunt tone in family talks'],
        remedy: 'Feed black crows and stray dogs; speak gently and avoid harsh criticism at family meals.'
      },
      3: {
        house: 3,
        bulletPoints: [
          'Unrivaled courage, grit & steel determination',
          'Hard work and steady persistence bring guaranteed success',
          'Good for serious technical writing, engineering & skill mastery',
          'Responsible and structured relationship with siblings',
          'Endures tough travel conditions without complaining'
        ],
        summary: 'Saturn in 3rd house is in a fantastic Upachaya position, destroying fear, building extraordinary manual skills, and rewarding patient effort.',
        strengths: ['Indomitable willpower', 'Mastery of technical crafts', 'Fearless in the face of odds'],
        cautions: ['Emotional distance with younger siblings in youth', 'Shoulder tension'],
        remedy: 'Support laborers and younger brothers; donate black sesame seeds on Saturdays.'
      },
      4: {
        house: 4,
        bulletPoints: [
          'Delays in acquiring property & vehicles, but massive long-term holdings',
          'High responsibilities regarding mother, elders & family home',
          'Peace of mind earned after early-life struggles and grounding',
          'Good real estate and land results in mature years',
          'Prefers rustic, vintage, durable or stone-built architecture'
        ],
        summary: 'Saturn in 4th house teaches emotional detachment in youth, yielding massive enduring real estate, agricultural lands, and inner serenity in later life.',
        strengths: ['Long-lasting real estate equity', 'Duty towards parents', 'Deep emotional maturity'],
        cautions: ['Feeling emotionally burdened at home', 'Cold domestic atmosphere'],
        remedy: 'Serve your mother unconditionally; keep a dark stone or iron horseshoe at home.'
      },
      5: {
        house: 5,
        bulletPoints: [
          'Serious, deeply analytical approach toward education',
          'Delayed childbirth possible, but children are mature and accomplished',
          'Deep philosophical thinking, logic, research & practical intellect',
          'Disciplined, long-term approach to speculative investments',
          'High devotion to traditional mantras and rigorous meditation'
        ],
        summary: 'Saturn in 5th house favors deep scholarly research, rigorous academic mastery, serious creative craft, and grounded parenting.',
        strengths: ['Profound research intellect', 'Disciplined long-term investor', 'Steadfast loyalty'],
        cautions: ['Emotional dryness in romance', 'Excessive strictness with children'],
        remedy: 'Chant Shani Gayatri Mantra; feed oil-smeared rotis to black dogs on Saturdays.'
      },
      6: {
        house: 6,
        bulletPoints: [
          'Supreme ability to defeat enemies, rivals & competitors',
          'Massive success in jobs, administration & law after hard work',
          'Ironclad work ethic, endurance & mastery over routine',
          'Superb perseverance in winning long-drawn court cases',
          'Health issues due to stress or overwork require routine rest'
        ],
        summary: 'Saturn in 6th house is an invincible placement (Shatru Hanta), making one a powerhouse in labor law, medicine, civil service, and corporate battlegrounds.',
        strengths: ['Crushes all opposition', 'Unmatched endurance under pressure', 'Loyal service staff'],
        cautions: ['Chronic stress from overwork', 'Joint/spine strain'],
        remedy: 'Recite Hanuman Chalisa 7 times on Saturdays; donate iron cookware to poor families.'
      },
      7: {
        house: 7,
        bulletPoints: [
          'Delay in marriage or significant age/maturity difference in spouse',
          'Serious, loyal, pragmatic & deeply committed life partner',
          'Relationship improves and deepens tremendously with time',
          'Success in traditional, industrial & long-term business partnerships',
          'Solid reputation for keeping contractual promises'
        ],
        summary: 'Saturn achieves Digbala in the 7th house (and creates Sasa Yoga in Libra/Capricorn/Aquarius), promising a rock-solid, faithful lifelong marriage.',
        strengths: ['Lifelong marital loyalty', 'Dependable business alliances', 'Public credibility'],
        cautions: ['Early marital coldness or delay', 'Excessive seriousness in romance'],
        remedy: 'Respect and remain patient with your partner; donate black blankets in winter to the needy.'
      },
      8: {
        house: 8,
        bulletPoints: [
          'Significant longevity (Ayu Karaka) & protection against early death',
          'Sudden ups & downs in life teaching non-attachment and wisdom',
          'Deep interest in occult, astrology, death-rebirth mysteries & history',
          'Long life enriched through overcoming chronic struggles',
          'Profound transformation through patient acceptance of karma'
        ],
        summary: 'Saturn in 8th house gives exceptional longevity, profound understanding of ancient mysteries, endurance through crises, and ultimate spiritual liberation.',
        strengths: ['Great longevity', 'Deep occult and historical research', 'Iron will in adversity'],
        cautions: ['Chronic joint/dental issues', 'Tendency toward brooding or isolation'],
        remedy: 'Chant Maha Mrityunjaya Mantra; donate mustard oil and iron utensils on Saturdays.'
      },
      9: {
        house: 9,
        bulletPoints: [
          'Respect for father, traditions & elders matures with time',
          'Deep, disciplined spiritual learning & philosophical dedication',
          'Long distance travel & pilgrimages after persistent hard work',
          'Practical, non-dogmatic moral code rooted in justice',
          'Slow and steady rise of divine fortune (Bhagya) after age 36'
        ],
        summary: 'Saturn in 9th house builds a deep, unshakeable philosophical foundation, rewarding long-term spiritual discipline and academic endurance with global respect.',
        strengths: ['Rigorous scholarship', 'Practical spirituality', 'Steadfast moral justice'],
        cautions: ['Early ideological friction with father/mentors', 'Skepticism of dogma'],
        remedy: 'Serve elderly gurus and destitute pilgrims; respect traditional family rites.'
      },
      10: {
        house: 10,
        bulletPoints: [
          'Strong, monumental career with supreme leadership in time',
          'Success achieved through tireless hard work, patience & merit',
          'Exceptional suitability for politics, law, administration, engineering',
          'Massive respect from the working class and grassroots masses',
          'Creates enduring institutions that outlive generations'
        ],
        summary: 'Saturn in 10th house is a classic Raja Yoga placement for prime ministers, high court judges, industrial tycoons, and architects of modern society.',
        strengths: ['Mass public influence', 'Unshakable administrative stamina', 'Historic career achievements'],
        cautions: ['Extreme workaholism', 'Vulnerability to fall if ethics are compromised'],
        remedy: 'Treat laborers with dignity; never take credit for others\' labor; light mustard lamp on Saturdays.'
      },
      11: {
        house: 11,
        bulletPoints: [
          'Continuous gains and wealth earned after initial patience',
          'Stable, secure and compounding income through consistent efforts',
          'Outstanding success in long-term investments, real estate & stocks',
          'Valuable support and patronage from elder, experienced friends',
          'Fulfillment of long-cherished ambitions in the second half of life'
        ],
        summary: 'Saturn in 11th house is one of the most financially potent placements, ensuring compounding wealth, massive rental incomes, and lasting prosperity.',
        strengths: ['Compounded financial empire', 'Loyal, mature circle of friends', 'Fulfillment of life goals'],
        cautions: ['Slow initial returns testing patience in young adulthood'],
        remedy: 'Donate to old-age homes; avoid deceitful financial shortcuts; chant Shani Beej Mantra.'
      },
      12: {
        house: 12,
        bulletPoints: [
          'Expenses directed toward family responsibilities and charities',
          'Foreign connections and settlement after disciplined hard work',
          'Deep spiritual growth through solitude, yoga and self-inquiry',
          'Sleep issues or occasional feelings of isolation in early life',
          'Attainment of detached inner peace and karmic resolution'
        ],
        summary: 'Saturn in 12th house fosters success in foreign lands, judicial custody, medical research, secluded retreats, and the dissolution of past-life karmic debts.',
        strengths: ['Endurance in foreign assignments', 'Yogic detachment', 'Karmic debt clearance'],
        cautions: ['Tendency toward sleep anxiety or social isolation'],
        remedy: 'Maintain a peaceful sleep sanctuary; donate black shoes or umbrellas to the poor.'
      }
    }
  },
  rahu: {
    id: 'rahu',
    name: 'Rahu',
    sanskritName: 'Rahu (North Node)',
    devanagari: 'राहु',
    nature: 'Natural Malefic',
    element: 'Air / Shadow',
    gender: 'Masculine / Shadow',
    rulingSigns: ['Co-ruler of Aquarius (Kumbha)'],
    exaltation: 'Taurus / Gemini',
    debilitation: 'Scorpio / Sagittarius',
    dayOfWeek: 'Saturday / Wednesday night',
    gemstone: 'Hessonite Garnet (Gomed)',
    metal: 'Lead / Mixed metals (Ashtadhatu)',
    color: 'Smoky Grey / Electric Blue / Ultraviolet',
    beejMantra: 'ॐ भ्रां भ्रीं भ्रौं सः राहवे नमः',
    beejMantraTransliteration: 'Om Bhraam Bhreem Bhroum Sah Rahave Namah',
    avatar: '🐉',
    centralDescription: 'Shadow Planet (Chhaya Graha), Ambition, Modern Tech, Foreign Lands, Illusion (Maya) & Sudden Rise.',
    note: 'Rahu amplifies desires and gives results suddenly. It can give both great worldly success, tech fame, and sudden confusion. Teaches mastery over illusion.',
    effects: {
      1: {
        house: 1,
        bulletPoints: [
          'Strong, burning desire for worldly success & fame',
          'Distinctive, unique & highly magnetic personality',
          'Attractive but restless, unconventional & innovative nature',
          'Pioneers new paths, disruptive ideas & modern technologies',
          'At times struggles with inner identity and restless wanderlust'
        ],
        summary: 'Rahu in 1st house creates an ambitious, charismatic trendsetter who breaks traditional molds to achieve global recognition and digital fame.',
        strengths: ['Trendsetting vision', 'Magnetic crowd fascination', 'Disruptive innovation'],
        cautions: ['Imposter syndrome or anxiety', 'Chasing illusory validation'],
        remedy: 'Wear silver chain; keep your lifestyle grounded; feed sweet rotis to stray dogs.'
      },
      2: {
        house: 2,
        bulletPoints: [
          'Sudden, unexpected wealth accumulation & speculative windfalls',
          'Speech can be unusual, mesmerizing, dramatic or multilingual',
          'Family life experiences dramatic ups and downs',
          'Unorthodox food choices or fascination with foreign cuisines',
          'Ability to generate wealth through digital media, tech & stocks'
        ],
        summary: 'Rahu in 2nd house creates sudden wealth influxes, hypnotic vocal charisma, and unconventional family dynamics.',
        strengths: ['Hypnotic speaker', 'Unorthodox wealth generation', 'Multilingual flair'],
        cautions: ['Harsh speech when angry', 'Impulsive speculative investments'],
        remedy: 'Keep a small solid silver ball in your pocket; avoid alcohol and smoking.'
      },
      3: {
        house: 3,
        bulletPoints: [
          'Extremely ambitious, bold & fearless risk taker',
          'Superb for media, advertising, marketing, IT & digital networks',
          'Courage to take unconventional and disruptive decisions',
          'High success in short digital travels and viral content creation',
          'Independent mindset that surpasses ordinary peer expectations'
        ],
        summary: 'Rahu in 3rd house is one of its finest placements, bestowing limitless ambition, viral media prowess, tech savvy, and heroic daring.',
        strengths: ['Fearless digital innovator', 'Viral storytelling genius', 'Unstoppable drive'],
        cautions: ['Strained relations with siblings if overly self-centered'],
        remedy: 'Support younger peers; donate blue/grey blankets to the homeless.'
      },
      4: {
        house: 4,
        bulletPoints: [
          'Intense desire for luxury mansions & foreign-style real estate',
          'Restlessness or disturbed peace of mind requiring grounding',
          'Frequent changes in home location or residing far from birthplace',
          'High-tech, modernized home environment with electronic gadgets',
          'Need to nurture a calm, grounded emotional connection with mother'
        ],
        summary: 'Rahu in 4th house drives one to acquire modern luxury properties, live in foreign lands, and seek emotional tranquility through spiritual grounding.',
        strengths: ['High-tech real estate holdings', 'Global residency', 'Fast-paced home lifestyle'],
        cautions: ['Domestic restlessness', 'Mother\'s emotional or respiratory health concerns'],
        remedy: 'Keep silver items at home; avoid keeping clutter or broken electronics at home.'
      },
      5: {
        house: 5,
        bulletPoints: [
          'Strong desire for creative fame, entertainment & spotlight',
          'Unusual, passionate, cross-cultural or unconventional love life',
          'Exceptional for tech investments, algorithmic coding, AI & stocks',
          'Unconventional, out-of-the-box creative intelligence',
          'May experience delays or unique experiences in progeny'
        ],
        summary: 'Rahu in 5th house generates breakthrough AI genius, cinematic creativity, viral speculative stock gains, and unconventional romances.',
        strengths: ['Algorithmic and AI brilliance', 'Visionary creative genius', 'Cross-cultural charm'],
        cautions: ['Speculative gambling without risk management', 'Drama in romantic relationships'],
        remedy: 'Chant Rahu Beej Mantra; donate coconut in running river on Saturdays.'
      },
      6: {
        house: 6,
        bulletPoints: [
          'Tremendous success and victory over enemies & competitors',
          'Exceptional for politics, contentious debates & competitive arenas',
          'Crushes all obstacles through modern strategies & psychological wit',
          'Health challenges arise from stress, requiring active detox routines',
          'Master of navigating complex corporate or political systems'
        ],
        summary: 'Rahu in 6th house is an unconquerable fortress, granting effortless triumph in politics, litigation, international corporate competition, and debate.',
        strengths: ['Crushes political/corporate rivals', 'Master of modern strategy', 'Immunity against secret plots'],
        cautions: ['Mental exhaustion from constant battles', 'Digestive/stress ailments'],
        remedy: 'Keep a black dog or feed stray dogs; worship Goddess Durga.'
      },
      7: {
        house: 7,
        bulletPoints: [
          'Unconventional, foreign, cross-cultural or highly dynamic partner',
          'Attraction towards strong, mysterious & ambitious personalities',
          'Partnership has dramatic ups and downs requiring clear communication',
          'Global alliances, international export-import & overseas trade',
          'Need conscious transparency to avoid mutual illusions in marriage'
        ],
        summary: 'Rahu in 7th house brings an alluring, foreign, or unconventional spouse and immense success in international business partnerships.',
        strengths: ['Global business expansion', 'Cross-cultural marital richness', 'Magnetic public outreach'],
        cautions: ['Misunderstandings born of unrealistic expectations in marriage'],
        remedy: 'Offer coconut in running water; maintain total honesty and transparency with spouse.'
      },
      8: {
        house: 8,
        bulletPoints: [
          'Deep fascination with mystery, occult knowledge & secret tech',
          'Sudden, unpredictable life events leading to massive transformations',
          'Transformation through unusual, mystical or foreign experiences',
          'Gains through speculative windfalls, crypto, cybersecurity & research',
          'Need to avoid risky shortcuts and unverified financial schemes'
        ],
        summary: 'Rahu in 8th house unlocks mastery over cybersecurity, cryptocurrency, occult sciences, deep data mining, and psychological transformation.',
        strengths: ['Mastery in cryptography and hidden data', 'Occult intuition', 'Crisis adaptation'],
        cautions: ['Vulnerability to speculative frauds', 'Anxiety over unknown outcomes'],
        remedy: 'Chant Maha Mrityunjaya Mantra; donate black sesame seeds and blankets on Saturdays.'
      },
      9: {
        house: 9,
        bulletPoints: [
          'Intense interest in foreign travel, international cultures & global study',
          'Different, unorthodox or revolutionary spiritual beliefs',
          'Distance or philosophical differences from father/traditional gurus',
          'Success in foreign universities, global law & cross-border publishing',
          'Re-interprets ancient spiritual wisdom through a modern lens'
        ],
        summary: 'Rahu in 9th house breaks orthodox boundaries, fostering global fame, foreign doctorates, international travel, and modern philosophical thought.',
        strengths: ['Cosmopolitan worldview', 'Global travel and publishing success', 'Philosophical innovation'],
        cautions: ['Rebelling blindly against beneficial traditions', 'Disrespect toward genuine teachers'],
        remedy: 'Honor your father and gurus; donate yellow and blue items to the needy.'
      },
      10: {
        house: 10,
        bulletPoints: [
          'Sky-high ambition, desire for fame, power & public influence',
          'Spectacular success in foreign fields, IT, AI, media, politics & cinema',
          'Rapid, sudden career ascents that captivate public attention',
          'Good for mass communication, advertising & high-tech enterprises',
          'Needs ethical grounding to maintain long-term career heights'
        ],
        summary: 'Rahu in 10th house is a rocket fuel placement for achieving mass fame, political power, tech stardom, and leadership in modern industries.',
        strengths: ['Meteoritic career rise', 'Mass public influence', 'Master of modern industry trends'],
        cautions: ['Risk of sudden reputational scandals if ethics are neglected'],
        remedy: 'Feed stray dogs; keep a silver swastika on your desk; practice truthful leadership.'
      },
      11: {
        house: 11,
        bulletPoints: [
          'Big, sudden financial gains through unusual and modern sources',
          'Vast, expansive network of global, influential & high-tech contacts',
          'Spectacular fulfillment of long-cherished ambitions and desires',
          'Lucrative income from tech startups, internet ventures & foreign capital',
          'Massive social media following and popular public prestige'
        ],
        summary: 'Rahu in 11th house is considered one of its greatest wealth-generating positions, creating multi-millionaires, tech moguls, and viral celebrities.',
        strengths: ['Limitless wealth potential', 'Massive global network', 'Rapid goal manifestation'],
        cautions: ['Superficial friendships', 'Greed driving unsustainable risks'],
        remedy: 'Donate to leprosy patients or blind homes; practice regular charitable giving.'
      },
      12: {
        house: 12,
        bulletPoints: [
          'Expenses on luxury, foreign travel, tech & international lifestyle',
          'High probability of foreign permanent settlement & offshore business',
          'Vivid imagination, foreign dreamscapes & subconscious fascination',
          'Sleep disturbances, over-imagination or nighttime restlessness',
          'Success in international trade, shipping, hospitals & digital exports'
        ],
        summary: 'Rahu in 12th house propels one across oceans into foreign settlement, offshore wealth, global tech trade, and profound subconscious exploration.',
        strengths: ['Global migration success', 'Lucrative foreign exports', 'Unbounded imagination'],
        cautions: ['Insomnia and bedtime phone addiction', 'Financial leakage in foreign lands'],
        remedy: 'Place a piece of saunf (fennel seeds) in a red pouch under pillow; avoid screen use at night.'
      }
    }
  },
  ketu: {
    id: 'ketu',
    name: 'Ketu',
    sanskritName: 'Ketu (South Node)',
    devanagari: 'केतु',
    nature: 'Natural Malefic',
    element: 'Fire / Spiritual Shadow',
    gender: 'Neutral / Spiritual',
    rulingSigns: ['Co-ruler of Scorpio (Vrishchika) & Pisces (Meena)'],
    exaltation: 'Scorpio / Sagittarius',
    debilitation: 'Taurus / Gemini',
    dayOfWeek: 'Tuesday / Thursday night',
    gemstone: 'Cat\'s Eye (Lehsuniya / Chrysoberyl)',
    metal: 'Iron / Mixed metals',
    color: 'Smoky Grey / Multicolored / Brown',
    beejMantra: 'ॐ स्रां स्रीं स्रौं सः केतवे नमः',
    beejMantraTransliteration: 'Om Sraam Sreem Sroum Sah Ketave Namah',
    avatar: '🔱',
    centralDescription: 'Moksha Karaka, Spiritual Liberation, Detachment (Vairagya), Intuition, Past-Life Mastery & Healing.',
    note: 'Ketu gives moksha, detachment and spiritual growth. It reduces material desires, eliminates illusions, and bestows profound inner peace.',
    effects: {
      1: {
        house: 1,
        bulletPoints: [
          'Spiritual, philosophical & deeply introspective thinking',
          'Introverted, mystical & detached from superficial worldly vanity',
          'Spontaneous detachment from material things & ego attachments',
          'Razor-sharp intuition, psychic Sixth Sense & spiritual insight',
          'Independent, enigmatic personality walking a unique soul path'
        ],
        summary: 'Ketu in 1st house creates an old soul, deep mystic, natural yogi, and intuitive seeker who radiates an enigmatic spiritual aura.',
        strengths: ['Profound psychic intuition', 'Detached equanimity', 'Old soul wisdom'],
        cautions: ['Identity confusion or feeling alienated from society', 'Prone to absent-mindedness'],
        remedy: 'Feed street dogs (especially multi-colored/black-and-white); meditate regularly.'
      },
      2: {
        house: 2,
        bulletPoints: [
          'Unhappy or emotionally detached from family expectations at times',
          'Sudden financial ups and downs leading to detachment from wealth',
          'Speech can be cryptic, spiritual, blunt, prophetic or silence-loving',
          'Simple, unpretentious eating habits & detachment from luxury cuisine',
          'Gains through spiritual counseling, research, coding & healing'
        ],
        summary: 'Ketu in 2nd house detaches one from material greed, providing prophetic speech, simple living, and wealth earned through knowledge and healing.',
        strengths: ['Prophetic intuition in speech', 'Freedom from material greed', 'Spiritual counseling skill'],
        cautions: ['Strained family communications due to blunt detachment', 'Irregular savings habits'],
        remedy: 'Apply yellow sandalwood tilak; feed birds daily; speak mindfully during family discussions.'
      },
      3: {
        house: 3,
        bulletPoints: [
          'Exceptional for deep research, technical writing & data analysis',
          'Less interested in trivial worldly socializing and gossip',
          'Spiritual courage & fearlessness grounded in soul conviction',
          'Detached, non-interfering relationship with siblings & peers',
          'Gifted fine motor skills, coding architecture & esoteric authorship'
        ],
        summary: 'Ketu in 3rd house is in an auspicious Upachaya position, granting profound research abilities, esoteric writing mastery, and fearless conviction.',
        strengths: ['Brilliant research and coding mind', 'Fearless spiritual valor', 'Subtle manual mastery'],
        cautions: ['Emotional detachment from siblings', 'Lack of interest in self-promotion'],
        remedy: 'Wear a silver ring or carry silver items; support elder hermits and yogis.'
      },
      4: {
        house: 4,
        bulletPoints: [
          'Detachment from conventional domestic roots or birthplace',
          'Deep interest in spiritual life, inner contemplation & ashrams',
          'Discovers profound peace of mind in seclusion and nature',
          'Detachment from material home attachments and luxury conveyances',
          'Spiritual bond with mother transcending conventional dependency'
        ],
        summary: 'Ketu in 4th house directs the heart inward, turning the soul away from physical luxury toward the eternal palace of inner spiritual tranquility.',
        strengths: ['Inner peace independent of external conditions', 'Spiritual home sanctuary', 'Meditative stillness'],
        cautions: ['Feeling rootless or emotionally detached at home', 'Mother\'s mystical health sensitivities'],
        remedy: 'Serve mother with pure devotion; keep a clean spiritual altar with natural incense at home.'
      },
      5: {
        house: 5,
        bulletPoints: [
          'Detachment from superficial romantic games & worldly praise',
          'Exceptional for mantra initiation, deep meditation & spiritual sadhana',
          'Profound, laser-sharp spiritual and analytical intelligence',
          'Spiritual bond with children or raising independent, wise offspring',
          'Past-life spiritual merit (Purva Punya) unlocking occult intuition'
        ],
        summary: 'Ketu in 5th house is a hallmark of ancient spiritual masters, conferring spontaneous mantra siddhi, deep meditative trance, and creative mysticism.',
        strengths: ['Instant mantra siddhi', 'Deep spiritual comprehension', 'Detached creative purity'],
        cautions: ['Emotional detachment in romance', 'Digestive/stomach sensitivities'],
        remedy: 'Chant Lord Ganesha mantras (Om Gam Ganapataye Namah); offer Durva grass to Ganesha.'
      },
      6: {
        house: 6,
        bulletPoints: [
          'Victory over enemies through subtle spiritual strategy & karma',
          'Exceptional suitability for service, holistic medicine & healing fields',
          'Enemies and competitors collapse through their own misdeeds',
          'Health issues resolve quietly through alternative & natural therapies',
          'Fearless and compassionate attitude toward serving the suffering'
        ],
        summary: 'Ketu in 6th house is an extraordinarily potent placement, neutralizing all enemies without direct conflict and excelling in natural healing arts.',
        strengths: ['Effortless protection from rivals', 'Holistic healing abilities', 'Compassionate service'],
        cautions: ['Mysterious, hard-to-diagnose symptoms', 'Sensitivity to toxins'],
        remedy: 'Feed stray dogs with bread/milk; practice clean Ayurvedic detox routines.'
      },
      7: {
        house: 7,
        bulletPoints: [
          'Detached, spiritual or unconventional dynamic in married life',
          'Attracts a spiritual, introspective, eccentric or ascetic partner',
          'Unconventional relationship that transcends materialistic expectations',
          'Business partnerships based on higher ethical or spiritual principles',
          'Requires conscious communication to bridge emotional distance'
        ],
        summary: 'Ketu in 7th house brings a companion who is an old soul, spiritual practitioner, or eccentric genius, requiring a soul-level connection.',
        strengths: ['Soulmate level spiritual bonding', 'Freedom from marital possessiveness', 'Ethical trade'],
        cautions: ['Emotional aloofness or neglect of physical intimacy'],
        remedy: 'Respect and pray together with partner; worship Lord Ganesha on Sankashti Chaturthi.'
      },
      8: {
        house: 8,
        bulletPoints: [
          'Extremely powerful interest in occult, Tantra & esoteric knowledge',
          'Sudden transformative breakthroughs awakening Kundalini energy',
          'Detachment from partner\'s or family\'s material inheritance',
          'Deep research, paranormal intuition & metaphysical gifts',
          'Profound inner rebirth leaving behind all fear of mortality'
        ],
        summary: 'Ketu is exalted in the 8th house (Scorpio), unlocking legendary psychic intuition, mastery in astrology/Tantra, and total conquest over the fear of death.',
        strengths: ['Supreme occult and Jyotish mastery', 'Kundalini awakening', 'Conquest of fear'],
        cautions: ['Psychological isolation if ungrounded', 'Chronic pelvic health awareness'],
        remedy: 'Chant Maha Mrityunjaya Mantra; donate multi-colored blankets to sadhus.'
      },
      9: {
        house: 9,
        bulletPoints: [
          'Highly spiritual, saintly, philosophical & contemplative soul',
          'Spontaneous detachment from rigid dogmas and materialistic rituals',
          'Passionate interest in Moksha, past-life karma & higher wisdom',
          'Detached, independent or spiritual relationship with father/gurus',
          'Enjoys quiet pilgrimages to remote, secluded sacred Himalayan shrines'
        ],
        summary: 'Ketu in 9th house (in its exaltation in Sagittarius) creates a true enlightened philosopher, wandering ascetic, and seeker of ultimate truth.',
        strengths: ['Transcendental wisdom', 'Spiritual liberation seeker', 'Authentic non-dogmatic dharma'],
        cautions: ['Distrust of conventional religious institutions'],
        remedy: 'Visit ancient holy shrines; offer yellow flags/cloth at mountain temples.'
      },
      10: {
        house: 10,
        bulletPoints: [
          'Detachment from routine corporate rat-races and superficial status',
          'Strong desire to do independent, meaningful or spiritual work',
          'Good for research, spirituality, healing, astrology & social reform',
          'May change careers several times to align with soul mission',
          'Honored for selfless contributions rather than self-aggrandizement'
        ],
        summary: 'Ketu in 10th house frees one from corporate vanity, guiding the individual toward meaningful independent callings, spiritual leadership, and healing.',
        strengths: ['Selfless vocational integrity', 'Mastery in independent fields', 'Spiritual leadership'],
        cautions: ['Sudden loss of interest in mundane corporate jobs'],
        remedy: 'Feed stray dogs on Tuesdays; keep a brass or silver Ganesha idol on work desk.'
      },
      11: {
        house: 11,
        bulletPoints: [
          'Less attachment to material hoarding despite wealth accumulation',
          'Financial gains earned through spiritual, consulting or hidden sources',
          'Small, tightly-knit, authentic & spiritually-aligned circle of friends',
          'Fulfillment of spiritual desires and detachment from worldly fads',
          'Philanthropic generosity that benefits orphanages and ashrams'
        ],
        summary: 'Ketu in 11th house brings unexpected wealth through specialized, spiritual or tech knowledge, with an enlightened detachment from material vanity.',
        strengths: ['Spiritual wealth inflow', 'Pure authentic friendships', 'Detached philanthropy'],
        cautions: ['Sudden desire to cut off friends who engage in gossip'],
        remedy: 'Donate to spiritual schools and animal shelters; chant Ketu Beej Mantra.'
      },
      12: {
        house: 12,
        bulletPoints: [
          'Supreme placement for Moksha (Spiritual Liberation) & enlightenment',
          'Deep capacity for meditation, Samadhi & transcendental consciousness',
          'Detachment from material world, finding ecstasy in inner stillness',
          'Expenses directed toward spiritual retreats, charities & secret aid',
          'Peaceful, blissful sleep and freedom from karmic cycles'
        ],
        summary: 'Ketu in 12th house (in its natural abode of Pisces) is celebrated as the ultimate hallmark of Moksha, ensuring spiritual emancipation and divine oneness.',
        strengths: ['Attainment of Moksha', 'Samadhi in meditation', 'Divine peace and intuition'],
        cautions: ['Disconnection from mundane worldly responsibilities if ungrounded'],
        remedy: 'Dedicate daily time to silent meditation; feed birds and stray animals.'
      }
    }
  }
};

export const ZODIAC_SIGNS = [
  { id: 1, name: 'Aries', sanskritName: 'Mesha (मेष)', symbol: '♈', element: 'Fire', quality: 'Movable', lord: 'Mars' },
  { id: 2, name: 'Taurus', sanskritName: 'Vrishabha (वृषभ)', symbol: '♉', element: 'Earth', quality: 'Fixed', lord: 'Venus' },
  { id: 3, name: 'Gemini', sanskritName: 'Mithuna (मिथुन)', symbol: '♊', element: 'Air', quality: 'Dual', lord: 'Mercury' },
  { id: 4, name: 'Cancer', sanskritName: 'Karka (कर्क)', symbol: '♋', element: 'Water', quality: 'Movable', lord: 'Moon' },
  { id: 5, name: 'Leo', sanskritName: 'Simha (सिंह)', symbol: '♌', element: 'Fire', quality: 'Fixed', lord: 'Sun' },
  { id: 6, name: 'Virgo', sanskritName: 'Kanya (कन्या)', symbol: '♍', element: 'Earth', quality: 'Dual', lord: 'Mercury' },
  { id: 7, name: 'Libra', sanskritName: 'Tula (तुला)', symbol: '♎', element: 'Air', quality: 'Movable', lord: 'Venus' },
  { id: 8, name: 'Scorpio', sanskritName: 'Vrishchika (वृश्चिक)', symbol: '♏', element: 'Water', quality: 'Fixed', lord: 'Mars & Ketu' },
  { id: 9, name: 'Sagittarius', sanskritName: 'Dhanu (धनु)', symbol: '♐', element: 'Fire', quality: 'Dual', lord: 'Jupiter' },
  { id: 10, name: 'Capricorn', sanskritName: 'Makara (मकर)', symbol: '♑', element: 'Earth', quality: 'Movable', lord: 'Saturn' },
  { id: 11, name: 'Aquarius', sanskritName: 'Kumbha (कुम्भ)', symbol: '♒', element: 'Air', quality: 'Fixed', lord: 'Saturn & Rahu' },
  { id: 12, name: 'Pisces', sanskritName: 'Meena (मीन)', symbol: '♓', element: 'Water', quality: 'Dual', lord: 'Jupiter & Ketu' },
];
