import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { LogService } from '@logs/services/log.service';
import { AccessLogsResponse } from '@logs/docs/access-logs-response.doc';
import { PageDto } from '@core/dtos/page.dto';
import { AccessLogFilterDto } from '@logs/dtos/access-log-filter.dto';
import { ActionLogFilterDto } from '@logs/dtos/action-log-filter.dto';
import { ActionLogsResponse } from '@logs/docs/action-logs-response.doc';
import { Auth } from '@auth/decorators/auth.decorator';

@ApiTags('Logs Endpoints')
@Auth('retrieve_logs')
@Controller('logs')
export class LogController {
  constructor(private readonly logService: LogService) {}

  @ApiOperation({
    summary: 'Mostrar bitácora de accesos',
    description: 'Use este endpoint para mostrar la bitácora de accesos',
  })
  @Get('access-logs')
  getAccessLogs(
    @Query() pageDto: PageDto,
    @Query() accessLogFilterDto: AccessLogFilterDto,
  ): Promise<AccessLogsResponse> {
    return this.logService.getAccessLogs(pageDto, accessLogFilterDto);
  }

  @ApiOperation({
    summary: 'Mostrar bitácora de acciones',
    description: 'Use este endpoint para mostrar la bitácora de acciones',
  })
  @Get('action-logs')
  getActionLogs(
    @Query() pageDto: PageDto,
    @Query() actionLogFilterDto: ActionLogFilterDto,
  ): Promise<ActionLogsResponse> {
    return this.logService.getActionLogs(pageDto, actionLogFilterDto);
  }
}
