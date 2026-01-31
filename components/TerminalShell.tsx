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
    <div className={`bg-slate-900/70 backdrop-blur rounded-xl border border-slate-800 shadow-2xl overflow-hidden ${className}`}>
      {/* Terminal header with traffic lights - fixed at top */}
      <div className="h-10 flex items-center px-3 border-b border-slate-800 shrink-0 bg-slate-900/50">
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded-full bg-red-500/80" />
          <span className="w-3.5 h-3.5 rounded-full bg-yellow-400/80" />
          <span className="w-3.5 h-3.5 rounded-full bg-green-500/80" />
        </div>
        <div className="ml-3 text-sm text-slate-300">{title}</div>
      </div>
      
      {/* Terminal content - scrollable area */}
      <div className="flex-1 min-h-0 overflow-hidden">{children}</div>
    </div>
  );
}