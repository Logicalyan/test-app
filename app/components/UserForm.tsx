'use client';

import { useTransition, useState } from 'react';
import { addUser } from '../actions/user';

export default function UserForm() {
    const [isPending, startTransition] = useTransition();
    const [status, setStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formElement = event.currentTarget;
        const formData = new FormData(formElement);

        setStatus(null); // Reset notifikasi sebelumnya

        startTransition(async () => {
            const result = await addUser(formData);
            if (result.success) {
                setStatus({ type: 'success', text: result.message || 'Berhasil disimpan' });
                formElement.reset(); // Bersihkan input text
            } else {
                setStatus({ type: 'error', text: result.error || 'Gagal menyimpan user' });
            }
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex gap-2">
                <input
                    type="text"
                    name="name"
                    placeholder="Masukkan nama user..."
                    disabled={isPending}
                    required
                    className="border border-gray-300 px-4 py-2 rounded-lg flex-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 transition-all"
                />

                <button
                    type="submit"
                    disabled={isPending}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-60 flex items-center justify-center min-w-[90px]"
                >
                    {isPending ? (
                        <span className="inline-flex items-center gap-1.5">
                            <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                            </svg>
                            ...
                        </span>
                    ) : (
                        'Tambah'
                    )}
                </button>
            </div>

            {status && (
                <p
                    className={`text-sm px-3 py-1.5 rounded-md ${
                        status.type === 'success'
                            ? 'text-emerald-700 bg-emerald-50 border border-emerald-200'
                            : 'text-rose-700 bg-rose-50 border border-rose-200'
                    }`}
                >
                    {status.text}
                </p>
            )}
        </form>
    );
}