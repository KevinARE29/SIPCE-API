import { Test, TestingModule } from '@nestjs/testing';
import { PermissionService } from '@auth/services/permission.service';
import { PermissionRepository } from '@auth/repositories/permission.repository';

const mockPermissions = [{ name: 'Crear Roles' }, { name: 'Eliminar Roles' }];

const mockPermissionsResponse = {
  data: mockPermissions,
};

const mockPermissionRepository = () => ({
  find: jest.fn(),
});

describe('Permission Service', () => {
  let permissionService: PermissionService;
  let permissionRepository: PermissionRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PermissionService, { provide: PermissionRepository, useFactory: mockPermissionRepository }],
    }).compile();

    permissionService = module.get(PermissionService);
    permissionRepository = module.get(PermissionRepository);
  });

  it('Should be defined', () => {
    expect(permissionService).toBeDefined();
    expect(permissionRepository).toBeDefined();
  });

  describe('Get All Permissions', () => {
    it('Should Get all permissions', async () => {
      (permissionRepository.find as jest.Mock).mockResolvedValue(mockPermissions);
      const result = await permissionService.getAllPermissions();
      expect(result).toEqual(mockPermissionsResponse);
    });
  });
});
