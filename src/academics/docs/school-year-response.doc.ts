import { Expose } from 'class-transformer';

export class SchoolYearResponse {
  @Expose()
  currentAssignation!: any;

  @Expose()
  previousAssignation?: any;
}
