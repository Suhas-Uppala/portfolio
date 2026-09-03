'use client';

import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';

interface CyberCoreProps {
  size?: number;
}

const round = (num: number) => Math.round(num * 100) / 100;

export default function CyberCore3D({ size = 370 }: CyberCoreProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 18, y: -25 });
  const [isDragging, setIsDragging] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const lastMousePos = useRef({ x: 0, y: 0 });

  // Continuous auto-rotation
  useEffect(() => {
    if (!autoRotate || isDragging) return;
    const interval = setInterval(() => {
      setRotation(prev => ({
        x: 16 + Math.sin(Date.now() / 2600) * 7,
        y: prev.y + 0.6,
      }));
    }, 40);
    return () => clearInterval(interval);
  }, [autoRotate, isDragging]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    setAutoRotate(false);
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - lastMousePos.current.x;
    const deltaY = e.clientY - lastMousePos.current.y;
    setRotation(prev => ({
      x: Math.max(-45, Math.min(45, prev.x - deltaY * 0.4)),
      y: prev.y + deltaX * 0.5,
    }));
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setTimeout(() => setAutoRotate(true), 2500);
  }, []);

  // 6 vertices of the inner neural hexagon
  const hexRadius = size * 0.38;
  const hexVertices = useMemo(() => {
    const colors = [
      '#22d3ee', // Top (cyan)
      '#10b981', // Top-Right (emerald)
      '#38bdf8', // Bottom-Right (sky blue)
      '#a855f7', // Bottom (purple)
      '#f59e0b', // Bottom-Left (amber)
      '#84cc16', // Top-Left (lime)
    ];
    return Array.from({ length: 6 }, (_, i) => {
      const angle = (i * 60 - 90) * (Math.PI / 180); // Start from top
      return {
        x: round(size / 2 + hexRadius * Math.cos(angle)),
        y: round(size / 2 + hexRadius * Math.sin(angle)),
        color: colors[i],
      };
    });
  }, [size, hexRadius]);

  // Outer shield hexagon points
  const outerHexRadius = size * 0.47;
  const outerPolygonPoints = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => {
      const angle = (i * 60 - 90) * (Math.PI / 180);
      return `${round(size / 2 + outerHexRadius * Math.cos(angle))},${round(size / 2 + outerHexRadius * Math.sin(angle))}`;
    }).join(' ');
  }, [size, outerHexRadius]);

  // Secondary inner shield points
  const innerPolygonPoints = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => {
      const angle = (i * 60 - 90) * (Math.PI / 180);
      return `${round(size / 2 + outerHexRadius * 0.88 * Math.cos(angle))},${round(size / 2 + outerHexRadius * 0.88 * Math.sin(angle))}`;
    }).join(' ');
  }, [size, outerHexRadius]);

  // 3D Polyhedron / Tesseract Wireframe vertices
  const tesseractNodes = [
    { x: 0, y: -55, z: 0, color: '#38bdf8' },
    { x: 48, y: -18, z: 32, color: '#34d399' },
    { x: -48, y: -18, z: 32, color: '#818cf8' },
    { x: 0, y: -18, z: -55, color: '#f472b6' },
    { x: 48, y: 32, z: -25, color: '#fbbf24' },
    { x: -48, y: 32, z: -25, color: '#34d399' },
    { x: 0, y: 55, z: 32, color: '#22d3ee' },
  ];

  return (
    <div
      ref={containerRef}
      className="relative select-none flex items-center justify-center cursor-grab active:cursor-grabbing"
      style={{ width: size, height: size }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Background Radial Core Ambient Glow */}
      <div 
        className="absolute inset-2 rounded-full pointer-events-none opacity-70"
        style={{
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.4) 0%, rgba(34, 211, 238, 0.3) 30%, rgba(168, 85, 247, 0.15) 55%, transparent 75%)',
          filter: 'blur(40px)',
        }}
      />

      {/* ─── 1. 2D & SVG MULTI-LAYER NEURAL LATTICE FRAME ─── */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible"
        viewBox={`0 0 ${size} ${size}`}
      >
        <defs>
          <linearGradient id="cyberOuterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34d399" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#818cf8" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="cyberCoreFill" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.05" />
          </linearGradient>
          <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Circular Reticle Ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={outerHexRadius * 1.05}
          fill="none"
          stroke="rgba(34, 211, 238, 0.2)"
          strokeWidth="1"
          strokeDasharray="6 4"
        />

        {/* Hexagonal Outer Perimeter Polygon */}
        <polygon
          points={outerPolygonPoints}
          fill="url(#cyberCoreFill)"
          stroke="url(#cyberOuterGrad)"
          strokeWidth="2.5"
          className="drop-shadow-[0_0_18px_rgba(34,211,238,0.5)]"
        />

        {/* Secondary Inner Hexagon Outline */}
        <polygon
          points={innerPolygonPoints}
          fill="none"
          stroke="rgba(52, 211, 153, 0.4)"
          strokeWidth="1.2"
          strokeDasharray="4 4"
        />

        {/* Comprehensive Interconnected Rainbow Neural Web Lattice */}
        {hexVertices.map((v1, i) => {
          return hexVertices.slice(i + 1).map((v2, j) => {
            const isNeighbor = j === 0 || (i === 0 && j === 4);
            return (
              <line
                key={`net-link-${i}-${j}`}
                x1={v1.x}
                y1={v1.y}
                x2={v2.x}
                y2={v2.y}
                stroke={isNeighbor ? 'rgba(52, 211, 153, 0.5)' : 'rgba(34, 211, 238, 0.3)'}
                strokeWidth={isNeighbor ? 1.2 : 0.8}
                strokeDasharray={isNeighbor ? 'none' : '4 3'}
              />
            );
          });
        })}

        {/* Cross Connectors to Center */}
        {hexVertices.map((v, i) => (
          <line
            key={`center-link-${i}`}
            x1={v.x}
            y1={v.y}
            x2={size / 2}
            y2={size / 2}
            stroke={v.color}
            strokeWidth="0.9"
            strokeOpacity="0.4"
          />
        ))}

        {/* 6 Multicolored Glowing Vertex Nodes with Halo Rings */}
        {hexVertices.map((v, i) => (
          <g key={`vertex-node-${i}`}>
            {/* Outer Halo Ring */}
            <circle
              cx={v.x}
              cy={v.y}
              r="11"
              fill="none"
              stroke={v.color}
              strokeWidth="1.2"
              strokeOpacity="0.7"
              className="animate-pulse"
              style={{ animationDuration: `${2 + i * 0.25}s` }}
            />
            {/* Solid Colored Core Node */}
            <circle
              cx={v.x}
              cy={v.y}
              r="6.5"
              fill={v.color}
              filter="url(#glowFilter)"
            />
            <circle cx={v.x} cy={v.y} r="2.5" fill="#ffffff" />
          </g>
        ))}

        {/* Left Side Data Input Ingress Arrows */}
        {[0.35, 0.42, 0.5, 0.58, 0.65].map((pos, idx) => {
          const arrowY = size * pos;
          const arrowColors = ['#f59e0b', '#38bdf8', '#10b981', '#ec4899', '#06b6d4'];
          return (
            <g key={`in-arrow-${idx}`}>
              <line
                x1="4"
                y1={arrowY}
                x2={size * 0.16}
                y2={arrowY}
                stroke={arrowColors[idx]}
                strokeWidth="1.5"
                strokeDasharray="4 2"
                className="animate-synapse-stream"
                style={{ animationDuration: `${1.5 + idx * 0.2}s` }}
              />
              <polygon
                points={`${size * 0.16},${arrowY - 3} ${size * 0.18},${arrowY} ${size * 0.16},${arrowY + 3}`}
                fill={arrowColors[idx]}
              />
            </g>
          );
        })}

        {/* ─── HUD CALLOUT POINTER LEADER LINES ─── */}
        {/* 1. Top-Right Leader Line -> CV CORE */}
        <polyline
          points={`${size * 0.7},${size * 0.25} ${size * 0.84},${size * 0.18} ${size * 0.98},${size * 0.18}`}
          fill="none"
          stroke="rgba(34, 211, 238, 0.6)"
          strokeWidth="1.2"
        />
        <circle cx={size * 0.7} cy={size * 0.25} r="2.5" fill="#22d3ee" />

        {/* 2. Mid-Right Leader Line -> NETWORK_V1 */}
        <polyline
          points={`${size * 0.88},${size * 0.5} ${size * 1.02},${size * 0.5}`}
          fill="none"
          stroke="rgba(16, 185, 129, 0.6)"
          strokeWidth="1.2"
        />
        <circle cx={size * 0.88} cy={size * 0.5} r="2.5" fill="#10b981" />

        {/* 3. Bottom-Left Leader Line -> CV_MODEL_V4_CORE */}
        <polyline
          points={`${size * 0.28},${size * 0.78} ${size * 0.18},${size * 0.88} ${size * 0.04},${size * 0.88}`}
          fill="none"
          stroke="rgba(34, 211, 238, 0.6)"
          strokeWidth="1.2"
        />
        <circle cx={size * 0.28} cy={size * 0.78} r="2.5" fill="#22d3ee" />

        {/* 4. Top Satellite Vertical Conduit Line */}
        <line
          x1={size / 2 - 3}
          y1="0"
          x2={size / 2 - 3}
          y2={size * 0.1}
          stroke="rgba(52, 211, 153, 0.6)"
          strokeWidth="1"
          strokeDasharray="3 2"
        />
        <line
          x1={size / 2 + 3}
          y1="0"
          x2={size / 2 + 3}
          y2={size * 0.1}
          stroke="rgba(34, 211, 238, 0.6)"
          strokeWidth="1"
          strokeDasharray="3 2"
        />
      </svg>

      {/* ─── 2. 3D CENTRAL HOLOGRAPHIC TESSERACT / CUBE CRYSTAL CORE ─── */}
      <div 
        className="relative flex items-center justify-center pointer-events-none z-20"
        style={{
          width: size * 0.6,
          height: size * 0.6,
          perspective: '1200px',
          transformStyle: 'preserve-3d',
        }}
      >
        <motion.div
          className="relative w-full h-full flex items-center justify-center"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          }}
        >
          {/* ─── TRUE 3D HOLOGRAPHIC CUBE (6 FACES WITH 3D DEPTH) ─── */}
          <div 
            className="absolute inset-0 flex items-center justify-center animate-cyber-core"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Outer 3D Cube Container (80px x 80px x 80px, half = 40px) */}
            <div 
              className="relative w-20 h-20 flex items-center justify-center shadow-[0_0_35px_rgba(34,211,238,0.6)]"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Face 1: FRONT */}
              <div 
                className="absolute inset-0 border-2 border-cyan-400/80 bg-cyan-500/15 backdrop-blur-xs flex items-center justify-center"
                style={{ transform: 'translateZ(40px)', transformStyle: 'preserve-3d' }}
              >
                <div className="w-6 h-6 border border-cyan-300/50 rounded-sm" />
                <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-cyan-400" />
                <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-cyan-400" />
                <div className="absolute bottom-1 left-1 w-1.5 h-1.5 bg-cyan-400" />
                <div className="absolute bottom-1 right-1 w-1.5 h-1.5 bg-cyan-400" />
              </div>

              {/* Face 2: BACK */}
              <div 
                className="absolute inset-0 border-2 border-purple-400/80 bg-purple-500/15 backdrop-blur-xs flex items-center justify-center"
                style={{ transform: 'rotateY(180deg) translateZ(40px)', transformStyle: 'preserve-3d' }}
              >
                <div className="w-6 h-6 border border-purple-300/50 rounded-sm" />
                <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-purple-400" />
                <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-purple-400" />
                <div className="absolute bottom-1 left-1 w-1.5 h-1.5 bg-purple-400" />
                <div className="absolute bottom-1 right-1 w-1.5 h-1.5 bg-purple-400" />
              </div>

              {/* Face 3: RIGHT */}
              <div 
                className="absolute inset-0 border-2 border-emerald-400/80 bg-emerald-500/15 backdrop-blur-xs flex items-center justify-center"
                style={{ transform: 'rotateY(90deg) translateZ(40px)', transformStyle: 'preserve-3d' }}
              >
                <div className="w-6 h-6 border border-emerald-300/50 rounded-sm" />
                <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-emerald-400" />
                <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-emerald-400" />
                <div className="absolute bottom-1 left-1 w-1.5 h-1.5 bg-emerald-400" />
                <div className="absolute bottom-1 right-1 w-1.5 h-1.5 bg-emerald-400" />
              </div>

              {/* Face 4: LEFT */}
              <div 
                className="absolute inset-0 border-2 border-amber-400/80 bg-amber-500/15 backdrop-blur-xs flex items-center justify-center"
                style={{ transform: 'rotateY(-90deg) translateZ(40px)', transformStyle: 'preserve-3d' }}
              >
                <div className="w-6 h-6 border border-amber-300/50 rounded-sm" />
                <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-amber-400" />
                <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-amber-400" />
                <div className="absolute bottom-1 left-1 w-1.5 h-1.5 bg-amber-400" />
                <div className="absolute bottom-1 right-1 w-1.5 h-1.5 bg-amber-400" />
              </div>

              {/* Face 5: TOP */}
              <div 
                className="absolute inset-0 border-2 border-teal-400/80 bg-teal-500/15 backdrop-blur-xs flex items-center justify-center"
                style={{ transform: 'rotateX(90deg) translateZ(40px)', transformStyle: 'preserve-3d' }}
              >
                <div className="w-6 h-6 border border-teal-300/50 rounded-sm" />
                <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-teal-400" />
                <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-teal-400" />
                <div className="absolute bottom-1 left-1 w-1.5 h-1.5 bg-teal-400" />
                <div className="absolute bottom-1 right-1 w-1.5 h-1.5 bg-teal-400" />
              </div>

              {/* Face 6: BOTTOM */}
              <div 
                className="absolute inset-0 border-2 border-pink-400/80 bg-pink-500/15 backdrop-blur-xs flex items-center justify-center"
                style={{ transform: 'rotateX(-90deg) translateZ(40px)', transformStyle: 'preserve-3d' }}
              >
                <div className="w-6 h-6 border border-pink-300/50 rounded-sm" />
                <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-pink-400" />
                <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-pink-400" />
                <div className="absolute bottom-1 left-1 w-1.5 h-1.5 bg-pink-400" />
                <div className="absolute bottom-1 right-1 w-1.5 h-1.5 bg-pink-400" />
              </div>

              {/* Inner Nested 3D Cube (48px x 48px x 48px, half = 24px) */}
              <div 
                className="absolute w-12 h-12 flex items-center justify-center animate-pulse"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="absolute inset-0 border border-emerald-300/90 bg-emerald-400/20" style={{ transform: 'translateZ(24px)' }} />
                <div className="absolute inset-0 border border-purple-300/90 bg-purple-400/20" style={{ transform: 'rotateY(180deg) translateZ(24px)' }} />
                <div className="absolute inset-0 border border-cyan-300/90 bg-cyan-400/20" style={{ transform: 'rotateY(90deg) translateZ(24px)' }} />
                <div className="absolute inset-0 border border-amber-300/90 bg-amber-400/20" style={{ transform: 'rotateY(-90deg) translateZ(24px)' }} />
                <div className="absolute inset-0 border border-teal-300/90 bg-teal-400/20" style={{ transform: 'rotateX(90deg) translateZ(24px)' }} />
                <div className="absolute inset-0 border border-pink-300/90 bg-pink-400/20" style={{ transform: 'rotateX(-90deg) translateZ(24px)' }} />

                {/* Central Glowing Luminous Core Nucleus */}
                <div className="w-6 h-6 rounded-full bg-white/90 shadow-[0_0_20px_rgba(255,255,255,1)] blur-xs" />
              </div>
            </div>

            {/* Concentric 3D Perspective Gyroscope Rings */}
            <div 
              className="absolute w-44 h-44 rounded-full border-2 border-dashed border-emerald-400/50"
              style={{ transform: 'rotateX(75deg) rotateY(20deg)', transformStyle: 'preserve-3d' }}
            />
            <div 
              className="absolute w-40 h-40 rounded-full border border-purple-400/40 border-dotted"
              style={{ transform: 'rotateX(-60deg) rotateY(45deg)', transformStyle: 'preserve-3d' }}
            />

            {/* 3D Corner Vertex Nodes of the Cube */}
            {[
              { x: 40, y: 40, z: 40, color: '#38bdf8' },
              { x: -40, y: 40, z: 40, color: '#34d399' },
              { x: 40, y: -40, z: 40, color: '#a78bfa' },
              { x: -40, y: -40, z: 40, color: '#fbbf24' },
              { x: 40, y: 40, z: -40, color: '#f472b6' },
              { x: -40, y: 40, z: -40, color: '#22d3ee' },
              { x: 40, y: -40, z: -40, color: '#34d399' },
              { x: -40, y: -40, z: -40, color: '#818cf8' },
            ].map((node, idx) => (
              <div
                key={`cube-vertex-${idx}`}
                className="absolute w-2.5 h-2.5 rounded-full"
                style={{
                  transform: `translate3d(${node.x}px, ${node.y}px, ${node.z}px)`,
                  transformStyle: 'preserve-3d',
                  backgroundColor: node.color,
                  boxShadow: `0 0 10px ${node.color}`,
                }}
              />
            ))}
          </div>

          {/* Reverse counter-spinning 3D Outer Hexagonal Cage Shell */}
          <div 
            className="absolute inset-0 flex items-center justify-center animate-cyber-core-reverse opacity-70"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div 
              className="w-40 h-40 border border-emerald-300/40 rounded-3xl"
              style={{ transform: 'rotateX(45deg) rotateY(45deg) rotateZ(45deg)' }}
            />
          </div>
        </motion.div>
      </div>

      {/* ─── 3. SATELLITE ORBITAL SENSORS & HUD CALLOUT BADGES ─── */}

      {/* Top Orbital Satellite Node (with vertical laser rail) */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex flex-col items-center">
        <div className="w-12 h-12 rounded-full bg-slate-950/90 border border-emerald-500/60 flex items-center justify-center shadow-[0_0_18px_rgba(16,185,129,0.5)] backdrop-blur-md">
          {/* Rotating dashed ring */}
          <motion.div 
            className="w-8 h-8 rounded-full border border-dashed border-cyan-400"
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          />
          {/* Mini central crystal */}
          <div className="absolute w-3.5 h-3.5 rotate-45 border border-emerald-300 bg-emerald-500/40" />
        </div>
        <div className="text-[7.5px] font-mono text-emerald-400/80 mt-1">ORBIT_CORE // 01</div>
      </div>

      {/* Bottom-Left Callout Badge: CV_MODEL_V4_CORE */}
      <div className="absolute -bottom-3 -left-8 z-20 pointer-events-none hidden sm:flex items-center gap-1.5 font-mono text-[9px] text-cyan-300 bg-slate-950/90 px-2.5 py-1 rounded border border-cyan-500/50 backdrop-blur-md shadow-[0_0_12px_rgba(6,182,212,0.4)]">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
        <span>CV_MODEL_V4_CORE</span>
      </div>

      {/* ─── 4. RIGHT SATELLITE CLUSTER (3 SATELLITES CONNECTED BY ARC) ─── */}
      <div className="absolute top-4 -right-24 z-20 pointer-events-none hidden lg:flex flex-col gap-6 items-start">
        
        {/* Satellite 1 (Top-Right): CV CORE */}
        <div className="flex items-center gap-2">
          <div className="w-11 h-11 rounded-full bg-slate-950/90 border border-cyan-500/60 flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.4)] backdrop-blur-md relative">
            <motion.div 
              className="w-7 h-7 rounded-full border border-dotted border-emerald-400"
              animate={{ rotate: -360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            />
            {/* Point cloud sphere radar */}
            <div className="absolute w-4 h-4 rounded-full bg-cyan-400/20 border border-cyan-300 flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-cyan-200" />
            </div>
          </div>
          <span className="font-mono text-[9px] font-semibold text-cyan-300 bg-slate-950/90 px-2.5 py-1 rounded border border-cyan-500/40 shadow-sm">
            CV CORE
          </span>
        </div>

        {/* Satellite 2 (Middle-Right): NETWORK_V1 */}
        <div className="flex items-center gap-2 translate-x-4">
          <div className="w-12 h-12 bg-slate-950/90 border border-emerald-500/60 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.4)] backdrop-blur-md rounded-lg relative"
            style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
          >
            <motion.div
              className="w-5 h-5 border border-emerald-300 rotate-45"
              animate={{ rotate: [45, 225, 405] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            />
            <div className="absolute w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <span className="font-mono text-[9px] font-semibold text-emerald-300 bg-slate-950/90 px-2.5 py-1 rounded border border-emerald-500/40 shadow-sm">
            NETWORK_V1
          </span>
        </div>

        {/* Satellite 3 (Bottom-Right): GEO_RADAR */}
        <div className="flex items-center gap-2">
          <div className="w-11 h-11 rounded-full bg-slate-950/90 border border-purple-500/60 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.4)] backdrop-blur-md relative">
            <motion.div 
              className="w-7 h-7 rounded-full border border-dashed border-purple-400"
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            />
            {/* Mini Geodesic Wireframe Globe */}
            <div className="absolute w-4 h-4 rounded-full border border-emerald-400/70" />
            <div className="absolute w-2 h-2 rounded-full bg-purple-400 animate-ping" />
          </div>
          <div className="flex flex-col text-[7px] font-mono text-slate-400">
            <span>GEO_RADAR // 0x9F</span>
            <span className="text-emerald-400">FPS: 60 · SYNC</span>
          </div>
        </div>

      </div>

    </div>
  );
}
