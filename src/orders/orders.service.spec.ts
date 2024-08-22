import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { DATABASE } from '../database';
import { MockDatabaseService } from '../database/database.service.mock';
import { MockUuidService, UUID } from '../uuid';
import { DATE, MockDateService } from '../date';
import { CreateOrderDto } from './dto/create-order.dto';

describe('OrdersService', () => {
  let service: OrdersService;
  let database: MockDatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        { provide: DATABASE, useClass: MockDatabaseService },
        { provide: UUID, useClass: MockUuidService },
        { provide: DATE, useClass: MockDateService },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
    database = module.get<MockDatabaseService>(DATABASE);
  });

  describe('create', () => {
    /*
      Im not going to implement the rest of the tests, but the idea is clear. Mock the dependencies and test the business logic.
      I would implement integration test as well where i would start the server and test the whole flow.
     */

    it('should insert new record into db and return its id', async () => {
      const createOrderDto: CreateOrderDto = { amount: 100 };
      const result = await service.create(createOrderDto);

      expect(result).toEqual(MockUuidService.expectedUuid);
      expect(database.insert).toHaveBeenCalled();
    });
  });
});
