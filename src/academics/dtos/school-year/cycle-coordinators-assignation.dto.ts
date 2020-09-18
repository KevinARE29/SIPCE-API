import { IsId } from '@core/decorators/id.decorator';

export class CycleCoordinatorsAssignationDto {
  @IsId()
  cycleId!: number;

  @IsId()
  cycleCoordinatorId!: number;
}
