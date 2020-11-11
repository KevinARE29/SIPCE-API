import { Test, TestingModule } from '@nestjs/testing';
import { ExpedientService } from '@expedient/services/expedient.service';

describe('ExpedientService', () => {
  let service: ExpedientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExpedientService],
    }).compile();

    service = module.get<ExpedientService>(ExpedientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
