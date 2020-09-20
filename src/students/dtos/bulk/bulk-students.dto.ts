import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';
import { validator } from '@core/messages/validator.message';
import { IsId } from '@core/decorators/id.decorator';
import { IsDtoArray } from '@core/decorators/is-dto-array.decorator';
import { BulkStudentDto } from './bulk-student.dto';

export class BulkStudentsDto {
  @IsId()
  readonly shiftId!: number;

  @ApiPropertyOptional({ type: Boolean })
  @IsOptional()
  @IsBoolean({ message: validator.isBoolean })
  readonly currentYear?: boolean;

  @IsDtoArray(BulkStudentDto)
  readonly students!: BulkStudentDto[];
}
