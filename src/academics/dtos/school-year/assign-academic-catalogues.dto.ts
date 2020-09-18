import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ValidateNested } from 'class-validator';
import { validator } from '@core/messages/validator.message';
import { Type } from 'class-transformer/decorators';
import { ShiftAssignationDto } from './shift-assignation.dto';

export class AssignAcademicCataloguesDto {
  @ApiProperty({ type: [ShiftAssignationDto] })
  @IsArray({ message: validator.isArray })
  @ValidateNested({ each: true })
  @Type(() => ShiftAssignationDto)
  shifts!: ShiftAssignationDto[];
}
