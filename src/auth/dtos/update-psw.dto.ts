import { IsNotEmpty, IsString } from 'class-validator';
import { validator } from '@core/messages/validator.message';

export class UpdatePswDto {
  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsString({ message: validator.isString })
  oldPassword!: string;

  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsString({ message: validator.isString })
  newPassword!: string;
}
