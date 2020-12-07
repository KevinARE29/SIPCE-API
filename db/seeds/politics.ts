import { Seeder, Factory } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { PoliticRepository } from '@auth/repositories';

const politicsToInsert = [
  {
    id: 1,
    minLength: 10,
    capitalLetter: true,
    lowerCase: true,
    specialChart: false,
    numericChart: true,
    typeSpecial: '$#%',
  },
];

export default class CreatePolitics implements Seeder {
  async run(factory: Factory, connection: Connection): Promise<void> {
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    const politicRepository = connection.getCustomRepository(PoliticRepository);
    const politics = await politicRepository.find();
    const dbPoliticIds = politics.map(politic => politic.id);
    const filteredPolitics = politicsToInsert.filter(politicToInsert => !dbPoliticIds.includes(politicToInsert.id));

    if (filteredPolitics.length) {
      console.log(`\nInserting politics`);
      await Promise.all(
        filteredPolitics.map(async politic => {
          await queryRunner.query(
            `INSERT INTO "public"."politic" (id, min_length, capital_letter, lower_case, special_char, numeric_char, type_special ) VALUES (${politic.id}, ${politic.minLength}, ${politic.capitalLetter}, ${politic.lowerCase}, ${politic.specialChart}, ${politic.numericChart}, '${politic.typeSpecial}');`,
          );
        }),
      );
      await queryRunner.query(`ALTER SEQUENCE politic_id_seq RESTART WITH ${politicsToInsert.length + 1};`);
    } else {
      console.log('\nAll politics were inserted already');
    }
  }
}
