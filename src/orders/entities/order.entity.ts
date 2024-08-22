import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from '../../../db/schema';

export class Order {
  @ApiProperty()
  id: string;

  @ApiProperty()
  createTimestamp: Date;

  @ApiProperty()
  updateTimestamp: Date;

  @ApiProperty()
  status: OrderStatus;
}
