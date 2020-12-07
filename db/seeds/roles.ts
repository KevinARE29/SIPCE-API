import { Seeder, Factory } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { RoleRepository } from '@auth/repositories';

const rolesToInsert = [
  { id: 1, name: 'Administrador' },
  { id: 2, name: 'Director' },
  { id: 3, name: 'Coordinador de Ciclo' },
  { id: 4, name: 'Orientador' },
  { id: 5, name: 'Docente' },
  { id: 6, name: 'Secretaria' },
  { id: 7, name: 'Docente auxiliar' },
];

export default class CreateRoles implements Seeder {
  async run(factory: Factory, connection: Connection): Promise<void> {
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    const roleRepository = connection.getCustomRepository(RoleRepository);
    const roles = await roleRepository.find();
    const dbRolesNames = roles.map(role => role.name);
    const filteredRoles = rolesToInsert.filter(roleToInsert => !dbRolesNames.includes(roleToInsert.name));

    if (filteredRoles.length) {
      await Promise.all(
        filteredRoles.map(async role => {
          console.log(`\nInserting role ${role.name}`);
          await queryRunner.query(`INSERT INTO "public"."role" (id, name) VALUES (${role.id}, '${role.name}');`);
        }),
      );
      await queryRunner.query(`ALTER SEQUENCE role_id_seq RESTART WITH ${rolesToInsert.length + 1};`);
    } else {
      console.log('\nAll roles were inserted already');
    }
  }
}
