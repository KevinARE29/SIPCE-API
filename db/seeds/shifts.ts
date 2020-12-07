import { Seeder, Factory } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { ShiftRepository } from '@academics/repositories';

const shiftsToInsert = [
  { id: 1, name: 'Mañana', active: true },
  { id: 2, name: 'Tarde', active: true },
  { id: 3, name: 'Nocturno', active: true },
  { id: 4, name: 'Mixto', active: true },
  { id: 5, name: 'Tiempo Completo', active: true },
];

export default class CreateShifts implements Seeder {
  async run(factory: Factory, connection: Connection): Promise<void> {
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    const shiftRepository = connection.getCustomRepository(ShiftRepository);
    const shifts = await shiftRepository.find();
    const dbShiftsNames = shifts.map(shift => shift.name);
    const filteredShifts = shiftsToInsert.filter(shiftToInsert => !dbShiftsNames.includes(shiftToInsert.name));

    if (filteredShifts.length) {
      await Promise.all(
        filteredShifts.map(async shift => {
          console.log(`\nInserting shift ${shift.name}`);
          await queryRunner.query(
            `INSERT INTO "public"."shift" (id, name, active) VALUES (${shift.id}, '${shift.name}', ${shift.active});`,
          );
        }),
      );
      await queryRunner.query(`ALTER SEQUENCE shift_id_seq RESTART WITH ${shiftsToInsert.length + 1};`);
    } else {
      console.log('\nAll shifts were inserted already');
    }
  }
}
