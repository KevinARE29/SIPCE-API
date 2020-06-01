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
    // Extraction
    const mysqlConnection = createConnection('mysql://sql9344499:ntdfgG62z4@sql9.freemysqlhosting.net/sql9344499')
      .query('SELECT * from roles')
      .stream();
    const { PostgresqlMixin } = datapumps.mixin;
    const postgresqlClient = new Client('postgresql://kevin:admin123@localhost/SipceDB');
    postgresqlClient.connect();

    pump
      .from(mysqlConnection)
      .mixin(PostgresqlMixin(postgresqlClient))
      .process(async (role: any) => {
        console.log('From Origin DB', role);
        await pump.query(`SELECT * FROM role WHERE id = ${role.role_id}`).then((res: any) => {
          // Transformation
          console.log('From Destination DB', res.rows[0]);
          // Load
          if (res.rowCount) {
            pump.query(`UPDATE role SET name = '${role.nombre}' WHERE id = ${role.role_id}`);
          } else {
            pump.query(`INSERT INTO role (id, name) VALUES (${role.role_id}, '${role.nombre}')`);
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
