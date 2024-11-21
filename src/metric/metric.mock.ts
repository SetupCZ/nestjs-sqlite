import type { Provider } from '@nestjs/common';

import { getCounterToken } from './inject-counter.decorator';
import { getHistogramToken } from './inject-histogram.decorator';

export const incCounterMock = jest.fn();

export const getMockedCounterProvider = (name: string): Provider => ({
  provide: getCounterToken(name),
  useValue: {
    inc: incCounterMock,
  },
});

export const stopTimerMock = jest.fn();
export const startTimerMock = jest.fn().mockReturnValue(stopTimerMock);

export const getMockedHistogramProvider = (name: string): Provider => ({
  provide: getHistogramToken(name),
  useValue: {
    startTimer: startTimerMock,
  },
});
