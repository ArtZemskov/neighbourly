'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

const categoryLabels = {
  help: 'Help',
  sharing: 'Sharing',
  initiative: 'Initiative',
  question: 'Question',
};

const EventDetails = ({ postId }) => {
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      setErrorMessage('');

      try {
        if (!postId) {
          throw new Error('Invalid event id in the URL.');
        }

        const { data, error } = await supabase
          .from('posts')
          .select('id, category, title, body, created_at')
          .eq('id', postId)
          .maybeSingle();

        if (error) {
          console.error('Error loading post:', error);
          throw new Error('Could not load this event.');
        }

        if (!data) {
          // либо пост не существует, либо RLS не даёт его увидеть
          throw new Error(
            'This event could not be found or you don’t have access.'
          );
        }

        setPost(data);
      } catch (error) {
        console.error('EventDetails error:', error);
        setErrorMessage(
          error?.message || 'Something went wrong while loading this event.'
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  const handleBackClick = () => {
    router.push('/events');
  };

  const formatDate = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <button
          type="button"
          onClick={handleBackClick}
          className="text-sm text-zinc-400 hover:text-zinc-100"
        >
          ← Back to events
        </button>
        <p className="text-sm text-zinc-400">Loading event…</p>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="space-y-4">
        <button
          type="button"
          onClick={handleBackClick}
          className="text-sm text-zinc-400 hover:text-zinc-100"
        >
          ← Back to events
        </button>
        <p className="text-sm text-red-400">{errorMessage}</p>
      </div>
    );
  }

  const categoryLabel =
    categoryLabels[post.category] || post.category || 'Post';

  return (
    <div className="space-y-6">
      <button
        type="button"
        onClick={handleBackClick}
        className="text-sm text-zinc-400 hover:text-zinc-100"
      >
        ← Back to events
      </button>

      <article className="rounded-3xl border border-zinc-800 bg-zinc-950/60 px-6 py-6 shadow-lg">
        <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-400">
          <span className="inline-flex items-center rounded-full border border-zinc-700 px-3 py-1 uppercase tracking-[0.16em]">
            {categoryLabel}
          </span>
          <span className="text-zinc-500">
            Posted on {formatDate(post.created_at)}
          </span>
        </div>

        <h1 className="mt-4 text-2xl font-semibold text-zinc-100">
          {post.title}
        </h1>

        <p className="mt-4 text-sm text-zinc-300 leading-relaxed whitespace-pre-line">
          {post.body}
        </p>
      </article>
    </div>
  );
};

export default EventDetails;
