import FeaturesSection from '@/components/FeaturesSection';

const Home = () => {
  return (
    <div className="min-h-screen bg-black text-wite flex items-center justify-center">
      <main className="w-full max-w-3xl px-6 py-16">
        <header className="space-y-4">
          <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">
            Neighbourly
          </p>
          <h1 className="text-3xl sm:text-4xl font-semibold leading-tight">
            A platform for neighbours to connect, organize small volunteering
            events, and support each other.
          </h1>
          <p className="text-zinc-400 text-base sm:text-lg leading-relaxed max-w-xl">
            For residents of a single building or neighbourhood block: create
            clean-up days, help elderly neighbours with moving, or join local
            initiatives in just a few clicks.
          </p>
        </header>

        <div className="mt-8">
          <button className="inline-flex items-center bg-white text-black rounded-full px-6 py-3 text-sm font-medium hover:bg-zinc-200 transition-colors cursor-pointer">
            Get started
          </button>
        </div>

        <FeaturesSection />
      </main>
    </div>
  );
};

export default Home;
