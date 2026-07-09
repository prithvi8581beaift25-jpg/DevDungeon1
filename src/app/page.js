'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import AmbientBackground from '@/components/AmbientBackground';
import { languages } from '@/data/languages';

const paths = Object.values(languages);

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

const features = [
  {
    title: 'AI-GENERATED DUNGEONS',
    description:
      'Every programming language is its own dungeon, filled with coding challenges crafted by AI to match your skill level.',
  },
  {
    title: 'BOSS BATTLES',
    description:
      'Defeat coding bosses guarding the deepest secrets of each language. Solve their trials or be cast back into the shadows.',
  },
  {
    title: 'REAL-TIME PVP',
    description:
      'Duel other adventurers in live coding battles. Same challenge, same clock — only the sharpest coder prevails.',
  },
  {
    title: 'LEADERBOARDS & XP',
    description:
      'Earn XP, unlock rewards, and climb the ranks as you clear dungeons and best other warriors of the keyboard.',
  },
];

export default function Home() {
  return (
    <div className="relative flex-1 overflow-hidden">
      <AmbientBackground />

      {/* Top bar */}
      <header className="relative flex items-center justify-between px-6 py-6 sm:px-10">
        <span className="flex items-center gap-3">
          <span className="text-2xl">🔥</span>
          <span className="text-sm sm:text-base">DEVDUNGEON</span>
        </span>
        <div className="flex gap-3">
          <Link href="/login" className="pbtn cyan text-[9px] sm:text-[11px]">
            LOGIN
          </Link>
          <Link href="/signup" className="pbtn text-[9px] sm:text-[11px]">
            SIGN UP
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative flex min-h-[92vh] flex-col items-center justify-center px-6 py-20 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="flex flex-col items-center"
        >
          <motion.div variants={fadeUp} className="bob mb-6 text-6xl">
            🔥
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="mb-4 font-[var(--font-body)] text-lg tracking-[0.3em] text-[var(--cyan)] uppercase"
          >
            Enter if you dare
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="flicker max-w-3xl text-3xl leading-relaxed sm:text-5xl"
          >
            DEVDUNGEON
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-2xl text-[var(--cream)]"
          >
            Turn coding practice into an RPG adventure. Clear dungeons, defeat bosses,
            and battle other developers in real time.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link href="/pvp" className="pbtn">
              FIGHT OTHER ADVENTURERS
            </Link>
            <Link href="/dungeons" className="pbtn cyan">
              EXPLORE DUNGEONS
            </Link>
          </motion.div>

          <motion.div variants={fadeUp} className="c2 window mt-16 max-w-lg text-left">
            <h3>THE DUNGEON MASTER</h3>
            <p>
              &quot;Five dungeons lie before you, adventurer — each one a language,
              each one a trial. Sharpen your wits, for the bosses within do not
              forgive syntax errors.&quot;
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative px-6 py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="mx-auto max-w-6xl"
        >
          <motion.div variants={fadeUp} className="mb-16 text-center">
            <h2 className="text-xl sm:text-2xl">FEATURES</h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
            {features.map(({ title, description }) => (
              <motion.div key={title} variants={fadeUp} className="c2 window">
                <h3>{title}</h3>
                <p>{description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Screenshots Placeholder Section */}
      <section className="relative px-6 py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="mx-auto max-w-6xl text-center"
        >
          <motion.h2 variants={fadeUp} className="mb-4 text-xl sm:text-2xl">
            A GLIMPSE INSIDE THE DUNGEON
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mb-14 max-w-xl text-2xl text-[var(--cream)]">
            Screenshots from the battles that lie ahead.
          </motion.p>

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <motion.div
                key={n}
                variants={fadeUp}
                className="c2 window flex aspect-video items-center justify-center"
              >
                <span className="text-lg text-[var(--cream)]">SCREENSHOT {n}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Choose Your Path Section */}
      <section className="relative px-6 py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="mx-auto max-w-5xl text-center"
        >
          <motion.h2 variants={fadeUp} className="mb-4 text-xl sm:text-2xl">
            CHOOSE YOUR PATH
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mb-14 max-w-xl text-2xl text-[var(--cream)]">
            Every language hides its own dungeon. Which will you enter first?
          </motion.p>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-5">
            {paths.map(({ name, Icon, color }) => (
              <motion.div key={name} variants={fadeUp} whileHover={{ y: -4 }}>
                <Link
                  href="/dungeons"
                  className="flex cursor-pointer flex-col items-center gap-4"
                >
                  <div className="badge" style={{ background: 'var(--indigo)' }}>
                    <Icon size={30} color={color} />
                  </div>
                  <span className="text-xl text-[var(--cream)]">{name}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Final CTA */}
      <section className="relative px-6 py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="c2 window mx-auto max-w-2xl text-center"
        >
          <h3 className="text-lg sm:text-xl">THE DUNGEON DOORS ARE OPEN</h3>
          <p>Step in, prove your skill, and rise through the ranks.</p>
          <div className="mt-8">
            <Link href="/dungeons" className="pbtn">
              ENTER DEVDUNGEON
            </Link>
          </div>
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
