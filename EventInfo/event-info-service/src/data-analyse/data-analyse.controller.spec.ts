import { Test, TestingModule } from '@nestjs/testing';
import { DataAnalyseController } from './data-analyse.controller';

describe('DataAnalyseController', () => {
  let controller: DataAnalyseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataAnalyseController],
    }).compile();

    controller = module.get<DataAnalyseController>(DataAnalyseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
