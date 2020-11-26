import { EntityRepository, Repository } from 'typeorm';
import { ClassDiary } from '@history/entities/class-diary.entity';
import { HistoryAnnotationIdsDto } from '@history/dtos/history-annotation-ids.dto';
import { NotFoundException } from '@nestjs/common';
@EntityRepository(ClassDiary)
export class ClassDiaryRepository extends Repository<ClassDiary> {
  async findAnnotationOrFail(historyAnnotationIdsDto: HistoryAnnotationIdsDto): Promise<ClassDiary> {
    const { annotationId, historyId } = historyAnnotationIdsDto;
    const annotation = await this.findOne(annotationId, {
      where: { deletedAt: null, behavioralHistoryId: { id: historyId } },
      relations: ['reporterId'],
    });
    if (!annotation) {
      throw new NotFoundException('El diario de clases no fue encontrado');
    }
    return annotation;
  }
}
