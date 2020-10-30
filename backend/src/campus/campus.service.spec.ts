import { Test, TestingModule } from '@nestjs/testing';
import { CampusService } from './campus.service';

describe('CampusService', () => {
  let service: CampusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CampusService],
    }).compile();

    service = module.get<CampusService>(CampusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
