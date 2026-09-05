import React, { useState } from 'react';
import { STANDARD_TIMEZONES } from '../data/worldCitiesData';
import { GoogleMapPicker } from './GoogleMapPicker';

const GOOGLE_MAPS_API_KEY = ((import.meta as unknown as { env?: Record<string, string> }).env?.VITE_GOOGLE_MAPS_API_KEY) || 'AIzaSyDrXLq24kFadSs7FOOwXm7TAggOAgicDO8';

interface WorldCoordinateMapProps {
  latitude: number;
  longitude: number;
  timezoneOffset: number;
  cityName?: string;
  onChange: (updates: { latitude: number; longitude: number; timezoneOffset: number; cityName?: string }) => void;
}

export const WorldCoordinateMap: React.FC<WorldCoordinateMapProps> = ({
  latitude,
  longitude,
  timezoneOffset,
  cityName,
  onChange,
}) => {
  const [inputMode, setInputMode] = useState<'decimal' | 'dms'>('decimal');

  // DMS state for editing
  const [latDeg, setLatDeg] = useState(() => Math.floor(Math.abs(latitude)));
  const [latMin, setLatMin] = useState(() => Math.floor((Math.abs(latitude) - Math.floor(Math.abs(latitude))) * 60));
  const [latDir, setLatDir] = useState<'N' | 'S'>(() => (latitude >= 0 ? 'N' : 'S'));

  const [lngDeg, setLngDeg] = useState(() => Math.floor(Math.abs(longitude)));
  const [lngMin, setLngMin] = useState(() => Math.floor((Math.abs(longitude) - Math.floor(Math.abs(longitude))) * 60));
  const [lngDir, setLngDir] = useState<'E' | 'W'>(() => (longitude >= 0 ? 'E' : 'W'));

  const applyDms = () => {
    const decLat = (latDeg + latMin / 60) * (latDir === 'S' ? -1 : 1);
    const decLng = (lngDeg + lngMin / 60) * (lngDir === 'W' ? -1 : 1);
    onChange({
      latitude: Math.round(decLat * 10000) / 10000,
      longitude: Math.round(decLng * 10000) / 10000,
      timezoneOffset,
      cityName: cityName || 'Custom Coordinates',
    });
  };

  return (
    <div className="space-y-4">
      {/* Google Maps Interactive Picker with integrated layer controls, Decimal/Degree toggle & GPS */}
      <GoogleMapPicker
        apiKey={GOOGLE_MAPS_API_KEY}
        latitude={latitude}
        longitude={longitude}
        timezoneOffset={timezoneOffset}
        cityName={cityName}
        onChange={onChange}
        inputMode={inputMode}
        onInputModeChange={setInputMode}
      />

      {/* Manual Coordinates Input Form */}
      {inputMode === 'decimal' ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <label className="block font-semibold text-stone-700 mb-1 flex items-center justify-between">
              <span>Latitude (Decimal)</span>
              <span className="text-[10px] text-stone-400 font-mono">-90° to +90°</span>
            </label>
            <div className="flex gap-1">
              <input
                type="number"
                step="0.0001"
                min="-90"
                max="90"
                value={latitude}
                onChange={(e) => {
                  const val = parseFloat(e.target.value) || 0;
                  onChange({ latitude: val, longitude, timezoneOffset, cityName: cityName || 'Custom Coordinates' });
                }}
                className="w-full h-9 px-3 rounded-lg border border-stone-300 bg-white text-xs font-mono focus:border-amber-700 focus:ring-1 focus:ring-amber-700"
              />
              <span className="px-2 py-1.5 bg-stone-200 text-stone-700 rounded-lg text-xs font-bold self-center">
                {latitude >= 0 ? 'N' : 'S'}
              </span>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-stone-700 mb-1 flex items-center justify-between">
              <span>Longitude (Decimal)</span>
              <span className="text-[10px] text-stone-400 font-mono">-180° to +180°</span>
            </label>
            <div className="flex gap-1">
              <input
                type="number"
                step="0.0001"
                min="-180"
                max="180"
                value={longitude}
                onChange={(e) => {
                  const val = parseFloat(e.target.value) || 0;
                  onChange({ latitude, longitude: val, timezoneOffset, cityName: cityName || 'Custom Coordinates' });
                }}
                className="w-full h-9 px-3 rounded-lg border border-stone-300 bg-white text-xs font-mono focus:border-amber-700 focus:ring-1 focus:ring-amber-700"
              />
              <span className="px-2 py-1.5 bg-stone-200 text-stone-700 rounded-lg text-xs font-bold self-center">
                {longitude >= 0 ? 'E' : 'W'}
              </span>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-stone-700 mb-1 flex items-center justify-between">
              <span>Timezone (UTC Offset)</span>
              <span className="text-[10px] text-stone-400 font-mono">Hours</span>
            </label>
            <select
              value={timezoneOffset}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                onChange({ latitude, longitude, timezoneOffset: val, cityName });
              }}
              className="w-full h-9 px-2 rounded-lg border border-stone-300 bg-white text-xs font-medium focus:border-amber-700 focus:ring-1 focus:ring-amber-700 truncate"
            >
              {STANDARD_TIMEZONES.map((tz) => (
                <option key={tz.label} value={tz.value}>
                  {tz.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      ) : (
        /* DMS Mode */
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {/* Latitude DMS */}
            <div className="p-3 bg-white rounded-xl border border-stone-200 space-y-2">
              <span className="font-semibold text-stone-800 block">Latitude (Deg/Min/Direction)</span>
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  min="0"
                  max="90"
                  value={latDeg}
                  onChange={(e) => setLatDeg(parseInt(e.target.value) || 0)}
                  placeholder="Deg"
                  className="w-16 h-8 px-2 rounded border border-stone-300 text-xs font-mono"
                />
                <span>°</span>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={latMin}
                  onChange={(e) => setLatMin(parseInt(e.target.value) || 0)}
                  placeholder="Min"
                  className="w-16 h-8 px-2 rounded border border-stone-300 text-xs font-mono"
                />
                <span>'</span>
                <select
                  value={latDir}
                  onChange={(e) => setLatDir(e.target.value as 'N' | 'S')}
                  className="h-8 px-2 rounded border border-stone-300 font-bold text-xs"
                >
                  <option value="N">North (N)</option>
                  <option value="S">South (S)</option>
                </select>
              </div>
            </div>

            {/* Longitude DMS */}
            <div className="p-3 bg-white rounded-xl border border-stone-200 space-y-2">
              <span className="font-semibold text-stone-800 block">Longitude (Deg/Min/Direction)</span>
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  min="0"
                  max="180"
                  value={lngDeg}
                  onChange={(e) => setLngDeg(parseInt(e.target.value) || 0)}
                  placeholder="Deg"
                  className="w-16 h-8 px-2 rounded border border-stone-300 text-xs font-mono"
                />
                <span>°</span>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={lngMin}
                  onChange={(e) => setLngMin(parseInt(e.target.value) || 0)}
                  placeholder="Min"
                  className="w-16 h-8 px-2 rounded border border-stone-300 text-xs font-mono"
                />
                <span>'</span>
                <select
                  value={lngDir}
                  onChange={(e) => setLngDir(e.target.value as 'E' | 'W')}
                  className="h-8 px-2 rounded border border-stone-300 font-bold text-xs"
                >
                  <option value="E">East (E)</option>
                  <option value="W">West (W)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={applyDms}
              className="px-3 py-1.5 rounded-lg bg-amber-900 hover:bg-amber-800 text-amber-50 text-xs font-semibold"
            >
              Apply DMS Coordinates
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
