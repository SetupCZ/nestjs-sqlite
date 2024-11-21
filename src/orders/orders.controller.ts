import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TUuid, UuidParam } from '../uuid';
import { Span } from 'nestjs-otel';
import { InjectLogger, TLogger } from '../logger';
import { Histogram, InjectHistogram } from '../metric';
import { JwtAuthGuard } from '../auth';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    @InjectLogger(OrdersController)
    private readonly logger: TLogger,
    @InjectHistogram('FIND_ALL_ORDERS_DURATION')
    private readonly findAllOrdersHistogram: Histogram,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Order created' })
  @Span('create-order')
  create(
    @Body(new ValidationPipe()) createOrderDto: CreateOrderDto,
  ): Promise<TUuid> {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  @ApiResponse({ status: HttpStatus.OK, type: Order, isArray: true })
  @Span('find-all-orders')
  findAll(): Promise<Order[]> {
    this.logger.info({ data: 'test' }, 'Find all orders');
    const stopTimer = this.findAllOrdersHistogram.startTimer();

    return this.ordersService.findAll().finally(() => {
      stopTimer();
    });
  }

  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, type: Order })
  @ApiNotFoundResponse({ description: 'Order not found' })
  @UuidParam()
  findOne(@Param('id', ParseUUIDPipe) id: TUuid): Promise<Order> {
    return this.ordersService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({ status: HttpStatus.OK })
  @ApiNotFoundResponse({ description: 'Order not found' })
  @UuidParam()
  update(
    @Param('id', ParseUUIDPipe) id: TUuid,
    @Body(new ValidationPipe()) updateOrderDto: UpdateOrderDto,
  ): Promise<void> {
    return this.ordersService.update(id, updateOrderDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @ApiNotFoundResponse({ description: 'Order not found' })
  @UuidParam()
  remove(@Param('id', ParseUUIDPipe) id: TUuid) {
    return this.ordersService.remove(id);
  }
}
