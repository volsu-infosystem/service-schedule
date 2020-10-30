import { Test, TestingModule } from '@nestjs/testing';
import { DisciplineController } from './discipline.controller';

describe('DisciplineController', () => {
  let controller: DisciplineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DisciplineController],
    }).compile();

    controller = module.get<DisciplineController>(DisciplineController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
