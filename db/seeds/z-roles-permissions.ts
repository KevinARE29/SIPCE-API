import { Seeder, Factory } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { RoleRepository, PermissionRepository } from '@auth/repositories';

const rolesPermissions = [
  {
    id: 1,
    permissions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 19, 26, 27, 28, 29],
  },
  {
    id: 2,
    permissions: [11, 13, 18, 19, 21, 27, 29, 33, 36, 37, 38, 44, 46, 47],
  },
  {
    id: 3,
    permissions: [11, 13, 18, 19, 21, 27, 29, 33, 36, 37, 38, 44, 46, 47],
  },
  {
    id: 4,
    permissions: [11, 13, 18, 19, 20, 21, 22, 25, 27, 29, 30, 32, 33, 34, 36, 37, 38, 44, 46, 47],
  },
  {
    id: 5,
    permissions: [11, 13, 18, 19, 20, 21, 23, 27, 29, 31, 36, 37, 38, 41, 42, 43, 44, 46, 47],
  },
  {
    id: 6,
    permissions: [3, 4, 5, 6, 7, 8, 11, 12, 14, 15, 16, 17, 18, 19, 20, 21, 24, 26, 27, 28, 29, 33, 44, 47],
  },
  {
    id: 7,
    permissions: [11, 13, 18, 19, 21, 27, 29, 36, 37, 38, 47],
  },
];

export default class AssignRolesPermissions implements Seeder {
  async run(factory: Factory, connection: Connection): Promise<void> {
    const roleRepository = connection.getCustomRepository(RoleRepository);
    const permissionRepository = connection.getCustomRepository(PermissionRepository);
    await Promise.all(
      rolesPermissions.map(async role => {
        const savedRole = await roleRepository.getRoleByIdOrThrow(role.id);
        const permissions = await permissionRepository.findPermissions(role.permissions);

        console.log(`\nUpdating ${savedRole.name} permissions`);
        savedRole.permissions = permissions;
        await roleRepository.save(savedRole);
      }),
    );
  }
}
