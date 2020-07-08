import { EntityRepository, Repository } from 'typeorm';
import { Section } from '@academics/entities/section.entity';

@EntityRepository(Section)
export class SectionRepository extends Repository<Section> {}
