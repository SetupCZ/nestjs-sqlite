import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { DATABASE } from '../database';
import { MockDatabaseService } from '../database/database.service.mock';
import { MockUuidService, UUID } from '../uuid';
import { DATE, MockDateService } from '../date';

describe('OrdersController', () => {
  let controller: OrdersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [
        OrdersService,
        { provide: DATABASE, useClass: MockDatabaseService },
        { provide: UUID, useClass: MockUuidService },
        { provide: DATE, useClass: MockDateService },
      ],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
