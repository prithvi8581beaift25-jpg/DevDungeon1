'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Swords,
  Users,
  Trophy,
  User,
  Backpack,
  Award,
  Settings,
  Menu,
  X,
  LogOut,
} from 'lucide-react';
import { clearAuthCookie } from '@/lib/auth';

const navItems = [
  { label: 'Dashboard', href: '/dashboard', Icon: LayoutDashboard, soon: false },
  { label: 'Dungeons', href: '/dungeons', Icon: Swords, soon: false },
  { label: 'PvP', href: '/pvp', Icon: Users, soon: false },
  { label: 'Leaderboard', href: '/leaderboard', Icon: Trophy, soon: false },
  { label: 'Profile', href: '#', Icon: User, soon: true },
  { label: 'Inventory', href: '#', Icon: Backpack, soon: true },
  { label: 'Achievements', href: '#', Icon: Award, soon: true },
  { label: 'Settings', href: '#', Icon: Settings, soon: true },
];

function NavList({ pathname, onNavigate }) {
  return (
    <nav className="flex flex-col gap-2">
      {navItems.map(({ label, href, Icon, soon }) => {
        const active = pathname === href;
        if (soon) {
          return (
            <div
              key={label}
              className="flex items-center justify-between px-4 py-3 opacity-40"
            >
              <span className="flex items-center gap-3 text-sm">
                <Icon size={18} />
                {label}
              </span>
              <span className="text-[9px]" style={{ color: 'var(--cyan)' }}>
                SOON
              </span>
            </div>
          );
        }
        return (
          <Link
            key={label}
            href={href}
            onClick={onNavigate}
            className="flex items-center gap-3 px-4 py-3 text-sm transition-colors"
            style={{
              background: active ? 'var(--gold)' : 'transparent',
              color: active ? 'var(--indigo)' : 'var(--cream)',
              borderLeft: active ? '4px solid #000' : '4px solid transparent',
            }}
          >
            <Icon size={18} />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    clearAuthCookie();
    router.push('/');
  };

  return (
    <>
      {/* Mobile top bar */}
      <div className="relative flex items-center justify-between border-b-2 border-black px-4 py-4 lg:hidden">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl">🔥</span>
          <span className="text-xs">DEVDUNGEON</span>
        </Link>
        <button onClick={() => setOpen(true)} aria-label="Open menu">
          <Menu color="var(--gold)" />
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-black/70 lg:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="fixed inset-y-0 left-0 z-50 w-64 border-r-2 border-black lg:hidden"
              style={{ background: 'var(--obsidian)' }}
            >
              <div className="flex items-center justify-between px-4 py-4">
                <span className="text-xs">MENU</span>
                <button onClick={() => setOpen(false)} aria-label="Close menu">
                  <X color="var(--gold)" />
                </button>
              </div>
              <NavList pathname={pathname} onNavigate={() => setOpen(false)} />
              <button
                onClick={handleLogout}
                className="mt-4 flex items-center gap-3 px-4 py-3 text-sm"
                style={{ color: 'var(--red)' }}
              >
                <LogOut size={18} />
                Logout
              </button>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <aside
        className="relative hidden w-64 flex-col border-r-2 border-black py-6 lg:flex"
        style={{ background: 'var(--obsidian)' }}
      >
        <Link href="/" className="mb-8 flex items-center gap-2 px-4">
          <span className="text-2xl">🔥</span>
          <span className="text-xs">DEVDUNGEON</span>
        </Link>
        <NavList pathname={pathname} />
        <button
          onClick={handleLogout}
          className="mt-auto flex items-center gap-3 px-4 py-3 text-sm"
          style={{ color: 'var(--red)' }}
        >
          <LogOut size={18} />
          Logout
        </button>
      </aside>
    </>
  );
}
