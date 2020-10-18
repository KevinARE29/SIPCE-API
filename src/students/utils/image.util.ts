import * as fs from 'fs';
import { Image } from '@core/docs/image.doc';

export function getImageBase64(imagePath: string): string {
  const ext = imagePath.split('.').slice(-1)[0];
  const imageAsBase64 = fs.readFileSync(imagePath, 'base64');
  const image = `data:image/${ext};base64, ${imageAsBase64}`;
  return image;
}

export function getImage(imagePath: string): Image {
  const { CLOUDINARY_ENVS, NODE_ENV = 'dev' } = process.env;
  if (CLOUDINARY_ENVS?.includes(NODE_ENV)) {
    return { path: imagePath };
  }
  return { path: getImageBase64(imagePath) };
}
