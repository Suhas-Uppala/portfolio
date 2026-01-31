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
      {/* Glow effect behind globe */}
      <div 
        className="absolute inset-0 rounded-full opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.4) 0%, transparent 70%)',
          filter: 'blur(20px)',
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
            className="absolute rounded-full border border-emerald-500/30"
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
            className="absolute rounded-full border border-emerald-500/25"
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
          className="absolute rounded-full border-2 border-emerald-400/50"
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
          className="absolute rounded-full border-2 border-emerald-400/40"
          style={{
            width: size * 0.9,
            height: size * 0.9,
            left: size * 0.05,
            top: size * 0.05,
            transform: 'rotateY(0deg)',
            transformStyle: 'preserve-3d',
          }}
        />

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

        {/* Floating particles around globe */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 rounded-full bg-emerald-300"
            style={{
              left: size / 2,
              top: size / 2,
            }}
            animate={{
              x: [0, Math.cos((i * 60 * Math.PI) / 180) * size * 0.6],
              y: [0, Math.sin((i * 60 * Math.PI) / 180) * size * 0.6],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5,
              ease: 'easeOut',
            }}
          />
        ))}
      </motion.div>

      {/* Outer ring */}
      <div 
        className="absolute inset-0 rounded-full border border-emerald-500/20"
        style={{ transform: 'scale(1.1)' }}
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
