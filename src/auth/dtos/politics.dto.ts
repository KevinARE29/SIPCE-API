import { IsNotEmpty, IsBoolean, IsString, Validate, IsOptional } from 'class-validator';
import { validator } from '@core/messages/validator.message';
import { TypeSpecialValidator } from '../validators/type-special.validator';
import { MinLengthValidator } from '../validators/min-length.validator';

export class PolitcDto {
  @IsOptional()
  @Validate(MinLengthValidator)
  minLength?: number;

  @IsOptional()
  @IsBoolean({ message: validator.isBoolean })
  capitalLetter?: boolean;

  @IsOptional()
  @IsBoolean({ message: validator.isBoolean })
  lowerCase?: boolean;

  @IsOptional()
  @IsBoolean({ message: validator.isBoolean })
  specialChart?: boolean;

  @IsOptional()
  @IsBoolean({ message: validator.isBoolean })
  numericChart?: boolean;

  @IsOptional()
  @IsString({ message: validator.isString })
  @IsNotEmpty({ message: validator.isNotEmpty })
  @Validate(TypeSpecialValidator)
  typeSpecial?: string;
}
