import { Injectable } from '@nestjs/common';
import { SectionRepository } from '@academics/repositories/section.repository';
import { PageDto } from '@core/dtos/page.dto';
import { getPagination } from '@core/utils/pagination.util';
import { SectionFilterDto } from '@academics/dtos/section-filter.dto';
import { SectionsResponse } from '@academics/docs/sections-response.doc';
import { Sections } from '@academics/docs/sections.doc';
import { plainToClass } from 'class-transformer';
@Injectable()
export class SectionService {
  constructor(private readonly sectionRepository: SectionRepository) {}

  async getAllSections(pageDto: PageDto, sectionFilterDto: SectionFilterDto): Promise<SectionsResponse> {
    const [sections, count] = await this.sectionRepository.getAllSections(pageDto, sectionFilterDto);
    const pagination = getPagination(pageDto, count);
    return { data: plainToClass(Sections, sections, { excludeExtraneousValues: true }), pagination };
  }
}
