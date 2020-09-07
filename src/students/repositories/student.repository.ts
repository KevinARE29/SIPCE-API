import { EntityRepository, Repository } from 'typeorm';
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

@EntityRepository(Student)
export class StudentRepository extends Repository<Student> {
  findByCode(code: string): Promise<Student | undefined> {
    return this.findOne({
      where: {
        code,
      },
    });
  }

  async findByIdOrFail(id: number): Promise<Student> {
    const student = await this.findOne(id);
    if (!student) {
      throw new NotFoundException(`Estudiante con id ${id} no encontrado`);
    }
    return student;
  }

  getAllStudents(pageDto: PageDto, studentFilterDto: StudentFilterDto): Promise<[Student[], number]> {
    const { page, perPage } = pageDto;
    const { sort, code, firstname, lastname, email, currentGrade, status, active } = studentFilterDto;
    const query = this.createQueryBuilder('student')
      .leftJoinAndSelect('student.currentGrade', 'currentGrade')
      .andWhere('student.deletedAt is null')
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
      .leftJoin('student.currentShift', 'currentShift')
      .leftJoin('student.currentGrade', 'currentGrade')
      .leftJoinAndMapMany('student.images', Image, 'image', 'image.student = student.id')
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
}
