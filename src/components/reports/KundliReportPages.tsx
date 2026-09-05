import React from 'react';
import { HouseNumber, PlanetId, ChartStyle } from '../../types/astrology';
import { HOUSES_DATA, NORTH_CHART_GEOMETRY } from '../../data/housesData';
import { PLANETS_DATA } from '../../data/planetsData';
import { Sparkles, Award, Compass, ShieldCheck, Heart, Zap, CheckCircle2 } from 'lucide-react';

interface KundliReportPagesProps {
  nativeName: string;
  lagnaSign: string;
  birthDetails: string;
  reportChartStyle: ChartStyle;
  placements: Record<PlanetId, HouseNumber>;
  houseOccupants: Record<HouseNumber, PlanetId[]>;
  detectedYogas: { name: string; type: string; desc: string; planets: string }[];
  kendraCount: number;
  trikonaCount: number;
  upachayaCount: number;
  dusthanaCount: number;
}

export const KundliReportPages: React.FC<KundliReportPagesProps> = ({
  nativeName,
  lagnaSign,
  birthDetails,
  reportChartStyle,
  placements,
  houseOccupants,
  detectedYogas,
  kendraCount,
  trikonaCount,
  upachayaCount,
  dusthanaCount,
}) => {
  const getOrdinal = (n: number) => {
    const s = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  };

  const currentDate = new Date().toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="space-y-6">
      {/* PAGE 1: NATAL KUNDLI & GRAHA MATRIX */}
      <div className="a4-report-page bg-white text-stone-900 border border-stone-200 shadow-md mx-auto relative flex flex-col justify-between p-6 sm:p-7">
        {/* Ornate Inner Double Border with Corner Accents */}
        <div className="border-2 border-amber-900/50 rounded-xl p-4 sm:p-5 flex-1 flex flex-col justify-between relative bg-[#FCFBF9]">
          
          {/* Decorative Corner Filigree Marks */}
          <span className="absolute top-1 left-1.5 text-amber-900/40 text-xs font-serif select-none">❖</span>
          <span className="absolute top-1 right-1.5 text-amber-900/40 text-xs font-serif select-none">❖</span>
          <span className="absolute bottom-1 left-1.5 text-amber-900/40 text-xs font-serif select-none">❖</span>
          <span className="absolute bottom-1 right-1.5 text-amber-900/40 text-xs font-serif select-none">❖</span>

          {/* Section 1: Sacred Header & Invocation */}
          <div className="text-center border-b border-amber-900/30 pb-3">
            <div className="flex items-center justify-between text-[11px] text-amber-950 font-serif tracking-wide px-2 mb-1">
              <span>॥ श्री गणेशाय नमः ॥</span>
              <span className="font-bold uppercase tracking-widest text-[10px] text-amber-900 font-vedic">
                Vedic Horoscope &amp; Janam Patrika
              </span>
              <span>॥ ॐ नमः शिवाय ॥</span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black font-vedic text-amber-950 tracking-tight leading-tight">
              VEDIC JANAM PATRIKA &amp; NAVAGRAHA DOSSIER
            </h1>
            <p className="text-[10.5px] text-stone-600 max-w-xl mx-auto mt-0.5">
              Classical Maharishi Parashara Horashastra Astrological Evaluation of Bhavas, Graha Matrix &amp; Yogas
            </p>

            {/* Native Demographics Strip */}
            <div className="mt-2.5 pt-2 border-t border-amber-900/20 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] bg-white/90 p-2.5 rounded-lg border border-amber-900/15">
              <div className="text-left">
                <span className="text-stone-500 block text-[9.5px] uppercase font-semibold">Native Name</span>
                <strong className="text-amber-950 font-bold truncate block">{nativeName || 'Auspicious Native'}</strong>
              </div>
              <div className="text-left">
                <span className="text-stone-500 block text-[9.5px] uppercase font-semibold">Lagna (Ascendant)</span>
                <strong className="text-stone-900 font-bold block">{lagnaSign}</strong>
              </div>
              <div className="text-left">
                <span className="text-stone-500 block text-[9.5px] uppercase font-semibold">Chart Geometry</span>
                <strong className="text-stone-900 font-bold block">
                  {reportChartStyle === 'north' ? 'North Diamond' : 'South Indian Grid'}
                </strong>
              </div>
              <div className="text-left">
                <span className="text-stone-500 block text-[9.5px] uppercase font-semibold">Certification Date</span>
                <strong className="text-stone-900 font-bold block">{currentDate}</strong>
              </div>
              {birthDetails && (
                <div className="col-span-2 sm:col-span-4 text-left pt-1.5 border-t border-stone-200/80 text-[10px]">
                  <span className="text-stone-500 font-medium mr-1.5">Recorded Birth Particulars:</span>
                  <strong className="text-stone-800 font-semibold">{birthDetails}</strong>
                </div>
              )}
            </div>
          </div>

          {/* Section 2: 4 Astrological House Balance Quadrants */}
          <div className="grid grid-cols-4 gap-2 text-center text-xs my-2.5">
            <div className="p-2 bg-amber-50/90 rounded-lg border border-amber-200/80">
              <span className="text-[9.5px] font-bold text-amber-900 uppercase block tracking-tight">Kendra (1,4,7,10)</span>
              <strong className="text-sm font-extrabold text-amber-950 block">{kendraCount} Grahas</strong>
              <span className="text-[8.5px] text-amber-800/80 block">Vitality &amp; Action</span>
            </div>
            <div className="p-2 bg-emerald-50/90 rounded-lg border border-emerald-200/80">
              <span className="text-[9.5px] font-bold text-emerald-900 uppercase block tracking-tight">Trikona (1,5,9)</span>
              <strong className="text-sm font-extrabold text-emerald-950 block">{trikonaCount} Grahas</strong>
              <span className="text-[8.5px] text-emerald-800/80 block">Purva Punya &amp; Luck</span>
            </div>
            <div className="p-2 bg-blue-50/90 rounded-lg border border-blue-200/80">
              <span className="text-[9.5px] font-bold text-blue-900 uppercase block tracking-tight">Upachaya (3,6,10,11)</span>
              <strong className="text-sm font-extrabold text-blue-950 block">{upachayaCount} Grahas</strong>
              <span className="text-[8.5px] text-blue-800/80 block">Continuous Growth</span>
            </div>
            <div className="p-2 bg-stone-100/90 rounded-lg border border-stone-300/80">
              <span className="text-[9.5px] font-bold text-stone-700 uppercase block tracking-tight">Dusthana (6,8,12)</span>
              <strong className="text-sm font-extrabold text-stone-900 block">{dusthanaCount} Grahas</strong>
              <span className="text-[8.5px] text-stone-600 block">Karmic Elevation</span>
            </div>
          </div>

          {/* Section 3: Visual Chart (Left) + Navagraha Table (Right) */}
          <div className="grid grid-cols-12 gap-3.5 items-center my-1">
            {/* Visual SVG Chart (5 columns) */}
            <div className="col-span-5 flex flex-col items-center justify-center p-2.5 bg-white rounded-xl border border-amber-900/20 shadow-2xs">
              <div className="w-full flex items-center justify-between text-[10px] font-bold text-amber-950 font-vedic mb-1">
                <span>{reportChartStyle === 'north' ? 'North Indian Kundli' : 'South Indian Kundli'}</span>
                <span className="text-[9px] text-amber-800 bg-amber-100 px-1.5 py-0.2 rounded font-sans">Lagna Bhava</span>
              </div>

              {reportChartStyle === 'north' ? (
                <svg
                  viewBox="0 0 400 400"
                  className="w-full max-w-[230px] aspect-square bg-[#FFFDF9] rounded-lg border border-amber-900/30"
                >
                  <rect x="0" y="0" width="400" height="400" fill="#FAF8F5" stroke="#78350f" strokeWidth="2.5" />
                  <line x1="0" y1="0" x2="400" y2="400" stroke="#78350f" strokeWidth="1.8" />
                  <line x1="400" y1="0" x2="0" y2="400" stroke="#78350f" strokeWidth="1.8" />
                  <line x1="200" y1="0" x2="0" y2="200" stroke="#78350f" strokeWidth="1.8" />
                  <line x1="0" y1="200" x2="200" y2="400" stroke="#78350f" strokeWidth="1.8" />
                  <line x1="200" y1="400" x2="400" y2="200" stroke="#78350f" strokeWidth="1.8" />
                  <line x1="400" y1="200" x2="200" y2="0" stroke="#78350f" strokeWidth="1.8" />

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
                          fontSize="12"
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
                            fontSize="10"
                            fontWeight="bold"
                          >
                            {occupants.map((p) => PLANETS_DATA[p].sanskritName.slice(0, 2)).join(' ')}
                          </text>
                        )}
                      </g>
                    );
                  })}
                </svg>
              ) : (
                <div className="w-full max-w-[230px] aspect-square grid grid-cols-4 grid-rows-4 gap-0.5 p-1 bg-amber-50 rounded-lg border border-stone-300 text-[9px]">
                  {([12, 1, 2, 3, 11, 0, 0, 4, 10, 0, 0, 5, 9, 8, 7, 6] as number[]).map((hNum, idx) => {
                    if (hNum === 0) {
                      if (idx === 5) {
                        return (
                          <div key={idx} className="col-span-2 row-span-2 bg-white flex items-center justify-center p-1 text-center border border-amber-900/20 rounded">
                            <span className="font-vedic font-bold text-amber-950 text-[10px]">South Chart</span>
                          </div>
                        );
                      }
                      return null;
                    }
                    const num = hNum as HouseNumber;
                    const occupants = houseOccupants[num];
                    return (
                      <div key={idx} className="bg-white p-0.5 border border-stone-200 rounded flex flex-col justify-between">
                        <span className="font-bold text-amber-900 text-[8.5px]">{num}H</span>
                        <span className="text-[8px] font-semibold text-stone-700 truncate">
                          {occupants.map((p) => PLANETS_DATA[p].name.slice(0, 2)).join(',')}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
              <span className="text-[9px] text-stone-500 mt-1">Houses numbered 1 to 12 starting from Lagna</span>
            </div>

            {/* Navagraha 9 Planetary Positions Table (7 columns) */}
            <div className="col-span-7">
              <div className="flex items-center justify-between text-[11px] font-bold text-stone-800 mb-1">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-800" />
                  Navagraha Planetary Positions &amp; Auspicious Elements
                </span>
                <span className="text-[9px] text-stone-500">9 Classical Grahas</span>
              </div>

              <div className="border border-stone-300 rounded-lg overflow-hidden bg-white text-[10px]">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-stone-100/90 text-stone-900 font-bold border-b border-stone-300 text-[9.5px]">
                    <tr>
                      <th className="p-1.5 border-r border-stone-200">Graha</th>
                      <th className="p-1.5 border-r border-stone-200">Bhava</th>
                      <th className="p-1.5 border-r border-stone-200">Rulership</th>
                      <th className="p-1.5 border-r border-stone-200">Gemstone</th>
                      <th className="p-1.5">Beej Mantra</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200 text-[9.5px]">
                    {(Object.keys(PLANETS_DATA) as PlanetId[]).map((pId) => {
                      const p = PLANETS_DATA[pId];
                      const hNum = placements[pId];
                      const h = HOUSES_DATA[hNum];
                      return (
                        <tr key={pId} className="hover:bg-amber-50/50">
                          <td className="p-1 font-bold text-stone-900 border-r border-stone-200 whitespace-nowrap">
                            {p.avatar} {p.name} <span className="text-stone-500 font-normal">({p.sanskritName})</span>
                          </td>
                          <td className="p-1 font-bold text-amber-900 border-r border-stone-200 whitespace-nowrap">
                            {getOrdinal(hNum)} House
                          </td>
                          <td className="p-1 text-stone-700 border-r border-stone-200 whitespace-nowrap">
                            {h.sanskritName.split(' ')[0]}
                          </td>
                          <td className="p-1 text-stone-800 border-r border-stone-200 font-medium whitespace-nowrap">
                            {p.gemstone}
                          </td>
                          <td className="p-1 text-stone-600 font-mono text-[8.5px] truncate max-w-[130px]" title={p.beejMantra}>
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

          {/* Section 4: Detected Classical Vedic Yogas */}
          <div className="my-2 border-t border-amber-900/20 pt-2">
            <div className="flex items-center justify-between text-xs font-bold text-amber-950 font-vedic mb-1.5">
              <span className="flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-800" />
                Detected Classical Vedic Yogas ({detectedYogas.length} Formations Activated)
              </span>
              <span className="text-[9.5px] text-stone-500 font-sans font-normal">Parashari Yoga Shastra</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[10px]">
              {detectedYogas.slice(0, 4).map((yoga, idx) => (
                <div key={idx} className="p-2 rounded-lg border border-amber-900/20 bg-white space-y-1">
                  <div className="flex items-center justify-between">
                    <strong className="text-amber-950 font-bold font-vedic text-[10.5px]">{yoga.name}</strong>
                    <span className="text-[8.5px] px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 font-semibold">
                      {yoga.type}
                    </span>
                  </div>
                  <p className="text-stone-600 leading-snug line-clamp-2 text-[9.5px]">{yoga.desc}</p>
                  <div className="text-[8.5px] text-stone-500 pt-0.5 border-t border-stone-100 flex justify-between">
                    <span>Key Grahas:</span>
                    <strong className="text-stone-800">{yoga.planets}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Page 1 Footer */}
          <div className="pt-2 border-t border-amber-900/30 flex items-center justify-between text-[9.5px] text-stone-500">
            <span>goodastrology • Vedic Astrology Janam Patrika &amp; Horoscope Dossier</span>
            <span className="font-serif italic text-amber-900 font-semibold">॥ सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः ॥</span>
            <span className="font-bold text-amber-950">Page 1 of 2</span>
          </div>
        </div>
      </div>

      {/* PAGE 2: COMPREHENSIVE 12 BHAVAS DESTINY ANALYSIS & REMEDIES */}
      <div className="a4-report-page bg-white text-stone-900 border border-stone-200 shadow-md mx-auto relative flex flex-col justify-between p-6 sm:p-7">
        <div className="border-2 border-amber-900/50 rounded-xl p-4 sm:p-5 flex-1 flex flex-col justify-between relative bg-[#FCFBF9]">
          
          {/* Corner Marks */}
          <span className="absolute top-1 left-1.5 text-amber-900/40 text-xs font-serif select-none">❖</span>
          <span className="absolute top-1 right-1.5 text-amber-900/40 text-xs font-serif select-none">❖</span>
          <span className="absolute bottom-1 left-1.5 text-amber-900/40 text-xs font-serif select-none">❖</span>
          <span className="absolute bottom-1 right-1.5 text-amber-900/40 text-xs font-serif select-none">❖</span>

          {/* Page 2 Header */}
          <div className="text-center border-b border-amber-900/30 pb-2">
            <div className="flex items-center justify-between text-[11px] text-amber-950 font-serif tracking-wide px-2 mb-0.5">
              <span>॥ ॐ श्री महालक्ष्म्यै नमः ॥</span>
              <span className="font-bold uppercase tracking-widest text-[10px] text-amber-900 font-vedic">
                12 Bhavas Comprehensive Life Interpretations
              </span>
              <span>॥ शुभम् भवतु ॥</span>
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold font-vedic text-amber-950 tracking-tight">
              DWADASHA BHAVA (12 HOUSES) DESTINY BLUEPRINT
            </h2>
            <p className="text-[10px] text-stone-600">
              Personalized House-by-House Life Interpretations for {nativeName || 'Auspicious Native'}
            </p>
          </div>

          {/* Section 1: All 12 Houses Comprehensive Grid (6 rows x 2 columns) */}
          <div className="grid grid-cols-2 gap-2 my-2 text-[10px]">
            {([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as HouseNumber[]).map((hNum) => {
              const h = HOUSES_DATA[hNum];
              const occupants = houseOccupants[hNum];

              return (
                <div key={hNum} className="p-2 rounded-lg border border-stone-200 bg-white space-y-1">
                  <div className="flex items-center justify-between border-b border-stone-100 pb-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="w-4 h-4 rounded-full bg-amber-900 text-amber-50 flex items-center justify-center font-bold text-[9px]">
                        {hNum}
                      </span>
                      <strong className="text-amber-950 font-vedic text-[10.5px]">{h.sanskritName}</strong>
                      <span className="text-[9px] text-stone-500 font-medium">({h.name.split(' ')[0]})</span>
                    </div>
                    <span className="text-[8px] px-1 py-0.2 rounded bg-amber-50 text-amber-900 font-semibold border border-amber-200/60">
                      {h.classification.category}
                    </span>
                  </div>

                  {occupants.length > 0 ? (
                    <div className="space-y-0.5">
                      <div className="flex flex-wrap gap-1">
                        {occupants.map((pId) => (
                          <span key={pId} className="px-1.5 py-0.2 rounded bg-amber-100/90 text-amber-950 text-[9px] font-bold">
                            {PLANETS_DATA[pId].avatar} {PLANETS_DATA[pId].name}
                          </span>
                        ))}
                      </div>
                      <p className="text-stone-700 leading-snug line-clamp-2 text-[9px]">
                        <strong>Effects:</strong> {PLANETS_DATA[occupants[0]].effects[hNum].summary}
                      </p>
                    </div>
                  ) : (
                    <p className="text-stone-500 italic text-[9px] line-clamp-2">
                      Empty house ruled by {h.naturalLord}. Governs {h.keySignifications.slice(0, 2).join(', ')}. Expressed through aspecting planets.
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Section 2: Astrological Remedies & Karmic Guidance */}
          <div className="my-1 border-t border-amber-900/20 pt-2">
            <h3 className="text-xs font-bold text-amber-950 font-vedic flex items-center gap-1.5 mb-1.5 uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-800" />
              Harmonization, Gemstones &amp; Karmic Remedial Measures
            </h3>

            <div className="grid grid-cols-3 gap-2 text-[10px]">
              <div className="p-2 rounded-lg border border-amber-200 bg-amber-50/70 space-y-0.5">
                <div className="flex items-center gap-1 font-bold text-amber-950 font-vedic text-[10px]">
                  <Sparkles className="w-3 h-3 text-amber-700" />
                  Gemstone &amp; Metal
                </div>
                <p className="text-stone-600 text-[9px] leading-snug">
                  Energize Lagnesha &amp; Bhagyesh with authentic natural gems (Yellow Sapphire, Ruby or Pearl) set in silver or gold.
                </p>
              </div>

              <div className="p-2 rounded-lg border border-emerald-200 bg-emerald-50/70 space-y-0.5">
                <div className="flex items-center gap-1 font-bold text-emerald-950 font-vedic text-[10px]">
                  <Heart className="w-3 h-3 text-emerald-700" />
                  Mantra Sadhana &amp; Japa
                </div>
                <p className="text-stone-600 text-[9px] leading-snug">
                  Recite Gayatri Mantra 108 times at sunrise; chant planetary beej mantras on corresponding weekdays for mental clarity.
                </p>
              </div>

              <div className="p-2 rounded-lg border border-blue-200 bg-blue-50/70 space-y-0.5">
                <div className="flex items-center gap-1 font-bold text-blue-950 font-vedic text-[10px]">
                  <Zap className="w-3 h-3 text-blue-700" />
                  Karmic Charity (Dana)
                </div>
                <p className="text-stone-600 text-[9px] leading-snug">
                  Feed cows on Wednesdays for Mercury, support education on Thursdays for Jupiter, and offer water to the rising Sun.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: Astrologer Certification & Seal Block */}
          <div className="mt-2 pt-2 border-t border-amber-900/30 grid grid-cols-12 gap-3 items-center text-[10px]">
            <div className="col-span-8 space-y-1">
              <span className="font-bold text-amber-950 block">Astrological Verification &amp; Authentication Notice:</span>
              <p className="text-stone-600 text-[9px] leading-snug">
                This Janam Patrika and Horoscope Dossier has been prepared in accordance with classical Brihat Parashara Hora Shastra principles, Lahiri Ayanamsha, and standard Vedic Bhava cusps.
              </p>
            </div>
            <div className="col-span-4 flex flex-col items-center justify-center p-2 rounded-lg border border-amber-900/30 bg-amber-50/40 text-center">
              <div className="w-8 h-8 rounded-full border border-amber-900/40 flex items-center justify-center mb-0.5 bg-white">
                <Sparkles className="w-4 h-4 text-amber-800" />
              </div>
              <span className="font-bold text-amber-950 text-[9.5px] font-vedic">Certified Vedic Dossier</span>
              <span className="text-[8px] text-stone-500 font-mono">ID: GA-VDK-{Math.abs(nativeName.length * 3141 + 108)}</span>
            </div>
          </div>

          {/* Page 2 Footer */}
          <div className="pt-2 border-t border-amber-900/30 flex items-center justify-between text-[9.5px] text-stone-500">
            <span>goodastrology • Classical Vedic Horoscope Janam Patrika</span>
            <span className="font-semibold text-stone-700">Himaghna Medhi • Vedic Jyotish Calculations</span>
            <span className="font-bold text-amber-950">Page 2 of 2</span>
          </div>
        </div>
      </div>
    </div>
  );
};
