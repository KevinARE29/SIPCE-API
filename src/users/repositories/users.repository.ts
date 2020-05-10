import { EntityRepository, Repository, IsNull } from 'typeorm';
import { User } from '../entities/users.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  findUserByUsername(username: string): Promise<User | undefined> {
    return this.findOne({ where: { username, deletedAt: IsNull() } });
  }
}
