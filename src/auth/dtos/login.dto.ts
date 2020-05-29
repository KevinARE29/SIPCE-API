import { IsNotEmpty, IsString } from 'class-validator';
import { validator } from '@core/messages/validator.message';

export class LoginDto {
  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsString({ message: validator.isString })
  username!: string;

  @IsNotEmpty({ message: validator.isString })
  @IsString()
  password!: string;
}
