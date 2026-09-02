import React, { useState } from 'react';
import { HouseNumber, PlanetId } from '../types/astrology';
import { HOUSES_DATA } from '../data/housesData';
import { PLANETS_DATA } from '../data/planetsData';
import { Layers, Compass, CheckCircle, Sparkles, Star, ChevronRight, Eye } from 'lucide-react';

interface HousesExplorerProps {
  selectedHouse: HouseNumber;
  onSelectHouse: (house: HouseNumber) => void;
  onSelectPlanet: (planetId: PlanetId) => void;
}

export const HousesExplorer: React.FC<HousesExplorerProps> = ({
  selectedHouse,
  onSelectHouse,
  onSelectPlanet,
}) => {
  const [filterTag, setFilterTag] = useState<string>('all');
  const house = HOUSES_DATA[selectedHouse];

  const getOrdinal = (n: number) => {
    const s = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  };

  return (
    <div className="space-y-6">
      {/* 12 House Selector Carousel / Grid */}
      <div className="bg-white p-4 rounded-2xl border border-amber-900/10 shadow-xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-700" />
            <h3 className="font-vedic font-bold text-amber-950 text-base">Select Any of the 12 Houses (द्वादश भाव):</h3>
          </div>
          
          {/* Filter tabs */}
          <div className="flex flex-wrap gap-1 text-xs">
            {['all', 'Kendra', 'Trikona', 'Upachaya', 'Dusthana'].map((tag) => (
              <button
                key={tag}
                onClick={() => setFilterTag(tag)}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                  filterTag === tag
                    ? 'bg-amber-900 text-amber-50 shadow-2xs font-semibold'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {tag === 'all' ? 'All 12' : tag}
              </button>
            ))}
          </div>
        </div>

        {/* House Buttons 1-12 */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-2">
          {([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as HouseNumber[]).map((hNum) => {
            const h = HOUSES_DATA[hNum];
            const isSel = selectedHouse === hNum;
            const isMatch = filterTag === 'all' || h.classification.subCategories.includes(filterTag);

            return (
              <button
                key={hNum}
                id={`btn-house-select-${hNum}`}
                onClick={() => onSelectHouse(hNum)}
                className={`p-2.5 rounded-xl border transition-all flex flex-col items-center justify-center text-center ${
                  isSel
                    ? 'bg-amber-950 text-amber-50 border-amber-950 ring-2 ring-amber-400/40 shadow-sm font-semibold'
                    : 'bg-stone-50 hover:bg-amber-50 text-stone-800 border-stone-200'
                } ${!isMatch ? 'opacity-35' : ''}`}
              >
                <span className="text-xs font-bold font-vedic">{getOrdinal(hNum)}</span>
                <span className="text-[10px] opacity-80 mt-0.5">{h.sanskritName.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected House Deep Dive Hero */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border border-amber-900/15 shadow-sm space-y-6">
        
        {/* Header with Geometry Location Guide */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-stone-200 pb-5 gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-bold text-xs border border-amber-300">
                {getOrdinal(house.number)} House of Horoscope
              </span>
              <span className="px-3 py-1 rounded-full bg-stone-100 text-stone-700 font-semibold text-xs flex items-center gap-1">
                <Compass className="w-3.5 h-3.5 text-amber-700" />
                Chart Position: {house.svgRegion}
              </span>
              <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-800 font-semibold text-xs">
                Sign: {house.naturalSign}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-amber-950 font-vedic">
              {house.sanskritName} — {house.name}
            </h2>
          </div>

          {/* Classification Tags */}
          <div className="flex flex-wrap gap-1.5 md:justify-end">
            {house.classification.subCategories.map((sub, i) => (
              <span key={i} className="px-2.5 py-1 rounded-lg bg-amber-100/70 text-amber-950 text-xs font-semibold border border-amber-200">
                {sub}
              </span>
            ))}
          </div>
        </div>

        {/* House Overview & Description */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <p className="text-sm text-stone-800 leading-relaxed">
              {house.description}
            </p>

            {/* Key Life Spheres Checklist */}
            <div className="bg-[#FAF8F5] p-4 sm:p-5 rounded-2xl border border-stone-200/90 space-y-2.5">
              <h4 className="text-xs font-bold text-amber-950 uppercase tracking-wider flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                Primary Life Domains Governed:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
                {house.keySignifications.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-amber-700 font-bold">•</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Facts Card */}
          <div className="bg-amber-50/50 p-4 sm:p-5 rounded-2xl border border-amber-900/10 space-y-3.5">
            <h4 className="text-xs font-bold text-amber-950 uppercase tracking-wider flex items-center gap-1.5 font-vedic">
              <Star className="w-4 h-4 text-amber-700" />
              House Astrological Facts
            </h4>

            <div className="space-y-2 text-xs">
              <div className="pb-2 border-b border-amber-900/10">
                <span className="text-stone-500 block text-[11px] font-medium">Natural Ruling Planet (Lord):</span>
                <span className="font-bold text-amber-950">{house.naturalLord}</span>
              </div>

              <div className="pb-2 border-b border-amber-900/10">
                <span className="text-stone-500 block text-[11px] font-medium">Permanent Karakas (Significators):</span>
                <span className="font-bold text-amber-950">{house.karakas.join(', ')}</span>
              </div>

              <div className="pb-2 border-b border-amber-900/10">
                <span className="text-stone-500 block text-[11px] font-medium">Ruled Body Organs & Anatomy:</span>
                <span className="font-medium text-stone-800">{house.bodyParts.join(', ')}</span>
              </div>

              <div>
                <span className="text-stone-500 block text-[11px] font-medium">Chart Reading Tip:</span>
                <span className="text-[11px] text-stone-700 italic">
                  Look at both the planets placed here and where the {getOrdinal(house.number)} Lord is positioned.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* All 9 Navagraha Effects in this House Matrix */}
        <div className="pt-4 border-t border-stone-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-amber-950 font-vedic flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-700" />
                All 9 Planets in the {getOrdinal(house.number)} House Comparison
              </h3>
              <p className="text-xs text-stone-500">
                Quickly read and compare how each planetary energy manifests when placed in this specific house.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {(Object.keys(PLANETS_DATA) as PlanetId[]).map((pId) => {
              const p = PLANETS_DATA[pId];
              const effect = p.effects[house.number];

              return (
                <div
                  key={pId}
                  className="bg-stone-50 hover:bg-white p-3.5 rounded-xl border border-stone-200/80 hover:border-amber-700 hover:shadow-xs transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between border-b border-stone-200 pb-1.5 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{p.avatar}</span>
                        <span className="font-bold text-amber-950 text-xs font-vedic">{p.name}</span>
                      </div>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 font-semibold">
                        {p.nature}
                      </span>
                    </div>

                    <ul className="space-y-1 text-xs text-stone-700">
                      {effect.bulletPoints.map((pt, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 leading-snug">
                          <span className="text-amber-700 font-bold text-[10px]">•</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-end">
                    <button
                      onClick={() => onSelectPlanet(pId)}
                      className="text-[11px] font-semibold text-amber-800 hover:text-amber-950 flex items-center gap-0.5"
                    >
                      View {p.name} Poster &rarr;
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
