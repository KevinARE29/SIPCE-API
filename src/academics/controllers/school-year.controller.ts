import { Controller, UseGuards, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ContentTypeGuard } from '@core/guards/content-type.guard';
import { Auth } from '@auth/decorators/auth.decorator';
import { SchoolYearService } from '@academics/services/school-year.service';
import { SchoolYear } from '@academics/docs/school-year.doc';
import { StartSchoolYearDto } from '@academics/dtos/start-school-year.dto';

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
  getCurrentAssignation(): Promise<SchoolYear> {
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
}
