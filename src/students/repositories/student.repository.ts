import { EntityRepository, Repository, IsNull, In } from 'typeorm';
import { Student } from '@students/entities/student.entity';
import { PageDto } from '@core/dtos/page.dto';
import { StudentFilterDto, sortOptionsMap } from '@students/dtos/student-filter.dto';
import { EStudentStatus, activeStatuses, inactiveStatuses } from '@students/constants/student.constant';
import { NotFoundException } from '@nestjs/common';
import { Image } from '@students/entities/image.entity';
import { ResponsibleStudent } from '@students/entities/responsible-student.entity';
import { Responsible } from '@students/entities/responsible.entity';
import { Shift } from '@academics/entities/shift.entity';
import { Grade } from '@academics/entities/grade.entity';
import { ESchoolYearStatus } from '@academics/constants/academic.constants';
import {
  StudentSessionsFilterDto,
  sortOptionsMap as studentSessionSortOptionsMap,
} from '@expedient/dtos/student-sessions-filter.dto';
import { getOrderBy } from '@core/utils/sort.util';
import {
  StudentsBehavioralHistoryFilterDto,
  sortOptionsMap as studentsBehavioralHistorySortOptionsMap,
} from '@history/dtos/students-behavioral-history-filter.dto';
import {
  StudentYearResumeFilterDto,
  sortOptionsMap as studentYearResumeSortOptionsMap,
} from '@students/dtos/student-year-resume-filter.dto';

@EntityRepository(Student)
export class StudentRepository extends Repository<Student> {
  findByEmail(email: string): Promise<Student | undefined> {
    return this.findOne({
      relations: ['currentShift', 'currentGrade'],
      where: { email, deletedAt: IsNull(), status: In(activeStatuses) },
    });
  }

  async findByEmailOrFail(email: string): Promise<Student> {
    const student = await this.createQueryBuilder('student')
      .leftJoinAndSelect('student.currentGrade', 'currentGrade')
      .leftJoinAndSelect('student.sectionDetails', 'sectionDetails')
      .andWhere('student.deletedAt is null')
      .andWhere(`"student"."email" = '${email}'`)
      .andWhere(`"student"."status" IN (:...activeStatuses)`, { activeStatuses: [null, ...activeStatuses] })
      .orderBy({ 'sectionDetails.createdAt': 'DESC' })
      .getOne();
    if (!student) {
      throw new NotFoundException(`Estudiante no encontrado`);
    }
    return student;
  }

  findByCode(code: string): Promise<Student | undefined> {
    return this.findOne({
      where: {
        code,
        deletedAt: IsNull(),
      },
    });
  }

  async findByIdOrFail(id: number): Promise<Student> {
    const student = await this.findOne(id, { where: { deletedAt: IsNull() } });
    if (!student) {
      throw new NotFoundException(`Estudiante con id ${id} no encontrado`);
    }
    return student;
  }

  getAllStudents(pageDto: PageDto, studentFilterDto: StudentFilterDto): Promise<[Student[], number]> {
    const { page, perPage } = pageDto;
    const {
      sort,
      code,
      firstname,
      lastname,
      email,
      currentShift,
      currentGrade,
      currentSection,
      status,
      active,
      paginate,
    } = studentFilterDto;
    const query = this.createQueryBuilder('student')
      .leftJoinAndSelect('student.currentGrade', 'currentGrade')
      .leftJoinAndSelect('student.currentShift', 'currentShift')
      .leftJoinAndSelect('student.sectionDetails', 'sectionDetail')
      .leftJoinAndSelect('sectionDetail.section', 'section')
      .leftJoinAndSelect('sectionDetail.gradeDetail', 'gradeDetail')
      .leftJoinAndSelect('gradeDetail.cycleDetail', 'cycleDetail')
      .leftJoinAndSelect('cycleDetail.schoolYear', 'schoolYear')
      .andWhere('student.deletedAt is null');

    if (paginate !== 'false') {
      query.take(perPage);
      query.skip((page - 1) * perPage);
    }

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

    if (currentShift) {
      query.andWhere(`"currentShift"."id" = ${currentShift}`);
    }

    if (currentSection) {
      query.andWhere(`schoolYear.status = '${ESchoolYearStatus['En curso']}'`);
      query.andWhere(`section.id = ${currentSection}`);
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

  async getStudentDetails(id: number): Promise<Student | undefined> {
    const student = await this.createQueryBuilder('student')
      .leftJoinAndSelect('student.currentShift', 'currentShift')
      .leftJoinAndSelect('student.currentGrade', 'currentGrade')
      .leftJoinAndSelect('student.startedGrade', 'startedGrade')
      .leftJoinAndSelect('student.siblings', 'siblings')
      .leftJoinAndMapMany('student.images', Image, 'image', 'image.student = student.id')
      .leftJoinAndMapMany(
        'student.responsibleStudents',
        ResponsibleStudent,
        'rStudent',
        'rStudent.student = student.id',
      )
      .leftJoinAndSelect('image.grade', 'imageGrade')
      .leftJoinAndMapOne('rStudent.responsible', Responsible, 'responsible', 'rStudent.responsible = responsible.id')
      .leftJoinAndSelect('student.sectionDetails', 'sectionDetail')
      .leftJoinAndSelect('sectionDetail.section', 'section')
      .leftJoinAndSelect('sectionDetail.gradeDetail', 'gradeDetail')
      .leftJoinAndSelect('gradeDetail.grade', 'grade')
      .leftJoinAndSelect('gradeDetail.cycleDetail', 'cycleDetail')
      .leftJoinAndSelect('cycleDetail.cycle', 'cycle')
      .where(`student.id = ${id}`)
      .andWhere('student.deletedAt is null')
      .getOne();

    return student;
  }

  getStudentsAssignation({ id: currentShiftId }: Shift, { id: currentGradeId }: Grade): Promise<Student[]> {
    return this.createQueryBuilder('student')
      .leftJoinAndSelect('student.currentShift', 'currentShift')
      .leftJoinAndSelect('student.currentGrade', 'currentGrade')
      .leftJoinAndSelect('student.images', 'image')
      .leftJoinAndSelect('image.grade', 'grade')
      .leftJoinAndSelect('student.sectionDetails', 'sectionDetail')
      .leftJoinAndSelect('sectionDetail.teacher', 'teacher')
      .leftJoinAndSelect('sectionDetail.section', 'section')
      .leftJoinAndSelect('sectionDetail.gradeDetail', 'gradeDetail')
      .leftJoinAndSelect('gradeDetail.cycleDetail', 'cycleDetail')
      .leftJoinAndSelect('cycleDetail.schoolYear', 'schoolYear')
      .andWhere(`"currentShift"."id" = ${currentShiftId}`)
      .andWhere(`"currentGrade"."id" = ${currentGradeId}`)
      .andWhere(`"student"."status" = '${EStudentStatus['Cursando Año Escolar']}'`)
      .andWhere('student.deletedAt is null')
      .getMany();
  }

  getStudentsSessionsByCounselorId(
    counselorId: number,
    studentSessionsFilterDto: StudentSessionsFilterDto,
    pageDto: PageDto,
  ): Promise<[Student[], number]> {
    const { sort, firstname, lastname, code, currentGrade, currentShift } = studentSessionsFilterDto;
    const { page, perPage } = pageDto;
    const query = this.createQueryBuilder('student')
      .leftJoinAndSelect('student.currentShift', 'currentShift')
      .leftJoinAndSelect('student.currentGrade', 'currentGrade')
      .leftJoinAndSelect('student.expedients', 'expedients')
      .leftJoinAndSelect('expedients.sessions', 'sessions')
      .leftJoin('student.sectionDetails', 'sectionDetails')
      .leftJoin('sectionDetails.gradeDetail', 'gradeDetail')
      .leftJoin('gradeDetail.cycleDetail', 'cycleDetail')
      .leftJoin('gradeDetail.counselor', 'counselor')
      .leftJoin('cycleDetail.schoolYear', 'schoolYear')
      .andWhere(`"counselor"."id" = ${counselorId}`)
      .andWhere(`"schoolYear"."status" = '${ESchoolYearStatus['En curso']}'`)
      .andWhere('student.deletedAt is null')
      .take(perPage)
      .skip((page - 1) * perPage);

    if (sort) {
      const order = getOrderBy(sort, studentSessionSortOptionsMap);
      query.orderBy(order);
    } else {
      query.orderBy({ 'student.id': 'DESC' });
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

    if (currentGrade) {
      query.andWhere(`"currentGrade"."id" = ${currentGrade}`);
    }

    if (currentShift) {
      query.andWhere(`"currentShift"."id" = ${currentShift}`);
    }
    return query.getManyAndCount();
  }

  getStudentCurrentAssignation(studentId: number): Promise<Student | undefined> {
    return this.createQueryBuilder('student')
      .leftJoinAndSelect('student.sectionDetails', 'sectionDetail')
      .leftJoinAndSelect('sectionDetail.gradeDetail', 'gradeDetail')
      .leftJoinAndSelect('gradeDetail.grade', 'grade')
      .leftJoinAndSelect('gradeDetail.cycleDetail', 'cycleDetail')
      .leftJoinAndSelect('cycleDetail.schoolYear', 'schoolYear')
      .andWhere(`"student"."id" = ${studentId}`)
      .andWhere(`"schoolYear"."status" = '${ESchoolYearStatus['En curso']}'`)
      .andWhere('student.deletedAt is null')
      .orderBy({ 'grade.id': 'DESC' })
      .getOne();
  }

  getStudentsBehavioralHistoryByCounselorId(
    userId: number,
    pageDto: PageDto,
    studentsBehavioralHistoryFilterDto: StudentsBehavioralHistoryFilterDto,
    adminstrative: boolean,
  ): Promise<[Student[], number]> {
    const { page, perPage } = pageDto;
    const { sort, code, firstname, lastname, currentShift, currentGrade, section } = studentsBehavioralHistoryFilterDto;
    const query = this.createQueryBuilder('student')
      .leftJoinAndSelect('student.currentShift', 'currentShift')
      .leftJoinAndSelect('student.currentGrade', 'currentGrade')
      .leftJoinAndSelect('student.behavioralHistorys', 'behavioralHistorys')
      .leftJoinAndSelect('behavioralHistorys.classDiarys', 'classDiarys')
      .leftJoinAndSelect('behavioralHistorys.foulSanctionAssignations', 'foulSanctionAssignations')
      .leftJoinAndSelect('student.sectionDetails', 'sectionDetails')
      .leftJoinAndSelect('sectionDetails.section', 'section')
      .leftJoinAndSelect('sectionDetails.teacher', 'teacher')
      .leftJoinAndSelect('sectionDetails.auxTeachers', 'auxTeachers')
      .leftJoin('sectionDetails.gradeDetail', 'gradeDetail')
      .leftJoin('gradeDetail.cycleDetail', 'cycleDetail')
      .leftJoin('gradeDetail.counselor', 'counselor')
      .leftJoin('cycleDetail.schoolYear', 'schoolYear')
      .andWhere(`"schoolYear"."status" = '${ESchoolYearStatus['En curso']}'`)
      .andWhere('student.deletedAt is null')
      .take(perPage)
      .skip((page - 1) * perPage);

    if (!adminstrative) {
      query.andWhere(`("teacher"."id" = ${userId} OR "auxTeachers"."id" IN (:...teachersIds))`, {
        teachersIds: [null, userId],
      });
    }

    if (sort) {
      const order = getOrderBy(sort, studentsBehavioralHistorySortOptionsMap);
      query.orderBy(order);
    } else {
      query.orderBy({ 'student.id': 'DESC' });
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

    if (currentGrade) {
      query.andWhere(`"currentGrade"."id" = ${currentGrade}`);
    }

    if (currentShift) {
      query.andWhere(`"currentShift"."id" = ${currentShift}`);
    }

    if (section) {
      query.andWhere(`"section"."id" = ${section}`);
    }

    return query.getManyAndCount();
  }

  async getStudentAcademicInformation(studentId: number): Promise<Student> {
    const query = this.createQueryBuilder('student')
      .leftJoinAndSelect('student.expedients', 'expedients')
      .leftJoinAndSelect('expedients.gradeDetail', 'gradeDetail')
      .leftJoinAndSelect('gradeDetail.counselor', 'counselor')
      .leftJoinAndSelect('gradeDetail.grade', 'grade')
      .leftJoinAndSelect('gradeDetail.cycleDetail', 'cycleDetail')
      .leftJoinAndSelect('cycleDetail.schoolYear', 'schoolYear')
      .leftJoinAndSelect('student.behavioralHistorys', 'behavioralHistorys')
      .leftJoinAndSelect('behavioralHistorys.foulSanctionAssignations', 'foulSanctionAssignations')
      .leftJoinAndSelect('foulSanctionAssignations.foulId', 'foulId')
      .leftJoinAndSelect('behavioralHistorys.sectionDetailId', 'bSectionDetail')
      .leftJoinAndSelect('bSectionDetail.teacher', 'teacher')
      .leftJoinAndSelect('bSectionDetail.gradeDetail', 'bGradeDetail')
      .leftJoinAndSelect('bGradeDetail.grade', 'bGrade')
      .leftJoinAndSelect('bGradeDetail.cycleDetail', 'bCycleDetail')
      .leftJoinAndSelect('bCycleDetail.schoolYear', 'bSchoolYear')
      .orderBy({ 'behavioralHistorys.createdAt': 'DESC' })
      .andWhere(`"student"."id" = ${studentId}`)
      .andWhere('student.deletedAt is null');

    const student = await query.getOne();
    if (!student) {
      throw new NotFoundException('El estudiante especificado no fue encontrado');
    }
    return student;
  }

  getStudentsBehavioralHistoryInformation(
    counselorId: number,
    studentYearResumeFilterDto: StudentYearResumeFilterDto,
  ): Promise<Student[]> {
    const { sort, currentGrade } = studentYearResumeFilterDto;
    const query = this.createQueryBuilder('student')
      .leftJoinAndSelect('student.currentShift', 'currentShift')
      .leftJoinAndSelect('student.currentGrade', 'currentGrade')
      .leftJoinAndSelect('student.behavioralHistorys', 'behavioralHistorys')
      .leftJoin('student.sectionDetails', 'sectionDetails')
      .leftJoin('sectionDetails.teacher', 'teacher')
      .leftJoin('sectionDetails.gradeDetail', 'gradeDetail')
      .leftJoin('gradeDetail.cycleDetail', 'cycleDetail')
      .leftJoin('cycleDetail.schoolYear', 'schoolYear')
      .andWhere(`"schoolYear"."status" = '${ESchoolYearStatus['En curso']}'`)
      .andWhere('student.deletedAt is null')
      .andWhere(`"teacher"."id" = ${counselorId}`);

    if (sort) {
      const order = getOrderBy(sort, studentYearResumeSortOptionsMap);
      query.orderBy(order);
    } else {
      query.orderBy({ 'student.id': 'DESC' });
    }

    if (currentGrade) {
      query.andWhere(`"currentGrade"."id" = ${currentGrade}`);
    }

    return query.getMany();
  }
}
