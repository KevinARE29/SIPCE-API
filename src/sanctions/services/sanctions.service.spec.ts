import { Test, TestingModule } from '@nestjs/testing';
import { SanctionsService } from '@sanctions/services/sanctions.service';
import { SanctionsRepository } from '@sanctions/repository/sanctions.repository';
import { mockPageDto } from '@core/constants/mock.constants';
import { NotFoundException } from '@nestjs/common';

const mockSanctions = [
  [
    { description: 'Sanción por falta leve', name: 'Anotación en diario de clases', numeral: '8.1.2' },
    { description: 'Sanción por falta grave', name: 'Suspensión temporal', numeral: '8.1.4' },
  ],
  2,
];

const mockSanctionsResponse = {
  data: mockSanctions[0],
  pagination: {
    totalPages: 1,
    perPage: mockPageDto.perPage,
    totalItems: mockSanctions[1],
    page: mockPageDto.page,
    nextPage: undefined,
    previousPage: undefined,
  },
};

const mockCreateSanctionDto = {
  name: 'Mock Sanction',
  description: 'Saction description',
  numeral: '8.1.3',
};

const mockSanctionRepository = () => ({
  find: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
  findByIdOrThrow: jest.fn(),
  getSanctionByName: jest.fn(),
  getSanctionByNumeral: jest.fn(),
  getAllSanctions: jest.fn().mockResolvedValue(mockSanctionsResponse),
});

describe('Sanction Service', () => {
  let sanctionsService: SanctionsService;
  let sanctionsRepository: SanctionsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SanctionsService, { provide: SanctionsRepository, useFactory: mockSanctionRepository }],
    }).compile();

    sanctionsService = module.get(SanctionsService);
    sanctionsRepository = module.get(SanctionsRepository);
  });

  it('Should be defined', () => {
    expect(sanctionsService).toBeDefined();
    expect(sanctionsRepository).toBeDefined();
  });

  describe('Get All Sanctions', () => {
    it('Should Get all sanctions', async () => {
      (sanctionsRepository.getAllSanctions as jest.Mock).mockResolvedValue(mockSanctions);
      const result = await sanctionsService.getAllSanctions(mockPageDto, {});
      expect(result).toEqual(mockSanctionsResponse);
    });

    it('Should Create a new saction', async () => {
      (sanctionsRepository.getSanctionByName as jest.Mock).mockResolvedValue(null);
      (sanctionsRepository.getSanctionByNumeral as jest.Mock).mockResolvedValue(null);
      (sanctionsRepository.save as jest.Mock).mockResolvedValue(mockCreateSanctionDto);
      const result = await sanctionsService.createSanctions(mockCreateSanctionDto);
      expect(result).toEqual({ data: mockCreateSanctionDto });
    });

    it('Should Get a specific sanction', async () => {
      (sanctionsRepository.findByIdOrThrow as jest.Mock).mockResolvedValue(mockCreateSanctionDto);
      const result = await sanctionsService.getSingleSanction(1);
      expect(result).toEqual({ data: mockCreateSanctionDto });
    });
    it('Should throw a not found error if the sanction does not exists', () => {
      (sanctionsRepository.findByIdOrThrow as jest.Mock).mockRejectedValue(new NotFoundException());
      expect(sanctionsService.getSingleSanction(0)).rejects.toThrowError(NotFoundException);
    });

    it('Should Update a specific sanction', async () => {
      (sanctionsRepository.findByIdOrThrow as jest.Mock).mockResolvedValue(mockCreateSanctionDto);
      (sanctionsRepository.getSanctionByName as jest.Mock).mockResolvedValue(null);
      (sanctionsRepository.save as jest.Mock).mockResolvedValue(mockCreateSanctionDto);
      const result = await sanctionsService.updateSanctions(10, mockCreateSanctionDto);
      expect(result).toEqual({ data: mockCreateSanctionDto });
    });

    it('Should Delete a specific sanction', async () => {
      (sanctionsRepository.findByIdOrThrow as jest.Mock).mockResolvedValue(mockCreateSanctionDto);
      await sanctionsService.deleteSanctions(10);
      expect(sanctionsRepository.save).toHaveBeenCalled();
    });
  });
});
