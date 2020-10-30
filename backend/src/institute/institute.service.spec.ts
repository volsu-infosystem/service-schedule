import { Test, TestingModule } from '@nestjs/testing';
import { InstituteService } from './institute.service';

describe('InstituteService', () => {
  let service: InstituteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InstituteService],
    }).compile();

    service = module.get<InstituteService>(InstituteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
