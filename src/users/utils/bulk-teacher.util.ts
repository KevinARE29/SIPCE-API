/* eslint-disable no-multi-assign */
/* eslint-disable no-param-reassign */
import { TeacherDto } from '@users/dtos/bulk/teacher.dto';

const academics = {
  cycle: 'Ciclo',
  grade: 'Grado',
  section: 'Sección',
};

export function parseTeachers(teachers: TeacherDto[]): any {
  return teachers.reduce((result, item) => {
    // Get cycle object corresponding to current item from result (or insert if not present)
    const cycle = (result[item.cycleId] = result[item.cycleId] || {});

    // Get grade object corresponding to current item from cycle object (or insert if not present)
    const grade = (cycle[item.gradeId] = cycle[item.gradeId] || {});

    // Add current item to current sectionId
    grade[item.sectionId] = item;

    // Return the result object for this iteration
    return result;
  }, {} as any);
}

export function parseBulkErrors(
  teachers: TeacherDto[],
  propertyId: number,
  property: keyof typeof academics,
): { [key: number]: string } {
  return teachers.reduce((errors, teacher, index) => {
    if (teacher[`${property}Id` as keyof TeacherDto] === propertyId) {
      errors[index] = `all: ${academics[property]} especificado/a no existe o no está activo/a`;
    }
    return errors;
  }, {} as { [key: number]: string });
}
