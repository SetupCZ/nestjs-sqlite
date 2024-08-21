import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3/driver';

export const DATABASE = Symbol('DATABASE');

export interface IDatabaseService {
  context: DbContext;
}

export type DbContext = BetterSQLite3Database;
