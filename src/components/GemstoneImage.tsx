import React from 'react';

interface GemstoneImageProps {
  gemId: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
  showShadow?: boolean;
}

export const GemstoneImage: React.FC<GemstoneImageProps> = ({
  gemId,
  size = 'md',
  className = '',
  showShadow = true
}) => {
  const sizeMap = {
    xs: 'w-6 h-6',
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-20 h-20',
    xl: 'w-28 h-28',
    '2xl': 'w-36 h-36'
  };

  const currentSizeClass = sizeMap[size] || sizeMap.md;

  // Render SVG matching the exact cuts and optical characteristics of the gemstone photos
  const renderGemstoneSVG = () => {
    switch (gemId) {
      case 'yellow_sapphire':
        // User Image 1: Oval brilliant faceted golden yellow sapphire with glowing yellow reflection
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="ys-body" x1="20" y1="20" x2="180" y2="180" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FFF275" />
                <stop offset="35%" stopColor="#FACC15" />
                <stop offset="70%" stopColor="#EAB308" />
                <stop offset="100%" stopColor="#CA8A04" />
              </linearGradient>
              <linearGradient id="ys-table" x1="60" y1="55" x2="140" y2="145" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FEF08A" />
                <stop offset="60%" stopColor="#FDE047" />
                <stop offset="100%" stopColor="#F59E0B" />
              </linearGradient>
              <linearGradient id="ys-shadow" x1="100" y1="160" x2="100" y2="195" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#CA8A04" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#CA8A04" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Cast Glow Shadow */}
            <ellipse cx="100" cy="175" rx="65" ry="16" fill="url(#ys-shadow)" />
            {/* Main Oval Girdle */}
            <ellipse cx="100" cy="96" rx="84" ry="68" fill="url(#ys-body)" stroke="#A16207" strokeWidth="2" />
            {/* Outer Facets */}
            <polygon points="100,28 135,42 120,68 80,68 65,42" fill="#FDE047" fillOpacity="0.8" stroke="#B45309" strokeWidth="1" />
            <polygon points="135,42 172,66 148,88 120,68" fill="#FBBF24" stroke="#B45309" strokeWidth="1" />
            <polygon points="172,66 184,96 156,104 148,88" fill="#D97706" stroke="#B45309" strokeWidth="1" />
            <polygon points="184,96 172,126 148,104 156,104" fill="#B45309" stroke="#92400E" strokeWidth="1" />
            <polygon points="172,126 135,150 120,124 148,104" fill="#F59E0B" stroke="#B45309" strokeWidth="1" />
            <polygon points="135,150 100,164 80,124 120,124" fill="#D97706" stroke="#92400E" strokeWidth="1" />
            <polygon points="100,164 65,150 80,124" fill="#B45309" stroke="#92400E" strokeWidth="1" />
            <polygon points="65,150 28,126 52,104 80,124" fill="#F59E0B" stroke="#B45309" strokeWidth="1" />
            <polygon points="28,126 16,96 44,104 52,104" fill="#D97706" stroke="#92400E" strokeWidth="1" />
            <polygon points="16,96 28,66 52,88 44,104" fill="#FBBF24" stroke="#B45309" strokeWidth="1" />
            <polygon points="28,66 65,42 80,68 52,88" fill="#FDE047" fillOpacity="0.9" stroke="#B45309" strokeWidth="1" />
            {/* Inner Table Facet & Brilliance */}
            <polygon points="80,68 120,68 148,88 148,104 120,124 80,124 52,104 52,88" fill="url(#ys-table)" stroke="#D97706" strokeWidth="1.5" />
            <polygon points="80,68 120,68 100,96" fill="#FEF9C3" fillOpacity="0.75" />
            <polygon points="120,68 148,88 100,96" fill="#FEF08A" fillOpacity="0.6" />
            <polygon points="148,88 148,104 100,96" fill="#FDE047" fillOpacity="0.5" />
            <polygon points="148,104 120,124 100,96" fill="#F59E0B" fillOpacity="0.7" />
            <polygon points="120,124 80,124 100,96" fill="#EAB308" fillOpacity="0.7" />
            <polygon points="80,124 52,104 100,96" fill="#F59E0B" fillOpacity="0.6" />
            <polygon points="52,104 52,88 100,96" fill="#FEF08A" fillOpacity="0.7" />
            <polygon points="52,88 80,68 100,96" fill="#FEF9C3" fillOpacity="0.8" />
            {/* Radiant Sparkle Highlights */}
            <circle cx="75" cy="72" r="3" fill="#FFFFFF" fillOpacity="0.9" />
            <line x1="75" y1="65" x2="75" y2="79" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="68" y1="72" x2="82" y2="72" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        );

      case 'ruby':
        // User Image 2: Round brilliant faceted crimson / pigeon-blood red ruby with center square table and kaleidoscope facets
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="ruby-core" cx="100" cy="100" r="90" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#EF4444" />
                <stop offset="40%" stopColor="#DC2626" />
                <stop offset="80%" stopColor="#B91C1C" />
                <stop offset="100%" stopColor="#7F1D1D" />
              </radialGradient>
              <linearGradient id="ruby-facet-bright" x1="70" y1="60" x2="130" y2="140" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#F87171" />
                <stop offset="100%" stopColor="#DC2626" />
              </linearGradient>
            </defs>
            {/* Outer Girdle */}
            <circle cx="100" cy="100" r="88" fill="url(#ruby-core)" stroke="#450A0A" strokeWidth="1.5" />
            {/* Outer 16-point Triangular Facets */}
            {Array.from({ length: 16 }).map((_, i) => {
              const angle1 = (i * 22.5 * Math.PI) / 180;
              const angle2 = ((i + 1) * 22.5 * Math.PI) / 180;
              const midAngle = ((i + 0.5) * 22.5 * Math.PI) / 180;
              const rOut = 88;
              const rIn = 62;
              const x1 = 100 + rOut * Math.cos(angle1);
              const y1 = 100 + rOut * Math.sin(angle1);
              const x2 = 100 + rOut * Math.cos(angle2);
              const y2 = 100 + rOut * Math.sin(angle2);
              const xm = 100 + rIn * Math.cos(midAngle);
              const ym = 100 + rIn * Math.sin(midAngle);
              const isBright = i % 2 === 0;
              return (
                <polygon
                  key={`ruby-out-${i}`}
                  points={`${x1},${y1} ${x2},${y2} ${xm},${ym}`}
                  fill={isBright ? '#EF4444' : '#991B1B'}
                  fillOpacity={isBright ? '0.9' : '0.8'}
                  stroke="#450A0A"
                  strokeWidth="0.75"
                />
              );
            })}
            {/* Middle Facet Ring */}
            {Array.from({ length: 8 }).map((_, i) => {
              const angle = (i * 45 * Math.PI) / 180;
              const nextAngle = ((i + 1) * 45 * Math.PI) / 180;
              const rOuter = 62;
              const rInner = 40;
              const x1 = 100 + rOuter * Math.cos(angle);
              const y1 = 100 + rOuter * Math.sin(angle);
              const x2 = 100 + rOuter * Math.cos(nextAngle);
              const y2 = 100 + rOuter * Math.sin(nextAngle);
              const xIn1 = 100 + rInner * Math.cos(angle);
              const yIn1 = 100 + rInner * Math.sin(angle);
              const xIn2 = 100 + rInner * Math.cos(nextAngle);
              const yIn2 = 100 + rInner * Math.sin(nextAngle);
              return (
                <polygon
                  key={`ruby-mid-${i}`}
                  points={`${x1},${y1} ${x2},${y2} ${xIn2},${yIn2} ${xIn1},${yIn1}`}
                  fill={i % 2 === 0 ? 'url(#ruby-facet-bright)' : '#B91C1C'}
                  stroke="#7F1D1D"
                  strokeWidth="0.8"
                />
              );
            })}
            {/* Center Octagon & Diamond Table Facets */}
            <polygon
              points="72,72 128,72 128,128 72,128"
              fill="#DC2626"
              fillOpacity="0.85"
              stroke="#FCA5A5"
              strokeWidth="1.2"
            />
            {/* Center Star / Cross */}
            <polygon points="100,60 128,88 100,100 72,88" fill="#F87171" fillOpacity="0.75" />
            <polygon points="128,88 140,100 128,112 100,100" fill="#EF4444" fillOpacity="0.75" />
            <polygon points="100,100 128,112 100,140 72,112" fill="#991B1B" fillOpacity="0.85" />
            <polygon points="72,88 100,100 72,112 60,100" fill="#EF4444" fillOpacity="0.7" />
            <circle cx="100" cy="100" r="8" fill="#FCA5A5" fillOpacity="0.6" />
          </svg>
        );

      case 'red_coral':
        // User Image 3: Smooth, polished vermilion red oval cabochon with glossy organic highlight
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="coral-radial" cx="38%" cy="32%" r="65%" fx="35%" fy="30%">
                <stop offset="0%" stopColor="#FF4D4D" />
                <stop offset="35%" stopColor="#E61919" />
                <stop offset="70%" stopColor="#B30000" />
                <stop offset="100%" stopColor="#660000" />
              </radialGradient>
              <linearGradient id="coral-shine" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
                <stop offset="40%" stopColor="#FFB3B3" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#FF0000" stopOpacity="0" />
              </linearGradient>
              <filter id="coral-blur">
                <feGaussianBlur stdDeviation="3" />
              </filter>
            </defs>
            {/* Base Coral Oval */}
            <ellipse cx="100" cy="100" rx="60" ry="85" fill="url(#coral-radial)" stroke="#800000" strokeWidth="1.5" />
            {/* Primary Curved Specular Sheen (matching high gloss in user photo) */}
            <path
              d="M75 35 C 65 55, 60 85, 66 120 C 68 135, 72 150, 78 158 C 76 150, 72 130, 72 110 C 72 75, 80 50, 88 40 Z"
              fill="url(#coral-shine)"
              filter="url(#coral-blur)"
            />
            <path
              d="M76 42 C 68 60, 64 88, 68 118 C 70 132, 73 145, 77 150 C 75 142, 72 125, 73 108 C 74 76, 81 52, 86 45 Z"
              fill="#FFFFFF"
              fillOpacity="0.75"
            />
            {/* Secondary Soft Rim Reflection */}
            <ellipse cx="125" cy="125" rx="25" ry="45" fill="#FF8080" fillOpacity="0.15" />
            <circle cx="92" cy="52" r="5" fill="#FFFFFF" fillOpacity="0.6" filter="url(#coral-blur)" />
          </svg>
        );

      case 'blue_sapphire':
        // User Image 4: Cushion/oval faceted deep royal blue sapphire with luminous geometric crystal facets
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="bs-body" x1="10" y1="10" x2="190" y2="190" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="30%" stopColor="#2563EB" />
                <stop offset="70%" stopColor="#1D4ED8" />
                <stop offset="100%" stopColor="#0F172A" />
              </linearGradient>
              <linearGradient id="bs-facet-hi" x1="50" y1="40" x2="150" y2="160" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#E0F2FE" />
                <stop offset="50%" stopColor="#60A5FA" />
                <stop offset="100%" stopColor="#1E40AF" />
              </linearGradient>
            </defs>
            {/* Main Rounded Cushion/Oval Girdle */}
            <rect x="20" y="32" width="160" height="136" rx="60" fill="url(#bs-body)" stroke="#0C4A6E" strokeWidth="2" />
            {/* Outer Step Facets */}
            <polygon points="55,36 145,36 130,64 70,64" fill="#38BDF8" fillOpacity="0.8" stroke="#1E3A8A" strokeWidth="0.8" />
            <polygon points="145,36 175,65 145,90 130,64" fill="#2563EB" stroke="#1E3A8A" strokeWidth="0.8" />
            <polygon points="175,65 178,100 152,100 145,90" fill="#1D4ED8" stroke="#0F172A" strokeWidth="0.8" />
            <polygon points="178,100 175,135 145,110 152,100" fill="#1E40AF" stroke="#0F172A" strokeWidth="0.8" />
            <polygon points="175,135 145,164 130,136 145,110" fill="#1E3A8A" stroke="#0F172A" strokeWidth="0.8" />
            <polygon points="145,164 55,164 70,136 130,136" fill="#172554" stroke="#0F172A" strokeWidth="0.8" />
            <polygon points="55,164 25,135 55,110 70,136" fill="#1E3A8A" stroke="#0F172A" strokeWidth="0.8" />
            <polygon points="25,135 22,100 48,100 55,110" fill="#1E40AF" stroke="#0F172A" strokeWidth="0.8" />
            <polygon points="22,100 25,65 55,90 48,100" fill="#2563EB" stroke="#1E3A8A" strokeWidth="0.8" />
            <polygon points="25,65 55,36 70,64 55,90" fill="#38BDF8" fillOpacity="0.9" stroke="#1E3A8A" strokeWidth="0.8" />
            {/* Center Table & Radiant Star Geometry */}
            <polygon points="70,64 130,64 145,90 145,110 130,136 70,136 55,110 55,90" fill="#1D4ED8" stroke="#60A5FA" strokeWidth="1" />
            {/* Inner Triangular Pavilion Highlights */}
            <polygon points="70,64 100,78 80,100 55,90" fill="#93C5FD" fillOpacity="0.85" />
            <polygon points="130,64 100,78 120,100 145,90" fill="#60A5FA" fillOpacity="0.75" />
            <polygon points="145,90 120,100 145,110" fill="#3B82F6" fillOpacity="0.8" />
            <polygon points="145,110 120,100 100,122 130,136" fill="#1E40AF" fillOpacity="0.8" />
            <polygon points="130,136 100,122 70,136" fill="#172554" fillOpacity="0.9" />
            <polygon points="70,136 100,122 80,100 55,110" fill="#1E3A8A" fillOpacity="0.8" />
            <polygon points="55,110 80,100 55,90" fill="#3B82F6" fillOpacity="0.7" />
            {/* Center Prismatic Diamond */}
            <polygon points="100,78 120,100 100,122 80,100" fill="url(#bs-facet-hi)" stroke="#DBEAFE" strokeWidth="1" />
            <polygon points="100,78 120,100 100,100" fill="#FFFFFF" fillOpacity="0.9" />
          </svg>
        );

      case 'pearl':
        // User Image 5: Lustrous spherical white pearl with soft drop-shadow and iridescent moonlit glow
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="pearl-sphere" cx="42%" cy="38%" r="60%" fx="36%" fy="32%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="25%" stopColor="#F8FAFC" />
                <stop offset="55%" stopColor="#E2E8F0" />
                <stop offset="80%" stopColor="#CBD5E1" />
                <stop offset="95%" stopColor="#94A3B8" />
                <stop offset="100%" stopColor="#64748B" />
              </radialGradient>
              <linearGradient id="pearl-iridescent" x1="30" y1="30" x2="160" y2="160" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FBCFE8" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#BAE6FD" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#FEF08A" stopOpacity="0.2" />
              </linearGradient>
              <radialGradient id="pearl-shadow" cx="100" cy="182" r="55" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#64748B" stopOpacity="0.45" />
                <stop offset="70%" stopColor="#94A3B8" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#CBD5E1" stopOpacity="0" />
              </radialGradient>
              <filter id="pearl-soft">
                <feGaussianBlur stdDeviation="2" />
              </filter>
            </defs>
            {/* Ground Contact Shadow */}
            <ellipse cx="100" cy="178" rx="56" ry="14" fill="url(#pearl-shadow)" />
            {/* Perfect Sphere */}
            <circle cx="100" cy="98" r="74" fill="url(#pearl-sphere)" stroke="#CBD5E1" strokeWidth="1" />
            {/* Iridescent Layer */}
            <circle cx="100" cy="98" r="74" fill="url(#pearl-iridescent)" />
            {/* Specular Glint Highlight */}
            <ellipse cx="72" cy="70" rx="20" ry="12" transform="rotate(-30 72 70)" fill="#FFFFFF" fillOpacity="0.95" filter="url(#pearl-soft)" />
            <circle cx="68" cy="66" r="6" fill="#FFFFFF" />
            {/* Secondary Ambient Rim Bounce */}
            <path
              d="M 52 145 C 75 168, 125 168, 148 145 C 132 156, 90 162, 52 145 Z"
              fill="#FFFFFF"
              fillOpacity="0.4"
            />
          </svg>
        );

      case 'hessonite':
        // User Image 6: Honey-cinnamon / amber-orange oval faceted Gomed with rich fiery inclusions and luster
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="gomed-glow" cx="45%" cy="40%" r="65%">
                <stop offset="0%" stopColor="#FB923C" />
                <stop offset="35%" stopColor="#EA580C" />
                <stop offset="70%" stopColor="#9A3412" />
                <stop offset="100%" stopColor="#431407" />
              </radialGradient>
              <linearGradient id="gomed-facet" x1="40" y1="30" x2="160" y2="170" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FED7AA" />
                <stop offset="50%" stopColor="#F97316" />
                <stop offset="100%" stopColor="#7C2D12" />
              </linearGradient>
            </defs>
            {/* Main Oval Girdle */}
            <ellipse cx="100" cy="100" rx="84" ry="66" fill="url(#gomed-glow)" stroke="#431407" strokeWidth="1.5" />
            {/* Faceted Geometry & Inclusions */}
            <polygon points="100,34 136,48 120,74 80,74 64,48" fill="#FED7AA" fillOpacity="0.8" stroke="#7C2D12" strokeWidth="1" />
            <polygon points="136,48 174,72 150,94 120,74" fill="#FB923C" stroke="#7C2D12" strokeWidth="1" />
            <polygon points="174,72 184,100 156,108 150,94" fill="#EA580C" stroke="#7C2D12" strokeWidth="1" />
            <polygon points="184,100 174,128 150,108 156,108" fill="#9A3412" stroke="#431407" strokeWidth="1" />
            <polygon points="174,128 136,152 120,126 150,108" fill="#C2410C" stroke="#7C2D12" strokeWidth="1" />
            <polygon points="136,152 100,166 80,126 120,126" fill="#9A3412" stroke="#431407" strokeWidth="1" />
            <polygon points="100,166 64,152 80,126" fill="#7C2D12" stroke="#431407" strokeWidth="1" />
            <polygon points="64,152 26,128 50,108 80,126" fill="#C2410C" stroke="#7C2D12" strokeWidth="1" />
            <polygon points="26,128 16,100 44,108 50,108" fill="#9A3412" stroke="#431407" strokeWidth="1" />
            <polygon points="16,100 26,72 50,94 44,108" fill="#EA580C" stroke="#7C2D12" strokeWidth="1" />
            <polygon points="26,72 64,48 80,74 50,94" fill="#FB923C" stroke="#7C2D12" strokeWidth="1" />
            {/* Center Table & Fiery Honey Texture */}
            <polygon points="80,74 120,74 150,94 150,108 120,126 80,126 50,108 50,94" fill="url(#gomed-facet)" stroke="#FDBA74" strokeWidth="1.2" />
            {/* Internal Glitter Dots (Characteristic oil/honey inclusions of Hessonite) */}
            <circle cx="85" cy="92" r="1.5" fill="#FED7AA" fillOpacity="0.8" />
            <circle cx="105" cy="88" r="2" fill="#FED7AA" fillOpacity="0.9" />
            <circle cx="118" cy="102" r="1.2" fill="#FFFFFF" fillOpacity="0.9" />
            <circle cx="96" cy="112" r="1.8" fill="#FED7AA" fillOpacity="0.7" />
            <circle cx="78" cy="105" r="1" fill="#FFFFFF" fillOpacity="0.8" />
            <circle cx="128" cy="90" r="1.5" fill="#FED7AA" fillOpacity="0.7" />
            <circle cx="92" cy="78" r="1.2" fill="#FFFFFF" fillOpacity="0.9" />
          </svg>
        );

      case 'diamond':
        // User Image 7: Brilliant round cut sparkling diamond with prismatic light dispersion and crisp symmetry
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="dia-grad" x1="30" y1="20" x2="170" y2="180" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="35%" stopColor="#E0F2FE" />
                <stop offset="70%" stopColor="#C7D2FE" />
                <stop offset="100%" stopColor="#E2E8F0" />
              </linearGradient>
              <linearGradient id="dia-shadow" x1="100" y1="165" x2="100" y2="198" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#94A3B8" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#94A3B8" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Mirror Reflection Shadow */}
            <ellipse cx="100" cy="180" rx="48" ry="12" fill="url(#dia-shadow)" />
            {/* Main Round Girdle */}
            <circle cx="100" cy="96" r="76" fill="url(#dia-grad)" stroke="#94A3B8" strokeWidth="1.2" />
            {/* 16 Outer Triangular Facets */}
            {Array.from({ length: 16 }).map((_, i) => {
              const a1 = (i * 22.5 * Math.PI) / 180;
              const a2 = ((i + 1) * 22.5 * Math.PI) / 180;
              const am = ((i + 0.5) * 22.5 * Math.PI) / 180;
              const rO = 76;
              const rI = 52;
              const x1 = 100 + rO * Math.cos(a1);
              const y1 = 96 + rO * Math.sin(a1);
              const x2 = 100 + rO * Math.cos(a2);
              const y2 = 96 + rO * Math.sin(a2);
              const xm = 100 + rI * Math.cos(am);
              const ym = 96 + rI * Math.sin(am);
              const colors = ['#FFFFFF', '#E0F2FE', '#F3E8FF', '#EFF6FF'];
              return (
                <polygon
                  key={`dia-o-${i}`}
                  points={`${x1},${y1} ${x2},${y2} ${xm},${ym}`}
                  fill={colors[i % colors.length]}
                  fillOpacity="0.85"
                  stroke="#64748B"
                  strokeWidth="0.6"
                />
              );
            })}
            {/* Middle 8 Kite Facets */}
            {Array.from({ length: 8 }).map((_, i) => {
              const a1 = (i * 45 * Math.PI) / 180;
              const a2 = ((i + 1) * 45 * Math.PI) / 180;
              const rO = 52;
              const rI = 32;
              const x1 = 100 + rO * Math.cos(a1);
              const y1 = 96 + rO * Math.sin(a1);
              const x2 = 100 + rO * Math.cos(a2);
              const y2 = 96 + rO * Math.sin(a2);
              const xI1 = 100 + rI * Math.cos(a1);
              const yI1 = 96 + rI * Math.sin(a1);
              const xI2 = 100 + rI * Math.cos(a2);
              const yI2 = 96 + rI * Math.sin(a2);
              return (
                <polygon
                  key={`dia-m-${i}`}
                  points={`${x1},${y1} ${x2},${y2} ${xI2},${yI2} ${xI1},${yI1}`}
                  fill={i % 2 === 0 ? '#FFFFFF' : '#DBEAFE'}
                  stroke="#475569"
                  strokeWidth="0.75"
                />
              );
            })}
            {/* Center Octagonal Table */}
            {(() => {
              const points = Array.from({ length: 8 }).map((_, i) => {
                const a = (i * 45 * Math.PI) / 180;
                return `${100 + 32 * Math.cos(a)},${96 + 32 * Math.sin(a)}`;
              }).join(' ');
              return <polygon points={points} fill="#FFFFFF" stroke="#334155" strokeWidth="1" />;
            })()}
            {/* Center Star Cross Brilliance */}
            <line x1="100" y1="64" x2="100" y2="128" stroke="#93C5FD" strokeWidth="0.7" />
            <line x1="68" y1="96" x2="132" y2="96" stroke="#93C5FD" strokeWidth="0.7" />
            <polygon points="100,75 115,96 100,117 85,96" fill="#F0F9FF" fillOpacity="0.7" />
            {/* Sparkle Glints */}
            <circle cx="82" cy="80" r="2.5" fill="#FFFFFF" />
            <line x1="82" y1="74" x2="82" y2="86" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="76" y1="80" x2="88" y2="80" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        );

      case 'emerald':
        // Emerald (Panna): Octagonal step cut emerald
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="em-grad" x1="20" y1="20" x2="180" y2="180" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#34D399" />
                <stop offset="40%" stopColor="#059669" />
                <stop offset="80%" stopColor="#047857" />
                <stop offset="100%" stopColor="#064E3B" />
              </linearGradient>
            </defs>
            <polygon points="60,25 140,25 175,60 175,140 140,175 60,175 25,140 25,60" fill="url(#em-grad)" stroke="#064E3B" strokeWidth="2" />
            <polygon points="70,45 130,45 155,70 155,130 130,155 70,155 45,130 45,70" fill="#10B981" stroke="#047857" strokeWidth="1.5" />
            <polygon points="80,65 120,65 135,80 135,120 120,135 80,135 65,120 65,80" fill="#6EE7B7" fillOpacity="0.8" stroke="#059669" strokeWidth="1.2" />
            <line x1="60" y1="25" x2="70" y2="45" stroke="#A7F3D0" strokeWidth="1.5" />
            <line x1="140" y1="25" x2="130" y2="45" stroke="#047857" strokeWidth="1.5" />
            <line x1="175" y1="60" x2="155" y2="70" stroke="#047857" strokeWidth="1.5" />
            <line x1="175" y1="140" x2="155" y2="130" stroke="#064E3B" strokeWidth="1.5" />
            <line x1="140" y1="175" x2="130" y2="155" stroke="#064E3B" strokeWidth="1.5" />
            <line x1="60" y1="175" x2="70" y2="155" stroke="#047857" strokeWidth="1.5" />
            <line x1="25" y1="140" x2="45" y2="130" stroke="#047857" strokeWidth="1.5" />
            <line x1="25" y1="60" x2="45" y2="70" stroke="#A7F3D0" strokeWidth="1.5" />
          </svg>
        );

      case 'cats_eye':
        // Cat's Eye (Lehsuniya): Chrysoberyl oval cabochon with sharp vertical chatoyancy
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="cat-grad" cx="40%" cy="40%" r="65%">
                <stop offset="0%" stopColor="#A3E635" />
                <stop offset="40%" stopColor="#65A30D" />
                <stop offset="75%" stopColor="#4D7C0F" />
                <stop offset="100%" stopColor="#1A2E05" />
              </radialGradient>
              <linearGradient id="cat-ray" x1="90" y1="20" x2="110" y2="180" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            <ellipse cx="100" cy="100" rx="66" ry="82" fill="url(#cat-grad)" stroke="#365314" strokeWidth="1.5" />
            <path d="M 98 22 Q 100 100 98 178 Q 102 100 102 22 Z" fill="url(#cat-ray)" filter="drop-shadow(0 0 4px #FFFFFF)" />
          </svg>
        );

      default:
        return (
          <div className="w-full h-full rounded-full bg-amber-500 flex items-center justify-center text-white font-bold">
            {gemId[0]?.toUpperCase()}
          </div>
        );
    }
  };

  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${currentSizeClass} ${className}`}>
      {renderGemstoneSVG()}
    </div>
  );
};
