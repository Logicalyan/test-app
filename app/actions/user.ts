'use server';

import { db } from '../db';
import { demoUsers } from '../db/schema';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';
import { UAParser } from 'ua-parser-js';


export async function getUsers() {
    try {
        // Mengambil semua user dan mengurutkannya dari yang terbaru
        const users = await db
            .select()
            .from(demoUsers)
            .orderBy((demoUsers.id));

        return {
            success: true,
            data: users,
        };
    } catch (err) {
        console.error("Error fetching users: ", err);
        return {
            success: false,
            data: [],
        };
    }
}

export async function addUser(formData: FormData) {
    const name = formData.get('name') as string;

    if (!name || name.trim() === '') {
        return { success: false, error: 'Name is required' };
    }

    // 1. Ambil request headers
    const headerList = await headers();

    // 2. Deteksi Alamat IP
    // Pada platform hosting (Vercel/Cloudflare), IP asli diteruskan melalui x-forwarded-for
    const forwardedFor = headerList.get('x-forwarded-for');
    const realIp = headerList.get('x-real-ip');

    // Jika x-forwarded-for berisi multiple IP (dipisah koma), ambil IP yang pertama
    const clientIp = forwardedFor
        ? forwardedFor.split(',')[0].trim()
        : realIp || '127.0.0.1';

    // 3. Deteksi Informasi Perangkat (Handphone / Desktop)
    const userAgentString = headerList.get('user-agent') || '';
    const parser = new UAParser(userAgentString);
    const result = parser.getResult();

    // Model HP: misal "Samsung SM-G998B", "iPhone", atau fallback ke tipe perangkat
    const deviceType = result.device.type; // 'mobile', 'tablet', undefined (desktop)
    const deviceVendor = result.device.vendor || ''; // Apple, Samsung, Xiaomi
    const deviceModel = result.device.model
        ? `${deviceVendor} ${result.device.model}`.trim()
        : deviceType === 'mobile'
            ? `Mobile (${deviceVendor || 'Unknown'})`
            : 'Desktop / PC';

    const os = `${result.os.name || 'Unknown OS'} ${result.os.version || ''}`.trim();
    const browser = `${result.browser.name || 'Unknown Browser'} ${result.browser.version || ''}`.trim();

    try {
        await db.insert(demoUsers).values({
            name,
            ipAddress: clientIp,
            deviceModel,
            deviceOs: os,
            deviceBrowser: browser,
        });

        revalidatePath('/');
        return {
            success: true,
            message: `User berhasil disimpan dari ${deviceModel} (${clientIp})`,
        };
    } catch (err) {
        console.error('Error insert user:', err);
        return { success: false, error: 'Gagal menyimpan data' };
    }
}