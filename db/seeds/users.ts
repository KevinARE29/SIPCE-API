import { Seeder, Factory } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { UserRepository } from '@users/repositories/users.repository';

const usersToInsert = [
  {
    id: 1,
    username: 'administrador',
    password: '$2b$10$aTL4ZvBBNV56cpgXy8Cr4eL.kababx9LZgliCebSMQgSqzOam0ZRO',
    email: 'administrador@gmail.com',
    firstname: 'Administrador',
    lastname: 'Sistema',
    active: true,
    code: 'admin01',
  },
];

export default class CreateUsers implements Seeder {
  async run(factory: Factory, connection: Connection): Promise<void> {
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    const userRepository = connection.getCustomRepository(UserRepository);
    const users = await userRepository.find();
    const dbUsersUserNames = users.map(user => user.username);
    const filteredUsers = usersToInsert.filter(userToInsert => !dbUsersUserNames.includes(userToInsert.username));

    if (filteredUsers.length) {
      await Promise.all(
        filteredUsers.map(async user => {
          console.log(`\nInserting user ${user.username}`);
          await queryRunner.query(
            `INSERT INTO "public"."user" (id, username, password, email, firstname, lastname, active, code) VALUES (${user.id}, '${user.username}', '${user.password}', '${user.email}', '${user.firstname}', '${user.lastname}', ${user.active}, '${user.code}');`,
          );
        }),
      );
      await queryRunner.query(`ALTER SEQUENCE user_id_seq RESTART WITH ${usersToInsert.length + 1};`);
    } else {
      console.log('\nAll users were inserted already');
    }
  }
}
