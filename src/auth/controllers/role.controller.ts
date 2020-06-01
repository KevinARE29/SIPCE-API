import { Controller, UseGuards, Get, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { RoleService } from '@auth/services/role.service';
import { PermissionGuard } from '@auth/guards/permission.guard';
import { Permissions } from '@auth/decorators/permissions.decorator';
import { SessionGuard } from '@auth/guards/session.guard';
import { RolesResponse } from '@auth/docs/roles-response.doc';
import { PageDto } from '@core/dtos/page.dto';
import { RoleFilterDto } from '@auth/dtos/role-filter.dto';

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
}
