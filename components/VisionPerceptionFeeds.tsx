'use client';

import { motion } from 'framer-motion';

export default function VisionPerceptionFeeds() {
  const feeds = [
    {
      title: 'Segmentation',
      confidence: '98%',
      barColor: '#34d399',
      width: '98%',
      renderVisual: () => (
        <div 
          className="relative w-full h-full rounded overflow-hidden flex items-center justify-center"
          style={{
            background: 'linear-gradient(to bottom, #15803d 0%, #166534 60%, #14532d 100%)',
          }}
        >
          {/* Background environment mask */}
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:6px_6px]" />
          
          {/* Silhouette Human Segmentation Mask in Purple/Magenta */}
          <svg viewBox="0 0 80 100" className="w-16 h-20 drop-shadow-[0_0_12px_rgba(168,85,247,0.7)]">
            {/* Head */}
            <circle cx="40" cy="22" r="10" fill="#a855f7" />
            {/* Torso & Shoulders */}
            <path
              d="M24 38 C24 34, 30 32, 40 32 C50 32, 56 34, 56 38 L54 65 L26 65 Z"
              fill="#a855f7"
            />
            {/* Legs */}
            <path
              d="M27 65 L25 96 L36 96 L37 65 Z M43 65 L44 96 L55 96 L53 65 Z"
              fill="#9333ea"
            />
          </svg>
        </div>
      ),
    },
    {
      title: 'Depth',
      confidence: '76%',
      barColor: '#38bdf8',
      width: '76%',
      renderVisual: () => (
        <div 
          className="relative w-full h-full rounded overflow-hidden flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 40%, #1e1b4b 80%, #030712 100%)',
          }}
        >
          {/* Depth map silhouette in deep indigo */}
          <svg viewBox="0 0 80 100" className="w-16 h-20 opacity-90 drop-shadow-[0_0_10px_rgba(56,189,248,0.5)]">
            <circle cx="40" cy="22" r="10" fill="#0c4a6e" stroke="#38bdf8" strokeWidth="0.8" />
            <path
              d="M24 38 C24 34, 30 32, 40 32 C50 32, 56 34, 56 38 L54 65 L26 65 Z"
              fill="#075985"
            />
            <path
              d="M27 65 L25 96 L36 96 L37 65 Z M43 65 L44 96 L55 96 L53 65 Z"
              fill="#082f49"
            />
          </svg>
          {/* Depth contour lines */}
          <div className="absolute inset-0 pointer-events-none opacity-25 border-b border-cyan-300" />
        </div>
      ),
    },
    {
      title: 'Thermal',
      confidence: '85%',
      barColor: '#f59e0b',
      width: '85%',
      renderVisual: () => (
        <div 
          className="relative w-full h-full rounded overflow-hidden flex items-center justify-center"
          style={{
            background: 'linear-gradient(to bottom, #311042 0%, #1e1b4b 50%, #0f172a 100%)',
          }}
        >
          {/* Hot Thermal Signature in Glowing Yellow/Orange */}
          <svg viewBox="0 0 80 100" className="w-16 h-20 drop-shadow-[0_0_15px_rgba(250,204,21,0.9)]">
            {/* Head - Core heat */}
            <circle cx="40" cy="22" r="10" fill="#fef08a" />
            <circle cx="40" cy="22" r="7" fill="#ffffff" />
            {/* Body - Thermal gradient layers */}
            <path
              d="M24 38 C24 34, 30 32, 40 32 C50 32, 56 34, 56 38 L54 65 L26 65 Z"
              fill="#f59e0b"
            />
            <path
              d="M28 40 C28 36, 32 35, 40 35 C48 35, 52 36, 52 40 L50 62 L30 62 Z"
              fill="#fef08a"
            />
            {/* Legs */}
            <path
              d="M27 65 L25 96 L36 96 L37 65 Z M43 65 L44 96 L55 96 L53 65 Z"
              fill="#ea580c"
            />
          </svg>
        </div>
      ),
    },
    {
      title: 'Flow',
      confidence: '91%',
      barColor: '#22d3ee',
      width: '91%',
      renderVisual: () => (
        <div 
          className="relative w-full h-full rounded overflow-hidden flex items-center justify-center"
          style={{
            background: 'radial-gradient(circle at 30% 40%, #facc15 0%, #4ade80 25%, #38bdf8 55%, #ec4899 85%)',
          }}
        >
          {/* Vector Flow Optical Rays Overlay */}
          <div className="absolute inset-0 grid grid-cols-5 grid-rows-5 opacity-40">
            {Array.from({ length: 25 }).map((_, i) => (
              <div key={`flow-v-${i}`} className="flex items-center justify-center text-[7px] text-white font-bold">
                ↗
              </div>
            ))}
          </div>
          {/* Center Motion Vortex */}
          <div className="w-10 h-10 rounded-full border-2 border-white/60 border-dashed animate-spin opacity-80" 
            style={{ animationDuration: '6s' }} 
          />
        </div>
      ),
    },
  ];

  return (
    <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
      {feeds.map((feed, idx) => (
        <motion.div
          key={feed.title}
          className="cyber-glass-panel rounded-lg p-2 flex flex-col gap-1.5 hover:scale-[1.02] transition-transform"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + idx * 0.1, duration: 0.5 }}
        >
          {/* Card Header with Technical Dots */}
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-300">
            <span className="font-semibold text-slate-200">{feed.title}</span>
            <div className="flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse" />
              <span className="w-1 h-1 rounded-full bg-emerald-400" />
            </div>
          </div>

          {/* Visual Canvas Display Area */}
          <div className="w-full h-20 sm:h-24 rounded border border-slate-700/60 overflow-hidden relative shadow-inner">
            {feed.renderVisual()}
            {/* Live Scanline / Reticle Line */}
            <div className="absolute inset-x-0 h-px bg-white/40 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Confidence Metric Progress Bar */}
          <div className="flex items-center gap-2 pt-0.5">
            <div className="flex-1 h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: feed.barColor }}
                initial={{ width: 0 }}
                animate={{ width: feed.width }}
                transition={{ delay: 0.5 + idx * 0.1, duration: 0.8, ease: 'easeOut' }}
              />
            </div>
            <span className="text-[9px] font-mono text-slate-400 shrink-0">{feed.confidence}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
