import { Global, Module } from '@nestjs/common';
import { UUID } from './uuid.interface';
import { UuidService } from './uuid.service';

@Global()
@Module({
  providers: [
    {
      provide: UUID,
      useClass: UuidService,
    },
  ],
  exports: [UUID],
})
export class UuidModule {}
