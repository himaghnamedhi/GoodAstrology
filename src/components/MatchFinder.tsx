import React, { useState, useMemo } from 'react';
import { 
  Heart, 
  Sparkles, 
  Calendar, 
  Clock, 
  MapPin, 
  Scale, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Printer, 
  Share2, 
  RotateCcw, 
  Info, 
  ChevronDown, 
  ChevronUp, 
  Flame,
  Users,
  Search,
  BookOpen,
  Award,
  FileText
} from 'lucide-react';
import { 
  POPULAR_CITIES, 
  CityPreset, 
  BirthDetails 
} from '../data/vedicAstrologyCalculator';
import { 
  calculateVedAstroMatch, 
  VedAstroMatchReport, 
  MATCH_PRESETS,
  KutaResult
} from '../data/vedicMatchCalculator';

interface MatchFinderProps {
  onNavigateToTab?: (tab: 'chart' | 'builder' | 'gemstones' | 'match') => void;
  onOpenCustomReport?: (reportData: { report: VedAstroMatchReport; p1: BirthDetails; p2: BirthDetails }) => void;
}

export const MatchFinder: React.FC<MatchFinderProps> = ({ onNavigateToTab, onOpenCustomReport }) => {
  // Partner 1 (Groom / Boy) State
  const [p1Details, setP1Details] = useState<BirthDetails>({
    name: '',
    gender: 'male',
    dob: '1996-05-15',
    tob: '08:30',
    city: 'Varanasi (Kashi)',
    latitude: 25.3176,
    longitude: 82.9739,
    timezoneOffset: 5.5,
    weightKg: 68,
    weightUnit: 'kg',
  });
  const [p1Hour, setP1Hour] = useState<string>('08');
  const [p1Minute, setP1Minute] = useState<string>('30');
  const [p1Period, setP1Period] = useState<'AM' | 'PM'>('AM');
  const [p1TimeUnknown, setP1TimeUnknown] = useState<boolean>(false);
  const [p1CityDropdown, setP1CityDropdown] = useState<boolean>(false);
  const [p1CitySearch, setP1CitySearch] = useState<string>('');

  // Partner 2 (Bride / Girl) State
  const [p2Details, setP2Details] = useState<BirthDetails>({
    name: '',
    gender: 'female',
    dob: '1998-11-20',
    tob: '14:15',
    city: 'Lucknow',
    latitude: 26.8467,
    longitude: 80.9462,
    timezoneOffset: 5.5,
    weightKg: 54,
    weightUnit: 'kg',
  });
  const [p2Hour, setP2Hour] = useState<string>('02');
  const [p2Minute, setP2Minute] = useState<string>('15');
  const [p2Period, setP2Period] = useState<'AM' | 'PM'>('PM');
  const [p2TimeUnknown, setP2TimeUnknown] = useState<boolean>(false);
  const [p2CityDropdown, setP2CityDropdown] = useState<boolean>(false);
  const [p2CitySearch, setP2CitySearch] = useState<string>('');

  // Display View & Details Mode
  const [viewMode, setViewMode] = useState<'easy' | 'advanced'>('easy');
  const [expandedKuta, setExpandedKuta] = useState<string | null>(null);
  const [showPrintModal, setShowPrintModal] = useState<boolean>(false);
  const [copiedNotification, setCopiedNotification] = useState<boolean>(false);
  const [hasCalculated, setHasCalculated] = useState<boolean>(false);

  // Active calculated match report
  const [matchReport, setMatchReport] = useState<VedAstroMatchReport>(() => 
    calculateVedAstroMatch(p1Details, p2Details)
  );

  // Recalculate match report
  const handleCalculateMatch = () => {
    // Format tob for partner 1
    let p1Tob = p1Details.tob;
    if (p1TimeUnknown || !p1Hour || !p1Minute) {
      p1Tob = '12:00';
    } else {
      let hNum = parseInt(p1Hour, 10) || 12;
      if (p1Period === 'PM' && hNum < 12) hNum += 12;
      if (p1Period === 'AM' && hNum === 12) hNum = 0;
      p1Tob = `${String(hNum).padStart(2, '0')}:${String(p1Minute).padStart(2, '0')}`;
    }

    // Format tob for partner 2
    let p2Tob = p2Details.tob;
    if (p2TimeUnknown || !p2Hour || !p2Minute) {
      p2Tob = '12:00';
    } else {
      let hNum = parseInt(p2Hour, 10) || 12;
      if (p2Period === 'PM' && hNum < 12) hNum += 12;
      if (p2Period === 'AM' && hNum === 12) hNum = 0;
      p2Tob = `${String(hNum).padStart(2, '0')}:${String(p2Minute).padStart(2, '0')}`;
    }

    const updatedP1: BirthDetails = { ...p1Details, tob: p1Tob };
    const updatedP2: BirthDetails = { ...p2Details, tob: p2Tob };

    const report = calculateVedAstroMatch(updatedP1, updatedP2);
    setMatchReport(report);
    setHasCalculated(true);
  };

  // Preset loader
  const handleLoadPreset = (presetId: string) => {
    const preset = MATCH_PRESETS.find(p => p.id === presetId);
    if (!preset) return;

    const newP1 = { ...preset.p1, name: p1Details.name || '' };
    const newP2 = { ...preset.p2, name: p2Details.name || '' };

    setP1Details(newP1);
    const [p1H, p1M] = preset.p1.tob.split(':');
    let p1HNum = parseInt(p1H || '12', 10);
    const p1P = p1HNum >= 12 ? 'PM' : 'AM';
    if (p1HNum > 12) p1HNum -= 12;
    if (p1HNum === 0) p1HNum = 12;
    setP1Hour(String(p1HNum).padStart(2, '0'));
    setP1Minute(p1M || '00');
    setP1Period(p1P);
    setP1TimeUnknown(false);

    setP2Details(newP2);
    const [p2H, p2M] = preset.p2.tob.split(':');
    let p2HNum = parseInt(p2H || '12', 10);
    const p2P = p2HNum >= 12 ? 'PM' : 'AM';
    if (p2HNum > 12) p2HNum -= 12;
    if (p2HNum === 0) p2HNum = 12;
    setP2Hour(String(p2HNum).padStart(2, '0'));
    setP2Minute(p2M || '00');
    setP2Period(p2P);
    setP2TimeUnknown(false);

    const report = calculateVedAstroMatch(newP1, newP2);
    setMatchReport(report);
    setHasCalculated(true);
  };

  // Filtered cities for P1
  const filteredP1Cities = useMemo(() => {
    if (!p1CitySearch.trim()) return POPULAR_CITIES.slice(0, 50);
    const q = p1CitySearch.toLowerCase();
    return POPULAR_CITIES.filter(c => 
      c.name.toLowerCase().includes(q) || 
      (c.stateOrRegion && c.stateOrRegion.toLowerCase().includes(q)) ||
      c.country.toLowerCase().includes(q)
    );
  }, [p1CitySearch]);

  // Filtered cities for P2
  const filteredP2Cities = useMemo(() => {
    if (!p2CitySearch.trim()) return POPULAR_CITIES.slice(0, 50);
    const q = p2CitySearch.toLowerCase();
    return POPULAR_CITIES.filter(c => 
      c.name.toLowerCase().includes(q) || 
      (c.stateOrRegion && c.stateOrRegion.toLowerCase().includes(q)) ||
      c.country.toLowerCase().includes(q)
    );
  }, [p2CitySearch]);

  const handleCopySummary = () => {
    const text = `Kundali Match Report:
${matchReport.partner1.name} & ${matchReport.partner2.name}
Total Score: ${matchReport.totalObtainedGunas} / 36 Gunas (${matchReport.percentageScore}%)
Verdict: ${matchReport.verdict}
Manglik Compatibility: ${matchReport.manglik.compatibilityVerdict}
${matchReport.summaryDescription}
Calculated via GoodAstrology Match Finder`;
    navigator.clipboard.writeText(text);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2500);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* 1. HERO HEADER */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-stone-900 via-amber-950 to-stone-950 text-white p-6 sm:p-8 border border-amber-500/20 shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col gap-4">
          <div className="space-y-3 max-w-3xl">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-amber-100 font-vedic tracking-tight leading-tight flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
              <span>Kundali Match Finder</span>
              <span className="text-amber-300/80 text-xl sm:text-2xl lg:text-3xl font-medium tracking-normal whitespace-nowrap">
                (कुंडली मिलान)
              </span>
            </h1>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              Calculate classical Vedic marriage compatibility across all 8 Ashtakoota dimensions (36 Gunas), 
              Manglik (Kuja) Dosha balancing, Rajju longevity, and deep astrological harmony.
            </p>
          </div>
        </div>

        {/* 1-Click Test Presets */}
        <div className="mt-6 pt-5 border-t border-white/10 flex flex-col sm:flex-row sm:items-center gap-3">
          <span className="text-xs font-semibold text-amber-300 flex items-center gap-1.5 shrink-0">
            <Users className="w-3.5 h-3.5 text-amber-400" />
            <span>Try Curated Sample Matches:</span>
          </span>
          <div className="flex flex-wrap gap-2">
            {MATCH_PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => handleLoadPreset(preset.id)}
                className="px-3 py-1.5 rounded-xl bg-stone-800/80 hover:bg-amber-900/60 border border-stone-700 hover:border-amber-400/50 text-stone-200 hover:text-amber-100 text-xs font-medium transition-all cursor-pointer shadow-xs active:scale-95"
              >
                {preset.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. TWO-PARTNER BIRTH INPUT FORMS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* PARTNER 1 */}
        <div className={`rounded-3xl p-5 sm:p-6 border shadow-xs space-y-5 transition-all duration-200 ${
          p1Details.gender === 'male'
            ? 'bg-linear-to-b from-blue-50/30 via-white to-white border-blue-200/90'
            : p1Details.gender === 'female'
            ? 'bg-linear-to-b from-pink-50/30 via-white to-white border-pink-200/90'
            : 'bg-white border-amber-900/15'
        }`}>
          <div className="flex items-center justify-between pb-3 border-b border-stone-200/80">
            <div className="flex items-center gap-2.5">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm border transition-colors ${
                p1Details.gender === 'male'
                  ? 'bg-blue-100 text-blue-900 border-blue-200'
                  : p1Details.gender === 'female'
                  ? 'bg-pink-100 text-pink-900 border-pink-200'
                  : 'bg-amber-100 text-amber-950 border-amber-200'
              }`}>
                1
              </div>
              <div>
                <h3 className={`text-base font-bold font-vedic transition-colors ${
                  p1Details.gender === 'male' ? 'text-blue-950' : p1Details.gender === 'female' ? 'text-pink-950' : 'text-stone-900'
                }`}>
                  Partner 1
                </h3>
                <p className="text-[11px] text-stone-500">First individual's birth details</p>
              </div>
            </div>
            <span className={`text-[10px] font-semibold capitalize px-2.5 py-0.5 rounded-full border transition-colors ${
              p1Details.gender === 'male'
                ? 'bg-blue-50 text-blue-800 border-blue-200'
                : p1Details.gender === 'female'
                ? 'bg-pink-50 text-pink-800 border-pink-200'
                : 'bg-stone-100 text-stone-700 border-stone-200'
            }`}>
              {p1Details.gender === 'male' ? '♂ Male' : p1Details.gender === 'female' ? '♀ Female' : p1Details.gender}
            </span>
          </div>

          <div className="space-y-4">
            {/* Name & Gender */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Name */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700 block">Name:</label>
                <input
                  type="text"
                  value={p1Details.name}
                  onChange={(e) => setP1Details(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter Partner 1 Name"
                  className={`w-full p-2.5 rounded-xl border bg-stone-50 text-stone-900 text-sm font-medium focus:outline-none shadow-2xs transition-colors ${
                    p1Details.gender === 'male'
                      ? 'border-blue-200/80 focus:ring-2 focus:ring-blue-400 focus:bg-white'
                      : p1Details.gender === 'female'
                      ? 'border-pink-200/80 focus:ring-2 focus:ring-pink-400 focus:bg-white'
                      : 'border-stone-300 focus:ring-2 focus:ring-amber-500'
                  }`}
                />
              </div>

              {/* Gender Selection */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700 block">Gender:</label>
                <div className="grid grid-cols-3 gap-1 p-1 bg-stone-100 rounded-xl border border-stone-200 h-[42px] items-center">
                  {(['male', 'female', 'other'] as const).map((g) => {
                    const isSelected = p1Details.gender === g;
                    const activeColor = g === 'male'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : g === 'female'
                      ? 'bg-pink-600 text-white shadow-xs'
                      : 'bg-stone-800 text-white shadow-xs';

                    return (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setP1Details(prev => ({ ...prev, gender: g }))}
                        className={`h-8 px-2 rounded-lg text-xs font-bold capitalize transition-all cursor-pointer ${
                          isSelected
                            ? activeColor
                            : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
                        }`}
                      >
                        {g}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Birth Date */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-stone-700 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-amber-800" />
                  <span>Date of Birth:</span>
                </label>
                <span className="text-[10px] font-mono text-stone-500">YYYY-MM-DD</span>
              </div>
              <input
                type="date"
                value={p1Details.dob}
                onChange={(e) => setP1Details(prev => ({ ...prev, dob: e.target.value }))}
                className="w-full p-2.5 rounded-xl border border-stone-300 bg-stone-50 text-stone-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-2xs cursor-pointer"
              />
            </div>

            {/* Birth Time */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-stone-700 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-800" />
                  <span>Time of Birth:</span>
                </label>
                <label className="text-[10px] text-stone-500 flex items-center gap-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={p1TimeUnknown}
                    onChange={(e) => setP1TimeUnknown(e.target.checked)}
                    className="rounded text-amber-800 focus:ring-amber-500 w-3.5 h-3.5"
                  />
                  <span>Unknown (12 PM)</span>
                </label>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <select
                    disabled={p1TimeUnknown}
                    value={p1Hour}
                    onChange={(e) => setP1Hour(e.target.value)}
                    className={`w-full h-10 px-2 rounded-xl border text-sm font-bold shadow-2xs ${
                      p1TimeUnknown ? 'bg-stone-200/60 text-stone-400 border-stone-300' : 'bg-stone-50 text-stone-900 border-stone-300'
                    }`}
                  >
                    {['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'].map(h => (
                      <option key={h} value={h}>{h}</option>
                    ))}
                  </select>
                  <span className="text-[10px] text-stone-500 block text-center mt-1">Hour</span>
                </div>

                <div>
                  <select
                    disabled={p1TimeUnknown}
                    value={p1Minute}
                    onChange={(e) => setP1Minute(e.target.value)}
                    className={`w-full h-10 px-2 rounded-xl border text-sm font-bold shadow-2xs ${
                      p1TimeUnknown ? 'bg-stone-200/60 text-stone-400 border-stone-300' : 'bg-stone-50 text-stone-900 border-stone-300'
                    }`}
                  >
                    {Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0')).map(m => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                  <span className="text-[10px] text-stone-500 block text-center mt-1">Minute</span>
                </div>

                <div>
                  <div className="grid grid-cols-2 gap-1 h-10">
                    {(['AM', 'PM'] as const).map(p => (
                      <button
                        key={p}
                        type="button"
                        disabled={p1TimeUnknown}
                        onClick={() => setP1Period(p)}
                        className={`rounded-xl text-xs font-bold transition-all border flex items-center justify-center cursor-pointer ${
                          p1TimeUnknown
                            ? 'bg-stone-200/60 text-stone-400 border-stone-300'
                            : p1Period === p
                            ? 'bg-amber-900 text-amber-50 border-amber-900 shadow-xs'
                            : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border-stone-300'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                  <span className="text-[10px] text-stone-500 block text-center mt-1">Period</span>
                </div>
              </div>
            </div>

            {/* Birth Place */}
            <div className="space-y-1 relative">
              <label className="text-xs font-bold text-stone-700 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-800" />
                <span>Birth Place:</span>
              </label>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setP1CityDropdown(!p1CityDropdown)}
                  className="w-full p-2.5 rounded-xl border border-stone-300 bg-stone-50 text-left flex items-center justify-between text-sm shadow-2xs hover:bg-white transition-colors cursor-pointer"
                >
                  <span className="font-bold text-stone-900 truncate pr-2">{p1Details.city}</span>
                  <span className="text-[10px] bg-amber-100/70 text-amber-900 font-semibold px-2 py-0.5 rounded shrink-0">
                    {p1Details.latitude.toFixed(1)}°N
                  </span>
                </button>

                {p1CityDropdown && (
                  <div className="absolute top-full mt-1.5 left-0 right-0 z-30 bg-white rounded-2xl border border-stone-300 shadow-xl p-3 space-y-2 max-h-60 overflow-y-auto">
                    <div className="sticky top-0 bg-white pb-2 border-b border-stone-100">
                      <div className="relative">
                        <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-400" />
                        <input
                          type="text"
                          value={p1CitySearch}
                          onChange={(e) => setP1CitySearch(e.target.value)}
                          placeholder="Search city, state (e.g. Guwahati, Jorhat, Silchar)..."
                          className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-stone-200 bg-stone-50 focus:outline-none focus:ring-1 focus:ring-amber-500"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      {filteredP1Cities.map((city) => (
                        <button
                          key={`${city.name}-${city.lat}`}
                          type="button"
                          onClick={() => {
                            setP1Details(prev => ({
                              ...prev,
                              city: city.name,
                              latitude: city.lat,
                              longitude: city.lng,
                              timezoneOffset: city.timezone
                            }));
                            setP1CityDropdown(false);
                          }}
                          className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                            p1Details.city === city.name ? 'bg-amber-900 text-amber-50 font-bold' : 'hover:bg-amber-50 text-stone-800'
                          }`}
                        >
                          <span className="truncate flex items-center gap-1">
                            <span className="font-semibold">{city.name}</span>
                            {city.stateOrRegion && <span className="opacity-75 text-[11px]">, {city.stateOrRegion}</span>}
                          </span>
                          <span className="text-[10px] opacity-75 shrink-0 ml-1.5">{city.country}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* PARTNER 2 */}
        <div className={`rounded-3xl p-5 sm:p-6 border shadow-xs space-y-5 transition-all duration-200 ${
          p2Details.gender === 'female'
            ? 'bg-linear-to-b from-pink-50/30 via-white to-white border-pink-200/90'
            : p2Details.gender === 'male'
            ? 'bg-linear-to-b from-blue-50/30 via-white to-white border-blue-200/90'
            : 'bg-white border-amber-900/15'
        }`}>
          <div className="flex items-center justify-between pb-3 border-b border-stone-200/80">
            <div className="flex items-center gap-2.5">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm border transition-colors ${
                p2Details.gender === 'female'
                  ? 'bg-pink-100 text-pink-900 border-pink-200'
                  : p2Details.gender === 'male'
                  ? 'bg-blue-100 text-blue-900 border-blue-200'
                  : 'bg-amber-100 text-amber-950 border-amber-200'
              }`}>
                2
              </div>
              <div>
                <h3 className={`text-base font-bold font-vedic transition-colors ${
                  p2Details.gender === 'female' ? 'text-pink-950' : p2Details.gender === 'male' ? 'text-blue-950' : 'text-stone-900'
                }`}>
                  Partner 2
                </h3>
                <p className="text-[11px] text-stone-500">Second individual's birth details</p>
              </div>
            </div>
            <span className={`text-[10px] font-semibold capitalize px-2.5 py-0.5 rounded-full border transition-colors ${
              p2Details.gender === 'female'
                ? 'bg-pink-50 text-pink-800 border-pink-200'
                : p2Details.gender === 'male'
                ? 'bg-blue-50 text-blue-800 border-blue-200'
                : 'bg-stone-100 text-stone-700 border-stone-200'
            }`}>
              {p2Details.gender === 'female' ? '♀ Female' : p2Details.gender === 'male' ? '♂ Male' : p2Details.gender}
            </span>
          </div>

          <div className="space-y-4">
            {/* Name & Gender */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Name */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700 block">Name:</label>
                <input
                  type="text"
                  value={p2Details.name}
                  onChange={(e) => setP2Details(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter Partner 2 Name"
                  className={`w-full p-2.5 rounded-xl border bg-stone-50 text-stone-900 text-sm font-medium focus:outline-none shadow-2xs transition-colors ${
                    p2Details.gender === 'female'
                      ? 'border-pink-200/80 focus:ring-2 focus:ring-pink-400 focus:bg-white'
                      : p2Details.gender === 'male'
                      ? 'border-blue-200/80 focus:ring-2 focus:ring-blue-400 focus:bg-white'
                      : 'border-stone-300 focus:ring-2 focus:ring-amber-500'
                  }`}
                />
              </div>

              {/* Gender Selection */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700 block">Gender:</label>
                <div className="grid grid-cols-3 gap-1 p-1 bg-stone-100 rounded-xl border border-stone-200 h-[42px] items-center">
                  {(['male', 'female', 'other'] as const).map((g) => {
                    const isSelected = p2Details.gender === g;
                    const activeColor = g === 'female'
                      ? 'bg-pink-600 text-white shadow-xs'
                      : g === 'male'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-stone-800 text-white shadow-xs';

                    return (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setP2Details(prev => ({ ...prev, gender: g }))}
                        className={`h-8 px-2 rounded-lg text-xs font-bold capitalize transition-all cursor-pointer ${
                          isSelected
                            ? activeColor
                            : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
                        }`}
                      >
                        {g}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Birth Date */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-stone-700 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-amber-800" />
                  <span>Date of Birth:</span>
                </label>
                <span className="text-[10px] font-mono text-stone-500">YYYY-MM-DD</span>
              </div>
              <input
                type="date"
                value={p2Details.dob}
                onChange={(e) => setP2Details(prev => ({ ...prev, dob: e.target.value }))}
                className="w-full p-2.5 rounded-xl border border-stone-300 bg-stone-50 text-stone-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-2xs cursor-pointer"
              />
            </div>

            {/* Birth Time */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-stone-700 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-800" />
                  <span>Time of Birth:</span>
                </label>
                <label className="text-[10px] text-stone-500 flex items-center gap-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={p2TimeUnknown}
                    onChange={(e) => setP2TimeUnknown(e.target.checked)}
                    className="rounded text-amber-800 focus:ring-amber-500 w-3.5 h-3.5"
                  />
                  <span>Unknown (12 PM)</span>
                </label>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <select
                    disabled={p2TimeUnknown}
                    value={p2Hour}
                    onChange={(e) => setP2Hour(e.target.value)}
                    className={`w-full h-10 px-2 rounded-xl border text-sm font-bold shadow-2xs ${
                      p2TimeUnknown ? 'bg-stone-200/60 text-stone-400 border-stone-300' : 'bg-stone-50 text-stone-900 border-stone-300'
                    }`}
                  >
                    {['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'].map(h => (
                      <option key={h} value={h}>{h}</option>
                    ))}
                  </select>
                  <span className="text-[10px] text-stone-500 block text-center mt-1">Hour</span>
                </div>

                <div>
                  <select
                    disabled={p2TimeUnknown}
                    value={p2Minute}
                    onChange={(e) => setP2Minute(e.target.value)}
                    className={`w-full h-10 px-2 rounded-xl border text-sm font-bold shadow-2xs ${
                      p2TimeUnknown ? 'bg-stone-200/60 text-stone-400 border-stone-300' : 'bg-stone-50 text-stone-900 border-stone-300'
                    }`}
                  >
                    {Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0')).map(m => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                  <span className="text-[10px] text-stone-500 block text-center mt-1">Minute</span>
                </div>

                <div>
                  <div className="grid grid-cols-2 gap-1 h-10">
                    {(['AM', 'PM'] as const).map(p => (
                      <button
                        key={p}
                        type="button"
                        disabled={p2TimeUnknown}
                        onClick={() => setP2Period(p)}
                        className={`rounded-xl text-xs font-bold transition-all border flex items-center justify-center cursor-pointer ${
                          p2TimeUnknown
                            ? 'bg-stone-200/60 text-stone-400 border-stone-300'
                            : p2Period === p
                            ? 'bg-amber-900 text-amber-50 border-amber-900 shadow-xs'
                            : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border-stone-300'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                  <span className="text-[10px] text-stone-500 block text-center mt-1">Period</span>
                </div>
              </div>
            </div>

            {/* Birth Place */}
            <div className="space-y-1 relative">
              <label className="text-xs font-bold text-stone-700 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-800" />
                <span>Birth Place:</span>
              </label>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setP2CityDropdown(!p2CityDropdown)}
                  className="w-full p-2.5 rounded-xl border border-stone-300 bg-stone-50 text-left flex items-center justify-between text-sm shadow-2xs hover:bg-white transition-colors cursor-pointer"
                >
                  <span className="font-bold text-stone-900 truncate pr-2">{p2Details.city}</span>
                  <span className="text-[10px] bg-amber-100/70 text-amber-900 font-semibold px-2 py-0.5 rounded shrink-0">
                    {p2Details.latitude.toFixed(1)}°N
                  </span>
                </button>

                {p2CityDropdown && (
                  <div className="absolute top-full mt-1.5 left-0 right-0 z-30 bg-white rounded-2xl border border-stone-300 shadow-xl p-3 space-y-2 max-h-60 overflow-y-auto">
                    <div className="sticky top-0 bg-white pb-2 border-b border-stone-100">
                      <div className="relative">
                        <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-400" />
                        <input
                          type="text"
                          value={p2CitySearch}
                          onChange={(e) => setP2CitySearch(e.target.value)}
                          placeholder="Search city, state (e.g. Guwahati, Jorhat, Silchar)..."
                          className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-stone-200 bg-stone-50 focus:outline-none focus:ring-1 focus:ring-amber-500"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      {filteredP2Cities.map((city) => (
                        <button
                          key={`${city.name}-${city.lat}`}
                          type="button"
                          onClick={() => {
                            setP2Details(prev => ({
                              ...prev,
                              city: city.name,
                              latitude: city.lat,
                              longitude: city.lng,
                              timezoneOffset: city.timezone
                            }));
                            setP2CityDropdown(false);
                          }}
                          className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                            p2Details.city === city.name ? 'bg-amber-900 text-amber-50 font-bold' : 'hover:bg-amber-50 text-stone-800'
                          }`}
                        >
                          <span className="truncate flex items-center gap-1">
                            <span className="font-semibold">{city.name}</span>
                            {city.stateOrRegion && <span className="opacity-75 text-[11px]">, {city.stateOrRegion}</span>}
                          </span>
                          <span className="text-[10px] opacity-75 shrink-0 ml-1.5">{city.country}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CALCULATE & REPORT ACTION ROW */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {hasCalculated && (
          <button
            type="button"
            onClick={() => setHasCalculated(false)}
            className="px-5 py-4 rounded-2xl bg-white hover:bg-stone-100 text-stone-700 border border-stone-300 font-semibold text-sm flex items-center gap-2 shadow-xs transition-all active:scale-95 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-stone-600" />
            <span>View Basic Information</span>
          </button>
        )}

        <button
          type="button"
          onClick={handleCalculateMatch}
          className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-800 via-amber-900 to-amber-950 text-amber-50 font-extrabold text-base tracking-wide font-vedic shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center gap-3 cursor-pointer border border-amber-600/30"
        >
          <Heart className="w-5 h-5 text-rose-400 fill-rose-400 animate-pulse" />
          <span>{hasCalculated ? 'Recalculate Kundali Match (पुनर्गणना करें)' : 'Calculate Kundali Match (कुंडली मिलान करें)'}</span>
          <Sparkles className="w-4 h-4 text-amber-300" />
        </button>

        {hasCalculated && (
          <button
            id="btn-match-generate-report-top"
            type="button"
            onClick={() => {
              if (onOpenCustomReport) {
                onOpenCustomReport({ report: matchReport, p1: p1Details, p2: p2Details });
              } else {
                setShowPrintModal(true);
              }
            }}
            className="px-6 py-4 rounded-2xl bg-stone-900 hover:bg-black text-amber-100 font-bold text-sm tracking-wide shadow-md hover:shadow-lg transition-all flex items-center gap-2.5 cursor-pointer border border-stone-700"
          >
            <FileText className="w-4 h-4 text-amber-300" />
            <span>Generate Report</span>
          </button>
        )}
      </div>

      {hasCalculated ? (
        /* 3. MATCH RESULTS DASHBOARD - UNIFIED SINGLE CARD */
        <div className="bg-white rounded-3xl border border-amber-900/15 shadow-sm overflow-hidden divide-y divide-stone-200 animate-fadeIn">
          {/* Active Status Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-3.5 bg-amber-50/80 border-b border-amber-900/15 text-xs text-amber-950">
            <div className="flex items-center gap-2 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Compatibility calculated for <strong>{p1Details.name || 'Partner 1'}</strong> &amp; <strong>{p2Details.name || 'Partner 2'}</strong></span>
            </div>
            <button
              type="button"
              onClick={() => setHasCalculated(false)}
              className="px-3 py-1.5 rounded-xl bg-white hover:bg-amber-100/80 border border-amber-900/20 text-stone-800 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-2xs active:scale-95 cursor-pointer self-start sm:self-auto"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-800" />
              <span>Show Basic Info Guide</span>
            </button>
          </div>
        
        {/* SCORE BANNER */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-stone-200">
            
            {/* Couple names & verdict */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">Compatibility Assessment</span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold ${
                  matchReport.verdictTone === 'success'
                    ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                    : matchReport.verdictTone === 'warning'
                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                    : 'bg-rose-100 text-rose-900 border border-rose-300'
                }`}>
                  {matchReport.verdict}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-amber-950 font-vedic">
                {matchReport.partner1.name} &amp; {matchReport.partner2.name}
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 max-w-2xl leading-relaxed">
                {matchReport.summaryDescription}
              </p>
            </div>

            {/* Score Ring / Gauge */}
            <div className="flex items-center gap-4 bg-[#FAF8F5] p-4 rounded-2xl border border-amber-900/10 shrink-0">
              <div className="relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-stone-200"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className={
                      matchReport.verdictTone === 'success' 
                        ? 'text-emerald-600' 
                        : matchReport.verdictTone === 'warning' 
                        ? 'text-amber-600' 
                        : 'text-rose-600'
                    }
                    strokeDasharray={`${matchReport.percentageScore}, 100`}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center text-center">
                  <span className="text-xl sm:text-2xl font-black text-amber-950 font-vedic leading-none">
                    {matchReport.totalObtainedGunas}
                  </span>
                  <span className="text-[10px] font-bold text-stone-500 uppercase">/ 36 Gunas</span>
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-xs font-semibold text-stone-500">Classical Benchmark</div>
                <div className="text-sm font-bold text-stone-900">
                  {matchReport.percentageScore}% Synergy
                </div>
                <div className="text-[11px] text-stone-500">
                  Passing minimum: 18 / 36
                </div>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            {/* View Switcher: Easy vs Advanced */}
            <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl border border-stone-200 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setViewMode('easy')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  viewMode === 'easy' ? 'bg-amber-900 text-amber-50 shadow-xs' : 'text-stone-700 hover:text-stone-950'
                }`}
              >
                Easy View (Summary)
              </button>
              <button
                type="button"
                onClick={() => setViewMode('advanced')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  viewMode === 'advanced' ? 'bg-amber-900 text-amber-50 shadow-xs' : 'text-stone-700 hover:text-stone-950'
                }`}
              >
                Advanced Ashtakoota (36 Gunas)
              </button>
            </div>

            {/* Utility buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopySummary}
                className="px-3 py-1.5 rounded-xl border border-stone-300 bg-stone-50 hover:bg-stone-100 text-stone-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5 text-amber-800" />
                <span>{copiedNotification ? 'Copied to Clipboard!' : 'Share Summary'}</span>
              </button>

              <button
                id="btn-match-generate-report"
                type="button"
                onClick={() => {
                  if (onOpenCustomReport) {
                    onOpenCustomReport({ report: matchReport, p1: p1Details, p2: p2Details });
                  } else {
                    setShowPrintModal(true);
                  }
                }}
                className="px-3.5 py-1.5 rounded-xl bg-amber-900 hover:bg-amber-950 text-amber-50 text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-amber-200" />
                <span>Generate Report</span>
              </button>
            </div>
          </div>
        </div>

        {/* 4. SIDE-BY-SIDE ASTROLOGICAL PROFILE COMPARISON */}
        <div className="p-6 sm:p-8 space-y-4 bg-stone-50/40">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold font-vedic text-amber-950 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-700" />
              Astrological Kundli Profile Comparison
            </h3>
            <span className="text-[11px] text-stone-500 hidden sm:inline">Sidereal Lahiri Zodiac</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Partner 1 Card */}
            <div className={`p-4 rounded-2xl border space-y-3 transition-colors ${
              p1Details.gender === 'male'
                ? 'bg-blue-50/40 border-blue-200'
                : p1Details.gender === 'female'
                ? 'bg-pink-50/40 border-pink-200'
                : 'bg-amber-50/50 border-amber-200'
            }`}>
              <div className={`flex items-center justify-between pb-2 border-b ${
                p1Details.gender === 'male'
                  ? 'border-blue-200/60'
                  : p1Details.gender === 'female'
                  ? 'border-pink-200/60'
                  : 'border-amber-200/60'
              }`}>
                <span className={`font-bold text-sm ${
                  p1Details.gender === 'male' ? 'text-blue-950' : p1Details.gender === 'female' ? 'text-pink-950' : 'text-amber-950'
                }`}>
                  {matchReport.partner1.name}
                </span>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded capitalize ${
                  p1Details.gender === 'male'
                    ? 'bg-blue-100 text-blue-900'
                    : p1Details.gender === 'female'
                    ? 'bg-pink-100 text-pink-900'
                    : 'bg-amber-100 text-amber-900'
                }`}>
                  Partner 1 ({p1Details.gender === 'male' ? '♂ Male' : p1Details.gender === 'female' ? '♀ Female' : p1Details.gender})
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-stone-500 block text-[11px]">Ascendant (Lagna):</span>
                  <span className="font-bold text-stone-900">{matchReport.partner1.profile.lagnaName}</span>
                </div>
                <div>
                  <span className="text-stone-500 block text-[11px]">Moon Sign (Rashi):</span>
                  <span className="font-bold text-stone-900">{matchReport.partner1.profile.moonSignName}</span>
                </div>
                <div>
                  <span className="text-stone-500 block text-[11px]">Nakshatra:</span>
                  <span className="font-bold text-stone-900">
                    {matchReport.partner1.profile.nakshatraName} (Pada {matchReport.partner1.profile.nakshatraPada})
                  </span>
                </div>
                <div>
                  <span className="text-stone-500 block text-[11px]">Rashi Lord:</span>
                  <span className="font-bold text-stone-900 uppercase">{matchReport.partner1.profile.moonLord}</span>
                </div>
              </div>
            </div>

            {/* Partner 2 Card */}
            <div className={`p-4 rounded-2xl border space-y-3 transition-colors ${
              p2Details.gender === 'female'
                ? 'bg-pink-50/40 border-pink-200'
                : p2Details.gender === 'male'
                ? 'bg-blue-50/40 border-blue-200'
                : 'bg-amber-50/50 border-amber-200'
            }`}>
              <div className={`flex items-center justify-between pb-2 border-b ${
                p2Details.gender === 'female'
                  ? 'border-pink-200/60'
                  : p2Details.gender === 'male'
                  ? 'border-blue-200/60'
                  : 'border-amber-200/60'
              }`}>
                <span className={`font-bold text-sm ${
                  p2Details.gender === 'female' ? 'text-pink-950' : p2Details.gender === 'male' ? 'text-blue-950' : 'text-amber-950'
                }`}>
                  {matchReport.partner2.name}
                </span>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded capitalize ${
                  p2Details.gender === 'female'
                    ? 'bg-pink-100 text-pink-900'
                    : p2Details.gender === 'male'
                    ? 'bg-blue-100 text-blue-900'
                    : 'bg-amber-100 text-amber-900'
                }`}>
                  Partner 2 ({p2Details.gender === 'female' ? '♀ Female' : p2Details.gender === 'male' ? '♂ Male' : p2Details.gender})
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-stone-500 block text-[11px]">Ascendant (Lagna):</span>
                  <span className="font-bold text-stone-900">{matchReport.partner2.profile.lagnaName}</span>
                </div>
                <div>
                  <span className="text-stone-500 block text-[11px]">Moon Sign (Rashi):</span>
                  <span className="font-bold text-stone-900">{matchReport.partner2.profile.moonSignName}</span>
                </div>
                <div>
                  <span className="text-stone-500 block text-[11px]">Nakshatra:</span>
                  <span className="font-bold text-stone-900">
                    {matchReport.partner2.profile.nakshatraName} (Pada {matchReport.partner2.profile.nakshatraPada})
                  </span>
                </div>
                <div>
                  <span className="text-stone-500 block text-[11px]">Rashi Lord:</span>
                  <span className="font-bold text-stone-900 uppercase">{matchReport.partner2.profile.moonLord}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 5. MANGLIK / KUJA DOSHA IN-DEPTH COMPATIBILITY */}
        <div className="p-6 sm:p-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4 items-start">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-600 shrink-0" />
              <h3 className="text-base font-bold font-vedic text-amber-950">
                Manglik (Kuja Dosha) Compatibility Analysis
              </h3>
            </div>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold self-start sm:self-auto shrink-0 whitespace-nowrap ${
              matchReport.manglik.isCancelled || matchReport.manglik.compatibilityVerdict === 'No Dosha'
                ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                : 'bg-amber-100 text-amber-900 border border-amber-300'
            }`}>
              {matchReport.manglik.compatibilityVerdict}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Partner 1 Manglik */}
            <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-stone-200 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-stone-900 block">{matchReport.partner1.name}</span>
                <span className="text-[11px] text-stone-500">
                  Mars in {matchReport.manglik.boyManglikHouse}th House ({matchReport.manglik.boySeverity} severity)
                </span>
              </div>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
                matchReport.manglik.isBoyManglik ? 'bg-orange-100 text-orange-900' : 'bg-stone-200 text-stone-700'
              }`}>
                {matchReport.manglik.isBoyManglik ? 'Manglik' : 'Non-Manglik'}
              </span>
            </div>

            {/* Partner 2 Manglik */}
            <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-stone-200 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-stone-900 block">{matchReport.partner2.name}</span>
                <span className="text-[11px] text-stone-500">
                  Mars in {matchReport.manglik.girlManglikHouse}th House ({matchReport.manglik.girlSeverity} severity)
                </span>
              </div>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
                matchReport.manglik.isGirlManglik ? 'bg-orange-100 text-orange-900' : 'bg-stone-200 text-stone-700'
              }`}>
                {matchReport.manglik.isGirlManglik ? 'Manglik' : 'Non-Manglik'}
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200 text-xs text-stone-700 leading-relaxed space-y-1">
            <span className="font-bold text-amber-950 block">Astrological Rationale:</span>
            <p>{matchReport.manglik.cancellationReason}</p>
          </div>
        </div>

        {/* 6. EASY VIEW vs ADVANCED ASHTAKOOTA CONTENT */}
        {viewMode === 'easy' ? (
          <div className="p-6 sm:p-8 space-y-6">
            {/* 5 Life Dimensions */}
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-bold font-vedic text-amber-950 flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-700" />
                  Five Essential Life Dimensions
                </h3>
                <p className="text-xs text-stone-500">
                  How planetary interactions shape daily marriage, intellect, emotional peace, health, and family fortunes.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {matchReport.lifeDimensions.map((dim) => (
                  <div key={dim.title} className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-stone-900 font-vedic">{dim.title}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        dim.rating === 'Outstanding'
                          ? 'bg-emerald-100 text-emerald-900'
                          : dim.rating === 'Favorable'
                          ? 'bg-blue-100 text-blue-900'
                          : dim.rating === 'Moderate'
                          ? 'bg-amber-100 text-amber-900'
                          : 'bg-rose-100 text-rose-900'
                      }`}>
                        {dim.rating}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[11px] font-semibold">
                        <span className="text-stone-500">Compatibility Index</span>
                        <span className="text-amber-950">{dim.score}%</span>
                      </div>
                      <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            dim.score >= 70 ? 'bg-emerald-600' : dim.score >= 50 ? 'bg-amber-600' : 'bg-rose-500'
                          }`}
                          style={{ width: `${dim.score}%` }}
                        />
                      </div>
                    </div>

                    <p className="text-[11px] text-stone-600 leading-relaxed">
                      {dim.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Special Extended Kutas Summary in Easy View */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2 border-t border-stone-200/80">
              <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-stone-200 space-y-1">
                <span className="text-[11px] font-semibold text-stone-500 block">Rajju Koota (Lifespan)</span>
                <span className={`text-xs font-bold block ${matchReport.specialKutas.rajju.isDosha ? 'text-rose-700' : 'text-emerald-800'}`}>
                  {matchReport.specialKutas.rajju.verdict}
                </span>
                <p className="text-[10px] text-stone-500 line-clamp-2">{matchReport.specialKutas.rajju.meaning}</p>
              </div>

              <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-stone-200 space-y-1">
                <span className="text-[11px] font-semibold text-stone-500 block">Mahendra Koota (Progeny)</span>
                <span className="text-xs font-bold text-stone-900 block">{matchReport.specialKutas.mahendra.verdict}</span>
                <p className="text-[10px] text-stone-500 line-clamp-2">{matchReport.specialKutas.mahendra.meaning}</p>
              </div>

              <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-stone-200 space-y-1">
                <span className="text-[11px] font-semibold text-stone-500 block">Stree Deergha (Affection)</span>
                <span className="text-xs font-bold text-stone-900 block">{matchReport.specialKutas.streeDeergha.verdict}</span>
                <p className="text-[10px] text-stone-500 line-clamp-2">{matchReport.specialKutas.streeDeergha.meaning}</p>
              </div>

              <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-stone-200 space-y-1">
                <span className="text-[11px] font-semibold text-stone-500 block">Vedha Koota (Affliction)</span>
                <span className={`text-xs font-bold block ${matchReport.specialKutas.vedha.isAfflicted ? 'text-rose-700' : 'text-emerald-800'}`}>
                  {matchReport.specialKutas.vedha.verdict}
                </span>
                <p className="text-[10px] text-stone-500 line-clamp-2">{matchReport.specialKutas.vedha.meaning}</p>
              </div>
            </div>
          </div>
        ) : (
          /* ADVANCED VIEW: FULL ASHTAKOOTA TABLE */
          <div className="p-6 sm:p-8 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <div>
                  <h3 className="text-base font-bold font-vedic text-amber-950 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-amber-700" />
                    Complete Ashtakoota Guna Milan Table (अष्टकूट मिलान)
                  </h3>
                  <p className="text-xs text-stone-500">
                    Detailed 8-fold Parashari scoring matrix with points breakdown and Shastra cancellation conditions.
                  </p>
                </div>
                <span className="text-xs font-extrabold text-amber-900 bg-amber-100/70 px-3 py-1 rounded-xl">
                  {matchReport.totalObtainedGunas} / 36 Points
                </span>
              </div>

              {/* Table */}
              <div className="overflow-x-auto rounded-2xl border border-stone-200 shadow-xs">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-stone-100 text-stone-700 font-bold border-b border-stone-200">
                      <th className="p-3 rounded-l-xl">Koota Factor</th>
                      <th className="p-3">Partner 1 Attribute</th>
                      <th className="p-3">Partner 2 Attribute</th>
                      <th className="p-3 text-center">Score / Max</th>
                      <th className="p-3 text-center">Status</th>
                      <th className="p-3 text-right rounded-r-xl">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {matchReport.ashtakoota.map((kuta) => {
                      const isExpanded = expandedKuta === kuta.id;
                      return (
                        <React.Fragment key={kuta.id}>
                          <tr className="hover:bg-amber-50/40 transition-colors">
                            <td className="p-3 font-semibold text-stone-900">
                              <div>{kuta.name}</div>
                              <div className="text-[10px] text-amber-800 font-normal">{kuta.sanskritName}</div>
                            </td>
                            <td className="p-3 text-stone-700">{kuta.boyAttribute}</td>
                            <td className="p-3 text-stone-700">{kuta.girlAttribute}</td>
                            <td className="p-3 text-center font-bold text-amber-950">
                              <span className={kuta.obtainedScore === kuta.maxScore ? 'text-emerald-700' : kuta.obtainedScore > 0 ? 'text-amber-800' : 'text-rose-700'}>
                                {kuta.obtainedScore}
                              </span>
                              <span className="text-stone-400 font-normal"> / {kuta.maxScore}</span>
                            </td>
                            <td className="p-3 text-center">
                              <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                                kuta.verdict === 'Excellent'
                                  ? 'bg-emerald-100 text-emerald-900'
                                  : kuta.verdict === 'Good'
                                  ? 'bg-blue-100 text-blue-900'
                                  : kuta.verdict === 'Mitigated'
                                  ? 'bg-amber-100 text-amber-900'
                                  : 'bg-rose-100 text-rose-900'
                              }`}>
                                {kuta.verdict}
                              </span>
                            </td>
                            <td className="p-3 text-right">
                              <button
                                type="button"
                                onClick={() => setExpandedKuta(isExpanded ? null : kuta.id)}
                                className="text-amber-800 hover:text-amber-950 font-semibold text-xs inline-flex items-center gap-1 cursor-pointer"
                              >
                                <span>{isExpanded ? 'Hide' : 'Explain'}</span>
                                {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                              </button>
                            </td>
                          </tr>

                          {/* Expanded explanation row */}
                          {isExpanded && (
                            <tr className="bg-amber-50/50">
                              <td colSpan={6} className="p-4 space-y-2 text-xs border-y border-amber-200/60">
                                <div>
                                  <span className="font-bold text-amber-950 block">Life Significance:</span>
                                  <p className="text-stone-600">{kuta.significance}</p>
                                </div>
                                <div>
                                  <span className="font-bold text-amber-950 block">Astrological Finding:</span>
                                  <p className="text-stone-700">{kuta.explanation}</p>
                                </div>
                                {kuta.cancellationReason && (
                                  <div className="p-2.5 rounded-xl bg-emerald-100/60 text-emerald-950 border border-emerald-200">
                                    <span className="font-bold block">Cancellation Exception (दोष परिहार):</span>
                                    <span>{kuta.cancellationReason}</span>
                                  </div>
                                )}
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Extended Kutas In-Depth Table */}
            <div className="space-y-4 pt-4 border-t border-stone-200/80">
              <h3 className="text-base font-bold font-vedic text-amber-950 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-700" />
                Extended Classical Kuta System (16 Kutas Integration)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-stone-900">Rajju Koota (Lifespan &amp; Health Shield)</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      matchReport.specialKutas.rajju.isDosha ? 'bg-rose-100 text-rose-900' : 'bg-emerald-100 text-emerald-900'
                    }`}>
                      {matchReport.specialKutas.rajju.verdict}
                    </span>
                  </div>
                  <p className="text-stone-600 text-[11px] leading-relaxed">
                    {matchReport.specialKutas.rajju.meaning}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-stone-900">Mahendra Koota (Progeny &amp; Lineage Blessings)</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-900">
                      {matchReport.specialKutas.mahendra.verdict}
                    </span>
                  </div>
                  <p className="text-stone-600 text-[11px] leading-relaxed">
                    {matchReport.specialKutas.mahendra.meaning}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-stone-900">Stree Deergha (Mutual Affection &amp; Respect)</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900">
                      {matchReport.specialKutas.streeDeergha.verdict}
                    </span>
                  </div>
                  <p className="text-stone-600 text-[11px] leading-relaxed">
                    {matchReport.specialKutas.streeDeergha.meaning}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-stone-900">Vedha Koota (Obstruction &amp; Affliction)</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      matchReport.specialKutas.vedha.isAfflicted ? 'bg-rose-100 text-rose-900' : 'bg-emerald-100 text-emerald-900'
                    }`}>
                      {matchReport.specialKutas.vedha.verdict}
                    </span>
                  </div>
                  <p className="text-stone-600 text-[11px] leading-relaxed">
                    {matchReport.specialKutas.vedha.meaning}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 7. CLASSICAL REMEDIAL MEASURES & JOINT BLESSINGS */}
        <div className="bg-gradient-to-br from-amber-900 via-amber-950 to-stone-950 text-amber-50 p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-amber-300" />
            <h3 className="text-lg font-bold font-vedic text-white">
              Vedic Remedies &amp; Auspicious Harmony Practices
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-stone-300 max-w-2xl">
            In Vedic wisdom, planetary friction is neutralized through conscious spiritual practice, charity, 
            and devotional attunement. The following remedies foster enduring warmth and prosperity:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {matchReport.vedicRemedies.map((remedy, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-xs text-stone-200 leading-relaxed">{remedy}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    ) : (
      /* BASIC DETAILS FOR THE SPACE (Shown when match is not calculated yet) */
      <div className="space-y-8 animate-fadeIn">
        {/* Header Card */}
        <div className="bg-white rounded-3xl border border-amber-900/15 p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/70 text-amber-900 text-xs font-semibold uppercase tracking-wider">
                <BookOpen className="w-3.5 h-3.5 text-amber-800" />
                <span>Foundational Ashtakoota Milan</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-amber-950 font-vedic">
                Basic Kundali Milan &amp; Ashtakoota Guide (कुंडली एवं अष्टकूट मिलान परिचय)
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 max-w-3xl leading-relaxed">
                In classical Vedic Jyotish (Sage Parashara &amp; Varahamihira), marriage compatibility evaluates subtle energetic vibrations, karmic ties, emotional chemistry, and physiological harmony across <strong>8 sacred dimensions (Ashtakoota)</strong> totaling <strong>36 Gunas</strong>. Enter both partners' birth details above or select a curated sample match, then click <strong>"Calculate Kundali Match"</strong> to generate your complete compatibility dossier.
              </p>
            </div>
          </div>

          {/* The 8 Kutas (Dimensions) Grid */}
          <div className="pt-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-stone-700 font-vedic mb-3 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-800" />
              <span>The 8 Sacred Kootas &amp; 36 Guna Score Distribution (अष्टकूट विवरण)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* 1. Varna */}
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-amber-900/15 shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300/60">
                    1 Point
                  </span>
                  <Scale className="w-4 h-4 text-amber-800" />
                </div>
                <h4 className="text-sm font-bold text-amber-950 font-vedic">
                  1. Varna Kuta (वर्ण)
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Evaluates spiritual ego compatibility, work temperament, and mutual respect between the partners based on Moon signs.
                </p>
              </div>

              {/* 2. Vashya */}
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-amber-900/15 shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300/60">
                    2 Points
                  </span>
                  <Heart className="w-4 h-4 text-rose-700" />
                </div>
                <h4 className="text-sm font-bold text-amber-950 font-vedic">
                  2. Vashya Kuta (वश्य)
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Measures mutual magnetic attraction, emotional influence, and the healthy balance of dynamic authority in the union.
                </p>
              </div>

              {/* 3. Tara */}
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-amber-900/15 shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300/60">
                    3 Points
                  </span>
                  <Sparkles className="w-4 h-4 text-amber-800" />
                </div>
                <h4 className="text-sm font-bold text-amber-950 font-vedic">
                  3. Tara Kuta (तारा / दीना)
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Calculated from birth stars (Nakshatras) to assess destiny alignment, health, well-being, longevity, and auspicious karmic trajectory.
                </p>
              </div>

              {/* 4. Yoni */}
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-amber-900/15 shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300/60">
                    4 Points
                  </span>
                  <Flame className="w-4 h-4 text-orange-700" />
                </div>
                <h4 className="text-sm font-bold text-amber-950 font-vedic">
                  4. Yoni Kuta (योनि)
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Assesses biological compatibility, instinctive affinity, sexual harmony, and subconscious physical affection based on 14 sacred animal totems.
                </p>
              </div>

              {/* 5. Graha Maitri */}
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-amber-900/15 shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300/60">
                    5 Points
                  </span>
                  <Users className="w-4 h-4 text-amber-800" />
                </div>
                <h4 className="text-sm font-bold text-amber-950 font-vedic">
                  5. Graha Maitri (ग्रह मैत्री)
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Planetary friendship of Moon sign lords. Governs psychological wavelength, daily communication, mental rapport, and intellectual friendship.
                </p>
              </div>

              {/* 6. Gana */}
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-amber-900/15 shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300/60">
                    6 Points
                  </span>
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                </div>
                <h4 className="text-sm font-bold text-amber-950 font-vedic">
                  6. Gana Kuta (गण)
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Classifies temperaments into Deva (divine/empathic), Manushya (human/practical), and Rakshasa (dominant/assertive) for lifestyle compatibility.
                </p>
              </div>

              {/* 7. Bhakoot */}
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-amber-900/15 shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300/60">
                    7 Points
                  </span>
                  <Heart className="w-4 h-4 text-indigo-700" />
                </div>
                <h4 className="text-sm font-bold text-amber-950 font-vedic">
                  7. Bhakoot Kuta (भकूट)
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Analyzes relative Moon sign positions (2/12, 6/8, 9/5). Dictates emotional closeness, family prosperity, financial longevity, and mutual bliss.
                </p>
              </div>

              {/* 8. Nadi */}
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-amber-900/15 shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300/60">
                    8 Points (Highest)
                  </span>
                  <Sparkles className="w-4 h-4 text-purple-700" />
                </div>
                <h4 className="text-sm font-bold text-amber-950 font-vedic">
                  8. Nadi Kuta (नाडी)
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Evaluates physiological constitution (Vata, Pitta, Kapha), hereditary health, cellular vitality, genetic harmony, and sound progeny.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Scoring & Manglik Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Classical Benchmark Scale */}
          <div className="bg-white rounded-3xl border border-amber-900/15 p-6 sm:p-7 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-amber-950 font-vedic flex items-center gap-2">
              <Scale className="w-5 h-5 text-amber-800" />
              <span>Classical 36 Gunas Scoring Scale (गुण मिलान पैमाना)</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-start gap-3">
                <span className="px-2 py-1 rounded-lg bg-emerald-600 text-white font-extrabold text-xs whitespace-nowrap">
                  25 – 36 Gunas
                </span>
                <div className="space-y-0.5">
                  <strong className="text-emerald-950 font-bold block text-sm">Excellent / Uttam (उत्तम मिलान)</strong>
                  <p className="text-emerald-800 leading-relaxed">
                    Highly auspicious union with natural spiritual and emotional synchronization, financial prosperity, and mutual growth.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200/80 flex items-start gap-3">
                <span className="px-2 py-1 rounded-lg bg-amber-600 text-white font-extrabold text-xs whitespace-nowrap">
                  18 – 24 Gunas
                </span>
                <div className="space-y-0.5">
                  <strong className="text-amber-950 font-bold block text-sm">Average / Madhyam (मध्यम मिलान)</strong>
                  <p className="text-amber-800 leading-relaxed">
                    Acceptable threshold for marital stability. Minor remedial adjustments or mutual understanding can sustain long-term harmony.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200/80 flex items-start gap-3">
                <span className="px-2 py-1 rounded-lg bg-rose-600 text-white font-extrabold text-xs whitespace-nowrap">
                  Below 18 Gunas
                </span>
                <div className="space-y-0.5">
                  <strong className="text-rose-950 font-bold block text-sm">Inauspicious / Ashubh (अशुभ मिलान)</strong>
                  <p className="text-rose-800 leading-relaxed">
                    Significant friction in temperament or doshas. Requires in-depth individual chart verification and Vedic remedies (Upayas).
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Manglik Dosha & Upaya Basics */}
          <div className="bg-[#FAF8F5] rounded-3xl border border-amber-900/15 p-6 sm:p-7 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-amber-950 font-vedic flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-800" />
              <span>Manglik (Kuja) Dosha Balancing (मांगलिक विचार)</span>
            </h3>

            <div className="space-y-3 text-xs text-stone-700">
              <div className="p-3.5 rounded-xl bg-white border border-stone-200/80 space-y-1">
                <strong className="text-amber-950 font-bold block text-sm font-vedic">What causes Manglik Dosha?</strong>
                <p className="text-stone-600 leading-relaxed">
                  Occurs when fiery Mars (Mangal) occupies the 1st, 2nd, 4th, 7th, 8th, or 12th house from Lagna, Moon, or Venus, bringing intensity to marital dynamics.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-stone-200/80 space-y-1">
                <strong className="text-amber-950 font-bold block text-sm font-vedic">Authentic Parashari Cancellations (दोष परिहार)</strong>
                <p className="text-stone-600 leading-relaxed">
                  Manglik Dosha is naturally neutralized when both partners are Manglik, or if Mars is placed in friendly signs, associated with benefics (Jupiter), or after age 28.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-100/60 border border-amber-200/90 text-amber-950 font-medium space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-xs text-amber-900">
                  <Info className="w-4 h-4 text-amber-800 shrink-0" />
                  <span>Ready to Calculate?</span>
                </div>
                <p className="text-xs text-amber-900/90 leading-relaxed">
                  Enter both partners' birth details above or try the curated sample matches to view the live calculation report.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}

      {/* PRINTABLE REPORT MODAL */}
      {showPrintModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl border border-amber-900/20 text-stone-900">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-700" />
                <h3 className="text-lg font-bold font-vedic text-amber-950">Vedic Kundali Match Certificate</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowPrintModal(false)}
                className="p-1.5 rounded-full hover:bg-stone-100 text-stone-500 cursor-pointer"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            {/* Printable Content Area */}
            <div id="printable-match-report" className="space-y-6 text-xs text-stone-800">
              <div className="text-center space-y-1 pb-4 border-b border-stone-200">
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-800">GoodAstrology • Kundali Milan Engine</span>
                <h2 className="text-xl font-extrabold text-stone-900 font-vedic">
                  {matchReport.partner1.name} &amp; {matchReport.partner2.name}
                </h2>
                <p className="text-[11px] text-stone-500">
                  Horoscope Compatibility (कुंडली मिलान विवरण)
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200">
                <div>
                  <span className="font-bold text-amber-950 block">{matchReport.partner1.name}</span>
                  <div>Born: {p1Details.dob} at {p1Details.tob || '12:00'}</div>
                  <div>Place: {p1Details.city}</div>
                  <div>Lagna: {matchReport.partner1.profile.lagnaName}</div>
                  <div>Rashi: {matchReport.partner1.profile.moonSignName}</div>
                  <div>Nakshatra: {matchReport.partner1.profile.nakshatraName}</div>
                </div>
                <div>
                  <span className="font-bold text-amber-950 block">{matchReport.partner2.name}</span>
                  <div>Born: {p2Details.dob} at {p2Details.tob || '12:00'}</div>
                  <div>Place: {p2Details.city}</div>
                  <div>Lagna: {matchReport.partner2.profile.lagnaName}</div>
                  <div>Rashi: {matchReport.partner2.profile.moonSignName}</div>
                  <div>Nakshatra: {matchReport.partner2.profile.nakshatraName}</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-center space-y-1">
                <span className="text-[11px] font-bold text-amber-900 uppercase">Total Compatibility Guna Score</span>
                <div className="text-3xl font-extrabold text-amber-950 font-vedic">
                  {matchReport.totalObtainedGunas} / 36 Gunas ({matchReport.percentageScore}%)
                </div>
                <div className="font-bold text-xs text-amber-900">{matchReport.verdict}</div>
                <p className="text-[11px] text-stone-600 max-w-md mx-auto">{matchReport.summaryDescription}</p>
              </div>

              {/* Ashtakoota brief list */}
              <div className="space-y-1.5">
                <span className="font-bold text-stone-900 block">Ashtakoota Milan Breakdown:</span>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  {matchReport.ashtakoota.map(k => (
                    <div key={k.id} className="flex justify-between p-2 rounded-lg bg-stone-50 border border-stone-200">
                      <span className="font-medium text-stone-700">{k.name}</span>
                      <span className="font-bold text-amber-950">{k.obtainedScore} / {k.maxScore}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-stone-100 text-[11px] text-stone-600">
                <span className="font-bold block text-stone-800">Manglik Status:</span>
                {matchReport.manglik.cancellationReason}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-stone-200">
              <button
                type="button"
                onClick={() => setShowPrintModal(false)}
                className="px-4 py-2 rounded-xl border border-stone-300 text-stone-700 text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="px-5 py-2 rounded-xl bg-amber-900 text-amber-50 text-xs font-bold flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Document</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
