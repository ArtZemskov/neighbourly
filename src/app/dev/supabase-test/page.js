import { supabase } from '@/lib/supabaseClient';

export const dynamic = 'force-dynamic';

const SupabaseTestPage = async () => {
  const { data, error } = await supabase
    .from('buildings')
    .select('id, name, invite_code, created_at')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error loading buildings from Supabase:', error);
  }

  return (
    <main className="min-h-screen bg-black text-zinc-100 flex items-center justify-center">
      <div className="w-full max-w-2xl px-6 py-16">
        <h1 className="text-2xl font-semibold">Supabase connection test</h1>

        {error ? (
          <p className="mt-4 text-sm text-red-400">
            Failed to load buildings: {error.message}
          </p>
        ) : !data || data.length === 0 ? (
          <p className="mt-4 text-sm text-zinc-400">
            Supabase is connected, but there are no buildings in the database
            yet.
          </p>
        ) : (
          <div className="mt-4 space-y-3 text-sm">
            <p className="text-zinc-400">
              Supabase is connected. Buildings in the database:
            </p>
            <ul className="space-y-2">
              {data.map((building) => (
                <li
                  key={building.id}
                  className="rounded-lg border border-zinc-800 px-4 py-3"
                >
                  <div className="font-medium">{building.name}</div>
                  <div className="mt-1 text-xs text-zinc-500">
                    Invite code: {building.invite_code}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
};

export default SupabaseTestPage;
