import { IsNotEmpty, IsNumber, IsBoolean, IsString, Min } from 'class-validator';

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
  typeSpecial!: string;
}
