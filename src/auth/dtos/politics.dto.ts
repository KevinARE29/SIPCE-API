import { IsNotEmpty, IsNumber, IsBoolean, IsString, Min, Validate } from 'class-validator';
import { TypeSpecialValidator } from '../validators/type-special.validator';

export class PolitcDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(4)
  minLength!: number;

  @IsBoolean()
  capitalLetter!: boolean;

  @IsBoolean()
  lowerCase!: boolean;

  @IsBoolean()
  specialChart!: boolean;

  @IsBoolean()
  numericChart!: boolean;

  @IsNotEmpty()
  @IsString()
  @Validate(TypeSpecialValidator)
  typeSpecial!: string;
}
