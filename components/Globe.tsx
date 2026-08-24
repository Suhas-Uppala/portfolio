'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

interface GlobeProps {
  size?: number;
}

export default function Globe({ size = 300 }: GlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 15, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const lastMousePos = useRef({ x: 0, y: 0 });

  // Auto-rotation
  useEffect(() => {
    if (!autoRotate || isDragging) return;
    
    const interval = setInterval(() => {
      setRotation(prev => ({
        ...prev,
        y: prev.y + 0.5,
      }));
    }, 50);

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
      x: Math.max(-60, Math.min(60, prev.x - deltaY * 0.5)),
      y: prev.y + deltaX * 0.5,
    }));

    lastMousePos.current = { x: e.clientX, y: e.clientY };
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    // Resume auto-rotation after 2 seconds
    setTimeout(() => setAutoRotate(true), 2000);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      setTimeout(() => setAutoRotate(true), 2000);
    }
  }, [isDragging]);

  // Generate latitude lines
  const latLines = Array.from({ length: 7 }, (_, i) => {
    const lat = -60 + i * 20;
    const scale = Math.cos((lat * Math.PI) / 180);
    return { lat, scale };
  });

  // Generate longitude lines
  const longLines = Array.from({ length: 12 }, (_, i) => i * 30);

  // Connection arc data (flight-path style)
  const connectionArcs = [
    { startAngle: 30, endAngle: 150, color: 'rgba(52, 211, 153, 0.3)' },
    { startAngle: 200, endAngle: 320, color: 'rgba(34, 211, 238, 0.2)' },
    { startAngle: 80, endAngle: 260, color: 'rgba(139, 92, 246, 0.2)' },
  ];

  return (
    <div
      ref={containerRef}
      className="relative cursor-grab active:cursor-grabbing select-none"
      style={{ 
        width: size, 
        height: size,
        perspective: '1000px',
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      {/* Pulse rings */}
      <div 
        className="absolute inset-0 rounded-full border border-emerald-500/15 pulse-ring"
      />
      <div 
        className="absolute inset-0 rounded-full border border-emerald-500/10 pulse-ring"
        style={{ animationDelay: '1s' }}
      />

      {/* Cyber HUD Spin Ring 1 */}
      <motion.div 
        className="absolute rounded-full border border-emerald-500/30 border-dashed pointer-events-none"
        style={{
          width: size * 1.16,
          height: size * 1.16,
          left: -size * 0.08,
          top: -size * 0.08,
          transform: 'rotateX(70deg) rotateY(10deg)',
          transformStyle: 'preserve-3d',
        }}
        animate={{ rotateZ: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />

      {/* Cyber HUD Spin Ring 2 */}
      <motion.div 
        className="absolute rounded-full border border-cyan-500/20 border-dotted pointer-events-none"
        style={{
          width: size * 1.24,
          height: size * 1.24,
          left: -size * 0.12,
          top: -size * 0.12,
          transform: 'rotateX(60deg) rotateY(-20deg)',
          transformStyle: 'preserve-3d',
        }}
        animate={{ rotateZ: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      />

      {/* HUD Corner Text Metrics */}
      <div className="absolute -top-6 -left-6 font-mono text-[9px] text-emerald-500/40 leading-none select-none pointer-events-none hidden md:block">
        <div>SYS_STATUS: ONLINE</div>
        <div>GRID_INDEX: 3D_ACTV</div>
        <div>SCAN_FREQ: 60_HZ</div>
      </div>
      <div className="absolute -bottom-6 -right-6 font-mono text-[9px] text-cyan-500/40 leading-none text-right select-none pointer-events-none hidden md:block">
        <div>COORDS: 17.3850 N</div>
        <div>SYSTEM: PORTAL_V2</div>
        <div>REFRESH_SECURE: OK</div>
      </div>

      {/* Glow effect behind globe */}
      <div 
        className="absolute inset-0 rounded-full opacity-40"
        style={{
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.35) 0%, rgba(34, 211, 238, 0.1) 40%, transparent 70%)',
          filter: 'blur(25px)',
        }}
      />

      {/* Globe container */}
      <motion.div
        className="relative w-full h-full"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        }}
      >
        {/* Latitude lines (horizontal circles) */}
        {latLines.map(({ lat, scale }, index) => (
          <div
            key={`lat-${index}`}
            className="absolute rounded-full border border-emerald-500/25"
            style={{
              width: size * scale,
              height: size * scale,
              left: (size - size * scale) / 2,
              top: (size - size * scale) / 2,
              transform: `rotateX(90deg) translateZ(${(lat / 60) * (size / 2) * 0.8}px)`,
              transformStyle: 'preserve-3d',
            }}
          />
        ))}

        {/* Longitude lines (vertical circles) */}
        {longLines.map((long, index) => (
          <div
            key={`long-${index}`}
            className="absolute rounded-full border border-emerald-500/20"
            style={{
              width: size * 0.9,
              height: size * 0.9,
              left: size * 0.05,
              top: size * 0.05,
              transform: `rotateY(${long}deg)`,
              transformStyle: 'preserve-3d',
            }}
          />
        ))}

        {/* Equator - highlighted */}
        <div
          className="absolute rounded-full border-2 border-emerald-400/40"
          style={{
            width: size * 0.9,
            height: size * 0.9,
            left: size * 0.05,
            top: size * 0.05,
            transform: 'rotateX(90deg)',
            transformStyle: 'preserve-3d',
          }}
        />

        {/* Prime meridian - highlighted */}
        <div
          className="absolute rounded-full border-2 border-emerald-400/30"
          style={{
            width: size * 0.9,
            height: size * 0.9,
            left: size * 0.05,
            top: size * 0.05,
            transform: 'rotateY(0deg)',
            transformStyle: 'preserve-3d',
          }}
        />

        {/* Connection arcs (curved flight paths) */}
        <svg 
          className="absolute" 
          style={{ 
            width: size * 0.9, 
            height: size * 0.9,
            left: size * 0.05,
            top: size * 0.05,
            transform: 'rotateX(70deg)',
            transformStyle: 'preserve-3d',
          }}
          viewBox="0 0 200 200"
        >
          {connectionArcs.map((arc, idx) => {
            const r = 90;
            const cx = 100;
            const cy = 100;
            const startRad = (arc.startAngle * Math.PI) / 180;
            const endRad = (arc.endAngle * Math.PI) / 180;
            const x1 = cx + r * Math.cos(startRad);
            const y1 = cy + r * Math.sin(startRad);
            const x2 = cx + r * Math.cos(endRad);
            const y2 = cy + r * Math.sin(endRad);
            const midX = (x1 + x2) / 2 + 20;
            const midY = (y1 + y2) / 2 - 30;
            
            return (
              <path
                key={`arc-${idx}`}
                d={`M ${x1} ${y1} Q ${midX} ${midY} ${x2} ${y2}`}
                fill="none"
                stroke={arc.color}
                strokeWidth="1.5"
                strokeDasharray="4 4"
                style={{
                  animation: `dataFlow 3s linear infinite`,
                  animationDelay: `${idx * 0.8}s`,
                }}
              />
            );
          })}
        </svg>

        {/* Connection dots at intersections */}
        {[0, 90, 180, 270].map((angle) => (
          <motion.div
            key={`dot-${angle}`}
            className="absolute w-2 h-2 rounded-full bg-emerald-400"
            style={{
              left: size / 2 - 4,
              top: size / 2 - 4,
              transform: `rotateY(${angle}deg) translateZ(${size * 0.45}px)`,
              transformStyle: 'preserve-3d',
              boxShadow: '0 0 10px rgba(16, 185, 129, 0.8)',
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: angle / 180,
            }}
          />
        ))}

        {/* Location marker - Hyderabad */}
        <motion.div
          className="absolute flex items-center gap-1"
          style={{
            left: size / 2 - 4,
            top: size / 2 - 12,
            transform: `rotateY(78deg) rotateX(-17deg) translateZ(${size * 0.46}px)`,
            transformStyle: 'preserve-3d',
          }}
          animate={{
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
        >
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400" style={{ boxShadow: '0 0 8px rgba(34, 211, 238, 0.8)' }} />
          <span className="text-[8px] text-cyan-300 font-mono whitespace-nowrap" style={{ transform: 'rotateY(0deg)' }}>
            HYD
          </span>
        </motion.div>

        {/* Floating particles around globe */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: size / 2,
              top: size / 2,
              background: i % 2 === 0 ? 'rgba(52, 211, 153, 0.6)' : 'rgba(34, 211, 238, 0.4)',
            }}
            animate={{
              x: [0, Math.cos((i * 45 * Math.PI) / 180) * size * 0.6],
              y: [0, Math.sin((i * 45 * Math.PI) / 180) * size * 0.6],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.4,
              ease: 'easeOut',
            }}
          />
        ))}
      </motion.div>

      {/* Outer ring */}
      <div 
        className="absolute inset-0 rounded-full border border-emerald-500/15"
        style={{ transform: 'scale(1.12)' }}
      />
      
      {/* Inner shadow */}
      <div 
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 30% 30%, transparent 40%, rgba(0,0,0,0.3) 100%)',
        }}
      />
    </div>
  );
}
