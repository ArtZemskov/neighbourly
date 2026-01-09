'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

const AuthPage = () => {
  const router = useRouter();

  const [mode, setMode] = useState('sign-in');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const isSignIn = mode === 'sign-in';

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      if (isSignIn) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          throw error;
        }
        router.push('/events');
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) {
          throw error;
        }
        router.push('/events');
      }
    } catch (error) {
      console.error('Auth error:', error);
      setErrorMessage(
        error?.message || 'Something went wrong. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-zinc-100">
      <div className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center px-6 py-16">
        <header className="mb-10">
          <p className="text-xs tracking-[0.3em] text-zinc-500">NEIGHBOURLY</p>
          <h1 className="mt-4 text-3xl font-semibold">
            {isSignIn ? 'Sign in to your building' : 'Create your account'}
          </h1>
          <p className="mt-2 text-sm text-zinc-400 max-w-md">
            Use your email and a password to access Neighbourly. Later we’ll
            connect this to your building via an invite link.
          </p>
        </header>

        <section className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-6 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-xs font-medium text-zinc-400 uppercase tracking-[0.2em]"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-xl border border-zinc-700 bg-black px-3 py-2 text-sm outline-none ring-0 transition focus:border-zinc-300"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-xs font-medium text-zinc-400 uppercase tracking-[0.2em]"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                minLength={6}
                autoComplete={isSignIn ? 'current-password' : 'new-password'}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-xl border border-zinc-700 bg-black px-3 py-2 text-sm outline-none ring-0 transition focus:border-zinc-300"
              />
              <p className="text-xs text-zinc-500">
                Minimum 6 characters. Please don’t reuse important passwords.
              </p>
            </div>

            {errorMessage && (
              <p className="text-sm text-red-400">{errorMessage}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-zinc-100 px-4 py-2 text-sm font-medium text-black transition hover:bg-white disabled:cursor-not-allowed disabled:bg-zinc-500"
            >
              {isSubmitting
                ? isSignIn
                  ? 'Signing in...'
                  : 'Creating account...'
                : isSignIn
                ? 'Sign in'
                : 'Create account'}
            </button>
          </form>

          <div className="mt-6 border-t border-zinc-800 pt-4 text-sm text-zinc-400">
            {isSignIn ? (
              <p>
                New to Neighbourly?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('sign-up');
                    setErrorMessage('');
                  }}
                  className="font-medium text-zinc-100 underline-offset-2 hover:underline"
                >
                  Create an account
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('sign-in');
                    setErrorMessage('');
                  }}
                  className="font-medium text-zinc-100 underline-offset-2 hover:underline"
                >
                  Sign in instead
                </button>
              </p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default AuthPage;
