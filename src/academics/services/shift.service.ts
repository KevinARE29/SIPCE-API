import { Injectable } from '@nestjs/common';
import { PageDto } from '@core/dtos/page.dto';
import { getPagination } from '@core/utils/pagination.util';
import { ShiftRepository } from '@academics/repositories/shift.repository';
import { ShiftFilterDto } from '@academics/dtos/shift-filter.dto';
import { ShiftsResponse } from '@academics/docs/shifts-response.doc';
import { Shifts } from '@academics/docs/shifts.doc';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ShiftService {
  constructor(private readonly shiftRepository: ShiftRepository) {}

  async getAllShifts(pageDto: PageDto, shiftFilterDto: ShiftFilterDto): Promise<ShiftsResponse> {
    const [shifts, count] = await this.shiftRepository.getAllShifts(pageDto, shiftFilterDto);
    const pagination = getPagination(pageDto, count);
    return { data: plainToClass(Shifts, shifts, { excludeExtraneousValues: true }), pagination };
  }

  async deleteShift(shiftId: number): Promise<void> {
    const shift = await this.shiftRepository.getShiftByIdOrThrow(shiftId);
    shift.active = !shift.active;
    await this.shiftRepository.save(shift);
  }
}
