import { Injectable } from '@nestjs/common';
import { UserRepository } from '@users/repositories/users.repository';
import { Role } from '@auth/entities/role.entity';
import { SchoolYearRepository } from '@academics/repositories/school-year.repository';
import { mapCycleDetails } from '@academics/utils/school-year.util';
import { MyProfile } from '@users/docs/my-profile/my-profile.doc';
import { plainToClass } from 'class-transformer';
import { MyProfileResponse } from '@users/docs/my-profile/my-profile-response.doc';
import { MyCyclesAssignation } from '@users/docs/my-profile/my-cycles-assignation.doc';
import { MyGradesAssignation } from '@users/docs/my-profile/my-grades-assignation.doc';
import { MyTeacherAssignation } from '@users/docs/my-profile/my-teacher-assignation.doc';

@Injectable()
export class MeService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly schoolYearRepository: SchoolYearRepository,
  ) {}

  hasRole(roles: Role[] = [], roleName: string): boolean {
    return roles.map(role => role.name.toLowerCase()).includes(roleName.toLowerCase());
  }

  async getMyProfile(userId: number): Promise<MyProfileResponse> {
    const [
      user,
      teacherCurrentAssignation,
      auxTeacherCurrentAssignation,
      counselorCurrentAssignation,
      cycleCoordinatorCurrentAssignation,
    ] = await Promise.all([
      this.userRepository.findByIdOrThrow(userId),
      this.schoolYearRepository.getCurrentAssignation({ teacherId: userId }),
      this.schoolYearRepository.getCurrentAssignation({ auxTeacherId: userId }),
      this.schoolYearRepository.getCurrentAssignation({ counselorId: userId }),
      this.schoolYearRepository.getCurrentAssignation({ cycleCoordinatorId: userId }),
    ]);

    let teacherAssignation;
    let auxTeacherAssignation;
    let counselorAssignation;
    let cycleCoordinatorAssignation;

    if (teacherCurrentAssignation && this.hasRole(user?.roles, 'docente')) {
      teacherAssignation = teacherCurrentAssignation.cycleDetails.reduce(
        mapCycleDetails(MyTeacherAssignation),
        {} as any,
      );
    }

    if (auxTeacherCurrentAssignation && this.hasRole(user?.roles, 'docente auxiliar')) {
      auxTeacherAssignation = auxTeacherCurrentAssignation.cycleDetails.reduce(
        mapCycleDetails(MyTeacherAssignation),
        {} as any,
      );
    }

    if (counselorCurrentAssignation && this.hasRole(user?.roles, 'orientador')) {
      counselorAssignation = counselorCurrentAssignation.cycleDetails.reduce(
        mapCycleDetails(MyGradesAssignation),
        {} as any,
      );
    }

    if (cycleCoordinatorCurrentAssignation && this.hasRole(user?.roles, 'coordinador de ciclo')) {
      cycleCoordinatorAssignation = cycleCoordinatorCurrentAssignation.cycleDetails.reduce(
        mapCycleDetails(MyCyclesAssignation),
        {} as any,
      );
    }
    return {
      data: plainToClass(
        MyProfile,
        { ...user, teacherAssignation, auxTeacherAssignation, counselorAssignation, cycleCoordinatorAssignation },
        { excludeExtraneousValues: true },
      ),
    };
  }
}
