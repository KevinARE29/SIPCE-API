import { IsId } from '@core/decorators/id.decorator';
import { UserDto } from './user.dto';

export class TeacherDto extends UserDto {
  @IsId()
  cycleId!: number;

  @IsId()
  gradeId!: number;

  @IsId()
  sectionId!: number;
}
