import type { PinoLogger } from 'nestjs-pino';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface INonNullishValue {}

export type TConstructor<T extends INonNullishValue = INonNullishValue> = new (
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  ...args: any[]
) => T;

export type TLogger = PinoLogger;
