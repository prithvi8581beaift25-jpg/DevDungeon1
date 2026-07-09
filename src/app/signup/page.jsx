'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Eye, EyeOff, Loader2, UserPlus } from 'lucide-react';
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

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(username, email, password, confirmPassword) {
  const errors = {};

  if (!username.trim()) {
    errors.username = 'Your name is required, adventurer.';
  } else if (username.trim().length < 3) {
    errors.username = 'Must be at least 3 characters.';
  }

  if (!email.trim()) {
    errors.email = 'An email is required.';
  } else if (!EMAIL_RE.test(email.trim())) {
    errors.email = 'That doesn’t look like a valid email.';
  }

  if (!password) {
    errors.password = 'A password is required.';
  } else if (password.length < 6) {
    errors.password = 'Must be at least 6 characters.';
  }

  if (!confirmPassword) {
    errors.confirmPassword = 'Please confirm your password.';
  } else if (confirmPassword !== password) {
    errors.confirmPassword = 'Passwords do not match.';
  }

  return errors;
}

export default function SignupPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const fieldValues = { username, email, password, confirmPassword };

  const handleBlur = (field) => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors(validate(username, email, password, confirmPassword));
  };

  const handleChange = (field, value) => {
    const next = { ...fieldValues, [field]: value };
    if (field === 'username') setUsername(value);
    if (field === 'email') setEmail(value);
    if (field === 'password') setPassword(value);
    if (field === 'confirmPassword') setConfirmPassword(value);

    if (touched[field]) {
      setErrors(validate(next.username, next.email, next.password, next.confirmPassword));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(username, email, password, confirmPassword);
    setErrors(validationErrors);
    setTouched({ username: true, email: true, password: true, confirmPassword: true });

    if (Object.keys(validationErrors).length > 0) return;

    setSubmitting(true);

    setTimeout(() => {
      setAuthCookie();
      setSubmitting(false);
      router.push('/dashboard');
    }, 1200);
  };

  const fieldBorder = (field) => (touched[field] && errors[field] ? 'var(--red)' : '#000');

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
            <h3 className="text-base sm:text-lg">JOIN THE DUNGEON</h3>
            <p className="mt-2 text-lg text-[var(--cream)]">
              Forge a new adventurer to begin your quest.
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
                style={{ background: 'var(--cream)', borderColor: fieldBorder('username') }}
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

            {/* Email */}
            <div className="mb-5">
              <label className="mb-2 block text-sm" style={{ color: 'var(--gold)' }}>
                EMAIL
              </label>
              <div
                className="flex items-center gap-2 border-2 px-3 py-2"
                style={{ background: 'var(--cream)', borderColor: fieldBorder('email') }}
              >
                <Mail size={16} color="var(--indigo)" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  onBlur={() => handleBlur('email')}
                  placeholder="you@example.com"
                  className="w-full bg-transparent text-sm outline-none"
                  style={{ color: 'var(--indigo)', fontFamily: 'var(--font-body)' }}
                />
              </div>
              {touched.email && errors.email && (
                <p className="mt-2 text-sm" style={{ color: 'var(--red)' }}>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="mb-5">
              <label className="mb-2 block text-sm" style={{ color: 'var(--gold)' }}>
                PASSWORD
              </label>
              <div
                className="flex items-center gap-2 border-2 px-3 py-2"
                style={{ background: 'var(--cream)', borderColor: fieldBorder('password') }}
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

            {/* Confirm password */}
            <div className="mb-6">
              <label className="mb-2 block text-sm" style={{ color: 'var(--gold)' }}>
                CONFIRM PASSWORD
              </label>
              <div
                className="flex items-center gap-2 border-2 px-3 py-2"
                style={{ background: 'var(--cream)', borderColor: fieldBorder('confirmPassword') }}
              >
                <Lock size={16} color="var(--indigo)" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => handleChange('confirmPassword', e.target.value)}
                  onBlur={() => handleBlur('confirmPassword')}
                  placeholder="••••••••"
                  className="w-full bg-transparent text-sm outline-none"
                  style={{ color: 'var(--indigo)', fontFamily: 'var(--font-body)' }}
                />
              </div>
              {touched.confirmPassword && errors.confirmPassword && (
                <p className="mt-2 text-sm" style={{ color: 'var(--red)' }}>
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="pbtn flex w-full items-center justify-center gap-2"
              style={submitting ? { opacity: 0.7, cursor: 'wait' } : undefined}
            >
              {submitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  FORGING...
                </>
              ) : (
                <>
                  <UserPlus size={16} />
                  SIGN UP
                </>
              )}
            </button>
          </motion.form>

          <motion.p
            variants={fadeUp}
            className="mt-6 text-center text-sm"
            style={{ color: 'var(--cyan)' }}
          >
            No backend connected yet — this just creates a session locally.
          </motion.p>

          <motion.p variants={fadeUp} className="mt-4 text-center text-sm text-[var(--cream)]">
            Already an adventurer?{' '}
            <Link href="/login" style={{ color: 'var(--gold)' }}>
              Log in
            </Link>
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
