import { Injectable } from '@nestjs/common';
import { PageDto } from '@core/dtos/page.dto';
import { getPagination } from '@core/utils/pagination.util';
import { CycleRepository } from '@academics/repositories/cycle.repository';
import { CycleFilterDto } from '@academics/dtos/cycle-filter.dto';
import { CyclesResponse } from '@academics/docs/cycles-response.doc';
import { Cycles } from '@academics/docs/cycles.doc';
import { plainToClass } from 'class-transformer';
/*
import { SectionResponse } from '@academics/docs/section-response.doc';
import { CatalogueDto } from '@academics/dtos/catalogue.dto';
import { Section } from '@academics/docs/section.doc';

*/

@Injectable()
export class CycleService {
  constructor(private readonly cycleRepository: CycleRepository) {}

  async getAllCycles(pageDto: PageDto, cycleFilterDto: CycleFilterDto): Promise<CyclesResponse> {
    const [cycles, count] = await this.cycleRepository.getAllCycles(pageDto, cycleFilterDto);
    const pagination = getPagination(pageDto, count);
    return { data: plainToClass(Cycles, cycles, { excludeExtraneousValues: true }), pagination };
  }

  /*
  async createSection(createCatalogueDto: CatalogueDto): Promise<SectionResponse> {
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

  async updateSection(sectionId: number, catalogueDto: CatalogueDto): Promise<SectionResponse> {
    const section = await this.sectionRepository.getSectionByIdOrThrow(sectionId);

    section.name = catalogueDto.name || section.name;
    const duplicatedRole = await this.sectionRepository.getSectionByName(section.name);
    if (duplicatedRole && section.id !== duplicatedRole.id) {
      throw new ConflictException('name: Ya existe una sección con ese nombre');
    }
    return {
      data: plainToClass(Section, await this.sectionRepository.save({ ...section }), {
        excludeExtraneousValues: true,
      }),
    };
  }

  async deleteSection(sectionId: number): Promise<void> {
    const section = await this.sectionRepository.getSectionByIdOrThrow(sectionId);
    section.deletedAt = new Date();
    await this.sectionRepository.save(section);
  }  
  */
}
