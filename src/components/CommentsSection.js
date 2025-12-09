'use client';
import { useState } from 'react';

const CommentsSection = ({ initialComments, postId }) => {
  const [comments, setComments] = useState(initialComments || []);
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmed = text.trim();
    if (!trimmed) return;

    setIsSubmitting(true);

    const newComment = {
      id: `local-${Date.now()}`,
      postId,
      author: 'You',
      createdAt: 'Just now',
      text: trimmed,
    };

    setComments((prev) => [newComment, ...prev]);
    setText('');
    setIsSubmitting(false);
  };

  return (
    <section className="mt-8">
      <h2 className="text-sm font-medium text-zinc-300">Comments</h2>

      {/* List */}
      {comments.length === 0 ? (
        <p className="mt-3 text-sm text-zinc-500">
          No comments yet. Be the first to say something.
        </p>
      ) : (
        <ul className="mt-4 space-y-3">
          {comments.map((comment) => (
            <li
              key={comment.id}
              className="rounded-lg border border-zinc-800 px-4 py-3 text-sm"
            >
              <p className="text-zinc-300">{comment.text}</p>
              <p className="mt-2 text-xs text-zinc-500">
                {comment.author} · {comment.createdAt}
              </p>
            </li>
          ))}
        </ul>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="mt-6 space-y-3">
        <label className="block text-xs font-medium text-zinc-400">
          Add a comment
        </label>
        <textarea
          className="w-full rounded-lg border border-zinc-800 bg-black px-3 py-2 text-sm text-zinc-100 outline-none focus:border-zinc-500"
          rows={3}
          placeholder="Write something for your neighbours..."
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting || text.trim().length === 0}
            className="inline-flex items-center rounded-full px-4 py-2 text-xs font-medium bg-white text-black hover:bg-zinc-200 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? 'Adding...' : 'Add comment'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CommentsSection;
