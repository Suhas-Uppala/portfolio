'use client';

import { ReactNode } from 'react';

interface TerminalShellProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export default function TerminalShell({ 
  title = 'Terminal', 
  children, 
  className = '' 
}: TerminalShellProps) {
  return (
    <div className={`bg-slate-900/70 backdrop-blur-xl rounded-xl border border-slate-800/80 shadow-2xl overflow-hidden relative ${className}`}>
      {/* Glowing top edge */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />
      
      {/* Terminal header with traffic lights */}
      <div className="h-10 flex items-center px-3 border-b border-slate-800/80 shrink-0 relative" 
        style={{ background: 'linear-gradient(180deg, rgba(17, 24, 39, 0.8), rgba(10, 15, 26, 0.6))' }}
      >
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded-full bg-red-500/80 hover:bg-red-400 transition-colors cursor-default" />
          <span className="w-3.5 h-3.5 rounded-full bg-yellow-400/80 hover:bg-yellow-300 transition-colors cursor-default" />
          <span className="w-3.5 h-3.5 rounded-full bg-green-500/80 hover:bg-green-400 transition-colors cursor-default" />
        </div>
        <div className="ml-3 text-sm text-slate-400 font-mono">{title}</div>
      </div>
      
      {/* Terminal content - scrollable area */}
      <div className="flex-1 min-h-0 overflow-hidden">{children}</div>
    </div>
  );
}