export function getSortOptions(...options: string[]): string[] {
  return options.reduce((acc, opt) => {
    return acc.concat([`${opt}-asc`, `${opt}-desc`]);
  }, [] as Array<string>);
}

export function getSortOptionsMap(defaultTable: string, sortOptions: string[]): Map<string, any> {
  return sortOptions.reduce((acum, element) => {
    const [property, sort] = element.split('-');
    const field = `${defaultTable}.${property}`;
    if (sort === 'asc') {
      return acum.set(element, { [field]: 'ASC' });
    }
    return acum.set(element, { [field]: 'DESC' });
  }, new Map());
}

export function getOrderBy(sort: string, sortOptionsMap: Map<string, any>) {
  return sort.split(',').reduce((acum, sortItem) => {
    const orderOption = sortOptionsMap.get(sortItem);
    return { ...acum, ...orderOption };
  }, {});
}

// TODO: Refactor all Filters DTOs to use this v2
export function getSortOptionsv2(
  options: string[],
  defaultTable: string,
): [string[], Map<string, Record<string, any>>] {
  const sortOptions: string[] = [];
  const sortOptionsMap: Map<string, Record<string, any>> = new Map();
  options.forEach(option => {
    const [attr, table] = option.split('.').reverse();
    sortOptions.push(`${attr}-asc`, `${attr}-desc`);
    sortOptionsMap.set(`${attr}-asc`, { [`${table || defaultTable}.${attr}`]: 'ASC' });
    sortOptionsMap.set(`${attr}-desc`, { [`${table || defaultTable}.${attr}`]: 'DESC' });
  });

  return [sortOptions, sortOptionsMap];
}
