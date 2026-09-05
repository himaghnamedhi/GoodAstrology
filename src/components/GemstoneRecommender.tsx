import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  ShieldAlert, 
  Crown, 
  Coins, 
  Heart, 
  Shield, 
  Compass, 
  Printer, 
  Info, 
  CheckCircle2, 
  AlertTriangle, 
  X, 
  ExternalLink,
  Scale,
  Flame,
  Droplets,
  Wind,
  Mountain,
  ChevronRight,
  ChevronLeft,
  Calendar,
  Clock,
  MapPin,
  User,
  ArrowRight,
  RotateCcw,
  Search,
  Globe,
  FileText,
  BookOpen
} from 'lucide-react';
import { 
  NAVARATNA_DATA, 
  LAGNA_RECOMMENDATIONS, 
  LIFE_GOAL_PRESETS, 
  GemstoneInfo, 
  checkGemstoneCompatibility 
} from '../data/gemstoneData';
import { 
  calculateVedicBirthProfile, 
  POPULAR_CITIES, 
  BirthDetails, 
  CalculatedBirthProfile 
} from '../data/vedicAstrologyCalculator';
import { PlanetId, ChartPlacement } from '../types/astrology';
import { GemstoneImage } from './GemstoneImage';

interface GemstoneRecommenderProps {
  initialLagna?: number;
  customPlacements?: ChartPlacement[];
  onNavigateToTab?: (tab: 'chart' | 'builder' | 'gemstones') => void;
  onOpenCustomReport?: (data: { lagna: number; profile: CalculatedBirthProfile; name: string }) => void;
}

export const GemstoneRecommender: React.FC<GemstoneRecommenderProps> = ({
  initialLagna = 1,
  customPlacements = [],
  onNavigateToTab,
  onOpenCustomReport,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'birth_calc' | 'lagna' | 'goals' | 'synergy' | 'directory' | 'calculator'>('birth_calc');
  const [selectedLagna, setSelectedLagna] = useState<number>(initialLagna);
  const [selectedGemId, setSelectedGemId] = useState<string | null>(null);

  // Feature Sub-Navigation Tabs Slider Ref & Scrolling States
  const tabsSliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (tabsSliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tabsSliderRef.current;
      setCanScrollLeft(scrollLeft > 4);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 4);
    }
  };

  useEffect(() => {
    checkScroll();
    const el = tabsSliderRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll, { passive: true });
      window.addEventListener('resize', checkScroll);
      return () => {
        el.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, []);

  const slideTabs = (direction: 'left' | 'right') => {
    if (tabsSliderRef.current) {
      const scrollAmount = 240;
      tabsSliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };
  
  // Birth Details State & Calculation Visibility State
  const [hasCalculated, setHasCalculated] = useState<boolean>(false);
  const [birthDetails, setBirthDetails] = useState<BirthDetails>({
    name: '',
    gender: 'male',
    weightKg: 65,
    weightUnit: 'kg',
    dob: '1998-05-15',
    tob: '',
    city: 'New Delhi',
    latitude: 28.6139,
    longitude: 77.2090,
    timezoneOffset: 5.5
  });
  const [birthHour, setBirthHour] = useState<string>('');
  const [birthMinute, setBirthMinute] = useState<string>('');
  const [birthPeriod, setBirthPeriod] = useState<'AM' | 'PM' | ''>('');
  const [isTimeUnknown, setIsTimeUnknown] = useState<boolean>(false);
  const [calculatedProfile, setCalculatedProfile] = useState<CalculatedBirthProfile>(() => 
    calculateVedicBirthProfile({
      name: '',
      gender: 'male',
      weightKg: 65,
      weightUnit: 'kg',
      dob: '1998-05-15',
      tob: '12:00',
      city: 'New Delhi',
      latitude: 28.6139,
      longitude: 77.2090,
      timezoneOffset: 5.5
    })
  );
  const [isCustomCity, setIsCustomCity] = useState<boolean>(false);

  // City Search State
  const [citySearchQuery, setCitySearchQuery] = useState<string>('');
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState<boolean>(false);

  // Filtered Cities for instant search
  const filteredCities = useMemo(() => {
    if (!citySearchQuery.trim()) return POPULAR_CITIES;
    const q = citySearchQuery.toLowerCase().trim();
    return POPULAR_CITIES.filter(c => 
      c.name.toLowerCase().includes(q) || 
      (c.stateOrRegion && c.stateOrRegion.toLowerCase().includes(q)) ||
      c.country.toLowerCase().includes(q)
    );
  }, [citySearchQuery]);

  // Selected city object
  const currentCityObject = useMemo(() => {
    return POPULAR_CITIES.find(c => c.name === birthDetails.city) || {
      name: birthDetails.city,
      country: 'Custom',
      lat: birthDetails.latitude,
      lng: birthDetails.longitude,
      timezone: birthDetails.timezoneOffset
    };
  }, [birthDetails.city, birthDetails.latitude, birthDetails.longitude, birthDetails.timezoneOffset]);

  // Synergy Checker State
  const [synergyGem1, setSynergyGem1] = useState<string>('ruby');
  const [synergyGem2, setSynergyGem2] = useState<string>('blue_sapphire');

  // Ratti Calculator State
  const [bodyWeightKg, setBodyWeightKg] = useState<number>(65);
  const [isWeightInLbs, setIsWeightInLbs] = useState<boolean>(false);

  // Prescription Print Modal State
  const [isPrintModalOpen, setIsPrintModalOpen] = useState<boolean>(false);
  const [nativeName, setNativeName] = useState<string>(birthDetails.name || 'Native');

  const currentLagnaData = LAGNA_RECOMMENDATIONS[selectedLagna] || LAGNA_RECOMMENDATIONS[1];
  const selectedGemData = selectedGemId ? NAVARATNA_DATA[selectedGemId] : null;

  // Calculate Ratti formulas
  const weightInKg = isWeightInLbs ? Math.round(bodyWeightKg * 0.453592) : bodyWeightKg;
  const calculatedMinRatti = Math.max(3.25, Number((weightInKg / 12).toFixed(2)));
  const calculatedIdealRatti = Math.max(4.5, Number((weightInKg / 10 + 0.5).toFixed(2)));
  const calculatedCarat = Number((calculatedIdealRatti * 0.91).toFixed(2));

  // Compatibility evaluation
  const compatibility = checkGemstoneCompatibility(synergyGem1, synergyGem2);

  const handleCitySelect = (cityName: string) => {
    const city = POPULAR_CITIES.find(c => c.name === cityName);
    if (city) {
      setBirthDetails(prev => ({
        ...prev,
        city: city.name,
        latitude: city.lat,
        longitude: city.lng,
        timezoneOffset: city.timezone
      }));
    }
  };

  const handleTimePartChange = (newHour: string, newMinute: string, newPeriod: 'AM' | 'PM' | '') => {
    setBirthHour(newHour);
    setBirthMinute(newMinute);
    setBirthPeriod(newPeriod);
    if (!newHour || !newMinute || !newPeriod) {
      setBirthDetails(prev => ({ ...prev, tob: '' }));
      return;
    }
    let hourNum = parseInt(newHour, 10) || 12;
    if (newPeriod === 'PM' && hourNum < 12) hourNum += 12;
    if (newPeriod === 'AM' && hourNum === 12) hourNum = 0;
    const formatted = `${String(hourNum).padStart(2, '0')}:${String(newMinute).padStart(2, '0')}`;
    setBirthDetails(prev => ({ ...prev, tob: formatted }));
  };

  const handleCalculateBirthChart = () => {
    let timeToUse = birthDetails.tob;
    if (isTimeUnknown || !birthHour || !birthMinute || !birthPeriod) {
      timeToUse = '12:00';
    } else {
      let hourNum = parseInt(birthHour, 10) || 12;
      if (birthPeriod === 'PM' && hourNum < 12) hourNum += 12;
      if (birthPeriod === 'AM' && hourNum === 12) hourNum = 0;
      timeToUse = `${String(hourNum).padStart(2, '0')}:${String(birthMinute).padStart(2, '0')}`;
    }
    const profile = calculateVedicBirthProfile({
      ...birthDetails,
      tob: timeToUse
    });
    setCalculatedProfile(profile);
    setSelectedLagna(profile.lagnaNumber);
    setNativeName(birthDetails.name || 'Native');
    setBodyWeightKg(profile.bodyWeightKg);
    setHasCalculated(true);
  };

  const getElementIcon = (elem: string) => {
    switch (elem) {
      case 'Fire': return <Flame className="w-3.5 h-3.5 text-amber-600" />;
      case 'Water': return <Droplets className="w-3.5 h-3.5 text-sky-600" />;
      case 'Air': return <Wind className="w-3.5 h-3.5 text-indigo-600" />;
      case 'Earth': return <Mountain className="w-3.5 h-3.5 text-emerald-600" />;
      default: return null;
    }
  };

  // Get recommendations for calculated birth chart
  const birthLagnaData = LAGNA_RECOMMENDATIONS[calculatedProfile.lagnaNumber] || LAGNA_RECOMMENDATIONS[1];
  const birthMoonGemData = Object.values(NAVARATNA_DATA).find(g => g.planet === calculatedProfile.moonLord) || NAVARATNA_DATA['pearl'];
  const nameDestinyGemData = Object.values(NAVARATNA_DATA).find(g => g.planet === calculatedProfile.destinyPlanet) || NAVARATNA_DATA['ruby'];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-[#FAF5EE] via-[#F5EFE6] to-[#ECE3D5] rounded-3xl p-6 sm:p-8 border border-amber-900/15 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-amber-950 font-vedic tracking-tight">
              Vedic Gemstone Prescription
            </h1>
            <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
              Calculate authentic astrological gemstone recommendations by Name, Date of Birth, Time of Birth, and Place.
              Strengthen auspicious Trikona & Kendra lords while strictly filtering out toxic Dusthana planetary clashes.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              id="btn-gemstone-generate-report"
              onClick={() => {
                if (onOpenCustomReport) {
                  onOpenCustomReport({
                    lagna: selectedLagna,
                    profile: calculatedProfile,
                    name: birthDetails.name || 'Native',
                  });
                } else {
                  setNativeName(birthDetails.name || 'Native');
                  setIsPrintModalOpen(true);
                }
              }}
              className="px-4 py-2.5 rounded-xl bg-amber-900 hover:bg-amber-950 text-amber-50 font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-all active:scale-95 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-amber-200" />
              <span>Generate Report</span>
            </button>
            {onNavigateToTab && (
              <button
                onClick={() => onNavigateToTab('builder')}
                className="px-4 py-2.5 rounded-xl bg-white hover:bg-amber-50 text-stone-800 border border-amber-900/20 font-medium text-xs sm:text-sm flex items-center gap-2 shadow-2xs transition-all active:scale-95 cursor-pointer"
              >
                <Compass className="w-4 h-4 text-amber-800" />
                <span>Open Kundli Reader</span>
              </button>
            )}
          </div>
        </div>

        {/* Feature Sub-Navigation Tabs Slider */}
        <div className="mt-8 pt-6 border-t border-amber-900/10">
          {/* Header Bar with Slide Indicator Animation and Controls */}
          <div className="flex items-center justify-between gap-2 mb-2 px-0.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-950">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-600"></span>
              </span>
              <span className="font-vedic tracking-wide uppercase text-[11px] text-amber-900">
                Prescription Modes
              </span>
              <span className="text-[11px] font-medium text-stone-500 flex items-center gap-1">
                (Slide to explore <span className="inline-block animate-slider-arrow text-amber-800 font-bold">&rarr;</span>)
              </span>
            </div>

            {/* Slider Navigation Arrows */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => slideTabs('left')}
                disabled={!canScrollLeft}
                aria-label="Slide left"
                className={`p-1.5 rounded-lg border transition-all ${
                  canScrollLeft
                    ? 'bg-white text-stone-800 border-amber-900/20 hover:bg-amber-100/70 shadow-2xs active:scale-95 cursor-pointer'
                    : 'bg-white/40 text-stone-400 border-transparent cursor-not-allowed opacity-40'
                }`}
                title="Slide left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => slideTabs('right')}
                disabled={!canScrollRight}
                aria-label="Slide right"
                className={`p-1.5 rounded-lg border transition-all ${
                  canScrollRight
                    ? 'bg-white text-stone-800 border-amber-900/20 hover:bg-amber-100/70 shadow-2xs active:scale-95 cursor-pointer'
                    : 'bg-white/40 text-stone-400 border-transparent cursor-not-allowed opacity-40'
                }`}
                title="Slide right"
              >
                <ChevronRight className="w-4 h-4 animate-slider-arrow" />
              </button>
            </div>
          </div>

          {/* Slider Track: No scrollbar bar, smooth sliding, animated affordance */}
          <div className="relative">
            {/* Left Edge Gradient Fade */}
            {canScrollLeft && (
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#FAF5EE] to-transparent z-10 pointer-events-none transition-opacity duration-300" />
            )}

            {/* Sub-Navigation Slider Track */}
            <div
              ref={tabsSliderRef}
              className="flex overflow-x-auto gap-2.5 scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden no-scrollbar py-1"
            >
              {[
                { id: 'birth_calc', label: 'Recommendation by Name, DOB & Place', icon: Compass },
                { id: 'lagna', label: 'By Ascendant (Lagna)', icon: Crown },
                { id: 'goals', label: 'By Life Goals & Needs', icon: Heart },
                { id: 'synergy', label: 'Synergy & Conflict Matrix', icon: ShieldAlert },
                { id: 'directory', label: '9 Navaratnas Encyclopedia', icon: Sparkles },
                { id: 'calculator', label: 'Ratti & Metal Calculator', icon: Scale },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeSubTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveSubTab(tab.id as any)}
                    className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
                      isActive
                        ? 'bg-amber-900 text-amber-50 shadow-xs ring-2 ring-amber-800/30 scale-[1.02]'
                        : 'bg-white/85 hover:bg-white text-stone-700 border border-amber-900/10 hover:border-amber-900/25 hover:shadow-2xs'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Right Edge Gradient Fade */}
            {canScrollRight && (
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#ECE3D5] to-transparent z-10 pointer-events-none transition-opacity duration-300" />
            )}
          </div>
        </div>
      </div>

      {/* SUB-VIEW 0: RECOMMENDATION BY NAME, DOB, TIME & PLACE */}
      {activeSubTab === 'birth_calc' && (
        <div className="space-y-8">
          
          {/* Input Form Card */}
          <div className="bg-white rounded-3xl border border-amber-900/15 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-stone-100">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-amber-950 font-vedic">
                  Free Gemstone Calculator by Date of Birth &amp; Kundali
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 mt-1">
                  Accurately calculates your Vedic Ascendant (Lagna), Moon Sign, Nakshatra, and exact Gemstone Weight (Ratti/Carats) calibrated to your body weight and constitutional prana threshold.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              
              {/* 1. Enter your name: */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5 font-vedic">
                  <User className="w-3.5 h-3.5 text-amber-800" />
                  <span>Enter your name:</span>
                </label>
                <input
                  type="text"
                  value={birthDetails.name}
                  onChange={(e) => setBirthDetails(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter Your Name"
                  className="w-full h-[46px] px-3 rounded-xl border border-stone-300 bg-stone-50 font-medium text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-2xs"
                />
              </div>

              {/* 2. Enter your gender: */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5 font-vedic">
                  <Sparkles className="w-3.5 h-3.5 text-amber-800" />
                  <span>Enter your gender:</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['male', 'female', 'other'] as const).map((g) => {
                    const isSelected = (birthDetails.gender || 'male') === g;
                    const activeColor =
                      g === 'male'
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                        : g === 'female'
                        ? 'bg-pink-600 text-white border-pink-600 shadow-xs'
                        : 'bg-stone-800 text-white border-stone-800 shadow-xs';
                    const hoverColor =
                      g === 'male'
                        ? 'hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300'
                        : g === 'female'
                        ? 'hover:bg-pink-50 hover:text-pink-700 hover:border-pink-300'
                        : 'hover:bg-stone-100 hover:text-stone-800 hover:border-stone-400';

                    return (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setBirthDetails(prev => ({ ...prev, gender: g }))}
                        className={`h-[46px] px-3 rounded-xl text-sm font-bold capitalize transition-all cursor-pointer border flex items-center justify-center gap-1.5 ${
                          isSelected
                            ? activeColor
                            : `bg-stone-50 text-stone-700 border-stone-300 ${hoverColor}`
                        }`}
                      >
                        {g === 'male' && <span className="text-base">♂</span>}
                        {g === 'female' && <span className="text-base">♀</span>}
                        <span>{g === 'other' ? 'Other' : g.charAt(0).toUpperCase() + g.slice(1)}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Body weight: */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5 font-vedic">
                  <Scale className="w-3.5 h-3.5 text-amber-800" />
                  <span>Body weight:</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="20"
                    max="300"
                    value={birthDetails.weightKg || ''}
                    onChange={(e) => setBirthDetails(prev => ({ ...prev, weightKg: parseFloat(e.target.value) || 0 }))}
                    placeholder="Enter Your Weight"
                    className="w-full h-[46px] px-3 rounded-xl border border-stone-300 bg-stone-50 font-medium text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-2xs pr-14"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-amber-900 uppercase">
                    {birthDetails.weightUnit || 'kg'}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2 pt-0.5">
                  <span className="text-[11px] text-stone-500 leading-tight">
                    ~1 Ratti per 10–12 kg weight
                  </span>
                  <div className="flex items-center gap-1 bg-stone-100 p-0.5 rounded-lg border border-stone-200 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        if (birthDetails.weightUnit === 'lbs') {
                          const converted = Math.round(birthDetails.weightKg * 0.453592);
                          setBirthDetails(prev => ({ ...prev, weightKg: converted, weightUnit: 'kg' }));
                        }
                      }}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold transition-colors cursor-pointer ${
                        (birthDetails.weightUnit || 'kg') === 'kg' ? 'bg-amber-900 text-amber-50 shadow-2xs' : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      KG
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if ((birthDetails.weightUnit || 'kg') === 'kg') {
                          const converted = Math.round(birthDetails.weightKg * 2.20462);
                          setBirthDetails(prev => ({ ...prev, weightKg: converted, weightUnit: 'lbs' }));
                        }
                      }}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold transition-colors cursor-pointer ${
                        birthDetails.weightUnit === 'lbs' ? 'bg-amber-900 text-amber-50 shadow-2xs' : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      LBS
                    </button>
                  </div>
                </div>
              </div>

              {/* 4. Enter your birth date: */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5 font-vedic">
                    <Calendar className="w-3.5 h-3.5 text-amber-800" />
                    <span>Enter your birth date:</span>
                  </label>
                  <span className="text-[10px] font-mono text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
                    DD-MM-YYYY
                  </span>
                </div>
                <input
                  type="date"
                  value={birthDetails.dob}
                  onChange={(e) => setBirthDetails(prev => ({ ...prev, dob: e.target.value }))}
                  className="w-full p-3 rounded-xl border border-stone-300 bg-stone-50 font-medium text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-2xs cursor-pointer"
                />
              </div>

              {/* 5. Enter your birth time: (01, 00, AM) */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5 font-vedic">
                    <Clock className="w-3.5 h-3.5 text-amber-800" />
                    <span>Enter your birth time:</span>
                  </label>
                  <label className="text-[10px] text-stone-500 flex items-center gap-1 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isTimeUnknown}
                      onChange={(e) => setIsTimeUnknown(e.target.checked)}
                      className="rounded text-amber-900 focus:ring-amber-500"
                    />
                    <span>Unknown (12 PM)</span>
                  </label>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {/* Hour */}
                  <div>
                    <select
                      disabled={isTimeUnknown}
                      value={birthHour}
                      onChange={(e) => handleTimePartChange(e.target.value, birthMinute, birthPeriod)}
                      className={`w-full h-[46px] px-3 rounded-xl border font-bold text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-2xs ${
                        isTimeUnknown ? 'bg-stone-200/60 text-stone-400 border-stone-300' : 'bg-stone-50 text-stone-900 border-stone-300'
                      }`}
                    >
                      <option value="">--</option>
                      {['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'].map((h) => (
                        <option key={h} value={h}>{h}</option>
                      ))}
                    </select>
                    <span className="text-[10px] font-medium text-stone-500 block mt-1.5 text-center">Hour (01-12)</span>
                  </div>

                  {/* Minute */}
                  <div>
                    <select
                      disabled={isTimeUnknown}
                      value={birthMinute}
                      onChange={(e) => handleTimePartChange(birthHour, e.target.value, birthPeriod)}
                      className={`w-full h-[46px] px-3 rounded-xl border font-bold text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-2xs ${
                        isTimeUnknown ? 'bg-stone-200/60 text-stone-400 border-stone-300' : 'bg-stone-50 text-stone-900 border-stone-300'
                      }`}
                    >
                      <option value="">--</option>
                      {Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0')).map((m) => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                    <span className="text-[10px] font-medium text-stone-500 block mt-1.5 text-center">Minute (00-59)</span>
                  </div>

                  {/* Period AM / PM */}
                  <div>
                    <div className="grid grid-cols-2 gap-1 h-[46px]">
                      {(['AM', 'PM'] as const).map((p) => {
                        const isPeriodActive = birthPeriod === p;
                        return (
                          <button
                            key={p}
                            type="button"
                            disabled={isTimeUnknown}
                            onClick={() => handleTimePartChange(birthHour, birthMinute, p)}
                            className={`rounded-xl text-xs font-bold transition-all border cursor-pointer flex items-center justify-center ${
                              isTimeUnknown 
                                ? 'bg-stone-200/60 text-stone-400 border-stone-300'
                                : isPeriodActive
                                  ? 'bg-amber-900 text-amber-50 border-amber-900 shadow-xs'
                                  : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-300'
                            }`}
                          >
                            {p}
                          </button>
                        );
                      })}
                    </div>
                    <span className="text-[10px] font-medium text-stone-500 block mt-1.5 text-center">Period</span>
                  </div>
                </div>
              </div>

              {/* 6. Enter your birth place: */}
              <div className="space-y-1.5 relative">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5 font-vedic">
                    <MapPin className="w-3.5 h-3.5 text-amber-800" />
                    <span>Enter your birth place:</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCustomCity(!isCustomCity);
                      setIsCityDropdownOpen(false);
                    }}
                    className="text-[10px] text-amber-800 hover:text-amber-950 font-semibold cursor-pointer underline underline-offset-2"
                  >
                    {isCustomCity ? 'Pick from 100+ Cities' : 'Custom Lat/Lng'}
                  </button>
                </div>

                {!isCustomCity ? (
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
                      className="w-full p-3 rounded-xl border border-stone-300 bg-stone-50 font-medium text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500 text-left flex items-center justify-between shadow-2xs hover:bg-white transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2 truncate pr-2">
                        <MapPin className="w-4 h-4 text-amber-800 shrink-0" />
                        <div className="truncate">
                          <span className="font-bold text-stone-900">{birthDetails.city || 'Enter Birth Place Here'}</span>
                          {currentCityObject.stateOrRegion && (
                            <span className="text-stone-500 text-xs ml-1">({currentCityObject.stateOrRegion}, {currentCityObject.country})</span>
                          )}
                        </div>
                      </div>
                      <div className="text-[11px] font-semibold text-amber-900 bg-amber-100/70 px-2 py-0.5 rounded-md shrink-0">
                        {birthDetails.latitude > 0 ? `${birthDetails.latitude.toFixed(1)}°N` : `${Math.abs(birthDetails.latitude).toFixed(1)}°S`}
                      </div>
                    </button>

                    {/* Search Dropdown Popup */}
                    {isCityDropdownOpen && (
                      <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-white rounded-2xl border border-stone-200 shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                        {/* Search Input Bar */}
                        <div className="p-3 border-b border-stone-100 bg-stone-50/80 flex items-center gap-2">
                          <Search className="w-4 h-4 text-stone-400 shrink-0" />
                          <input
                            type="text"
                            autoFocus
                            placeholder="Type city, state, or country (e.g. Guwahati, Varanasi, Dallas)..."
                            value={citySearchQuery}
                            onChange={(e) => setCitySearchQuery(e.target.value)}
                            className="w-full bg-transparent text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none font-medium"
                          />
                          {citySearchQuery && (
                            <button
                              type="button"
                              onClick={() => setCitySearchQuery('')}
                              className="text-stone-400 hover:text-stone-600 p-0.5 rounded-full cursor-pointer"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>

                        {/* City List */}
                        <div className="max-h-60 overflow-y-auto divide-y divide-stone-100 p-1">
                          {filteredCities.length > 0 ? (
                            filteredCities.map((c) => {
                              const isSelected = c.name === birthDetails.city;
                              return (
                                <button
                                  key={`${c.name}-${c.country}-${c.lat}`}
                                  type="button"
                                  onClick={() => {
                                    handleCitySelect(c.name);
                                    setIsCityDropdownOpen(false);
                                    setCitySearchQuery('');
                                  }}
                                  className={`w-full text-left px-3 py-2.5 rounded-xl transition-colors flex items-center justify-between text-xs cursor-pointer ${
                                    isSelected 
                                      ? 'bg-amber-900 text-amber-50 font-bold' 
                                      : 'hover:bg-amber-50 text-stone-800'
                                  }`}
                                >
                                  <div>
                                    <div className="font-semibold text-sm flex items-center gap-1.5">
                                      <span>{c.name}</span>
                                      {c.stateOrRegion && (
                                        <span className={isSelected ? 'text-amber-200 text-xs' : 'text-stone-500 text-xs font-normal'}>
                                          • {c.stateOrRegion}
                                        </span>
                                      )}
                                    </div>
                                    <div className={isSelected ? 'text-amber-200/80 text-[11px]' : 'text-stone-400 text-[11px]'}>
                                      {c.country} (UTC {c.timezone >= 0 ? `+${c.timezone}` : c.timezone}h)
                                    </div>
                                  </div>
                                  <div className="text-right shrink-0">
                                    <div className={`font-mono text-[11px] ${isSelected ? 'text-amber-100' : 'text-stone-500'}`}>
                                      {c.lat.toFixed(2)}°, {c.lng.toFixed(2)}°
                                    </div>
                                  </div>
                                </button>
                              );
                            })
                          ) : (
                            <div className="p-4 text-center text-xs text-stone-500 space-y-2">
                              <p>No matching preset city found for "{citySearchQuery}".</p>
                              <button
                                type="button"
                                onClick={() => {
                                  setIsCustomCity(true);
                                  setIsCityDropdownOpen(false);
                                }}
                                className="px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-lg text-xs font-semibold cursor-pointer"
                              >
                                Enter Custom Coordinates
                              </button>
                            </div>
                          )}
                        </div>
                        
                        {/* Footer Info */}
                        <div className="p-2.5 bg-stone-50 border-t border-stone-100 text-[11px] text-stone-500 flex items-center justify-between">
                          <span className="flex items-center gap-1">
                            <Globe className="w-3 h-3 text-amber-800" />
                            <span>{POPULAR_CITIES.length}+ Accurate Global Coordinates</span>
                          </span>
                          <button
                            type="button"
                            onClick={() => setIsCityDropdownOpen(false)}
                            className="text-stone-500 hover:text-stone-700 font-semibold cursor-pointer"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    <div className="grid grid-cols-2 gap-1.5">
                      <div>
                        <label className="text-[10px] text-stone-500 block mb-0.5">Latitude (°N/S)</label>
                        <input
                          type="number"
                          step="0.0001"
                          placeholder="Lat (e.g. 26.14)"
                          value={birthDetails.latitude}
                          onChange={(e) => setBirthDetails(prev => ({ ...prev, latitude: parseFloat(e.target.value) || 0 }))}
                          className="w-full p-2.5 rounded-xl border border-stone-300 bg-stone-50 text-xs font-medium text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-stone-500 block mb-0.5">Longitude (°E/W)</label>
                        <input
                          type="number"
                          step="0.0001"
                          placeholder="Lng (e.g. 91.73)"
                          value={birthDetails.longitude}
                          onChange={(e) => setBirthDetails(prev => ({ ...prev, longitude: parseFloat(e.target.value) || 0 }))}
                          className="w-full p-2.5 rounded-xl border border-stone-300 bg-stone-50 text-xs font-medium text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[10px] text-stone-500">Timezone Offset (Hrs from UTC)</span>
                      <input
                        type="number"
                        step="0.25"
                        value={birthDetails.timezoneOffset}
                        onChange={(e) => setBirthDetails(prev => ({ ...prev, timezoneOffset: parseFloat(e.target.value) || 0 }))}
                        className="w-20 p-1.5 rounded-lg border border-stone-300 bg-stone-50 text-xs font-medium text-right text-stone-900"
                      />
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* Calculate Action */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-stone-100">
              <div className="flex items-center gap-2 text-xs text-stone-600">
                <Scale className="w-4 h-4 text-amber-800 shrink-0" />
                <span>Includes personalized gemstone dosage calculation by constitutional body weight.</span>
              </div>
              <div className="flex items-center gap-2">
                {hasCalculated && (
                  <button
                    type="button"
                    onClick={() => setHasCalculated(false)}
                    className="px-4 py-3 rounded-xl bg-white hover:bg-stone-100 text-stone-700 border border-stone-300 font-semibold text-sm flex items-center gap-1.5 shadow-xs transition-all active:scale-95 cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4 text-stone-600" />
                    <span>View Basic Info</span>
                  </button>
                )}
                <button
                  onClick={handleCalculateBirthChart}
                  className="px-6 py-3 rounded-xl bg-amber-900 hover:bg-amber-950 text-amber-50 font-bold text-sm flex items-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>{hasCalculated ? 'Recalculate My Gemstones' : 'Calculate My Gemstones'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* If calculated, show the Astrological Profile & Prescribed Stones; Otherwise show Basic Gemstone Information */}
          {hasCalculated ? (
            <div className="space-y-8 animate-fadeIn">
              {/* Calculation Status Confirmation Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-amber-50/90 border border-amber-900/15 text-xs text-amber-950 shadow-2xs">
                <div className="flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Personalized Vedic Gemstone Prescription calculated for <strong>{birthDetails.name || 'Native'}</strong></span>
                </div>
                <button
                  type="button"
                  onClick={() => setHasCalculated(false)}
                  className="px-3 py-1.5 rounded-xl bg-white hover:bg-amber-100/80 border border-amber-900/20 text-stone-800 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-2xs active:scale-95 cursor-pointer self-start sm:self-auto"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-amber-800" />
                  <span>Back to Basic Information</span>
                </button>
              </div>

              {/* Calculated Astrological Profile Strip */}
              <div className="bg-[#FAF8F5] rounded-2xl border border-amber-900/15 p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-200/70">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-900 text-amber-50 flex items-center justify-center font-bold text-lg font-vedic shadow-sm">
                  {birthLagnaData.symbol}
                </div>
                <div>
                  <h3 className="text-base font-bold text-stone-900 font-vedic">
                    Astrological Kundli Profile: <span className="text-amber-950">{birthDetails.name || 'Native'}</span>
                  </h3>
                  <p className="text-xs text-stone-500">
                    Born {birthDetails.dob}{birthDetails.tob ? ` at ${birthDetails.tob}` : ''} • {birthDetails.city} (UTC {birthDetails.timezoneOffset >= 0 ? `+${birthDetails.timezoneOffset}` : birthDetails.timezoneOffset})
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setSelectedLagna(calculatedProfile.lagnaNumber);
                    setActiveSubTab('lagna');
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-amber-900 text-amber-50 text-xs font-semibold hover:bg-amber-950 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Explore in Lagna Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Profile Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-white border border-stone-200/80 space-y-1">
                <span className="text-[10px] uppercase font-bold text-stone-500 block">Ascendant (Lagna)</span>
                <div className="text-sm font-bold text-amber-950 font-vedic">{calculatedProfile.lagnaName}</div>
                <div className="text-[11px] text-stone-600">
                  Lord: <strong className="capitalize text-amber-900">{calculatedProfile.lagnaLord}</strong> ({calculatedProfile.lagnaDegree}°)
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-stone-200/80 space-y-1">
                <span className="text-[10px] uppercase font-bold text-stone-500 block">Moon Sign (Rashi)</span>
                <div className="text-sm font-bold text-amber-950 font-vedic">{calculatedProfile.moonSignName}</div>
                <div className="text-[11px] text-stone-600">
                  Nakshatra: <strong className="text-stone-800">{calculatedProfile.nakshatraName}</strong> (Pada {calculatedProfile.nakshatraPada})
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-stone-200/80 space-y-1">
                <span className="text-[10px] uppercase font-bold text-stone-500 block">Sun Sign (Surya Rashi)</span>
                <div className="text-sm font-bold text-amber-950 font-vedic">{calculatedProfile.sunSignName}</div>
                <div className="text-[11px] text-stone-600">
                  Vitality &amp; Soul Essence
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-stone-200/80 space-y-1">
                <span className="text-[10px] uppercase font-bold text-stone-500 block">Name Vibration (Avakahada)</span>
                <div className="text-sm font-bold text-amber-950 font-vedic">{calculatedProfile.nameRashiName}</div>
                <div className="text-[11px] text-stone-600">
                  Destiny No. <strong>{calculatedProfile.destinyNumber}</strong> (Ruled by <span className="capitalize">{calculatedProfile.destinyPlanet}</span>)
                </div>
              </div>

              {/* 5. Prescribed Dosage from Body Weight */}
              <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-300/80 space-y-1 col-span-2 sm:col-span-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-amber-900 flex items-center gap-1">
                    <Scale className="w-3 h-3 text-amber-800" />
                    <span>Gemstone Dosage</span>
                  </span>
                  <span className="text-[9px] font-bold text-amber-800 bg-white px-1.5 py-0.2 rounded border border-amber-200 uppercase">
                    {calculatedProfile.gender}
                  </span>
                </div>
                <div className="text-sm font-bold text-amber-950 font-mono">
                  {calculatedProfile.prescribedIdealRatti} Ratti
                </div>
                <div className="text-[11px] text-amber-900/90 font-medium">
                  {calculatedProfile.prescribedCarat} Carats • {calculatedProfile.bodyWeightKg} kg body mass
                </div>
              </div>
            </div>

            {/* Constitutional Weight Dosage Rationale Banner */}
            <div className="bg-amber-100/60 border border-amber-300/80 rounded-xl p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-amber-950">
              <div className="flex items-start sm:items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-amber-900 text-amber-50 shrink-0 mt-0.5 sm:mt-0">
                  <Scale className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-amber-950 font-vedic block sm:inline mr-2">Constitutional Dosage:</strong>
                  <span className="text-stone-700">{calculatedProfile.prescribedWeightRationale}</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center font-mono text-[11px] bg-white px-2.5 py-1 rounded-lg border border-amber-200">
                <span className="text-stone-500">Min. Baseline:</span>
                <strong className="text-amber-900">{calculatedProfile.prescribedMinRatti} Ratti</strong>
              </div>
            </div>
          </div>

          {/* Primary Prescribed Gemstones for this native */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-bold text-amber-950 font-vedic">
                Personalized Gemstones for {birthDetails.name || 'Native'}
              </h3>
              <span className="text-xs text-stone-500">
                Tailored for {birthLagnaData.lagnaName} Ascendant
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              
              {/* 1. Life Stone */}
              {(() => {
                const rec = birthLagnaData.lifeStone;
                const gem = NAVARATNA_DATA[rec.gemId];
                return (
                  <div 
                    className="bg-white rounded-3xl border border-amber-900/20 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden group cursor-pointer"
                    onClick={() => setSelectedGemId(rec.gemId)}
                  >
                    <div className={`absolute top-0 right-0 w-32 h-32 ${gem.bgTint} rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none`} />
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                          Life Stone (Jeevan Ratna)
                        </span>
                        <span className="text-xs font-bold text-stone-500">{rec.houseRulership}</span>
                      </div>

                      <div className="flex items-center gap-3.5 mb-3">
                        <div className="p-1.5 rounded-2xl bg-stone-50 border border-stone-200/80 shadow-inner shrink-0 group-hover:scale-105 transition-transform">
                          <GemstoneImage gemId={rec.gemId} size="md" />
                        </div>
                        <div>
                          <h4 className="text-base font-bold text-stone-900 font-vedic">{rec.gemName}</h4>
                          <p className="text-xs text-stone-500 font-vedic">{gem.sanskritName} • {gem.planetName.split(' ')[0]}</p>
                        </div>
                      </div>

                      <p className="text-xs text-stone-600 leading-relaxed mb-3">
                        {rec.why}
                      </p>

                      {/* Weight-Calibrated Prescribed Dosage */}
                      <div className="flex items-center justify-between text-xs bg-amber-50/90 border border-amber-200/80 p-2.5 rounded-xl text-amber-950 font-medium mb-3">
                        <div className="flex items-center gap-1.5">
                          <Scale className="w-3.5 h-3.5 text-amber-800 shrink-0" />
                          <span>Dosage for {calculatedProfile.bodyWeightKg} kg:</span>
                        </div>
                        <span className="font-bold text-amber-900 bg-white px-2 py-0.5 rounded-md border border-amber-300/80 shadow-2xs font-mono text-[11px]">
                          {calculatedProfile.prescribedIdealRatti} Ratti ({calculatedProfile.prescribedCarat} ct)
                        </span>
                      </div>

                      <div className="space-y-1.5 text-xs text-stone-600 bg-stone-50 p-3 rounded-xl border border-stone-200/60 mb-3">
                        <div className="flex justify-between">
                          <span className="text-stone-500">Ideal Metal:</span>
                          <span className="font-semibold text-stone-800">{gem.idealMetal.split(' or ')[0]}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-stone-500">Finger:</span>
                          <span className="font-semibold text-stone-800">{gem.idealFinger.split('(')[0]}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-stone-500">Auspicious Day:</span>
                          <span className="font-semibold text-stone-800">{gem.wearingDay.split(' during')[0]}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-amber-900 group-hover:text-amber-950">
                      <span>View Ritual & Beej Mantra</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                );
              })()}

              {/* 2. Lucky Stone (Bhagya Ratna) */}
              {(() => {
                const rec = birthLagnaData.luckyStone;
                const gem = NAVARATNA_DATA[rec.gemId];
                return (
                  <div 
                    className="bg-white rounded-3xl border border-emerald-900/20 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden group cursor-pointer"
                    onClick={() => setSelectedGemId(rec.gemId)}
                  >
                    <div className={`absolute top-0 right-0 w-32 h-32 ${gem.bgTint} rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none`} />
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-200">
                          Lucky Stone (Bhagya Ratna)
                        </span>
                        <span className="text-xs font-bold text-stone-500">{rec.houseRulership}</span>
                      </div>

                      <div className="flex items-center gap-3.5 mb-3">
                        <div className="p-1.5 rounded-2xl bg-stone-50 border border-stone-200/80 shadow-inner shrink-0 group-hover:scale-105 transition-transform">
                          <GemstoneImage gemId={rec.gemId} size="md" />
                        </div>
                        <div>
                          <h4 className="text-base font-bold text-stone-900 font-vedic">{rec.gemName}</h4>
                          <p className="text-xs text-stone-500 font-vedic">{gem.sanskritName} • {gem.planetName.split(' ')[0]}</p>
                        </div>
                      </div>

                      <p className="text-xs text-stone-600 leading-relaxed mb-3">
                        {rec.why}
                      </p>

                      {/* Weight-Calibrated Prescribed Dosage */}
                      <div className="flex items-center justify-between text-xs bg-emerald-50/90 border border-emerald-200/80 p-2.5 rounded-xl text-emerald-950 font-medium mb-3">
                        <div className="flex items-center gap-1.5">
                          <Scale className="w-3.5 h-3.5 text-emerald-800 shrink-0" />
                          <span>Dosage for {calculatedProfile.bodyWeightKg} kg:</span>
                        </div>
                        <span className="font-bold text-emerald-900 bg-white px-2 py-0.5 rounded-md border border-emerald-300/80 shadow-2xs font-mono text-[11px]">
                          {calculatedProfile.prescribedIdealRatti} Ratti ({calculatedProfile.prescribedCarat} ct)
                        </span>
                      </div>

                      <div className="space-y-1.5 text-xs text-stone-600 bg-stone-50 p-3 rounded-xl border border-stone-200/60 mb-3">
                        <div className="flex justify-between">
                          <span className="text-stone-500">Ideal Metal:</span>
                          <span className="font-semibold text-stone-800">{gem.idealMetal.split(' or ')[0]}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-stone-500">Finger:</span>
                          <span className="font-semibold text-stone-800">{gem.idealFinger.split('(')[0]}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-stone-500">Auspicious Day:</span>
                          <span className="font-semibold text-stone-800">{gem.wearingDay.split(' during')[0]}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-amber-900 group-hover:text-amber-950">
                      <span>View Ritual & Beej Mantra</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                );
              })()}

              {/* 3. Punya Stone (Intellect & Prosperity) */}
              {(() => {
                const rec = birthLagnaData.punyaStone;
                const gem = NAVARATNA_DATA[rec.gemId];
                return (
                  <div 
                    className="bg-white rounded-3xl border border-indigo-900/20 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden group cursor-pointer"
                    onClick={() => setSelectedGemId(rec.gemId)}
                  >
                    <div className={`absolute top-0 right-0 w-32 h-32 ${gem.bgTint} rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none`} />
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-900 border border-indigo-200">
                          Punya Stone (Punya Ratna)
                        </span>
                        <span className="text-xs font-bold text-stone-500">{rec.houseRulership}</span>
                      </div>

                      <div className="flex items-center gap-3.5 mb-3">
                        <div className="p-1.5 rounded-2xl bg-stone-50 border border-stone-200/80 shadow-inner shrink-0 group-hover:scale-105 transition-transform">
                          <GemstoneImage gemId={rec.gemId} size="md" />
                        </div>
                        <div>
                          <h4 className="text-base font-bold text-stone-900 font-vedic">{rec.gemName}</h4>
                          <p className="text-xs text-stone-500 font-vedic">{gem.sanskritName} • {gem.planetName.split(' ')[0]}</p>
                        </div>
                      </div>

                      <p className="text-xs text-stone-600 leading-relaxed mb-3">
                        {rec.why}
                      </p>

                      {/* Weight-Calibrated Prescribed Dosage */}
                      <div className="flex items-center justify-between text-xs bg-indigo-50/90 border border-indigo-200/80 p-2.5 rounded-xl text-indigo-950 font-medium mb-3">
                        <div className="flex items-center gap-1.5">
                          <Scale className="w-3.5 h-3.5 text-indigo-800 shrink-0" />
                          <span>Dosage for {calculatedProfile.bodyWeightKg} kg:</span>
                        </div>
                        <span className="font-bold text-indigo-900 bg-white px-2 py-0.5 rounded-md border border-indigo-300/80 shadow-2xs font-mono text-[11px]">
                          {calculatedProfile.prescribedIdealRatti} Ratti ({calculatedProfile.prescribedCarat} ct)
                        </span>
                      </div>

                      <div className="space-y-1.5 text-xs text-stone-600 bg-stone-50 p-3 rounded-xl border border-stone-200/60 mb-3">
                        <div className="flex justify-between">
                          <span className="text-stone-500">Ideal Metal:</span>
                          <span className="font-semibold text-stone-800">{gem.idealMetal.split(' or ')[0]}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-stone-500">Finger:</span>
                          <span className="font-semibold text-stone-800">{gem.idealFinger.split('(')[0]}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-stone-500">Auspicious Day:</span>
                          <span className="font-semibold text-stone-800">{gem.wearingDay.split(' during')[0]}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-amber-900 group-hover:text-amber-950">
                      <span>View Ritual & Beej Mantra</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                );
              })()}

            </div>
          </div>

          {/* Secondary Planetary Harmony Strip */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Moon Sign Harmony Gem */}
            <div className="bg-white rounded-2xl border border-stone-200 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500 font-vedic">
                  Chandra Rashi Stone (Mind & Emotion)
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-sky-100 text-sky-900 font-semibold">
                  Moon Lord
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-1 rounded-xl bg-stone-50 border border-stone-200 shrink-0">
                  <GemstoneImage gemId={birthMoonGemData.id} size="sm" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-900 font-vedic">{birthMoonGemData.name} ({birthMoonGemData.sanskritName})</h4>
                  <p className="text-xs text-stone-600">Moon in {calculatedProfile.moonSignName} ({calculatedProfile.nakshatraName})</p>
                </div>
              </div>
              <p className="text-xs text-stone-600">
                Calms emotional volatility, fosters inner peace, and enhances intuition.
              </p>
              <div className="flex items-center justify-between pt-1 border-t border-stone-100">
                <span className="text-[11px] text-stone-500 flex items-center gap-1">
                  <Scale className="w-3 h-3 text-amber-800" />
                  <span>Dosage:</span>
                </span>
                <span className="text-[11px] font-bold text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 font-mono">
                  {calculatedProfile.prescribedIdealRatti} Ratti ({calculatedProfile.prescribedCarat} ct)
                </span>
              </div>
              <button
                onClick={() => setSelectedGemId(birthMoonGemData.id)}
                className="text-xs font-semibold text-amber-900 hover:text-amber-950 flex items-center gap-1 cursor-pointer"
              >
                <span>View Moon Stone Specifications</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Name Vibration Destiny Stone */}
            <div className="bg-white rounded-2xl border border-stone-200 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500 font-vedic">
                  Name Sound &amp; Destiny Harmony Gem
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-semibold">
                  Destiny No. {calculatedProfile.destinyNumber}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-1 rounded-xl bg-stone-50 border border-stone-200 shrink-0">
                  <GemstoneImage gemId={nameDestinyGemData.id} size="sm" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-900 font-vedic">{nameDestinyGemData.name} ({nameDestinyGemData.sanskritName})</h4>
                  <p className="text-xs text-stone-600">Vibrates with {calculatedProfile.nameRashiName} (Destiny Lord: <span className="capitalize">{calculatedProfile.destinyPlanet}</span>)</p>
                </div>
              </div>
              <p className="text-xs text-stone-600">
                Harmonizes phonetic resonance with social identity, career charisma, and public fortune.
              </p>
              <div className="flex items-center justify-between pt-1 border-t border-stone-100">
                <span className="text-[11px] text-stone-500 flex items-center gap-1">
                  <Scale className="w-3 h-3 text-amber-800" />
                  <span>Dosage:</span>
                </span>
                <span className="text-[11px] font-bold text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 font-mono">
                  {calculatedProfile.prescribedIdealRatti} Ratti ({calculatedProfile.prescribedCarat} ct)
                </span>
              </div>
              <button
                onClick={() => setSelectedGemId(nameDestinyGemData.id)}
                className="text-xs font-semibold text-amber-900 hover:text-amber-950 flex items-center gap-1 cursor-pointer"
              >
                <span>View Name Harmony Specifications</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

          {/* Strict Contraindications for Calculated Lagna */}
          <div className="bg-red-50/70 border border-red-200/80 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-red-900">
              <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
              <h3 className="text-sm font-bold uppercase tracking-wider font-vedic">
                Strictly Forbidden Gemstones for {birthLagnaData.lagnaName.split(' ')[0]}
              </h3>
            </div>
            <p className="text-xs text-red-800/90">
              Vedic Jyotish rule: Never wear gemstones belonging to functional malefics, Maraka lords, or toxic 6th, 8th, and 12th Dusthana rulers for {birthDetails.name || 'this native'}:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-1">
              {birthLagnaData.strictlyAvoid.map((avoid, idx) => (
                <div key={idx} className="bg-white/90 p-3 rounded-xl border border-red-200 text-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-red-900">
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                    <span>{avoid.gemName}</span>
                  </div>
                  <p className="text-[11px] text-stone-600">
                    {avoid.reason}
                  </p>
                </div>
              ))}
            </div>
          </div>

            </div>
          ) : (
            <div className="space-y-8 animate-fadeIn">
              {/* Basic Gemstone Information Header */}
              <div className="bg-white rounded-3xl border border-amber-900/15 p-6 sm:p-8 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100">
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/70 text-amber-900 text-xs font-semibold uppercase tracking-wider">
                      <BookOpen className="w-3.5 h-3.5 text-amber-800" />
                      <span>Foundational Ratna Shastra</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-amber-950 font-vedic">
                      Basic Gemstone Information (नवग्रह रत्न परिचय)
                    </h2>
                    <p className="text-xs sm:text-sm text-stone-600 max-w-3xl leading-relaxed">
                      In Vedic astrology, natural gemstones act as cosmic prisms that channel and amplify beneficial planetary frequencies (Prana) into the subtle human energy field. Enter your birth details in the form above and click <strong>"Calculate My Gemstones"</strong> to generate your personalized Kundli prescription, or explore the sacred gemstones and foundational Jyotish guidelines below.
                    </p>
                  </div>
                </div>

                {/* The 3 Core Pillars of Vedic Astrological Gemstones */}
                <div className="pt-2">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-stone-700 font-vedic mb-3 flex items-center gap-2">
                    <Crown className="w-4 h-4 text-amber-800" />
                    <span>The 3 Pillars of Astrological Gemstones (रत्न प्रकार)</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* 1. Life Stone */}
                    <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-amber-900/15 shadow-2xs space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300/60">
                          1st House (Lagna Bhava)
                        </span>
                        <Shield className="w-4 h-4 text-amber-800" />
                      </div>
                      <h4 className="text-base font-bold text-amber-950 font-vedic">
                        Life Stone (Lagna Ratna)
                      </h4>
                      <p className="text-xs text-stone-600 leading-relaxed">
                        Belongs to your Ascendant (Lagna) lord. Strengthens physical vitality, cellular immunity, personal charisma, and general well-being. It can generally be worn lifelong as a foundational energy shield.
                      </p>
                    </div>

                    {/* 2. Lucky Stone */}
                    <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-amber-900/15 shadow-2xs space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300/60">
                          9th House (Bhagya Bhava)
                        </span>
                        <Sparkles className="w-4 h-4 text-amber-800" />
                      </div>
                      <h4 className="text-base font-bold text-amber-950 font-vedic">
                        Lucky Stone (Bhagya Ratna)
                      </h4>
                      <p className="text-xs text-stone-600 leading-relaxed">
                        Belongs to the 9th house ruler of fortune, divine grace, and dharma. Magnetizes auspicious opportunities, unlocks career breakthroughs, and removes karmic roadblocks during major transitions.
                      </p>
                    </div>

                    {/* 3. Benefic Stone */}
                    <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-amber-900/15 shadow-2xs space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300/60">
                          5th House (Buddhi Bhava)
                        </span>
                        <Coins className="w-4 h-4 text-amber-800" />
                      </div>
                      <h4 className="text-base font-bold text-amber-950 font-vedic">
                        Benefic Stone (Karak Ratna)
                      </h4>
                      <p className="text-xs text-stone-600 leading-relaxed">
                        Belongs to the 5th house ruler of intellect, creativity, and past-life merits (Purva Punya). Enhances mental clarity, memory retention, higher education, and strategic decision-making.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* The 9 Classical Navaratnas Directory */}
              <div className="bg-white rounded-3xl border border-amber-900/15 p-6 sm:p-8 shadow-xs space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-100">
                  <div>
                    <h3 className="text-lg font-bold text-amber-950 font-vedic flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-amber-700" />
                      <span>The 9 Sacred Navaratnas (नवग्रह एवं उनके रत्न)</span>
                    </h3>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Click any gemstone to review its authentic Beej Mantra, Prana Pratishtha ritual, and astrological properties.
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-amber-900 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 self-start sm:self-auto">
                    9 Vedic Planetary Gems
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.values(NAVARATNA_DATA).map((gem) => (
                    <div
                      key={gem.id}
                      onClick={() => setSelectedGemId(gem.id)}
                      className="p-4 rounded-2xl border border-stone-200/90 hover:border-amber-900/30 bg-[#FAF9F6] hover:bg-white hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
                    >
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-1.5 rounded-xl bg-white border border-stone-200/80 shadow-2xs shrink-0 group-hover:scale-105 transition-transform">
                            <GemstoneImage gemId={gem.id} size="md" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-amber-950 font-vedic group-hover:text-amber-800">
                              {gem.name}
                            </h4>
                            <p className="text-xs text-stone-600 font-vedic">
                              {gem.sanskritName} • {gem.planetName.split(' ')[0]}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1 mb-2.5">
                          <span className="text-[10px] px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 font-semibold">
                            {gem.planetName}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded-md bg-amber-100/80 text-amber-900 font-medium">
                            {gem.energyType.split(' / ')[0]}
                          </span>
                        </div>

                        <p className="text-xs text-stone-600 line-clamp-2 mb-3">
                          {gem.primaryBenefits[0]}
                        </p>

                        <div className="space-y-1 text-[11px] text-stone-600 bg-white p-2.5 rounded-xl border border-stone-200/60">
                          <div><strong>Metal:</strong> {gem.idealMetal.split(' or ')[0]}</div>
                          <div><strong>Finger:</strong> {gem.idealFinger.split('(')[0]}</div>
                          <div><strong>Day:</strong> {gem.wearingDay.split(' during')[0]}</div>
                        </div>
                      </div>

                      <div className="mt-3 pt-2 border-t border-stone-200/60 flex items-center justify-between text-xs font-semibold text-amber-900 group-hover:text-amber-950">
                        <span>View Rituals &amp; Mantras</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Foundational Jyotish Rules Callout */}
              <div className="bg-[#FAF8F5] rounded-3xl border border-amber-900/15 p-6 sm:p-8 shadow-xs space-y-4">
                <h3 className="text-base font-bold text-amber-950 font-vedic flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-amber-800" />
                  <span>Important Jyotish Rules Before Wearing Any Gemstone</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-stone-700">
                  <div className="p-4 rounded-xl bg-white border border-stone-200/80 space-y-1.5">
                    <strong className="text-amber-950 font-bold block text-sm font-vedic">1. Cosmic Antennas, Not Absorbers</strong>
                    <p className="leading-relaxed text-stone-600">
                      Gemstones never absorb or neutralize negative energy; they radiate and amplify planetary light into your subtle body. Never wear a gemstone for an enemy or functional malefic planet.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-stone-200/80 space-y-1.5">
                    <strong className="text-amber-950 font-bold block text-sm font-vedic">2. Ascendant (Lagna) Priority</strong>
                    <p className="leading-relaxed text-stone-600">
                      Authentic prescriptions depend on your precise Ascendant (Lagna) degree and house lordship, rather than generic Western monthly birthstones.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-stone-200/80 space-y-1.5">
                    <strong className="text-amber-950 font-bold block text-sm font-vedic">3. Constitutional Weight (Ratti)</strong>
                    <p className="leading-relaxed text-stone-600">
                      A gemstone's weight must be calibrated to your physical body mass (minimum 1 Ratti per 10-12 kg body weight) to ensure the proper biological prana threshold.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      )}

      {/* SUB-VIEW 1: BY ASCENDANT (LAGNA) */}
      {activeSubTab === 'lagna' && (
        <div className="space-y-8">
          
          {/* Ascendant Selector Bar */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-600 font-vedic">
                Select Native's Ascendant / Lagna:
              </label>
              <span className="text-xs text-amber-900 font-medium">
                Active: {currentLagnaData.lagnaName}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((lagnaNum) => {
                const lagna = LAGNA_RECOMMENDATIONS[lagnaNum];
                const isSelected = selectedLagna === lagnaNum;
                return (
                  <button
                    key={lagnaNum}
                    onClick={() => setSelectedLagna(lagnaNum)}
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-amber-950 text-amber-50 border-amber-950 shadow-md ring-2 ring-amber-400/40'
                        : 'bg-white hover:bg-amber-50/70 text-stone-800 border-stone-200 shadow-2xs'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-bold font-vedic">{lagna.symbol} {lagna.lagnaName.split(' ')[0]}</span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${
                        isSelected ? 'bg-amber-800 text-amber-200' : 'bg-stone-100 text-stone-600'
                      }`}>
                        #{lagnaNum}
                      </span>
                    </div>
                    <p className={`text-[11px] font-vedic ${isSelected ? 'text-amber-200' : 'text-stone-500'}`}>
                      {lagna.sanskritName}
                    </p>
                    <div className="mt-2 pt-1 border-t border-stone-200/40 flex items-center justify-between text-[10px]">
                      <span className={`flex items-center gap-1 ${isSelected ? 'text-amber-300' : 'text-stone-500'}`}>
                        {getElementIcon(lagna.element)} {lagna.element}
                      </span>
                      <span className={`capitalize ${isSelected ? 'text-amber-300' : 'text-amber-800 font-medium'}`}>
                        {lagna.rulingPlanet}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Lagna Summary Banner */}
          <div className="bg-[#FAF8F5] border border-amber-900/15 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-amber-950 font-vedic">{currentLagnaData.lagnaName}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200 font-medium">
                  {currentLagnaData.sanskritName}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-stone-100 text-stone-700 font-medium">
                  Lord: <strong className="capitalize">{currentLagnaData.rulingPlanet}</strong>
                </span>
              </div>
              <p className="text-xs sm:text-sm text-stone-600">
                {currentLagnaData.overallGuidance}
              </p>
            </div>

            <button
              onClick={() => setIsPrintModalOpen(true)}
              className="self-start md:self-center px-4 py-2 rounded-xl bg-amber-900 hover:bg-amber-950 text-amber-50 text-xs font-semibold flex items-center gap-2 cursor-pointer shrink-0"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Export {currentLagnaData.lagnaName.split(' ')[0]} Slip</span>
            </button>
          </div>

          {/* 3 Core Auspicious Gemstones Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            {/* 1. Life Stone */}
            {(() => {
              const rec = currentLagnaData.lifeStone;
              const gem = NAVARATNA_DATA[rec.gemId];
              return (
                <div 
                  className="bg-white rounded-3xl border border-stone-200/80 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden group cursor-pointer"
                  onClick={() => setSelectedGemId(rec.gemId)}
                >
                  <div className={`absolute top-0 right-0 w-32 h-32 ${gem.bgTint} rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none`} />
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                        Life Stone (Jeevan Ratna)
                      </span>
                      <span className="text-xs font-bold text-stone-500">{rec.houseRulership}</span>
                    </div>

                    <div className="flex items-center gap-3.5 mb-3">
                      <div className="p-1.5 rounded-2xl bg-stone-50 border border-stone-200/80 shadow-inner shrink-0 group-hover:scale-105 transition-transform">
                        <GemstoneImage gemId={rec.gemId} size="md" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-stone-900 font-vedic">{rec.gemName}</h3>
                        <p className="text-xs text-stone-500 font-vedic">{gem.sanskritName} • {gem.planetName.split(' ')[0]}</p>
                      </div>
                    </div>

                    <p className="text-xs text-stone-600 leading-relaxed mb-4">
                      {rec.why}
                    </p>

                    <div className="space-y-1.5 text-xs text-stone-600 bg-stone-50 p-3 rounded-xl border border-stone-200/60 mb-3">
                      <div className="flex justify-between">
                        <span className="text-stone-500">Ideal Metal:</span>
                        <span className="font-semibold text-stone-800">{gem.idealMetal.split(' or ')[0]}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-500">Finger:</span>
                        <span className="font-semibold text-stone-800">{gem.idealFinger.split('(')[0]}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-500">Auspicious Day:</span>
                        <span className="font-semibold text-stone-800">{gem.wearingDay.split(' during')[0]}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-amber-900 group-hover:text-amber-950">
                    <span>View Wearing Ritual & Mantra</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })()}

            {/* 2. Lucky Stone (Bhagya Ratna) */}
            {(() => {
              const rec = currentLagnaData.luckyStone;
              const gem = NAVARATNA_DATA[rec.gemId];
              return (
                <div 
                  className="bg-white rounded-3xl border border-stone-200/80 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden group cursor-pointer"
                  onClick={() => setSelectedGemId(rec.gemId)}
                >
                  <div className={`absolute top-0 right-0 w-32 h-32 ${gem.bgTint} rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none`} />
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-200">
                        Lucky Stone (Bhagya Ratna)
                      </span>
                      <span className="text-xs font-bold text-stone-500">{rec.houseRulership}</span>
                    </div>

                    <div className="flex items-center gap-3.5 mb-3">
                      <div className="p-1.5 rounded-2xl bg-stone-50 border border-stone-200/80 shadow-inner shrink-0 group-hover:scale-105 transition-transform">
                        <GemstoneImage gemId={rec.gemId} size="md" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-stone-900 font-vedic">{rec.gemName}</h3>
                        <p className="text-xs text-stone-500 font-vedic">{gem.sanskritName} • {gem.planetName.split(' ')[0]}</p>
                      </div>
                    </div>

                    <p className="text-xs text-stone-600 leading-relaxed mb-4">
                      {rec.why}
                    </p>

                    <div className="space-y-1.5 text-xs text-stone-600 bg-stone-50 p-3 rounded-xl border border-stone-200/60 mb-3">
                      <div className="flex justify-between">
                        <span className="text-stone-500">Ideal Metal:</span>
                        <span className="font-semibold text-stone-800">{gem.idealMetal.split(' or ')[0]}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-500">Finger:</span>
                        <span className="font-semibold text-stone-800">{gem.idealFinger.split('(')[0]}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-500">Auspicious Day:</span>
                        <span className="font-semibold text-stone-800">{gem.wearingDay.split(' during')[0]}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-amber-900 group-hover:text-amber-950">
                    <span>View Wearing Ritual & Mantra</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })()}

            {/* 3. Punya Stone (Intellect & Prosperity) */}
            {(() => {
              const rec = currentLagnaData.punyaStone;
              const gem = NAVARATNA_DATA[rec.gemId];
              return (
                <div 
                  className="bg-white rounded-3xl border border-stone-200/80 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden group cursor-pointer"
                  onClick={() => setSelectedGemId(rec.gemId)}
                >
                  <div className={`absolute top-0 right-0 w-32 h-32 ${gem.bgTint} rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none`} />
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-900 border border-indigo-200">
                        Punya Stone (Punya Ratna)
                      </span>
                      <span className="text-xs font-bold text-stone-500">{rec.houseRulership}</span>
                    </div>

                    <div className="flex items-center gap-3.5 mb-3">
                      <div className="p-1.5 rounded-2xl bg-stone-50 border border-stone-200/80 shadow-inner shrink-0 group-hover:scale-105 transition-transform">
                        <GemstoneImage gemId={rec.gemId} size="md" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-stone-900 font-vedic">{rec.gemName}</h3>
                        <p className="text-xs text-stone-500 font-vedic">{gem.sanskritName} • {gem.planetName.split(' ')[0]}</p>
                      </div>
                    </div>

                    <p className="text-xs text-stone-600 leading-relaxed mb-4">
                      {rec.why}
                    </p>

                    <div className="space-y-1.5 text-xs text-stone-600 bg-stone-50 p-3 rounded-xl border border-stone-200/60 mb-3">
                      <div className="flex justify-between">
                        <span className="text-stone-500">Ideal Metal:</span>
                        <span className="font-semibold text-stone-800">{gem.idealMetal.split(' or ')[0]}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-500">Finger:</span>
                        <span className="font-semibold text-stone-800">{gem.idealFinger.split('(')[0]}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-500">Auspicious Day:</span>
                        <span className="font-semibold text-stone-800">{gem.wearingDay.split(' during')[0]}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-amber-900 group-hover:text-amber-950">
                    <span>View Wearing Ritual & Mantra</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })()}

          </div>

          {/* Yogakaraka Special Highlight (if applicable) */}
          {currentLagnaData.yogakarakaStone && (
            <div className="bg-gradient-to-r from-amber-500/10 via-amber-600/10 to-transparent border border-amber-400/40 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-800 text-amber-100 flex items-center justify-center shrink-0 shadow-sm">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-amber-950 font-vedic">
                    Supreme Yogakaraka Gemstone: {currentLagnaData.yogakarakaStone.gemName}
                  </h4>
                  <p className="text-xs text-stone-700 mt-0.5">
                    {currentLagnaData.yogakarakaStone.why} ({currentLagnaData.yogakarakaStone.houseRulership})
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedGemId(currentLagnaData.yogakarakaStone!.gemId)}
                className="px-3.5 py-1.5 rounded-lg bg-amber-900 hover:bg-amber-950 text-amber-50 text-xs font-semibold shrink-0 cursor-pointer"
              >
                Inspect Yogakaraka Details
              </button>
            </div>
          )}

          {/* Strict Contraindications & Avoidance List */}
          <div className="bg-red-50/60 border border-red-200/80 rounded-2xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-red-900">
              <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
              <h3 className="text-sm font-bold uppercase tracking-wider font-vedic">
                Strictly Forbidden Gemstones for {currentLagnaData.lagnaName.split(' ')[0]}
              </h3>
            </div>
            <p className="text-xs text-red-800/90">
              Vedic Jyotish rule: Never wear gemstones belonging to functional malefics, Maraka lords, or toxic 6th, 8th, and 12th Dusthana rulers:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-1">
              {currentLagnaData.strictlyAvoid.map((avoid, idx) => (
                <div key={idx} className="bg-white/90 p-3 rounded-xl border border-red-200 text-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-red-900">
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                    <span>{avoid.gemName}</span>
                  </div>
                  <p className="text-[11px] text-stone-600">
                    {avoid.reason}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* SUB-VIEW 2: BY LIFE GOALS */}
      {activeSubTab === 'goals' && (
        <div className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-amber-950 font-vedic">Prescription by Desired Life Purpose & Karmic Resolution</h2>
            <p className="text-xs sm:text-sm text-stone-600">
              Select your immediate life priority. Ensure the recommended gemstone is verified against your Ascendant (Lagna) rules above.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {LIFE_GOAL_PRESETS.map((goal) => {
              const primaryGem = NAVARATNA_DATA[goal.primaryGemId];
              const secondaryGem = NAVARATNA_DATA[goal.secondaryGemId];
              return (
                <div key={goal.id} className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-sm font-bold text-stone-900 font-vedic">{goal.title}</h3>
                        <p className="text-xs text-amber-900 font-medium">{goal.subtitle}</p>
                      </div>
                    </div>

                    <p className="text-xs text-stone-600 leading-relaxed">
                      {goal.description}
                    </p>

                    {/* Prescribed Gems Pair */}
                    <div className="space-y-2 pt-2 border-t border-stone-100">
                      <div 
                        onClick={() => setSelectedGemId(primaryGem.id)}
                        className="flex items-center justify-between p-2 rounded-xl bg-stone-50 hover:bg-amber-50/80 border border-stone-200/70 cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: primaryGem.colorHex }} />
                          <span className="text-xs font-bold text-stone-800">{primaryGem.name}</span>
                          <span className="text-[10px] text-stone-500">({primaryGem.planetName.split(' ')[0]})</span>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-semibold">Primary</span>
                      </div>

                      <div 
                        onClick={() => setSelectedGemId(secondaryGem.id)}
                        className="flex items-center justify-between p-2 rounded-xl bg-stone-50 hover:bg-amber-50/80 border border-stone-200/70 cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: secondaryGem.colorHex }} />
                          <span className="text-xs font-bold text-stone-800">{secondaryGem.name}</span>
                          <span className="text-[10px] text-stone-500">({secondaryGem.planetName.split(' ')[0]})</span>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-stone-200 text-stone-700 font-semibold">Secondary</span>
                      </div>
                    </div>

                    <div className="text-[11px] text-stone-500 bg-amber-50/60 p-2.5 rounded-xl border border-amber-200/60">
                      <strong className="text-amber-900">Best For: </strong>
                      {goal.bestLagnas.join(', ')} Lagnas
                    </div>
                  </div>

                  <div className="mt-4 pt-2 border-t border-stone-100 text-[11px] text-red-700">
                    <strong>Caution: </strong>{goal.cautions}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUB-VIEW 3: SYNERGY & CONFLICT MATRIX */}
      {activeSubTab === 'synergy' && (
        <div className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-amber-950 font-vedic">Gemstone Compatibility & Anti-Synergy Checker</h2>
            <p className="text-xs sm:text-sm text-stone-600">
              Never wear incompatible gemstones simultaneously. Vedic astrology calculates mutual planetary friendship (Mitra), neutrality (Sama), and enmity (Shatru).
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6">
            
            {/* Gem Selectors */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Gem 1 */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-600 font-vedic">
                  First Gemstone:
                </label>
                <select
                  value={synergyGem1}
                  onChange={(e) => setSynergyGem1(e.target.value)}
                  className="w-full p-3 rounded-xl border border-stone-300 bg-stone-50 font-medium text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  {Object.values(NAVARATNA_DATA).map((gem) => (
                    <option key={gem.id} value={gem.id}>
                      {gem.name} ({gem.sanskritName}) - {gem.planetName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Gem 2 */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-600 font-vedic">
                  Second Gemstone:
                </label>
                <select
                  value={synergyGem2}
                  onChange={(e) => setSynergyGem2(e.target.value)}
                  className="w-full p-3 rounded-xl border border-stone-300 bg-stone-50 font-medium text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  {Object.values(NAVARATNA_DATA).map((gem) => (
                    <option key={gem.id} value={gem.id}>
                      {gem.name} ({gem.sanskritName}) - {gem.planetName}
                    </option>
                  ))}
                </select>
              </div>

            </div>

            {/* Compatibility Verdict Banner */}
            <div className={`p-6 rounded-2xl border ${compatibility.badgeBg} space-y-4`}>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-1 rounded-xl bg-white border border-stone-200 shadow-sm">
                    <GemstoneImage gemId={synergyGem1} size="md" />
                  </div>
                  <span className="text-stone-400 font-bold text-sm">+</span>
                  <div className="p-1 rounded-xl bg-white border border-stone-200 shadow-sm">
                    <GemstoneImage gemId={synergyGem2} size="md" />
                  </div>
                  <span className="text-base font-bold font-vedic ml-1">
                    {compatibility.gem1.name} + {compatibility.gem2.name}
                  </span>
                </div>
                <span className={`text-xs font-extrabold uppercase px-3 py-1 rounded-full border shadow-2xs ${
                  compatibility.status.startsWith('Inimical') 
                    ? 'bg-red-600 text-white border-red-700'
                    : compatibility.status.startsWith('Harmonious')
                    ? 'bg-emerald-600 text-white border-emerald-700'
                    : 'bg-amber-600 text-white border-amber-700'
                }`}>
                  {compatibility.status.split(' ')[0]}
                </span>
              </div>

              <p className="text-sm font-medium leading-relaxed">
                {compatibility.explanation}
              </p>
            </div>

            {/* Incompatibility Table Cheat-Sheet */}
            <div className="space-y-3 pt-4 border-t border-stone-200">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-600 font-vedic">
                Classical Vedic Incompatibility Rules:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-900 space-y-1">
                  <strong>Ruby (Sun) Clashes:</strong>
                  <p className="text-[11px] text-stone-600">Never combine with Blue Sapphire, Diamond, Hessonite, or Cat’s Eye.</p>
                </div>
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-900 space-y-1">
                  <strong>Pearl (Moon) Clashes:</strong>
                  <p className="text-[11px] text-stone-600">Never combine with Hessonite or Diamond.</p>
                </div>
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-900 space-y-1">
                  <strong>Red Coral (Mars) Clashes:</strong>
                  <p className="text-[11px] text-stone-600">Never combine with Emerald or Diamond.</p>
                </div>
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-900 space-y-1">
                  <strong>Emerald (Mercury) Clashes:</strong>
                  <p className="text-[11px] text-stone-600">Never combine with Red Coral or Pearl.</p>
                </div>
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-900 space-y-1">
                  <strong>Yellow Sapphire (Jupiter) Clashes:</strong>
                  <p className="text-[11px] text-stone-600">Never combine with Diamond or Blue Sapphire.</p>
                </div>
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-900 space-y-1">
                  <strong>Blue Sapphire (Saturn) Clashes:</strong>
                  <p className="text-[11px] text-stone-600">Never combine with Ruby, Pearl, or Red Coral.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* SUB-VIEW 4: 9 NAVARATNAS DIRECTORY */}
      {activeSubTab === 'directory' && (
        <div className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-amber-950 font-vedic">The 9 Sacred Navaratnas Encyclopedia</h2>
            <p className="text-xs sm:text-sm text-stone-600">
              Click any gemstone to view its authentic Beej Mantra, Prana Pratishtha ritual, Uparatna substitutes, and cosmic resonance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Object.values(NAVARATNA_DATA).map((gem) => (
              <div
                key={gem.id}
                onClick={() => setSelectedGemId(gem.id)}
                className="bg-white rounded-3xl border border-stone-200 p-5 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center gap-3.5 mb-3">
                    <div className="p-1.5 rounded-2xl bg-stone-50 border border-stone-200/80 shadow-inner shrink-0 group-hover:scale-105 transition-transform">
                      <GemstoneImage gemId={gem.id} size="md" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-stone-900 font-vedic group-hover:text-amber-950">{gem.name}</h3>
                      <p className="text-xs text-amber-900 font-vedic">{gem.sanskritName} • {gem.planetName.split(' ')[0]}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 mb-3">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-stone-100 text-stone-700 font-semibold">
                      {gem.planetName}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-medium">
                      {gem.energyType.split(' / ')[0]}
                    </span>
                  </div>

                  <p className="text-xs text-stone-600 line-clamp-2 mb-3">
                    {gem.primaryBenefits[0]}
                  </p>

                  <div className="space-y-1 text-[11px] text-stone-500 bg-stone-50 p-2.5 rounded-xl border border-stone-200/50">
                    <div><strong>Metal:</strong> {gem.idealMetal.split(' or ')[0]}</div>
                    <div><strong>Finger:</strong> {gem.idealFinger.split('(')[0]}</div>
                    <div><strong>Day:</strong> {gem.wearingDay.split(' during')[0]}</div>
                  </div>
                </div>

                <div className="mt-4 pt-2 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-amber-900 group-hover:text-amber-950">
                  <span>View Full Vedic Rituals</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-VIEW 5: RATTI & METAL CALCULATOR */}
      {activeSubTab === 'calculator' && (
        <div className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-amber-950 font-vedic">Vedic Ratti & Carat Weight Calculator</h2>
            <p className="text-xs sm:text-sm text-stone-600">
              In classical Parashari Jyotish, gemstone weight must match the native's body mass to properly channel planetary prana.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-8">
            
            {/* Weight Slider */}
            <div className="space-y-4 max-w-xl">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-700 font-vedic">
                  Enter Your Body Weight:
                </label>
                <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-lg border border-stone-200 text-xs">
                  <button
                    onClick={() => setIsWeightInLbs(false)}
                    className={`px-2.5 py-1 rounded font-semibold cursor-pointer ${!isWeightInLbs ? 'bg-white text-stone-900 shadow-2xs' : 'text-stone-500'}`}
                  >
                    Kilograms (kg)
                  </button>
                  <button
                    onClick={() => setIsWeightInLbs(true)}
                    className={`px-2.5 py-1 rounded font-semibold cursor-pointer ${isWeightInLbs ? 'bg-white text-stone-900 shadow-2xs' : 'text-stone-500'}`}
                  >
                    Pounds (lbs)
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min={isWeightInLbs ? 80 : 35}
                  max={isWeightInLbs ? 280 : 130}
                  value={bodyWeightKg}
                  onChange={(e) => setBodyWeightKg(Number(e.target.value))}
                  className="flex-1 accent-amber-900 h-2 bg-stone-200 rounded-lg cursor-pointer"
                />
                <span className="text-xl font-extrabold text-amber-950 font-vedic w-20 text-right">
                  {bodyWeightKg} {isWeightInLbs ? 'lbs' : 'kg'}
                </span>
              </div>
            </div>

            {/* Calculated Prescription Outputs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-amber-900/15 space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">Minimum Effective Ratti</span>
                <div className="text-2xl font-extrabold text-amber-950 font-vedic">{calculatedMinRatti} Ratti</div>
                <p className="text-[11px] text-stone-500">Weight ÷ 12 formula baseline</p>
              </div>

              <div className="p-5 rounded-2xl bg-amber-900 text-amber-50 shadow-md space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300">Ideal Prescribed Weight</span>
                <div className="text-3xl font-extrabold font-vedic">{calculatedIdealRatti} Ratti</div>
                <p className="text-[11px] text-amber-200">Recommended for optimal results</p>
              </div>

              <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-amber-900/15 space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">Equivalent In Metric Carats</span>
                <div className="text-2xl font-extrabold text-amber-950 font-vedic">{calculatedCarat} Carats</div>
                <p className="text-[11px] text-stone-500">1 Ratti ≈ 0.91 Metric Carats</p>
              </div>
            </div>

            {/* Finger & Metal Reference Map */}
            <div className="space-y-3 pt-4 border-t border-stone-200">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-600 font-vedic">
                Finger & Metal Alignment Rules:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                  <strong className="text-stone-900">Index Finger (Tarjani):</strong>
                  <p className="text-stone-600">Jupiter (Yellow Sapphire). Wear in Gold or Brass.</p>
                </div>
                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                  <strong className="text-stone-900">Middle Finger (Madhyama):</strong>
                  <p className="text-stone-600">Saturn (Blue Sapphire), Rahu (Hessonite), Venus (Diamond). Silver/Panchdhatu.</p>
                </div>
                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                  <strong className="text-stone-900">Ring Finger (Anamika):</strong>
                  <p className="text-stone-600">Sun (Ruby), Mars (Red Coral), Moon (Pearl), Ketu (Cat’s Eye). Gold/Copper.</p>
                </div>
                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                  <strong className="text-stone-900">Little Finger (Kanishtha):</strong>
                  <p className="text-stone-600">Mercury (Emerald), Moon (Pearl), Venus. Gold/Silver/Bronze.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* GEMSTONE DETAIL MODAL */}
      {selectedGemData && (
        <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-3xl border border-stone-200 shadow-2xl overflow-hidden animate-scaleUp my-8">
            
            {/* Modal Header Banner */}
            <div className={`p-6 bg-gradient-to-r ${selectedGemData.gradient} text-white relative`}>
              <button
                onClick={() => setSelectedGemId(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4">
                <div className="p-2 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 shadow-inner shrink-0">
                  <GemstoneImage gemId={selectedGemData.id} size="lg" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-white/80">
                    {selectedGemData.planetName}
                  </div>
                  <h2 className="text-2xl font-bold font-vedic">{selectedGemData.name}</h2>
                  <p className="text-sm text-white/90 font-vedic">
                    {selectedGemData.sanskritName} • Sacred Vedic Gem
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
              
              {/* Native's Body-Weight Dosage Prescribed Banner */}
              <div className="bg-amber-50 border border-amber-300/80 rounded-2xl p-4 flex items-center justify-between gap-3 shadow-2xs">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-900 text-amber-50 flex items-center justify-center shrink-0 shadow-sm">
                    <Scale className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-amber-900 uppercase block font-vedic">
                      Dosage Prescribed for {birthDetails.name || 'Native'}
                    </span>
                    <span className="text-xs text-stone-600">
                      Based on {calculatedProfile.bodyWeightKg} kg body weight ({calculatedProfile.gender})
                    </span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-base font-bold text-amber-950 font-mono">
                    {calculatedProfile.prescribedIdealRatti} Ratti
                  </div>
                  <div className="text-[11px] text-amber-900 font-semibold font-mono">
                    ({calculatedProfile.prescribedCarat} Carats)
                  </div>
                </div>
              </div>

              {/* Prescribed Wearing Specifications */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
                  <span className="text-stone-500 block text-[10px] uppercase font-bold">Ideal Metal</span>
                  <span className="font-bold text-stone-900">{selectedGemData.idealMetal.split(' or ')[0]}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
                  <span className="text-stone-500 block text-[10px] uppercase font-bold">Finger</span>
                  <span className="font-bold text-stone-900">{selectedGemData.idealFinger.split('(')[0]}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
                  <span className="text-stone-500 block text-[10px] uppercase font-bold">Day & Time</span>
                  <span className="font-bold text-stone-900">{selectedGemData.wearingDay.split(' during')[0]}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
                  <span className="text-stone-500 block text-[10px] uppercase font-bold">Chakra</span>
                  <span className="font-bold text-stone-900">{selectedGemData.chakra.split(' ')[0]}</span>
                </div>
              </div>

              {/* Beej Mantra Card */}
              <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900">
                    Vedic Beej Mantra ({selectedGemData.chantCount} Recitations)
                  </span>
                  <span className="text-xs font-semibold text-amber-800 font-vedic">108 Chants</span>
                </div>
                <p className="text-base font-bold text-amber-950 font-vedic text-center py-1">
                  {selectedGemData.beejMantraTransliteration}
                </p>
                <p className="text-xs text-amber-900/80 text-center font-medium italic">
                  Recite on {selectedGemData.wearingDay.split(' during')[0]} facing East
                </p>
              </div>

              {/* Primary Benefits */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 font-vedic">
                  Key Astrological & Karmic Benefits:
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
                  {selectedGemData.primaryBenefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-stone-50 p-2.5 rounded-xl border border-stone-200/60">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Purification (Prana Pratishtha) Protocol */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 font-vedic">
                  Prana Pratishtha & Shuddhi Ritual:
                </h4>
                <ol className="space-y-1.5 text-xs text-stone-700">
                  {selectedGemData.purificationSteps.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-amber-900 text-amber-50 flex items-center justify-center text-[10px] font-bold shrink-0">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Substitutes / Uparatnas */}
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs space-y-1">
                <strong className="text-stone-800">Affordable Uparatna Substitutes: </strong>
                <span className="text-stone-600">{selectedGemData.substitutes.join(', ')}</span>
              </div>

              {/* Incompatibility Warnings */}
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs space-y-1">
                <strong className="text-red-900">Incompatible Gemstones (Do Not Mix): </strong>
                <span className="text-red-800">
                  {selectedGemData.incompatibleGems.map(id => NAVARATNA_DATA[id]?.name).filter(Boolean).join(', ')}
                </span>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-end">
              <button
                onClick={() => setSelectedGemId(null)}
                className="px-5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

      {/* PRINT PRESCRIPTION MODAL */}
      {isPrintModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-xl rounded-3xl border border-stone-200 shadow-2xl p-6 space-y-6 animate-scaleUp my-8">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2">
                <Printer className="w-5 h-5 text-amber-900" />
                <h3 className="text-lg font-bold text-stone-900 font-vedic">Generate Vedic Gemstone Prescription</h3>
              </div>
              <button
                onClick={() => setIsPrintModalOpen(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700 uppercase font-vedic">Native's Full Name:</label>
                <input
                  type="text"
                  value={nativeName}
                  onChange={(e) => setNativeName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
                  placeholder="Enter Native Name"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700 uppercase font-vedic">Gender:</label>
                  <div className="p-2.5 rounded-xl border border-stone-200 bg-stone-50 text-xs font-semibold capitalize text-stone-800">
                    {calculatedProfile.gender}
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700 uppercase font-vedic">Body Weight:</label>
                  <div className="p-2.5 rounded-xl border border-stone-200 bg-stone-50 text-xs font-semibold text-stone-800">
                    {calculatedProfile.bodyWeightKg} kg ({Math.round(calculatedProfile.bodyWeightKg * 2.20462)} lbs)
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700 uppercase font-vedic">Ascendant (Lagna):</label>
                <select
                  value={selectedLagna}
                  onChange={(e) => setSelectedLagna(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-stone-300 text-sm font-medium focus:outline-none"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(num => (
                    <option key={num} value={num}>
                      {LAGNA_RECOMMENDATIONS[num].lagnaName} - {LAGNA_RECOMMENDATIONS[num].sanskritName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs space-y-2.5">
                <strong className="text-amber-950 font-vedic block text-sm">
                  Vedic Prescription Summary for {nativeName || 'Native'} ({currentLagnaData.lagnaName}):
                </strong>
                <div className="space-y-1.5 text-stone-700">
                  <div className="flex justify-between border-b border-amber-200/50 pb-1">
                    <span>• <strong>Life Stone:</strong> {currentLagnaData.lifeStone.gemName}</span>
                    <span className="font-mono font-bold text-amber-950">{calculatedProfile.prescribedIdealRatti} Ratti</span>
                  </div>
                  <div className="flex justify-between border-b border-amber-200/50 pb-1">
                    <span>• <strong>Lucky Stone:</strong> {currentLagnaData.luckyStone.gemName}</span>
                    <span className="font-mono font-bold text-amber-950">{calculatedProfile.prescribedIdealRatti} Ratti</span>
                  </div>
                  <div className="flex justify-between border-b border-amber-200/50 pb-1">
                    <span>• <strong>Punya Stone:</strong> {currentLagnaData.punyaStone.gemName}</span>
                    <span className="font-mono font-bold text-amber-950">{calculatedProfile.prescribedIdealRatti} Ratti</span>
                  </div>
                  <div className="pt-1 text-stone-600 text-[11px]">
                    Prescribed metric equivalent: <strong className="text-amber-950">{calculatedProfile.prescribedCarat} Carats</strong> (Min baseline: {calculatedProfile.prescribedMinRatti} Ratti).
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-100">
              <button
                onClick={() => setIsPrintModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:bg-stone-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsPrintModalOpen(false);
                  window.print();
                }}
                className="px-5 py-2.5 rounded-xl bg-amber-900 hover:bg-amber-950 text-amber-50 text-xs font-semibold flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <Printer className="w-4 h-4" />
                <span>Print Document</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
