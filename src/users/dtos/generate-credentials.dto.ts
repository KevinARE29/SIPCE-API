import { ArrayNotEmpty } from 'class-validator';
import { validator } from '@core/messages/validator.message';
import { IsId } from '@core/decorators/id.decorator';

export class GenerateCredentialsDto {
  @ArrayNotEmpty({ message: validator.isArray })
  @IsId({ each: true })
  readonly ids!: number[];
}
