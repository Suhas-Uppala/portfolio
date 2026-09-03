'use client';

import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';

interface CyberCoreProps {
  size?: number;
}

const round = (num: number) => Math.round(num * 100) / 100;

export default function CyberCore3D({ size = 350 }: CyberCoreProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 15, y: -20 });
  const [isDragging, setIsDragging] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const lastMousePos = useRef({ x: 0, y: 0 });

  // Continuous auto-rotation
  useEffect(() => {
    if (!autoRotate || isDragging) return;
    const interval = setInterval(() => {
      setRotation(prev => ({
        x: 12 + Math.sin(Date.now() / 2400) * 6,
        y: prev.y + 0.5,
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

  // 6 vertices of regular outer hexagon (deterministically rounded to 2 decimals)
  const hexRadius = size * 0.45;
  const hexVertices = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => {
      const angle = (i * 60 * Math.PI) / 180;
      return {
        x: round(size / 2 + hexRadius * Math.cos(angle)),
        y: round(size / 2 + hexRadius * Math.sin(angle)),
        color: ['#10b981', '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#06b6d4'][i],
      };
    });
  }, [size, hexRadius]);

  // Spherical Point-Cloud Nodes
  const sphereRadius = 68;
  const sphereDots = useMemo(() => {
    const dots: { x: number; y: number; z: number; color: string }[] = [];
    const latSteps = 5;
    const lonSteps = 8;
    for (let lat = 1; lat < latSteps; lat++) {
      const theta = (lat * Math.PI) / latSteps - Math.PI / 2;
      for (let lon = 0; lon < lonSteps; lon++) {
        const phi = (lon * 2 * Math.PI) / lonSteps;
        dots.push({
          x: round(sphereRadius * Math.cos(theta) * Math.cos(phi)),
          y: round(sphereRadius * Math.sin(theta)),
          z: round(sphereRadius * Math.cos(theta) * Math.sin(phi)),
          color: (lat + lon) % 3 === 0 ? '#34d399' : (lat + lon) % 3 === 1 ? '#22d3ee' : '#818cf8',
        });
      }
    }
    dots.push({ x: 0, y: -sphereRadius, z: 0, color: '#67e8f9' });
    dots.push({ x: 0, y: sphereRadius, z: 0, color: '#34d399' });
    return dots;
  }, [sphereRadius]);

  const outerPolygonPoints = useMemo(() => {
    return hexVertices.map(v => `${v.x},${v.y}`).join(' ');
  }, [hexVertices]);

  const innerPolygonPoints = useMemo(() => {
    return hexVertices.map(v => {
      const dx = v.x - size / 2;
      const dy = v.y - size / 2;
      return `${round(size / 2 + dx * 0.84)},${round(size / 2 + dy * 0.84)}`;
    }).join(' ');
  }, [hexVertices, size]);

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
        className="absolute inset-4 rounded-full pointer-events-none opacity-65"
        style={{
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.35) 0%, rgba(34, 211, 238, 0.25) 35%, rgba(139, 92, 246, 0.1) 60%, transparent 75%)',
          filter: 'blur(35px)',
        }}
      />

      {/* Outer Hexagon Shield SVG Frame */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
        viewBox={`0 0 ${size} ${size}`}
      >
        <defs>
          <linearGradient id="cyberHexGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34d399" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#818cf8" stopOpacity="0.85" />
          </linearGradient>
          <linearGradient id="cyberInnerGlow" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.04" />
          </linearGradient>
        </defs>

        {/* Hexagonal Outer Perimeter Polygon */}
        <polygon
          points={outerPolygonPoints}
          fill="url(#cyberInnerGlow)"
          stroke="url(#cyberHexGrad)"
          strokeWidth="2.5"
          className="drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]"
        />

        {/* Secondary Inner Hexagon Outline */}
        <polygon
          points={innerPolygonPoints}
          fill="none"
          stroke="rgba(52, 211, 153, 0.35)"
          strokeWidth="1.2"
          strokeDasharray="4 4"
        />

        {/* Diagonal Cross Struts */}
        {hexVertices.map((v, i) => {
          const nextV = hexVertices[(i + 2) % 6];
          const oppV = hexVertices[(i + 3) % 6];
          return (
            <g key={`strut-${i}`}>
              <line
                x1={v.x}
                y1={v.y}
                x2={nextV.x}
                y2={nextV.y}
                stroke="rgba(34, 211, 238, 0.2)"
                strokeWidth="0.8"
                strokeDasharray="5 3"
              />
              <line
                x1={v.x}
                y1={v.y}
                x2={oppV.x}
                y2={oppV.y}
                stroke="rgba(16, 185, 129, 0.15)"
                strokeWidth="0.75"
              />
            </g>
          );
        })}

        {/* Glowing Vertex Hexagon Junction Nodes */}
        {hexVertices.map((v, i) => (
          <g key={`vertex-${i}`}>
            <circle
              cx={v.x}
              cy={v.y}
              r="6.5"
              fill={v.color}
              className="animate-pulse"
              style={{ filter: `drop-shadow(0 0 10px ${v.color})`, animationDuration: `${2 + i * 0.3}s` }}
            />
            <circle cx={v.x} cy={v.y} r="2.5" fill="#ffffff" />
          </g>
        ))}
      </svg>

      {/* ─── 3D HOLOGRAPHIC SPHERE & WIREFRAME ORB CORE ─── */}
      <div 
        className="relative flex items-center justify-center pointer-events-none"
        style={{
          width: size * 0.72,
          height: size * 0.72,
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
          {/* Inner 3D Holographic Sphere Container */}
          <div 
            className="absolute inset-0 flex items-center justify-center animate-cyber-core"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* 1. Glowing Central Sphere Plasma Ball */}
            <div 
              className="w-24 h-24 rounded-full bg-gradient-to-tr from-emerald-500/40 via-cyan-400/50 to-teal-300/30 border border-emerald-300/80 shadow-[0_0_35px_rgba(16,185,129,0.85)] backdrop-blur-md flex items-center justify-center animate-pulse"
              style={{
                boxShadow: '0 0 35px rgba(16, 185, 129, 0.8), inset 0 0 20px rgba(34, 211, 238, 0.6)',
              }}
            >
              <div className="w-10 h-10 rounded-full bg-white/60 blur-xs" />
            </div>

            {/* 2. Longitude Wireframe Rings */}
            {[0, 30, 60, 90, 120, 150].map((deg, idx) => (
              <div
                key={`lon-ring-${idx}`}
                className="absolute w-36 h-36 rounded-full border border-cyan-400/35"
                style={{
                  transform: `rotateY(${deg}deg)`,
                  transformStyle: 'preserve-3d',
                  borderColor: idx % 2 === 0 ? 'rgba(34, 211, 238, 0.45)' : 'rgba(52, 211, 153, 0.4)',
                }}
              />
            ))}

            {/* 3. Latitude Wireframe Rings */}
            {[-45, -20, 0, 20, 45].map((offsetZ, idx) => {
              const ringRadius = round(Math.sqrt(Math.max(0, 68 * 68 - offsetZ * offsetZ)) * 2);
              return (
                <div
                  key={`lat-ring-${idx}`}
                  className="absolute rounded-full border border-dashed border-emerald-400/40"
                  style={{
                    width: `${ringRadius}px`,
                    height: `${ringRadius}px`,
                    transform: `translateZ(${offsetZ}px) rotateX(90deg)`,
                    transformStyle: 'preserve-3d',
                    borderColor: offsetZ === 0 ? 'rgba(34, 211, 238, 0.6)' : 'rgba(16, 185, 129, 0.35)',
                    borderWidth: offsetZ === 0 ? '1.5px' : '1px',
                  }}
                />
              );
            })}

            {/* 4. Dense 3D Point-Cloud Dots on Sphere Surface */}
            {sphereDots.map((dot, idx) => (
              <div
                key={`s-dot-${idx}`}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  transform: `translate3d(${dot.x}px, ${dot.y}px, ${dot.z}px)`,
                  transformStyle: 'preserve-3d',
                  backgroundColor: dot.color,
                  boxShadow: `0 0 8px ${dot.color}`,
                }}
              />
            ))}

            {/* 5. Outer Equator HUD Dashed Ring */}
            <div 
              className="absolute w-44 h-44 rounded-full border-2 border-dashed border-cyan-300/50"
              style={{ transform: 'rotateX(75deg) rotateY(15deg)', transformStyle: 'preserve-3d' }}
            />
          </div>

          {/* Counter-Spinning Outer 3D Gyroscope Rings */}
          <div 
            className="absolute inset-0 flex items-center justify-center animate-cyber-core-reverse opacity-80"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div 
              className="w-40 h-40 rounded-full border-2 border-emerald-400/40 border-dotted"
              style={{ transform: 'rotateX(-60deg) rotateY(45deg)' }}
            />
            <div 
              className="w-48 h-48 rounded-full border border-purple-400/30"
              style={{ transform: 'rotateX(40deg) rotateZ(70deg)' }}
            />
          </div>
        </motion.div>
      </div>

      {/* Technical Holographic HUD Labels & Satellite Callouts */}
      {/* 1. Bottom Left Core Callout: CV_MODEL_V4_CORE */}
      <div className="absolute -bottom-2 -left-6 z-20 pointer-events-none hidden sm:flex items-center gap-1.5 font-mono text-[9px] text-cyan-300/90 bg-slate-950/85 px-2.5 py-1 rounded border border-cyan-500/40 backdrop-blur-md shadow-[0_0_12px_rgba(6,182,212,0.3)]">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
        <span>CV_MODEL_V4_CORE</span>
      </div>

      {/* 2. Top Orbital Satellite Node */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex flex-col items-center">
        <div className="w-10 h-10 rounded-full bg-slate-950/80 border border-emerald-500/50 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.4)]">
          <motion.div 
            className="w-6 h-6 rounded-full border border-dashed border-cyan-400"
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          />
          <div className="absolute w-2 h-2 rounded-full bg-emerald-400" />
        </div>
        <div className="w-px h-6 bg-gradient-to-b from-emerald-400/60 to-transparent" />
      </div>

      {/* 3. Right Satellite Orbital Cluster */}
      <div className="absolute top-8 -right-16 z-20 pointer-events-none hidden lg:flex flex-col gap-4">
        {/* Top Right Mini Satellite: CV CORE */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-slate-950/85 border border-cyan-500/40 flex items-center justify-center shadow-[0_0_12px_rgba(34,211,238,0.35)]">
            <motion.div 
              className="w-5 h-5 rounded-full border border-dotted border-emerald-400"
              animate={{ rotate: -360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            />
            <div className="absolute w-1.5 h-1.5 rounded-full bg-cyan-300" />
          </div>
          <span className="font-mono text-[9px] text-cyan-300/80 bg-slate-950/80 px-2 py-0.5 rounded border border-slate-800">
            CV CORE
          </span>
        </div>

        {/* Middle Right Mini Satellite: NETWORK_V1 */}
        <div className="flex items-center gap-2 translate-x-3">
          <div className="w-9 h-9 rounded-full bg-slate-950/85 border border-emerald-500/40 flex items-center justify-center shadow-[0_0_12px_rgba(16,185,129,0.35)]">
            <div className="w-4 h-4 rotate-45 border border-emerald-300" />
            <div className="absolute w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <span className="font-mono text-[9px] text-emerald-300/80 bg-slate-950/80 px-2 py-0.5 rounded border border-slate-800">
            NETWORK_V1
          </span>
        </div>

        {/* Bottom Right Mini Satellite Node */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-slate-950/85 border border-purple-500/40 flex items-center justify-center shadow-[0_0_10px_rgba(168,85,247,0.3)]">
            <motion.div 
              className="w-4 h-4 rounded-full border border-dashed border-purple-400"
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
