import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './db/schema/',
  out: './db',
  dialect: 'sqlite',
  dbCredentials: {
    url: process.env.DATABASE_CONNECTION_STRING,
  },
});
