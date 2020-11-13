import { Test, TestingModule } from '@nestjs/testing';
import { CathedraService } from './cathedra.service';

describe('CathedraService', () => {
  let service: CathedraService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CathedraService],
    }).compile();

    service = module.get<CathedraService>(CathedraService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
