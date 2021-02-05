import { Test, TestingModule } from '@nestjs/testing';
import { FoulsService } from '@fouls/services/fouls.service';
import { FoulsRepository } from '@fouls/repository/fouls.repository';
import { mockPageDto } from '@core/constants/mock.constants';
import { NotFoundException } from '@nestjs/common';
import { CreateFoulsDto } from '@fouls/dtos/create-foul.dto';
import { EnumFoulsType } from '@fouls/constants/fouls.constants';

const mockFouls = [
  [
    { description: 'Falta Leves', foulsType: 'Leves', numeral: '8.1.2' },
    { description: 'Falta Grave', foulsType: 'Graves', numeral: '8.1.3' },
  ],
  2,
];

const mockFoulsResponse = {
  data: mockFouls[0],
  pagination: {
    totalPages: 1,
    perPage: mockPageDto.perPage,
    totalItems: mockFouls[1],
    page: mockPageDto.page,
    nextPage: undefined,
    previousPage: undefined,
  },
};

const mockFoulDto = {
  description: 'Mock Fouls',
  foulsType: EnumFoulsType.Leves,
  numeral: '8.1.4',
  id: undefined,
};

const mockSingleResponseFoulDto = {
  description: 'Mock Fouls',
  foulsType: 'Leves',
  numeral: '8.1.4',
  id: undefined,
};

const mockCreateFoulDto = {
  description: 'Mock Fouls',
  foulsType: 'Leves',
  numeral: '8.1.4',
} as CreateFoulsDto;

const mockFoulsRepository = () => ({
  find: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
  findByIdOrThrow: jest.fn(),
  getFoulsByNumeral: jest.fn(),
  getAllFouls: jest.fn().mockResolvedValue(mockFoulsResponse),
});

describe('Fouls Service', () => {
  let foulsService: FoulsService;
  let foulsRepository: FoulsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FoulsService, { provide: FoulsRepository, useFactory: mockFoulsRepository }],
    }).compile();

    foulsService = module.get(FoulsService);
    foulsRepository = module.get(FoulsRepository);
  });

  it('Should be defined', () => {
    expect(foulsService).toBeDefined();
    expect(foulsRepository).toBeDefined();
  });

  describe('Get All Fouls', () => {
    it('Should Create a new fouls', async () => {
      (foulsRepository.getFoulsByNumeral as jest.Mock).mockResolvedValue(null);
      (foulsRepository.save as jest.Mock).mockResolvedValue(mockCreateFoulDto);
      const result = await foulsService.createFouls(mockCreateFoulDto);
      expect(result).toEqual({ data: mockFoulDto });
    });

    it('Should Get a specific foul', async () => {
      (foulsRepository.findByIdOrThrow as jest.Mock).mockResolvedValue(mockFoulDto);
      const result = await foulsService.getSingleFoul(1);
      expect(result).toEqual({ data: mockSingleResponseFoulDto });
    });
    it('Should throw a not found error if the foul does not exists', () => {
      (foulsRepository.findByIdOrThrow as jest.Mock).mockRejectedValue(new NotFoundException());
      expect(foulsService.getSingleFoul(0)).rejects.toThrowError(NotFoundException);
    });
    it('Should Update a specific foul', async () => {
      (foulsRepository.findByIdOrThrow as jest.Mock).mockResolvedValue(mockFoulDto);
      (foulsRepository.getFoulsByNumeral as jest.Mock).mockResolvedValue(null);
      (foulsRepository.save as jest.Mock).mockResolvedValue(mockCreateFoulDto);
      const result = await foulsService.updateFouls(1, mockCreateFoulDto);
      expect(foulsRepository.save).toHaveBeenCalled();
      expect(result).toEqual({ data: mockFoulDto });
    });

    it('Should Delete a specific foul', async () => {
      (foulsRepository.findByIdOrThrow as jest.Mock).mockResolvedValue(mockCreateFoulDto);
      await foulsService.deleteFouls(1);
      expect(foulsRepository.save).toHaveBeenCalled();
    });
  });
});
