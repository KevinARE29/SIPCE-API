export const JOBS_QUEUE = 'jobs';
export const PDF_JOB = 'pdf';

export enum EReportName {
  BITACORA_ENTREVISTA = 'Bitácora de entrevista con padres de familia',
  EXPEDIENTE_PSICOLÓGICO = 'Expediente psicológico',
  HISTORIAL_ACADÉMICO_CONDUCTUAL = 'Historial académico y conductual',
  PRUEBA_SOCIOMÉTRICA = 'Prueba sociométrica',
}

export type TReportName = keyof typeof EReportName;
export const reportNameKeys = Object.values(EReportName).filter(key => typeof key === 'string');
export type TReportNameValues = typeof EReportName[TReportName];
