import { TCounselorAssignation } from '@academics/constants/academic.constants';
import { PageDto } from '@core/dtos/page.dto';
import { getOrderBy } from '@core/utils/sort.util';
import { ERequestStatus } from '@counseling/constants/request.constant';
import { RequestFilterDto, sortOptionsMap } from '@counseling/dtos/request-filter.dto';
import { EntityRepository, Repository } from 'typeorm';
import { Request } from '../entities/request.entity';

@EntityRepository(Request)
export class RequestRepository extends Repository<Request> {
  getRequests(
    counselorAssignation: TCounselorAssignation,
    pageDto: PageDto,
    requestFilterDto: RequestFilterDto,
  ): Promise<[Request[], number]> {
    const { page, perPage } = pageDto;
    const {
      sort,
      code,
      firstname,
      lastname,
      email,
      currentGrade,
      currentShift,
      createdAtStart,
      createdAtEnd,
    } = requestFilterDto;

    let whereCounselorAssignation = '';
    counselorAssignation.forEach((cAssignation, index) => {
      const grades = cAssignation.grades.join();
      whereCounselorAssignation += `("currentShift"."id" = ${cAssignation.shiftId} AND "currentGrade"."id" IN (${grades}))`;
      if (index !== counselorAssignation.length - 1) {
        whereCounselorAssignation += ' OR ';
      }
    });

    const query = this.createQueryBuilder('request')
      .leftJoinAndSelect('request.student', 'student')
      .leftJoinAndSelect('student.currentGrade', 'currentGrade')
      .leftJoinAndSelect('student.currentShift', 'currentShift')
      .leftJoinAndSelect('student.images', 'image')
      .leftJoinAndSelect('image.grade', 'grade')
      .andWhere(`"request"."status" = '${ERequestStatus.Verificada}'`)
      .andWhere(`(${whereCounselorAssignation})`)
      .take(perPage)
      .skip((page - 1) * perPage);

    if (sort) {
      const order = getOrderBy(sort, sortOptionsMap);
      query.orderBy(order);
    } else {
      query.orderBy({ 'request.id': 'DESC' });
    }

    if (code) {
      query.andWhere(`student.code ILIKE '%${code}%'`);
    }

    if (firstname) {
      query.andWhere(`student.firstname ILIKE '%${firstname}%'`);
    }

    if (lastname) {
      query.andWhere(`student.lastname ILIKE '%${lastname}%'`);
    }

    if (email) {
      query.andWhere(`student.email ILIKE '%${email}%'`);
    }

    if (currentGrade) {
      query.andWhere(`"currentGrade"."id" = ${currentGrade}`);
    }

    if (currentShift) {
      query.andWhere(`"currentShift"."id" = ${currentShift}`);
    }

    if (createdAtStart) {
      query.andWhere(`request.createdAt >= '${createdAtStart}'`);
    }

    if (createdAtEnd) {
      query.andWhere(`request.createdAt <= '${createdAtEnd}'`);
    }

    return query.getManyAndCount();
  }
}
