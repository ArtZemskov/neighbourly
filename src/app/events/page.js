const posts = [
  {
    id: '1',
    type: 'help',
    title: 'Feed my cat for 2–3 days',
    description:
      'I will be away for a few days and need someone in the building to feed my cat once a day and check water. I’ll leave food and instructions.',
    author: 'Pamela (323)',
    createdAt: '2 days ago',
    commentsCount: 1,
  },
  {
    id: '2',
    type: 'sharing',
    title: 'Drill available this weekend',
    description: 'I need a drill this weekend. Thank you in advance!',
    author: 'Mark (357)',
    createdAt: 'Yesterday',
    commentsCount: 0,
  },
  {
    id: '3',
    type: 'initiative',
    title: 'Courtyard picnic to meet neighbours',
    description:
      'Let’s have an informal picnic in the courtyard on Sunday 20 July, 15:00–17:00. Bring something small to share if you like.',
    author: 'Julia (343)',
    createdAt: 'Today',
    joinedNeighbours: ['Mark (357)', 'Pamela (323)', 'Joris (338)'],
    commentsCount: 3,
  },
  {
    id: '4',
    type: 'initiative',
    title: 'Fixing broken parking barriers together',
    description:
      "Several parking barriers in our parking area are broken. Let's coordinate the order of the new ones. Join the initiative if it is relevant to you.",
    author: 'Joris (338)',
    createdAt: '3 days ago',
    joinedNeighbours: ['Wilko (347)', 'Mark (357)'],
    commentsCount: 2,
  },
];

const getTypeLabel = (type) => {
  switch (type) {
    case 'help':
      return 'Help';
    case 'sharing':
      return 'Sharing';
    case 'initiative':
      return 'Initiative';
    case 'question':
      return 'Question';
    default:
      return 'Post';
  }
};

const NeighbourPostCard = ({ post }) => {
  const typeLabel = getTypeLabel(post.type);
  const joinedCount =
    post.type === 'initiative' && Array.isArray(post.joinedNeighbours)
      ? post.joinedNeighbours.length
      : 0;

  return (
    <article className="rounded-xl border border-zinc-800 bg-zinc-950/40 p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <span className="inline-flex items-center rounded-full border border-zinc-700 px-2 py-1 text-xs font-medium uppercase tracking-wide text-zinc-300">
          {typeLabel}
        </span>
      </div>

      <h2 className="mt-3 text-base sm:text-lg font-semibold">{post.title}</h2>

      <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
        {post.description}
      </p>

      <div className="mt-4 flex flex-col gap-1 text-xs text-zinc-500">
        <p>
          Posted {post.createdAt} · {post.author}
        </p>

        {post.type === 'initiative' && (
          <p>
            {joinedCount === 0
              ? 'No neighbours joined yet'
              : `${joinedCount} neighbour${joinedCount > 1 ? 's' : ''} joined`}
          </p>
        )}

        <p>
          {post.commentsCount === 0
            ? 'No comments yet'
            : `${post.commentsCount} comment${
                post.commentsCount > 1 ? 's' : ''
              }`}
        </p>
      </div>
    </article>
  );
};

const EventsPage = () => {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <main className="w-full max-w-3xl px-6 py-16">
        <header className="space-y-4">
          <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">
            Neighbourly
          </p>
          <h1 className="text-3xl sm:text-4xl font-semibold leading-tight">
            Events in your building
          </h1>
          <p className="text-zinc-400 text-base sm:text-lg leading-relaxed max-w-xl">
            See what neighbours are organising, offering, or asking about in
            your building.
          </p>
        </header>

        <div className="mt-10 space-y-4">
          {posts.map((post) => (
            <NeighbourPostCard key={post.id} post={post} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default EventsPage;
