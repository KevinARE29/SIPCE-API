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
      const groups = detail.match(/Key [(](?<key>[A-Za-z0-9_, ]+)[)]=[(](?<value>[A-Za-z0-9\-_,@. ]+)/)?.groups;
      const key = groups && groups.key;
      const value = groups && groups.value;
      if (key && value) {
        msg = `${snakeToCamel(key)}: Ya existe un registro con el valor ${value}`;
      }
    }
  }
  return msg;
}
