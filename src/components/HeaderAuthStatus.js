'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

const HeaderAuthStatus = () => {
  const [userEmail, setUserEmail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (!error && user) {
        setUserEmail(user.email ?? null);
      }

      setIsLoading(false);
    };

    fetchUser();

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUserEmail(session?.user?.email ?? null);
      }
    );

    return () => {
      subscription.subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUserEmail(null);
    router.push('/auth');
  };

  const handleSignInClick = () => {
    router.push('/auth');
  };

  if (isLoading) {
    return null;
  }

  if (!userEmail) {
    return (
      <button
        type="button"
        onClick={handleSignInClick}
        className="text-xs text-zinc-400 hover:text-zinc-100"
      >
        Sign in
      </button>
    );
  }

  return (
    <div className="flex items-center gap-3 text-xs text-zinc-400">
      <span className="max-w-40 truncate">Signed in as {userEmail}</span>
      <button
        type="button"
        onClick={handleSignOut}
        className="rounded-full border border-zinc-700 px-3 py-1 hover:border-zinc-300"
      >
        Sign out
      </button>
    </div>
  );
};

export default HeaderAuthStatus;
