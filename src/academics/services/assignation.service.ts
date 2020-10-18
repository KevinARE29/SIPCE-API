import { TCounselorAssignation } from '@academics/constants/academic.constants';
import { CycleDetail } from '@academics/entities/cycle-detail.entity';
import { SchoolYearRepository } from '@academics/repositories/school-year.repository';
import { mapCycleDetails } from '@academics/utils/school-year.util';
import { Injectable } from '@nestjs/common';
import { MyGradesAssignation } from '@users/docs/my-profile/my-grades-assignation.doc';

@Injectable()
export class AssignationService {
  constructor(private readonly schoolYearRepository: SchoolYearRepository) {}

  async getCounselorAssignation(counselorId: number): Promise<TCounselorAssignation> {
    const counselorCurrentAssignation = await this.schoolYearRepository.getCurrentAssignation({ counselorId });

    if (!counselorCurrentAssignation) {
      return;
    }

    const counselorAssignation = counselorCurrentAssignation.cycleDetails.reduce(
      mapCycleDetails(MyGradesAssignation),
      {} as any,
    );

    return Object.entries(counselorAssignation).map(([shiftId, cyclesAssignation]: [string, CycleDetail[]]) => ({
      shiftId: +shiftId,
      grades: cyclesAssignation
        .map((cDetail: CycleDetail) => cDetail.gradeDetails.map(gDetail => gDetail.grade.id))
        .flat(),
    }));
  }
}
