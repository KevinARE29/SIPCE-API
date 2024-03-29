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

  findStudentExpedients(studentId: number): Promise<Expedient[]> {
    const query = this.createQueryBuilder('expedient')
      .leftJoinAndSelect('expedient.sessions', 'sessions')
      .leftJoinAndSelect('sessions.evaluations', 'evaluations')
      .leftJoinAndSelect('expedient.gradeDetail', 'gradeDetail')
      .leftJoinAndSelect('gradeDetail.grade', 'grade')
      .leftJoinAndSelect('gradeDetail.cycleDetail', 'cycleDetail')
      .leftJoinAndSelect('cycleDetail.schoolYear', 'schoolYear')
      .leftJoinAndSelect('expedient.student', 'student')
      .leftJoinAndSelect('student.currentGrade', 'currentGrade')
      .orderBy({ 'expedient.createdAt': 'DESC' })
      .andWhere(`student.id = ${studentId}`)
      .andWhere('expedient.deletedAt is null');
    return query.getMany();
  }

  findStudentExpedientById(studentExpedientIdsDto: StudentExpedientIdsDto): Promise<Expedient | undefined> {
    const { expedientId, studentId } = studentExpedientIdsDto;
    const query = this.createQueryBuilder('expedient')
      .leftJoinAndSelect('expedient.sessions', 'sessions')
      .leftJoinAndSelect('sessions.evaluations', 'evaluations')
      .leftJoinAndSelect('sessions.interventionProgram', 'interventionProgram')
      .leftJoinAndSelect('sessions.sessionResponsibleAssistence', 'sessionResponsibleAssistence')
      .leftJoinAndSelect('sessionResponsibleAssistence.responsible1', 'responsible1')
      .leftJoinAndSelect('sessionResponsibleAssistence.responsible2', 'responsible2')
      .leftJoinAndSelect('sessions.counselor', 'sCounselor')
      .leftJoinAndSelect('expedient.gradeDetail', 'gradeDetail')
      .leftJoinAndSelect('gradeDetail.counselor', 'counselor')
      .leftJoinAndSelect('gradeDetail.grade', 'grade')
      .leftJoinAndSelect('gradeDetail.cycleDetail', 'cycleDetail')
      .leftJoinAndSelect('cycleDetail.schoolYear', 'schoolYear')
      .leftJoinAndSelect('expedient.student', 'student')
      .leftJoinAndSelect('student.currentGrade', 'currentGrade')
      .orderBy({ 'expedient.createdAt': 'DESC' })
      .andWhere(`expedient.id = ${expedientId}`)
      .andWhere(`student.id = ${studentId}`);
    return query.getOne();
  }
}
