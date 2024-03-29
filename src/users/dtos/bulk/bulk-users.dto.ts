import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ValidateNested } from 'class-validator';
import { validator } from '@core/messages/validator.message';
import { Type } from 'class-transformer/decorators';
import { BulkUserDto } from './bulk-user.dto';

export class BulkUsersDto {
  @ApiProperty({ type: [BulkUserDto] })
  @IsArray({ message: validator.isArray })
  @ValidateNested({ each: true })
  @Type(() => BulkUserDto)
  users!: BulkUserDto[];
}
