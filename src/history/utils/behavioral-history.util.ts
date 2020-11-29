import { BehavioralHistory } from '@history/entities/behavioral-history.entity';
import { ClassDiary } from '@history/entities/class-diary.entity';
import { FoulSanctionAssignation } from '@history/entities/foul-sanction-assignation.entity';

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
