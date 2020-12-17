import { Expedient } from '@expedient/entities/expedient.entity';

export function expedientFinalConclusionAlert(
  expedients: Expedient[],
  grade: string | undefined,
  year: number | undefined,
): boolean {
  const filteredExpedients = expedients
    .filter(
      expedient =>
        expedient.gradeDetail.grade.name === grade && expedient.gradeDetail.cycleDetail.schoolYear.year === year,
    )
    .sort((a, b) => {
      return b.createdAt.getTime() - a.createdAt.getTime();
    });
  return !filteredExpedients[0].finalConclusion;
}
