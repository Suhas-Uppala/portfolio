'use client';

import { Github, Linkedin, Mail, Home, Terminal, Sparkles } from 'lucide-react';

interface HeaderProps {
  currentView: 'hero' | 'terminal';
  onExploreProjects: () => void;
  onGoHome: () => void;
}

export default function Header({ currentView, onExploreProjects, onGoHome }: HeaderProps) {
  return (
    <header className="shrink-0 relative z-50">
      {/* Gradient border effect */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-emerald-500/30 via-emerald-500/50 to-emerald-500/30" />
      
      {/* Background with glassmorphism */}
      <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl" />
      
      <div className="relative w-full px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo/Name */}
        {/* Logo/Name */}
        <div className="flex items-center gap-3 group cursor-pointer" onClick={onGoHome}>
          {/* Custom S Logo - Geometric Block Design */}
          <div className="relative w-9 h-9 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-lg">
              <defs>
                <linearGradient id="logoGradientTop" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#34d399" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
                <linearGradient id="logoGradientBottom" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
              </defs>
              
              {/* Upper Segment (Top Bar + Left Vert + Mid Top) */}
              <path 
                d="M32 8 L10 8 L10 22 L22 22 L22 14 L32 14 L32 8Z" 
                fill="url(#logoGradientTop)" 
                className="group-hover:translate-x-[1px] group-hover:-translate-y-[1px] transition-transform duration-300"
              />
              
              {/* Lower Segment (Mid Bottom + Right Vert + Bottom Bar) */}
              <path 
                d="M18 20 L30 20 L30 34 L8 34 L8 26 L18 26 L18 20Z" 
                fill="url(#logoGradientBottom)"
                className="group-hover:-translate-x-[1px] group-hover:translate-y-[1px] transition-transform duration-300"
              />
              
              {/* Center Interlock accent */}
              <path 
                d="M20 20 L22 20 L22 22 L20 22 Z" 
                fill="#064e3b"
                opacity="0.3"
              />
            </svg>
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-lg bg-emerald-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
          </div>
          
          {/* Name */}
          <div className="flex flex-col">
            <span className="text-lg font-bold text-white group-hover:text-emerald-50 transition-colors">
              {process.env.NEXT_PUBLIC_NAME}
            </span>
            <span className="text-xs text-slate-400 hidden sm:block">
              {process.env.NEXT_PUBLIC_TITLE}
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-3">
          {currentView === 'hero' ? (
            <button
              onClick={onExploreProjects}
              className="group relative flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-105"
            >
              <Terminal size={16} className="group-hover:animate-bounce transition-transform duration-300" />
              <span>Open Terminal</span>
              <Sparkles size={14} className="opacity-70 group-hover:opacity-100 group-hover:animate-pulse transition-opacity" />
              {/* Ping effect */}
              <div className="absolute -inset-0.5 rounded-full bg-emerald-500/20 opacity-0 group-hover:opacity-100 group-hover:animate-ping pointer-events-none" />
            </button>
          ) : (
            <div className="flex items-center gap-3">
              {/* GitHub */}
              <a
                href={process.env.NEXT_PUBLIC_GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                className="group relative"
              >
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-slate-800/80 to-slate-700/80 border border-slate-600/30 hover:border-slate-500/60 hover:from-slate-700/80 hover:to-slate-600/80 transition-all duration-300 group-hover:scale-105">
                  <Github size={18} className="text-slate-200 group-hover:text-white group-hover:animate-bounce transition-colors" />
                  <span className="hidden sm:inline text-sm font-medium text-slate-200 group-hover:text-white">GitHub</span>
                </div>
                {/* Ping effect */}
                <div className="absolute -inset-0.5 rounded-lg bg-slate-400/20 opacity-0 group-hover:opacity-100 group-hover:animate-ping pointer-events-none" />
              </a>
              
              {/* LinkedIn */}
              <a
                href={process.env.NEXT_PUBLIC_LINKEDIN_URL}
                target="_blank"
                rel="noreferrer"
                className="group relative"
              >
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600/20 to-blue-500/20 border border-blue-500/30 hover:border-blue-400/60 hover:from-blue-600/30 hover:to-blue-500/30 transition-all duration-300 group-hover:scale-105">
                  <Linkedin size={18} className="text-blue-400 group-hover:text-blue-300 group-hover:animate-bounce transition-colors" />
                  <span className="hidden sm:inline text-sm font-medium text-blue-300 group-hover:text-blue-200">LinkedIn</span>
                </div>
                {/* Ping effect */}
                <div className="absolute -inset-0.5 rounded-lg bg-blue-500/20 opacity-0 group-hover:opacity-100 group-hover:animate-ping pointer-events-none" />
              </a>
              
              {/* Email */}
              <a
                href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}
                className="group relative"
              >
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-rose-600/20 to-orange-500/20 border border-rose-500/30 hover:border-rose-400/60 hover:from-rose-600/30 hover:to-orange-500/30 transition-all duration-300 group-hover:scale-105">
                  <Mail size={18} className="text-rose-400 group-hover:text-rose-300 group-hover:animate-bounce transition-colors" />
                  <span className="hidden sm:inline text-sm font-medium text-rose-300 group-hover:text-rose-200">Email</span>
                </div>
                {/* Ping effect */}
                <div className="absolute -inset-0.5 rounded-lg bg-rose-500/20 opacity-0 group-hover:opacity-100 group-hover:animate-ping pointer-events-none" />
              </a>
              
              {/* Vertical Divider */}
              <div className="w-px h-8 bg-gradient-to-b from-transparent via-slate-600 to-transparent mx-1" />
              
              {/* Home Button */}
              <button
                onClick={onGoHome}
                className="group relative"
              >
                <div className="flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-500 text-white font-semibold shadow-lg shadow-emerald-500/30 group-hover:shadow-emerald-400/50 transition-all duration-300 group-hover:scale-105">
                  <Home size={16} className="group-hover:animate-bounce transition-transform duration-300" />
                  <span className="hidden sm:inline text-sm">Home</span>
                </div>
                {/* Ping effect */}
                <div className="absolute -inset-0.5 rounded-full bg-emerald-500/20 opacity-0 group-hover:opacity-100 group-hover:animate-ping pointer-events-none" />
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
