import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as SQliteDatabase from 'better-sqlite3';
import { orders } from './schema';
import * as crypto from 'node:crypto';

const sqlite = new SQliteDatabase(process.env.DATABASE_CONNECTION_STRING);

const db = drizzle(sqlite);

const statuses = ['pending', 'inactive', 'completed'];

(async () => {
  try {
    await db
      .insert(orders)
      .values(
        new Array(50).fill(0).map(() => ({
          id: crypto.randomUUID(),
          amount: Math.floor(Math.random() * 1000),
          status: statuses[Math.floor(Math.random() * statuses.length)],
        })),
      )
      .execute();

    console.info('Database seeded successfully');
  } catch (e) {
    console.error('Error seeding database');
    console.error(e);
  }
})();
