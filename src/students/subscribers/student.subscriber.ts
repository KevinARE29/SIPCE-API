import { ESchoolYearStatus } from '@academics/constants/academic.constants';
import { SchoolYearRepository } from '@academics/repositories';
import { BehavioralHistory } from '@history/entities/behavioral-history.entity';
import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { EStudentStatus } from '@students/constants/student.constant';
import { Student } from '@students/entities/student.entity';
import { Connection, EntitySubscriberInterface, InsertEvent } from 'typeorm';

@Injectable()
export class StudentSubscriber implements EntitySubscriberInterface<Student> {
  constructor(
    @InjectConnection() readonly connection: Connection,
    private readonly schoolYearRepository: SchoolYearRepository,
  ) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return Student;
  }

  async afterInsert(event: InsertEvent<Student>) {
    const { entity } = event;
    const schoolYear = await this.schoolYearRepository.getCurrentAssignation({});
    if (!schoolYear || schoolYear.status !== ESchoolYearStatus['En curso']) {
      entity.status = EStudentStatus.Aprobado;
      await event.manager.getRepository(Student).save(entity);
    } else {
      await event.manager.getRepository(BehavioralHistory).save({ studentId: entity });
    }
  }
}
