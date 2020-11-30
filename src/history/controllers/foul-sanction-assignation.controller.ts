import { ContentTypeGuard } from '@core/guards/content-type.guard';
import { FoulSanctionAssignationService } from '@history/services/foul-sanction-assignation.service';
import { Controller, UseGuards, Get, Param, Body, Post, Query, Put, HttpCode, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { StudentHistoryIdsDto } from '@history/dtos/student-history-ids.dto';
import { FoulsAssignationCounterResponse } from '@history/docs/fouls-assignation-counter-response.doc';
import { Auth } from '@auth/decorators/auth.decorator';
import { FoulSanctionAssignationResponses } from '@history/docs/fouls-sanctions-assignations-response.doc';
import { FoulSanctionAssignationFilterDto } from '@history/dtos/foul-sanction-assignation-filter.dto';
import { PageDto } from '@core/dtos/page.dto';
import { FoulSanctionAssignationResponse } from '@history/docs/foul-sanction-assignation-response.doc';
import { FoulSanctionAssignationIdDto } from '@history/dtos/foul-sanction-assignation-id.dto';
import { CreateFoulSanctionAssignationDto } from '@history/dtos/create-foul-sanction-assignation.dto';
import { UpdateFoulSanctionAssignationDto } from '@history/dtos/update-foul-sanction-assignation.dto';

@ApiTags('Foul Sanction Assignation Endpoints')
@UseGuards(ContentTypeGuard)
@Controller('students/:studentId/histories/:historyId')
export class FoulSanctionAssignationController {
  constructor(private readonly foulSanctionAssignationService: FoulSanctionAssignationService) {}

  @ApiOperation({
    summary: 'Obtener los contadores de tipos de faltas asignados en un historial académico y conductual',
    description:
      'Use este endpoint para obtener los contadores de tipos de faltas asignados en un historial académico y conductual',
  })
  @Auth('view_fouls_sanction_assignation')
  @Get('/fouls/counter')
  getBehavioralHistoryFoulsCounters(
    @Param() studentHistoryIdsDto: StudentHistoryIdsDto,
  ): Promise<FoulsAssignationCounterResponse> {
    return this.foulSanctionAssignationService.findAllFoulsOnHistory(studentHistoryIdsDto);
  }

  @Auth('view_fouls_sanction_assignations')
  @ApiOperation({
    summary: 'Buscar Asignaciones de Faltas y Sanciones',
    description:
      'Use este endpoint para buscar asignaciones de faltas y sanciones en el histortial conductual de un estudiante específico.',
  })
  @Get('/assignations')
  getAllFoulSanctionAssignation(
    @Param() studentHistoryIdsDto: StudentHistoryIdsDto,
    @Query() pageDto: PageDto,
    @Query() foulSanctionAssignationFilterDto: FoulSanctionAssignationFilterDto,
  ): Promise<FoulSanctionAssignationResponses> {
    return this.foulSanctionAssignationService.getAllFoulSanctionAssignation(
      pageDto,
      foulSanctionAssignationFilterDto,
      studentHistoryIdsDto,
    );
  }

  @ApiOperation({
    summary: 'Buscar Asignación de Faltas y Sanciones',
    description:
      'Use este endpoint para buscar una asignación específica en el histortial conductual de un estudiante específico.',
  })
  @Auth('view_fouls_sanction_assignation')
  @ApiOperation({
    summary: 'Ver detalle de una Asignación',
    description: 'Use este endpoint para ver el detalle de una asignación de falta y sanción específica.',
  })
  @Get('/assignations/:assignationId')
  getSingleFoulSanctionAssignation(
    @Param() foulSanctionAssignationIdDto: FoulSanctionAssignationIdDto,
  ): Promise<FoulSanctionAssignationResponse> {
    return this.foulSanctionAssignationService.getSingleFoulSanctionAssignation(foulSanctionAssignationIdDto);
  }

  @Auth('created_fouls_sanction_assignation')
  @ApiOperation({
    summary: 'Crear asignaciones de faltas y sanciones a un estudiante específico',
    description:
      'Use este endpoint para crear una asignación de falta y sanción en historial académico conductual de un estudiante específico.',
  })
  @Post('/assignations')
  async createFoulSanctionAssignation(
    @Body() createFoulSanctionAssignationDto: CreateFoulSanctionAssignationDto,
    @Param() studentHistoryIdsDto: StudentHistoryIdsDto,
  ): Promise<FoulSanctionAssignationResponse> {
    return this.foulSanctionAssignationService.createFoulSanctionAssignation(
      createFoulSanctionAssignationDto,
      studentHistoryIdsDto,
    );
  }

  @Auth('update_fouls_sanction_assignation')
  @ApiOperation({
    summary: 'Actualizar una asignación específica',
    description:
      'Use este endpoint para actualizar los datos de una asignación de falta y sanción específica presente en el historial académico conductual de un estudiante específico.',
  })
  @Put('/assignations/:assignationId')
  async updateEvent(
    @Param() foulSanctionAssignationIdDto: FoulSanctionAssignationIdDto,
    @Body() updateFoulSanctionAssignationDto: UpdateFoulSanctionAssignationDto,
  ): Promise<FoulSanctionAssignationResponse> {
    return this.foulSanctionAssignationService.updateFoulSanctionAssignation(
      updateFoulSanctionAssignationDto,
      foulSanctionAssignationIdDto,
    );
  }

  @Auth('delete_fouls_sanction_assignation')
  @ApiOperation({
    summary: 'Eliminar un asignación',
    description:
      'Use este endpoint para eliminar una asignación específica en el historial académico conductual de un estudiante específico.',
  })
  @HttpCode(204)
  @Delete('/assignations/:assignationId')
  async deleteFouls(@Param() foulSanctionAssignationIdDto: FoulSanctionAssignationIdDto): Promise<void> {
    return this.foulSanctionAssignationService.deleteFoulSanctionAssignation(foulSanctionAssignationIdDto);
  }
}
