import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { validator } from '@core/messages/validator.message';

export class CatalogueDto {
  @ApiProperty({ example: 'Electrotecnia' })
  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsString({ message: validator.isString })
  @MaxLength(32, { message: validator.maxLength })
  readonly name!: string;
}
