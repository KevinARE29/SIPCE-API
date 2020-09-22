import { applyDecorators } from '@nestjs/common';
import { IsPositive, IsInt } from 'class-validator';
import { validator } from '@core/messages/validator.message';

export function IsId(each = { each: false }) {
  return applyDecorators(
    IsInt({ ...each, message: validator.isInt }),
    IsPositive({ ...each, message: validator.isPositive }),
  );
}
