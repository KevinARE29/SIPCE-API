import { IsPositive, IsInt, IsOptional, Max } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { validator } from '@core/messages/validator.message';

export class PageDto {
  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: validator.isInt })
  @IsPositive({ message: validator.isPositive })
  page = 1;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: validator.isInt })
  @IsPositive({ message: validator.isPositive })
  @Max(25, { message: validator.isMax })
  perPage = 10;
}
