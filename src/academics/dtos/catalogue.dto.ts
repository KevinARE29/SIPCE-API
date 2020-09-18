import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { validator } from '@core/messages/validator.message';

export class CatalogueDto {
  @ApiProperty({ example: 'Electrotecnia' })
  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsString({ message: validator.isString })
  name!: string;
}
