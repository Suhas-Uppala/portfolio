'use client';

import { motion } from 'framer-motion';

export default function NeuralPipelineVisualizer() {
  return (
    <div className="flex flex-col gap-3.5 text-xs font-mono select-none w-full">
      
      {/* ─── 1. TOP: FULLY RESPONSIVE NEURAL NETWORK ARCHITECTURE ─── */}
      <div className="flex flex-col w-full bg-slate-950/60 rounded-xl p-2.5 border border-slate-800/80">
        <div className="flex justify-between items-center w-full px-1 text-[8px] text-slate-400 uppercase tracking-widest mb-2 font-semibold">
          <span>INPUT</span>
          <span>LATENT_LAYERS</span>
          <span>SYNAPSES</span>
          <span>OUTPUT</span>
        </div>

        <svg viewBox="0 0 260 75" className="w-full h-auto overflow-visible">
          {/* Animated Connecting Synaptic Lines */}
          {[
            // Col 1 to 2
            [12, 18, 65, 12], [12, 18, 65, 36], [12, 38, 65, 12], [12, 38, 65, 36], [12, 38, 65, 60], [12, 58, 65, 36], [12, 58, 65, 60],
            // Col 2 to 3
            [65, 12, 125, 20], [65, 12, 125, 45], [65, 36, 125, 20], [65, 36, 125, 45], [65, 60, 125, 45], [65, 60, 125, 60],
            // Col 3 to 4
            [125, 20, 185, 25], [125, 20, 185, 50], [125, 45, 185, 25], [125, 45, 185, 50], [125, 60, 185, 50],
            // Col 4 to 5 (Output)
            [185, 25, 245, 38], [185, 50, 245, 38],
          ].map(([x1, y1, x2, y2], idx) => (
            <line
              key={`nl-${idx}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={idx % 3 === 0 ? 'rgba(34, 211, 238, 0.4)' : idx % 3 === 1 ? 'rgba(52, 211, 153, 0.35)' : 'rgba(168, 85, 247, 0.3)'}
              strokeWidth="0.8"
              strokeDasharray="3 2"
              className="animate-synapse-stream"
              style={{ animationDuration: `${1.8 + (idx % 4) * 0.4}s` }}
            />
          ))}

          {/* Col 1: Input (3 nodes) */}
          {[18, 38, 58].map((y, i) => (
            <g key={`in-${i}`}>
              <circle cx="12" cy={y} r="4" fill="#030712" stroke="#38bdf8" strokeWidth="1.2" />
              <circle cx="12" cy={y} r="1.5" fill="#38bdf8" />
            </g>
          ))}

          {/* Col 2: Hidden Conv (3 nodes) */}
          {[12, 36, 60].map((y, i) => (
            <g key={`hid1-${i}`}>
              <circle cx="65" cy={y} r="4.5" fill="#030712" stroke="#34d399" strokeWidth="1.2" />
              <circle cx="65" cy={y} r="2" fill="#34d399" className="animate-pulse" style={{ animationDelay: `${i * 0.25}s` }} />
            </g>
          ))}

          {/* Col 3: Latent Dense (3 nodes) */}
          {[20, 45, 60].map((y, i) => (
            <g key={`hid2-${i}`}>
              <circle cx="125" cy={y} r="4" fill="#030712" stroke="#a78bfa" strokeWidth="1.2" />
              <circle cx="125" cy={y} r="1.5" fill="#a78bfa" />
            </g>
          ))}

          {/* Col 4: Synapses Layer (2 nodes) */}
          {[25, 50].map((y, i) => (
            <g key={`syn-${i}`}>
              <circle cx="185" cy={y} r="4.5" fill="#030712" stroke="#fbbf24" strokeWidth="1.2" />
              <circle cx="185" cy={y} r="2" fill="#fbbf24" />
            </g>
          ))}

          {/* Col 5: Output Node (1 glowing amber node) */}
          <g>
            <circle cx="245" cy="38" r="6" fill="#030712" stroke="#f59e0b" strokeWidth="1.5" className="animate-pulse" />
            <circle cx="245" cy="38" r="3" fill="#f59e0b" />
          </g>
        </svg>
      </div>

      {/* ─── 2. MIDDLE: PIXEL FLOW HEATMAPS & LATENT DATA FLOW ─── */}
      <div className="flex items-center justify-between gap-2.5 bg-slate-950/60 rounded-xl p-2.5 border border-slate-800/80">
        
        {/* Heatmap 1 */}
        <div className="flex flex-col items-center">
          <div className="text-[7.5px] text-cyan-400 font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
            <span>PIXEL FLOW 1</span>
            <span className="text-[8.5px]">↓</span>
          </div>
          <div 
            className="w-12 h-12 rounded border border-cyan-500/40 overflow-hidden relative shadow-[0_0_10px_rgba(6,182,212,0.3)]"
            style={{
              background: 'radial-gradient(circle at 50% 50%, #facc15 0%, #ef4444 40%, #3b82f6 75%, #050b14 100%)',
            }}
          >
            {/* Grid overlay */}
            <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 opacity-30">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={`hm1-${i}`} className="border-r border-b border-white/25" />
              ))}
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white animate-ping" />
          </div>
        </div>

        {/* Heatmap 2 */}
        <div className="flex flex-col items-center">
          <div className="text-[7.5px] text-emerald-400 font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
            <span>PIXEL FLOW 2</span>
            <span className="text-[8.5px]">↓</span>
          </div>
          <div 
            className="w-12 h-12 rounded border border-emerald-500/40 overflow-hidden relative shadow-[0_0_10px_rgba(16,185,129,0.3)]"
            style={{
              background: 'radial-gradient(circle at 60% 40%, #fbbf24 0%, #dc2626 35%, #4338ca 70%, #050b14 100%)',
            }}
          >
            <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 opacity-30">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={`hm2-${i}`} className="border-r border-b border-white/25" />
              ))}
            </div>
          </div>
        </div>

        {/* Latent Vector Stream Telemetry */}
        <div className="flex flex-col items-center justify-center text-slate-400 text-[9px] px-1">
          <div className="flex gap-1 text-emerald-400 font-bold">
            <span className="animate-bounce" style={{ animationDelay: '0s' }}>↓</span>
            <span className="animate-bounce" style={{ animationDelay: '0.15s' }}>↓</span>
            <span className="animate-bounce" style={{ animationDelay: '0.3s' }}>↓</span>
          </div>
          <div className="text-[7.5px] text-slate-500 tracking-wider font-mono mt-0.5">LATENT_VEC</div>
        </div>

      </div>

      {/* ─── 3. BOTTOM: BIOMETRIC SCANNER & CODE MODULE ─── */}
      <div className="flex items-start gap-2.5 bg-slate-950/60 rounded-xl p-2.5 border border-slate-800/80">
        
        {/* Face Landmark Mesh Scanners */}
        <div className="flex flex-col gap-1.5 shrink-0">
          {/* Face 1 */}
          <div className="relative w-12 h-12 rounded border border-emerald-500/50 bg-slate-950 overflow-hidden flex items-center justify-center shadow-[0_0_10px_rgba(16,185,129,0.25)]">
            <div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 border-t border-l border-emerald-400" />
            <div className="absolute top-0.5 right-0.5 w-1.5 h-1.5 border-t border-r border-emerald-400" />
            <div className="absolute bottom-0.5 left-0.5 w-1.5 h-1.5 border-b border-l border-emerald-400" />
            <div className="absolute bottom-0.5 right-0.5 w-1.5 h-1.5 border-b border-r border-emerald-400" />
            
            <svg viewBox="0 0 50 50" className="w-full h-full">
              <ellipse cx="25" cy="25" rx="14" ry="18" fill="none" stroke="rgba(52, 211, 153, 0.4)" strokeWidth="0.8" />
              <path
                d="M25 10 L18 20 L32 20 Z M18 20 L13 28 L25 26 Z M32 20 L25 26 L37 28 Z M25 26 L20 38 L30 38 Z"
                fill="none"
                stroke="rgba(34, 211, 238, 0.6)"
                strokeWidth="0.7"
              />
              {[[25, 10], [18, 20], [32, 20], [25, 26], [13, 28], [37, 28], [20, 38], [30, 38]].map(([cx, cy], i) => (
                <circle key={`lm-${i}`} cx={cx} cy={cy} r="1" fill="#34d399" />
              ))}
            </svg>
            <div className="absolute inset-x-0 h-0.5 bg-cyan-400/80 animate-radar-sweep pointer-events-none" />
          </div>

          {/* Face 2 */}
          <div className="relative w-12 h-12 rounded border border-cyan-500/50 bg-slate-950 overflow-hidden flex items-center justify-center shadow-[0_0_10px_rgba(6,182,212,0.25)]">
            <svg viewBox="0 0 50 50" className="w-full h-full">
              <ellipse cx="25" cy="25" rx="13" ry="17" fill="none" stroke="rgba(34, 211, 238, 0.5)" strokeWidth="0.8" />
              <circle cx="20" cy="22" r="1.5" fill="#22d3ee" />
              <circle cx="30" cy="22" r="1.5" fill="#22d3ee" />
              <path d="M21 32 Q25 36 29 32" fill="none" stroke="#22d3ee" strokeWidth="0.9" />
            </svg>
            <div className="absolute bottom-0.5 right-1 text-[6px] font-mono text-cyan-300">99.4%</div>
          </div>
        </div>

        {/* Code Snippet */}
        <div className="flex flex-col gap-1.5 flex-1 min-w-0">
          <div className="p-1.5 rounded bg-slate-950 border border-slate-800/80 text-[7.5px] font-mono text-slate-400 leading-tight">
            <span className="text-purple-400">export</span> <span className="text-cyan-300">Comp</span> {'{\n'}
            {' '}<span className="text-emerald-400">act</span>=<span className="text-amber-300">'cuda'</span>,{'\n'}
            {' '}<span className="text-emerald-400">pt</span>=<span className="text-amber-300">0.95</span>,{'\n'}
            {' '}<span className="text-blue-400">val</span>(d) {'{\n'}
            {'  '}<span className="text-cyan-400">Sys</span>.<span className="text-emerald-300">opt</span>(pipe);{'\n'}
            {' }'}{'\n'}
            {'}'}
          </div>

          <div className="flex items-center justify-between text-[7px] font-mono text-emerald-400">
            <span className="bg-slate-900 px-1.5 py-0.5 rounded border border-emerald-500/30">SYNAPSES</span>
            <span>─────►</span>
          </div>
        </div>

      </div>

    </div>
  );
}
