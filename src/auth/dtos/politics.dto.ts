import { IsNotEmpty, IsBoolean, IsString, Min, Validate, IsOptional, IsInt } from 'class-validator';
import { validator } from 'src/core/messages/validator.message';
import { TypeSpecialValidator } from '../validators/type-special.validator';

export class PolitcDto {
  @IsOptional()
  @IsInt({ message: validator.isInt })
  @Min(4, { message: validator.isMin })
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
