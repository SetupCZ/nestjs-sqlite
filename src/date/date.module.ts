import { Global, Module } from '@nestjs/common';
import { DATE } from './date.interface';
import { DateService } from './date.service';

@Global()
@Module({
  providers: [
    {
      provide: DATE,
      useClass: DateService,
    },
  ],
  exports: [DATE],
})
export class DateModule {}
