'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

const ProfileForm = () => {
  const [name, setName] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [apartment, setApartment] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        console.error('Error getting user in ProfileForm:', userError);
        throw new Error('Could not get current user. Please try again.');
      }

      if (!user) {
        throw new Error('You must be signed in to create a profile.');
      }

      const trimmedCode = inviteCode.trim();

      const { data: buildings, error: buildingError } = await supabase
        .from('buildings')
        .select('id')
        .eq('invite_code', trimmedCode);

      if (buildingError) {
        console.error('Error looking up building:', buildingError);
        throw new Error('Could not look up building for this invite code.');
      }

      const building = buildings && buildings.length > 0 ? buildings[0] : null;

      if (!building) {
        throw new Error(
          'We couldn’t find a building with this invite code. Please check the code with your building admin.'
        );
      }

      const profilePayload = {
        user_id: user.id,
        display_name: name.trim(),
        apartment_label: apartment.trim(),
        photo_url: photoUrl.trim() || null,
        building_id: building.id,
        role: 'resident',
        is_approved: true,
      };

      const { error: profileError } = await supabase
        .from('profiles')
        .upsert(profilePayload);

      if (profileError) {
        console.error('Error saving profile:', profileError);
        throw new Error('Could not save your profile. Please try again.');
      }

      setSuccessMessage('Profile saved. Redirecting to events…');

      router.push('/events');
    } catch (error) {
      console.error('ProfileForm error:', error);
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
        <header className="mb-8">
          <p className="text-xs tracking-[0.3em] text-zinc-500">PROFILE</p>
          <h1 className="mt-4 text-3xl font-semibold">
            Set up your Neighbourly profile
          </h1>
          <p className="mt-2 text-sm text-zinc-400 max-w-md">
            Add your name, apartment and building invite code. Once your profile
            is linked to a building, you&apos;ll see the feed of posts and
            information for your house.
          </p>
        </header>

        <section className="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-6 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-xs font-medium text-zinc-400 uppercase tracking-[0.2em]"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="w-full rounded-xl border border-zinc-700 bg-black px-3 py-2 text-sm outline-none ring-0 transition focus:border-zinc-300"
                placeholder="How neighbours will see you (e.g. Anna)"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="photo"
                className="text-xs font-medium text-zinc-400 uppercase tracking-[0.2em]"
              >
                Photo (optional)
              </label>
              <input
                id="photo"
                type="url"
                value={photoUrl}
                onChange={(event) => setPhotoUrl(event.target.value)}
                className="w-full rounded-xl border border-zinc-700 bg-black px-3 py-2 text-sm outline-none ring-0 transition focus:border-zinc-300"
                placeholder="Image URL (you can leave this empty)"
              />
              <p className="text-xs text-zinc-500">
                Later we can add real image upload. For now this can stay empty
                or you can paste a link to an image.
              </p>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="apartment"
                className="text-xs font-medium text-zinc-400 uppercase tracking-[0.2em]"
              >
                Apartment
              </label>
              <input
                id="apartment"
                type="text"
                required
                value={apartment}
                onChange={(event) => setApartment(event.target.value)}
                className="w-full rounded-xl border border-zinc-700 bg-black px-3 py-2 text-sm outline-none ring-0 transition focus:border-zinc-300"
                placeholder="For example: 144, 3B, B-21"
              />
              <p className="text-xs text-zinc-500">
                This will be shown next to your name, e.g. Anna (144).
              </p>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="inviteCode"
                className="text-xs font-medium text-zinc-400 uppercase tracking-[0.2em]"
              >
                Building invite code
              </label>
              <input
                id="inviteCode"
                type="text"
                required
                value={inviteCode}
                onChange={(event) => setInviteCode(event.target.value)}
                className="w-full rounded-xl border border-zinc-700 bg-black px-3 py-2 text-sm outline-none ring-0 transition focus:border-zinc-300"
                placeholder="Code from your building admin (e.g. amst-1058-dev)"
              />
              <p className="text-xs text-zinc-500">
                Your building admin shares this code with neighbours. We use it
                to link your profile to the right building.
              </p>
            </div>

            {errorMessage && (
              <p className="text-sm text-red-400">{errorMessage}</p>
            )}

            {successMessage && (
              <p className="text-sm text-emerald-400">{successMessage}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-zinc-100 px-4 py-2 text-sm font-medium text-black transition hover:bg-white disabled:cursor-not-allowed disabled:bg-zinc-500"
            >
              {isSubmitting ? 'Saving profile…' : 'Save profile'}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
};

export default ProfileForm;
