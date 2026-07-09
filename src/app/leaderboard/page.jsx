'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, Medal, Search } from 'lucide-react';
import AmbientBackground from '@/components/AmbientBackground';
import { seasons } from '@/data/leaderboard';
import { player } from '@/data/player';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

function RankBadge({ rank }) {
  if (rank === 1) {
    return (
      <div className="flex h-9 w-9 items-center justify-center" style={{ background: 'var(--gold)', border: '2px solid #000' }}>
        <Crown size={18} color="var(--indigo)" />
      </div>
    );
  }
  if (rank === 2) {
    return (
      <div className="flex h-9 w-9 items-center justify-center" style={{ background: '#c9d2e0', border: '2px solid #000' }}>
        <Medal size={18} color="var(--indigo)" />
      </div>
    );
  }
  if (rank === 3) {
    return (
      <div className="flex h-9 w-9 items-center justify-center" style={{ background: '#c8813f', border: '2px solid #000' }}>
        <Medal size={18} color="var(--indigo)" />
      </div>
    );
  }
  return (
    <div
      className="flex h-9 w-9 items-center justify-center text-sm"
      style={{ background: 'var(--stone)', border: '2px solid #000', color: 'var(--cream)' }}
    >
      {rank}
    </div>
  );
}

export default function LeaderboardPage() {
  const seasonNames = Object.keys(seasons);
  const [season, setSeason] = useState(seasonNames[0]);
  const [query, setQuery] = useState('');

  const rows = useMemo(() => {
    const list = seasons[season];
    if (!query.trim()) return list;
    return list.filter((p) => p.name.toLowerCase().includes(query.trim().toLowerCase()));
  }, [season, query]);

  return (
    <div className="relative flex-1 overflow-hidden">
      <AmbientBackground />

      {/* Top bar */}
      <header className="relative flex items-center justify-between px-6 py-6 sm:px-10">
        <Link href="/" className="flex items-center gap-3">
          <span className="text-2xl">🔥</span>
          <span className="text-sm sm:text-base">DEVDUNGEON</span>
        </Link>
        <div className="flex gap-3">
          <Link href="/dashboard" className="pbtn text-[9px] sm:text-[11px]">
            DASHBOARD
          </Link>
          <Link href="/" className="pbtn cyan text-[9px] sm:text-[11px]">
            BACK TO SURFACE
          </Link>
        </div>
      </header>

      <div className="relative mx-auto max-w-5xl px-6 pb-16 sm:px-10">
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          {/* Header */}
          <motion.div variants={fadeUp} className="mb-10 text-center">
            <h1 className="text-2xl sm:text-4xl">HALL OF LEGENDS</h1>
            <p className="mx-auto mt-6 max-w-xl text-2xl text-[var(--cream)]">
              The realm&apos;s finest, ranked by blood, sweat, and clean compiles.
            </p>
          </motion.div>

          {/* Controls */}
          <motion.div
            variants={fadeUp}
            className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
          >
            {/* Season selector */}
            <div className="flex flex-wrap gap-3">
              {seasonNames.map((s) => {
                const active = s === season;
                return (
                  <button
                    key={s}
                    onClick={() => setSeason(s)}
                    className="px-4 py-2 text-[10px] sm:text-xs"
                    style={{
                      fontFamily: 'var(--font-pixel)',
                      background: active ? 'var(--gold)' : 'var(--stone)',
                      color: active ? 'var(--indigo)' : 'var(--cream)',
                      border: '2px solid #000',
                      boxShadow: active ? '2px 2px 0 #000' : 'none',
                    }}
                  >
                    {s.toUpperCase()}
                  </button>
                );
              })}
            </div>

            {/* Search bar */}
            <div className="flex items-center gap-2 border-2 border-black px-3 py-2" style={{ background: 'var(--cream)' }}>
              <Search size={16} color="var(--indigo)" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search adventurer..."
                className="bg-transparent text-sm outline-none"
                style={{ color: 'var(--indigo)', fontFamily: 'var(--font-body)', width: 180 }}
              />
            </div>
          </motion.div>

          {/* Table */}
          <motion.div variants={fadeUp} className="c2 window">
            {/* Header row */}
            <div
              className="mb-3 hidden grid-cols-[3rem_1fr_6rem_5rem_5rem] gap-3 border-b-2 border-black pb-3 text-xs sm:grid"
              style={{ color: 'var(--cyan)' }}
            >
              <span>RANK</span>
              <span>PLAYER</span>
              <span className="text-right">XP</span>
              <span className="text-right">WINS</span>
              <span className="text-right">LOSSES</span>
            </div>

            <div className="space-y-3">
              <AnimatePresence mode="popLayout">
                {rows.map((p) => {
                  const isPlayer = p.name === player.name;
                  return (
                    <motion.div
                      key={`${season}-${p.rank}`}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="grid grid-cols-[3rem_1fr_auto] items-center gap-3 border-2 p-3 sm:grid-cols-[3rem_1fr_6rem_5rem_5rem]"
                      style={{
                        background: isPlayer ? 'rgba(255,210,63,0.12)' : 'rgba(0,0,0,0.25)',
                        borderColor: isPlayer ? 'var(--gold)' : '#000',
                      }}
                    >
                      <RankBadge rank={p.rank} />
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{p.avatar}</span>
                        <span
                          className="text-sm sm:text-base"
                          style={{ color: isPlayer ? 'var(--gold)' : 'var(--cream)' }}
                        >
                          {p.name}
                          {isPlayer && ' (YOU)'}
                        </span>
                      </div>
                      <span className="hidden text-right text-sm text-[var(--cream)] sm:block">
                        {p.xp.toLocaleString()}
                      </span>
                      <span className="hidden text-right text-sm sm:block" style={{ color: 'var(--cyan)' }}>
                        {p.wins}
                      </span>
                      <span className="hidden text-right text-sm sm:block" style={{ color: 'var(--red)' }}>
                        {p.losses}
                      </span>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {rows.length === 0 && (
                <p className="py-8 text-center text-lg text-[var(--cream)]">
                  No adventurers found by that name.
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="relative border-t-2 border-black px-6 py-10 text-center text-lg text-[var(--stone)]">
        <p style={{ filter: 'brightness(1.8)' }}>
          &copy; {new Date().getFullYear()} DevDungeon. All trials reserved.
        </p>
      </footer>
    </div>
  );
}
