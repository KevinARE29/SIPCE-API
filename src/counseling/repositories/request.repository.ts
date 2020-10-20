import { TCounselorAssignation } from '@academics/constants/academic.constants';
import { PageDto } from '@core/dtos/page.dto';
import { getOrderBy } from '@core/utils/sort.util';
import { ERequestStatus } from '@counseling/constants/request.constant';
import { RequestFilterDto, sortOptionsMap } from '@counseling/dtos/request-filter.dto';
import { generateWhereCounselorAssignation } from '@counseling/utils/counseling.util';
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

    const whereCounselorAssignation = generateWhereCounselorAssignation(counselorAssignation);

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
      query.andWhere(`student.createdAt >= '${createdAtStart}'`);
    }

    if (createdAtEnd) {
      query.andWhere(`student.createdAt <= '${createdAtEnd}'`);
    }

    return query.getManyAndCount();
  }

  getRequest(counselorAssignation: TCounselorAssignation, requestId: number): Promise<Request | undefined> {
    const whereCounselorAssignation = generateWhereCounselorAssignation(counselorAssignation);

    return this.createQueryBuilder('request')
      .leftJoinAndSelect('request.student', 'student')
      .leftJoinAndSelect('student.currentGrade', 'currentGrade')
      .leftJoinAndSelect('student.currentShift', 'currentShift')
      .andWhere(`"request"."status" = '${ERequestStatus.Verificada}'`)
      .andWhere(`(${whereCounselorAssignation})`)
      .andWhere(`"request"."id" = ${requestId}`)
      .getOne();
  }
}
