import { Injectable } from '@nestjs/common';
import { InterventionProgramRepository } from '@expedient/repositories/intervention-program.repository';
import { InterventionProgramFilterDto } from '@expedient/dtos/intervention-program-filter.dto';
import { PageDto } from '@core/dtos/page.dto';
import { getPagination } from '@core/utils/pagination.util';
import { InterventionProgramResponse } from '@expedient/docs/intervention-program-response.doc';
import { plainToClass } from 'class-transformer';
import { InterventionProgram } from '@expedient/docs/intervention-program.doc';

@Injectable()
export class InterventionProgramService {
  constructor(private readonly interventionProgramRepository: InterventionProgramRepository) {}

  async findCounselorInterventionPrograms(
    counselorId: number,
    interventionProgramFilterDto: InterventionProgramFilterDto,
    pageDto: PageDto,
  ): Promise<InterventionProgramResponse> {
    const [interventionPrograms, count] = await this.interventionProgramRepository.findCounselorInterventionPrograms(
      counselorId,
      interventionProgramFilterDto,
      pageDto,
    );
    const pagination = getPagination(pageDto, count);
    const data = plainToClass(InterventionProgram, interventionPrograms, { excludeExtraneousValues: true });
    return { data, pagination };
  }
}
