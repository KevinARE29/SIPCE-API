/* eslint-disable no-nested-ternary */
/* eslint-disable no-restricted-syntax */
import { EQuestionType } from '@sociometrics/constants/sociometric.constant';
import { Answer } from '@sociometrics/entities/answer.entity';
import { Student } from '@students/entities/student.entity';

const arrayColumn = (arr: any[], n: number) => arr.map((x: { [x: string]: any }) => x[n]);

const sumArray = (arr: any[]) => arr.reduce((acum: number, val: number) => acum + val, 0);

const sumIf = (arr: number[], conotation: boolean) =>
  arr.reduce((acc: number, x: number) => {
    if ((conotation && x > 0) || (!conotation && x < 0)) {
      return acc + x;
    }
    return acc;
  }, 0);

export function generateSocioMatrix(students: Student[], answers: Answer[], questionType: EQuestionType): number[][] {
  const apply = questionType === EQuestionType['ACEPTACIÓN/RECHAZO'];
  const len = students.length;
  const studentIds = students.map(student => student.id);
  const socioMatrix = Array(len)
    .fill(0)
    .map(() => Array(len).fill(0));

  students.forEach((student, rowIndex) => {
    const filteredAnswers = answers.filter(answer => answer.sociometricTestDetail.student.id === student.id);
    if (!filteredAnswers.length) {
      return;
    }

    filteredAnswers.forEach(answer => {
      const colIndex = studentIds.indexOf(answer.student.id);
      socioMatrix[rowIndex][colIndex] = apply ? answer.ponderation : answer.ponderation > 0 ? answer.ponderation : 0;
    });
  });

  return socioMatrix;
}

/**
 * Parámetro socioMatrix: Matriz sociométrica
 * Parámetro students: Arreglo de estudiantes del grado en que se realizará la prueba sociométrica
 * Parámetro d: Número de elecciones posibles
 * Parámetro questionType: Tipo de la pregunta
 */
export function getSociometrixValuesAndIndexes(
  socioMatrix: number[][],
  students: Student[],
  d: number,
  questionType: EQuestionType,
) {
  const apply = questionType === EQuestionType['ACEPTACIÓN/RECHAZO'];
  const n = students.length; // Número de participantes
  const spArray: number[] = [];
  const spValArray: number[] = [];
  const snArray: (string | number)[] = [];
  const snValArray: (string | number)[] = [];
  const epArray = new Array(n).fill(d);
  const enArray = new Array(n).fill(apply ? d : 'n.a.');
  const rpArray: number[] = [];
  const rnArray: (string | number)[] = [];
  const individualIndexes = [];

  for (const [i, row] of socioMatrix.entries()) {
    const columnData = arrayColumn(socioMatrix, i);
    const sp = columnData.filter((x: number) => x > 0).length;
    spArray.push(sp);
    spValArray.push(sumIf(columnData, true));
    const sn = apply ? columnData.filter((x: number) => x < 0).length : 'n.a';
    snArray.push(sn);
    snValArray.push(apply ? Math.abs(sumIf(columnData, false)) : 'n.a.');
    let rpCount = 0;
    let rnCount = 0;

    for (const [j] of row.entries()) {
      if (socioMatrix[i][j] > 0 && socioMatrix[j][i] > 0) {
        rpCount += 1;
      } else if (socioMatrix[i][j] < 0 && socioMatrix[j][i] < 0) {
        rnCount += 1;
      }
    }

    rpArray.push(rpCount);
    rnArray.push(apply ? rnCount : 'n.a.');
    const pop = +(sp / (n - 1)).toFixed(2); // Popularidad
    const ant = typeof sn === 'number' ? +(sn / (n - 1)).toFixed(2) : 'n.a.'; // Antipatía
    const expP = +(d / (n - 1)).toFixed(2); // Expansividad positiva
    const expN = apply ? +(d / (n - 1)).toFixed(2) : 'n.a.'; // Expansividad negativa
    const ca = +(rpCount / sp || 0).toFixed(2); // Conexión afectiva
    individualIndexes.push({ student: students[i], pop, ant, expP, expN, ca });
  }

  const spSum = sumArray(spArray);
  const snSum = typeof snArray[0] === 'number' ? sumArray(snArray) : 'n.a.';
  const rpSum = sumArray(rpArray);
  const rnSum = typeof rnArray[0] === 'number' ? sumArray(rnArray) : 'n.a.';
  const ia = +(rpSum / (d * n)).toFixed(2); // Asociación
  const id = typeof rnSum === 'number' ? +(rnSum / (d * n)).toFixed(2) : 'n.a.'; // Disociación
  const ic = +(rpSum / spSum || 0).toFixed(2); // Coherencia
  const is = typeof snSum === 'number' ? +((spSum + snSum) / (n - 1)).toFixed(2) : 'n.a.'; // Intensidad social
  const groupalIndexes = { ia, id, ic, is };

  return {
    sociometricValues: {
      spArray,
      snArray,
      spValArray,
      snValArray,
      enArray,
      epArray,
      rpArray,
      rnArray,
    },
    individualIndexes,
    groupalIndexes,
  };
}
