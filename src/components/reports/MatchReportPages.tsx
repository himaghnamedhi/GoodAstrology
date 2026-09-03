import React from 'react';
import { VedAstroMatchReport } from '../../data/vedicMatchCalculator';
import { BirthDetails } from '../../data/vedicAstrologyCalculator';
import { Heart, Sparkles, ShieldCheck, CheckCircle2, AlertTriangle, XCircle, Award } from 'lucide-react';

interface MatchReportPagesProps {
  matchReport: VedAstroMatchReport;
  p1Details: BirthDetails;
  p2Details: BirthDetails;
}

export const MatchReportPages: React.FC<MatchReportPagesProps> = ({
  matchReport,
  p1Details,
  p2Details,
}) => {
  const currentDate = new Date().toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="space-y-6">
      {/* PAGE 1: ASHTAKOOTA 36 GUNAS & COMPATIBILITY DOSSIER */}
      <div className="a4-report-page bg-white text-stone-900 border border-stone-200 shadow-md mx-auto relative flex flex-col justify-between p-6 sm:p-7">
        <div className="border-2 border-amber-900/50 rounded-xl p-4 sm:p-5 flex-1 flex flex-col justify-between relative bg-[#FCFBF9]">
          
          {/* Corner Marks */}
          <span className="absolute top-1 left-1.5 text-amber-900/40 text-xs font-serif select-none">❖</span>
          <span className="absolute top-1 right-1.5 text-amber-900/40 text-xs font-serif select-none">❖</span>
          <span className="absolute bottom-1 left-1.5 text-amber-900/40 text-xs font-serif select-none">❖</span>
          <span className="absolute bottom-1 right-1.5 text-amber-900/40 text-xs font-serif select-none">❖</span>

          {/* Sacred Header & Invocation */}
          <div className="text-center border-b border-amber-900/30 pb-2.5">
            <div className="flex items-center justify-between text-[11px] text-amber-950 font-serif tracking-wide px-2 mb-1">
              <span>॥ श्री राधाकृष्णाभ्यां नमः ॥</span>
              <span className="font-bold uppercase tracking-widest text-[10px] text-amber-900 font-vedic">
                Vedic Horoscope Match &amp; Kundali Milan
              </span>
              <span>॥ ॐ गं गणपतये नमः ॥</span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black font-vedic text-amber-950 tracking-tight leading-tight">
              VEDIC KUNDALI MILAN &amp; ASHTAKOOTA COMPATIBILITY
            </h1>
            <p className="text-[10px] text-stone-600 max-w-xl mx-auto mt-0.5">
              Comprehensive 36 Gunas Ashtakoota Analysis, Manglik Compatibility &amp; Marital Destiny Evaluation
            </p>

            {/* Partner 1 & Partner 2 Comparative Cards */}
            <div className="mt-2.5 pt-2 border-t border-amber-900/20 grid grid-cols-2 gap-3 text-[11px]">
              {/* Partner 1 Card */}
              <div className={`p-2.5 rounded-lg border text-left ${
                p1Details.gender === 'male'
                  ? 'bg-blue-50/60 border-blue-200/90'
                  : p1Details.gender === 'female'
                  ? 'bg-pink-50/60 border-pink-200/90'
                  : 'bg-stone-50 border-stone-200'
              }`}>
                <div className={`flex items-center justify-between mb-1 pb-1 border-b ${
                  p1Details.gender === 'male' ? 'border-blue-200/60' : p1Details.gender === 'female' ? 'border-pink-200/60' : 'border-stone-200'
                }`}>
                  <span className={`text-[9.5px] uppercase font-bold tracking-wider ${
                    p1Details.gender === 'male' ? 'text-blue-900' : p1Details.gender === 'female' ? 'text-pink-900' : 'text-stone-800'
                  }`}>
                    Partner 1 Profile
                  </span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold capitalize ${
                    p1Details.gender === 'male'
                      ? 'bg-blue-200/70 text-blue-950'
                      : p1Details.gender === 'female'
                      ? 'bg-pink-200/70 text-pink-950'
                      : 'bg-amber-100 text-amber-950'
                  }`}>
                    {p1Details.gender === 'male' ? '♂ Male' : p1Details.gender === 'female' ? '♀ Female' : 'Partner 1'}
                  </span>
                </div>
                <strong className={`font-bold text-xs block truncate mb-1 ${
                  p1Details.gender === 'male' ? 'text-blue-950' : p1Details.gender === 'female' ? 'text-pink-950' : 'text-amber-950'
                }`}>
                  {matchReport.partner1.name || 'Partner 1'}
                </strong>
                <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-[10px] text-stone-700">
                  <div>Birth: <strong className="text-stone-900">{p1Details.dob || 'Recorded'}</strong></div>
                  <div>Time: <strong className="text-stone-900">{p1Details.tob || '12:00'}</strong></div>
                  <div>Place: <strong className="text-stone-900 truncate block">{p1Details.city || 'Recorded'}</strong></div>
                  <div>Lagna: <strong className="text-stone-900">{matchReport.partner1.profile.lagnaName}</strong></div>
                  <div>Rashi: <strong className="text-stone-900">{matchReport.partner1.profile.moonSignName}</strong></div>
                  <div>Nakshatra: <strong className="text-stone-900">{matchReport.partner1.profile.nakshatraName}</strong></div>
                </div>
              </div>

              {/* Partner 2 Card */}
              <div className={`p-2.5 rounded-lg border text-left ${
                p2Details.gender === 'female'
                  ? 'bg-pink-50/60 border-pink-200/90'
                  : p2Details.gender === 'male'
                  ? 'bg-blue-50/60 border-blue-200/90'
                  : 'bg-stone-50 border-stone-200'
              }`}>
                <div className={`flex items-center justify-between mb-1 pb-1 border-b ${
                  p2Details.gender === 'female' ? 'border-pink-200/60' : p2Details.gender === 'male' ? 'border-blue-200/60' : 'border-stone-200'
                }`}>
                  <span className={`text-[9.5px] uppercase font-bold tracking-wider ${
                    p2Details.gender === 'female' ? 'text-pink-900' : p2Details.gender === 'male' ? 'text-blue-900' : 'text-stone-800'
                  }`}>
                    Partner 2 Profile
                  </span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold capitalize ${
                    p2Details.gender === 'female'
                      ? 'bg-pink-200/70 text-pink-950'
                      : p2Details.gender === 'male'
                      ? 'bg-blue-200/70 text-blue-950'
                      : 'bg-amber-100 text-amber-950'
                  }`}>
                    {p2Details.gender === 'female' ? '♀ Female' : p2Details.gender === 'male' ? '♂ Male' : 'Partner 2'}
                  </span>
                </div>
                <strong className={`font-bold text-xs block truncate mb-1 ${
                  p2Details.gender === 'female' ? 'text-pink-950' : p2Details.gender === 'male' ? 'text-blue-950' : 'text-amber-950'
                }`}>
                  {matchReport.partner2.name || 'Partner 2'}
                </strong>
                <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-[10px] text-stone-700">
                  <div>Birth: <strong className="text-stone-900">{p2Details.dob || 'Recorded'}</strong></div>
                  <div>Time: <strong className="text-stone-900">{p2Details.tob || '12:00'}</strong></div>
                  <div>Place: <strong className="text-stone-900 truncate block">{p2Details.city || 'Recorded'}</strong></div>
                  <div>Lagna: <strong className="text-stone-900">{matchReport.partner2.profile.lagnaName}</strong></div>
                  <div>Rashi: <strong className="text-stone-900">{matchReport.partner2.profile.moonSignName}</strong></div>
                  <div>Nakshatra: <strong className="text-stone-900">{matchReport.partner2.profile.nakshatraName}</strong></div>
                </div>
              </div>
            </div>
          </div>

          {/* Guna Score & Overall Verdict Banner */}
          <div className="my-2 p-2.5 rounded-lg bg-amber-50/90 border border-amber-300/80 grid grid-cols-12 gap-3 items-center">
            <div className="col-span-4 text-center border-r border-amber-300/70 pr-2">
              <span className="text-[9.5px] font-bold uppercase tracking-wider text-amber-900 block">Total Guna Score</span>
              <div className="text-2xl font-black text-amber-950 font-vedic leading-tight my-0.5">
                {matchReport.totalObtainedGunas} <span className="text-base text-amber-800 font-bold">/ 36</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-200/80 text-amber-950 font-extrabold inline-block">
                {matchReport.percentageScore}% Synergy
              </span>
            </div>

            <div className="col-span-8 text-left space-y-1 pl-1">
              <div className="flex items-center gap-2">
                <span className={`text-[11px] font-extrabold px-2 py-0.5 rounded font-vedic ${
                  matchReport.verdictTone === 'success'
                    ? 'bg-emerald-100 text-emerald-950 border border-emerald-300'
                    : matchReport.verdictTone === 'warning'
                    ? 'bg-amber-100 text-amber-950 border border-amber-300'
                    : 'bg-rose-100 text-rose-950 border border-rose-300'
                }`}>
                  {matchReport.verdict}
                </span>
                <span className="text-[9.5px] text-stone-500 font-medium">Ashtakoota Milan Standard</span>
              </div>
              <p className="text-[10px] text-stone-700 leading-snug">
                {matchReport.summaryDescription}
              </p>
            </div>
          </div>

          {/* Ashtakoota 8 Kutas Evaluation Table */}
          <div className="my-1 space-y-1">
            <div className="flex items-center justify-between text-xs font-bold text-amber-950 font-vedic">
              <span className="flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-800" />
                Ashtakoota 8 Kutas Detailed Milan Breakdown
              </span>
              <span className="text-[9px] text-stone-500 font-sans">Max: 36 Points • Threshold: 18 Points</span>
            </div>

            <div className="border border-stone-300 rounded-lg overflow-hidden bg-white text-[9.5px]">
              <table className="w-full text-left border-collapse">
                <thead className="bg-stone-100/90 text-stone-900 font-bold border-b border-stone-300 text-[9px]">
                  <tr>
                    <th className="p-1.5 border-r border-stone-200">Kuta (कूट)</th>
                    <th className="p-1.5 border-r border-stone-200">Signification</th>
                    <th className="p-1.5 border-r border-stone-200">Partner 1</th>
                    <th className="p-1.5 border-r border-stone-200">Partner 2</th>
                    <th className="p-1.5 border-r border-stone-200 text-center">Score</th>
                    <th className="p-1.5 text-center">Verdict</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  {matchReport.ashtakoota.map((kuta) => (
                    <tr key={kuta.id} className="hover:bg-amber-50/40">
                      <td className="p-1.5 font-bold text-stone-900 border-r border-stone-200 whitespace-nowrap">
                        {kuta.name} <span className="text-stone-500 font-normal">({kuta.sanskritName})</span>
                      </td>
                      <td className="p-1.5 text-stone-600 border-r border-stone-200 line-clamp-1 max-w-[170px]" title={kuta.significance}>
                        {kuta.significance}
                      </td>
                      <td className="p-1.5 text-stone-800 border-r border-stone-200 font-medium whitespace-nowrap">
                        {kuta.boyAttribute}
                      </td>
                      <td className="p-1.5 text-stone-800 border-r border-stone-200 font-medium whitespace-nowrap">
                        {kuta.girlAttribute}
                      </td>
                      <td className="p-1.5 font-bold text-center border-r border-stone-200 whitespace-nowrap text-amber-950">
                        {kuta.obtainedScore} / {kuta.maxScore}
                      </td>
                      <td className="p-1.5 text-center whitespace-nowrap">
                        <span className={`text-[8.5px] px-1.5 py-0.2 rounded font-bold ${
                          kuta.verdict === 'Excellent' || kuta.verdict === 'Good'
                            ? 'bg-emerald-100 text-emerald-900'
                            : kuta.verdict === 'Mitigated'
                            ? 'bg-blue-100 text-blue-900'
                            : 'bg-rose-100 text-rose-900'
                        }`}>
                          {kuta.verdict}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Page 1 Footer */}
          <div className="pt-2 border-t border-amber-900/30 flex items-center justify-between text-[9.5px] text-stone-500">
            <span>goodastrology • Vedic Kundali Milan &amp; Ashtakoota Compatibility Dossier</span>
            <span className="font-serif italic text-amber-900 font-semibold">॥ परस्परं भावयन्तः श्रेयः परमवाप्स्यथ ॥</span>
            <span className="font-bold text-amber-950">Page 1 of 2</span>
          </div>
        </div>
      </div>

      {/* PAGE 2: MANGLIK DOSHA, SPECIAL KUTAS & REMEDIES */}
      <div className="a4-report-page bg-white text-stone-900 border border-stone-200 shadow-md mx-auto relative flex flex-col justify-between p-6 sm:p-7">
        <div className="border-2 border-amber-900/50 rounded-xl p-4 sm:p-5 flex-1 flex flex-col justify-between relative bg-[#FCFBF9]">
          
          {/* Corner Marks */}
          <span className="absolute top-1 left-1.5 text-amber-900/40 text-xs font-serif select-none">❖</span>
          <span className="absolute top-1 right-1.5 text-amber-900/40 text-xs font-serif select-none">❖</span>
          <span className="absolute bottom-1 left-1.5 text-amber-900/40 text-xs font-serif select-none">❖</span>
          <span className="absolute bottom-1 right-1.5 text-amber-900/40 text-xs font-serif select-none">❖</span>

          {/* Page 2 Header */}
          <div className="text-center border-b border-amber-900/30 pb-2">
            <div className="flex items-center justify-between text-[11px] text-amber-950 font-serif tracking-wide px-2 mb-0.5">
              <span>॥ ॐ साम्ब सदाशिवाय नमः ॥</span>
              <span className="font-bold uppercase tracking-widest text-[10px] text-amber-900 font-vedic">
                Manglik Analysis &amp; Special Kutas Harmonization
              </span>
              <span>॥ शुभम् भवतु ॥</span>
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold font-vedic text-amber-950 tracking-tight">
              MANGLIK ANALYSIS, SPECIAL KUTAS &amp; VEDIC REMEDIES
            </h2>
            <p className="text-[10px] text-stone-600">
              Deep In-Depth Astrological Compatibility Evaluation for {matchReport.partner1.name} &amp; {matchReport.partner2.name}
            </p>
          </div>

          {/* Section 1: Manglik Dosha Analysis & Cancellation Matrix */}
          <div className="my-1.5 p-2.5 rounded-lg border border-amber-900/20 bg-white space-y-1.5">
            <div className="flex items-center justify-between border-b border-stone-100 pb-1">
              <span className="text-xs font-bold text-amber-950 font-vedic flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-800" />
                Manglik (Kuja) Dosha Comparative Evaluation
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                matchReport.manglik.isCancelled || matchReport.manglik.compatibilityVerdict === 'No Dosha'
                  ? 'bg-emerald-100 text-emerald-950 border border-emerald-300'
                  : 'bg-amber-100 text-amber-950 border border-amber-300'
              }`}>
                {matchReport.manglik.compatibilityVerdict}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[10px]">
              <div className="p-2 rounded bg-stone-50 border border-stone-200">
                <div className="flex justify-between items-center mb-1">
                  <strong className="text-amber-950">{matchReport.partner1.name} (Partner 1)</strong>
                  <span className={`text-[8.5px] px-1.5 py-0.2 rounded font-bold ${
                    matchReport.manglik.isBoyManglik ? 'bg-orange-100 text-orange-950' : 'bg-emerald-100 text-emerald-950'
                  }`}>
                    {matchReport.manglik.isBoyManglik ? 'Manglik' : 'Non-Manglik'}
                  </span>
                </div>
                <p className="text-stone-600 text-[9px]">
                  Mars in {matchReport.manglik.boyManglikHouse}th House ({matchReport.manglik.boySeverity} severity).
                </p>
              </div>

              <div className="p-2 rounded bg-stone-50 border border-stone-200">
                <div className="flex justify-between items-center mb-1">
                  <strong className="text-amber-950">{matchReport.partner2.name} (Partner 2)</strong>
                  <span className={`text-[8.5px] px-1.5 py-0.2 rounded font-bold ${
                    matchReport.manglik.isGirlManglik ? 'bg-orange-100 text-orange-950' : 'bg-emerald-100 text-emerald-950'
                  }`}>
                    {matchReport.manglik.isGirlManglik ? 'Manglik' : 'Non-Manglik'}
                  </span>
                </div>
                <p className="text-stone-600 text-[9px]">
                  Mars in {matchReport.manglik.girlManglikHouse}th House ({matchReport.manglik.girlSeverity} severity).
                </p>
              </div>
            </div>

            <div className="text-[9.5px] text-stone-700 bg-amber-50/70 p-2 rounded border border-amber-200/70 leading-snug">
              <strong className="text-amber-950 font-bold block mb-0.5">Classical Cancellation &amp; Alignment:</strong>
              {matchReport.manglik.cancellationReason}
            </div>
          </div>

          {/* Section 2: 4 Special Kutas (Rajju, Mahendra, Stree-Deergha, Vedha) */}
          <div className="my-1.5 space-y-1">
            <span className="text-xs font-bold text-amber-950 font-vedic block">
              Special Classic Kutas Analysis (Rajju, Mahendra, Stree-Deergha &amp; Vedha)
            </span>

            <div className="grid grid-cols-4 gap-2 text-[10px]">
              <div className="p-2 rounded-lg border border-stone-200 bg-white space-y-0.5">
                <span className="text-[9px] font-bold text-amber-900 uppercase block">Rajju Koota</span>
                <strong className={`text-[10px] block ${matchReport.specialKutas.rajju.isDosha ? 'text-rose-700' : 'text-emerald-800'}`}>
                  {matchReport.specialKutas.rajju.verdict}
                </strong>
                <p className="text-stone-500 text-[8.5px] line-clamp-2">{matchReport.specialKutas.rajju.meaning}</p>
              </div>

              <div className="p-2 rounded-lg border border-stone-200 bg-white space-y-0.5">
                <span className="text-[9px] font-bold text-amber-900 uppercase block">Mahendra Koota</span>
                <strong className="text-[10px] text-stone-900 block">{matchReport.specialKutas.mahendra.verdict}</strong>
                <p className="text-stone-500 text-[8.5px] line-clamp-2">{matchReport.specialKutas.mahendra.meaning}</p>
              </div>

              <div className="p-2 rounded-lg border border-stone-200 bg-white space-y-0.5">
                <span className="text-[9px] font-bold text-amber-900 uppercase block">Stree-Deergha</span>
                <strong className="text-[10px] text-stone-900 block">{matchReport.specialKutas.streeDeergha.verdict}</strong>
                <p className="text-stone-500 text-[8.5px] line-clamp-2">{matchReport.specialKutas.streeDeergha.meaning}</p>
              </div>

              <div className="p-2 rounded-lg border border-stone-200 bg-white space-y-0.5">
                <span className="text-[9px] font-bold text-amber-900 uppercase block">Vedha Koota</span>
                <strong className={`text-[10px] block ${matchReport.specialKutas.vedha.isAfflicted ? 'text-rose-700' : 'text-emerald-800'}`}>
                  {matchReport.specialKutas.vedha.verdict}
                </strong>
                <p className="text-stone-500 text-[8.5px] line-clamp-2">{matchReport.specialKutas.vedha.meaning}</p>
              </div>
            </div>
          </div>

          {/* Section 3: 5 Marital Dimensions Balance Matrix */}
          <div className="my-1.5 space-y-1">
            <span className="text-xs font-bold text-amber-950 font-vedic block">
              Core Marital Life Dimensions Synergy
            </span>

            <div className="grid grid-cols-5 gap-2 text-center text-[10px]">
              {matchReport.lifeDimensions.map((dim, idx) => (
                <div key={idx} className="p-2 rounded-lg bg-stone-50 border border-stone-200">
                  <span className="text-[8.5px] font-bold text-stone-500 uppercase block truncate">{dim.name}</span>
                  <strong className="text-sm font-black text-amber-950 block my-0.5">{dim.scorePercent}%</strong>
                  <div className="w-full bg-stone-200 h-1 rounded-full overflow-hidden">
                    <div className="bg-amber-800 h-1 rounded-full" style={{ width: `${dim.scorePercent}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Authentic Vedic Marriage Remedies */}
          <div className="my-1 border-t border-amber-900/20 pt-1.5 space-y-1">
            <span className="text-xs font-bold text-amber-950 font-vedic flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-800" />
              Recommended Vedic Marriage Harmonization &amp; Remedies
            </span>

            <div className="grid grid-cols-3 gap-2 text-[9.5px]">
              <div className="p-2 rounded-lg bg-amber-50/70 border border-amber-200/70">
                <strong className="text-amber-950 font-bold block mb-0.5">Auspicious Vivaha Muhurta</strong>
                <p className="text-stone-600 text-[8.5px] leading-snug">
                  Choose a Shubh Vivaha lagna free from Latta, Pat, and Jamitra doshas with strong Jupiter/Venus aspects.
                </p>
              </div>
              <div className="p-2 rounded-lg bg-emerald-50/70 border border-emerald-200/70">
                <strong className="text-emerald-950 font-bold block mb-0.5">Gauri-Shankar Puja</strong>
                <p className="text-stone-600 text-[8.5px] leading-snug">
                  Joint worship of Shiva-Parvati or offering milk Abhishek on Mondays resolves domestic friction and strengthens marital affection.
                </p>
              </div>
              <div className="p-2 rounded-lg bg-blue-50/70 border border-blue-200/70">
                <strong className="text-blue-950 font-bold block mb-0.5">Navagraha Shanti &amp; Dana</strong>
                <p className="text-stone-600 text-[8.5px] leading-snug">
                  Donate red lentils &amp; copper for Mars, and white rice &amp; sweets for Moon and Venus to harmonize planetary energies.
                </p>
              </div>
            </div>
          </div>

          {/* Section 5: Astrologer Certification & Seal Block */}
          <div className="mt-1 pt-2 border-t border-amber-900/30 grid grid-cols-12 gap-3 items-center text-[10px]">
            <div className="col-span-8 space-y-1">
              <span className="font-bold text-amber-950 block">Kundali Milan Verification &amp; Certification:</span>
              <p className="text-stone-600 text-[9px] leading-snug">
                This marriage compatibility analysis conforms to the authentic Shastras of Maharishi Narada and Muhurta Chintamani. Astrological synergy is a guiding framework for mutual patience, emotional devotion, and dharmic unity.
              </p>
            </div>
            <div className="col-span-4 flex flex-col items-center justify-center p-2 rounded-lg border border-amber-900/30 bg-amber-50/40 text-center">
              <div className="w-8 h-8 rounded-full border border-amber-900/40 flex items-center justify-center mb-0.5 bg-white">
                <Heart className="w-4 h-4 text-rose-700" />
              </div>
              <span className="font-bold text-amber-950 text-[9.5px] font-vedic">Certified Milan Dossier</span>
              <span className="text-[8px] text-stone-500 font-mono">Certificate: KM-{matchReport.totalObtainedGunas}G-{Math.abs(p1Details.dob.length * 108 + 7)}</span>
            </div>
          </div>

          {/* Page 2 Footer */}
          <div className="pt-2 border-t border-amber-900/30 flex items-center justify-between text-[9.5px] text-stone-500">
            <span>goodastrology • Kundali Milan &amp; Ashtakoota Marriage Dossier</span>
            <span className="font-semibold text-stone-700">Himaghna Medhi • Jyotish Matching Engine</span>
            <span className="font-bold text-amber-950">Page 2 of 2</span>
          </div>
        </div>
      </div>
    </div>
  );
};
