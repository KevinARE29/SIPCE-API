import { QueryFailedError } from 'typeorm';
import { ITypeOrmQueryFailed } from '@core/interfaces/exception-response.interface';
import { snakeToCamel } from '@core/utils/core.util';

export function bulkCatchMessage(err: any): string {
  let msg = 'all: No se pudo insertar el registro';
  if (err instanceof QueryFailedError) {
    // Mapping the TypeORM exception
    const { detail, routine } = (err as unknown) as ITypeOrmQueryFailed;
    if (routine === '_bt_check_unique') {
      // This happens when a unique constraint in the DB fails
      const property = detail.match(/Key [(](?<key>[a-z_, ]+)[)]/)?.groups?.key as string;
      msg = `${snakeToCamel(property)}: Ya existe un registro con ese valor`;
    }
  }
  return msg;
}
