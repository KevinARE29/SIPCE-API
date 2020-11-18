import { Injectable } from '@nestjs/common';
import { EvaluationRepository } from '@expedient/repositories/evaluation.repository';
import { Session } from '@expedient/entities/session.entity';
import { CreateEvaluationDto } from '@expedient/dtos/create-evaluation.dto';
import { Evaluation } from '@expedient/entities/evaluation.entity';
import { EvaluationDto } from '@expedient/dtos/evaluation.dto';

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

  async updateSessionEvaluationsArray(session: Session, evaluations: EvaluationDto[]): Promise<Evaluation[]> {
    const savedEvaluationsIds = evaluations.filter(evaluation => evaluation.id).map(evaluation => evaluation.id);
    const savedEvaluations = await this.evaluationRepository.find({ where: { session: { id: session.id } } });
    const filteredEvaluations = savedEvaluations.filter(evaluation => !savedEvaluationsIds.includes(evaluation.id));
    const evaluationsToDelete = filteredEvaluations.map(evaluation => ({ ...evaluation, deletedAt: new Date() }));
    const newEvaluationsArray = evaluations.concat(evaluationsToDelete).map(evaluation => ({
      ...evaluation,
      session,
    }));
    return this.evaluationRepository.save(newEvaluationsArray);
  }
}
