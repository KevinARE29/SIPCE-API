import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRepository } from '../../users/repositories/users.repository';
import { Permission } from '../entities/permission.entity';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private readonly reflector: Reflector, private readonly userRepository: UserRepository) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const permissions = this.reflector.get<string[]>('permissions', context.getHandler());
    if (!permissions) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = await this.userRepository.findUserByUsername(request.user.sub);
    if (!user) {
      return false;
    }

    const userPermissions = [] as Array<Permission>;
    user.roles.forEach(rol => {
      userPermissions.push(...rol.permissions);
    });
    user.permissions.forEach(permission => userPermissions.push(permission));

    const permissionCodes = userPermissions.map(permission => permission.codename);
    const codes = [...new Set(permissionCodes)];
    const hasPermission = permissions.every(permission => codes.includes(permission));

    return hasPermission;
  }
}
