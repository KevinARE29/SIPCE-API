import { Injectable } from '@nestjs/common';
import {
  EFREQ,
  TFREQ,
  EBYDAY,
  TBYDAY,
  EBYMONTH,
  EBYSETPOS,
  TBYSETPOS,
} from '@schedules/constants/event-series.constants';
import * as moment from 'moment';

moment.locale('es-us');

@Injectable()
export class EventMapper {
  private toInterval(value: number, freq: string): string {
    return `Repetir cada ${value} ${freq}`;
  }

  private toUntil(until: string): string {
    const untilDate = moment(until).format('LLL');
    return `Repetir hasta ${untilDate}`;
  }

  private toCount(count: number): string {
    return `Repetir ${count} veces`;
  }

  private toByDay(byDay: string): string {
    const daysArray = byDay.split(',');
    const daysString = daysArray.reduce((acum, day, index) => {
      if (!index) {
        return `${EBYDAY[(day as unknown) as TBYDAY]}`;
      }
      return `${acum}, ${EBYDAY[(day as unknown) as TBYDAY]}`;
    }, '');
    return `Repetir en los días ${daysString} de cada semana`;
  }

  private toByMonthDay(day: number): string {
    return `Repetir el día ${day} de cada mes`;
  }

  private toByMonth(byMonth: number): string {
    const month = EBYMONTH[byMonth];
    return `Repetir en el mes ${month} de cada año`;
  }

  private toBySetpos(byDay: string, setpos: string): string {
    const day = EBYDAY[(byDay as unknown) as TBYDAY];
    const pos = EBYSETPOS[(setpos as unknown) as TBYSETPOS];
    return `Repetir el ${pos} ${day} del mes`;
  }

  public toString(recurrenceRule: string): string[] {
    const rules = recurrenceRule.slice(0, -1).split(';');
    const recurrence: Record<string, string> = {};
    rules.forEach(rule => {
      const [key, value] = rule.split('=');
      recurrence[key] = value;
    });

    const { FREQ, INTERVAL, UNTIL, COUNT, BYDAY, BYMONTHDAY, BYMONTH, BYSETPOS } = recurrence;

    const seriesData: string[] = [];
    const frecuence = EFREQ[(FREQ as unknown) as TFREQ];
    seriesData.push(`${this.toInterval(+INTERVAL, frecuence)}`);

    if (UNTIL) {
      seriesData.push(`${this.toUntil(UNTIL)}`);
    }

    if (COUNT) {
      seriesData.push(`${this.toCount(+COUNT)}`);
    }

    if (BYDAY && !BYSETPOS) {
      seriesData.push(`${this.toByDay(BYDAY)}`);
    }

    if (BYMONTHDAY) {
      seriesData.push(`${this.toByMonthDay(+BYMONTHDAY)}`);
    }

    if (BYMONTH) {
      seriesData.push(`${this.toByMonth(+BYMONTH)}`);
    }

    if (BYSETPOS && BYDAY) {
      seriesData.push(`${this.toBySetpos(BYDAY, BYSETPOS)}`);
    }

    return seriesData;
  }
}
