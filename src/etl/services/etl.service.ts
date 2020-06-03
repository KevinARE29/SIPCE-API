/* eslint-disable no-console */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IAuthenticatedUser } from '@users/interfaces/users.interface';
import { createConnection } from 'mysql';
import { Client } from 'pg';
import { Cron } from '@nestjs/schedule';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const datapumps = require('datapumps');

@Injectable()
export class EtlService {
  originUser!: string;

  originPass!: string;

  originHost!: string;

  originDb!: string;

  destUser!: string;

  destPass!: string;

  destHost!: string;

  destDb!: string;

  constructor(private readonly configService: ConfigService) {
    this.originUser = configService.get('SNM_USERNAME') || '';
    this.originPass = configService.get('SNM_PASSWORD') || '';
    this.originHost = configService.get('SNM_HOST') || '';
    this.originDb = configService.get('SNM_DATABASE') || '';
    this.destUser = configService.get('TYPEORM_USERNAME') || '';
    this.destPass = configService.get('TYPEORM_PASSWORD') || '';
    this.destHost = configService.get('TYPEORM_HOST') || '';
    this.destDb = configService.get('TYPEORM_DATABASE') || '';
  }

  // Second|Minute|Hour|Day of Month|Month|Day of Week
  @Cron('30 30 12 15 * *')
  async syncStudents(user: IAuthenticatedUser): Promise<void> {
    const { Pump } = datapumps;
    const pump = new Pump();
    // Extract
    const mysqlConnection = createConnection(
      `mysql://${this.originUser}:${this.originPass}@${this.originHost}/${this.originDb}`,
    )
      .query('SELECT * from roles')
      .stream();

    const { PostgresqlMixin } = datapumps.mixin;
    const postgresqlClient = new Client(
      `postgresql://${this.destUser}:${this.destPass}@${this.destHost}/${this.destDb}`,
    );
    postgresqlClient.connect();

    pump
      .from(mysqlConnection)
      .mixin(PostgresqlMixin(postgresqlClient))
      .process(async (role: any) => {
        console.log('From Origin DB', role);
        await pump.query(`SELECT * FROM role WHERE id = ${role.role_id}`).then((res: any) => {
          // Transform
          console.log('From Destination DB', res.rows[0]);
          // Load
          if (res.rowCount) {
            if (role.nombre !== res.rows[0].name) {
              pump.query(`UPDATE role SET name = '${role.nombre}' WHERE id = ${role.role_id}`);
              console.log('UPDATE');
            }
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
