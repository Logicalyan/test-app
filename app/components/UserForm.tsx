'use client';

import { useTransition, useState } from 'react';
import { addUser } from '../actions/user';

export default function UserForm() {
    const [isPending, startTransition] = useTransition();
    const [message, setMessage] = useState<string | null>(null);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formElement = event.currentTarget;
        const formData = new FormData(formElement);

        startTransition(async () => {
            const result = await addUser(formData);
            if (result.success) {
                setMessage(result.message || null);
                formElement.reset(); // Bersihkan input text
            } else {
                setMessage(result.error || null);
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
                    className="border border-gray-300 px-4 py-2 rounded-lg flex-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                />

                <button
                    type="submit"
                    disabled={isPending}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                >
                    {isPending ? 'Menyimpan...' : 'Tambah'}
                </button>
            </div>

            {message && (
                <p className="text-sm text-gray-600 italic">{message}</p>
            )}
        </form>
    );
}