import { Type } from 'class-transformer';
import { IsId } from '@core/decorators/id.decorator';

export class RoleIdDto {
  @IsId()
  @Type(() => Number)
  roleId!: number;
}
