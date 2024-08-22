import { IDatabaseService } from './database.interface';

export class MockDatabaseService implements IDatabaseService {
  public values = jest.fn();
  public insert = jest.fn(() => ({
    values: this.values,
  }));

  // @ts-expect-error - incomplete schema
  context = {
    insert: this.insert,
  };
}
