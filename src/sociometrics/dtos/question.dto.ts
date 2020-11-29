import { validator } from '@core/messages/validator.message';
import { ApiProperty } from '@nestjs/swagger';
import { EQuestionType, questionTypeKeys, TQuestionTypeValues } from '@sociometrics/constants/sociometric.constant';
import { IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class QuestionDto {
  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsString({ message: validator.isString })
  @MaxLength(256, { message: validator.maxLength })
  readonly questionP!: string;

  @IsOptional()
  @IsString({ message: validator.isString })
  @MaxLength(256, { message: validator.maxLength })
  readonly questionN?: string;

  @ApiProperty({ type: String })
  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsEnum(EQuestionType, {
    message: `type: Debe ser uno de los siguientes valores: ${questionTypeKeys}`,
  })
  readonly type!: TQuestionTypeValues;
}
