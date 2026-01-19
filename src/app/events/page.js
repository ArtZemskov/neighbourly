import ProtectedPage from '@/components/ProtectedPage';
import ProfileGate from '@/components/ProfileGate';
import EventsFeed from '@/components/EventsFeed';

const EventsPage = () => {
  return (
    <ProtectedPage>
      <ProfileGate>
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

            <EventsFeed />
          </main>
        </div>
      </ProfileGate>
    </ProtectedPage>
  );
};

export default EventsPage;
