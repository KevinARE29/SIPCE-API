import { IsNotEmpty, IsString } from 'class-validator';
import { validator } from '@core/messages/validator.message';
import { UserDto } from './user.dto';

export class AdministrativeDto extends UserDto {
  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsString({ message: validator.isString })
  role!: string;
}
