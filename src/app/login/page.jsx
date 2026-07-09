'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { User, Lock, Eye, EyeOff, Loader2, LogIn } from 'lucide-react';
import AmbientBackground from '@/components/AmbientBackground';
import { setAuthCookie } from '@/lib/auth';

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

function validate(username, password) {
  const errors = {};

  if (!username.trim()) {
    errors.username = 'Your name is required, adventurer.';
  } else if (username.trim().length < 3) {
    errors.username = 'Must be at least 3 characters.';
  }

  if (!password) {
    errors.password = 'A password is required to enter.';
  } else if (password.length < 6) {
    errors.password = 'Must be at least 6 characters.';
  }

  return errors;
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [authError, setAuthError] = useState('');

  const handleBlur = (field) => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors(validate(username, password));
  };

  const handleChange = (field, value) => {
    if (field === 'username') setUsername(value);
    if (field === 'password') setPassword(value);
    if (touched[field]) {
      setErrors(
        validate(field === 'username' ? value : username, field === 'password' ? value : password)
      );
    }
    setAuthError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(username, password);
    setErrors(validationErrors);
    setTouched({ username: true, password: true });

    if (Object.keys(validationErrors).length > 0) return;

    setSubmitting(true);
    setAuthError('');

    setTimeout(() => {
      setAuthCookie();
      setSubmitting(false);
      const destination = searchParams.get('from') || '/dashboard';
      router.push(destination);
    }, 1200);
  };

  return (
    <div className="relative flex min-h-screen flex-1 flex-col overflow-hidden">
      <AmbientBackground />

      {/* Top bar */}
      <header className="relative flex items-center justify-between px-6 py-6 sm:px-10">
        <Link href="/" className="flex items-center gap-3">
          <span className="text-2xl">🔥</span>
          <span className="text-sm sm:text-base">DEVDUNGEON</span>
        </Link>
        <Link href="/" className="pbtn cyan text-[9px] sm:text-[11px]">
          BACK TO SURFACE
        </Link>
      </header>

      {/* Form */}
      <div className="relative flex flex-1 items-center justify-center px-6 pb-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="c2 window w-full max-w-md"
        >
          <motion.div variants={fadeUp} className="mb-6 text-center">
            <h3 className="text-base sm:text-lg">ENTER THE DUNGEON</h3>
            <p className="mt-2 text-lg text-[var(--cream)]">
              State your name and password to continue.
            </p>
          </motion.div>

          <motion.form variants={fadeUp} onSubmit={handleSubmit} noValidate>
            {/* Username */}
            <div className="mb-5">
              <label className="mb-2 block text-sm" style={{ color: 'var(--gold)' }}>
                USERNAME
              </label>
              <div
                className="flex items-center gap-2 border-2 px-3 py-2"
                style={{
                  background: 'var(--cream)',
                  borderColor: touched.username && errors.username ? 'var(--red)' : '#000',
                }}
              >
                <User size={16} color="var(--indigo)" />
                <input
                  value={username}
                  onChange={(e) => handleChange('username', e.target.value)}
                  onBlur={() => handleBlur('username')}
                  placeholder="Brave Coder"
                  className="w-full bg-transparent text-sm outline-none"
                  style={{ color: 'var(--indigo)', fontFamily: 'var(--font-body)' }}
                />
              </div>
              {touched.username && errors.username && (
                <p className="mt-2 text-sm" style={{ color: 'var(--red)' }}>
                  {errors.username}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="mb-3">
              <label className="mb-2 block text-sm" style={{ color: 'var(--gold)' }}>
                PASSWORD
              </label>
              <div
                className="flex items-center gap-2 border-2 px-3 py-2"
                style={{
                  background: 'var(--cream)',
                  borderColor: touched.password && errors.password ? 'var(--red)' : '#000',
                }}
              >
                <Lock size={16} color="var(--indigo)" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  onBlur={() => handleBlur('password')}
                  placeholder="••••••••"
                  className="w-full bg-transparent text-sm outline-none"
                  style={{ color: 'var(--indigo)', fontFamily: 'var(--font-body)' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff size={16} color="var(--indigo)" />
                  ) : (
                    <Eye size={16} color="var(--indigo)" />
                  )}
                </button>
              </div>
              {touched.password && errors.password && (
                <p className="mt-2 text-sm" style={{ color: 'var(--red)' }}>
                  {errors.password}
                </p>
              )}
            </div>

            {/* Remember me */}
            <label className="mb-6 flex items-center gap-2 text-sm text-[var(--cream)]">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="h-4 w-4"
              />
              Remember me
            </label>

            {authError && (
              <p className="mb-4 text-sm" style={{ color: 'var(--red)' }}>
                {authError}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="pbtn flex w-full items-center justify-center gap-2"
              style={submitting ? { opacity: 0.7, cursor: 'wait' } : undefined}
            >
              {submitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  ENTERING...
                </>
              ) : (
                <>
                  <LogIn size={16} />
                  LOGIN
                </>
              )}
            </button>
          </motion.form>

          <motion.p
            variants={fadeUp}
            className="mt-6 text-center text-sm"
            style={{ color: 'var(--cyan)' }}
          >
            No backend connected yet — any username &amp; password (6+ chars) will do.
          </motion.p>

          <motion.p variants={fadeUp} className="mt-4 text-center text-sm text-[var(--cream)]">
            New here?{' '}
            <Link href="/signup" style={{ color: 'var(--gold)' }}>
              Create an account
            </Link>
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
