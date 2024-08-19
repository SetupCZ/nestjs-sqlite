export const UUID = Symbol('UUID');

export type TUuid = string;

export interface IUuidService {
  newUuid(): TUuid;
}
