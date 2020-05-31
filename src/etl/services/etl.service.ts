/* eslint-disable no-console */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IAuthenticatedUser } from '@users/interfaces/users.interface';
import { createConnection } from 'mysql';
import { Client } from 'pg';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const datapumps = require('datapumps');

@Injectable()
export class EtlService {
  constructor(private readonly configService: ConfigService) {}

  async syncStudents(user: IAuthenticatedUser): Promise<void> {
    const { Pump } = datapumps;
    const pump = new Pump();
    const mysqlConnection = createConnection('mysql://kevin:K4R3473@localhost/sahoja_local')
      .query('SELECT * from roles')
      .stream();
    const { PostgresqlMixin } = datapumps.mixin;
    const postgresqlClient = new Client('postgresql://kevin:admin123@localhost/SipceDB');
    postgresqlClient.connect();

    pump
      .from(mysqlConnection)
      .mixin(PostgresqlMixin(postgresqlClient))
      .process(async (role: any) => {
        console.log('ENTRA', role);
        await pump.query(`SELECT * FROM role WHERE id = ${role.ROLE_ID}`).then((res: any) => {
          console.log(res.rows[0]);
          if (res.rowCount) {
            console.log('UPDATE EXISTING');
          } else {
            console.log('INSERT NEW');
          }
        });
      })
      .logErrorsToConsole()
      .run()
      .then(() => {
        console.log('ETL execution completed');
      });
  }
}
