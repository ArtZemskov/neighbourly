'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

const JoinSection = ({ postId }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isJoined, setIsJoined] = useState(false);
  const [joinCount, setJoinCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);

  const loadJoinState = async () => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        console.error('Error getting user in JoinSection:', userError);
        throw new Error('Could not get current user.');
      }

      if (!user) {
        throw new Error('You must be signed in to join an initiative.');
      }

      setCurrentUserId(user.id);

      const { data: joinRow, error: joinError } = await supabase
        .from('post_joins')
        .select('post_id')
        .eq('post_id', postId)
        .eq('user_id', user.id)
        .maybeSingle();

      if (joinError) {
        console.error('Error checking join state:', joinError);
        throw new Error('Could not check your join status.');
      }

      setIsJoined(!!joinRow);

      const { count, error: countError } = await supabase
        .from('post_joins')
        .select('post_id', { count: 'exact', head: true })
        .eq('post_id', postId);

      if (countError) {
        console.error('Error counting joins:', countError);
        throw new Error('Could not load how many neighbours joined.');
      }

      setJoinCount(count ?? 0);
    } catch (error) {
      console.error('JoinSection error:', error);
      setErrorMessage(
        error?.message || 'Something went wrong while loading the join status.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!postId) return;
    loadJoinState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId]);

  const handleToggleJoin = async () => {
    if (!currentUserId) return;

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      if (!isJoined) {
        const { error } = await supabase.from('post_joins').insert({
          post_id: postId,
          user_id: currentUserId,
        });

        if (error) {
          console.error('Error joining initiative:', error);
          throw new Error('Could not join this initiative.');
        }
      } else {
        const { error } = await supabase
          .from('post_joins')
          .delete()
          .eq('post_id', postId)
          .eq('user_id', currentUserId);

        if (error) {
          console.error('Error leaving initiative:', error);
          throw new Error('Could not leave this initiative.');
        }
      }

      await loadJoinState();
    } catch (error) {
      console.error('JoinSection toggle error:', error);
      setErrorMessage(
        error?.message || 'Something went wrong while updating your join.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const joinText =
    joinCount === 0
      ? 'No neighbours joined yet'
      : joinCount === 1
        ? '1 neighbour joined'
        : `${joinCount} neighbours joined`;

  return (
    <section className="mt-8 rounded-3xl border border-zinc-800 bg-zinc-950/60 px-5 py-4 text-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
            Initiative
          </p>
          {isLoading ? (
            <p className="text-sm text-zinc-400">
              Checking who joined this initiative…
            </p>
          ) : (
            <p className="text-sm text-zinc-300">{joinText}</p>
          )}
          {errorMessage && (
            <p className="text-xs text-red-400">{errorMessage}</p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleToggleJoin}
            disabled={isLoading || isSubmitting || !currentUserId}
            className="inline-flex items-center rounded-full bg-zinc-100 px-4 py-2 text-xs font-medium text-black disabled:opacity-50"
          >
            {isSubmitting
              ? isJoined
                ? 'Leaving...'
                : 'Joining...'
              : isJoined
                ? 'Leave initiative'
                : 'Join initiative'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default JoinSection;
