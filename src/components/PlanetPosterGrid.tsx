import React, { useState } from 'react';
import { PlanetId, HouseNumber } from '../types/astrology';
import { PLANETS_DATA } from '../data/planetsData';
import { HOUSES_DATA } from '../data/housesData';
import { Sun, Moon, Sparkles, Filter, Copy, Check, Info, Shield, Heart, Zap, Search, Bookmark } from 'lucide-react';

interface PlanetPosterGridProps {
  selectedPlanetId: PlanetId;
  onSelectPlanet: (id: PlanetId) => void;
  onSelectHouse: (house: HouseNumber) => void;
}

export const PlanetPosterGrid: React.FC<PlanetPosterGridProps> = ({
  selectedPlanetId,
  onSelectPlanet,
  onSelectHouse,
}) => {
  const [filterQuery, setFilterQuery] = useState('');
  const [copiedHouse, setCopiedHouse] = useState<number | null>(null);

  const planet = PLANETS_DATA[selectedPlanetId];

  const getOrdinal = (n: number) => {
    const s = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  };

  const handleCopyHouse = (houseNum: HouseNumber, points: string[]) => {
    const text = `${planet.name} (${planet.sanskritName}) in ${getOrdinal(houseNum)} House:\n` + points.map(p => `• ${p}`).join('\n');
    navigator.clipboard.writeText(text);
    setCopiedHouse(houseNum);
    setTimeout(() => setCopiedHouse(null), 2000);
  };

  // Helper to render a house box
  const renderHouseBox = (hNum: HouseNumber, className = '') => {
    const effect = planet.effects[hNum];
    const isMatching = !filterQuery || effect.bulletPoints.some(pt => pt.toLowerCase().includes(filterQuery.toLowerCase())) || effect.summary.toLowerCase().includes(filterQuery.toLowerCase());

    return (
      <div
        key={hNum}
        id={`planet-effect-card-${planet.id}-h${hNum}`}
        onClick={() => onSelectHouse(hNum)}
        className={`bg-white/95 backdrop-blur-xs p-3.5 sm:p-4 rounded-xl border border-stone-300/80 shadow-xs hover:shadow-md hover:border-amber-700 transition-all flex flex-col justify-between cursor-pointer group ${
          !isMatching ? 'opacity-30' : ''
        } ${className}`}
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between border-b border-stone-200/80 pb-1.5 mb-2">
            <span className="font-vedic font-bold text-amber-950 text-sm group-hover:text-amber-700 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-600"></span>
              {getOrdinal(hNum)} House
            </span>
            <span className="text-[10px] text-stone-500 font-medium">{HOUSES_DATA[hNum].sanskritName.split(' ')[0]}</span>
          </div>

          {/* Bullet Points */}
          <ul className="space-y-1 text-xs text-stone-800">
            {effect.bulletPoints.map((point, idx) => (
              <li key={idx} className="flex items-start gap-1.5 leading-snug">
                <span className="text-amber-700 font-bold text-[11px] shrink-0">•</span>
                <span className={filterQuery && point.toLowerCase().includes(filterQuery.toLowerCase()) ? 'bg-amber-200 font-semibold' : ''}>
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer Actions */}
        <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px]">
          <span className="text-stone-400 group-hover:text-amber-800 transition-colors font-medium">Click to view house &rarr;</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleCopyHouse(hNum, effect.bulletPoints);
            }}
            title="Copy these points"
            className="p-1 text-stone-400 hover:text-amber-800 rounded transition-colors"
          >
            {copiedHouse === hNum ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* 9 Navagraha Selector Buttons */}
      <div className="bg-white p-3 sm:p-4 rounded-2xl border border-amber-900/10 shadow-xs">
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2">
            <Sun className="w-5 h-5 text-amber-600" />
            <h3 className="font-vedic font-bold text-amber-950 text-base">Select Navagraha (नवग्रह):</h3>
          </div>
          <div className="relative w-48 sm:w-64">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search keyword (e.g. wealth, job)..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-amber-700 bg-stone-50"
            />
          </div>
        </div>

        {/* Planet Tabs */}
        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-1.5">
          {(Object.keys(PLANETS_DATA) as PlanetId[]).map((pId) => {
            const p = PLANETS_DATA[pId];
            const isSelected = selectedPlanetId === pId;
            return (
              <button
                key={pId}
                id={`btn-planet-${pId}`}
                onClick={() => onSelectPlanet(pId)}
                className={`py-2 px-2 rounded-xl transition-all flex flex-col items-center justify-center gap-1 border ${
                  isSelected
                    ? 'bg-amber-950 text-amber-50 border-amber-950 ring-2 ring-amber-400/40 shadow-sm font-semibold'
                    : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                }`}
              >
                <span className="text-base">{p.avatar}</span>
                <span className="text-xs font-bold leading-none">{p.name}</span>
                <span className="text-[9.5px] opacity-80 leading-none">{p.sanskritName.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Reference Poster Frame matching the uploaded screenshots */}
      <div className="bg-[#FFFDF9] rounded-3xl p-4 sm:p-7 border-2 border-amber-900/30 shadow-md relative overflow-hidden">
        
        {/* Subtle Decorative Background Frame */}
        <div className="absolute inset-2 border border-amber-900/10 rounded-2xl pointer-events-none"></div>

        {/* Poster Header */}
        <div className="text-center relative z-10 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/80 border border-amber-300 text-amber-900 text-xs font-semibold mb-2">
            <span>{planet.nature}</span>
            <span>•</span>
            <span>Ruler of: {planet.rulingSigns.join(', ')}</span>
            <span>•</span>
            <span>Exalted in: {planet.exaltation}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-amber-950 font-vedic tracking-tight">
            {planet.name.toUpperCase()} ({planet.devanagari}) in 1<sup>st</sup> to 12<sup>th</sup> Houses
          </h2>
          <p className="text-sm font-semibold text-amber-800 tracking-wide mt-1">
            Effects & Life Predictions in Kundli (लग्न कुण्डली फल)
          </p>
        </div>

        {/* The 12-House Poster Layout with Central Mandala Artwork */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 relative z-10">
          
          {/* Row 1: 1st, 2nd, 3rd, 4th Houses */}
          {renderHouseBox(1)}
          {renderHouseBox(2)}
          {renderHouseBox(3)}
          {renderHouseBox(4)}

          {/* Row 2: 5th House, Central Deity / Mandala (2 cols wide on desktop), 6th House */}
          {renderHouseBox(5)}

          {/* Central Deity / Planet Artwork Box */}
          <div className="lg:col-span-2 bg-gradient-to-br from-amber-50 to-amber-100/70 p-5 rounded-2xl border-2 border-amber-800/40 shadow-inner flex flex-col items-center justify-center text-center relative overflow-hidden">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-200 border-4 border-amber-800/30 flex items-center justify-center text-4xl shadow-md mb-2 animate-pulse-slow">
              {planet.avatar}
            </div>

            <h3 className="text-xl font-bold font-vedic text-amber-950">
              {planet.name.toUpperCase()} ({planet.devanagari})
            </h3>
            <p className="text-xs text-amber-900/90 font-medium max-w-sm mt-1">
              {planet.centralDescription}
            </p>

            {/* Sacred Beej Mantra */}
            <div className="mt-3 px-3 py-1.5 rounded-xl bg-white/80 border border-amber-400/60 shadow-2xs">
              <span className="text-[11px] font-bold text-amber-950 block font-vedic">{planet.beejMantra}</span>
              <span className="text-[9.5px] text-stone-600 italic">{planet.beejMantraTransliteration}</span>
            </div>

            {/* Attributes Pill */}
            <div className="mt-2.5 flex flex-wrap justify-center gap-1.5 text-[10.5px]">
              <span className="px-2 py-0.5 rounded-full bg-amber-200/80 text-amber-950 font-medium">Day: {planet.dayOfWeek}</span>
              <span className="px-2 py-0.5 rounded-full bg-amber-200/80 text-amber-950 font-medium">Gemstone: {planet.gemstone}</span>
              <span className="px-2 py-0.5 rounded-full bg-amber-200/80 text-amber-950 font-medium">Metal: {planet.metal}</span>
            </div>
          </div>

          {renderHouseBox(6)}

          {/* Row 3: 7th, 8th, 9th, 10th Houses */}
          {renderHouseBox(7)}
          {renderHouseBox(8)}
          {renderHouseBox(9)}
          {renderHouseBox(10)}

          {/* Row 4: 11th House, 12th House, Important Note Box (2 cols wide on desktop) */}
          {renderHouseBox(11)}
          {renderHouseBox(12)}

          {/* Important Vedic Note Box matching screenshots */}
          <div className="lg:col-span-2 bg-[#FAF6F0] p-4 rounded-xl border border-amber-800/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-amber-900 font-bold text-xs uppercase tracking-wide mb-1.5">
                <Sparkles className="w-4 h-4 text-amber-700" />
                <span>Important Astrological Note (शास्त्र वचन)</span>
              </div>
              <p className="text-xs text-stone-700 leading-relaxed italic">
                * {planet.note || 'Results may vary as per other planets, signs & aspects in the Kundli.'}
              </p>
            </div>

            <div className="mt-3 pt-2 border-t border-amber-900/10 flex items-center justify-between text-[11px] text-stone-500">
              <span>Debilitation: <strong className="text-amber-900">{planet.debilitation}</strong></span>
              <span className="font-semibold text-amber-800 font-vedic">goodastrology</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
