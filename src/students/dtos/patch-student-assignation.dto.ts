import { validator } from '@core/messages/validator.message';
import { IsArray, IsPositive, IsInt, IsBoolean } from 'class-validator';

export class PatchStudentAssignationDto {
  @IsArray()
  @IsInt({ each: true, message: validator.isInt })
  @IsPositive({ each: true, message: validator.isPositive })
  studentIds!: number[];

  @IsBoolean({ message: validator.isBoolean })
  vinculate!: boolean;
}
