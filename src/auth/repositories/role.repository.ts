import { EntityRepository, Repository } from 'typeorm';
import { PageDto } from '@core/dtos/page.dto';
import { RoleFilterDto, sortOptionsMap } from '@auth/dtos/role-filter.dto';
import { NotFoundException } from '@nestjs/common';
import { getOrderBy } from '@core/utils/sort.util';
import { Role } from '../entities/role.entity';

@EntityRepository(Role)
export class RoleRepository extends Repository<Role> {
  getAllRoles(pageDto: PageDto, roleFilterDto: RoleFilterDto): Promise<[Role[], number]> {
    const { page, perPage } = pageDto;
    const { sort, name, paginate } = roleFilterDto;
    const query = this.createQueryBuilder('role')
      .select('role')
      .leftJoin('role.users', 'user')
      .loadRelationCountAndMap('role.usersCount', 'role.users');

    if (paginate === 'false') {
      query.orderBy({ 'role.name': 'ASC' });
      return query.getManyAndCount();
    }

    query.take(perPage);
    query.skip((page - 1) * perPage);

    if (sort) {
      const order = getOrderBy(sort, sortOptionsMap);
      query.orderBy(order);
    } else {
      query.orderBy({ 'role.id': 'DESC' });
    }

    if (name) {
      query.andWhere(`role."name" ILIKE '%${name}%'`);
    }

    return query.getManyAndCount();
  }

  async getRoleByIdOrThrow(roleId: number): Promise<Role> {
    const role = await this.findOne(roleId, { relations: ['permissions'] });
    if (!role) {
      throw new NotFoundException('Rol no encontrado');
    }
    return role;
  }

  getRoleByName(name: string): Promise<Role | undefined> {
    return this.createQueryBuilder('role')
      .where('LOWER(role.name) = LOWER(:name)', { name })
      .getOne();
  }

  findRoles(roleIds: number[]): Promise<Role[]> {
    return this.createQueryBuilder('role')
      .where('role.id IN (:...roleIds)', { roleIds: [null, ...roleIds] })
      .getMany();
  }
}
