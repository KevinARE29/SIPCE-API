import { Controller, Get, Query, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PageDto } from '@core/dtos/page.dto';
import { Auth } from '@auth/decorators/auth.decorator';
import { StudentIdDto } from '@students/dtos/student-id.dto';
import { ResponsibleFilterDto } from '@students/dtos/responsible-filter.dto';
import { ResponsiblesResponse } from '@students/docs/responsibles-response.doc';
import { ResponsibleService } from '@students/services/responsible.service';

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
}
