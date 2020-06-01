import { Controller, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ContentTypeGuard } from '@core/guards/content-type.guard';
import { RoleService } from '@auth/services/role.service';
import { PermissionGuard } from '@auth/guards/permission.guard';
import { Permissions } from '@auth/decorators/permissions.decorator';
import { SessionGuard } from '@auth/guards/session.guard';
import { RolesResponse } from '@auth/docs/roles-response-doc';

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
  getAllRoles(): Promise<RolesResponse> {
    return this.roleService.getAllRoles();
  }
}
