import { Controller, UseGuards, Get, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { LogService } from '@logs/services/log.service';
import { AuthGuard } from '@nestjs/passport';
import { PermissionGuard } from '@auth/guards/permission.guard';
import { SessionGuard } from '@auth/guards/session.guard';
import { Permissions } from '@auth/decorators/permissions.decorator';
import { AccessLogsResponse } from '@logs/docs/access-logs-response.doc';
import { PageDto } from '@core/dtos/page.dto';
import { AccessLogFilterDto } from '@logs/dtos/access-log-filter.dto';

@ApiTags('Logs Endpoints')
@Controller('logs')
export class LogController {
  constructor(private readonly logService: LogService) {}

  @UseGuards(AuthGuard('jwt'), SessionGuard, PermissionGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Mostrar bitácora de accesos',
    description: 'Use este endpoint para mostrar la bitácora de accesos',
  })
  @Permissions('retrieve_access_logs')
  @Get('access-logs')
  getAccessLogs(
    @Query() pageDto: PageDto,
    @Query() accessLogFilterDto: AccessLogFilterDto,
  ): Promise<AccessLogsResponse> {
    return this.logService.getAccessLogs(pageDto, accessLogFilterDto);
  }
}
