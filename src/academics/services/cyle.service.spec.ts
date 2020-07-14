import { Test, TestingModule } from '@nestjs/testing';
import { CycleService } from '@academics/services/cycle.service';
import { CycleRepository } from '@academics/repositories/cycle.repository';
import { mockPageDto, mockPagination } from '@core/constants/mock.constants';

const mockCycles = [[{ name: 'B' }, { name: 'A' }], 2];

const mockCycleDto = {
  name: 'Mock Cycle',
};

const mockCyclesResponse = {
  data: mockCycles[0],
  pagination: mockPagination,
};

const mockCycleRepository = () => ({
  getAllCycles: jest.fn(),
  save: jest.fn(),
  getCycleByName: jest.fn(),
  getCycleByIdOrThrow: jest.fn(),
  delete: jest.fn(),
});

describe('Cycle Service', () => {
  let cycleService: CycleService;
  let cycleRepository: CycleRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CycleService, { provide: CycleRepository, useFactory: mockCycleRepository }],
    }).compile();

    cycleService = module.get(CycleService);
    cycleRepository = module.get(CycleRepository);
  });

  it('Should be defined', () => {
    expect(cycleService).toBeDefined();
    expect(cycleRepository).toBeDefined();
  });

  describe('Get All cycles', () => {
    it('Should Get all cycles', async () => {
      (cycleRepository.getAllCycles as jest.Mock).mockResolvedValue(mockCycles);
      const result = await cycleService.getAllCycles(mockPageDto, {});
      expect(result).toEqual(mockCyclesResponse);
    });
  });
  /*
  it('Should Create a new cycle', async () => {
    (cycleRepository.getCycleByName as jest.Mock).mockResolvedValue(null);
    (cycleRepository.save as jest.Mock).mockResolvedValue(mockCycleDto);
    const result = await cycleService.createCycle(mockCycleDto);
    expect(result).toEqual({ data: mockCycleDto });
  });

  it('Should Update a specific cycle', async () => {
    (cycleRepository.getCycleByIdOrThrow as jest.Mock).mockResolvedValue(mockCycleDto);
    (cycleRepository.getCycleByName as jest.Mock).mockResolvedValue(null);
    (cycleRepository.save as jest.Mock).mockResolvedValue(mockCycleDto);
    const result = await cycleService.updateCycle(10, mockCycleDto);
    expect(result).toEqual({ data: mockCycleDto });
  });

  describe('Remove cycle', () => {
    it('Should delete a specific cycle', async () => {
      (cycleRepository.getCycleByIdOrThrow as jest.Mock).mockResolvedValue(mockCycleDto);
      await cycleService.deleteCycle(10);
      expect(cycleRepository.save).toBeCalled();
    });
  });
    */
});
