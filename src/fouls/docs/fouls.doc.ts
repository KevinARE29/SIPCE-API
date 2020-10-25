import { EnumFoulsType } from '@fouls/constants/fouls.constants';
import { Expose, Transform } from 'class-transformer';

export class Fouls {
  @Expose()
  id!: number;

  @Expose()
  @Transform(foulsType => EnumFoulsType[foulsType])
  foulsType!: string;

  @Expose()
  description!: string;
}
