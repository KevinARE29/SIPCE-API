import { IsId } from '@core/decorators/id.decorator';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class AnswerDto {
  @IsId()
  readonly questionId!: number;

  @IsId({ each: true })
  readonly studentIds!: number[];

  @ApiProperty({
    description: 'Indica si la respuesta es para la pregunta con connotación positiva o negativa',
  })
  @IsBoolean()
  readonly connotation!: boolean;
}
