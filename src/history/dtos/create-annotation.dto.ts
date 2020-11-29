import { IsNotEmpty, IsString, IsDateString } from 'class-validator';
import { validator } from '@core/messages/validator.message';

export class CreateAnnotationDto {
  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsString({ message: validator.isString })
  readonly title!: string;

  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsString({ message: validator.isString })
  readonly description!: string;

  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsDateString({ message: validator.isDateString })
  readonly annotationDate!: string;
}
