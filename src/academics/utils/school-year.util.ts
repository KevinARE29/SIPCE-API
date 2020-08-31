/* eslint-disable no-param-reassign */
import { plainToClass } from 'class-transformer';
import { CycleDetail } from '@academics/docs/cycle-detail.doc';
import { ClassType } from 'class-transformer/ClassTransformer';

export function mapCycleDetails(classToMap?: ClassType<unknown>): any {
  return (result: any, item: CycleDetail) => {
    if (result[item.shift.id]) {
      result[item.shift.id].push(
        plainToClass(classToMap || CycleDetail, item, {
          excludeExtraneousValues: true,
        }),
      );
    } else {
      result[item.shift.id] = [
        plainToClass(classToMap || CycleDetail, item, {
          excludeExtraneousValues: true,
        }),
      ];
    }
    return result;
  };
}
