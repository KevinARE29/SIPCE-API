import { Controller, UseGuards, Get, Query, Param, Delete, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PeriodService } from '@academics/services/period.service';
import { PageDto } from '@core/dtos/page.dto';
import { ContentTypeGuard } from '@core/guards/content-type.guard';
import { Auth } from '@auth/decorators/auth.decorator';
import { PeriodFilterDto } from '@academics/dtos/period-filter.dto';
import { PeriodsResponse } from '@academics/docs/periods-response.doc';
import { PeriodIdDto } from '@academics/dtos/period-id.dto';
import { SchoolYearGuard } from '@academics/guards/school-year.guard';

@ApiTags('Periods Endpoints')
@UseGuards(ContentTypeGuard)
@Controller('academics/periods')
export class PeriodController {
  constructor(private readonly periodService: PeriodService) {}

  @Auth('manage_academics_catalogues')
  @ApiOperation({
    summary: 'Listar Periodos',
    description: 'Use este endpoint para listar los Periods  existentes',
  })
  @Get('')
  getAllPeriods(@Query() pageDto: PageDto, @Query() periodFilterDto: PeriodFilterDto): Promise<PeriodsResponse> {
    return this.periodService.getAllPeriods(pageDto, periodFilterDto);
  }

  @Auth('manage_academics_catalogues')
  @ApiOperation({
    summary: 'Desactivar Periodo',
    description: 'Use este endpoint para desactivar/activar un periodo específico',
  })
  @UseGuards(SchoolYearGuard)
  @HttpCode(204)
  @Delete(':periodId')
  deletePeriod(@Param() idDto: PeriodIdDto): Promise<void> {
    return this.periodService.deletePeriod(idDto.periodId);
  }
}
