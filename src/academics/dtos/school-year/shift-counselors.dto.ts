import { IsId } from '@core/decorators/id.decorator';
import { IsDtoArray } from '@core/decorators/is-dto-array.decorator';
import { CounselorsAssignationDto } from './counselors-assignation.dto';

export class ShiftCounselorsDto {
  @IsId()
  readonly shiftId!: number;

  @IsDtoArray(CounselorsAssignationDto)
  readonly counselors!: CounselorsAssignationDto[];
}
