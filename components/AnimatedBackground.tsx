'use client';

import { motion } from 'framer-motion';

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Base dark background */}
      <div className="absolute inset-0" style={{ background: 'var(--surface)' }} />
      
      {/* Moving Diagonal Grid */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute animate-grid-move"
          style={{
            width: '200%',
            height: '200%',
            top: '-50%',
            left: '-50%',
            backgroundImage: `
              linear-gradient(to right, rgba(16, 185, 129, 0.12) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(16, 185, 129, 0.12) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
        
        {/* Secondary grid layer for depth */}
        <div 
          className="absolute animate-grid-move-slow"
          style={{
            width: '200%',
            height: '200%',
            top: '-50%',
            left: '-50%',
            backgroundImage: `
              linear-gradient(to right, rgba(16, 185, 129, 0.06) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(16, 185, 129, 0.06) 1px, transparent 1px)
            `,
            backgroundSize: '120px 120px',
          }}
        />

        {/* Grid intersection dots */}
        <div 
          className="absolute animate-grid-move"
          style={{
            width: '200%',
            height: '200%',
            top: '-50%',
            left: '-50%',
            backgroundImage: `radial-gradient(circle, rgba(16, 185, 129, 0.25) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Aurora gradient band at top */}
      <div 
        className="absolute inset-x-0 top-0 h-72 aurora-band opacity-60"
      />

      {/* Glowing line moving diagonally */}
      <motion.div
        className="absolute w-[200%] h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent"
        style={{ 
          transformOrigin: 'center',
          rotate: '45deg',
        }}
        animate={{
          x: ['-100%', '100%'],
          y: ['-100%', '100%'],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Second diagonal line */}
      <motion.div
        className="absolute w-[200%] h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"
        style={{ 
          transformOrigin: 'center',
          rotate: '45deg',
        }}
        animate={{
          x: ['-100%', '100%'],
          y: ['-100%', '100%'],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'linear',
          delay: 5,
        }}
      />

      {/* Floating binary/hex code particles */}
      {['0x4F', '10110', '0xFF', '01001', '0xA3', '11010'].map((code, i) => (
        <motion.div
          key={`code-${i}`}
          className="absolute text-emerald-500/10 font-mono text-xs select-none pointer-events-none"
          style={{
            left: `${10 + i * 15}%`,
            top: `${15 + (i % 3) * 30}%`,
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{
            duration: 6 + i * 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 1.2,
          }}
        >
          {code}
        </motion.div>
      ))}
      
      {/* Gradient orbs */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)',
          top: '-20%',
          right: '-10%',
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(34, 211, 238, 0.06) 0%, transparent 70%)',
          bottom: '-15%',
          left: '-5%',
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />

      {/* Corner brackets with pulse animation */}
      <div className="absolute top-6 left-6 w-20 h-20 border-l-2 border-t-2 corner-bracket" />
      <div className="absolute top-6 right-6 w-20 h-20 border-r-2 border-t-2 corner-bracket" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-6 left-6 w-20 h-20 border-l-2 border-b-2 corner-bracket" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-6 right-6 w-20 h-20 border-r-2 border-b-2 corner-bracket" style={{ animationDelay: '3s' }} />

      {/* CRT Scanlines */}
      <div className="crt-scanlines" />

      {/* Noise texture */}
      <div className="noise-texture" />

      {/* Vignette overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(10, 15, 26, 0.7) 100%)'
        }} 
      />
    </div>
  );
}
