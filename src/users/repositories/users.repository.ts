import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/users.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  findUserByUsername(username: string): Promise<User | undefined> {
    return this.createQueryBuilder('user')
      .leftJoin('user.roles', 'role')
      .leftJoin('user.permissions', 'permission')
      .leftJoin('role.permissions', 'rolePermission')
      .select(['user', 'role', 'permission', 'rolePermission'])
      .andWhere('user.deletedAt is null')
      .andWhere('user.username = :username', { username })
      .getOne();
  }

  findByCode(code: string): Promise<User | undefined> {
    return this.findOne({
      relations: ['roles'],
      where: {
        code,
      },
    });
  }
}
