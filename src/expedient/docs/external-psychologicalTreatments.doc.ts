import { Expose } from 'class-transformer';

export class ExternalPsychologicalTreatments {
  @Expose()
  id!: number;

  @Expose()
  name!: string;
}
