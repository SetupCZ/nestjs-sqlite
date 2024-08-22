export const DATE = Symbol('DATE');

export interface IDateService {
  now(): Date;
}
