import React from 'react';
import { X, Printer, Download, Sparkles, Compass } from 'lucide-react';
import { HOUSES_DATA } from '../data/housesData';
import { PLANETS_DATA } from '../data/planetsData';
import { HouseNumber, PlanetId } from '../types/astrology';

interface PrintCheatSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrintCheatSheetModal: React.FC<PrintCheatSheetModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const getOrdinal = (n: number) => {
    const s = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] shadow-2xl border border-stone-200 flex flex-col overflow-hidden">
        
        {/* Modal Top Bar */}
        <div className="p-4 bg-[#FAF8F5] border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Printer className="w-5 h-5 text-amber-700" />
            <h3 className="font-vedic font-bold text-amber-950 text-base">
              goodastrology — Kundli House Chart Reference Cheat Sheet
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-xl bg-amber-900 text-amber-50 hover:bg-amber-950 text-xs font-bold flex items-center gap-1.5 shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              Print / Save as PDF
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Area */}
        <div className="p-6 overflow-y-auto flex-1 bg-white space-y-6 text-stone-900">
          
          {/* Header */}
          <div className="text-center border-b-2 border-stone-800 pb-4">
            <h1 className="text-2xl font-extrabold font-vedic text-stone-900 tracking-wider">
              GOODASTROLOGY • VEDIC KUNDLI 12 HOUSES REFERENCE
            </h1>
            <p className="text-xs text-stone-600 mt-1">
              Complete Bhavas (1st to 12th Houses), Geometry Locations, Karakas, and Significators
            </p>
          </div>

          {/* 12 Houses Table */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-800">12 Houses & Locations:</h3>
            <div className="border border-stone-300 rounded-xl overflow-hidden text-xs">
              <table className="w-full text-left border-collapse">
                <thead className="bg-stone-100 text-stone-800 font-bold border-b border-stone-300">
                  <tr>
                    <th className="p-2 border-r border-stone-300">House</th>
                    <th className="p-2 border-r border-stone-300">Sanskrit Bhava</th>
                    <th className="p-2 border-r border-stone-300">Diamond Location</th>
                    <th className="p-2 border-r border-stone-300">Class</th>
                    <th className="p-2 border-r border-stone-300">Key Significations</th>
                    <th className="p-2">Karaka</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  {([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as HouseNumber[]).map((hNum) => {
                    const h = HOUSES_DATA[hNum];
                    return (
                      <tr key={hNum} className="hover:bg-amber-50/50">
                        <td className="p-2 font-bold border-r border-stone-200">{getOrdinal(hNum)} H</td>
                        <td className="p-2 font-vedic font-semibold border-r border-stone-200">{h.sanskritName}</td>
                        <td className="p-2 text-stone-600 border-r border-stone-200">{h.svgRegion}</td>
                        <td className="p-2 text-stone-600 border-r border-stone-200">{h.classification.category}</td>
                        <td className="p-2 text-stone-800 border-r border-stone-200">{h.keySignifications.slice(0, 3).join(', ')}</td>
                        <td className="p-2 font-semibold text-stone-700">{h.karakas.join(', ')}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* 9 Navagraha Quick Cheat Sheet */}
          <div className="space-y-2 pt-2 border-t border-stone-200">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-800">9 Navagrahas, Gemstones & Beej Mantras:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              {(Object.keys(PLANETS_DATA) as PlanetId[]).map((pId) => {
                const p = PLANETS_DATA[pId];
                return (
                  <div key={pId} className="p-2.5 rounded-lg border border-stone-200 bg-stone-50 space-y-1">
                    <div className="flex items-center justify-between font-bold">
                      <span>{p.avatar} {p.name} ({p.sanskritName.split(' ')[0]})</span>
                      <span className="text-[10px] text-stone-500">{p.dayOfWeek}</span>
                    </div>
                    <p className="text-[11px] text-stone-600 font-mono">{p.beejMantra}</p>
                    <div className="text-[10.5px] text-stone-500 flex justify-between">
                      <span>Gem: <strong>{p.gemstone}</strong></span>
                      <span>Metal: <strong>{p.metal}</strong></span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Printable Sheet Footer */}
          <div className="pt-3 border-t border-stone-300 flex items-center justify-between text-[11px] text-stone-500">
            <span>goodastrology • Vedic Astrology Reference</span>
            <span className="font-semibold text-stone-700">12 Bhavas & Navagrahas Guide</span>
          </div>

        </div>

      </div>
    </div>
  );
};
