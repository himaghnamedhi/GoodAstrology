import React, { useEffect, useState, useCallback } from 'react';
import { 
  APIProvider, 
  Map, 
  AdvancedMarker, 
  Pin, 
  useMap, 
  useMapsLibrary,
  MapMouseEvent
} from '@vis.gl/react-google-maps';
import { 
  Navigation, 
  MapPin, 
  Search, 
  Layers, 
  Check, 
  Compass, 
  Crosshair,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { WORLD_CITIES, WorldCity, findClosestCity } from '../data/worldCitiesData';

interface GoogleMapPickerProps {
  apiKey: string;
  latitude: number;
  longitude: number;
  timezoneOffset: number;
  cityName?: string;
  onChange: (updates: { latitude: number; longitude: number; timezoneOffset: number; cityName?: string }) => void;
  inputMode?: 'decimal' | 'dms';
  onInputModeChange?: (mode: 'decimal' | 'dms') => void;
}

// Controller component to smoothly pan/zoom map when coordinates change
const MapPanController: React.FC<{ lat: number; lng: number }> = ({ lat, lng }) => {
  const map = useMap();
  useEffect(() => {
    if (!map) return;
    map.panTo({ lat, lng });
  }, [map, lat, lng]);
  return null;
};

// Internal Map Content using Google Maps hooks
const GoogleMapInner: React.FC<GoogleMapPickerProps> = ({
  latitude,
  longitude,
  timezoneOffset,
  cityName,
  onChange,
  inputMode = 'decimal',
  onInputModeChange,
}) => {
  const map = useMap();
  const geocodingLib = useMapsLibrary('geocoding');
  const [geocoder, setGeocoder] = useState<google.maps.Geocoder | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [mapType, setMapType] = useState<'roadmap' | 'satellite' | 'terrain' | 'hybrid'>('roadmap');
  const [isLocating, setIsLocating] = useState(false);
  const [closestInfo, setClosestInfo] = useState<{ city: WorldCity; distanceKm: number } | null>(() => 
    findClosestCity(latitude, longitude)
  );

  // Initialize geocoder when library loads
  useEffect(() => {
    if (geocodingLib && !geocoder) {
      setGeocoder(new geocodingLib.Geocoder());
    }
  }, [geocodingLib, geocoder]);

  // Update closest city info when coordinates change
  useEffect(() => {
    setClosestInfo(findClosestCity(latitude, longitude));
  }, [latitude, longitude]);

  // Change map type
  const handleMapTypeChange = (type: 'roadmap' | 'satellite' | 'terrain' | 'hybrid') => {
    setMapType(type);
    if (map) {
      map.setMapTypeId(type);
    }
  };

  // Perform reverse geocoding to retrieve readable address/city
  const handleLocationSelected = useCallback((lat: number, lng: number) => {
    const roundedLat = Math.round(lat * 10000) / 10000;
    const roundedLng = Math.round(lng * 10000) / 10000;

    // Check closest city in our comprehensive database first
    const closest = findClosestCity(roundedLat, roundedLng);
    setClosestInfo(closest);

    // Calculate approximate timezone offset (+5.5 for India boundary roughly 68°E to 98°E, 6°N to 38°N)
    let calculatedTz = timezoneOffset;
    if (roundedLat >= 6 && roundedLat <= 37.5 && roundedLng >= 68 && roundedLng <= 97.5) {
      calculatedTz = 5.5; // Indian Standard Time (IST)
    } else {
      calculatedTz = Math.round((roundedLng / 15) * 2) / 2;
    }

    let resolvedName = closest 
      ? `${closest.city.name} (${closest.distanceKm < 2 ? 'Exact' : `~${closest.distanceKm}km`})`
      : `Coordinates (${roundedLat.toFixed(2)}°N, ${roundedLng.toFixed(2)}°E)`;

    // Try reverse geocoding via Google Maps JS API for maximum precision
    if (geocoder) {
      geocoder.geocode({ location: { lat: roundedLat, lng: roundedLng } }, (results, status) => {
        if (status === 'OK' && results && results[0]) {
          // Extract locality or administrative_area_level_2 or formatted address
          const comp = results[0].address_components;
          const locality = comp.find(c => c.types.includes('locality'))?.long_name;
          const admin2 = comp.find(c => c.types.includes('administrative_area_level_2'))?.long_name;
          const state = comp.find(c => c.types.includes('administrative_area_level_1'))?.long_name;
          const country = comp.find(c => c.types.includes('country'))?.long_name;

          let placeTitle = locality || admin2;
          if (placeTitle && state) {
            placeTitle = `${placeTitle}, ${state}`;
          } else if (results[0].formatted_address) {
            const parts = results[0].formatted_address.split(',');
            placeTitle = parts.slice(0, 2).join(',').trim();
          }

          if (placeTitle) {
            onChange({
              latitude: roundedLat,
              longitude: roundedLng,
              timezoneOffset: calculatedTz,
              cityName: placeTitle,
            });
            return;
          }
        }

        // Fallback to closest local city if geocoding didn't extract a name
        onChange({
          latitude: roundedLat,
          longitude: roundedLng,
          timezoneOffset: calculatedTz,
          cityName: resolvedName,
        });
      });
    } else {
      onChange({
        latitude: roundedLat,
        longitude: roundedLng,
        timezoneOffset: calculatedTz,
        cityName: resolvedName,
      });
    }
  }, [geocoder, timezoneOffset, onChange]);

  // Click on Google Map to place/relocate pin
  const handleMapClick = (ev: MapMouseEvent) => {
    if (ev.detail.latLng) {
      handleLocationSelected(ev.detail.latLng.lat, ev.detail.latLng.lng);
    }
  };

  // Drag marker to new pinpoint
  const handleMarkerDragEnd = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      handleLocationSelected(e.latLng.lat(), e.latLng.lng());
    }
  };

  // Search for city/place using Google Geocoder or local index
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const q = searchQuery.toLowerCase().trim();
    // Check local database first
    const matched = WORLD_CITIES.find(c => 
      c.name.toLowerCase().includes(q) || 
      (c.stateOrRegion && c.stateOrRegion.toLowerCase().includes(q))
    );

    if (matched) {
      handleLocationSelected(matched.lat, matched.lng);
      if (map) {
        map.panTo({ lat: matched.lat, lng: matched.lng });
        map.setZoom(12);
      }
      return;
    }

    // Geocode with Google
    if (geocoder) {
      geocoder.geocode({ address: searchQuery }, (results, status) => {
        if (status === 'OK' && results && results[0]) {
          const loc = results[0].geometry.location;
          handleLocationSelected(loc.lat(), loc.lng());
          if (map) {
            map.panTo(loc);
            map.setZoom(12);
          }
        }
      });
    }
  };

  // Device GPS
  const handleDeviceGPS = () => {
    if (!navigator.geolocation) return;
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsLocating(false);
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        handleLocationSelected(lat, lng);
        if (map) {
          map.panTo({ lat, lng });
          map.setZoom(13);
        }
      },
      () => {
        setIsLocating(false);
      },
      { timeout: 8000, enableHighAccuracy: true }
    );
  };

  // Quick jump presets
  const quickJumpPresets = [
    { label: 'Nalbari, Assam', lat: 26.4449, lng: 91.4429 },
    { label: 'Dibrugarh, Assam', lat: 27.4728, lng: 94.9120 },
    { label: 'Guwahati, Assam', lat: 26.1445, lng: 91.7362 },
    { label: 'Jorhat, Assam', lat: 26.7509, lng: 94.2037 },
    { label: 'Tezpur, Assam', lat: 26.6528, lng: 92.7926 },
    { label: 'Silchar, Assam', lat: 24.8170, lng: 92.7950 },
    { label: 'New Delhi', lat: 28.6139, lng: 77.2090 },
    { label: 'Mumbai', lat: 19.0760, lng: 72.8777 },
    { label: 'Kolkata', lat: 22.5726, lng: 88.3639 },
    { label: 'Bengaluru', lat: 12.9716, lng: 77.5946 },
  ];

  return (
    <div className="space-y-3">
      {/* Search Bar & Layer Controls */}
      <div className="flex flex-col md:flex-row gap-2 items-stretch md:items-center justify-between">
        <form onSubmit={handleSearchSubmit} className="relative flex-1 min-w-[200px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search city or town in Google Maps (e.g. Nalbari, Dibrugarh, Guwahati)..."
            className="w-full pl-9 pr-20 py-1.5 rounded-xl border border-stone-300 bg-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-2xs"
          />
          <button
            type="submit"
            className="absolute right-1 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-amber-900 hover:bg-amber-800 text-amber-50 text-[11px] font-bold cursor-pointer"
          >
            Locate
          </button>
        </form>

        {/* Map Layer Switcher, GPS, and Coordinate Mode moved below it */}
        <div className="flex flex-col items-start sm:items-end gap-1.5 shrink-0">
          <div className="flex items-center gap-1.5">
            {/* Map Layer: Roadmap | Satellite | Terrain */}
            <div className="flex items-center bg-stone-200/80 p-0.5 rounded-xl text-[11px] font-medium border border-stone-300">
              {(['roadmap', 'satellite', 'terrain'] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => handleMapTypeChange(t)}
                  className={`px-2 sm:px-2.5 py-1 rounded-lg capitalize transition-all cursor-pointer ${
                    mapType === t
                      ? 'bg-white text-stone-900 font-bold shadow-2xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* GPS Button */}
            <button
              type="button"
              onClick={handleDeviceGPS}
              disabled={isLocating}
              className="px-2.5 py-1 rounded-xl bg-white hover:bg-stone-100 text-stone-700 border border-stone-300 text-[11px] font-semibold flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer shrink-0"
              title="Locate via device GPS"
            >
              <Navigation className={`w-3.5 h-3.5 ${isLocating ? 'animate-spin text-amber-700' : 'text-amber-800'}`} />
              <span>GPS</span>
            </button>
          </div>

          {/* Coordinate Format: Decimal | Degree moved below Map Layer switcher */}
          {onInputModeChange && (
            <div className="flex items-center gap-1.5 self-start sm:self-end">
              <span className="text-[10px] text-stone-500 font-semibold uppercase tracking-wider">Format:</span>
              <div className="flex items-center bg-stone-200/80 p-0.5 rounded-xl text-[11px] font-medium border border-stone-300">
                <button
                  type="button"
                  onClick={() => onInputModeChange('decimal')}
                  className={`px-2 sm:px-2.5 py-0.5 rounded-lg transition-all cursor-pointer ${
                    inputMode === 'decimal'
                      ? 'bg-white text-stone-900 font-bold shadow-2xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                  title="Decimal coordinates (e.g. 26.1445° N, 91.4429° E)"
                >
                  Decimal
                </button>
                <button
                  type="button"
                  onClick={() => onInputModeChange('dms')}
                  className={`px-2 sm:px-2.5 py-0.5 rounded-lg transition-all cursor-pointer ${
                    inputMode === 'dms'
                      ? 'bg-white text-stone-900 font-bold shadow-2xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                  title="Degree and Minutes coordinates (DMS)"
                >
                  Degree
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Jump Buttons */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] no-scrollbar">
        <span className="text-stone-500 font-semibold shrink-0 text-[10px] uppercase tracking-wider flex items-center gap-1">
          <MapPin className="w-3 h-3 text-amber-800" />
          Quick Jump:
        </span>
        {quickJumpPresets.map((preset) => (
          <button
            key={preset.label}
            type="button"
            onClick={() => {
              handleLocationSelected(preset.lat, preset.lng);
              if (map) {
                map.panTo({ lat: preset.lat, lng: preset.lng });
                map.setZoom(11);
              }
            }}
            className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-amber-100 hover:text-amber-900 text-stone-700 border border-stone-200 text-xs whitespace-nowrap font-medium transition-colors cursor-pointer shrink-0"
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Google Map Container */}
      <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-stone-300 shadow-md">
        <Map
          style={{ width: '100%', height: '100%' }}
          defaultCenter={{ lat: latitude, lng: longitude }}
          defaultZoom={10}
          gestureHandling="greedy"
          disableDefaultUI={false}
          mapId="DEMO_MAP_ID"
          internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
          onClick={handleMapClick}
        >
          <MapPanController lat={latitude} lng={longitude} />

          <AdvancedMarker
            position={{ lat: latitude, lng: longitude }}
            draggable={true}
            onDragEnd={handleMarkerDragEnd}
            title="Exact Birth Location (Drag to adjust)"
          >
            <Pin
              background="#854d0e"
              borderColor="#451a03"
              glyphColor="#fef08a"
              scale={1.2}
            />
          </AdvancedMarker>
        </Map>

        {/* Floating Coordinates & Nearest City Card */}
        <div className="absolute top-3 left-3 bg-stone-950/85 backdrop-blur-md text-amber-50 px-3 py-2 rounded-xl shadow-lg border border-amber-500/30 text-xs space-y-1 max-w-xs pointer-events-none">
          <div className="flex items-center gap-1.5 font-bold text-amber-300">
            <Crosshair className="w-3.5 h-3.5 animate-pulse text-amber-400" />
            <span>{cityName || 'Selected Pinpoint'}</span>
          </div>
          <div className="font-mono text-[11px] text-stone-300">
            {latitude.toFixed(4)}°N, {longitude.toFixed(4)}°E
          </div>
          {closestInfo && (
            <div className="text-[10px] text-amber-200/90 pt-0.5 border-t border-stone-700">
              Nearest: <strong className="text-white">{closestInfo.city.name}</strong> (~{closestInfo.distanceKm} km away)
            </div>
          )}
        </div>

        {/* Bottom instruction hint */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-stone-900/80 backdrop-blur-xs text-stone-200 px-3 py-1 rounded-full text-[11px] border border-stone-700 shadow-sm pointer-events-none flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-amber-400 inline-block"></span>
          <span>Click anywhere on Google Maps or drag the gold pin to relocate</span>
        </div>
      </div>
    </div>
  );
};

export const GoogleMapPicker: React.FC<GoogleMapPickerProps> = (props) => {
  return (
    <APIProvider apiKey={props.apiKey} solutionChannel="GMP_aistudio_v1">
      <GoogleMapInner {...props} />
    </APIProvider>
  );
};
