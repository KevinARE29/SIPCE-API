import { Test, TestingModule } from '@nestjs/testing';
import { RoleService } from '@auth/services/role.service';
import { RoleRepository } from '@auth/repositories/role.repository';
import { mockPageDto, mockPagination } from '@core/constants/mock.constants';

const mockRoles = [[{ name: 'Orientador' }, { name: 'Docente' }], 2];

const mockRolesResponse = {
  data: mockRoles[0],
  pagination: mockPagination,
};

const mockRoleRepository = () => ({
  getAllRoles: jest.fn(),
});

describe('Role Service', () => {
  let roleService: RoleService;
  let roleRepository: RoleRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoleService, { provide: RoleRepository, useFactory: mockRoleRepository }],
    }).compile();

    roleService = module.get(RoleService);
    roleRepository = module.get(RoleRepository);
  });

  it('Should be defined', () => {
    expect(roleService).toBeDefined();
    expect(roleRepository).toBeDefined();
  });

  describe('Get All Roles', () => {
    it('Should Get all roles', async () => {
      (roleRepository.getAllRoles as jest.Mock).mockResolvedValue(mockRoles);
      const result = await roleService.getAllRoles(mockPageDto, {});
      expect(result).toEqual(mockRolesResponse);
    });
  });
});
