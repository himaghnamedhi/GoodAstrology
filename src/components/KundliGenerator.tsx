import React, { useState, useMemo, useRef } from 'react';
import { 
  Sparkles, 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  FileText, 
  Download, 
  Printer, 
  RotateCcw, 
  ChevronRight, 
  Compass, 
  ShieldCheck, 
  Heart, 
  Zap, 
  Gem, 
  Award, 
  CheckCircle2, 
  Sliders, 
  Search,
  ChevronDown,
  Loader2,
  ExternalLink,
  Globe,
  Navigation,
  PlusCircle,
  Edit3,
  AlertCircle,
  BookOpen,
  Layers,
  Star,
  X
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

import { HouseNumber, PlanetId, ChartStyle } from '../types/astrology';
import { 
  BirthDetails, 
  POPULAR_CITIES, 
  CityPreset, 
  RASHI_NAMES, 
  RASHI_LORDS 
} from '../data/vedicAstrologyCalculator';
import { 
  WORLD_CITIES, 
  searchWorldCities, 
  formatCoordinates, 
  STANDARD_TIMEZONES,
  WorldCity,
  getAssamCities
} from '../data/worldCitiesData';
import { WorldCoordinateMap } from './WorldCoordinateMap';
import { 
  CompleteKundliData, 
  DivisionalChartType, 
  generateCompleteKundli, 
  formatDMS 
} from '../data/vedicEphemeris';
import { VedicChartSvg } from './VedicChartSvg';
import { PLANETS_DATA } from '../data/planetsData';
import { HOUSES_DATA } from '../data/housesData';

interface KundliGeneratorProps {
  onOpenReportModal?: (kundliData: CompleteKundliData) => void;
  onApplyPlacementsToBuilder?: (placements: Record<PlanetId, HouseNumber>, lagnaSign: string, nativeName: string) => void;
}

export interface FamousPersonProfile {
  id: string;
  label: string;
  role: string;
  category: 'Leaders' | 'Science' | 'Arts' | 'Visionaries' | 'Sports' | 'Spiritual';
  lagnaSign: string;
  highlight: string;
  details: BirthDetails;
}

// Famous Personalities Directory with Historically Verified Vedic Birth Details
const SAMPLE_PROFILES: FamousPersonProfile[] = [
  {
    id: 'modi',
    label: 'Narendra Modi',
    role: 'Prime Minister of India',
    category: 'Leaders',
    lagnaSign: 'Scorpio (वृश्चिक)',
    highlight: 'Scorpio Lagna with Mars & Moon in 1st house forming Ruchaka Mahapurusha & Chandra-Mangala Yoga.',
    details: {
      name: 'Narendra Modi',
      gender: 'male',
      dob: '1950-09-17',
      tob: '11:00',
      city: 'Vadnagar, Gujarat, India',
      latitude: 23.7842,
      longitude: 72.6369,
      timezoneOffset: 5.5,
      weightKg: 78,
      weightUnit: 'kg',
    },
  },
  {
    id: 'kalam',
    label: 'Dr. A. P. J. Abdul Kalam',
    role: '11th President of India & Aerospace Scientist',
    category: 'Science',
    lagnaSign: 'Cancer (कर्क)',
    highlight: 'Exalted Jupiter in Cancer Lagna forming Hamsa Mahapurusha Yoga with powerful Saturn in 6th house.',
    details: {
      name: 'Dr. A. P. J. Abdul Kalam',
      gender: 'male',
      dob: '1931-10-15',
      tob: '01:15',
      city: 'Rameswaram, Tamil Nadu, India',
      latitude: 9.2876,
      longitude: 79.3129,
      timezoneOffset: 5.5,
      weightKg: 64,
      weightUnit: 'kg',
    },
  },
  {
    id: 'einstein',
    label: 'Albert Einstein',
    role: 'Theoretical Physicist & Nobel Laureate',
    category: 'Science',
    lagnaSign: 'Gemini (मिथुन)',
    highlight: '10th house Pisces planetary cluster with exalted Venus and Mercury Budhaditya Yoga.',
    details: {
      name: 'Albert Einstein',
      gender: 'male',
      dob: '1879-03-14',
      tob: '11:30',
      city: 'Ulm, Baden-Württemberg, Germany',
      latitude: 48.4011,
      longitude: 9.9876,
      timezoneOffset: 1.0,
      weightKg: 72,
      weightUnit: 'kg',
    },
  },
  {
    id: 'gandhi',
    label: 'Mahatma Gandhi',
    role: 'Father of the Nation & Freedom Icon',
    category: 'Leaders',
    lagnaSign: 'Libra (तुला)',
    highlight: 'Lagna Lord Venus with Mars & Mercury in 1st house forming Malavya Yoga in Libra.',
    details: {
      name: 'Mahatma Gandhi',
      gender: 'male',
      dob: '1869-10-02',
      tob: '07:11',
      city: 'Porbandar, Gujarat, India',
      latitude: 21.6417,
      longitude: 69.6293,
      timezoneOffset: 5.5,
      weightKg: 52,
      weightUnit: 'kg',
    },
  },
  {
    id: 'jobs',
    label: 'Steve Jobs',
    role: 'Apple Co-Founder & Technology Visionary',
    category: 'Visionaries',
    lagnaSign: 'Leo (सिंह)',
    highlight: 'Leo Lagna with exalted Mars in Capricorn 6th house and Jupiter in 11th house of mass innovation.',
    details: {
      name: 'Steve Jobs',
      gender: 'male',
      dob: '1955-02-24',
      tob: '19:15',
      city: 'San Francisco, California, USA',
      latitude: 37.7749,
      longitude: -122.4194,
      timezoneOffset: -8.0,
      weightKg: 70,
      weightUnit: 'kg',
    },
  },
  {
    id: 'tagore',
    label: 'Rabindranath Tagore',
    role: 'Nobel Laureate Poet & Philosopher',
    category: 'Arts',
    lagnaSign: 'Pisces (मीन)',
    highlight: 'Moon in Pisces Lagna with exalted Jupiter in Cancer 5th house forming supreme Gajakesari Yoga.',
    details: {
      name: 'Rabindranath Tagore',
      gender: 'male',
      dob: '1861-05-07',
      tob: '04:02',
      city: 'Kolkata, West Bengal, India',
      latitude: 22.5726,
      longitude: 88.3639,
      timezoneOffset: 5.5,
      weightKg: 68,
      weightUnit: 'kg',
    },
  },
  {
    id: 'mangeshkar',
    label: 'Lata Mangeshkar',
    role: 'Nightingale of India & Musical Legend',
    category: 'Arts',
    lagnaSign: 'Gemini (मिथुन)',
    highlight: 'Venus in 2nd house of voice (Vak-sthana) creating divine Saraswati Yoga and musical mastery.',
    details: {
      name: 'Lata Mangeshkar',
      gender: 'female',
      dob: '1929-09-28',
      tob: '23:45',
      city: 'Indore, Madhya Pradesh, India',
      latitude: 22.7196,
      longitude: 75.8577,
      timezoneOffset: 5.5,
      weightKg: 54,
      weightUnit: 'kg',
    },
  },
  {
    id: 'tendulkar',
    label: 'Sachin Tendulkar',
    role: 'Cricket Legend & Master Blaster',
    category: 'Sports',
    lagnaSign: 'Cancer (कर्क)',
    highlight: 'Exalted Mars in 7th house (Ruchaka Mahapurusha Yoga) and exalted Sun in 10th house of public glory.',
    details: {
      name: 'Sachin Tendulkar',
      gender: 'male',
      dob: '1973-04-24',
      tob: '18:00',
      city: 'Mumbai, Maharashtra, India',
      latitude: 18.9220,
      longitude: 72.8347,
      timezoneOffset: 5.5,
      weightKg: 70,
      weightUnit: 'kg',
    },
  },
  {
    id: 'vivekananda',
    label: 'Swami Vivekananda',
    role: 'Spiritual Master & Vedantic Scholar',
    category: 'Spiritual',
    lagnaSign: 'Sagittarius (धनु)',
    highlight: 'Sagittarius Lagna with Sun & Mercury (Budhaditya Yoga) and Jupiter in 11th house of global impact.',
    details: {
      name: 'Swami Vivekananda',
      gender: 'male',
      dob: '1863-01-12',
      tob: '06:33',
      city: 'Kolkata, West Bengal, India',
      latitude: 22.5726,
      longitude: 88.3639,
      timezoneOffset: 5.5,
      weightKg: 75,
      weightUnit: 'kg',
    },
  },
  {
    id: 'indira',
    label: 'Indira Gandhi',
    role: 'First Female Prime Minister of India',
    category: 'Leaders',
    lagnaSign: 'Cancer (कर्क)',
    highlight: 'Mutual Parivartana Raja Yoga between Saturn in Cancer Lagna and Moon in Capricorn 7th house.',
    details: {
      name: 'Indira Gandhi',
      gender: 'female',
      dob: '1917-11-19',
      tob: '23:11',
      city: 'Prayagraj (Allahabad), UP, India',
      latitude: 25.4358,
      longitude: 81.8463,
      timezoneOffset: 5.5,
      weightKg: 55,
      weightUnit: 'kg',
    },
  },
];

export const KundliGenerator: React.FC<KundliGeneratorProps> = ({
  onOpenReportModal,
  onApplyPlacementsToBuilder,
}) => {
  // 1. Birth Form State - Defaulting to not generated until user enters details
  const [birthDetails, setBirthDetails] = useState<BirthDetails>({
    name: '',
    gender: 'male',
    dob: '',
    tob: '',
    city: 'New Delhi, Delhi NCR, India',
    latitude: 28.6139,
    longitude: 77.2090,
    timezoneOffset: 5.5,
    weightKg: 70,
    weightUnit: 'kg',
  });

  const [hasGenerated, setHasGenerated] = useState<boolean>(false); // Don't show any chart before entering data!
  const [kundliData, setKundliData] = useState<CompleteKundliData | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  // View Preferences
  const [selectedDivisionalChart, setSelectedDivisionalChart] = useState<DivisionalChartType>('D1');
  const [chartStyle, setChartStyle] = useState<ChartStyle>('north');
  const [selectedHouse, setSelectedHouse] = useState<HouseNumber>(1);
  const [activeAnalysisTab, setActiveAnalysisTab] = useState<
    'grahas' | 'dasha' | 'ashtakavarga' | 'yogas' | 'bhavas' | 'remedies'
  >('grahas');

  // Search & City Input State
  const [cityInputValue, setCityInputValue] = useState<string>(birthDetails.city || 'New Delhi, Delhi NCR, India');
  const [citySearchQuery, setCitySearchQuery] = useState<string>('');
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState<boolean>(false);
  const [cityFilterTab, setCityFilterTab] = useState<'all' | 'assam' | 'india' | 'world'>('all');
  const [showEditForm, setShowEditForm] = useState<boolean>(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState<boolean>(false);
  const [isFamousModalOpen, setIsFamousModalOpen] = useState<boolean>(false);
  const [famousSearchQuery, setFamousSearchQuery] = useState<string>('');
  const [famousCategoryFilter, setFamousCategoryFilter] = useState<string>('all');

  // Filtered Famous Profiles
  const filteredFamousProfiles = useMemo(() => {
    return SAMPLE_PROFILES.filter((prof) => {
      const matchesCategory = famousCategoryFilter === 'all' || prof.category === famousCategoryFilter;
      const query = famousSearchQuery.toLowerCase().trim();
      const matchesQuery = !query || 
        prof.label.toLowerCase().includes(query) ||
        prof.role.toLowerCase().includes(query) ||
        prof.highlight.toLowerCase().includes(query) ||
        prof.lagnaSign.toLowerCase().includes(query) ||
        prof.details.city.toLowerCase().includes(query);
      return matchesCategory && matchesQuery;
    });
  }, [famousCategoryFilter, famousSearchQuery]);

  // PDF Generation State
  const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false);
  const [pdfProgress, setPdfProgress] = useState<string>('');
  const printablePdfRef = useRef<HTMLDivElement>(null);

  // Filtered Cities for Autocomplete using World Cities Database (880+ total, 704 India, 147 Assam)
  const filteredCities = useMemo(() => {
    if (cityFilterTab === 'assam') {
      const assamCities = getAssamCities();
      if (!citySearchQuery.trim()) return assamCities.slice(0, 50);
      const q = citySearchQuery.toLowerCase().trim();
      return assamCities.filter(c => 
        c.name.toLowerCase().includes(q) || 
        (c.stateOrRegion && c.stateOrRegion.toLowerCase().includes(q))
      ).slice(0, 50);
    }
    if (cityFilterTab === 'india') {
      if (!citySearchQuery.trim()) {
        return WORLD_CITIES.filter(c => c.country === 'India').slice(0, 50);
      }
      return searchWorldCities(citySearchQuery, 50).filter(c => c.country === 'India');
    }
    if (cityFilterTab === 'world') {
      if (!citySearchQuery.trim()) {
        return WORLD_CITIES.filter(c => c.country !== 'India').slice(0, 50);
      }
      return searchWorldCities(citySearchQuery, 50).filter(c => c.country !== 'India');
    }
    return searchWorldCities(citySearchQuery, 50);
  }, [citySearchQuery, cityFilterTab]);

  const handleSelectCity = (c: CityPreset | WorldCity) => {
    const regionPart = c.stateOrRegion ? `${c.stateOrRegion}, ` : '';
    const formatted = `${c.name}, ${regionPart}${c.country}`;
    setBirthDetails((prev) => ({
      ...prev,
      city: formatted,
      latitude: c.lat,
      longitude: c.lng,
      timezoneOffset: c.timezone,
    }));
    setCityInputValue(formatted);
    setCitySearchQuery('');
    setIsCityDropdownOpen(false);
    if (formError) setFormError(null);
  };

  const handleClearCityInput = () => {
    setCityInputValue('');
    setCitySearchQuery('');
    setBirthDetails((prev) => ({
      ...prev,
      city: '',
      latitude: 0,
      longitude: 0,
    }));
    setIsCityDropdownOpen(true);
  };

  const handleApplySampleProfile = (profile: (typeof SAMPLE_PROFILES)[0]) => {
    setBirthDetails(profile.details);
    setCityInputValue(profile.details.city);
    setCitySearchQuery('');
    setFormError(null);
    const data = generateCompleteKundli(profile.details);
    setKundliData(data);
    setHasGenerated(true);
    setShowEditForm(false);
  };

  const handleResetToNewDetails = () => {
    const defaultCity = 'New Delhi, Delhi NCR, India';
    setBirthDetails({
      name: '',
      gender: 'male',
      dob: '',
      tob: '',
      city: defaultCity,
      latitude: 28.6139,
      longitude: 77.2090,
      timezoneOffset: 5.5,
      weightKg: 70,
      weightUnit: 'kg',
    });
    setCityInputValue(defaultCity);
    setCitySearchQuery('');
    setKundliData(null);
    setHasGenerated(false);
    setShowEditForm(false);
    setFormError(null);
  };

  const handleGenerate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!birthDetails.name.trim()) {
      setFormError('Please enter the native\'s full name.');
      return;
    }
    if (!birthDetails.dob) {
      setFormError('Please select the date of birth.');
      return;
    }
    if (!birthDetails.tob) {
      setFormError('Please enter the exact time of birth (24h format, e.g. 14:30).');
      return;
    }

    setFormError(null);
    const data = generateCompleteKundli(birthDetails);
    setKundliData(data);
    setHasGenerated(true);
    setShowEditForm(false);
  };

  // Direct High-Resolution Multi-Page PDF Exporter
  const handleDirectDownloadPdf = async () => {
    if (!kundliData) return;
    setIsGeneratingPdf(true);
    setPdfProgress('Preparing Janam Patrika Document...');

    try {
      // Ensure the printable DOM element is ready
      const reportContainer = printablePdfRef.current;
      if (!reportContainer) {
        throw new Error('Report template element not found');
      }

      const pages = reportContainer.querySelectorAll<HTMLElement>('.pdf-report-page');
      if (pages.length === 0) {
        throw new Error('No printable pages detected');
      }

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true,
      });

      for (let i = 0; i < pages.length; i++) {
        setPdfProgress(`Rendering High-Resolution Page ${i + 1} of ${pages.length}...`);
        const pageEl = pages[i];

        const canvas = await html2canvas(pageEl, {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff',
          windowWidth: 794, // 210mm at 96 DPI
        });

        const imgData = canvas.toDataURL('image/jpeg', 0.95);
        if (i > 0) {
          pdf.addPage('a4', 'portrait');
        }
        pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297, undefined, 'FAST');
      }

      setPdfProgress('Finalizing & Saving Document...');
      const cleanName = (kundliData.birthDetails.name || 'Native').trim().replace(/[^a-zA-Z0-9_-]/g, '_');
      pdf.save(`Vedic_Janam_Kundli_${cleanName}.pdf`);
    } catch (err) {
      console.error('PDF export error:', err);
      window.print();
    } finally {
      setIsGeneratingPdf(false);
      setPdfProgress('');
    }
  };

  const currentChart = kundliData ? kundliData.divisionalCharts[selectedDivisionalChart] : null;

  return (
    <div className="space-y-6">
      {/* ------------------------------------------------------------- */}
      {/* TOP HEADER & SACRED INVOCATION BANNER */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 rounded-2xl p-5 sm:p-6 text-amber-50 shadow-md border border-amber-800/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 text-amber-300/90 text-xs font-serif tracking-widest uppercase mb-1">
              <span>॥ श्री गणेशाय नमः ॥</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-vedic text-amber-100 tracking-tight">
              {hasGenerated ? 'Janam Kundali & Natal Dossier' : 'Kundali Maker'}
            </h1>
            <p className="text-xs sm:text-sm text-stone-300/90 w-full mt-1 leading-relaxed">
              {hasGenerated
                ? 'Sidereal Vedic horoscope with Lahiri Ayanamsha, 7 divisional charts (D1–D12), Vimshottari Dasha, and Ashtakavarga.'
                : 'Calculate full Vedic Janam Kundali with Lahiri Ayanamsha, planetary positions, D1–D12 charts, and Vimshottari Dasha.'}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0 flex-wrap sm:flex-nowrap">
            {hasGenerated && (
              <>
                <button
                  id="btn-edit-kundli-inputs"
                  onClick={() => setShowEditForm(!showEditForm)}
                  className="px-3 py-1.5 sm:py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-100 border border-amber-800/40 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                  <span>{showEditForm ? 'Hide Form' : 'Edit Details'}</span>
                </button>

                <button
                  id="btn-new-kundli-entry"
                  onClick={handleResetToNewDetails}
                  className="px-3 py-1.5 sm:py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-100 border border-amber-800/40 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs"
                >
                  <PlusCircle className="w-3.5 h-3.5 text-amber-400" />
                  <span>New Chart</span>
                </button>

                <button
                  id="btn-download-kundli-pdf"
                  onClick={handleDirectDownloadPdf}
                  disabled={isGeneratingPdf}
                  className="px-3.5 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all active:scale-95 disabled:opacity-60"
                >
                  {isGeneratingPdf ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>{pdfProgress || 'Exporting PDF...'}</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5 text-amber-200" />
                      <span>Download PDF</span>
                    </>
                  )}
                </button>
              </>
            )}
          </div>
        </div>

        {/* Quick Sample Native Pills / Check Kundli of Famous People */}
        <div className="relative z-10 mt-3 pt-3 border-t border-amber-900/40 flex flex-col md:flex-row md:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5 flex-1 min-w-0">
            <span className="text-amber-300 font-bold whitespace-nowrap text-xs flex items-center gap-1.5 shrink-0 bg-amber-950/70 px-2 py-1 rounded-lg border border-amber-700/50 shadow-2xs">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>Famous Kundlis:</span>
            </span>
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              {SAMPLE_PROFILES.slice(0, 5).map((prof) => {
                const isCurrent = kundliData?.birthDetails?.name === prof.details.name;
                return (
                  <button
                    key={prof.label}
                    type="button"
                    onClick={() => handleApplySampleProfile(prof)}
                    className={`px-2.5 py-1 rounded-lg whitespace-nowrap text-xs transition-all flex items-center gap-1 shrink-0 active:scale-95 cursor-pointer shadow-2xs ${
                      isCurrent
                        ? 'bg-amber-400 text-stone-950 font-bold shadow-xs ring-2 ring-amber-300'
                        : 'bg-amber-950/80 hover:bg-amber-900 text-amber-100 border border-amber-800/60 hover:text-white'
                    }`}
                    title={`${prof.role} • ${prof.highlight}`}
                  >
                    <span className="font-semibold">{prof.label}</span>
                    <span className="text-[10px] opacity-75 font-normal">({prof.lagnaSign.split(' ')[0]})</span>
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsFamousModalOpen(true)}
            id="btn-browse-all-famous-kundlis"
            className="px-2.5 py-1 sm:py-1.5 rounded-lg bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-600 hover:to-amber-700 text-amber-100 border border-amber-500/40 whitespace-nowrap text-xs font-semibold transition-all flex items-center justify-center gap-1.5 shrink-0 shadow-xs cursor-pointer active:scale-95 self-start md:self-auto"
            title="Browse and search all famous horoscopes"
          >
            <Award className="w-3.5 h-3.5 text-amber-300" />
            <span>Browse All ({SAMPLE_PROFILES.length})</span>
            <ChevronRight className="w-3 h-3 text-amber-300" />
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* STEP 1: INPUT FORM (Enter Birth Details) */}
      {/* ------------------------------------------------------------- */}
      {(!hasGenerated || showEditForm) && (
        <div
          className={`bg-white rounded-2xl border transition-all duration-200 shadow-xs p-5 sm:p-7 space-y-6 ${
            birthDetails.gender === 'male'
              ? 'border-blue-200/90 ring-1 ring-blue-500/10'
              : birthDetails.gender === 'female'
              ? 'border-pink-200/90 ring-1 ring-pink-500/10'
              : 'border-stone-200'
          }`}
        >
          <div
            className={`flex items-center justify-between border-b pb-3 transition-colors ${
              birthDetails.gender === 'male'
                ? 'border-blue-100'
                : birthDetails.gender === 'female'
                ? 'border-pink-100'
                : 'border-stone-100'
            }`}
          >
            <div>
              <h2 className="text-lg font-bold font-vedic text-stone-900 flex items-center gap-2">
                <img
                  src="/icons/app_logo.svg"
                  alt="Vedic Astrology Logo"
                  className="w-5 h-5 rounded-md shrink-0 shadow-2xs"
                  referrerPolicy="no-referrer"
                />
                <span>Enter Birth Details (जन्म विवरण प्रविष्ट करें)</span>
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Accurate time and coordinates ensure exact Ascendant degree, D9 Navamsha, and Vimshottari Dasha balance.
              </p>
            </div>
            {hasGenerated && (
              <button
                onClick={() => setShowEditForm(false)}
                className="text-xs text-stone-500 hover:text-stone-800 font-semibold px-2 py-1 rounded border border-stone-200"
              >
                Close Form
              </button>
            )}
          </div>

          {formError && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span className="font-semibold">{formError}</span>
            </div>
          )}

          <form onSubmit={handleGenerate} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-amber-800" />
                  <span>Native Full Name</span>
                </label>
                <input
                  type="text"
                  required
                  value={birthDetails.name}
                  onChange={(e) => {
                    setBirthDetails({ ...birthDetails, name: e.target.value });
                    if (formError) setFormError(null);
                  }}
                  placeholder="e.g. Aarav Sharma"
                  className="w-full h-10 px-3 rounded-xl border border-stone-300 focus:border-amber-700 focus:ring-1 focus:ring-amber-700 text-sm bg-stone-50/50"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Gender
                </label>
                <div className="grid grid-cols-3 gap-1 h-10 p-1 bg-stone-100 rounded-xl border border-stone-200 text-xs font-medium">
                  {(['male', 'female', 'other'] as const).map((g) => {
                    const isSelected = birthDetails.gender === g;
                    const activeColor =
                      g === 'male'
                        ? 'bg-blue-600 text-white font-bold shadow-xs'
                        : g === 'female'
                        ? 'bg-pink-600 text-white font-bold shadow-xs'
                        : 'bg-stone-800 text-white font-bold shadow-xs';

                    return (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setBirthDetails({ ...birthDetails, gender: g })}
                        className={`capitalize rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer ${
                          isSelected
                            ? activeColor
                            : g === 'male'
                            ? 'text-stone-600 hover:text-blue-700 hover:bg-blue-50/80'
                            : g === 'female'
                            ? 'text-stone-600 hover:text-pink-700 hover:bg-pink-50/80'
                            : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
                        }`}
                      >
                        {g === 'male' && <span className="text-xs">♂</span>}
                        {g === 'female' && <span className="text-xs">♀</span>}
                        <span>{g}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-800" />
                  <span>Date of Birth</span>
                </label>
                <input
                  type="date"
                  required
                  value={birthDetails.dob}
                  onChange={(e) => {
                    setBirthDetails({ ...birthDetails, dob: e.target.value });
                    if (formError) setFormError(null);
                  }}
                  className="w-full h-10 px-3 rounded-xl border border-stone-300 focus:border-amber-700 focus:ring-1 focus:ring-amber-700 text-sm bg-stone-50/50"
                />
              </div>

              {/* Exact Time of Birth */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-800" />
                  <span>Time of Birth (24h)</span>
                </label>
                <input
                  type="time"
                  required
                  value={birthDetails.tob}
                  onChange={(e) => {
                    setBirthDetails({ ...birthDetails, tob: e.target.value });
                    if (formError) setFormError(null);
                  }}
                  className="w-full h-10 px-3 rounded-xl border border-stone-300 focus:border-amber-700 focus:ring-1 focus:ring-amber-700 text-sm bg-stone-50/50"
                />
              </div>
            </div>

            {/* Place of Birth Section - Clean & Streamlined */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-stone-700 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-800" />
                <span>Place of Birth (जन्म स्थान)</span>
              </label>

              <div className="flex flex-col sm:flex-row gap-2">
                {/* City Autocomplete Search Input */}
                <div className="relative flex-1">
                  <input
                    type="text"
                    id="input-city-search"
                    value={cityInputValue}
                    onChange={(e) => {
                      const val = e.target.value;
                      setCityInputValue(val);
                      setCitySearchQuery(val);
                      setBirthDetails((prev) => ({ ...prev, city: val }));
                      setIsCityDropdownOpen(true);
                    }}
                    onFocus={() => setIsCityDropdownOpen(true)}
                    placeholder="Search or pick any city (e.g. Guwahati, Jorhat, Delhi, Mumbai, New York)..."
                    className="w-full h-11 pl-10 pr-16 rounded-xl border border-stone-300 focus:border-amber-700 focus:ring-1 focus:ring-amber-700 text-sm bg-stone-50/50 shadow-2xs transition-colors"
                  />
                  <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5 pointer-events-none" />

                  {/* Clear City Button (Allows easily removing New Delhi or any chosen city) */}
                  {cityInputValue ? (
                    <button
                      type="button"
                      id="btn-clear-city-input"
                      onClick={handleClearCityInput}
                      className="absolute right-9 top-2.5 p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-200/70 transition-colors cursor-pointer"
                      title="Clear city to select another"
                      aria-label="Clear city"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  ) : null}

                  <button
                    type="button"
                    onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
                    className="absolute right-3 top-2.5 p-1 text-stone-400 hover:text-stone-600 cursor-pointer"
                    title="Toggle city list"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>

                  {/* City Dropdown Menu */}
                  {isCityDropdownOpen && (
                    <div className="absolute left-0 right-0 mt-1 max-h-72 overflow-y-auto bg-white border border-stone-200 rounded-xl shadow-xl z-40 divide-y divide-stone-100 text-xs">
                      {/* Tabs Bar inside dropdown */}
                      <div className="p-2 bg-stone-50 text-[11px] sticky top-0 backdrop-blur-xs border-b border-stone-100 z-10">
                        <div className="flex items-center justify-between gap-1 mb-2">
                          <span className="font-semibold text-stone-700 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-amber-700" />
                            <span>Select Birth City:</span>
                          </span>
                          <button
                            type="button"
                            onClick={() => setIsCityDropdownOpen(false)}
                            className="text-stone-400 hover:text-stone-700 px-1.5 py-0.5 rounded hover:bg-stone-200/60 cursor-pointer text-[10px] font-medium"
                          >
                            ✕ Close
                          </button>
                        </div>
                        {/* Filter Tabs */}
                        <div className="flex flex-wrap items-center gap-1 text-[10px]">
                          <button
                            type="button"
                            onClick={() => setCityFilterTab('all')}
                            className={`px-2 py-0.5 rounded-md font-medium transition-colors cursor-pointer ${
                              cityFilterTab === 'all'
                                ? 'bg-amber-800 text-amber-50'
                                : 'bg-stone-200/70 text-stone-600 hover:bg-stone-200'
                            }`}
                          >
                            All ({WORLD_CITIES.length})
                          </button>
                          <button
                            type="button"
                            onClick={() => setCityFilterTab('assam')}
                            className={`px-2 py-0.5 rounded-md font-medium transition-colors cursor-pointer flex items-center gap-1 ${
                              cityFilterTab === 'assam'
                                ? 'bg-amber-800 text-amber-50'
                                : 'bg-amber-100 text-amber-900 hover:bg-amber-200/80'
                            }`}
                          >
                            <span>Assam (147 Towns)</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setCityFilterTab('india')}
                            className={`px-2 py-0.5 rounded-md font-medium transition-colors cursor-pointer ${
                              cityFilterTab === 'india'
                                ? 'bg-amber-800 text-amber-50'
                                : 'bg-stone-200/70 text-stone-600 hover:bg-stone-200'
                            }`}
                          >
                            India (700+)
                          </button>
                          <button
                            type="button"
                            onClick={() => setCityFilterTab('world')}
                            className={`px-2 py-0.5 rounded-md font-medium transition-colors cursor-pointer ${
                              cityFilterTab === 'world'
                                ? 'bg-amber-800 text-amber-50'
                                : 'bg-stone-200/70 text-stone-600 hover:bg-stone-200'
                            }`}
                          >
                            Global Metros
                          </button>
                        </div>
                      </div>

                      {cityFilterTab === 'assam' && !citySearchQuery && (
                        <div className="px-3 py-1.5 bg-amber-50/70 text-amber-900 text-[10px] flex items-center justify-between border-b border-amber-100">
                          <span>Showing all 147 Assam towns &amp; cities (Guwahati, Jorhat, Tezpur, Silchar, Dibrugarh...)</span>
                        </div>
                      )}

                      {filteredCities.length === 0 ? (
                        <div className="p-4 text-center text-stone-500">
                          <p className="font-medium text-xs">No cities matching "{citySearchQuery}"</p>
                          <p className="text-[11px] text-stone-400 mt-1">
                            Use "Choose from Map" or enter custom coordinates below.
                          </p>
                        </div>
                      ) : (
                        filteredCities.map((c) => {
                          const isAssam = (c.stateOrRegion || '').toLowerCase().includes('assam');
                          return (
                            <button
                              key={`${c.name}-${c.lat}-${c.lng}`}
                              type="button"
                              onClick={() => handleSelectCity(c)}
                              className="w-full px-3.5 py-2 text-left hover:bg-amber-50/80 flex items-center justify-between transition-colors group cursor-pointer"
                            >
                              <div>
                                <div className="flex items-center gap-1.5">
                                  <strong className="text-stone-900 group-hover:text-amber-900 font-semibold">{c.name}</strong>
                                  {isAssam && (
                                    <span className="text-[9px] font-semibold bg-amber-100 text-amber-900 px-1.5 py-0.2 rounded">
                                      Assam
                                    </span>
                                  )}
                                </div>
                                <span className="text-stone-500 text-[11px]">
                                  {c.stateOrRegion ? `${c.stateOrRegion}, ` : ''}{c.country}
                                </span>
                              </div>
                              <div className="text-right shrink-0">
                                <span className="text-[10px] text-stone-400 font-mono block">
                                  {formatCoordinates(c.lat, c.lng)}
                                </span>
                                <span className="text-[9px] text-stone-400 font-mono">
                                  UTC {c.timezone >= 0 ? `+${c.timezone}` : c.timezone}
                                </span>
                              </div>
                            </button>
                          );
                        })
                      )}
                    </div>
                  )}
                </div>

                {/* Prominent "Choose from Map" Button */}
                <button
                  type="button"
                  id="btn-choose-from-map"
                  onClick={() => setIsMapModalOpen(true)}
                  className="h-11 px-4 rounded-xl border border-stone-300 hover:border-amber-700/60 bg-stone-50 hover:bg-amber-50/50 text-stone-800 hover:text-amber-950 text-xs font-semibold flex items-center justify-center gap-2 transition-all shrink-0 cursor-pointer shadow-2xs active:scale-98"
                  title="Pick coordinates on interactive world map"
                >
                  <Globe className="w-4 h-4 text-amber-800" />
                  <span>Choose from Map</span>
                </button>
              </div>
            </div>

            {/* Submit Action Button */}
            <div className="pt-3 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-stone-500 text-center sm:text-left">
                Calculated using Parashari Vedic Sidereal with Lahiri Ayanamsha
              </span>
              <button
                type="submit"
                id="btn-submit-kundli-calc"
                className="w-full sm:w-auto px-7 py-3 rounded-xl bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 hover:from-amber-600 hover:to-amber-800 text-amber-50 font-bold text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Generate Janam Kundali (कुंडली गणना करें)</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* MODAL: CHOOSE FROM MAP */}
      {/* ------------------------------------------------------------- */}
      {isMapModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Header: Clean unbordered */}
            <div className="px-6 pt-5 pb-2 flex items-center justify-between bg-white">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-stone-900">
                    Choose Birth Location from World Map
                  </h3>
                  <p className="text-[11px] text-stone-500">
                    Click anywhere on the globe or search coordinates
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsMapModalOpen(false)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
                title="Close map"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content: Clean unified screen */}
            <div className="px-6 py-2 overflow-y-auto flex-1 bg-white">
              <WorldCoordinateMap
                latitude={birthDetails.latitude}
                longitude={birthDetails.longitude}
                timezoneOffset={birthDetails.timezoneOffset}
                cityName={birthDetails.city}
                onChange={(updates) => {
                  setBirthDetails((prev) => ({
                    ...prev,
                    latitude: updates.latitude,
                    longitude: updates.longitude,
                    timezoneOffset: updates.timezoneOffset,
                    city: updates.cityName || prev.city,
                  }));
                  if (updates.cityName) {
                    setCityInputValue(updates.cityName);
                    setCitySearchQuery('');
                  }
                }}
              />
            </div>

            {/* Footer: Clean unbordered */}
            <div className="px-6 pt-2 pb-5 bg-white flex items-center justify-between gap-3">
              <div className="text-xs text-stone-600 truncate">
                <span className="font-semibold text-stone-900">{birthDetails.city}</span>
                <span className="text-stone-500 ml-2 font-mono text-[11px]">
                  {formatCoordinates(birthDetails.latitude, birthDetails.longitude)} • UTC {birthDetails.timezoneOffset >= 0 ? `+${birthDetails.timezoneOffset}` : birthDetails.timezoneOffset}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsMapModalOpen(false)}
                className="px-5 py-2 rounded-xl bg-amber-900 hover:bg-amber-800 text-amber-50 text-xs font-bold shadow-xs transition-colors shrink-0 cursor-pointer"
              >
                Apply This Location
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* MODAL: FAMOUS PEOPLE HOROSCOPES DIRECTORY */}
      {/* ------------------------------------------------------------- */}
      {isFamousModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden">
            {/* Modal Header */}
            <div className="px-5 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-900 text-stone-100">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center shrink-0">
                  <Star className="w-5 h-5 fill-amber-400" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-amber-100 font-vedic flex items-center gap-2">
                    Famous People Kundli Directory
                    <span className="text-xs font-normal text-amber-300/80">
                      (प्रसिद्ध हस्तियों की जन्म कुंडली)
                    </span>
                  </h3>
                  <p className="text-xs text-stone-400">
                    Historically verified Vedic birth charts (Rodden Rating AA/A) with classical Yogas &amp; planetary alignments
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsFamousModalOpen(false)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors cursor-pointer"
                title="Close directory"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Search & Filters */}
            <div className="p-4 border-b border-stone-200 bg-stone-50 space-y-3">
              <div className="relative">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={famousSearchQuery}
                  onChange={(e) => setFamousSearchQuery(e.target.value)}
                  placeholder="Search famous personalities (e.g., Einstein, Modi, Kalam, Cricket, Scorpio, Yoga)..."
                  className="w-full pl-9 pr-8 py-2 rounded-xl bg-white border border-stone-200 text-stone-900 placeholder:text-stone-400 text-xs focus:ring-2 focus:ring-amber-700/20 focus:border-amber-700 outline-hidden"
                />
                {famousSearchQuery && (
                  <button
                    type="button"
                    onClick={() => setFamousSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-stone-600 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Category Filter Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
                <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider whitespace-nowrap mr-1">
                  Category:
                </span>
                {[
                  { id: 'all', label: 'All Profiles' },
                  { id: 'Leaders', label: 'Leaders & Statesmen' },
                  { id: 'Science', label: 'Science & Tech' },
                  { id: 'Arts', label: 'Arts & Culture' },
                  { id: 'Visionaries', label: 'Visionaries' },
                  { id: 'Sports', label: 'Sports' },
                  { id: 'Spiritual', label: 'Spiritual' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setFamousCategoryFilter(cat.id)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                      famousCategoryFilter === cat.id
                        ? 'bg-amber-900 text-amber-50 shadow-xs'
                        : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Modal Cards Grid */}
            <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-3">
              {filteredFamousProfiles.length === 0 ? (
                <div className="text-center py-10 space-y-2">
                  <p className="text-sm font-semibold text-stone-700">No famous personalities match your search.</p>
                  <button
                    type="button"
                    onClick={() => {
                      setFamousSearchQuery('');
                      setFamousCategoryFilter('all');
                    }}
                    className="text-xs text-amber-800 underline font-bold cursor-pointer"
                  >
                    Reset filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {filteredFamousProfiles.map((prof) => {
                    const isCurrentlyActive = kundliData?.birthDetails?.name === prof.details.name;
                    return (
                      <div
                        key={prof.id}
                        className={`rounded-xl border p-4 transition-all flex flex-col justify-between gap-3 ${
                          isCurrentlyActive
                            ? 'bg-amber-50/70 border-amber-300 ring-2 ring-amber-400/40 shadow-xs'
                            : 'bg-white border-stone-200 hover:border-amber-300 hover:shadow-xs'
                        }`}
                      >
                        <div className="space-y-2">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-bold text-stone-900 text-sm sm:text-base font-vedic">
                                  {prof.label}
                                </h4>
                                {isCurrentlyActive && (
                                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-200 text-amber-950">
                                    Active
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-amber-800 font-medium">{prof.role}</p>
                            </div>
                            <span className="px-2 py-0.5 rounded-md bg-stone-100 border border-stone-200 text-stone-700 text-[10px] font-semibold uppercase tracking-wider shrink-0">
                              {prof.category}
                            </span>
                          </div>

                          {/* Birth Details row */}
                          <div className="text-[11px] text-stone-500 space-y-0.5 bg-stone-50 p-2.5 rounded-lg border border-stone-100">
                            <div className="flex items-center justify-between">
                              <span>DOB: <strong className="text-stone-700 font-mono">{prof.details.dob}</strong></span>
                              <span>Time: <strong className="text-stone-700 font-mono">{prof.details.tob}</strong></span>
                            </div>
                            <div className="truncate text-stone-600">
                              Place: <span className="font-medium text-stone-800">{prof.details.city}</span>
                            </div>
                            <div className="text-amber-900 font-medium">
                              Lagna: <strong className="text-amber-950">{prof.lagnaSign}</strong>
                            </div>
                          </div>

                          {/* Astrological Highlights */}
                          <div className="bg-amber-50/80 p-2.5 rounded-lg border border-amber-200/60 text-xs text-stone-700">
                            <span className="font-bold text-amber-900 block text-[11px] mb-0.5 flex items-center gap-1">
                              <Sparkles className="w-3 h-3 text-amber-600" />
                              Key Vedic Alignments:
                            </span>
                            <p className="text-[11px] leading-relaxed text-stone-600">{prof.highlight}</p>
                          </div>
                        </div>

                        {/* Action Button */}
                        <button
                          type="button"
                          onClick={() => {
                            handleApplySampleProfile(prof);
                            setIsFamousModalOpen(false);
                          }}
                          className={`w-full py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs ${
                            isCurrentlyActive
                              ? 'bg-amber-800 hover:bg-amber-900 text-amber-100'
                              : 'bg-amber-900 hover:bg-amber-800 text-amber-50'
                          }`}
                        >
                          <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                          <span>{isCurrentlyActive ? 'Recalculate This Kundli' : 'Generate & Analyze This Kundli'}</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-5 py-3 border-t border-stone-200 bg-stone-50 flex items-center justify-between gap-3 text-xs text-stone-500">
              <span>Showing {filteredFamousProfiles.length} of {SAMPLE_PROFILES.length} verified horoscopes</span>
              <button
                type="button"
                onClick={() => setIsFamousModalOpen(false)}
                className="px-4 py-1.5 rounded-lg border border-stone-300 hover:bg-stone-200/60 text-stone-700 font-semibold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* EDUCATIONAL PREVIEW (When no chart is generated yet) */}
      {/* ------------------------------------------------------------- */}
      {!hasGenerated && (
        <div className="bg-stone-50 rounded-2xl border border-stone-200/80 p-5 sm:p-7 space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-widest text-amber-800 font-vedic">
              Comprehensive Jyotish System
            </span>
            <h3 className="text-xl font-extrabold text-stone-900 font-vedic">
              What Your Calculated Janam Kundali Includes
            </h3>
            <p className="text-xs sm:text-sm text-stone-600">
              Please enter birth details above or select a verified profile to generate complete astrological charts and interpretations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-xl border border-stone-200 shadow-2xs space-y-2.5 hover:border-amber-300 transition-colors">
              <div className="w-11 h-11 rounded-xl shadow-xs overflow-hidden shrink-0 border border-amber-200/80 bg-amber-50">
                <img
                  src="/icons/divisional_charts.svg"
                  alt="7 Divisional Charts"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h4 className="text-sm font-bold text-stone-900">7 Divisional Charts (Shodashvarga)</h4>
              <p className="text-xs text-stone-500 leading-relaxed">
                Rashi (D1), Navamsha (D9), Dasamsha (D10 Career), Drekkana (D3 Siblings), Saptamsha (D7 Children), Chaturthamsha (D4 Property), and Dwadasamsha (D12 Lineage) rendered in North &amp; South Indian styles.
              </p>
            </div>

            <div className="p-4 bg-white rounded-xl border border-stone-200 shadow-2xs space-y-2.5 hover:border-indigo-300 transition-colors">
              <div className="w-11 h-11 rounded-xl shadow-xs overflow-hidden shrink-0 border border-indigo-200/80 bg-indigo-50">
                <img
                  src="/icons/vimshottari_dasha.svg"
                  alt="Vimshottari Dasha System"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h4 className="text-sm font-bold text-stone-900">Vimshottari Dasha System</h4>
              <p className="text-xs text-stone-500 leading-relaxed">
                120-year planetary periods computed from the exact Moon nakshatra degree. Includes current active Mahadasha, Antardasha, Pratyantardasha, and balance at birth.
              </p>
            </div>

            <div className="p-4 bg-white rounded-xl border border-stone-200 shadow-2xs space-y-2.5 hover:border-emerald-300 transition-colors">
              <div className="w-11 h-11 rounded-xl shadow-xs overflow-hidden shrink-0 border border-emerald-200/80 bg-emerald-50">
                <img
                  src="/icons/ashtakavarga.svg"
                  alt="Sarvashtakavarga 337 Bindus"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h4 className="text-sm font-bold text-stone-900">Sarvashtakavarga 337 Bindus</h4>
              <p className="text-xs text-stone-500 leading-relaxed">
                Exact benefic bindu matrix across all 12 rashis from all 7 planets plus Lagna, highlighting strongest houses for wealth, career, and auspicious ventures.
              </p>
            </div>

            <div className="p-4 bg-white rounded-xl border border-stone-200 shadow-2xs space-y-2.5 hover:border-amber-300 transition-colors">
              <div className="w-11 h-11 rounded-xl shadow-xs overflow-hidden shrink-0 border border-amber-200/80 bg-amber-50">
                <img
                  src="/icons/yogas_doshas.svg"
                  alt="Parashari Yogas &amp; Doshas"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h4 className="text-sm font-bold text-stone-900">Parashari Yogas &amp; Doshas</h4>
              <p className="text-xs text-stone-500 leading-relaxed">
                Identifies Raja Yogas, Gajakesari Yoga, Budhaditya, Pancha Mahapurusha Yogas, plus thorough Manglik Dosha diagnostics with classical cancellation principles.
              </p>
            </div>

            <div className="p-4 bg-white rounded-xl border border-stone-200 shadow-2xs space-y-2.5 hover:border-purple-300 transition-colors">
              <div className="w-11 h-11 rounded-xl shadow-xs overflow-hidden shrink-0 border border-purple-200/80 bg-purple-50">
                <img
                  src="/icons/gemstones_remedies.svg"
                  alt="Gemstone &amp; Upaya Remedies"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h4 className="text-sm font-bold text-stone-900">Gemstone &amp; Upaya Remedies</h4>
              <p className="text-xs text-stone-500 leading-relaxed">
                Weight-calibrated Vedic gemstone recommendations based on Lagna Lord, 5th, and 9th Trikona lords, auspicious wearing days, metals, mantras, and Rudraksha guidance.
              </p>
            </div>

            <div className="p-4 bg-white rounded-xl border border-stone-200 shadow-2xs space-y-2.5 hover:border-rose-300 transition-colors">
              <div className="w-11 h-11 rounded-xl shadow-xs overflow-hidden shrink-0 border border-rose-200/80 bg-rose-50">
                <img
                  src="/icons/patrika_pdf.svg"
                  alt="Printable Janam Patrika PDF"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h4 className="text-sm font-bold text-stone-900">Printable Janam Patrika PDF</h4>
              <p className="text-xs text-stone-500 leading-relaxed">
                Direct export to high-resolution multi-page A4 format containing colorful decorative traditional borders, both D1 &amp; D9 charts, and complete planetary matrices.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* STEP 2: SHOW ALL THE CHART AND THE DETAILS */}
      {/* ------------------------------------------------------------- */}
      {hasGenerated && kundliData && (
        <div className="space-y-6">
          {/* Native Astro Profile Header Summary Strip */}
          <div className="bg-white rounded-2xl border border-stone-200/90 p-4 sm:p-5 shadow-2xs flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-amber-100 border border-amber-300/80 flex items-center justify-center text-amber-900 font-black text-lg font-vedic shadow-2xs">
                {kundliData.lagna.signNumber}
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-lg font-extrabold text-stone-900 font-vedic">
                    {kundliData.birthDetails.name}
                  </h2>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-950 font-semibold">
                    {kundliData.lagna.signName} Lagna
                  </span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-bold flex items-center gap-1 ${
                      kundliData.birthDetails.gender === 'male'
                        ? 'bg-blue-100 text-blue-900 border border-blue-200'
                        : kundliData.birthDetails.gender === 'female'
                        ? 'bg-pink-100 text-pink-900 border border-pink-200'
                        : 'bg-stone-100 text-stone-800 border border-stone-200'
                    }`}
                  >
                    {kundliData.birthDetails.gender === 'male'
                      ? '♂ Male'
                      : kundliData.birthDetails.gender === 'female'
                      ? '♀ Female'
                      : kundliData.birthDetails.gender}
                  </span>
                  {SAMPLE_PROFILES.find((p) => p.details.name.toLowerCase() === kundliData.birthDetails.name.toLowerCase()) && (
                    <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-900 border border-amber-500/40 font-bold flex items-center gap-1">
                      <Star className="w-3 h-3 text-amber-700 fill-amber-500" />
                      <span>{SAMPLE_PROFILES.find((p) => p.details.name.toLowerCase() === kundliData.birthDetails.name.toLowerCase())?.role}</span>
                    </span>
                  )}
                </div>
                <p className="text-xs text-stone-500">
                  {kundliData.birthDetails.dob} • {kundliData.birthDetails.tob} • {kundliData.birthDetails.city}
                </p>
                {SAMPLE_PROFILES.find((p) => p.details.name.toLowerCase() === kundliData.birthDetails.name.toLowerCase()) && (
                  <p className="text-xs text-amber-900 font-medium mt-1 bg-amber-50/90 px-2.5 py-1 rounded-lg border border-amber-200/70 inline-flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>{SAMPLE_PROFILES.find((p) => p.details.name.toLowerCase() === kundliData.birthDetails.name.toLowerCase())?.highlight}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Quick Metrics Badges & Action Controls */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <div className="px-3 py-1.5 rounded-xl bg-stone-100 border border-stone-200">
                <span className="text-stone-500 text-[10px] block uppercase font-bold">Lagna Degree</span>
                <strong className="text-stone-800 font-mono">{kundliData.lagna.formattedDegree}</strong>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200">
                <span className="text-amber-800 text-[10px] block uppercase font-bold">Chandra Rashi</span>
                <strong className="text-amber-950 font-semibold">{kundliData.grahas.moon.rashiName}</strong>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-200">
                <span className="text-blue-800 text-[10px] block uppercase font-bold">Janma Nakshatra</span>
                <strong className="text-blue-950 font-semibold">
                  {kundliData.grahas.moon.nakshatraName} (P{kundliData.grahas.moon.nakshatraPada})
                </strong>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200">
                <span className="text-emerald-800 text-[10px] block uppercase font-bold">Current Mahadasha</span>
                <strong className="text-emerald-950 font-semibold">
                  {kundliData.vimshottariDasha.currentMahadasha.lordName} ({kundliData.vimshottariDasha.currentMahadasha.sanskritName})
                </strong>
              </div>

              <button
                type="button"
                onClick={handleResetToNewDetails}
                className="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold border border-stone-300 text-xs flex items-center gap-1 transition-colors"
                title="Enter details for another person"
              >
                <PlusCircle className="w-3.5 h-3.5 text-amber-800" />
                <span>New Person</span>
              </button>
            </div>
          </div>

          {/* Main Display Grid: Visual Chart (Left) + Interactive Tabs (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left 5 Cols: Visual Vedic Chart + Divisional Selector */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 shadow-xs space-y-4">
                {/* Chart Toolbar: Style Toggle & Divisional Picker */}
                <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 block font-vedic">
                      Divisional Chart (Varga)
                    </span>
                    <h3 className="text-base font-bold text-stone-900 font-vedic">
                      {currentChart?.name} ({currentChart?.id})
                    </h3>
                  </div>

                  {/* Chart Style: North Diamond vs South Square */}
                  <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-xl border border-stone-200 text-xs font-semibold">
                    <button
                      type="button"
                      onClick={() => setChartStyle('north')}
                      className={`px-2.5 py-1 rounded-lg transition-all ${
                        chartStyle === 'north'
                          ? 'bg-amber-900 text-amber-50 shadow-2xs'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      North
                    </button>
                    <button
                      type="button"
                      onClick={() => setChartStyle('south')}
                      className={`px-2.5 py-1 rounded-lg transition-all ${
                        chartStyle === 'south'
                          ? 'bg-amber-900 text-amber-50 shadow-2xs'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      South
                    </button>
                  </div>
                </div>

                {/* Divisional Chart Selector Chips */}
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 text-xs">
                  {(['D1', 'D9', 'D10', 'D7', 'D2', 'D3', 'D12'] as DivisionalChartType[]).map((vType) => {
                    const isSelected = selectedDivisionalChart === vType;
                    const vInfo = kundliData.divisionalCharts[vType];
                    return (
                      <button
                        key={vType}
                        onClick={() => setSelectedDivisionalChart(vType)}
                        className={`px-3 py-1.5 rounded-xl whitespace-nowrap font-semibold text-xs transition-all ${
                          isSelected
                            ? 'bg-amber-950 text-amber-100 shadow-2xs'
                            : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                        }`}
                        title={vInfo.significance}
                      >
                        {vType} • {vType === 'D1' ? 'Rashi' : vType === 'D9' ? 'Navamsha' : vType === 'D10' ? 'Dasamsha' : vInfo.name.split(' ')[0]}
                      </button>
                    );
                  })}
                </div>

                {/* The Vector Chart */}
                {currentChart && (
                  <div className="my-2">
                    <VedicChartSvg
                      chartData={currentChart}
                      grahas={kundliData.grahas}
                      chartStyle={chartStyle}
                      selectedHouse={selectedHouse}
                      onHouseClick={(h) => setSelectedHouse(h)}
                      showDegrees={true}
                    />
                  </div>
                )}

                {/* Selected House Information Card */}
                {selectedHouse && (
                  <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs space-y-1.5">
                    <div className="flex items-center justify-between font-bold">
                      <span className="text-amber-950 font-vedic text-sm">
                        {selectedHouse}th Bhava: {HOUSES_DATA[selectedHouse].sanskritName} ({HOUSES_DATA[selectedHouse].name})
                      </span>
                      <span className="px-2 py-0.5 rounded bg-amber-200 text-amber-950 font-semibold text-[10px]">
                        Sign: {RASHI_NAMES[(kundliData.divisionalCharts[selectedDivisionalChart].lagnaHouseSign[selectedHouse] - 1)].split(' ')[0]}
                      </span>
                    </div>
                    <p className="text-stone-600 text-[11px] leading-relaxed">
                      {HOUSES_DATA[selectedHouse].description}
                    </p>
                    <div className="flex items-center gap-1 text-[10px] text-stone-500 pt-1 border-t border-amber-200/50">
                      <strong>Significations:</strong> {HOUSES_DATA[selectedHouse].keySignifications.slice(0, 3).join(', ')}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right 7 Cols: Analysis Tabs (Grahas, Dasha, Ashtakavarga, Yogas, Bhavas, Remedies) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 shadow-xs">
                
                {/* Horizontal Tab Navigation */}
                <div className="flex items-center gap-1.5 border-b border-stone-200 overflow-x-auto no-scrollbar pb-2 text-xs font-semibold">
                  {[
                    { id: 'grahas', label: 'Graha Spashta', icon: Sparkles },
                    { id: 'dasha', label: 'Vimshottari Dasha', icon: Clock },
                    { id: 'ashtakavarga', label: 'Sarvashtakavarga', icon: Compass },
                    { id: 'yogas', label: 'Yogas & Doshas', icon: Award },
                    { id: 'bhavas', label: '12 Bhavas', icon: FileText },
                    { id: 'remedies', label: 'Vedic Remedies', icon: ShieldCheck },
                  ].map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeAnalysisTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveAnalysisTab(tab.id as any)}
                        className={`px-3.5 py-2 rounded-xl flex items-center gap-1.5 whitespace-nowrap transition-all ${
                          isActive
                            ? 'bg-amber-900 text-amber-50 shadow-2xs font-bold'
                            : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* TAB 1: GRAHA SPASHTA (PLANETARY POSITIONS) */}
                {activeAnalysisTab === 'grahas' && (
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center justify-between text-xs text-stone-500">
                      <span>Nirayana (Sidereal) Longitudes with Lahiri Ayanamsha ({kundliData.formattedAyanamsha})</span>
                      <span className="font-semibold text-amber-900">9 Classical Grahas</span>
                    </div>

                    <div className="border border-stone-200 rounded-xl overflow-x-auto bg-white">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead className="bg-stone-100 text-stone-800 font-bold border-b border-stone-200">
                          <tr>
                            <th className="p-2.5">Graha</th>
                            <th className="p-2.5">Rashi</th>
                            <th className="p-2.5">Longitude</th>
                            <th className="p-2.5">Nakshatra &amp; Pada</th>
                            <th className="p-2.5">House</th>
                            <th className="p-2.5">Dignity</th>
                            <th className="p-2.5">Motion</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100">
                          {kundliData.grahasList.map((g) => (
                            <tr key={g.id} className="hover:bg-amber-50/40">
                              <td className="p-2.5 font-bold text-stone-900 whitespace-nowrap">
                                <span className="mr-1.5">{g.avatar}</span>
                                <span>{g.name}</span>
                                <span className="text-stone-400 font-normal ml-1">({g.sanskritName})</span>
                              </td>
                              <td className="p-2.5 text-stone-700 whitespace-nowrap font-medium">
                                {g.rashiName.split(' ')[0]}
                              </td>
                              <td className="p-2.5 font-mono text-stone-600 whitespace-nowrap">
                                {g.formattedDegree}
                              </td>
                              <td className="p-2.5 text-stone-700 whitespace-nowrap">
                                <span className="font-semibold">{g.nakshatraName}</span>
                                <span className="text-stone-400 ml-1">P{g.nakshatraPada}</span>
                              </td>
                              <td className="p-2.5 font-bold text-amber-900 whitespace-nowrap">
                                {g.house}H
                              </td>
                              <td className="p-2.5 whitespace-nowrap">
                                <span
                                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                    g.dignity.includes('Exalted')
                                      ? 'bg-emerald-100 text-emerald-900'
                                      : g.dignity.includes('Debilitated')
                                      ? 'bg-rose-100 text-rose-900'
                                      : g.dignity.includes('Own') || g.dignity.includes('Moolatrikona')
                                      ? 'bg-amber-100 text-amber-950'
                                      : 'bg-stone-100 text-stone-700'
                                  }`}
                                >
                                  {g.dignity.split(' ')[0]}
                                </span>
                              </td>
                              <td className="p-2.5 whitespace-nowrap">
                                {g.isRetrograde ? (
                                  <span className="text-rose-700 font-bold bg-rose-50 px-1.5 py-0.5 rounded text-[10px]">
                                    [R] Vakri
                                  </span>
                                ) : (
                                  <span className="text-stone-500 text-[10px]">Direct</span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* TAB 2: VIMSHOTTARI DASHA SYSTEM */}
                {activeAnalysisTab === 'dasha' && (
                  <div className="mt-4 space-y-4">
                    {/* Active Dasha Highlight Box */}
                    <div className="p-4 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50/40 border border-amber-200/80 space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <span className="text-[10px] uppercase font-bold tracking-wider text-amber-900 block">
                            Currently Active Mahadasha
                          </span>
                          <h4 className="text-lg font-black font-vedic text-amber-950">
                            {kundliData.vimshottariDasha.currentMahadasha.lordName} ({kundliData.vimshottariDasha.currentMahadasha.sanskritName}) Mahadasha
                          </h4>
                          <p className="text-xs text-stone-600 mt-0.5">
                            Period: {kundliData.vimshottariDasha.currentMahadasha.startDate} to {kundliData.vimshottariDasha.currentMahadasha.endDate} ({kundliData.vimshottariDasha.currentMahadasha.durationYears} Years)
                          </p>
                        </div>

                        <div className="text-right">
                          <span className="text-[10px] text-stone-500 uppercase font-bold block">Active Antardasha</span>
                          <strong className="text-sm font-bold text-stone-800 block">
                            {kundliData.vimshottariDasha.currentAntardasha.lordName} Bhukti
                          </strong>
                          <span className="text-[10px] text-stone-500">
                            Ends {kundliData.vimshottariDasha.currentAntardasha.endDate}
                          </span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div>
                        <div className="flex justify-between text-[11px] text-stone-600 mb-1">
                          <span>Mahadasha Progression</span>
                          <span className="font-bold">{kundliData.vimshottariDasha.completionPercentage}% Completed</span>
                        </div>
                        <div className="w-full h-2 bg-amber-200/60 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-amber-800 rounded-full transition-all"
                            style={{ width: `${kundliData.vimshottariDasha.completionPercentage}%` }}
                          />
                        </div>
                      </div>

                      <div className="pt-2 border-t border-amber-200/60 text-xs text-stone-600">
                        <strong>Balance at Birth:</strong> {kundliData.vimshottariDasha.balanceAtBirth.description}
                      </div>
                    </div>

                    {/* Complete 120-Year Mahadasha Timeline */}
                    <div>
                      <h5 className="text-xs font-bold text-stone-800 mb-2 font-vedic uppercase tracking-wider">
                        120-Year Mahadasha Life Cycle Timeline
                      </h5>
                      <div className="border border-stone-200 rounded-xl overflow-hidden text-xs">
                        <table className="w-full text-left border-collapse">
                          <thead className="bg-stone-100 text-stone-700 font-bold border-b border-stone-200">
                            <tr>
                              <th className="p-2">Graha Lord</th>
                              <th className="p-2">Start Date</th>
                              <th className="p-2">End Date</th>
                              <th className="p-2">Span</th>
                              <th className="p-2">Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-stone-100">
                            {kundliData.vimshottariDasha.fullTimeline.map((d, idx) => (
                              <tr
                                key={idx}
                                className={d.isActive ? 'bg-amber-100/70 font-bold text-amber-950' : 'hover:bg-stone-50 text-stone-700'}
                              >
                                <td className="p-2 font-semibold">
                                  {d.lordName} <span className="text-stone-400 font-normal">({d.sanskritName})</span>
                                </td>
                                <td className="p-2 font-mono text-[11px]">{d.startDate}</td>
                                <td className="p-2 font-mono text-[11px]">{d.endDate}</td>
                                <td className="p-2">{d.durationYears}y</td>
                                <td className="p-2">
                                  {d.isActive ? (
                                    <span className="px-2 py-0.5 rounded-full bg-amber-900 text-amber-50 text-[10px] font-bold">
                                      CURRENT
                                    </span>
                                  ) : new Date(d.endDate) < new Date() ? (
                                    <span className="text-stone-400 text-[10px]">Elapsed</span>
                                  ) : (
                                    <span className="text-emerald-700 text-[10px] font-semibold">Upcoming</span>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 3: SARVASHTAKAVARGA (SAV) */}
                {activeAnalysisTab === 'ashtakavarga' && (
                  <div className="mt-4 space-y-4">
                    <div className="flex items-center justify-between text-xs text-stone-600">
                      <span>Total Parashari Rekhas: <strong>337 Bindus</strong> across 12 Signs</span>
                      <span className="text-amber-800 font-bold">&gt;28 Points = Highly Auspicious</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                      {kundliData.sarvashtakavarga.signs.map((s) => (
                        <div
                          key={s.signNumber}
                          className={`p-3 rounded-xl border transition-all ${
                            s.bindus >= 30
                              ? 'bg-emerald-50/70 border-emerald-300/80 text-emerald-950'
                              : s.bindus < 26
                              ? 'bg-stone-50 border-stone-300 text-stone-800'
                              : 'bg-amber-50/60 border-amber-200 text-amber-950'
                          }`}
                        >
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold">{s.signName.split(' ')[0]}</span>
                            <span className="text-[10px] font-semibold opacity-75">{s.houseFromLagna}H</span>
                          </div>
                          <div className="text-2xl font-black font-vedic my-1">{s.bindus}</div>
                          <span
                            className={`text-[9.5px] px-1.5 py-0.5 rounded font-semibold block text-center ${
                              s.bindus >= 30
                                ? 'bg-emerald-200/80 text-emerald-900'
                                : s.bindus < 26
                                ? 'bg-stone-200 text-stone-700'
                                : 'bg-amber-200/70 text-amber-900'
                            }`}
                          >
                            {s.status.split(' ')[0]}
                          </span>
                        </div>
                      ))}
                    </div>

                    <p className="text-xs text-stone-500 leading-relaxed pt-2">
                      Signs with 28 or more bindus yield rapid fruition in investments, career initiatives, and health vitality. Houses with fewer than 25 bindus call for sustained discipline and targeted Vedic propitiation.
                    </p>
                  </div>
                )}

                {/* TAB 4: YOGAS & DOSHAS ANALYSIS */}
                {activeAnalysisTab === 'yogas' && (
                  <div className="mt-4 space-y-4">
                    {/* Yogas Section */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 font-vedic flex items-center gap-1">
                          <Award className="w-3.5 h-3.5" />
                          <span>Detected Classical Vedic Yogas ({kundliData.yogas.length})</span>
                        </h4>
                      </div>

                      {kundliData.yogas.length > 0 ? (
                        <div className="space-y-2.5">
                          {kundliData.yogas.map((y, idx) => (
                            <div key={idx} className="p-3 rounded-xl border border-amber-200/80 bg-amber-50/40 space-y-1">
                              <div className="flex items-center justify-between">
                                <strong className="text-sm font-bold font-vedic text-amber-950">
                                  {y.name} ({y.sanskritName})
                                </strong>
                                <span className="px-2 py-0.5 rounded-full bg-amber-200 text-amber-950 text-[10px] font-bold">
                                  {y.type}
                                </span>
                              </div>
                              <p className="text-xs text-stone-700 leading-snug">{y.description}</p>
                              <div className="text-[11px] text-stone-500 pt-1 border-t border-amber-200/40">
                                <strong className="text-stone-700">Significance:</strong> {y.significance}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs text-stone-500 italic">No major standard Raja Yogas detected in primary quadrant matrix.</p>
                      )}
                    </div>

                    {/* Doshas Section */}
                    <div className="pt-3 border-t border-stone-200 space-y-2.5">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 font-vedic">
                        Vedic Dosha Diagnostic
                      </h4>

                      {/* Manglik */}
                      <div className="p-3 rounded-xl border border-stone-200 bg-stone-50 space-y-1 text-xs">
                        <div className="flex items-center justify-between">
                          <strong className="text-stone-900 font-semibold flex items-center gap-1.5">
                            <span>Kuja / Mangal Dosha:</span>
                            <span
                              className={`px-2 py-0.2 rounded text-[10px] font-bold ${
                                kundliData.doshas.mangalDosha.isCancelled
                                  ? 'bg-emerald-100 text-emerald-900'
                                  : kundliData.doshas.mangalDosha.hasDosha
                                  ? 'bg-rose-100 text-rose-900'
                                  : 'bg-emerald-100 text-emerald-900'
                              }`}
                            >
                              {kundliData.doshas.mangalDosha.isCancelled
                                ? 'Cancelled (Nir-dosh)'
                                : kundliData.doshas.mangalDosha.hasDosha
                                ? `${kundliData.doshas.mangalDosha.level} Intensity`
                                : 'No Dosha'}
                            </span>
                          </strong>
                        </div>
                        <p className="text-stone-600">{kundliData.doshas.mangalDosha.details}</p>
                      </div>

                      {/* Kaal Sarp */}
                      <div className="p-3 rounded-xl border border-stone-200 bg-stone-50 space-y-1 text-xs">
                        <div className="flex items-center justify-between">
                          <strong className="text-stone-900 font-semibold flex items-center gap-1.5">
                            <span>Kaal Sarp Dosha:</span>
                            <span
                              className={`px-2 py-0.2 rounded text-[10px] font-bold ${
                                kundliData.doshas.kaalSarpDosha.hasDosha ? 'bg-amber-100 text-amber-950' : 'bg-emerald-100 text-emerald-900'
                              }`}
                            >
                              {kundliData.doshas.kaalSarpDosha.hasDosha ? kundliData.doshas.kaalSarpDosha.type : 'Absent'}
                            </span>
                          </strong>
                        </div>
                        <p className="text-stone-600">{kundliData.doshas.kaalSarpDosha.details}</p>
                      </div>

                      {/* Sade Sati */}
                      <div className="p-3 rounded-xl border border-stone-200 bg-stone-50 space-y-1 text-xs">
                        <div className="flex items-center justify-between">
                          <strong className="text-stone-900 font-semibold flex items-center gap-1.5">
                            <span>Shani Sade Sati:</span>
                            <span
                              className={`px-2 py-0.2 rounded text-[10px] font-bold ${
                                kundliData.doshas.sadeSati.isActive ? 'bg-amber-100 text-amber-950' : 'bg-emerald-100 text-emerald-900'
                              }`}
                            >
                              {kundliData.doshas.sadeSati.isActive ? kundliData.doshas.sadeSati.phase : 'Not Active'}
                            </span>
                          </strong>
                        </div>
                        <p className="text-stone-600">{kundliData.doshas.sadeSati.details}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 5: 12 BHAVAS DOSSIER */}
                {activeAnalysisTab === 'bhavas' && (
                  <div className="mt-4 space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
                    {kundliData.bhavaSummaries.map((b) => (
                      <div key={b.houseNumber} className="p-3 rounded-xl border border-stone-200 bg-stone-50/60 text-xs space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold font-vedic text-amber-950 text-sm">
                            House {b.houseNumber}: {HOUSES_DATA[b.houseNumber].sanskritName} ({HOUSES_DATA[b.houseNumber].name})
                          </span>
                          <span className="px-2 py-0.5 rounded bg-white border border-stone-200 font-semibold text-[10px]">
                            {b.signName} (Lord: {b.lord})
                          </span>
                        </div>
                        <p className="text-stone-600 leading-snug">
                          {HOUSES_DATA[b.houseNumber].description}
                        </p>
                        <div className="pt-1 flex items-center gap-1.5 text-[11px] text-stone-500">
                          <strong>Occupants:</strong>
                          {b.occupants.length > 0 ? (
                            <span className="text-amber-900 font-bold">
                              {b.occupants.map((p) => PLANETS_DATA[p].name).join(', ')}
                            </span>
                          ) : (
                            <span className="italic">Empty (Influenced by aspects of {b.lord})</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* TAB 6: VEDIC REMEDIES & GEMSTONES */}
                {activeAnalysisTab === 'remedies' && (
                  <div className="mt-4 space-y-4 text-xs">
                    <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-2">
                      <h4 className="text-sm font-bold font-vedic text-amber-950 flex items-center gap-1.5">
                        <Gem className="w-4 h-4 text-amber-700" />
                        <span>Prescribed Gemstone Harmonization for {kundliData.lagna.signName}</span>
                      </h4>
                      <p className="text-stone-700 leading-relaxed">
                        To fortify Lagnesha ({kundliData.lagna.lord}) and harmonize vital life prana, authentic natural gemstones set in silver or gold are traditionally worn on auspicious days during Shukla Paksha.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                        <div className="p-2.5 rounded-lg bg-white border border-amber-200">
                          <span className="text-[10px] text-stone-500 uppercase font-bold block">Life Stone (Lagnesh)</span>
                          <strong className="text-stone-900 font-bold text-sm block">
                            {PLANETS_DATA[kundliData.grahasList.find(g => g.name === kundliData.lagna.lord || g.sanskritName === kundliData.lagna.lord)?.id || 'sun'].gemstone}
                          </strong>
                        </div>
                        <div className="p-2.5 rounded-lg bg-white border border-amber-200">
                          <span className="text-[10px] text-stone-500 uppercase font-bold block">Lucky Stone (Bhagyesh)</span>
                          <strong className="text-stone-900 font-bold text-sm block">Yellow Sapphire or Ruby</strong>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                      <h4 className="text-sm font-bold font-vedic text-emerald-950 flex items-center gap-1.5">
                        <Zap className="w-4 h-4 text-emerald-700" />
                        <span>Mantra Sadhana &amp; Japa</span>
                      </h4>
                      <p className="text-stone-700 leading-relaxed">
                        Chanting planetary beej mantras 108 times at dawn dispels mental fog, stimulates clarity, and neutralizes planetary afflictions.
                      </p>
                      <div className="p-2.5 rounded-lg bg-white border border-emerald-200 font-mono text-[11px] text-stone-800">
                        {PLANETS_DATA[kundliData.grahasList.find(g => g.name === kundliData.lagna.lord || g.sanskritName === kundliData.lagna.lord)?.id || 'sun'].beejMantra}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Action Footer */}
          <div className="p-5 rounded-2xl bg-stone-900 text-amber-50 border border-amber-800/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold font-vedic text-amber-100">
                Download Official Multi-Page Janam Patrika PDF
              </h3>
              <p className="text-xs text-stone-400 mt-0.5">
                Includes D1 Rashi &amp; D9 Navamsha charts, Graha Spashta table, Vimshottari timeline, and certified seal.
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              {onOpenReportModal && (
                <button
                  type="button"
                  onClick={() => onOpenReportModal(kundliData)}
                  className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-200 border border-amber-800/50 text-xs font-semibold flex items-center gap-1.5 transition-all"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                  <span>Open Full PDF Viewer</span>
                </button>
              )}

              <button
                type="button"
                onClick={handleDirectDownloadPdf}
                disabled={isGeneratingPdf}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all active:scale-95 disabled:opacity-60"
              >
                {isGeneratingPdf ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{pdfProgress || 'Exporting...'}</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 text-amber-200" />
                    <span>Download Complete PDF Patrika</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* HIDDEN HIGH-RES A4 PRINTABLE PDF TEMPLATE CONTAINER */}
      {/* ------------------------------------------------------------- */}
      {kundliData && (
        <div style={{ position: 'absolute', left: '-9999px', top: 0 }}>
          <div ref={printablePdfRef} id="printable-pdf-document" className="w-[794px] bg-white text-stone-900 font-sans">
            
            {/* PAGE 1: NATAL HOROSCOPE, D1 & D9 CHARTS, GRAHA MATRIX */}
            <div className="pdf-report-page w-[794px] h-[1123px] p-8 bg-[#FCFBF9] flex flex-col justify-between border-8 border-double border-amber-900/60 relative box-border">
              {/* Header */}
              <div className="text-center border-b-2 border-amber-900/40 pb-3">
                <div className="flex justify-between text-[11px] font-serif text-amber-950 px-2 mb-1">
                  <span>॥ श्री गणेशाय नमः ॥</span>
                  <span className="font-bold uppercase tracking-widest text-[11px] font-vedic text-amber-900">
                    Vedic Janam Patrika &amp; Natal Dossier
                  </span>
                  <span>॥ ॐ नमः शिवाय ॥</span>
                </div>
                <h1 className="text-2xl font-black font-vedic text-amber-950 tracking-tight">
                  JANAM PATRIKA &amp; NAVAGRAHA DOSSIER
                </h1>
                <p className="text-[10.5px] text-stone-600 mt-0.5">
                  Classical Brihat Parashara Horashastra Astrological Evaluation • Lahiri Ayanamsha: {kundliData.formattedAyanamsha}
                </p>

                {/* Demographics Strip */}
                <div className="mt-3 grid grid-cols-4 gap-2 text-[11px] bg-white p-2.5 rounded-lg border border-amber-900/20 text-left">
                  <div>
                    <span className="text-stone-500 block text-[9px] uppercase font-bold">Native Name</span>
                    <strong className="text-amber-950 font-bold truncate block">{kundliData.birthDetails.name}</strong>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[9px] uppercase font-bold">Date &amp; Time</span>
                    <strong className="text-stone-900 font-bold block">{kundliData.birthDetails.dob} • {kundliData.birthDetails.tob}</strong>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[9px] uppercase font-bold">Place of Birth</span>
                    <strong className="text-stone-900 font-bold block truncate">{kundliData.birthDetails.city}</strong>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[9px] uppercase font-bold">Lagna (Ascendant)</span>
                    <strong className="text-amber-900 font-bold block">{kundliData.lagna.signName} ({kundliData.lagna.formattedDegree})</strong>
                  </div>
                </div>
              </div>

              {/* Side-by-Side D1 Rashi & D9 Navamsha Charts */}
              <div className="grid grid-cols-2 gap-4 items-center my-2">
                <div className="p-3 bg-white rounded-xl border border-amber-900/20 text-center">
                  <span className="text-[11px] font-bold text-amber-950 font-vedic block mb-1">
                    D1: Rashi / Lagna Chart (लग्न चक्र)
                  </span>
                  <VedicChartSvg
                    chartData={kundliData.divisionalCharts.D1}
                    grahas={kundliData.grahas}
                    chartStyle={chartStyle}
                    showDegrees={true}
                    className="max-w-[280px]"
                  />
                </div>

                <div className="p-3 bg-white rounded-xl border border-amber-900/20 text-center">
                  <span className="text-[11px] font-bold text-amber-950 font-vedic block mb-1">
                    D9: Navamsha Chart (नवांश चक्र)
                  </span>
                  <VedicChartSvg
                    chartData={kundliData.divisionalCharts.D9}
                    grahas={kundliData.grahas}
                    chartStyle={chartStyle}
                    showDegrees={false}
                    className="max-w-[280px]"
                  />
                </div>
              </div>

              {/* Planetary Positions Table */}
              <div className="my-1 border border-stone-300 rounded-lg overflow-hidden bg-white text-[10px]">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-stone-100 text-stone-900 font-bold border-b border-stone-300 text-[9.5px]">
                    <tr>
                      <th className="p-1.5 border-r border-stone-200">Graha</th>
                      <th className="p-1.5 border-r border-stone-200">Rashi</th>
                      <th className="p-1.5 border-r border-stone-200">Exact Longitude</th>
                      <th className="p-1.5 border-r border-stone-200">Nakshatra &amp; Pada</th>
                      <th className="p-1.5 border-r border-stone-200">Bhava</th>
                      <th className="p-1.5 border-r border-stone-200">Dignity</th>
                      <th className="p-1.5">Motion</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200 text-[9.5px]">
                    {kundliData.grahasList.map((g) => (
                      <tr key={g.id}>
                        <td className="p-1 font-bold text-stone-900 border-r border-stone-200">
                          {g.avatar} {g.name} ({g.sanskritName})
                        </td>
                        <td className="p-1 text-stone-800 border-r border-stone-200">{g.rashiName}</td>
                        <td className="p-1 font-mono text-stone-700 border-r border-stone-200">{g.formattedDegree}</td>
                        <td className="p-1 text-stone-800 border-r border-stone-200">{g.nakshatraName} P{g.nakshatraPada}</td>
                        <td className="p-1 font-bold text-amber-900 border-r border-stone-200">{g.house}H</td>
                        <td className="p-1 text-stone-800 border-r border-stone-200">{g.dignity}</td>
                        <td className="p-1">{g.isRetrograde ? 'Vakri [R]' : 'Direct'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Page 1 Footer */}
              <div className="pt-2 border-t border-amber-900/30 flex justify-between text-[9.5px] text-stone-500">
                <span>goodastrology • Vedic Janam Patrika</span>
                <span className="font-serif italic text-amber-900">॥ सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः ॥</span>
                <span className="font-bold text-amber-950">Page 1 of 2</span>
              </div>
            </div>

            {/* PAGE 2: VIMSHOTTARI DASHA, SARVASHTAKAVARGA, YOGAS & DOSHAS */}
            <div className="pdf-report-page w-[794px] h-[1123px] p-8 bg-[#FCFBF9] flex flex-col justify-between border-8 border-double border-amber-900/60 relative box-border">
              {/* Page 2 Header */}
              <div className="text-center border-b-2 border-amber-900/40 pb-2">
                <div className="flex justify-between text-[11px] font-serif text-amber-950 px-2 mb-0.5">
                  <span>॥ ॐ श्री महालक्ष्म्यै नमः ॥</span>
                  <span className="font-bold uppercase tracking-widest text-[10.5px] font-vedic text-amber-900">
                    Dasha Cycles, Ashtakavarga &amp; Classical Yogas
                  </span>
                  <span>॥ शुभम् भवतु ॥</span>
                </div>
                <h2 className="text-xl font-black font-vedic text-amber-950 tracking-tight">
                  VIMSHOTTARI DASHA &amp; YOGA DOSSIER
                </h2>
              </div>

              {/* Section 1: Vimshottari Timeline Table */}
              <div className="space-y-1">
                <h3 className="text-xs font-bold text-amber-950 font-vedic uppercase tracking-wider">
                  Vimshottari Dasha 120-Year Life Cycle (Active: {kundliData.vimshottariDasha.currentMahadasha.lordName} Mahadasha)
                </h3>
                <div className="border border-stone-300 rounded-lg overflow-hidden bg-white text-[10px]">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-stone-100 text-stone-900 font-bold border-b border-stone-200 text-[9.5px]">
                      <tr>
                        <th className="p-1 border-r border-stone-200">Lord</th>
                        <th className="p-1 border-r border-stone-200">Start Date</th>
                        <th className="p-1 border-r border-stone-200">End Date</th>
                        <th className="p-1 border-r border-stone-200">Duration</th>
                        <th className="p-1">Current State</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-200 text-[9.5px]">
                      {kundliData.vimshottariDasha.fullTimeline.map((d, idx) => (
                        <tr key={idx} className={d.isActive ? 'bg-amber-100/80 font-bold text-amber-950' : ''}>
                          <td className="p-1 font-semibold border-r border-stone-200">{d.lordName} ({d.sanskritName})</td>
                          <td className="p-1 font-mono border-r border-stone-200">{d.startDate}</td>
                          <td className="p-1 font-mono border-r border-stone-200">{d.endDate}</td>
                          <td className="p-1 border-r border-stone-200">{d.durationYears} Years</td>
                          <td className="p-1">{d.isActive ? 'ACTIVE NOW' : new Date(d.endDate) < new Date() ? 'Elapsed' : 'Upcoming'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Section 2: Sarvashtakavarga Grid */}
              <div className="space-y-1">
                <h3 className="text-xs font-bold text-amber-950 font-vedic uppercase tracking-wider">
                  Sarvashtakavarga (337 Total Bindus) Strength Matrix
                </h3>
                <div className="grid grid-cols-6 gap-1.5 text-center text-[10px]">
                  {kundliData.sarvashtakavarga.signs.map((s) => (
                    <div key={s.signNumber} className="p-1.5 bg-white border border-stone-300 rounded">
                      <span className="text-[9px] text-stone-600 block">{s.signName.split(' ')[0]}</span>
                      <strong className="text-sm font-black text-amber-950 block">{s.bindus}</strong>
                      <span className="text-[8px] text-stone-500 block">{s.status.split(' ')[0]}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 3: Classical Yogas & Doshas */}
              <div className="space-y-1">
                <h3 className="text-xs font-bold text-amber-950 font-vedic uppercase tracking-wider">
                  Activated Parashari Yogas &amp; Dosha Diagnostic
                </h3>
                <div className="grid grid-cols-2 gap-2 text-[10px]">
                  {kundliData.yogas.slice(0, 4).map((y, idx) => (
                    <div key={idx} className="p-2 bg-white border border-amber-900/20 rounded-lg space-y-0.5">
                      <strong className="text-amber-950 font-bold block">{y.name}</strong>
                      <p className="text-stone-600 leading-snug line-clamp-2 text-[9.5px]">{y.description}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-2 p-2 bg-amber-50/80 rounded-lg border border-amber-200 text-[10px] space-y-0.5">
                  <div><strong>Manglik Status:</strong> {kundliData.doshas.mangalDosha.details}</div>
                  <div><strong>Kaal Sarp:</strong> {kundliData.doshas.kaalSarpDosha.details}</div>
                  <div><strong>Sade Sati:</strong> {kundliData.doshas.sadeSati.details}</div>
                </div>
              </div>

              {/* Page 2 Footer & Seal */}
              <div className="pt-2 border-t border-amber-900/30 flex justify-between items-center text-[9.5px] text-stone-500">
                <span>goodastrology • Certified Vedic Jyotish Patrika</span>
                <span className="font-mono text-[8.5px]">DOC-ID: GA-KUNDLI-{kundliData.birthDetails.name.length * 3141}</span>
                <span className="font-bold text-amber-950">Page 2 of 2</span>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
