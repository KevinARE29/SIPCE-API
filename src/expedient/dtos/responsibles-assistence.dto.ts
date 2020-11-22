import { IsNotEmpty, IsBoolean } from 'class-validator';
import { validator } from '@core/messages/validator.message';
import { IsId } from '@core/decorators/id.decorator';

export class ResponsiblesAssistenceDto {
  @IsId()
  readonly id!: number;

  @IsBoolean({ message: validator.isBoolean })
  @IsNotEmpty({ message: validator.isNotEmpty })
  readonly attended!: boolean;
}
