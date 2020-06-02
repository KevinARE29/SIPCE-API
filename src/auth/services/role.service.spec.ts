import { Test, TestingModule } from '@nestjs/testing';
import { RoleService } from '@auth/services/role.service';
import { RoleRepository } from '@auth/repositories/role.repository';
import { PermissionRepository } from '@auth/repositories/permission.repository';
import { mockPageDto, mockPagination } from '@core/constants/mock.constants';
import { NotFoundException } from '@nestjs/common';

const mockRoles = [[{ name: 'Orientador' }, { name: 'Docente' }], 2];

const mockRolesResponse = {
  data: mockRoles[0],
  pagination: mockPagination,
};

const mockCreateRoleDto = {
  name: 'Mock Role',
  permissions: [1],
};

const mockRoleRepository = () => ({
  getAllRoles: jest.fn(),
  save: jest.fn(),
  getRoleByIdOrThrow: jest.fn(),
});

const mockPermissionRepository = () => ({
  findByIds: jest.fn(),
});

describe('Role Service', () => {
  let roleService: RoleService;
  let roleRepository: RoleRepository;
  let permissionRepository: PermissionRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoleService,
        { provide: RoleRepository, useFactory: mockRoleRepository },
        PermissionRepository,
        { provide: PermissionRepository, useFactory: mockPermissionRepository },
      ],
    }).compile();

    roleService = module.get(RoleService);
    roleRepository = module.get(RoleRepository);
    permissionRepository = module.get(PermissionRepository);
  });

  it('Should be defined', () => {
    expect(roleService).toBeDefined();
    expect(roleRepository).toBeDefined();
    expect(permissionRepository).toBeDefined();
  });

  describe('Get All Roles', () => {
    it('Should Get all roles', async () => {
      (roleRepository.getAllRoles as jest.Mock).mockResolvedValue(mockRoles);
      const result = await roleService.getAllRoles(mockPageDto, {});
      expect(result).toEqual(mockRolesResponse);
    });

    it('Should Create a new role', async () => {
      (permissionRepository.findByIds as jest.Mock).mockResolvedValue([1]);
      (roleRepository.save as jest.Mock).mockResolvedValue(mockCreateRoleDto);
      const result = await roleService.createRole(mockCreateRoleDto);
      expect(result).toEqual({ data: mockCreateRoleDto });
    });
    it('Should throw a not found error if at least one permission is not found in the DB', () => {
      (permissionRepository.findByIds as jest.Mock).mockResolvedValue([]);
      expect(roleService.createRole(mockCreateRoleDto)).rejects.toThrowError(NotFoundException);
    });

    it('Should Get a specific role', async () => {
      (roleRepository.getRoleByIdOrThrow as jest.Mock).mockResolvedValue(mockCreateRoleDto);
      const result = await roleService.getSingleRole(1);
      expect(result).toEqual({ data: mockCreateRoleDto });
    });
    it('Should throw a not found error if the role does not exists', () => {
      (roleRepository.getRoleByIdOrThrow as jest.Mock).mockResolvedValue(null);
      expect(roleService.getSingleRole(1)).rejects.toThrowError(NotFoundException);
    });
  });
});
