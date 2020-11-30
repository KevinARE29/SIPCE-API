import { FoulSanctionAssignation } from '@history/entities/foul-sanction-assignation.entity';
import { EnumFoulsType } from '@fouls/constants/fouls.constants';
import { FoulsCounter } from '@history/docs/fouls-counter.doc';

export function getFoulsCounter(foulSanctionAssignation: FoulSanctionAssignation[], periodId: number): FoulsCounter {
  const minorFouls = foulSanctionAssignation.filter(
    foulAssignation =>
      foulAssignation.periodId.id === periodId && foulAssignation.foulId.foulsType === EnumFoulsType.Leves,
  );
  const seriousFouls = foulSanctionAssignation.filter(
    foulAssignation =>
      foulAssignation.periodId.id === periodId && foulAssignation.foulId.foulsType === EnumFoulsType.Graves,
  );
  const verySeriousFouls = foulSanctionAssignation.filter(
    foulAssignation =>
      foulAssignation.periodId.id === periodId && foulAssignation.foulId.foulsType === EnumFoulsType['Muy Graves'],
  );
  const totalFouls = minorFouls.concat(seriousFouls, verySeriousFouls);
  const totalSanctions = totalFouls.filter(foul => foul.sanctionId).length;
  return {
    minorFouls: minorFouls.length,
    seriousFouls: seriousFouls.length,
    verySeriousFouls: verySeriousFouls.length,
    totalSanctions,
  };
}

export function getFoulsAlertState(foulSanctionAssignation: FoulSanctionAssignation[]): boolean {
  const minorFouls = foulSanctionAssignation.filter(
    foulAssignation => foulAssignation.foulId.foulsType === EnumFoulsType.Leves,
  );
  const seriousFouls = foulSanctionAssignation.filter(
    foulAssignation => foulAssignation.foulId.foulsType === EnumFoulsType.Graves,
  );
  const verySeriousFouls = foulSanctionAssignation.filter(
    foulAssignation => foulAssignation.foulId.foulsType === EnumFoulsType['Muy Graves'],
  );
  return minorFouls.length >= 3 || seriousFouls.length >= 1 || verySeriousFouls.length >= 1;
}
