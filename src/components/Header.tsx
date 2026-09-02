import React from 'react';
import { Sparkles, Compass, Sun, Search, Printer, Share2, Layers } from 'lucide-react';
import { ChartStyle } from '../types/astrology';

interface HeaderProps {
  activeTab: 'chart' | 'planets' | 'houses' | 'builder';
  setActiveTab: (tab: 'chart' | 'planets' | 'houses' | 'builder') => void;
  chartStyle: ChartStyle;
  setChartStyle: (style: ChartStyle) => void;
  onOpenSearch: () => void;
  onOpenPrint: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  chartStyle,
  setChartStyle,
  onOpenSearch,
  onOpenPrint,
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
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('chart')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-600 via-amber-700 to-amber-900 flex items-center justify-center shadow-md text-amber-100 ring-2 ring-amber-400/30">
              <Sparkles className="w-5 h-5 text-amber-200" />
            </div>
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-extrabold tracking-tight text-amber-950 font-vedic">goodastrology</span>
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
              id="nav-tab-planets"
              onClick={() => setActiveTab('planets')}
              className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-2 ${
                activeTab === 'planets'
                  ? 'bg-amber-900 text-amber-50 shadow-xs font-semibold'
                  : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <Sun className="w-4 h-4" />
              <span>9 Planets Guide</span>
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
          </nav>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <button
              id="btn-search-topics"
              onClick={onOpenSearch}
              title="Search life query or symptom"
              className="p-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-300 transition-colors flex items-center gap-1.5 text-xs font-medium"
            >
              <Search className="w-4 h-4 text-amber-800" />
              <span className="hidden sm:inline">Search</span>
            </button>

            <button
              id="btn-print-cheatsheet"
              onClick={onOpenPrint}
              title="Printable Kundli Cheat Sheet"
              className="p-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-300 transition-colors flex items-center gap-1 text-xs font-medium"
            >
              <Printer className="w-4 h-4 text-amber-800" />
              <span className="hidden lg:inline">Print</span>
            </button>

            <button
              id="btn-share-link"
              onClick={handleShare}
              title="Share goodastrology"
              className="p-2 rounded-lg bg-amber-100/70 hover:bg-amber-200 text-amber-900 border border-amber-300/80 transition-colors flex items-center gap-1 text-xs font-medium"
            >
              <Share2 className="w-4 h-4 text-amber-800" />
              <span>{copied ? 'Copied!' : 'Share'}</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className="flex md:hidden overflow-x-auto py-2 gap-1.5 border-t border-stone-200 no-scrollbar">
          {[
            { id: 'chart', label: 'House Chart', icon: Compass },
            { id: 'planets', label: '9 Planets', icon: Sun },
            { id: 'houses', label: '12 Bhavas', icon: Layers },
            { id: 'builder', label: 'Kundli Reader', icon: Sparkles },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 shrink-0 ${
                  isActive
                    ? 'bg-amber-900 text-amber-50 font-semibold'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
