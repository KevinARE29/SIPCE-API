import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsArray, IsInt, IsPositive } from 'class-validator';
import { validator } from '@core/messages/validator.message';

export class CreateRoleDto {
  @ApiProperty()
  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsString({ message: validator.isString })
  name!: string;

  @IsArray()
  @IsInt({ each: true, message: validator.isInt })
  @IsPositive({ each: true, message: validator.isPositive })
  permissions!: number[];
}
