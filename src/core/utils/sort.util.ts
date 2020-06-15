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
