import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
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
import { InterventionProgramIdsDto } from '@expedient/dtos/intervention-program-ids.dto';
import { UpdateInterventionProgramDto } from '@expedient/dtos/update-intervention-program.dto';
import { AvailableInterventionProgramResponse } from '@expedient/docs/available-intervention-programs-response.doc';
import { InterventionProgram as InterventionProgramEntity } from '@expedient/entities/intervention-program.entity';

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

  async deleteCounselorInterventionProgram(
    interventionProgramIdsDto: InterventionProgramIdsDto,
    counserlorId: number,
  ): Promise<void> {
    const { interventionProgramId } = interventionProgramIdsDto;
    const interventionProgram = await this.interventionProgramRepository.findOne(interventionProgramId, {
      where: { counselor: { id: counserlorId }, deletedAt: null },
      relations: ['sessions'],
    });
    if (!interventionProgram) {
      throw new NotFoundException('El programa de intervención especificado no fue encontrado');
    }
    if (interventionProgram.sessions.length) {
      throw new UnprocessableEntityException(
        'El programa de intervención no puede ser borrado, ya que tiene sesiones asociadas',
      );
    }
    interventionProgram.deletedAt = new Date();
    this.interventionProgramRepository.save(interventionProgram);
  }

  async updateCounselorInterventionProgram(
    interventionProgramIdsDto: InterventionProgramIdsDto,
    counserlorId: number,
    updateIntervationProgramDto: UpdateInterventionProgramDto,
  ): Promise<InterventionProgramResponse> {
    const { interventionProgramId } = interventionProgramIdsDto;
    const interventionProgram = await this.interventionProgramRepository.findOne(interventionProgramId, {
      where: { counselor: { id: counserlorId }, deletedAt: null },
      relations: ['sessions'],
    });
    if (!interventionProgram) {
      throw new NotFoundException('El programa de intervención especificado no fue encontrado');
    }
    if (interventionProgram.sessions.length) {
      throw new UnprocessableEntityException(
        'El programa de intervención no puede ser actualizado, ya que tiene sesiones asociadas',
      );
    }
    const interventionProgramToSave = {
      ...interventionProgram,
      ...updateIntervationProgramDto,
    };
    const savedInterventionProgram = await this.interventionProgramRepository.save(interventionProgramToSave);
    return { data: plainToClass(InterventionProgram, savedInterventionProgram, { excludeExtraneousValues: true }) };
  }

  async getAvailableInterventionPrograms(counselorId: number): Promise<AvailableInterventionProgramResponse> {
    const interventionPrograms = await this.interventionProgramRepository.find({
      where: { counselor: { id: counselorId }, deletedAt: null },
    });
    return { data: plainToClass(InterventionProgram, interventionPrograms, { excludeExtraneousValues: true }) };
  }

  async getInterventionProgramOrFail(interventionProgramId: number): Promise<InterventionProgramEntity> {
    const interventionProgram = await this.interventionProgramRepository.findOne(interventionProgramId, {
      where: { deletedAt: null },
    });
    if (!interventionProgram) {
      throw new NotFoundException('El programa de intervención no fue encontrado');
    }
    return interventionProgram;
  }
}
