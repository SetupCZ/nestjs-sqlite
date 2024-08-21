import { Global, Module } from '@nestjs/common';
import { DATABASE } from './database.interface';
import { DatabaseService } from './database.service';

@Global()
@Module({
  providers: [
    {
      provide: DATABASE,
      useClass: DatabaseService,
    },
  ],
  exports: [DATABASE],
})
export class DatabaseModule {}
