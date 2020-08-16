import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ValidateNested } from 'class-validator';
import { validator } from '@core/messages/validator.message';
import { Type } from 'class-transformer/decorators';
import { IsId } from '@core/decorators/id.decorator';
import { CycleCoordinatorsAssignationDto } from './cycle-coordinators-assignation.dto';

export class ShiftCycleCoordinatorsDto {
  @IsId()
  shiftId!: number;

  @ApiProperty({ type: [CycleCoordinatorsAssignationDto] })
  @IsArray({ message: validator.isArray })
  @ValidateNested({ each: true })
  @Type(() => CycleCoordinatorsAssignationDto)
  cycles!: CycleCoordinatorsAssignationDto[];
}
