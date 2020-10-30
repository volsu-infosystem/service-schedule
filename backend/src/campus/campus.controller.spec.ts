import { Test, TestingModule } from '@nestjs/testing';
import { CampusController } from './campus.controller';

describe('CampusController', () => {
  let controller: CampusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CampusController],
    }).compile();

    controller = module.get<CampusController>(CampusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
