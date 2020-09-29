import { Controller, UseGuards, Get, Query, Param, Delete, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { GradeService } from '@academics/services/grade.service';
import { PageDto } from '@core/dtos/page.dto';
import { ContentTypeGuard } from '@core/guards/content-type.guard';
import { Auth } from '@auth/decorators/auth.decorator';
import { GradeFilterDto } from '@academics/dtos/grade-filter.dto';
import { GradesResponse } from '@academics/docs/grades-response.doc';
import { GradeIdDto } from '@academics/dtos/grade-id.dto';
import { SchoolYearGuard } from '@academics/guards/school-year.guard';

@ApiTags('Grades Endpoints')
@UseGuards(ContentTypeGuard)
@Controller('academics/grades')
export class GradeController {
  constructor(private readonly gradeService: GradeService) {}

  @Auth('manage_academics_catalogues')
  @ApiOperation({
    summary: 'Listar Grados',
    description: 'Use este endpoint para listar los grados  existentes',
  })
  @Get('')
  getAllGrades(@Query() pageDto: PageDto, @Query() gradeFilterDto: GradeFilterDto): Promise<GradesResponse> {
    return this.gradeService.getAllGrades(pageDto, gradeFilterDto);
  }

  @Auth('manage_academics_catalogues')
  @ApiOperation({
    summary: 'Desactivar Grados',
    description: 'Use este endpoint para desactivar/activar un grado específico',
  })
  @UseGuards(SchoolYearGuard)
  @HttpCode(204)
  @Delete(':gradeId')
  deleteGrade(@Param() idDto: GradeIdDto): Promise<void> {
    return this.gradeService.deleteGrade(idDto.gradeId);
  }
}
