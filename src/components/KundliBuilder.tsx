import React, { useState } from 'react';
import { HouseNumber, PlanetId } from '../types/astrology';
import { PLANETS_DATA } from '../data/planetsData';
import { HOUSES_DATA } from '../data/housesData';
import { Sparkles, RefreshCw, Award, BookOpen, Printer, CheckCircle2, Compass, FileText } from 'lucide-react';

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
  const [selectedPreset, setSelectedPreset] = useState<string>('');

  const handlePresetSelect = (presetName: string) => {
    const preset = KUNDLI_PRESETS.find(p => p.name === presetName);
    if (preset) {
      setPlacements(preset.placements);
      setSelectedPreset(presetName);
    }
  };

  const handleHouseChange = (planetId: PlanetId, newHouse: HouseNumber) => {
    setPlacements(prev => ({
      ...prev,
      [planetId]: newHouse,
    }));
    setSelectedPreset('');
  };

  const getOrdinal = (n: number) => {
    const s = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  };

  return (
    <div className="space-y-6">
      {/* Top Controls & Presets */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-amber-900/10 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-amber-950 font-vedic flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-700" />
              Kundli Reader & Custom Placement Builder
            </h2>
            <p className="text-xs text-stone-600 mt-0.5">
              Set the house position (1 to 12) for each of the 9 Navagrahas, or load classical Raja Yoga chart templates.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            {onOpenReport && (
              <button
                id="btn-builder-print-report"
                onClick={onOpenReport}
                className="px-4 py-2 rounded-xl bg-amber-900 hover:bg-amber-950 text-amber-50 shadow-xs text-xs font-bold flex items-center gap-2 transition-all active:scale-95"
              >
                <Printer className="w-4 h-4 text-amber-300" />
                <span>Print Custom Report</span>
              </button>
            )}

            <button
              onClick={() => handlePresetSelect(KUNDLI_PRESETS[0].name)}
              className="px-3 py-2 rounded-xl bg-amber-100/80 hover:bg-amber-200 text-amber-900 border border-amber-300 text-xs font-semibold flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reset
            </button>
          </div>
        </div>

        {/* Preset Yogas */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-amber-950 uppercase tracking-wider">
            Popular Astrological Presets & Yogas:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {KUNDLI_PRESETS.map((p) => (
              <button
                key={p.name}
                onClick={() => handlePresetSelect(p.name)}
                className={`p-3 rounded-xl text-left border transition-all ${
                  selectedPreset === p.name
                    ? 'bg-amber-950 text-amber-50 border-amber-950 shadow-sm'
                    : 'bg-stone-50 hover:bg-amber-50 text-stone-800 border-stone-200'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <Award className={`w-3.5 h-3.5 ${selectedPreset === p.name ? 'text-amber-300' : 'text-amber-700'}`} />
                  <span className="text-xs font-bold font-vedic truncate">{p.name}</span>
                </div>
                <p className={`text-[10.5px] line-clamp-2 mt-1 ${selectedPreset === p.name ? 'text-amber-200' : 'text-stone-500'}`}>
                  {p.desc}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 9 Planet House Placement Selectors */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-amber-900/15 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-amber-950 font-vedic flex items-center gap-2">
          <Compass className="w-4 h-4 text-amber-700" />
          Assign House Position for Each Planet:
        </h3>

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
                      className="text-xs font-bold text-amber-950 bg-white border border-stone-300 rounded-lg px-2 py-1 focus:ring-1 focus:ring-amber-800"
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
                    className="text-amber-800 hover:underline font-medium"
                  >
                    View {p.name} &rarr;
                  </button>
                  <button
                    onClick={() => onSelectHouse(currentHouse)}
                    className="text-stone-500 hover:text-stone-800"
                  >
                    Inspect {getOrdinal(currentHouse)} House
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Printable Horoscope Report Callout Banner */}
      {onOpenReport && (
        <div className="bg-gradient-to-r from-amber-900 via-amber-950 to-stone-900 text-amber-50 p-6 sm:p-7 rounded-3xl shadow-lg border border-amber-800/40 flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="space-y-1.5 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-800/60 border border-amber-600/40 text-amber-200 text-xs font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-300" />
              <span>All 9 Navagrahas Assigned (100% Configured)</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-vedic text-white">
              Your Customized Kundli Horoscope Report is Ready
            </h3>
            <p className="text-xs text-amber-200/80 max-w-xl leading-relaxed">
              Generate a complete, printable Vedic Janam Patrika with your custom visual chart, 12 Bhavas breakdown, detected classical Yogas, and karmic remedies.
            </p>
          </div>

          <button
            id="btn-print-kundli-full-report"
            onClick={onOpenReport}
            className="px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-bold text-sm flex items-center gap-2.5 shadow-md hover:shadow-lg transition-all active:scale-95 shrink-0"
          >
            <Printer className="w-4 h-4 text-amber-950" />
            <span>Generate & Print Report</span>
          </button>
        </div>
      )}

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
