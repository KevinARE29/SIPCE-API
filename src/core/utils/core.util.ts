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
