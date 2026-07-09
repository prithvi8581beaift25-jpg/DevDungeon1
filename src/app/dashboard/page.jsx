'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Flame,
  Sword,
  Trophy,
  Skull,
  Target,
  Timer,
  Star,
  Coins,
  Rocket,
  Wind,
  Crown,
} from 'lucide-react';
import { SiPython, SiJavascript } from 'react-icons/si';
import Sidebar from '@/components/Sidebar';
import AmbientBackground from '@/components/AmbientBackground';
import StatTile from '@/components/StatTile';
import { languages } from '@/data/languages';
import { dungeons } from '@/data/dungeons';
import { achievements } from '@/data/achievements';
import { player, dailyQuest, continueAdventure } from '@/data/player';

const achievementIcons = {
  rocket: { Icon: Rocket, color: 'var(--gold)' },
  python: { Icon: SiPython, color: '#3776AB' },
  wind: { Icon: Wind, color: 'var(--cyan)' },
  javascript: { Icon: SiJavascript, color: '#F7DF1E' },
  crown: { Icon: Crown, color: 'var(--gold)' },
  target: { Icon: Target, color: 'var(--red)' },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

export default function DashboardPage() {
  const xpSegments = Math.round((player.xp / player.maxXp) * 10);
  const questSegments = Math.round((dailyQuest.progress / dailyQuest.maxProgress) * 10);
  const winRate = Math.round(
    (player.stats.wins / (player.stats.wins + player.stats.losses)) * 100
  );
  const continueLang = languages[continueAdventure.language];
  const ContinueIcon = continueLang.Icon;

  return (
    <div className="relative flex min-h-screen flex-1 flex-col lg:flex-row">
      <AmbientBackground />
      <Sidebar />

      <main className="relative flex-1 px-4 py-8 sm:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="mx-auto max-w-6xl space-y-10"
        >
          {/* Header */}
          <motion.div variants={fadeUp} className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-3xl">WELCOME BACK, {player.name.toUpperCase()}</h1>
              <p className="mt-3 text-xl text-[var(--cream)]">
                The dungeon remembers your last footsteps.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xl" style={{ color: 'var(--gold)' }}>
              <Flame size={22} />
              {player.streak} day streak
            </div>
          </motion.div>

          {/* Player Profile */}
          <motion.div variants={fadeUp} className="c2 window">
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div className="flex items-center gap-5">
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: 88,
                    height: 88,
                    background: 'var(--indigo)',
                    border: '3px solid #000',
                    boxShadow: '4px 4px 0 #000',
                  }}
                >
                  <Sword size={44} color="var(--gold)" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg">{player.name.toUpperCase()}</h3>
                  <p className="text-xl" style={{ color: 'var(--cyan)' }}>
                    {player.currentRank}
                  </p>
                  <p className="text-lg text-[var(--cream)]">{player.equippedTitle}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm" style={{ color: 'var(--stone)', filter: 'brightness(1.8)' }}>
                  GOLD
                </p>
                <p className="text-2xl" style={{ fontFamily: 'var(--font-pixel)', color: 'var(--gold)' }}>
                  {player.coins}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <div className="bar-label">
                <span>Level {player.level}</span>
                <span>
                  {player.xp.toLocaleString()} / {player.maxXp.toLocaleString()} XP
                </span>
              </div>
              <div className="bar-outer xp">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className={`seg ${i < xpSegments ? '' : 'empty'}`} />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div variants={fadeUp} className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatTile icon={<Trophy size={28} />} label="Wins" value={player.stats.wins} />
            <StatTile icon={<Skull size={28} />} label="Losses" value={player.stats.losses} />
            <StatTile icon={<Target size={28} />} label="Accuracy" value={`${player.stats.accuracy}%`} />
            <StatTile icon={<Flame size={28} />} label="Win Rate" value={`${winRate}%`} />
          </motion.div>

          {/* Daily Quest + Continue Adventure */}
          <motion.div variants={fadeUp} className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Daily Quest */}
            <div className="c2 window flex flex-col">
              <h3 className="text-sm sm:text-base">DAILY QUEST</h3>
              <p className="mb-4">{dailyQuest.description}</p>
              <div className="mb-6">
                <div className="bar-label">
                  <span>Progress</span>
                  <span>
                    {dailyQuest.progress}/{dailyQuest.maxProgress}
                  </span>
                </div>
                <div className="bar-outer mana">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className={`seg ${i < questSegments ? '' : 'empty'}`} />
                  ))}
                </div>
              </div>
              <div className="mt-auto flex items-center justify-between">
                <span style={{ color: 'var(--gold)' }}>+{dailyQuest.reward} XP</span>
                <Link href={`/battle/${continueAdventure.dungeonId}`} className="pbtn cyan text-[10px]">
                  CONTINUE
                </Link>
              </div>
            </div>

            {/* Continue Adventure */}
            <div className="c2 window flex flex-col">
              <h3 className="text-sm sm:text-base">CONTINUE ADVENTURE</h3>
              <div className="mb-4 flex items-center gap-4">
                <div className="badge" style={{ background: 'var(--indigo)' }}>
                  <ContinueIcon size={26} color={continueLang.color} />
                </div>
                <div>
                  <p className="text-xl text-[var(--cream)]">{continueAdventure.name}</p>
                  <p className="text-lg" style={{ color: 'var(--stone)', filter: 'brightness(1.8)' }}>
                    {continueAdventure.completion}% cleared
                  </p>
                </div>
              </div>
              <div className="mb-6 bar-outer xp">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    className={`seg ${i < Math.round(continueAdventure.completion / 10) ? '' : 'empty'}`}
                  />
                ))}
              </div>
              <div className="mt-auto">
                <Link href={`/battle/${continueAdventure.dungeonId}`} className="pbtn w-full text-center">
                  RESUME DUNGEON
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Dungeon Progress */}
          <motion.div variants={fadeUp}>
            <h2 className="mb-6 text-lg sm:text-xl">DUNGEON PROGRESS</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {dungeons.map((dungeon) => {
                const lang = languages[dungeon.language];
                const Icon = lang.Icon;
                return (
                  <Link key={dungeon.id} href={`/battle/${dungeon.id}`} className="c2 window block">
                    <div className="mb-3 flex items-center gap-3">
                      <div className="badge" style={{ background: 'var(--indigo)', width: 44, height: 44 }}>
                        <Icon size={20} color={lang.color} />
                      </div>
                      <span className="text-sm text-[var(--cream)]">{lang.name}</span>
                    </div>
                    <div className="bar-outer xp">
                      {Array.from({ length: 10 }).map((_, i) => (
                        <div
                          key={i}
                          className={`seg ${i < Math.round(dungeon.completion / 10) ? '' : 'empty'}`}
                        />
                      ))}
                    </div>
                    <p className="mt-2 text-right text-sm" style={{ color: 'var(--gold)' }}>
                      {dungeon.completion}%
                    </p>
                  </Link>
                );
              })}
            </div>
          </motion.div>

          {/* Recent Achievements */}
          <motion.div variants={fadeUp}>
            <h2 className="mb-6 text-lg sm:text-xl">RECENT ACHIEVEMENTS</h2>
            <div className="flex flex-wrap justify-center gap-6">
              {achievements.map((a) => {
                const { Icon, color } = achievementIcons[a.iconKey];
                return (
                  <div
                    key={a.id}
                    className="flex flex-col items-center gap-3"
                    style={{ opacity: a.unlocked ? 1 : 0.35 }}
                  >
                    <div
                      className="badge"
                      style={{ background: a.unlocked ? 'var(--cream)' : 'var(--stone)' }}
                    >
                      <Icon size={26} color={a.unlocked ? color : 'var(--indigo)'} />
                    </div>
                    <span className="max-w-[80px] text-center text-xs text-[var(--cream)]">
                      {a.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Statistics */}
          <motion.div variants={fadeUp} className="pb-10">
            <h2 className="mb-6 text-lg sm:text-xl">STATISTICS</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <StatTile icon={<Target size={28} />} label="Challenges Solved" value={player.stats.totalChallengesSolved} />
              <StatTile icon={<Timer size={28} />} label="Fastest Time" value={player.stats.fastestTime} />
              <StatTile icon={<Star size={28} />} label="Total XP" value={player.xp.toLocaleString()} />
              <StatTile icon={<Coins size={28} />} label="Gold" value={player.coins.toLocaleString()} />
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
