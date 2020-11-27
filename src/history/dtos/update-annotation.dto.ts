import { IsString, IsDateString, IsOptional } from 'class-validator';
import { validator } from '@core/messages/validator.message';

export class UpdateAnnotationDto {
  @IsOptional()
  @IsString({ message: validator.isString })
  readonly title?: string;

  @IsOptional()
  @IsString({ message: validator.isString })
  readonly description?: string;

  @IsOptional()
  @IsDateString({ message: validator.isDateString })
  readonly annotationDate?: string;
}
