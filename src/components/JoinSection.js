'use client';

import { useState } from 'react';

const JoinSection = ({ initialJoinedNeighbours, postId }) => {
  const [joinedNeighbours, setJoinedNeighbours] = useState(
    initialJoinedNeighbours || []
  );

  const currentUserLabel = 'You';

  const hasJoined = joinedNeighbours.includes(currentUserLabel);

  const handleToggleJoin = () => {
    setJoinedNeighbours((prev) => {
      if (prev.includes(currentUserLabel)) {
        return prev.filter((name) => name !== currentUserLabel);
      }
      return [...prev, currentUserLabel];
    });
  };

  const joinedCount = joinedNeighbours.length;

  return (
    <section className="mt-8 rounded-xl border border-zinc-800 px-4 py-5 text-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
            Initiative participation
          </p>
          <p className="mt-1 text-zinc-300">
            {joinedCount === 0
              ? 'No neighbours have joined yet.'
              : `${joinedCount} neighbour${
                  joinedCount > 1 ? 's have' : ' has'
                } joined this initiative.`}
          </p>

          {joinedCount > 0 && (
            <p className="mt-1 text-xs text-zinc-500">
              {joinedNeighbours.join(', ')}
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={handleToggleJoin}
          className="inline-flex items-center justify-center rounded-full px-4 py-2 text-xs font-medium bg-white text-black hover:bg-zinc-200 transition-colors"
        >
          {hasJoined ? 'Leave' : 'Join'}
        </button>
      </div>
    </section>
  );
};

export default JoinSection;
