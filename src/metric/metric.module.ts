import type { DynamicModule, NestModule } from '@nestjs/common';
import { Global, Module } from '@nestjs/common';
import { OpenTelemetryModule } from 'nestjs-otel';

import { createCounterProviders } from './inject-counter.decorator';
import { createHistogramProviders } from './inject-histogram.decorator';
import { MetricService } from './metric.service';
import { METRIC_SERVICE } from './metric.symbol';

@Global()
@Module({})
export class MetricModule implements NestModule {
  configure() {}

  static forRoot(): DynamicModule {
    const histogramProviders = createHistogramProviders();
    const counterProviders = createCounterProviders();

    return {
      module: MetricModule,
      imports: [
        OpenTelemetryModule.forRoot({
          metrics: {
            hostMetrics: true,
            apiMetrics: {
              enable: true,
              ignoreRoutes: ['/favicon.ico', '/swagger(.*)'],
              ignoreUndefinedRoutes: false,
            },
          },
        }),
      ],
      providers: [
        MetricService,
        ...histogramProviders,
        ...counterProviders,
        {
          provide: METRIC_SERVICE,
          useClass: MetricService,
        },
      ],
      exports: [METRIC_SERVICE, ...histogramProviders, ...counterProviders],
    };
  }
}
