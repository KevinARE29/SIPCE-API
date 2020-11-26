import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { ClassDiaryRepository } from '@history/repository/class-diary.repository';
import { StudentHistoryIdsDto } from '@history/dtos/student-history-ids.dto';
import { CreateAnnotationDto } from '@history/dtos/create-annotation.dto';
import { BehavioralHistoryRepository } from '@history/repository/behavioral-history.repository';
import { UserRepository } from '@users/repositories/users.repository';
import { plainToClass } from 'class-transformer';
import { Annotation } from '@history/docs/annotation.doc';
import { AnnotationResponse } from '@history/docs/annotation-response.doc';

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
}
