'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  RotateCcw,
  Lightbulb,
  Send,
  SunMoon,
  Minus,
  Plus,
  Terminal,
} from 'lucide-react';
import AmbientBackground from '@/components/AmbientBackground';
import { dungeons } from '@/data/dungeons';
import { languages } from '@/data/languages';
import { bosses } from '@/data/bosses';
import { problem } from '@/data/problem';
import { player } from '@/data/player';

let popupId = 0;

export default function BattlePage() {
  const { id } = useParams();
  const dungeon = dungeons.find((d) => d.id === Number(id));
  const boss = bosses[Number(id)];
  const lang = dungeon ? languages[dungeon.language] : null;

  const [bossHealth, setBossHealth] = useState(boss?.maxHealth ?? 100);
  const [playerHealth, setPlayerHealth] = useState(100);
  const [code, setCode] = useState('// Write your solution here\n');
  const [log, setLog] = useState(['⚔️ The battle begins!']);
  const [busy, setBusy] = useState(false);
  const [ended, setEnded] = useState(false);
  const [won, setWon] = useState(false);
  const [shakeBoss, setShakeBoss] = useState(false);
  const [shakePlayer, setShakePlayer] = useState(false);
  const [popups, setPopups] = useState([]);
  const [fontSize, setFontSize] = useState(14);
  const [crtTheme, setCrtTheme] = useState(false);
  const [consoleText, setConsoleText] = useState('> Ready for input...');
  const [seconds, setSeconds] = useState(600);
  const logRef = useRef(null);

  useEffect(() => {
    if (ended) return;
    const t = setInterval(() => setSeconds((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, [ended]);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [log]);

  if (!dungeon || !boss || !lang) {
    return (
      <div className="relative flex min-h-screen items-center justify-center">
        <AmbientBackground />
        <div className="c2 window text-center">
          <h3>DUNGEON NOT FOUND</h3>
          <p className="mb-6">This trial does not exist.</p>
          <Link href="/dungeons" className="pbtn">
            BACK TO DUNGEONS
          </Link>
        </div>
      </div>
    );
  }

  const BossIcon = lang.Icon;
  const bossSegments = Math.max(0, Math.round((bossHealth / boss.maxHealth) * 10));
  const playerSegments = Math.max(0, Math.round((playerHealth / 100) * 10));
  const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');

  const addPopup = (target, amount) => {
    const newPopup = { id: popupId++, target, amount };
    setPopups((p) => [...p, newPopup]);
    setTimeout(() => {
      setPopups((p) => p.filter((x) => x.id !== newPopup.id));
    }, 900);
  };

  const pushLog = (line) => setLog((l) => [...l, line]);

  const triggerShake = (target) => {
    if (target === 'boss') {
      setShakeBoss(true);
      setTimeout(() => setShakeBoss(false), 350);
    } else {
      setShakePlayer(true);
      setTimeout(() => setShakePlayer(false), 350);
    }
  };

  const handleRun = () => {
    setConsoleText('> Running...');
    setTimeout(() => {
      setConsoleText(`> Output: [0, 1]\n> Sample case passed.`);
    }, 700);
  };

  const handleReset = () => {
    setCode('// Write your solution here\n');
    setConsoleText('> Ready for input...');
  };

  const handleSubmit = () => {
    if (busy || ended) return;
    setBusy(true);
    setConsoleText('> Submitting solution...');

    setTimeout(() => {
      const success = Math.random() > 0.3;

      if (success) {
        const dmg = Math.floor(Math.random() * 16) + 15;
        const nextHealth = Math.max(0, bossHealth - dmg);
        setBossHealth(nextHealth);
        triggerShake('boss');
        addPopup('boss', dmg);
        pushLog(`💥 Correct! ${boss.name} takes ${dmg} damage.`);
        setConsoleText('> Accepted. All test cases passed.');

        if (nextHealth <= 0) {
          setTimeout(() => {
            setEnded(true);
            setWon(true);
            pushLog(`🎉 ${boss.name} has been defeated!`);
          }, 500);
          setBusy(false);
          return;
        }

        setTimeout(() => {
          const counter = Math.floor(Math.random() * 12) + 8;
          const nextPlayer = Math.max(0, playerHealth - counter);
          setPlayerHealth(nextPlayer);
          triggerShake('player');
          addPopup('player', counter);
          pushLog(`${boss.name} strikes back for ${counter} damage.`);
          if (nextPlayer <= 0) {
            setTimeout(() => {
              setEnded(true);
              setWon(false);
              pushLog('💀 You have fallen in battle...');
            }, 500);
          }
          setBusy(false);
        }, 900);
      } else {
        pushLog('❌ Wrong answer — the incantation fails.');
        setConsoleText('> Wrong Answer on test case 2.');
        setTimeout(() => {
          const counter = Math.floor(Math.random() * 10) + 12;
          const nextPlayer = Math.max(0, playerHealth - counter);
          setPlayerHealth(nextPlayer);
          triggerShake('player');
          addPopup('player', counter);
          pushLog(`${boss.name} punishes your mistake for ${counter} damage.`);
          if (nextPlayer <= 0) {
            setTimeout(() => {
              setEnded(true);
              setWon(false);
              pushLog('💀 You have fallen in battle...');
            }, 500);
          }
          setBusy(false);
        }, 900);
      }
    }, 900);
  };

  return (
    <div className="relative flex-1 overflow-hidden">
      <AmbientBackground />

      {/* Top bar */}
      <header className="relative flex items-center justify-between px-6 py-4 sm:px-8">
        <Link href="/dungeons" className="flex items-center gap-3">
          <span className="text-xl">🔥</span>
          <span className="text-xs sm:text-sm">DEVDUNGEON</span>
        </Link>
        <Link href="/dashboard" className="pbtn cyan text-[9px] sm:text-[10px]">
          FLEE TO DASHBOARD
        </Link>
      </header>

      <div className="relative mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        {/* Top section: boss/player HP + meta */}
        <div className="c2 window mb-8">
          <div className="mb-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div>
              <p className="text-xs" style={{ color: 'var(--stone)', filter: 'brightness(1.8)' }}>
                LEVEL
              </p>
              <p className="text-lg" style={{ color: 'var(--gold)' }}>{player.level}</p>
            </div>
            <div>
              <p className="text-xs" style={{ color: 'var(--stone)', filter: 'brightness(1.8)' }}>
                QUESTION
              </p>
              <p className="text-lg" style={{ color: 'var(--gold)' }}>1/1</p>
            </div>
            <div>
              <p className="text-xs" style={{ color: 'var(--stone)', filter: 'brightness(1.8)' }}>
                TIMER
              </p>
              <p className="text-lg" style={{ color: seconds < 60 ? 'var(--red)' : 'var(--gold)' }}>
                {mins}:{secs}
              </p>
            </div>
            <div>
              <p className="text-xs" style={{ color: 'var(--stone)', filter: 'brightness(1.8)' }}>
                DIFFICULTY
              </p>
              <p className="text-lg" style={{ color: 'var(--cyan)' }}>{dungeon.difficulty}</p>
            </div>
          </div>

          {/* Boss HP */}
          <div className={`relative mb-5 ${shakeBoss ? 'shake' : ''}`}>
            <div className="mb-2 flex items-center gap-3">
              <div className="badge" style={{ background: 'var(--indigo)', width: 40, height: 40 }}>
                <BossIcon size={18} color={lang.color} />
              </div>
              <h3 className="text-xs sm:text-sm">{boss.name}</h3>
            </div>
            <p className="mb-3 text-sm italic" style={{ color: 'var(--stone)', filter: 'brightness(1.7)' }}>
              {boss.quote}
            </p>
            <div className="bar-label">
              <span>Boss HP</span>
              <span>{bossHealth}/{boss.maxHealth}</span>
            </div>
            <div className="bar-outer hp">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className={`seg ${i < bossSegments ? '' : 'empty'}`} />
              ))}
            </div>
            <AnimatePresence>
              {popups
                .filter((p) => p.target === 'boss')
                .map((p) => (
                  <span
                    key={p.id}
                    className="dmg-float absolute right-2 top-0 text-lg"
                    style={{ color: 'var(--red)', fontFamily: 'var(--font-pixel)' }}
                  >
                    -{p.amount}
                  </span>
                ))}
            </AnimatePresence>
          </div>

          {/* Player HP */}
          <div className={`relative ${shakePlayer ? 'shake' : ''}`}>
            <div className="bar-label">
              <span>{player.name}</span>
              <span>{playerHealth}/100</span>
            </div>
            <div className="bar-outer hp">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className={`seg ${i < playerSegments ? '' : 'empty'}`} />
              ))}
            </div>
            <AnimatePresence>
              {popups
                .filter((p) => p.target === 'player')
                .map((p) => (
                  <span
                    key={p.id}
                    className="dmg-float absolute right-2 top-0 text-lg"
                    style={{ color: 'var(--red)', fontFamily: 'var(--font-pixel)' }}
                  >
                    -{p.amount}
                  </span>
                ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Middle: problem + editor */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          {/* Problem panel */}
          <div className="c2 window lg:col-span-2 max-h-[70vh] overflow-y-auto">
            <h3 className="text-sm sm:text-base">{problem.title.toUpperCase()}</h3>
            <p className="mb-4 text-sm" style={{ color: 'var(--cyan)' }}>
              {problem.difficulty}
            </p>
            <p className="mb-5">{problem.description}</p>

            <h4 className="mb-2 text-sm" style={{ color: 'var(--gold)' }}>
              CONSTRAINTS
            </h4>
            <ul className="mb-5 list-disc pl-5 text-lg text-[var(--cream)]">
              {problem.constraints.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>

            <h4 className="mb-2 text-sm" style={{ color: 'var(--gold)' }}>
              INPUT / OUTPUT
            </h4>
            <p className="mb-1 text-lg">{problem.inputFormat}</p>
            <p className="mb-5 text-lg">{problem.outputFormat}</p>

            <h4 className="mb-2 text-sm" style={{ color: 'var(--gold)' }}>
              EXAMPLES
            </h4>
            {problem.examples.map((ex, i) => (
              <div key={i} className="stat-tile mb-3 text-left">
                <p className="text-sm text-[var(--cream)]">Input: {ex.input}</p>
                <p className="text-sm text-[var(--cream)]">Output: {ex.output}</p>
                <p className="mt-1 text-sm" style={{ color: 'var(--stone)', filter: 'brightness(1.7)' }}>
                  {ex.explanation}
                </p>
              </div>
            ))}
          </div>

          {/* Editor panel */}
          <div className="c2 window lg:col-span-3 flex flex-col">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
              <select
                className="border-2 border-black px-3 py-2 text-sm"
                style={{ background: 'var(--cream)', color: 'var(--indigo)' }}
                defaultValue={dungeon.language}
              >
                {Object.entries(languages).map(([key, l]) => (
                  <option key={key} value={key}>
                    {l.name}
                  </option>
                ))}
              </select>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setFontSize((f) => Math.max(10, f - 2))}
                  className="border-2 border-black p-2"
                  style={{ background: 'var(--stone)' }}
                  aria-label="Decrease font size"
                >
                  <Minus size={14} color="var(--cream)" />
                </button>
                <span className="text-sm text-[var(--cream)]">{fontSize}px</span>
                <button
                  onClick={() => setFontSize((f) => Math.min(24, f + 2))}
                  className="border-2 border-black p-2"
                  style={{ background: 'var(--stone)' }}
                  aria-label="Increase font size"
                >
                  <Plus size={14} color="var(--cream)" />
                </button>
                <button
                  onClick={() => setCrtTheme((c) => !c)}
                  className="border-2 border-black p-2"
                  style={{ background: crtTheme ? 'var(--cyan)' : 'var(--stone)' }}
                  aria-label="Toggle theme"
                >
                  <SunMoon size={14} color="var(--indigo)" />
                </button>
              </div>
            </div>

            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
              className="mb-4 h-56 w-full resize-none border-2 border-black p-3 font-mono focus:outline-none"
              style={{
                fontSize,
                background: crtTheme ? '#001a0d' : '#0a0a12',
                color: crtTheme ? '#39ff14' : 'var(--cream)',
              }}
            />

            {/* Action buttons */}
            <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <button onClick={handleRun} disabled={ended} className="pbtn cyan flex items-center justify-center gap-2 text-[10px]">
                <Play size={14} /> RUN
              </button>
              <button onClick={handleSubmit} disabled={busy || ended} className="pbtn flex items-center justify-center gap-2 text-[10px]">
                <Send size={14} /> SUBMIT
              </button>
              <button
                onClick={() => pushLog('💡 Hint: check the hash map approach.')}
                disabled={ended}
                className="pbtn flex items-center justify-center gap-2 text-[10px]"
                style={{ background: 'var(--cyan)' }}
              >
                <Lightbulb size={14} /> HINT
              </button>
              <button onClick={handleReset} disabled={ended} className="pbtn danger flex items-center justify-center gap-2 text-[10px]">
                <RotateCcw size={14} /> RESET
              </button>
            </div>

            {/* Console output */}
            <div
              className="mb-4 border-2 border-black p-3 font-mono text-sm"
              style={{ background: '#000', color: '#39ff14', minHeight: 60, whiteSpace: 'pre-line' }}
            >
              <div className="mb-1 flex items-center gap-2" style={{ color: 'var(--cyan)' }}>
                <Terminal size={14} /> CONSOLE
              </div>
              {consoleText}
            </div>

            {/* Battle log */}
            <div
              ref={logRef}
              className="max-h-32 overflow-y-auto border-2 border-black p-3 text-sm"
              style={{ background: 'rgba(0,0,0,0.4)', color: 'var(--cream)' }}
            >
              {log.map((l, i) => (
                <p key={i}>{l}</p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Result modal */}
      <AnimatePresence>
        {ended && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4"
          >
            <motion.div
              initial={{ scale: 0.85, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="c2 window max-w-md text-center"
            >
              <h3 className="text-lg sm:text-xl">{won ? 'VICTORY!' : 'DEFEAT'}</h3>
              {won ? (
                <>
                  <p className="mb-4">{boss.name} has been vanquished!</p>
                  <div className="stat-tile mb-6 space-y-1">
                    <p style={{ color: 'var(--gold)' }}>⭐ +{dungeon.xpReward} XP</p>
                    <p style={{ color: 'var(--cyan)' }}>🪙 +250 Gold</p>
                  </div>
                </>
              ) : (
                <p className="mb-6">{boss.name} was too strong this time. Try again, adventurer.</p>
              )}
              <div className="flex flex-col gap-3">
                <Link href="/dashboard" className="pbtn text-center">
                  BACK TO DASHBOARD
                </Link>
                <Link href="/dungeons" className="pbtn cyan text-center">
                  CHOOSE ANOTHER DUNGEON
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
