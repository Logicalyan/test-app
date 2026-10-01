import { config } from 'dotenv';
config({ path: '.env.local' });

import { defineConfig } from 'drizzle-kit';

if (!process.env.DIRECT_URL) {
    throw new Error('DIRECT_URL is not set in the .env file');
}

export default defineConfig({
    schema: './app/db/schema/index.ts', // Your schema file path
    out: './drizzle', // Your migrations folder
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DIRECT_URL,
    },
});