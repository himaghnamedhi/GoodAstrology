import React, { useState, useMemo } from 'react';
import { 
  X, 
  Printer, 
  Download, 
  Sparkles, 
  Heart, 
  Gem, 
  FileText, 
  CheckCircle2, 
  RotateCcw,
  ZoomIn,
  ZoomOut,
  ChevronRight,
  User,
  Calendar,
  MapPin,
  Scale,
  Loader2
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

import { HouseNumber, PlanetId, ChartStyle } from '../types/astrology';
import { HOUSES_DATA, NORTH_CHART_GEOMETRY } from '../data/housesData';
import { PLANETS_DATA } from '../data/planetsData';
import { 
  calculateVedAstroMatch, 
  VedAstroMatchReport, 
  MATCH_PRESETS 
} from '../data/vedicMatchCalculator';
import { 
  calculateVedicBirthProfile, 
  BirthDetails, 
  CalculatedBirthProfile 
} from '../data/vedicAstrologyCalculator';
import { 
  LAGNA_RECOMMENDATIONS, 
  NAVARATNA_DATA 
} from '../data/gemstoneData';

import { KundliReportPages } from './reports/KundliReportPages';
import { MatchReportPages } from './reports/MatchReportPages';
import { GemstoneReportPage } from './reports/GemstoneReportPage';

export type ReportModalType = 'kundli' | 'match' | 'gemstone';

export interface CustomReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialReportType?: ReportModalType;
  // Kundli inputs
  placements: Record<PlanetId, HouseNumber>;
  chartStyle?: ChartStyle;
  initialName?: string;
  initialLagna?: string;
  initialBirthDetails?: string;
  // Match inputs (optional)
  initialMatchReport?: VedAstroMatchReport;
  initialP1Details?: BirthDetails;
  initialP2Details?: BirthDetails;
  // Gemstone inputs (optional)
  initialGemstoneLagna?: number;
  initialGemstoneProfile?: CalculatedBirthProfile;
  initialGemstoneNativeName?: string;
}

const ZODIAC_SIGNS = [
  'Aries (Mesha) ♈',
  'Taurus (Vrishabha) ♉',
  'Gemini (Mithuna) ♊',
  'Cancer (Karka) ♋',
  'Leo (Simha) ♌',
  'Virgo (Kanya) ♍',
  'Libra (Tula) ♎',
  'Scorpio (Vrischika) ♏',
  'Sagittarius (Dhanu) ♐',
  'Capricorn (Makara) ♑',
  'Aquarius (Kumbha) ♒',
  'Pisces (Meena) ♓',
];

export const CustomReportModal: React.FC<CustomReportModalProps> = ({
  isOpen,
  onClose,
  initialReportType = 'kundli',
  placements,
  chartStyle: initialChartStyle = 'north',
  initialName = '',
  initialLagna = 'Aries (Mesha) ♈',
  initialBirthDetails = '',
  initialMatchReport,
  initialP1Details,
  initialP2Details,
  initialGemstoneLagna = 1,
  initialGemstoneProfile,
  initialGemstoneNativeName = '',
}) => {
  // Active Report Type State
  const [activeReportType, setActiveReportType] = useState<ReportModalType>(initialReportType);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportProgress, setExportProgress] = useState<string>('');

  // 1. Kundli State
  const [nativeName, setNativeName] = useState(initialName);
  const [lagnaSign, setLagnaSign] = useState(initialLagna);
  const [birthDetails, setBirthDetails] = useState(initialBirthDetails);
  const [reportChartStyle, setReportChartStyle] = useState<ChartStyle>(initialChartStyle);

  // 2. Match Finder State
  const [p1Details, setP1Details] = useState<BirthDetails>(() => initialP1Details || {
    name: 'Partner 1',
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

  const [p2Details, setP2Details] = useState<BirthDetails>(() => initialP2Details || {
    name: 'Partner 2',
    gender: 'female',
    dob: '1998-08-20',
    tob: '14:15',
    city: 'Guwahati, Assam',
    latitude: 26.1445,
    longitude: 91.7362,
    timezoneOffset: 5.5,
    weightKg: 55,
    weightUnit: 'kg',
  });

  // Calculate or use match report
  const currentMatchReport: VedAstroMatchReport = useMemo(() => {
    if (initialMatchReport && p1Details.name === initialMatchReport.partner1.name && p2Details.name === initialMatchReport.partner2.name) {
      return initialMatchReport;
    }
    return calculateVedAstroMatch(p1Details, p2Details);
  }, [initialMatchReport, p1Details, p2Details]);

  // 3. Gemstone State
  const [gemNativeName, setGemNativeName] = useState<string>(initialGemstoneNativeName || initialName || 'Auspicious Native');
  const [selectedGemLagna, setSelectedGemLagna] = useState<number>(initialGemstoneLagna);
  const [gemWeightKg, setGemWeightKg] = useState<number>(initialGemstoneProfile?.bodyWeightKg || 65);
  const [gemGender, setGemGender] = useState<'male' | 'female' | 'other'>(initialGemstoneProfile?.gender || 'male');

  const currentGemstoneProfile: CalculatedBirthProfile = useMemo(() => {
    return calculateVedicBirthProfile({
      name: gemNativeName,
      gender: gemGender,
      weightKg: gemWeightKg,
      weightUnit: 'kg',
      dob: '1998-05-15',
      tob: '12:00',
      city: 'New Delhi',
      latitude: 28.6139,
      longitude: 77.2090,
      timezoneOffset: 5.5,
    });
  }, [gemNativeName, gemGender, gemWeightKg]);

  const currentLagnaData = LAGNA_RECOMMENDATIONS[selectedGemLagna] || LAGNA_RECOMMENDATIONS[1];

  // Group planets by house for Kundli report
  const houseOccupants: Record<HouseNumber, PlanetId[]> = useMemo(() => {
    const map: Record<HouseNumber, PlanetId[]> = {
      1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: [], 10: [], 11: [], 12: []
    };
    Object.entries(placements).forEach(([pId, hNum]) => {
      map[hNum as HouseNumber].push(pId as PlanetId);
    });
    return map;
  }, [placements]);

  // Detected Yogas for Kundli report
  const detectedYogas = useMemo(() => {
    const yogas: { name: string; type: string; desc: string; planets: string }[] = [];
    const jupH = placements.jupiter;
    const moonH = placements.moon;
    const sunH = placements.sun;
    const mercH = placements.mercury;
    const marsH = placements.mars;
    const venH = placements.venus;
    const satH = placements.saturn;

    const kendras: HouseNumber[] = [1, 4, 7, 10];
    const trikonas: HouseNumber[] = [1, 5, 9];

    // Gajakesari Yoga
    const isMutualKendra = Math.abs(jupH - moonH) === 0 || Math.abs(jupH - moonH) === 3 || Math.abs(jupH - moonH) === 6 || Math.abs(jupH - moonH) === 9;
    if ((kendras.includes(jupH) && kendras.includes(moonH)) || isMutualKendra) {
      yogas.push({
        name: 'Gajakesari Yoga (गजकेसरी योग)',
        type: 'Auspicious Raja Yoga',
        desc: 'Jupiter and Moon occupy Kendra positions relative to each other, conferring nobility, lasting wisdom, and high social honor.',
        planets: 'Jupiter (Guru) & Moon (Chandra)',
      });
    }

    // Budhaditya Yoga
    if (sunH === mercH) {
      yogas.push({
        name: 'Budhaditya Yoga (बुधादित्य योग)',
        type: 'Wisdom & Leadership',
        desc: `Sun and Mercury conjunct in the ${sunH}th House, bestowing analytical intellect, executive speech, and scholarly acumen.`,
        planets: 'Sun (Surya) & Mercury (Budha)',
      });
    }

    // Chandra-Mangala Yoga
    if (moonH === marsH) {
      yogas.push({
        name: 'Chandra-Mangala Yoga (चन्द्र-मङ्गल योग)',
        type: 'Wealth & Enterprise',
        desc: `Moon and Mars united in the ${moonH}th House, granting fierce commercial drive, resourcefulness, and real estate prosperity.`,
        planets: 'Moon (Chandra) & Mars (Mangal)',
      });
    }

    // Lakshmi Yoga
    if (trikonas.includes(venH) || venH === 2 || venH === 11) {
      yogas.push({
        name: 'Lakshmi Yoga (लक्ष्मी योग)',
        type: 'Wealth & Grace',
        desc: `Venus favorably positioned in the ${venH}th House, blessing with artistic grace, domestic joy, and reliable abundance.`,
        planets: 'Venus (Shukra)',
      });
    }

    // Saraswati Yoga
    const beneficsInGoodHouses = [mercH, jupH, venH].every(h => kendras.includes(h) || trikonas.includes(h) || h === 2);
    if (beneficsInGoodHouses) {
      yogas.push({
        name: 'Saraswati Yoga (सरस्वती योग)',
        type: 'Learning & Eloquence',
        desc: 'All three natural benefic planets occupy quadrants or trines, granting mastery over speech, fine arts, and literature.',
        planets: 'Mercury, Jupiter & Venus',
      });
    }

    // Vipareeta Raja Yoga
    if ([6, 8, 12].includes(satH) || [6, 8, 12].includes(marsH)) {
      yogas.push({
        name: 'Vipareeta Raja Yoga (विपरीत राजयोग)',
        type: 'Breakthrough Energy',
        desc: 'Planetary energy placed in dusthana houses transforming sudden hurdles into unexpected triumphs.',
        planets: 'Dusthana House Activations',
      });
    }

    // Kuja Consideration
    if ([1, 4, 7, 8, 12].includes(marsH)) {
      yogas.push({
        name: 'Kuja / Manglik Influence (मङ्गल स्थिति)',
        type: 'Partnership Alignment',
        desc: `Mars placed in the ${marsH}th House emphasizes dynamic communication and mutual patience in marital dynamics.`,
        planets: 'Mars (Mangal)',
      });
    }

    return yogas;
  }, [placements]);

  // Summary counts
  const kendraCount = (Object.keys(placements) as PlanetId[]).filter(p => [1, 4, 7, 10].includes(placements[p])).length;
  const trikonaCount = (Object.keys(placements) as PlanetId[]).filter(p => [1, 5, 9].includes(placements[p])).length;
  const upachayaCount = (Object.keys(placements) as PlanetId[]).filter(p => [3, 6, 10, 11].includes(placements[p])).length;
  const dusthanaCount = (Object.keys(placements) as PlanetId[]).filter(p => [6, 8, 12].includes(placements[p])).length;

  if (!isOpen) return null;

  // Direct High-Resolution A4 PDF Generation using jsPDF + html2canvas
  const handleDownloadPDF = async () => {
    setIsExporting(true);
    setExportProgress('Initializing High-Res PDF Engine...');

    try {
      const reportContainer = document.getElementById('printable-report-area');
      if (!reportContainer) {
        throw new Error('Report container not found');
      }

      // Collect all .a4-report-page elements in order
      const pageElements = Array.from(reportContainer.querySelectorAll('.a4-report-page')) as HTMLElement[];
      if (!pageElements.length) {
        throw new Error('No printable A4 pages found');
      }

      // Create pristine A4 jsPDF instance (210mm x 297mm)
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true,
      });

      for (let i = 0; i < pageElements.length; i++) {
        setExportProgress(`Rendering High-Definition Page ${i + 1} of ${pageElements.length}...`);
        const pageEl = pageElements[i];

        // Render page to high-res canvas at scale: 2 for 300+ DPI crispness
        const canvas = await html2canvas(pageEl, {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff',
          windowWidth: 794, // exact 210mm in pixels at 96 DPI
        });

        const imgData = canvas.toDataURL('image/jpeg', 0.96);

        if (i > 0) {
          pdf.addPage('a4', 'portrait');
        }

        // Exact A4 dimensions in mm: 210 x 297
        pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297, undefined, 'FAST');
      }

      setExportProgress('Finalizing and Saving Document...');

      // Dynamic filename based on report type
      let fileName = 'Vedic_Report.pdf';
      if (activeReportType === 'kundli') {
        const nameClean = (nativeName || 'Native').trim().replace(/[^a-zA-Z0-9_-]/g, '_');
        fileName = `Vedic_Kundli_Janam_Patrika_${nameClean}.pdf`;
      } else if (activeReportType === 'match') {
        const p1 = (p1Details.name || 'Partner_1').trim().replace(/[^a-zA-Z0-9_-]/g, '_');
        const p2 = (p2Details.name || 'Partner_2').trim().replace(/[^a-zA-Z0-9_-]/g, '_');
        fileName = `Kundali_Milan_Match_Report_${p1}_and_${p2}.pdf`;
      } else {
        const nameClean = (gemNativeName || 'Native').trim().replace(/[^a-zA-Z0-9_-]/g, '_');
        fileName = `Vedic_Gemstone_Prescription_${nameClean}.pdf`;
      }

      pdf.save(fileName);
    } catch (err) {
      console.error('High-Res PDF generation error:', err);
      // Seamless fallback to browser native print dialog
      window.print();
    } finally {
      setIsExporting(false);
      setExportProgress('');
    }
  };

  // Browser Print Dialog
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/85 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      
      {/* Complete Strict CSS Print Rules Ensuring Zero Spillover and Exactly Covered A4 Pages */}
      <style>{`
        @page {
          size: A4 portrait;
          margin: 0 !important;
        }
        @media print {
          html, body {
            width: 210mm !important;
            height: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            background: #ffffff !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          body * {
            visibility: hidden !important;
          }
          #printable-report-area, #printable-report-area * {
            visibility: visible !important;
          }
          #printable-report-area {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 210mm !important;
            margin: 0 !important;
            padding: 0 !important;
            background: #ffffff !important;
            box-shadow: none !important;
            border: none !important;
            display: block !important;
          }
          .a4-report-page {
            width: 210mm !important;
            height: 297mm !important;
            min-height: 297mm !important;
            max-height: 297mm !important;
            margin: 0 !important;
            padding: 7mm 7mm !important;
            box-sizing: border-box !important;
            page-break-after: always !important;
            break-after: page !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            overflow: hidden !important;
            background: #ffffff !important;
            box-shadow: none !important;
            border: none !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: space-between !important;
          }
          .a4-report-page:last-child {
            page-break-after: avoid !important;
            break-after: avoid !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      {/* Modal Container */}
      <div className="bg-stone-100 rounded-3xl max-w-5xl w-full max-h-[96vh] shadow-2xl border border-stone-300 flex flex-col overflow-hidden">
        
        {/* Top Interactive Toolbar (Hidden in Print) */}
        <div className="p-3.5 sm:p-4 bg-[#FAF8F5] border-b border-stone-200 flex flex-wrap items-center justify-between gap-3 no-print">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-700 to-amber-950 text-amber-100 flex items-center justify-center shadow-xs">
              <FileText className="w-5 h-5 text-amber-200" />
            </div>
            <div>
              <h3 className="font-vedic font-bold text-amber-950 text-base leading-tight">
                Vedic Astrology Report Generator
              </h3>
              <p className="text-[11px] text-stone-500">
                High-resolution astrological dossier &amp; prescription
              </p>
            </div>
          </div>

          {/* Report Type Selector Tabs */}
          <div className="flex items-center gap-1 bg-stone-200/80 p-1 rounded-xl border border-stone-300 text-xs font-semibold">
            <button
              id="tab-report-kundli"
              onClick={() => setActiveReportType('kundli')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                activeReportType === 'kundli'
                  ? 'bg-amber-900 text-amber-50 shadow-xs'
                  : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Kundli Patrika</span>
            </button>

            <button
              id="tab-report-match"
              onClick={() => setActiveReportType('match')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                activeReportType === 'match'
                  ? 'bg-amber-900 text-amber-50 shadow-xs'
                  : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400/40" />
              <span>Match Finder (Milan)</span>
            </button>

            <button
              id="tab-report-gemstone"
              onClick={() => setActiveReportType('gemstone')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                activeReportType === 'gemstone'
                  ? 'bg-amber-900 text-amber-50 shadow-xs'
                  : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <Gem className="w-3.5 h-3.5 text-emerald-400" />
              <span>Gemstone Prescription</span>
            </button>
          </div>

          {/* Action Buttons: Download PDF + Print Dialog + Close */}
          <div className="flex items-center gap-2">
            <button
              id="btn-download-pdf"
              onClick={handleDownloadPDF}
              disabled={isExporting}
              className="px-4 py-2 rounded-xl bg-amber-900 hover:bg-amber-950 text-amber-50 text-xs font-bold flex items-center gap-2 shadow-sm transition-all active:scale-95 disabled:opacity-60 cursor-pointer"
              title="Download direct high-resolution PDF"
            >
              {isExporting ? (
                <>
                  <Loader2 className="w-4 h-4 text-amber-300 animate-spin" />
                  <span className="hidden sm:inline">Generating PDF...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 text-amber-300" />
                  <span>Download PDF</span>
                </>
              )}
            </button>

            <button
              id="btn-print-custom-report"
              onClick={handlePrint}
              className="px-3.5 py-2 rounded-xl bg-white hover:bg-stone-50 text-stone-800 border border-stone-300 text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-all active:scale-95 cursor-pointer"
              title="Open browser print dialog"
            >
              <Printer className="w-4 h-4 text-stone-600" />
              <span className="hidden sm:inline">Print / Save PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-stone-500 hover:text-stone-800 hover:bg-stone-200 transition-colors cursor-pointer"
              aria-label="Close report modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dynamic Context Customization Strip based on Active Report Type (Hidden in Print) */}
        <div className="px-5 py-2.5 bg-amber-50/70 border-b border-amber-900/10 text-xs no-print">
          {activeReportType === 'kundli' && (
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
              <div>
                <label className="block text-[10.5px] font-bold text-amber-950 mb-0.5">
                  Native's Name:
                </label>
                <input
                  type="text"
                  value={nativeName}
                  onChange={(e) => setNativeName(e.target.value)}
                  placeholder="Enter native's name"
                  className="w-full bg-white border border-stone-300 rounded-lg px-2 py-1 text-xs text-stone-800 focus:ring-1 focus:ring-amber-800 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10.5px] font-bold text-amber-950 mb-0.5">
                  Ascendant / Lagna:
                </label>
                <select
                  value={lagnaSign}
                  onChange={(e) => setLagnaSign(e.target.value)}
                  className="w-full bg-white border border-stone-300 rounded-lg px-2 py-1 text-xs text-stone-800 focus:ring-1 focus:ring-amber-800 focus:outline-none"
                >
                  {ZODIAC_SIGNS.map((sign) => (
                    <option key={sign} value={sign}>{sign}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10.5px] font-bold text-amber-950 mb-0.5">
                  Chart Format:
                </label>
                <select
                  value={reportChartStyle}
                  onChange={(e) => setReportChartStyle(e.target.value as ChartStyle)}
                  className="w-full bg-white border border-stone-300 rounded-lg px-2 py-1 text-xs text-stone-800 focus:ring-1 focus:ring-amber-800 focus:outline-none"
                >
                  <option value="north">North Indian Diamond (लग्न चक्र)</option>
                  <option value="south">South Indian Grid (दक्षिण चक्र)</option>
                </select>
              </div>

              <div>
                <label className="block text-[10.5px] font-bold text-amber-950 mb-0.5">
                  Birth Details / Place:
                </label>
                <input
                  type="text"
                  value={birthDetails}
                  onChange={(e) => setBirthDetails(e.target.value)}
                  placeholder="e.g. 15 May 1996, 08:30 AM, Guwahati"
                  className="w-full bg-white border border-stone-300 rounded-lg px-2 py-1 text-xs text-stone-800 focus:ring-1 focus:ring-amber-800 focus:outline-none"
                />
              </div>
            </div>
          )}

          {activeReportType === 'match' && (
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
              <div>
                <label className="block text-[10.5px] font-bold text-amber-950 mb-0.5">
                  Partner 1 Name:
                </label>
                <input
                  type="text"
                  value={p1Details.name}
                  onChange={(e) => setP1Details({ ...p1Details, name: e.target.value })}
                  placeholder="Partner 1 Name"
                  className="w-full bg-white border border-stone-300 rounded-lg px-2 py-1 text-xs text-stone-800 focus:ring-1 focus:ring-amber-800 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10.5px] font-bold text-amber-950 mb-0.5">
                  Partner 2 Name:
                </label>
                <input
                  type="text"
                  value={p2Details.name}
                  onChange={(e) => setP2Details({ ...p2Details, name: e.target.value })}
                  placeholder="Partner 2 Name"
                  className="w-full bg-white border border-stone-300 rounded-lg px-2 py-1 text-xs text-stone-800 focus:ring-1 focus:ring-amber-800 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10.5px] font-bold text-amber-950 mb-0.5">
                  Match Preset Samples:
                </label>
                <select
                  onChange={(e) => {
                    const preset = MATCH_PRESETS.find(p => p.id === e.target.value);
                    if (preset) {
                      setP1Details(preset.p1);
                      setP2Details(preset.p2);
                    }
                  }}
                  className="w-full bg-white border border-stone-300 rounded-lg px-2 py-1 text-xs text-stone-800 focus:ring-1 focus:ring-amber-800 focus:outline-none"
                  defaultValue=""
                >
                  <option value="" disabled>Load Kundali Preset...</option>
                  {MATCH_PRESETS.map((p) => (
                    <option key={p.id} value={p.id}>{p.title}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-between text-xs pt-3">
                <span className="text-stone-600">Calculated Guna:</span>
                <strong className="text-amber-950 font-bold font-vedic text-sm">
                  {currentMatchReport.totalObtainedGunas} / 36 ({currentMatchReport.percentageScore}%)
                </strong>
              </div>
            </div>
          )}

          {activeReportType === 'gemstone' && (
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
              <div>
                <label className="block text-[10.5px] font-bold text-amber-950 mb-0.5">
                  Native's Name:
                </label>
                <input
                  type="text"
                  value={gemNativeName}
                  onChange={(e) => setGemNativeName(e.target.value)}
                  placeholder="Native's Name"
                  className="w-full bg-white border border-stone-300 rounded-lg px-2 py-1 text-xs text-stone-800 focus:ring-1 focus:ring-amber-800 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10.5px] font-bold text-amber-950 mb-0.5">
                  Ascendant (Lagna):
                </label>
                <select
                  value={selectedGemLagna}
                  onChange={(e) => setSelectedGemLagna(Number(e.target.value))}
                  className="w-full bg-white border border-stone-300 rounded-lg px-2 py-1 text-xs text-stone-800 focus:ring-1 focus:ring-amber-800 focus:outline-none"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                    <option key={num} value={num}>
                      {LAGNA_RECOMMENDATIONS[num].lagnaName} - {LAGNA_RECOMMENDATIONS[num].sanskritName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10.5px] font-bold text-amber-950 mb-0.5">
                  Body Weight (Kg):
                </label>
                <input
                  type="number"
                  min="20"
                  max="150"
                  value={gemWeightKg}
                  onChange={(e) => setGemWeightKg(Math.max(20, Number(e.target.value)))}
                  className="w-full bg-white border border-stone-300 rounded-lg px-2 py-1 text-xs text-stone-800 focus:ring-1 focus:ring-amber-800 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-between text-xs pt-3">
                <span className="text-stone-600">Calculated Ratti:</span>
                <strong className="text-amber-950 font-bold font-vedic text-sm">
                  {currentGemstoneProfile.prescribedIdealRatti} Ratti ({currentGemstoneProfile.prescribedCarat} Ct)
                </strong>
              </div>
            </div>
          )}
        </div>

        {/* Export Progress Notification (if running) */}
        {isExporting && (
          <div className="bg-amber-900 text-amber-100 text-xs px-4 py-2 flex items-center justify-center gap-2 border-b border-amber-950 no-print">
            <Loader2 className="w-4 h-4 animate-spin text-amber-300" />
            <span>{exportProgress}</span>
          </div>
        )}

        {/* Printable Report Document Body (Rendered with pure A4 calibrated sheets) */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-stone-200/60">
          <div id="printable-report-area" className="max-w-[794px] mx-auto space-y-6">
            
            {activeReportType === 'kundli' && (
              <KundliReportPages
                nativeName={nativeName}
                lagnaSign={lagnaSign}
                birthDetails={birthDetails}
                reportChartStyle={reportChartStyle}
                placements={placements}
                houseOccupants={houseOccupants}
                detectedYogas={detectedYogas}
                kendraCount={kendraCount}
                trikonaCount={trikonaCount}
                upachayaCount={upachayaCount}
                dusthanaCount={dusthanaCount}
              />
            )}

            {activeReportType === 'match' && (
              <MatchReportPages
                matchReport={currentMatchReport}
                p1Details={p1Details}
                p2Details={p2Details}
              />
            )}

            {activeReportType === 'gemstone' && (
              <GemstoneReportPage
                nativeName={gemNativeName}
                selectedLagna={selectedGemLagna}
                calculatedProfile={currentGemstoneProfile}
                currentLagnaData={currentLagnaData}
                gender={gemGender}
                bodyWeightKg={gemWeightKg}
                birthDetailsText={`Consultation for ${gemNativeName}, ${currentLagnaData.lagnaName} Lagna (${gemWeightKg} kg)`}
              />
            )}

          </div>
        </div>

      </div>
    </div>
  );
};
