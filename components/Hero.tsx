'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import CyberCore3D from './CyberCore3D';
import NeuralPipelineVisualizer from './NeuralPipelineVisualizer';

interface HeroProps {
  onViewMore: () => void;
}

// Typing effect hook
function useTypingEffect(text: string, speed: number = 40, startDelay: number = 600) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let charIndex = 0;

    const startTyping = () => {
      const type = () => {
        if (charIndex < text.length) {
          setDisplayedText(text.slice(0, charIndex + 1));
          charIndex++;
          timeout = setTimeout(type, speed);
        } else {
          setIsComplete(true);
        }
      };
      type();
    };

    timeout = setTimeout(startTyping, startDelay);
    return () => clearTimeout(timeout);
  }, [text, speed, startDelay]);

  return { displayedText, isComplete };
}

const achievements = [
  { label: 'GDGC 2025 Winner', emoji: '🏆' },
  { label: 'SIH 2024 & 2025 Finalist', emoji: '⭐' },
  { label: 'Amazon ML School', emoji: '🎓' },
  { label: 'Published Researcher', emoji: '📜' },
];

export default function Hero({ onViewMore }: HeroProps) {
  const tagline = process.env.NEXT_PUBLIC_TAGLINE || 'AI/ML Engineer · Full-Stack Developer';
  const { displayedText, isComplete } = useTypingEffect(tagline, 35, 500);

  return (
    <section className="relative w-full min-h-[82vh] flex items-center justify-center py-4 sm:py-6 px-2 sm:px-4 select-none">
      
      {/* ─── SHARP-EDGED CONNECTED CIRCUIT BUS PIPES (ZERO CURVES, 100% SHARP ANGLES) ─── */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none z-0 hidden xl:block overflow-visible"
        viewBox="0 0 1400 700"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="sharpBusGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.9" />
            <stop offset="45%" stopColor="#38bdf8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.95" />
          </linearGradient>
          <linearGradient id="sharpBusGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#a855f7" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.95" />
          </linearGradient>
          <linearGradient id="sharpBusGrad3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.8" />
            <stop offset="55%" stopColor="#34d399" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        {/* ─── 1. TOP SHARP CIRCUIT BUS (Directly connected to Left Top Neural Output) ─── */}
        {/* Main Sharp Top Trunk: Clear outside the main card */}
        <path
          d="M 310 175 L 340 175 L 360 25 L 1035 25 L 1055 175 L 1085 175"
          fill="none"
          stroke="url(#sharpBusGrad1)"
          strokeWidth="2"
          className="animate-synapse-stream opacity-85"
        />

        {/* Top Secondary Sharp Branch: Bifurcates to Higher Satellite */}
        <path
          d="M 360 25 L 375 10 L 980 10 L 1005 90 L 1060 90"
          fill="none"
          stroke="rgba(34, 211, 238, 0.55)"
          strokeWidth="1.4"
          strokeDasharray="4 3"
          className="animate-synapse-stream opacity-70"
          style={{ animationDuration: '2.2s' }}
        />

        {/* Top Tertiary Sharp Stepped Trace */}
        <path
          d="M 320 195 L 350 195 L 370 45 L 1025 45 L 1045 195 L 1085 195"
          fill="none"
          stroke="rgba(245, 158, 11, 0.5)"
          strokeWidth="1.2"
          className="animate-synapse-stream opacity-65"
          style={{ animationDuration: '1.8s' }}
        />

        {/* ─── 2. BOTTOM SHARP CIRCUIT BUS (Directly connected to Left Bottom Code Synapses) ─── */}
        {/* Main Sharp Bottom Trunk: Clear outside the main card */}
        <path
          d="M 310 535 L 340 535 L 360 675 L 1035 675 L 1055 535 L 1085 535"
          fill="none"
          stroke="url(#sharpBusGrad2)"
          strokeWidth="2"
          className="animate-synapse-stream opacity-85"
          style={{ animationDuration: '2s' }}
        />

        {/* Bottom Secondary Sharp Branch: Bifurcates to Lower Satellite */}
        <path
          d="M 360 675 L 375 690 L 980 690 L 1005 605 L 1060 605"
          fill="none"
          stroke="rgba(16, 185, 129, 0.55)"
          strokeWidth="1.4"
          strokeDasharray="5 3"
          className="animate-synapse-stream opacity-70"
          style={{ animationDuration: '2.5s' }}
        />

        {/* Bottom Tertiary Sharp Stepped Trace */}
        <path
          d="M 320 515 L 350 515 L 370 655 L 1025 655 L 1045 515 L 1085 515"
          fill="none"
          stroke="url(#sharpBusGrad3)"
          strokeWidth="1.3"
          className="animate-synapse-stream opacity-65"
          style={{ animationDuration: '1.7s' }}
        />

        {/* ─── SHARP PCB SOLDER JUNCTION PINS & TERMINALS ─── */}
        {/* Left Connection Ports */}
        <circle cx="310" cy="175" r="3.5" fill="#f59e0b" stroke="#030712" strokeWidth="1.5" className="animate-pulse" />
        <circle cx="310" cy="535" r="3.5" fill="#10b981" stroke="#030712" strokeWidth="1.5" className="animate-pulse" />

        {/* Top Sharp Angle Solder Joints */}
        <circle cx="340" cy="175" r="3" fill="#f59e0b" />
        <circle cx="360" cy="25" r="3.5" fill="#38bdf8" className="animate-pulse" />
        <circle cx="375" cy="10" r="2.5" fill="#22d3ee" />
        <circle cx="980" cy="10" r="2.5" fill="#22d3ee" />
        <circle cx="1005" cy="90" r="2.5" fill="#10b981" />
        <circle cx="1035" cy="25" r="3.5" fill="#10b981" className="animate-pulse" />
        <circle cx="1055" cy="175" r="3" fill="#34d399" />
        <circle cx="1085" cy="175" r="4" fill="#22d3ee" stroke="#030712" strokeWidth="1.5" className="animate-pulse" />

        {/* Bottom Sharp Angle Solder Joints */}
        <circle cx="340" cy="535" r="3" fill="#10b981" />
        <circle cx="360" cy="675" r="3.5" fill="#a855f7" className="animate-pulse" />
        <circle cx="375" cy="690" r="2.5" fill="#06b6d4" />
        <circle cx="980" cy="690" r="2.5" fill="#06b6d4" />
        <circle cx="1005" cy="605" r="2.5" fill="#38bdf8" />
        <circle cx="1035" cy="675" r="3.5" fill="#06b6d4" className="animate-pulse" />
        <circle cx="1055" cy="535" r="3" fill="#38bdf8" />
        <circle cx="1085" cy="535" r="4" fill="#10b981" stroke="#030712" strokeWidth="1.5" className="animate-pulse" />
      </svg>

      {/* ─── 3-COLUMN BALANCED GRID LAYOUT ─── */}
      <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-center">
        
        {/* ─── 1. LEFT COLUMN: NEURAL ARCHITECTURE PIPELINE (lg:col-span-3) ─── */}
        <motion.div 
          className="lg:col-span-3 hidden lg:flex flex-col justify-center order-2 lg:order-1 h-full"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="cyber-glass-panel rounded-2xl p-3 sm:p-4 border border-cyan-500/20 shadow-[0_0_25px_rgba(0,0,0,0.6)] relative">
            {/* Physical Output Port Terminals on the Right Edge of the Left Box */}
            <div className="absolute -right-2 top-[22%] w-4 h-4 rounded-full bg-slate-950 border-2 border-amber-400 flex items-center justify-center shadow-[0_0_10px_rgba(245,158,11,0.8)] z-20">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
            </div>
            <div className="absolute -right-2 top-[76%] w-4 h-4 rounded-full bg-slate-950 border-2 border-emerald-400 flex items-center justify-center shadow-[0_0_10px_rgba(16,185,129,0.8)] z-20">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            </div>

            {/* Top HUD Header */}
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pb-2 mb-2.5 border-b border-slate-800">
              <span className="text-cyan-400 font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                NEURAL_ARCHITECTURE
              </span>
              <span className="text-[8.5px] text-slate-500">BUS: 128Gbps</span>
            </div>
            
            <NeuralPipelineVisualizer />
          </div>
        </motion.div>

        {/* ─── 2. CENTER COLUMN: ENLARGED HERO PROFILE CARD (lg:col-span-6) ─── */}
        <motion.div 
          className="lg:col-span-6 flex flex-col items-center justify-center order-1 lg:order-2 w-full"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* THE MAIN BIGGER CYBER BOX */}
          <div className="relative w-full rounded-2xl bg-slate-950/85 border border-cyan-500/30 p-6 sm:p-8 md:p-10 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.85)] hover:border-emerald-500/50 transition-all duration-300">
            
            {/* 4 Glowing Corner L-Brackets */}
            <div className="absolute top-2.5 left-2.5 w-5 h-5 border-t-2 border-l-2 border-emerald-400" />
            <div className="absolute top-2.5 right-2.5 w-5 h-5 border-t-2 border-r-2 border-emerald-400" />
            <div className="absolute bottom-2.5 left-2.5 w-5 h-5 border-b-2 border-l-2 border-cyan-400" />
            <div className="absolute bottom-2.5 right-2.5 w-5 h-5 border-b-2 border-r-2 border-cyan-400" />

            {/* Top Cyber Node Status Tag */}
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-3 sm:mb-4 pb-2 border-b border-slate-800/80">
              <span className="text-emerald-400 font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                CORE_IDENTITY // ACTIVE PIPELINE
              </span>
              <span className="text-[9px] text-slate-500 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">NODE_0x7F</span>
            </div>

            {/* Main Glowing Headline */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] xl:text-[46px] font-black tracking-tight leading-[1.16]">
              <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.35)]">
                {process.env.NEXT_PUBLIC_NAME || 'Suhas Uppala'}
              </span>
              <br />
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_22px_rgba(34,211,238,0.45)]">
                {displayedText}
                {!isComplete && (
                  <span 
                    className="inline-block w-[3px] h-[0.85em] bg-cyan-400 ml-1.5 align-text-bottom" 
                    style={{ animation: 'cursorBlink 1s step-end infinite' }} 
                  />
                )}
              </span>
            </h1>

            {/* Subtitle / Contact Line */}
            <p className="mt-3.5 sm:mt-4 text-slate-300 text-xs sm:text-sm md:text-base font-mono flex flex-wrap gap-x-2.5 gap-y-1.5">
              <span>{process.env.NEXT_PUBLIC_LOCATION || 'Hyderabad, Telangana'}</span>
              <span className="text-slate-600">—</span>
              <span className="text-emerald-400">{process.env.NEXT_PUBLIC_PHONE || '+91-79896 65270'}</span>
              <span className="text-slate-600">·</span>
              <span className="text-cyan-400 break-all">{process.env.NEXT_PUBLIC_EMAIL || 'suhasuppala1805@gmail.com'}</span>
            </p>

            {/* Achievement Badges */}
            <div className="mt-4 sm:mt-5 flex flex-wrap gap-1.5 sm:gap-2.5">
              {achievements.map((badge, idx) => (
                <motion.div
                  key={idx}
                  className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium bg-slate-900/90 border border-emerald-500/35 text-emerald-300 backdrop-blur-md shadow-[0_0_12px_rgba(16,185,129,0.18)] hover:border-emerald-400 hover:shadow-[0_0_18px_rgba(16,185,129,0.35)] transition-all cursor-default"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + idx * 0.1, duration: 0.4 }}
                >
                  <span>{badge.emoji}</span>
                  <span>{badge.label}</span>
                </motion.div>
              ))}
            </div>

            {/* Neon Action Buttons (Explore & Resume) */}
            <div className="mt-5 sm:mt-7 flex items-center gap-3.5 sm:gap-4">
              <button
                onClick={onViewMore}
                className="cyber-btn-explore px-6 sm:px-8 py-2 sm:py-2.5 rounded-xl text-white text-xs sm:text-sm md:text-base font-bold tracking-wide transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.45)]"
              >
                <span>Explore</span>
                <span className="text-emerald-300 text-xs sm:text-sm">►</span>
              </button>
              <a
                href={process.env.NEXT_PUBLIC_RESUME_URL || 'https://drive.google.com/file/d/1Zt3VjW-067v00k3Yv4f66p4Z10K3_s4f/view?usp=sharing'}
                target="_blank"
                rel="noopener noreferrer"
                className="cyber-btn-resume px-6 sm:px-8 py-2 sm:py-2.5 rounded-xl text-cyan-200 text-xs sm:text-sm md:text-base font-bold tracking-wide transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 shadow-[0_0_20px_rgba(34,211,238,0.35)]"
              >
                <span>Resume</span>
                <span className="text-cyan-400 text-xs sm:text-sm">↗</span>
              </a>
            </div>

          </div>
        </motion.div>

        {/* ─── 3. RIGHT COLUMN: 3D CYBER HEXAGON WITH SPHERE CORE (lg:col-span-3) ─── */}
        <motion.div 
          className="lg:col-span-3 flex flex-col items-center justify-center relative order-3 h-full"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
        >
          <div className="hidden sm:block">
            <CyberCore3D size={350} />
          </div>
          <div className="block sm:hidden">
            <CyberCore3D size={260} />
          </div>
        </motion.div>

      </div>

    </section>
  );
}