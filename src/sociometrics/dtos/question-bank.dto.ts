import { IsDtoArray } from '@core/decorators/is-dto-array.decorator';
import { validator } from '@core/messages/validator.message';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { QuestionDto } from './question.dto';

export class QuestionBankDto {
  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsString({ message: validator.isString })
  @MaxLength(256, { message: validator.maxLength })
  readonly name!: string;

  @IsDtoArray(QuestionDto)
  readonly questions!: QuestionDto[];
}
