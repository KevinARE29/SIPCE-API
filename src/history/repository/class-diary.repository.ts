import { EntityRepository, Repository } from 'typeorm';
import { ClassDiary } from '@history/entities/class-diary.entity';
import { HistoryAnnotationIdsDto } from '@history/dtos/history-annotation-ids.dto';
import { NotFoundException } from '@nestjs/common';
import { PageDto } from '@core/dtos/page.dto';
import { AnnotationsFilterDto, sortOptionsMap } from '@history/dtos/annotations-filter.dto';
import { getOrderBy } from '@core/utils/sort.util';
import { StudentHistoryIdsDto } from '@history/dtos/student-history-ids.dto';
@EntityRepository(ClassDiary)
export class ClassDiaryRepository extends Repository<ClassDiary> {
  async findAnnotationOrFail(historyAnnotationIdsDto: HistoryAnnotationIdsDto): Promise<ClassDiary> {
    const { annotationId, historyId } = historyAnnotationIdsDto;
    const annotation = await this.findOne(annotationId, {
      where: { deletedAt: null, behavioralHistoryId: { id: historyId } },
      relations: ['reporterId'],
    });
    if (!annotation) {
      throw new NotFoundException('La anotación especificada no fue encontrada');
    }
    return annotation;
  }

  findAnnotations(
    behavioralHistoryId: number,
    pageDto: PageDto,
    annotationsFilterDto: AnnotationsFilterDto,
  ): Promise<[ClassDiary[], number]> {
    const { page, perPage } = pageDto;
    const { sort, title, startedAt, finishedAt, reporter } = annotationsFilterDto;
    const query = this.createQueryBuilder('class_diary')
      .leftJoinAndSelect('class_diary.behavioralHistoryId', 'behavioralHistoryId')
      .leftJoinAndSelect('class_diary.reporterId', 'reporterId')
      .andWhere(`"behavioralHistoryId"."id" = ${behavioralHistoryId}`)
      .andWhere('class_diary.deletedAt is null')
      .take(perPage)
      .skip((page - 1) * perPage);

    if (sort) {
      const order = getOrderBy(sort, sortOptionsMap);
      query.orderBy(order);
    } else {
      query.orderBy({ 'class_diary.id': 'DESC' });
    }

    if (title) {
      query.andWhere(`"class_diary"."title" ILIKE '%${title}%'`);
    }

    if (reporter) {
      query.andWhere(`"reporterId"."id" = ${reporter}`);
    }

    if (startedAt) {
      query.andWhere(`class_diary.annotationDate >= '${startedAt}'`);
    }

    if (finishedAt) {
      query.andWhere(`class_diary.annotationDate <= '${finishedAt}'`);
    }

    return query.getManyAndCount();
  }

  getAllHistoryAnnotations(studentHistoryIdsDto: StudentHistoryIdsDto): Promise<ClassDiary[]> {
    const { historyId } = studentHistoryIdsDto;
    return this.find({
      where: { deletedAt: null, behavioralHistoryId: { id: historyId } },
      relations: ['reporterId'],
    });
  }
}
