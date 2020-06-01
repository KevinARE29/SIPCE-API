import { Injectable } from '@nestjs/common';
import { RoleRepository } from '@auth/repositories/roles.repository';
import { PageDto } from '@core/dtos/page.dto';
import { getPagination } from '@core/utils/pagination.util';
import { plainToClass } from 'class-transformer';
import { Roles } from '@auth/docs/roles.doc';
import { RolesResponse } from '@auth/docs/roles-response-doc';
import { RoleFilterDto } from '@auth/dtos/role-filter.dto';

@Injectable()
export class RoleService {
  constructor(private readonly roleRepository: RoleRepository) {}

  async getAllRoles(pageDto: PageDto, roleFilterDto: RoleFilterDto): Promise<RolesResponse> {
    const [roles, count] = await this.roleRepository.getAllRoles(pageDto, roleFilterDto);
    const pagination = getPagination(pageDto, count);
    return { data: plainToClass(Roles, roles, { excludeExtraneousValues: true }), pagination };
  }
}
