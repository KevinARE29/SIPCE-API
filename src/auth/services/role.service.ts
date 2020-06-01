import { Injectable, NotFoundException } from '@nestjs/common';
import { RoleRepository } from '@auth/repositories/role.repository';
import { PageDto } from '@core/dtos/page.dto';
import { getPagination } from '@core/utils/pagination.util';
import { plainToClass } from 'class-transformer';
import { Roles } from '@auth/docs/roles.doc';
import { RolesResponse } from '@auth/docs/roles-response.doc';
import { RoleFilterDto } from '@auth/dtos/role-filter.dto';
import { CreateRoleDto } from '@auth/dtos/create-role.dto';
import { RoleResponse } from '@auth/docs/role-response.doc';
import { PermissionRepository } from '@auth/repositories/permission.repository';
import { Role } from '@auth/docs/role.doc';

@Injectable()
export class RoleService {
  constructor(
    private readonly roleRepository: RoleRepository,
    private readonly permissionRepository: PermissionRepository,
  ) {}

  async getAllRoles(pageDto: PageDto, roleFilterDto: RoleFilterDto): Promise<RolesResponse> {
    const [roles, count] = await this.roleRepository.getAllRoles(pageDto, roleFilterDto);
    const pagination = getPagination(pageDto, count);
    return { data: plainToClass(Roles, roles, { excludeExtraneousValues: true }), pagination };
  }

  async createRole(createRoleDto: CreateRoleDto): Promise<any> {
    const permissions = await this.permissionRepository.findByIds(createRoleDto.permissions);
    if (permissions.length !== createRoleDto.permissions.length) {
      throw new NotFoundException('Permisos no encontrados');
    }
    return {
      data: plainToClass(Role, await this.roleRepository.save({ ...createRoleDto, permissions }), {
        excludeExtraneousValues: true,
      }),
    };
  }
}