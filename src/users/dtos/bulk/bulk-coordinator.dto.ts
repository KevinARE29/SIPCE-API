import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ValidateNested, IsBoolean } from 'class-validator';
import { validator } from '@core/messages/validator.message';
import { Type } from 'class-transformer/decorators';
import { IsId } from '@core/decorators/id.decorator';
import { CoordinatorDto } from './coordinator.dto';

export class BulkCoordinatorDto {
  @IsBoolean({ message: validator.isBoolean })
  currentYear!: boolean;

  @IsId()
  shiftId!: number;

  @ApiProperty({ type: [CoordinatorDto] })
  @IsArray({ message: validator.isArray })
  @ValidateNested({ each: true })
  @Type(() => CoordinatorDto)
  coordinators!: CoordinatorDto[];
}
