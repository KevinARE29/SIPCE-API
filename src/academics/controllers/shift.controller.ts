import { Controller, UseGuards, Get, Query, Param, Delete, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ShiftService } from '@academics/services/shift.service';
import { PageDto } from '@core/dtos/page.dto';
import { ContentTypeGuard } from '@core/guards/content-type.guard';
import { Auth } from '@auth/decorators/auth.decorator';
import { ShiftFilterDto } from '@academics/dtos/shift-filter.dto';
import { ShiftsResponse } from '@academics/docs/shifts-response.doc';
import { ShiftIdDto } from '@academics/dtos/shift-id.dto';
import { SchoolYear } from '@academics/decorators/school-year.decorator';

@ApiTags('Shifts Endpoints')
@UseGuards(ContentTypeGuard)
@Controller('academics/shifts')
export class ShiftController {
  constructor(private readonly shiftService: ShiftService) {}

  @Auth('manage_academics_catalogues')
  @ApiOperation({
    summary: 'Listar Turnos',
    description: 'Use este endpoint para listar los Turnos  existentes',
  })
  @Get('')
  getAllShifts(@Query() pageDto: PageDto, @Query() shiftFilterDto: ShiftFilterDto): Promise<ShiftsResponse> {
    return this.shiftService.getAllShifts(pageDto, shiftFilterDto);
  }

  @Auth('manage_academics_catalogues')
  @ApiOperation({
    summary: 'Desactivar Turnos',
    description: 'Use este endpoint para desactivar/activar un turno específico',
  })
  @SchoolYear(false)
  @HttpCode(204)
  @Delete(':shiftId')
  deleteShift(@Param() idDto: ShiftIdDto): Promise<void> {
    return this.shiftService.deleteShift(idDto.shiftId);
  }
}
