export function isInReadOnlyPeriods(periodId: number): boolean {
  return periodId <= 3;
}
