import { Expose, Type } from 'class-transformer';
import { User } from '@users/docs/user.doc';
import { Annotation } from './annotation.doc';

export class CompleteAnnotation extends Annotation {
  @Expose({ name: 'reporterId' })
  @Type(() => User)
  reporter!: User;
}
