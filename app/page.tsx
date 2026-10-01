import { getUsers } from "./actions/user";
import UserForm from "./components/UserForm"; // Pastikan path sesuai lokasi UserForm.tsx

export default async function Home() {
  const { data: users } = await getUsers();

  return (
    <main className="max-w-xl mx-auto p-8 space-y-8 font-sans">
      <h1 className="text-2xl font-bold">Drizzle ORM + Neon + Next.js App Router</h1>

      {/* Komponen Form Input */}
      <UserForm />

      {/* List User */}
      <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
        <h2 className="text-lg font-semibold mb-3">Daftar Demo Users:</h2>
        
        {users.length === 0 ? (
          <p className="text-gray-500 text-sm">Belum ada data user.</p>
        ) : (
          <ul className="space-y-3">
            {users.map((user) => (
              <li
                key={user.id}
                className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex flex-col gap-1.5"
              >
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-900 text-base">{user.name}</span>
                  <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded font-mono">
                    ID: #{user.id}
                  </span>
                </div>

                {/* Info Device & IP */}
                <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 pt-1 border-t border-gray-50">
                  <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-0.5 rounded">
                    📱 {user.deviceModel || 'Unknown Device'}
                  </span>
                  {user.deviceOs && (
                    <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                      ⚙️ {user.deviceOs}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">
                    🌐 {user.ipAddress || '127.0.0.1'}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}