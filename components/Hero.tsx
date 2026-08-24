'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Globe from './Globe';

interface HeroProps {
  onViewMore: () => void;
}

// Typing animation hook
function useTypingEffect(text: string, speed: number = 50, startDelay: number = 800) {
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
  { label: 'Published Researcher', emoji: '📝' },
];

export default function Hero({ onViewMore }: HeroProps) {
  const tagline = process.env.NEXT_PUBLIC_TAGLINE || 'AI/ML Engineer · Full-Stack Developer';
  const { displayedText, isComplete } = useTypingEffect(tagline, 40, 600);

  return (
    <section className="relative w-full min-h-[80vh] overflow-hidden flex items-center">
      {/* Gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-950/20 to-slate-950/10" />

      {/* Decorative code snippet (faded background element) */}
      <motion.div
        className="absolute right-8 bottom-16 text-emerald-500/[0.04] font-mono text-sm leading-relaxed select-none pointer-events-none hidden lg:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <pre>{`const developer = {
  name: "${process.env.NEXT_PUBLIC_NAME}",
  skills: ["AI/ML", "CV", "NLP"],
  passion: "Edge AI",
  status: "Building...",
};`}</pre>
      </motion.div>

      <div className="relative z-10 w-full flex flex-col lg:flex-row items-center justify-between gap-8 p-8 md:p-12">
        {/* Left side - Text content */}
        <motion.div
          className="max-w-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
            <span className="text-slate-200">{process.env.NEXT_PUBLIC_NAME}</span>
            <br />
            <span className="bg-gradient-to-r from-emerald-400 via-emerald-300 to-cyan-400 bg-clip-text text-transparent">
              {displayedText}
              {!isComplete && (
                <span className="inline-block w-[3px] h-[0.85em] bg-emerald-400 ml-1 align-text-bottom" 
                  style={{ animation: 'cursorBlink 1s step-end infinite' }} 
                />
              )}
            </span>
          </h1>

          <motion.p
            className="mt-4 text-slate-300/90 text-lg md:text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {process.env.NEXT_PUBLIC_LOCATION} — {process.env.NEXT_PUBLIC_PHONE} · {process.env.NEXT_PUBLIC_EMAIL}
          </motion.p>

          {/* Achievement badges */}
          <motion.div
            className="mt-5 flex flex-wrap gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.6 }}
          >
            {achievements.map((badge, idx) => (
              <motion.span
                key={idx}
                className="badge-pulse inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-sm"
                style={{
                  background: 'rgba(16, 185, 129, 0.06)',
                  borderColor: 'rgba(16, 185, 129, 0.2)',
                  color: '#a7f3d0',
                  animationDelay: `${idx * 0.5}s`,
                }}
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 1.5 + idx * 0.15, duration: 0.4 }}
              >
                <span>{badge.emoji}</span>
                <span>{badge.label}</span>
              </motion.span>
            ))}
          </motion.div>

          <motion.div
            className="mt-6 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <button
              onClick={onViewMore}
              className="btn-glow px-6 py-2.5 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/20"
            >
              Explore
            </button>
            <a
              href={process.env.NEXT_PUBLIC_RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 rounded-md border border-slate-700/70 hover:border-emerald-500/40 text-slate-200 hover:text-white transition-all duration-300 hover:bg-emerald-500/5"
            >
              Resume
            </a>
          </motion.div>
        </motion.div>

        {/* Right side - Interactive Globe */}
        <motion.div
          className="hidden md:flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
        >
          <Globe size={280} />
        </motion.div>
      </div>
    </section>
  );
}