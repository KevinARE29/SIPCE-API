import { IsOptional, IsString } from 'class-validator';
import { validator } from '@core/messages/validator.message';

export class UserQueryDto {
  @IsOptional()
  @IsString({ message: validator.isString })
  readonly userId?: string;
}
