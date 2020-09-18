import { Test, TestingModule } from '@nestjs/testing';
import { GradeRepository } from '@academics/repositories/grade.repository';
import { mockPageDto, mockPagination } from '@core/constants/mock.constants';
import { GradeService } from './grade.service';

const mockGrades = [
  [
    { name: 'Octavo', active: 'true' },
    { name: 'Bachillerato', active: 'false' },
  ],
  2,
];

const mockGradeDto = {
  name: 'Mock Grade',
};

const mockGradesResponse = {
  data: mockGrades[0],
  pagination: mockPagination,
};

const mockGradeRepository = () => ({
  getAllGrades: jest.fn().mockResolvedValue(mockGrades),
  save: jest.fn(),
  getGradeByName: jest.fn(),
  getGradeByIdOrThrow: jest.fn(),
  delete: jest.fn(),
});

describe('Grade Service', () => {
  let gradeService: GradeService;
  let gradeRepository: GradeRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GradeService, { provide: GradeRepository, useFactory: mockGradeRepository }],
    }).compile();

    gradeService = module.get(GradeService);
    gradeRepository = module.get(GradeRepository);
  });

  it('Should be defined', () => {
    expect(gradeService).toBeDefined();
    expect(gradeRepository).toBeDefined();
  });

  describe('Get All grades', () => {
    it('Should Get all grades', async () => {
      const result = await gradeService.getAllGrades(mockPageDto, {});
      expect(result).toEqual(mockGradesResponse);
    });
  });

  describe('Deactivate grade', () => {
    it('Should deactivate a specific grade', async () => {
      (gradeRepository.getGradeByIdOrThrow as jest.Mock).mockResolvedValue(mockGradeDto);
      await gradeService.deleteGrade(1);
      expect(gradeRepository.save).toBeCalled();
    });
  });
});
