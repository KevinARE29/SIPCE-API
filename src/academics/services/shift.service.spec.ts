import { Test, TestingModule } from '@nestjs/testing';
import { ShiftRepository } from '@academics/repositories/shift.repository';
import { mockPageDto, mockPagination } from '@core/constants/mock.constants';
import { ShiftService } from './shift.service';

const mockShifts = [
  [
    { name: 'Mañana', active: 'true' },
    { name: 'Completo', active: 'false' },
  ],
  2,
];

const mockShiftDto = {
  name: 'Mock Shift',
};

const mockShiftsResponse = {
  data: mockShifts[0],
  pagination: mockPagination,
};

const mockShiftRepository = () => ({
  getAllShifts: jest.fn().mockResolvedValue(mockShifts),
  save: jest.fn(),
  getShiftByName: jest.fn(),
  getShiftByIdOrThrow: jest.fn(),
  delete: jest.fn(),
});

describe('Shift Service', () => {
  let shiftService: ShiftService;
  let shiftRepository: ShiftRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShiftService, { provide: ShiftRepository, useFactory: mockShiftRepository }],
    }).compile();

    shiftService = module.get(ShiftService);
    shiftRepository = module.get(ShiftRepository);
  });

  it('Should be defined', () => {
    expect(shiftService).toBeDefined();
    expect(shiftRepository).toBeDefined();
  });

  describe('Get All shifts', () => {
    it('Should Get all shifts', async () => {
      const result = await shiftService.getAllShifts(mockPageDto, {});
      expect(result).toEqual(mockShiftsResponse);
    });
  });

  describe('Deactivate shift', () => {
    it('Should Deactivate a specific shift', async () => {
      (shiftRepository.getShiftByIdOrThrow as jest.Mock).mockResolvedValue(mockShiftDto);
      await shiftService.deleteShift(10);
      expect(shiftRepository.save).toBeCalled();
    });
  });
});
