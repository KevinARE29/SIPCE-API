import { Injectable, UnprocessableEntityException, ForbiddenException } from '@nestjs/common';
import { ClassDiaryRepository } from '@history/repository/class-diary.repository';
import { StudentHistoryIdsDto } from '@history/dtos/student-history-ids.dto';
import { CreateAnnotationDto } from '@history/dtos/create-annotation.dto';
import { BehavioralHistoryRepository } from '@history/repository/behavioral-history.repository';
import { UserRepository } from '@users/repositories/users.repository';
import { plainToClass } from 'class-transformer';
import { Annotation } from '@history/docs/annotation.doc';
import { AnnotationResponse } from '@history/docs/annotation-response.doc';
import { HistoryAnnotationIdsDto } from '@history/dtos/history-annotation-ids.dto';
import { UpdateAnnotationDto } from '@history/dtos/update-annotation.dto';
import { getPagination } from '@core/utils/pagination.util';
import { PageDto } from '@core/dtos/page.dto';
import { AnnotationsFilterDto } from '@history/dtos/annotations-filter.dto';
import { CompleteAnnotation } from '@history/docs/complete-annotation.doc';
import { CompleteAnnotationResponse } from '@history/docs/complete-annotation-response.doc';

@Injectable()
export class ClassDiaryService {
  constructor(
    private readonly classDiaryRepository: ClassDiaryRepository,
    private readonly behavioralHistoryRepository: BehavioralHistoryRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async createClassDiaryAnnotation(
    reporterId: number,
    studentHistoryIdsDto: StudentHistoryIdsDto,
    createAnnotationDto: CreateAnnotationDto,
  ): Promise<AnnotationResponse> {
    const studentHistory = await this.behavioralHistoryRepository.findBehavioralHistoryOrFail(studentHistoryIdsDto);
    if (studentHistory.finalConclusion) {
      throw new UnprocessableEntityException(
        'No se puede crear una nueva anotación ya que el historial académico y conductual ya esta cerrado',
      );
    }
    const reporter = await this.userRepository.findByIdOrThrow(reporterId);
    const annotation = {
      ...createAnnotationDto,
      behavioralHistoryId: studentHistory,
      reporterId: reporter,
    };
    const savedAnnotation = await this.classDiaryRepository.save(annotation);
    return { data: plainToClass(Annotation, savedAnnotation, { excludeExtraneousValues: true }) };
  }

  async updateClassDiaryAnnotation(
    reporterId: number,
    historyAnnotationIdsDto: HistoryAnnotationIdsDto,
    updateAnnotationDto: UpdateAnnotationDto,
  ): Promise<AnnotationResponse> {
    const studentHistory = await this.behavioralHistoryRepository.findBehavioralHistoryOrFail(historyAnnotationIdsDto);
    if (studentHistory.finalConclusion) {
      throw new UnprocessableEntityException(
        'No se puede modificar esta anotación ya que el historial académico y conductual ya esta cerrado',
      );
    }
    const annotation = await this.classDiaryRepository.findAnnotationOrFail(historyAnnotationIdsDto);
    if (annotation.reporterId.id !== reporterId) {
      throw new ForbiddenException('No tienes permisos para modificar esta anotación');
    }
    const timeDiff = this.getTimeDiff(annotation.createdAt);
    if (timeDiff) {
      throw new UnprocessableEntityException(
        'No se puede modificar esta anotación ya que han transcurrido más de 24 horas desde su registro',
      );
    }
    const annotationToSave = {
      ...annotation,
      ...updateAnnotationDto,
    };
    const savedAnnotation = await this.classDiaryRepository.save(annotationToSave);
    return { data: plainToClass(Annotation, savedAnnotation, { excludeExtraneousValues: true }) };
  }

  getTimeDiff(annotationCreatedAtDate: Date): boolean {
    const currentDate = new Date();
    const diff = currentDate.getTime() - annotationCreatedAtDate.getTime();
    const hoursDiff = diff / (1000 * 60 * 60);
    return hoursDiff > 24;
  }

  async deleteClassDiaryAnnotation(
    reporterId: number,
    historyAnnotationIdsDto: HistoryAnnotationIdsDto,
  ): Promise<void> {
    const studentHistory = await this.behavioralHistoryRepository.findBehavioralHistoryOrFail(historyAnnotationIdsDto);
    if (studentHistory.finalConclusion) {
      throw new UnprocessableEntityException(
        'No se puede eliminar esta anotación ya que el historial académico y conductual ya esta cerrado',
      );
    }
    const annotation = await this.classDiaryRepository.findAnnotationOrFail(historyAnnotationIdsDto);
    if (annotation.reporterId.id !== reporterId) {
      throw new ForbiddenException('No tienes permisos para eliminar esta anotación');
    }
    const timeDiff = this.getTimeDiff(annotation.createdAt);
    if (timeDiff) {
      throw new UnprocessableEntityException(
        'No se puede eliminar esta anotación ya que han transcurrido más de 24 horas desde su registro',
      );
    }
    annotation.deletedAt = new Date();
    this.classDiaryRepository.save(annotation);
  }

  async getClassDiaryAnnotation(
    studentHistoryIdsDto: StudentHistoryIdsDto,
    pageDto: PageDto,
    annotationsFilterDto: AnnotationsFilterDto,
  ): Promise<CompleteAnnotationResponse> {
    const studentHistory = await this.behavioralHistoryRepository.findBehavioralHistoryOrFail(studentHistoryIdsDto);
    const [annotations, count] = await this.classDiaryRepository.findAnnotations(
      studentHistory.id,
      pageDto,
      annotationsFilterDto,
    );
    const pagination = getPagination(pageDto, count);
    return { data: plainToClass(CompleteAnnotation, annotations, { excludeExtraneousValues: true }), pagination };
  }
}
