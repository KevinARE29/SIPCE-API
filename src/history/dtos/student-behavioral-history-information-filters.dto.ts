import { IsOptional, IsIn } from 'class-validator';
import { validator } from '@core/messages/validator.message';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class StudentBehavioralHistoryInformationFiltersDto {
  @ApiPropertyOptional({ type: Boolean })
  @IsOptional()
  @IsIn(['true', 'false'], { message: validator.isIn })
  readonly commentsOnly?: string;
}
