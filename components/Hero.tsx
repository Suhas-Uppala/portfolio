'use client';

import { motion } from 'framer-motion';
import Globe from './Globe';

interface HeroProps {
  onViewMore: () => void;
}

export default function Hero({ onViewMore }: HeroProps) {
  return (
    <section className="relative w-full min-h-[80vh] overflow-hidden flex items-center">
      {/* Gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-950/20 to-slate-950/10" />

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
            <span className="bg-gradient-to-r from-emerald-400 to-emerald-200 bg-clip-text text-transparent">
              {process.env.NEXT_PUBLIC_TAGLINE}
            </span>
          </h1>

          <motion.p
            className="mt-4 text-slate-200/90 text-lg md:text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {process.env.NEXT_PUBLIC_LOCATION} — {process.env.NEXT_PUBLIC_PHONE} · {process.env.NEXT_PUBLIC_EMAIL}
          </motion.p>

          <motion.div
            className="mt-6 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <button
              onClick={onViewMore}
              className="px-5 py-2.5 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white font-medium transition-colors"
            >
              Explore
            </button>
            <a
              href={process.env.NEXT_PUBLIC_RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-md border border-slate-700/70 hover:border-slate-500 text-slate-200 hover:text-white transition-colors"
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