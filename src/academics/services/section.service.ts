import { Injectable, ConflictException } from '@nestjs/common';
import { SectionRepository } from '@academics/repositories/section.repository';
import { PageDto } from '@core/dtos/page.dto';
import { getPagination } from '@core/utils/pagination.util';
import { SectionFilterDto } from '@academics/dtos/section-filter.dto';
import { SectionsResponse } from '@academics/docs/sections-response.doc';
import { Sections } from '@academics/docs/sections.doc';
import { plainToClass } from 'class-transformer';
import { SectionResponse } from '@academics/docs/section-response.doc';
import { CreateCatalogueDto } from '@academics/dtos/create-catalogue.dto';
import { Section } from '@academics/docs/section.doc';

@Injectable()
export class SectionService {
  constructor(private readonly sectionRepository: SectionRepository) {}

  async getAllSections(pageDto: PageDto, sectionFilterDto: SectionFilterDto): Promise<SectionsResponse> {
    const [sections, count] = await this.sectionRepository.getAllSections(pageDto, sectionFilterDto);
    const pagination = getPagination(pageDto, count);
    return { data: plainToClass(Sections, sections, { excludeExtraneousValues: true }), pagination };
  }

  async createSection(createCatalogueDto: CreateCatalogueDto): Promise<SectionResponse> {
    const duplicateSection = await this.sectionRepository.getSectionByName(createCatalogueDto.name);
    if (duplicateSection) {
      throw new ConflictException('name: Ya existe una sección con ese nombre');
    }
    return {
      data: plainToClass(Section, await this.sectionRepository.save({ ...createCatalogueDto }), {
        excludeExtraneousValues: true,
      }),
    };
  }
}
