import React, { useState } from 'react';
import { HouseNumber, PlanetId, ChartStyle } from './types/astrology';
import { Header } from './components/Header';
import { KundliChart } from './components/KundliChart';
import { PlanetPosterGrid } from './components/PlanetPosterGrid';
import { HousesExplorer } from './components/HousesExplorer';
import { KundliBuilder } from './components/KundliBuilder';
import { SearchModal } from './components/SearchModal';
import { PrintCheatSheetModal } from './components/PrintCheatSheetModal';
import { HOUSES_DATA } from './data/housesData';
import { PLANETS_DATA } from './data/planetsData';
import { Sparkles, Layers, ArrowUp } from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'chart' | 'planets' | 'houses' | 'builder'>('chart');
  const [selectedHouse, setSelectedHouse] = useState<HouseNumber>(1);
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetId>('sun');
  const [chartStyle, setChartStyle] = useState<ChartStyle>('north');

  // Custom placements for Kundli Builder & Visualizer
  const [customPlacements, setCustomPlacements] = useState<Record<PlanetId, HouseNumber>>({
    sun: 1,
    moon: 4,
    mars: 10,
    mercury: 2,
    jupiter: 5,
    venus: 7,
    saturn: 9,
    rahu: 11,
    ketu: 12,
  });

  // Modal states
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isPrintOpen, setIsPrintOpen] = useState(false);

  // Group placements by house number for the chart renderer
  const houseOccupants: Record<HouseNumber, PlanetId[]> = React.useMemo(() => {
    const map: Record<HouseNumber, PlanetId[]> = {
      1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: [], 10: [], 11: [], 12: []
    };
    Object.entries(customPlacements).forEach(([pId, hNum]) => {
      map[hNum as HouseNumber].push(pId as PlanetId);
    });
    return map;
  }, [customPlacements]);

  const handleHouseSelect = (houseNum: HouseNumber) => {
    setSelectedHouse(houseNum);
  };

  const handlePlanetSelect = (planetId: PlanetId) => {
    setSelectedPlanet(planetId);
    setActiveTab('planets');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 flex flex-col font-sans selection:bg-amber-200 selection:text-amber-950">
      
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        chartStyle={chartStyle}
        setChartStyle={setChartStyle}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenPrint={() => setIsPrintOpen(true)}
      />

      {/* Main App Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
        
        {/* Dynamic Content Views based on activeTab */}
        {activeTab === 'chart' && (
          <div className="space-y-8">
            {/* House Chart Interactive Visualizer */}
            <KundliChart
              selectedHouse={selectedHouse}
              onSelectHouse={handleHouseSelect}
              chartStyle={chartStyle}
              setChartStyle={setChartStyle}
              customPlacements={houseOccupants}
              onInspectPlanet={handlePlanetSelect}
            />

            {/* Quick 12 Houses Grid Shortcut Section */}
            <div className="bg-white rounded-3xl p-6 border border-amber-900/10 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold font-vedic text-amber-950 flex items-center gap-2">
                    <Layers className="w-5 h-5 text-amber-700" />
                    12 Houses of Vedic Kundli (द्वादश भाव संदर्भ)
                  </h3>
                  <p className="text-xs text-stone-600">
                    Click any house card below to explore its specific life significations, karakas, and planetary effects.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('houses')}
                  className="text-xs font-bold text-amber-800 hover:text-amber-950 hover:underline"
                >
                  View Full 12 Bhavas Explorer &rarr;
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as HouseNumber[]).map((hNum) => {
                  const h = HOUSES_DATA[hNum];
                  const isSel = selectedHouse === hNum;
                  return (
                    <div
                      key={hNum}
                      onClick={() => handleHouseSelect(hNum)}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                        isSel
                          ? 'bg-amber-950 text-amber-50 border-amber-950 shadow-md ring-2 ring-amber-400/40'
                          : 'bg-[#FAF8F5] hover:bg-amber-50 text-stone-800 border-stone-200'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold font-vedic">{hNum}th House</span>
                          <span className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${
                            isSel ? 'bg-amber-800 text-amber-200' : 'bg-stone-200 text-stone-700'
                          }`}>
                            {h.svgRegion.split(' ')[0]}
                          </span>
                        </div>
                        <h4 className={`text-xs font-bold font-vedic truncate ${isSel ? 'text-amber-200' : 'text-amber-950'}`}>
                          {h.sanskritName}
                        </h4>
                        <p className={`text-[11px] line-clamp-2 mt-1 ${isSel ? 'text-amber-100/90' : 'text-stone-600'}`}>
                          {h.keySignifications.slice(0, 2).join(', ')}
                        </p>
                      </div>

                      <div className="mt-2 pt-1 border-t border-stone-200/50 flex justify-between items-center text-[10px]">
                        <span className={isSel ? 'text-amber-300' : 'text-amber-800'}>
                          {h.naturalSign.split(' ')[0]}
                        </span>
                        <span className={isSel ? 'text-amber-300' : 'text-stone-400'}>
                          {h.classification.category}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'planets' && (
          <PlanetPosterGrid
            selectedPlanetId={selectedPlanet}
            onSelectPlanet={setSelectedPlanet}
            onSelectHouse={(hNum) => {
              setSelectedHouse(hNum);
              setActiveTab('houses');
            }}
          />
        )}

        {activeTab === 'houses' && (
          <HousesExplorer
            selectedHouse={selectedHouse}
            onSelectHouse={handleHouseSelect}
            onSelectPlanet={handlePlanetSelect}
          />
        )}

        {activeTab === 'builder' && (
          <KundliBuilder
            placements={customPlacements}
            setPlacements={setCustomPlacements}
            onSelectHouse={(hNum) => {
              setSelectedHouse(hNum);
              setActiveTab('chart');
            }}
            onSelectPlanet={handlePlanetSelect}
          />
        )}

      </main>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 mt-16 pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Col 1: About */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span className="text-xl font-bold font-vedic text-white">goodastrology</span>
              </div>
              <p className="text-xs text-stone-400 leading-relaxed">
                Authentic, accessible Vedic astrology knowledge base. Interactive Kundli house chart reader, 9 Navagrahas in 12 houses reference posters, and astrological remedies.
              </p>
            </div>

            {/* Col 2: 12 Houses */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 font-vedic">12 Bhavas (Houses)</h4>
              <div className="grid grid-cols-2 gap-1 text-xs text-stone-400">
                <button onClick={() => { setSelectedHouse(1); setActiveTab('houses'); }} className="text-left hover:text-white">1st H: Lagna (Self)</button>
                <button onClick={() => { setSelectedHouse(2); setActiveTab('houses'); }} className="text-left hover:text-white">2nd H: Dhana (Wealth)</button>
                <button onClick={() => { setSelectedHouse(3); setActiveTab('houses'); }} className="text-left hover:text-white">3rd H: Sahaja (Courage)</button>
                <button onClick={() => { setSelectedHouse(4); setActiveTab('houses'); }} className="text-left hover:text-white">4th H: Bandhu (Home)</button>
                <button onClick={() => { setSelectedHouse(5); setActiveTab('houses'); }} className="text-left hover:text-white">5th H: Putra (Intellect)</button>
                <button onClick={() => { setSelectedHouse(6); setActiveTab('houses'); }} className="text-left hover:text-white">6th H: Ari (Enemies)</button>
                <button onClick={() => { setSelectedHouse(7); setActiveTab('houses'); }} className="text-left hover:text-white">7th H: Yuvati (Spouse)</button>
                <button onClick={() => { setSelectedHouse(8); setActiveTab('houses'); }} className="text-left hover:text-white">8th H: Randhra (Occult)</button>
                <button onClick={() => { setSelectedHouse(9); setActiveTab('houses'); }} className="text-left hover:text-white">9th H: Dharma (Luck)</button>
                <button onClick={() => { setSelectedHouse(10); setActiveTab('houses'); }} className="text-left hover:text-white">10th H: Karma (Career)</button>
                <button onClick={() => { setSelectedHouse(11); setActiveTab('houses'); }} className="text-left hover:text-white">11th H: Labha (Gains)</button>
                <button onClick={() => { setSelectedHouse(12); setActiveTab('houses'); }} className="text-left hover:text-white">12th H: Vyaya (Moksha)</button>
              </div>
            </div>

            {/* Col 3: 9 Planets */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 font-vedic">9 Navagrahas (Planets)</h4>
              <div className="grid grid-cols-2 gap-1 text-xs text-stone-400">
                {(Object.keys(PLANETS_DATA) as PlanetId[]).map((pId) => (
                  <button
                    key={pId}
                    onClick={() => handlePlanetSelect(pId)}
                    className="text-left hover:text-white"
                  >
                    {PLANETS_DATA[pId].avatar} {PLANETS_DATA[pId].name}
                  </button>
                ))}
              </div>
            </div>

            {/* Col 4: Quick Tools */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 font-vedic">Kundli Tools</h4>
              <ul className="space-y-1.5 text-xs text-stone-400">
                <li>
                  <button onClick={() => setActiveTab('chart')} className="hover:text-white">
                    • Interactive Diamond House Chart
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('builder')} className="hover:text-white">
                    • Custom Placement Builder & Yogas
                  </button>
                </li>
                <li>
                  <button onClick={() => setIsPrintOpen(true)} className="hover:text-white">
                    • Printable Kundli Cheat Sheet
                  </button>
                </li>
                <li>
                  <button onClick={() => setIsSearchOpen(true)} className="hover:text-white">
                    • Life Query & Symptom Search
                  </button>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-4">
            <p>
              © {new Date().getFullYear()} <strong className="text-stone-200">goodastrology</strong>. Developed by{' '}
              <a
                href="https://x.com/himaghnamedhi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-2 transition-colors"
              >
                Himaghna Medhi
              </a>
            </p>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-amber-400 hover:text-amber-300 font-medium"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </footer>

      {/* Life Query & Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectHouse={(h) => {
          setSelectedHouse(h);
          setActiveTab('houses');
        }}
        onSelectPlanet={(p) => {
          setSelectedPlanet(p);
          setActiveTab('planets');
        }}
      />

      {/* Printable Cheat Sheet Modal */}
      <PrintCheatSheetModal
        isOpen={isPrintOpen}
        onClose={() => setIsPrintOpen(false)}
      />

      {/* Vercel Web Analytics */}
      <Analytics />

    </div>
  );
}
