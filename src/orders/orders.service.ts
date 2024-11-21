import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { DATABASE, IDatabaseService } from '../database';
import { orders } from '../../db/schema';
import { Order } from './entities/order.entity';
import { eq, ne } from 'drizzle-orm';
import { IUuidService, TUuid, UUID } from '../uuid';
import { DATE, IDateService } from '../date';
import { Span } from 'nestjs-otel';

@Injectable()
export class OrdersService {
  constructor(
    @Inject(DATABASE) private readonly database: IDatabaseService,
    @Inject(UUID) private readonly uuid: IUuidService,
    @Inject(DATE) private readonly date: IDateService,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<TUuid> {
    const id = this.uuid.newUuid();

    await this.database.context.insert(orders).values({
      id: id,
      amount: createOrderDto.amount,
    });

    return id;
  }

  @Span('find-all-orders-database-call')
  findAll(): Promise<Order[]> {
    return this.database.context
      .select()
      .from(orders)
      .where(ne(orders.status, 'inactive'));
  }

  async findOne(id: TUuid): Promise<Order> {
    const ordersResult = await this.database.context
      .select()
      .from(orders)
      .where(eq(orders.id, id))
      .limit(1);

    const order = ordersResult.at(0);

    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }

    return order;
  }

  async update(id: TUuid, updateOrderDto: UpdateOrderDto): Promise<void> {
    const result = await this.database.context
      .update(orders)
      .set({
        status: updateOrderDto.status,
        updateTimestamp: this.date.now(),
        ...(updateOrderDto.amount && { amount: updateOrderDto.amount }),
      })
      .where(eq(orders.id, id));

    if (result.changes === 0) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }

    return;
  }

  async remove(id: TUuid) {
    const result = await this.database.context
      .update(orders)
      .set({
        status: 'inactive',
        updateTimestamp: this.date.now(),
      })
      .where(eq(orders.id, id));

    if (result.changes === 0) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }

    return;
  }
}
