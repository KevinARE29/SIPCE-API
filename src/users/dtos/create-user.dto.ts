import { IsArray, IsOptional } from 'class-validator';
import { validator } from '@core/messages/validator.message';
import { IsId } from '@core/decorators/id.decorator';
import { UserDto } from './user.dto';

export class CreateUserDto extends UserDto {
  @IsOptional()
  @IsArray({ message: validator.isArray })
  @IsId({ each: true })
  readonly roleIds?: number[];

  @IsOptional()
  @IsArray({ message: validator.isArray })
  @IsId({ each: true })
  readonly permissionIds?: number[];
}
