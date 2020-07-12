import { IsInt, IsPositive, ArrayNotEmpty } from 'class-validator';
import { validator } from '@core/messages/validator.message';

export class GenerateCredentialsDto {
  @ArrayNotEmpty({ message: validator.isArray })
  @IsInt({ each: true, message: validator.isInt })
  @IsPositive({ each: true, message: validator.isPositive })
  ids!: number[];
}
