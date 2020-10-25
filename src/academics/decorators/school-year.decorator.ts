import { applyDecorators, UseGuards, SetMetadata } from '@nestjs/common';
import { SchoolYearGuard } from '@academics/guards/school-year.guard';

export function SchoolYear(inProgress: boolean) {
  return applyDecorators(SetMetadata('inProgress', inProgress), UseGuards(SchoolYearGuard));
}
