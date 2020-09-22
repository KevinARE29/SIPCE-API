import { IsId } from '@core/decorators/id.decorator';

export class CycleCoordinatorsAssignationDto {
  @IsId()
  readonly cycleId!: number;

  @IsId()
  readonly cycleCoordinatorId!: number;
}
