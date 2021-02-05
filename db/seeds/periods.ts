import { Seeder, Factory } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { PeriodRepository } from '@academics/repositories';

const periodsToInsert = [
  { id: 1, name: 'Primer Periodo', active: true },
  { id: 2, name: 'Segundo Periodo', active: true },
  { id: 3, name: 'Tercer Periodo', active: true },
  { id: 4, name: 'Cuarto Periodo', active: true },
];

export default class CreatePeriods implements Seeder {
  async run(factory: Factory, connection: Connection): Promise<void> {
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    const periodRepository = connection.getCustomRepository(PeriodRepository);
    const periods = await periodRepository.find();
    const dbPeriodNames = periods.map(period => period.name);
    const filteredPeriods = periodsToInsert.filter(periodToInsert => !dbPeriodNames.includes(periodToInsert.name));

    if (filteredPeriods.length) {
      await Promise.all(
        filteredPeriods.map(async period => {
          console.log(`\nInserting period ${period.name}`);
          await queryRunner.query(
            `INSERT INTO "public"."period" (id, name, active) VALUES (${period.id}, '${period.name}', ${period.active});`,
          );
        }),
      );
      await queryRunner.query(`ALTER SEQUENCE period_id_seq RESTART WITH ${periodsToInsert.length + 1};`);
    } else {
      console.log('\nAll periods were inserted already');
    }
  }
}
