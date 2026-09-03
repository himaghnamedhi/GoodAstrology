import React from 'react';
import { HouseNumber, PlanetId } from '../types/astrology';
import { PLANETS_DATA } from '../data/planetsData';
import { HOUSES_DATA } from '../data/housesData';
import { RefreshCw, BookOpen, FileDown, CheckCircle2, Compass } from 'lucide-react';

interface KundliBuilderProps {
  placements: Record<PlanetId, HouseNumber>;
  setPlacements: React.Dispatch<React.SetStateAction<Record<PlanetId, HouseNumber>>>;
  onSelectHouse: (house: HouseNumber) => void;
  onSelectPlanet: (planetId: PlanetId) => void;
  onOpenReport?: () => void;
}

export const KUNDLI_PRESETS: { name: string; desc: string; placements: Record<PlanetId, HouseNumber> }[] = [
  {
    name: 'Gajakesari Yoga (Prosperity & Honor)',
    desc: 'Jupiter and Moon in mutual Kendras (1st and 4th houses) yielding royal respect, wisdom, and lasting affluence.',
    placements: {
      sun: 10,
      moon: 4,
      mars: 1,
      mercury: 10,
      jupiter: 1,
      venus: 5,
      saturn: 9,
      rahu: 11,
      ketu: 5,
    },
  },
  {
    name: 'Budhaditya & Raja Yoga (Executive Leader)',
    desc: 'Sun & Mercury conjunct in 10th House of Career with Mars in 1st House, creating unparalleled administrative leadership.',
    placements: {
      sun: 10,
      moon: 2,
      mars: 1,
      mercury: 10,
      jupiter: 9,
      venus: 11,
      saturn: 7,
      rahu: 3,
      ketu: 9,
    },
  },
  {
    name: 'Tech Innovator & Global Gains',
    desc: 'Rahu in the 11th House of Gains with Venus in the 2nd House and Sun in the 9th House for international tech breakthrough.',
    placements: {
      sun: 9,
      moon: 5,
      mars: 6,
      mercury: 9,
      jupiter: 4,
      venus: 2,
      saturn: 10,
      rahu: 11,
      ketu: 5,
    },
  },
  {
    name: 'Spiritual Ascetic (Moksha & Occult)',
    desc: 'Ketu in the 12th House with Jupiter in the 9th House, granting deep psychic intuition and final liberation.',
    placements: {
      sun: 1,
      moon: 9,
      mars: 3,
      mercury: 2,
      jupiter: 9,
      venus: 8,
      saturn: 12,
      rahu: 6,
      ketu: 12,
    },
  },
];

export const KundliBuilder: React.FC<KundliBuilderProps> = ({
  placements,
  setPlacements,
  onSelectHouse,
  onSelectPlanet,
  onOpenReport,
}) => {
  const handleResetPlacements = () => {
    setPlacements(KUNDLI_PRESETS[0].placements);
  };

  const handleHouseChange = (planetId: PlanetId, newHouse: HouseNumber) => {
    setPlacements(prev => ({
      ...prev,
      [planetId]: newHouse,
    }));
  };

  const getOrdinal = (n: number) => {
    const s = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  };

  return (
    <div className="space-y-6">
      {/* 9 Planet House Placement Selectors */}
      <div className="bg-white p-5 sm:p-7 rounded-3xl border border-amber-900/15 shadow-sm space-y-5">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h3 className="text-base sm:text-lg font-bold text-amber-950 font-vedic flex items-center gap-2">
                <Compass className="w-5 h-5 text-amber-700" />
                Assign House Position for Each Planet (नवग्रह भाव स्थिति)
              </h3>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                All 9 Navagrahas Configured
              </span>
            </div>
            <p className="text-xs text-stone-600">
              Customize planet placements to reflect any birth chart, inspect house effects, or generate a tailored Janam Patrika.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 self-start sm:self-auto">
            <button
              onClick={handleResetPlacements}
              className="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Reset to natural placements"
            >
              <RefreshCw className="w-3.5 h-3.5 text-stone-500" />
              Reset Placements
            </button>

            {onOpenReport && (
              <button
                id="btn-generate-kundli-pdf"
                onClick={onOpenReport}
                className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-amber-800 to-amber-950 hover:from-amber-700 hover:to-amber-900 text-amber-50 shadow-xs text-xs font-bold flex items-center gap-2 transition-all active:scale-95 cursor-pointer border border-amber-700/50"
                title="Generate & Download PDF Horoscope Report"
              >
                <FileDown className="w-4 h-4 text-amber-300" />
                <span>Generate PDF</span>
              </button>
            )}
          </div>
        </div>

          {/* 9 Planet House Placement Selectors Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
            {(Object.keys(PLANETS_DATA) as PlanetId[]).map((pId) => {
              const p = PLANETS_DATA[pId];
              const currentHouse = placements[pId] || 1;
              const effect = p.effects[currentHouse];

              return (
                <div
                  key={pId}
                  className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 hover:border-amber-700 transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{p.avatar}</span>
                        <div>
                          <span className="text-xs font-bold text-amber-950 block leading-tight">{p.name}</span>
                          <span className="text-[10px] text-stone-500">{p.sanskritName}</span>
                        </div>
                      </div>

                      {/* House Select Dropdown */}
                      <select
                        id={`select-house-${pId}`}
                        value={currentHouse}
                        onChange={(e) => handleHouseChange(pId, Number(e.target.value) as HouseNumber)}
                        aria-label={`${p.name} house selection`}
                        className="text-xs font-bold text-amber-950 bg-white border border-stone-300 rounded-lg px-2 py-1 focus:ring-1 focus:ring-amber-800 cursor-pointer"
                      >
                        {([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as HouseNumber[]).map((num) => (
                          <option key={num} value={num}>
                            {getOrdinal(num)} House ({HOUSES_DATA[num].sanskritName.split(' ')[0]})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Active Effect Snippet */}
                    <p className="text-xs text-stone-700 bg-white p-2 rounded-lg border border-stone-200/60 line-clamp-2">
                      {effect.bulletPoints[0]}
                    </p>
                  </div>

                  <div className="mt-2 pt-1.5 border-t border-stone-200/60 flex items-center justify-between text-[11px]">
                    <button
                      onClick={() => onSelectPlanet(pId)}
                      className="text-amber-800 hover:underline font-medium cursor-pointer"
                    >
                      View {p.name} &rarr;
                    </button>
                    <button
                      onClick={() => onSelectHouse(currentHouse)}
                      className="text-stone-500 hover:text-stone-800 cursor-pointer"
                    >
                      Inspect {getOrdinal(currentHouse)} House
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
      </div>

      {/* Generated Kundli Synthesis & Reading */}
      <div className="bg-[#FAF8F5] p-5 sm:p-7 rounded-3xl border border-amber-900/15 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-stone-200 pb-3">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-700" />
            <h3 className="text-lg font-bold text-amber-950 font-vedic">
              Comprehensive Kundli Synthesis & Analysis
            </h3>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 font-semibold">
            Vedic Analysis
          </span>
        </div>

        <p className="text-xs text-stone-600">
          Based on your chosen planetary placements, here is how each house in your birth chart is activated:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as HouseNumber[]).map((hNum) => {
            const h = HOUSES_DATA[hNum];
            // Find which planets are placed in this house
            const occupants = (Object.keys(placements) as PlanetId[]).filter(
              pId => placements[pId] === hNum
            );

            return (
              <div
                key={hNum}
                onClick={() => onSelectHouse(hNum)}
                className="bg-white p-3.5 rounded-xl border border-stone-200 hover:border-amber-700 cursor-pointer transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-amber-950 text-xs font-vedic">
                      {getOrdinal(hNum)} House: {h.sanskritName}
                    </span>
                    <span className="text-[10px] text-stone-500 font-semibold">{h.naturalSign}</span>
                  </div>

                  {occupants.length > 0 ? (
                    <div className="space-y-1">
                      <div className="flex flex-wrap gap-1 mb-1">
                        {occupants.map((pId) => (
                          <span key={pId} className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-950 text-[10px] font-bold">
                            {PLANETS_DATA[pId].avatar} {PLANETS_DATA[pId].name}
                          </span>
                        ))}
                      </div>
                      {occupants.map((pId) => (
                        <p key={pId} className="text-xs text-stone-700">
                          <strong>{PLANETS_DATA[pId].name}:</strong> {PLANETS_DATA[pId].effects[hNum].bulletPoints[0]}
                        </p>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-stone-400 italic">
                      Empty house. Influenced by natural lord ({h.naturalLord}) and aspecting planets.
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
