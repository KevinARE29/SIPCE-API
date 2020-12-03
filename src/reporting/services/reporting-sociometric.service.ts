/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { SectionDetailService } from '@academics/services';
import { Injectable } from '@nestjs/common';
import { SociometricMatrixService } from '@sociometrics/services/sociometric-matrix.service';
import { SociometricTestService } from '@sociometrics/services/sociometric-test.service';

@Injectable()
export class ReportingSociometricService {
  constructor(
    private readonly sociometricTestService: SociometricTestService,
    private readonly sociometricMatrixService: SociometricMatrixService,
    private readonly sectionDetailService: SectionDetailService,
  ) {}

  async getSociometricTestReport(sociometricTestId: number, filter: string | undefined): Promise<any> {
    const {
      data: { sectionDetailId, shift, grade, section, questionBank },
    } = await this.sociometricTestService.getSociometricTest(sociometricTestId);

    const {
      data: { students },
    } = await this.sectionDetailService.getSectionDetailStudents(sectionDetailId);

    const generalReports = [];
    const individualReports = students.map(student => ({ ...student, questions: [] as any[] }));

    for (const question of questionBank.questions) {
      const {
        data: { sociomatrix, sociometricValues, groupalIndexes, individualIndexes, participants },
      } = await this.sociometricMatrixService.getSociometricMatrix(sociometricTestId, question.id);

      const sociomatrixData =
        !filter || filter?.split(',').includes('sociomatrix')
          ? { participants, sociomatrix, sociometricValues }
          : undefined;

      const groupalIndexesData = !filter || filter?.split(',').includes('groupalIndexes') ? groupalIndexes : undefined;

      generalReports.push({ sociomatrixData, groupalIndexesData });
      individualIndexes.forEach(({ student, ...indexes }, i) => {
        const { spArray, spValArray, snArray, snValArray, epArray, enArray, rpArray, rnArray } = sociometricValues;

        const socioValues = {
          sp: spArray[i],
          spVal: spValArray[i],
          sn: snArray[i],
          snVal: snValArray[i],
          ep: epArray[i],
          en: enArray[i],
          rp: rpArray[i],
          rn: rnArray[i],
        };

        individualReports[i].questions.push({
          question,
          indexes: !filter || filter?.split(',').includes('individualIndexes') ? indexes : undefined,
          sociometricValues: !filter || filter?.split(',').includes('sociometricValues') ? socioValues : undefined,
        });
      });
    }

    const mappedResponse = {
      shift,
      grade,
      section,
      students: !filter || filter?.split(',').includes('participants') ? students : undefined,
      questionBank: !filter || filter?.split(',').includes('questionBank') ? questionBank : undefined,
      generalReports:
        !filter || filter?.split(',').includes('sociomatrix') || filter?.split(',').includes('groupalIndexes')
          ? generalReports
          : undefined,
      individualReports:
        !filter || filter?.split(',').includes('sociometricValues') || filter?.split(',').includes('individualIndexes')
          ? individualReports
          : undefined,
    };

    return mappedResponse;
  }
}
