import type { Provider } from '@nestjs/common';
import { Inject } from '@nestjs/common';

import type {
  Histogram,
  IMetricService,
  MetricOptions,
} from './metric.interface';
import { METRIC_SERVICE } from './metric.symbol';

const decoratedTokenPrefix = 'Histogram:';

const decoratedServices = new Map<string, MetricOptions>();

export const getHistogramToken = (scope: string): string =>
  `${decoratedTokenPrefix}${scope}`;

export const InjectHistogram = (
  name: string,
  options: MetricOptions = {},
): PropertyDecorator & ParameterDecorator => {
  decoratedServices.set(name, options);

  return Inject(getHistogramToken(name));
};

const createHistogramProvider = (
  name: string,
  options: MetricOptions = {},
): Provider<Histogram> => ({
  inject: [METRIC_SERVICE],
  provide: getHistogramToken(name),
  useFactory: (metricService: IMetricService) => {
    const defaultOptions: MetricOptions = {
      ...options,
    };

    return metricService.getHistogram(name, defaultOptions);
  },
});

export const createHistogramProviders = (): Provider<Histogram>[] =>
  [...decoratedServices.entries()].map(([key, value]) =>
    createHistogramProvider(key, value),
  );
