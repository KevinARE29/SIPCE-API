import { applyDecorators } from '@nestjs/common';
import { IsPositive, IsInt } from 'class-validator';
import { validator } from '@core/messages/validator.message';

export function IsId() {
  return applyDecorators(IsInt({ message: validator.isInt }), IsPositive({ message: validator.isPositive }));
}
