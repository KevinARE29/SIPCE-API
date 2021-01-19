import { EntityRepository, Repository } from 'typeorm';
import { Preset } from '@sociometrics/entities/preset.entity';
import { SociometricTestPresetIdDto } from '@sociometrics/dtos/sociometric-test-preset-ids.dto';
import { NotFoundException } from '@nestjs/common';

@EntityRepository(Preset)
export class PresetRepository extends Repository<Preset> {
  async findPresetOrFail(sociometricTestPresetIdDto: SociometricTestPresetIdDto): Promise<Preset> {
    const { presetId, sociometricTestId } = sociometricTestPresetIdDto;
    const preset = await this.findOne(presetId, {
      where: { deletedAt: null, sociometricTest: { id: sociometricTestId } },
    });
    if (!preset) {
      throw new NotFoundException('La programación de la prueba no fue encontrada');
    }
    return preset;
  }

  async findPresetByPasswordOrFail(password: string): Promise<Preset> {
    const query = this.createQueryBuilder('preset')
      .leftJoinAndSelect('preset.sociometricTest', 'sociometricTest')
      .leftJoinAndSelect('sociometricTest.sectionDetail', 'sectionDetail')
      .leftJoinAndSelect('sectionDetail.students', 'student')
      .leftJoinAndSelect('student.images', 'image')
      .leftJoinAndSelect('image.grade', 'grade')
      .andWhere(`"preset"."password" = '${password}'`)
      .andWhere('preset.deletedAt is null');
    const preset = await query.getOne();
    if (!preset) {
      throw new NotFoundException('La programación de la prueba no fue encontrada');
    }
    return preset;
  }
}
