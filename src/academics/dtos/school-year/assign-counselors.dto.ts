import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ValidateNested } from 'class-validator';
import { validator } from '@core/messages/validator.message';
import { Type } from 'class-transformer/decorators';
import { ShiftCounselorsDto } from './shift-counselors.dto';

export class AssignCounselorsDto {
  @ApiProperty({ type: [ShiftCounselorsDto] })
  @IsArray({ message: validator.isArray })
  @ValidateNested({ each: true })
  @Type(() => ShiftCounselorsDto)
  readonly shifts!: ShiftCounselorsDto[];
}
