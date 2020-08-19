import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ValidateNested } from 'class-validator';
import { validator } from '@core/messages/validator.message';
import { Type } from 'class-transformer/decorators';
import { ShiftTeachersDto } from './shift-teachers.dto';

export class AssignTeachersDto {
  @ApiProperty({ type: [ShiftTeachersDto] })
  @IsArray({ message: validator.isArray })
  @ValidateNested({ each: true })
  @Type(() => ShiftTeachersDto)
  readonly shifts!: ShiftTeachersDto[];
}
