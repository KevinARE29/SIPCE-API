import { Expose } from 'class-transformer';

export class Image {
  @Expose()
  path!: string;
}
