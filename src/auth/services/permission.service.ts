import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Permission } from '@auth/docs/permission.doc';
import { PermissionRepository } from '@auth/repositories/permission.repository';
import { PermissionsResponse } from '@auth/docs/permissions-response.doc';

@Injectable()
export class PermissionService {
  constructor(private readonly permissionRepository: PermissionRepository) {}

  async getAllPermissions(): Promise<PermissionsResponse> {
    const permissions = await this.permissionRepository.find();
    return { data: plainToClass(Permission, permissions, { excludeExtraneousValues: true }) };
  }
}
