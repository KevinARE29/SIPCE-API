import { IsId } from '@core/decorators/id.decorator';
import { validator } from '@core/messages/validator.message';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFoulSanctionAssignationDto {
  @IsNotEmpty()
  @IsString({ message: validator.isDateString })
  readonly issueDate!: Date;

  @IsId({ each: true })
  readonly periodIdAssignation!: number;

  @IsId({ each: true })
  readonly sanctionIdAssignation?: number;

  @IsId({ each: true })
  readonly foulIdAssignation!: number;
}
