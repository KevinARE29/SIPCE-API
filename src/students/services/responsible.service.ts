import { Injectable } from '@nestjs/common';
import { PageDto } from '@core/dtos/page.dto';
import { getPagination } from '@core/utils/pagination.util';
import { plainToClass } from 'class-transformer';
import { EResponsibleRelationship } from '@students/constants/student.constant';
import { ResponsibleFilterDto } from '@students/dtos/responsible-filter.dto';
import { ResponsiblesResponse } from '@students/docs/responsibles-response.doc';
import { Responsibles } from '@students/docs/responsibles.doc';
import { ResponsibleRepository } from '@students/repositories/responsible.repository';

@Injectable()
export class ResponsibleService {
  constructor(private readonly responsibleRepository: ResponsibleRepository) {}

  async getStudentResponsibles(
    studentId: number,
    pageDto: PageDto,
    responsibleFilterDto: ResponsibleFilterDto,
  ): Promise<ResponsiblesResponse> {
    const [responsibles, count] = await this.responsibleRepository.getStudentResponsibles(
      studentId,
      pageDto,
      responsibleFilterDto,
    );
    const pagination = getPagination(pageDto, count);
    const mappedResponsibles = responsibles.map(responsible => ({
      ...responsible,
      relationship: EResponsibleRelationship[responsible.responsibleStudents[0].relationship],
    }));
    return { data: plainToClass(Responsibles, mappedResponsibles, { excludeExtraneousValues: true }), pagination };
  }
}
