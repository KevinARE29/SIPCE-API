export enum EnumFoulsType {
  'Leves' = 1,
  'Graves',
  'Muy Graves',
}

export const foulsValues = Object.values(EnumFoulsType).filter(key => typeof key === 'number');
export const foulsKeys = Object.values(EnumFoulsType).filter(key => typeof key === 'string');
export type TFouls = keyof typeof EnumFoulsType;
