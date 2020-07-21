import { EntityRepository, Repository } from 'typeorm';
import { Responsible } from '@students/entities/responsible.entity';

@EntityRepository(Responsible)
export class ResponsibleRepository extends Repository<Responsible> {
  findByEmail(email: string): Promise<Responsible | undefined> {
    return this.findOne({
      where: {
        email,
      },
    });
  }
}
