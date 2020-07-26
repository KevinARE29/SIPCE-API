import { IsOptional } from 'class-validator';
import { IsId } from '@core/decorators/id.decorator';

export class CurrentAssignationDto {
  @IsOptional()
  @IsId()
  shiftId?: number;

  @IsOptional()
  @IsId()
  cycleId?: number;

  @IsOptional()
  @IsId()
  gradeId?: number;

  @IsOptional()
  @IsId()
  sectionId?: number;
}
