import { Injectable, ConflictException } from '@nestjs/common';
import { PageDto } from '@core/dtos/page.dto';
import { getPagination } from '@core/utils/pagination.util';
import { CycleRepository } from '@academics/repositories/cycle.repository';
import { CycleFilterDto } from '@academics/dtos/cycle-filter.dto';
import { CyclesResponse } from '@academics/docs/cycles-response.doc';
import { Cycles } from '@academics/docs/cycles.doc';
import { plainToClass } from 'class-transformer';
import { CatalogueDto } from '@academics/dtos/catalogue.dto';
import { Cycle } from '@academics/docs/cycle.doc';
import { CycleResponse } from '@academics/docs/cycle-response.doc';

@Injectable()
export class CycleService {
  constructor(private readonly cycleRepository: CycleRepository) {}

  async getAllCycles(pageDto: PageDto, cycleFilterDto: CycleFilterDto): Promise<CyclesResponse> {
    const [cycles, count] = await this.cycleRepository.getAllCycles(pageDto, cycleFilterDto);
    const pagination = getPagination(pageDto, count);
    return { data: plainToClass(Cycles, cycles, { excludeExtraneousValues: true }), pagination };
  }

  async createCycle(createCatalogueDto: CatalogueDto): Promise<CycleResponse> {
    const duplicateCycle = await this.cycleRepository.getCycleByName(createCatalogueDto.name);
    if (duplicateCycle) {
      throw new ConflictException('name: Ya existe un ciclo con ese nombre');
    }
    return {
      data: plainToClass(Cycle, await this.cycleRepository.save({ ...createCatalogueDto }), {
        excludeExtraneousValues: true,
      }),
    };
  }

  async updateCycle(cycleId: number, catalogueDto: CatalogueDto): Promise<CycleResponse> {
    const cycle = await this.cycleRepository.getCycleByIdOrThrow(cycleId);

    cycle.name = catalogueDto.name || cycle.name;
    const duplicatedCycle = await this.cycleRepository.getCycleByName(cycle.name);
    if (duplicatedCycle && cycle.id !== duplicatedCycle.id) {
      throw new ConflictException('name: Ya existe un ciclo con ese nombre');
    }
    return {
      data: plainToClass(Cycle, await this.cycleRepository.save({ ...cycle }), {
        excludeExtraneousValues: true,
      }),
    };
  }

  async deleteCycle(cycleId: number): Promise<void> {
    const cycle = await this.cycleRepository.getCycleByIdOrThrow(cycleId);
    cycle.deletedAt = new Date();
    await this.cycleRepository.save(cycle);
  }
}
