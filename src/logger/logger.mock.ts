import type { Provider } from '@nestjs/common';
import { fromPartial } from '@total-typescript/shoehorn';

import { getLoggerToken } from './inject-logger.decorator';
import type { TLogger } from './logger.interface';

export const loggerMock = fromPartial<TLogger>({
  fatal: jest.fn(),
  error: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  debug: jest.fn(),
  trace: jest.fn(),
});

export const getMockedPinoLoggerProvider = (name: string): Provider => ({
  provide: getLoggerToken(name),
  useValue: loggerMock,
});
