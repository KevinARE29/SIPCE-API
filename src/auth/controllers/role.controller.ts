import { Controller, UseGuards, Get, Query, Post, Body, Param, Put, Delete, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { RoleService } from '@auth/services/role.service';
import { RolesResponse } from '@auth/docs/roles-response.doc';
import { PageDto } from '@core/dtos/page.dto';
import { RoleFilterDto } from '@auth/dtos/role-filter.dto';
import { ContentTypeGuard } from '@core/guards/content-type.guard';
import { RoleResponse } from '@auth/docs/role-response.doc';
import { CreateRoleDto } from '@auth/dtos/create-role.dto';
import { RoleIdDto } from '@auth/dtos/role-id.dto';
import { UpdateRoleDto } from '@auth/dtos/update-role.dto';
import { Auth } from '@auth/decorators/auth.decorator';

@ApiTags('Authentication Endpoints')
@UseGuards(ContentTypeGuard)
@Controller('auth/roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Auth('retrieve_roles')
  @ApiOperation({
    summary: 'Listar Roles',
    description: 'Use este endpoint para listar los roles existentes',
  })
  @Get('')
  getAllRoles(@Query() pageDto: PageDto, @Query() roleFilterDto: RoleFilterDto): Promise<RolesResponse> {
    return this.roleService.getAllRoles(pageDto, roleFilterDto);
  }

  @Auth('create_roles')
  @ApiOperation({
    summary: 'Crear Rol',
    description: 'Use este endpoint para crear un nuevo rol',
  })
  @Post('')
  createRole(@Body() createRoleDto: CreateRoleDto): Promise<RoleResponse> {
    return this.roleService.createRole(createRoleDto);
  }

  @Auth('view_role')
  @ApiOperation({
    summary: 'Ver detalle de Rol',
    description: 'Use este endpoint para ver el detalle de un rol específico',
  })
  @Get(':roleId')
  getSingleRole(@Param() idDto: RoleIdDto): Promise<RoleResponse> {
    return this.roleService.getSingleRole(idDto.roleId);
  }

  @Auth('update_role')
  @ApiOperation({
    summary: 'Actualizar Rol',
    description: 'Use este endpoint para actualizar un rol específico',
  })
  @Put(':roleId')
  updateRole(@Param() idDto: RoleIdDto, @Body() updateRoleDto: UpdateRoleDto): Promise<RoleResponse> {
    return this.roleService.updateRole(idDto.roleId, updateRoleDto);
  }

  @Auth('delete_role')
  @ApiOperation({
    summary: 'Eliminar Rol',
    description: 'Use este endpoint para eliminar un rol específico',
  })
  @HttpCode(204)
  @Delete(':roleId')
  deleteRole(@Param() idDto: RoleIdDto): Promise<void> {
    return this.roleService.deleteRole(idDto.roleId);
  }
}
