import { EntityRepository, Repository } from 'typeorm';
import { Expedient } from '@expedient/entities/expedient.entity';
import { StudentExpedientIdsDto } from '@expedient/dtos/student-expedient-ids.dto';

@EntityRepository(Expedient)
export class ExpedientRepository extends Repository<Expedient> {
  findExpedientByStudentId(studentExpedientIdsDto: StudentExpedientIdsDto): Promise<Expedient | undefined> {
    const { expedientId, studentId } = studentExpedientIdsDto;
    return this.findOne({
      where: { id: expedientId, student: { id: studentId } },
    });
  }
}
