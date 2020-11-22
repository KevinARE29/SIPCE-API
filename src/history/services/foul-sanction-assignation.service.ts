import { FoulSanctionAssignationRepository } from '@history/repository/foul-sanction-assignation.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FoulSanctionAssignationService {
  constructor(private readonly sanctionsRepository: FoulSanctionAssignationRepository) {}
}
