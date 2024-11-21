import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';
import { DatabaseModule } from './database';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TConfigService, validateConfig } from './config/config';
import { DateModule } from './date';
import { UuidModule } from './uuid';
import { AuthModule } from './auth';
import { OpenTelemetryModule } from 'nestjs-otel';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    LoggerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: TConfigService) => ({
        pinoHttp: {
          transport:
            configService.get('ENVIRONMENT') !== 'production'
              ? { target: 'pino-pretty' }
              : undefined,
        },
      }),
    }),
    OpenTelemetryModule.forRoot({
      metrics: {
        hostMetrics: true,
        apiMetrics: {
          defaultAttributes: {
            app: 'nestjs-sqlite',
          },
          enable: true,
          ignoreRoutes: ['/favicon.ico'],
          ignoreUndefinedRoutes: false,
        },
      },
    }),
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
