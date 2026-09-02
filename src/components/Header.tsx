import React from 'react';
import { Sparkles, Compass, Sun, Search, Share2, Layers, Gem } from 'lucide-react';
import { ChartStyle } from '../types/astrology';

interface HeaderProps {
  activeTab: 'chart' | 'planets' | 'houses' | 'builder' | 'gemstones';
  setActiveTab: (tab: 'chart' | 'planets' | 'houses' | 'builder' | 'gemstones') => void;
  chartStyle: ChartStyle;
  setChartStyle: (style: ChartStyle) => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  chartStyle,
  setChartStyle,
  onOpenSearch,
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-amber-900/10 shadow-xs">
      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-2.5 sm:gap-3 cursor-pointer shrink-0" onClick={() => setActiveTab('chart')}>
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-amber-600 via-amber-700 to-amber-900 flex items-center justify-center shadow-md text-amber-100 ring-2 ring-amber-400/30 shrink-0">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-200" />
            </div>
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-amber-950 font-vedic leading-tight">GoodAstrology</span>
              </div>
              <p className="text-[11px] text-stone-500 hidden sm:block">Vedic Astrology Bhavas, House Charts & 9 Planets in 12 Houses</p>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-stone-200/60 p-1 rounded-xl border border-stone-300/70 text-sm font-medium">
            <button
              id="nav-tab-chart"
              onClick={() => setActiveTab('chart')}
              className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-2 ${
                activeTab === 'chart'
                  ? 'bg-amber-900 text-amber-50 shadow-xs font-semibold'
                  : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>House Chart</span>
            </button>

            <button
              id="nav-tab-builder"
              onClick={() => setActiveTab('builder')}
              className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-2 ${
                activeTab === 'builder'
                  ? 'bg-amber-900 text-amber-50 shadow-xs font-semibold'
                  : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Kundli Reader</span>
            </button>

            <button
              id="nav-tab-gemstones"
              onClick={() => setActiveTab('gemstones')}
              className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-2 ${
                activeTab === 'gemstones'
                  ? 'bg-amber-900 text-amber-50 shadow-xs font-semibold'
                  : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <Gem className="w-4 h-4" />
              <span>Gemstones</span>
            </button>

            <button
              id="nav-tab-planets"
              onClick={() => setActiveTab('planets')}
              className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-2 ${
                activeTab === 'planets'
                  ? 'bg-amber-900 text-amber-50 shadow-xs font-semibold'
                  : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <Sun className="w-4 h-4" />
              <span>9 Planets</span>
            </button>

            <button
              id="nav-tab-houses"
              onClick={() => setActiveTab('houses')}
              className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-2 ${
                activeTab === 'houses'
                  ? 'bg-amber-900 text-amber-50 shadow-xs font-semibold'
                  : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>12 Bhavas</span>
            </button>
          </nav>

          {/* Quick Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              id="btn-search-topics"
              onClick={onOpenSearch}
              title="Search life query or symptom"
              className="h-9 px-2.5 sm:px-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-300 transition-colors flex items-center gap-1.5 text-xs font-medium active:scale-95 shrink-0"
            >
              <Search className="w-4 h-4 text-amber-800" />
              <span className="hidden sm:inline">Search</span>
            </button>

            <button
              id="btn-share-link"
              onClick={handleShare}
              title="Share goodastrology"
              className="h-9 px-2.5 sm:px-3 rounded-xl bg-amber-100/70 hover:bg-amber-200 text-amber-900 border border-amber-300/80 transition-colors flex items-center gap-1 text-xs font-medium active:scale-95 shrink-0"
            >
              <Share2 className="w-4 h-4 text-amber-800" />
              <span className="hidden xs:inline sm:inline">{copied ? 'Copied!' : 'Share'}</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className="flex md:hidden overflow-x-auto py-2.5 gap-2 border-t border-stone-200/80 no-scrollbar -mx-4 px-4">
          {[
            { id: 'chart', label: 'House Chart', icon: Compass },
            { id: 'builder', label: 'Kundli Reader', icon: Sparkles },
            { id: 'gemstones', label: 'Gemstones', icon: Gem },
            { id: 'planets', label: '9 Planets', icon: Sun },
            { id: 'houses', label: '12 Bhavas', icon: Layers },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`whitespace-nowrap px-3.5 py-2 rounded-xl text-xs font-medium flex items-center gap-1.5 shrink-0 transition-all active:scale-95 shadow-2xs ${
                  isActive
                    ? 'bg-amber-900 text-amber-50 font-bold shadow-xs'
                    : 'bg-stone-100/90 text-stone-700 hover:bg-stone-200 border border-stone-200/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
