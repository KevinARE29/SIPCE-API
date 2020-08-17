import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ValidateNested } from 'class-validator';
import { validator } from '@core/messages/validator.message';
import { Type } from 'class-transformer/decorators';
import { IsId } from '@core/decorators/id.decorator';
import { CounselorsAssignationDto } from './counselors-assignation.dto';

export class ShiftCounselorsDto {
  @IsId()
  readonly shiftId!: number;

  @ApiProperty({ type: [CounselorsAssignationDto] })
  @IsArray({ message: validator.isArray })
  @ValidateNested({ each: true })
  @Type(() => CounselorsAssignationDto)
  readonly counselors!: CounselorsAssignationDto[];
}
