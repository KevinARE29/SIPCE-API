import { IsString, IsDateString, IsPositive, IsEnum, IsOptional, IsBoolean } from 'class-validator';
import { validator } from '@core/messages/validator.message';
import { EnumServiceType, serviceTypeKeys, TServiceValues } from '@expedient/constants/session.constants';
import { IsId } from '@core/decorators/id.decorator';
import { ApiProperty } from '@nestjs/swagger';
import { IsDtoArray } from '@core/decorators/is-dto-array.decorator';
import { EvaluationDto } from './evaluation.dto';

export class UpdateSessionDto {
  @IsDateString({ message: validator.isDateString })
  @IsOptional()
  readonly startedAt!: Date;

  @IsPositive({ message: validator.isPositive })
  @IsOptional()
  readonly duration!: number;

  @ApiProperty({ type: String })
  @IsOptional()
  @IsEnum(EnumServiceType, {
    message: `status: Debe ser uno de los siguientes valores: ${serviceTypeKeys}`,
  })
  readonly serviceType!: TServiceValues;

  @IsString({ message: validator.isString })
  @IsOptional()
  readonly comments!: string;

  @IsBoolean({ message: validator.isBoolean })
  @IsOptional()
  readonly draft!: boolean;

  @IsId({ each: true })
  @IsOptional()
  readonly participants?: number[];

  @IsDtoArray(EvaluationDto)
  @IsOptional()
  readonly evaluations?: EvaluationDto[];
}
