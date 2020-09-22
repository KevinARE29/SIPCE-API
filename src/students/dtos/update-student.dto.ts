import { IsId } from '@core/decorators/id.decorator';
import { IsOptional, IsEnum, IsArray } from 'class-validator';
import { ApiProperty, PartialType, OmitType } from '@nestjs/swagger';
import { EStudentStatus, TStatus, statusKeys } from '@students/constants/student.constant';
import { StudentDto } from './student.dto';

export class UpdateStudentDto extends PartialType(OmitType(StudentDto, ['code'] as const)) {
  @IsOptional()
  @ApiProperty({ type: String })
  @IsEnum(EStudentStatus, {
    message: `status: Debe ser uno de los siguientes valores: ${statusKeys}`,
  })
  readonly status?: TStatus;

  @IsOptional()
  @IsId()
  readonly shiftId?: number;

  @IsOptional()
  @IsId()
  readonly sectionId?: number;

  @IsOptional()
  @IsArray()
  @IsId({ each: true })
  readonly siblings?: number[];
}
