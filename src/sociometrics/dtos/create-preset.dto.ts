import { validator } from '@core/messages/validator.message';
import { IsNotEmpty, IsDateString } from 'class-validator';

export class CreatePresetDto {
  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsDateString({ message: validator.isDateString })
  readonly startedAt!: Date;

  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsDateString({ message: validator.isDateString })
  readonly endedAt!: Date;
}
