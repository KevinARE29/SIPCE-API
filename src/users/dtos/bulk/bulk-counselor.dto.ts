import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ValidateNested, IsBoolean } from 'class-validator';
import { validator } from '@core/messages/validator.message';
import { Type } from 'class-transformer/decorators';
import { IsId } from '@core/decorators/id.decorator';
import { CounselorDto } from './counselor.dto';

export class BulkCounselorDto {
  @IsBoolean({ message: validator.isBoolean })
  currentYear!: boolean;

  @IsId()
  shiftId!: number;

  @ApiProperty({ type: [CounselorDto] })
  @IsArray({ message: validator.isArray })
  @ValidateNested({ each: true })
  @Type(() => CounselorDto)
  counselors!: CounselorDto[];
}
