import { IsArray, IsOptional } from 'class-validator';
import { validator } from '@core/messages/validator.message';
import { IsId } from '@core/decorators/id.decorator';
import { UserDto } from '../user.dto';

export class BulkUserDto extends UserDto {
  @IsOptional()
  @IsArray({ message: validator.isArray })
  @IsId({ each: true })
  roleIds?: number[];
}
