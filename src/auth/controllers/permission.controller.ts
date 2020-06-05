import { Controller, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { PermissionGuard } from '@auth/guards/permission.guard';
import { Permissions } from '@auth/decorators/permissions.decorator';
import { SessionGuard } from '@auth/guards/session.guard';
import { PermissionService } from '@auth/services/permission.service';
import { PermissionsResponse } from '@auth/docs/permissions-response.doc';

@ApiTags('Authentication Endpoints')
@Controller('auth/permissions')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @UseGuards(AuthGuard('jwt'), SessionGuard, PermissionGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Listar Permisos',
    description: 'Use este endpoint para listar los permisos existentes',
  })
  @Permissions('retrieve_permissions')
  @Get('')
  getAllPermissions(): Promise<PermissionsResponse> {
    return this.permissionService.getAllPermissions();
  }
}
