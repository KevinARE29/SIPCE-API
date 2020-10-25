import { Injectable, CanActivate, BadRequestException, ExecutionContext } from '@nestjs/common';
import { SchoolYearRepository } from '@academics/repositories';
import { ESchoolYearStatus } from '@academics/constants/academic.constants';
import { Reflector } from '@nestjs/core';

@Injectable()
export class SchoolYearGuard implements CanActivate {
  constructor(private readonly reflector: Reflector, private readonly schoolYearRepository: SchoolYearRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const inProgress = this.reflector.get<boolean>('inProgress', context.getHandler());

    const mostRecentSchoolYear = await this.schoolYearRepository
      .createQueryBuilder('schoolYear')
      .orderBy(`"schoolYear"."id"`, 'DESC')
      .getOne();

    if (inProgress) {
      if (!mostRecentSchoolYear || ESchoolYearStatus[mostRecentSchoolYear.status] !== 'En curso') {
        throw new BadRequestException('Operación no permitida mientras no exista un año escolar en curso');
      }
    } else if (mostRecentSchoolYear && ESchoolYearStatus[mostRecentSchoolYear.status] === 'En curso') {
      throw new BadRequestException('Operación no permitida mientras el actual año escolar esté en curso');
    }
    return true;
  }
}
