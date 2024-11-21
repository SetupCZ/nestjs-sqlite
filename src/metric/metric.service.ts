import { Injectable, Scope } from '@nestjs/common';
import type { Attributes } from '@opentelemetry/api';
import { MetricService as OtelMetricService } from 'nestjs-otel';
import type { OtelMetricOptions } from 'nestjs-otel/lib/interfaces/metric-options.interface';

import type {
  Counter,
  Histogram,
  IMetricService,
  MetricOptions,
} from './metric.interface';

@Injectable({ scope: Scope.REQUEST })
export class MetricService extends OtelMetricService implements IMetricService {
  constructor() {
    super();
  }

  public override getHistogram(
    name: string,
    options?: MetricOptions,
  ): Histogram {
    const histogram = super.getHistogram(name, options);

    return {
      ...histogram,
      startTimer: (attributes: Attributes = {}) => {
        const startTime = process.hrtime();

        return (newAttributes: Attributes = {}) => {
          // https://github.com/siimon/prom-client/blob/c1d76c5d497ef803f6bd90c56c713c3fa811c3e0/lib/histogram.js#L179
          const delta = process.hrtime(startTime);
          const diff = delta[0] + delta[1] / 1e9;
          histogram.record(diff, { ...newAttributes, ...attributes });

          return diff;
        };
      },
    };
  }

  public override getCounter(
    name: string,
    options?: OtelMetricOptions,
  ): Counter {
    const counter = super.getCounter(name, options);

    return {
      ...counter,
      inc: (attributes: Attributes = {}) => {
        counter.add(1, attributes);
      },
    };
  }
}
