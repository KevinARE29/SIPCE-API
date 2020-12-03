import { IsOptional, IsString } from 'class-validator';
import { validator } from '@core/messages/validator.message';

export class PdfRequestFilterDto {
  @IsOptional()
  @IsString({ message: validator.isString })
  readonly filter!: string;
}
