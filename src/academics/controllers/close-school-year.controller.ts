import { Controller, UseGuards, Body, Patch } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ContentTypeGuard } from '@core/guards/content-type.guard';
import { Auth } from '@auth/decorators/auth.decorator';
import { SchoolYear } from '@academics/docs/school-year.doc';
import { CloseSchoolYearService } from '@academics/services/close-school-year.service';
import { UpdateSchoolYearStatusDto } from '@academics/dtos/school-year/update-school-year-status.dto';

@ApiTags('School Year Endpoints')
@UseGuards(ContentTypeGuard)
@Controller('academics/school-year')
export class CloseSchoolYearController {
  constructor(private readonly closeSchoolYearService: CloseSchoolYearService) {}

  @Auth('manage_school_year')
  @ApiOperation({
    summary: 'Actualizar estado del año escolar',
    description: 'Use este endpoint para actualizar estado del año escolar',
  })
  @Patch('')
  updateSchoolYearStatus(@Body() updateSchoolYearStatusDto: UpdateSchoolYearStatusDto): Promise<SchoolYear> {
    return this.closeSchoolYearService.updateSchoolYearStatus(updateSchoolYearStatusDto);
  }
}
