import { IsId } from '@core/decorators/id.decorator';
import { IsNotEmptyObject } from 'class-validator';
import { IsDto } from '@core/decorators/is-dto.decorator';
import { ResponsibleDto } from './responsible.dto';
import { StudentDto } from './student.dto';

export class CreateStudentDto extends StudentDto {
  @IsId()
  readonly shiftId!: number;

  @IsNotEmptyObject()
  @IsDto(ResponsibleDto)
  readonly responsible!: ResponsibleDto;
}
