import { IsNotEmpty, IsJWT } from 'class-validator';
import { validator } from '@core/messages/validator.message';

export class ConfirmationTokenDto {
  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsJWT({ message: validator.isJwt })
  readonly confirmationToken!: string;
}
