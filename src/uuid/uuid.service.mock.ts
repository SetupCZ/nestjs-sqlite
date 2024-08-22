import { IUuidService } from './uuid.interface';

export class MockUuidService implements IUuidService {
  public static expectedUuid = '327582be-9142-44b1-832a-d5524956bcc2';

  newUuid(): string {
    return MockUuidService.expectedUuid;
  }
}
