import { IsId } from '@core/decorators/id.decorator';
import { UserDto } from './user.dto';

export class CoordinatorDto extends UserDto {
  @IsId()
  cycleId!: number;
}
