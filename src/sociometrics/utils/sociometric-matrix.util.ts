/* eslint-disable no-restricted-syntax */
import { Answer } from '@sociometrics/entities/answer.entity';
import { Student } from '@students/entities/student.entity';

const arrayColumn = (arr: any[], n: number) => arr.map((x: { [x: string]: any }) => x[n]);

const sumArray = (arr: number[]) => arr.reduce((acum: number, val: number) => acum + val, 0);

const sumIf = (arr: number[], conotation: boolean) =>
  arr.reduce((acc: number, x: number) => {
    if ((conotation && x > 0) || (!conotation && x < 0)) {
      return acc + x;
    }
    return acc;
  }, 0);

export function generateSocioMatrix(students: Student[], answers: Answer[]): number[][] {
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
      socioMatrix[rowIndex][colIndex] = answer.ponderation;
    });
  });

  return socioMatrix;
}

/**
 * Parámetro socioMatrix: Matriz sociométrica
 * Parámetro students: Arreglo de estudiantes del grado en que se realizará la prueba sociométrica
 * Parámetro d: Número de elecciones posibles
 */
export function getSociometrixValuesAndIndexes(socioMatrix: number[][], students: Student[], d: number) {
  const n = students.length; // Número de participantes
  const spArray = [];
  const spValArray = [];
  const snArray = [];
  const snValArray = [];
  const epArray = new Array(n).fill(d);
  const enArray = new Array(n).fill(d);
  const rpArray = [];
  const rnArray = [];
  const individualIndexes = [];

  for (const [i, row] of socioMatrix.entries()) {
    const columnData = arrayColumn(socioMatrix, i);
    const sp = columnData.filter((x: number) => x > 0).length;
    spArray.push(sp);
    spValArray.push(sumIf(columnData, true));
    const sn = columnData.filter((x: number) => x < 0).length;
    snArray.push(sn);
    snValArray.push(Math.abs(sumIf(columnData, false)));
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
    rnArray.push(rnCount);
    const pop = +(sp / (n - 1)).toFixed(2); // Popularidad
    const ant = +(sn / (n - 1)).toFixed(2); // Antipatía
    const expP = +(d / (n - 1)).toFixed(2); // Expansividad positiva
    const expN = +(d / (n - 1)).toFixed(2); // Expansividad negativa
    const ca = +(rpCount / sp || 0).toFixed(2); // Conexión afectiva
    individualIndexes.push({ student: students[i], pop, ant, expP, expN, ca });
  }

  const spSum = sumArray(spArray);
  const snSum = sumArray(snArray);
  const rpSum = sumArray(rpArray);
  const rnSum = sumArray(rnArray);
  const ia = +(rpSum / (d * n)).toFixed(2); // Asociación
  const id = +(rnSum / (d * n)).toFixed(2); // Disociación
  const ic = +(rpSum / spSum).toFixed(2); // Coherencia
  const is = +((spSum + snSum) / (n - 1)).toFixed(2); // Intensidad social
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
