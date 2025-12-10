import { getPostById, getCommentsForPost } from '@/data/posts';
import CommentsSection from '@/components/CommentsSection';
import JoinSection from '@/components/JoinSection';

const EventDetailPage = async ({ params }) => {
  const { id } = await params;

  const post = getPostById(id);
  const postComments = getCommentsForPost(id);
  const commentsTotal = postComments.length;

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <main className="w-full max-w-3xl px-6 py-16">
          <p className="text-sm text-zinc-500">
            Post with id <span className="font-mono">{id}</span> was not found.
          </p>
        </main>
      </div>
    );
  }

  const joinedCount =
    post.type === 'initiative' && Array.isArray(post.joinedNeighbours)
      ? post.joinedNeighbours.length
      : 0;

  return (
    <div className="min-h-screen flex items-center justify-center">
      <main className="w-full max-w-3xl px-6 py-16">
        <header className="space-y-3">
          <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">
            Neighbourly
          </p>
          <h1 className="text-3xl sm:text-4xl font-semibold leading-tight">
            {post.title}
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-xl">
            {post.description}
          </p>
        </header>

        <section className="mt-8 space-y-2 text-sm text-zinc-400">
          <p>
            <span className="text-zinc-500">Type:</span> {post.type}
          </p>
          <p>
            <span className="text-zinc-500">Posted:</span> {post.createdAt} ·{' '}
            {post.author}
          </p>

          {post.type === 'initiative' && (
            <JoinSection
              initialJoinedNeighbours={post.joinedNeighbours || []}
              postId={post.id}
            />
          )}

          <p>
            <span className="text-zinc-500">Comments:</span>{' '}
            {commentsTotal === 0
              ? 'no comments yet'
              : `${commentsTotal} comment${commentsTotal > 1 ? 's' : ''}`}
          </p>
        </section>
        <CommentsSection initialComments={postComments} postId={post.id} />
      </main>
    </div>
  );
};

export default EventDetailPage;
