import { EntityRepository, Repository, IsNull } from 'typeorm';
import { PageDto } from '@core/dtos/page.dto';
import { UserFilterDto, sortOptionsMap } from '@users/dtos/user-filter.dto';
import { getOrderBy } from '@core/utils/sort.util';
import { NotFoundException } from '@nestjs/common';
import { User } from '../entities/users.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findByIdOrThrow(id: number): Promise<User> {
    const user = await this.findOne(id, {
      where: { deletedAt: IsNull() },
      relations: ['roles', 'permissions'],
    });
    if (!user) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }
    return user;
  }

  findUserByUsername(username: string): Promise<User | undefined> {
    return this.createQueryBuilder('user')
      .leftJoin('user.roles', 'role')
      .leftJoin('user.permissions', 'permission')
      .leftJoin('role.permissions', 'rolePermission')
      .select(['user', 'role', 'permission', 'rolePermission'])
      .andWhere('user.deletedAt is null')
      .andWhere('user.active is true')
      .andWhere('user.username = :username', { username })
      .getOne();
  }

  findByCode(code: string): Promise<User | undefined> {
    return this.findOne({
      relations: ['roles'],
      where: {
        code,
        deletedAt: IsNull(),
      },
    });
  }

  getAllUsers(pageDto: PageDto, userFilterDto: UserFilterDto): Promise<[User[], number]> {
    const { page, perPage } = pageDto;
    const {
      sort,
      username,
      firstname,
      lastname,
      email,
      active,
      credentials,
      role,
      createdAtStart,
      createdAtEnd,
      paginate,
    } = userFilterDto;
    const query = this.createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'role')
      .andWhere('user.deletedAt is null');

    if (paginate === 'false') {
      query.andWhere(`user.active is true`);
      query.orderBy({ 'user.firstname': 'ASC' });
      query.addOrderBy('user.lastname', 'ASC');
      if (role) {
        query.andWhere(`role.id = ${role}`);
      }
      if (username) {
        query.andWhere(`user.username ILIKE '%${username}%'`);
      }
      return query.getManyAndCount();
    }
    query.take(perPage);
    query.skip((page - 1) * perPage);

    if (sort) {
      const order = getOrderBy(sort, sortOptionsMap);
      query.orderBy(order);
    } else {
      query.orderBy({ 'user.id': 'DESC' });
    }

    if (active) {
      query.andWhere(`user.active is ${active}`);
    }

    if (credentials) {
      query.andWhere(`user.password is null`);
    }

    if (username) {
      query.andWhere(`user.username ILIKE '%${username}%'`);
    }

    if (firstname) {
      query.andWhere(`user.firstname ILIKE '%${firstname}%'`);
    }

    if (lastname) {
      query.andWhere(`user.lastname ILIKE '%${lastname}%'`);
    }

    if (email) {
      query.andWhere(`user.email ILIKE '%${email}%'`);
    }

    if (role) {
      query.andWhere(`role.id = ${role}`);
    }

    if (createdAtStart) {
      query.andWhere(`user.createdAt >= '${createdAtStart}'`);
    }

    if (createdAtEnd) {
      query.andWhere(`user.createdAt <= '${createdAtEnd}'`);
    }

    return query.getManyAndCount();
  }

  findSessionParticipants(couselorIds: number[]): Promise<User[]> {
    return this.createQueryBuilder('user')
      .where('user.id IN (:...counselorIds)', { counselorIds: [null, ...couselorIds] })
      .getMany();
  }

  findUsersByIdsAndRole(userIds: number[], role: string): Promise<User[]> {
    return this.createQueryBuilder('user')
      .leftJoin('user.roles', 'role')
      .andWhere('user.id IN (:...userIds)', { userIds: [null, ...userIds] })
      .andWhere(`role.name ILIKE '%${role}%'`)
      .getMany();
  }
}
