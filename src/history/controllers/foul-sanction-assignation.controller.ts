// import { SchoolYear } from '@academics/decorators/school-year.decorator';
import { ContentTypeGuard } from '@core/guards/content-type.guard';
import { FoulSanctionAssignationService } from '@history/services/foul-sanction-assignation.service';
import { Controller, UseGuards, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { StudentHistoryIdsDto } from '@history/dtos/student-history-ids.dto';
import { FoulsAssignationCounterResponse } from '@history/docs/fouls-assignation-counter-response.doc';
import { Auth } from '@auth/decorators/auth.decorator';

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
}
