import { Test, TestingModule } from '@nestjs/testing';
import { SectionService } from '@academics/services/section.service';
import { SectionRepository } from '@academics/repositories/section.repository';
import { mockPageDto, mockPagination } from '@core/constants/mock.constants';

const mockSections = [[{ name: 'B' }, { name: 'A' }], 2];

const mockSectionsResponse = {
  data: mockSections[0],
  pagination: mockPagination,
};

const mockSectionRepository = () => ({
  getAllSections: jest.fn(),
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
});
