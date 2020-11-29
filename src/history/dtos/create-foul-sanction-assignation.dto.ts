import { IsId } from '@core/decorators/id.decorator';
import { validator } from '@core/messages/validator.message';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFoulSanctionAssignationDto {
  @IsNotEmpty()
  @IsString({ message: validator.isDateString })
  readonly issueDate!: Date;

  @IsId({ each: true })
  readonly periodId!: number;

  @IsId({ each: true })
  readonly sanctionId?: number;

  @IsId({ each: true })
  readonly foulId!: number;

  @IsId({ each: true })
  readonly behavioralHistoryId!: number;
}
