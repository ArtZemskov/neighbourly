'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

const CommentsSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadComments = async () => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      if (!postId) {
        throw new Error('Invalid event id.');
      }

      const { data, error } = await supabase
        .from('comments')
        .select('id, body, created_at, user_id')
        .eq('post_id', postId)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error loading comments:', error);
        throw new Error('Could not load comments.');
      }

      setComments(data || []);
    } catch (error) {
      console.error('CommentsSection error:', error);
      setErrorMessage(
        error?.message || 'Something went wrong while loading comments.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmed = newComment.trim();
    if (!trimmed) return;

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        console.error('Error getting user in CommentsSection:', userError);
        throw new Error('Could not determine current user.');
      }

      if (!user) {
        throw new Error('You must be signed in to add a comment.');
      }

      const { error: insertError } = await supabase.from('comments').insert({
        post_id: postId,
        user_id: user.id,
        body: trimmed,
      });

      if (insertError) {
        console.error('Error inserting comment:', insertError);
        throw new Error('Could not save your comment.');
      }

      setNewComment('');
      await loadComments();
    } catch (error) {
      console.error('CommentsSection submit error:', error);
      setErrorMessage(
        error?.message || 'Something went wrong while adding your comment.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDateTime = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <section className="mt-10 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-zinc-100">Comments</h2>
        <span className="text-xs text-zinc-500">
          {comments.length === 0
            ? 'No comments yet'
            : `${comments.length} comment${comments.length > 1 ? 's' : ''}`}
        </span>
      </div>

      <div className="space-y-4">
        {isLoading && (
          <p className="text-sm text-zinc-400">Loading comments…</p>
        )}

        {!isLoading && errorMessage && (
          <p className="text-sm text-red-400">{errorMessage}</p>
        )}

        {!isLoading && !errorMessage && comments.length === 0 && (
          <p className="text-sm text-zinc-400">
            There are no comments yet. Be the first to start the discussion.
          </p>
        )}

        {!isLoading && !errorMessage && comments.length > 0 && (
          <ul className="space-y-3">
            {comments.map((comment) => (
              <li
                key={comment.id}
                className="rounded-2xl border border-zinc-800 bg-zinc-950/60 px-4 py-3 text-sm"
              >
                <div className="flex items-center justify-between text-xs text-zinc-500">
                  <span>Neighbour</span>
                  <span>{formatDateTime(comment.created_at)}</span>
                </div>
                <p className="mt-2 text-sm text-zinc-200 leading-relaxed">
                  {comment.body}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <label className="block text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
          Add a comment
        </label>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          rows={3}
          className="w-full rounded-2xl border border-zinc-800 bg-black px-3 py-2 text-sm text-zinc-100 outline-none focus:border-zinc-400"
          placeholder="Write a comment to your neighbours…"
        />
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting || !newComment.trim()}
            className="rounded-full bg-zinc-100 px-4 py-2 text-sm font-medium text-black disabled:opacity-50"
          >
            {isSubmitting ? 'Sending…' : 'Post comment'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CommentsSection;
