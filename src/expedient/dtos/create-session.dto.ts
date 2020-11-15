import {
  IsNotEmpty,
  IsString,
  IsDateString,
  IsPositive,
  IsEnum,
  IsOptional,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { validator } from '@core/messages/validator.message';
import {
  EnumServiceType,
  serviceTypeKeys,
  EnumSessionType,
  sessionTypeKeys,
  TService,
  TSession,
} from '@expedient/constants/session.constants';
import { IsId } from '@core/decorators/id.decorator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CreateEvaluationDto } from './create-evaluation.dto';

export class CreateSessionDto {
  @IsDateString({ message: validator.isDateString })
  @IsNotEmpty()
  readonly startedAt!: Date;

  @IsPositive()
  @IsNotEmpty()
  readonly duration!: number;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsEnum(EnumServiceType, {
    message: `status: Debe ser uno de los siguientes valores: ${serviceTypeKeys}`,
  })
  readonly serviceType!: TService;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsEnum(EnumSessionType, {
    message: `sessionType: Debe ser uno de los siguientes valores: ${sessionTypeKeys}`,
  })
  readonly sessionType!: TSession;

  @IsString()
  @IsNotEmpty()
  readonly comments!: string;

  @IsId({ each: true })
  @IsOptional()
  readonly participants?: number[];

  @ApiProperty({ type: [CreateEvaluationDto] })
  @IsArray({ message: validator.isArray })
  @ValidateNested({ each: true })
  @Type(() => CreateEvaluationDto)
  @IsOptional()
  readonly evaluations?: CreateEvaluationDto[];
}
