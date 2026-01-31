'use client';

import { useState, useEffect } from 'react';
import { Clock, MapPin } from 'lucide-react';

export default function Footer() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedTime = new Intl.DateTimeFormat(undefined, {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(time);

  return (
    <footer className="shrink-0 relative z-50">
      {/* Gradient border effect at top */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-emerald-500/30 via-emerald-500/50 to-emerald-500/30" />
      
      {/* Background with glassmorphism */}
      <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl" />
      
      <div className="relative w-full px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        {/* Left side - Copyright */}
        <div className="text-sm text-slate-300">
          <span className="text-slate-500">©</span> {new Date().getFullYear()}{' '}
          <span className="font-medium bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">
            Suhas Uppala
          </span>
        </div>

        {/* Right side - Status, Location, Time */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Live indicator */}
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="text-emerald-400 text-sm font-medium">Live</span>
          </div>
          
          {/* Location */}
          <div className="hidden sm:flex items-center gap-2 text-slate-400">
            <MapPin size={14} className="text-emerald-400" />
            <span className="text-sm">Hyderabad, India</span>
          </div>
          
          {/* Divider */}
          <div className="w-px h-4 bg-slate-700/50 hidden sm:block" />
          
          {/* Live time */}
          <div className="flex items-center gap-2 text-slate-300">
            <Clock size={16} className="text-emerald-400" />
            <span className="tabular-nums text-sm font-medium hidden sm:inline">{formattedTime}</span>
            <span className="tabular-nums text-sm font-medium sm:hidden">
              {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
