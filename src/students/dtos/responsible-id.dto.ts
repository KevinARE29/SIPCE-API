import { Type } from 'class-transformer';
import { IsId } from '@core/decorators/id.decorator';

export class ResponsibleIdDto {
  @Type(() => Number)
  @IsId()
  responsibleId!: number;
}
