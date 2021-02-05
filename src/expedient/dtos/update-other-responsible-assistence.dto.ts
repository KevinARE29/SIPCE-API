import { IsString, IsOptional } from 'class-validator';
import { validator } from '@core/messages/validator.message';

export class UpdateOtherResponsiblesAssistenceDto {
  @IsString({ message: validator.isString })
  @IsOptional()
  readonly otherResponsibleName!: string;

  @IsString({ message: validator.isString })
  @IsOptional()
  readonly otherResponsibleRelationship!: string;
}
