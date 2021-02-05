import { Expose, Type } from 'class-transformer';
import { BaseUser } from '@core/docs/base-user.doc';
import { Section } from './section.doc';

export class SectionDetail {
  @Expose()
  id!: number;

  @Expose()
  @Type(() => Section)
  section!: Section;

  @Expose()
  @Type(() => BaseUser)
  auxTeachers!: BaseUser[];

  @Expose()
  @Type(() => BaseUser)
  teacher!: BaseUser;

  @Expose()
  closed!: boolean;
}
