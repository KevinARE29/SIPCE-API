import { Injectable, CanActivate, BadRequestException } from '@nestjs/common';
import { SchoolYearRepository } from '@academics/repositories';
import { ESchoolYearStatus } from '@academics/constants/academic.constants';

@Injectable()
export class SchoolYearGuard implements CanActivate {
  constructor(private readonly schoolYearRepository: SchoolYearRepository) {}

  async canActivate(): Promise<boolean> {
    const mostRecentSchoolYear = await this.schoolYearRepository
      .createQueryBuilder('schoolYear')
      .orderBy(`"schoolYear"."id"`, 'DESC')
      .getOne();

    if (mostRecentSchoolYear && ESchoolYearStatus[mostRecentSchoolYear.status] === 'En curso') {
      throw new BadRequestException('Operación no permitida mientras el actual año escolar esté en curso');
    }

    return true;
  }
}
