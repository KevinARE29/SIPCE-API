import { Seeder, Factory } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { GradeRepository } from '@academics/repositories';

const gradesToInsert = [
  { id: 1, name: 'Kínder 4', active: true },
  { id: 2, name: 'Kínder 5', active: true },
  { id: 3, name: 'Preparatoria', active: true },
  { id: 4, name: 'Primero', active: true },
  { id: 5, name: 'Segundo', active: true },
  { id: 6, name: 'Tercero', active: true },
  { id: 7, name: 'Cuarto', active: true },
  { id: 8, name: 'Quinto', active: true },
  { id: 9, name: 'Sexto', active: true },
  { id: 10, name: 'Séptimo', active: true },
  { id: 11, name: 'Octavo', active: true },
  { id: 12, name: 'Noveno', active: true },
  { id: 13, name: 'Primero Bachillerato', active: true },
  { id: 14, name: 'Segundo Bachillerato', active: true },
  { id: 15, name: 'Tercero Bachillerato', active: true },
];

export default class CreateGrades implements Seeder {
  async run(factory: Factory, connection: Connection): Promise<void> {
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    const gradeRepository = connection.getCustomRepository(GradeRepository);
    const grades = await gradeRepository.find();
    const dbGradesNames = grades.map(grade => grade.name);
    const filteredGrades = gradesToInsert.filter(gradeToInsert => !dbGradesNames.includes(gradeToInsert.name));

    if (filteredGrades.length) {
      await Promise.all(
        filteredGrades.map(async grade => {
          console.log(`\nInserting grade ${grade.name}`);
          await queryRunner.query(
            `INSERT INTO "public"."grade" (id, name, active) VALUES (${grade.id}, '${grade.name}', ${grade.active});`,
          );
        }),
      );
      await queryRunner.query(`ALTER SEQUENCE grade_id_seq RESTART WITH ${gradesToInsert.length + 1};`);
    } else {
      console.log('\nAll grades were inserted already');
    }
  }
}
