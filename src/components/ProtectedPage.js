'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

const ProtectedPage = ({ children }) => {
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        console.error('Error checking auth:', error);
      }

      if (!user) {
        router.replace('/auth');
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
      }

      setIsChecking(false);
    };

    checkAuth();
  }, [router]);

  if (isChecking) {
    return (
      <main className="min-h-screen bg-black text-zinc-200 flex items-center justify-center">
        <p className="text-sm text-zinc-400">Checking sign-in status…</p>
      </main>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return children;
};

export default ProtectedPage;
