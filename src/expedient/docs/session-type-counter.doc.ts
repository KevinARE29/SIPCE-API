import { Expose } from 'class-transformer';

export class SessionTypeCounter {
  @Expose()
  individualSessionCounter!: number;

  @Expose()
  parentsInterviewCounter!: number;

  @Expose()
  teachersInterviewCounter!: number;
}
