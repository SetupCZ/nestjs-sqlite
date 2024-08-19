import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { TUuid, UuidParam } from '../uuid';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  @UuidParam()
  findOne(@Param('id', ParseUUIDPipe) id: TUuid) {
    return this.ordersService.findOne(id);
  }

  @Patch(':id')
  @UuidParam()
  update(
    @Param('id', ParseUUIDPipe) id: TUuid,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.ordersService.update(id, updateOrderDto);
  }

  @Delete(':id')
  @UuidParam()
  remove(@Param('id', ParseUUIDPipe) id: TUuid) {
    return this.ordersService.remove(id);
  }
}
