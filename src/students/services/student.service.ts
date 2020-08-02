import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
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
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import { Student } from '@students/docs/student.doc';
import { StudentResponse } from '@students/docs/student-response.doc';

@Injectable()
export class StudentService {
  constructor(
    private readonly studentRepository: StudentRepository,
    private readonly gradeRepository: GradeRepository,
    private readonly schoolYearRepository: SchoolYearRepository,
    private readonly responsibleRepository: ResponsibleRepository,
    private readonly responsibleStudentRepository: ResponsibleStudentRepository,
    private readonly configService: ConfigService,
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
      await queryRunner.release();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      throw err;
    }
  }

  async getStudent(studentId: number): Promise<StudentResponse> {
    const student = await this.studentRepository.getStudentDetails(studentId);
    if (!student) {
      throw new NotFoundException(`Estudiante con id ${studentId} no encontrado`);
    }
    const cloudinaryEnvs = this.configService.get<string>('CLOUDINARY_ENVS')?.split(',') || ['dev', 'uat'];
    const env = this.configService.get<string>('NODE_ENV') || 'dev';
    if (!cloudinaryEnvs.includes(env)) {
      student.images = student.images.map(image => ({
        ...image,
        path: fs.readFileSync(image.path, 'base64'),
      }));
    }

    const mappedStudent = {
      ...student,
      status: EStudentStatus[student.status],
      responsibleStudents: student.responsibleStudents.map(rStudent => ({
        ...rStudent,
        relationship: EResponsibleRelationship[rStudent.relationship],
      })),
    };

    return { data: plainToClass(Student, mappedStudent, { excludeExtraneousValues: true }) };
  }
}