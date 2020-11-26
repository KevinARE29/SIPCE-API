import { EntityRepository, Repository } from 'typeorm';
import { BehavioralHistory } from '@history/entities/behavioral-history.entity';
import { StudentHistoryIdsDto } from '@history/dtos/student-history-ids.dto';
import { NotFoundException } from '@nestjs/common';
@EntityRepository(BehavioralHistory)
export class BehavioralHistoryRepository extends Repository<BehavioralHistory> {
  async findBehavioralHistoryOrFail(studentHistoryIdsDto: StudentHistoryIdsDto): Promise<BehavioralHistory> {
    const { historyId, studentId } = studentHistoryIdsDto;
    const behavioralHistory = await this.findOne(historyId, {
      where: { studentId: { id: studentId }, deletedAt: null },
    });
    if (!behavioralHistory) {
      throw new NotFoundException('El historial académico y conductual no fue encontrado');
    }
    return behavioralHistory;
  }
}
