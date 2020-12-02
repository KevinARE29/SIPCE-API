import { validator } from '@core/messages/validator.message';
import { IsDateString, IsOptional } from 'class-validator';

export class UpdatePresetDto {
  @IsOptional()
  @IsDateString({ message: validator.isDateString })
  readonly startedAt!: Date;

  @IsOptional()
  @IsDateString({ message: validator.isDateString })
  readonly endedAt!: Date;
}
