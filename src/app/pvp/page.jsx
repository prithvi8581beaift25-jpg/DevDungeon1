'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Swords, Search } from 'lucide-react';
import AmbientBackground from '@/components/AmbientBackground';
import { languages } from '@/data/languages';
import { difficultyColor } from '@/data/dungeons';
import { player } from '@/data/player';
import { leaderboard, randomOpponent } from '@/data/leaderboard';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const difficulties = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

export default function PvPPage() {
  const [language, setLanguage] = useState(null);
  const [difficulty, setDifficulty] = useState(null);
  const [phase, setPhase] = useState('select');
  const [opponent, setOpponent] = useState(null);

  const canQueue = Boolean(language && difficulty);

  const handleQueue = () => {
    if (!canQueue) return;
    setPhase('searching');
    setTimeout(() => {
      setOpponent(randomOpponent(player.rating));
      setPhase('found');
    }, 2600);
  };

  const handleReset = () => {
    setPhase('select');
    setOpponent(null);
  };

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

      <div className="relative mx-auto max-w-6xl px-6 pb-16 sm:px-10">
        {/* Header */}
        <motion.div initial="hidden" animate="visible" variants={stagger} className="mb-10 text-center">
          <motion.h1 variants={fadeUp} className="text-2xl sm:text-4xl">
            PVP ARENA
          </motion.h1>
          <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-xl text-2xl text-[var(--cream)]">
            Face another adventurer. Same problem, same clock — only the sharpest coder walks away.
          </motion.p>
        </motion.div>

        <AnimatePresence mode="wait">
          {/* Selection phase */}
          {phase === 'select' && (
            <motion.div
              key="select"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 gap-8 lg:grid-cols-3"
            >
              {/* Your rank */}
              <div className="c2 window lg:col-span-1">
                <h3 className="text-sm sm:text-base">YOUR RANK</h3>
                <div className="mb-4 flex items-center gap-4">
                  <div
                    className="flex items-center justify-center"
                    style={{
                      width: 64,
                      height: 64,
                      background: 'var(--indigo)',
                      border: '3px solid #000',
                      boxShadow: '3px 3px 0 #000',
                    }}
                  >
                    <Swords size={28} color="var(--gold)" />
                  </div>
                  <div>
                    <p className="text-xl" style={{ color: 'var(--cyan)' }}>
                      {player.currentRank}
                    </p>
                    <p className="text-lg text-[var(--cream)]">Level {player.level}</p>
                  </div>
                </div>
                <div className="stat-tile">
                  <p className="mb-1 text-sm" style={{ color: 'var(--cyan)' }}>
                    RATING
                  </p>
                  <p className="text-xl" style={{ fontFamily: 'var(--font-pixel)', color: 'var(--gold)' }}>
                    {player.rating}
                  </p>
                </div>

                <h4 className="mb-3 mt-6 text-sm" style={{ color: 'var(--gold)' }}>
                  LEADERBOARD PREVIEW
                </h4>
                <div className="space-y-2">
                  {leaderboard.slice(0, 5).map((p) => (
                    <div
                      key={p.rank}
                      className="flex items-center justify-between text-sm"
                      style={{
                        color: p.name === player.name ? 'var(--gold)' : 'var(--cream)',
                      }}
                    >
                      <span>#{p.rank} {p.avatar} {p.name}</span>
                      <span>{p.rating}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Language + difficulty selection */}
              <div className="c2 window lg:col-span-2 flex flex-col">
                <h3 className="text-sm sm:text-base">CHOOSE YOUR BATTLEGROUND</h3>

                <h4 className="mb-3 text-sm" style={{ color: 'var(--gold)' }}>
                  LANGUAGE
                </h4>
                <div className="mb-6 flex flex-wrap gap-4">
                  {Object.entries(languages).map(([key, lang]) => {
                    const Icon = lang.Icon;
                    const selected = language === key;
                    return (
                      <button
                        key={key}
                        onClick={() => setLanguage(key)}
                        className="flex flex-col items-center gap-2"
                      >
                        <div
                          className="badge"
                          style={{
                            background: selected ? 'var(--gold)' : 'var(--indigo)',
                            boxShadow: selected
                              ? '3px 3px 0 #000, 0 0 12px var(--gold)'
                              : '3px 3px 0 #000',
                          }}
                        >
                          <Icon size={26} color={selected ? 'var(--indigo)' : lang.color} />
                        </div>
                        <span className="text-xs text-[var(--cream)]">{lang.name}</span>
                      </button>
                    );
                  })}
                </div>

                <h4 className="mb-3 text-sm" style={{ color: 'var(--gold)' }}>
                  DIFFICULTY
                </h4>
                <div className="mb-6 flex flex-wrap gap-3">
                  {difficulties.map((d) => {
                    const selected = difficulty === d;
                    return (
                      <button
                        key={d}
                        onClick={() => setDifficulty(d)}
                        className="px-4 py-2 text-xs"
                        style={{
                          fontFamily: 'var(--font-pixel)',
                          background: selected ? difficultyColor[d] : 'var(--stone)',
                          color: selected ? 'var(--indigo)' : 'var(--cream)',
                          border: '2px solid #000',
                          boxShadow: selected ? '2px 2px 0 #000' : 'none',
                        }}
                      >
                        {d.toUpperCase()}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-auto flex flex-wrap items-center justify-between gap-4">
                  <p className="text-lg" style={{ color: 'var(--stone)', filter: 'brightness(1.7)' }}>
                    Estimated queue time: ~15-30s
                  </p>
                  <button
                    onClick={handleQueue}
                    disabled={!canQueue}
                    className="pbtn"
                    style={!canQueue ? { opacity: 0.4, cursor: 'not-allowed' } : undefined}
                  >
                    ENTER MATCHMAKING
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Searching phase */}
          {phase === 'searching' && (
            <motion.div
              key="searching"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="c2 window mx-auto max-w-lg text-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}
                className="mx-auto mb-6 flex h-16 w-16 items-center justify-center"
              >
                <Search size={40} color="var(--cyan)" />
              </motion.div>
              <h3 className="text-sm sm:text-base">SEARCHING FOR OPPONENT...</h3>
              <p className="mb-6">
                Scouring the {language ? languages[language].name : ''} dungeons for a{' '}
                {difficulty?.toLowerCase()} adversary.
              </p>
              <button onClick={handleReset} className="pbtn danger">
                CANCEL
              </button>
            </motion.div>
          )}

          {/* Opponent found phase */}
          {phase === 'found' && opponent && (
            <motion.div
              key="found"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="mx-auto max-w-3xl"
            >
              <h3 className="mb-8 text-center text-sm sm:text-base">OPPONENT FOUND!</h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:items-center">
                <div className="c2 window text-center">
                  <div className="mb-3 text-5xl">{player.avatar}</div>
                  <p className="text-lg" style={{ color: 'var(--cyan)' }}>{player.name}</p>
                  <p className="text-sm text-[var(--cream)]">Rating {player.rating}</p>
                </div>

                <div className="text-center text-2xl" style={{ color: 'var(--gold)' }}>
                  VS
                </div>

                <div className="c2 window text-center">
                  <div className="mb-3 text-5xl">{opponent.avatar}</div>
                  <p className="text-lg" style={{ color: 'var(--red)' }}>{opponent.name}</p>
                  <p className="text-sm text-[var(--cream)]">Rating {opponent.rating}</p>
                </div>
              </div>

              <div className="mt-8 flex flex-col items-center gap-3">
                <button
                  disabled
                  className="pbtn"
                  style={{ background: 'var(--stone)', color: 'var(--cream)', cursor: 'not-allowed' }}
                >
                  ENTER ARENA
                </button>
                <span className="text-[10px]" style={{ color: 'var(--cyan)' }}>
                  LIVE PVP DUELS — COMING SOON
                </span>
                <button onClick={handleReset} className="pbtn cyan mt-2">
                  SEARCH AGAIN
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
