import { Injectable, ForbiddenException } from '@nestjs/common';
import { StudentRepository } from '@students/repositories/student.repository';
import { StudentAssignationFilterDto } from '@students/dtos/student-assignation-filter.dto';
import { ShiftRepository } from '@academics/repositories/shift.repository';
import { GradeRepository } from '@academics/repositories/grade.repository';
import { SchoolYearRepository } from '@academics/repositories/school-year.repository';
import { Student } from '@students/entities/student.entity';
import { Students as StudentsDoc } from '@students/docs/students.doc';
import { plainToClass } from 'class-transformer';

@Injectable()
export class StudentAssignationService {
  constructor(
    private readonly studentRepository: StudentRepository,
    private readonly shiftRepository: ShiftRepository,
    private readonly gradeRepository: GradeRepository,
    private readonly schoolYearRepository: SchoolYearRepository,
  ) {}

  async getStudentsAssignation(userId: number, studentAssignationFilterDto: StudentAssignationFilterDto): Promise<any> {
    const { currentShiftId, currentGradeId } = studentAssignationFilterDto;
    const [currentShift, currentGrade, currentAssignation] = await Promise.all([
      this.shiftRepository.getShiftByIdOrThrow(currentShiftId),
      this.gradeRepository.getGradeByIdOrThrow(currentGradeId),
      this.schoolYearRepository.getCurrentAssignationOrThrow({}),
    ]);

    const assignedTeacher = await this.schoolYearRepository.getCurrentAssignation({
      shiftId: currentShiftId,
      gradeId: currentGradeId,
      teacherId: userId,
    });

    if (!assignedTeacher) {
      throw new ForbiddenException('Usuario no es docente en el turno y grado específicado');
    }

    const studentsAssignation = await this.studentRepository.getStudentsAssignation(
      currentShift,
      currentGrade,
      currentAssignation,
    );

    const studentsWithoutAssignation: Student[] = [];
    const assignedStudents: Student[] = [];
    const myStudents: Student[] = [];

    studentsAssignation.forEach(student => {
      if (!student.sectionDetails.length) {
        studentsWithoutAssignation.push(student);
      } else if (student.sectionDetails[0].teacher.id !== userId) {
        assignedStudents.push(student);
      } else {
        myStudents.push(student);
      }
    });

    return {
      studentsWithoutAssignation: plainToClass(StudentsDoc, studentsWithoutAssignation, {
        excludeExtraneousValues: true,
      }),
      assignedStudents: plainToClass(StudentsDoc, assignedStudents, { excludeExtraneousValues: true }),
      myStudents: plainToClass(StudentsDoc, myStudents, { excludeExtraneousValues: true }),
    };
  }
}
