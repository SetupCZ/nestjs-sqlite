import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { context, trace } from '@opentelemetry/api';
import { LoggerModule as NestPinoModule } from 'nestjs-pino';

@Global()
@Module({})
export class LoggerModule {
  static forRoot() {
    return {
      module: LoggerModule,
      imports: [
        NestPinoModule.forRootAsync({
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => {
            return {
              pinoHttp: {
                autoLogging: {
                  ignore: (req) => req.url?.startsWith('/swagger') ?? false,
                },
                formatters: {
                  level: (label) => ({ level: label }),
                  log(object) {
                    const span = trace.getSpan(context.active());
                    if (!span) {
                      return { ...object };
                    }

                    const { spanId, traceId } = span.spanContext();

                    return { ...object, spanId, traceId };
                  },
                },
                transport:
                  configService.get('ENVIRONMENT') !== 'production'
                    ? { target: 'pino-pretty' }
                    : undefined,
              },
            };
          },
        }),
      ],
    };
  }
}
