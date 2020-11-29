import { IsId } from '@core/decorators/id.decorator';
import { validator } from '@core/messages/validator.message';
import { IsInt, IsPositive, Max } from 'class-validator';

export class SociometricTestDto {
  @IsId()
  readonly shiftId!: number;

  @IsId()
  readonly gradeId!: number;

  @IsId()
  readonly sectionId!: number;

  @IsId()
  readonly questionBankId!: number;

  @IsPositive({ message: validator.isPositive })
  @IsInt({ message: validator.isInt })
  @Max(5, { message: validator.isMax })
  readonly answersPerQuestion!: number;
}
