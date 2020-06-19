import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
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
import { UpdateRoleDto } from '@auth/dtos/update-role.dto';
import { isInReadOnlyRoles } from '@auth/utils/role.utils';

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

  async createRole(createRoleDto: CreateRoleDto): Promise<RoleResponse> {
    const permissions = await this.permissionRepository.findByIds(createRoleDto.permissions);
    if (permissions.length !== createRoleDto.permissions.length) {
      throw new NotFoundException('Permisos no encontrados');
    }
    const duplicatedRole = await this.roleRepository.getDuplicatedRole(createRoleDto.name);
    if (duplicatedRole) {
      throw new ConflictException('name: Ya existe un rol con ese nombre');
    }
    return {
      data: plainToClass(Role, await this.roleRepository.save({ ...createRoleDto, permissions }), {
        excludeExtraneousValues: true,
      }),
    };
  }

  async getSingleRole(roleId: number): Promise<RoleResponse> {
    const role = await this.roleRepository.getRoleByIdOrThrow(roleId);
    return { data: plainToClass(Role, role, { excludeExtraneousValues: true }) };
  }

  async updateRole(roleId: number, updateRoleDto: UpdateRoleDto): Promise<RoleResponse> {
    if (isInReadOnlyRoles(roleId)) {
      throw new ConflictException('Rol de solo lectura');
    }
    const role = await this.roleRepository.getRoleByIdOrThrow(roleId);
    if (updateRoleDto.permissions) {
      const permissions = await this.permissionRepository.findByIds(updateRoleDto.permissions);
      if (permissions.length !== updateRoleDto.permissions.length) {
        throw new NotFoundException('Permisos no encontrados');
      }
      role.permissions = permissions;
    }
    role.name = updateRoleDto.name || role.name;
    const duplicatedRole = await this.roleRepository.getDuplicatedRole(role.name);
    if (duplicatedRole && role.id !== duplicatedRole.id) {
      throw new ConflictException('name: Ya existe un rol con ese nombre');
    }
    return {
      data: plainToClass(Role, await this.roleRepository.save({ ...role }), {
        excludeExtraneousValues: true,
      }),
    };
  }

  async deleteRole(roleId: number): Promise<void> {
    if (isInReadOnlyRoles(roleId)) {
      throw new ConflictException('Rol de solo lectura');
    }
    await this.roleRepository.getRoleByIdOrThrow(roleId);
    this.roleRepository.delete(roleId);
  }
}
