import { Injectable, ForbiddenException } from '@nestjs/common';
import { StudentRepository } from '@students/repositories/student.repository';
import { StudentAssignationFilterDto } from '@students/dtos/student-assignation-filter.dto';
import { ShiftRepository } from '@academics/repositories/shift.repository';
import { GradeRepository } from '@academics/repositories/grade.repository';
import { SchoolYearRepository } from '@academics/repositories/school-year.repository';
import { plainToClass } from 'class-transformer';
import { StudentsAssignation } from '@students/docs/students-assignation.doc';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import { EStudentStatus } from '@students/constants/student.constant';
import { PatchStudentAssignationDto } from '@students/dtos/patch-student-assignation.dto';
import { SchoolYear } from '@academics/entities/school-year.entity';
import { SectionDetailRepository } from '@academics/repositories/section-detail.repository';
import { Student } from '@students/entities/student.entity';

@Injectable()
export class StudentAssignationService {
  constructor(
    private readonly studentRepository: StudentRepository,
    private readonly shiftRepository: ShiftRepository,
    private readonly gradeRepository: GradeRepository,
    private readonly schoolYearRepository: SchoolYearRepository,
    private readonly sectionDetailRepository: SectionDetailRepository,
    private readonly configService: ConfigService,
  ) {}

  async validateTeacherAssignation(shiftId: number, gradeId: number, teacherId: number): Promise<SchoolYear> {
    const assignedTeacher = await this.schoolYearRepository.getCurrentAssignation({ shiftId, gradeId, teacherId });
    if (!assignedTeacher) {
      throw new ForbiddenException('Usuario no es docente en el turno y grado específicado');
    }
    return assignedTeacher;
  }

  async getStudentsAssignation(userId: number, studentAssignationFilterDto: StudentAssignationFilterDto): Promise<any> {
    const { currentShiftId, currentGradeId } = studentAssignationFilterDto;
    const [currentShift, currentGrade, currentAssignation] = await Promise.all([
      this.shiftRepository.getShiftByIdOrThrow(currentShiftId),
      this.gradeRepository.getGradeByIdOrThrow(currentGradeId),
      this.schoolYearRepository.getCurrentAssignationOrThrow({}),
    ]);

    const [studentsAssignation] = await Promise.all([
      this.studentRepository.getStudentsAssignation(currentShift, currentGrade, currentAssignation),
      await this.validateTeacherAssignation(currentShiftId, currentGradeId, userId),
    ]);

    const cloudinaryEnvs = this.configService.get<string>('CLOUDINARY_ENVS')?.split(',') || ['dev', 'uat'];
    const env = this.configService.get<string>('NODE_ENV') || 'dev';

    const studentsWithoutAssignation: StudentsAssignation[] = [];
    const assignedStudents: StudentsAssignation[] = [];
    const myStudents: StudentsAssignation[] = [];
    studentsAssignation.forEach(student => {
      const mappedStudent: StudentsAssignation = {
        ...student,
        status: EStudentStatus[student.status],
        section: student.sectionDetails[0]?.section,
      };
      const lastImage = student.images[0];
      if (!cloudinaryEnvs.includes(env) && lastImage) {
        mappedStudent.images = [{ ...lastImage, path: fs.readFileSync(lastImage.path, 'base64') }];
      } else {
        mappedStudent.images = lastImage ? [lastImage] : [];
      }
      const studentSchoolYearAssignation = student.sectionDetails[0]?.gradeDetail.cycleDetail.schoolYear;
      if (!student.sectionDetails.length || studentSchoolYearAssignation?.id !== currentAssignation.id) {
        studentsWithoutAssignation.push(mappedStudent);
      } else if (student.sectionDetails[0].teacher.id !== userId) {
        assignedStudents.push(mappedStudent);
      } else {
        myStudents.push(mappedStudent);
      }
    });
    return {
      studentsWithoutAssignation: plainToClass(StudentsAssignation, studentsWithoutAssignation, {
        excludeExtraneousValues: true,
      }),
      assignedStudents: plainToClass(StudentsAssignation, assignedStudents, { excludeExtraneousValues: true }),
      myStudents: plainToClass(StudentsAssignation, myStudents, { excludeExtraneousValues: true }),
    };
  }

  async patchStudentsAssignation(
    userId: number,
    { currentGradeId, currentShiftId }: StudentAssignationFilterDto,
    { studentIds, vinculate }: PatchStudentAssignationDto,
  ): Promise<void> {
    const [currentShift, currentGrade, currentAssignation] = await Promise.all([
      this.shiftRepository.getShiftByIdOrThrow(currentShiftId),
      this.gradeRepository.getGradeByIdOrThrow(currentGradeId),
      this.schoolYearRepository.getCurrentAssignationOrThrow({}),
    ]);
    const [studentsAssignation, schoolYearAssignation] = await Promise.all([
      this.studentRepository.getStudentsAssignation(currentShift, currentGrade, currentAssignation),
      await this.validateTeacherAssignation(currentShiftId, currentGradeId, userId),
    ]);

    const sectionDetail = schoolYearAssignation.cycleDetails[0].gradeDetails[0].sectionDetails[0];
    if (vinculate) {
      const studentsWithoutAssignation: Student[] = [];
      studentsAssignation.forEach(student => {
        if (!student.sectionDetails.length) {
          studentsWithoutAssignation.push(student);
        }
      });
      const students = studentsWithoutAssignation.filter(student => studentIds.includes(student.id));
      sectionDetail.students = [...sectionDetail.students, ...students];
      await this.sectionDetailRepository.save(sectionDetail);
    } else {
      const studentsIdsToRemove = studentIds.join();
      await this.studentRepository.query(
        `DELETE FROM student_section_detail ` +
          `WHERE section_detail_id = ${sectionDetail.id}` +
          `AND student_id IN (${studentsIdsToRemove})`,
      );
    }
  }
}
