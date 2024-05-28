import { Test, TestingModule } from '@nestjs/testing';
import { DataAnalyseService } from './data-analyse.service';

describe('DataAnalyseService', () => {
  let service: DataAnalyseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataAnalyseService],
    }).compile();

    service = module.get<DataAnalyseService>(DataAnalyseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
