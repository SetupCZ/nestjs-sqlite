import {
  getLoggerToken as getPinoLoggerToken,
  InjectPinoLogger,
} from 'nestjs-pino';

import type { TConstructor } from './logger.interface';

export const getLoggerToken = getPinoLoggerToken;
export const InjectLogger = (
  scope: TConstructor,
): PropertyDecorator & ParameterDecorator => InjectPinoLogger(scope.name);
