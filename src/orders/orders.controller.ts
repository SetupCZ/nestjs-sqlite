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
import { JwtAuthGuard } from '../auth';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Order created' })
  create(
    @Body(new ValidationPipe()) createOrderDto: CreateOrderDto,
  ): Promise<TUuid> {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  @ApiResponse({ status: HttpStatus.OK, type: Order, isArray: true })
  findAll(): Promise<Order[]> {
    return this.ordersService.findAll();
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
