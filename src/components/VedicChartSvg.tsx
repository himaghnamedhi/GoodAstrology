import React from 'react';
import { HouseNumber, PlanetId, ChartStyle } from '../types/astrology';
import { GrahaSpashta, DivisionalChartInfo } from '../data/vedicEphemeris';
import { RASHI_NAMES } from '../data/vedicAstrologyCalculator';

interface VedicChartSvgProps {
  chartData: DivisionalChartInfo;
  grahas?: Record<PlanetId, GrahaSpashta>;
  chartStyle: ChartStyle;
  onHouseClick?: (house: HouseNumber) => void;
  selectedHouse?: HouseNumber;
  className?: string;
  showDegrees?: boolean;
}

// Geometry for North Indian Diamond Chart (400x400)
const NORTH_CHART_HOUSE_CENTERS: Record<
  HouseNumber,
  {
    signX: number;
    signY: number;
    planetsX: number;
    planetsY: number;
  }
> = {
  1: { signX: 200, signY: 70, planetsX: 200, planetsY: 105 },
  2: { signX: 100, signY: 35, planetsX: 100, planetsY: 60 },
  3: { signX: 45, signY: 85, planetsX: 55, planetsY: 115 },
  4: { signX: 130, signY: 200, planetsX: 95, planetsY: 205 },
  5: { signX: 45, signY: 315, planetsX: 55, planetsY: 285 },
  6: { signX: 100, signY: 365, planetsX: 100, planetsY: 340 },
  7: { signX: 200, signY: 330, planetsX: 200, planetsY: 295 },
  8: { signX: 300, signY: 365, planetsX: 300, planetsY: 340 },
  9: { signX: 355, signY: 315, planetsX: 345, planetsY: 285 },
  10: { signX: 270, signY: 200, planetsX: 305, planetsY: 205 },
  11: { signX: 355, signY: 85, planetsX: 345, planetsY: 115 },
  12: { signX: 300, signY: 35, planetsX: 300, planetsY: 60 },
};

const PLANET_SHORT_NAMES: Record<PlanetId, { name: string; sanskrit: string; color: string }> = {
  sun: { name: 'Su', sanskrit: 'सू', color: '#b45309' },
  moon: { name: 'Mo', sanskrit: 'चं', color: '#0369a1' },
  mars: { name: 'Ma', sanskrit: 'मं', color: '#b91c1c' },
  mercury: { name: 'Me', sanskrit: 'बु', color: '#047857' },
  jupiter: { name: 'Ju', sanskrit: 'गु', color: '#a16207' },
  venus: { name: 'Ve', sanskrit: 'शु', color: '#7c3aed' },
  saturn: { name: 'Sa', sanskrit: 'श', color: '#334155' },
  rahu: { name: 'Ra', sanskrit: 'रा', color: '#475569' },
  ketu: { name: 'Ke', sanskrit: 'के', color: '#78350f' },
};

// South Indian Grid cell order (fixed signs 1..12 clockwise from Aries at top-row second cell)
// Grid layout 4x4 (row 0-3, col 0-3):
// [0,0]=Pisces(12), [0,1]=Aries(1), [0,2]=Taurus(2), [0,3]=Gemini(3)
// [1,0]=Aquarius(11), [1,3]=Cancer(4)
// [2,0]=Capricorn(10), [2,3]=Leo(5)
// [3,0]=Sagittarius(9), [3,1]=Scorpio(8), [3,2]=Libra(7), [3,3]=Virgo(6)
const SOUTH_INDIAN_CELLS: { sign: number; row: number; col: number }[] = [
  { sign: 12, row: 0, col: 0 },
  { sign: 1, row: 0, col: 1 },
  { sign: 2, row: 0, col: 2 },
  { sign: 3, row: 0, col: 3 },
  { sign: 4, row: 1, col: 3 },
  { sign: 5, row: 2, col: 3 },
  { sign: 6, row: 3, col: 3 },
  { sign: 7, row: 3, col: 2 },
  { sign: 8, row: 3, col: 1 },
  { sign: 9, row: 3, col: 0 },
  { sign: 10, row: 2, col: 0 },
  { sign: 11, row: 1, col: 0 },
];

export const VedicChartSvg: React.FC<VedicChartSvgProps> = ({
  chartData,
  grahas,
  chartStyle,
  onHouseClick,
  selectedHouse,
  className = '',
  showDegrees = true,
}) => {
  // Group planets by house (1-12)
  const occupantsByHouse: Record<HouseNumber, PlanetId[]> = {
    1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: [], 10: [], 11: [], 12: [],
  };

  (Object.keys(chartData.planetPlacements) as PlanetId[]).forEach((pId) => {
    const h = chartData.planetPlacements[pId];
    if (h >= 1 && h <= 12) {
      occupantsByHouse[h].push(pId);
    }
  });

  if (chartStyle === 'north') {
    return (
      <div className={`relative aspect-square select-none max-w-[440px] w-full mx-auto ${className}`}>
        <svg
          viewBox="0 0 400 400"
          className="w-full h-full drop-shadow-sm rounded-xl bg-[#FFFDF9] border-2 border-amber-900/40"
        >
          {/* Background and Base Lines */}
          <rect x="0" y="0" width="400" height="400" fill="#FAF8F5" stroke="#78350f" strokeWidth="3" />

          {/* Diagonals */}
          <line x1="0" y1="0" x2="400" y2="400" stroke="#78350f" strokeWidth="2" />
          <line x1="400" y1="0" x2="0" y2="400" stroke="#78350f" strokeWidth="2" />

          {/* Diamond connecting midpoints */}
          <line x1="200" y1="0" x2="0" y2="200" stroke="#78350f" strokeWidth="2" />
          <line x1="0" y1="200" x2="200" y2="400" stroke="#78350f" strokeWidth="2" />
          <line x1="200" y1="400" x2="400" y2="200" stroke="#78350f" strokeWidth="2" />
          <line x1="400" y1="200" x2="200" y2="0" stroke="#78350f" strokeWidth="2" />

          {/* Render 12 Houses */}
          {([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as HouseNumber[]).map((hNum) => {
            const geo = NORTH_CHART_HOUSE_CENTERS[hNum];
            const signNum = chartData.lagnaHouseSign[hNum];
            const occupants = occupantsByHouse[hNum];
            const isSelected = selectedHouse === hNum;

            return (
              <g
                key={hNum}
                onClick={() => onHouseClick && onHouseClick(hNum)}
                className={`cursor-pointer transition-opacity ${isSelected ? 'opacity-100' : 'hover:opacity-85'}`}
              >
                {/* Zodiac Sign Number (Top corner of house) */}
                <text
                  x={geo.signX}
                  y={geo.signY}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="#78350f"
                  fontSize="12"
                  fontWeight="bold"
                  fontFamily="Cinzel, serif"
                  className="select-none pointer-events-none"
                >
                  {signNum}
                </text>

                {/* Lagna Badge on 1st house */}
                {hNum === 1 && (
                  <text
                    x={geo.signX}
                    y={geo.signY + 14}
                    textAnchor="middle"
                    fill="#92400e"
                    fontSize="9"
                    fontWeight="800"
                    fontFamily="sans-serif"
                    className="select-none pointer-events-none uppercase tracking-wider"
                  >
                    LAGNA
                  </text>
                )}

                {/* Planets Stacked Cleanly to avoid collision */}
                {occupants.length > 0 && (
                  <g>
                    {occupants.map((pId, idx) => {
                      const pMeta = PLANET_SHORT_NAMES[pId];
                      const gSpashta = grahas ? grahas[pId] : undefined;
                      const isRetro = gSpashta?.isRetrograde;
                      const deg = gSpashta ? Math.floor(gSpashta.degreesInRashi) : null;

                      // Vertical stacking offset:
                      const lineCount = occupants.length;
                      const spacing = lineCount <= 2 ? 16 : lineCount <= 4 ? 13 : 11;
                      const yOffset = (idx - (lineCount - 1) / 2) * spacing;

                      const labelText = showDegrees && deg !== null
                        ? `${pMeta.name} ${deg}°${isRetro ? '®' : ''}`
                        : `${pMeta.name}${isRetro ? '®' : ''}`;

                      return (
                        <text
                          key={pId}
                          x={geo.planetsX}
                          y={geo.planetsY + yOffset}
                          textAnchor="middle"
                          dominantBaseline="central"
                          fill={pMeta.color}
                          fontSize={lineCount > 3 ? '10' : '11.5'}
                          fontWeight="700"
                          fontFamily="Plus Jakarta Sans, sans-serif"
                          className="select-none pointer-events-none"
                        >
                          {labelText}
                        </text>
                      );
                    })}
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    );
  }

  // South Indian Square Grid Chart
  return (
    <div className={`relative aspect-square select-none max-w-[440px] w-full mx-auto p-1 bg-[#FAF8F5] rounded-xl border-2 border-amber-900/40 ${className}`}>
      <div className="grid grid-cols-4 grid-rows-4 w-full h-full gap-1 border border-amber-900/30 bg-stone-100/70 p-1 rounded-lg">
        {SOUTH_INDIAN_CELLS.map((cell) => {
          const signNum = cell.sign;
          const signName = RASHI_NAMES[signNum - 1].split(' ')[0];
          const isLagnaSign = chartData.lagnaSign === signNum;

          // Find house number for this sign
          const houseNumber = (((signNum - chartData.lagnaSign + 12) % 12) + 1) as HouseNumber;
          const occupants = occupantsByHouse[houseNumber] || [];
          const isSelected = selectedHouse === houseNumber;

          return (
            <div
              key={signNum}
              style={{ gridRow: cell.row + 1, gridColumn: cell.col + 1 }}
              onClick={() => onHouseClick && onHouseClick(houseNumber)}
              className={`p-1.5 rounded-md flex flex-col justify-between cursor-pointer transition-all border ${
                isSelected
                  ? 'bg-amber-100/90 border-amber-600 ring-2 ring-amber-400'
                  : 'bg-white hover:bg-amber-50/70 border-stone-300/80'
              }`}
            >
              {/* Header: Sign Name & House from Lagna */}
              <div className="flex items-center justify-between text-[10px] leading-tight">
                <span className="font-bold text-stone-700 truncate">{signName}</span>
                {isLagnaSign ? (
                  <span className="bg-amber-900 text-amber-50 font-black px-1 py-0.2 rounded text-[8.5px]">
                    LAGNA
                  </span>
                ) : (
                  <span className="text-stone-400 font-semibold text-[9px]">{houseNumber}H</span>
                )}
              </div>

              {/* Occupants */}
              <div className="my-auto py-0.5 flex flex-wrap gap-1">
                {occupants.map((pId) => {
                  const pMeta = PLANET_SHORT_NAMES[pId];
                  const gSpashta = grahas ? grahas[pId] : undefined;
                  const isRetro = gSpashta?.isRetrograde;
                  const deg = gSpashta ? Math.floor(gSpashta.degreesInRashi) : null;

                  return (
                    <span
                      key={pId}
                      style={{ color: pMeta.color }}
                      className="text-[10px] font-bold bg-stone-100 px-1 py-0.2 rounded whitespace-nowrap"
                    >
                      {pMeta.name}
                      {showDegrees && deg !== null ? ` ${deg}°` : ''}
                      {isRetro ? '®' : ''}
                    </span>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Center 2x2 Cell for Title / Identity */}
        <div
          style={{ gridRow: '2 / span 2', gridColumn: '2 / span 2' }}
          className="bg-amber-50/90 rounded-lg border border-amber-900/20 p-2 flex flex-col items-center justify-center text-center shadow-2xs"
        >
          <span className="text-amber-900/70 text-[10px] font-serif">॥ शुभम् भवतु ॥</span>
          <h4 className="text-amber-950 font-vedic font-black text-sm tracking-tight">{chartData.name}</h4>
          <span className="text-[10px] text-amber-900 font-semibold font-serif">{chartData.sanskritName}</span>
          <span className="text-[9.5px] text-stone-600 mt-1 max-w-[120px] leading-tight">
            Lagna: {RASHI_NAMES[chartData.lagnaSign - 1].split(' ')[0]}
          </span>
        </div>
      </div>
    </div>
  );
};
