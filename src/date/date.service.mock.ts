import { IDateService } from './date.interface';

export class MockDateService implements IDateService {
  private expectedDate = '2021-01-01T00:00:00Z';

  now(): Date {
    return new Date(this.expectedDate);
  }
}
