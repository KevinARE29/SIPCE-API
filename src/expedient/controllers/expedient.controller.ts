import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { StudentExpedientIdsDto } from '@expedient/dtos/student-sessions-ids.dto';
import { ExpedientService } from '@expedient/services/expedient.service';
import { SessionsFilterDto } from '@expedient/dtos/sessions-filter.dto';
import { ExpedientSessionsResponse } from '@expedient/docs/expedient-sessions-response.doc';
import { ContentTypeGuard } from '@core/guards/content-type.guard';
import { Auth } from '@auth/decorators/auth.decorator';

@ApiTags('Expedients Endpoints')
@UseGuards(ContentTypeGuard)
@Controller('students')
export class ExpedientController {
  constructor(private readonly expedientService: ExpedientService) {}

  @ApiOperation({
    summary: 'Consulta de las sesiones de un estudiante en un determinado expediente',
    description: 'Use este endpoint para consultar las sesiones de un estudiante en un determinado expediente',
  })
  @Auth('manage_expedient')
  @Get(':studentId/expedients/:expedientId/sessions')
  getStudentExpedientSessions(
    @Param() studentExpedientIdsDto: StudentExpedientIdsDto,
    @Query() sessionFilterDto: SessionsFilterDto,
  ): Promise<ExpedientSessionsResponse> {
    return this.expedientService.findExpedientByStudentId(studentExpedientIdsDto, sessionFilterDto);
  }
}
