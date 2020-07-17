import { Test, TestingModule } from '@nestjs/testing';
import { PeriodRepository } from '@academics/repositories/period.repository';
import { mockPageDto, mockPagination } from '@core/constants/mock.constants';
import { ConflictException } from '@nestjs/common';
import { PeriodService } from './period.service';

const mockPeriods = [
  [
    { name: 'Primer Periodo', active: 'true' },
    { name: 'Cuarto Periodo', active: 'false' },
  ],
  2,
];

const mockPeriodDto = {
  name: 'Mock Period',
};

const mockPeriodsResponse = {
  data: mockPeriods[0],
  pagination: mockPagination,
};

const mockPeriodRepository = () => ({
  getAllPeriods: jest.fn().mockResolvedValue(mockPeriods),
  save: jest.fn(),
  getPeriodByName: jest.fn(),
  getPeriodByIdOrThrow: jest.fn(),
  delete: jest.fn(),
});

describe('Period Service', () => {
  let periodService: PeriodService;
  let periodRepository: PeriodRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PeriodService, { provide: PeriodRepository, useFactory: mockPeriodRepository }],
    }).compile();

    periodService = module.get(PeriodService);
    periodRepository = module.get(PeriodRepository);
  });

  it('Should be defined', () => {
    expect(periodService).toBeDefined();
    expect(periodRepository).toBeDefined();
  });

  describe('Get All periods', () => {
    it('Should Get all periods', async () => {
      const result = await periodService.getAllPeriods(mockPageDto, {});
      expect(result).toEqual(mockPeriodsResponse);
    });
  });

  describe('Remove period', () => {
    it('Should delete a specific period', async () => {
      (periodRepository.getPeriodByIdOrThrow as jest.Mock).mockResolvedValue(mockPeriodDto);
      await periodService.deletePeriod(10);
      expect(periodRepository.save).toBeCalled();
    });
  });

  it('Should throw a conflict error if the period is read only', async () => {
    (periodRepository.getPeriodByIdOrThrow as jest.Mock).mockResolvedValue(mockPeriodDto);
    expect(periodService.deletePeriod(1)).rejects.toThrowError(ConflictException);
  });
});
