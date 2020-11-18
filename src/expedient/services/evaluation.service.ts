import { Injectable } from '@nestjs/common';
import { EvaluationRepository } from '@expedient/repositories/evaluation.repository';
import { Session } from '@expedient/entities/session.entity';
import { CreateEvaluationDto } from '@expedient/dtos/create-evaluation.dto';
import { Evaluation } from '@expedient/entities/evaluation.entity';

@Injectable()
export class EvaluationService {
  constructor(private readonly evaluationRepository: EvaluationRepository) {}

  async createEvaluation(session: Session, evaluations: CreateEvaluationDto[]): Promise<Evaluation[]> {
    const evaluationsToSave = evaluations.map(evaluation => ({
      ...evaluation,
      session,
    }));
    return this.evaluationRepository.save(evaluationsToSave);
  }
}
