import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { PresetRepository } from '@sociometrics/repositories/preset.repository';
import { SociometricTestIdDto } from '@sociometrics/dtos/sociometric-test-id.dto';
import { SociometricTestRepository } from '@sociometrics/repositories/sociometric-test.repository';
import { EStudentStatus } from '@students/constants/student.constant';
import { CreatePresetDto } from '@sociometrics/dtos/create-preset.dto';
import * as generator from 'generate-password';
import { plainToClass } from 'class-transformer';
import { PresetResponse } from '@sociometrics/docs/preset-response.doc';
import { Preset } from '@sociometrics/docs/preset.doc';
import { UpdatePresetDto } from '@sociometrics/dtos/update-preset.dto';
import { SociometricTestPresetIdDto } from '@sociometrics/dtos/sociometric-test-preset-ids.dto';

@Injectable()
export class PresetService {
  constructor(
    private readonly presetRepository: PresetRepository,
    private readonly sociometricTestRepository: SociometricTestRepository,
  ) {}

  async createSociometricTestPreset(
    sociometricTestIdDto: SociometricTestIdDto,
    createPresetDto: CreatePresetDto,
  ): Promise<PresetResponse> {
    const { sociometricTestId } = sociometricTestIdDto;
    const sociometricTest = await this.sociometricTestRepository.findByIdOrThrow(sociometricTestId);
    const {
      sectionDetail: { students },
      sociometricTestDetails,
    } = sociometricTest;
    const filteredStudents = students.filter(
      student => student.status === EStudentStatus['Cursando Año Escolar'] && !student.deletedAt,
    );
    const filteredSociometricTestDetails = sociometricTestDetails.filter(test => test.finished);
    if (filteredSociometricTestDetails.length >= filteredStudents.length) {
      throw new UnprocessableEntityException(
        'Ya no pueden agendarse más pruebas, parece ser que todos los estudiantes han finalizado las pruebas',
      );
    }
    const password = generator.generate({
      length: 10,
      numbers: true,
      symbols: true,
      lowercase: true,
      uppercase: true,
    });
    const presetToSave = {
      ...createPresetDto,
      sociometricTest,
      password,
    };
    const preset = await this.presetRepository.save(presetToSave);
    return { data: plainToClass(Preset, preset, { excludeExtraneousValues: true }) };
  }

  async updateSociometricTestPreset(
    sociometricTestPresetIdDto: SociometricTestPresetIdDto,
    updatePresetDto: UpdatePresetDto,
  ): Promise<PresetResponse> {
    const savedPreset = await this.presetRepository.findPresetOrFail(sociometricTestPresetIdDto);
    const currentDate = new Date();
    if (currentDate > savedPreset.endedAt) {
      throw new UnprocessableEntityException(
        'La prueba no puede actualizarse, ya que ha finalizado el periodo asignado inicialmente',
      );
    }
    const presetToSave = {
      ...savedPreset,
      ...updatePresetDto,
    };
    const preset = await this.presetRepository.save(presetToSave);
    return { data: plainToClass(Preset, preset, { excludeExtraneousValues: true }) };
  }

  async deleteSociometricTestPreset(sociometricTestPresetIdDto: SociometricTestPresetIdDto): Promise<void> {
    const savedPreset = await this.presetRepository.findPresetOrFail(sociometricTestPresetIdDto);
    const currentDate = new Date();
    if (currentDate > savedPreset.endedAt) {
      throw new UnprocessableEntityException(
        'La prueba no puede eliminarse, ya que ha finalizado el periodo asignado inicialmente',
      );
    }
    savedPreset.deletedAt = new Date();
    this.presetRepository.save(savedPreset);
  }
}
