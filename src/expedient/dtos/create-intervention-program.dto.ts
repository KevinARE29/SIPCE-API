import { IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { validator } from '@core/messages/validator.message';
import { ApiProperty } from '@nestjs/swagger';
import {
  TInterventionProgramValues,
  EnumInterventionProgramType,
  interventionProgramTypeKeys,
} from '@expedient/constants/intervention-program.constants';

export class CreateInterventionProgramDto {
  @IsString({ message: validator.isString })
  @IsNotEmpty({ message: validator.isNotEmpty })
  readonly name!: string;

  @IsString({ message: validator.isString })
  @IsNotEmpty({ message: validator.isNotEmpty })
  readonly description!: string;

  @ApiProperty({ type: String })
  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsEnum(EnumInterventionProgramType, {
    message: `status: Debe ser uno de los siguientes valores: ${interventionProgramTypeKeys}`,
  })
  readonly type!: TInterventionProgramValues;
}
