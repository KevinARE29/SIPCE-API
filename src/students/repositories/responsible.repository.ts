import { EntityRepository, Repository } from 'typeorm';
import { Responsible } from '@students/entities/responsible.entity';
import { PageDto } from '@core/dtos/page.dto';
import { ResponsibleFilterDto, sortOptionsMap } from '@students/dtos/responsible-filter.dto';
import { EResponsibleRelationship } from '@students/constants/student.constant';
import { NotFoundException } from '@nestjs/common';

@EntityRepository(Responsible)
export class ResponsibleRepository extends Repository<Responsible> {
  async findByIdOrFail(studentId: number, responsibleId: number): Promise<Responsible> {
    const responsible = await this.createQueryBuilder('responsible')
      .leftJoin('responsible.responsibleStudents', 'responsibleStudent')
      .leftJoin('responsibleStudent.student', 'student')
      .where(`responsible.id = ${responsibleId}`)
      .andWhere(`student.id = ${studentId}`)
      .getOne();
    if (!responsible) {
      throw new NotFoundException(`Responsable con id ${responsibleId} no encontrado`);
    }
    return responsible;
  }

  findByEmail(email: string): Promise<Responsible | undefined> {
    return this.findOne({
      where: {
        email,
      },
    });
  }

  getStudentResponsibles(
    studentId: number,
    pageDto: PageDto,
    responsibleFilterDto: ResponsibleFilterDto,
  ): Promise<[Responsible[], number]> {
    const { page, perPage } = pageDto;
    const { sort, firstname, lastname, email, phone, relationship } = responsibleFilterDto;
    const query = this.createQueryBuilder('responsible')
      .leftJoinAndSelect('responsible.responsibleStudents', 'responsibleStudent')
      .leftJoinAndSelect('responsibleStudent.student', 'student')
      .where(`student.id = ${studentId}`)
      .take(perPage)
      .skip((page - 1) * perPage);

    if (sort) {
      const order = sort.split(',').reduce((acum, sortItem) => {
        const orderOption = sortOptionsMap.get(sortItem);
        return { ...acum, ...orderOption };
      }, {});
      query.orderBy(order);
    } else {
      query.orderBy({ 'responsible.id': 'DESC' });
    }

    if (firstname) {
      query.andWhere(`"responsible"."firstname" ILIKE '%${firstname}%'`);
    }

    if (lastname) {
      query.andWhere(`"responsible"."lastname" ILIKE '%${lastname}%'`);
    }

    if (email) {
      query.andWhere(`"responsible"."email" ILIKE '%${email}%'`);
    }

    if (phone) {
      query.andWhere(`"responsible"."email" ILIKE '%${phone}%'`);
    }

    if (relationship) {
      query.andWhere(`"responsibleStudent"."relationship" = '${EResponsibleRelationship[relationship]}'`);
    }

    return query.getManyAndCount();
  }
}
