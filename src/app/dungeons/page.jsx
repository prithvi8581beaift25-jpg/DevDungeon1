'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import AmbientBackground from '@/components/AmbientBackground';
import { languages } from '@/data/languages';
import { dungeons, difficultyColor } from '@/data/dungeons';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

export default function DungeonsPage() {
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

      {/* Header */}
      <section className="relative px-6 pb-8 pt-6 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.h1 variants={fadeUp} className="text-2xl sm:text-4xl">
            CHOOSE YOUR DUNGEON
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-xl text-2xl text-[var(--cream)]"
          >
            Every language hides its own trials. Pick a dungeon to test your skill.
          </motion.p>
        </motion.div>
      </section>

      {/* Dungeon Grid */}
      <section className="relative px-6 py-10 sm:px-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="mx-auto flex max-w-6xl flex-wrap justify-center gap-10"
        >
          {dungeons.map((dungeon) => {
            const lang = languages[dungeon.language];
            const Icon = lang.Icon;
            const dColor = difficultyColor[dungeon.difficulty];

            return (
              <motion.div
                key={dungeon.id}
                variants={fadeUp}
                whileHover={!dungeon.locked ? { y: -6 } : {}}
                className="c2 window relative flex w-full flex-col sm:w-[calc((100%-2.5rem)/2)] lg:w-[calc((100%-5rem)/3)]"
                style={dungeon.locked ? { opacity: 0.55 } : undefined}
              >
                {dungeon.locked && (
                  <div className="absolute right-3 top-3 text-2xl">🔒</div>
                )}

                {/* Header: icon + name */}
                <div className="mb-4 flex items-center gap-3">
                  <div
                    className="badge"
                    style={{ background: 'var(--indigo)' }}
                  >
                    <Icon size={26} color={lang.color} />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base">{lang.name.toUpperCase()} DUNGEON</h3>
                  </div>
                </div>

                {/* Difficulty tag */}
                <div className="mb-4">
                  <span
                    className="inline-block px-3 py-1 text-xs font-[var(--font-pixel)]"
                    style={{
                      background: dColor,
                      color: 'var(--indigo)',
                      border: '2px solid #000',
                    }}
                  >
                    {dungeon.difficulty.toUpperCase()}
                  </span>
                </div>

                {/* Stats */}
                <div className="mb-4 space-y-2 text-lg text-[var(--cream)]">
                  <div className="flex justify-between">
                    <span className="text-[var(--stone)]" style={{ filter: 'brightness(1.6)' }}>
                      Enemy
                    </span>
                    <span>{dungeon.enemyType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--stone)]" style={{ filter: 'brightness(1.6)' }}>
                      Time
                    </span>
                    <span>{dungeon.estimatedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--stone)]" style={{ filter: 'brightness(1.6)' }}>
                      Reward
                    </span>
                    <span style={{ color: 'var(--gold)' }}>+{dungeon.xpReward} XP</span>
                  </div>
                </div>

                {/* Completion bar */}
                <div className="mb-6">
                  <div className="bar-label">
                    <span>Completion</span>
                    <span>{dungeon.completion}%</span>
                  </div>
                  <div className="bar-outer xp">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <div
                        key={i}
                        className={`seg ${i < Math.round(dungeon.completion / 10) ? '' : 'empty'}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Action */}
                <div className="mt-auto">
                  {dungeon.locked ? (
                    <button className="pbtn w-full" disabled style={{ background: 'var(--stone)', cursor: 'not-allowed', color: 'var(--cream)' }}>
                      LOCKED
                    </button>
                  ) : (
                    <Link href={`/battle/${dungeon.id}`} className="pbtn w-full text-center">
                      ENTER DUNGEON
                    </Link>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative border-t-2 border-black px-6 py-10 text-center text-lg text-[var(--stone)]">
        <p style={{ filter: 'brightness(1.8)' }}>
          &copy; {new Date().getFullYear()} DevDungeon. All trials reserved.
        </p>
      </footer>
    </div>
  );
}
