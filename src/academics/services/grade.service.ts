import { Injectable } from '@nestjs/common';
import { PageDto } from '@core/dtos/page.dto';
import { getPagination } from '@core/utils/pagination.util';
import { GradeRepository } from '@academics/repositories/grade.repository';
import { GradeFilterDto } from '@academics/dtos/grade-filter.dto';
import { GradesResponse } from '@academics/docs/grades-response.doc';
import { Grades } from '@academics/docs/grades.doc';
import { plainToClass } from 'class-transformer';

@Injectable()
export class GradeService {
  constructor(private readonly gradeRepository: GradeRepository) {}

  async getAllGrades(pageDto: PageDto, gradeFilterDto: GradeFilterDto): Promise<GradesResponse> {
    const [grades, count] = await this.gradeRepository.getAllGrades(pageDto, gradeFilterDto);
    const pagination = getPagination(pageDto, count);
    return { data: plainToClass(Grades, grades, { excludeExtraneousValues: true }), pagination };
  }

  async deleteGrade(gradeId: number): Promise<void> {
    const grade = await this.gradeRepository.getGradeByIdOrThrow(gradeId);
    const variable = grade.active;
    if (variable) {
      grade.active = false;
    } else grade.active = true;

    await this.gradeRepository.save(grade);
  }
}
