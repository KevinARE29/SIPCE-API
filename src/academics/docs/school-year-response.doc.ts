import { Expose, Type } from 'class-transformer';

export class SchoolYearResponse {
  @Expose()
  currentAssignation!: any;

  @Expose()
  previousAssignation?: any;
}
