'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

const categoryLabels = {
  help: 'Help',
  sharing: 'Sharing',
  initiative: 'Initiative',
  question: 'Question',
};

const categoriesInFilter = ['all', 'help', 'sharing', 'initiative', 'question'];

const EventsFeed = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      setErrorMessage('');

      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError) {
          console.error('Error getting user in EventsFeed:', userError);
          throw new Error('Could not get current user.');
        }

        if (!user) {
          throw new Error('You must be signed in to see events.');
        }

        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('building_id')
          .eq('user_id', user.id)
          .maybeSingle();

        if (profileError) {
          console.error('Error loading profile in EventsFeed:', profileError);
          throw new Error('Could not load your profile.');
        }

        if (!profile || !profile.building_id) {
          throw new Error(
            'Your profile is not linked to a building yet. Please create or update your profile.'
          );
        }

        const buildingId = profile.building_id;

        const { data: postsData, error: postsError } = await supabase
          .from('posts')
          .select('id, category, title, body, created_at')
          .eq('building_id', buildingId)
          .order('created_at', { ascending: false });

        if (postsError) {
          console.error('Error loading posts:', postsError);
          throw new Error('Could not load events for your building.');
        }

        setPosts(postsData || []);
      } catch (error) {
        console.error('EventsFeed error:', error);
        setErrorMessage(
          error?.message || 'Something went wrong while loading events.'
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const formatDate = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const filteredPosts =
    activeCategory === 'all'
      ? posts
      : posts.filter((post) => post.category === activeCategory);

  if (isLoading) {
    return (
      <section className="mt-10 text-sm text-zinc-400">
        Loading events in your building…
      </section>
    );
  }

  if (errorMessage) {
    return (
      <section className="mt-10 text-sm text-red-400">{errorMessage}</section>
    );
  }

  if (posts.length === 0) {
    return (
      <section className="mt-10 text-sm text-zinc-400">
        There are no posts in your building yet. Be the first to create one.
      </section>
    );
  }

  return (
    <section className="mt-10 space-y-6">
      <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400">
        <span className="mr-2 text-[10px] uppercase tracking-[0.18em] text-zinc-500">
          Filter
        </span>
        {categoriesInFilter.map((key) => {
          const isActive = activeCategory === key;
          const label =
            key === 'all' ? 'All' : categoryLabels[key] || key || 'Other';

          return (
            <button
              key={key}
              type="button"
              onClick={() => setActiveCategory(key)}
              className={`rounded-full border px-3 py-1 transition ${
                isActive
                  ? 'border-zinc-100 bg-zinc-100 text-black'
                  : 'border-zinc-700 bg-transparent text-zinc-400 hover:border-zinc-400 hover:text-zinc-100'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {filteredPosts.length === 0 ? (
        <p className="text-sm text-zinc-400">
          There are no posts in this category yet.
        </p>
      ) : (
        filteredPosts.map((post) => {
          const categoryLabel =
            categoryLabels[post.category] || post.category || 'Other';

          return (
            <article
              key={post.id}
              className="rounded-3xl border border-zinc-800 bg-zinc-950/60 px-6 py-5 shadow-lg"
            >
              <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-400">
                <span className="inline-flex items-center rounded-full border border-zinc-700 px-3 py-1 uppercase tracking-[0.16em]">
                  {categoryLabel}
                </span>
                <span className="text-zinc-500">
                  Posted on {formatDate(post.created_at)}
                </span>
              </div>

              <h2 className="mt-4 text-lg font-semibold text-zinc-100">
                {post.title}
              </h2>

              <p className="mt-2 text-sm text-zinc-300 leading-relaxed">
                {post.body}
              </p>

              {/* join / comments */}
            </article>
          );
        })
      )}
    </section>
  );
};

export default EventsFeed;
