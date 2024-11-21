import type { Provider } from '@nestjs/common';
import { Inject } from '@nestjs/common';

import type {
  Counter,
  IMetricService,
  MetricOptions,
} from './metric.interface';
import { METRIC_SERVICE } from './metric.symbol';

const decoratedTokenPrefix = 'Counter:';

const decoratedServices = new Map<string, MetricOptions>();

export const getCounterToken = (scope: string): string =>
  `${decoratedTokenPrefix}${scope}`;

export const InjectCounter = (
  name: string,
  options: MetricOptions = {},
): PropertyDecorator & ParameterDecorator => {
  decoratedServices.set(name, options);

  return Inject(getCounterToken(name));
};

const createCounterProvider = (
  name: string,
  options: MetricOptions = {},
): Provider<Counter> => ({
  inject: [METRIC_SERVICE],
  provide: getCounterToken(name),
  useFactory: (metricService: IMetricService) => {
    const defaultOptions: MetricOptions = {
      ...options,
    };

    return metricService.getCounter(name, defaultOptions);
  },
});

export const createCounterProviders = (): Provider<Counter>[] =>
  [...decoratedServices.entries()].map(([key, value]) =>
    createCounterProvider(key, value),
  );
