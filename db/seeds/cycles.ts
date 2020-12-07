import { Seeder, Factory } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { CycleRepository } from '@academics/repositories';

const cyclesToInsert = [
  { id: 1, name: 'Primer Ciclo' },
  { id: 2, name: 'Segundo Ciclo' },
  { id: 3, name: 'Tercer Ciclo' },
  { id: 4, name: 'Parvularia' },
];

export default class CreateCycles implements Seeder {
  async run(factory: Factory, connection: Connection): Promise<void> {
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    const cycleRepository = connection.getCustomRepository(CycleRepository);
    const cycles = await cycleRepository.find();
    const dbCyclesNames = cycles.map(cycle => cycle.name);
    const filteredCycles = cyclesToInsert.filter(cycleToInsert => !dbCyclesNames.includes(cycleToInsert.name));

    if (filteredCycles.length) {
      await Promise.all(
        filteredCycles.map(async cycle => {
          console.log(`\nInserting cycle ${cycle.name}`);
          await queryRunner.query(`INSERT INTO "public"."cycle" (id, name) VALUES (${cycle.id}, '${cycle.name}');`);
        }),
      );
      await queryRunner.query(`ALTER SEQUENCE cycle_id_seq RESTART WITH ${cyclesToInsert.length + 1};`);
    } else {
      console.log('\nAll cycles were inserted already');
    }
  }
}
