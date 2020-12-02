import { Students } from '@students/docs/students.doc';
import { Expose, Type } from 'class-transformer';
import { GroupalIndexes } from './groupal-indexes.doc';
import { IndividualIndex } from './individual-index.doc';
import { SociometricValues } from './sociometric-values.doc';

export class SociometricMatrix {
  @Expose()
  @Type(() => Students)
  participants!: Students[];

  @Expose()
  sociomatrix!: number[][];

  @Expose()
  @Type(() => SociometricValues)
  sociometricValues!: SociometricValues;

  @Expose()
  @Type(() => IndividualIndex)
  individualIndexes!: IndividualIndex[];

  @Expose()
  @Type(() => GroupalIndexes)
  groupalIndexes!: GroupalIndexes;
}
