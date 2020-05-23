import { EntityRepository, Repository } from 'typeorm';
import { Politic } from '../entities/politic.entity';

@EntityRepository(Politic)
export class PoliticRepository extends Repository<Politic> {}
