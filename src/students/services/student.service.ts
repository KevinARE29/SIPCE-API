import { Injectable, BadRequestException } from '@nestjs/common';
import { PageDto } from '@core/dtos/page.dto';
import { getPagination } from '@core/utils/pagination.util';
import { plainToClass } from 'class-transformer';
import { StudentRepository } from '@students/repositories/student.repository';
import { StudentFilterDto } from '@students/dtos/student-filter.dto';
import { StudentsResponse } from '@students/docs/students-response.doc';
import { Students } from '@students/docs/students.doc';
import { EStudentStatus, EResponsibleRelationship } from '@students/constants/student.constant';
import { CreateStudentDto } from '@students/dtos/create-student.dto';
import { GradeRepository } from '@academics/repositories/grade.repository';
import { ResponsibleRepository } from '@students/repositories/responsible.repository';
import { ResponsibleStudentRepository } from '@students/repositories/responsible-student.repository';
import { Connection } from 'typeorm';
import { SchoolYearRepository } from '@academics/repositories/school-year.repository';

@Injectable()
export class StudentService {
  constructor(
    private readonly studentRepository: StudentRepository,
    private readonly gradeRepository: GradeRepository,
    private readonly schoolYearRepository: SchoolYearRepository,
    private readonly responsibleRepository: ResponsibleRepository,
    private readonly responsibleStudentRepository: ResponsibleStudentRepository,
    private connection: Connection,
  ) {}

  async getAllStudents(pageDto: PageDto, studentFilterDto: StudentFilterDto): Promise<StudentsResponse> {
    const [students, count] = await this.studentRepository.getAllStudents(pageDto, studentFilterDto);
    const pagination = getPagination(pageDto, count);
    const mappedStudents = students.map(student => ({ ...student, status: EStudentStatus[student.status] }));
    return { data: plainToClass(Students, mappedStudents, { excludeExtraneousValues: true }), pagination };
  }

  async createStudent(createStudentDto: CreateStudentDto): Promise<any> {
    const queryRunner = this.connection.createQueryRunner();
    const {
      shiftId,
      gradeId,
      startedGradeId,
      registrationYear,
      responsible: responsibleDto,
      ...studentDto
    } = createStudentDto;
    const [currentAssignation, existingResponsible] = await Promise.all([
      this.schoolYearRepository.getCurrentAssignation({ shiftId, gradeId }),
      this.responsibleRepository.findByEmail(responsibleDto.email),
    ]);
    if (!currentAssignation) {
      throw new BadRequestException('La asignación especificada no es válida para el año escolar activo');
    }
    const year = new Date().getFullYear();
    const currentShift = currentAssignation.cycleDetails[0].shift;
    const currentGrade = currentAssignation.cycleDetails[0].gradeDetails[0].grade;
    const startedGrade = startedGradeId ? await this.gradeRepository.getGradeByIdOrThrow(startedGradeId) : undefined;
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      const studentPromise = this.studentRepository.save({
        ...studentDto,
        currentShift,
        currentGrade,
        startedGrade: startedGrade || currentGrade,
        registrationYear: registrationYear || year,
      });

      const responsiblePromise = existingResponsible
        ? this.responsibleRepository.save({ ...existingResponsible, ...responsibleDto })
        : this.responsibleRepository.save(responsibleDto);

      const [student, responsible] = await Promise.all([studentPromise, responsiblePromise]);
      await this.responsibleStudentRepository.save({
        student,
        responsible,
        relationship: EResponsibleRelationship[responsibleDto.relationship],
      });
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    }
  }
}
