import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { TUuid } from '../uuid';
import { DATABASE, IDatabaseService } from '../database';

@Injectable()
export class OrdersService {
  constructor(@Inject(DATABASE) private readonly database: IDatabaseService) {}

  create(createOrderDto: CreateOrderDto) {
    return 'This action adds a new order';
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: TUuid) {
    return `This action returns a #${id} order`;
  }

  update(id: TUuid, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: TUuid) {
    return `This action removes a #${id} order`;
  }
}
