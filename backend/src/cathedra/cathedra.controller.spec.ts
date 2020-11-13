import { Test, TestingModule } from '@nestjs/testing';
import { CathedraController } from './cathedra.controller';

describe('CathedraController', () => {
  let controller: CathedraController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CathedraController],
    }).compile();

    controller = module.get<CathedraController>(CathedraController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
