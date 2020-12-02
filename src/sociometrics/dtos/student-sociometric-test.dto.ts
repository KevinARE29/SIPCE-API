import { validator } from '@core/messages/validator.message';
import { IsNotEmpty, IsString } from 'class-validator';

export class StudentSociometricTestDto {
  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsString({ message: validator.isString })
  readonly email!: string;

  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsString({ message: validator.isString })
  readonly password!: string;
}
