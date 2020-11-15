import { Controller, Get, Param, Query, UseGuards, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { StudentExpedientIdsDto } from '@expedient/dtos/student-expedient-ids.dto';
import { ExpedientService } from '@expedient/services/expedient.service';
import { SessionsFilterDto } from '@expedient/dtos/sessions-filter.dto';
import { ExpedientSessionsResponse } from '@expedient/docs/expedient-sessions-response.doc';
import { ContentTypeGuard } from '@core/guards/content-type.guard';
import { Auth } from '@auth/decorators/auth.decorator';
import { CreateSessionDto } from '@expedient/dtos/create-session.dto';
import { SessionService } from '@expedient/services/session.service';
import { CompleteSessionResponse } from '@expedient/docs/complete-session-response.doc';

@ApiTags('Expedients Endpoints')
@UseGuards(ContentTypeGuard)
@Controller('students')
export class ExpedientController {
  constructor(private readonly expedientService: ExpedientService, private readonly sessionService: SessionService) {}

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

  @ApiOperation({
    summary: 'Crear sesión para un estudiante en un determinado expediente',
    description: 'Use este endpoint para crear una sesión para un estudiante en un determinado expediente',
  })
  @Auth('manage_expedient')
  @Post(':studentId/expedients/:expedientId/sessions')
  createStudentExpedientSession(
    @Param() studentExpedientIdsDto: StudentExpedientIdsDto,
    @Body() createSessionDto: CreateSessionDto,
  ): Promise<CompleteSessionResponse> {
    return this.sessionService.createStudentExpedientSession(studentExpedientIdsDto, createSessionDto);
  }
}
