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
import { UpdateStudentDto } from '@students/dtos/update-student.dto';
import { ShiftRepository } from '@academics/repositories/shift.repository';
import { UpdatedStudent } from '@students/docs/updated-student.doc';
import { UpdatedStudentResponse } from '@students/docs/updated-student-response.doc';

@Injectable()
export class StudentService {
  constructor(
    private readonly studentRepository: StudentRepository,
    private readonly gradeRepository: GradeRepository,
    private readonly shiftRepository: ShiftRepository,
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

  async deleteStudent(studentId: number): Promise<void> {
    const student = await this.studentRepository.findByIdOrFail(studentId);
    const milisecondsDiff = +new Date() - +student.createdAt;
    const yearsDiff = milisecondsDiff / 31536000000;
    const monthDiff = yearsDiff * 12;
    if (!(monthDiff < 3 || yearsDiff > 15 || EStudentStatus[student.status] === 'Egresado')) {
      throw new BadRequestException(
        'El estudiante no cumple con los requisitos para poder ser dado de baja del sistema',
      );
    }
    student.deletedAt = new Date();
    await this.studentRepository.save(student);
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
    const cloudinaryEnvs = this.configService.get('CLOUDINARY_ENVS').split(',');
    const env = this.configService.get('NODE_ENV');
    if (!cloudinaryEnvs.includes(env)) {
      student.images = student.images.map(image => ({
        ...image,
        path: fs.readFileSync(image.path, 'base64'),
      }));
    }

    const mappedStudent = {
      ...student,
      siblings: student.siblings.map(sibling => ({
        ...sibling,
        status: EStudentStatus[sibling.status],
      })),
      status: EStudentStatus[student.status],
      responsibleStudents: student.responsibleStudents.map(rStudent => ({
        ...rStudent,
        relationship: EResponsibleRelationship[rStudent.relationship],
      })),
    };

    return { data: plainToClass(Student, mappedStudent, { excludeExtraneousValues: true }) };
  }

  async updateStudent(studentId: number, updateStudentDto: UpdateStudentDto): Promise<UpdatedStudentResponse> {
    const queryRunner = this.connection.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      const { shiftId, gradeId, sectionId, startedGradeId, siblings, status, ...studentDto } = updateStudentDto;
      const student = await this.studentRepository.findOne(studentId, { relations: ['sectionDetails', 'siblings'] });
      if (!student) {
        throw new NotFoundException(`Estudiante con id ${studentId} no encontrado`);
      }
      if (shiftId) {
        student.currentShift = await this.shiftRepository.getShiftByIdOrThrow(shiftId);
      }
      if (startedGradeId) {
        student.startedGrade = await this.gradeRepository.getGradeByIdOrThrow(startedGradeId);
      }
      // Updates the entire siblings assignation
      if (siblings) {
        const currentSiblingsIds = ['null', ...student.siblings.map(currentSibling => currentSibling.id)].join();
        await this.studentRepository.query(
          `DELETE FROM student_brother ` +
            `WHERE student_id IN (${currentSiblingsIds})` +
            ` OR brother_id IN (${currentSiblingsIds})`,
        );
        const siblingsArray = [...(await this.studentRepository.findByIds(siblings)), student];
        const students = siblingsArray.map(studentSibling => ({
          ...studentSibling,
          siblings: siblingsArray.filter(sibling => sibling.id !== studentSibling.id),
        }));
        await this.studentRepository.save(students);
        // Updates the current siblings assignation to the updated one
        student.siblings = students.find(updatedSibling => updatedSibling.id === student.id)?.siblings || [];
      }
      if (status) {
        student.status = +EStudentStatus[status];
      }

      // Updates Current Assignation and Current Grade
      if (gradeId && sectionId) {
        const [currentGrade, currentAssignation] = await Promise.all([
          this.gradeRepository.getGradeByIdOrThrow(gradeId),
          this.schoolYearRepository.getCurrentAssignation({
            gradeId,
            sectionId,
            shiftId: student.currentShift.id,
          }),
        ]);

        if (!currentAssignation) {
          throw new BadRequestException('La asignación especificada no es válida para el año escolar activo');
        }
        const sectionDetail = currentAssignation.cycleDetails[0].gradeDetails[0].sectionDetails[0];
        const mappedSectionDetails = student.sectionDetails.filter(sDetail => sDetail.id !== sectionDetail?.id);
        student.sectionDetails = mappedSectionDetails;
        await this.studentRepository.save({ ...student, currentGrade });
        student.sectionDetails = [...mappedSectionDetails, sectionDetail];
      }
      // Updates currentGrade
      else if (gradeId) {
        const currentGrade = await this.gradeRepository.getGradeByIdOrThrow(gradeId);
        student.currentGrade = currentGrade;
      }

      const updatedStudent = await this.studentRepository.save({
        ...student,
        ...studentDto,
      });
      await queryRunner.commitTransaction();
      await queryRunner.release();
      return { data: plainToClass(UpdatedStudent, updatedStudent, { excludeExtraneousValues: true }) };
    } catch (err) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      throw err;
    }
  }
}
