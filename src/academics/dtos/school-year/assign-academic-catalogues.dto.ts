import { IsDtoArray } from '@core/decorators/is-dto-array.decorator';
import { ShiftAssignationDto } from './shift-assignation.dto';

export class AssignAcademicCataloguesDto {
  @IsDtoArray(ShiftAssignationDto)
  readonly shifts!: ShiftAssignationDto[];
}
