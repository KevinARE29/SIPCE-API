import { IsId } from '@core/decorators/id.decorator';
import { IsArray } from 'class-validator';
import { validator } from '@core/messages/validator.message';

export class GradeAssignationDto {
  @IsId()
  readonly gradeId!: number;

  @IsArray({ message: validator.isArray })
  @IsId({ each: true })
  readonly sections!: number[];
}
