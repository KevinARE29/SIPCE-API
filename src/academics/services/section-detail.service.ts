import { SectionDetailStudentsResponse } from '@academics/docs/section-detail-students-response.doc';
import { SectionDetailStudents } from '@academics/docs/section-detail-students.doc';
import { SectionDetailRepository } from '@academics/repositories';
import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

@Injectable()
export class SectionDetailService {
  constructor(private readonly sectionDetailRepository: SectionDetailRepository) {}

  async getSectionDetailStudents(sectionDetailId: number): Promise<SectionDetailStudentsResponse> {
    const sectionDetail = await this.sectionDetailRepository.findByIdOrThrow(sectionDetailId);

    return { data: plainToClass(SectionDetailStudents, sectionDetail, { excludeExtraneousValues: true }) };
  }
}
