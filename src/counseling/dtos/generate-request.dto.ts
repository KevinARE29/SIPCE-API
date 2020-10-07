import { IsNotEmpty, IsString, MaxLength, IsEmail, IsOptional } from 'class-validator';
import { validator } from '@core/messages/validator.message';

export class GenerateRequestDto {
  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsEmail({}, { message: validator.isEmail })
  @MaxLength(128, { message: validator.maxLength })
  readonly email!: string;

  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsString({ message: validator.isString })
  @MaxLength(128, { message: validator.maxLength })
  readonly subject!: string;

  @IsOptional()
  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsString({ message: validator.isString })
  @MaxLength(512, { message: validator.maxLength })
  readonly comment?: string;
}
