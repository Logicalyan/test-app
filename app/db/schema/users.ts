import { pgTable, serial, text } from 'drizzle-orm/pg-core';

export const demoUsers = pgTable('demo_users', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    ipAddress: text('ip_address'),
    deviceModel: text('device_model'),
    deviceOs: text('device_os'),
    deviceBrowser: text('device_browser'),
});