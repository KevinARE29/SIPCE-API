import { Expose, Type } from 'class-transformer';
import { FoulsAssignationCounter } from './fouls-assignation-counter.doc';
import { FoulSanctionAssignation } from './foul-sanction-assignation.doc';

export class CompleteBehavioralHistoryFouls extends FoulsAssignationCounter {
  @Expose()
  @Type(() => FoulSanctionAssignation)
  fouls!: FoulSanctionAssignation[];
}
