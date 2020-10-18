import { Expose, Type } from 'class-transformer';
import { StudentsRequest } from './student-request.doc';

export class Requests {
  @Expose()
  id!: number;

  @Expose()
  subject!: string;

  @Expose()
  comment!: string;

  @Expose()
  createdAt!: Date;

  @Expose()
  @Type(() => StudentsRequest)
  student!: StudentsRequest;
}
