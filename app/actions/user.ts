'use server';

import { db } from '../db';
import { demoUsers } from '../db/schema';
import { revalidatePath } from 'next/cache';

export async function getUsers() {
    try {
        const users = await db.select().from(demoUsers);
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
        return {
            success: false,
            error: 'Name is required',
        };
    }

    try {
        await db.insert(demoUsers).values({ name });
        revalidatePath('/');
        return {
            success: true,
            message: 'User added successfully',
        };
    } catch (err) {
        console.error("Error adding user: ", err);
        return {
            success: false,
            error: 'Error adding user',
        };
    }
}