import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ValidateNested } from 'class-validator';
import { validator } from '@core/messages/validator.message';
import { Type } from 'class-transformer/decorators';
import { ShiftCycleCoordinatorsDto } from './shift-cycle-coordinators.dto';

export class AssignCycleCoordinatorsDto {
  @ApiProperty({ type: [ShiftCycleCoordinatorsDto] })
  @IsArray({ message: validator.isArray })
  @ValidateNested({ each: true })
  @Type(() => ShiftCycleCoordinatorsDto)
  readonly shifts!: ShiftCycleCoordinatorsDto[];
}
