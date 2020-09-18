import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ValidateNested } from 'class-validator';
import { validator } from '@core/messages/validator.message';
import { Type } from 'class-transformer/decorators';
import { IsId } from '@core/decorators/id.decorator';
import { CycleAssignationDto } from './cycle-details-assignation.dto';

export class ShiftAssignationDto {
  @IsId()
  shiftId!: number;

  @ApiProperty({ type: [CycleAssignationDto] })
  @IsArray({ message: validator.isArray })
  @ValidateNested({ each: true })
  @Type(() => CycleAssignationDto)
  cycles!: CycleAssignationDto[];
}
