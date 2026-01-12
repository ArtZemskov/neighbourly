'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

const ProfileGate = ({ children }) => {
  const [isChecking, setIsChecking] = useState(true);
  const [hasProfileWithBuilding, setHasProfileWithBuilding] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkProfile = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        console.error('Error checking user in ProfileGate:', userError);
      }

      if (!user) {
        router.replace('/auth');
        setIsChecking(false);
        return;
      }

      const { data, error: profileError } = await supabase
        .from('profiles')
        .select('display_name, building_id')
        .eq('user_id', user.id)
        .limit(1);

      if (profileError) {
        console.error('Error loading profile in ProfileGate:', profileError);
      }

      const profile = data && data.length > 0 ? data[0] : null;

      if (profile && profile.building_id) {
        setHasProfileWithBuilding(true);
      } else {
        setHasProfileWithBuilding(false);
      }

      setIsChecking(false);
    };

    checkProfile();
  }, [router]);

  if (isChecking) {
    return (
      <main className="min-h-screen bg-black text-zinc-200 flex items-center justify-center">
        <p className="text-sm text-zinc-400">Checking your profile…</p>
      </main>
    );
  }

  if (!hasProfileWithBuilding) {
    const handleCreateProfileClick = () => {
      router.push('/profile');
    };

    return (
      <main className="min-h-screen bg-black text-zinc-100">
        <div className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center px-6 py-16">
          <h1 className="text-3xl font-semibold">
            Set up your profile to see what your neighbours are up to
          </h1>
          <p className="mt-3 text-sm text-zinc-400">
            Create your Neighbourly profile with your name, apartment number and
            building invite code. Once your profile is linked to a building,
            you&apos;ll see the feed of posts and useful information for your
            house.
          </p>
          <button
            type="button"
            onClick={handleCreateProfileClick}
            className="mt-6 inline-flex items-center rounded-full bg-zinc-100 px-5 py-2 text-sm font-medium text-black hover:bg-white"
          >
            Create profile
          </button>
        </div>
      </main>
    );
  }

  return children;
};

export default ProfileGate;
