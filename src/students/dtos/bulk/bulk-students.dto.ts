import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ValidateNested } from 'class-validator';
import { validator } from '@core/messages/validator.message';
import { Type } from 'class-transformer/decorators';
import { IsId } from '@core/decorators/id.decorator';
import { StudentDto } from './student.dto';

export class BulkStudentsDto {
  @IsId()
  shiftId!: number;

  @ApiProperty({ type: [StudentDto] })
  @IsArray({ message: validator.isArray })
  @ValidateNested({ each: true })
  @Type(() => StudentDto)
  students!: StudentDto[];
}
