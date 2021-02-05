import { Expose, Type } from 'class-transformer';
import { Image } from '@core/docs/image.doc';
import { Students } from '@students/docs/students.doc';

export class StudentsRequest extends Students {
  @Expose()
  @Type(() => Image)
  currentPhoto!: Image;
}
