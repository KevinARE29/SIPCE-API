import { BehavioralHistory } from '@history/entities/behavioral-history.entity';
import { ClassDiary } from '@history/entities/class-diary.entity';
import { FoulSanctionAssignation } from '@history/entities/foul-sanction-assignation.entity';
import { Expedient } from '@expedient/entities/expedient.entity';
import { MinimalSyncedExpedientData } from '@history/docs/minimal-synced-expedient-data.doc';

export function getStudentBehavioralHistoriesCounters(behavioralHistories: BehavioralHistory[]): any {
  const allAnnotations: ClassDiary[] = [];
  const allSanctions: FoulSanctionAssignation[] = [];
  behavioralHistories.map(behavioralHistory => {
    if (behavioralHistory.classDiarys.length) {
      allAnnotations.push(...behavioralHistory.classDiarys);
    }
  });
  behavioralHistories.map(behavioralHistory => {
    if (behavioralHistory.foulSanctionAssignations.length) {
      allSanctions.push(...behavioralHistory.foulSanctionAssignations);
    }
  });
  const filteredAnnotations = allAnnotations.filter(annotation => !annotation.deletedAt);
  const filteredSanctions = allSanctions.filter(foul => !foul.deletedAt);
  return {
    annotationsCounter: filteredAnnotations.length,
    sanctionsCounter: filteredSanctions.length,
  };
}

export function syncWithStudentExpedients(
  expedients: Expedient[],
  grade: string | undefined,
  year: number | undefined,
): MinimalSyncedExpedientData[] {
  const filteredExpedients = expedients.filter(
    expedient =>
      expedient.gradeDetail.grade.name === grade && expedient.gradeDetail.cycleDetail.schoolYear.year === year,
  );
  const depuredData = filteredExpedients.map(expedient => ({
    finalConclusion: expedient.finalConclusion,
    author: `${expedient.gradeDetail.counselor.firstname} ${expedient.gradeDetail.counselor.lastname}`,
    grade: `${expedient.gradeDetail.grade.name} ${expedient.gradeDetail.cycleDetail.schoolYear.year}`,
  }));
  return depuredData;
}
