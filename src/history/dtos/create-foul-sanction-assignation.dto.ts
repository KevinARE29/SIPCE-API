import { IsId } from '@core/decorators/id.decorator';
import { validator } from '@core/messages/validator.message';
import { IsDateString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateFoulSanctionAssignationDto {
  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsDateString({ message: validator.isDateString })
  readonly issueDate!: Date;

  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsId()
  readonly periodIdAssignation!: number;

  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsId()
  readonly foulIdAssignation!: number;

  @IsOptional()
  @IsId()
  readonly sanctionIdAssignation?: number;
}
