import { Controller, UseGuards, Body, Patch, Get, Param, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ContentTypeGuard } from '@core/guards/content-type.guard';
import { Auth } from '@auth/decorators/auth.decorator';
import { SchoolYear } from '@academics/docs/school-year.doc';
import { CloseSchoolYearService } from '@academics/services/close-school-year.service';
import { UpdateSchoolYearStatusDto } from '@academics/dtos/school-year/update-school-year-status.dto';
import { SchoolYearResponse } from '@academics/docs/school-year-response.doc';
import { SectionDetailIdDto } from '@academics/dtos/section-detail-id.dto';
import { User } from '@users/decorators/user.decorator';
import { IAuthenticatedUser } from '@users/interfaces/users.interface';

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

  @Auth('manage_school_year')
  @ApiOperation({
    summary: 'Obtener asignación del año y estado del cierre',
    description: 'Use este endpoint para obtener asignación del año y estado del cierre',
  })
  @Get('closing-status')
  getCloseSchoolYearStatus(): Promise<SchoolYearResponse> {
    return this.closeSchoolYearService.getCloseSchoolYearStatus();
  }

  @Auth('assign_students')
  @ApiOperation({
    summary: 'Cerrar año escolar de una sección',
    description: 'Use este endpoint para cerrar año escolar de una sección',
  })
  @HttpCode(204)
  @Get('close-section/:sectionDetailId')
  closeSection(@User() { id }: IAuthenticatedUser, @Param() sectionDetailIdDto: SectionDetailIdDto): Promise<void> {
    return this.closeSchoolYearService.closeSectionById(sectionDetailIdDto, id);
  }
}
