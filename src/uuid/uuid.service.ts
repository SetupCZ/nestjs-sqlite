import * as crypto from 'node:crypto';
import { Global, Injectable } from '@nestjs/common';
import { IUuidService, TUuid } from './uuid.interface';

@Global()
@Injectable()
export class UuidService implements IUuidService {
  newUuid(): TUuid {
    return crypto.randomUUID();
  }
}
