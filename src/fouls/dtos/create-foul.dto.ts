import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { EnumFoulsType, foulsKeys, TFouls } from '@fouls/constants/fouls.costants';
import { validator } from '@core/messages/validator.message';

export class CreateFoulsDto {
  @ApiProperty({ type: String })
  @IsEnum(EnumFoulsType, {
    message: `EnumFoulsType: Debe ser uno de los siguientes valores: ${foulsKeys}`,
  })
  readonly foulsType!: TFouls;
  
  @IsNotEmpty()
  @IsString({ message: validator.isString })
  readonly description!: string;

}
