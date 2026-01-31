'use client';

import { motion } from 'framer-motion';

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Base dark background */}
      <div className="absolute inset-0 bg-slate-950" />
      
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
              linear-gradient(to right, rgba(16, 185, 129, 0.15) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(16, 185, 129, 0.15) 1px, transparent 1px)
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
              linear-gradient(to right, rgba(16, 185, 129, 0.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(16, 185, 129, 0.08) 1px, transparent 1px)
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
            backgroundImage: `radial-gradient(circle, rgba(16, 185, 129, 0.3) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Glowing line moving diagonally */}
      <motion.div
        className="absolute w-[200%] h-px bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent"
        style={{ 
          transformOrigin: 'center',
          rotate: '45deg',
        }}
        animate={{
          x: ['-100%', '100%'],
          y: ['-100%', '100%'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Second diagonal line */}
      <motion.div
        className="absolute w-[200%] h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent"
        style={{ 
          transformOrigin: 'center',
          rotate: '45deg',
        }}
        animate={{
          x: ['-100%', '100%'],
          y: ['-100%', '100%'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
          delay: 4,
        }}
      />
      
      {/* Gradient orbs */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, transparent 70%)',
          top: '-20%',
          right: '-10%',
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.4, 0.6, 0.4],
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
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)',
          bottom: '-15%',
          left: '-5%',
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />

      {/* Corner brackets */}
      <div className="absolute top-6 left-6 w-20 h-20 border-l-2 border-t-2 border-emerald-500/30" />
      <div className="absolute top-6 right-6 w-20 h-20 border-r-2 border-t-2 border-emerald-500/30" />
      <div className="absolute bottom-6 left-6 w-20 h-20 border-l-2 border-b-2 border-emerald-500/30" />
      <div className="absolute bottom-6 right-6 w-20 h-20 border-r-2 border-b-2 border-emerald-500/30" />

      {/* Vignette overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(2, 6, 23, 0.7) 100%)'
        }} 
      />
    </div>
  );
}
