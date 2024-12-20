import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';
import { DatabaseModule } from './database';
import { ConfigModule } from '@nestjs/config';
import { validateConfig } from './config/config';
import { DateModule } from './date';
import { UuidModule } from './uuid';
import { AuthModule } from './auth';
import { MetricModule } from './metric';
import { LoggerModule } from './logger';

@Module({
  imports: [
    MetricModule.forRoot(),
    LoggerModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true, validate: validateConfig }),
    UuidModule,
    DateModule,
    OrdersModule,
    DatabaseModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
