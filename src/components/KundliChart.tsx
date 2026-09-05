import React, { useState } from 'react';
import { HouseNumber, PlanetId, ChartStyle } from '../types/astrology';
import { HOUSES_DATA, NORTH_CHART_GEOMETRY } from '../data/housesData';
import { PLANETS_DATA } from '../data/planetsData';
import { Sparkles, Info, Eye, Compass, CheckCircle2, ChevronRight, Award, ShieldAlert, Star, Printer } from 'lucide-react';

interface KundliChartProps {
  selectedHouse: HouseNumber | null;
  onSelectHouse: (house: HouseNumber) => void;
  chartStyle: ChartStyle;
  setChartStyle: (style: ChartStyle) => void;
  customPlacements?: Record<HouseNumber, PlanetId[]>;
  onInspectPlanet?: (planetId: PlanetId) => void;
  onOpenReport?: () => void;
}

export const KundliChart: React.FC<KundliChartProps> = ({
  selectedHouse,
  onSelectHouse,
  chartStyle,
  setChartStyle,
  customPlacements = {
    1: ['sun'],
    2: ['mercury'],
    4: ['moon'],
    5: ['jupiter'],
    7: ['venus'],
    9: ['saturn'],
    10: ['mars'],
    11: ['rahu'],
    12: ['ketu'],
  },
  onInspectPlanet,
  onOpenReport,
}) => {
  const [hoveredHouse, setHoveredHouse] = useState<HouseNumber | null>(null);
  const [highlightCategory, setHighlightCategory] = useState<'all' | 'kendra' | 'trikona' | 'upachaya' | 'dusthana' | 'maraka'>('all');
  const [displayMode, setDisplayMode] = useState<'houseNumber' | 'bhavaName' | 'karaka' | 'rashi'>('houseNumber');
  const [ornateStyle, setOrnateStyle] = useState(true);

  // Determine if a house matches active highlight category
  const isHighlighted = (hNum: HouseNumber): boolean => {
    if (highlightCategory === 'all') return true;
    const h = HOUSES_DATA[hNum];
    if (highlightCategory === 'kendra') return h.classification.isKendra;
    if (highlightCategory === 'trikona') return h.classification.isTrikona;
    if (highlightCategory === 'upachaya') return h.classification.isUpachaya;
    if (highlightCategory === 'dusthana') return h.classification.isDusthana;
    if (highlightCategory === 'maraka') return hNum === 2 || hNum === 7;
    return false;
  };

  const activeHouseData = selectedHouse ? HOUSES_DATA[selectedHouse] : (hoveredHouse ? HOUSES_DATA[hoveredHouse] : null);

  // Suffix helper: 1st, 2nd, 3rd, 4th...
  const getOrdinal = (n: number) => {
    const s = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  };

  return (
    <div className="space-y-6">
      {/* Top Controls & Category Filters */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-amber-900/10 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-amber-950 font-vedic flex items-center gap-2">
            <Compass className="w-5 h-5 text-amber-700" />
            Interactive Vedic Kundli House Chart (भाव चक्र)
          </h2>
          <p className="text-xs text-stone-600 mt-0.5">
            Click on any house in the chart to identify its position, Sanskrit Bhava name, life significations, and planetary rules.
          </p>
        </div>

        {/* View Options & Chart Toggle */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="flex items-center bg-stone-100 p-1 rounded-xl border border-stone-200">
            <button
              id="btn-north-chart"
              onClick={() => setChartStyle('north')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                chartStyle === 'north' ? 'bg-amber-900 text-amber-50 shadow-xs' : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              North Indian (Diamond)
            </button>
            <button
              id="btn-south-chart"
              onClick={() => setChartStyle('south')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                chartStyle === 'south' ? 'bg-amber-900 text-amber-50 shadow-xs' : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              South Indian (Box)
            </button>
          </div>

          <div className="flex items-center bg-stone-100 p-1 rounded-xl border border-stone-200">
            <span className="text-[11px] font-semibold text-stone-500 px-2">Label:</span>
            <button
              onClick={() => setDisplayMode('houseNumber')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                displayMode === 'houseNumber' ? 'bg-white text-amber-900 shadow-xs font-semibold' : 'text-stone-600'
              }`}
            >
              1st to 12th
            </button>
            <button
              onClick={() => setDisplayMode('bhavaName')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                displayMode === 'bhavaName' ? 'bg-white text-amber-900 shadow-xs font-semibold' : 'text-stone-600'
              }`}
            >
              Bhavas
            </button>
            <button
              onClick={() => setDisplayMode('rashi')}
              className={`px-2.5 py-1 rounded-md transition-all ${
                displayMode === 'rashi' ? 'bg-white text-amber-900 shadow-xs font-semibold' : 'text-stone-600'
              }`}
            >
              Signs
            </button>
          </div>

          {onOpenReport && (
            <button
              id="btn-chart-print-report"
              onClick={onOpenReport}
              className="px-3 py-1.5 rounded-xl bg-amber-900 hover:bg-amber-950 text-amber-50 shadow-xs text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95"
              title="Print full horoscope report"
            >
              <Printer className="w-3.5 h-3.5 text-amber-300" />
              <span>Print Report</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Visualizer Area: SVG Chart + Live Inspector (Balanced 50/50 Columns of Identical Size) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        
        {/* Left / Center: Interactive SVG Kundli */}
        <div className="w-full h-full bg-amber-50/50 p-5 sm:p-6 rounded-3xl border border-amber-900/15 shadow-sm flex flex-col items-center justify-between">
          
          {/* Quick Highlight Filter Chips */}
          <div className="w-full flex flex-wrap items-center justify-center gap-1.5 mb-4 text-xs">
            <span className="text-stone-500 font-medium mr-1">Highlight:</span>
            {[
              { id: 'all', label: 'All Houses', color: 'bg-stone-200 text-stone-800' },
              { id: 'kendra', label: '⭐ Kendras (1, 4, 7, 10)', color: 'bg-amber-100 text-amber-900 border border-amber-300' },
              { id: 'trikona', label: '✨ Trikonas (1, 5, 9)', color: 'bg-emerald-100 text-emerald-900 border border-emerald-300' },
              { id: 'upachaya', label: '📈 Upachayas (3, 6, 10, 11)', color: 'bg-blue-100 text-blue-900 border border-blue-300' },
              { id: 'dusthana', label: '⚡ Dusthanas (6, 8, 12)', color: 'bg-rose-100 text-rose-900 border border-rose-300' },
              { id: 'maraka', label: '🛡️ Marakas (2, 7)', color: 'bg-purple-100 text-purple-900 border border-purple-300' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setHighlightCategory(f.id as any)}
                className={`px-2.5 py-1 rounded-full font-medium transition-all ${
                  highlightCategory === f.id
                    ? 'ring-2 ring-amber-800 scale-105 shadow-xs font-semibold'
                    : 'opacity-70 hover:opacity-100'
                } ${f.color}`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Chart Wrapper Container */}
          <div className="relative w-full max-w-[480px] aspect-square bg-[#FDFBF7] p-2 rounded-2xl shadow-inner border border-amber-900/20 my-auto">
            {chartStyle === 'north' ? (
              /* NORTH INDIAN DIAMOND CHART */
              <svg
                viewBox="0 0 400 400"
                className="w-full h-full select-none cursor-pointer transition-all drop-shadow-sm"
              >
                <defs>
                  {/* Gradients for House Fill */}
                  <linearGradient id="gradDefault" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFF9E6" />
                    <stop offset="100%" stopColor="#F8EBC6" />
                  </linearGradient>
                  <linearGradient id="gradSelected" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FDE68A" />
                    <stop offset="100%" stopColor="#F59E0B" />
                  </linearGradient>
                  <linearGradient id="gradHover" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FEF3C7" />
                    <stop offset="100%" stopColor="#FDE68A" />
                  </linearGradient>
                  <linearGradient id="gradKendra" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFFBEB" />
                    <stop offset="100%" stopColor="#FEF08A" />
                  </linearGradient>
                  <linearGradient id="gradTrikona" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ECFDF5" />
                    <stop offset="100%" stopColor="#D1FAE5" />
                  </linearGradient>
                  <linearGradient id="gradDusthana" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFF1F2" />
                    <stop offset="100%" stopColor="#FFE4E6" />
                  </linearGradient>
                </defs>

                {/* 12 Individual Clickable House Polygons */}
                {([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as HouseNumber[]).map((hNum) => {
                  const geo = NORTH_CHART_GEOMETRY[hNum];
                  const hData = HOUSES_DATA[hNum];
                  const isSel = selectedHouse === hNum;
                  const isHov = hoveredHouse === hNum;
                  const isCat = isHighlighted(hNum);
                  const planetsInHouse = customPlacements[hNum] || [];

                  let fillColor = '#FFFDF5';
                  if (isSel) fillColor = 'url(#gradSelected)';
                  else if (isHov) fillColor = 'url(#gradHover)';
                  else if (!isCat) fillColor = '#F5F5F4';
                  else if (highlightCategory === 'kendra' && hData.classification.isKendra) fillColor = 'url(#gradKendra)';
                  else if (highlightCategory === 'trikona' && hData.classification.isTrikona) fillColor = 'url(#gradTrikona)';
                  else if (highlightCategory === 'dusthana' && hData.classification.isDusthana) fillColor = 'url(#gradDusthana)';
                  else if (hNum === 1) fillColor = '#FFFBEB'; // Lagna subtle warm highlight

                  return (
                    <g
                      key={hNum}
                      id={`house-polygon-${hNum}`}
                      onClick={() => onSelectHouse(hNum)}
                      onMouseEnter={() => setHoveredHouse(hNum)}
                      onMouseLeave={() => setHoveredHouse(null)}
                      className="transition-colors duration-150 group"
                    >
                      {/* House Region Polygon */}
                      <polygon
                        points={geo.points}
                        fill={fillColor}
                        stroke={isSel ? '#78350F' : '#3E2723'}
                        strokeWidth={isSel ? '3.5' : '1.8'}
                        className="transition-all duration-200 hover:filter hover:brightness-95"
                      />

                      {/* Main House Label */}
                      <text
                        x={geo.labelX}
                        y={geo.labelY}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className={`pointer-events-none transition-all ${
                          isSel
                            ? 'fill-amber-950 font-extrabold text-[15px]'
                            : isHov
                            ? 'fill-amber-900 font-bold text-[14px]'
                            : 'fill-stone-900 font-bold text-[13px]'
                        }`}
                        style={{ fontFamily: "'Cinzel', serif" }}
                      >
                        {displayMode === 'houseNumber' && `${getOrdinal(hNum)} House`}
                        {displayMode === 'bhavaName' && hData.sanskritName.split(' ')[0]}
                        {displayMode === 'rashi' && `${hNum}. ${hData.naturalSign.split(' ')[0]}`}
                      </text>

                      {/* Sub-label: Sanskrit or Classification badge */}
                      <text
                        x={geo.labelX}
                        y={geo.labelY + 14}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="pointer-events-none fill-amber-900/80 text-[9.5px] font-semibold tracking-tight"
                      >
                        {hNum === 1 ? '★ LAGNA ★' : hData.sanskritName.split(' ')[0]}
                      </text>

                      {/* Placed Planets Badges */}
                      {planetsInHouse.length > 0 && (
                        <g transform={`translate(${geo.badgeX}, ${geo.badgeY})`}>
                          {planetsInHouse.slice(0, 3).map((pId, idx) => {
                            const p = PLANETS_DATA[pId];
                            const offsetX = (idx - (planetsInHouse.length - 1) / 2) * 22;
                            return (
                              <g key={pId} transform={`translate(${offsetX}, 0)`}>
                                <circle
                                  r="9"
                                  fill="#451A03"
                                  stroke="#FDE68A"
                                  strokeWidth="1.2"
                                  className="shadow-sm"
                                />
                                <text
                                  textAnchor="middle"
                                  dominantBaseline="central"
                                  className="fill-amber-100 text-[9px] font-bold pointer-events-none"
                                >
                                  {p.name.substring(0, 2).toUpperCase()}
                                </text>
                              </g>
                            );
                          })}
                        </g>
                      )}
                    </g>
                  );
                })}

                {/* Classic Traditional Ornate Curved Lines matching reference poster */}
                {ornateStyle && (
                  <g pointerEvents="none" className="opacity-40">
                    {/* Top corner arches */}
                    <path d="M 0,200 Q 100,50 200,0" fill="none" stroke="#78350F" strokeWidth="1.2" strokeDasharray="3,3" />
                    <path d="M 200,0 Q 300,50 400,200" fill="none" stroke="#78350F" strokeWidth="1.2" strokeDasharray="3,3" />
                    <path d="M 0,200 Q 100,350 200,400" fill="none" stroke="#78350F" strokeWidth="1.2" strokeDasharray="3,3" />
                    <path d="M 200,400 Q 300,350 400,200" fill="none" stroke="#78350F" strokeWidth="1.2" strokeDasharray="3,3" />
                  </g>
                )}

                {/* Outer Framing Borders */}
                <rect x="1" y="1" width="398" height="398" fill="none" stroke="#3E2723" strokeWidth="3" pointerEvents="none" />
                <rect x="5" y="5" width="390" height="390" fill="none" stroke="#78350F" strokeWidth="1" strokeDasharray="4,2" pointerEvents="none" />
              </svg>
            ) : (
              /* SOUTH INDIAN BOX CHART (Fixed Zodiac signs clockwise starting from Pisces top-second) */
              <div className="w-full h-full grid grid-cols-4 grid-rows-4 gap-1 p-2 bg-amber-100/30 rounded-xl border-2 border-stone-800">
                {/* 12 fixed South Indian boxes around perimeter */}
                {[
                  { pos: 12, rashi: 'Pisces (Meena)', house: 12 },
                  { pos: 1, rashi: 'Aries (Mesha)', house: 1 },
                  { pos: 2, rashi: 'Taurus (Vrishabha)', house: 2 },
                  { pos: 3, rashi: 'Gemini (Mithuna)', house: 3 },
                  { pos: 11, rashi: 'Aquarius (Kumbha)', house: 11 },
                  { pos: 'center', rashi: 'Center' },
                  { pos: 4, rashi: 'Cancer (Karka)', house: 4 },
                  { pos: 10, rashi: 'Capricorn (Makara)', house: 10 },
                  { pos: 5, rashi: 'Leo (Simha)', house: 5 },
                  { pos: 9, rashi: 'Sagittarius (Dhanu)', house: 9 },
                  { pos: 8, rashi: 'Scorpio (Vrishchika)', house: 8 },
                  { pos: 7, rashi: 'Libra (Tula)', house: 7 },
                  { pos: 6, rashi: 'Virgo (Kanya)', house: 6 },
                ].map((item, idx) => {
                  if (item.pos === 'center') {
                    return (
                      <div
                        key="center"
                        className="col-span-2 row-span-2 bg-[#FFFBEB] rounded-lg border border-amber-300 flex flex-col items-center justify-center p-2 text-center"
                      >
                        <Sparkles className="w-6 h-6 text-amber-700 mb-1" />
                        <span className="font-vedic font-bold text-amber-950 text-sm">South Indian Chart</span>
                        <span className="text-[10px] text-stone-500">Fixed Zodiac Box Style</span>
                      </div>
                    );
                  }
                  const hNum = item.house as HouseNumber;
                  const isSel = selectedHouse === hNum;
                  const planetsInHouse = customPlacements[hNum] || [];

                  return (
                    <div
                      key={idx}
                      onClick={() => onSelectHouse(hNum)}
                      className={`p-1.5 rounded-md cursor-pointer transition-all flex flex-col justify-between border ${
                        isSel
                          ? 'bg-amber-300 border-amber-900 font-bold shadow-xs'
                          : 'bg-white hover:bg-amber-50 border-stone-300'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="font-bold text-amber-950">{getOrdinal(hNum)} H</span>
                        <span className="text-[9px] text-stone-500 font-semibold">{item.rashi.split(' ')[0]}</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {planetsInHouse.map((pId) => (
                          <span key={pId} className="px-1 py-0.5 rounded bg-amber-950 text-amber-100 text-[8px] font-bold">
                            {PLANETS_DATA[pId].name.slice(0, 2)}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Chart Quick Instructions */}
          <div className="mt-4 flex items-center justify-between w-full text-xs text-stone-600 px-2">
            <div className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 rounded-full bg-amber-400 border border-amber-700"></span>
              <span><strong>Top Diamond (1st House)</strong> is the Ascendant / Lagna.</span>
            </div>
            <button
              onClick={() => setOrnateStyle(!ornateStyle)}
              className="text-amber-800 underline hover:text-amber-950 text-[11px] font-medium"
            >
              {ornateStyle ? 'Hide Ornate Accents' : 'Show Ornate Accents'}
            </button>
          </div>
        </div>

        {/* Right Panel: Dynamic Live Inspector for Clicked House */}
        <div className="w-full h-full flex flex-col">
          {activeHouseData ? (
            <div className="w-full h-full bg-white rounded-3xl p-5 sm:p-6 border border-amber-900/15 shadow-sm flex flex-col justify-between space-y-4">
              
              {/* Header of Selected House */}
              <div className="flex items-start justify-between border-b border-stone-200 pb-3.5">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold text-xs border border-amber-300">
                      {getOrdinal(activeHouseData.number)} House
                    </span>
                    <span className="text-xs font-semibold text-stone-500">
                      {activeHouseData.svgRegion}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-amber-950 mt-1 font-vedic">
                    {activeHouseData.sanskritName}
                  </h3>
                  <p className="text-xs text-stone-600 font-medium">{activeHouseData.name}</p>
                </div>

                <div className="text-right">
                  <span className="text-xs px-2 py-1 rounded-md bg-stone-100 font-semibold text-stone-700">
                    Sign: {activeHouseData.naturalSign}
                  </span>
                </div>
              </div>

              {/* Classification Badges */}
              <div className="flex flex-wrap gap-1.5 text-xs">
                {activeHouseData.classification.subCategories.map((cat, i) => (
                  <span key={i} className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 font-medium border border-amber-200/70">
                    {cat}
                  </span>
                ))}
              </div>

              {/* Description */}
              <p className="text-xs leading-relaxed text-stone-700">
                {activeHouseData.description}
              </p>

              {/* Key Significations Grid */}
              <div className="bg-[#FAF8F5] p-3.5 rounded-xl border border-stone-200 space-y-2">
                <h4 className="text-xs font-bold text-amber-950 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Key Life Spheres & Significations
                </h4>
                <ul className="space-y-1 text-xs text-stone-700">
                  {activeHouseData.keySignifications.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-amber-700 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Karaka & Body Parts */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200">
                  <span className="text-[11px] font-semibold text-stone-500 block">Significator (Karakas):</span>
                  <span className="font-bold text-amber-900">{activeHouseData.karakas.join(', ')}</span>
                </div>
                <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200">
                  <span className="text-[11px] font-semibold text-stone-500 block">Ruled Body Parts:</span>
                  <span className="font-medium text-stone-800">{activeHouseData.bodyParts.slice(0, 3).join(', ')}</span>
                </div>
              </div>

              {/* Quick Planet Placements in this House */}
              <div className="pt-2 border-t border-stone-200">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                    9 Navagraha Effects in {getOrdinal(activeHouseData.number)} House:
                  </h4>
                </div>

                <div className="grid grid-cols-3 gap-1.5 max-h-48 overflow-y-auto pr-1">
                  {(Object.keys(PLANETS_DATA) as PlanetId[]).map((pId) => {
                    const p = PLANETS_DATA[pId];
                    const eff = p.effects[activeHouseData.number];
                    return (
                      <button
                        key={pId}
                        onClick={() => onInspectPlanet && onInspectPlanet(pId)}
                        className="text-left p-2 rounded-lg bg-white hover:bg-amber-100/60 border border-stone-200 transition-all group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-amber-950 group-hover:text-amber-800">{p.name}</span>
                          <span className="text-xs">{p.avatar}</span>
                        </div>
                        <p className="text-[10px] text-stone-600 line-clamp-1 mt-0.5">
                          {eff.bulletPoints[0]}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          ) : (
            <div className="w-full h-full min-h-[500px] bg-white rounded-3xl p-8 border border-amber-900/15 shadow-sm text-center flex flex-col items-center justify-center">
              <Compass className="w-12 h-12 text-amber-600/40 mb-3 animate-spin-slow" />
              <h3 className="font-vedic text-lg font-bold text-amber-950">Select Any House</h3>
              <p className="text-xs text-stone-600 max-w-xs mt-1">
                Click any diamond or triangle in the chart above to read its exact position, Sanskrit Bhava name, and planetary effects.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
