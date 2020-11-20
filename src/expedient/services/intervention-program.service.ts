import { Injectable } from '@nestjs/common';
import { InterventionProgramRepository } from '@expedient/repositories/intervention-program.repository';
import { InterventionProgramFilterDto } from '@expedient/dtos/intervention-program-filter.dto';
import { PageDto } from '@core/dtos/page.dto';
import { getPagination } from '@core/utils/pagination.util';
import { InterventionProgramsResponse } from '@expedient/docs/intervention-programs-response.doc';
import { plainToClass } from 'class-transformer';
import { InterventionProgram } from '@expedient/docs/intervention-program.doc';
import { CreateInterventionProgramDto } from '@expedient/dtos/create-intervention-program.dto';
import { UserRepository } from '@users/repositories/users.repository';
import { InterventionProgramResponse } from '@expedient/docs/intervention-program-response.doc';

@Injectable()
export class InterventionProgramService {
  constructor(
    private readonly interventionProgramRepository: InterventionProgramRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async findCounselorInterventionPrograms(
    counselorId: number,
    interventionProgramFilterDto: InterventionProgramFilterDto,
    pageDto: PageDto,
  ): Promise<InterventionProgramsResponse> {
    const [interventionPrograms, count] = await this.interventionProgramRepository.findCounselorInterventionPrograms(
      counselorId,
      interventionProgramFilterDto,
      pageDto,
    );
    const pagination = getPagination(pageDto, count);
    const data = plainToClass(InterventionProgram, interventionPrograms, { excludeExtraneousValues: true });
    return { data, pagination };
  }

  async createCounselorInterventionProgram(
    counselorId: number,
    createInterventionProgramDto: CreateInterventionProgramDto,
  ): Promise<InterventionProgramResponse> {
    const counselor = await this.userRepository.findByIdOrThrow(counselorId);
    const interventionProgramToSave = {
      ...createInterventionProgramDto,
      counselor,
    };
    const interventionProgram = await this.interventionProgramRepository.save(interventionProgramToSave);
    return { data: plainToClass(InterventionProgram, interventionProgram, { excludeExtraneousValues: true }) };
  }
}
