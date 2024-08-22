import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { OrderStatus, orderStatusOptions } from '../../../db/schema';
import { ApiProperty } from '@nestjs/swagger';
import { IsIn } from 'class-validator';

const orderStatusOptionsWithoutInactive = orderStatusOptions.filter(
  (status) => status !== 'inactive',
);

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @ApiProperty({ enum: orderStatusOptionsWithoutInactive })
  @IsIn(orderStatusOptionsWithoutInactive)
  status: Exclude<OrderStatus, 'inactive'>;
}
