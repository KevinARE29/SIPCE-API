import { Injectable, ForbiddenException } from '@nestjs/common';
import { StudentRepository } from '@students/repositories/student.repository';
import { StudentAssignationFilterDto } from '@students/dtos/student-assignation-filter.dto';
import { ShiftRepository } from '@academics/repositories/shift.repository';
import { GradeRepository } from '@academics/repositories/grade.repository';
import { SchoolYearRepository } from '@academics/repositories/school-year.repository';
import { plainToClass } from 'class-transformer';
import { StudentsAssignation } from '@students/docs/students-assignation.doc';
import { EStudentStatus } from '@students/constants/student.constant';
import { PatchStudentAssignationDto } from '@students/dtos/patch-student-assignation.dto';
import { SchoolYear } from '@academics/entities/school-year.entity';
import { SectionDetailRepository } from '@academics/repositories/section-detail.repository';
import { Student } from '@students/entities/student.entity';
import { BehavioralHistoryRepository } from '@history/repository/behavioral-history.repository';
import { Transactional } from 'typeorm-transactional-cls-hooked';

@Injectable()
export class StudentAssignationService {
  constructor(
    private readonly studentRepository: StudentRepository,
    private readonly shiftRepository: ShiftRepository,
    private readonly gradeRepository: GradeRepository,
    private readonly schoolYearRepository: SchoolYearRepository,
    private readonly sectionDetailRepository: SectionDetailRepository,
    private readonly behavioralHistoryRepository: BehavioralHistoryRepository,
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
      this.studentRepository.getStudentsAssignation(currentShift, currentGrade),
      await this.validateTeacherAssignation(currentShiftId, currentGradeId, userId),
    ]);

    const studentsWithoutAssignation: StudentsAssignation[] = [];
    const assignedStudents: StudentsAssignation[] = [];
    const myStudents: StudentsAssignation[] = [];
    studentsAssignation.forEach(student => {
      student.sectionDetails.sort((a, b) => a.id - b.id);
      const mappedStudent: StudentsAssignation = {
        ...student,
        status: EStudentStatus[student.status],
        section: student.sectionDetails.slice(-1)[0]?.section,
      };

      const studentSchoolYearAssignation = student.sectionDetails.slice(-1)[0]?.gradeDetail.cycleDetail.schoolYear;
      if (!student.sectionDetails.length || studentSchoolYearAssignation?.id !== currentAssignation.id) {
        studentsWithoutAssignation.push(mappedStudent);
      } else if (student.sectionDetails.slice(-1)[0].teacher?.id !== userId) {
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

  @Transactional()
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
      this.studentRepository.getStudentsAssignation(currentShift, currentGrade),
      await this.validateTeacherAssignation(currentShiftId, currentGradeId, userId),
    ]);

    const sectionDetail = schoolYearAssignation.cycleDetails[0].gradeDetails[0].sectionDetails[0];
    if (vinculate) {
      const studentsWithoutAssignation: Student[] = [];
      studentsAssignation.forEach(student => {
        const studentSchoolYearAssignation = student.sectionDetails[0]?.gradeDetail.cycleDetail.schoolYear;
        if (!student.sectionDetails.length || studentSchoolYearAssignation?.id !== currentAssignation.id) {
          studentsWithoutAssignation.push(student);
        }
      });
      const students = studentsWithoutAssignation.filter(student => studentIds.includes(student.id));
      sectionDetail.students = [...sectionDetail.students, ...students];
      await this.sectionDetailRepository.save(sectionDetail);

      const activeBehavioralHistories = await this.behavioralHistoryRepository.getActiveBehavioralHistories(studentIds);
      const mappedBehavioralHistories = activeBehavioralHistories.map(bHistory => ({
        ...bHistory,
        sectionDetailId: sectionDetail,
      }));

      await this.behavioralHistoryRepository.save(mappedBehavioralHistories);
    } else {
      const studentsIdsToRemove = studentIds.join();
      await this.studentRepository.query(
        `DELETE FROM student_section_detail ` +
          `WHERE section_detail_id = ${sectionDetail.id}` +
          ` AND student_id IN (${studentsIdsToRemove})`,
      );
    }
  }
}
