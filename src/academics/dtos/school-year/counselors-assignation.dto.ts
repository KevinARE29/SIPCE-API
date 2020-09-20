import { IsId } from '@core/decorators/id.decorator';
import { IsArray } from 'class-validator';
import { validator } from '@core/messages/validator.message';

export class CounselorsAssignationDto {
  @IsArray({ message: validator.isArray })
  @IsId({ each: true })
  readonly gradeIds!: number[];

  @IsId()
  readonly counselorId!: number;
}
