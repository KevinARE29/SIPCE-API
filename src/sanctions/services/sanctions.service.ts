import { ConflictException, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Sanctions as SanctionsDoc } from '@sanctions/docs/sanctions.doc';
import { PageDto } from '@core/dtos/page.dto';
import { getPagination } from '@core/utils/pagination.util';
import { SanctionsRepository } from '@sanctions/repository/sanctions.repository';
import { CreateSanctionsDto } from '@sanctions/dtos/create-sanction.dto';
import { SanctionResponse } from '@sanctions/docs/sanction-response.doc';
import { UpdateSanctionsDto } from '@sanctions/dtos/update-sanctions.dto';
import { SanctionsFilterDto } from '@sanctions/dtos/sanctions-filter.dto';
import { SanctionsResponse } from '@sanctions/docs/sanctions-response.doc';
@Injectable()
export class SanctionsService {
  constructor(private readonly sanctionsRepository: SanctionsRepository) {}

  async getAllSanctions(pageDto: PageDto, sanctionsFilterDto: SanctionsFilterDto): Promise<SanctionsResponse> {
    if (sanctionsFilterDto.paginate === 'false') {
      const [sanctions] = await this.sanctionsRepository.getAllSanctions(pageDto, sanctionsFilterDto);
      return { data: plainToClass(SanctionsDoc, sanctions, { excludeExtraneousValues: true }) };
    }
    const [sanctions, count] = await this.sanctionsRepository.getAllSanctions(pageDto, sanctionsFilterDto);
    const pagination = getPagination(pageDto, count);
    return { data: plainToClass(SanctionsDoc, sanctions, { excludeExtraneousValues: true }), pagination };
  }

  async getSingleSanction(sanctionsId: number): Promise<SanctionResponse> {
    const sanction = await this.sanctionsRepository.findByIdOrThrow(sanctionsId);
    return { data: plainToClass(SanctionsDoc, sanction, { excludeExtraneousValues: true }) };
  }

  async createSanctions(createFoulsDto: CreateSanctionsDto): Promise<SanctionResponse> {
    const duplicatedSanction = await this.sanctionsRepository.getSanctionByName(createFoulsDto.name);

    if (duplicatedSanction) {
      throw new ConflictException('name: Ya existe una sanción con ese nombre');
    }

    return {
      data: plainToClass(
        SanctionsDoc,
        await this.sanctionsRepository.save({
          ...createFoulsDto,
        }),
        {
          excludeExtraneousValues: true,
        },
      ),
    };
  }

  async updateSanctions(sanctionsId: number, updateSanctionsDto: UpdateSanctionsDto): Promise<SanctionResponse> {
    const sanctions = await this.sanctionsRepository.findByIdOrThrow(sanctionsId);
    let duplicatedName;
    if (updateSanctionsDto.name)
      duplicatedName = await this.sanctionsRepository.getSanctionByName(updateSanctionsDto.name);
    if (duplicatedName && sanctions.id !== duplicatedName.id) {
      throw new ConflictException('name: Ya existe una sanción con ese nombre');
    }
    sanctions.description = updateSanctionsDto.description || sanctions.description;
    sanctions.name = updateSanctionsDto.name || sanctions.name;
    return {
      data: plainToClass(SanctionsDoc, await this.sanctionsRepository.save({ ...sanctions }), {
        excludeExtraneousValues: true,
      }),
    };
  }

  async deleteSanctions(sanctionsId: number): Promise<void> {
    const sanctions = await this.sanctionsRepository.findByIdOrThrow(sanctionsId);
    sanctions.deletedAt = new Date();
    await this.sanctionsRepository.save(sanctions);
  }
}
