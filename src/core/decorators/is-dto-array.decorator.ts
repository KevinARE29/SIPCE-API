import { applyDecorators } from '@nestjs/common';
import { IsArray, ValidateNested } from 'class-validator';
import { validator } from '@core/messages/validator.message';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer/decorators';
import { ClassType } from 'class-transformer/ClassTransformer';

export function IsDtoArray(dto: ClassType<any>) {
  return applyDecorators(
    ApiProperty({ type: [dto] }),
    IsArray({ message: validator.isArray }),
    ValidateNested({ each: true }),
    Type(() => dto) as PropertyDecorator,
  );
}
