import { IsPositive, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { validator } from '@core/messages/validator.message';

export class PoliticIdDto {
  @ApiProperty()
  @Type(() => Number)
  @IsInt({ message: validator.isInt })
  @IsPositive({ message: validator.isPositive })
  politicId!: number;
}
