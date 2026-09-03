import React, { useState } from 'react';
import { HouseNumber, PlanetId, ChartStyle } from './types/astrology';
import { Header } from './components/Header';
import { KundliChart } from './components/KundliChart';
import { KundliBuilder } from './components/KundliBuilder';
import { GemstoneRecommender } from './components/GemstoneRecommender';
import { MatchFinder } from './components/MatchFinder';
import { SearchModal } from './components/SearchModal';
import { CustomReportModal } from './components/CustomReportModal';
import { HOUSES_DATA } from './data/housesData';
import { Sparkles, Layers, ArrowUp } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'chart' | 'builder' | 'gemstones' | 'match'>('chart');
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
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [reportType, setReportType] = useState<'kundli' | 'match' | 'gemstone'>('kundli');
  const [reportMatchData, setReportMatchData] = useState<{ report?: any; p1?: any; p2?: any }>({});
  const [reportGemstoneData, setReportGemstoneData] = useState<{ lagna?: number; profile?: any; name?: string }>({});

  const handleOpenReport = (type: 'kundli' | 'match' | 'gemstone' = 'kundli', data?: any) => {
    setReportType(type);
    if (type === 'match' && data) {
      setReportMatchData(data);
    } else if (type === 'gemstone' && data) {
      setReportGemstoneData(data);
    }
    setIsReportOpen(true);
  };

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
              onOpenReport={() => handleOpenReport('kundli')}
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
                    Click any house card below to highlight its specific life significations, karakas, and planetary effects in the chart above.
                  </p>
                </div>
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

        {activeTab === 'builder' && (
          <KundliBuilder
            placements={customPlacements}
            setPlacements={setCustomPlacements}
            onSelectHouse={(hNum) => {
              setSelectedHouse(hNum);
              setActiveTab('chart');
            }}
            onSelectPlanet={handlePlanetSelect}
            onOpenReport={() => handleOpenReport('kundli')}
          />
        )}

        {activeTab === 'gemstones' && (
          <GemstoneRecommender
            initialLagna={1}
            onNavigateToTab={(tab) => setActiveTab(tab)}
            onOpenCustomReport={(data) => handleOpenReport('gemstone', data)}
          />
        )}

        {activeTab === 'match' && (
          <MatchFinder
            onNavigateToTab={(tab) => setActiveTab(tab)}
            onOpenCustomReport={(data) => handleOpenReport('match', data)}
          />
        )}

      </main>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 mt-16 pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Col 1: About */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span className="text-xl font-bold font-vedic text-white">GoodAstrology</span>
              </div>
              <p className="text-xs text-stone-400 leading-relaxed">
                A modern Vedic astrology platform built on open-source technologies, using classical Vedic astrology principles and structured calculations to generate Kundli analysis, gemstone recommendations, and compatibility reports.
              </p>
            </div>

            {/* Col 2: Tools */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 font-vedic">Astrological Tools</h4>
              <ul className="space-y-2 text-xs text-stone-400">
                <li>
                  <button
                    onClick={() => {
                      setActiveTab('builder');
                      scrollToTop();
                    }}
                    className="text-stone-200 hover:text-amber-400 font-medium flex items-center gap-1.5 transition-colors group cursor-pointer"
                  >
                    <span className="text-amber-400 group-hover:translate-x-0.5 transition-transform">1.</span>
                    <span>Kundli Reader</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setActiveTab('gemstones');
                      scrollToTop();
                    }}
                    className="text-stone-200 hover:text-amber-400 font-medium flex items-center gap-1.5 transition-colors group cursor-pointer"
                  >
                    <span className="text-amber-400 group-hover:translate-x-0.5 transition-transform">2.</span>
                    <span>Find Gemstone You Need</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setActiveTab('match');
                      scrollToTop();
                    }}
                    className="text-stone-200 hover:text-amber-400 font-medium flex items-center gap-1.5 transition-colors group cursor-pointer"
                  >
                    <span className="text-amber-400 group-hover:translate-x-0.5 transition-transform">3.</span>
                    <span className="font-semibold text-amber-200">Match Finder</span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-900/80 text-amber-200 border border-amber-500/40 font-bold">New</span>
                  </button>
                </li>
                <li className="flex items-center gap-1.5 text-stone-500 cursor-not-allowed">
                  <span>•</span>
                  <span>Dasha & Antardasha Calculator</span>
                  <span className="text-[9.5px] px-1.5 py-0.2 rounded bg-stone-800 text-stone-400 border border-stone-700 font-medium">Coming Soon</span>
                </li>
                <li className="flex items-center gap-1.5 text-stone-500 cursor-not-allowed">
                  <span>•</span>
                  <span>Transit & Sade Sati Tracker</span>
                  <span className="text-[9.5px] px-1.5 py-0.2 rounded bg-stone-800 text-stone-400 border border-stone-700 font-medium">Coming Soon</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-stone-800 grid grid-cols-1 sm:grid-cols-3 items-center text-xs text-stone-400 gap-4">
            <div className="hidden sm:block" />
            <p className="text-center">
              © {new Date().getFullYear()} <strong className="text-stone-200">GoodAstrology</strong>. Developed by{' '}
              <a
                href="https://x.com/himaghnamedhi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-2 transition-colors"
              >
                Himaghna Medhi
              </a>
            </p>
            <div className="flex justify-center sm:justify-end">
              <button
                onClick={scrollToTop}
                className="flex items-center gap-1 text-amber-400 hover:text-amber-300 font-medium cursor-pointer"
              >
                <span>Back to Top</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </footer>

      {/* Life Query & Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectHouse={(h) => {
          setSelectedHouse(h);
          setActiveTab('chart');
        }}
        onSelectPlanet={(p) => {
          setSelectedPlanet(p);
          setActiveTab('chart');
        }}
      />

      {/* Printable Custom Vedic Report Modal */}
      <CustomReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        initialReportType={reportType}
        placements={customPlacements}
        chartStyle={chartStyle}
        initialMatchReport={reportMatchData.report}
        initialP1Details={reportMatchData.p1}
        initialP2Details={reportMatchData.p2}
        initialGemstoneLagna={reportGemstoneData.lagna}
        initialGemstoneProfile={reportGemstoneData.profile}
        initialGemstoneNativeName={reportGemstoneData.name}
      />

    </div>
  );
}
