'use client';

import { useState, useCallback, useEffect } from 'react';
import AnimatedBackground from '@/components/AnimatedBackground';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import TerminalView from '@/components/TerminalView';

export default function Home() {
  const [view, setView] = useState<'hero' | 'terminal'>('hero');

  const handleExploreProjects = useCallback(() => setView('terminal'), []);
  const handleGoHome = useCallback(() => setView('hero'), []);

  // Handle hash navigation
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#projects') {
        setView('terminal');
      }
    };

    // Check on initial load
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="fixed inset-0 text-white overflow-hidden">
      {/* Animated background */}
      <AnimatedBackground />

      {/* Main content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <Header
          currentView={view}
          onExploreProjects={handleExploreProjects}
          onGoHome={handleGoHome}
        />

        {/* Main content area */}
        <main className="flex-1 overflow-auto green-scroll">
          <div className={`mx-auto h-full ${view === 'hero' ? 'max-w-6xl px-3 sm:px-4 py-4 sm:py-6' : 'px-1.5 sm:px-3 py-1.5 sm:py-3'}`}>
            {view === 'hero' ? (
              <Hero onViewMore={handleExploreProjects} />
            ) : (
              <TerminalView onGoHome={handleGoHome} />
            )}
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}