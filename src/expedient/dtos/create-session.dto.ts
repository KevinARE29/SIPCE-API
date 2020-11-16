import { IsNotEmpty, IsString, IsDateString, IsPositive, IsEnum, IsOptional } from 'class-validator';
import { validator } from '@core/messages/validator.message';
import {
  EnumServiceType,
  serviceTypeKeys,
  EnumSessionType,
  sessionTypeKeys,
  TSessionValues,
  TServiceValues,
} from '@expedient/constants/session.constants';
import { IsId } from '@core/decorators/id.decorator';
import { ApiProperty } from '@nestjs/swagger';
import { IsDto } from '@core/decorators/is-dto.decorator';
import { IsDtoArray } from '@core/decorators/is-dto-array.decorator';
import { CreateEvaluationDto } from './create-evaluation.dto';
import { ResponsiblesAssistenceDto } from './responsibles-assistence.dto';
import { OtherResponsiblesAssistenceDto } from './other-responsible-assistence.dto';

export class CreateSessionDto {
  @IsDateString({ message: validator.isDateString })
  @IsNotEmpty({ message: validator.isNotEmpty })
  readonly startedAt!: Date;

  @IsPositive({ message: validator.isPositive })
  @IsNotEmpty({ message: validator.isNotEmpty })
  readonly duration!: number;

  @ApiProperty({ type: String })
  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsEnum(EnumServiceType, {
    message: `status: Debe ser uno de los siguientes valores: ${serviceTypeKeys}`,
  })
  readonly serviceType!: TServiceValues;

  @ApiProperty({ type: String })
  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsEnum(EnumSessionType, {
    message: `sessionType: Debe ser uno de los siguientes valores: ${sessionTypeKeys}`,
  })
  readonly sessionType!: TSessionValues;

  @IsString({ message: validator.isString })
  @IsNotEmpty({ message: validator.isNotEmpty })
  readonly comments!: string;

  @IsId({ each: true })
  @IsOptional()
  readonly participants?: number[];

  @IsDtoArray(CreateEvaluationDto)
  @IsOptional()
  readonly evaluations?: CreateEvaluationDto[];

  @IsString({ message: validator.isString })
  @IsOptional()
  readonly treatedTopics?: string;

  @IsString({ message: validator.isString })
  @IsOptional()
  readonly agreements?: string;

  @IsString({ message: validator.isString })
  @IsOptional()
  readonly startHour?: string;

  @IsDtoArray(ResponsiblesAssistenceDto)
  @IsOptional()
  readonly responsibles?: ResponsiblesAssistenceDto[];

  @IsDto(OtherResponsiblesAssistenceDto)
  @IsOptional()
  readonly otherResponsible?: OtherResponsiblesAssistenceDto;
}
