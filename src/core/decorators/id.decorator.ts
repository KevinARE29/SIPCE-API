import { applyDecorators } from '@nestjs/common';
import { IsPositive, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { validator } from '@core/messages/validator.message';

export function IsId() {
  return applyDecorators(
    ApiProperty(),
    IsInt({ message: validator.isInt }),
    IsPositive({ message: validator.isPositive }),
  );
}
