import { Test, TestingModule } from '@nestjs/testing';
import { InventoryDbService } from './inventory-db.service';

describe('InventoryDbService', () => {
  let service: InventoryDbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InventoryDbService],
    }).compile();

    service = module.get<InventoryDbService>(InventoryDbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
