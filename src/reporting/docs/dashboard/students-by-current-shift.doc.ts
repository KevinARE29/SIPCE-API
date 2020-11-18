import { Expose } from 'class-transformer';

export class StudentsByCurrentShift {
  @Expose()
  shiftId!: number;

  @Expose()
  shiftName!: string;

  @Expose()
  count!: number;
}
