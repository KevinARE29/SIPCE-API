import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, ValidateNested, IsBoolean, IsOptional } from 'class-validator';
import { validator } from '@core/messages/validator.message';
import { Type } from 'class-transformer/decorators';
import { IsId } from '@core/decorators/id.decorator';
import { StudentDto } from './student.dto';

export class BulkStudentsDto {
  @IsId()
  shiftId!: number;

  @ApiPropertyOptional({ type: Boolean })
  @IsOptional()
  @IsBoolean({ message: validator.isBoolean })
  currentYear?: boolean;

  @ApiProperty({ type: [StudentDto] })
  @IsArray({ message: validator.isArray })
  @ValidateNested({ each: true })
  @Type(() => StudentDto)
  students!: StudentDto[];
}
