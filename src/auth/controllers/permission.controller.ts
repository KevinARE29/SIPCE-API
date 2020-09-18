import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PermissionService } from '@auth/services/permission.service';
import { PermissionsResponse } from '@auth/docs/permissions-response.doc';
import { Auth } from '@auth/decorators/auth.decorator';

@ApiTags('Authentication Endpoints')
@Controller('auth/permissions')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Auth('retrieve_permissions')
  @ApiOperation({
    summary: 'Listar Permisos',
    description: 'Use este endpoint para listar los permisos existentes',
  })
  @Get('')
  getAllPermissions(): Promise<PermissionsResponse> {
    return this.permissionService.getAllPermissions();
  }
}
