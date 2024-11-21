import type {
  Attributes,
  Counter as OtelCounter,
  Histogram as OtelHistogram,
} from '@opentelemetry/api';
import type { OtelMetricOptions } from 'nestjs-otel/lib/interfaces/metric-options.interface';

import type { MetricService } from './metric.service';

export interface Histogram extends OtelHistogram<Attributes> {
  startTimer: (attributes?: Attributes) => (attributes?: Attributes) => void;
}

export interface Counter extends OtelCounter<Attributes> {
  inc: (attributes?: Attributes) => void;
}

export type MetricOptions = OtelMetricOptions;

export interface IMetricService extends MetricService {
  getHistogram(name: string, options?: MetricOptions): Histogram;
  getCounter(name: string, options?: MetricOptions): Counter;
}
