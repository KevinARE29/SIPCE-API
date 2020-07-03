import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { validator } from '@core/messages/validator.message';
import { IsId } from '@core/decorators/id.decorator';

export class CoordinatorDto {
  @ApiProperty()
  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsString({ message: validator.isString })
  firstname!: string;

  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsString({ message: validator.isString })
  lastname!: string;

  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsString({ message: validator.isString })
  username!: string;

  @IsId()
  cycleId!: number;

  @IsEmail({}, { message: validator.isEmail })
  email!: string;

  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsString({ message: validator.isString })
  code!: string;
}
