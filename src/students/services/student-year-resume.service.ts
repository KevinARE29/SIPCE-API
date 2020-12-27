import { Injectable } from '@nestjs/common';
import { StudentRepository } from '@students/repositories/student.repository';
import { StudentYearResumeFilterDto } from '@students/dtos/student-year-resume-filter.dto';
import { EStudentStatus } from '@students/constants/student.constant';
import { StudentSchoolYearProgressResponse } from '@students/docs/student-school-year-progress-response.doc';
import { plainToClass } from 'class-transformer';
import { StudentBehavioralHistory } from '@students/docs/student-behavioral-history.doc';
import { expedientFinalConclusionAlert } from '@expedient/utils/expedient.util';

@Injectable()
export class StudentYearResumeService {
  constructor(private readonly studentRepository: StudentRepository) {}

  async getStudentsBehavioralHistoryResume(
    studentYearResumeFilterDto: StudentYearResumeFilterDto,
    counselorId: number,
  ): Promise<StudentSchoolYearProgressResponse> {
    const students = await this.studentRepository.getStudentsBehavioralHistoryInformation(
      counselorId,
      studentYearResumeFilterDto,
    );
    let completedBehavioralHistories = 0;
    students.forEach(student => {
      if (student.behavioralHistorys.length) {
        student.behavioralHistorys.sort((a, b) => {
          return b.createdAt.getTime() - a.createdAt.getTime();
        });
      }
      if (student.behavioralHistorys.length && student.behavioralHistorys[0].finalConclusion) {
        completedBehavioralHistories += 1;
      }
    });
    const formattedStudents = students
      .filter(student => student.behavioralHistorys.length)
      .map(student => ({
        ...student,
        status: EStudentStatus[student.status],
        behavioralHistory: student.behavioralHistorys[0],
        expedientAlert: expedientFinalConclusionAlert(
          student.expedients,
          student.behavioralHistorys[0].sectionDetailId?.gradeDetail.grade.name,
          student.behavioralHistorys[0].sectionDetailId?.gradeDetail.cycleDetail.schoolYear.year,
        ),
      }));
    const progress = formattedStudents.length
      ? Math.round((completedBehavioralHistories / formattedStudents.length) * 100)
      : 0;
    let closedSection;
    if (studentYearResumeFilterDto.currentGrade && formattedStudents.length) {
      closedSection = formattedStudents[0].behavioralHistorys[0].sectionDetailId?.closed;
    }
    return {
      data: {
        students: plainToClass(StudentBehavioralHistory, formattedStudents, { excludeExtraneousValues: true }),
        progress,
        closedSection,
      },
    };
  }
}
