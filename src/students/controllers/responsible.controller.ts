import { Controller, Get, Query, Param, Body, Post } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PageDto } from '@core/dtos/page.dto';
import { Auth } from '@auth/decorators/auth.decorator';
import { StudentIdDto } from '@students/dtos/student-id.dto';
import { ResponsibleFilterDto } from '@students/dtos/responsible-filter.dto';
import { ResponsiblesResponse } from '@students/docs/responsibles-response.doc';
import { ResponsibleService } from '@students/services/responsible.service';
import { ResponsibleDto } from '@students/dtos/responsible.dto';
import { ResponsibleResponse } from '@students/docs/responsible-response.doc';

@ApiTags('Students Endpoints')
@Controller('students')
export class ResponsibleController {
  constructor(private readonly responsibleService: ResponsibleService) {}

  @Auth('update_student')
  @ApiOperation({
    summary: 'Consulta de los responsables de un estudiante',
    description: 'Use este endpoint para obtener el listado de los responsables de un estudiante específico',
  })
  @Get(':studentId/responsibles')
  getStudentResponsibles(
    @Param() idDto: StudentIdDto,
    @Query() pageDto: PageDto,
    @Query() responsibeFilterDto: ResponsibleFilterDto,
  ): Promise<ResponsiblesResponse> {
    return this.responsibleService.getStudentResponsibles(idDto.studentId, pageDto, responsibeFilterDto);
  }

  @Auth('update_student')
  @ApiOperation({
    summary: 'Crear Responsable',
    description: 'Use este endpoint para agregar un responsable a un estudiante determinado',
  })
  @Post(':studentId/responsibles')
  createResponsible(
    @Param() idDto: StudentIdDto,
    @Body() responsibleDto: ResponsibleDto,
  ): Promise<ResponsibleResponse> {
    return this.responsibleService.createResponsible(idDto.studentId, responsibleDto);
  }
}
