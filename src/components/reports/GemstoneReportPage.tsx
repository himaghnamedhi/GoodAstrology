import React from 'react';
import { LagnaGemstoneRecommendation, NAVARATNA_DATA } from '../../data/gemstoneData';
import { CalculatedBirthProfile } from '../../data/vedicAstrologyCalculator';
import { Sparkles, ShieldAlert, CheckCircle2, ShieldCheck, Scale, Award } from 'lucide-react';

interface GemstoneReportPageProps {
  nativeName: string;
  selectedLagna: number;
  calculatedProfile: CalculatedBirthProfile;
  currentLagnaData: LagnaGemstoneRecommendation;
  gender: string;
  bodyWeightKg: number;
  birthDetailsText?: string;
}

export const GemstoneReportPage: React.FC<GemstoneReportPageProps> = ({
  nativeName,
  selectedLagna,
  calculatedProfile,
  currentLagnaData,
  gender,
  bodyWeightKg,
  birthDetailsText,
}) => {
  const currentDate = new Date().toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const lifeGem = NAVARATNA_DATA[currentLagnaData.lifeStone.gemId] || null;
  const luckyGem = NAVARATNA_DATA[currentLagnaData.luckyStone.gemId] || null;
  const punyaGem = NAVARATNA_DATA[currentLagnaData.punyaStone.gemId] || null;

  return (
    <div className="a4-report-page bg-white text-stone-900 border border-stone-200 shadow-md mx-auto relative flex flex-col justify-between p-6 sm:p-7">
      <div className="border-2 border-amber-900/50 rounded-xl p-4 sm:p-5 flex-1 flex flex-col justify-between relative bg-[#FCFBF9]">
        
        {/* Corner Filigree Marks */}
        <span className="absolute top-1 left-1.5 text-amber-900/40 text-xs font-serif select-none">❖</span>
        <span className="absolute top-1 right-1.5 text-amber-900/40 text-xs font-serif select-none">❖</span>
        <span className="absolute bottom-1 left-1.5 text-amber-900/40 text-xs font-serif select-none">❖</span>
        <span className="absolute bottom-1 right-1.5 text-amber-900/40 text-xs font-serif select-none">❖</span>

        {/* Section 1: Sacred Header & Invocation */}
        <div className="text-center border-b border-amber-900/30 pb-2.5">
          <div className="flex items-center justify-between text-[11px] text-amber-950 font-serif tracking-wide px-2 mb-1">
            <span>॥ ॐ श्री धन्वन्तरये नमः ॥</span>
            <span className="font-bold uppercase tracking-widest text-[10px] text-amber-900 font-vedic">
              Vedic Ratna Chikitsa &amp; Gemstone Prescription
            </span>
            <span>॥ ॐ नमः शिवाय ॥</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-black font-vedic text-amber-950 tracking-tight leading-tight">
            OFFICIAL VEDIC GEMSTONE PRESCRIPTION &amp; DOSAGE
          </h1>
          <p className="text-[10px] text-stone-600 max-w-xl mx-auto mt-0.5">
            Prescribed according to Classical Brihat Samhita &amp; Jataka Parijata Ayurvedic-Astrological Principles
          </p>

          {/* Native Demographics & Weight-Based Scientific Dosage */}
          <div className="mt-2.5 pt-2 border-t border-amber-900/20 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10.5px] bg-white/90 p-2.5 rounded-lg border border-amber-900/15 text-left">
            <div>
              <span className="text-stone-500 block text-[9px] uppercase font-semibold">Native Name</span>
              <strong className="text-amber-950 font-bold truncate block">{nativeName || 'Auspicious Native'}</strong>
            </div>
            <div>
              <span className="text-stone-500 block text-[9px] uppercase font-semibold">Ascendant (Lagna)</span>
              <strong className="text-stone-900 font-bold block">{currentLagnaData.lagnaName}</strong>
            </div>
            <div>
              <span className="text-stone-500 block text-[9px] uppercase font-semibold">Body Weight / Gender</span>
              <strong className="text-stone-900 font-bold block capitalize">{bodyWeightKg} kg ({Math.round(bodyWeightKg * 2.20462)} lbs) • {gender}</strong>
            </div>
            <div>
              <span className="text-stone-500 block text-[9px] uppercase font-semibold">Prescription Date</span>
              <strong className="text-stone-900 font-bold block">{currentDate}</strong>
            </div>
            {birthDetailsText && (
              <div className="col-span-2 sm:col-span-4 pt-1.5 border-t border-stone-200/80 text-[10px]">
                <span className="text-stone-500 font-medium mr-1.5">Consultation &amp; Birth Details:</span>
                <strong className="text-stone-800 font-semibold">{birthDetailsText}</strong>
              </div>
            )}
          </div>
        </div>

        {/* Section 2: Weight-Based Dosage Calculation Matrix Banner */}
        <div className="my-2 p-2.5 rounded-lg bg-amber-50/90 border border-amber-300/80 grid grid-cols-12 gap-3 items-center">
          <div className="col-span-4 text-center border-r border-amber-300/70 pr-2">
            <span className="text-[9.5px] font-bold uppercase tracking-wider text-amber-900 block">Prescribed Ideal Dosage</span>
            <div className="text-2xl font-black text-amber-950 font-vedic leading-tight my-0.5">
              {calculatedProfile.prescribedIdealRatti} <span className="text-sm font-bold text-amber-800">Ratti</span>
            </div>
            <span className="text-[9.5px] px-2 py-0.5 rounded-full bg-amber-200/90 text-amber-950 font-extrabold inline-block">
              ≈ {calculatedProfile.prescribedCarat} Carats ({Math.round(calculatedProfile.prescribedCarat * 200)} mg)
            </span>
          </div>

          <div className="col-span-8 text-left space-y-1 pl-1 text-[10px]">
            <div className="flex items-center gap-2">
              <span className="text-[10.5px] font-extrabold px-2 py-0.5 rounded bg-amber-100 text-amber-950 border border-amber-300 font-vedic">
                Ayurvedic-Astrological Formula
              </span>
              <span className="text-[9.5px] text-stone-500 font-mono">Min Baseline: {calculatedProfile.prescribedMinRatti} Ratti</span>
            </div>
            <p className="text-stone-700 leading-snug">
              Dosage is calculated as <strong>1 Ratti per 10–12 kg of native body weight</strong> ({bodyWeightKg} kg), calibrated with Lagna planetary strength to ensure optimum aura absorption without physiological agitation.
            </p>
          </div>
        </div>

        {/* Section 3: The 3 Auspicious Astrological Gemstones Cards */}
        <div className="my-1.5 space-y-1.5">
          <div className="flex items-center justify-between text-xs font-bold text-amber-950 font-vedic">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-800" />
              The 3 Holy Astrological Benefic Gemstones (त्रि-रत्न चिकित्सा)
            </span>
            <span className="text-[9px] text-stone-500 font-sans">Lagna Lord • 5th Lord • 9th Lord</span>
          </div>

          <div className="grid grid-cols-3 gap-2.5 text-[9.5px]">
            {/* 1. Life Stone */}
            <div className="p-2.5 rounded-lg border border-amber-900/20 bg-white space-y-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-1 border-b border-stone-100">
                  <span className="text-[8.5px] px-1.5 py-0.2 rounded bg-amber-100 text-amber-950 font-bold uppercase">
                    Life Stone (जीव रत्न)
                  </span>
                  <span className="text-[8.5px] text-stone-500 font-medium">Lagna Lord</span>
                </div>
                <strong className="text-amber-950 font-bold text-xs font-vedic block mt-1">
                  {currentLagnaData.lifeStone.gemName}
                </strong>
                <span className="text-[9px] text-stone-600 block">
                  Planet: <strong className="text-stone-900 uppercase">{currentLagnaData.lifeStone.planet}</strong>
                </span>
                {lifeGem && (
                  <div className="space-y-0.5 mt-1 pt-1 border-t border-stone-100 text-[9px] text-stone-700">
                    <div><strong>Dosage:</strong> {calculatedProfile.prescribedIdealRatti} Ratti ({calculatedProfile.prescribedCarat} Ct)</div>
                    <div><strong>Metal:</strong> {lifeGem.idealMetal}</div>
                    <div><strong>Finger:</strong> {lifeGem.idealFinger}</div>
                    <div><strong>Auspicious Day:</strong> {lifeGem.wearingDay} ({lifeGem.wearingTime})</div>
                    <div className="pt-0.5">
                      <strong className="text-amber-950 block text-[8.5px]">Beej Mantra:</strong>
                      <span className="font-mono text-[8px] text-stone-600 block truncate" title={lifeGem.beejMantra}>
                        {lifeGem.beejMantra}
                      </span>
                    </div>
                  </div>
                )}
              </div>
              <p className="text-[8.5px] text-stone-500 pt-1 border-t border-stone-100 line-clamp-2">
                Enhances physical vitality, boosts immune vigor, self-confidence, and longevity.
              </p>
            </div>

            {/* 2. Lucky Stone */}
            <div className="p-2.5 rounded-lg border border-amber-900/20 bg-white space-y-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-1 border-b border-stone-100">
                  <span className="text-[8.5px] px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-950 font-bold uppercase">
                    Lucky Stone (भाग्य रत्न)
                  </span>
                  <span className="text-[8.5px] text-stone-500 font-medium">9th Lord</span>
                </div>
                <strong className="text-emerald-950 font-bold text-xs font-vedic block mt-1">
                  {currentLagnaData.luckyStone.gemName}
                </strong>
                <span className="text-[9px] text-stone-600 block">
                  Planet: <strong className="text-stone-900 uppercase">{currentLagnaData.luckyStone.planet}</strong>
                </span>
                {luckyGem && (
                  <div className="space-y-0.5 mt-1 pt-1 border-t border-stone-100 text-[9px] text-stone-700">
                    <div><strong>Dosage:</strong> {calculatedProfile.prescribedIdealRatti} Ratti ({calculatedProfile.prescribedCarat} Ct)</div>
                    <div><strong>Metal:</strong> {luckyGem.idealMetal}</div>
                    <div><strong>Finger:</strong> {luckyGem.idealFinger}</div>
                    <div><strong>Auspicious Day:</strong> {luckyGem.wearingDay} ({luckyGem.wearingTime})</div>
                    <div className="pt-0.5">
                      <strong className="text-emerald-950 block text-[8.5px]">Beej Mantra:</strong>
                      <span className="font-mono text-[8px] text-stone-600 block truncate" title={luckyGem.beejMantra}>
                        {luckyGem.beejMantra}
                      </span>
                    </div>
                  </div>
                )}
              </div>
              <p className="text-[8.5px] text-stone-500 pt-1 border-t border-stone-100 line-clamp-2">
                Unlocks destiny, divine grace, higher fortune, righteous fortune, and success.
              </p>
            </div>

            {/* 3. Punya Stone */}
            <div className="p-2.5 rounded-lg border border-amber-900/20 bg-white space-y-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-1 border-b border-stone-100">
                  <span className="text-[8.5px] px-1.5 py-0.2 rounded bg-blue-100 text-blue-950 font-bold uppercase">
                    Punya Stone (पुण्य रत्न)
                  </span>
                  <span className="text-[8.5px] text-stone-500 font-medium">5th Lord</span>
                </div>
                <strong className="text-blue-950 font-bold text-xs font-vedic block mt-1">
                  {currentLagnaData.punyaStone.gemName}
                </strong>
                <span className="text-[9px] text-stone-600 block">
                  Planet: <strong className="text-stone-900 uppercase">{currentLagnaData.punyaStone.planet}</strong>
                </span>
                {punyaGem && (
                  <div className="space-y-0.5 mt-1 pt-1 border-t border-stone-100 text-[9px] text-stone-700">
                    <div><strong>Dosage:</strong> {calculatedProfile.prescribedIdealRatti} Ratti ({calculatedProfile.prescribedCarat} Ct)</div>
                    <div><strong>Metal:</strong> {punyaGem.idealMetal}</div>
                    <div><strong>Finger:</strong> {punyaGem.idealFinger}</div>
                    <div><strong>Auspicious Day:</strong> {punyaGem.wearingDay} ({punyaGem.wearingTime})</div>
                    <div className="pt-0.5">
                      <strong className="text-blue-950 block text-[8.5px]">Beej Mantra:</strong>
                      <span className="font-mono text-[8px] text-stone-600 block truncate" title={punyaGem.beejMantra}>
                        {punyaGem.beejMantra}
                      </span>
                    </div>
                  </div>
                )}
              </div>
              <p className="text-[8.5px] text-stone-500 pt-1 border-t border-stone-100 line-clamp-2">
                Sharpened intellect, academic honors, creative intuition, and memory enhancement.
              </p>
            </div>
          </div>
        </div>

        {/* Section 4: Prohibited Gemstones & Shatru Graha Warning Matrix */}
        <div className="my-1.5 p-2 rounded-lg border border-rose-300/80 bg-rose-50/60 text-[9.5px] space-y-1">
          <div className="flex items-center justify-between">
            <span className="font-bold text-rose-950 flex items-center gap-1 font-vedic text-[10px]">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-700" />
              Strictly Prohibited Incompatible Gemstones (शत्रु रत्न निषेध)
            </span>
            <span className="text-[8.5px] text-rose-800 font-semibold">Never wear simultaneously</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[9px]">
            {currentLagnaData.strictlyAvoid.slice(0, 2).map((item, idx) => (
              <div key={idx} className="bg-white/80 p-1.5 rounded border border-rose-200">
                <strong className="text-rose-950 font-bold block">❌ {item.gemName}</strong>
                <span className="text-stone-600 text-[8.5px] leading-snug">{item.reason}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 5: Sacred Pran Pratishtha & Purification Vidhi (4 Steps) */}
        <div className="my-1.5 space-y-1">
          <span className="text-xs font-bold text-amber-950 font-vedic flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-amber-800" />
            Vedic Pran Pratishtha &amp; Purification Protocol (प्राण प्रतिष्ठा विधि)
          </span>

          <div className="grid grid-cols-4 gap-2 text-[9px]">
            <div className="p-2 rounded-lg border border-stone-200 bg-white">
              <strong className="text-amber-950 block mb-0.5">1. Panchamrit Shuddhi</strong>
              <p className="text-stone-600 text-[8.5px] leading-snug">
                Submerge in raw cow milk, Ganga water, honey &amp; Tulsi leaves for 45 minutes.
              </p>
            </div>
            <div className="p-2 rounded-lg border border-stone-200 bg-white">
              <strong className="text-amber-950 block mb-0.5">2. Vedic Abhishek</strong>
              <p className="text-stone-600 text-[8.5px] leading-snug">
                Rinse with clean Gangajal while reciting Gayatri Mantra and apply pure Chandan tilak.
              </p>
            </div>
            <div className="p-2 rounded-lg border border-stone-200 bg-white">
              <strong className="text-amber-950 block mb-0.5">3. Beej Japa</strong>
              <p className="text-stone-600 text-[8.5px] leading-snug">
                Chant the respective planetary Beej Mantra 108 times facing East during auspicious Hora.
              </p>
            </div>
            <div className="p-2 rounded-lg border border-stone-200 bg-white">
              <strong className="text-amber-950 block mb-0.5">4. Auspicious Donning</strong>
              <p className="text-stone-600 text-[8.5px] leading-snug">
                Wear on the prescribed finger at sunrise during Shukla Paksha (waxing moon) on the assigned day.
              </p>
            </div>
          </div>
        </div>

        {/* Section 6: Official Astrological & Gemological Verification Seal */}
        <div className="mt-1 pt-2 border-t border-amber-900/30 grid grid-cols-12 gap-3 items-center text-[10px]">
          <div className="col-span-8 space-y-1">
            <span className="font-bold text-amber-950 block">Gemological Prescription Certification:</span>
            <p className="text-stone-600 text-[9px] leading-snug">
              This Vedic Gemstone Prescription is formulated on astrological functional benefics and native physiological mass. All gemstones must be 100% natural, unheated, untreated, and certified by an accredited gemological laboratory.
            </p>
          </div>
          <div className="col-span-4 flex flex-col items-center justify-center p-2 rounded-lg border border-amber-900/30 bg-amber-50/40 text-center">
            <div className="w-8 h-8 rounded-full border border-amber-900/40 flex items-center justify-center mb-0.5 bg-white">
              <Sparkles className="w-4 h-4 text-amber-800" />
            </div>
            <span className="font-bold text-amber-950 text-[9.5px] font-vedic">Certified Gem Prescription</span>
            <span className="text-[8px] text-stone-500 font-mono">ID: RC-{selectedLagna}L-{Math.abs(Math.round(bodyWeightKg * 108))}</span>
          </div>
        </div>

        {/* Page Footer */}
        <div className="pt-2 border-t border-amber-900/30 flex items-center justify-between text-[9.5px] text-stone-500">
          <span>goodastrology • Vedic Gemstone Prescription &amp; Ratna Chikitsa</span>
          <span className="font-semibold text-stone-700">Himaghna Medhi • Jyotish Calculation Engine</span>
          <span className="font-bold text-amber-950">Page 1 of 1</span>
        </div>
      </div>
    </div>
  );
};
