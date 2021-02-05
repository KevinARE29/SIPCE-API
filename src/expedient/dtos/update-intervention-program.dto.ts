import { IsString, IsEnum, IsOptional, IsBoolean } from 'class-validator';
import { validator } from '@core/messages/validator.message';
import { ApiProperty } from '@nestjs/swagger';
import {
  TInterventionProgramValues,
  EnumInterventionProgramType,
  interventionProgramTypeKeys,
} from '@expedient/constants/intervention-program.constants';

export class UpdateInterventionProgramDto {
  @IsString({ message: validator.isString })
  @IsOptional()
  readonly name!: string;

  @IsString({ message: validator.isString })
  @IsOptional()
  readonly description!: string;

  @ApiProperty({ type: String })
  @IsOptional()
  @IsEnum(EnumInterventionProgramType, {
    message: `status: Debe ser uno de los siguientes valores: ${interventionProgramTypeKeys}`,
  })
  readonly type!: TInterventionProgramValues;

  @IsBoolean({ message: validator.isBoolean })
  @IsOptional()
  readonly status!: boolean;
}
