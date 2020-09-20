import { validator } from '@core/messages/validator.message';
import { IsArray, IsBoolean } from 'class-validator';
import { IsId } from '@core/decorators/id.decorator';

export class PatchStudentAssignationDto {
  @IsArray({ message: validator.isArray })
  @IsId({ each: true })
  studentIds!: number[];

  @IsBoolean({ message: validator.isBoolean })
  vinculate!: boolean;
}
