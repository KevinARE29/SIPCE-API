import { Controller, UseGuards, Get, Query, Post, Body, Param, Put, Delete, HttpCode } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { RoleService } from '@auth/services/role.service';
import { PermissionGuard } from '@auth/guards/permission.guard';
import { Permissions } from '@auth/decorators/permissions.decorator';
import { SessionGuard } from '@auth/guards/session.guard';
import { RolesResponse } from '@auth/docs/roles-response.doc';
import { PageDto } from '@core/dtos/page.dto';
import { RoleFilterDto } from '@auth/dtos/role-filter.dto';
import { ContentTypeGuard } from '@core/guards/content-type.guard';
import { RoleResponse } from '@auth/docs/role-response.doc';
import { CreateRoleDto } from '@auth/dtos/create-role.dto';
import { RoleIdDto } from '@auth/dtos/role-id.dto';
import { UpdateRoleDto } from '@auth/dtos/update-role.dto';

@ApiTags('Authentication Endpoints')
@Controller('auth/roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @UseGuards(AuthGuard('jwt'), SessionGuard, PermissionGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Listar Roles',
    description: 'Use este endpoint para listar los roles existentes',
  })
  @Permissions('retrieve_roles')
  @Get('')
  getAllRoles(@Query() pageDto: PageDto, @Query() roleFilterDto: RoleFilterDto): Promise<RolesResponse> {
    return this.roleService.getAllRoles(pageDto, roleFilterDto);
  }

  @UseGuards(ContentTypeGuard, AuthGuard('jwt'), SessionGuard, PermissionGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Crear Rol',
    description: 'Use este endpoint para crear un nuevo rol',
  })
  @Permissions('create_roles')
  @Post('')
  createRole(@Body() createRoleDto: CreateRoleDto): Promise<RoleResponse> {
    return this.roleService.createRole(createRoleDto);
  }

  @UseGuards(AuthGuard('jwt'), SessionGuard, PermissionGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Ver detalle de Rol',
    description: 'Use este endpoint para ver el detalle de un rol específico',
  })
  @Permissions('view_role')
  @Get(':roleId')
  getSingleRole(@Param() idDto: RoleIdDto): Promise<RoleResponse> {
    return this.roleService.getSingleRole(idDto.roleId);
  }

  @UseGuards(ContentTypeGuard, AuthGuard('jwt'), SessionGuard, PermissionGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Actualizar Rol',
    description: 'Use este endpoint para actualizar un rol específico',
  })
  @Permissions('update_role')
  @Put(':roleId')
  updateRole(@Param() idDto: RoleIdDto, @Body() updateRoleDto: UpdateRoleDto): Promise<RoleResponse> {
    return this.roleService.updateRole(idDto.roleId, updateRoleDto);
  }

  @UseGuards(AuthGuard('jwt'), SessionGuard, PermissionGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Eliminar Rol',
    description: 'Use este endpoint para eliminar un rol específico',
  })
  @Permissions('delete_role')
  @HttpCode(204)
  @Delete(':roleId')
  deleteRole(@Param() idDto: RoleIdDto): Promise<void> {
    return this.roleService.deleteRole(idDto.roleId);
  }
}
