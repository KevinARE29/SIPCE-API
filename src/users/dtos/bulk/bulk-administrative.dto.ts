import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ValidateNested } from 'class-validator';
import { validator } from '@core/messages/validator.message';
import { Type } from 'class-transformer/decorators';
import { AdministrativeDto } from './administrative.dto';

export class BulkAdministrativeDto {
  @ApiProperty({ type: [AdministrativeDto] })
  @IsArray({ message: validator.isArray })
  @ValidateNested({ each: true })
  @Type(() => AdministrativeDto)
  administratives!: AdministrativeDto[];
}
