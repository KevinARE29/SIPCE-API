import { Controller, UseGuards, Get, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ContentTypeGuard } from '@core/guards/content-type.guard';
import { Auth } from '@auth/decorators/auth.decorator';
import { SchoolYearService } from '@academics/services/school-year.service';
import { SchoolYear } from '@academics/docs/school-year.doc';
import { StartSchoolYearDto } from '@academics/dtos/school-year/start-school-year.dto';
import { SchoolYearResponse } from '@academics/docs/school-year-response.doc';
import { AssignAcademicCataloguesDto } from '@academics/dtos/school-year/assign-academic-catalogues.dto';
import { AssignCycleCoordinatorsDto } from '@academics/dtos/school-year/assign-cycle-coordinators.dto';
import { AssignCounselorsDto } from '@academics/dtos/school-year/assign-counselors.dto';

@ApiTags('School Year Endpoints')
@UseGuards(ContentTypeGuard)
@Controller('academics/school-year')
export class SchoolYearController {
  constructor(private readonly schoolYearService: SchoolYearService) {}

  @Auth('manage_school_year')
  @ApiOperation({
    summary: 'Mostrar Asignación del Año Escolar',
    description: 'Use este endpoint para consultar la asignación actual del año escolar activo',
  })
  @Get('')
  getCurrentAssignation(): Promise<SchoolYearResponse> {
    return this.schoolYearService.getCurrentAssignation();
  }

  @Auth('manage_school_year')
  @ApiOperation({
    summary: 'Aperturar Año Escolar',
    description: 'Use este endpoint para aperturar año escolar',
  })
  @Post('')
  startSchoolYear(@Body() startSchoolYearDto: StartSchoolYearDto): Promise<SchoolYear> {
    return this.schoolYearService.startSchoolYear(startSchoolYearDto);
  }

  @Auth('manage_school_year')
  @ApiOperation({
    summary: 'Asignar catálogos académicos',
    description: 'Use este endpoint para asignar ciclos, grados y secciones por turnos',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('academic-catalogues')
  assignAcademicCatalogues(@Body() assignAcademicCataloguesDto: AssignAcademicCataloguesDto): Promise<void> {
    return this.schoolYearService.assignAcademicCatalogues(assignAcademicCataloguesDto);
  }

  @Auth('manage_school_year')
  @ApiOperation({
    summary: 'Asignar coordinadores de ciclo',
    description: 'Use este endpoint para asignar coordinadores de ciclo',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('cycle-coordinators')
  assignCycleCoordinators(@Body() assignCycleCoordinatorsDto: AssignCycleCoordinatorsDto): Promise<void> {
    return this.schoolYearService.assignCycleCoordinators(assignCycleCoordinatorsDto);
  }

  @Auth('manage_school_year')
  @ApiOperation({
    summary: 'Asignar orientadores de grado',
    description: 'Use este endpoint para asignar orientadores de grado',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('counselors')
  async assignCounselors(@Body() assignCounselorsDto: AssignCounselorsDto): Promise<void> {
    return this.schoolYearService.assignCounselors(assignCounselorsDto);
  }
}
