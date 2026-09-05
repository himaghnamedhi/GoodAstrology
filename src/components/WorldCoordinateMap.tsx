import React, { useState } from 'react';
import { MapPin, Navigation, Globe, Compass, Check, AlertCircle } from 'lucide-react';
import { STANDARD_TIMEZONES, formatCoordinates } from '../data/worldCitiesData';

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
  const [isLocating, setIsLocating] = useState(false);
  const [geoError, setGeoError] = useState<string | null>(null);
  const [geoSuccess, setGeoSuccess] = useState<boolean>(false);
  const [inputMode, setInputMode] = useState<'decimal' | 'dms'>('decimal');

  // DMS state for editing
  const [latDeg, setLatDeg] = useState(() => Math.floor(Math.abs(latitude)));
  const [latMin, setLatMin] = useState(() => Math.floor((Math.abs(latitude) - Math.floor(Math.abs(latitude))) * 60));
  const [latDir, setLatDir] = useState<'N' | 'S'>(() => (latitude >= 0 ? 'N' : 'S'));

  const [lngDeg, setLngDeg] = useState(() => Math.floor(Math.abs(longitude)));
  const [lngMin, setLngMin] = useState(() => Math.floor((Math.abs(longitude) - Math.floor(Math.abs(longitude))) * 60));
  const [lngDir, setLngDir] = useState<'E' | 'W'>(() => (longitude >= 0 ? 'E' : 'W'));

  // Calculate pixel position on 360x180 Equirectangular map projection
  // Longitude ranges -180 to +180 -> X: 0 to 100%
  // Latitude ranges +90 to -90 -> Y: 0 to 100%
  const pinX = ((longitude + 180) / 360) * 100;
  const pinY = ((90 - latitude) / 180) * 100;

  // Handle map click to set coordinates
  const handleMapClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const pctX = clickX / rect.width;
    const pctY = clickY / rect.height;

    const newLng = Math.round((pctX * 360 - 180) * 10000) / 10000;
    const newLat = Math.round((90 - pctY * 180) * 10000) / 10000;

    // Approximate timezone from longitude (15 degrees per hour)
    const approxTz = Math.round((newLng / 15) * 2) / 2;

    onChange({
      latitude: newLat,
      longitude: newLng,
      timezoneOffset: approxTz,
      cityName: `Pinpoint (${Math.abs(newLat).toFixed(2)}°${newLat >= 0 ? 'N' : 'S'}, ${Math.abs(newLng).toFixed(2)}°${newLng >= 0 ? 'E' : 'W'})`,
    });
  };

  // Browser Geolocation
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setGeoError('Geolocation is not supported by your browser');
      return;
    }

    setIsLocating(true);
    setGeoError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsLocating(false);
        const lat = Math.round(position.coords.latitude * 10000) / 10000;
        const lng = Math.round(position.coords.longitude * 10000) / 10000;
        
        // Approximate local timezone offset in hours
        const tzMinutes = -new Date().getTimezoneOffset();
        const tzHours = tzMinutes / 60;

        onChange({
          latitude: lat,
          longitude: lng,
          timezoneOffset: tzHours,
          cityName: 'Current Device Location',
        });
        setGeoSuccess(true);
        setTimeout(() => setGeoSuccess(false), 3000);
      },
      (error) => {
        setIsLocating(false);
        setGeoError(error.message || 'Unable to retrieve location');
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

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
    <div className="bg-stone-50 rounded-2xl border border-stone-200 p-4 sm:p-5 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200/80 pb-3">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-amber-800" />
          <h3 className="text-sm font-bold text-stone-900 font-vedic">
            World Geographic Map &amp; Custom Coordinates
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleGetLocation}
            disabled={isLocating}
            className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-stone-100 text-stone-700 border border-stone-300 text-xs font-medium flex items-center gap-1.5 transition-colors shadow-2xs"
            title="Detect device GPS coordinates"
          >
            <Navigation className={`w-3.5 h-3.5 ${isLocating ? 'animate-spin text-amber-700' : 'text-amber-800'}`} />
            <span>{isLocating ? 'Detecting GPS...' : 'Use GPS'}</span>
          </button>

          <div className="flex items-center bg-stone-200 p-0.5 rounded-lg text-[11px] font-medium">
            <button
              type="button"
              onClick={() => setInputMode('decimal')}
              className={`px-2 py-0.5 rounded-md transition-all ${
                inputMode === 'decimal' ? 'bg-white text-stone-900 font-bold shadow-2xs' : 'text-stone-600'
              }`}
            >
              Decimal
            </button>
            <button
              type="button"
              onClick={() => setInputMode('dms')}
              className={`px-2 py-0.5 rounded-md transition-all ${
                inputMode === 'dms' ? 'bg-white text-stone-900 font-bold shadow-2xs' : 'text-stone-600'
              }`}
            >
              Deg/Min (DMS)
            </button>
          </div>
        </div>
      </div>

      {geoSuccess && (
        <div className="p-2 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs flex items-center gap-2">
          <Check className="w-3.5 h-3.5 shrink-0" />
          <span>Device location successfully acquired! Coordinates updated.</span>
        </div>
      )}

      {geoError && (
        <div className="p-2 rounded-lg bg-rose-50 text-rose-800 border border-rose-200 text-xs flex items-center gap-2">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>GPS notice: {geoError}. You can click anywhere on the world map or enter coordinates manually.</span>
        </div>
      )}

      {/* World Map SVG Canvas with click-to-pinpoint */}
      <div className="relative rounded-xl overflow-hidden border border-stone-300 bg-[#1e293b] shadow-inner select-none">
        <svg
          viewBox="0 0 720 360"
          className="w-full h-44 sm:h-52 cursor-crosshair block"
          onClick={handleMapClick}
          title="Click anywhere on the world map to set birthplace coordinates"
        >
          {/* Graticule / Coordinate Grid Lines */}
          <defs>
            <pattern id="coordGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#334155" strokeWidth="0.5" strokeDasharray="2,2" />
            </pattern>
          </defs>
          <rect width="720" height="360" fill="#0f172a" />
          <rect width="720" height="360" fill="url(#coordGrid)" />

          {/* Equator (0° Lat) */}
          <line x1="0" y1="180" x2="720" y2="180" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4,4" opacity="0.6" />
          {/* Prime Meridian (0° Long) */}
          <line x1="360" y1="0" x2="360" y2="360" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4,4" opacity="0.6" />

          {/* Simplified Continental Outlines */}
          {/* North America */}
          <path
            d="M 60 70 L 120 50 L 190 60 L 230 110 L 200 130 L 170 170 L 190 200 L 160 210 L 130 150 L 70 120 Z"
            fill="#334155"
            stroke="#475569"
            strokeWidth="0.8"
          />
          {/* South America */}
          <path
            d="M 180 210 L 240 220 L 270 270 L 230 330 L 200 320 L 180 240 Z"
            fill="#334155"
            stroke="#475569"
            strokeWidth="0.8"
          />
          {/* Europe */}
          <path
            d="M 340 70 L 410 65 L 430 110 L 380 130 L 330 120 L 340 85 Z"
            fill="#334155"
            stroke="#475569"
            strokeWidth="0.8"
          />
          {/* Africa */}
          <path
            d="M 330 130 L 410 130 L 450 190 L 420 280 L 370 290 L 330 200 Z"
            fill="#334155"
            stroke="#475569"
            strokeWidth="0.8"
          />
          {/* Asia */}
          <path
            d="M 420 60 L 610 60 L 630 140 L 550 180 L 480 190 L 430 130 Z"
            fill="#334155"
            stroke="#475569"
            strokeWidth="0.8"
          />
          {/* Indian Subcontinent Focus */}
          <path
            d="M 470 130 L 515 135 L 530 180 L 505 215 L 480 175 Z"
            fill="#475569"
            stroke="#f59e0b"
            strokeWidth="0.9"
            opacity="0.9"
          />
          {/* Australia */}
          <path
            d="M 580 240 L 650 240 L 660 290 L 590 295 Z"
            fill="#334155"
            stroke="#475569"
            strokeWidth="0.8"
          />

          {/* Grid Labels */}
          <text x="365" y="15" fill="#94a3b8" fontSize="9" fontFamily="monospace">0° Prime Meridian (Greenwich)</text>
          <text x="10" y="176" fill="#f59e0b" fontSize="9" fontFamily="monospace">0° Equator</text>
          <text x="495" y="150" fill="#fef3c7" fontSize="8" fontWeight="bold">India</text>
          <text x="110" y="100" fill="#cbd5e1" fontSize="8">USA</text>
          <text x="355" y="90" fill="#cbd5e1" fontSize="8">Europe</text>
          <text x="365" y="210" fill="#cbd5e1" fontSize="8">Africa</text>
          <text x="590" y="270" fill="#cbd5e1" fontSize="8">Australia</text>

          {/* Interactive User Location Pin */}
          <g transform={`translate(${pinX * 7.2}, ${pinY * 3.6})`}>
            {/* Radar Pulsing rings */}
            <circle r="14" fill="none" stroke="#f59e0b" strokeWidth="1" opacity="0.4" className="animate-ping" />
            <circle r="7" fill="#f59e0b" opacity="0.7" />
            <circle r="3.5" fill="#ffffff" />
            {/* Crosshair lines */}
            <line x1="-12" y1="0" x2="12" y2="0" stroke="#fef08a" strokeWidth="1" />
            <line x1="0" y1="-12" x2="0" y2="12" stroke="#fef08a" strokeWidth="1" />
          </g>
        </svg>

        {/* Map Legend Overlay */}
        <div className="absolute bottom-2 left-2 px-2 py-1 rounded bg-stone-900/80 backdrop-blur-xs text-[10px] text-stone-300 font-mono flex items-center gap-2 border border-stone-700/50">
          <span className="w-2 h-2 rounded-full bg-amber-400 inline-block animate-pulse"></span>
          <span>Click map to relocate pin</span>
        </div>

        <div className="absolute top-2 right-2 px-2 py-1 rounded bg-stone-900/80 backdrop-blur-xs text-[10px] text-amber-200 font-mono border border-stone-700/50">
          {formatCoordinates(latitude, longitude)}
        </div>
      </div>

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
