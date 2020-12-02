import { EntityRepository, Repository } from 'typeorm';
import { Preset } from '@sociometrics/entities/preset.entity';

@EntityRepository(Preset)
export class PresetRepository extends Repository<Preset> {}
