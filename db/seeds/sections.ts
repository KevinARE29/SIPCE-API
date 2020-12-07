import { Seeder, Factory } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { SectionRepository } from '@academics/repositories';

const sectionsToInsert = [
  { id: 1, name: 'A' },
  { id: 2, name: 'B' },
  { id: 3, name: 'C' },
  { id: 4, name: 'D' },
  { id: 5, name: 'E' },
  { id: 6, name: 'General' },
];

export default class CreateSections implements Seeder {
  async run(factory: Factory, connection: Connection): Promise<void> {
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    const sectionRepository = connection.getCustomRepository(SectionRepository);
    const sections = await sectionRepository.find();
    const dbSectionsNames = sections.map(section => section.name);
    const filteredSections = sectionsToInsert.filter(
      sectionToInsert => !dbSectionsNames.includes(sectionToInsert.name),
    );

    if (filteredSections.length) {
      await Promise.all(
        filteredSections.map(async section => {
          console.log(`\nInserting section ${section.name}`);
          await queryRunner.query(
            `INSERT INTO "public"."section" (id, name) VALUES (${section.id}, '${section.name}');`,
          );
        }),
      );
      await queryRunner.query(`ALTER SEQUENCE section_id_seq RESTART WITH ${sectionsToInsert.length + 1};`);
    } else {
      console.log('\nAll sections were inserted already');
    }
  }
}
