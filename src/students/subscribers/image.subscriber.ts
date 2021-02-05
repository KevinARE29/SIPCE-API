/* eslint-disable no-param-reassign */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectConnection } from '@nestjs/typeorm';
import { Image } from '@students/entities/image.entity';
import { getImageBase64 } from '@students/utils/image.util';
import { Connection, EntitySubscriberInterface, InsertEvent, UpdateEvent } from 'typeorm';

@Injectable()
export class ImageSubscriber implements EntitySubscriberInterface<Image> {
  private CLOUDINARY_ENVS: string[];

  private NODE_ENV: string;

  constructor(@InjectConnection() readonly connection: Connection, private readonly configService: ConfigService) {
    connection.subscribers.push(this);
    this.CLOUDINARY_ENVS = this.configService.get<string>('CLOUDINARY_ENVS')?.split(',') || ['dev', 'uat'];
    this.NODE_ENV = this.configService.get<string>('NODE_ENV') || 'dev';
  }

  listenTo() {
    return Image;
  }

  afterLoad(entity: Image) {
    if (!this.CLOUDINARY_ENVS.includes(this.NODE_ENV)) {
      entity.path = getImageBase64(entity.path);
    }
  }

  afterInsert(event: InsertEvent<Image>) {
    if (!this.CLOUDINARY_ENVS.includes(this.NODE_ENV)) {
      event.entity.path = getImageBase64(event.entity.path);
    }
  }

  afterUpdate(event: UpdateEvent<Image>) {
    if (!this.CLOUDINARY_ENVS.includes(this.NODE_ENV)) {
      event.entity.path = getImageBase64(event.entity.path);
    }
  }
}
