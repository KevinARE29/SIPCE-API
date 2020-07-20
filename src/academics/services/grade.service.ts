import { Injectable, BadRequestException } from '@nestjs/common';
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

    if (gradeId === 1 || gradeId === 15) {
      if (gradeId === 15 && !grade.active) {
        const prevGrade = await this.gradeRepository.getGradeByIdOrThrow(gradeId - 1);
        if (!prevGrade.active) {
          throw new BadRequestException('gradeId: El grado seleccionado no se puede activar generara conflictos');
        }
        grade.active = !grade.active;
      }
      grade.active = !grade.active;
    } else {
      const nextGrade = await this.gradeRepository.getGradeByIdOrThrow(gradeId + 1);
      const prevGrade = await this.gradeRepository.getGradeByIdOrThrow(gradeId - 1);
      if (grade.active) {
        if (nextGrade.active && prevGrade.active) {
          throw new BadRequestException('gradeId: El grado seleccionado no se puede desactivar generara conflictos');
        } else {
          grade.active = !grade.active;
        }
      } else {
        if (!nextGrade.active && !prevGrade.active) {
          throw new BadRequestException('gradeId: El grado seleccionado no se puede activar generara conflictos');
        }
        grade.active = !grade.active;
      }
    }
    await this.gradeRepository.save(grade);
  }
}
