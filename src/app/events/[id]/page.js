import ProtectedPage from '@/components/ProtectedPage';
import ProfileGate from '@/components/ProfileGate';
import EventDetails from '@/components/EventDetails';

const EventDetailPage = async ({ params }) => {
  const { id } = await params;

  return (
    <ProtectedPage>
      <ProfileGate>
        <main className="min-h-screen bg-black text-zinc-100">
          <div className="mx-auto max-w-3xl px-6 py-16">
            <EventDetails postId={id} />
          </div>
        </main>
      </ProfileGate>
    </ProtectedPage>
  );
};

export default EventDetailPage;
