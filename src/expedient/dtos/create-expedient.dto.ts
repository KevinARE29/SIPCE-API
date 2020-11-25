import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { validator } from '@core/messages/validator.message';

export class CreateExpedientDto {
  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsString({ message: validator.isString })
  readonly referrerName!: string;

  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsString({ message: validator.isString })
  readonly reason!: string;

  @IsNotEmpty({ message: validator.isNotEmpty })
  @IsString({ message: validator.isString })
  readonly problemDescription!: string;

  @IsOptional()
  @IsString({ message: validator.isString })
  readonly diagnosticImpression?: string;

  @IsOptional()
  @IsString({ message: validator.isString, each: true })
  readonly diagnosticImpressionCategories?: string[];

  @IsOptional()
  @IsString({ message: validator.isString })
  readonly actionPlan?: string;

  @IsOptional()
  @IsString({ message: validator.isString })
  readonly finalConclusion?: string;

  @IsOptional()
  @IsString({ message: validator.isString, each: true })
  readonly externalPsychologicalTreatments?: string[];
}
