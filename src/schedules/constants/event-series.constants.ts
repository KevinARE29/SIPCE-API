export const EFREQ = {
  DAILY: 'días',
  WEEKLY: 'semanas',
  MONTHLY: 'meses',
  YEARLY: 'años',
};

export type TFREQ = keyof typeof EFREQ;

export enum EBYDAY {
  SU = 'domingo',
  MO = 'lunes',
  TU = 'martes',
  WE = 'miércoles',
  TH = 'jueves',
  FR = 'viernes',
  SA = 'sábado',
}

export type TBYDAY = keyof typeof EBYDAY;

export enum EBYMONTH {
  enero = 1,
  febrero,
  marzo,
  abril,
  mayo,
  junio,
  julio,
  agosto,
  septiembre,
  octubre,
  noviembre,
  diciembre,
}

export enum EBYSETPOS {
  primer = 1,
  segundo = 2,
  tercer = 3,
  cuarto = 4,
  último = -1,
}

export type TBYSETPOS = keyof typeof EBYSETPOS;
