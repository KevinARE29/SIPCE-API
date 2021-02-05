/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/camelcase */
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';
import * as cloudinary from 'cloudinary';
import { Image } from '@core/docs/image.doc';
import { StudentRepository } from '@students/repositories/student.repository';
import { GradeRepository } from '@academics/repositories/grade.repository';
import { ImageRepository } from '@students/repositories/image.repository';
import { plainToClass } from 'class-transformer';

const streamifier = require('streamifier');

@Injectable()
export class StudentImageService {
  constructor(
    private readonly studentRepository: StudentRepository,
    private readonly gradeRepository: GradeRepository,
    private readonly imageRepository: ImageRepository,
    private readonly configService: ConfigService,
  ) {}

  saveImageOnLocalFolder(filePath: string, imageFile: Express.Multer.File): string {
    const imageFormat = imageFile.mimetype.split('/')[1];
    const base64Image = imageFile.buffer.toString('base64');
    const imagePath = `./${filePath}.${imageFormat}`;
    const dirname = path.dirname(filePath);

    if (!fs.existsSync(dirname)) {
      fs.mkdirSync(dirname, { recursive: true });
    }

    fs.writeFileSync(imagePath, base64Image, { encoding: 'base64' });
    return imagePath;
  }

  async saveImageOnCloudinary(filePath: string, imageFile: Express.Multer.File): Promise<string> {
    let imagePath = '';
    cloudinary.v2.config({
      cloud_name: this.configService.get<string>('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get<string>('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get<string>('CLOUDINARY_API_SECRET'),
    });
    await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.v2.uploader.upload_stream(
        { tags: 'student_image_profile', public_id: filePath },
        (err, image) => {
          if (err) {
            reject(err);
          }
          imagePath = image?.secure_url || '';
          resolve(image);
        },
      );
      streamifier.createReadStream(imageFile.buffer).pipe(uploadStream);
    });

    if (!imagePath) {
      throw new UnprocessableEntityException('Error uploading the image');
    }

    return imagePath;
  }

  async uploadStudentImage(studentId: number, gradeId: number, imageFile: Express.Multer.File): Promise<Image> {
    const [student, grade] = await Promise.all([
      this.studentRepository.findByIdOrFail(studentId),
      this.gradeRepository.getGradeByIdOrThrow(gradeId),
    ]);
    const filePath = `images/${student.registrationYear}/${student.code}/${grade.name}`;
    const [uploadedImagePath, existingImage] = await Promise.all([
      this.uploadImage(filePath, imageFile),
      this.imageRepository.findOne({ student, grade }),
    ]);

    const image = existingImage
      ? await this.imageRepository.save({
          ...existingImage,
          path: uploadedImagePath,
        })
      : await this.imageRepository.save({
          student,
          grade,
          path: uploadedImagePath,
        });
    return plainToClass(Image, image, { excludeExtraneousValues: true });
  }

  async uploadImage(filePath: string, imageFile: Express.Multer.File): Promise<string> {
    const cloudinaryEnvs = this.configService.get('CLOUDINARY_ENVS').split(',');
    const env = this.configService.get<string>('NODE_ENV');
    if (cloudinaryEnvs.includes(env)) {
      return this.saveImageOnCloudinary(filePath, imageFile);
    }
    return this.saveImageOnLocalFolder(filePath, imageFile);
  }

  async getStudentImages(studentId: number): Promise<Image[]> {
    const student = await this.studentRepository.findByIdOrFail(studentId);
    return this.imageRepository.find({ where: { student } });
  }
}
