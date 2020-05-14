import { IsPositive, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
export class PoliticIdDto {
  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  politicId!: number;
}
