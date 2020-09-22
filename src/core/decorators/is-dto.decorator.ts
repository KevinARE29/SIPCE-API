import { applyDecorators } from '@nestjs/common';
import { ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer/decorators';
import { ClassType } from 'class-transformer/ClassTransformer';

export function IsDto(dto: ClassType<any>) {
  return applyDecorators(ApiProperty({ type: dto }), ValidateNested(), Type(() => dto) as PropertyDecorator);
}
