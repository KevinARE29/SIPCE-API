import { IsPositive, IsInt, IsOptional, Max } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { validator } from '@core/messages/validator.message';

export class PageDto {
  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  page = 1;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: validator.isInt })
  @IsPositive({ message: validator.isPositive })
  @Max(25, { message: validator.isMax })
  perPage = 10;
}
