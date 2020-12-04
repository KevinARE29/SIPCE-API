import { GroupalIndexes } from '@sociometrics/docs/groupal-indexes.doc';
import { Expose } from 'class-transformer';
import { SociomatrixData } from './sociomatrix-data.doc';

export class GeneralReport {
  @Expose()
  sociomatrixData!: SociomatrixData;

  @Expose()
  groupalIndexesData!: GroupalIndexes;
}
