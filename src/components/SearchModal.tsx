import React, { useState, useMemo } from 'react';
import { X, Search, Sparkles, Compass, Sun, Layers, ArrowRight } from 'lucide-react';
import { HOUSES_DATA } from '../data/housesData';
import { PLANETS_DATA } from '../data/planetsData';
import { HouseNumber, PlanetId } from '../types/astrology';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectHouse: (h: HouseNumber) => void;
  onSelectPlanet: (p: PlanetId) => void;
}

const COMMON_LIFE_QUERIES = [
  { label: '💼 Career & Promotion', house: 10 as HouseNumber, planet: 'sun' as PlanetId },
  { label: '💍 Marriage & Spouse', house: 7 as HouseNumber, planet: 'venus' as PlanetId },
  { label: '💰 Wealth & Bank Balance', house: 2 as HouseNumber, planet: 'jupiter' as PlanetId },
  { label: '📈 Stock Gains & Income', house: 11 as HouseNumber, planet: 'rahu' as PlanetId },
  { label: '✈️ Foreign Travel & Settlement', house: 12 as HouseNumber, planet: 'rahu' as PlanetId },
  { label: '🏠 Property, Vehicles & Real Estate', house: 4 as HouseNumber, planet: 'mars' as PlanetId },
  { label: '👶 Children & Education', house: 5 as HouseNumber, planet: 'jupiter' as PlanetId },
  { label: '🏥 Health, Enemies & Loans', house: 6 as HouseNumber, planet: 'mars' as PlanetId },
  { label: '🔮 Spirituality, Occult & Research', house: 8 as HouseNumber, planet: 'ketu' as PlanetId },
  { label: '🍀 Luck, Higher Wisdom & Father', house: 9 as HouseNumber, planet: 'jupiter' as PlanetId },
];

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectHouse,
  onSelectPlanet,
}) => {
  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];

    const q = query.toLowerCase();
    const results: { type: 'house' | 'planet' | 'effect'; title: string; subtitle: string; house?: HouseNumber; planet?: PlanetId }[] = [];

    // Search in Houses
    Object.values(HOUSES_DATA).forEach((h) => {
      if (
        h.name.toLowerCase().includes(q) ||
        h.sanskritName.toLowerCase().includes(q) ||
        h.description.toLowerCase().includes(q) ||
        h.keySignifications.some((k) => k.toLowerCase().includes(q))
      ) {
        results.push({
          type: 'house',
          title: `${h.number}th House: ${h.sanskritName}`,
          subtitle: h.keySignifications.slice(0, 3).join(', '),
          house: h.number,
        });
      }
    });

    // Search in Planets
    Object.values(PLANETS_DATA).forEach((p) => {
      if (
        p.name.toLowerCase().includes(q) ||
        p.sanskritName.toLowerCase().includes(q) ||
        p.gemstone.toLowerCase().includes(q) ||
        p.rulingSigns.some((r) => r.toLowerCase().includes(q))
      ) {
        results.push({
          type: 'planet',
          title: `${p.avatar} ${p.name} (${p.sanskritName})`,
          subtitle: `Ruler of ${p.rulingSigns.join(', ')} • Gemstone: ${p.gemstone}`,
          planet: p.id,
        });
      }

      // Search in specific house effects
      Object.entries(p.effects).forEach(([hNumStr, eff]) => {
        const hNum = Number(hNumStr) as HouseNumber;
        if (eff.bulletPoints.some((pt) => pt.toLowerCase().includes(q))) {
          results.push({
            type: 'effect',
            title: `${p.name} in ${hNum}th House`,
            subtitle: eff.bulletPoints[0],
            house: hNum,
            planet: p.id,
          });
        }
      });
    });

    return results.slice(0, 15);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] shadow-2xl border border-stone-200 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Search Bar Input */}
        <div className="p-4 border-b border-stone-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-amber-700 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search life topics (e.g. marriage, wealth, foreign, career, health)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-base font-medium text-stone-900 placeholder:text-stone-400 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-5">
          
          {/* Quick Life Topic Chips */}
          {!query && (
            <div className="space-y-3">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
                Popular Life Topics & Questions:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {COMMON_LIFE_QUERIES.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      onSelectHouse(item.house);
                      onClose();
                    }}
                    className="p-2.5 rounded-xl bg-stone-50 hover:bg-amber-50 hover:border-amber-700 text-left border border-stone-200 text-xs font-medium text-stone-800 transition-all flex items-center justify-between group"
                  >
                    <span>{item.label}</span>
                    <span className="text-[11px] text-amber-800 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                      {item.house}th House &rarr;
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search Results */}
          {query && (
            <div className="space-y-2">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
                Matching Results ({searchResults.length}):
              </span>

              {searchResults.length === 0 ? (
                <div className="text-center py-8 text-stone-400 text-xs">
                  No matching astrological results found for "{query}". Try terms like "wealth", "career", "Saturn", or "7th House".
                </div>
              ) : (
                searchResults.map((res, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      if (res.house) onSelectHouse(res.house);
                      if (res.planet) onSelectPlanet(res.planet);
                      onClose();
                    }}
                    className="p-3 rounded-xl bg-stone-50 hover:bg-amber-50 hover:border-amber-700 border border-stone-200 cursor-pointer transition-all flex items-center justify-between"
                  >
                    <div className="pr-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-amber-950 font-vedic">{res.title}</span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-stone-200 text-stone-700 font-semibold uppercase">
                          {res.type}
                        </span>
                      </div>
                      <p className="text-xs text-stone-600 line-clamp-1 mt-0.5">{res.subtitle}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-stone-400 shrink-0" />
                  </div>
                ))
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
