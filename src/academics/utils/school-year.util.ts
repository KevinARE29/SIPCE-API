/* eslint-disable no-param-reassign */
import { plainToClass } from 'class-transformer';
import { CycleDetail } from '@academics/docs/cycle-detail.doc';

export function mapCycleDetails(result: any, item: CycleDetail): any {
  if (result[item.shift.id]) {
    result[item.shift.id].push(
      plainToClass(CycleDetail, item, {
        excludeExtraneousValues: true,
      }),
    );
  } else {
    result[item.shift.id] = [
      plainToClass(CycleDetail, item, {
        excludeExtraneousValues: true,
      }),
    ];
  }
  return result;
}
