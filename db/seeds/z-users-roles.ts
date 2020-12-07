import { Seeder, Factory } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { UserRepository } from '@users/repositories/users.repository';
import { RoleRepository } from '@auth/repositories';

const usersRoles = [
  {
    id: 1,
    roles: [1],
  },
];

export default class AssignUsersRoles implements Seeder {
  async run(factory: Factory, connection: Connection): Promise<void> {
    const userRepository = connection.getCustomRepository(UserRepository);
    const roleRepository = connection.getCustomRepository(RoleRepository);
    await Promise.all(
      usersRoles.map(async user => {
        const savedUser = await userRepository.findByIdOrThrow(user.id);
        const roles = await roleRepository.findRoles(user.roles);

        console.log(`\nUpdating ${savedUser.username} roles`);
        savedUser.roles = roles;
        await userRepository.save(savedUser);
      }),
    );
  }
}
