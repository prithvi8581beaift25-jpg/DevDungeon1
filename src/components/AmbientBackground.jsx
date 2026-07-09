'use client';

import { motion } from 'framer-motion';

export default function AmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.8)_100%)]" />

      {/* torch glows */}
      <div className="torch-glow absolute left-[8%] top-[12%] h-72 w-72 rounded-full bg-[var(--gold)]/25 blur-3xl" />
      <div
        className="torch-glow absolute right-[6%] top-[48%] h-80 w-80 rounded-full bg-[var(--red)]/20 blur-3xl"
        style={{ animationDelay: '1.2s' }}
      />
      <div
        className="torch-glow absolute left-[12%] bottom-[8%] h-64 w-64 rounded-full bg-[var(--cyan)]/15 blur-3xl"
        style={{ animationDelay: '2.1s' }}
      />
      <div
        className="torch-glow absolute right-[15%] bottom-[30%] h-56 w-56 rounded-full bg-[var(--gold)]/15 blur-3xl"
        style={{ animationDelay: '0.6s' }}
      />

      {/* rising embers */}
      {[...Array(16)].map((_, i) => {
        const color = i % 3 === 0 ? 'var(--cyan)' : 'var(--gold)';
        return (
          <motion.span
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${(i * 6.3) % 100}%`,
              bottom: '-5%',
              width: 3,
              height: 3,
              background: color,
              boxShadow: `0 0 6px 2px ${color}`,
            }}
            animate={{ y: ['0vh', '-115vh'], opacity: [0, 1, 1, 0] }}
            transition={{
              duration: 11 + (i % 5) * 2,
              repeat: Infinity,
              delay: i * 0.65,
              ease: 'linear',
            }}
          />
        );
      })}
    </div>
  );
}
