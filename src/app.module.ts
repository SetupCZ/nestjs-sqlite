import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';
import { DatabaseModule } from './database';
import { ConfigModule } from '@nestjs/config';
import { validateConfig } from './config/config';
import { DateModule } from './date';
import { UuidModule } from './uuid';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validate: validateConfig }),
    UuidModule,
    DateModule,
    OrdersModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
