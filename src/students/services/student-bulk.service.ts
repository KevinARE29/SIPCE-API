/* eslint-disable no-await-in-loop */
/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
import { Injectable, ConflictException, BadRequestException, Logger } from '@nestjs/common';
import { ShiftRepository } from '@academics/repositories/shift.repository';
import { bulkCatchMessage } from '@users/utils/bulk-catch-message.util';
import { BulkStudentsDto } from '@students/dtos/bulk/bulk-students.dto';
import { Connection } from 'typeorm';
import { GradeRepository } from '@academics/repositories/grade.repository';
import { getEntityMap } from '@core/utils/core.util';
import { StudentRepository } from '@students/repositories/student.repository';
import { ResponsibleRepository } from '@students/repositories/responsible.repository';
import { ResponsibleStudentRepository } from '@students/repositories/responsible-student.repository';
import { EResponsibleRelationship, TRelationship } from '@students/constants/student.constant';

@Injectable()
export class StudentBulkService {
  constructor(
    private readonly shiftRepository: ShiftRepository,
    private readonly gradeRepository: GradeRepository,
    private readonly studentRepository: StudentRepository,
    private readonly responsibleRepository: ResponsibleRepository,
    private readonly responsibleStudentRepository: ResponsibleStudentRepository,
    private connection: Connection,
  ) {}

  async bulkStudent(bulkStudentsDto: BulkStudentsDto): Promise<void> {
    const queryRunner = this.connection.createQueryRunner();
    const { shiftId, students, currentYear } = bulkStudentsDto;

    const currentShift = await this.shiftRepository.findById(shiftId);
    if (!currentShift) {
      throw new BadRequestException('shiftId: El turno seleccionado no existe o no está activo');
    }

    const grades = await this.gradeRepository.find();
    const gradesMap = getEntityMap('id', grades);
    const message: { [key: number]: string } = {};
    for (const [index, studentDto] of students.entries()) {
      const {
        gradeId,
        startedGradeId,
        responsibleFirstname: firstname,
        responsibleLastname: lastname,
        responsibleEmail: email,
        responsiblePhone: phone,
        responsibleRelationship: relationship,
        ...mappedStudent
      } = studentDto;

      const mappedResponsible = {
        firstname,
        lastname,
        email,
        phone,
      };

      const now = new Date().getFullYear();
      mappedStudent.registrationYear = mappedStudent.registrationYear || currentYear ? now : now + 1;

      const startedGrade = gradesMap.get(startedGradeId || gradeId);
      if (!startedGrade) {
        message[index] = 'startedGradeId: El grado especificado no existe';
        continue;
      }

      const currentGrade = gradesMap.get(gradeId);
      if (!currentGrade || !currentGrade.active) {
        message[index] = 'gradeId: Contiene grados inactivos o no válidos';
        continue;
      }

      try {
        await queryRunner.connect();
        await queryRunner.startTransaction();

        const [existingStudent, existingResponsible] = await Promise.all([
          this.studentRepository.findByCode(studentDto.code),
          this.responsibleRepository.findByEmail(email),
        ]);
        const student = existingStudent
          ? await this.studentRepository.save({
              ...existingStudent,
              ...mappedStudent,
              startedGrade,
              currentGrade,
              currentShift,
            })
          : await this.studentRepository.save({ ...mappedStudent, startedGrade, currentGrade, currentShift });

        const responsible = existingResponsible
          ? await this.responsibleRepository.save({ ...existingResponsible, ...mappedResponsible })
          : await this.responsibleRepository.save(mappedResponsible);

        await this.responsibleStudentRepository.save({
          student,
          responsible,
          relationship: EResponsibleRelationship[relationship as TRelationship],
        });

        await queryRunner.commitTransaction();
      } catch (err) {
        Logger.error(err);
        await queryRunner.rollbackTransaction();
        message[index] = bulkCatchMessage(err);
        continue;
      }
    }

    await queryRunner.release();
    if (Object.keys(message).length) {
      throw new ConflictException({ error: 'Conflict', message });
    }
  }
}
