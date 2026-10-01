import { ImageResponse } from 'next/og';

// Ukuran standar favicon browser
export const size = {
    width: 32,
    height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
    return new ImageResponse(
        (
            // Desain tampilan huruf di sini menggunakan CSS flexbox
            <div
                style={{
                    fontSize: 20,
                    background: '#2563eb', // Warna background kotak (misal biru)
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff', // Warna huruf putih
                    fontWeight: 700,
                    borderRadius: 6, // Biar sedikit rounded (opsional, bisa 50% jika ingin lingkaran)
                }}
            >
                A {/* 👈 Ganti dengan huruf yang Anda inginkan (misal A, D, U) */}
            </div>
        ),
        {
            ...size,
        }
    );
}