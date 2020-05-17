import { IsNotEmpty, IsNumber, IsBoolean, IsString, Min, Validate, IsOptional } from 'class-validator';
import { TypeSpecialValidator } from '../validators/type-special.validator';

export class PolitcDto {
  @IsOptional()
  @IsNumber()
  @Min(4)
  minLength?: number;

  @IsOptional()
  @IsBoolean()
  capitalLetter?: boolean;

  @IsOptional()
  @IsBoolean()
  lowerCase?: boolean;

  @IsOptional()
  @IsBoolean()
  specialChart?: boolean;

  @IsOptional()
  @IsBoolean()
  numericChart?: boolean;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Validate(TypeSpecialValidator)
  typeSpecial?: string;
}
