import { getUsers } from "./actions/user";
import UserForm from "./components/UserForm"; // Sesuaikan path lokasi UserForm.tsx Anda

export default async function Home() {
  const { data: users } = await getUsers();

  return (
    <main className="max-w-xl mx-auto p-8 space-y-8 font-sans">
      <h1 className="text-2xl font-bold">Drizzle ORM + Neon + Next.js App Router</h1>

      {/* Gunakan Client Component UserForm */}
      <UserForm />

      {/* List User */}
      <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
        <h2 className="text-lg font-semibold mb-3">Daftar Demo Users:</h2>
        {users.length === 0 ? (
          <p className="text-gray-500 text-sm">Belum ada data user.</p>
        ) : (
          <ul className="space-y-2">
            {users.map((user) => (
              <li
                key={user.id}
                className="bg-white p-3 rounded shadow-sm border border-gray-100 flex justify-between items-center"
              >
                <span className="font-medium text-gray-800">{user.name}</span>
                <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded">
                  ID: {user.id}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}