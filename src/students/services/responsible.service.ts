import { Injectable } from '@nestjs/common';
import { PageDto } from '@core/dtos/page.dto';
import { getPagination } from '@core/utils/pagination.util';
import { plainToClass } from 'class-transformer';
import { EResponsibleRelationship } from '@students/constants/student.constant';
import { ResponsibleFilterDto } from '@students/dtos/responsible-filter.dto';
import { ResponsiblesResponse } from '@students/docs/responsibles-response.doc';
import { Responsible } from '@students/docs/responsible.doc';
import { ResponsibleRepository } from '@students/repositories/responsible.repository';
import { ResponsibleDto } from '@students/dtos/responsible.dto';
import { ResponsibleResponse } from '@students/docs/responsible-response.doc';
import { Connection } from 'typeorm';
import { StudentRepository } from '@students/repositories/student.repository';
import { ResponsibleStudentRepository } from '@students/repositories/responsible-student.repository';
import { UpdateResponsibleDto } from '@students/dtos/update-responsible.dto';

@Injectable()
export class ResponsibleService {
  constructor(
    private readonly responsibleRepository: ResponsibleRepository,
    private readonly studentRepository: StudentRepository,
    private readonly responsibleStudentRepository: ResponsibleStudentRepository,
    private connection: Connection,
  ) {}

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
    return { data: plainToClass(Responsible, mappedResponsibles, { excludeExtraneousValues: true }), pagination };
  }

  async createResponsible(studentId: number, responsibleDto: ResponsibleDto): Promise<ResponsibleResponse> {
    const queryRunner = this.connection.createQueryRunner();
    const { relationship, ...respDto } = responsibleDto;
    const student = await this.studentRepository.findByIdOrFail(studentId);
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      const existingResponsible = await this.responsibleRepository.findByEmail(responsibleDto.email);

      const responsible = existingResponsible
        ? await this.responsibleRepository.save({ ...existingResponsible, ...respDto })
        : await this.responsibleRepository.save(respDto);

      await this.responsibleStudentRepository.save({
        student,
        responsible,
        relationship: EResponsibleRelationship[relationship],
      });
      await queryRunner.commitTransaction();
      await queryRunner.release();
      return { data: plainToClass(Responsible, responsible, { excludeExtraneousValues: true }) };
    } catch (err) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      throw err;
    }
  }

  async updateResponsible(
    studentId: number,
    responsibleId: number,
    responsibleDto: UpdateResponsibleDto,
  ): Promise<ResponsibleResponse> {
    const queryRunner = this.connection.createQueryRunner();
    const { relationship, ...respDto } = responsibleDto;
    const [student, responsible] = await Promise.all([
      this.studentRepository.findByIdOrFail(studentId),
      this.responsibleRepository.findByIdOrFail(studentId, responsibleId),
    ]);

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      await this.responsibleRepository.save({ ...responsible, ...respDto });
      if (relationship) {
        await this.responsibleStudentRepository.save({
          student,
          responsible,
          relationship: EResponsibleRelationship[relationship],
        });
      }

      await queryRunner.commitTransaction();
      await queryRunner.release();
      return { data: plainToClass(Responsible, responsible, { excludeExtraneousValues: true }) };
    } catch (err) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      throw err;
    }
  }

  async deleteResponsible(studentId: number, responsibleId: number): Promise<void> {
    const queryRunner = this.connection.createQueryRunner();
    const responsible = await this.responsibleRepository.findByIdOrFail(studentId, responsibleId);

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      await this.responsibleStudentRepository.delete({ responsible });
      await this.responsibleRepository.remove(responsible);
      await queryRunner.commitTransaction();
      await queryRunner.release();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      throw err;
    }
  }
}
