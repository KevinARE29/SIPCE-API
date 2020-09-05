import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ValidateNested } from 'class-validator';
import { validator } from '@core/messages/validator.message';
import { Type } from 'class-transformer/decorators';
import { IsId } from '@core/decorators/id.decorator';
import { GradeTeachersDto } from './grade-teachers.dto';

export class ShiftTeachersDto {
  @IsId()
  readonly shiftId!: number;

  @ApiProperty({ type: [GradeTeachersDto] })
  @IsArray({ message: validator.isArray })
  @ValidateNested({ each: true })
  @Type(() => GradeTeachersDto)
  readonly grades!: GradeTeachersDto[];
}
