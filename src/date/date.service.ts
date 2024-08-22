import { Injectable } from '@nestjs/common';
import { IDateService } from './date.interface';

@Injectable()
export class DateService implements IDateService {
  now(): Date {
    return new Date();
  }
}
