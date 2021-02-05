import { TCounselorAssignation } from '@academics/constants/academic.constants';

export function generateWhereCounselorAssignation(counselorAssignation: TCounselorAssignation): string {
  let whereCounselorAssignation = '';
  counselorAssignation.forEach((cAssignation, index) => {
    const grades = cAssignation.grades.join();
    whereCounselorAssignation += `("currentShift"."id" = ${cAssignation.shiftId} AND "currentGrade"."id" IN (${grades}))`;
    if (index !== counselorAssignation.length - 1) {
      whereCounselorAssignation += ' OR ';
    }
  });
  return whereCounselorAssignation;
}
