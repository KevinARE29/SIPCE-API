import { Controller, Get, Param, Query, UseGuards, Post, Body, Delete, HttpCode, Patch } from '@nestjs/common';
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
import { PageDto } from '@core/dtos/page.dto';
import { ExpedientSessionIdsDto } from '@expedient/dtos/expedient-session-ids.dto';
import { UpdateSessionDto } from '@expedient/dtos/update-session.dto';
import { StudentIdDto } from '@students/dtos/student-id.dto';
import { StudentExpedientsResponse } from '@expedient/docs/student-expedients-response.doc';
import { CreateExpedientDto } from '@expedient/dtos/create-expedient.dto';
import { StudentExpedientResponse } from '@expedient/docs/student-expedient-response.doc';

@ApiTags('Expedients Endpoints')
@UseGuards(ContentTypeGuard)
@Controller('students')
export class ExpedientController {
  constructor(private readonly expedientService: ExpedientService, private readonly sessionService: SessionService) {}

  @ApiOperation({
    summary: 'Consulta de los expedientes de un estudiante',
    description: 'Use este endpoint para consultar los expedientes de un estudiante',
  })
  @Auth('manage_expedient')
  @Get(':studentId/expedients')
  getStudentExpedients(@Param() studentIdDto: StudentIdDto): Promise<StudentExpedientsResponse> {
    return this.expedientService.findStudentExpedients(studentIdDto);
  }

  @ApiOperation({
    summary: 'Crear expediente de un estudiante',
    description: 'Use este endpoint para crear expediente de un estudiante',
  })
  @Auth('manage_expedient')
  @Post(':studentId/expedients')
  OpenStudentExpedients(
    @Param() studentIdDto: StudentIdDto,
    @Body() createExpedientDto: CreateExpedientDto,
  ): Promise<StudentExpedientResponse> {
    return this.expedientService.openStudentExpedient(studentIdDto, createExpedientDto);
  }

  @ApiOperation({
    summary: 'Consulta de las sesiones de un estudiante en un determinado expediente',
    description: 'Use este endpoint para consultar las sesiones de un estudiante en un determinado expediente',
  })
  @Auth('manage_expedient')
  @Get(':studentId/expedients/:expedientId/sessions')
  getStudentExpedientSessions(
    @Param() studentExpedientIdsDto: StudentExpedientIdsDto,
    @Query() sessionFilterDto: SessionsFilterDto,
    @Query() pageDto: PageDto,
  ): Promise<ExpedientSessionsResponse> {
    return this.expedientService.findExpedientSessions(studentExpedientIdsDto, pageDto, sessionFilterDto);
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

  @ApiOperation({
    summary: 'Eliminar sesión en un determinado expediente',
    description: 'Use este endpoint para eliminar una sesión en un determinado expediente',
  })
  @Auth('manage_expedient')
  @Delete(':studentId/expedients/:expedientId/sessions/:sessionId')
  @HttpCode(204)
  deleteStudentExpedientSession(@Param() expedientSessionIdsDto: ExpedientSessionIdsDto): Promise<void> {
    return this.sessionService.deleteSession(expedientSessionIdsDto);
  }

  @ApiOperation({
    summary: 'Obtener sesión en un determinado expediente',
    description: 'Use este endpoint para obtener una sesión en un determinado expediente',
  })
  @Auth('manage_expedient')
  @Get(':studentId/expedients/:expedientId/sessions/:sessionId')
  getStudentExpedientSession(
    @Param() expedientSessionIdsDto: ExpedientSessionIdsDto,
  ): Promise<CompleteSessionResponse> {
    return this.sessionService.getSession(expedientSessionIdsDto);
  }

  @ApiOperation({
    summary: 'Editar sesión en un determinado expediente',
    description: 'Use este endpoint para editar una sesión en un determinado expediente',
  })
  @Auth('manage_expedient')
  @Patch(':studentId/expedients/:expedientId/sessions/:sessionId')
  UpdateStudentExpedientSession(
    @Param() expedientSessionIdsDto: ExpedientSessionIdsDto,
    @Body() updatSessionDto: UpdateSessionDto,
  ): Promise<CompleteSessionResponse> {
    return this.sessionService.updateSession(expedientSessionIdsDto, updatSessionDto);
  }
}
