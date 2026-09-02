import React, { useState } from 'react';
import { X, Printer, Sparkles, Compass, Award, ShieldCheck, Heart, Zap, FileText, CheckCircle2 } from 'lucide-react';
import { HouseNumber, PlanetId, ChartStyle } from '../types/astrology';
import { HOUSES_DATA, NORTH_CHART_GEOMETRY } from '../data/housesData';
import { PLANETS_DATA } from '../data/planetsData';

interface CustomReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  placements: Record<PlanetId, HouseNumber>;
  chartStyle?: ChartStyle;
  initialName?: string;
  initialLagna?: string;
  initialBirthDetails?: string;
}

const ZODIAC_SIGNS = [
  'Aries (Mesha) ♈',
  'Taurus (Vrishabha) ♉',
  'Gemini (Mithuna) ♊',
  'Cancer (Karka) ♋',
  'Leo (Simha) ♌',
  'Virgo (Kanya) ♍',
  'Libra (Tula) ♎',
  'Scorpio (Vrischika) ♏',
  'Sagittarius (Dhanu) ♐',
  'Capricorn (Makara) ♑',
  'Aquarius (Kumbha) ♒',
  'Pisces (Meena) ♓',
];

export const CustomReportModal: React.FC<CustomReportModalProps> = ({
  isOpen,
  onClose,
  placements,
  chartStyle: initialChartStyle = 'north',
  initialName = 'Native',
  initialLagna = 'Aries (Mesha) ♈',
  initialBirthDetails = '',
}) => {
  const [nativeName, setNativeName] = useState(initialName);
  const [lagnaSign, setLagnaSign] = useState(initialLagna);
  const [birthDetails, setBirthDetails] = useState(initialBirthDetails);
  const [reportChartStyle, setReportChartStyle] = useState<ChartStyle>(initialChartStyle);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const getOrdinal = (n: number) => {
    const s = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  };

  // Group planets by house
  const houseOccupants: Record<HouseNumber, PlanetId[]> = {
    1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: [], 10: [], 11: [], 12: []
  };
  Object.entries(placements).forEach(([pId, hNum]) => {
    houseOccupants[hNum as HouseNumber].push(pId as PlanetId);
  });

  // Calculate Vedic Yogas
  const detectYogas = () => {
    const yogas: { name: string; type: 'Auspicious Raja Yoga' | 'Wealth & Dharma' | 'Wisdom' | 'Special Formation' | 'Planetary Dosha'; desc: string; planets: string }[] = [];

    const jupH = placements.jupiter;
    const moonH = placements.moon;
    const sunH = placements.sun;
    const mercH = placements.mercury;
    const marsH = placements.mars;
    const venH = placements.venus;
    const satH = placements.saturn;
    const rahuH = placements.rahu;
    const ketuH = placements.ketu;

    const kendras: HouseNumber[] = [1, 4, 7, 10];
    const trikonas: HouseNumber[] = [1, 5, 9];

    // Gajakesari Yoga: Jupiter and Moon in mutual kendras or both in kendras
    const isMutualKendra = Math.abs(jupH - moonH) === 0 || Math.abs(jupH - moonH) === 3 || Math.abs(jupH - moonH) === 6 || Math.abs(jupH - moonH) === 9;
    if ((kendras.includes(jupH) && kendras.includes(moonH)) || isMutualKendra) {
      yogas.push({
        name: 'Gajakesari Yoga (गजकेसरी योग)',
        type: 'Auspicious Raja Yoga',
        desc: 'Jupiter and Moon occupy Kendra positions relative to each other, conferring nobility, high wisdom, lasting social repute, and protection from adversity.',
        planets: 'Jupiter (Guru) & Moon (Chandra)',
      });
    }

    // Budhaditya Yoga: Sun & Mercury in same house
    if (sunH === mercH) {
      yogas.push({
        name: 'Budhaditya Yoga (बुधादित्य योग)',
        type: 'Wisdom',
        desc: `Sun and Mercury conjunct in the ${getOrdinal(sunH)} House, fostering sharp analytical intellect, executive speech, administrative talent, and educational acclaim.`,
        planets: 'Sun (Surya) & Mercury (Budha)',
      });
    }

    // Chandra-Mangala Yoga: Moon & Mars conjunct
    if (moonH === marsH) {
      yogas.push({
        name: 'Chandra-Mangala Yoga (चन्द्र-मङ्गल योग)',
        type: 'Wealth & Dharma',
        desc: `Moon and Mars united in the ${getOrdinal(moonH)} House, bestowing relentless enterprise, commercial acumen, material prosperity, and real estate acumen.`,
        planets: 'Moon (Chandra) & Mars (Mangal)',
      });
    }

    // Guru-Mangala Yoga
    if (jupH === marsH) {
      yogas.push({
        name: 'Guru-Mangala Yoga (गुरु-मङ्गल योग)',
        type: 'Auspicious Raja Yoga',
        desc: `Jupiter and Mars conjunction in the ${getOrdinal(jupH)} House, giving righteous leadership, moral courage, energetic execution, and respect in authoritative circles.`,
        planets: 'Jupiter (Guru) & Mars (Mangal)',
      });
    }

    // Lakshmi Yoga: Venus in 1st, 5th, or 9th house, or strong in Kendras
    if (trikonas.includes(venH) || venH === 2 || venH === 11) {
      yogas.push({
        name: 'Lakshmi Yoga / Dhana Yoga (लक्ष्मी योग)',
        type: 'Wealth & Dharma',
        desc: `Venus favorably placed in the ${getOrdinal(venH)} House, blessing the native with aesthetic elegance, artistic abundance, domestic joy, and reliable wealth streams.`,
        planets: 'Venus (Shukra)',
      });
    }

    // Amala Yoga: Benefic (Jupiter, Venus, or Mercury) in 10th house
    if (jupH === 10 || venH === 10 || mercH === 10) {
      yogas.push({
        name: 'Amala Yoga (अमला योग)',
        type: 'Auspicious Raja Yoga',
        desc: 'Natural benefic planet in the 10th House of Career, indicating pure reputation, professional integrity, philanthropic deeds, and lasting public honor.',
        planets: [jupH === 10 ? 'Jupiter' : '', venH === 10 ? 'Venus' : '', mercH === 10 ? 'Mercury' : ''].filter(Boolean).join(', '),
      });
    }

    // Dharma-Karmadhipati Raja Yoga: 9th & 10th house connection
    if ((sunH === 9 && marsH === 10) || (jupH === 9 && satH === 10) || (placements.sun === 10 && placements.jupiter === 9)) {
      yogas.push({
        name: 'Dharma-Karmadhipati Yoga (धर्म-कर्माधिपति योग)',
        type: 'Auspicious Raja Yoga',
        desc: 'Integration between 9th House of Destiny and 10th House of Action, creating high governmental status, purpose-driven vocation, and societal triumph.',
        planets: '9th & 10th House Lords / Occupants',
      });
    }

    // Saraswati Yoga: Mercury, Jupiter, Venus in Kendras/Trikonas/2nd house
    const beneficsInGoodHouses = [mercH, jupH, venH].every(h => kendras.includes(h) || trikonas.includes(h) || h === 2);
    if (beneficsInGoodHouses) {
      yogas.push({
        name: 'Saraswati Yoga (सरस्वती योग)',
        type: 'Wisdom',
        desc: 'All three primary benefic planets (Mercury, Jupiter, Venus) positioned in auspicious houses, granting mastery over sciences, arts, speech, and literature.',
        planets: 'Mercury, Jupiter & Venus',
      });
    }

    // Vipareeta Raja Yoga (Sarala / Harsha / Vimala): 6th, 8th, 12th lords or placements
    if ([6, 8, 12].includes(satH) || [6, 8, 12].includes(marsH)) {
      yogas.push({
        name: 'Vipareeta Raja Yoga Influences (विपरीत राजयोग)',
        type: 'Special Formation',
        desc: 'Planetary energy placed in trik/dusthana houses converting sudden obstacles and competitive rivalries into unexpected breakthroughs and triumph.',
        planets: 'Dusthana House Activations',
      });
    }

    // Manglik / Kuja Consideration: Mars in 1, 4, 7, 8, 12
    if ([1, 4, 7, 8, 12].includes(marsH)) {
      yogas.push({
        name: 'Kuja / Manglik Consideration (मङ्गल स्थिति)',
        type: 'Planetary Dosha',
        desc: `Mars positioned in the ${getOrdinal(marsH)} House requires conscious energy channeling in partnerships, dynamic communication, and mutual patience in marital dynamics.`,
        planets: 'Mars (Mangal)',
      });
    }

    // Raja Yoga (Kendra + Trikona Lord Activations)
    if (kendras.includes(sunH) && trikonas.includes(jupH)) {
      yogas.push({
        name: 'Maharaja Yoga (साम्राज्य योग)',
        type: 'Auspicious Raja Yoga',
        desc: 'Powerful alignment of Solar authority and Jovian wisdom across prime quadrants, ensuring executive leadership and high social esteem.',
        planets: 'Sun & Jupiter Synergy',
      });
    }

    return yogas;
  };

  const detectedYogas = detectYogas();

  // Summary counts
  const kendraCount = (Object.keys(placements) as PlanetId[]).filter(p => [1, 4, 7, 10].includes(placements[p])).length;
  const trikonaCount = (Object.keys(placements) as PlanetId[]).filter(p => [1, 5, 9].includes(placements[p])).length;
  const upachayaCount = (Object.keys(placements) as PlanetId[]).filter(p => [3, 6, 10, 11].includes(placements[p])).length;
  const dusthanaCount = (Object.keys(placements) as PlanetId[]).filter(p => [6, 8, 12].includes(placements[p])).length;

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      {/* CSS Print Rules */}
      <style>{`
        @media print {
          body * {
            visibility: hidden !important;
          }
          #printable-report-area, #printable-report-area * {
            visibility: visible !important;
          }
          #printable-report-area {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            margin: 0 !important;
            padding: 20px !important;
            background: white !important;
            color: black !important;
            box-shadow: none !important;
            border: none !important;
          }
          .no-print {
            display: none !important;
          }
          .page-break {
            page-break-before: always;
          }
        }
      `}</style>

      <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[94vh] shadow-2xl border border-stone-200 flex flex-col overflow-hidden">
        
        {/* Modal Top Interactive Toolbar (Hidden during print) */}
        <div className="p-4 bg-[#FAF8F5] border-b border-stone-200 flex flex-wrap items-center justify-between gap-3 no-print">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-900 text-amber-100 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-vedic font-bold text-amber-950 text-base leading-tight">
                Vedic Kundli Janam Patrika & Horoscope Report
              </h3>
              <p className="text-[11px] text-stone-500">
                Customized for all 9 Navagraha house positions
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              id="btn-print-custom-report"
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-amber-900 text-amber-50 hover:bg-amber-950 text-xs font-bold flex items-center gap-2 shadow-sm transition-all active:scale-95"
            >
              <Printer className="w-4 h-4 text-amber-300" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-stone-500 hover:text-stone-800 hover:bg-stone-200 transition-colors"
              aria-label="Close report modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* User Configuration Bar (Editable metadata before printing) */}
        <div className="px-5 py-3 bg-amber-50/60 border-b border-amber-900/10 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs no-print">
          <div>
            <label className="block text-[11px] font-bold text-amber-950 mb-1">
              Person / Native Name:
            </label>
            <input
              type="text"
              value={nativeName}
              onChange={(e) => setNativeName(e.target.value)}
              placeholder="e.g. Himaghna Medhi"
              className="w-full bg-white border border-stone-300 rounded-lg px-2.5 py-1.5 text-xs text-stone-800 focus:ring-1 focus:ring-amber-800 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-amber-950 mb-1">
              Ascendant / Lagna Sign:
            </label>
            <select
              value={lagnaSign}
              onChange={(e) => setLagnaSign(e.target.value)}
              className="w-full bg-white border border-stone-300 rounded-lg px-2 py-1.5 text-xs text-stone-800 focus:ring-1 focus:ring-amber-800 focus:outline-none"
            >
              {ZODIAC_SIGNS.map((sign) => (
                <option key={sign} value={sign}>
                  {sign}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-amber-950 mb-1">
              Birth Details / Place (Optional):
            </label>
            <input
              type="text"
              value={birthDetails}
              onChange={(e) => setBirthDetails(e.target.value)}
              placeholder="e.g. 14 May 1995, 08:30 AM, Guwahati"
              className="w-full bg-white border border-stone-300 rounded-lg px-2.5 py-1.5 text-xs text-stone-800 focus:ring-1 focus:ring-amber-800 focus:outline-none"
            />
          </div>
        </div>

        {/* Printable Report Document Body */}
        <div id="printable-report-area" className="p-6 sm:p-8 overflow-y-auto flex-1 bg-white space-y-8 text-stone-900">
          
          {/* Document Header & Sacred Invocation */}
          <div className="border-b-2 border-stone-800 pb-5 text-center space-y-2">
            <div className="flex items-center justify-between text-xs text-stone-500 font-serif mb-1">
              <span>॥ श्री गणेशाय नमः ॥</span>
              <span className="font-semibold text-amber-900 font-vedic">VEDIC ASTROLOGY HOROSCOPE</span>
              <span>॥ ॐ नमः शिवाय ॥</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold font-vedic text-stone-900 tracking-tight">
              KUNDLI JANAM PATRIKA & BHAVA ANALYSIS REPORT
            </h1>
            
            <p className="text-xs text-stone-600 max-w-2xl mx-auto">
              Comprehensive Vedic horoscope analysis for 12 Bhavas, 9 Navagrahas, classical planetary yogas, and personalized karmic remedies.
            </p>

            {/* Native Info Strip */}
            <div className="mt-4 pt-3 border-t border-stone-200 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs bg-stone-50 p-3 rounded-xl border">
              <div>
                <span className="text-stone-500 block text-[10.5px]">Native Name:</span>
                <strong className="text-stone-900 font-bold">{nativeName || 'Native'}</strong>
              </div>
              <div>
                <span className="text-stone-500 block text-[10.5px]">Lagna (Ascendant):</span>
                <strong className="text-amber-950 font-bold">{lagnaSign}</strong>
              </div>
              <div>
                <span className="text-stone-500 block text-[10.5px]">Chart Format:</span>
                <strong className="text-stone-900 font-bold">
                  {reportChartStyle === 'north' ? 'North Indian (Diamond)' : 'South Indian (Box)'}
                </strong>
              </div>
              <div>
                <span className="text-stone-500 block text-[10.5px]">Report Date:</span>
                <strong className="text-stone-900 font-bold">{new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</strong>
              </div>
              {birthDetails && (
                <div className="col-span-2 sm:col-span-4 text-left pt-1 border-t border-stone-200/60">
                  <span className="text-stone-500 text-[10.5px] mr-1">Birth Record:</span>
                  <strong className="text-stone-800">{birthDetails}</strong>
                </div>
              )}
            </div>
          </div>

          {/* Chart Core Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center text-xs">
            <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200">
              <span className="text-[10.5px] font-semibold text-amber-800 block">Kendra Power (1, 4, 7, 10)</span>
              <strong className="text-base text-amber-950 font-bold">{kendraCount} Planets</strong>
            </div>
            <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200">
              <span className="text-[10.5px] font-semibold text-emerald-800 block">Trikona Fortune (1, 5, 9)</span>
              <strong className="text-base text-emerald-950 font-bold">{trikonaCount} Planets</strong>
            </div>
            <div className="p-2.5 bg-blue-50 rounded-xl border border-blue-200">
              <span className="text-[10.5px] font-semibold text-blue-800 block">Upachaya Growth (3, 6, 10, 11)</span>
              <strong className="text-base text-blue-950 font-bold">{upachayaCount} Planets</strong>
            </div>
            <div className="p-2.5 bg-rose-50 rounded-xl border border-rose-200">
              <span className="text-[10.5px] font-semibold text-rose-800 block">Dusthana Transits (6, 8, 12)</span>
              <strong className="text-base text-rose-950 font-bold">{dusthanaCount} Planets</strong>
            </div>
          </div>

          {/* Kundli SVG Chart & Planetary Positions Table */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Left: Rendered Visual SVG Kundli Chart */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center p-3 bg-stone-50 rounded-2xl border border-stone-200">
              <span className="text-xs font-bold text-amber-950 font-vedic mb-2">
                {reportChartStyle === 'north' ? 'North Indian Diamond Chart (लग्न चक्र)' : 'South Indian Chart'}
              </span>

              {reportChartStyle === 'north' ? (
                <svg
                  viewBox="0 0 400 400"
                  className="w-full max-w-[280px] h-auto bg-[#FFFDF9] rounded-xl border border-amber-900/20 shadow-xs"
                >
                  {/* Chart Outer Box */}
                  <rect x="0" y="0" width="400" height="400" fill="#FAF8F5" stroke="#78350f" strokeWidth="2" />
                  {/* Diagonal Lines */}
                  <line x1="0" y1="0" x2="400" y2="400" stroke="#78350f" strokeWidth="1.5" />
                  <line x1="400" y1="0" x2="0" y2="400" stroke="#78350f" strokeWidth="1.5" />
                  {/* Diamond Lines */}
                  <line x1="200" y1="0" x2="0" y2="200" stroke="#78350f" strokeWidth="1.5" />
                  <line x1="0" y1="200" x2="200" y2="400" stroke="#78350f" strokeWidth="1.5" />
                  <line x1="200" y1="400" x2="400" y2="200" stroke="#78350f" strokeWidth="1.5" />
                  <line x1="400" y1="200" x2="200" y2="0" stroke="#78350f" strokeWidth="1.5" />

                  {/* House Numbers and Occupants */}
                  {([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as HouseNumber[]).map((hNum) => {
                    const geo = NORTH_CHART_GEOMETRY[hNum];
                    const occupants = houseOccupants[hNum];

                    return (
                      <g key={hNum}>
                        <text
                          x={geo.labelX}
                          y={geo.labelY}
                          textAnchor="middle"
                          fill="#78350f"
                          fontSize="11"
                          fontWeight="bold"
                        >
                          {hNum}
                        </text>

                        {occupants.length > 0 && (
                          <text
                            x={geo.badgeX}
                            y={geo.badgeY}
                            textAnchor="middle"
                            fill="#92400e"
                            fontSize="9.5"
                            fontWeight="bold"
                          >
                            {occupants.map(p => PLANETS_DATA[p].sanskritName.slice(0, 2)).join(' ')}
                          </text>
                        )}
                      </g>
                    );
                  })}
                </svg>
              ) : (
                <div className="w-full max-w-[280px] grid grid-cols-4 grid-rows-4 gap-1 p-2 bg-amber-50 rounded-xl border border-stone-300 aspect-square text-[10px]">
                  {([12, 1, 2, 3, 11, 0, 0, 4, 10, 0, 0, 5, 9, 8, 7, 6] as number[]).map((hNum, idx) => {
                    if (hNum === 0) {
                      if (idx === 5) {
                        return (
                          <div key={idx} className="col-span-2 row-span-2 bg-[#FFFDF9] flex items-center justify-center p-2 text-center border border-stone-200 rounded">
                            <span className="font-vedic font-bold text-amber-950 text-xs">South Chart</span>
                          </div>
                        );
                      }
                      return null;
                    }
                    const num = hNum as HouseNumber;
                    const occupants = houseOccupants[num];
                    return (
                      <div key={idx} className="bg-white p-1 border border-stone-200 rounded flex flex-col justify-between">
                        <span className="font-bold text-amber-900">{num}H</span>
                        <span className="text-[8.5px] font-semibold text-stone-700">
                          {occupants.map(p => PLANETS_DATA[p].name.slice(0, 2)).join(', ')}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}

              <p className="text-[10px] text-stone-500 mt-2 text-center">
                Numbered 1 to 12 as per classical Bhava progression
              </p>
            </div>

            {/* Right: 9 Navagraha Positions Table */}
            <div className="lg:col-span-7 space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-800 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                Navagraha Planetary Positions & Dignities:
              </h3>
              
              <div className="border border-stone-300 rounded-xl overflow-hidden text-xs">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-stone-100 text-stone-800 font-bold border-b border-stone-300 text-[11px]">
                    <tr>
                      <th className="p-2 border-r border-stone-300">Graha</th>
                      <th className="p-2 border-r border-stone-300">House</th>
                      <th className="p-2 border-r border-stone-300">Bhava Name</th>
                      <th className="p-2 border-r border-stone-300">Gemstone</th>
                      <th className="p-2">Beej Mantra</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200 text-[11px]">
                    {(Object.keys(PLANETS_DATA) as PlanetId[]).map((pId) => {
                      const p = PLANETS_DATA[pId];
                      const hNum = placements[pId];
                      const h = HOUSES_DATA[hNum];
                      return (
                        <tr key={pId} className="hover:bg-amber-50/40">
                          <td className="p-2 font-bold text-stone-900 border-r border-stone-200">
                            {p.avatar} {p.name} ({p.sanskritName})
                          </td>
                          <td className="p-2 font-bold text-amber-900 border-r border-stone-200">
                            {getOrdinal(hNum)} House
                          </td>
                          <td className="p-2 text-stone-700 font-vedic border-r border-stone-200">
                            {h.sanskritName.split(' ')[0]}
                          </td>
                          <td className="p-2 text-stone-700 border-r border-stone-200">
                            {p.gemstone}
                          </td>
                          <td className="p-2 text-stone-600 font-mono text-[10px] truncate max-w-[120px]" title={p.beejMantra}>
                            {p.beejMantra}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          {/* Detected Classical Vedic Yogas */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between border-b border-stone-300 pb-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900 font-vedic flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-700" />
                Detected Classical Vedic Yogas & Formations ({detectedYogas.length})
              </h3>
              <span className="text-[11px] text-stone-500 font-semibold">Parashara & Jaimini Principles</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {detectedYogas.map((yoga, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl border border-stone-200 bg-[#FAF8F5] space-y-1.5 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-950 font-vedic text-xs">
                      {yoga.name}
                    </span>
                    <span className="text-[9.5px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-semibold">
                      {yoga.type}
                    </span>
                  </div>
                  <p className="text-stone-700 leading-relaxed text-[11.5px]">
                    {yoga.desc}
                  </p>
                  <div className="text-[10px] text-stone-500 pt-1 border-t border-stone-200 flex justify-between">
                    <span>Involved Grahas:</span>
                    <strong className="text-stone-800">{yoga.planets}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Comprehensive 12 Bhavas Horoscope Interpretations */}
          <div className="space-y-3 pt-2 page-break">
            <div className="border-b border-stone-300 pb-2 flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900 font-vedic flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-amber-700" />
                Comprehensive 12 Bhavas (Houses) Life Interpretations
              </h3>
              <span className="text-[11px] text-stone-500 font-semibold">House-by-House Destiny Breakdown</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as HouseNumber[]).map((hNum) => {
                const h = HOUSES_DATA[hNum];
                const occupants = houseOccupants[hNum];

                return (
                  <div
                    key={hNum}
                    className="p-3.5 rounded-xl border border-stone-200 bg-white space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between border-b border-stone-100 pb-1.5">
                      <div className="flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-amber-900 text-amber-50 flex items-center justify-center font-bold text-[10px]">
                          {hNum}
                        </span>
                        <div>
                          <strong className="text-amber-950 font-vedic text-xs block">{h.sanskritName}</strong>
                          <span className="text-[10px] text-stone-500">{h.name}</span>
                        </div>
                      </div>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-stone-100 text-stone-700 font-semibold">
                        {h.classification.category}
                      </span>
                    </div>

                    {/* Occupants & Detailed predictions */}
                    {occupants.length > 0 ? (
                      <div className="space-y-1.5 pt-1">
                        <div className="flex flex-wrap gap-1">
                          {occupants.map((pId) => (
                            <span key={pId} className="px-2 py-0.5 rounded bg-amber-100/80 text-amber-950 text-[10.5px] font-bold">
                              {PLANETS_DATA[pId].avatar} {PLANETS_DATA[pId].name}
                            </span>
                          ))}
                        </div>
                        {occupants.map((pId) => (
                          <p key={pId} className="text-stone-700 text-[11.5px] leading-relaxed">
                            <strong>{PLANETS_DATA[pId].name} in {getOrdinal(hNum)} House:</strong> {PLANETS_DATA[pId].effects[hNum].summary}
                          </p>
                        ))}
                      </div>
                    ) : (
                      <div className="text-stone-500 italic text-[11px] py-1">
                        Empty House. Influenced by natural ruler ({h.naturalLord}) and planetary aspects. {h.keySignifications.slice(0, 2).join(', ')}.
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Astrological Remedies & Karmic Guidance */}
          <div className="space-y-3 pt-2">
            <div className="border-b border-stone-300 pb-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900 font-vedic flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-700" />
                Vedic Remedies, Gemstones & Spiritual Harmonization
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl border border-stone-200 bg-amber-50/50 space-y-1.5">
                <h4 className="font-bold text-amber-950 flex items-center gap-1 font-vedic">
                  <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                  Gemstone & Metal Guidance
                </h4>
                <p className="text-[11px] text-stone-600 leading-relaxed">
                  Strengthen your Lagna Lord and Trikona benefics (Sun: Ruby in Copper, Jupiter: Yellow Sapphire in Gold, Moon: Pearl in Silver).
                </p>
              </div>

              <div className="p-3 rounded-xl border border-stone-200 bg-emerald-50/50 space-y-1.5">
                <h4 className="font-bold text-emerald-950 flex items-center gap-1 font-vedic">
                  <Heart className="w-3.5 h-3.5 text-emerald-700" />
                  Mantra Sadhana & Japa
                </h4>
                <p className="text-[11px] text-stone-600 leading-relaxed">
                  Recite the Gayatri Mantra at sunrise, and chant the Navagraha Beej Mantras on respective planetary weekdays for peace and clarity.
                </p>
              </div>

              <div className="p-3 rounded-xl border border-stone-200 bg-blue-50/50 space-y-1.5">
                <h4 className="font-bold text-blue-950 flex items-center gap-1 font-vedic">
                  <Zap className="w-3.5 h-3.5 text-blue-700" />
                  Karmic Charity (Dana)
                </h4>
                <p className="text-[11px] text-stone-600 leading-relaxed">
                  Feed birds on Saturdays for Saturn/Rahu pacification, support teachers and scholars on Thursdays for Jupiter, and offer water to the Sun.
                </p>
              </div>
            </div>
          </div>

          {/* Report Footer & Attribution */}
          <div className="pt-4 border-t-2 border-stone-800 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 gap-2">
            <span>goodastrology • Vedic Astrology Kundli Janam Patrika</span>
            <span className="font-semibold text-stone-700">Developed by Himaghna Medhi</span>
          </div>

        </div>

      </div>
    </div>
  );
};
