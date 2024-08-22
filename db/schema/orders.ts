import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const orderStatusOptions = ['pending', 'inactive', 'completed'] as const;
export type OrderStatus = (typeof orderStatusOptions)[number];

export const orders = sqliteTable('orders', {
  id: text('id').notNull().primaryKey(),
  amount: integer('amount').notNull(),
  createTimestamp: integer('create_timestamp', { mode: 'timestamp_ms' })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updateTimestamp: integer('update_timestamp', { mode: 'timestamp_ms' })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  status: text('status').$type<OrderStatus>().notNull().default('pending'),
});

export type Order = typeof orders.$inferSelect;
export type InsertOrder = typeof orders.$inferInsert;
