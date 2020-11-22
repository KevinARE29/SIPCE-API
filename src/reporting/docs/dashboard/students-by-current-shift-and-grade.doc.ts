import { Expose } from 'class-transformer';

export class StudentsByCurrentShiftAndGrade {
  @Expose()
  shiftId!: number;

  @Expose()
  shiftName!: string;

  @Expose()
  gradeId!: number;

  @Expose()
  gradeName!: string;

  @Expose()
  count!: number;
}
