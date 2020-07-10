import { Test, TestingModule } from '@nestjs/testing';
import { SectionService } from '@academics/services/section.service';
import { SectionRepository } from '@academics/repositories/section.repository';
import { mockPageDto, mockPagination } from '@core/constants/mock.constants';

const mockSections = [[{ name: 'B' }, { name: 'A' }], 2];

const mockSectionDto = {
  name: 'Mock Section',
};

const mockSectionsResponse = {
  data: mockSections[0],
  pagination: mockPagination,
};

const mockSectionRepository = () => ({
  getAllSections: jest.fn(),
  save: jest.fn(),
  getSectionByName: jest.fn(),
  getSectionByIdOrThrow: jest.fn(),
  delete: jest.fn(),
});

describe('Section Service', () => {
  let sectionService: SectionService;
  let sectionRepository: SectionRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SectionService, { provide: SectionRepository, useFactory: mockSectionRepository }],
    }).compile();

    sectionService = module.get(SectionService);
    sectionRepository = module.get(SectionRepository);
  });

  it('Should be defined', () => {
    expect(sectionService).toBeDefined();
    expect(sectionRepository).toBeDefined();
  });

  describe('Get All Sections', () => {
    it('Should Get all sections', async () => {
      (sectionRepository.getAllSections as jest.Mock).mockResolvedValue(mockSections);
      const result = await sectionService.getAllSections(mockPageDto, {});
      expect(result).toEqual(mockSectionsResponse);
    });
  });

  it('Should Create a new section', async () => {
    (sectionRepository.getSectionByName as jest.Mock).mockResolvedValue(null);
    (sectionRepository.save as jest.Mock).mockResolvedValue(mockSectionDto);
    const result = await sectionService.createSection(mockSectionDto);
    expect(result).toEqual({ data: mockSectionDto });
  });

  it('Should Update a specific section', async () => {
    (sectionRepository.getSectionByIdOrThrow as jest.Mock).mockResolvedValue(mockSectionDto);
    (sectionRepository.getSectionByName as jest.Mock).mockResolvedValue(null);
    (sectionRepository.save as jest.Mock).mockResolvedValue(mockSectionDto);
    const result = await sectionService.updateSection(10, mockSectionDto);
    expect(result).toEqual({ data: mockSectionDto });
  });

  it('Should Delete a specific section', async () => {
    (sectionRepository.getSectionByIdOrThrow as jest.Mock).mockResolvedValue(mockSectionDto);
    expect(sectionRepository.delete).not.toHaveBeenCalled();
    await sectionService.deleteSection(10);
    expect(sectionRepository.delete).toHaveBeenCalled();
  });
});
