import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ValidateNested } from 'class-validator';
import { validator } from '@core/messages/validator.message';
import { Type } from 'class-transformer/decorators';
import { IsId } from '@core/decorators/id.decorator';
import { GradeAssignationDto } from './grade-details-assignation.dto';

export class CycleAssignationDto {
  @IsId()
  cycleId!: number;

  @ApiProperty({ type: [GradeAssignationDto] })
  @IsArray({ message: validator.isArray })
  @ValidateNested({ each: true })
  @Type(() => GradeAssignationDto)
  grades!: GradeAssignationDto[];
}
