import ProtectedPage from '@/components/ProtectedPage';

const InformationPage = () => {
  return (
    <ProtectedPage>
      <div className="min-h-screen flex items-center justify-center">
        <main className="w-full max-w-3xl px-6 py-16">
          <header className="space-y-4">
            <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">
              Neighbourly
            </p>
            <h1 className="text-3xl sm:text-4xl font-semibold leading-tight">
              Information for residents
            </h1>
            <p className="text-zinc-400 text-base sm:text-lg leading-relaxed max-w-xl">
              This is a place for general information about the building: house
              rules, practical details, and invitations to residents&apos;
              meetings.
            </p>
          </header>

          <section className="mt-8 rounded-xl border border-zinc-800 px-4 py-6 text-sm text-zinc-400">
            <p>
              “House rules”, “How to use shared spaces”, and “Upcoming
              meetings”.
            </p>
          </section>
        </main>
      </div>
    </ProtectedPage>
  );
};

export default InformationPage;
