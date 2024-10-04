import { Inject, Injectable } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as SQliteDatabase from 'better-sqlite3';
import { ConfigService } from '@nestjs/config';
import { TConfigService } from '../config/config';
import { DbContext, IDatabaseService } from './database.interface';

@Injectable()
export class DatabaseService implements IDatabaseService {
  public readonly context: DbContext;

  constructor(
    @Inject(ConfigService) private readonly configService: TConfigService,
  ) {
    const connectionString = this.configService.get(
      'DATABASE_CONNECTION_STRING',
    );

    const sqlite = new SQliteDatabase(connectionString);

    this.context = drizzle(sqlite, { logger: true });
  }
}
