import { IsNotEmpty, IsString } from 'class-validator';
import { validator } from '@core/messages/validator.message';

export class OtherResponsiblesAssistenceDto {
  @IsString({ message: validator.isString })
  @IsNotEmpty({ message: validator.isNotEmpty })
  readonly otherResponsibleName!: string;

  @IsString({ message: validator.isString })
  @IsNotEmpty({ message: validator.isNotEmpty })
  readonly otherResponsibleRelationship!: string;
}
