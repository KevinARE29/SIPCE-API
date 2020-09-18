import { EntityRepository, Repository } from 'typeorm';
import { Permission } from '../entities/permission.entity';

@EntityRepository(Permission)
export class PermissionRepository extends Repository<Permission> {
  findPermissions(permissionIds: number[]): Promise<Permission[]> {
    return this.createQueryBuilder('permission')
      .where('permission.id IN (:...permissionIds)', { permissionIds: [null, ...permissionIds] })
      .getMany();
  }
}
