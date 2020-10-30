import { Test, TestingModule } from '@nestjs/testing';
import { InstituteController } from './institute.controller';

describe('InstituteController', () => {
  let controller: InstituteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InstituteController],
    }).compile();

    controller = module.get<InstituteController>(InstituteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
