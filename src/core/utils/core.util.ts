import _ = require('lodash');

export const snakeToCamel = (str: string) =>
  str.replace(/([-_][a-z])/g, group =>
    group
      .toUpperCase()
      .replace('-', '')
      .replace('_', ''),
  );

export function getEntityMap<T, K extends keyof T>(key: K, entities: T[]): Map<string | number, T> {
  return entities.reduce((acum, entity) => {
    return acum.set(entity[key], entity);
  }, new Map());
}

export const objectToCamel = (obj: any) =>
  _.transform(obj, (acc: any, value, key, target) => {
    const camelKey = _.isArray(target) ? key : _.camelCase(`${key}`);
    acc[camelKey] = _.isObject(value) ? objectToCamel(value) : value;
  });
