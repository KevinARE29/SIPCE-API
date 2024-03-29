import { ConflictException, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Fouls as FoulsDoc } from '@fouls/docs/fouls.doc';
import { FoulsRepository } from '@fouls/repository/fouls.repository';
import { CreateFoulsDto } from '@fouls/dtos/create-foul.dto';
import { FoulResponse } from '@fouls/docs/foul-response.doc';
import { EnumFoulsType } from '@fouls/constants/fouls.constants';
import { UpdateFoulsDto } from '@fouls/dtos/update-fouls.dto';
import { FoulsFilterDto } from '@fouls/dtos/fouls-filter.dto';
import { PageDto } from '@core/dtos/page.dto';
import { getPagination } from '@core/utils/pagination.util';
import { FoulsResponse } from '@fouls/docs/fouls-response.doc';
@Injectable()
export class FoulsService {
  constructor(private readonly foulsRepository: FoulsRepository) {}

  async getAllFouls(pageDto: PageDto, foulsFilterDto: FoulsFilterDto): Promise<FoulsResponse> {
    if (foulsFilterDto.paginate === 'false') {
      const [fouls] = await this.foulsRepository.getAllFouls(pageDto, foulsFilterDto);
      return { data: plainToClass(FoulsDoc, fouls, { excludeExtraneousValues: true }) };
    }
    const [fouls, count] = await this.foulsRepository.getAllFouls(pageDto, foulsFilterDto);
    const pagination = getPagination(pageDto, count);
    const mappedFouls = fouls.map(foul => ({ ...foul }));
    return { data: plainToClass(FoulsDoc, mappedFouls, { excludeExtraneousValues: true }), pagination };
  }

  async getSingleFoul(foulsId: number): Promise<FoulResponse> {
    const foul = await this.foulsRepository.findByIdOrThrow(foulsId);
    return { data: plainToClass(FoulsDoc, foul, { excludeExtraneousValues: true }) };
  }

  async createFouls(createFoulsDto: CreateFoulsDto): Promise<FoulResponse> {
    const { foulsType, ...foulsDto } = createFoulsDto;
    const duplicatedFoulNumeral = await this.foulsRepository.getFoulsByNumeral(createFoulsDto.numeral);
    if (duplicatedFoulNumeral) {
      throw new ConflictException('name: Ya existe una falta con ese numeral');
    }

    return {
      data: plainToClass(
        FoulsDoc,
        await this.foulsRepository.save({
          ...foulsDto,
          foulsType: EnumFoulsType[foulsType],
        }),
        {
          excludeExtraneousValues: true,
        },
      ),
    };
  }

  async updateFouls(foulsId: number, updateFoulsDto: UpdateFoulsDto): Promise<FoulResponse> {
    const fouls = await this.foulsRepository.findByIdOrThrow(foulsId);
    const { foulsType, ...foulsDto } = updateFoulsDto;
    let type;
    let duplicatedNumeral;
    if (foulsType) {
      type = EnumFoulsType[foulsType];
      fouls.foulsType = type;
    }
    if (foulsDto.numeral) {
      duplicatedNumeral = await this.foulsRepository.getFoulsByNumeral(foulsDto.numeral);
    }
    if (duplicatedNumeral && fouls.id !== duplicatedNumeral.id) {
      throw new ConflictException('name: Ya existe una falta con ese numeral');
    }
    const updatedEvent = await this.foulsRepository.save({
      ...fouls,
      ...foulsDto,
    });
    return {
      data: plainToClass(FoulsDoc, await this.foulsRepository.save({ ...updatedEvent }), {
        excludeExtraneousValues: true,
      }),
    };
  }

  async deleteFouls(foulsId: number): Promise<void> {
    const fouls = await this.foulsRepository.findByIdOrThrow(foulsId);
    fouls.deletedAt = new Date();
    await this.foulsRepository.save(fouls);
  }
}
