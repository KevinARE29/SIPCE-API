import { Test, TestingModule } from '@nestjs/testing';
import { RoleService } from '@auth/services/role.service';
import { RoleRepository } from '@auth/repositories/role.repository';
import { PermissionRepository } from '@auth/repositories/permission.repository';
import { mockPageDto, mockPagination } from '@core/constants/mock.constants';
import { NotFoundException, ConflictException } from '@nestjs/common';

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
  delete: jest.fn(),
  getRoleByIdOrThrow: jest.fn(),
  getRoleByName: jest.fn(),
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
      (roleRepository.getRoleByName as jest.Mock).mockResolvedValue(null);
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
      (roleRepository.getRoleByIdOrThrow as jest.Mock).mockRejectedValue(new NotFoundException());
      expect(roleService.getSingleRole(0)).rejects.toThrowError(NotFoundException);
    });

    it('Should Update a specific role', async () => {
      (permissionRepository.findByIds as jest.Mock).mockResolvedValue([1]);
      (roleRepository.getRoleByIdOrThrow as jest.Mock).mockResolvedValue(mockCreateRoleDto);
      (roleRepository.getRoleByName as jest.Mock).mockResolvedValue(null);
      (roleRepository.save as jest.Mock).mockResolvedValue(mockCreateRoleDto);
      const result = await roleService.updateRole(10, mockCreateRoleDto);
      expect(result).toEqual({ data: mockCreateRoleDto });
    });
    it('Should throw a conflict error if the role is read only', async () => {
      (roleRepository.getRoleByIdOrThrow as jest.Mock).mockResolvedValue(mockCreateRoleDto);
      expect(roleService.updateRole(1, mockCreateRoleDto)).rejects.toThrowError(ConflictException);
    });
    it('Should throw a not found error if at least one permission is not found in the DB', () => {
      (permissionRepository.findByIds as jest.Mock).mockResolvedValue([]);
      expect(roleService.updateRole(10, mockCreateRoleDto)).rejects.toThrowError(NotFoundException);
    });

    it('Should Delete a specific role', async () => {
      (roleRepository.getRoleByIdOrThrow as jest.Mock).mockResolvedValue(mockCreateRoleDto);
      expect(roleRepository.delete).not.toHaveBeenCalled();
      await roleService.deleteRole(10);
      expect(roleRepository.delete).toHaveBeenCalled();
    });
    it('Should throw a conflict error if the role is read only', async () => {
      (roleRepository.getRoleByIdOrThrow as jest.Mock).mockResolvedValue(mockCreateRoleDto);
      expect(roleService.deleteRole(1)).rejects.toThrowError(ConflictException);
    });
  });
});
