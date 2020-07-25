import { EntityRepository, Repository } from 'typeorm';
import { Student } from '@students/entities/student.entity';
import { PageDto } from '@core/dtos/page.dto';
import { StudentFilterDto, sortOptionsMap } from '@students/dtos/student-filter.dto';
import { EStudentStatus, activeStatuses, inactiveStatuses } from '@students/constants/student.constant';

@EntityRepository(Student)
export class StudentRepository extends Repository<Student> {
  findByCode(code: string): Promise<Student | undefined> {
    return this.findOne({
      where: {
        code,
      },
    });
  }

  getAllStudents(pageDto: PageDto, studentFilterDto: StudentFilterDto): Promise<[Student[], number]> {
    const { page, perPage } = pageDto;
    const { sort, code, firstname, lastname, email, currentGrade, status, active } = studentFilterDto;
    const query = this.createQueryBuilder('student')
      .leftJoinAndSelect('student.currentGrade', 'currentGrade')
      .take(perPage)
      .skip((page - 1) * perPage);

    if (sort) {
      const order = sort.split(',').reduce((acum, sortItem) => {
        const orderOption = sortOptionsMap.get(sortItem);
        return { ...acum, ...orderOption };
      }, {});
      query.orderBy(order);
    } else {
      query.orderBy({ 'student.id': 'DESC' });
    }

    if (code) {
      query.andWhere(`"student"."code" ILIKE '%${code}%'`);
    }

    if (firstname) {
      query.andWhere(`"student"."firstname" ILIKE '%${firstname}%'`);
    }

    if (lastname) {
      query.andWhere(`"student"."lastname" ILIKE '%${lastname}%'`);
    }

    if (email) {
      query.andWhere(`"student"."email" ILIKE '%${email}%'`);
    }

    if (currentGrade) {
      query.andWhere(`"currentGrade"."id" = ${currentGrade}`);
    }

    if (status) {
      query.andWhere(`"student"."status" = '${EStudentStatus[status]}'`);
    } else if (active === 'false') {
      query.andWhere(`"student"."status" IN (:...inactiveStatuses)`, { inactiveStatuses: [null, ...inactiveStatuses] });
    } else {
      query.andWhere(`"student"."status" IN (:...activeStatuses)`, { activeStatuses: [null, ...activeStatuses] });
    }

    return query.getManyAndCount();
  }
}
