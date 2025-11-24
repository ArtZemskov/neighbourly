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
            Here you will see upcoming activities created by neighbours in your
            building.
          </p>
        </header>

        <div className="mt-8 rounded-xl border border-zinc-800 px-4 py-6 text-sm text-zinc-400">
          <p>No events yet...</p>
        </div>
      </main>
    </div>
  );
};

export default EventsPage;
